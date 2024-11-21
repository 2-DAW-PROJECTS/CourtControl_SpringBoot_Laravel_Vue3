package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.model.SportModel;
import com.alfosan_javi.spring.domain.model.Sport;
import org.springframework.stereotype.Component;

@Component
public class SportAssembler {

    public SportModel toModel(Sport sport) {
        SportModel model = new SportModel();
        model.setId(sport.getId());
        model.setSportName(sport.getSportName());
        model.setPopularityLevel(sport.getPopularityLevel());
        model.setRequiredEquipment(sport.getRequiredEquipment());
        model.setMaxPlayers(sport.getMaxPlayers());
        model.setMinPlayers(sport.getMinPlayers());
        model.setMatchDuration(sport.getMatchDuration());
        model.setPhysicalIntensity(sport.getPhysicalIntensity());
        model.setRules(sport.getRules());
        model.setActive(sport.isActive());
        model.setIcon(sport.getIcon());
        model.setDescription(sport.getDescription());
        return model;
    }

    public Sport toEntity(SportModel model) {
        Sport sport = new Sport();
        sport.setId(model.getId());
        sport.setSportName(model.getSportName());
        sport.setPopularityLevel(model.getPopularityLevel());
        sport.setRequiredEquipment(model.getRequiredEquipment());
        sport.setMaxPlayers(model.getMaxPlayers());
        sport.setMinPlayers(model.getMinPlayers());
        sport.setMatchDuration(model.getMatchDuration());
        sport.setPhysicalIntensity(model.getPhysicalIntensity());
        sport.setRules(model.getRules());
        sport.setActive(model.isActive());
        sport.setIcon(model.getIcon());
        sport.setDescription(model.getDescription());
        return sport;
    }
}
