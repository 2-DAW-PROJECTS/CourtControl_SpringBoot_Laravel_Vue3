package com.alfosan_javi.spring.domain.model.bookings;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "booking_lessons")
@Data
public class BookingLesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_day", nullable = false)
    private int idDay;

    @Column(name = "id_month", nullable = false)
    private int idMonth;

    @Column(name = "id_lesson", nullable = false)
    private int idLesson;

    @Column(name = "id_user", nullable = false)
    private int idUser;

    @Column(name = "capacity", nullable = false)
    private int capacity;

    @Column(name = "current_capacity", nullable = false)
    private int currentCapacity;

    @Column(name = "is_closed", nullable = false)
    private boolean isClosed;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
