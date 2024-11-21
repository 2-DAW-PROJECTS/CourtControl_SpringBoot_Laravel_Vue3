package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Sport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SportRepository extends JpaRepository<Sport, Long> {
}
