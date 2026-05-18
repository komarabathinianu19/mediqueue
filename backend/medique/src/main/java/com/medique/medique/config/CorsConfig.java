// package com.medique.medique.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public CorsFilter corsFilter() {

//         CorsConfiguration config = new CorsConfiguration();

//         config.setAllowCredentials(true);

//         config.addAllowedOrigin("http://localhost:8081");
//         config.addAllowedOrigin("http://192.168.0.3:8081");

//         config.addAllowedHeader("*");
//         config.addAllowedMethod("*");

//         UrlBasedCorsConfigurationSource source =
//                 new UrlBasedCorsConfigurationSource();

//         source.registerCorsConfiguration("/**", config);

//         return new CorsFilter(source);
//     }
// }  


























// package com.medique.medique.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import org.springframework.web.filter.CorsFilter;

// @Configuration
// public class CorsConfig {

//     @Bean
//     public CorsFilter corsFilter() {

//         CorsConfiguration config = new CorsConfiguration();

//         // Allow credentials (needed for auth headers)
//         config.setAllowCredentials(true);

//         // ── Local development origins ────────────────────────────────────────
//         config.addAllowedOrigin("http://localhost:8081");
//         config.addAllowedOrigin("http://localhost:8080");

//         // ── Local network — covers any 192.168.x.x IP (your phone/emulator) ─
//         // Add your current machine IP here; update if your IP changes
//         config.addAllowedOrigin("http://192.168.0.3:8081");
//         config.addAllowedOrigin("http://192.168.0.4:8081");   // ← your current IP
//         config.addAllowedOrigin("http://192.168.0.5:8081");

//         // ── Expo Go tunnel origin (uzwh1by-anonymous-8081.exp.direct) ────────
//         // Wildcard pattern for any Expo tunnel URL
//         config.addAllowedOriginPattern("https://*.exp.direct");
//         config.addAllowedOriginPattern("http://*.exp.direct");

//         config.addAllowedHeader("*");
//         config.addAllowedMethod("*");

//         UrlBasedCorsConfigurationSource source =
//                 new UrlBasedCorsConfigurationSource();

//         source.registerCorsConfiguration("/**", config);

//         return new CorsFilter(source);
//     }
// }  























package com.medique.medique.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        // ── Allow credentials (needed for Authorization header) ──────────────
        config.setAllowCredentials(true);

        // ── Local development (browser on same PC) ───────────────────────────
        config.addAllowedOrigin("http://localhost:8080");
        config.addAllowedOrigin("http://localhost:8081");
        config.addAllowedOrigin("http://localhost:19000");  // Expo Go Metro
        config.addAllowedOrigin("http://localhost:19006");  // Expo web

        // ── Your machine IP: 192.168.0.4 ────────────────────────────────────
        // All Expo ports on your IP (phone hits this when on same WiFi)
        config.addAllowedOrigin("http://192.168.0.4:8081");
        config.addAllowedOrigin("http://192.168.0.4:19000");
        config.addAllowedOrigin("http://192.168.0.4:19006");  // ← ADD: Expo web on your IP

        // ── Neighbours on same subnet (other devices / emulators) ───────────
        config.addAllowedOrigin("http://192.168.0.3:8081");
        config.addAllowedOrigin("http://192.168.0.5:8081");

        // ── Wildcard: any 192.168.x.x device on any Expo port ───────────────
        // (Covers IP changes without editing this file again)
        config.addAllowedOriginPattern("http://192.168.*.*:*");

        // ── Expo Go tunnel (uzwh1by-anonymous-8081.exp.direct etc.) ─────────
        config.addAllowedOriginPattern("https://*.exp.direct");
        config.addAllowedOriginPattern("http://*.exp.direct");

        // ── ngrok tunnels (https://abc123.ngrok-free.app) ────────────────────
        config.addAllowedOriginPattern("https://*.ngrok.io");
        config.addAllowedOriginPattern("https://*.ngrok-free.app");

        // ── localtunnel (https://yourname.loca.lt) ───────────────────────────
        config.addAllowedOriginPattern("https://*.loca.lt");

        // ── Allow all headers and HTTP methods ───────────────────────────────
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}