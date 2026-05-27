// package com.medique.medique.security;

// import org.springframework.beans.factory.annotation.Autowired;
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
// import org.springframework.http.HttpMethod;
// import org.springframework.web.cors.CorsConfigurationSource;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

//     private final JwtAuthFilter jwtAuthFilter;

//     @Autowired
//     private CorsConfigurationSource corsConfigurationSource;

//     public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
//         this.jwtAuthFilter = jwtAuthFilter;
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

//         http
//             .cors(cors -> cors.configurationSource(corsConfigurationSource))
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//             .authorizeHttpRequests(auth -> auth

//                     .requestMatchers(HttpMethod.POST,
//                             "/api/auth/register",
//                             "/api/auth/login",
//                             "/api/auth/reset-password",
//                             "/api/auth/otp/send")
//                     .permitAll()

//                     .requestMatchers(HttpMethod.GET,
//                             "/api/auth/check-phone")
//                     .permitAll()

//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login",
//                             "/api/hospitals/check-phone",
//                             "/api/hospitals/otp/send",
//                             "/api/hospitals/reset-password")
//                     .permitAll()

//                     .requestMatchers("/api/admin/allTokens").permitAll()

//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all")
//                     .permitAll()

//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject")
//                     .permitAll()

//                     .requestMatchers("/api/hospitals/details").permitAll()
//                     .requestMatchers("/api/doctors/**").permitAll()
//                     .requestMatchers("/api/departments/**").permitAll()

//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot",
//                             "/api/tokens/book",
//                             "/api/tokens/walkin",
//                             "/api/tokens/my",
//                             "/api/tokens/my/active",
//                             "/api/tokens/next",
//                             "/api/tokens/complete",
//                             "/api/tokens/skip")
//                     .permitAll()

//                     .requestMatchers("/api/feedback/**").permitAll()
//                     .requestMatchers("/api/patient/reports/**").permitAll()
//                     .requestMatchers("/api/payment/**").permitAll()

//                     .anyRequest().authenticated()
//             )
//             .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

//         return http.build();
//     }

//     @Bean
//     public PasswordEncoder passwordEncoder() {
//         return new BCryptPasswordEncoder();
//     }

//     @Bean
//     public AuthenticationManager authenticationManager(
//             AuthenticationConfiguration config) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }  

































package com.medique.medique.security;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth

                    // ── Patient Auth ───────────────────────────────────────
                    .requestMatchers(HttpMethod.POST,
                            "/api/auth/register",
                            "/api/auth/login",
                            "/api/auth/reset-password",
                            "/api/auth/otp/send")
                    .permitAll()

                    .requestMatchers(HttpMethod.GET,
                            "/api/auth/check-phone")
                    .permitAll()

                    // ── Hospital (Staff) Auth ──────────────────────────────
                    .requestMatchers(
                            "/api/hospitals/register",
                            "/api/hospitals/login",
                            "/api/hospitals/check-phone",
                            "/api/hospitals/otp/send",
                            "/api/hospitals/reset-password")
                    .permitAll()

                    // ── Admin Auth ─────────────────────────────────────────
                    // ✅ ADDED: allow admin login + reset-password without JWT
                    .requestMatchers(HttpMethod.POST,
                            "/api/admin/login",
                            "/api/admin/reset-password")
                    .permitAll()

                    // ── Admin Data ─────────────────────────────────────────
                    .requestMatchers("/api/admin/allTokens").permitAll()
                    .requestMatchers("/api/admin/stats").permitAll()

                    // ── Hospital Public Endpoints ──────────────────────────
                    .requestMatchers(
                            "/api/hospitals/approved",
                            "/api/hospitals/pending",
                            "/api/hospitals/all")
                    .permitAll()

                    .requestMatchers(
                            "/api/hospitals/*",
                            "/api/hospitals/*/approve",
                            "/api/hospitals/*/reject")
                    .permitAll()

                    .requestMatchers("/api/hospitals/details").permitAll()
                    .requestMatchers("/api/doctors/**").permitAll()
                    .requestMatchers("/api/departments/**").permitAll()

                    // ── Token Endpoints ────────────────────────────────────
                    .requestMatchers(
                            "/api/tokens/queue",
                            "/api/tokens/summary",
                            "/api/tokens/slot",
                            "/api/tokens/book",
                            "/api/tokens/walkin",
                            "/api/tokens/my",
                            "/api/tokens/my/active",
                            "/api/tokens/next",
                            "/api/tokens/complete",
                            "/api/tokens/skip")
                    .permitAll()

                    // ── Other Public Endpoints ─────────────────────────────
                    .requestMatchers("/api/feedback/**").permitAll()
                    .requestMatchers("/api/patient/reports/**").permitAll()
                    .requestMatchers("/api/payment/**").permitAll()

                    .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}