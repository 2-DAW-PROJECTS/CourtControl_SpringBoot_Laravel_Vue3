package com.alfosan_javi.spring.domain.repository.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingCourt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingCourtRepository extends JpaRepository<BookingCourt, Long>, JpaSpecificationExecutor<BookingCourt> {
    // Métodos adicionales personalizados si es necesario
}
