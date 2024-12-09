package com.alfosan_javi.spring.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenDTO {

    private Long id;
    private String token;
    private String userId;
    private Instant expiresAt;
    private Instant createdAt;
}
