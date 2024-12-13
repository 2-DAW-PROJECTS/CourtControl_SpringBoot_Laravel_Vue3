package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.response.LoginRequest;
import com.alfosan_javi.spring.api.response.LoginResponse;
import com.alfosan_javi.spring.api.response.RegisterRequest;
import com.alfosan_javi.spring.domain.service.AuthService;
import com.alfosan_javi.spring.domain.model.Role;
import com.alfosan_javi.spring.domain.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.alfosan_javi.spring.api.security.jwt.JwtUtils;
import javax.servlet.http.HttpServletRequest;  // Importación correcta de HttpServletRequest

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtils jwtUtils;

    public AuthController(AuthService authService, JwtUtils jwtUtils) {
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            LoginResponse response = authService.authenticate(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/profile")
    public ResponseEntity<?> getProfile(HttpServletRequest request) {
        // Obtener el token desde los encabezados
        String accessToken = jwtUtils.getJwtFromRequest(request);

        if (accessToken == null || accessToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Access token is required");
        }

        try {
            // Obtener el email del token
            String email = jwtUtils.getUserEmailFromJwtToken(accessToken);

            if (email == null || email.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
            }

            // Obtener el usuario por email
            User user = authService.getUserByEmail(email);

            // Construir el perfil del usuario
            Map<String, Object> profile = new HashMap<>();
            profile.put("email", user.getEmail());
            profile.put("name", user.getName());
            profile.put("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));

            return ResponseEntity.ok(profile);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
        }
    }
}
