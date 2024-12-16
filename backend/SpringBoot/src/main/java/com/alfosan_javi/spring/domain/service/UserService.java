package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.assembler.UserAssembler;
import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.exception.UserNotFoundException;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserAssembler userAssembler;

    public UserService(UserRepository userRepository, UserAssembler userAssembler) {
        this.userRepository = userRepository;
        this.userAssembler = userAssembler;
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        // Convertir el usuario a UserDTO
        return userAssembler.toDTO(user);
    }
}
