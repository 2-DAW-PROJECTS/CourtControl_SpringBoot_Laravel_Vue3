package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    @Autowired
    private JwtUtils jwtUtils;

    public String extractEmail(String token) {
        // Limpiar el token de espacios y "Bearer "
        token = token.replace("Bearer ", "").trim();  // Aseguramos que el token no tenga espacios extras
        return jwtUtils.getUserEmailFromJwtToken(token);
    }
}
