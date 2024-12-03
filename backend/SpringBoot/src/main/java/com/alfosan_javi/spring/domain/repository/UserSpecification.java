package com.alfosan_javi.spring.domain.repository;

import com.alfosan_javi.spring.domain.model.User;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {

    public static Specification<User> hasName(String name) {
        return (root, query, criteriaBuilder) -> {
            if (name == null || name.isEmpty()) {
                return null;
            }
            return criteriaBuilder.like(root.get("name"), "%" + name + "%");
        };
    }

    public static Specification<User> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> {
            if (email == null || email.isEmpty()) {
                return null;
            }
            return criteriaBuilder.equal(root.get("email"), email);
        };
    }

    public static Specification<User> hasEmailVerifiedAt() {
        return (root, query, criteriaBuilder) -> {
            if (root.get("emailVerifiedAt") == null) {
                return null;
            }
            return criteriaBuilder.isNotNull(root.get("emailVerifiedAt"));
        };
    }
}
