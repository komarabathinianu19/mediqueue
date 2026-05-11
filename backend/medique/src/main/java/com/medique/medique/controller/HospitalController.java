




// package com.medique.medique.controller;

// import com.medique.medique.dto.HospitalLoginRequest;
// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.security.JwtUtil;
// import com.medique.medique.service.HospitalService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.http.HttpStatus;

// import java.security.Principal;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/api/hospitals")
// @CrossOrigin(origins = "*")
// public class HospitalController {

//     private final HospitalService hospitalService;
//     private final JwtUtil jwtUtil;

//     public HospitalController(HospitalService hospitalService, JwtUtil jwtUtil) {
//         this.hospitalService = hospitalService;
//         this.jwtUtil = jwtUtil;
//     }

//     // ── REGISTER HOSPITAL ─────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody HospitalRegisterRequest req) {
//         try {
//             Hospital hospital = hospitalService.register(req);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Registration submitted. Await admin approval.",
//                     "hospitalId", hospital.getHospitalId(),
//                     "status", hospital.getStatus().name(),
//                     "name", hospital.getName()
//             ));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── HOSPITAL LOGIN ────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody HospitalLoginRequest req) {
//         try {
//             Hospital h = hospitalService.loginStaff(req.getHospitalId(), req.getEmail(), req.getPassword());
//             String token = jwtUtil.generateToken(h.getId(), "HOSPITAL");

//             Map<String, Object> res = new HashMap<>();
//             res.put("token", token);
//             res.put("hospitalId", h.getHospitalId());
//             res.put("name", h.getName());
//             res.put("email", h.getEmail());
//             res.put("phone", h.getPhone());
//             res.put("address", h.getAddress());
//             res.put("status", h.getStatus().name());
//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET HOSPITAL DETAILS (Logged-in Hospital) ─────────────────────────────
//     @GetMapping("/details")
//     public ResponseEntity<Hospital> getHospitalDetails(Principal principal) {
//         String hospitalEmail = principal.getName();
//         Hospital hospital = hospitalService.getHospitalByEmail(hospitalEmail);
//         if (hospital == null) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//         }
//         return ResponseEntity.ok(hospital);
//     }

//     // ── GET APPROVED HOSPITALS ───────────────────────────────────────────────
//     @GetMapping("/approved")
//     public ResponseEntity<?> getApproved() {
//         try {
//             List<Map<String, Object>> result = hospitalService.getApproved()
//                     .stream()
//                     .map(this::toPublicMap)
//                     .collect(Collectors.toList());
//             return ResponseEntity.ok(result);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     private Map<String, Object> toPublicMap(Hospital h) {
//         Map<String, Object> m = new HashMap<>();
//         m.put("hospitalId", h.getHospitalId());
//         m.put("name", h.getName());
//         m.put("email", h.getEmail());
//         m.put("phone", h.getPhone());
//         m.put("address", h.getAddress());
//         m.put("status", h.getStatus().name());
//         return m;
//     }
// }  





























package com.medique.medique.controller;

import com.medique.medique.dto.HospitalLoginRequest;
import com.medique.medique.dto.HospitalRegisterRequest;
import com.medique.medique.entity.Hospital;
import com.medique.medique.security.JwtUtil;
import com.medique.medique.service.HospitalService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "*")
public class HospitalController {

    private final HospitalService hospitalService;
    private final JwtUtil jwtUtil;

    public HospitalController(
            HospitalService hospitalService,
            JwtUtil jwtUtil
    ) {
        this.hospitalService = hospitalService;
        this.jwtUtil = jwtUtil;
    }

