package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.response.LoginRequest;
import com.alfosan_javi.spring.api.response.LoginResponse;
import com.alfosan_javi.spring.api.response.RegisterRequest;
import com.alfosan_javi.spring.domain.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
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

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        try {
            authService.register(registerRequest);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error registering user: " + e.getMessage());
        }
    }

    // Endpoint para la rotación de refresh tokens
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody String oldRefreshToken) {
        try {
            String newRefreshToken = authService.rotateRefreshToken(oldRefreshToken);
            return ResponseEntity.ok(new LoginResponse(null, newRefreshToken));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid refresh token: " + e.getMessage());
        }
    }
}
