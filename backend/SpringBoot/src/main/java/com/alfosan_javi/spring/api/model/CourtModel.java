package com.alfosan_javi.spring.api.model;

public class CourtModel {

    private long id;
    private long sportId; // ID del deporte
    private String typePista;
    private String namePista;
    private String ancho;
    private String description;
    private String img;
    private String tagCourt;

    // Constructor vacío
    public CourtModel() {}

    // Constructor con parámetros
    public CourtModel(long id, long sportId, String typePista, String namePista, String ancho, String description, String img, String tagCourt) {
        this.id = id;
        this.sportId = sportId;
        this.typePista = typePista;
        this.namePista = namePista;
        this.ancho = ancho;
        this.description = description;
        this.img = img;
        this.tagCourt = tagCourt;
    }

    // Getters y Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSportId() {
        return sportId;
    }

    public void setSportId(long sportId) {
        this.sportId = sportId;
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

    @Override
    public String toString() {
        return "CourtModel{" +
                "id=" + id +
                ", sportId=" + sportId +
                ", typePista='" + typePista + '\'' +
                ", namePista='" + namePista + '\'' +
                ", ancho='" + ancho + '\'' +
                ", description='" + description + '\'' +
                ", img='" + img + '\'' +
                ", tagCourt='" + tagCourt + '\'' +
                '}';
    }
}