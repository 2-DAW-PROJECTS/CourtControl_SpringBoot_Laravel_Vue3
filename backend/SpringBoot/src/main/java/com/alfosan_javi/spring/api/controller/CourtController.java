package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.CourtAssembler;
import com.alfosan_javi.spring.api.dto.CourtDTO;
import com.alfosan_javi.spring.domain.model.Court;
import com.alfosan_javi.spring.domain.service.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Obtener todas las pistas o filtrar por sportIds y material
    @GetMapping
    public List<CourtDTO> getFilteredCourts(
            @RequestParam(required = false) List<Long> sportIds,
            @RequestParam(required = false) String material) {

        List<Court> courts = courtService.getFilteredCourts(sportIds, material);
        return courts.stream()
                    .map(courtAssembler::toModel)
                    .collect(Collectors.toList());
    }

    @GetMapping("/materials")
    public List<String> getMaterialsBySport(@RequestParam(required = false) Integer sportId) {
        // System.out.println("ESTOY EN EL CONTROLLER MATERIALS");

        if (sportId != null) {
            // System.out.println("ESTOY EN EL CONTROLLER CON UN ID DE DEPROTIVO: " + sportId);
            return courtService.getMaterialsBySport(sportId);
        }
        return courtService.getAllMaterials();
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
            System.out.println("Received court data: " + courtDTO);
        Court createdCourt = courtService.createCourt(courtDTO);
        if (createdCourt == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(201).body(courtAssembler.toModel(createdCourt));
    }

    // Actualizar una pista existente
    @PutMapping("/{id}")
    public ResponseEntity<CourtDTO> updateCourt(@PathVariable long id, @RequestBody CourtDTO courtDTO) {
        Court updatedCourt = courtService.updateCourt(id, courtDTO);
        if (updatedCourt == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courtAssembler.toModel(updatedCourt));
    }

    // Eliminar una pista por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourt(@PathVariable long id) {
        boolean deleted = courtService.deleteCourt(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}