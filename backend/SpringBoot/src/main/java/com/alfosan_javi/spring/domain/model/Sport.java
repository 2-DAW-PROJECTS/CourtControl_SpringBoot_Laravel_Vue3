package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "sports")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "sport_name")
    private String sportName;

    @Column(name = "popularity_level")
    private String popularityLevel;

    @Column(name = "required_equipment")
    private String requiredEquipment;

    @Column(name = "max_players")
    private int maxPlayers;

    @Column(name = "min_players")
    private int minPlayers;

    @Column(name = "match_duration")
    private int matchDuration;

    @Column(name = "physical_intensity")
    private String physicalIntensity;

    @Column(name = "rules")
    private String rules;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "icon")
    private String icon;

    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
