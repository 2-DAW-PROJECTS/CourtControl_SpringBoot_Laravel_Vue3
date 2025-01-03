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

//fornecedor de dependencias
import com.fasterxml.jackson.databind.ObjectMapper; // Importación necesaria

// Java imports
import java.util.Optional;
import java.time.Instant;
import java.util.regex.Pattern;


@Service
public class AuthService {

    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    // Inyección de dependencias
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

private LoginResponse authenticateAdminInLaravel(LoginRequest loginRequest) {
    String url = "http://apache/api/admin/test";
    LoginResponse loginResponse = null;
    try {
        System.out.println("Enviando solicitud a Laravel con URL: " + url);
        System.out.println("Datos de la solicitud: " + loginRequest);

        String response = restTemplate.postForObject(url, loginRequest, String.class);

        System.out.println("Respuesta recibida de Laravel: " + response);

        ObjectMapper objectMapper = new ObjectMapper();
        loginResponse = objectMapper.readValue(response, LoginResponse.class);

        System.out.println("Respuesta deserializada a LoginResponse: " + loginResponse);

    } catch (Exception e) {
        System.err.println("Error al autenticar admin en Laravel: " + e.getMessage());
        e.printStackTrace();
    }
    if (loginResponse == null) {
        throw new IllegalArgumentException("Failed to authenticate admin in Laravel");
    }
    return loginResponse;
}

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
}


