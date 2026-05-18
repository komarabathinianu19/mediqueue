// package com.medique.medique.repository;

// import com.medique.medique.entity.Doctor;
// import org.springframework.data.jpa.repository.JpaRepository;
// import java.util.List;

// public interface DoctorRepository extends JpaRepository<Doctor, Long> {

//     List<Doctor> findByHospitalId(String hospitalId);

//     List<Doctor> findByHospitalIdAndDepartment(String hospitalId, String department);

//     boolean existsByHospitalIdAndNameAndDepartment(String hospitalId, String name, String department);
// }  
















package com.medique.medique.repository;

import com.medique.medique.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // All doctors belonging to a hospital
    List<Doctor> findByHospitalId(String hospitalId);

    // Doctors filtered by hospital + department
    List<Doctor> findByHospitalIdAndDepartment(String hospitalId, String department);

    // Check if doctor exists in a hospital
    boolean existsByHospitalIdAndName(String hospitalId, String name);
}