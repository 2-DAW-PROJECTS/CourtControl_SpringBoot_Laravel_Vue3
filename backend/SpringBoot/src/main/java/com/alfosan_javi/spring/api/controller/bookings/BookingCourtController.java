package com.alfosan_javi.spring.api.controller.bookings;

import com.alfosan_javi.spring.api.assembler.bookings.BookingCourtAssembler;
import com.alfosan_javi.spring.api.dto.bookings.BookingCourtDTO;
import com.alfosan_javi.spring.domain.model.bookings.BookingCourt;
import com.alfosan_javi.spring.domain.service.bookings.BookingCourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings/courts")
public class BookingCourtController {

    @Autowired
    private BookingCourtService bookingCourtService;

    @Autowired
    private BookingCourtAssembler bookingCourtAssembler;

    @GetMapping
    public List<BookingCourtDTO> getAllBookings() {
        List<BookingCourt> bookings = bookingCourtService.getAllBookings();
        return bookings.stream()
                .map(bookingCourtAssembler::toModel)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingCourtDTO> getBookingById(@PathVariable Long id) {
        return bookingCourtService.getBookingById(id)
                .map(booking -> ResponseEntity.ok(bookingCourtAssembler.toModel(booking)))
                .orElse(ResponseEntity.status(404).build());
    }

    @PostMapping
    public ResponseEntity<BookingCourtDTO> createBooking(@RequestBody BookingCourtDTO bookingCourtDTO) {
        BookingCourt createdBooking = bookingCourtService.createBooking(bookingCourtDTO);
        return ResponseEntity.status(201).body(bookingCourtAssembler.toModel(createdBooking));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        boolean deleted = bookingCourtService.deleteBooking(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
