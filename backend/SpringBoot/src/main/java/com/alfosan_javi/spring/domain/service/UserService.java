package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.assembler.UserAssembler;
import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserAssembler userAssembler;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserAssembler userAssembler) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userAssembler = userAssembler;
    }

    public UserDTO register(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use");
        }

        User user = userAssembler.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

        User savedUser = userRepository.save(user);

        return userAssembler.toModel(savedUser);
    }

}
