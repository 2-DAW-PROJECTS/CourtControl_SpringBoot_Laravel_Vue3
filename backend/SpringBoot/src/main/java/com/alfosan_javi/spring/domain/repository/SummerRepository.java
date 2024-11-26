package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Summer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SummerRepository extends JpaRepository<Summer, Long> {

    @Query("SELECT s FROM Summer s WHERE (:sportIds IS NULL OR s.sport.id IN :sportIds)")
    List<Summer> findBySportIds(@Param("sportIds") List<Long> sportIds);

}
