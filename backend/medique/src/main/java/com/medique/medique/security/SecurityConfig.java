























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
//             .cors(cors -> {})
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────────────────
//                     .requestMatchers(
//                             "/api/auth/register",
//                             "/api/auth/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital read (patients browse, admin views) ─
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital + approve/reject ─────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital details (staff dashboard) ───────────
//                     // Reads JWT manually — no Spring auth needed
//                     .requestMatchers("/api/hospitals/details").permitAll()

//                     // ── PUBLIC: Doctors (patients browse) ───────────────────
//                     .requestMatchers("/api/doctors/**").permitAll()

//                     // ── PUBLIC: Departments (patients browse) ────────────────
//                     .requestMatchers("/api/departments/**").permitAll()

//                     // ── PUBLIC: Queue (live queue status) ────────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
//             AuthenticationConfiguration config
//     ) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }  




































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

//             // ENABLE CORS
//             .cors(cors -> {})

//             // DISABLE CSRF
//             .csrf(csrf -> csrf.disable())

//             // STATELESS SESSION
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )

//             // AUTHORIZE REQUESTS
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────
//                     .requestMatchers(
//                             "/api/auth/register",
//                             "/api/auth/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital read ────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital ──────────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Doctor endpoints ─────────────────
//                     .requestMatchers(
//                             "/api/doctors/**"
//                     ).permitAll()

//                     // ── PUBLIC: Token endpoints ──────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── EVERYTHING ELSE AUTHENTICATED ────────────
//                     .anyRequest().authenticated()
//             )

//             // JWT FILTER
//             .addFilterBefore(
//                     jwtAuthFilter,
//                     UsernamePasswordAuthenticationFilter.class
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
//             .cors(cors -> {})
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────────────────
//                     .requestMatchers(
//                             "/api/auth/register",
//                             "/api/auth/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital read (patients browse, admin views) ─
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital + approve/reject ─────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital details (staff dashboard) ───────────
//                     // Reads JWT manually — no Spring auth needed
//                     .requestMatchers("/api/hospitals/details").permitAll()

//                     // ── PUBLIC: Doctors (patients browse) ───────────────────
//                     .requestMatchers("/api/doctors/**").permitAll()

//                     // ── PUBLIC: Departments (patients browse) ────────────────
//                     .requestMatchers("/api/departments/**").permitAll()

//                     // ── PUBLIC: Queue (live queue status) ────────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── PUBLIC: Feedback (patient submit + staff read) ────────
//                     // Both endpoints are effectively authenticated via app flow;
//                     // permitting here avoids JWT conflicts across patient/staff tokens.
//                     .requestMatchers("/api/feedback/**").permitAll()

//                     // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
//             AuthenticationConfiguration config
//     ) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }  























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
//             .cors(cors -> {})
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────────────────
//                     .requestMatchers(
//                             "/api/auth/register",
//                             "/api/auth/login"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll() 

//                     .requestMatchers("/api/admin/allTokens").permitAll()

//                     // ── PUBLIC: Hospital read (patients browse, admin views) ─
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital + approve/reject ─────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital details (staff dashboard) ───────────
//                     .requestMatchers("/api/hospitals/details").permitAll()

//                     // ── PUBLIC: Doctors (patients browse) ───────────────────
//                     .requestMatchers("/api/doctors/**").permitAll()

//                     // ── PUBLIC: Departments (patients browse) ────────────────
//                     .requestMatchers("/api/departments/**").permitAll()

//                     // ── PUBLIC: Queue (live queue status) ────────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── PUBLIC: Feedback ─────────────────────────────────────
//                     .requestMatchers("/api/feedback/**").permitAll()

//                     // ── PROTECTED: Patient Reports ────────────────────────────
//                     // JWT is extracted manually in the controller using JwtUtil
//                     // so we permit at Spring Security level but validate in controller
//                     .requestMatchers("/api/patient/reports/**").permitAll()

