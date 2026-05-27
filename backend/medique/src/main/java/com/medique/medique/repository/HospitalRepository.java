





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




















// package com.medique.medique.repository;

// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;
// import java.util.Optional;

// public interface HospitalRepository extends JpaRepository<Hospital, Long> {

//     Optional<Hospital> findByHospitalId(String hospitalId);

//     Optional<Hospital> findByEmail(String email);

//     Optional<Hospital> findByPhone(String phone);

//     boolean existsByHospitalId(String hospitalId);

//     boolean existsByEmail(String email);

//     boolean existsByPhone(String phone);

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

    // ✅ CHANGED: findByPhone → findFirstByPhone to avoid crash when duplicate phones exist in DB
    Optional<Hospital> findFirstByPhone(String phone);

    boolean existsByHospitalId(String hospitalId);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    List<Hospital> findByStatus(HospitalStatus status);
}