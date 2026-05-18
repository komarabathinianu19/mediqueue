// package com.medique.medique.security;



// import jakarta.servlet.*;
// import jakarta.servlet.http.*;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;
// import java.util.List;

// @Component
// @RequiredArgsConstructor
// public class JwtAuthFilter extends OncePerRequestFilter {

//     private final JwtUtil jwtUtil;

//     @Override
//     protected void doFilterInternal(HttpServletRequest request,
//                                     HttpServletResponse response,
//                                     FilterChain filterChain)
//             throws ServletException, IOException {

//         String authHeader = request.getHeader("Authorization");

//         // Expect "Bearer <token>"
//         if (authHeader != null && authHeader.startsWith("Bearer ")) {
//             String token = authHeader.substring(7);

//             if (jwtUtil.validateToken(token)) {
//                 Long userId = jwtUtil.extractUserId(token);
//                 String role  = jwtUtil.extractRole(token);

//                 var auth = new UsernamePasswordAuthenticationToken(
//                         userId,
//                         null,
//                         List.of(new SimpleGrantedAuthority("ROLE_" + role))
//                 );
//                 SecurityContextHolder.getContext().setAuthentication(auth);
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }  
























package com.medique.medique.security;



import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

@Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain)
        throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");

    if (authHeader != null && authHeader.startsWith("Bearer ")) {
        String token = authHeader.substring(7);

        if (jwtUtil.validateToken(token)) {
            // 1. EXTRACT AS STRING: This handles both "123" and "HSP-XXXX"
            String subject = jwtUtil.extractSubject(token);
            String role = jwtUtil.extractRole(token);

            // 2. USE SUBJECT AS PRINCIPAL: Spring Security doesn't require the principal 
            // to be a Long; a String is actually more standard.
            var auth = new UsernamePasswordAuthenticationToken(
                    subject, 
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_" + role))
            );
            
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
    }

    filterChain.doFilter(request, response);
}
}