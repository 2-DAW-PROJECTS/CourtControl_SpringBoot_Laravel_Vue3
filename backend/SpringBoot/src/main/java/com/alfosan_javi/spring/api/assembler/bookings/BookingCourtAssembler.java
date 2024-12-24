package com.alfosan_javi.spring.api.assembler.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingCourtDTO;
import com.alfosan_javi.spring.domain.model.bookings.BookingCourt;
import org.springframework.stereotype.Component;

@Component
public class BookingCourtAssembler {

    public BookingCourtDTO toDTO(BookingCourt bookingCourt) {
        BookingCourtDTO dto = new BookingCourtDTO();
        dto.setId(bookingCourt.getId());
        dto.setIdDay(bookingCourt.getIdDay());
        dto.setIdHour(bookingCourt.getIdHour());
        dto.setIdMonth(bookingCourt.getIdMonth());
        dto.setIdCourt(bookingCourt.getIdCourt());
        dto.setIdUser(bookingCourt.getIdUser());
        dto.setCreatedAt(bookingCourt.getCreatedAt());
        dto.setUpdatedAt(bookingCourt.getUpdatedAt());
        return dto;
    }

    public BookingCourt toEntity(BookingCourtDTO dto) {
        BookingCourt bookingCourt = new BookingCourt();
        bookingCourt.setId(dto.getId());
        bookingCourt.setIdDay(dto.getIdDay());
        bookingCourt.setIdHour(dto.getIdHour());
        bookingCourt.setIdMonth(dto.getIdMonth());
        bookingCourt.setIdCourt(dto.getIdCourt());
        bookingCourt.setIdUser(dto.getIdUser());
        bookingCourt.setCreatedAt(dto.getCreatedAt());
        bookingCourt.setUpdatedAt(dto.getUpdatedAt());
        return bookingCourt;
    }
}
