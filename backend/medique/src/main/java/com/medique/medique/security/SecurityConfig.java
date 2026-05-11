




// package com.medique.medique.security;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final JwtAuthFilter jwtAuthFilter;

//     public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
//         this.jwtAuthFilter = jwtAuthFilter;
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

//         http
//             .csrf(csrf -> csrf.disable())

//             .sessionManagement(session ->
//                 session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )

//             .authorizeHttpRequests(auth -> auth

//                 // ─────────────────────────────────────────────────────────
//                 // PUBLIC AUTH APIs
//                 // ─────────────────────────────────────────────────────────
//                 .requestMatchers(
//                     "/api/auth/register",
//                     "/api/auth/login",
//                     "/api/hospitals/register",
//                     "/api/hospitals/login"
//                 ).permitAll()

//                 // ─────────────────────────────────────────────────────────
//                 // HOSPITAL ADMIN APIs
//                 // ─────────────────────────────────────────────────────────
//                 .requestMatchers(
//                     "/api/hospitals/pending",
//                     "/api/hospitals/all",
//                     "/api/hospitals/*",
//                     "/api/hospitals/*/approve",
//                     "/api/hospitals/*/reject"
//                 ).permitAll()

//                 // ─────────────────────────────────────────────────────────
//                 // EVERYTHING ELSE REQUIRES AUTH
//                 // ─────────────────────────────────────────────────────────
//                 .anyRequest().authenticated()
//             )

//             .addFilterBefore(
//                 jwtAuthFilter,
//                 UsernamePasswordAuthenticationFilter.class
//             );

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration config
//     ) throws Exception {

//         return config.getAuthenticationManager();
//     }
// }  






















package com.medique.medique.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http

            // ENABLE CORS
            .cors(cors -> {})

            // DISABLE CSRF
            .csrf(csrf -> csrf.disable())

            // STATELESS SESSION
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // AUTHORIZE REQUESTS
            .authorizeHttpRequests(auth -> auth

                    // ── PUBLIC: Patient auth ─────────────────────
                    .requestMatchers(
                            "/api/auth/register",
                            "/api/auth/login"
                    ).permitAll()

                    // ── PUBLIC: Hospital auth ────────────────────
                    .requestMatchers(
                            "/api/hospitals/register",
                            "/api/hospitals/login"
                    ).permitAll()

                    // ── PUBLIC: Hospital read ────────────────────
                    .requestMatchers(
                            "/api/hospitals/approved",
                            "/api/hospitals/pending",
                            "/api/hospitals/all"
                    ).permitAll()

                    // ── PUBLIC: Single hospital ──────────────────
                    .requestMatchers(
                            "/api/hospitals/*",
                            "/api/hospitals/*/approve",
                            "/api/hospitals/*/reject"
                    ).permitAll()

                    // ── PUBLIC: Doctor endpoints ─────────────────
                    .requestMatchers(
                            "/api/doctors/**"
                    ).permitAll()

                    // ── PUBLIC: Token endpoints ──────────────────
                    .requestMatchers(
                            "/api/tokens/queue",
                            "/api/tokens/summary",
                            "/api/tokens/slot"
                    ).permitAll()

                    // ── EVERYTHING ELSE AUTHENTICATED ────────────
                    .anyRequest().authenticated()
            )

            // JWT FILTER
            .addFilterBefore(
                    jwtAuthFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }
}