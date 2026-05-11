// package com.medique.medique.service;

// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.repository.HospitalRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.security.SecureRandom;
// import java.util.List;

// @Service
// public class HospitalService {

//     private final HospitalRepository hospitalRepo;
//     private final PasswordEncoder passwordEncoder;

//     public HospitalService(HospitalRepository hospitalRepo, PasswordEncoder passwordEncoder) {
//         this.hospitalRepo = hospitalRepo;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     public Hospital register(HospitalRegisterRequest req) {
//         if (req.getName() == null || req.getName().isBlank())
//             throw new RuntimeException("Hospital name is required.");
//         if (req.getEmail() == null || req.getEmail().isBlank())
//             throw new RuntimeException("Email is required.");
//         if (req.getPassword() == null || req.getPassword().length() < 6)
//             throw new RuntimeException("Password must be at least 6 characters.");
//         if (req.getPhone() == null || req.getPhone().isBlank())
//             throw new RuntimeException("Phone number is required.");
//         if (req.getLicenseNumber() == null || req.getLicenseNumber().isBlank())
//             throw new RuntimeException("License number is required.");
//         if (hospitalRepo.existsByEmail(req.getEmail()))
//             throw new RuntimeException("Email is already registered.");

//         Hospital h = new Hospital();
//         h.setHospitalId(generateUniqueHospitalId());
//         h.setName(req.getName());
//         h.setOwnerName(req.getOwnerName());
//         h.setPhone(req.getPhone());
//         h.setEmail(req.getEmail());
//         h.setPassword(passwordEncoder.encode(req.getPassword()));
//         h.setType(req.getType());
//         h.setAddress(req.getAddress());
//         h.setCity(req.getCity());
//         h.setRegistrationNumber(req.getRegistrationNumber());
//         h.setLicenseNumber(req.getLicenseNumber());
//         // Store departments as comma-separated string: "General OPD,Cardiology,ENT"
//         h.setDepartments(req.getDepartments());
//         h.setNumberOfDoctors(req.getNumberOfDoctors());
//         h.setImageUrl(req.getImageUrl());
//         h.setStatus(HospitalStatus.PENDING);
//         return hospitalRepo.save(h);
//     }

//     // ── APPROVE ───────────────────────────────────────────────────────────────
//     public Hospital approve(String hospitalId) {
//         Hospital h = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));
//         h.setStatus(HospitalStatus.APPROVED);
//         return hospitalRepo.save(h);
//     }

//     // ── REJECT ────────────────────────────────────────────────────────────────
//     public Hospital reject(String hospitalId) {
//         Hospital h = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));
//         h.setStatus(HospitalStatus.REJECTED);
//         return hospitalRepo.save(h);
//     }

//     // ── GET PENDING ───────────────────────────────────────────────────────────
//     public List<Hospital> getPending() {
//         return hospitalRepo.findByStatus(HospitalStatus.PENDING);
//     }

//     // ── GET APPROVED (for patient hospital list) ───────────────────────────────
//     public List<Hospital> getApproved() {
//         return hospitalRepo.findByStatus(HospitalStatus.APPROVED);
//     }

//     // ── GET ALL ───────────────────────────────────────────────────────────────
//     public List<Hospital> getAll() {
//         return hospitalRepo.findAll();
//     }

//     // ── STAFF LOGIN ───────────────────────────────────────────────────────────
//     public Hospital loginStaff(String hospitalId, String email, String password) {
//         Hospital h = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Invalid Hospital ID."));
//         if (!h.getEmail().equalsIgnoreCase(email))
//             throw new RuntimeException("Email does not match this Hospital ID.");
//         if (!passwordEncoder.matches(password, h.getPassword()))
//             throw new RuntimeException("Incorrect password.");
//         if (h.getStatus() == HospitalStatus.PENDING)
//             throw new RuntimeException("Your hospital is still pending admin approval.");
//         if (h.getStatus() == HospitalStatus.REJECTED)
//             throw new RuntimeException("Your hospital registration was rejected. Contact support.");
//         return h;
//     }

//     // ── GET SINGLE HOSPITAL ───────────────────────────────────────────────────
//     public Hospital getHospitalById(String hospitalId) {
//         return hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found"));
//     }

//     // ── GENERATE UNIQUE HOSPITAL ID ───────────────────────────────────────────
//     private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     private static final SecureRandom RANDOM = new SecureRandom();

//     private String generateUniqueHospitalId() {
//         String id;
//         do {
//             StringBuilder sb = new StringBuilder("HSP-");
//             for (int i = 0; i < 6; i++)
//                 sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
//             id = sb.toString();
//         } while (hospitalRepo.existsByHospitalId(id));
//         return id;
//     }
// }  




























// package com.medique.medique.service;

// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.repository.HospitalRepository;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.security.SecureRandom;
// import java.util.List;

// @Service
// public class HospitalService {

//     private final HospitalRepository hospitalRepo;
//     private final PasswordEncoder passwordEncoder;

