package com.alfosan_javi.spring.api.controller.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingLessonDTO;
import com.alfosan_javi.spring.domain.service.bookings.BookingLessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings/lessons")
@CrossOrigin(origins = {"http://localhost:8081", "http://localhost:3000"})
public class BookingLessonController {

    @Autowired
    private BookingLessonService bookingLessonService;

    @GetMapping
    public List<BookingLessonDTO> getAllLessons() {
        return bookingLessonService.getAllLessons();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingLessonDTO> getLessonById(@PathVariable Long id) {
        return bookingLessonService.getLessonById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookingLessonDTO> createLesson(@RequestHeader("Authorization") String token, @RequestBody BookingLessonDTO bookingLessonDTO) {
        // Se pasa el token para extraer id_user y email
        BookingLessonDTO createdLesson = bookingLessonService.createLesson(token, bookingLessonDTO);
        return ResponseEntity.status(201).body(createdLesson);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLesson(@PathVariable Long id) {
        if (bookingLessonService.deleteLesson(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
