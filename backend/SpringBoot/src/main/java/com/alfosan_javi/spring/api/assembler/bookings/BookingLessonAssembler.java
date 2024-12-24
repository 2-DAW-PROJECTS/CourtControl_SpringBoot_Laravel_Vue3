// package com.alfosan_javi.spring.api.assembler.bookings;

// import com.alfosan_javi.spring.api.dto.bookings.BookingLessonDTO;
// import com.alfosan_javi.spring.domain.model.bookings.BookingLesson;
// import org.springframework.stereotype.Component;

// @Component
// public class BookingLessonAssembler {

//     public BookingLessonDTO toDTO(BookingLesson bookingLesson) {
//         BookingLessonDTO dto = new BookingLessonDTO();
//         dto.setId(bookingLesson.getId());
//         dto.setIdDay(bookingLesson.getIdDay());
//         dto.setIdMonth(bookingLesson.getIdMonth());
//         dto.setIdLesson(bookingLesson.getIdLesson());
//         dto.setIdUser(bookingLesson.getIdUser());
//         dto.setCapacity(bookingLesson.getCapacity());
//         dto.setCurrentCapacity(bookingLesson.getCurrentCapacity());
//         dto.setIsClosed(bookingLesson.isClosed());
//         dto.setCreatedAt(bookingLesson.getCreatedAt());
//         dto.setUpdatedAt(bookingLesson.getUpdatedAt());
//         return dto;
//     }
// }
