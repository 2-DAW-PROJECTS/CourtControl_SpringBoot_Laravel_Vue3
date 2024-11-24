package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Summer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SummerRepository extends JpaRepository<Summer, Long> {
}
