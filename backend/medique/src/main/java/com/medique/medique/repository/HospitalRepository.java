





// package com.medique.medique.repository;

// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;
// import java.util.Optional;

// public interface HospitalRepository extends JpaRepository<Hospital, Long> {

//     Optional<Hospital> findByHospitalId(String hospitalId);

//     Optional<Hospital> findByEmail(String email);

//     boolean existsByEmail(String email);

//     boolean existsByHospitalId(String hospitalId);

//     List<Hospital> findByStatus(HospitalStatus status);
// } 




















package com.medique.medique.repository;

import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.HospitalStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    Optional<Hospital> findByHospitalId(String hospitalId);

    Optional<Hospital> findByEmail(String email);

    boolean existsByHospitalId(String hospitalId);

    boolean existsByEmail(String email);

    List<Hospital> findByStatus(HospitalStatus status);
}