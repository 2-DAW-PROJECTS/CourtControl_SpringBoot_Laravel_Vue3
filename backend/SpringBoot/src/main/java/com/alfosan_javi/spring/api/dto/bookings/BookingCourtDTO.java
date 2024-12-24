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
    private int idUser;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
