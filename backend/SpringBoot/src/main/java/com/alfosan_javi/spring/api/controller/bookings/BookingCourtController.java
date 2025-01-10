package com.alfosan_javi.spring.api.controller.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingCourtDTO;
import com.alfosan_javi.spring.domain.service.bookings.BookingCourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

// @RestController
// @RequestMapping("/api/bookings/court")
// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/bookings/court")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8081"})
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
        
        // Si el usuario no está autenticado, retornamos un error 401
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        // Obtenemos el email del usuario autenticado desde el token
        String email = authentication.getName();  // 'getName' devuelve el nombre de usuario que corresponde al email en el token

        // Modificamos el BookingCourtDTO para incluir el email
        bookingCourtDTO.setEmail(email);  // Asignamos el email al DTO

        // Llamamos al servicio para crear la reserva de la cancha
        BookingCourtDTO createdBooking = bookingCourtService.createBooking(bookingCourtDTO);

        return ResponseEntity.status(201).body(createdBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookingCourtDTO> updateBooking(@PathVariable Long id, @RequestBody BookingCourtDTO bookingCourtDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = authentication.getName(); // Obtener email del token
        BookingCourtDTO updatedBooking = bookingCourtService.updateBooking(id, bookingCourtDTO);
        
        if (updatedBooking == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String email = authentication.getName(); // Obtener email del token
        boolean deleted = bookingCourtService.deleteBooking(id);
        
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/filtered_day")
    public ResponseEntity<List<BookingCourtDTO>> getBookingsByCourtAndDay(@RequestBody FilterRequest filterRequest) {
        // Filtrar las reservas por el idCourt, idDay y idMonth
        List<BookingCourtDTO> bookings = bookingCourtService.getBookingsByCourtAndDayAndMonth(
                filterRequest.getIdCourt(),
                filterRequest.getIdDay(),
                filterRequest.getIdMonth()
        );
        
        if (bookings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(bookings);
    }


    public static class FilterRequest {
        private Long idCourt;
        private int idDay;
        private int idMonth; // Añadir el campo idMonth

        public Long getIdCourt() {
            return idCourt;
        }

        public void setIdCourt(Long idCourt) {
            this.idCourt = idCourt;
        }

        public int getIdDay() {
            return idDay;
        }

        public void setIdDay(int idDay) {
            this.idDay = idDay;
        }

        public int getIdMonth() {  // Añadir el getter para idMonth
            return idMonth;
        }

        public void setIdMonth(int idMonth) {  // Añadir el setter para idMonth
            this.idMonth = idMonth;
        }
    }

}