    // ───────────────── REGISTER ─────────────────
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody HospitalRegisterRequest req
    ) {
        try {

            Hospital hospital = hospitalService.register(req);

            return ResponseEntity.ok(Map.of(
                    "message", "Registration submitted successfully",
                    "hospitalId", hospital.getHospitalId(),
                    "status", hospital.getStatus().name(),
                    "name", hospital.getName()
            ));

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    // ───────────────── LOGIN ─────────────────
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody HospitalLoginRequest req
    ) {

        try {

            Hospital h = hospitalService.loginStaff(
                    req.getHospitalId(),
                    req.getEmail(),
                    req.getPassword()
            );

            String token = jwtUtil.generateToken(
                    h.getId(),
                    "HOSPITAL"
            );

            Map<String, Object> res = new HashMap<>();

            res.put("token", token);
            res.put("hospitalId", h.getHospitalId());
            res.put("name", h.getName());
            res.put("email", h.getEmail());
            res.put("phone", h.getPhone());
            res.put("address", h.getAddress());
            res.put("status", h.getStatus().name());

            return ResponseEntity.ok(res);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    // ───────────────── DETAILS ─────────────────
    @GetMapping("/details")
    public ResponseEntity<?> getHospitalDetails(
            Principal principal
    ) {

        try {

            String email = principal.getName();

            Hospital hospital =
                    hospitalService.getHospitalByEmail(email);

            if (hospital == null) {

                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of(
                                "message",
                                "Hospital not found"
                        ));
            }

            return ResponseEntity.ok(hospital);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError().body(
                    Map.of("message", e.getMessage())
            );
        }
    }


    // ───────────────── GET SINGLE HOSPITAL ─────────────────

@GetMapping("/{hospitalId}")
public ResponseEntity<?> getHospitalById(
        @PathVariable String hospitalId
) {

    try {

        Hospital hospital =
                hospitalService.getHospitalById(hospitalId);

        return ResponseEntity.ok(hospital);

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "message",
                        e.getMessage()
                ));
    }
}

    // ───────────────── APPROVED ─────────────────
    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedHospitals() {

        try {

            List<Map<String, Object>> result =
                    hospitalService.getApproved()
                            .stream()
                            .map(this::toPublicMap)
                            .collect(Collectors.toList());

            return ResponseEntity.ok(result);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError().body(
                    Map.of("message", e.getMessage())
            );
        }
    }

    // ───────────────── PENDING ─────────────────
    @GetMapping("/pending")
    public ResponseEntity<?> getPendingHospitals() {

        try {

            List<Map<String, Object>> result =
                    hospitalService.getPending()
                            .stream()
                            .map(this::toPublicMap)
                            .collect(Collectors.toList());

            return ResponseEntity.ok(result);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.internalServerError().body(
                    Map.of("message", e.getMessage())
            );
        }
    } 

    // ───────────────── APPROVE HOSPITAL ─────────────────

@PutMapping("/{hospitalId}/approve")
public ResponseEntity<?> approveHospital(
        @PathVariable String hospitalId
) {

    try {

        Hospital hospital =
                hospitalService.approve(hospitalId);

        return ResponseEntity.ok(Map.of(
                "message", "Hospital approved successfully",
                "hospitalId", hospital.getHospitalId(),
                "status", hospital.getStatus().name()
        ));

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
        );
    }
}

// ───────────────── REJECT HOSPITAL ─────────────────

@PutMapping("/{hospitalId}/reject")
public ResponseEntity<?> rejectHospital(
        @PathVariable String hospitalId
) {

    try {

        Hospital hospital =
                hospitalService.reject(hospitalId);

        return ResponseEntity.ok(Map.of(
                "message", "Hospital rejected successfully",
                "hospitalId", hospital.getHospitalId(),
                "status", hospital.getStatus().name()
        ));

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.badRequest().body(
                Map.of("message", e.getMessage())
        );
    }
}

    // ───────────────── PUBLIC MAP ─────────────────
    private Map<String, Object> toPublicMap(Hospital h) {

        Map<String, Object> m = new HashMap<>();

        m.put("hospitalId", h.getHospitalId());
        m.put("name", h.getName());
        m.put("email", h.getEmail());
        m.put("phone", h.getPhone());
        m.put("address", h.getAddress());
        m.put("status", h.getStatus().name());

        return m;
    }
}