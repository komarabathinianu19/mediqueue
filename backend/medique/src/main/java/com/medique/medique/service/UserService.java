



package com.medique.medique.service;

import com.medique.medique.dto.AuthRequest;
import com.medique.medique.dto.AuthResponse;
import com.medique.medique.dto.RegisterRequest;
import com.medique.medique.entity.Patient;
import com.medique.medique.entity.User;
import com.medique.medique.repository.PatientRepository;
import com.medique.medique.repository.UserRepository;
import com.medique.medique.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final PatientRepository patientRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepo,
                       PatientRepository patientRepo,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.patientRepo = patientRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // ── REGISTER ──
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already registered.");

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .password(passwordEncoder.encode(req.getPassword()))
                .role("PATIENT")
                .build();
        user = userRepo.save(user);

        Patient patient = Patient.builder()
                .fullName(req.getName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .age(req.getAge())
                .gender(req.getGender())
                .bloodGroup(req.getBloodGroup())
                .city(req.getCity())
                .allergies(req.getAllergies())
                .medicalNotes(req.getMedicalNotes())
                .emergencyContact(req.getEmergencyContact())
                .user(user)
                .build();
        patientRepo.save(patient);

        // FIXED: Passing userId (Long) and role (String)
        String token = jwtUtil.generateToken(user.getId(), user.getRole());
        return new AuthResponse(token, user.getId(), user.getRole());
    }

    // ── LOGIN ──
    public AuthResponse login(AuthRequest req) {
        User user = userRepo.findByEmail(req.getIdentifier())
                .or(() -> userRepo.findByPhone(req.getIdentifier()))
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new RuntimeException("Incorrect password.");

        // FIXED: Passing userId (Long) and role (String)
        String token = jwtUtil.generateToken(user.getId(), user.getRole());
        return new AuthResponse(token, user.getId(), user.getRole());
    }
}