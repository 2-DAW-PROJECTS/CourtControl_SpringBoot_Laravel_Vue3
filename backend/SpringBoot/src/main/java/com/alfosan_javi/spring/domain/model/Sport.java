// lombok - lombok - lombok - lombok
package com.alfosan_javi.spring.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sports")
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

    // Constructor vacío
    public Sport() {}

    // Constructor con parámetros
    public Sport(long id, String sportName, String popularityLevel, String requiredEquipment, 
                 int maxPlayers, int minPlayers, int matchDuration, String physicalIntensity, 
                 String rules, boolean isActive, String icon, String description, 
                 LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.sportName = sportName;
        this.popularityLevel = popularityLevel;
        this.requiredEquipment = requiredEquipment;
        this.maxPlayers = maxPlayers;
        this.minPlayers = minPlayers;
        this.matchDuration = matchDuration;
        this.physicalIntensity = physicalIntensity;
        this.rules = rules;
        this.isActive = isActive;
        this.icon = icon;
        this.description = description;
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

    public void setActive(boolean active) {
        isActive = active;
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

    // toString() lombok
    @Override
    public String toString() {
        return "Sport{" +
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
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
