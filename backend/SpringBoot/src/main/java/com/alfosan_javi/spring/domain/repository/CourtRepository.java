package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Court;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourtRepository extends JpaRepository<Court, Long> {
}
