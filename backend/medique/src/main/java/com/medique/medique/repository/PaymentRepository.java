package com.medique.medique.repository;

import com.medique.medique.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByRazorpayOrderId(String orderId);
    List<Payment> findByHospitalId(String hospitalId);
    List<Payment> findByPatientId(String patientId);
}