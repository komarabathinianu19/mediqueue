package com.medique.medique.service;

import com.medique.medique.entity.Patient;

import com.medique.medique.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public Patient getByUserId(Long userId) {
        return patientRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Patient profile not found for user: " + userId));
    }

    @Transactional
    public Patient update(Long userId, Patient updates) {
        Patient patient = getByUserId(userId);

        if (updates.getFullName() != null)        patient.setFullName(updates.getFullName());
        if (updates.getAge() != null)             patient.setAge(updates.getAge());
        if (updates.getGender() != null)          patient.setGender(updates.getGender());
        if (updates.getBloodGroup() != null)      patient.setBloodGroup(updates.getBloodGroup());
        if (updates.getCity() != null)            patient.setCity(updates.getCity());
        if (updates.getAllergies() != null)        patient.setAllergies(updates.getAllergies());
        if (updates.getMedicalNotes() != null)    patient.setMedicalNotes(updates.getMedicalNotes());
        if (updates.getEmergencyContact() != null) patient.setEmergencyContact(updates.getEmergencyContact());

        return patientRepository.save(patient);
    }
}