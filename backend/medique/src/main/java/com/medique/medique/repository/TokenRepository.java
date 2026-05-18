// package com.medique.medique.repository;

// import com.medique.medique.entity.Token;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import java.util.List;
// import java.util.Optional;

// public interface TokenRepository extends JpaRepository<Token, Long> {

//     // All tokens for a specific doctor+slot+date
//     List<Token> findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
//             String hospitalId, String department, String doctor, String date, String slot);

//     // Active queue (waiting + serving) for a doctor slot
//     @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
//            "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot " +
//            "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.tokenNumber ASC")
//     List<Token> findActiveQueue(@Param("hid") String hospitalId,
//                                  @Param("dept") String department,
//                                  @Param("doc") String doctor,
//                                  @Param("date") String date,
//                                  @Param("slot") String slot);

//     // Currently serving token for a doctor slot
//     @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
//            "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot AND t.status = 'serving'")
//     Optional<Token> findServing(@Param("hid") String hospitalId,
//                                  @Param("dept") String department,
//                                  @Param("doc") String doctor,
//                                  @Param("date") String date,
//                                  @Param("slot") String slot);

//     // Max token number for next token generation
//     @Query("SELECT COALESCE(MAX(t.tokenNumber), 0) FROM Token t WHERE t.hospitalId = :hid " +
//            "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
//     Integer findMaxTokenNumber(@Param("hid") String hospitalId,
//                                 @Param("dept") String department,
//                                 @Param("doc") String doctor,
//                                 @Param("date") String date,
//                                 @Param("slot") String slot);

//     // All tokens booked by a specific patient user
//     List<Token> findByBookedByUserIdOrderByCreatedAtDesc(Long userId);

//     // Latest active token for a patient
//     @Query("SELECT t FROM Token t WHERE t.bookedByUserId = :uid " +
//            "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.createdAt DESC")
//     List<Token> findActiveTokensByUser(@Param("uid") Long userId);

//     // All tokens for a hospital (for staff dashboard)
//     List<Token> findByHospitalIdAndDateOrderByTokenNumberAsc(String hospitalId, String date);
// }  























// package com.medique.medique.repository;

// import com.medique.medique.entity.Token;
// import jakarta.persistence.LockModeType;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Lock;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import java.util.List;
// import java.util.Optional;

// public interface TokenRepository extends JpaRepository<Token, Long> {

//     // All tokens for a specific doctor+slot+date
//     List<Token> findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
//             String hospitalId, String department, String doctor, String date, String slot);

//     // Active queue (waiting + serving) for a doctor slot
//     @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
//            "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot " +
//            "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.tokenNumber ASC")
//     List<Token> findActiveQueue(@Param("hid") String hospitalId,
//                                  @Param("dept") String department,
//                                  @Param("doc") String doctor,
//                                  @Param("date") String date,
//                                  @Param("slot") String slot);

//     // Currently serving token for a doctor slot
//     @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
//            "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot AND t.status = 'serving'")
//     Optional<Token> findServing(@Param("hid") String hospitalId,
//                                  @Param("dept") String department,
//                                  @Param("doc") String doctor,
//                                  @Param("date") String date,
//                                  @Param("slot") String slot);

//     // ── MAX TOKEN NUMBER — PESSIMISTIC WRITE LOCK ─────────────────────────────
//     // Using PESSIMISTIC_WRITE prevents two concurrent bookings for the same
//     // doctor+slot from both reading max=0 and generating duplicate token-1.
//     // The transaction in TokenService.bookToken() holds this lock until commit.
//     @Lock(LockModeType.PESSIMISTIC_WRITE)
//     @Query("SELECT COALESCE(MAX(t.tokenNumber), 0) FROM Token t WHERE t.hospitalId = :hid " +
//            "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
//     Integer findMaxTokenNumber(@Param("hid") String hospitalId,
//                                 @Param("dept") String department,
//                                 @Param("doc") String doctor,
//                                 @Param("date") String date,
//                                 @Param("slot") String slot);

//     // ── COUNT TOKENS FOR DOCTOR+SLOT+DATE (used as fallback for token numbering)
//     // Scopes correctly: Hospital A Dr.X and Hospital B Dr.X each have their own
//     // independent sequence starting from 1.
//     @Query("SELECT COUNT(t) FROM Token t WHERE t.hospitalId = :hid " +
//            "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
//     Long countByDoctorSlot(@Param("hid") String hospitalId,
//                             @Param("dept") String department,
//                             @Param("doc") String doctor,
//                             @Param("date") String date,
//                             @Param("slot") String slot);

//     // All tokens booked by a specific patient user
//     List<Token> findByBookedByUserIdOrderByCreatedAtDesc(Long userId);

//     // Latest active token for a patient (waiting OR serving)
//     @Query("SELECT t FROM Token t WHERE t.bookedByUserId = :uid " +
//            "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.createdAt DESC")
//     List<Token> findActiveTokensByUser(@Param("uid") Long userId);

//     // All tokens for a hospital on a date (for staff dashboard)
//     List<Token> findByHospitalIdAndDateOrderByTokenNumberAsc(String hospitalId, String date);
// }  

























// package com.medique.medique.repository;

// import com.medique.medique.entity.Token;
// import jakarta.persistence.LockModeType;
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Lock;
// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.query.Param;

