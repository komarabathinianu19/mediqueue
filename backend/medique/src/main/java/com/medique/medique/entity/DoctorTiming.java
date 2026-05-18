package com.medique.medique.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "doctor_timings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorTiming {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long doctorId; 

    private String slotName; // "morning", "afternoon", "night"
    private String startTime;
    private String endTime;
    private int maxPatients;
    private boolean enabled;

    // Constructor used by Service when creating a new slot
    public DoctorTiming(Long doctorId, String slotName) {
        this.doctorId = doctorId;
        this.slotName = slotName;
    }
}