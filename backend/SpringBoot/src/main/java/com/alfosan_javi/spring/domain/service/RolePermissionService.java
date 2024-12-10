package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.domain.model.Role;
import com.alfosan_javi.spring.domain.model.Permission;
import com.alfosan_javi.spring.domain.repository.RoleRepository;
import com.alfosan_javi.spring.domain.repository.PermissionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RolePermissionService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    public RolePermissionService(RoleRepository roleRepository, PermissionRepository permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    public Role createRole(String roleName) {
        Role role = new Role();
        role.setName(roleName);
        return roleRepository.save(role);
    }

    public Permission createPermission(String permissionName, String description) {
        Permission permission = new Permission();
        permission.setName(permissionName);
        permission.setDescription(description);
        return permissionRepository.save(permission);
    }

    public void assignPermissionToRole(String roleName, String permissionName) {
        // Retrieve role and permission as Optional
        Optional<Role> roleOptional = roleRepository.findByName(roleName);  
        Optional<Permission> permissionOptional = permissionRepository.findByName(permissionName);  

        // Check if both role and permission are present
        if (roleOptional.isPresent() && permissionOptional.isPresent()) {
            Role role = roleOptional.get();
            Permission permission = permissionOptional.get();
            
            role.getPermissions().add(permission);
            roleRepository.save(role);
        }
    }
}
