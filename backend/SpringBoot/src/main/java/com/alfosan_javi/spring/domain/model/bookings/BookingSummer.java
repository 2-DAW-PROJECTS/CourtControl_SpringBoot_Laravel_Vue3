package com.alfosan_javi.spring.domain.model.bookings;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings_summers")
@Getter
@Setter
public class BookingSummer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_day", nullable = false)
    private int idDay;

    @Column(name = "id_month", nullable = false)
    private int idMonth;

    @Column(name = "id_summer", nullable = false)
    private int idSummer;

    @Column(name = "id_user", nullable = false)
    private Long idUser;

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

    public boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(boolean isClosed) {
        this.isClosed = isClosed;
    }
}
