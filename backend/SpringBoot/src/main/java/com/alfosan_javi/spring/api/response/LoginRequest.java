package com.alfosan_javi.spring.api.response;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
