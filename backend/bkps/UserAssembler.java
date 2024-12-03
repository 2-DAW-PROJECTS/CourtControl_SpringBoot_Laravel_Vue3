package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserAssembler {

    public UserDTO toModel(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPassword(user.getPassword()); // Evitar devolver el password real si no es necesario
        dto.setEmailVerifiedAt(user.getEmailVerifiedAt());
        dto.setRememberToken(user.getRememberToken());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }

    public User toEntity(UserDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setEmailVerifiedAt(dto.getEmailVerifiedAt());
        user.setRememberToken(dto.getRememberToken());
        user.setCreatedAt(dto.getCreatedAt());
        user.setUpdatedAt(dto.getUpdatedAt());
        return user;
    }
}
