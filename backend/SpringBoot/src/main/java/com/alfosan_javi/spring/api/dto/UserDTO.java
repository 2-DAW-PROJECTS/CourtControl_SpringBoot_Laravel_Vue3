package com.alfosan_javi.spring.api.dto;

import com.alfosan_javi.spring.domain.model.Role;  // Asegúrate de importar Role
import com.alfosan_javi.spring.domain.model.User;  // Asegúrate de importar User

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private long id;
    private String name;
    private String email;
    private LocalDateTime emailVerifiedAt;
    private String password;
    private String rememberToken;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Set<String> roles;  // Cambié de Set<Role> a Set<String>

    // Constructor adicional para crear UserDTO a partir de un User
    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.emailVerifiedAt = user.getEmailVerifiedAt();
        this.password = user.getPassword();
        this.rememberToken = user.getRememberToken();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();

        // Mapear los roles a un Set<String> (nombres de roles)
        this.roles = user.getRoles().stream()
                         .map(Role::getName)  // Convertir cada objeto Role en su nombre
                         .collect(Collectors.toSet());
    }
}
