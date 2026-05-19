






// package com.medique.medique.controller;

// import com.medique.medique.dto.HospitalLoginRequest;
// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Doctor;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.repository.DoctorRepository;
// import com.medique.medique.security.JwtUtil;
// import com.medique.medique.service.HospitalService;

// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

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
//     private final DoctorRepository doctorRepository;

//     public HospitalController(HospitalService hospitalService, JwtUtil jwtUtil, DoctorRepository doctorRepository) {
//         this.hospitalService = hospitalService;
//         this.jwtUtil = jwtUtil;
//         this.doctorRepository = doctorRepository;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody HospitalRegisterRequest req) {
//         try {
//             Hospital hospital = hospitalService.register(req);
//             return ResponseEntity.ok(Map.of(
//                     "message",    "Registration submitted successfully. Await admin approval.",
//                     "hospitalId", hospital.getHospitalId(),
//                     "status",     hospital.getStatus().name(),
//                     "name",       hospital.getName()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody HospitalLoginRequest req) {
//         try {
//             Hospital h = hospitalService.loginStaff(
//                     req.getHospitalId(),
//                     req.getEmail(),
//                     req.getPassword()
//             );

//             String token = jwtUtil.generateHospitalToken(h.getHospitalId(), "HOSPITAL");

//             Map<String, Object> res = new HashMap<>();
//             res.put("token",       token);
//             res.put("hospitalId",  h.getHospitalId());
//             res.put("name",        h.getName());
//             res.put("email",       h.getEmail());
//             res.put("phone",       h.getPhone());
//             res.put("address",     h.getAddress());
//             res.put("city",        h.getCity());
//             res.put("type",        h.getType());
//             res.put("imageUrl",    h.getImageUrl());
//             res.put("openingTime", h.getOpeningTime());
//             res.put("closingTime", h.getClosingTime());
//             res.put("status",      h.getStatus().name());

//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET OWN HOSPITAL DETAILS (Staff dashboard) ────────────────────────────
//     // Reads hospitalId from JWT — no body needed
//     @GetMapping("/details")
//     public ResponseEntity<?> getHospitalDetails(HttpServletRequest request) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Missing or invalid Authorization header"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);

//             return ResponseEntity.ok(toFullMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── UPDATE HOSPITAL PROFILE (Staff) ───────────────────────────────────────
//     @PutMapping("/profile")
//     public ResponseEntity<?> updateProfile(
//             HttpServletRequest request,
//             @RequestBody Map<String, Object> updates) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Unauthorized"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);

//             Hospital updated = hospitalService.updateHospitalProfile(hospitalId, updates);
//             return ResponseEntity.ok(toFullMap(updated));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET SINGLE HOSPITAL BY ID (public) ────────────────────────────────────
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getHospitalById(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);
//             // Use toFullMap so admin verification screen gets all fields
//             return ResponseEntity.ok(toFullMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                     .body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET APPROVED HOSPITALS (patients browse + admin list) ─────────────────
//     @GetMapping("/approved")
//     public ResponseEntity<?> getApprovedHospitals() {
//         List<Map<String, Object>> result = hospitalService.getApproved()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList());
//         return ResponseEntity.ok(result);
//     }

//     // ── GET PENDING HOSPITALS (admin) ─────────────────────────────────────────
//     @GetMapping("/pending")
//     public ResponseEntity<?> getPendingHospitals() {
//         return ResponseEntity.ok(hospitalService.getPending()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── GET ALL HOSPITALS (admin) ─────────────────────────────────────────────
//     @GetMapping("/all")
//     public ResponseEntity<?> getAllHospitals() {
//         return ResponseEntity.ok(hospitalService.getAll()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── APPROVE HOSPITAL (admin) ──────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/approve")
//     public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.approve(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital approved successfully",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── REJECT HOSPITAL (admin) ───────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/reject")
//     public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.reject(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital rejected",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── HELPERS ───────────────────────────────────────────────────────────────

