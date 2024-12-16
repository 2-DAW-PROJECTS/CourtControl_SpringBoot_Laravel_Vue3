package com.alfosan_javi.spring.domain.exception;

public class RolePermissionNotFoundException extends RuntimeException {
    public RolePermissionNotFoundException(String message) {
        super(message);
    }
}
