package com.medique.medique.controller;

import com.medique.medique.entity.Payment;
import com.medique.medique.entity.PaymentStatus;
import com.medique.medique.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    private final PaymentRepository paymentRepository;

    public PaymentController(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1: Patient calls this before showing payment screen
    //         Creates a Razorpay order and returns orderId + keyId to the app
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> body) {
        try {
            // amount comes in RUPEES from app, we convert to paise here
            int amountRupees = ((Number) body.get("amount")).intValue();
            int amountPaise  = amountRupees * 100;

            String hospitalId  = (String) body.getOrDefault("hospitalId", "");
            String patientId   = (String) body.getOrDefault("patientId", "");
            String doctorName  = (String) body.getOrDefault("doctorName", "");
            String department  = (String) body.getOrDefault("department", "");
            String notes       = (String) body.getOrDefault("notes", "");

            // Create Razorpay order
            RazorpayClient client = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "rcpt_" + System.currentTimeMillis());

            JSONObject notesJson = new JSONObject();
            notesJson.put("hospitalId", hospitalId);
            notesJson.put("patientId", patientId);
            notesJson.put("doctorName", doctorName);
            notesJson.put("department", department);
            notesJson.put("notes", notes);
            orderRequest.put("notes", notesJson);

            Order order = client.orders.create(orderRequest);
            String orderId = order.get("id");

            // Save a PENDING payment record in MySQL right away
            Payment payment = new Payment();
            payment.setRazorpayOrderId(orderId);
            payment.setHospitalId(hospitalId);
            payment.setPatientId(patientId);
            payment.setDoctorName(doctorName);
            payment.setDepartment(department);
            payment.setAmountPaise(amountPaise);
            payment.setCurrency("INR");
            payment.setStatus(PaymentStatus.PENDING);
            payment.setNotes(notes);
            paymentRepository.save(payment);

            // Return to app
            Map<String, Object> response = new HashMap<>();
            response.put("orderId", orderId);
            response.put("amount", amountPaise);
            response.put("currency", "INR");
            response.put("keyId", keyId);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to create payment order: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 2: App calls this after Razorpay returns success callback
    //         Verifies the signature to confirm payment is genuine
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> body) {
        try {
            String orderId    = body.get("razorpay_order_id");
            String paymentId  = body.get("razorpay_payment_id");
            String signature  = body.get("razorpay_signature");

            if (orderId == null || paymentId == null || signature == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "verified", false,
                    "message", "Missing required payment fields"
                ));
            }

            // Verify HMAC-SHA256 signature
            String data    = orderId + "|" + paymentId;
            Mac mac        = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(keySecret.getBytes("UTF-8"), "HmacSHA256"));
            byte[] rawHmac = mac.doFinal(data.getBytes("UTF-8"));

            StringBuilder sb = new StringBuilder();
            for (byte b : rawHmac) sb.append(String.format("%02x", b));
            String generatedSignature = sb.toString();

            if (!generatedSignature.equals(signature)) {
                // Signature mismatch → payment tampered or fake
                paymentRepository.findByRazorpayOrderId(orderId).ifPresent(p -> {
                    p.setStatus(PaymentStatus.FAILED);
                    p.setUpdatedAt(LocalDateTime.now());
                    paymentRepository.save(p);
                });
                return ResponseEntity.badRequest().body(Map.of(
                    "verified", false,
                    "message", "Payment verification failed. Invalid signature."
                ));
            }

            // Signature matches → mark payment as SUCCESS in MySQL
            Payment payment = paymentRepository.findByRazorpayOrderId(orderId)
                    .orElse(new Payment());
            payment.setRazorpayOrderId(orderId);
            payment.setRazorpayPaymentId(paymentId);
            payment.setRazorpaySignature(signature);
            payment.setStatus(PaymentStatus.SUCCESS);
            payment.setUpdatedAt(LocalDateTime.now());
            paymentRepository.save(payment);

            return ResponseEntity.ok(Map.of(
                "verified", true,
                "paymentId", paymentId,
                "message", "Payment verified successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                "verified", false,
                "message", "Verification error: " + e.getMessage()
            ));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 3 (optional): Save "Pay at Hospital" record without Razorpay
    // ─────────────────────────────────────────────────────────────────────────
    @PostMapping("/pay-at-hospital")
    public ResponseEntity<?> payAtHospital(@RequestBody Map<String, Object> body) {
        try {
            Payment payment = new Payment();
            payment.setRazorpayOrderId("PAY-HOSPITAL-" + System.currentTimeMillis());
            payment.setHospitalId((String) body.getOrDefault("hospitalId", ""));
            payment.setPatientId((String) body.getOrDefault("patientId", ""));
            payment.setDoctorName((String) body.getOrDefault("doctorName", ""));
            payment.setDepartment((String) body.getOrDefault("department", ""));
            payment.setAmountPaise(((Number) body.getOrDefault("amount", 0)).intValue() * 100);
            payment.setCurrency("INR");
            payment.setStatus(PaymentStatus.PAY_AT_HOSPITAL);
            payment.setNotes((String) body.getOrDefault("notes", ""));
            paymentRepository.save(payment);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "paymentId", payment.getRazorpayOrderId()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // GET payments for a hospital (for hospital dashboard)
    // ─────────────────────────────────────────────────────────────────────────
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<?> getHospitalPayments(@PathVariable String hospitalId) {
        List<Map<String, Object>> result = paymentRepository
                .findByHospitalId(hospitalId)
                .stream()
                .map(p -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id",                p.getId());
                    m.put("razorpayOrderId",   p.getRazorpayOrderId());
                    m.put("razorpayPaymentId", p.getRazorpayPaymentId());
                    m.put("hospitalId",        p.getHospitalId());
                    m.put("patientId",         p.getPatientId());
                    m.put("doctorName",        p.getDoctorName());
                    m.put("department",        p.getDepartment());
                    m.put("amountRupees",      p.getAmountPaise() != null ? p.getAmountPaise() / 100.0 : 0);
                    m.put("status",            p.getStatus() != null ? p.getStatus().name() : null);
                    m.put("createdAt",         p.getCreatedAt() != null ? p.getCreatedAt().toString() : null);
                    return m;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}