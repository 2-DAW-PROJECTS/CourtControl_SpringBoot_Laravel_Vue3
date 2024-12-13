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
        if (registerRequest.getEmail() == null || !isValidEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Invalid email format");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        if (registerRequest.getPassword() == null || registerRequest.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }

        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setName(registerRequest.getName());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        Role clienteRole = roleRepository.findByName("ROLE_CLIENT")
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName("ROLE_CLIENT");
                    return roleRepository.save(newRole);
                });

        clienteRole.getPermissions().size();

        newUser.getRoles().add(clienteRole);

        userRepository.save(newUser);
    }

    public LoginResponse authenticate(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String accessToken = jwtUtils.generateAccessToken(user.getEmail());  // Usamos el correo
        String refreshToken = jwtUtils.generateRefreshToken(user.getEmail());  // Usamos el correo

        Optional<RefreshToken> existingRefreshTokenOpt = refreshTokenRepository.findTopByUserIdOrderByCreatedAtDesc(String.valueOf(user.getId()));

        existingRefreshTokenOpt.ifPresent(existingRefreshToken -> {
            refreshTokenService.blacklistToken(existingRefreshToken.getToken());
        });

        RefreshToken refreshTokenEntity = new RefreshToken();
        refreshTokenEntity.setToken(refreshToken);
        refreshTokenEntity.setUserId(String.valueOf(user.getId()));
        refreshTokenEntity.setExpiresAt(Instant.now().plusMillis(jwtUtils.getRefreshExpirationMs()));
        refreshTokenEntity.setCreatedAt(Instant.now());
        refreshTokenRepository.save(refreshTokenEntity);

        return new LoginResponse(accessToken, refreshToken);
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
