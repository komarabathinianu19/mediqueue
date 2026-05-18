// package com.medique.medique.repository;

// import com.medique.medique.entity.Department;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;
// import java.util.Optional;

// public interface DepartmentRepository extends JpaRepository<Department, Long> {

//     // Find all departments by hospital ID
//     List<Department> findByHospitalId(String hospitalId);

//     // Find department by hospital ID and department name
//     Optional<Department> findByHospitalIdAndName(String hospitalId, String name);

//     // Check if department exists by hospital ID and department name
//     boolean existsByHospitalIdAndName(String hospitalId, String name);
// }  



















// package com.medique.medique.repository;

// import com.medique.medique.entity.Department;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;
// import java.util.Optional;

// public interface DepartmentRepository extends JpaRepository<Department, Long> {

// List<Department> findByHospital_Id(Long hospitalId);

// Optional<Department> findByHospital_IdAndName(Long hospitalId, String name);

// boolean existsByHospital_IdAndName(Long hospitalId, String name);
// } 


















// package com.medique.medique.repository;

// import com.medique.medique.entity.Department;
// import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;
// import java.util.Optional;

// public interface DepartmentRepository extends JpaRepository<Department, Long> {

//     // Find all departments for a hospital
//     List<Department> findByHospitalId(String hospitalId);

//     // Find specific department by hospital + name
//     Optional<Department> findByHospitalIdAndName(String hospitalId, String name);

//     // Check if department already exists
//     boolean existsByHospitalIdAndName(String hospitalId, String name);
// }  























package com.medique.medique.repository;

import com.medique.medique.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // All departments for a hospital
    List<Department> findByHospitalId(String hospitalId);

    // Check if department name already exists for a hospital
    boolean existsByHospitalIdAndNameIgnoreCase(String hospitalId, String name);
}