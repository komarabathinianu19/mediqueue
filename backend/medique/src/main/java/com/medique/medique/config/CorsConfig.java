package com.medique.medique.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    // ✅ This bean is used by Spring Security (.cors(cors -> cors.configurationSource(...)))
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);

        // ── Localhost ports ──────────────────────────────────────────────────
        config.addAllowedOrigin("http://localhost:8080");
        config.addAllowedOrigin("http://localhost:8081");
        config.addAllowedOrigin("http://localhost:8082"); // ✅ your web frontend
        config.addAllowedOrigin("http://localhost:8083");
        config.addAllowedOrigin("http://localhost:19006"); // Expo web default

        // ── LAN — covers any 192.168.x.x device/port ────────────────────────
        config.addAllowedOriginPattern("http://192.168.*.*");
        config.addAllowedOriginPattern("http://192.168.*.*:*"); // ✅ with port

        // ── Expo tunnel URLs ─────────────────────────────────────────────────
        config.addAllowedOriginPattern("https://*.exp.direct");
        config.addAllowedOriginPattern("http://*.exp.direct");

        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // ✅ Keep CorsFilter too — handles CORS before Spring Security kicks in
    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }
}