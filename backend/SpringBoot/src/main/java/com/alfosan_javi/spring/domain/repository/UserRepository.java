package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    // Este repositorio ahora tiene acceso a consultas más complejas utilizando Specifications
}
