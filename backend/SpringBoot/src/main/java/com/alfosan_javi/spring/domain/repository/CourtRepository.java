package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CourtRepository extends JpaRepository<Court, Long>, JpaSpecificationExecutor<Court> {
    // Repositorio vacío JpaSpecificationExecutor
}
