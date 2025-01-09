package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "hours")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "hour_time")
    private String hourTime; // Ejemplo: "08:30:00"
}
