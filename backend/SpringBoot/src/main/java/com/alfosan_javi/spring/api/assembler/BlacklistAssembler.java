package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.BlacklistDTO;
import com.alfosan_javi.spring.domain.model.Blacklist;
import org.springframework.stereotype.Component;

@Component
public class BlacklistAssembler {

    public BlacklistDTO toModel(Blacklist blacklist) {
        BlacklistDTO model = new BlacklistDTO();
        model.setId(blacklist.getId());
        model.setUserId(blacklist.getUserId());
        model.setToken(blacklist.getToken());
        model.setCreatedAt(blacklist.getCreatedAt());
        model.setExpiresAt(blacklist.getExpiresAt());
        return model;
    }

    public Blacklist toEntity(BlacklistDTO model) {
        Blacklist blacklist = new Blacklist();
        blacklist.setId(model.getId());
        blacklist.setUserId(model.getUserId());
        blacklist.setToken(model.getToken());
        blacklist.setCreatedAt(model.getCreatedAt());
        blacklist.setExpiresAt(model.getExpiresAt());
        return blacklist;
    }
}
