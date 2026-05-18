// package com.medique.medique.controller;

// import com.medique.medique.service.HospitalService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin(origins = "*")
// public class AdminController {

//     private final HospitalService hospitalService;

//     public AdminController(HospitalService hospitalService) {
//         this.hospitalService = hospitalService;
//     }

//     // ── APPROVE HOSPITAL REGISTRATION ───────────────────────────────────────
//     // POST /api/admin/approveHospital/{hospitalId}
//     @PostMapping("/approveHospital/{hospitalId}")
//     public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
//         try {
//             hospitalService.approve(hospitalId);
//             return ResponseEntity.ok(Map.of("message", "Hospital approved successfully"));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── REJECT HOSPITAL REGISTRATION ───────────────────────────────────────
//     // POST /api/admin/rejectHospital/{hospitalId}
//     @PostMapping("/rejectHospital/{hospitalId}")
//     public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
//         try {
//             hospitalService.reject(hospitalId);
//             return ResponseEntity.ok(Map.of("message", "Hospital rejected successfully"));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET PENDING HOSPITAL REGISTRATIONS ────────────────────────────────
//     // GET /api/admin/pendingHospitals
//     @GetMapping("/pendingHospitals")
//     public ResponseEntity<?> getPendingHospitals() {
//         try {
//             return ResponseEntity.ok(hospitalService.getPending());
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }
// }  




















// package com.medique.medique.controller;

// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.service.HospitalService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/admin")
// @CrossOrigin(origins = "*")
// public class AdminController {

//     private final HospitalService hospitalService;

//     public AdminController(HospitalService hospitalService) {
//         this.hospitalService = hospitalService;
//     }

//     // ── APPROVE HOSPITAL ──────────────────────────────────────────────────────
//     @PostMapping("/approveHospital/{hospitalId}")
//     public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
//         try {
//             hospitalService.approve(hospitalId);
//             return ResponseEntity.ok(Map.of("message", "Hospital approved successfully"));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── REJECT HOSPITAL ───────────────────────────────────────────────────────
//     @PostMapping("/rejectHospital/{hospitalId}")
//     public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
//         try {
//             hospitalService.reject(hospitalId);
//             return ResponseEntity.ok(Map.of("message", "Hospital rejected successfully"));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── PENDING HOSPITALS ─────────────────────────────────────────────────────
//     @GetMapping("/pendingHospitals")
//     public ResponseEntity<?> getPendingHospitals() {
//         try {
//             return ResponseEntity.ok(hospitalService.getPending());
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── ALL HOSPITALS ─────────────────────────────────────────────────────────
//     @GetMapping("/allHospitals")
//     public ResponseEntity<?> getAllHospitals() {
//         try {
//             return ResponseEntity.ok(hospitalService.getAll());
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── ADMIN STATS ───────────────────────────────────────────────────────────
//     // GET /api/admin/stats
//     // Returns counts for pending, approved, rejected hospitals
//     @GetMapping("/stats")
//     public ResponseEntity<?> getAdminStats() {
//         try {
//             List<Hospital> pending  = hospitalService.getPending();
//             List<Hospital> approved = hospitalService.getApproved();
//             List<Hospital> all      = hospitalService.getAll();

//             long rejectedCount = all.stream()
//                     .filter(h -> h.getStatus() == HospitalStatus.REJECTED)
//                     .count();

//             return ResponseEntity.ok(Map.of(
//                     "pendingHospitals",  pending.size(),
//                     "approvedHospitals", approved.size(),
//                     "rejectedHospitals", rejectedCount,
//                     "totalHospitals",    all.size()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
//         }
//     }
// }  



























package com.medique.medique.controller;

import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.HospitalStatus;
import com.medique.medique.entity.Token;
import com.medique.medique.repository.TokenRepository;
import com.medique.medique.service.HospitalService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    private final HospitalService hospitalService;
    private final TokenRepository tokenRepository;

    public AdminController(HospitalService hospitalService, TokenRepository tokenRepository) {
        this.hospitalService = hospitalService;
        this.tokenRepository = tokenRepository;
    }

    // ── APPROVE HOSPITAL ──────────────────────────────────────────────────────
    @PostMapping("/approveHospital/{hospitalId}")
    public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
        try {
            hospitalService.approve(hospitalId);
            return ResponseEntity.ok(Map.of("message", "Hospital approved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── REJECT HOSPITAL ───────────────────────────────────────────────────────
    @PostMapping("/rejectHospital/{hospitalId}")
    public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
        try {
            hospitalService.reject(hospitalId);
            return ResponseEntity.ok(Map.of("message", "Hospital rejected successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── PENDING HOSPITALS ─────────────────────────────────────────────────────
    @GetMapping("/pendingHospitals")
    public ResponseEntity<?> getPendingHospitals() {
        try {
            return ResponseEntity.ok(hospitalService.getPending());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── ALL HOSPITALS ─────────────────────────────────────────────────────────
    @GetMapping("/allHospitals")
    public ResponseEntity<?> getAllHospitals() {
        try {
            return ResponseEntity.ok(hospitalService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── ADMIN STATS ───────────────────────────────────────────────────────────
    // GET /api/admin/stats
    @GetMapping("/stats")
    public ResponseEntity<?> getAdminStats() {
        try {
            List<Hospital> pending  = hospitalService.getPending();
            List<Hospital> approved = hospitalService.getApproved();
            List<Hospital> all      = hospitalService.getAll();

            long rejectedCount = all.stream()
                    .filter(h -> h.getStatus() == HospitalStatus.REJECTED)
                    .count();

            return ResponseEntity.ok(Map.of(
                    "pendingHospitals",  pending.size(),
                    "approvedHospitals", approved.size(),
                    "rejectedHospitals", rejectedCount,
                    "totalHospitals",    all.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
        }
    }

    // ── ALL TOKENS — BOOKING MONITOR ──────────────────────────────────────────
    // GET /api/admin/allTokens          → all tokens ever
    // GET /api/admin/allTokens?date=YYYY-MM-DD → tokens for that date only
    @GetMapping("/allTokens")
    public ResponseEntity<?> getAllTokens(
            @RequestParam(required = false) String date) {
        try {
            List<Token> tokens;
            if (date != null && !date.isBlank()) {
                tokens = tokenRepository.findByDateOrderByCreatedAtDesc(date);
            } else {
                tokens = tokenRepository.findAllByOrderByCreatedAtDesc();
            }
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
        }
    }
}