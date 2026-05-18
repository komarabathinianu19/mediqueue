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

//     // ── ADD DEPARTMENT (Staff) ─────────────────────────────────────────────────
//     // POST /api/departments/{hospitalId}
//     // Body: { "name": "Cardiology" }
//     @PostMapping("/{hospitalId}")
//     public ResponseEntity<?> addDepartment(
//             @PathVariable String hospitalId,
//             @RequestBody Map<String, String> payload
//     ) {
//         try {
//             String departmentName = payload.get("name");
//             if (departmentName == null || departmentName.isBlank()) {
//                 return ResponseEntity.badRequest()
//                         .body(Map.of("message", "Department name is required."));
//             }
//             Department department = departmentService.addDepartment(hospitalId, departmentName);
//             return ResponseEntity.ok(toMap(department));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET ALL DEPARTMENTS FOR A HOSPITAL (Patient & Staff) ─────────────────
//     // GET /api/departments/{hospitalId}
//     @GetMapping("/{hospitalId}")
//     public ResponseEntity<?> getDepartments(@PathVariable String hospitalId) {
//         try {
//             List<Department> departments = departmentService.getDepartmentsByHospital(hospitalId);
//             List<Map<String, Object>> result = departments.stream()
//                     .map(this::toMap)
//                     .toList();
//             return ResponseEntity.ok(result);
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── GET DEPARTMENT BY NAME ─────────────────────────────────────────────────
//     // GET /api/departments/{hospitalId}/name/{departmentName}
//     @GetMapping("/{hospitalId}/name/{departmentName}")
//     public ResponseEntity<?> getDepartmentByName(
//             @PathVariable String hospitalId,
//             @PathVariable String departmentName
//     ) {
//         try {
//             Department department = departmentService.getDepartmentByName(hospitalId, departmentName);
//             return ResponseEntity.ok(toMap(department));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── DELETE DEPARTMENT (Staff) ──────────────────────────────────────────────
//     // DELETE /api/departments/{departmentId}
//     @DeleteMapping("/{departmentId}")
//     public ResponseEntity<?> deleteDepartment(@PathVariable Long departmentId) {
//         try {
//             departmentService.deleteDepartment(departmentId);
//             return ResponseEntity.ok(Map.of("message", "Department deleted."));
//         } catch (Exception e) {
//             e.printStackTrace();
//             return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
//         }
//     }

//     // ── Helper: clean response map ────────────────────────────────────────────
//     private Map<String, Object> toMap(Department d) {
//         return Map.of(
//                 "id", d.getId(),
//                 "name", d.getName(),
//                 "hospitalId", d.getHospitalId()
//         );
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

    // ── GET ALL DEPARTMENTS FOR A HOSPITAL (patients + staff) ─────────────────
    // GET /api/departments/hospital/{hospitalId}
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<?> getDepartmentsByHospital(@PathVariable String hospitalId) {
        try {
            List<Department> departments = departmentService.getByHospitalId(hospitalId);
            return ResponseEntity.ok(departments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── ADD DEPARTMENT (staff) ─────────────────────────────────────────────────
    // POST /api/departments
    // Body: { "hospitalId": "HSP-XXXX", "name": "Cardiology" }
    @PostMapping
    public ResponseEntity<?> addDepartment(@RequestBody Map<String, String> body) {
        try {
            String hospitalId = body.get("hospitalId");
            String name       = body.get("name");

            if (hospitalId == null || hospitalId.isBlank())
                return ResponseEntity.badRequest().body(Map.of("message", "hospitalId is required"));
            if (name == null || name.isBlank())
                return ResponseEntity.badRequest().body(Map.of("message", "name is required"));

            Department saved = departmentService.addDepartment(hospitalId, name);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── DELETE DEPARTMENT (staff) ──────────────────────────────────────────────
    // DELETE /api/departments/{departmentId}
    @DeleteMapping("/{departmentId}")
    public ResponseEntity<?> deleteDepartment(@PathVariable Long departmentId) {
        try {
            departmentService.deleteDepartment(departmentId);
            return ResponseEntity.ok(Map.of("message", "Department deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}