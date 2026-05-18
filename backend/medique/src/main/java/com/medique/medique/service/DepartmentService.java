// package com.medique.medique.service;

// import com.medique.medique.entity.Department;
// import com.medique.medique.repository.DepartmentRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DepartmentService {

//     private final DepartmentRepository departmentRepository;

//     public DepartmentService(DepartmentRepository departmentRepository) {
//         this.departmentRepository = departmentRepository;
//     }

//     // Create a new department
//     public Department addDepartment(String hospitalId, String departmentName) {
//         // Check if department already exists for the hospital
//         if (departmentRepository.existsByHospitalIdAndName(hospitalId, departmentName)) {
//             throw new RuntimeException("Department already exists for this hospital.");
//         }

//         Department department = new Department();
//         department.setHospitalId(hospitalId);
//         department.setName(departmentName);

//         return departmentRepository.save(department);
//     }

//     // Get all departments for a hospital
//     public List<Department> getDepartmentsByHospital(String hospitalId) {
//         return departmentRepository.findByHospitalId(hospitalId);
//     }

//     // Get department by name
//     public Department getDepartmentByName(String hospitalId, String departmentName) {
//         return departmentRepository.findByHospitalIdAndName(hospitalId, departmentName)
//                 .orElseThrow(() -> new RuntimeException("Department not found: " + departmentName));
//     }
// }  





















// package com.medique.medique.service;

// import com.medique.medique.entity.Department;
// import com.medique.medique.repository.DepartmentRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DepartmentService {

//     private final DepartmentRepository departmentRepository;

//     public DepartmentService(DepartmentRepository departmentRepository) {
//         this.departmentRepository = departmentRepository;
//     }

//     // Add a new department
// public Department addDepartment(String hospitalId, String departmentName) {
//     // Fetch hospital by hospitalId to associate it with department
//     Hospital hospital = hospitalService.getHospitalById(hospitalId);
//     if (departmentRepository.existsByHospitalIdAndName(hospitalId, departmentName)) {
//         throw new RuntimeException("Department already exists for this hospital.");
//     }

//     Department department = new Department();
//     department.setHospital(hospital);  // Set the entire Hospital object
//     department.setName(departmentName);

//     return departmentRepository.save(department);
// }

//     // Get all departments for a hospital
//     public List<Department> getDepartmentsByHospital(String hospitalId) {
//         return departmentRepository.findByHospitalId(hospitalId);
//     }

//     // Get department by name
//     public Department getDepartmentByName(String hospitalId, String departmentName) {
//         return departmentRepository.findByHospitalIdAndName(hospitalId, departmentName)
//                 .orElseThrow(() -> new RuntimeException("Department not found: " + departmentName));
//     } 

//     // Fetch a doctor by ID
// public Doctor getDoctorById(Long doctorId) {
//     return doctorRepo.findById(doctorId)
//             .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
// }
// }  













// package com.medique.medique.service;

// import com.medique.medique.entity.Department;
// import com.medique.medique.entity.Doctor;
// import com.medique.medique.entity.Hospital;

// import com.medique.medique.repository.DepartmentRepository;
// import com.medique.medique.repository.DoctorRepository;

// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DepartmentService {

//     private final DepartmentRepository departmentRepository;
//     private final HospitalService hospitalService;
//     private final DoctorRepository doctorRepo;

//     public DepartmentService(
//             DepartmentRepository departmentRepository,
//             HospitalService hospitalService,
//             DoctorRepository doctorRepo
//     ) {
//         this.departmentRepository = departmentRepository;
//         this.hospitalService = hospitalService;
//         this.doctorRepo = doctorRepo;
//     }

//     // Add department
//     public Department addDepartment(String hospitalId, String departmentName) {

//         Hospital hospital = hospitalService.getHospitalById(hospitalId);

//         Long hospitalDbId = hospital.getId();

//         if (departmentRepository.existsByHospital_IdAndName(
//                 hospitalDbId,
//                 departmentName
//         )) {
//             throw new RuntimeException(
//                     "Department already exists for this hospital."
//             );
//         }

