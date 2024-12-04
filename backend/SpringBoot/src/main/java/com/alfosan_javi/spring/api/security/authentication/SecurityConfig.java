package com.alfosan_javi.spring.api.security.authentication;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Configuración de Argon2 para cifrar contraseñas
        return new Argon2PasswordEncoder(
                16, // Salt length
                32, // Hash length
                1,  // Paralelismo
                65536, // Memory cost
                3 // Iteraciones
        );
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Comentando esta parte para no aplicar ninguna configuración de seguridad
        http.csrf().disable().authorizeHttpRequests().anyRequest().permitAll();
        return http.build();
    }
}
