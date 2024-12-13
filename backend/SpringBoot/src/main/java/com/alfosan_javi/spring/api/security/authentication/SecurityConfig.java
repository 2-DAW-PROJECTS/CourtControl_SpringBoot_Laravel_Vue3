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
        return new Argon2PasswordEncoder(16, 32, 1, 65536, 3);
    }

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .cors()
        .and()
        .authorizeHttpRequests()
        .requestMatchers("/api/auth/**", "/api/courts/**", "/api/lessons/**", "/api/summers/**").permitAll()
        .requestMatchers("/api/auth/profile").authenticated()
        .requestMatchers("/admin/**").hasRole("ROLE_ADMIN")
        .requestMatchers("/employee/**").hasAnyRole("ROLE_EMPLOYEE", "ROLE_ADMIN")
        .requestMatchers("/client/**").hasAnyRole("ROLE_CLIENT", "ROLE_EMPLOYEE", "ROLE_ADMIN")
        .anyRequest().authenticated()
        .and()
        .addFilterBefore(new JwtAuthenticationFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

}