//                     // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
//             AuthenticationConfiguration config
//     ) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }  
































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
//             .cors(cors -> {})
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────────────────
//                     .requestMatchers(
//                             "/api/auth/register",
//                             "/api/auth/login",
//                             "/api/auth/reset-password"   // ← NEW: Firebase OTP verified on frontend
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll()

//                     .requestMatchers("/api/admin/allTokens").permitAll()

//                     // ── PUBLIC: Hospital read ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital + approve/reject ─────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital details ─────────────────────────────
//                     .requestMatchers("/api/hospitals/details").permitAll()

//                     // ── PUBLIC: Doctors ──────────────────────────────────────
//                     .requestMatchers("/api/doctors/**").permitAll()

//                     // ── PUBLIC: Departments ──────────────────────────────────
//                     .requestMatchers("/api/departments/**").permitAll()

//                     // ── PUBLIC: Queue ────────────────────────────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── PUBLIC: Feedback ─────────────────────────────────────
//                     .requestMatchers("/api/feedback/**").permitAll()

//                     // ── PUBLIC: Patient Reports ──────────────────────────────
//                     .requestMatchers("/api/patient/reports/**").permitAll()

//                     // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
//             AuthenticationConfiguration config
//     ) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }  
























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
//             .cors(cors -> {})
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────────────────
//                     .requestMatchers(
//                             "/api/auth/register",
//                             "/api/auth/login",
//                             "/api/auth/reset-password",  // Firebase OTP verified on frontend
//                             "/api/auth/check-phone"      // ← NEW: check if phone is registered before sending OTP
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll()

//                     .requestMatchers("/api/admin/allTokens").permitAll()

//                     // ── PUBLIC: Hospital read ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital + approve/reject ─────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital details ─────────────────────────────
//                     .requestMatchers("/api/hospitals/details").permitAll()

//                     // ── PUBLIC: Doctors ──────────────────────────────────────
//                     .requestMatchers("/api/doctors/**").permitAll()

//                     // ── PUBLIC: Departments ──────────────────────────────────
//                     .requestMatchers("/api/departments/**").permitAll()

//                     // ── PUBLIC: Queue ────────────────────────────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── PUBLIC: Feedback ─────────────────────────────────────
//                     .requestMatchers("/api/feedback/**").permitAll()

//                     // ── PUBLIC: Patient Reports ──────────────────────────────
//                     .requestMatchers("/api/patient/reports/**").permitAll()

//                     // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
//             AuthenticationConfiguration config
//     ) throws Exception {
//         return config.getAuthenticationManager();
//     }
// }  



























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
// import org.springframework.http.HttpMethod;

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
//             .cors(cors -> {})
//             .csrf(csrf -> csrf.disable())
//             .sessionManagement(session ->
//                     session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//             )
//             .authorizeHttpRequests(auth -> auth

//                     // ── PUBLIC: Patient auth ─────────────────────────────────
//                     .requestMatchers(HttpMethod.POST,
//                             "/api/auth/register",
//                             "/api/auth/login",
//                             "/api/auth/reset-password"
//                     ).permitAll()

//                     // ── PUBLIC: Check if phone is registered (GET) ───────────
//                     .requestMatchers(HttpMethod.GET,
//                             "/api/auth/check-phone"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital auth ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/register",
//                             "/api/hospitals/login"
//                     ).permitAll()

//                     .requestMatchers("/api/admin/allTokens").permitAll()

//                     // ── PUBLIC: Hospital read ────────────────────────────────
//                     .requestMatchers(
//                             "/api/hospitals/approved",
//                             "/api/hospitals/pending",
//                             "/api/hospitals/all"
//                     ).permitAll()

//                     // ── PUBLIC: Single hospital + approve/reject ─────────────
//                     .requestMatchers(
//                             "/api/hospitals/*",
//                             "/api/hospitals/*/approve",
//                             "/api/hospitals/*/reject"
//                     ).permitAll()

