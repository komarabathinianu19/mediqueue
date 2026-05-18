







// package com.medique.medique.repository;

// import com.medique.medique.entity.Feedback;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;
// import org.springframework.stereotype.Repository;
// import java.util.List;

// @Repository
// public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
//     List<Feedback> findByHospitalIdOrderByCreatedAtDesc(String hospitalId);

//     // Returns all tokenIds for which this patient has already submitted feedback
//     @Query("SELECT f.tokenId FROM Feedback f WHERE f.patientPhone = :phone AND f.tokenId IS NOT NULL")
//     List<Long> findSubmittedTokenIdsByPhone(@Param("phone") String phone);
// }  


























// package com.medique.medique.repository;

// import com.medique.medique.entity.Feedback;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
// import java.util.List;

// @Repository
// public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
//     List<Feedback> findByHospitalIdOrderByCreatedAtDesc(String hospitalId);
// }  





















package com.medique.medique.repository;

import com.medique.medique.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Set;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByHospitalIdOrderByCreatedAtDesc(String hospitalId);

    // Returns all tokenIds (from the given set) for which feedback has been submitted
    @Query("SELECT f.tokenId FROM Feedback f WHERE f.tokenId IN :tokenIds AND f.tokenId IS NOT NULL")
    List<Long> findSubmittedTokenIdsByTokenIds(@Param("tokenIds") Set<Long> tokenIds);
}