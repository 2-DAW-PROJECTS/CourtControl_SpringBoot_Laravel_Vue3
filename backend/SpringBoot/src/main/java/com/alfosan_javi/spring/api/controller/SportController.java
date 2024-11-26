package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.SportAssembler;
import com.alfosan_javi.spring.api.dto.SportDTO;
import com.alfosan_javi.spring.domain.model.Sport;
import com.alfosan_javi.spring.domain.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sports")
public class SportController {

    @Autowired
    private SportService sportService;

    @Autowired
    private SportAssembler sportAssembler;

    // Obtener todos los deportes
    @GetMapping
    public List<SportDTO> getAllSports() {
        return sportService.getAllSports().stream()
                .map(sportAssembler::toModel)
                .collect(Collectors.toList());
    }

    // Obtener un deporte por ID
    @GetMapping("/{id}")
    public ResponseEntity<SportDTO> getSportById(@PathVariable long id) {
        return sportService.getSportById(id)
                .map(sport -> ResponseEntity.ok(sportAssembler.toModel(sport)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Crear un nuevo deporte
    @PostMapping
    public ResponseEntity<SportDTO> createSport(@RequestBody SportDTO sportDTO) {
        Sport sport = sportAssembler.toEntity(sportDTO);
        Sport createdSport = sportService.saveSport(sport);
        return ResponseEntity.status(HttpStatus.CREATED).body(sportAssembler.toModel(createdSport));
    }

    // Actualizar un deporte existente
    @PutMapping("/{id}")
    public ResponseEntity<SportDTO> updateSport(@PathVariable long id, @RequestBody SportDTO sportDTO) {
        if (!sportService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        sportDTO.setId(id);
        Sport updatedSport = sportService.saveSport(sportAssembler.toEntity(sportDTO));
        return ResponseEntity.ok(sportAssembler.toModel(updatedSport));
    }

    // Eliminar un deporte por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSport(@PathVariable long id) {
        if (!sportService.deleteSport(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.noContent().build();
    }
}