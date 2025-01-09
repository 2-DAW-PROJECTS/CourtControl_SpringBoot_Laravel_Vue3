package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.HoursDTO;
import com.alfosan_javi.spring.domain.model.Hours;
import org.springframework.stereotype.Component;

@Component
public class HoursAssembler {

    public HoursDTO toModel(Hours hours) {
        return new HoursDTO(hours.getId(), hours.getHourTime());
    }

    public Hours toEntity(HoursDTO hoursDTO) {
        return new Hours(hoursDTO.getId(), hoursDTO.getHourTime());
    }
}
