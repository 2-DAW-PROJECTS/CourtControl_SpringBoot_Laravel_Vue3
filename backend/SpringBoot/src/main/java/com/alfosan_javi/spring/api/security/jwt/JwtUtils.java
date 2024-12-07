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

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    // El valor de la clave secreta se inyecta desde el archivo application.properties o como variable de entorno
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.accessTokenExpirationMs}")
    private long jwtExpirationMs;

    @Value("${jwt.refreshTokenExpirationMs}")
    private long refreshExpirationMs;

    // Clave secreta para la firma del JWT
    private Key secretKey;

    // Método que inicializa la clave secreta al arrancar la aplicación
    @PostConstruct
    public void init() {
        if (jwtSecret != null && !jwtSecret.isEmpty()) {
            if (jwtSecret.length() < 64) {
                // Si la clave proporcionada es menor a 512 bits (64 caracteres), logueamos un error
                logger.warn("La clave secreta proporcionada es muy corta. Se utilizará una clave de 512 bits generada automáticamente.");
            }
            // Usamos la clave proporcionada si es suficientemente larga o generamos una de 512 bits
            this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        } else {
            // Generamos una clave secreta de 512 bits si no se proporciona ninguna
            logger.info("No se proporcionó clave secreta en el archivo de configuración. Generando una clave secreta de 512 bits.");
            this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        }
    }

    // Genera un AccessToken con el nombre de usuario
    public String generateAccessToken(String username) {
        try {
            return Jwts.builder()
                    .setSubject(username)  // Definir el nombre de usuario como el "subject"
                    .setIssuedAt(new Date())  // Fecha de emisión
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))  // Fecha de expiración
                    .signWith(secretKey, SignatureAlgorithm.HS512)  // Firmar el JWT con la clave secreta (HS512)
                    .compact();  // Generar el JWT
        } catch (Exception e) {
            logger.error("Error generating access token for user: {}. Error: {}", username, e.getMessage());
            throw new RuntimeException("Error generating access token", e);
        }
    }

    // Genera un RefreshToken con el nombre de usuario
    public String generateRefreshToken(String username) {
        try {
            return Jwts.builder()
                    .setSubject(username)  // Definir el nombre de usuario como el "subject"
                    .setIssuedAt(new Date())  // Fecha de emisión
                    .setExpiration(new Date(System.currentTimeMillis() + refreshExpirationMs))  // Fecha de expiración
                    .signWith(secretKey, SignatureAlgorithm.HS512)  // Firmar el JWT con la clave secreta (HS512)
                    .compact();  // Generar el JWT
        } catch (Exception e) {
            logger.error("Error generating refresh token for user: {}. Error: {}", username, e.getMessage());
            throw new RuntimeException("Error generating refresh token", e);
        }
    }

    // Valida un token JWT
    public boolean validateJwtToken(String token) {
        try {
            // Verificar si el token es válido usando la clave secreta
            Jwts.parserBuilder()
                .setSigningKey(secretKey)  // Usar la clave secreta para validar la firma
                .build()
                .parseClaimsJws(token);  // Parsear el JWT
            return true;  // Si no hay excepción, el token es válido
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
        return false;  // Si ocurre una excepción, el token no es válido
    }

    // Obtiene el nombre de usuario desde el token JWT
    public String getUserNameFromJwtToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)  // Usar la clave secreta para leer el JWT
                    .build()
                    .parseClaimsJws(token)  // Parsear el JWT
                    .getBody()
                    .getSubject();  // Obtener el "subject" (nombre de usuario) del token
        } catch (JwtException e) {
            logger.error("Error extracting username from JWT token: {}", e.getMessage());
            throw new RuntimeException("Error extracting username from JWT token", e);
        }
    }
}