//         Department department = new Department();

//         department.setHospital(hospital);
//         department.setName(departmentName);

//         return departmentRepository.save(department);
//     }

//     // Get all departments
//     public List<Department> getDepartmentsByHospital(String hospitalId) {

//         Hospital hospital = hospitalService.getHospitalById(hospitalId);

//         return departmentRepository.findByHospital_Id(
//                 hospital.getId()
//         );
//     }

//     // Get department by name
//     public Department getDepartmentByName(
//             String hospitalId,
//             String departmentName
//     ) {

//         Hospital hospital = hospitalService.getHospitalById(hospitalId);

//         return departmentRepository
//                 .findByHospital_IdAndName(
//                         hospital.getId(),
//                         departmentName
//                 )
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Department not found: " + departmentName
//                         ));
//     }

//     // Get doctor by ID
//     public Doctor getDoctorById(Long doctorId) {

//         return doctorRepo.findById(doctorId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Doctor not found with ID: " + doctorId
//                         ));
//     }
// }





























// package com.medique.medique.service;

// import com.medique.medique.entity.Department;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.repository.DepartmentRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DepartmentService {

//     private final DepartmentRepository departmentRepository;
//     private final HospitalService hospitalService;

//     public DepartmentService(
//             DepartmentRepository departmentRepository,
//             HospitalService hospitalService
//     ) {
//         this.departmentRepository = departmentRepository;
//         this.hospitalService = hospitalService;
//     }

//     // ── Add department ────────────────────────────────────────────────────────
//     public Department addDepartment(String hospitalId, String departmentName) {

//         // Verify hospital exists
//         hospitalService.getHospitalById(hospitalId);

//         if (departmentRepository.existsByHospitalIdAndName(hospitalId, departmentName)) {
//             throw new RuntimeException("Department '" + departmentName + "' already exists for this hospital.");
//         }

//         Department department = new Department();
//         department.setHospitalId(hospitalId);
//         department.setName(departmentName);

//         return departmentRepository.save(department);
//     }

//     // ── Get all departments for a hospital ────────────────────────────────────
//     public List<Department> getDepartmentsByHospital(String hospitalId) {
//         // Verify hospital exists
//         hospitalService.getHospitalById(hospitalId);
//         return departmentRepository.findByHospitalId(hospitalId);
//     }

//     // ── Get department by name ────────────────────────────────────────────────
//     public Department getDepartmentByName(String hospitalId, String departmentName) {
//         return departmentRepository
//                 .findByHospitalIdAndName(hospitalId, departmentName)
//                 .orElseThrow(() -> new RuntimeException(
//                         "Department not found: " + departmentName
//                 ));
//     }

//     // ── Delete department ─────────────────────────────────────────────────────
//     public void deleteDepartment(Long departmentId) {
//         departmentRepository.deleteById(departmentId);
//     }
// }  
























package com.medique.medique.service;

import com.medique.medique.entity.Department;
import com.medique.medique.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    // ── GET ALL DEPARTMENTS FOR A HOSPITAL ────────────────────────────────────
    public List<Department> getByHospitalId(String hospitalId) {
        return departmentRepository.findByHospitalId(hospitalId);
    }

    // ── ADD DEPARTMENT ────────────────────────────────────────────────────────
    @Transactional
    public Department addDepartment(String hospitalId, String name) {
        // Prevent duplicate departments for the same hospital
        boolean exists = departmentRepository
                .findByHospitalId(hospitalId)
                .stream()
                .anyMatch(d -> d.getName().equalsIgnoreCase(name));

        if (exists) throw new RuntimeException("Department '" + name + "' already exists for this hospital.");

        Department dept = new Department();
        dept.setHospitalId(hospitalId);
        dept.setName(name);
        return departmentRepository.save(dept);
    }

    // ── DELETE DEPARTMENT ─────────────────────────────────────────────────────
    @Transactional
    public void deleteDepartment(Long departmentId) {
        if (!departmentRepository.existsById(departmentId))
            throw new RuntimeException("Department not found: " + departmentId);
        departmentRepository.deleteById(departmentId);
    }
}