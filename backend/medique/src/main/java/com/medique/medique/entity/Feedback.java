























// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;
// import java.util.Map;

// @Entity
// @Table(name = "feedbacks")
// public class Feedback {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String hospitalId; // Links to Hospital.hospitalId

//     private String patientName;
//     private String patientPhone;

//     // Individual star ratings (1–5) keyed by metric name
//     @ElementCollection
//     @CollectionTable(name = "feedback_ratings", joinColumns = @JoinColumn(name = "feedback_id"))
//     @MapKeyColumn(name = "rating_key")
//     @Column(name = "rating_value")
//     private Map<String, Integer> ratings;

//     // Pre-computed overall average stored for quick retrieval
//     private Double overallRating;

//     @Column(columnDefinition = "TEXT")
//     private String comment;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // ── Getters & Setters ─────────────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getPatientName() { return patientName; }
//     public void setPatientName(String patientName) { this.patientName = patientName; }

//     public String getPatientPhone() { return patientPhone; }
//     public void setPatientPhone(String patientPhone) { this.patientPhone = patientPhone; }

//     public Map<String, Integer> getRatings() { return ratings; }
//     public void setRatings(Map<String, Integer> ratings) { this.ratings = ratings; }

//     public Double getOverallRating() { return overallRating; }
//     public void setOverallRating(Double overallRating) { this.overallRating = overallRating; }

//     public String getComment() { return comment; }
//     public void setComment(String comment) { this.comment = comment; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
// }  




























// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;
// import java.util.Map;

// @Entity
// @Table(name = "feedbacks")
// public class Feedback {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String hospitalId; // Links to Hospital.hospitalId

//     private String patientName;
//     private String patientPhone;

//     // We store the ratings as a Map to match the FEEDBACK_CONFIG on the frontend
//     // In MySQL, this can be stored as a JSON string or in a separate table.
//     // For simplicity with Spring Boot, we'll use an ElementCollection.
//     @ElementCollection
//     @CollectionTable(name = "feedback_ratings", joinColumns = @JoinColumn(name = "feedback_id"))
//     @MapKeyColumn(name = "rating_key")
//     @Column(name = "rating_value")
//     private Map<String, Integer> ratings;

//     @Column(columnDefinition = "TEXT")
//     private String comment;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // Getters and Setters
//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getPatientName() { return patientName; }
//     public void setPatientName(String patientName) { this.patientName = patientName; }

//     public String getPatientPhone() { return patientPhone; }
//     public void setPatientPhone(String patientPhone) { this.patientPhone = patientPhone; }

//     public Map<String, Integer> getRatings() { return ratings; }
//     public void setRatings(Map<String, Integer> ratings) { this.ratings = ratings; }

//     public String getComment() { return comment; }
//     public void setComment(String comment) { this.comment = comment; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
// }  

























package com.medique.medique.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String hospitalId; // Links to Hospital.hospitalId

    // Links to the token/visit this feedback belongs to
    private Long tokenId;

    private String patientName;
    private String patientPhone;

    // Individual star ratings (1–5) keyed by metric name
    @ElementCollection
    @CollectionTable(name = "feedback_ratings", joinColumns = @JoinColumn(name = "feedback_id"))
    @MapKeyColumn(name = "rating_key")
    @Column(name = "rating_value")
    private Map<String, Integer> ratings;

    // Pre-computed overall average stored for quick retrieval
    private Double overallRating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public Long getTokenId() { return tokenId; }
    public void setTokenId(Long tokenId) { this.tokenId = tokenId; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public String getPatientPhone() { return patientPhone; }
    public void setPatientPhone(String patientPhone) { this.patientPhone = patientPhone; }

    public Map<String, Integer> getRatings() { return ratings; }
    public void setRatings(Map<String, Integer> ratings) { this.ratings = ratings; }

    public Double getOverallRating() { return overallRating; }
    public void setOverallRating(Double overallRating) { this.overallRating = overallRating; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}