package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    // Métodos personalizados
    Optional<User> findByEmail(String email);
}
