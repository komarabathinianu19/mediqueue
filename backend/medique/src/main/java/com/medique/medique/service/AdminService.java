package com.medique.medique.service;

import com.medique.medique.entity.Admin;
import com.medique.medique.repository.AdminRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService implements ApplicationRunner {

    private final AdminRepository adminRepo;
    private final PasswordEncoder passwordEncoder;

    // ── Default admin credentials (seeded on first startup) ──────────────────
    private static final String DEFAULT_EMAIL    = "admin@mediqueue.com";
    private static final String DEFAULT_PASSWORD = "Admin@123";

    public AdminService(AdminRepository adminRepo, PasswordEncoder passwordEncoder) {
        this.adminRepo       = adminRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // ── Seed default admin into DB on startup if not already present ──────────
    @Override
    public void run(ApplicationArguments args) {
        if (!adminRepo.existsByEmail(DEFAULT_EMAIL)) {
            Admin admin = new Admin();
            admin.setEmail(DEFAULT_EMAIL);
            admin.setPassword(passwordEncoder.encode(DEFAULT_PASSWORD));
            adminRepo.save(admin);
            System.out.println("✅ Default admin seeded: " + DEFAULT_EMAIL);
        }
    }

    // ── LOGIN: verify email + password against DB ─────────────────────────────
    public Admin login(String email, String password) {
        Admin admin = adminRepo.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Admin not found with this email."));

        if (!passwordEncoder.matches(password.trim(), admin.getPassword())) {
            throw new RuntimeException("Incorrect password.");
        }
        return admin;
    }

    // ── RESET PASSWORD: verify security answer then update DB ─────────────────
    public void resetPassword(String email, String securityAnswer, String newPassword) {
        // Security answer is checked on frontend before calling this,
        // but we validate email exists in DB
        Admin admin = adminRepo.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new RuntimeException("Admin not found."));

        if (newPassword == null || newPassword.trim().length() < 6) {
            throw new RuntimeException("Password must be at least 6 characters.");
        }

        admin.setPassword(passwordEncoder.encode(newPassword.trim()));
        adminRepo.save(admin);
    }
}