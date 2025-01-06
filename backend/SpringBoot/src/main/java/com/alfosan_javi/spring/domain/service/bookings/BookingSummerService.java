package com.alfosan_javi.spring.domain.service.bookings;

import com.alfosan_javi.spring.domain.model.bookings.BookingSummer;
import com.alfosan_javi.spring.domain.repository.bookings.BookingSummerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.alfosan_javi.spring.domain.model.Summer;
import com.alfosan_javi.spring.domain.service.SummerService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingSummerService {

    private final BookingSummerRepository bookingSummerRepository;
    private final SummerService summerService;

    private static final int MAX_CAPACITY = 30;

    @Autowired
    public BookingSummerService(BookingSummerRepository bookingSummerRepository, SummerService summerService) {
        this.bookingSummerRepository = bookingSummerRepository;
        this.summerService = summerService;
    }

    public List<BookingSummer> findAll() {
        return bookingSummerRepository.findAll();
    }

    public Optional<BookingSummer> findById(Long id) {
        return bookingSummerRepository.findById(id);
    }

public BookingSummer save(BookingSummer bookingSummer) {
    if (bookingSummer.getId() == null) { // Nueva inscripción
        // Verificar si el verano está cerrado
        Summer summer = summerService.getSummerById((long) bookingSummer.getIdSummer())
            .orElseThrow(() -> new RuntimeException("Summer not found"));

        if (!summer.getIsActive()) {
            throw new RuntimeException("Registrations for this summer are closed.");
        }

        // Calcular la capacidad actual sin duplicaciones
        int currentCapacity = (int) bookingSummerRepository.findAll()
            .stream()
            .filter(b -> b.getIdSummer() == bookingSummer.getIdSummer())
            .count(); // Contar solo los registros existentes para este verano

        if (currentCapacity >= MAX_CAPACITY) {
            summer.setIsActive(false);
            summer.setUpdatedAt(LocalDateTime.now());
            summerService.saveSummer(summer);
            throw new RuntimeException("Capacity reached for this summer.");
        }

        bookingSummer.setCapacity(MAX_CAPACITY);
        bookingSummer.setCurrentCapacity(currentCapacity + 1);
        bookingSummer.setIsClosed(currentCapacity + 1 >= MAX_CAPACITY);
        bookingSummer.setCreatedAt(LocalDateTime.now());
        bookingSummer.setUpdatedAt(LocalDateTime.now());
    } else { // Actualización de una inscripción existente
        // No incrementar la capacidad aquí; solo mantener el estado
        int currentCapacity = bookingSummerRepository.findAll()
            .stream()
            .filter(b -> b.getIdSummer() == bookingSummer.getIdSummer())
            .mapToInt(BookingSummer::getCurrentCapacity)
            .sum();

        if (currentCapacity >= MAX_CAPACITY) {
            bookingSummer.setIsClosed(true);

            // Actualizar el estado del verano a inactivo
            Summer summer = summerService.getSummerById((long) bookingSummer.getIdSummer())
                .orElseThrow(() -> new RuntimeException("Summer not found"));
            summer.setIsActive(false);
            summer.setUpdatedAt(LocalDateTime.now());
            summerService.saveSummer(summer);
        }

        bookingSummer.setUpdatedAt(LocalDateTime.now());
    }
    return bookingSummerRepository.save(bookingSummer);
}


    public void deleteById(Long id) {
        bookingSummerRepository.deleteById(id);
    }
}
