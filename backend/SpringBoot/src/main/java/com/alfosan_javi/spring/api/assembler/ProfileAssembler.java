package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.ProfileDTO;
import com.alfosan_javi.spring.domain.model.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class ProfileAssembler {

    public ProfileDTO toModel(User user) {
        ProfileDTO model = new ProfileDTO();
        model.setId(user.getId());
        model.setName(user.getName());
        model.setEmail(user.getEmail());
        model.setEmailVerifiedAt(user.getEmailVerifiedAt());
        model.setCreatedAt(user.getCreatedAt());
        model.setUpdatedAt(user.getUpdatedAt());

        // Mapear los roles del usuario
        model.setRoles(user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toSet()));

        return model;
    }
}
