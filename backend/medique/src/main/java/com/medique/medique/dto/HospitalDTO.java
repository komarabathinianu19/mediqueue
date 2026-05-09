package com.medique.medique.dto;



import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

// =============================================
// HOSPITAL DTOs
// =============================================
public class HospitalDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegisterRequest {

        @NotBlank(message = "Hospital name is required")
        private String name;

        private String ownerName;

        @NotBlank(message = "Phone is required")
        private String phone;

        private String email;
        private String hospitalType;
        private String address;
        private String city;
        private String imageUrl;

        @NotBlank(message = "Registration number is required")
        private String registrationNo;

        @NotBlank(message = "License number is required")
        private String licenseNo;

        private String departments;

        @Min(value = 1, message = "Doctor count must be at least 1")
        private Integer doctorCount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {
        private Long id;
        private String name;
        private String ownerName;
        private String phone;
        private String email;
        private String hospitalType;
        private String address;
        private String city;
        private String imageUrl;
        private String registrationNo;
        private String licenseNo;
        private String departments;
        private Integer doctorCount;
        private String status;
        private LocalDateTime submittedAt;
    }
}