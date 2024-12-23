package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.response.LoginRequest;
import com.alfosan_javi.spring.api.response.LoginResponse;
import com.alfosan_javi.spring.api.response.RegisterRequest;
import com.alfosan_javi.spring.domain.model.Role;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.RoleRepository;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.alfosan_javi.spring.domain.model.RefreshToken;
import com.alfosan_javi.spring.domain.repository.RefreshTokenRepository;
import com.alfosan_javi.spring.api.security.jwt.JwtUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.time.Instant;
import java.util.regex.Pattern;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.core.ParameterizedTypeReference;
import java.util.Map;

import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;


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







// private LoginResponse authenticateAdminInLaravel(LoginRequest loginRequest) {
//     String url = "http://apache/api/admin/test"; // Usar el nombre del servicio Docker
//     LoginResponse loginResponse = null;
    
//     try {
//         // Log de depuración antes de la llamada
//         // System.out.println("Enviando solicitud a Laravel con URL: " + url);
//         System.out.println("Datos de la solicitud: " + loginRequest);

//         loginResponse = restTemplate.postForObject(url, loginRequest, LoginResponse.class);

//         // Log de depuración después de la llamada
//         System.out.println("Respuesta recibida de Laravel: " + loginResponse);
//     } catch (Exception e) {
//         // Log de depuración en caso de excepción
//         System.err.println("Error al autenticar admin en Laravel: " + e.getMessage());
//         e.printStackTrace();
//     }

//     if (loginResponse == null) {
//         throw new IllegalArgumentException("Failed to authenticate admin in Laravel");
//     }

