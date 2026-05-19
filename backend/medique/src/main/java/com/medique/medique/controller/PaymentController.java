package com.medique.medique.controller;

import com.medique.medique.entity.Payment;
import com.medique.medique.repository.HospitalRepository;
import com.medique.medique.repository.PaymentRepository;
import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    private final HospitalRepository hospitalRepository;
    private final PaymentRepository paymentRepository;

    public PaymentController(HospitalRepository hospitalRepository,
                             PaymentRepository paymentRepository) {
        this.hospitalRepository = hospitalRepository;
        this.paymentRepository = paymentRepository;
    }

    // Step 1: Patient clicks Pay → frontend calls this to get an order ID
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> body,
                                         jakarta.servlet.http.HttpServletRequest request) {
        try {
            String hospitalId = (String) body.get("hospitalId");
            double amount = Double.parseDouble(body.get("amount").toString());
            String patientId = (String) body.get("patientId");
            String patientName = (String) body.get("patientName");
            String appointmentDate = (String) body.get("appointmentDate");
            String slotLabel = (String) body.get("slotLabel");
            Long doctorId = Long.parseLong(body.get("doctorId").toString());

            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderReq = new JSONObject();
            orderReq.put("amount", (int)(amount * 100)); // in paise
            orderReq.put("currency", "INR");
            orderReq.put("receipt", "receipt_" + System.currentTimeMillis());

            Order order = client.orders.create(orderReq);

            // Save pending payment to DB
            Payment payment = new Payment();
            payment.setRazorpayOrderId(order.get("id").toString()); // Converted to String
            payment.setHospitalId(hospitalId);
            payment.setPatientId(patientId);
            payment.setPatientName(patientName);
            payment.setDoctorId(doctorId);
            payment.setAmount(Double.valueOf(amount)); // Matching Double object wrapper type
            payment.setStatus("CREATED");
            payment.setAppointmentDate(appointmentDate);
            payment.setSlotLabel(slotLabel);
            paymentRepository.save(payment);

            return ResponseEntity.ok(Map.of(
                "orderId", order.get("id").toString(),
                "amount", amount,
                "currency", "INR",
                "keyId", razorpayKeyId
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // Step 2: After Razorpay success, frontend sends payment details for verification
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> body) {
        try {
            String orderId = body.get("razorpay_order_id");
            String paymentId = body.get("razorpay_payment_id");
            String signature = body.get("razorpay_signature");

            // Verify signature using Razorpay standard utility
            String generatedSig = Utils.getHash(orderId + "|" + paymentId, razorpayKeySecret);
            if (!generatedSig.equals(signature)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Payment verification failed"));
            }

            // Update payment record
            Payment payment = paymentRepository.findByRazorpayOrderId(orderId)
                .orElseThrow(() -> new Exception("Payment not found"));
            payment.setRazorpayPaymentId(paymentId);
            payment.setRazorpaySignature(signature);
            payment.setStatus("SUCCESS");
            paymentRepository.save(payment);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "paymentId", paymentId,
                "message", "Payment verified successfully"
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // Fetch all payments for a hospital
    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<?> getHospitalPayments(@PathVariable String hospitalId) {
        return ResponseEntity.ok(paymentRepository.findByHospitalId(hospitalId));
    }
}