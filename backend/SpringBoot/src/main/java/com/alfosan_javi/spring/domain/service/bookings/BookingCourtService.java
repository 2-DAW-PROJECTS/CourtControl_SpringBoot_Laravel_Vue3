package com.alfosan_javi.spring.domain.service.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingCourtDTO;
import com.alfosan_javi.spring.domain.model.bookings.BookingCourt;
import com.alfosan_javi.spring.domain.repository.bookings.BookingCourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingCourtService {

    @Autowired
    private BookingCourtRepository bookingCourtRepository;

    public List<BookingCourt> getAllBookings() {
        return bookingCourtRepository.findAll();
    }

    public Optional<BookingCourt> getBookingById(Long id) {
        return bookingCourtRepository.findById(id);
    }

    public BookingCourt createBooking(BookingCourtDTO bookingCourtDTO) {
        BookingCourt booking = new BookingCourt();
        booking.setIdDay(bookingCourtDTO.getIdDay());
        booking.setIdHour(bookingCourtDTO.getIdHour());
        booking.setIdMonth(bookingCourtDTO.getIdMonth());
        booking.setIdCourt(bookingCourtDTO.getIdCourt());
        booking.setIdUser(bookingCourtDTO.getIdUser());
        return bookingCourtRepository.save(booking);
    }

    public boolean deleteBooking(Long id) {
        if (bookingCourtRepository.existsById(id)) {
            bookingCourtRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
