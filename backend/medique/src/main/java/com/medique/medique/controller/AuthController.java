


// package com.medique.medique.controller;

// import com.medique.medique.dto.AuthRequest;
// import com.medique.medique.dto.AuthResponse;
// import com.medique.medique.dto.RegisterRequest;
// import com.medique.medique.service.UserService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")
// public class AuthController {

//     private final UserService userService;

//     public AuthController(UserService userService) {
//         this.userService = userService;
//     }

//     // ── PATIENT REGISTER ──────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
//         try {
//             AuthResponse res = userService.register(req);
//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── PATIENT LOGIN ─────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody AuthRequest req) {
//         try {
//             AuthResponse res = userService.login(req);
//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }
// }  



























// package com.medique.medique.controller;

// import com.medique.medique.dto.AuthRequest;
// import com.medique.medique.dto.AuthResponse;
// import com.medique.medique.dto.RegisterRequest;
// import com.medique.medique.dto.ResetPasswordRequest;
// import com.medique.medique.service.UserService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/auth")
// @CrossOrigin(origins = "*")
// public class AuthController {

//     private final UserService userService;

//     public AuthController(UserService userService) {
//         this.userService = userService;
//     }

//     // ── PATIENT REGISTER ──────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
//         try {
//             AuthResponse res = userService.register(req);
//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── PATIENT LOGIN ─────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody AuthRequest req) {
//         try {
//             AuthResponse res = userService.login(req);
//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── RESET PASSWORD (called after Firebase OTP verified on frontend) ───────
//     // No JWT needed here — Firebase OTP already proved the user owns the phone.
//     @PostMapping("/reset-password")
//     public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
//         try {
//             userService.resetPassword(req.getPhone(), req.getNewPassword());
//             return ResponseEntity.ok(Map.of("message", "Password reset successful."));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     } 


//     // Add to AuthController.java
// @GetMapping("/check-phone")
// public ResponseEntity<?> checkPhone(@RequestParam String phone) {
//     boolean registered = userService.isPhoneRegistered(phone);
//     if (registered) {
//         return ResponseEntity.ok(Map.of("registered", true));
//     } else {
//         return ResponseEntity.status(404).body(Map.of("registered", false, "message", "Phone number is not registered."));
//     }
// }
// }  



































package com.medique.medique.controller;

import com.medique.medique.dto.AuthRequest;
import com.medique.medique.dto.AuthResponse;
import com.medique.medique.dto.RegisterRequest;
import com.medique.medique.dto.ResetPasswordRequest;
import com.medique.medique.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ── PATIENT REGISTER ──────────────────────────────────────────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        try {
            AuthResponse res = userService.register(req);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── PATIENT LOGIN ─────────────────────────────────────────────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        try {
            AuthResponse res = userService.login(req);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── CHECK PHONE REGISTERED ────────────────────────────────────────────────
    // Called BEFORE sending Firebase OTP — checks if phone exists in MySQL.
    // Returns 200 if registered, 404 if not. No JWT needed.
    @GetMapping("/check-phone")
    public ResponseEntity<?> checkPhone(@RequestParam String phone) {
        try {
            boolean registered = userService.isPhoneRegistered(phone);
            if (registered) {
                return ResponseEntity.ok(Map.of("registered", true));
            } else {
                return ResponseEntity.status(404)
                        .body(Map.of("registered", false, "message", "Phone number is not registered."));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── RESET PASSWORD ────────────────────────────────────────────────────────
    // Called after Firebase OTP is verified on the frontend.
    // No JWT needed — Firebase OTP already proved the user owns the phone.
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
        try {
            userService.resetPassword(req.getPhone(), req.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password reset successful."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

}