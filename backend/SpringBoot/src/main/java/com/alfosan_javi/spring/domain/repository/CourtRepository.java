package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Court;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourtRepository extends JpaRepository<Court, Long> {

    @Query("SELECT c FROM Court c WHERE " +
        "(:sportIds IS NULL OR c.sport.id IN :sportIds)")
    List<Court> findBySportIds(
            @Param("sportIds") List<Long> sportIds
    );


}
