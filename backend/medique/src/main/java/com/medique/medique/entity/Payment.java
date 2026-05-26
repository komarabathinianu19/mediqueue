package com.medique.medique.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razorpayOrderId;       // order_XXXX from Razorpay
    private String razorpayPaymentId;     // pay_XXXX after success
    private String razorpaySignature;     // for verification

    private String patientId;
    private String hospitalId;
    private Long doctorId;

    private Double amount;                // in rupees
    private String currency = "INR";
    private String status;                // CREATED, SUCCESS, FAILED

    private String appointmentDate;
    private String slotLabel;
    private String patientName;

    private LocalDateTime createdAt = LocalDateTime.now();
}