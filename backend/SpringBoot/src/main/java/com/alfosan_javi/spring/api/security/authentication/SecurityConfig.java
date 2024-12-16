package com.alfosan_javi.spring.api.security.authentication;

import com.alfosan_javi.spring.api.security.jwt.JwtAuthenticationFilter;
import com.alfosan_javi.spring.api.security.jwt.JwtUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtils jwtUtils;

    public SecurityConfig(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Configuramos Argon2PasswordEncoder con parámetros personalizados
        return new Argon2PasswordEncoder(16, 32, 1, 65536, 3);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .cors()
            .and()
            .authorizeHttpRequests()
            // Rutas públicas
            .requestMatchers("/api/auth/**", "/api/courts/**", "/api/lessons/**", "/api/summers/**").permitAll()
            // Rutas protegidas
            .requestMatchers("/api/users/profile").authenticated()
            .requestMatchers("/admin/**").hasRole("ADMIN")
            .requestMatchers("/employee/**").hasAnyRole("EMPLOYEE", "ADMIN")
            .requestMatchers("/client/**").hasAnyRole("CLIENT", "EMPLOYEE", "ADMIN")
            .anyRequest().authenticated()
            .and()
            // Agregar el filtro JWT antes del filtro de autenticación estándar de Spring
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
