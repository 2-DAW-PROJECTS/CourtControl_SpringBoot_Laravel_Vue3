package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Lesson;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;  // Cambio aquí a jakarta
import java.util.List;

public class LessonSpecifications {

    public static Specification<Lesson> hasSportIdIn(List<Long> sportIds) {
        return (root, query, criteriaBuilder) -> {
            if (sportIds == null || sportIds.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return root.get("sport").get("id").in(sportIds);
        };
    }
}
