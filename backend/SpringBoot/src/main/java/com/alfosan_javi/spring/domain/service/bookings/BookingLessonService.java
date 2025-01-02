package com.alfosan_javi.spring.domain.service.bookings;

import com.alfosan_javi.spring.api.assembler.bookings.BookingLessonAssembler;
import com.alfosan_javi.spring.api.dto.bookings.BookingLessonDTO;
import com.alfosan_javi.spring.domain.model.bookings.BookingLesson;
import com.alfosan_javi.spring.domain.repository.bookings.BookingLessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingLessonService {

    @Autowired
    private BookingLessonRepository bookingLessonRepository;

    @Autowired
    private BookingLessonAssembler bookingLessonAssembler;

    public List<BookingLessonDTO> getAllLessons() {
        return bookingLessonRepository.findAll()
                .stream()
                .map(bookingLessonAssembler::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<BookingLessonDTO> getLessonById(Long id) {
        return bookingLessonRepository.findById(id)
                .map(bookingLessonAssembler::toDTO);
    }

    public BookingLessonDTO createLesson(BookingLessonDTO bookingLessonDTO) {
        BookingLesson bookingLesson = bookingLessonAssembler.toEntity(bookingLessonDTO);
        bookingLesson.setCreatedAt(LocalDateTime.now());
        bookingLesson.setUpdatedAt(LocalDateTime.now());
        bookingLesson.setIsClosed(bookingLesson.getCurrentCapacity() >= bookingLesson.getCapacity());

        BookingLesson savedLesson = bookingLessonRepository.save(bookingLesson);
        return bookingLessonAssembler.toDTO(savedLesson);
    }

    public BookingLessonDTO updateLesson(Long id, BookingLessonDTO bookingLessonDTO) {
        Optional<BookingLesson> existingLesson = bookingLessonRepository.findById(id);
        if (!existingLesson.isPresent()) {
            return null;
        }

        BookingLesson lesson = existingLesson.get();
        lesson.setIdDay(bookingLessonDTO.getIdDay());
        lesson.setIdMonth(bookingLessonDTO.getIdMonth());
        lesson.setIdLesson(bookingLessonDTO.getIdLesson());
        lesson.setIdUser(bookingLessonDTO.getIdUser());
        lesson.setCapacity(bookingLessonDTO.getCapacity());
        lesson.setCurrentCapacity(bookingLessonDTO.getCurrentCapacity());
        lesson.setIsClosed(lesson.getCurrentCapacity() >= lesson.getCapacity());
        lesson.setUpdatedAt(LocalDateTime.now());

        BookingLesson updatedLesson = bookingLessonRepository.save(lesson);
        return bookingLessonAssembler.toDTO(updatedLesson);
    }

    public boolean deleteLesson(Long id) {
        if (bookingLessonRepository.existsById(id)) {
            bookingLessonRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
