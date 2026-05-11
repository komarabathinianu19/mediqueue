// package com.medique.medique.controller;

// import com.medique.medique.entity.Department;
// import com.medique.medique.service.DepartmentService;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/departments")
// @CrossOrigin(origins = "*")
// public class DepartmentController {

//     private final DepartmentService departmentService;

//     public DepartmentController(DepartmentService departmentService) {
//         this.departmentService = departmentService;
//     }

//     // ── ADD DEPARTMENT (Staff/Admin) ───────────────────────────────────────
//     // POST /api/departments/{hospitalId}
//     @PostMapping("/{hospitalId}")
//     public ResponseEntity<?> addDepartment(@PathVariable String hospitalId,
//                                            @RequestBody Map<String, String> payload) {
//         try {
//             String departmentName = payload.get("name");
//             Department department = departmentService.addDepartment(hospitalId, departmentName);
//             return ResponseEntity.ok(department);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET ALL DEPARTMENTS FOR A HOSPITAL ───────────────────────────────
//     // GET /api/departments/{hospitalId}
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getDepartments(@PathVariable String hospitalId) {
//         try {
//             List<Department> departments = departmentService.getDepartmentsByHospital(hospitalId);
//             return ResponseEntity.ok(departments);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET DEPARTMENT BY NAME ────────────────────────────────────────────
//     // GET /api/departments/{hospitalId}/name/{departmentName}
//     @GetMapping("/{hospitalId}/name/{departmentName}")
//     public ResponseEntity<?> getDepartmentByName(@PathVariable String hospitalId,
//                                                  @PathVariable String departmentName) {
//         try {
//             Department department = departmentService.getDepartmentByName(hospitalId, departmentName);
//             return ResponseEntity.ok(department);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }
// }  


























package com.medique.medique.controller;

import com.medique.medique.entity.Department;
import com.medique.medique.service.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // ── ADD DEPARTMENT (Staff/Admin) ───────────────────────────────────────
    @PostMapping("/{hospitalId}")
    public ResponseEntity<?> addDepartment(@PathVariable String hospitalId,
                                           @RequestBody Map<String, String> payload) {
        try {
            String departmentName = payload.get("name");
            Department department = departmentService.addDepartment(hospitalId, departmentName);
            return ResponseEntity.ok(department);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── GET ALL DEPARTMENTS FOR A HOSPITAL ───────────────────────────────
    @GetMapping("/{hospitalId}")
    public ResponseEntity<?> getDepartments(@PathVariable String hospitalId) {
        try {
            List<Department> departments = departmentService.getDepartmentsByHospital(hospitalId);
            return ResponseEntity.ok(departments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── GET DEPARTMENT BY NAME ────────────────────────────────────────────
    @GetMapping("/{hospitalId}/name/{departmentName}")
    public ResponseEntity<?> getDepartmentByName(@PathVariable String hospitalId,
                                                 @PathVariable String departmentName) {
        try {
            Department department = departmentService.getDepartmentByName(hospitalId, departmentName);
            return ResponseEntity.ok(department);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}