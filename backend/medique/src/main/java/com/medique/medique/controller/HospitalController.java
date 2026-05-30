package com.medique.medique.controller;

import com.medique.medique.entity.Doctor;
import com.medique.medique.entity.Hospital;
import com.medique.medique.service.DoctorService;
import com.medique.medique.service.JwtService;
import com.medique.medique.dto.HospitalRegisterRequest;
import com.medique.medique.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private JwtService jwtService;

    // ------------------- API Endpoints -------------------

    // Get all approved hospitals
    @GetMapping("/approved")
    public ResponseEntity<List<Map<String, Object>>> getApprovedHospitals() {
        List<Hospital> hospitals = hospitalService.getApproved();
        List<Map<String, Object>> result = hospitals.stream()
                .map(this::toPublicMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }


    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerHospital(@RequestBody HospitalRegisterRequest req) {
        try {
            Hospital hospital = hospitalService.register(req);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Hospital registration submitted successfully. Waiting for admin approval.");
            response.put("hospitalId", hospital.getHospitalId());
            response.put("status", hospital.getStatus() != null ? hospital.getStatus().name() : "PENDING");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginHospital(@RequestBody Map<String, String> body) {
        try {
            String hospitalId = body.get("hospitalId");
            String phone = body.get("phone");
            String password = body.get("password");

            Hospital hospital = hospitalService.loginStaff(hospitalId, phone, password);
            String token = jwtService.generateToken(hospital.getId(), "HOSPITAL");

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("token", token);
            response.put("hospitalId", hospital.getHospitalId());
            response.put("name", hospital.getName());
            response.put("phone", hospital.getPhone());
            response.put("email", hospital.getEmail());
            response.put("status", hospital.getStatus() != null ? hospital.getStatus().name() : null);
            response.put("role", "HOSPITAL");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();

            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(error);
        }
    }

    // Get pending hospitals for admin approval
    @GetMapping("/pending")
    public ResponseEntity<List<Map<String, Object>>> getPendingHospitals() {
        List<Hospital> hospitals = hospitalService.getPending();
        List<Map<String, Object>> result = hospitals.stream()
                .map(this::toFullMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // Get all hospitals for admin
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.getAll();
        List<Map<String, Object>> result = hospitals.stream()
                .map(this::toFullMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // Approve hospital
    @PutMapping("/{hospitalId}/approve")
    public ResponseEntity<Map<String, Object>> approveHospital(@PathVariable String hospitalId) {
        Hospital hospital = hospitalService.approve(hospitalId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Hospital approved successfully.");
        response.put("hospitalId", hospital.getHospitalId());
        response.put("status", hospital.getStatus() != null ? hospital.getStatus().name() : "APPROVED");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{hospitalId}/approve")
    public ResponseEntity<Map<String, Object>> approveHospitalPost(@PathVariable String hospitalId) {
        return approveHospital(hospitalId);
    }

    // Reject hospital
    @PutMapping("/{hospitalId}/reject")
    public ResponseEntity<Map<String, Object>> rejectHospital(@PathVariable String hospitalId) {
        Hospital hospital = hospitalService.reject(hospitalId);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Hospital rejected successfully.");
        response.put("hospitalId", hospital.getHospitalId());
        response.put("status", hospital.getStatus() != null ? hospital.getStatus().name() : "REJECTED");

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{hospitalId}/reject")
    public ResponseEntity<Map<String, Object>> rejectHospitalPost(@PathVariable String hospitalId) {
        return rejectHospital(hospitalId);
    }

    // Get hospital by ID
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getHospitalById(@PathVariable String id) {
        Hospital hospital = hospitalService.getHospitalById(id);
        return ResponseEntity.ok(toFullMap(hospital));
    }

    // ------------------- Helper Methods -------------------

    // Convert Hospital entity to JSON-ready map (public fields)
    private Map<String, Object> toPublicMap(Hospital h) {
        Map<String, Object> m = new HashMap<>();
        m.put("hospitalId", h.getHospitalId());
        m.put("name", h.getName());
        m.put("address", h.getAddress());
        m.put("city", h.getCity());
        m.put("imageUrl", h.getImageUrl());
        m.put("openingTime", h.getOpeningTime());
        m.put("closingTime", h.getClosingTime());
        m.put("description", h.getDescription());
        m.put("type", h.getType());
        m.put("status", h.getStatus() != null ? h.getStatus().name() : null);

        // Map doctors to JSON-ready list
        List<Doctor> doctors = doctorService.getByHospitalId(h.getHospitalId());
        List<Map<String,Object>> doctorList = doctors.stream()
                .map(d -> Map.<String, Object>of(
                        "id", d.getId(),
                        "name", d.getName(),
                        "department", d.getDepartment(),
                        "qualification", d.getQualification(),
                        "fee", d.getFee(),
                        "available", d.getAvailable()
                ))
                .collect(Collectors.toList());

        m.put("doctorList", doctorList);

        // Process departments
        List<String> deptFromDoctors = doctors.stream()
                .map(Doctor::getDepartment)
                .filter(d -> d != null && !d.isBlank())
                .distinct()
                .collect(Collectors.toList());

        if (deptFromDoctors.isEmpty() && h.getDepartments() != null && !h.getDepartments().isBlank()) {
            String raw = h.getDepartments().trim();
            if (raw.startsWith("[")) {
                raw = raw.replaceAll("[\\[\\]\"]", "");
            }
            for (String d : raw.split(",")) {
                String trimmed = d.trim();
                if (!trimmed.isEmpty()) deptFromDoctors.add(trimmed);
            }
        }
        m.put("departments", deptFromDoctors);

        return m;
    }

    // Convert Hospital entity to full JSON-ready map (all fields)
    private Map<String, Object> toFullMap(Hospital h) {
        Map<String,Object> m = toPublicMap(h); // base fields
        m.put("email", h.getEmail());
        m.put("phone", h.getPhone());
        m.put("type", h.getType());
        m.put("imageUrl", h.getImageUrl());
        return m;
    }
}