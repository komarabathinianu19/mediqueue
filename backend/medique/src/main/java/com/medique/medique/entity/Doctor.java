// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "doctors")
// public class Doctor {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     // FK → hospitals.hospital_id (string like "HSP-XXXX")
//     @Column(nullable = false)
//     private String hospitalId;

//     @Column(nullable = false)
//     private String name;

//     @Column(nullable = false)
//     private String department;

//     private String qualification;
//     private String experience;
//     private Integer fee;
//     private String imageUrl;

//     // Timings stored as JSON string: {"morning":{...},"afternoon":{...},"night":{...}}
//     @Column(columnDefinition = "TEXT")
//     private String timingsJson;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // ── Getters & Setters ────────────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getDepartment() { return department; }
//     public void setDepartment(String department) { this.department = department; }

//     public String getQualification() { return qualification; }
//     public void setQualification(String qualification) { this.qualification = qualification; }

//     public String getExperience() { return experience; }
//     public void setExperience(String experience) { this.experience = experience; }

//     public Integer getFee() { return fee; }
//     public void setFee(Integer fee) { this.fee = fee; }

//     public String getImageUrl() { return imageUrl; }
//     public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

//     public String getTimingsJson() { return timingsJson; }
//     public void setTimingsJson(String timingsJson) { this.timingsJson = timingsJson; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

//     // ── Builder ───────────────────────────────────────────────────────────────
//     public static Builder builder() { return new Builder(); }

//     public static class Builder {
//         private final Doctor d = new Doctor();
//         public Builder hospitalId(String v) { d.hospitalId = v; return this; }
//         public Builder name(String v) { d.name = v; return this; }
//         public Builder department(String v) { d.department = v; return this; }
//         public Builder qualification(String v) { d.qualification = v; return this; }
//         public Builder experience(String v) { d.experience = v; return this; }
//         public Builder fee(Integer v) { d.fee = v; return this; }
//         public Builder imageUrl(String v) { d.imageUrl = v; return this; }
//         public Builder timingsJson(String v) { d.timingsJson = v; return this; }
//         public Doctor build() { return d; }
//     }
// }  
























// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "doctors")
// public class Doctor {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     // FK → hospitals.hospital_id (string like "HSP-XXXX")
//     @Column(nullable = false)
//     private String hospitalId;

//     @Column(nullable = false)
//     private String name;

//     @Column(nullable = false)
//     private String department;

//     private String qualification;
//     private String experience;
//     private Integer fee;
//     private String imageUrl;

//     // Timings stored as JSON string: {"morning":{...},"afternoon":{...},"night":{...}}
//     @Column(columnDefinition = "TEXT")
//     private String timingsJson;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // ── Getters & Setters ────────────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getDepartment() { return department; }
//     public void setDepartment(String department) { this.department = department; }

//     public String getQualification() { return qualification; }
//     public void setQualification(String qualification) { this.qualification = qualification; }

//     public String getExperience() { return experience; }
//     public void setExperience(String experience) { this.experience = experience; }

//     public Integer getFee() { return fee; }
//     public void setFee(Integer fee) { this.fee = fee; }

//     public String getImageUrl() { return imageUrl; }
//     public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

//     public String getTimingsJson() { return timingsJson; }
//     public void setTimingsJson(String timingsJson) { this.timingsJson = timingsJson; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

//     // ── Builder ───────────────────────────────────────────────────────────────
//     public static Builder builder() { return new Builder(); }

//     public static class Builder {
//         private final Doctor d = new Doctor();
//         public Builder hospitalId(String v) { d.hospitalId = v; return this; }
//         public Builder name(String v) { d.name = v; return this; }
//         public Builder department(String v) { d.department = v; return this; }
//         public Builder qualification(String v) { d.qualification = v; return this; }
//         public Builder experience(String v) { d.experience = v; return this; }
//         public Builder fee(Integer v) { d.fee = v; return this; }
//         public Builder imageUrl(String v) { d.imageUrl = v; return this; }
//         public Builder timingsJson(String v) { d.timingsJson = v; return this; }
//         public Doctor build() { return d; }
//     }
// }  






















package com.medique.medique.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String department;

    private String qualification;

    // Links doctor to a hospital (stores hospitalId string, e.g. "HSP-ABC123")
    // @Column(nullable = false)
    // private String hospitalId; 

    @Column(name = "hospital_id", nullable = false)
private String hospitalId;

    // Consultation fee in INR
    private Double fee;

    // JSON string storing morning/afternoon/night slot timings
    @Column(columnDefinition = "TEXT")
    private String timingsJson;

    // Is the doctor currently available?
    private Boolean available = true;

    // ── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getQualification() { return qualification; }
    public void setQualification(String qualification) { this.qualification = qualification; }

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public Double getFee() { return fee; }
    public void setFee(Double fee) { this.fee = fee; }

    public String getTimingsJson() { return timingsJson; }
    public void setTimingsJson(String timingsJson) { this.timingsJson = timingsJson; }

    public Boolean getAvailable() { return available; }
    public void setAvailable(Boolean available) { this.available = available; }
}