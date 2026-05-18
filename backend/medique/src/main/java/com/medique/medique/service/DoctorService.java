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























// package com.medique.medique.service;

// import com.medique.medique.entity.Department;
// import com.medique.medique.entity.Doctor;
// import com.medique.medique.entity.Hospital;

// import com.medique.medique.repository.DepartmentRepository;
// import com.medique.medique.repository.DoctorRepository;

// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Map;

// @Service
// public class DoctorService {

//     private final DoctorRepository doctorRepo;
//     private final DepartmentRepository departmentRepo;
//     private final HospitalService hospitalService;

//     public DoctorService(
//             DoctorRepository doctorRepo,
//             DepartmentRepository departmentRepo,
//             HospitalService hospitalService
//     ) {
//         this.doctorRepo = doctorRepo;
//         this.departmentRepo = departmentRepo;
//         this.hospitalService = hospitalService;
//     }

//     // Add doctor
//     public Doctor addDoctor(
//             String hospitalId,
//             Map<String, Object> payload
//     ) {

//         String departmentName =
//                 (String) payload.get("department");

//         Hospital hospital =
//                 hospitalService.getHospitalById(hospitalId);

//         Department department = departmentRepo
//                 .findByHospital_IdAndName(
//                         hospital.getId(),
//                         departmentName
//                 )
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Department not found: " + departmentName
//                         ));

//         Doctor doctor = new Doctor();

//         doctor.setName((String) payload.get("name"));
//         doctor.setHospitalId(hospitalId);

//         doctor.setDepartment(department.getName());

//         doctor.setQualification(
//                 (String) payload.get("qualification")
//         );

//         doctor.setExperience(
//                 (String) payload.get("experience")
//         );

//         Object feeObj = payload.get("fee");

//         if (feeObj != null) {
//             doctor.setFee(
//                     Integer.parseInt(feeObj.toString())
//             );
//         }

//         doctor.setImageUrl(
//                 (String) payload.get("imageUrl")
//         );

//         doctor.setTimingsJson(
//                 (String) payload.get("timingsJson")
//         );

//         return doctorRepo.save(doctor);
//     }

//     // Get all doctors
//     public List<Doctor> getDoctorsByHospital(
//             String hospitalId
//     ) {
//         return doctorRepo.findByHospitalId(hospitalId);
//     }

//     // Get doctors by department
//     public List<Doctor> getDoctorsByDepartment(
//             String hospitalId,
//             String departmentName
//     ) {

//         return doctorRepo.findByHospitalIdAndDepartment(
//                 hospitalId,
//                 departmentName
//         );
//     }

//     // Get doctor by ID
//     public Doctor getDoctorById(Long doctorId) {

//         return doctorRepo.findById(doctorId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Doctor not found with ID: " + doctorId
//                         ));
//     }

//     // Update timings
//     public Doctor updateTimings(
//             Long doctorId,
//             String timingsJson
//     ) {

//         Doctor doctor = doctorRepo.findById(doctorId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Doctor not found: " + doctorId
//                         ));

//         doctor.setTimingsJson(timingsJson);

//         return doctorRepo.save(doctor);
//     }

//     // Delete doctor
//     public void deleteDoctor(Long doctorId) {
//         doctorRepo.deleteById(doctorId);
//     }
// }  























// package com.medique.medique.service;

// import com.medique.medique.entity.Department;
// import com.medique.medique.entity.Doctor;
// import com.medique.medique.repository.DepartmentRepository;
// import com.medique.medique.repository.DoctorRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Map;

// @Service
// public class DoctorService {

//     private final DoctorRepository doctorRepo;
//     private final DepartmentRepository departmentRepo;
//     private final HospitalService hospitalService;

//     public DoctorService(
//             DoctorRepository doctorRepo,
//             DepartmentRepository departmentRepo,
//             HospitalService hospitalService
//     ) {
//         this.doctorRepo = doctorRepo;
//         this.departmentRepo = departmentRepo;
//         this.hospitalService = hospitalService;
//     }

//     // ── Add doctor ────────────────────────────────────────────────────────────
//     public Doctor addDoctor(String hospitalId, Map<String, Object> payload) {

