package com.medique.medique.repository;

import com.medique.medique.entity.PatientReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientReportRepository extends JpaRepository<PatientReport, Long> {

    // Returns all reports for a patient, newest first
    List<PatientReport> findByPatientIdOrderByCreatedAtDesc(Long patientId);
}