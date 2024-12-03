package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    public User createUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            return null; // Se podría lanzar una excepción específica
        }

        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setRememberToken(userDTO.getRememberToken());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public User updateUser(long id, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (!existingUser.isPresent()) {
            return null;
        }

        User user = existingUser.get();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setRememberToken(userDTO.getRememberToken());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public boolean deleteUser(long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