//     private Map<String, Object> toPublicMap(Hospital h) {
//         Map<String, Object> m = new HashMap<>();
//         m.put("hospitalId",   h.getHospitalId());
//         m.put("name",         h.getName());
//         m.put("address",      h.getAddress());
//         m.put("city",         h.getCity());
//         m.put("imageUrl",     h.getImageUrl());
//         m.put("openingTime",  h.getOpeningTime());
//         m.put("closingTime",  h.getClosingTime());
//         m.put("description",  h.getDescription());
//         m.put("type",         h.getType());
//         m.put("status",       h.getStatus() != null ? h.getStatus().name() : null);

//         // Fetch real doctors for this hospital
//         List<Doctor> doctors = doctorRepository.findByHospitalId(h.getHospitalId());
//         m.put("doctorList", doctors);

//         // Derive departments from actual saved doctors so the list is always accurate
//         // and returned as a proper JSON array (not a raw string) for the React Native app
//         List<String> deptFromDoctors = doctors.stream()
//                 .map(Doctor::getDepartment)
//                 .filter(d -> d != null && !d.isBlank())
//                 .distinct()
//                 .collect(Collectors.toList());

//         // Fall back to the stored departments string if no doctors yet
//         if (deptFromDoctors.isEmpty() && h.getDepartments() != null && !h.getDepartments().isBlank()) {
//             // Stored as comma-separated or JSON array string — split and trim
//             String raw = h.getDepartments().trim();
//             if (raw.startsWith("[")) {
//                 // JSON array string — strip brackets and split
//                 raw = raw.replaceAll("[\\[\\]\"]", "");
//             }
//             for (String d : raw.split(",")) {
//                 String trimmed = d.trim();
//                 if (!trimmed.isEmpty()) deptFromDoctors.add(trimmed);
//             }
//         }
//         m.put("departments", deptFromDoctors);
//         return m;
//     }

//     private Map<String, Object> toFullMap(Hospital h) {
//         Map<String, Object> m = toPublicMap(h);
//         m.put("ownerName",          h.getOwnerName());
//         m.put("email",              h.getEmail());
//         m.put("phone",              h.getPhone());
//         m.put("numberOfDoctors",    h.getNumberOfDoctors());
//         m.put("licenseNumber",      h.getLicenseNumber());
//         m.put("registrationNumber", h.getRegistrationNumber());
//         m.put("createdAt",          h.getCreatedAt() != null ? h.getCreatedAt().toString() : null);
//         return m;
//     }
// }  































// package com.medique.medique.controller;

// import com.medique.medique.dto.HospitalLoginRequest;
// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.security.JwtUtil;
// import com.medique.medique.service.HospitalService;

// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

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

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody HospitalRegisterRequest req) {
//         try {
//             Hospital hospital = hospitalService.register(req);
//             return ResponseEntity.ok(Map.of(
//                     "message",    "Registration submitted successfully. Await admin approval.",
//                     "hospitalId", hospital.getHospitalId(),
//                     "status",     hospital.getStatus().name(),
//                     "name",       hospital.getName()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody HospitalLoginRequest req) {
//         try {
//             Hospital h = hospitalService.loginStaff(
//                     req.getHospitalId(),
//                     req.getEmail(),
//                     req.getPassword()
//             );

//             String token = jwtUtil.generateHospitalToken(h.getHospitalId(), "HOSPITAL");

//             Map<String, Object> res = new HashMap<>();
//             res.put("token",       token);
//             res.put("hospitalId",  h.getHospitalId());
//             res.put("name",        h.getName());
//             res.put("email",       h.getEmail());
//             res.put("phone",       h.getPhone());
//             res.put("address",     h.getAddress());
//             res.put("city",        h.getCity());
//             res.put("type",        h.getType());
//             res.put("imageUrl",    h.getImageUrl());
//             res.put("openingTime", h.getOpeningTime());
//             res.put("closingTime", h.getClosingTime());
//             res.put("status",      h.getStatus().name());

//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET OWN HOSPITAL DETAILS (Staff dashboard) ────────────────────────────
//     // Reads hospitalId from JWT — no body needed
//     @GetMapping("/details")
//     public ResponseEntity<?> getHospitalDetails(HttpServletRequest request) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Missing or invalid Authorization header"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);

//             return ResponseEntity.ok(toFullMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── UPDATE HOSPITAL PROFILE (Staff) ───────────────────────────────────────
//     @PutMapping("/profile")
//     public ResponseEntity<?> updateProfile(
//             HttpServletRequest request,
//             @RequestBody Map<String, Object> updates) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Unauthorized"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);

//             Hospital updated = hospitalService.updateHospitalProfile(hospitalId, updates);
//             return ResponseEntity.ok(toFullMap(updated));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET SINGLE HOSPITAL BY ID (public) ────────────────────────────────────
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getHospitalById(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);
//             return ResponseEntity.ok(toPublicMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                     .body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET APPROVED HOSPITALS (patients browse) ──────────────────────────────
//     @GetMapping("/approved")
//     public ResponseEntity<?> getApprovedHospitals() {
//         List<Map<String, Object>> result = hospitalService.getApproved()
//                 .stream()
//                 .map(this::toPublicMap)
//                 .collect(Collectors.toList());
//         return ResponseEntity.ok(result);
//     }

//     // ── GET PENDING HOSPITALS (admin) ─────────────────────────────────────────
//     @GetMapping("/pending")
//     public ResponseEntity<?> getPendingHospitals() {
//         return ResponseEntity.ok(hospitalService.getPending()
//                 .stream()
//                 .map(this::toPublicMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── GET ALL HOSPITALS (admin) ─────────────────────────────────────────────
//     @GetMapping("/all")
//     public ResponseEntity<?> getAllHospitals() {
//         return ResponseEntity.ok(hospitalService.getAll()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── APPROVE HOSPITAL (admin) ──────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/approve")
//     public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.approve(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital approved successfully",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── REJECT HOSPITAL (admin) ───────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/reject")
//     public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.reject(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital rejected",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── HELPERS ───────────────────────────────────────────────────────────────

//     private Map<String, Object> toPublicMap(Hospital h) {
//         Map<String, Object> m = new HashMap<>();
//         m.put("hospitalId",   h.getHospitalId());
//         m.put("name",         h.getName());
//         m.put("address",      h.getAddress());
//         m.put("city",         h.getCity());
//         m.put("imageUrl",     h.getImageUrl());
//         m.put("openingTime",  h.getOpeningTime());
//         m.put("closingTime",  h.getClosingTime());
//         m.put("description",  h.getDescription());
//         m.put("type",         h.getType());
//         m.put("status",       h.getStatus() != null ? h.getStatus().name() : null);
//         return m;
//     }

//     private Map<String, Object> toFullMap(Hospital h) {
//         Map<String, Object> m = toPublicMap(h);
//         m.put("ownerName",       h.getOwnerName());
//         m.put("email",           h.getEmail());
//         m.put("phone",           h.getPhone());
//         m.put("departments",     h.getDepartments());
//         m.put("numberOfDoctors", h.getNumberOfDoctors());
//         m.put("licenseNumber",   h.getLicenseNumber());
//         return m;
//     }
// }  






























// package com.medique.medique.controller;

// import com.medique.medique.dto.HospitalLoginRequest;
// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Doctor;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.repository.DoctorRepository;
// import com.medique.medique.security.JwtUtil;
// import com.medique.medique.service.HospitalService;

// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

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
//     private final DoctorRepository doctorRepository;

//     public HospitalController(HospitalService hospitalService, JwtUtil jwtUtil, DoctorRepository doctorRepository) {
//         this.hospitalService = hospitalService;
//         this.jwtUtil = jwtUtil;
//         this.doctorRepository = doctorRepository;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody HospitalRegisterRequest req) {
//         try {
//             Hospital hospital = hospitalService.register(req);
//             return ResponseEntity.ok(Map.of(
//                     "message",    "Registration submitted successfully. Await admin approval.",
//                     "hospitalId", hospital.getHospitalId(),
//                     "status",     hospital.getStatus().name(),
//                     "name",       hospital.getName()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody HospitalLoginRequest req) {
//         try {
//             Hospital h = hospitalService.loginStaff(
//                     req.getHospitalId(),
//                     req.getEmail(),
//                     req.getPassword()
//             );

//             String token = jwtUtil.generateHospitalToken(h.getHospitalId(), "HOSPITAL");

//             Map<String, Object> res = new HashMap<>();
//             res.put("token",       token);
//             res.put("hospitalId",  h.getHospitalId());
//             res.put("name",        h.getName());
//             res.put("email",       h.getEmail());
//             res.put("phone",       h.getPhone());
//             res.put("address",     h.getAddress());
//             res.put("city",        h.getCity());
//             res.put("type",        h.getType());
//             res.put("imageUrl",    h.getImageUrl());
//             res.put("openingTime", h.getOpeningTime());
//             res.put("closingTime", h.getClosingTime());
//             res.put("status",      h.getStatus().name());

//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET OWN HOSPITAL DETAILS (Staff dashboard) ────────────────────────────
//     // Reads hospitalId from JWT — no body needed
//     @GetMapping("/details")
//     public ResponseEntity<?> getHospitalDetails(HttpServletRequest request) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Missing or invalid Authorization header"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);

//             return ResponseEntity.ok(toFullMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── UPDATE HOSPITAL PROFILE (Staff) ───────────────────────────────────────
//     @PutMapping("/profile")
//     public ResponseEntity<?> updateProfile(
//             HttpServletRequest request,
//             @RequestBody Map<String, Object> updates) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Unauthorized"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);

//             Hospital updated = hospitalService.updateHospitalProfile(hospitalId, updates);
//             return ResponseEntity.ok(toFullMap(updated));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET SINGLE HOSPITAL BY ID (public) ────────────────────────────────────
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getHospitalById(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);
//             return ResponseEntity.ok(toPublicMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                     .body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET APPROVED HOSPITALS (patients browse) ──────────────────────────────
//     @GetMapping("/approved")
//     public ResponseEntity<?> getApprovedHospitals() {
//         List<Map<String, Object>> result = hospitalService.getApproved()
//                 .stream()
//                 .map(this::toPublicMap)
//                 .collect(Collectors.toList());
//         return ResponseEntity.ok(result);
//     }

//     // ── GET PENDING HOSPITALS (admin) ─────────────────────────────────────────
//     @GetMapping("/pending")
//     public ResponseEntity<?> getPendingHospitals() {
//         return ResponseEntity.ok(hospitalService.getPending()
//                 .stream()
//                 .map(this::toPublicMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── GET ALL HOSPITALS (admin) ─────────────────────────────────────────────
//     @GetMapping("/all")
//     public ResponseEntity<?> getAllHospitals() {
//         return ResponseEntity.ok(hospitalService.getAll()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── APPROVE HOSPITAL (admin) ──────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/approve")
//     public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.approve(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital approved successfully",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── REJECT HOSPITAL (admin) ───────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/reject")
//     public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.reject(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital rejected",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── HELPERS ───────────────────────────────────────────────────────────────

//     private Map<String, Object> toPublicMap(Hospital h) {
//         Map<String, Object> m = new HashMap<>();
//         m.put("hospitalId",   h.getHospitalId());
//         m.put("name",         h.getName());
//         m.put("address",      h.getAddress());
//         m.put("city",         h.getCity());
//         m.put("imageUrl",     h.getImageUrl());
//         m.put("openingTime",  h.getOpeningTime());
//         m.put("closingTime",  h.getClosingTime());
//         m.put("description",  h.getDescription());
//         m.put("type",         h.getType());
//         m.put("status",       h.getStatus() != null ? h.getStatus().name() : null);
//         // Include doctors so patient screens (HospitalDetails, BookToken) can display them
//         List<Doctor> doctors = doctorRepository.findByHospitalId(h.getHospitalId());
//         m.put("doctorList", doctors);
//         return m;
//     }

//     private Map<String, Object> toFullMap(Hospital h) {
//         Map<String, Object> m = toPublicMap(h);
//         m.put("ownerName",       h.getOwnerName());
//         m.put("email",           h.getEmail());
//         m.put("phone",           h.getPhone());
//         m.put("departments",     h.getDepartments());
//         m.put("numberOfDoctors", h.getNumberOfDoctors());
//         m.put("licenseNumber",   h.getLicenseNumber());
//         return m;
//     }
// }  





































// package com.medique.medique.controller;

// import com.medique.medique.dto.HospitalLoginRequest;
// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Doctor;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.repository.DoctorRepository;
// import com.medique.medique.security.JwtUtil;
// import com.medique.medique.service.HospitalService;

// import jakarta.servlet.http.HttpServletRequest;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

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
//     private final DoctorRepository doctorRepository;

//     public HospitalController(HospitalService hospitalService, JwtUtil jwtUtil, DoctorRepository doctorRepository) {
//         this.hospitalService = hospitalService;
//         this.jwtUtil = jwtUtil;
//         this.doctorRepository = doctorRepository;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     @PostMapping("/register")
//     public ResponseEntity<?> register(@RequestBody HospitalRegisterRequest req) {
//         try {
//             Hospital hospital = hospitalService.register(req);
//             return ResponseEntity.ok(Map.of(
//                     "message",    "Registration submitted successfully. Await admin approval.",
//                     "hospitalId", hospital.getHospitalId(),
//                     "status",     hospital.getStatus().name(),
//                     "name",       hospital.getName()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     @PostMapping("/login")
//     public ResponseEntity<?> login(@RequestBody HospitalLoginRequest req) {
//         try {
//             Hospital h = hospitalService.loginStaff(
//                     req.getHospitalId(),
//                     req.getEmail(),
//                     req.getPassword()
//             );

//             String token = jwtUtil.generateHospitalToken(h.getHospitalId(), "HOSPITAL");

//             Map<String, Object> res = new HashMap<>();
//             res.put("token",       token);
//             res.put("hospitalId",  h.getHospitalId());
//             res.put("name",        h.getName());
//             res.put("email",       h.getEmail());
//             res.put("phone",       h.getPhone());
//             res.put("address",     h.getAddress());
//             res.put("city",        h.getCity());
//             res.put("type",        h.getType());
//             res.put("imageUrl",    h.getImageUrl());
//             res.put("openingTime", h.getOpeningTime());
//             res.put("closingTime", h.getClosingTime());
//             res.put("status",      h.getStatus().name());

//             return ResponseEntity.ok(res);
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET OWN HOSPITAL DETAILS (Staff dashboard) ────────────────────────────
//     // Reads hospitalId from JWT — no body needed
//     @GetMapping("/details")
//     public ResponseEntity<?> getHospitalDetails(HttpServletRequest request) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Missing or invalid Authorization header"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);

//             return ResponseEntity.ok(toFullMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── UPDATE HOSPITAL PROFILE (Staff) ───────────────────────────────────────
//     @PutMapping("/profile")
//     public ResponseEntity<?> updateProfile(
//             HttpServletRequest request,
//             @RequestBody Map<String, Object> updates) {
//         try {
//             String authHeader = request.getHeader("Authorization");
//             if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                         .body(Map.of("message", "Unauthorized"));
//             }

//             String token      = authHeader.substring(7);
//             String hospitalId = jwtUtil.extractSubject(token);

//             Hospital updated = hospitalService.updateHospitalProfile(hospitalId, updates);
//             return ResponseEntity.ok(toFullMap(updated));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET SINGLE HOSPITAL BY ID (public) ────────────────────────────────────
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getHospitalById(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.getHospitalById(hospitalId);
//             // Use toFullMap so admin verification screen gets all fields
//             return ResponseEntity.ok(toFullMap(hospital));
//         } catch (Exception e) {
//             return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                     .body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET APPROVED HOSPITALS (patients browse + admin list) ─────────────────
//     @GetMapping("/approved")
//     public ResponseEntity<?> getApprovedHospitals() {
//         List<Map<String, Object>> result = hospitalService.getApproved()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList());
//         return ResponseEntity.ok(result);
//     }

//     // ── GET PENDING HOSPITALS (admin) ─────────────────────────────────────────
//     @GetMapping("/pending")
//     public ResponseEntity<?> getPendingHospitals() {
//         return ResponseEntity.ok(hospitalService.getPending()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── GET ALL HOSPITALS (admin) ─────────────────────────────────────────────
//     @GetMapping("/all")
//     public ResponseEntity<?> getAllHospitals() {
//         return ResponseEntity.ok(hospitalService.getAll()
//                 .stream()
//                 .map(this::toFullMap)
//                 .collect(Collectors.toList()));
//     }

//     // ── APPROVE HOSPITAL (admin) ──────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/approve")
//     public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.approve(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital approved successfully",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── REJECT HOSPITAL (admin) ───────────────────────────────────────────────
//     @PutMapping("/{hospitalId}/reject")
//     public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
//         try {
//             Hospital hospital = hospitalService.reject(hospitalId);
//             return ResponseEntity.ok(Map.of(
//                     "message", "Hospital rejected",
//                     "status",  hospital.getStatus().name()
//             ));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── HELPERS ───────────────────────────────────────────────────────────────

//     private Map<String, Object> toPublicMap(Hospital h) {
//         Map<String, Object> m = new HashMap<>();
//         m.put("hospitalId",   h.getHospitalId());
//         m.put("name",         h.getName());
//         m.put("address",      h.getAddress());
//         m.put("city",         h.getCity());
//         m.put("imageUrl",     h.getImageUrl());
//         m.put("openingTime",  h.getOpeningTime());
//         m.put("closingTime",  h.getClosingTime());
//         m.put("description",  h.getDescription());
//         m.put("type",         h.getType());
//         m.put("status",       h.getStatus() != null ? h.getStatus().name() : null);

//         // Fetch real doctors for this hospital
//         List<Doctor> doctors = doctorRepository.findByHospitalId(h.getHospitalId());
//         m.put("doctorList", doctors);

//         // Derive departments from actual saved doctors so the list is always accurate
//         // and returned as a proper JSON array (not a raw string) for the React Native app
//         List<String> deptFromDoctors = doctors.stream()
//                 .map(Doctor::getDepartment)
//                 .filter(d -> d != null && !d.isBlank())
//                 .distinct()
//                 .collect(Collectors.toList());

//         // Fall back to the stored departments string if no doctors yet
//         if (deptFromDoctors.isEmpty() && h.getDepartments() != null && !h.getDepartments().isBlank()) {
//             // Stored as comma-separated or JSON array string — split and trim
//             String raw = h.getDepartments().trim();
//             if (raw.startsWith("[")) {
//                 // JSON array string — strip brackets and split
//                 raw = raw.replaceAll("[\\[\\]\"]", "");
//             }
//             for (String d : raw.split(",")) {
//                 String trimmed = d.trim();
//                 if (!trimmed.isEmpty()) deptFromDoctors.add(trimmed);
//             }
//         }
//         m.put("departments", deptFromDoctors);
//         return m;
//     }

//     private Map<String, Object> toFullMap(Hospital h) {
//         Map<String, Object> m = toPublicMap(h);
//         m.put("ownerName",          h.getOwnerName());
//         m.put("email",              h.getEmail());
//         m.put("phone",              h.getPhone());
//         m.put("numberOfDoctors",    h.getNumberOfDoctors());
//         m.put("licenseNumber",      h.getLicenseNumber());
//         m.put("registrationNumber", h.getRegistrationNumber());
//         m.put("createdAt",          h.getCreatedAt() != null ? h.getCreatedAt().toString() : null);
//         m.put("documentUrls",       h.getDocumentUrls());
//         return m;
//     }
// }  
































package com.medique.medique.controller;

import com.medique.medique.dto.HospitalLoginRequest;
import com.medique.medique.dto.HospitalRegisterRequest;
import com.medique.medique.dto.SendOtpRequest;
import com.medique.medique.dto.ResetPasswordRequest;
import com.medique.medique.entity.Doctor;
import com.medique.medique.entity.Hospital;
import com.medique.medique.repository.DoctorRepository;
import com.medique.medique.security.JwtUtil;
import com.medique.medique.service.HospitalService;
import com.medique.medique.service.TwilioOTPService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private final DoctorRepository doctorRepository;
    private final TwilioOTPService twilioOTPService;

    public HospitalController(HospitalService hospitalService, JwtUtil jwtUtil, DoctorRepository doctorRepository, TwilioOTPService twilioOTPService) {
        this.hospitalService = hospitalService;
        this.jwtUtil = jwtUtil;
        this.doctorRepository = doctorRepository;
        this.twilioOTPService = twilioOTPService;
    }

    // ── HOSPITAL FORGOT PASSWORD FLOW ──────────────────────────────────────────

    @GetMapping("/check-phone")
    public ResponseEntity<?> checkPhone(@RequestParam String phone) {
        try {
            String formattedPhone = phone.trim();
            if (!formattedPhone.startsWith("+")) {
                formattedPhone = "+91" + formattedPhone;
            }
            boolean registered = hospitalService.isPhoneRegistered(formattedPhone);
            // Always return 200 OK — let the frontend read the "registered" boolean
            return ResponseEntity.ok(Map.of("registered", registered));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/otp/send")
    public ResponseEntity<?> sendOtp(@RequestBody SendOtpRequest req) {
        try {
            String phone = req.getPhone().trim();
            if (!phone.startsWith("+")) {
                phone = "+91" + phone;
            }

            boolean registered = hospitalService.isPhoneRegistered(phone);
            if (!registered) {
                return ResponseEntity.status(404)
                        .body(Map.of("message", "This phone number is not registered."));
            }

            boolean sent = twilioOTPService.sendOTP(phone);
            if (sent) {
                return ResponseEntity.ok(Map.of("message", "OTP sent successfully."));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Unable to send OTP."));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req) {
        try {
            String phone = req.getPhone().trim();
            if (!phone.startsWith("+")) {
                phone = "+91" + phone;
            }

            boolean isValid = twilioOTPService.verifyOTP(phone, req.getCode().trim());
            if (!isValid) {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid or expired OTP code."));
            }

            hospitalService.resetPassword(phone, req.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "Password reset successful."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ──────────────────────────────────────────────────────────────────────────

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody HospitalRegisterRequest req) {
        try {
            Hospital hospital = hospitalService.register(req);
            return ResponseEntity.ok(Map.of(
                    "message",    "Registration submitted successfully. Await admin approval.",
                    "hospitalId", hospital.getHospitalId(),
                    "status",     hospital.getStatus().name(),
                    "name",       hospital.getName()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody HospitalLoginRequest req) {
        try {
            Hospital h = hospitalService.loginStaff(
                    req.getHospitalId(),
                    req.getEmail(),
                    req.getPassword()
            );

            String token = jwtUtil.generateHospitalToken(h.getHospitalId(), "HOSPITAL");

            Map<String, Object> res = new HashMap<>();
            res.put("token",       token);
            res.put("hospitalId",  h.getHospitalId());
            res.put("name",        h.getName());
            res.put("email",       h.getEmail());
            res.put("phone",       h.getPhone());
            res.put("address",     h.getAddress());
            res.put("city",        h.getCity());
            res.put("type",        h.getType());
            res.put("imageUrl",    h.getImageUrl());
            res.put("openingTime", h.getOpeningTime());
            res.put("closingTime", h.getClosingTime());
            res.put("status",      h.getStatus().name());

            // ── Include bank details in login response ──
            res.put("upiId",             h.getUpiId());
            res.put("bankAccountName",   h.getBankAccountName());
            res.put("bankAccountNumber", h.getBankAccountNumber());
            res.put("bankIfsc",          h.getBankIfsc());
            res.put("bankName",          h.getBankName());
            // ────────────────────────────────────────────

            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/details")
    public ResponseEntity<?> getHospitalDetails(HttpServletRequest request) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Missing or invalid Authorization header"));
            }

            String token      = authHeader.substring(7);
            String hospitalId = jwtUtil.extractSubject(token);
            Hospital hospital = hospitalService.getHospitalById(hospitalId);

            return ResponseEntity.ok(toFullMap(hospital));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            HttpServletRequest request,
            @RequestBody Map<String, Object> updates) {
        try {
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Unauthorized"));
            }

            String token      = authHeader.substring(7);
            String hospitalId = jwtUtil.extractSubject(token);

            Hospital updated = hospitalService.updateHospitalProfile(hospitalId, updates);
            return ResponseEntity.ok(toFullMap(updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{hospitalId}")
    public ResponseEntity<?> getHospitalById(@PathVariable String hospitalId) {
        try {
            Hospital hospital = hospitalService.getHospitalById(hospitalId);
            return ResponseEntity.ok(toFullMap(hospital));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/approved")
    public ResponseEntity<?> getApprovedHospitals() {
        List<Map<String, Object>> result = hospitalService.getApproved()
                .stream()
                .map(this::toFullMap)
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping("/pending")
    public ResponseEntity<?> getPendingHospitals() {
        return ResponseEntity.ok(hospitalService.getPending()
                .stream()
                .map(this::toFullMap)
                .collect(Collectors.toList()));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllHospitals() {
        return ResponseEntity.ok(hospitalService.getAll()
                .stream()
                .map(this::toFullMap)
                .collect(Collectors.toList()));
    }

    @PutMapping("/{hospitalId}/approve")
    public ResponseEntity<?> approveHospital(@PathVariable String hospitalId) {
        try {
            Hospital hospital = hospitalService.approve(hospitalId);
            return ResponseEntity.ok(Map.of(
                    "message", "Hospital approved successfully",
                    "status",  hospital.getStatus().name()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping("/{hospitalId}/reject")
    public ResponseEntity<?> rejectHospital(@PathVariable String hospitalId) {
        try {
            Hospital hospital = hospitalService.reject(hospitalId);
            return ResponseEntity.ok(Map.of(
                    "message", "Hospital rejected",
                    "status",  hospital.getStatus().name()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── Private helpers ───────────────────────────────────────────────────────

    private Map<String, Object> toPublicMap(Hospital h) {
        Map<String, Object> m = new HashMap<>();
        m.put("hospitalId",   h.getHospitalId());
        m.put("name",         h.getName());
        m.put("address",      h.getAddress());
        m.put("city",         h.getCity());
        m.put("imageUrl",     h.getImageUrl());
        m.put("openingTime",  h.getOpeningTime());
        m.put("closingTime",  h.getClosingTime());
        m.put("description",  h.getDescription());
        m.put("type",         h.getType());
        m.put("status",       h.getStatus() != null ? h.getStatus().name() : null);

        List<Doctor> doctors = doctorRepository.findByHospitalId(h.getHospitalId());
        m.put("doctorList", doctors);

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

    private Map<String, Object> toFullMap(Hospital h) {
        Map<String, Object> m = toPublicMap(h);
        m.put("ownerName",          h.getOwnerName());
        m.put("email",              h.getEmail());
        m.put("phone",              h.getPhone());
        m.put("numberOfDoctors",    h.getNumberOfDoctors());
        m.put("licenseNumber",      h.getLicenseNumber());
        m.put("registrationNumber", h.getRegistrationNumber());
        m.put("createdAt",          h.getCreatedAt() != null ? h.getCreatedAt().toString() : null);
        m.put("documentUrls",       h.getDocumentUrls());

        // ── Bank / Payment details ──
        m.put("upiId",             h.getUpiId());
        m.put("bankAccountName",   h.getBankAccountName());
        m.put("bankAccountNumber", h.getBankAccountNumber());
        m.put("bankIfsc",          h.getBankIfsc());
        m.put("bankName",          h.getBankName());
        // ────────────────────────────

        return m;
    }
}