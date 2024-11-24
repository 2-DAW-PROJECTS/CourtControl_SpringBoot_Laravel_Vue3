package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name_class")
    private String nameClass;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "vacancies")
    private int vacancies;

    @Column(name = "days")
    private String days;

    @Column(name = "time")
    private String time;

    @Column(name = "duration")
    private int duration;

    @Column(name = "base_cost")
    private double baseCost;

    @Column(name = "level")
    private String level;

    @Column(name = "coach")
    private String coach;

    @Column(name = "max_capacity")
    private int maxCapacity;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "img")
    private String img;
}
