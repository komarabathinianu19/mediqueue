package com.medique.medique.controller;

import com.medique.medique.dto.HospitalRequest;
import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.Hospital.VerificationStatus;
import com.medique.medique.service.HospitalService;
import com.medique.medique.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalService hospitalService;
    private final JwtService jwtService;

    // ── SUBMIT (public — staff submits before login) ───────────────────────
    // @RequestHeader now OPTIONAL — required = false
    // If token present: links hospital to that staff user
    // If no token:      submits as anonymous (userId = null)
    @PostMapping
    public ResponseEntity<Hospital> submit(
            @RequestBody HospitalRequest req,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        Long userId = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            userId = jwtService.extractUserId(token);
        }

        return ResponseEntity.ok(hospitalService.submit(req, userId));
    }

    // ── GET ALL (public) ───────────────────────────────────────────────────
    @GetMapping
    public ResponseEntity<List<Hospital>> getAll(
            @RequestParam(required = false) VerificationStatus status,
            @RequestParam(required = false) String city) {

        if (status != null) return ResponseEntity.ok(hospitalService.getByStatus(status));
        if (city   != null) return ResponseEntity.ok(hospitalService.getByCity(city));
        return ResponseEntity.ok(hospitalService.getAll());
    }

    // ── GET BY ID (public) ─────────────────────────────────────────────────
    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getById(@PathVariable Long id) {
        return ResponseEntity.ok(hospitalService.getById(id));
    }

    // ── UPDATE (staff — token required) ───────────────────────────────────
    @PutMapping("/{id}")
    public ResponseEntity<Hospital> update(
            @PathVariable Long id,
            @RequestBody HospitalRequest req,
            @RequestHeader("Authorization") String authHeader) {

        Long userId = extractUserId(authHeader);
        return ResponseEntity.ok(hospitalService.update(id, req, userId));
    }

    // ── UPDATE STATUS (admin — token required) ─────────────────────────────
    @PatchMapping("/{id}/status")
    public ResponseEntity<Hospital> updateStatus(
            @PathVariable Long id,
            @RequestParam VerificationStatus status) {
        return ResponseEntity.ok(hospitalService.updateStatus(id, status));
    }

    // ── DELETE (admin — token required) ───────────────────────────────────
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        hospitalService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ── HELPER ─────────────────────────────────────────────────────────────
    private Long extractUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtService.extractUserId(token);
    }
}