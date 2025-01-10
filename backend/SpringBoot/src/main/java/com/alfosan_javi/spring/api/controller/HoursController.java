package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.dto.HoursDTO;
import com.alfosan_javi.spring.domain.model.Hours;
import com.alfosan_javi.spring.domain.service.HoursService;
import com.alfosan_javi.spring.api.assembler.HoursAssembler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hours")
@CrossOrigin(origins = "http://localhost:8081")
public class HoursController {

    @Autowired
    private HoursService hoursService;

    @Autowired
    private HoursAssembler hoursAssembler;

    @GetMapping
    public List<HoursDTO> getAllHours() {
        List<Hours> hoursList = hoursService.getAllHours();
        return hoursList.stream()
                .map(hoursAssembler::toModel)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HoursDTO> getHourById(@PathVariable long id) {
        Hours hour = hoursService.getHourById(id);
        if (hour != null) {
            return ResponseEntity.ok(hoursAssembler.toModel(hour));
        }
        return ResponseEntity.notFound().build();
    }
}
