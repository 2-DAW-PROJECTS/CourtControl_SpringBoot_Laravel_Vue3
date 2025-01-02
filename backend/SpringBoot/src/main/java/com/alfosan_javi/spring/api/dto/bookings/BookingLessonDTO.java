package com.alfosan_javi.spring.api.dto.bookings;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingLessonDTO {
    private Long id;
    private int idDay;
    private int idMonth;
    private int idLesson;
    private Long idUser;
    private int capacity;
    private int currentCapacity;
    private boolean isClosed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Agregar getIsClosed y setIsClosed para compatibilidad
    public boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }
}
