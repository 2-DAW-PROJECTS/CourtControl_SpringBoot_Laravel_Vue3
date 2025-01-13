package com.alfosan_javi.spring.api.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.security.Key;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.accessTokenExpirationMs}")
    private long jwtExpirationMs;

    @Value("${jwt.refreshTokenExpirationMs}")
    private long refreshExpirationMs;

    private Key secretKey;

    @PostConstruct
    public void init() {
        if (jwtSecret != null && !jwtSecret.isEmpty()) {
            if (jwtSecret.length() < 64) {
                logger.warn("La clave secreta proporcionada es muy corta. Se utilizará una clave de 512 bits generada automáticamente.");
            }
            this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        } else {
            logger.info("No se proporcionó clave secreta en el archivo de configuración. Generando una clave secreta de 512 bits.");
            this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        }
    }

    public String generateAccessToken(String email) {
        try {
            return Jwts.builder()
                    .setSubject(email)  // Aquí usamos el email como el subject
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(secretKey, SignatureAlgorithm.HS512)
                    .compact();
        } catch (Exception e) {
            logger.error("Error generating access token for user: {}. Error: {}", email, e.getMessage());
            throw new RuntimeException("Error generating access token", e);
        }
    }

    public String generateRefreshToken(String email) {
        try {
            String refreshToken = Jwts.builder()
                    .setSubject(email)  // Usamos el email también en el refresh token
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationMs))
                    .signWith(secretKey, SignatureAlgorithm.HS512)
                    .compact();

            // Verificar que el token generado no sea nulo o vacío
            if (refreshToken == null || refreshToken.isEmpty()) {
                throw new IllegalStateException("Generated refresh token is invalid or empty");
            }

            return refreshToken;
        } catch (Exception e) {
            logger.error("Error generating refresh token for user: {}. Error: {}", email, e.getMessage());
            throw new RuntimeException("Error generating refresh token", e);
        }
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            logger.warn("JWT token expired: {}", token);
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {}", token);
        } catch (MalformedJwtException e) {
            logger.error("Malformed JWT token: {}", token);
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", token);
        } catch (Exception e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }

    public String getUserEmailFromJwtToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();  // Devuelve el correo que está almacenado como "subject"
        } catch (JwtException e) {
            logger.error("Error extracting email from JWT token: {}", e.getMessage());
            throw new RuntimeException("Error extracting email from JWT token", e);
        }
    }

    // Agrega este método
    public long getRefreshExpirationMs() {
        return refreshExpirationMs;
    }

    public String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
