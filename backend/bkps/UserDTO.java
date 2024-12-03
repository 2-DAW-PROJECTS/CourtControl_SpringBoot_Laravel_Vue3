package com.alfosan_javi.spring.api.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private long id;
    private String name;
    private String email;
    private String password;
    private LocalDateTime emailVerifiedAt;
    private String rememberToken;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
