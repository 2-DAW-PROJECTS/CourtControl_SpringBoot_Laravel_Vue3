package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {
    boolean existsByToken(String token);
}
