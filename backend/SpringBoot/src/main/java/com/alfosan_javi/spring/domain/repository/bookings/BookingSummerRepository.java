package com.alfosan_javi.spring.domain.repository.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingSummer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingSummerRepository extends JpaRepository<BookingSummer, Long> {
}
