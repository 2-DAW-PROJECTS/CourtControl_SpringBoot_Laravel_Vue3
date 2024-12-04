package com.alfosan_javi.spring.api.controller;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody @Valid UserDTO userDTO) {
        UserDTO createdUser = userService.register(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }
}
