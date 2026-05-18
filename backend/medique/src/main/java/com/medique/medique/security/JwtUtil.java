// package com.medique.medique.security;



// import io.jsonwebtoken.*;
// import io.jsonwebtoken.security.Keys;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;

// import java.security.Key;
// import java.util.Date;

// @Component
// public class JwtUtil {

//     @Value("${jwt.secret}")
//     private String secret;

//     @Value("${jwt.expiration}")
//     private long expirationMs;

//     private Key getSigningKey() {
//         return Keys.hmacShaKeyFor(secret.getBytes());
//     }

//     // Generate token with userId + role as claims
//     public String generateToken(Long userId, String role) {
//         return Jwts.builder()
//                 .setSubject(String.valueOf(userId))
//                 .claim("role", role)
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
//                 .signWith(getSigningKey(), SignatureAlgorithm.HS256)
//                 .compact();
//     }

//     // Extract userId from token
//     public Long extractUserId(String token) {
//         return Long.parseLong(
//             Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody()
//                 .getSubject()
//         );
//     }

//     // Extract role from token
//     public String extractRole(String token) {
//         return (String) Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token)
//                 .getBody()
//                 .get("role");
//     }

//     // Validate token
//     public boolean validateToken(String token) {
//         try {
//             Jwts.parserBuilder()
//                 .setSigningKey(getSigningKey())
//                 .build()
//                 .parseClaimsJws(token);
//             return true;
//         } catch (JwtException | IllegalArgumentException e) {
//             return false;
//         }
//     }
// }  





















package com.medique.medique.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ── Patient token (subject = userId Long) ─────────────────────────────────
    public String generateToken(Long userId, String role) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ── Hospital/Staff token (subject = hospitalId string like "HSP-XXXX") ────
    public String generateHospitalToken(String hospitalId, String role) {
        return Jwts.builder()
                .setSubject(hospitalId)           // "HSP-XXXX"
                .claim("role", role)
                .claim("isHospital", true)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ── Extract subject (works for both patient Long id and hospital HSP-XXXX) ─
    public String extractSubject(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // // ── Keep old method for backward compatibility with patient auth ───────────
    // public Long extractUserId(String token) {
    //     return Long.parseLong(extractSubject(token));
    // }  


    // Safe version for backward compatibility
public Long extractUserId(String token) {
    String subject = extractSubject(token);
    try {
        // Only parse if the subject is numeric
        if (subject != null && subject.matches("\\d+")) {
            return Long.parseLong(subject);
        }
    } catch (NumberFormatException e) {
        return null;
    }
    return null; // Return null if it's a Hospital ID (like HSP-XXXX)
}

    // ── Check if token belongs to a hospital ─────────────────────────────────
    public boolean isHospitalToken(String token) {
        try {
            Object flag = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .get("isHospital");
            return Boolean.TRUE.equals(flag);
        } catch (Exception e) {
            return false;
        }
    }

    // ── Extract role ──────────────────────────────────────────────────────────
    public String extractRole(String token) {
        return (String) Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role");
    }

    // ── Validate ──────────────────────────────────────────────────────────────
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}