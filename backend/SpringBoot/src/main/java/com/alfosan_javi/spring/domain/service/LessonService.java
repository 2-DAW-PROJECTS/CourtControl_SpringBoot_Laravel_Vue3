package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Lesson;
import com.alfosan_javi.spring.domain.repository.LessonRepository;
import com.alfosan_javi.spring.domain.repository.LessonSpecifications; // Importar las especificaciones
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }

    public Optional<Lesson> getLessonById(long id) {
        return lessonRepository.findById(id);
    }

    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public boolean deleteLesson(long id) {
        if (lessonRepository.existsById(id)) {
            lessonRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean existsById(long id) {
        return lessonRepository.existsById(id);
    }

    public List<Lesson> getFilteredLessonsBySport(List<Long> sportIds) {
        // Usar especificación para filtrar
        Specification<Lesson> spec = Specification.where(null);
        
        if (sportIds != null && !sportIds.isEmpty()) {
            spec = spec.and(LessonSpecifications.hasSportIdIn(sportIds));
        }
        return lessonRepository.findAll(spec);
    }
}
