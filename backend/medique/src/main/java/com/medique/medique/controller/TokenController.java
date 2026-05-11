package com.medique.medique.controller;

import com.medique.medique.entity.Token;
import com.medique.medique.security.JwtUtil;
import com.medique.medique.service.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tokens")
@CrossOrigin(origins = "*")
public class TokenController {

    private final TokenService tokenService;
    private final JwtUtil jwtUtil;

    public TokenController(TokenService tokenService, JwtUtil jwtUtil) {
        this.tokenService = tokenService;
        this.jwtUtil = jwtUtil;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PATIENT: BOOK A TOKEN
    // POST /api/tokens/book
    // Headers: Authorization: Bearer <token>
    // Body: { hospitalId, hospitalName, department, doctor, doctorId, slot,
    //         slotLabel, slotTime, date, patientName, age, symptoms,
    //         visitType, doctorFee, paymentStatus, paymentId }
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/book")
    public ResponseEntity<?> bookToken(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Object> payload) {
        try {
            Long userId = extractUserId(authHeader);
            Token token = tokenService.bookToken(payload, userId);
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAFF: BOOK A WALK-IN TOKEN (no patient JWT needed — uses hospital JWT)
    // POST /api/tokens/walkin
    // Body: same as /book but bookingSource = "staff"
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/walkin")
    public ResponseEntity<?> walkInToken(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, Object> payload) {
        try {
            payload.put("bookingSource", "staff");
            payload.put("paymentStatus", "SUCCESS");
            Token token = tokenService.bookToken(payload, null);
            return ResponseEntity.ok(token);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET ACTIVE QUEUE (patient & staff view)
    // GET /api/tokens/queue?hospitalId=&department=&doctor=&date=&slot=
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/queue")
    public ResponseEntity<?> getActiveQueue(
            @RequestParam String hospitalId,
            @RequestParam String department,
            @RequestParam String doctor,
            @RequestParam(required = false) String date,
            @RequestParam(defaultValue = "morning") String slot) {
        try {
            List<Token> queue = tokenService.getActiveQueue(hospitalId, department, doctor, date, slot);
            return ResponseEntity.ok(queue);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET QUEUE SUMMARY
    // GET /api/tokens/summary?hospitalId=&department=&doctor=&date=&slot=
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/summary")
    public ResponseEntity<?> getQueueSummary(
            @RequestParam String hospitalId,
            @RequestParam String department,
            @RequestParam String doctor,
            @RequestParam(required = false) String date,
            @RequestParam(defaultValue = "morning") String slot) {
        try {
            Map<String, Object> summary = tokenService.getQueueSummary(
                    hospitalId, department, doctor, date, slot);
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // ALL TOKENS IN A SLOT (including completed/skipped)
    // GET /api/tokens/slot?hospitalId=&department=&doctor=&date=&slot=
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/slot")
    public ResponseEntity<?> getAllInSlot(
            @RequestParam String hospitalId,
            @RequestParam String department,
            @RequestParam String doctor,
            @RequestParam(required = false) String date,
            @RequestParam(defaultValue = "morning") String slot) {
        try {
            List<Token> tokens = tokenService.getAllTokensForSlot(
                    hospitalId, department, doctor, date, slot);
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PATIENT: MY TOKENS (history)
    // GET /api/tokens/my
    // Headers: Authorization: Bearer <token>
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/my")
    public ResponseEntity<?> getMyTokens(
            @RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = extractUserId(authHeader);
            List<Token> tokens = tokenService.getMyTokens(userId);
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // PATIENT: MY ACTIVE TOKEN (for home screen hero card)
    // GET /api/tokens/my/active
    // Headers: Authorization: Bearer <token>
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/my/active")
    public ResponseEntity<?> getMyActiveToken(
            @RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = extractUserId(authHeader);
            Optional<Token> token = tokenService.getMyActiveToken(userId);
            return ResponseEntity.ok(token.orElse(null));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAFF: CALL NEXT PATIENT
    // POST /api/tokens/next
    // Body: { hospitalId, department, doctor, date, slot }
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/next")
    public ResponseEntity<?> callNext(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {
        try {
            Token t = tokenService.callNext(
                    body.get("hospitalId"), body.get("department"),
                    body.get("doctor"), body.get("date"), body.get("slot"));
            return ResponseEntity.ok(t);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAFF: COMPLETE CURRENT PATIENT
    // POST /api/tokens/complete
    // Body: { hospitalId, department, doctor, date, slot }
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/complete")
    public ResponseEntity<?> complete(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {
        try {
            Token t = tokenService.completeCurrent(
                    body.get("hospitalId"), body.get("department"),
                    body.get("doctor"), body.get("date"), body.get("slot"));
            return ResponseEntity.ok(t);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAFF: SKIP CURRENT PATIENT
    // POST /api/tokens/skip
    // Body: { hospitalId, department, doctor, date, slot }
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/skip")
    public ResponseEntity<?> skip(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {
        try {
            Token t = tokenService.skipCurrent(
                    body.get("hospitalId"), body.get("department"),
                    body.get("doctor"), body.get("date"), body.get("slot"));
            return ResponseEntity.ok(t);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STAFF: HOSPITAL DAY VIEW (all tokens today)
    // GET /api/tokens/hospital/{hospitalId}?date=
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<?> getHospitalDayTokens(
            @PathVariable String hospitalId,
            @RequestParam(required = false) String date) {
        try {
            List<Token> tokens = tokenService.getHospitalDayTokens(hospitalId, date);
            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // ── Helper ────────────────────────────────────────────────────────────────
    private Long extractUserId(String authHeader) {
        String token = authHeader.replace("Bearer ", "").trim();
        return jwtUtil.extractUserId(token);
    }
}