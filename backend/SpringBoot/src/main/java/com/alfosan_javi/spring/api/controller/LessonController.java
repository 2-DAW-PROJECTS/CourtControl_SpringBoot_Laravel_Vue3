package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.LessonAssembler;
import com.alfosan_javi.spring.api.dto.LessonDTO;
import com.alfosan_javi.spring.domain.model.Lesson;
import com.alfosan_javi.spring.domain.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @Autowired
    private LessonAssembler lessonAssembler;

    // Obtener todas las lecciones o filtrar por sportIds
    @GetMapping
    public List<LessonDTO> getFilteredLessons(
            @RequestParam(required = false) List<Long> sportIds) {
        List<Lesson> lessons = (sportIds == null || sportIds.isEmpty())
                ? lessonService.getAllLessons()
                : lessonService.getFilteredLessonsBySport(sportIds);

        return lessons.stream()
                .map(lessonAssembler::toModel)
                .collect(Collectors.toList());
    }

    // Obtener una lección por ID
    @GetMapping("/{id}")
    public ResponseEntity<LessonDTO> getLessonById(@PathVariable long id) {
        return lessonService.getLessonById(id)
                .map(lesson -> ResponseEntity.ok(lessonAssembler.toModel(lesson)))
                .orElse(ResponseEntity.status(404).build());
    }

    // Crear una nueva lección
    @PostMapping
    public ResponseEntity<LessonDTO> createLesson(@RequestBody LessonDTO lessonDTO) {
        Lesson lesson = lessonAssembler.toEntity(lessonDTO);
        Lesson createdLesson = lessonService.saveLesson(lesson);
        return ResponseEntity.status(201).body(lessonAssembler.toModel(createdLesson));
    }

    // Actualizar una lección existente
    // @PutMapping("/{id}")
    // public ResponseEntity<LessonDTO> updateLesson(@PathVariable long id, @RequestBody LessonDTO lessonDTO) {
    //     if (!lessonService.existsById(id)) {
    //         return ResponseEntity.status(404).build();
    //     }
    //     lessonDTO.setId(id);
    //     Lesson updatedLesson = lessonService.saveLesson(lessonAssembler.toEntity(lessonDTO));
    //     return ResponseEntity.ok(lessonAssembler.toModel(updatedLesson));
    // }
    @PutMapping("/{id}")
    public ResponseEntity<LessonDTO> updateLesson(@PathVariable long id, @RequestBody LessonDTO lessonDTO) {
        Lesson updatedLesson = lessonService.updateLesson(id, lessonDTO);
        if (updatedLesson == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(lessonAssembler.toModel(updatedLesson));
    }

    // Eliminar una lección por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable long id) {
        if (!lessonService.deleteLesson(id)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.noContent().build();
    }
}