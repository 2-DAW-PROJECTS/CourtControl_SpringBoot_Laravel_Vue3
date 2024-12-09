package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.response.LoginRequest;
import com.alfosan_javi.spring.api.response.LoginResponse;
import com.alfosan_javi.spring.api.response.RegisterRequest;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.alfosan_javi.spring.domain.model.RefreshToken;
import com.alfosan_javi.spring.domain.repository.RefreshTokenRepository;
import com.alfosan_javi.spring.api.security.jwt.JwtUtils;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.Instant;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;

    // Constructor
    public AuthService(UserRepository userRepository, JwtUtils jwtUtils,
                       RefreshTokenRepository refreshTokenRepository, RefreshTokenService refreshTokenService,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.refreshTokenRepository = refreshTokenRepository;
        this.refreshTokenService = refreshTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    // Método para registrar un nuevo usuario
    public void register(RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setName(registerRequest.getName());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

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

        // Verificar si ya existe un refresh token para este usuario
        Optional<RefreshToken> existingRefreshTokenOpt = refreshTokenRepository.findTopByUserIdOrderByCreatedAtDesc(String.valueOf(user.getId()));

        // Si existe un refresh token, lo movemos a la lista negra
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

}

