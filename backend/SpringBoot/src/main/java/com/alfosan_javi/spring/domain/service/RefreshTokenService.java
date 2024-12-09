package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.RefreshToken;
import com.alfosan_javi.spring.domain.repository.RefreshTokenRepository;
import com.alfosan_javi.spring.domain.model.Blacklist;
import com.alfosan_javi.spring.domain.repository.BlacklistRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final BlacklistRepository blacklistRepository; // <-- Declare the BlacklistRepository

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, BlacklistRepository blacklistRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.blacklistRepository = blacklistRepository; // <-- Inject the BlacklistRepository
    }

    // Crear un nuevo RefreshToken
    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(userId.toString());
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiresAt(Instant.now().plusMillis(86400000));
        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    // Mover un token a la lista negra
    public void blacklistToken(String token) {
        Optional<RefreshToken> refreshToken = findByToken(token);
        refreshToken.ifPresent(r -> {
            // Expirar el token al moverlo a la lista negra
            r.setExpiresAt(Instant.now());
            refreshTokenRepository.save(r);  // Guardar la actualización

            // Mover el token a la lista negra (blacklist)
            Blacklist blacklist = new Blacklist();
            blacklist.setUserId(r.getUserId());
            blacklist.setToken(token);
            blacklist.setCreatedAt(LocalDateTime.now());
            blacklist.setExpiresAt(LocalDateTime.now().plusDays(1));
            blacklistRepository.save(blacklist);
        });
    }
}
