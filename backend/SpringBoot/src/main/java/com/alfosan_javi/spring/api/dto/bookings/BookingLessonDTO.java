package com.alfosan_javi.spring.api.dto.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingLesson;  // Importación de la clase BookingLesson
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
    private String email;

    // Constructor que toma un BookingLesson y convierte sus campos a DTO
    public BookingLessonDTO(BookingLesson bookingLesson) {
        this.id = bookingLesson.getId();
        this.idDay = bookingLesson.getIdDay();
        this.idMonth = bookingLesson.getIdMonth();
        this.idLesson = bookingLesson.getIdLesson();
        this.idUser = bookingLesson.getIdUser();
        this.capacity = bookingLesson.getCapacity();
        this.currentCapacity = bookingLesson.getCurrentCapacity();
        this.isClosed = bookingLesson.getIsClosed();
        this.createdAt = bookingLesson.getCreatedAt();
        this.updatedAt = bookingLesson.getUpdatedAt();
        this.email = bookingLesson.getEmail();
    }

    // Constructor vacío añadido para permitir crear objetos sin pasar un BookingLesson
    public BookingLessonDTO() {
        // Constructor vacío que permite crear instancias vacías si es necesario
    }

    // Métodos adicionales para compatibilidad con 'isClosed'
    public boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }
}
