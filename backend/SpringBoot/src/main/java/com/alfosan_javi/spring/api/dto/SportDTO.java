package com.alfosan_javi.spring.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SportDTO {

    private long id;
    private String sportName;
    private String popularityLevel;
    private String requiredEquipment;
    private int maxPlayers;
    private int minPlayers;
    private int matchDuration;
    private String physicalIntensity;
    private String rules;
    private boolean isActive;
    private String icon;
    private String description;
}