//         String departmentName = (String) payload.get("department");

//         // Verify hospital exists
//         hospitalService.getHospitalById(hospitalId);

//         // Verify department exists for this hospital
//         departmentRepo.findByHospitalIdAndName(hospitalId, departmentName)
//                 .orElseThrow(() -> new RuntimeException(
//                         "Department not found: " + departmentName +
//                         ". Please add the department first."
//                 ));

//         Doctor doctor = new Doctor();
//         doctor.setHospitalId(hospitalId);
//         doctor.setName((String) payload.get("name"));
//         doctor.setDepartment(departmentName);
//         doctor.setQualification((String) payload.get("qualification"));
//         doctor.setExperience((String) payload.get("experience"));

//         Object feeObj = payload.get("fee");
//         if (feeObj != null) {
//             doctor.setFee(Integer.parseInt(feeObj.toString()));
//         }

//         doctor.setImageUrl((String) payload.get("imageUrl"));
//         doctor.setTimingsJson((String) payload.get("timingsJson"));

//         return doctorRepo.save(doctor);
//     }

//     // ── Get all doctors for a hospital ────────────────────────────────────────
//     public List<Doctor> getDoctorsByHospital(String hospitalId) {
//         return doctorRepo.findByHospitalId(hospitalId);
//     }

//     // ── Get doctors filtered by department ────────────────────────────────────
//     public List<Doctor> getDoctorsByDepartment(String hospitalId, String departmentName) {
//         return doctorRepo.findByHospitalIdAndDepartment(hospitalId, departmentName);
//     }

//     // ── Get single doctor ─────────────────────────────────────────────────────
//     public Doctor getDoctorById(Long doctorId) {
//         return doctorRepo.findById(doctorId)
//                 .orElseThrow(() -> new RuntimeException(
//                         "Doctor not found with ID: " + doctorId
//                 ));
//     }

//     // ── Update timings ────────────────────────────────────────────────────────
//     public Doctor updateTimings(Long doctorId, String timingsJson) {
//         Doctor doctor = getDoctorById(doctorId);
//         doctor.setTimingsJson(timingsJson);
//         return doctorRepo.save(doctor);
//     }

//     // ── Delete doctor ─────────────────────────────────────────────────────────
//     public void deleteDoctor(Long doctorId) {
//         doctorRepo.deleteById(doctorId);
//     }
// }  
























// package com.medique.medique.service;

// import com.medique.medique.entity.Doctor;
// import com.medique.medique.repository.DoctorRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.util.List;

// @Service
// @RequiredArgsConstructor
// public class DoctorService {

//     private final DoctorRepository doctorRepository;

//     // ── GET ALL DOCTORS FOR A HOSPITAL ────────────────────────────────────────
//     public List<Doctor> getByHospitalId(String hospitalId) {
//         return doctorRepository.findByHospitalId(hospitalId);
//     }

//     // ── GET DOCTORS BY HOSPITAL + DEPARTMENT ──────────────────────────────────
//     public List<Doctor> getByHospitalAndDepartment(String hospitalId, String department) {
//         return doctorRepository.findByHospitalIdAndDepartment(hospitalId, department);
//     }

//     // ── ADD DOCTOR ────────────────────────────────────────────────────────────
//     @Transactional
//     public Doctor addDoctor(Doctor doctor) {
//         if (doctor.getName() == null || doctor.getName().isBlank())
//             throw new RuntimeException("Doctor name is required.");
//         if (doctor.getDepartment() == null || doctor.getDepartment().isBlank())
//             throw new RuntimeException("Department is required.");
//         if (doctor.getHospitalId() == null || doctor.getHospitalId().isBlank())
//             throw new RuntimeException("Hospital ID is required.");
//         return doctorRepository.save(doctor);
//     }

//     // ── UPDATE DOCTOR ─────────────────────────────────────────────────────────
//     @Transactional
//     public Doctor updateDoctor(Long doctorId, Doctor updates) {
//         Doctor doctor = doctorRepository.findById(doctorId)
//                 .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));

