package com.alfosan_javi.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Aplica CORS a todas las rutas
                .allowedOrigins("http://localhost:8081", "http://localhost:3000")  // Permitir solicitudes desde ambos orígenes
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Métodos permitidos
                .allowedHeaders("*")  // Permitir todos los encabezados
                .allowCredentials(true)  // Permitir cookies y credenciales
                .maxAge(3600);  // Tiempo de vida de la configuración CORS
    }
}
