package com.medique.medique.service;



import com.medique.medique.dto.HospitalRequest;
import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.Hospital.VerificationStatus;
import com.medique.medique.entity.User;
import com.medique.medique.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository hospitalRepository;
    private final UserService userService;

    // @Transactional
    // public Hospital submit(HospitalRequest req, Long staffUserId) {
    //     if (hospitalRepository.existsByRegistrationNo(req.getRegistrationNo())) {
    //         throw new IllegalArgumentException("Registration number already exists");
    //     }
    //     if (hospitalRepository.existsByLicenseNo(req.getLicenseNo())) {
    //         throw new IllegalArgumentException("License number already exists");
    //     }

    //     User staff = userService.getById(staffUserId);

    //     Hospital hospital = Hospital.builder()
    //             .staffUser(staff)
    //             .name(req.getName())
    //             .ownerName(req.getOwnerName())
    //             .phone(req.getPhone())
    //             .email(req.getEmail())
    //             .hospitalType(req.getHospitalType())
    //             .address(req.getAddress())
    //             .city(req.getCity())
    //             .imageUrl(req.getImageUrl())
    //             .registrationNo(req.getRegistrationNo())
    //             .licenseNo(req.getLicenseNo())
    //             .departments(req.getDepartments())
    //             .doctorCount(req.getDoctorCount())
    //             .build();

    //     return hospitalRepository.save(hospital);
    // }

    @Transactional
public Hospital submit(HospitalRequest req, Long staffUserId) {
    if (hospitalRepository.existsByRegistrationNo(req.getRegistrationNo())) {
        throw new IllegalArgumentException("Registration number already exists");
    }
    if (hospitalRepository.existsByLicenseNo(req.getLicenseNo())) {
        throw new IllegalArgumentException("License number already exists");
    }

    // ← Only fetch user if token was provided
    User staff = (staffUserId != null) ? userService.getById(staffUserId) : null;

    Hospital hospital = Hospital.builder()
            .staffUser(staff)          // null is fine — field is optional=true
            .name(req.getName())
            .ownerName(req.getOwnerName())
            .phone(req.getPhone())
            .email(req.getEmail())
            .hospitalType(req.getHospitalType())
            .address(req.getAddress())
            .city(req.getCity())
            .imageUrl(req.getImageUrl())
            .registrationNo(req.getRegistrationNo())
            .licenseNo(req.getLicenseNo())
            .departments(req.getDepartments())
            .doctorCount(req.getDoctorCount())
            .build();

    return hospitalRepository.save(hospital);
}

    public List<Hospital> getAll() {
        return hospitalRepository.findAll();
    }

    public List<Hospital> getByStatus(VerificationStatus status) {
        return hospitalRepository.findByStatus(status);
    }

    public List<Hospital> getByCity(String city) {
        return hospitalRepository.findByCity(city);
    }

    public Hospital getById(Long id) {
        return hospitalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + id));
    }

    @Transactional
    public Hospital updateStatus(Long id, VerificationStatus status) {
        Hospital hospital = getById(id);
        hospital.setStatus(status);
        return hospitalRepository.save(hospital);
    }

    @Transactional
    public Hospital update(Long id, HospitalRequest req, Long staffUserId) {
        Hospital hospital = getById(id);

        // Ensure only the owning staff can edit
        if (!hospital.getStaffUser().getId().equals(staffUserId)) {
            throw new SecurityException("Not authorized to edit this hospital");
        }

        hospital.setName(req.getName());
        hospital.setOwnerName(req.getOwnerName());
        hospital.setPhone(req.getPhone());
        hospital.setEmail(req.getEmail());
        hospital.setHospitalType(req.getHospitalType());
        hospital.setAddress(req.getAddress());
        hospital.setCity(req.getCity());
        hospital.setImageUrl(req.getImageUrl());
        hospital.setDepartments(req.getDepartments());
        hospital.setDoctorCount(req.getDoctorCount());

        return hospitalRepository.save(hospital);
    }

    @Transactional
    public void delete(Long id) {
        hospitalRepository.deleteById(id);
    }

    
}