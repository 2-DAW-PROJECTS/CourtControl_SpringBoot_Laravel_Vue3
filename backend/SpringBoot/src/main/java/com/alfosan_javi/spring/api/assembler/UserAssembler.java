package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;  // Added import

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

        // Mapping roles to UserDTO
        model.setRoles(user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toSet()));

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

        // You might want to handle role assignment here if you need to
        // For example, you can map roles from DTO to the entity
        // user.setRoles(...);

        return user;
    }
}
