package com.alfosan_javi.spring.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LessonDTO {

    private long id;
    private String nameClass;
    private boolean isActive;
    private int vacancies;
    private String days;
    private String time;
    private int duration;
    private double baseCost;
    private String level;
    private String coach;
    private int maxCapacity;
    private String description;
    private String img;
    // Eliminamos el campo idSport
    private Long idSport;
}
