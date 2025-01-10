package com.alfosan_javi.spring.api.dto.bookings;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingCourtDTO {

    private Long id;
    private int idDay;
    private int idHour;
    private int idMonth;
    private int idCourt;

    // Cambiar de 'Long' a 'String' para email
    private String email;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
