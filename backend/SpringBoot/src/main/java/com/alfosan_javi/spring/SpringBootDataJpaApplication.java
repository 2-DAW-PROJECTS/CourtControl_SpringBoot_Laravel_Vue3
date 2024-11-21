package com.alfosan_javi.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.alfosan_javi.spring")
@EnableJpaRepositories(basePackages = "com.alfosan_javi.spring.domain.repository")
public class SpringBootDataJpaApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpringBootDataJpaApplication.class, args);
    }
}
