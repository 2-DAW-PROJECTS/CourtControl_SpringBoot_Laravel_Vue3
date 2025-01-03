package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.CourtDTO;
import com.alfosan_javi.spring.domain.model.Court;
import com.alfosan_javi.spring.domain.model.Sport;
import org.springframework.stereotype.Component;

@Component
public class CourtAssembler {

    public CourtDTO toModel(Court court) {
        CourtDTO model = new CourtDTO();
        model.setId(court.getId());
        model.setSportId(court.getSport().getId());
        model.setTypePista(court.getTypePista());
        model.setNamePista(court.getNamePista());
        model.setMaterial(court.getMaterial());
        model.setAncho(court.getAncho());
        model.setDescription(court.getDescription());
        model.setImg(court.getImg());
        model.setTagCourt(court.getTagCourt());
        model.setIsActive(court.getIsActive());
        return model;
    }

    public Court toEntity(CourtDTO model, Sport sport) {
        Court court = new Court();
        court.setId(model.getId());
        court.setSport(sport);
        court.setTypePista(model.getTypePista());
        court.setNamePista(model.getNamePista());
        court.setMaterial(model.getMaterial());
        court.setAncho(model.getAncho());
        court.setDescription(model.getDescription());
        court.setImg(model.getImg());
        court.setTagCourt(model.getTagCourt());
        court.setIsActive(model.getIsActive());
        return court;
    }
}