package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.CourtAssembler;
import com.alfosan_javi.spring.api.model.CourtModel;
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

    // Obtener todos las pistas
    // @GetMapping
    // public List<CourtModel> getAllCourts() {
    //     System.out.println("Getting all courts...");
    //     return courtService.getAllCourts().stream()
    //             .map(courtAssembler::toModel)
    //             .collect(Collectors.toList());
    // }

    // Obtener pista por ID
    @GetMapping("/{id}")
    public ResponseEntity<CourtModel> getCourtById(@PathVariable long id) {
        return courtService.getCourtById(id)
                .map(courtAssembler::toModel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear nueva pista
    @PostMapping
    public ResponseEntity<CourtModel> createCourt(@RequestBody CourtModel courtModel) {
        Sport sport = sportService.getSportById(courtModel.getSportId()).orElse(null);
        if (sport == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        Court court = courtAssembler.toEntity(courtModel, sport);
        Court savedCourt = courtService.saveCourt(court);
        return ResponseEntity.status(HttpStatus.CREATED).body(courtAssembler.toModel(savedCourt));
    }

    // Filtro de pistas por deporte
    @GetMapping
    public List<CourtModel> getFilteredCourts(
            @RequestParam(required = false) List<Long> sportIds) {
        List<Court> courts = (sportIds == null || sportIds.isEmpty())
                ? courtService.getAllCourts()
                : courtService.getFilteredCourtsBySport(sportIds);
        return courts.stream()
                .map(courtAssembler::toModel)
                .collect(Collectors.toList());
    }




}
