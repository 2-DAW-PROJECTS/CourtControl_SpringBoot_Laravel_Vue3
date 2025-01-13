package com.alfosan_javi.spring.api.assembler.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingLessonDTO;
import com.alfosan_javi.spring.domain.model.bookings.BookingLesson;
import org.springframework.stereotype.Component;

@Component
public class BookingLessonAssembler {

    public BookingLessonDTO toDTO(BookingLesson bookingLesson) {
        BookingLessonDTO dto = new BookingLessonDTO();
        dto.setId(bookingLesson.getId());
        dto.setIdDay(bookingLesson.getIdDay());
        dto.setIdMonth(bookingLesson.getIdMonth());
        dto.setIdLesson(bookingLesson.getIdLesson());
        dto.setIdUser(bookingLesson.getIdUser());
        dto.setCapacity(bookingLesson.getCapacity());
        dto.setCurrentCapacity(bookingLesson.getCurrentCapacity());
        dto.setIsClosed(bookingLesson.getIsClosed());
        dto.setCreatedAt(bookingLesson.getCreatedAt());
        dto.setUpdatedAt(bookingLesson.getUpdatedAt());
        dto.setEmail(bookingLesson.getEmail()); 
        return dto;
    }

    public BookingLesson toEntity(BookingLessonDTO dto) {
        BookingLesson bookingLesson = new BookingLesson();
        bookingLesson.setId(dto.getId());
        bookingLesson.setIdDay(dto.getIdDay());
        bookingLesson.setIdMonth(dto.getIdMonth());
        bookingLesson.setIdLesson(dto.getIdLesson());
        bookingLesson.setIdUser(dto.getIdUser());
        bookingLesson.setCapacity(dto.getCapacity());
        bookingLesson.setCurrentCapacity(dto.getCurrentCapacity());
        bookingLesson.setIsClosed(dto.getIsClosed());
        bookingLesson.setCreatedAt(dto.getCreatedAt());
        bookingLesson.setUpdatedAt(dto.getUpdatedAt());
        bookingLesson.setEmail(dto.getEmail());  
        return bookingLesson;
    }
}
