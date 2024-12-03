package com.alfosan_javi.spring.domain.service;

import com.alfosan_javi.spring.api.dto.UserDTO;
import com.alfosan_javi.spring.domain.model.User;
import com.alfosan_javi.spring.domain.repository.UserRepository;
import com.alfosan_javi.spring.domain.repository.UserSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener un usuario por ID
    public Optional<User> getUserById(long id) {
        return userRepository.findById(id);
    }

    // Crear un nuevo usuario
    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setRememberToken(userDTO.getRememberToken());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        return userRepository.save(user);
    }

    // Actualizar un usuario existente
    public User updateUser(long id, UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findById(id);
        if (!existingUser.isPresent()) {
            return null;
        }
        User user = existingUser.get();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setEmailVerifiedAt(userDTO.getEmailVerifiedAt());
        user.setRememberToken(userDTO.getRememberToken());
        user.setUpdatedAt(userDTO.getUpdatedAt());
        return userRepository.save(user);
    }

    // Eliminar un usuario por ID
    public boolean deleteUser(long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Método para obtener usuarios según criterios dinámicos
    public List<User> getUsersByCriteria(String name, String email) {
        Specification<User> spec = Specification.where(UserSpecification.hasName(name))
                                                .and(UserSpecification.hasEmail(email));

        return userRepository.findAll(spec);  // Devuelve usuarios que coinciden con las especificaciones
    }
}
