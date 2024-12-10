package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);  // Método para encontrar un rol por nombre
}
