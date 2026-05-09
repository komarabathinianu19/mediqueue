package com.medique.medique.dto;




import jakarta.validation.constraints.*;
import lombok.*;

// =============================================
// AUTH DTOs
// =============================================

public class AuthDTO {

    // Patient Login Request
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientLoginRequest {
        @NotBlank(message = "Phone is required")
        private String phone;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;
    }

    // Patient Register Request
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientRegisterRequest {

        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Phone is required")
        private String phone;

        @NotBlank(message = "Age is required")
        private String age;

        @NotBlank(message = "Gender is required")
        private String gender;

        private String bloodGroup;

        @NotBlank(message = "City is required")
        private String city;

        private String allergies;
        private String medicalNotes;

        @NotBlank(message = "Emergency contact is required")
        private String emergencyContact;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Confirm password is required")
        private String confirmPassword;
    }

    // Staff Login Request
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StaffLoginRequest {

        @NotBlank(message = "Hospital ID is required")
        private String hospitalId;

        @NotBlank(message = "Email / Mobile is required")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;
    }

    // Forgot Password (Step 1 — send OTP)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ForgotPasswordRequest {
        @NotBlank(message = "Phone is required")
        private String phone;
    }

    // Reset Password (Step 2 — submit OTP + new password)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResetPasswordRequest {

        @NotBlank(message = "Phone is required")
        private String phone;

        @NotBlank(message = "OTP is required")
        private String otp;

        @NotBlank(message = "New password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String newPassword;

        @NotBlank(message = "Confirm password is required")
        private String confirmPassword;
    }

    // Auth Response (sent after successful login/register)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuthResponse {
        private String token;
        private String role;   // PATIENT or STAFF
        private Long userId;
        private String name;
        private String message;
    }
}