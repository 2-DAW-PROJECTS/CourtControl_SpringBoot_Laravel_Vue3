package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.PermissionDTO;
import com.alfosan_javi.spring.domain.model.Permission;
import org.springframework.stereotype.Component;

@Component
public class PermissionAssembler {

    public PermissionDTO toModel(Permission permission) {
        PermissionDTO dto = new PermissionDTO();
        dto.setId(permission.getId());
        dto.setName(permission.getName());
        dto.setDescription(permission.getDescription());
        return dto;
    }

    public Permission toEntity(PermissionDTO dto) {
        Permission permission = new Permission();
        permission.setId(dto.getId());
        permission.setName(dto.getName());
        permission.setDescription(dto.getDescription());
        return permission;
    }
}
