// package com.medique.medique.service;

// import com.medique.medique.entity.Token;
// import com.medique.medique.repository.TokenRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;
// import java.util.List;
// import java.util.Map;
// import java.util.Optional;

// @Service
// public class TokenService {

//     private final TokenRepository tokenRepo;

//     public TokenService(TokenRepository tokenRepo) {
//         this.tokenRepo = tokenRepo;
//     }

//     private static String getTodayDate() {
//         return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
//     }

//     // ── BOOK TOKEN ────────────────────────────────────────────────────────────
//     @Transactional
//     public Token bookToken(Map<String, Object> payload, Long bookedByUserId) {

//         String hospitalId   = required(payload, "hospitalId");
//         String hospitalName = (String) payload.getOrDefault("hospitalName", "");
//         String department   = required(payload, "department");
//         String doctor       = required(payload, "doctor");
//         String slot         = (String) payload.getOrDefault("slot", "morning");
//         String date         = (String) payload.getOrDefault("date", getTodayDate());

//         // ── Slot prefix ───────────────────────────────────────────────────────
//         Map<String, String> prefixMap = Map.of(
//                 "morning", "M", "afternoon", "A", "night", "N");
//         String prefix = prefixMap.getOrDefault(slot, "T");

//         // ── Next token number ─────────────────────────────────────────────────
//         int maxNo = tokenRepo.findMaxTokenNumber(hospitalId, department, doctor, date, slot);
//         int nextNo = maxNo + 1;

//         // ── Build token ───────────────────────────────────────────────────────
//         Token t = new Token();
//         t.setTokenNo(prefix + "-" + nextNo);
//         t.setTokenNumber(nextNo);
//         t.setHospitalId(hospitalId);
//         t.setHospitalName(hospitalName);
//         t.setDepartment(department);
//         t.setDoctor(doctor);

//         Object docIdObj = payload.get("doctorId");
//         if (docIdObj != null) {
//             try { t.setDoctorId(Long.parseLong(docIdObj.toString())); }
//             catch (NumberFormatException ignored) {}
//         }

//         t.setSlot(slot);
//         t.setSlotLabel((String) payload.getOrDefault("slotLabel", slot));
//         t.setSlotTime((String) payload.getOrDefault("slotTime", ""));
//         t.setDate(date);

//         t.setPatientName((String) payload.getOrDefault("patientName", "Patient"));
//         Object ageObj = payload.get("age");
//         if (ageObj != null) {
//             try { t.setPatientAge(Integer.parseInt(ageObj.toString())); }
//             catch (NumberFormatException ignored) {}
//         }
//         t.setSymptoms((String) payload.getOrDefault("symptoms", ""));
//         t.setVisitType((String) payload.getOrDefault("visitType", "New Patient"));

//         t.setBookedByUserId(bookedByUserId);
//         t.setBookingSource((String) payload.getOrDefault("bookingSource", "patient"));
//         t.setStatus("waiting");

//         t.setPaymentStatus((String) payload.getOrDefault("paymentStatus", "SUCCESS"));
//         t.setPaymentId((String) payload.getOrDefault("paymentId", "PAY-" + System.currentTimeMillis()));
//         t.setAppointmentStatus("CONFIRMED");

//         Object feeObj = payload.get("doctorFee");
//         if (feeObj != null) {
//             try { t.setDoctorFee(Integer.parseInt(feeObj.toString())); }
//             catch (NumberFormatException ignored) {}
//         }
//         t.setPlatformFee(20);

//         return tokenRepo.save(t);
//     }

//     // ── ACTIVE QUEUE FOR A DOCTOR SLOT ───────────────────────────────────────
//     public List<Token> getActiveQueue(String hospitalId, String department,
//                                       String doctor, String date, String slot) {
//         if (date == null) date = getTodayDate();
//         return tokenRepo.findActiveQueue(hospitalId, department, doctor, date, slot);
//     }

//     // ── ALL TOKENS FOR A DOCTOR SLOT (including completed/skipped) ───────────
//     public List<Token> getAllTokensForSlot(String hospitalId, String department,
//                                            String doctor, String date, String slot) {
//         if (date == null) date = getTodayDate();
//         return tokenRepo.findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
//                 hospitalId, department, doctor, date, slot);
//     }

