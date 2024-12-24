package com.alfosan_javi.spring.domain.service.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingSummer;
import com.alfosan_javi.spring.domain.repository.bookings.BookingSummerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingSummerService {

    @Autowired
    private BookingSummerRepository bookingSummerRepository;

    public List<BookingSummer> getAllBookings() {
        return bookingSummerRepository.findAll();
    }

    public Optional<BookingSummer> getBookingById(long id) {
        return bookingSummerRepository.findById(id);
    }

    public BookingSummer createBooking(BookingSummer bookingSummer) {
        return bookingSummerRepository.save(bookingSummer);
    }

    public boolean deleteBooking(long id) {
        if (bookingSummerRepository.existsById(id)) {
            bookingSummerRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
