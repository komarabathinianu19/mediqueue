// package com.medique.medique.entity;



// import jakarta.persistence.*;
// import lombok.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "hospitals")
// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class Hospital {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     // Staff user who registered this hospital
//     @ManyToOne(fetch = FetchType.LAZY)
//     @JoinColumn(name = "staff_user_id")
//     private User staffUser;

//     // Basic Info
//     @Column(nullable = false)
//     private String name;

//     private String ownerName;
//     private String phone;
//     private String email;
//     private String hospitalType;   // e.g. Multi-speciality
//     private String address;
//     private String city;
//     private String imageUrl;

//     // Licensing
//     @Column(unique = true)
//     private String registrationNo;

//     @Column(unique = true)
//     private String licenseNo;

//     private String departments;    // comma-separated
//     private Integer doctorCount;

//     // Status: PENDING_VERIFICATION / APPROVED / REJECTED
//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private VerificationStatus status;

//     @Column(nullable = false, updatable = false)
//     private LocalDateTime submittedAt;

//     @PrePersist
//     protected void onCreate() {
//         submittedAt = LocalDateTime.now();
//         if (status == null) status = VerificationStatus.PENDING_VERIFICATION;
//     }

//     public enum VerificationStatus {
//         PENDING_VERIFICATION, APPROVED, REJECTED
//     }
// }

// package com.medique.medique.entity;

// import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
// import jakarta.persistence.*;
// import lombok.Data;
// import org.hibernate.annotations.CreationTimestamp;

// import java.time.LocalDateTime;

// @Entity
// @Table(name = "hospitals")
// @Data
// public class Hospital {

//     public enum VerificationStatus {
//         PENDING, APPROVED, REJECTED
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     // ── Basic Info ──────────────────────────────────────────────────────────
//     @Column(nullable = false)
//     private String name;

//     private String ownerName;
//     private String phone;
//     private String email;
//     private String type;
//     private String address;
//     private String city;

//     // ── Licensing ───────────────────────────────────────────────────────────
//     // ⚠️  Column names use snake_case in DB, Java field names use camelCase
//     //     Hibernate maps them automatically
//     @Column(name = "registration_no", unique = true)
//     private String registrationNo;       // ← service calls setRegistrationNo()

//     @Column(name = "license_no", unique = true)
//     private String licenseNo;            // ← service calls setLicenseNo()

//     // ── Staff Info ──────────────────────────────────────────────────────────
//     private String departments;
//     private Integer numberOfDoctors;

//     // ── Media ───────────────────────────────────────────────────────────────
//     private String imageUrl;

//     // ── Status ──────────────────────────────────────────────────────────────
//     @Enumerated(EnumType.STRING)
//     @Column(nullable = false)
//     private VerificationStatus status = VerificationStatus.PENDING;

//     // ── Submitted By (optional — null if anonymous submit) ──────────────────
//     // ⚠️  ManyToOne with optional=true prevents crash when userId is null
//     @ManyToOne(fetch = FetchType.LAZY, optional = true)
//     @JoinColumn(name = "submitted_by", nullable = true)
//     @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//     private User submittedBy;

//     // ── Timestamps ──────────────────────────────────────────────────────────
//     @CreationTimestamp
//     @Column(updatable = false)
//     private LocalDateTime createdAt;
// }

package com.medique.medique.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "hospitals")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {

    public enum VerificationStatus {
        PENDING, APPROVED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String ownerName;
    private String phone;
    private String email;
    private String hospitalType;
    private String address;
    private String city;

    @Column(name = "registration_no", unique = true)
    private String registrationNo;

    @Column(name = "license_no", unique = true)
    private String licenseNo;

    private String departments;
    private Integer doctorCount;
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private VerificationStatus status = VerificationStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "submitted_by", nullable = true)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User staffUser;

    @CreationTimestamp
    @Column(name = "submitted_at", updatable = false)   // ← maps to DB's submitted_at
    private LocalDateTime submittedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)     // ← maps to DB's created_at
    private LocalDateTime createdAt;
}