//     // ── PATIENT'S OWN TOKENS ─────────────────────────────────────────────────
//     public List<Token> getMyTokens(Long userId) {
//         return tokenRepo.findByBookedByUserIdOrderByCreatedAtDesc(userId);
//     }

//     // ── PATIENT'S ACTIVE TOKEN ────────────────────────────────────────────────
//     public Optional<Token> getMyActiveToken(Long userId) {
//         List<Token> list = tokenRepo.findActiveTokensByUser(userId);
//         return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
//     }

//     // ── CALL NEXT (staff action) ──────────────────────────────────────────────
//     @Transactional
//     public Token callNext(String hospitalId, String department,
//                            String doctor, String date, String slot) {
//         if (date == null) date = getTodayDate();

//         // Mark current serving as completed
//         tokenRepo.findServing(hospitalId, department, doctor, date, slot)
//                 .ifPresent(current -> {
//                     current.setStatus("completed");
//                     current.setCompletedAt(LocalDateTime.now());
//                     tokenRepo.save(current);
//                 });

//         // Get next waiting token
//         List<Token> queue = tokenRepo.findActiveQueue(hospitalId, department, doctor, date, slot);
//         Token nextWaiting = queue.stream()
//                 .filter(t -> "waiting".equals(t.getStatus()))
//                 .findFirst()
//                 .orElseThrow(() -> new RuntimeException("No waiting patients in this queue."));

//         nextWaiting.setStatus("serving");
//         nextWaiting.setServingAt(LocalDateTime.now());
//         return tokenRepo.save(nextWaiting);
//     }

//     // ── COMPLETE CURRENT (staff action) ──────────────────────────────────────
//     @Transactional
//     public Token completeCurrent(String hospitalId, String department,
//                                   String doctor, String date, String slot) {
//         if (date == null) date = getTodayDate();
//         Token serving = tokenRepo.findServing(hospitalId, department, doctor, date, slot)
//                 .orElseThrow(() -> new RuntimeException("No patient is currently being served."));
//         serving.setStatus("completed");
//         serving.setCompletedAt(LocalDateTime.now());
//         return tokenRepo.save(serving);
//     }

//     // ── SKIP CURRENT (staff action) ───────────────────────────────────────────
//     @Transactional
//     public Token skipCurrent(String hospitalId, String department,
//                               String doctor, String date, String slot) {
//         if (date == null) date = getTodayDate();
//         Token serving = tokenRepo.findServing(hospitalId, department, doctor, date, slot)
//                 .orElseThrow(() -> new RuntimeException("No patient is currently being served."));
//         serving.setStatus("skipped");
//         return tokenRepo.save(serving);
//     }

//     // ── QUEUE SUMMARY ─────────────────────────────────────────────────────────
//     public Map<String, Object> getQueueSummary(String hospitalId, String department,
//                                                 String doctor, String date, String slot) {
//         if (date == null) date = getTodayDate();
//         List<Token> all = tokenRepo.findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
//                 hospitalId, department, doctor, date, slot);

//         Token serving = all.stream().filter(t -> "serving".equals(t.getStatus())).findFirst().orElse(null);
//         long waiting   = all.stream().filter(t -> "waiting".equals(t.getStatus())).count();
//         long completed = all.stream().filter(t -> "completed".equals(t.getStatus())).count();
//         long skipped   = all.stream().filter(t -> "skipped".equals(t.getStatus())).count();

//         return Map.of(
//                 "totalBooked", all.size(),
//                 "waitingCount", waiting,
//                 "completedCount", completed,
//                 "skippedCount", skipped,
//                 "currentServingNo", serving != null ? serving.getTokenNo() : "Not Started",
//                 "currentServing", serving != null ? serving : Map.of()
//         );
//     }

//     // ── HOSPITAL DAY SUMMARY (for staff dashboard) ───────────────────────────
//     public List<Token> getHospitalDayTokens(String hospitalId, String date) {
//         if (date == null) date = getTodayDate();
//         return tokenRepo.findByHospitalIdAndDateOrderByTokenNumberAsc(hospitalId, date);
//     }

