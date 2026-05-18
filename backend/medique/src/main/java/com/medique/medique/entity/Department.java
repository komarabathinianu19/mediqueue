// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.util.List;

// @Entity
// @Table(name = "departments")
// public class Department {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String name;

//     @ManyToOne
//     @JoinColumn(name = "hospital_id", nullable = false)
//     private Hospital hospital;

//     @OneToMany(mappedBy = "department")
//     private List<Doctor> doctors;

//     // Getters and Setters
//     public Long getId() {
//         return id;
//     }
//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getName() {
//         return name;
//     }
//     public void setName(String name) {
//         this.name = name;
//     }

//     public Hospital getHospital() {
//         return hospital;
//     }
//     public void setHospital(Hospital hospital) {
//         this.hospital = hospital;
//     }

//     public List<Doctor> getDoctors() {
//         return doctors;
//     }
//     public void setDoctors(List<Doctor> doctors) {
//         this.doctors = doctors;
//     }
// }   



























// package com.medique.medique.entity;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "departments")
// public class Department {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(nullable = false)
//     private String name;

//     // Store hospitalId as a plain string (same pattern as Doctor.java)
//     // This avoids circular references and keeps things consistent
//     @Column(nullable = false)
//     private String hospitalId;

//     // ── Getters & Setters ─────────────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }
// }  




















package com.medique.medique.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Links department to a hospital (stores hospitalId string e.g. "HSP-ABC123")
    @Column(nullable = false)
    private String hospitalId;

    // ── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }
}