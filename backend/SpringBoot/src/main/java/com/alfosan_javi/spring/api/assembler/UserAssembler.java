package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.model.Role;

import com.alfosan_javi.spring.domain.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserAssembler {

    
    @Autowired
    private RoleRepository roleRepository;

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

        if (user.getRoles() != null) {
            user.getRoles().size();
        }

        dto.setRoles(
            user.getRoles().stream()
                .map(Role::getName)
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

    // public UserDTO toModel(User user) {
    //     Set<String> roles = user.getRoles().stream()
    //             .map(Role::getName)
    //             .collect(Collectors.toSet());
    //     return new UserDTO(
    //         user.getId(),
    //         user.getName(),
    //         user.getEmail(),
    //         user.getEmailVerifiedAt(),
    //         user.getPassword(),
    //         user.getRememberToken(),
    //         user.getCreatedAt(),
    //         user.getUpdatedAt(),
    //         roles
    //     );
    // }
    public UserDTO toModel(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toSet());
        return new UserDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getEmailVerifiedAt(),
            user.getPassword(),
            user.getRememberToken(),
            user.getCreatedAt(),
            user.getUpdatedAt(),
            roles
        );
    }

    public void updateEntityFromDTO(UserDTO userDTO, User user) {
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setPassword(userDTO.getPassword());
        user.setRememberToken(userDTO.getRememberToken());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());

        Set<Role> roles = userDTO.getRoles().stream()
            .map(roleName -> roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
            .collect(Collectors.toSet());
        user.setRoles(roles);
    }
}
