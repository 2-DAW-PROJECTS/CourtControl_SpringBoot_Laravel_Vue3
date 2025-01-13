package com.alfosan_javi.spring.domain.service.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingLesson;
import com.alfosan_javi.spring.domain.repository.bookings.BookingLessonRepository;
import com.alfosan_javi.spring.domain.service.JwtService;
import com.alfosan_javi.spring.domain.service.UserService;
import com.alfosan_javi.spring.api.dto.bookings.BookingLessonDTO;
import com.alfosan_javi.spring.domain.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingLessonService {

    @Autowired
    private BookingLessonRepository bookingLessonRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    public List<BookingLessonDTO> getAllLessons() {
        List<BookingLesson> lessons = bookingLessonRepository.findAll();
        return lessons.stream()
                      .map(BookingLessonDTO::new)
                      .toList();  // Usamos el constructor que convierte BookingLesson a BookingLessonDTO
    }

    public Optional<BookingLessonDTO> getLessonById(Long id) {
        Optional<BookingLesson> lesson = bookingLessonRepository.findById(id);
        return lesson.map(BookingLessonDTO::new);  // Si existe, la convertimos a DTO
    }

    public BookingLessonDTO createLesson(String token, BookingLessonDTO bookingLessonDTO) {
        // Aseguramos que el token esté limpio y sin espacios extra
        token = token.replace("Bearer ", "").trim();  // Elimina "Bearer " y los posibles espacios al principio y final
        
        // Extraer el email desde el token JWT
        String email = jwtService.extractEmail(token);
        
        Long userId;
        try {
            userId = userService.getUserByEmail(email).getId();
        } catch (UserNotFoundException e) {
            throw new RuntimeException("User not found with email: " + email);
        }

        // Crear la lección
        BookingLesson bookingLesson = new BookingLesson();
        bookingLesson.setIdDay(bookingLessonDTO.getIdDay());
        bookingLesson.setIdMonth(bookingLessonDTO.getIdMonth());
        bookingLesson.setIdLesson(bookingLessonDTO.getIdLesson());
        bookingLesson.setCapacity(bookingLessonDTO.getCapacity());
        bookingLesson.setCurrentCapacity(bookingLessonDTO.getCurrentCapacity());
        bookingLesson.setIsClosed(bookingLessonDTO.getCurrentCapacity() >= bookingLessonDTO.getCapacity());
        bookingLesson.setEmail(email);
        bookingLesson.setIdUser(userId);
        bookingLesson.setCreatedAt(LocalDateTime.now());
        bookingLesson.setUpdatedAt(LocalDateTime.now());

        // Guardar la lección en la base de datos
        BookingLesson savedLesson = bookingLessonRepository.save(bookingLesson);

        return new BookingLessonDTO(savedLesson);
    }

public BookingLessonDTO updateLesson(Long id, BookingLessonDTO bookingLessonDTO) {
    if (id == null) {
        throw new RuntimeException("The id must not be null");  // Verifica que el ID no sea nulo
    }

    Optional<BookingLesson> existingLessonOpt = bookingLessonRepository.findById(id);
    if (existingLessonOpt.isEmpty()) {
        throw new RuntimeException("Lesson not found with id: " + id);  // Asegúrate de que la lección exista
    }

    BookingLesson existingLesson = existingLessonOpt.get();
    existingLesson.setIdDay(bookingLessonDTO.getIdDay());
    existingLesson.setIdMonth(bookingLessonDTO.getIdMonth());
    existingLesson.setIdLesson(bookingLessonDTO.getIdLesson());
    existingLesson.setCapacity(bookingLessonDTO.getCapacity());
    existingLesson.setCurrentCapacity(bookingLessonDTO.getCurrentCapacity());
    existingLesson.setIsClosed(bookingLessonDTO.getCurrentCapacity() >= bookingLessonDTO.getCapacity());
    existingLesson.setEmail(bookingLessonDTO.getEmail());
    existingLesson.setUpdatedAt(LocalDateTime.now());

    // Guardar la lección actualizada
    BookingLesson updatedLesson = bookingLessonRepository.save(existingLesson);
    return new BookingLessonDTO(updatedLesson);
}


    public boolean deleteLesson(Long id) {
        if (bookingLessonRepository.existsById(id)) {
            bookingLessonRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
