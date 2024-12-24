package com.alfosan_javi.spring.api.controller.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingCourtDTO;
import com.alfosan_javi.spring.domain.service.bookings.BookingCourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/bookings/court")
public class BookingCourtController {

    @Autowired
    private BookingCourtService bookingCourtService;

    @GetMapping
    public List<BookingCourtDTO> getAllBookings() {
        return bookingCourtService.getAllBookings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingCourtDTO> getBookingById(@PathVariable Long id) {
        return bookingCourtService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BookingCourtDTO> createBooking(@RequestBody BookingCourtDTO bookingCourtDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = authentication.getName(); // Obtener email del token
        BookingCourtDTO createdBooking = bookingCourtService.createBookingWithUser(email, bookingCourtDTO);
        return ResponseEntity.status(201).body(createdBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingCourtDTO> updateBooking(@PathVariable Long id, @RequestBody BookingCourtDTO bookingCourtDTO) {
        BookingCourtDTO updated = bookingCourtService.updateBooking(id, bookingCourtDTO);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (bookingCourtService.deleteBooking(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
