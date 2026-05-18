package com.medique.medique.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient_reports")
public class PatientReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Links to users.id — which patient owns this report
    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "report_name", nullable = false)
    private String reportName;

    @Column(name = "report_type")
    private String reportType;

    @Column(name = "hospital_name")
    private String hospitalName;

    @Column(name = "doctor_name")
    private String doctorName;

    @Column(name = "department")
    private String department;

    @Column(name = "report_date")
    private String reportDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Stores the image URI / cloud URL of the report image
    @Column(name = "file_uri", columnDefinition = "TEXT")
    private String fileUri;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // ── Getters & Setters ─────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }

    public String getReportName() { return reportName; }
    public void setReportName(String reportName) { this.reportName = reportName; }

    public String getReportType() { return reportType; }
    public void setReportType(String reportType) { this.reportType = reportType; }

    public String getHospitalName() { return hospitalName; }
    public void setHospitalName(String hospitalName) { this.hospitalName = hospitalName; }

    public String getDoctorName() { return doctorName; }
    public void setDoctorName(String doctorName) { this.doctorName = doctorName; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getReportDate() { return reportDate; }
    public void setReportDate(String reportDate) { this.reportDate = reportDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getFileUri() { return fileUri; }
    public void setFileUri(String fileUri) { this.fileUri = fileUri; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}