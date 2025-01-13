package com.alfosan_javi.spring.domain.service.bookings;

import com.alfosan_javi.spring.api.dto.bookings.BookingCourtDTO;
import com.alfosan_javi.spring.api.assembler.bookings.BookingCourtAssembler;
import com.alfosan_javi.spring.domain.model.bookings.BookingCourt;
import com.alfosan_javi.spring.domain.repository.bookings.BookingCourtRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Collections;

@Service
public class BookingCourtService {

    private static final Logger logger = LoggerFactory.getLogger(BookingCourtService.class);

    @Autowired
    private BookingCourtRepository bookingCourtRepository;

    @Autowired
    private BookingCourtAssembler bookingCourtAssembler;

    public List<BookingCourtDTO> getAllBookings() {
        logger.info("Fetching all bookings from the database.");
        return bookingCourtRepository.findAll()
                .stream()
                .map(bookingCourtAssembler::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<BookingCourtDTO> getBookingById(Long id) {
        logger.info("Fetching booking with ID: {}", id);
        return bookingCourtRepository.findById(id)
                .map(bookingCourtAssembler::toDTO);
    }

    public BookingCourtDTO createBooking(BookingCourtDTO bookingCourtDTO) {
        logger.info("Creating booking.");

        BookingCourt bookingCourt = bookingCourtAssembler.toEntity(bookingCourtDTO);
        bookingCourt.setCreatedAt(LocalDateTime.now());
        bookingCourt.setUpdatedAt(LocalDateTime.now());

        try {
            BookingCourt savedBooking = bookingCourtRepository.save(bookingCourt);
            logger.info("Booking created successfully: {}", savedBooking);
            return bookingCourtAssembler.toDTO(savedBooking);
        } catch (Exception e) {
            logger.error("Error occurred while creating booking: {}", e.getMessage(), e);
            throw e;
        }
    }

    public BookingCourtDTO updateBooking(Long id, BookingCourtDTO bookingCourtDTO) {
        logger.info("Updating booking with ID: {}", id);
        Optional<BookingCourt> existingBooking = bookingCourtRepository.findById(id);
        if (!existingBooking.isPresent()) {
            logger.warn("No booking found with ID: {}", id);
            return null;
        }

        BookingCourt bookingCourt = existingBooking.get();
        bookingCourt.setIdDay(bookingCourtDTO.getIdDay());
        bookingCourt.setIdHour(bookingCourtDTO.getIdHour());
        bookingCourt.setIdMonth(bookingCourtDTO.getIdMonth());
        bookingCourt.setIdCourt(bookingCourtDTO.getIdCourt());
        bookingCourt.setEmail(bookingCourtDTO.getEmail());
        bookingCourt.setUpdatedAt(LocalDateTime.now());

        try {
            BookingCourt updatedBooking = bookingCourtRepository.save(bookingCourt);
            logger.info("Booking updated successfully: {}", updatedBooking);
            return bookingCourtAssembler.toDTO(updatedBooking);
        } catch (Exception e) {
            logger.error("Error occurred while updating booking: {}", e.getMessage(), e);
            throw e;
        }
    }

    public boolean deleteBooking(Long id) {
        logger.info("Deleting booking with ID: {}", id);
        Optional<BookingCourt> existingBooking = bookingCourtRepository.findById(id);
        if (!existingBooking.isPresent()) {
            logger.warn("No booking found with ID: {}", id);
            return false;
        }

        BookingCourt bookingCourt = existingBooking.get();

        try {
            bookingCourtRepository.deleteById(id);
            logger.info("Booking with ID: {} deleted successfully.", id);
            return true;
        } catch (Exception e) {
            logger.error("Error occurred while deleting booking: {}", e.getMessage(), e);
            throw e;
        }
    }

    public List<BookingCourtDTO> getBookingsByCourtAndDayAndMonth(Long idCourt, int idDay, int idMonth) {
        logger.info("Fetching bookings for court: {}, day: {}, month: {}", idCourt, idDay, idMonth);
        List<BookingCourt> bookings = bookingCourtRepository.findByIdCourtAndIdDayAndIdMonth(idCourt, idDay, idMonth);

        if (bookings.isEmpty()) {
            return Collections.emptyList();
        }

        return bookings.stream()
                .map(bookingCourtAssembler::toDTO)
                .collect(Collectors.toList());
    }

    public List<BookingCourtDTO> getBookingsByEmail(String email) {
        logger.info("Fetching bookings for user with email: {}", email);
        List<BookingCourt> bookings = bookingCourtRepository.findByEmail(email);

        if (bookings.isEmpty()) {
            return Collections.emptyList();
        }

        return bookings.stream()
                .map(bookingCourtAssembler::toDTO)
                .collect(Collectors.toList());
    }


    public boolean deleteBookingByUser(Long id, String email) {
        logger.info("Attempting to delete booking with ID: {} for user with email: {}", id, email);
        
        // Buscamos la reserva por ID
        Optional<BookingCourt> existingBooking = bookingCourtRepository.findById(id);
        if (!existingBooking.isPresent()) {
            logger.warn("No booking found with ID: {}", id);
            return false;
        }

        BookingCourt bookingCourt = existingBooking.get();

        // Verificamos que la reserva pertenezca al usuario autenticado
        if (!bookingCourt.getEmail().equals(email)) {
            logger.warn("Booking with ID: {} does not belong to user with email: {}", id, email);
            return false;  // Si la reserva no pertenece al usuario, no la eliminamos
        }

        try {
            bookingCourtRepository.deleteById(id);
            logger.info("Booking with ID: {} deleted successfully.", id);
            return true;
        } catch (Exception e) {
            logger.error("Error occurred while deleting booking: {}", e.getMessage(), e);
            throw e;
        }
    }


}
