package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserAssembler {

    // En UserAssembler o donde transformes el User a DTO:
    public UserDTO toDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setEmailVerifiedAt(user.getEmailVerifiedAt());
        dto.setPassword(user.getPassword());
        dto.setRememberToken(user.getRememberToken());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        // Inicializar roles si la colección es perezosa (LAZY)
        if (user.getRoles() != null) {
            user.getRoles().size();  // Esto inicializa la colección de roles
        }

        // Mapear roles
        dto.setRoles(
            user.getRoles().stream()
                .map(role -> role.getName())
                .collect(Collectors.toSet())
        );

        return dto;
    }


    // Convertir UserDTO a User
    public User toEntity(UserDTO userDTO) {
        User user = new User();
        
        // Mapear los atributos básicos
        user.setId(userDTO.getId());
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setPassword(userDTO.getPassword());
        user.setRememberToken(userDTO.getRememberToken());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());

        // Si es necesario asignar roles, lo harías aquí
        // Nota: Si necesitas asignar roles, asegúrate de que los roles estén disponibles para convertirlos en entidades

        return user;
    }
}
