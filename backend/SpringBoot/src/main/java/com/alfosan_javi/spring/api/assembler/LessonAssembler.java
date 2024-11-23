package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.model.LessonModel;
import com.alfosan_javi.spring.domain.model.Lesson;
import org.springframework.stereotype.Component;

@Component
public class LessonAssembler {

    public LessonModel toModel(Lesson lesson) {
        LessonModel model = new LessonModel();
        model.setId(lesson.getId());
        model.setNameClass(lesson.getNameClass());
        model.setActive(lesson.isActive());
        model.setVacancies(lesson.getVacancies());
        model.setDays(lesson.getDays());
        model.setTime(lesson.getTime());
        model.setDuration(lesson.getDuration());
        model.setBaseCost(lesson.getBaseCost());
        model.setLevel(lesson.getLevel());
        model.setCoach(lesson.getCoach());
        model.setMaxCapacity(lesson.getMaxCapacity());
        model.setDescription(lesson.getDescription());
        return model;
    }

    public Lesson toEntity(LessonModel model) {
        Lesson lesson = new Lesson();
        lesson.setId(model.getId());
        lesson.setNameClass(model.getNameClass());
        lesson.setActive(model.isActive());
        lesson.setVacancies(model.getVacancies());
        lesson.setDays(model.getDays());
        lesson.setTime(model.getTime());
        lesson.setDuration(model.getDuration());
        lesson.setBaseCost(model.getBaseCost());
        lesson.setLevel(model.getLevel());
        lesson.setCoach(model.getCoach());
        lesson.setMaxCapacity(model.getMaxCapacity());
        lesson.setDescription(model.getDescription());
        return lesson;
    }
}
