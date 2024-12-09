package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);
    
    void deleteByToken(String token);

    Optional<RefreshToken> findTopByUserIdOrderByCreatedAtDesc(String userId);
}
