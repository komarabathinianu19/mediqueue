package com.medique.medique.repository;

import com.medique.medique.entity.DoctorTiming;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorTimingRepository extends JpaRepository<DoctorTiming, Long> {
    
    // Find a specific slot to update it instead of creating duplicates
    Optional<DoctorTiming> findByDoctorIdAndSlotName(Long doctorId, String slotName);
    
    // Fetch all timings for a specific doctor to show in the UI
    List<DoctorTiming> findByDoctorId(Long doctorId);
}