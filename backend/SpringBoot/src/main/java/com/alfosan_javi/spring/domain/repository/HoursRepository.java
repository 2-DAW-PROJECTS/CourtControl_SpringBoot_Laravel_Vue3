package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Hours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoursRepository extends JpaRepository<Hours, Long> {
    // Este repositorio se puede personalizar con métodos adicionales si es necesario
}
