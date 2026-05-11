package com.medique.medique.repository;

import com.medique.medique.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByHospitalId(String hospitalId);

    List<Doctor> findByHospitalIdAndDepartment(String hospitalId, String department);

    boolean existsByHospitalIdAndNameAndDepartment(String hospitalId, String name, String department);
}