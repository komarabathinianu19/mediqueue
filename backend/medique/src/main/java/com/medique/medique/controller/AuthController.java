


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
import com.medique.medique.dto.SendOtpRequest;
import com.medique.medique.service.UserService;
import com.medique.medique.service.TwilioOTPService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;
    private final TwilioOTPService twilioOTPService;

    public AuthController(UserService userService, TwilioOTPService twilioOTPService) {
        this.userService = userService;
        this.twilioOTPService = twilioOTPService;
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
    // Called BEFORE sending Twilio OTP — checks if phone exists in MySQL.
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

    // ── SEND OTP VIA TWILIO ──────────────────────────────────────────────────
    @PostMapping("/otp/send")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest req) {
        try {
            String phone = req.getPhone().trim();
            if (!phone.startsWith("+")) {
                phone = "+91" + phone;
            }

            boolean registered = userService.isPhoneRegistered(phone);
            if (!registered) {
                return ResponseEntity.status(404)
                        .body(Map.of("message", "This phone number is not registered."));
            }

            boolean sent = twilioOTPService.sendOTP(phone);
            if (sent) {
                return ResponseEntity.ok(Map.of("message", "OTP sent successfully."));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Unable to send OTP."));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── RESET PASSWORD ────────────────────────────────────────────────────────
    // Called after OTP is verified. Now the backend verifies the code with Twilio
    // before performing the actual database reset.
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
        try {
            String phone = req.getPhone().trim();
            if (!phone.startsWith("+")) {
                phone = "+91" + phone;
            }

            // 1. Verify OTP code with Twilio BEFORE changing password
            boolean isValid = twilioOTPService.verifyOTP(phone, req.getCode().trim());
            if (!isValid) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP code."));
            }

            // 2. Perform database update
            userService.resetPassword(phone, req.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password reset successful."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

}