//     public HospitalService(HospitalRepository hospitalRepo, PasswordEncoder passwordEncoder) {
//         this.hospitalRepo = hospitalRepo;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     public Hospital register(HospitalRegisterRequest req) {
//         if (req.getName() == null || req.getName().isBlank())
//             throw new RuntimeException("Hospital name is required.");
//         if (req.getEmail() == null || req.getEmail().isBlank())
//             throw new RuntimeException("Email is required.");
//         if (req.getPassword() == null || req.getPassword().length() < 6)
//             throw new RuntimeException("Password must be at least 6 characters.");
//         if (req.getPhone() == null || req.getPhone().isBlank())
//             throw new RuntimeException("Phone number is required.");
//         if (req.getLicenseNumber() == null || req.getLicenseNumber().isBlank())
//             throw new RuntimeException("License number is required.");
//         if (hospitalRepo.existsByEmail(req.getEmail()))
//             throw new RuntimeException("Email is already registered.");

//         Hospital h = new Hospital();
//         h.setHospitalId(generateUniqueHospitalId());
//         h.setName(req.getName());
//         h.setOwnerName(req.getOwnerName());
//         h.setPhone(req.getPhone());
//         h.setEmail(req.getEmail());
//         h.setPassword(passwordEncoder.encode(req.getPassword()));
//         h.setType(req.getType());
//         h.setAddress(req.getAddress());
//         h.setCity(req.getCity());
//         h.setRegistrationNumber(req.getRegistrationNumber());
//         h.setLicenseNumber(req.getLicenseNumber());
//         // Store departments as comma-separated string: "General OPD,Cardiology,ENT"
//         h.setDepartments(req.getDepartments());
//         h.setNumberOfDoctors(req.getNumberOfDoctors());
//         h.setImageUrl(req.getImageUrl());
//         h.setStatus(HospitalStatus.PENDING);
//         return hospitalRepo.save(h);
//     }

//     // ── APPROVE ───────────────────────────────────────────────────────────────
//     public Hospital approve(String hospitalId) {
//         Hospital h = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));
//         h.setStatus(HospitalStatus.APPROVED);
//         return hospitalRepo.save(h);
//     }

//     // ── REJECT ────────────────────────────────────────────────────────────────
//     public Hospital reject(String hospitalId) {
//         Hospital h = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));
//         h.setStatus(HospitalStatus.REJECTED);
//         return hospitalRepo.save(h);
//     }

//     // ── GET PENDING ───────────────────────────────────────────────────────────
//     // public List<Hospital> getPending() {
//     //     return hospitalRepo.findByStatus(HospitalStatus.PENDING);
//     // } 

// public List<Hospital> getPending() {
//     return hospitalRepo.findByStatus(HospitalStatus.PENDING);
// }

// public List<Hospital> getApproved() {
//     return hospitalRepo.findByStatus(HospitalStatus.APPROVED);
// }

//     // ── GET ALL ───────────────────────────────────────────────────────────────
//     public List<Hospital> getAll() {
//         return hospitalRepo.findAll();
//     }

//     // ── STAFF LOGIN ───────────────────────────────────────────────────────────
//     public Hospital loginStaff(String hospitalId, String email, String password) {
//         Hospital h = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Invalid Hospital ID."));
//         if (!h.getEmail().equalsIgnoreCase(email))
//             throw new RuntimeException("Email does not match this Hospital ID.");
//         if (!passwordEncoder.matches(password, h.getPassword()))
//             throw new RuntimeException("Incorrect password.");
//         if (h.getStatus() == HospitalStatus.PENDING)
//             throw new RuntimeException("Your hospital is still pending admin approval.");
//         if (h.getStatus() == HospitalStatus.REJECTED)
//             throw new RuntimeException("Your hospital registration was rejected. Contact support.");
//         return h;
//     }

//     // ── GET SINGLE HOSPITAL ───────────────────────────────────────────────────
//     public Hospital getHospitalById(String hospitalId) {
//         return hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found"));
//     }

//     // ── GET HOSPITAL BY EMAIL ────────────────────────────────────────────────
//     public Hospital getHospitalByEmail(String email) {
//         return hospitalRepo.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found with email: " + email));
//     }

//     // ── GENERATE UNIQUE HOSPITAL ID ───────────────────────────────────────────
//     private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     private static final SecureRandom RANDOM = new SecureRandom();

//     private String generateUniqueHospitalId() {
//         String id;
//         do {
//             StringBuilder sb = new StringBuilder("HSP-");
//             for (int i = 0; i < 6; i++)
//                 sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
//             id = sb.toString();
//         } while (hospitalRepo.existsByHospitalId(id));
//         return id;
//     } 


// }  


























package com.medique.medique.service;