//     // ── HELPER ────────────────────────────────────────────────────────────────
//     private String required(Map<String, Object> payload, String key) {
//         Object val = payload.get(key);
//         if (val == null || val.toString().isBlank())
//             throw new RuntimeException("Missing required field: " + key);
//         return val.toString();
//     }
// }  































package com.medique.medique.service;

import com.medique.medique.entity.Token;
import com.medique.medique.repository.TokenRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TokenService {

    private final TokenRepository tokenRepo;

    public TokenService(TokenRepository tokenRepo) {
        this.tokenRepo = tokenRepo;
    }

    private static String getTodayDate() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    // ── BOOK TOKEN ────────────────────────────────────────────────────────────
    @Transactional
    public Token bookToken(Map<String, Object> payload, Long bookedByUserId) {

        String hospitalId   = required(payload, "hospitalId");
        String hospitalName = (String) payload.getOrDefault("hospitalName", "");
        String department   = required(payload, "department");
        String doctor       = required(payload, "doctor");
        String slot         = (String) payload.getOrDefault("slot", "morning");
        String date         = (String) payload.getOrDefault("date", getTodayDate());

        // ── Slot prefix ───────────────────────────────────────────────────────
        Map<String, String> prefixMap = Map.of(
                "morning", "M", "afternoon", "A", "night", "N");
        String prefix = prefixMap.getOrDefault(slot, "T");

        // ── Next token number ─────────────────────────────────────────────────
        int maxNo = tokenRepo.findMaxTokenNumber(hospitalId, department, doctor, date, slot);
        int nextNo = maxNo + 1;

        // ── Build token ───────────────────────────────────────────────────────
        Token t = new Token();
        t.setTokenNo(prefix + "-" + nextNo);
        t.setTokenNumber(nextNo);
        t.setHospitalId(hospitalId);
        t.setHospitalName(hospitalName);
        t.setDepartment(department);
        t.setDoctor(doctor);

        Object docIdObj = payload.get("doctorId");
        if (docIdObj != null) {
            try { t.setDoctorId(Long.parseLong(docIdObj.toString())); }
            catch (NumberFormatException ignored) {}
        }

        t.setSlot(slot);
        t.setSlotLabel((String) payload.getOrDefault("slotLabel", slot));
        t.setSlotTime((String) payload.getOrDefault("slotTime", ""));
        t.setDate(date);

        t.setPatientName((String) payload.getOrDefault("patientName", "Patient"));
        Object ageObj = payload.get("age");
        if (ageObj != null) {
            try { t.setPatientAge(Integer.parseInt(ageObj.toString())); }
            catch (NumberFormatException ignored) {}
        }
        t.setSymptoms((String) payload.getOrDefault("symptoms", ""));
        t.setVisitType((String) payload.getOrDefault("visitType", "New Patient"));

        t.setBookedByUserId(bookedByUserId);
        t.setBookingSource((String) payload.getOrDefault("bookingSource", "patient"));
        t.setStatus("waiting");

        t.setPaymentStatus((String) payload.getOrDefault("paymentStatus", "SUCCESS"));
        t.setPaymentId((String) payload.getOrDefault("paymentId", "PAY-" + System.currentTimeMillis()));
        t.setAppointmentStatus("CONFIRMED");

        Object feeObj = payload.get("doctorFee");
        if (feeObj != null) {
            try { t.setDoctorFee(Integer.parseInt(feeObj.toString())); }
            catch (NumberFormatException ignored) {}
        }
        t.setPlatformFee(20);

        return tokenRepo.save(t);
    }

    // ── ACTIVE QUEUE FOR A DOCTOR SLOT ───────────────────────────────────────
    public List<Token> getActiveQueue(String hospitalId, String department,
                                      String doctor, String date, String slot) {
        if (date == null) date = getTodayDate();
        return tokenRepo.findActiveQueue(hospitalId, department, doctor, date, slot);
    }

    // ── ALL TOKENS FOR A DOCTOR SLOT (including completed/skipped) ───────────
    public List<Token> getAllTokensForSlot(String hospitalId, String department,
                                           String doctor, String date, String slot) {
        if (date == null) date = getTodayDate();
        return tokenRepo.findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
                hospitalId, department, doctor, date, slot);
    }

    // ── PATIENT'S OWN TOKENS ─────────────────────────────────────────────────
    public List<Token> getMyTokens(Long userId) {
        return tokenRepo.findByBookedByUserIdOrderByCreatedAtDesc(userId);
    }

    // ── PATIENT'S ACTIVE TOKEN ────────────────────────────────────────────────
    // Returns the most recent token booked by this patient for TODAY.
    // Visible for all statuses (waiting, serving, completed, skipped)
    // so the patient can see their appointment result until end of day.
    public Optional<Token> getMyActiveToken(Long userId) {
        String today = getTodayDate();
        List<Token> list = tokenRepo.findActiveTokensByUser(userId, today);
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }

    // ── CALL NEXT (staff action) ──────────────────────────────────────────────
    @Transactional
    public Token callNext(String hospitalId, String department,
                           String doctor, String date, String slot) {
        if (date == null) date = getTodayDate();

        // Mark current serving as completed
        tokenRepo.findServing(hospitalId, department, doctor, date, slot)
                .ifPresent(current -> {
                    current.setStatus("completed");
                    current.setCompletedAt(LocalDateTime.now());
                    tokenRepo.save(current);
                });

        // Get next waiting token
        List<Token> queue = tokenRepo.findActiveQueue(hospitalId, department, doctor, date, slot);
        Token nextWaiting = queue.stream()
                .filter(t -> "waiting".equals(t.getStatus()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No waiting patients in this queue."));

        nextWaiting.setStatus("serving");
        nextWaiting.setServingAt(LocalDateTime.now());
        return tokenRepo.save(nextWaiting);
    }

    // ── COMPLETE CURRENT (staff action) ──────────────────────────────────────
    @Transactional
    public Token completeCurrent(String hospitalId, String department,
                                  String doctor, String date, String slot) {
        if (date == null) date = getTodayDate();
        Token serving = tokenRepo.findServing(hospitalId, department, doctor, date, slot)
                .orElseThrow(() -> new RuntimeException("No patient is currently being served."));
        serving.setStatus("completed");
        serving.setCompletedAt(LocalDateTime.now());
        return tokenRepo.save(serving);
    }

    // ── SKIP CURRENT (staff action) ───────────────────────────────────────────
    @Transactional
    public Token skipCurrent(String hospitalId, String department,
                              String doctor, String date, String slot) {
        if (date == null) date = getTodayDate();
        Token serving = tokenRepo.findServing(hospitalId, department, doctor, date, slot)
                .orElseThrow(() -> new RuntimeException("No patient is currently being served."));
        serving.setStatus("skipped");
        return tokenRepo.save(serving);
    }

    // ── QUEUE SUMMARY ─────────────────────────────────────────────────────────
    public Map<String, Object> getQueueSummary(String hospitalId, String department,
                                                String doctor, String date, String slot) {
        if (date == null) date = getTodayDate();
        List<Token> all = tokenRepo.findByHospitalIdAndDepartmentAndDoctorAndDateAndSlot(
                hospitalId, department, doctor, date, slot);

        Token serving = all.stream().filter(t -> "serving".equals(t.getStatus())).findFirst().orElse(null);
        long waiting   = all.stream().filter(t -> "waiting".equals(t.getStatus())).count();
        long completed = all.stream().filter(t -> "completed".equals(t.getStatus())).count();
        long skipped   = all.stream().filter(t -> "skipped".equals(t.getStatus())).count();

        return Map.of(
                "totalBooked", all.size(),
                "waitingCount", waiting,
                "completedCount", completed,
                "skippedCount", skipped,
                "currentServingNo", serving != null ? serving.getTokenNo() : "Not Started",
                "currentServing", serving != null ? serving : Map.of()
        );
    }

    // ── HOSPITAL DAY SUMMARY (for staff dashboard) ───────────────────────────
    public List<Token> getHospitalDayTokens(String hospitalId, String date) {
        if (date == null) date = getTodayDate();
        return tokenRepo.findByHospitalIdAndDateOrderByTokenNumberAsc(hospitalId, date);
    }

    // ── HELPER ────────────────────────────────────────────────────────────────
    private String required(Map<String, Object> payload, String key) {
        Object val = payload.get(key);
        if (val == null || val.toString().isBlank())
            throw new RuntimeException("Missing required field: " + key);
        return val.toString();
    }
}