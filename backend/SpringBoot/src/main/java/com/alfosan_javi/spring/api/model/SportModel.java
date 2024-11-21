package com.alfosan_javi.spring.api.model;

public class SportModel {

    private long id;
    private String sportName;
    private String popularityLevel;  // Cambiado a String
    private String requiredEquipment;
    private int maxPlayers;
    private int minPlayers;
    private int matchDuration;
    private String physicalIntensity;
    private String rules;
    private boolean isActive;
    private String icon;
    private String description;

    // Constructor vacío
    public SportModel() {}

    // Constructor con parámetros
    public SportModel(long id, String sportName, String popularityLevel, String requiredEquipment, 
                      int maxPlayers, int minPlayers, int matchDuration, String physicalIntensity, 
                      String rules, boolean isActive, String icon, String description) {
        this.id = id;
        this.sportName = sportName;
        this.popularityLevel = popularityLevel;  // Cambiado a String
        this.requiredEquipment = requiredEquipment;
        this.maxPlayers = maxPlayers;
        this.minPlayers = minPlayers;
        this.matchDuration = matchDuration;
        this.physicalIntensity = physicalIntensity;
        this.rules = rules;
        this.isActive = isActive;
        this.icon = icon;
        this.description = description;
    }

    // Getters y Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSportName() {
        return sportName;
    }

    public void setSportName(String sportName) {
        this.sportName = sportName;
    }

    public String getPopularityLevel() {
        return popularityLevel;
    }

    public void setPopularityLevel(String popularityLevel) {
        this.popularityLevel = popularityLevel;
    }

    public String getRequiredEquipment() {
        return requiredEquipment;
    }

    public void setRequiredEquipment(String requiredEquipment) {
        this.requiredEquipment = requiredEquipment;
    }

    public int getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(int maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public int getMinPlayers() {
        return minPlayers;
    }

    public void setMinPlayers(int minPlayers) {
        this.minPlayers = minPlayers;
    }

    public int getMatchDuration() {
        return matchDuration;
    }

    public void setMatchDuration(int matchDuration) {
        this.matchDuration = matchDuration;
    }

    public String getPhysicalIntensity() {
        return physicalIntensity;
    }

    public void setPhysicalIntensity(String physicalIntensity) {
        this.physicalIntensity = physicalIntensity;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // toString()
    @Override
    public String toString() {
        return "SportModel{" +
                "id=" + id +
                ", sportName='" + sportName + '\'' +
                ", popularityLevel=" + popularityLevel +
                ", requiredEquipment='" + requiredEquipment + '\'' +
                ", maxPlayers=" + maxPlayers +
                ", minPlayers=" + minPlayers +
                ", matchDuration=" + matchDuration +
                ", physicalIntensity='" + physicalIntensity + '\'' +
                ", rules='" + rules + '\'' +
                ", isActive=" + isActive +
                ", icon='" + icon + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
