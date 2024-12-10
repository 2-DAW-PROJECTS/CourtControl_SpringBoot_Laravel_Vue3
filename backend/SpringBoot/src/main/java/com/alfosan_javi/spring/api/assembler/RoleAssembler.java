package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.RoleDTO;
import com.alfosan_javi.spring.domain.model.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleAssembler {

    public RoleDTO toModel(Role role) {
        RoleDTO dto = new RoleDTO();
        dto.setId(role.getId());
        dto.setName(role.getName());
        return dto;
    }

    public Role toEntity(RoleDTO dto) {
        Role role = new Role();
        role.setId(dto.getId());
        role.setName(dto.getName());
        return role;
    }
}