//         if (updates.getName()          != null) doctor.setName(updates.getName());
//         if (updates.getDepartment()    != null) doctor.setDepartment(updates.getDepartment());
//         if (updates.getQualification() != null) doctor.setQualification(updates.getQualification());
//         if (updates.getFee()           != null) doctor.setFee(updates.getFee());
//         if (updates.getTimingsJson()   != null) doctor.setTimingsJson(updates.getTimingsJson());

//         return doctorRepository.save(doctor);
//     }

//     // ── UPDATE TIMINGS ONLY ───────────────────────────────────────────────────
//     @Transactional
//     public Doctor updateTimings(Long doctorId, String timingsJson) {
//         Doctor doctor = doctorRepository.findById(doctorId)
//                 .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));
//         doctor.setTimingsJson(timingsJson);
//         return doctorRepository.save(doctor);
//     }

//     // ── DELETE DOCTOR ─────────────────────────────────────────────────────────
//     @Transactional
//     public void deleteDoctor(Long doctorId) {
//         if (!doctorRepository.existsById(doctorId))
//             throw new RuntimeException("Doctor not found: " + doctorId);
//         doctorRepository.deleteById(doctorId);
//     }
// } 




















package com.medique.medique.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.medique.medique.dto.TimingRequestDTO;
import com.medique.medique.entity.Doctor;
import com.medique.medique.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.medique.medique.dto.TimingRequestDTO;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final ObjectMapper objectMapper; // For JSON conversion

    // ── GET ALL DOCTORS FOR A HOSPITAL ────────────────────────────────────────
    public List<Doctor> getByHospitalId(String hospitalId) {
        return doctorRepository.findByHospitalId(hospitalId);
    }

    // ── GET DOCTORS BY HOSPITAL + DEPARTMENT ──────────────────────────────────
    public List<Doctor> getByHospitalAndDepartment(String hospitalId, String department) {
        return doctorRepository.findByHospitalIdAndDepartment(hospitalId, department);
    }

    // ── ADD DOCTOR ────────────────────────────────────────────────────────────
    @Transactional
    public Doctor addDoctor(Doctor doctor) {
        if (doctor.getName() == null || doctor.getName().isBlank())
            throw new RuntimeException("Doctor name is required.");
        if (doctor.getDepartment() == null || doctor.getDepartment().isBlank())
            throw new RuntimeException("Department is required.");
        if (doctor.getHospitalId() == null || doctor.getHospitalId().isBlank())
            throw new RuntimeException("Hospital ID is required.");
        return doctorRepository.save(doctor);
    }

    // ── UPDATE DOCTOR ─────────────────────────────────────────────────────────
    @Transactional
    public Doctor updateDoctor(Long doctorId, Doctor updates) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));

        if (updates.getName()          != null) doctor.setName(updates.getName());
        if (updates.getDepartment()    != null) doctor.setDepartment(updates.getDepartment());
        if (updates.getQualification() != null) doctor.setQualification(updates.getQualification());
        if (updates.getFee()           != null) doctor.setFee(updates.getFee());
        if (updates.getTimingsJson()   != null) doctor.setTimingsJson(updates.getTimingsJson());

        return doctorRepository.save(doctor);
    }

    // ── NEW: UPDATE TIMINGS FROM MAP (FOR REACT NATIVE) ──────────────────────
    @Transactional
    public Doctor updateDoctorTimings(Long doctorId, Map<String, TimingRequestDTO> timingsMap) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found: " + doctorId));

        try {
            // Convert the Map object into a JSON String to store in timingsJson
            String jsonString = objectMapper.writeValueAsString(timingsMap);
            doctor.setTimingsJson(jsonString);
            return doctorRepository.save(doctor);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to process timings JSON: " + e.getMessage());
        }
    }

    // ── DELETE DOCTOR ─────────────────────────────────────────────────────────
    @Transactional
    public void deleteDoctor(Long doctorId) {
        if (!doctorRepository.existsById(doctorId))
            throw new RuntimeException("Doctor not found: " + doctorId);
        doctorRepository.deleteById(doctorId);
    }
}