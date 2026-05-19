package com.medique.medique.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.medique.medique.dto.TimingRequestDTO;
import com.medique.medique.entity.Doctor;
import com.medique.medique.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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