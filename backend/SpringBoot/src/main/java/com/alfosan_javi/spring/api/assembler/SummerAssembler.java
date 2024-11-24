package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.model.SummerModel;
import com.alfosan_javi.spring.domain.model.Summer;
import com.alfosan_javi.spring.domain.model.Sport;
import org.springframework.stereotype.Component;

@Component
public class SummerAssembler {

    public SummerModel toModel(Summer summer) {
        return new SummerModel(
            summer.getId(),
            summer.getSport().getId(),
            summer.getImg(),
            summer.getNameSummer(),
            summer.getCategoryAge(),
            summer.getStartDate(),
            summer.getEndDate(),
            summer.getMaxParticipants(),
            summer.getDescription(),
            summer.getActivities()
        );
    }

    public Summer toEntity(SummerModel model, Sport sport) {
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
            null,
            null
        );
    }
}
