package com.alfosan_javi.spring.api.assembler.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingSummerDTO;
import com.alfosan_javi.spring.domain.model.bookings.BookingSummer;
import org.springframework.stereotype.Component;

@Component
public class BookingSummerAssembler {

    public BookingSummerDTO toDTO(BookingSummer bookingSummer) {
        BookingSummerDTO dto = new BookingSummerDTO();
        dto.setId(bookingSummer.getId());
        dto.setIdDay(bookingSummer.getIdDay());
        dto.setIdMonth(bookingSummer.getIdMonth());
        dto.setIdSummer(bookingSummer.getIdSummer());
        dto.setIdUser(bookingSummer.getIdUser());
        dto.setCapacity(bookingSummer.getCapacity());
        dto.setCurrentCapacity(bookingSummer.getCurrentCapacity());
        dto.setIsClosed(bookingSummer.getIsClosed());
        dto.setCreatedAt(bookingSummer.getCreatedAt());
        dto.setUpdatedAt(bookingSummer.getUpdatedAt());
        return dto;
    }

    public BookingSummer toEntity(BookingSummerDTO dto) {
        BookingSummer bookingSummer = new BookingSummer();
        bookingSummer.setId(dto.getId());
        bookingSummer.setIdDay(dto.getIdDay());
        bookingSummer.setIdMonth(dto.getIdMonth());
        bookingSummer.setIdSummer(dto.getIdSummer());
        bookingSummer.setIdUser(dto.getIdUser());
        bookingSummer.setCapacity(dto.getCapacity());
        bookingSummer.setCurrentCapacity(dto.getCurrentCapacity());
        bookingSummer.setIsClosed(dto.getIsClosed());
        
        // Evita sobrescribir valores nulos
        if (dto.getCreatedAt() != null) {
            bookingSummer.setCreatedAt(dto.getCreatedAt());
        }
        if (dto.getUpdatedAt() != null) {
            bookingSummer.setUpdatedAt(dto.getUpdatedAt());
        }
        
        return bookingSummer;
    }

}
