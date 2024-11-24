package com.alfosan_javi.spring.api.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummerModel {

    private long id;
    private long idSport;
    private String img;
    private String nameSummer;
    private String categoryAge;
    private LocalDate startDate;
    private LocalDate endDate;
    private int maxParticipants;
    private String description;
    private String activities;
}
