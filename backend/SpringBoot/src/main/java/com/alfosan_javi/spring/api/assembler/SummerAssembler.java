package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.SummerDTO;
import com.alfosan_javi.spring.domain.model.Summer;
import com.alfosan_javi.spring.domain.model.Sport;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class SummerAssembler {

    public SummerDTO toModel(Summer summer) {
        return new SummerDTO(
            summer.getId(),
            summer.getSport().getId(),
            summer.getImg(),
            summer.getNameSummer(),
            summer.getCategoryAge(),
            summer.getStartDate(),
            summer.getEndDate(),
            summer.getMaxParticipants(),
            summer.getDescription(),
            summer.getActivities(),
            summer.getIsActive()
        );
    }

    public Summer toEntity(SummerDTO model, Sport sport) {
        return new Summer(
            model.getId(),
            sport,
            model.getImg(),
            model.getNameSummer(),
            model.getCategoryAge(),
            model.getStartDate(),
            model.getEndDate(),
            model.getMaxParticipants(),
            model.getDescription(),
            model.getActivities(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            model.getIsActive()
        );
    }
}
