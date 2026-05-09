package com.medique.medique.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth

                // ── PUBLIC endpoints (no token needed) ──────────────────────
                .requestMatchers(
                    // Single unified auth endpoints (what Postman + app use)
                    "/api/auth/register",
                    "/api/auth/login",

                    // Patient-specific auth (if you add these later)
                    "/api/auth/patient/login",
                    "/api/auth/patient/register",
                    "/api/auth/patient/forgot-password",
                    "/api/auth/patient/reset-password",

                    // Staff-specific auth
                    "/api/auth/staff/login",

                    // Hospital registration (public — staff submits before login)
                    "/api/hospitals/register",

                    // Public hospital listing
                    "/api/hospitals",
                    "/api/hospitals/**",

                    // Static file uploads
                    "/uploads/**"
                ).permitAll()

                // ── ROLE-BASED endpoints ─────────────────────────────────────
                .requestMatchers("/api/patient/**").hasRole("PATIENT")
                .requestMatchers("/api/staff/**").hasRole("STAFF")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // ── Everything else needs valid JWT ──────────────────────────
                .anyRequest().authenticated()
            )

            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Allows all origins — fine for dev; restrict in production
        config.setAllowedOriginPatterns(List.of("*"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}