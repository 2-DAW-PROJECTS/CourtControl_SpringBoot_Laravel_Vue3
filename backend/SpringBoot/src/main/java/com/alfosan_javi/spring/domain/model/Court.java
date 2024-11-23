package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "courts")
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

    // Constructor vacío
    public Court() {}

    // Constructor con parámetros
    public Court(long id, Sport sport, String typePista, String namePista, String ancho, String description, String img, String tagCourt, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.sport = sport;
        this.typePista = typePista;
        this.namePista = namePista;
        this.ancho = ancho;
        this.description = description;
        this.img = img;
        this.tagCourt = tagCourt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters y Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }

    public String getTypePista() {
        return typePista;
    }

    public void setTypePista(String typePista) {
        this.typePista = typePista;
    }

    public String getNamePista() {
        return namePista;
    }

    public void setNamePista(String namePista) {
        this.namePista = namePista;
    }

    public String getAncho() {
        return ancho;
    }

    public void setAncho(String ancho) {
        this.ancho = ancho;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getTagCourt() {
        return tagCourt;
    }

    public void setTagCourt(String tagCourt) {
        this.tagCourt = tagCourt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Court{" +
                "id=" + id +
                ", sport=" + sport +
                ", typePista='" + typePista + '\'' +
                ", namePista='" + namePista + '\'' +
                ", ancho='" + ancho + '\'' +
                ", description='" + description + '\'' +
                ", img='" + img + '\'' +
                ", tagCourt='" + tagCourt + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}