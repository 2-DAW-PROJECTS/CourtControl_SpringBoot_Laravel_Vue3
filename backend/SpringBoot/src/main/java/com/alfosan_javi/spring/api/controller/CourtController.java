package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.CourtAssembler;
import com.alfosan_javi.spring.api.dto.CourtDTO;
import com.alfosan_javi.spring.domain.model.Court;
import com.alfosan_javi.spring.domain.model.Sport;
import com.alfosan_javi.spring.domain.service.CourtService;
import com.alfosan_javi.spring.domain.service.SportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courts")
public class CourtController {

    @Autowired
    private CourtService courtService;

    @Autowired
    private CourtAssembler courtAssembler;

    @Autowired
    private SportService sportService;

    // Obtener todas las pistas o filtrar por sportIds
    @GetMapping
    public List<CourtDTO> getFilteredCourts(
            @RequestParam(required = false) List<Long> sportIds) {  // Ahora es una lista de Long
        List<Court> courts;
        if (sportIds == null || sportIds.isEmpty()) {
            courts = courtService.getAllCourts();
        } else {
            courts = courtService.getFilteredCourtsBySport(sportIds);  // Ya no es necesario convertir
        }

        return courts.stream()
                .map(courtAssembler::toModel)
                .collect(Collectors.toList());
    }

    // Obtener una pista por ID
    @GetMapping("/{id}")
    public ResponseEntity<CourtDTO> getCourtById(@PathVariable long id) {
        return courtService.getCourtById(id)
                .map(court -> ResponseEntity.ok(courtAssembler.toModel(court)))
                .orElse(ResponseEntity.status(404).build());
    }

    // Crear una nueva pista
    @PostMapping
    public ResponseEntity<CourtDTO> createCourt(@RequestBody CourtDTO courtDTO) {
        Sport sport = sportService.getSportById(courtDTO.getSportId()).orElse(null);
        if (sport == null) {
            return ResponseEntity.status(400).build();
        }
        Court court = courtAssembler.toEntity(courtDTO, sport);
        Court createdCourt = courtService.saveCourt(court);
        return ResponseEntity.status(201).body(courtAssembler.toModel(createdCourt));
    }

    // Actualizar una pista existente
    @PutMapping("/{id}")
    public ResponseEntity<CourtDTO> updateCourt(@PathVariable long id, @RequestBody CourtDTO courtDTO) {
        if (!courtService.existsById(id)) {
            return ResponseEntity.status(404).build();
        }
        courtDTO.setId(id);
        Sport sport = sportService.getSportById(courtDTO.getSportId()).orElse(null);
        if (sport == null) {
            return ResponseEntity.status(400).build();
        }
        Court updatedCourt = courtService.saveCourt(courtAssembler.toEntity(courtDTO, sport));
        return ResponseEntity.ok(courtAssembler.toModel(updatedCourt));
    }

    // Eliminar una pista por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourt(@PathVariable long id) {
        if (!courtService.deleteCourt(id)) {
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.noContent().build();
    }
}