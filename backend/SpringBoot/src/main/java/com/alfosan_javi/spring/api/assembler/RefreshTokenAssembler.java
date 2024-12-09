package com.alfosan_javi.spring.api.assembler;

import com.alfosan_javi.spring.api.dto.RefreshTokenDTO;
import com.alfosan_javi.spring.domain.model.RefreshToken;
import org.springframework.stereotype.Component;

@Component
public class RefreshTokenAssembler {

    public RefreshTokenDTO toModel(RefreshToken refreshToken) {
        return new RefreshTokenDTO(
                refreshToken.getId(),
                refreshToken.getToken(),
                refreshToken.getUserId(),
                refreshToken.getExpiresAt(),
                refreshToken.getCreatedAt()
        );
    }

    public RefreshToken toEntity(RefreshTokenDTO refreshTokenDTO) {
        return new RefreshToken(
                refreshTokenDTO.getId(),
                refreshTokenDTO.getToken(),
                refreshTokenDTO.getUserId(),
                refreshTokenDTO.getExpiresAt(),
                refreshTokenDTO.getCreatedAt()
        );
    }
}
