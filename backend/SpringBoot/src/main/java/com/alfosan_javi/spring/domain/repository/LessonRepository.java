package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @Query("SELECT l FROM Lesson l WHERE l.sport.id IN :sportIds")
    List<Lesson> findBySportIds(@Param("sportIds") List<Long> sportIds);
}
