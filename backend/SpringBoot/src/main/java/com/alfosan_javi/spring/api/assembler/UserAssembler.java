package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserAssembler {

    public UserDTO toModel(User user) {
        UserDTO model = new UserDTO();
        model.setId(user.getId());
        model.setName(user.getName());
        model.setEmail(user.getEmail());
        model.setEmailVerifiedAt(user.getEmailVerifiedAt());
        model.setPassword(user.getPassword());
        model.setRememberToken(user.getRememberToken());
        model.setCreatedAt(user.getCreatedAt());
        model.setUpdatedAt(user.getUpdatedAt());
        return model;
    }

    public User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setPassword(userDTO.getPassword());
        user.setRememberToken(userDTO.getRememberToken());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        return user;
    }
}
