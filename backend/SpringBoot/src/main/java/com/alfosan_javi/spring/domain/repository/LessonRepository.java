package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long>, JpaSpecificationExecutor<Lesson> {
    // Repositorio vacío JpaSpecificationExecutor
}
