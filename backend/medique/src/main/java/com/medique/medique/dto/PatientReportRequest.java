package com.medique.medique.dto;

public class PatientReportRequest {

    private String reportName;
    private String reportType;
    private String hospitalName;
    private String doctorName;
    private String department;
    private String reportDate;
    private String notes;
    private String fileUri;
    private String createdAt;   // sent by app — we override with server time

    // ── Getters & Setters ─────────────────────────────────────────────────────

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

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}