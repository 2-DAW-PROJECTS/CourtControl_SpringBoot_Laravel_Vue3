package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.SummerAssembler;
import com.alfosan_javi.spring.api.dto.SummerDTO;
import com.alfosan_javi.spring.domain.model.Sport;
import com.alfosan_javi.spring.domain.model.Summer;
import com.alfosan_javi.spring.domain.service.SportService;
import com.alfosan_javi.spring.domain.service.SummerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/summers")
public class SummerController {

    @Autowired
    private SummerService summerService;

    @Autowired
    private SportService sportService;

    @Autowired
    private SummerAssembler summerAssembler;

    @GetMapping
    public List<SummerDTO> getFilteredSummers(
            @RequestParam(required = false) List<Long> sportIds) {
        List<Summer> summers = (sportIds == null || sportIds.isEmpty())
                ? summerService.getAllSummers()
                : summerService.getFilteredSummersBySport(sportIds);
        return summers.stream()
                .map(summerAssembler::toModel)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SummerDTO> getSummerById(@PathVariable long id) {
        return summerService.getSummerById(id)
                .map(summer -> ResponseEntity.ok(summerAssembler.toModel(summer)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<SummerDTO> createSummer(@RequestBody SummerDTO summerDTO) {
        return sportService.getSportById(summerDTO.getIdSport())
                .map(sport -> {
                    Summer summer = summerAssembler.toEntity(summerDTO, sport);
                    Summer createdSummer = summerService.saveSummer(summer);
                    return ResponseEntity.status(HttpStatus.CREATED).body(summerAssembler.toModel(createdSummer));
                })
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SummerDTO> updateSummer(@PathVariable long id, @RequestBody SummerDTO summerDTO) {
        if (!summerService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return sportService.getSportById(summerDTO.getIdSport())
                .map(sport -> {
                    summerDTO.setId(id);
                    Summer updatedSummer = summerService.saveSummer(summerAssembler.toEntity(summerDTO, sport));
                    return ResponseEntity.ok(summerAssembler.toModel(updatedSummer));
                })
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSummer(@PathVariable long id) {
        if (!summerService.deleteSummer(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.noContent().build();
    }
}