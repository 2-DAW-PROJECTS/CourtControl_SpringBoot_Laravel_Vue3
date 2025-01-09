package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.model.Role;
import com.alfosan_javi.spring.domain.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class UserAssembler {

    @Autowired
    private RoleRepository roleRepository;

    // Convertir User a UserDTO
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

        // Convertir Set<Role> a Set<String> para el DTO
        dto.setRoles(
            user.getRoles().stream()
                .map(Role::getName)  // Mapear a nombre de rol (String)
                .collect(Collectors.toSet())
        );

        return dto;
    }

    // Convertir UserDTO a User (Entity)
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

        // Convertir los roles desde String en el DTO a objetos Role
        Set<Role> roles = userDTO.getRoles().stream()
            .map(roleName -> roleRepository.findByName(roleName)  // Buscar Role por nombre
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
            .collect(Collectors.toSet());

        user.setRoles(roles);

        return user;
    }

    // Este método también maneja los roles, cambiando de Set<String> a Set<Role>
    public UserDTO toModel(User user) {
        Set<String> roles = user.getRoles().stream()
                .map(Role::getName) // Mapear los objetos Role a sus nombres de rol (String)
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

    // Actualiza la entidad User con los datos del DTO (incluyendo los roles)
    public void updateEntityFromDTO(UserDTO userDTO, User user) {
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setPassword(userDTO.getPassword());
        user.setRememberToken(userDTO.getRememberToken());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());

        // Convertir nombres de roles de DTO a objetos Role
        Set<Role> roles = userDTO.getRoles().stream()
            .map(roleName -> roleRepository.findByName(roleName)  // Buscar Role por nombre
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
            .collect(Collectors.toSet());

        user.setRoles(roles);
    }
}
