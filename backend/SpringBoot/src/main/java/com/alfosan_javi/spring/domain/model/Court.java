package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "courts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Court {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "sport_id", referencedColumnName = "id")
    private Sport sport;

    @Column(name = "type_pista")
    private String typePista;

    @Column(name = "name_pista")
    private String namePista;

    @Column(name = "ancho")
    private String ancho;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String img;

    @Column(name = "tag_court")
    private String tagCourt;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
