package com.alfosan_javi.spring.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
}
// package com.alfosan_javi.spring.api.response;

// import lombok.AllArgsConstructor;
// import lombok.Data;

// @Data
// @AllArgsConstructor
// public class LoginResponse {
//     private String accessToken;
//     private String refreshToken;
// }
