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

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    // Constructor
    public AuthService(UserRepository userRepository, JwtUtils jwtUtils,
                       RefreshTokenRepository refreshTokenRepository, RefreshTokenService refreshTokenService,
                       PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public void register(RegisterRequest registerRequest) {
        // Validar email
        if (registerRequest.getEmail() == null || !isValidEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Verificar si el correo ya está en uso
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        // Validar la contraseña
        if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        // Crear un nuevo usuario
        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setName(registerRequest.getName());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        // Obtener el rol "CLIENTE", si no existe, crearlo
        Role clienteRole = roleRepository.findByName("ROLE_CLIENT")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_CLIENT");
                    return roleRepository.save(newRole);
                });

        clienteRole.getPermissions().size();

        // Asignar el rol "CLIENTE" al usuario
        newUser.getRoles().add(clienteRole);

        userRepository.save(newUser);
    }

    // Método para autenticar al usuario
    public LoginResponse authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String accessToken = jwtUtils.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalStateException("Generated refresh token is invalid");
        }

        Optional<RefreshToken> existingRefreshTokenOpt = refreshTokenRepository.findTopByUserIdOrderByCreatedAtDesc(String.valueOf(user.getId()));

        existingRefreshTokenOpt.ifPresent(existingRefreshToken -> {
            refreshTokenService.blacklistToken(existingRefreshToken.getToken());
        });

        // Guardar el nuevo refresh token en la base de datos
        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setUserId(String.valueOf(user.getId()));
        refreshTokenEntity.setExpiresAt(Instant.now().plusMillis(jwtUtils.getRefreshExpirationMs()));
        refreshTokenEntity.setCreatedAt(Instant.now());
        refreshTokenRepository.save(refreshTokenEntity);

        return new LoginResponse(accessToken, refreshToken);
    }

    // Método para rotar un refresh token
    public String rotateRefreshToken(String oldRefreshToken) {
        RefreshToken oldTokenEntity = refreshTokenRepository.findByToken(oldRefreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Invalid refresh token"));

        if (oldTokenEntity.getExpiresAt().isBefore(Instant.now())) {
            refreshTokenService.blacklistToken(oldRefreshToken);
            throw new IllegalArgumentException("Refresh token expired and added to blacklist");
        }

        refreshTokenService.blacklistToken(oldRefreshToken);

        String newRefreshToken = jwtUtils.generateRefreshToken(oldTokenEntity.getUserId());

        RefreshToken newTokenEntity = new RefreshToken();
        newTokenEntity.setToken(newRefreshToken);
        newTokenEntity.setUserId(oldTokenEntity.getUserId());
        newTokenEntity.setExpiresAt(Instant.now().plusMillis(jwtUtils.getRefreshExpirationMs()));
        newTokenEntity.setCreatedAt(Instant.now());
        refreshTokenRepository.save(newTokenEntity);

        return newRefreshToken;
    }

    // Método para validar formato de email
    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }
}
