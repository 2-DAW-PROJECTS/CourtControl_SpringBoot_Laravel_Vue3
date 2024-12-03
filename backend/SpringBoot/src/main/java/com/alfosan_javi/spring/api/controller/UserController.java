package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.assembler.UserAssembler;
import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserAssembler userAssembler;

    // Obtener todos los usuarios
    @GetMapping
    public List<UserDTO> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.stream()
                .map(userAssembler::toModel)
                .collect(Collectors.toList());
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(userAssembler.toModel(user)))
                .orElse(ResponseEntity.status(404).build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        User createdUser = userService.createUser(userDTO);
        if (createdUser == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(201).body(userAssembler.toModel(createdUser));
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable long id, @RequestBody UserDTO userDTO) {
        User updatedUser = userService.updateUser(id, userDTO);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userAssembler.toModel(updatedUser));
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        boolean deleted = userService.deleteUser(id);
        if (!deleted) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    // Buscar usuarios por criterios
    @GetMapping("/search")
    public List<UserDTO> searchUsers(@RequestParam(required = false) String name,
                                    @RequestParam(required = false) String email) {
        List<User> users = userService.getUsersByCriteria(name, email);
        return users.stream()
                .map(userAssembler::toModel)
                .collect(Collectors.toList());
    }
}
