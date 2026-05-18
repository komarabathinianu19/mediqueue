package com.medique.medique.controller;

import com.medique.medique.dto.PatientReportRequest;
import com.medique.medique.entity.PatientReport;
import com.medique.medique.security.JwtUtil;
import com.medique.medique.service.PatientReportService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patient/reports")
public class PatientReportController {

    @Autowired
    private PatientReportService reportService;

    @Autowired
    private JwtUtil jwtUtil;

    // ── Helper: extract patientId from Bearer token ───────────────────────────
    // Uses your existing JwtUtil.extractUserId() which returns null for hospital tokens
    private Long getPatientIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Missing or invalid Authorization header.");
        }

        String token = authHeader.substring(7); // strip "Bearer "

        // Validate token first
        if (!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or expired token.");
        }

        // Hospital tokens have non-numeric subjects — extractUserId returns null for them
        Long patientId = jwtUtil.extractUserId(token);
        if (patientId == null) {
            throw new RuntimeException("This endpoint is only for patients.");
        }

        return patientId;
    }

    // ── GET /api/patient/reports ──────────────────────────────────────────────
    // Returns all reports for the logged-in patient
    @GetMapping
    public ResponseEntity<?> getReports(HttpServletRequest request) {
        try {
            Long patientId = getPatientIdFromRequest(request);
            List<PatientReport> reports = reportService.getReports(patientId);
            return ResponseEntity.ok(reports);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    // ── POST /api/patient/reports ─────────────────────────────────────────────
    // Saves a new report for the logged-in patient
    @PostMapping
    public ResponseEntity<?> addReport(
            HttpServletRequest request,
            @RequestBody PatientReportRequest reportRequest
    ) {
        try {
            Long patientId = getPatientIdFromRequest(request);

            if (reportRequest.getReportName() == null || reportRequest.getReportName().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Report name is required."));
            }

            PatientReport saved = reportService.addReport(patientId, reportRequest);
            return ResponseEntity.ok(saved);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    // ── DELETE /api/patient/reports/{reportId} ────────────────────────────────
    // Deletes a report — only the owner patient can delete
    @DeleteMapping("/{reportId}")
    public ResponseEntity<?> deleteReport(
            HttpServletRequest request,
            @PathVariable Long reportId
    ) {
        try {
            Long patientId = getPatientIdFromRequest(request);
            reportService.deleteReport(patientId, reportId);
            return ResponseEntity.ok(Map.of("message", "Report deleted successfully."));

        } catch (RuntimeException e) {
            String msg = e.getMessage();
            if (msg != null && msg.contains("Unauthorized")) {
                return ResponseEntity.status(403).body(Map.of("message", msg));
            }
            if (msg != null && msg.contains("not found")) {
                return ResponseEntity.status(404).body(Map.of("message", msg));
            }
            return ResponseEntity.status(401).body(Map.of("message", msg));
        }
    }
}