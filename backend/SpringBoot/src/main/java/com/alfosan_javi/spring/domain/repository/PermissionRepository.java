package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Optional<Permission> findByName(String name);  // Change this to Optional<Permission>
}
