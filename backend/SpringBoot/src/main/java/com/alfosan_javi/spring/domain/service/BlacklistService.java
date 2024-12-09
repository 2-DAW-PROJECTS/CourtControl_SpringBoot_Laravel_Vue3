package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Blacklist;
import com.alfosan_javi.spring.domain.repository.BlacklistRepository;
import com.alfosan_javi.spring.api.assembler.BlacklistAssembler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final BlacklistAssembler blacklistAssembler;

    public BlacklistService(BlacklistRepository blacklistRepository, BlacklistAssembler blacklistAssembler) {
        this.blacklistRepository = blacklistRepository;
        this.blacklistAssembler = blacklistAssembler;
    }

    public void addTokenToBlacklist(String userId, String token) {
        // Verificar si el token ya está en la lista negra
        if (!blacklistRepository.existsByToken(token)) {
            Blacklist blacklist = new Blacklist();
            blacklist.setUserId(userId);
            blacklist.setToken(token);
            blacklist.setCreatedAt(LocalDateTime.now());
            blacklist.setExpiresAt(LocalDateTime.now().plusDays(1));

            // Guardar el token en la base de datos
            blacklistRepository.save(blacklist);
        }
    }
}