// import java.util.List;
// import java.util.Optional;

// public interface TokenRepository extends JpaRepository<Token, Long> {

//     // All tokens for a specific doctor+slot+date
//     List<Token> findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
//             String hospitalId, String department, String doctor, String date, String slot);

//     // Active queue (waiting + serving) for a doctor slot
//     @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
//            "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot " +
//            "AND (t.status = 'waiting' OR t.status = 'serving') ORDER BY t.tokenNumber ASC")
//     List<Token> findActiveQueue(@Param("hid") String hospitalId,
//                                  @Param("dept") String department,
//                                  @Param("doc") String doctor,
//                                  @Param("date") String date,
//                                  @Param("slot") String slot);

//     // Currently serving token for a doctor slot
//     @Query("SELECT t FROM Token t WHERE t.hospitalId = :hid AND t.department = :dept " +
//            "AND t.doctor = :doc AND t.date = :date AND t.slot = :slot AND t.status = 'serving'")
//     Optional<Token> findServing(@Param("hid") String hospitalId,
//                                  @Param("dept") String department,
//                                  @Param("doc") String doctor,
//                                  @Param("date") String date,
//                                  @Param("slot") String slot);

//     // ── MAX TOKEN NUMBER — PESSIMISTIC WRITE LOCK ─────────────────────────────
//     // Using PESSIMISTIC_WRITE prevents two concurrent bookings for the same
//     // doctor+slot from both reading max=0 and generating duplicate token-1.
//     // The transaction in TokenService.bookToken() holds this lock until commit.
//     @Lock(LockModeType.PESSIMISTIC_WRITE)
//     @Query("SELECT COALESCE(MAX(t.tokenNumber), 0) FROM Token t WHERE t.hospitalId = :hid " +
//            "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
//     Integer findMaxTokenNumber(@Param("hid") String hospitalId,
//                                 @Param("dept") String department,
//                                 @Param("doc") String doctor,
//                                 @Param("date") String date,
//                                 @Param("slot") String slot);

//     // ── COUNT TOKENS FOR DOCTOR+SLOT+DATE (used as fallback for token numbering)
//     // Scopes correctly: Hospital A Dr.X and Hospital B Dr.X each have their own
//     // independent sequence starting from 1.
//     @Query("SELECT COUNT(t) FROM Token t WHERE t.hospitalId = :hid " +
//            "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
//     Long countByDoctorSlot(@Param("hid") String hospitalId,
//                             @Param("dept") String department,
//                             @Param("doc") String doctor,
//                             @Param("date") String date,
//                             @Param("slot") String slot);

//     // All tokens booked by a specific patient user
//     List<Token> findByBookedByUserIdOrderByCreatedAtDesc(Long userId);

//     // Patient's current-day token — visible until midnight regardless of status
//     // waiting / serving  → show live tracking
//     // completed / skipped → show as done (still visible until end of day)
//     @Query("SELECT t FROM Token t WHERE t.bookedByUserId = :uid " +
//            "AND t.date = :today " +
//            "ORDER BY t.createdAt DESC")
//     List<Token> findActiveTokensByUser(@Param("uid") Long userId,
//                                         @Param("today") String today);

//     // All tokens for a hospital on a date (for staff dashboard)
//     List<Token> findByHospitalIdAndDateOrderByTokenNumberAsc(String hospitalId, String date);
// }  


































package com.medique.medique.repository;

import com.medique.medique.entity.Token;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
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

    // ── MAX TOKEN NUMBER — PESSIMISTIC WRITE LOCK ─────────────────────────────
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT COALESCE(MAX(t.tokenNumber), 0) FROM Token t WHERE t.hospitalId = :hid " +
           "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
    Integer findMaxTokenNumber(@Param("hid") String hospitalId,
                                @Param("dept") String department,
                                @Param("doc") String doctor,
                                @Param("date") String date,
                                @Param("slot") String slot);

    // ── COUNT TOKENS FOR DOCTOR+SLOT+DATE
    @Query("SELECT COUNT(t) FROM Token t WHERE t.hospitalId = :hid " +
           "AND t.department = :dept AND t.doctor = :doc AND t.date = :date AND t.slot = :slot")
    Long countByDoctorSlot(@Param("hid") String hospitalId,
                            @Param("dept") String department,
                            @Param("doc") String doctor,
                            @Param("date") String date,
                            @Param("slot") String slot);

    // All tokens booked by a specific patient user
    List<Token> findByBookedByUserIdOrderByCreatedAtDesc(Long userId);

    // Patient's current-day token
    @Query("SELECT t FROM Token t WHERE t.bookedByUserId = :uid " +
           "AND t.date = :today " +
           "ORDER BY t.createdAt DESC")
    List<Token> findActiveTokensByUser(@Param("uid") Long userId,
                                        @Param("today") String today);

    // All tokens for a hospital on a date (staff dashboard)
    List<Token> findByHospitalIdAndDateOrderByTokenNumberAsc(String hospitalId, String date);

    // ── ADMIN: All tokens on a specific date (booking monitor) ───────────────
    List<Token> findByDateOrderByCreatedAtDesc(String date);

    // ── ADMIN: All tokens ever (booking monitor — all-time view) ─────────────
    List<Token> findAllByOrderByCreatedAtDesc();
}