package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.service.UserService;
import com.alfosan_javi.spring.domain.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getUserProfile() {
        // Obtén el objeto Authentication del contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Verifica si el usuario está autenticado
        if (authentication == null || !authentication.isAuthenticated()) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        // Obtén el email del usuario autenticado
        String email = authentication.getName(); // Usa getName() para obtener el email
        System.out.println("Email obtenido del token: " + email);

        try {
            // Busca al usuario usando el servicio
            UserDTO userDTO = userService.getUserByEmail(email);
            return ResponseEntity.ok(userDTO);
        } catch (UserNotFoundException ex) {
            // Retorna 404 si no se encuentra el usuario
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<UserDTO[]> getAllUsers() {
        UserDTO[] users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

}
