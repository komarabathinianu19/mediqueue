package com.medique.medique.controller;

import com.medique.medique.service.HospitalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final HospitalService hospitalService;

    public AdminController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    // ── APPROVE HOSPITAL REGISTRATION ───────────────────────────────────────
    // POST /api/admin/approveHospital/{hospitalId}
    @PostMapping("/approveHospital/{hospitalId}")
    public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
        try {
            hospitalService.approve(hospitalId);
            return ResponseEntity.ok(Map.of("message", "Hospital approved successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── REJECT HOSPITAL REGISTRATION ───────────────────────────────────────
    // POST /api/admin/rejectHospital/{hospitalId}
    @PostMapping("/rejectHospital/{hospitalId}")
    public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
        try {
            hospitalService.reject(hospitalId);
            return ResponseEntity.ok(Map.of("message", "Hospital rejected successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── GET PENDING HOSPITAL REGISTRATIONS ────────────────────────────────
    // GET /api/admin/pendingHospitals
    @GetMapping("/pendingHospitals")
    public ResponseEntity<?> getPendingHospitals() {
        try {
            return ResponseEntity.ok(hospitalService.getPending());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}