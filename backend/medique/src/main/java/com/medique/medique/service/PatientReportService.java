package com.medique.medique.service;

import com.medique.medique.dto.PatientReportRequest;
import com.medique.medique.entity.PatientReport;
import com.medique.medique.repository.PatientReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PatientReportService {

    @Autowired
    private PatientReportRepository reportRepository;

    // ── GET all reports for this patient (newest first) ───────────────────────
    public List<PatientReport> getReports(Long patientId) {
        return reportRepository.findByPatientIdOrderByCreatedAtDesc(patientId);
    }

    // ── ADD a new report ──────────────────────────────────────────────────────
    public PatientReport addReport(Long patientId, PatientReportRequest req) {
        PatientReport report = new PatientReport();

        report.setPatientId(patientId);
        report.setReportName(req.getReportName());
        report.setReportType(req.getReportType());
        report.setHospitalName(req.getHospitalName());
        report.setDoctorName(req.getDoctorName());
        report.setDepartment(req.getDepartment());
        report.setReportDate(req.getReportDate());
        report.setNotes(req.getNotes());
        report.setFileUri(req.getFileUri());
        report.setCreatedAt(LocalDateTime.now()); // always use server time

        return reportRepository.save(report);
    }

    // ── DELETE a report (only if it belongs to this patient) ─────────────────
    public void deleteReport(Long patientId, Long reportId) {
        PatientReport report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found with id: " + reportId));

        // Security check — patient can only delete their own reports
        if (!report.getPatientId().equals(patientId)) {
            throw new RuntimeException("Unauthorized: This report does not belong to you.");
        }

        reportRepository.delete(report);
    }
}