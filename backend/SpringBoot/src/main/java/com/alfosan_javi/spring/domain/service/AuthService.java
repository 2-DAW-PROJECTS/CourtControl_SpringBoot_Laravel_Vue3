package com.alfosan_javi.spring.domain.service;

// Local imports
import com.alfosan_javi.spring.api.response.LoginRequest;
import com.alfosan_javi.spring.api.response.LoginResponse;
import com.alfosan_javi.spring.api.response.RegisterRequest;
import com.alfosan_javi.spring.domain.model.Role;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.model.RefreshToken;
import com.alfosan_javi.spring.domain.repository.RoleRepository;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import com.alfosan_javi.spring.domain.repository.RefreshTokenRepository;
import com.alfosan_javi.spring.api.security.jwt.JwtUtils;

// Spring imports
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

// Fornecedor de dependencias
import com.fasterxml.jackson.databind.ObjectMapper;

// Java imports
import java.util.Optional;
import java.time.Instant;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Autowired
    public AuthService(RestTemplate restTemplate, UserRepository userRepository, JwtUtils jwtUtils,
                       RefreshTokenRepository refreshTokenRepository, RefreshTokenService refreshTokenService,
                       PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.restTemplate = restTemplate;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    // Método registrar
    @Transactional
    public void register(RegisterRequest registerRequest) {
        if (registerRequest.getEmail() == null || !isValidEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        // Crear nuevo usuario
        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setName(registerRequest.getName());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // Obtener o crear el rol "CLIENT"
        Role clienteRole = roleRepository.findByName("CLIENT")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("CLIENT");
                    return roleRepository.save(newRole);
                });

        newUser.getRoles().add(clienteRole);

        userRepository.save(newUser);
    }

    // Método para autenticar usuarios
    public LoginResponse authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Si el usuario tiene el rol de ADMIN, autenticarse en Laravel
        if (userHasAdminRole(user)) {
            return authenticateAdminInLaravel(loginRequest);
        }

        // Si el usuario no es admin, proceder con la autenticación normal
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String accessToken = jwtUtils.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

        Optional<RefreshToken> existingRefreshTokenOpt = refreshTokenRepository.findTopByUserIdOrderByCreatedAtDesc(String.valueOf(user.getId()));

        existingRefreshTokenOpt.ifPresent(existingRefreshToken -> {
            refreshTokenService.blacklistToken(existingRefreshToken.getToken());
        });

        // Crear y guardar el nuevo token de refresh
        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setUserId(String.valueOf(user.getId()));
        refreshTokenEntity.setExpiresAt(Instant.now().plusMillis(jwtUtils.getRefreshExpirationMs()));
        refreshTokenEntity.setCreatedAt(Instant.now());
        refreshTokenRepository.save(refreshTokenEntity);

        return new LoginResponse(accessToken, refreshToken);
    }

    // Verificar si el usuario tiene el rol ADMIN
    private boolean userHasAdminRole(User user) {
        return user.getRoles().stream()
                .anyMatch(role -> role.getName().equals("ADMIN"));
    }

    // Método para autenticar admin en Laravel
    private LoginResponse authenticateAdminInLaravel(LoginRequest loginRequest) {
        String url = "http://localhost:80/api/admin/auth/login";
        
        try {
            // Crear el encabezado HTTP y la entidad que incluye el cuerpo
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<LoginRequest> requestEntity = new HttpEntity<>(loginRequest, headers);

            // Enviar solicitud POST al servidor Laravel
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, requestEntity, String.class);

            // Log de la respuesta para depuración
            log.info("Response from Laravel: Status - {}, Body - {}", 
                     responseEntity.getStatusCode(), 
                     responseEntity.getBody());

            // Verificar si la respuesta es exitosa
            if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
                // Mapear la respuesta JSON a LoginResponse
                ObjectMapper objectMapper = new ObjectMapper();
                LoginResponse loginResponse = objectMapper.readValue(responseEntity.getBody(), LoginResponse.class);

                // Validar que los tokens no sean nulos
                if (loginResponse.getAccessToken() == null || loginResponse.getRefreshToken() == null) {
                    throw new IllegalArgumentException("Tokens nulos en la respuesta de Laravel.");
                }

                return loginResponse;
            } else {
                throw new IllegalArgumentException("Error al autenticar admin en Laravel: Código de estado - " 
                                                   + responseEntity.getStatusCode());
            }
        } catch (Exception e) {
            // Manejar errores
            log.error("Error al autenticar admin en Laravel", e);
            throw new IllegalArgumentException("Error al autenticar admin en Laravel: " + e.getMessage(), e);
        }
    }

    // Validación de correo electrónico
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    // Obtener usuario por correo
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
}
