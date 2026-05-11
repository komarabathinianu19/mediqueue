// package com.medique.medique.service;

// import com.medique.medique.entity.Doctor;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.repository.DoctorRepository;
// import com.medique.medique.repository.HospitalRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Map;

// @Service
// public class DoctorService {

//     private final DoctorRepository doctorRepo;
//     private final HospitalRepository hospitalRepo;

//     public DoctorService(DoctorRepository doctorRepo, HospitalRepository hospitalRepo) {
//         this.doctorRepo = doctorRepo;
//         this.hospitalRepo = hospitalRepo;
//     }

//     // Default timings JSON used when a doctor is created without custom timings
//     private static final String DEFAULT_TIMINGS_JSON =
//         "{\"morning\":{\"label\":\"Morning\",\"enabled\":true,\"startTime\":\"09:00 AM\"," +
//         "\"endTime\":\"12:00 PM\",\"maxPatients\":30}," +
//         "\"afternoon\":{\"label\":\"Afternoon\",\"enabled\":true,\"startTime\":\"01:00 PM\"," +
//         "\"endTime\":\"04:00 PM\",\"maxPatients\":25}," +
//         "\"night\":{\"label\":\"Night\",\"enabled\":true,\"startTime\":\"06:00 PM\"," +
//         "\"endTime\":\"09:00 PM\",\"maxPatients\":20}}";

//     // ── ADD DOCTOR ────────────────────────────────────────────────────────────
//     public Doctor addDoctor(String hospitalId, Map<String, Object> payload) {

//         // Validate hospital exists
//         hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));

//         String name = (String) payload.get("name");
//         String department = (String) payload.get("department");

//         if (name == null || name.isBlank())
//             throw new RuntimeException("Doctor name is required.");
//         if (department == null || department.isBlank())
//             throw new RuntimeException("Department is required.");

//         Doctor d = new Doctor();
//         d.setHospitalId(hospitalId);
//         d.setName(name);
//         d.setDepartment(department);
//         d.setQualification((String) payload.getOrDefault("qualification", "MBBS"));
//         d.setExperience((String) payload.getOrDefault("experience", ""));
//         d.setImageUrl((String) payload.getOrDefault("imageUrl", ""));

//         Object feeObj = payload.get("fee");
//         d.setFee(feeObj != null ? Integer.parseInt(feeObj.toString()) : 500);

//         // Use provided timingsJson or fall back to defaults
//         String timings = (String) payload.get("timingsJson");
//         d.setTimingsJson(timings != null ? timings : DEFAULT_TIMINGS_JSON);

//         return doctorRepo.save(d);
//     }

//     // ── UPDATE TIMINGS ────────────────────────────────────────────────────────
//     public Doctor updateTimings(Long doctorId, String timingsJson) {
//         Doctor d = doctorRepo.findById(doctorId)
//                 .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));
//         d.setTimingsJson(timingsJson);
//         return doctorRepo.save(d);
//     }

//     // ── GET ALL DOCTORS FOR HOSPITAL ──────────────────────────────────────────
//     public List<Doctor> getDoctorsByHospital(String hospitalId) {
//         return doctorRepo.findByHospitalId(hospitalId);
//     }

//     // ── GET DOCTORS BY HOSPITAL + DEPARTMENT ─────────────────────────────────
//     public List<Doctor> getDoctorsByDepartment(String hospitalId, String department) {
//         return doctorRepo.findByHospitalIdAndDepartment(hospitalId, department);
//     }

//     // ── GET SINGLE DOCTOR ─────────────────────────────────────────────────────
//     public Doctor getDoctorById(Long doctorId) {
//         return doctorRepo.findById(doctorId)
//                 .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));
//     }

//     // ── DELETE DOCTOR ─────────────────────────────────────────────────────────
//     public void deleteDoctor(Long doctorId) {
//         doctorRepo.deleteById(doctorId);
//     }
// }  























package com.medique.medique.service;

import com.medique.medique.entity.Department;
import com.medique.medique.entity.Doctor;
import com.medique.medique.entity.Hospital;

import com.medique.medique.repository.DepartmentRepository;
import com.medique.medique.repository.DoctorRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepo;
    private final DepartmentRepository departmentRepo;
    private final HospitalService hospitalService;

    public DoctorService(
            DoctorRepository doctorRepo,
            DepartmentRepository departmentRepo,
            HospitalService hospitalService
    ) {
        this.doctorRepo = doctorRepo;
        this.departmentRepo = departmentRepo;
        this.hospitalService = hospitalService;
    }

    // Add doctor
    public Doctor addDoctor(
            String hospitalId,
            Map<String, Object> payload
    ) {

        String departmentName =
                (String) payload.get("department");

        Hospital hospital =
                hospitalService.getHospitalById(hospitalId);

        Department department = departmentRepo
                .findByHospital_IdAndName(
                        hospital.getId(),
                        departmentName
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Department not found: " + departmentName
                        ));

        Doctor doctor = new Doctor();

        doctor.setName((String) payload.get("name"));
        doctor.setHospitalId(hospitalId);

        doctor.setDepartment(department.getName());

        doctor.setQualification(
                (String) payload.get("qualification")
        );

        doctor.setExperience(
                (String) payload.get("experience")
        );

        Object feeObj = payload.get("fee");

        if (feeObj != null) {
            doctor.setFee(
                    Integer.parseInt(feeObj.toString())
            );
        }

        doctor.setImageUrl(
                (String) payload.get("imageUrl")
        );

        doctor.setTimingsJson(
                (String) payload.get("timingsJson")
        );

        return doctorRepo.save(doctor);
    }

    // Get all doctors
    public List<Doctor> getDoctorsByHospital(
            String hospitalId
    ) {
        return doctorRepo.findByHospitalId(hospitalId);
    }

    // Get doctors by department
    public List<Doctor> getDoctorsByDepartment(
            String hospitalId,
            String departmentName
    ) {

        return doctorRepo.findByHospitalIdAndDepartment(
                hospitalId,
                departmentName
        );
    }

    // Get doctor by ID
    public Doctor getDoctorById(Long doctorId) {

        return doctorRepo.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor not found with ID: " + doctorId
                        ));
    }

    // Update timings
    public Doctor updateTimings(
            Long doctorId,
            String timingsJson
    ) {

        Doctor doctor = doctorRepo.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Doctor not found: " + doctorId
                        ));

        doctor.setTimingsJson(timingsJson);

        return doctorRepo.save(doctor);
    }

    // Delete doctor
    public void deleteDoctor(Long doctorId) {
        doctorRepo.deleteById(doctorId);
    }
}