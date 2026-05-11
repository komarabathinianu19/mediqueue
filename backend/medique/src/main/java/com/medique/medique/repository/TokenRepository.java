package com.medique.medique.repository;

import com.medique.medique.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    // All tokens for a specific doctor+slot+date
    List<Token> findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
            String hospitalId, String department, String doctor, String date, String slot);

    // Active queue (waiting + serving) for a doctor slot
    @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
           "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot " +
           "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.tokenNumber ASC")
    List<Token> findActiveQueue(@Param("hid") String hospitalId,
                                 @Param("dept") String department,
                                 @Param("doc") String doctor,
                                 @Param("date") String date,
                                 @Param("slot") String slot);

    // Currently serving token for a doctor slot
    @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
           "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot AND t.status = 'serving'")
    Optional<Token> findServing(@Param("hid") String hospitalId,
                                 @Param("dept") String department,
                                 @Param("doc") String doctor,
                                 @Param("date") String date,
                                 @Param("slot") String slot);

    // Max token number for next token generation
    @Query("SELECT COALESCE(MAX(t.tokenNumber), 0) FROM Token t WHERE t.hospitalId = :hid " +
           "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
    Integer findMaxTokenNumber(@Param("hid") String hospitalId,
                                @Param("dept") String department,
                                @Param("doc") String doctor,
                                @Param("date") String date,
                                @Param("slot") String slot);

    // All tokens booked by a specific patient user
    List<Token> findByBookedByUserIdOrderByCreatedAtDesc(Long userId);

    // Latest active token for a patient
    @Query("SELECT t FROM Token t WHERE t.bookedByUserId = :uid " +
           "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.createdAt DESC")
    List<Token> findActiveTokensByUser(@Param("uid") Long userId);

    // All tokens for a hospital (for staff dashboard)
    List<Token> findByHospitalIdAndDateOrderByTokenNumberAsc(String hospitalId, String date);
}