package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "summers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Summer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "id_sport", nullable = false)
    private Sport sport;

    @Column(name = "img", nullable = false)
    private String img;

    @Column(name = "name_summer", nullable = false)
    private String nameSummer;

    @Column(name = "category_age", nullable = false)
    private String categoryAge;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "max_participants")
    private int maxParticipants;

    @Column(name = "description")
    private String description;

    @Column(name = "activities")
    private String activities;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
