// package com.medique.medique.controller;

// import com.medique.medique.entity.Doctor;
// import com.medique.medique.service.DoctorService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/doctors")
// @CrossOrigin(origins = "*")
// public class DoctorController {

//     private final DoctorService doctorService;

//     public DoctorController(DoctorService doctorService) {
//         this.doctorService = doctorService;
//     }

//     // ── ADD DOCTOR (Staff/Admin) ──────────────────────────────────────────────
//     // POST /api/doctors/{hospitalId}
//     // Body: { name, department, qualification, experience, fee, imageUrl, timingsJson }
//     @PostMapping("/{hospitalId}")
//     public ResponseEntity<?> addDoctor(@PathVariable String hospitalId,
//                                         @RequestBody Map<String, Object> payload) {
//         try {
//             Doctor d = doctorService.addDoctor(hospitalId, payload);
//             return ResponseEntity.ok(d);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET ALL DOCTORS FOR HOSPITAL ──────────────────────────────────────────
//     // GET /api/doctors/{hospitalId}
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getDoctors(@PathVariable String hospitalId) {
//         try {
//             List<Doctor> doctors = doctorService.getDoctorsByHospital(hospitalId);
//             return ResponseEntity.ok(doctors);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET DOCTORS BY DEPARTMENT ─────────────────────────────────────────────
//     // GET /api/doctors/{hospitalId}/department/{department}
//     @GetMapping("/{hospitalId}/department/{department}")
//     public ResponseEntity<?> getDoctorsByDept(@PathVariable String hospitalId,
//                                                @PathVariable String department) {
//         try {
//             List<Doctor> doctors = doctorService.getDoctorsByDepartment(hospitalId, department);
//             return ResponseEntity.ok(doctors);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET SINGLE DOCTOR ─────────────────────────────────────────────────────
//     // GET /api/doctors/single/{doctorId}
//     @GetMapping("/single/{doctorId}")
//     public ResponseEntity<?> getDoctor(@PathVariable Long doctorId) {
//         try {
//             return ResponseEntity.ok(doctorService.getDoctorById(doctorId));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── UPDATE TIMINGS ────────────────────────────────────────────────────────
//     // PUT /api/doctors/{doctorId}/timings
//     // Body: { timingsJson: "..." }
//     @PutMapping("/{doctorId}/timings")
//     public ResponseEntity<?> updateTimings(@PathVariable Long doctorId,
//                                             @RequestBody Map<String, String> body) {
//         try {
//             String timingsJson = body.get("timingsJson");
//             if (timingsJson == null)
//                 return ResponseEntity.badRequest().body(Map.of("message", "timingsJson is required."));
//             Doctor d = doctorService.updateTimings(doctorId, timingsJson);
//             return ResponseEntity.ok(d);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── DELETE DOCTOR ─────────────────────────────────────────────────────────
//     // DELETE /api/doctors/{doctorId}
//     @DeleteMapping("/{doctorId}")
//     public ResponseEntity<?> deleteDoctor(@PathVariable Long doctorId) {
//         try {
//             doctorService.deleteDoctor(doctorId);
//             return ResponseEntity.ok(Map.of("message", "Doctor deleted."));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }
// }  


















package com.medique.medique.controller;

import com.medique.medique.entity.Doctor;
import com.medique.medique.service.DoctorService;
import com.medique.medique.dto.TimingRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // ── GET ALL DOCTORS FOR A HOSPITAL ────────────────────────────────────────
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<?> getDoctorsByHospital(@PathVariable String hospitalId) {
        try {
            List<Doctor> doctors = doctorService.getByHospitalId(hospitalId);
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── GET DOCTORS BY DEPARTMENT ─────────────────────────────────────────────
    @GetMapping("/hospital/{hospitalId}/department/{department}")
    public ResponseEntity<?> getDoctorsByDepartment(
            @PathVariable String hospitalId,
            @PathVariable String department) {
        try {
            List<Doctor> doctors = doctorService.getByHospitalAndDepartment(hospitalId, department);
            return ResponseEntity.ok(doctors);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── ADD DOCTOR ────────────────────────────────────────────────────────────
    @PostMapping
    public ResponseEntity<?> addDoctor(@RequestBody Doctor doctor) {
        try {
            Doctor saved = doctorService.addDoctor(doctor);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── UPDATE DOCTOR ─────────────────────────────────────────────────────────
    @PutMapping("/{doctorId}")
    public ResponseEntity<?> updateDoctor(
            @PathVariable Long doctorId,
            @RequestBody Doctor updates) {
        try {
            Doctor updated = doctorService.updateDoctor(doctorId, updates);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── UPDATE DOCTOR TIMINGS (This is the one your React app calls) ──────────
    @PutMapping("/{doctorId}/timings")
    public ResponseEntity<?> updateDoctorTimings(
            @PathVariable Long doctorId,
            @RequestBody Map<String, TimingRequestDTO> timings) {
        try {
            doctorService.updateDoctorTimings(doctorId, timings);
            return ResponseEntity.ok(Map.of("message", "Timings updated successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── DELETE DOCTOR ─────────────────────────────────────────────────────────
    @DeleteMapping("/{doctorId}")
    public ResponseEntity<?> deleteDoctor(@PathVariable Long doctorId) {
        try {
            doctorService.deleteDoctor(doctorId);
            return ResponseEntity.ok(Map.of("message", "Doctor deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}