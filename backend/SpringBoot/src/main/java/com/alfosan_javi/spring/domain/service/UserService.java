package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.assembler.UserAssembler;
import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.exception.UserNotFoundException;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserAssembler userAssembler;

    public UserService(UserRepository userRepository, UserAssembler userAssembler) {
        this.userRepository = userRepository;
        this.userAssembler = userAssembler;
    }

    // public UserDTO getUserByEmail(String email) {
    //     User user = userRepository.findByEmail(email)
    //             .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
    //     // Convertir el usuario a UserDTO
    //     return userAssembler.toDTO(user);
    // }
    public UserDTO getUserByEmail(String email) throws UserNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return userAssembler.toDTO(user);
    }

    // public UserDTO[] getAllUsers() {
    //     List<User> users = userRepository.findAll();
    //     if (users.isEmpty()) {
    //         throw new UserNotFoundException("No users found");
    //     }
    //     return users.stream()
    //             .map(userAssembler::toDTO)
    //             .toArray(UserDTO[]::new);
    // }
    public UserDTO[] getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new UserNotFoundException("No users found");
        }
        return users.stream()
                .map(userAssembler::toDTO)
                .toArray(UserDTO[]::new);
    }

    public void deleteUserById(Long id) throws UserNotFoundException {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        user.getRoles().clear();
        userRepository.save(user);
        userRepository.deleteById(id);
    }
    
    public UserDTO updateUserById(Long id, UserDTO userDTO) throws UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        userAssembler.updateEntityFromDTO(userDTO, user);
        User updatedUser = userRepository.save(user);
        return userAssembler.toDTO(updatedUser);
    }

    public UserDTO getUserById(Long id) throws UserNotFoundException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return userAssembler.toDTO(user);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

}