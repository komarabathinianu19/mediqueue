package com.medique.medique.controller;

import com.medique.medique.entity.Patient;
import com.medique.medique.service.JwtService;
import com.medique.medique.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final JwtService jwtService;

    // Patient views own profile
    @GetMapping("/me")
    public ResponseEntity<Patient> getMyProfile(
            @RequestHeader("Authorization") String authHeader) {
        Long userId = extractUserId(authHeader);
        return ResponseEntity.ok(patientService.getByUserId(userId));
    }

    // Patient updates own profile
    @PutMapping("/me")
    public ResponseEntity<Patient> updateMyProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Patient updates) {
        Long userId = extractUserId(authHeader);
        return ResponseEntity.ok(patientService.update(userId, updates));
    }

    // Staff/Admin views any patient by user ID
    @GetMapping("/{userId}")
    public ResponseEntity<Patient> getByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(patientService.getByUserId(userId));
    }

    private Long extractUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtService.extractUserId(token);
    }
}