//     return loginResponse;
// }
    public LoginResponse authenticateAdminInLaravel(LoginRequest loginRequest) {
        String url = "http://apache/api/admin/test"; // Usar el nombre del servicio Docker
        LoginResponse loginResponse = null;

        try {
            // Log de depuración antes de la llamada
            System.out.println("Enviando solicitud a Laravel con URL: " + url);
            System.out.println("Datos de la solicitud: " + loginRequest);

            // Configurar la solicitud HTTP
            HttpHeaders headers = new HttpHeaders();
            headers.set("Content-Type", "application/json");
            HttpEntity<LoginRequest> requestEntity = new HttpEntity<>(loginRequest, headers);

            // Realizar la solicitud POST a Laravel
            ResponseEntity<Map<String, Object>> responseEntity = restTemplate.exchange(
                url,
                HttpMethod.POST,
                requestEntity,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );

            // Verificar si la respuesta contiene el token JWT
            if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null && responseEntity.getBody().containsKey("token")) {
                String token = (String) responseEntity.getBody().get("token");
                loginResponse = new LoginResponse(token, null); // Asumiendo que solo necesitas el token JWT
            } else {
                throw new IllegalArgumentException("Failed to authenticate admin in Laravel");
            }

            // Log de depuración después de la llamada
            System.out.println("Respuesta recibida de Laravel: " + loginResponse);
        } catch (Exception e) {
            // Log de depuración en caso de excepción
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







// package com.alfosan_javi.spring.domain.service;

// import com.alfosan_javi.spring.api.response.LoginRequest;
// import com.alfosan_javi.spring.api.response.LoginResponse;
// import com.alfosan_javi.spring.api.response.RegisterRequest;
// import com.alfosan_javi.spring.domain.model.Role;
// import com.alfosan_javi.spring.domain.model.User;
// import com.alfosan_javi.spring.domain.repository.RoleRepository;
// import com.alfosan_javi.spring.domain.repository.UserRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import com.alfosan_javi.spring.domain.model.RefreshToken;
// import com.alfosan_javi.spring.domain.repository.RefreshTokenRepository;
// import com.alfosan_javi.spring.api.security.jwt.JwtUtils;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.Optional;
// import java.time.Instant;
// import java.util.regex.Pattern;

// import org.springframework.web.reactive.function.client.WebClient;
// import reactor.core.publisher.Mono;

// @Service
// public class AuthService {

//     private final WebClient webClient;
//     private final UserRepository userRepository;
//     private final RefreshTokenRepository refreshTokenRepository;
//     private final JwtUtils jwtUtils;
//     private final RefreshTokenService refreshTokenService;
//     private final PasswordEncoder passwordEncoder;
//     private final RoleRepository roleRepository;

//     // Inyección de dependencias
//     public AuthService(WebClient.Builder webClientBuilder, UserRepository userRepository, JwtUtils jwtUtils,
//                        RefreshTokenRepository refreshTokenRepository, RefreshTokenService refreshTokenService,
//                        PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
//         this.webClient = webClientBuilder.baseUrl("http://localhost:80").build();  // URL base Laravel
//         this.userRepository = userRepository;
//         this.jwtUtils = jwtUtils;
//         this.refreshTokenRepository = refreshTokenRepository;
//         this.refreshTokenService = refreshTokenService;
//         this.passwordEncoder = passwordEncoder;
//         this.roleRepository = roleRepository;
//     }

//     // Método registrar
//     @Transactional
//     public void register(RegisterRequest registerRequest) {
//         if (registerRequest.getEmail() == null || !isValidEmail(registerRequest.getEmail())) {
//             throw new IllegalArgumentException("Invalid email format");
//         }

//         if (userRepository.existsByEmail(registerRequest.getEmail())) {
//             throw new IllegalArgumentException("Email is already in use");
//         }

//         if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 8) {
//             throw new IllegalArgumentException("Password must be at least 8 characters long");
//         }

//         // Crear nuevo usuario
//         User newUser = new User();
//         newUser.setEmail(registerRequest.getEmail());
//         newUser.setName(registerRequest.getName());
//         newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

//         // Obtener o crear el rol "CLIENT"
//         Role clienteRole = roleRepository.findByName("CLIENT")
//                 .orElseGet(() -> {
//                     Role newRole = new Role();
//                     newRole.setName("CLIENT");
//                     return roleRepository.save(newRole);
//                 });

//         newUser.getRoles().add(clienteRole);

//         userRepository.save(newUser);
//     }

//     // Método para autenticar usuarios
//     public LoginResponse authenticate(LoginRequest loginRequest) {
//         User user = userRepository.findByEmail(loginRequest.getEmail())
//                 .orElseThrow(() -> new IllegalArgumentException("User not found"));

//         // Si el usuario tiene el rol de ADMIN, autenticarse en Laravel
//         if (userHasAdminRole(user)) {
//             return authenticateAdminInLaravel(loginRequest);
//         }

//         // Si el usuario no es admin, proceder con la autenticación normal
//         if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//             throw new IllegalArgumentException("Invalid password");
//         }

//         String accessToken = jwtUtils.generateAccessToken(user.getEmail());
//         String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

//         Optional<RefreshToken> existingRefreshTokenOpt = refreshTokenRepository.findTopByUserIdOrderByCreatedAtDesc(String.valueOf(user.getId()));

//         existingRefreshTokenOpt.ifPresent(existingRefreshToken -> {
//             refreshTokenService.blacklistToken(existingRefreshToken.getToken());
//         });

//         // Crear y guardar el nuevo token de refresh
//         RefreshToken refreshTokenEntity = new RefreshToken();
//         refreshTokenEntity.setToken(refreshToken);
//         refreshTokenEntity.setUserId(String.valueOf(user.getId()));
//         refreshTokenEntity.setExpiresAt(Instant.now().plusMillis(jwtUtils.getRefreshExpirationMs()));
//         refreshTokenEntity.setCreatedAt(Instant.now());
//         refreshTokenRepository.save(refreshTokenEntity);

//         return new LoginResponse(accessToken, refreshToken);
//     }


//     // Verificar si el usuario tiene el rol ADMIN
//     private boolean userHasAdminRole(User user) {
//         return user.getRoles().stream()
//                 .anyMatch(role -> role.getName().equals("ADMIN"));
//     }


//     private LoginResponse authenticateAdminInLaravel(LoginRequest loginRequest) {
//         Mono<LoginResponse> loginResponseMono = webClient.post()
//                 .uri("/api/admin/auth/login")
//                 .bodyValue(loginRequest)
//                 .retrieve()
//                 .bodyToMono(LoginResponse.class);

//         LoginResponse loginResponse = loginResponseMono.block();

//         if (loginResponse == null) {
//             throw new IllegalArgumentException("Failed to authenticate admin in Laravel");
//         }

//         return loginResponse;
//     }


//     private boolean isValidEmail(String email) {
//         String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
//         Pattern pattern = Pattern.compile(emailRegex);
//         return pattern.matcher(email).matches();
//     }

//     public User getUserByEmail(String email) {
//         return userRepository.findByEmail(email)
//                 .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
//     }
// }