import com.medique.medique.dto.HospitalRegisterRequest;
import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.HospitalStatus;
import com.medique.medique.repository.HospitalRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepo;
    private final PasswordEncoder passwordEncoder;

    public HospitalService(
            HospitalRepository hospitalRepo,
            PasswordEncoder passwordEncoder
    ) {
        this.hospitalRepo = hospitalRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // ───────────────── REGISTER HOSPITAL ─────────────────

    public Hospital register(HospitalRegisterRequest req) {

        if (req.getName() == null || req.getName().isBlank()) {
            throw new RuntimeException("Hospital name is required.");
        }

        if (req.getEmail() == null || req.getEmail().isBlank()) {
            throw new RuntimeException("Email is required.");
        }

        if (req.getPassword() == null || req.getPassword().length() < 6) {
            throw new RuntimeException(
                    "Password must be at least 6 characters."
            );
        }

        if (req.getPhone() == null || req.getPhone().isBlank()) {
            throw new RuntimeException("Phone number is required.");
        }

        if (req.getLicenseNumber() == null
                || req.getLicenseNumber().isBlank()) {

            throw new RuntimeException("License number is required.");
        }

        if (hospitalRepo.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered.");
        }

        Hospital hospital = new Hospital();

        hospital.setHospitalId(generateUniqueHospitalId());

        hospital.setName(req.getName());
        hospital.setOwnerName(req.getOwnerName());

        hospital.setEmail(req.getEmail());
        hospital.setPhone(req.getPhone());

        hospital.setPassword(
                passwordEncoder.encode(req.getPassword())
        );

        hospital.setType(req.getType());

        hospital.setAddress(req.getAddress());
        hospital.setCity(req.getCity());

        hospital.setRegistrationNumber(
                req.getRegistrationNumber()
        );

        hospital.setLicenseNumber(
                req.getLicenseNumber()
        );

        // Example:
        // "General OPD,Cardiology,ENT"

        hospital.setDepartments(req.getDepartments());

        hospital.setNumberOfDoctors(
                req.getNumberOfDoctors()
        );

        hospital.setImageUrl(req.getImageUrl());

        // Default status
        hospital.setStatus(HospitalStatus.PENDING);

        return hospitalRepo.save(hospital);
    }

    // ───────────────── APPROVE HOSPITAL ─────────────────

    public Hospital approve(String hospitalId) {

        Hospital hospital = hospitalRepo
                .findByHospitalId(hospitalId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hospital not found: " + hospitalId
                        ));

        hospital.setStatus(HospitalStatus.APPROVED);

        return hospitalRepo.save(hospital);
    }

    // ───────────────── REJECT HOSPITAL ─────────────────

    public Hospital reject(String hospitalId) {

        Hospital hospital = hospitalRepo
                .findByHospitalId(hospitalId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hospital not found: " + hospitalId
                        ));

        hospital.setStatus(HospitalStatus.REJECTED);

        return hospitalRepo.save(hospital);
    }

    // ───────────────── GET PENDING HOSPITALS ─────────────────

    public List<Hospital> getPending() {
        return hospitalRepo.findByStatus(
                HospitalStatus.PENDING
        );
    }

    // ───────────────── GET APPROVED HOSPITALS ─────────────────

    public List<Hospital> getApproved() {
        return hospitalRepo.findByStatus(
                HospitalStatus.APPROVED
        );
    }

    // ───────────────── GET ALL HOSPITALS ─────────────────

    public List<Hospital> getAll() {
        return hospitalRepo.findAll();
    }

    // ───────────────── HOSPITAL LOGIN ─────────────────

    public Hospital loginStaff(
            String hospitalId,
            String email,
            String password
    ) {

        Hospital hospital = hospitalRepo
                .findByHospitalId(hospitalId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid Hospital ID."
                        ));

        // Check email
        if (!hospital.getEmail().equalsIgnoreCase(email)) {

            throw new RuntimeException(
                    "Email does not match this Hospital ID."
            );
        }

        // Check password
        if (!passwordEncoder.matches(
                password,
                hospital.getPassword()
        )) {

            throw new RuntimeException(
                    "Incorrect password."
            );
        }

        // Check approval status
        if (hospital.getStatus() == HospitalStatus.PENDING) {

            throw new RuntimeException(
                    "Your hospital is still pending admin approval."
            );
        }

        if (hospital.getStatus() == HospitalStatus.REJECTED) {

            throw new RuntimeException(
                    "Your hospital registration was rejected."
            );
        }

        return hospital;
    }

    // ───────────────── GET HOSPITAL BY HOSPITAL ID ─────────────────

    public Hospital getHospitalById(String hospitalId) {

        return hospitalRepo
                .findByHospitalId(hospitalId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hospital not found"
                        ));
    }

    // ───────────────── GET HOSPITAL BY EMAIL ─────────────────

    public Hospital getHospitalByEmail(String email) {

        return hospitalRepo
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Hospital not found with email: "
                                        + email
                        ));
    }

    // ───────────────── GENERATE UNIQUE HOSPITAL ID ─────────────────

    private static final String CHARS =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    private static final SecureRandom RANDOM =
            new SecureRandom();

    private String generateUniqueHospitalId() {

        String id;

        do {

            StringBuilder sb = new StringBuilder("HSP-");

            for (int i = 0; i < 6; i++) {

                sb.append(
                        CHARS.charAt(
                                RANDOM.nextInt(CHARS.length())
                        )
                );
            }

            id = sb.toString();

        } while (hospitalRepo.existsByHospitalId(id));

        return id;
    }
}