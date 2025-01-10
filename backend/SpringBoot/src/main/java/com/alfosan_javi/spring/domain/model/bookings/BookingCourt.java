package com.alfosan_javi.spring.domain.model.bookings;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings_courts")
@Data
public class BookingCourt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_day", nullable = false)
    private int idDay;

    @Column(name = "id_hour", nullable = false)
    private int idHour;

    @Column(name = "id_month", nullable = false)
    private int idMonth;

    @Column(name = "id_court", nullable = false)
    private int idCourt;

    // Cambiar de 'Long' a 'String' y hacerlo email
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
