package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.domain.service.RolePermissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roles")
public class RolePermissionController {

    private final RolePermissionService rolePermissionService;

    public RolePermissionController(RolePermissionService rolePermissionService) {
        this.rolePermissionService = rolePermissionService;
    }

    // Crear un rol
    @PostMapping("/create")
    public ResponseEntity<String> createRole(@RequestParam String roleName) {
        rolePermissionService.createRole(roleName);
        return ResponseEntity.ok("Role created successfully");
    }

    // Crear un permiso
    @PostMapping("/permissions/create")
    public ResponseEntity<String> createPermission(@RequestParam String permissionName, @RequestParam String description) {
        rolePermissionService.createPermission(permissionName, description);
        return ResponseEntity.ok("Permission created successfully");
    }

    // Asignar un permiso a un rol
    @PostMapping("/assign-permission")
    public ResponseEntity<String> assignPermissionToRole(@RequestParam String roleName, @RequestParam String permissionName) {
        rolePermissionService.assignPermissionToRole(roleName, permissionName);
        return ResponseEntity.ok("Permission assigned to role successfully");
    }
}