//                     // ── PUBLIC: Hospital details ─────────────────────────────
//                     .requestMatchers("/api/hospitals/details").permitAll()

//                     // ── PUBLIC: Doctors ──────────────────────────────────────
//                     .requestMatchers("/api/doctors/**").permitAll()

//                     // ── PUBLIC: Departments ──────────────────────────────────
//                     .requestMatchers("/api/departments/**").permitAll()

//                     // ── PUBLIC: Queue ────────────────────────────────────────
//                     .requestMatchers(
//                             "/api/tokens/queue",
//                             "/api/tokens/summary",
//                             "/api/tokens/slot"
//                     ).permitAll()

//                     // ── PUBLIC: Feedback ─────────────────────────────────────
//                     .requestMatchers("/api/feedback/**").permitAll()

//                     // ── PUBLIC: Patient Reports ──────────────────────────────
//                     .requestMatchers("/api/patient/reports/**").permitAll()

//                     // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
import org.springframework.http.HttpMethod;

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
            .cors(cors -> {})
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth

                    // ── PUBLIC: Patient auth ─────────────────────────────────
                    .requestMatchers(HttpMethod.POST,
                            "/api/auth/register",
                            "/api/auth/login",
                            "/api/auth/reset-password"
                    ).permitAll()

                    // ── PUBLIC: Check phone (GET) ────────────────────────────
                    .requestMatchers(HttpMethod.GET,
                            "/api/auth/check-phone"
                    ).permitAll()

                    // ── PUBLIC: Hospital auth ────────────────────────────────
                    .requestMatchers(
                            "/api/hospitals/register",
                            "/api/hospitals/login"
                    ).permitAll()

                    // ── PUBLIC: Admin ────────────────────────────────────────
                    .requestMatchers("/api/admin/allTokens").permitAll()

                    // ── PUBLIC: Hospital read ────────────────────────────────
                    .requestMatchers(
                            "/api/hospitals/approved",
                            "/api/hospitals/pending",
                            "/api/hospitals/all"
                    ).permitAll()

                    // ── PUBLIC: Single hospital + approve/reject ─────────────
                    .requestMatchers(
                            "/api/hospitals/*",
                            "/api/hospitals/*/approve",
                            "/api/hospitals/*/reject"
                    ).permitAll()

                    // ── PUBLIC: Hospital details ─────────────────────────────
                    .requestMatchers("/api/hospitals/details").permitAll()

                    // ── PUBLIC: Doctors ──────────────────────────────────────
                    .requestMatchers("/api/doctors/**").permitAll()

                    // ── PUBLIC: Departments ──────────────────────────────────
                    .requestMatchers("/api/departments/**").permitAll()

                    // ── PUBLIC: Queue (live status, no login needed) ─────────
                    .requestMatchers(
                            "/api/tokens/queue",
                            "/api/tokens/summary",
                            "/api/tokens/slot"
                    ).permitAll()

                    // ── PUBLIC: Token booking & patient token views ──────────
                    // JWT is validated manually inside the controller via JwtUtil
                    // so Spring Security does not need to enforce it here
                    .requestMatchers(
                            "/api/tokens/book",
                            "/api/tokens/walkin",
                            "/api/tokens/my",
                            "/api/tokens/my/active",
                            "/api/tokens/next",
                            "/api/tokens/complete",
                            "/api/tokens/skip"
                    ).permitAll()

                    // ── PUBLIC: Feedback ─────────────────────────────────────
                    .requestMatchers("/api/feedback/**").permitAll()

                    // ── PUBLIC: Patient Reports ──────────────────────────────
                    .requestMatchers("/api/patient/reports/**").permitAll()

                    // ── PUBLIC: Payment ──────────────────────────────────────
                    .requestMatchers("/api/payment/**").permitAll()

                    // ── EVERYTHING ELSE: requires valid JWT ──────────────────
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
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
}