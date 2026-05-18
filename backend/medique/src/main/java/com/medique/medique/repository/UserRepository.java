// package com.medique.medique.repository;


// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.medique.medique.entity.User;

// import java.util.Optional;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {
//     Optional<User> findByPhone(String phone);
//     Optional<User> findByEmail(String email);
//     boolean existsByPhone(String phone);
//     boolean existsByEmail(String email);
// }  





















// package com.medique.medique.repository;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;

// import com.medique.medique.entity.User;

// import java.util.List;
// import java.util.Optional;

// @Repository
// public interface UserRepository extends JpaRepository<User, Long> {

//     // Safe single-result lookups (use only when uniqueness is guaranteed)
//     Optional<User> findByPhone(String phone);
//     Optional<User> findByEmail(String email);

//     // Existence checks (used during registration)
//     boolean existsByPhone(String phone);
//     boolean existsByEmail(String email);

//     // List lookups — safe even if duplicates exist in DB (handles legacy data)
//     List<User> findAllByPhone(String phone);
//     List<User> findAllByEmail(String email);
// }   



























package com.medique.medique.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medique.medique.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Safe single-result lookups (use only when uniqueness is guaranteed)
    Optional<User> findByPhone(String phone);
    Optional<User> findByEmail(String email);

    // Existence checks (used during registration)
    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);

    // List lookups — safe even if duplicates exist in DB (handles legacy data)
    List<User> findAllByPhone(String phone);
    List<User> findAllByEmail(String email);
}
