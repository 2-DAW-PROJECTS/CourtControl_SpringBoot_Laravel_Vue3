package com.alfosan_javi.spring.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoursDTO {

    private long id;
    private String hourTime; // Ejemplo: "08:30:00"
}
