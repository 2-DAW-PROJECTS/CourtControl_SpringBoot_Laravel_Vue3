package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.SummerAssembler;
import com.alfosan_javi.spring.api.model.SummerModel;
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
    public List<SummerModel> getAllSummers() {
        return summerService.getAllSummers().stream()
                .map(summerAssembler::toModel)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SummerModel> getSummerById(@PathVariable long id) {
        return summerService.getSummerById(id)
                .map(summer -> ResponseEntity.ok(summerAssembler.toModel(summer)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<SummerModel> createSummer(@RequestBody SummerModel summerModel) {
        return sportService.getSportById(summerModel.getIdSport())
                .map(sport -> {
                    Summer summer = summerAssembler.toEntity(summerModel, sport);
                    Summer createdSummer = summerService.saveSummer(summer);
                    return ResponseEntity.status(HttpStatus.CREATED).body(summerAssembler.toModel(createdSummer));
                })
                .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<SummerModel> updateSummer(@PathVariable long id, @RequestBody SummerModel summerModel) {
        if (!summerService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return sportService.getSportById(summerModel.getIdSport())
                .map(sport -> {
                    summerModel.setId(id);
                    Summer updatedSummer = summerService.saveSummer(summerAssembler.toEntity(summerModel, sport));
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
