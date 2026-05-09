package com.medique.medique.repository;



import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.Hospital.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    List<Hospital> findByStatus(VerificationStatus status);
    Optional<Hospital> findByRegistrationNo(String registrationNo);
    Optional<Hospital> findByLicenseNo(String licenseNo);
    boolean existsByRegistrationNo(String registrationNo);
    boolean existsByLicenseNo(String licenseNo);
    List<Hospital> findByCity(String city);
}