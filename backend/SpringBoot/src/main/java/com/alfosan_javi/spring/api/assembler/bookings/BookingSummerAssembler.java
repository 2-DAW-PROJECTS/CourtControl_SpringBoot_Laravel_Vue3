// package com.alfosan_javi.spring.api.assembler.bookings;

// import com.alfosan_javi.spring.api.dto.bookings.BookingSummerDTO;
// import com.alfosan_javi.spring.domain.model.bookings.BookingSummer;
// import org.springframework.stereotype.Component;

// @Component
// public class BookingSummerAssembler {

//     public BookingSummerDTO toDTO(BookingSummer bookingSummer) {
//         BookingSummerDTO dto = new BookingSummerDTO();
//         dto.setId(bookingSummer.getId());
//         dto.setIdDay(bookingSummer.getIdDay());
//         dto.setIdMonth(bookingSummer.getIdMonth());
//         dto.setIdSummer(bookingSummer.getIdSummer());
//         dto.setIdUser(bookingSummer.getIdUser());
//         dto.setCapacity(bookingSummer.getCapacity());
//         dto.setCurrentCapacity(bookingSummer.getCurrentCapacity());
//         dto.setIsClosed(bookingSummer.isClosed());
//         dto.setCreatedAt(bookingSummer.getCreatedAt());
//         dto.setUpdatedAt(bookingSummer.getUpdatedAt());
//         return dto;
//     }
// }
