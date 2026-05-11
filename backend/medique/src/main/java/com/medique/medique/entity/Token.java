package com.medique.medique.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tokens")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // e.g. "M-1", "A-3", "N-2"
    @Column(nullable = false)
    private String tokenNo;

    // numeric part only, for sorting
    @Column(nullable = false)
    private Integer tokenNumber;

    // "HSP-XXXX"
    @Column(nullable = false)
    private String hospitalId;

    private String hospitalName;
    private String department;
    private String doctor;
    private Long doctorId;          // FK → doctors.id (nullable for fallback)

    // "morning" | "afternoon" | "night"
    private String slot;
    private String slotLabel;
    private String slotTime;

    // appointment date as string "YYYY-MM-DD"
    private String date;

    private String patientName;
    private Integer patientAge;
    private String symptoms;
    private String visitType;

    // userId of the patient who booked (null if staff booked walk-in)
    private Long bookedByUserId;

    // "patient" | "staff"
    private String bookingSource;

    // "waiting" | "serving" | "completed" | "skipped"
    private String status = "waiting";

    // "PENDING" | "SUCCESS"
    private String paymentStatus = "PENDING";

    private String paymentId;

    // "CONFIRMED" | "CANCELLED"
    private String appointmentStatus = "CONFIRMED";

    private Integer doctorFee;
    private Integer platformFee = 20;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime servingAt;
    private LocalDateTime completedAt;

    // ── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTokenNo() { return tokenNo; }
    public void setTokenNo(String tokenNo) { this.tokenNo = tokenNo; }

    public Integer getTokenNumber() { return tokenNumber; }
    public void setTokenNumber(Integer tokenNumber) { this.tokenNumber = tokenNumber; }

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getDoctor() { return doctor; }
    public void setDoctor(String doctor) { this.doctor = doctor; }

    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }

    public String getSlot() { return slot; }
    public void setSlot(String slot) { this.slot = slot; }

    public String getSlotLabel() { return slotLabel; }
    public void setSlotLabel(String slotLabel) { this.slotLabel = slotLabel; }

    public String getSlotTime() { return slotTime; }
    public void setSlotTime(String slotTime) { this.slotTime = slotTime; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getPatientName() { return patientName; }
    public void setPatientName(String patientName) { this.patientName = patientName; }

    public Integer getPatientAge() { return patientAge; }
    public void setPatientAge(Integer patientAge) { this.patientAge = patientAge; }

    public String getSymptoms() { return symptoms; }
    public void setSymptoms(String symptoms) { this.symptoms = symptoms; }

    public String getVisitType() { return visitType; }
    public void setVisitType(String visitType) { this.visitType = visitType; }

    public Long getBookedByUserId() { return bookedByUserId; }
    public void setBookedByUserId(Long bookedByUserId) { this.bookedByUserId = bookedByUserId; }

    public String getBookingSource() { return bookingSource; }
    public void setBookingSource(String bookingSource) { this.bookingSource = bookingSource; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

    public String getAppointmentStatus() { return appointmentStatus; }
    public void setAppointmentStatus(String appointmentStatus) { this.appointmentStatus = appointmentStatus; }

    public Integer getDoctorFee() { return doctorFee; }
    public void setDoctorFee(Integer doctorFee) { this.doctorFee = doctorFee; }

    public Integer getPlatformFee() { return platformFee; }
    public void setPlatformFee(Integer platformFee) { this.platformFee = platformFee; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getServingAt() { return servingAt; }
    public void setServingAt(LocalDateTime servingAt) { this.servingAt = servingAt; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}