package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourtRepository extends JpaRepository<Court, Long>, JpaSpecificationExecutor<Court> {

    @Query("SELECT DISTINCT c.material FROM Court c WHERE c.material IS NOT NULL")
    List<String> findDistinctMaterials();
}
