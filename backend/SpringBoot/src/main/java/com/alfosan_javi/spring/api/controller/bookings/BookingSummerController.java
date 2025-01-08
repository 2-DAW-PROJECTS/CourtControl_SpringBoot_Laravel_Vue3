package com.alfosan_javi.spring.api.controller.bookings;

import com.alfosan_javi.spring.api.assembler.bookings.BookingSummerAssembler;
import com.alfosan_javi.spring.api.dto.bookings.BookingSummerDTO;
import com.alfosan_javi.spring.domain.service.bookings.BookingSummerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings/summers")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingSummerController {

    private final BookingSummerService bookingSummerService;
    private final BookingSummerAssembler bookingSummerAssembler;

    @Autowired
    public BookingSummerController(BookingSummerService bookingSummerService, BookingSummerAssembler bookingSummerAssembler) {
        this.bookingSummerService = bookingSummerService;
        this.bookingSummerAssembler = bookingSummerAssembler;
    }

    @GetMapping
    public List<BookingSummerDTO> getAll() {
        return bookingSummerService.findAll().stream()
                .map(bookingSummerAssembler::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public BookingSummerDTO getById(@PathVariable Long id) {
        return bookingSummerService.findById(id)
                .map(bookingSummerAssembler::toDTO)
                .orElseThrow(() -> new RuntimeException("BookingSummer not found"));
    }

    @PostMapping
    public BookingSummerDTO create(@RequestBody BookingSummerDTO dto) {
        var bookingSummer = bookingSummerAssembler.toEntity(dto);
        return bookingSummerAssembler.toDTO(bookingSummerService.save(bookingSummer));
    }

    @PutMapping("/{id}")
    public BookingSummerDTO update(@PathVariable Long id, @RequestBody BookingSummerDTO dto) {
        var existingBookingSummer = bookingSummerService.findById(id)
                .orElseThrow(() -> new RuntimeException("BookingSummer not found"));
        bookingSummerAssembler.toEntity(dto).setId(existingBookingSummer.getId());
        return bookingSummerAssembler.toDTO(bookingSummerService.save(existingBookingSummer));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        bookingSummerService.deleteById(id);
    }
}
