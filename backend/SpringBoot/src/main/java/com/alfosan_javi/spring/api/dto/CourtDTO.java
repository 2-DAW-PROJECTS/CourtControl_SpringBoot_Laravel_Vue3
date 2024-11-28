package com.alfosan_javi.spring.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourtDTO {

    private long id;
    private long sportId;
    private String typePista;
    private String namePista;
    private String ancho;
    private String material;
    private String description;
    private String img;
    private String tagCourt;
}
