// package com.medique.medique.controller;

// import com.medique.medique.entity.Patient;
// import com.medique.medique.service.JwtService;
// import com.medique.medique.service.PatientService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/patients")
// @RequiredArgsConstructor
// public class PatientController {

//     private final PatientService patientService;
//     private final JwtService jwtService;

//     // Patient views own profile
//     @GetMapping("/me")
//     public ResponseEntity<Patient> getMyProfile(
//             @RequestHeader("Authorization") String authHeader) {
//         Long userId = extractUserId(authHeader);
//         return ResponseEntity.ok(patientService.getByUserId(userId));
//     }

//     // Patient updates own profile
//     @PutMapping("/me")
//     public ResponseEntity<Patient> updateMyProfile(
//             @RequestHeader("Authorization") String authHeader,
//             @RequestBody Patient updates) {
//         Long userId = extractUserId(authHeader);
//         return ResponseEntity.ok(patientService.update(userId, updates));
//     }

//     // Staff/Admin views any patient by user ID
//     @GetMapping("/{userId}")
//     public ResponseEntity<Patient> getByUserId(@PathVariable Long userId) {
//         return ResponseEntity.ok(patientService.getByUserId(userId));
//     }

//     private Long extractUserId(String authHeader) {
//         String token = authHeader.replace("Bearer ", "");
//         return jwtService.extractUserId(token);
//     }
// }  
























package com.medique.medique.controller;

import com.medique.medique.entity.Patient;
import com.medique.medique.service.JwtService;
import com.medique.medique.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;
    private final JwtService jwtService;

    // ── GET LOGGED-IN PATIENT PROFILE ─────────────────────────────────────────
    // GET /api/patients/me
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(
            @RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = extractUserId(authHeader);
            Patient patient = patientService.getByUserId(userId);
            return ResponseEntity.ok(toMap(patient));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── UPDATE LOGGED-IN PATIENT PROFILE ──────────────────────────────────────
    // PUT /api/patients/me
    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Patient updates) {
        try {
            Long userId = extractUserId(authHeader);
            Patient updated = patientService.update(userId, updates);
            return ResponseEntity.ok(toMap(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── GET ANY PATIENT BY USER ID (Staff/Admin) ───────────────────────────────
    // GET /api/patients/{userId}
    @GetMapping("/{userId}")
    public ResponseEntity<?> getByUserId(@PathVariable Long userId) {
        try {
            Patient patient = patientService.getByUserId(userId);
            return ResponseEntity.ok(toMap(patient));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── HELPERS ───────────────────────────────────────────────────────────────

    private Long extractUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        return jwtService.extractUserId(token);
    }

    // Converts Patient entity to a map that the frontend expects
    private Map<String, Object> toMap(Patient p) {
        Map<String, Object> m = new HashMap<>();
        m.put("id",               p.getId());
        m.put("fullName",         p.getFullName());
        m.put("email",            p.getEmail());
        m.put("phone",            p.getPhone());
        m.put("age",              p.getAge());
        m.put("gender",           p.getGender());
        m.put("bloodGroup",       p.getBloodGroup());
        m.put("city",             p.getCity());
        m.put("allergies",        p.getAllergies());
        m.put("medicalNotes",     p.getMedicalNotes());
        m.put("emergencyContact", p.getEmergencyContact());
        // Also expose the linked user's id so the frontend can reference it
        if (p.getUser() != null) {
            m.put("userId", p.getUser().getId());
            // Fallback: if email/phone stored on User but not Patient, use those
            if (p.getEmail() == null)  m.put("email",  p.getUser().getEmail());
            if (p.getPhone() == null)  m.put("phone",  p.getUser().getPhone());
        }
        return m;
    }
}