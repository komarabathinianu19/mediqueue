package com.medique.medique.service;


import com.medique.medique.dto.AuthRequest;
import com.medique.medique.dto.AuthResponse;
import com.medique.medique.dto.RegisterRequest;
import com.medique.medique.entity.Patient;
import com.medique.medique.entity.User;
import com.medique.medique.entity.User.Role;
import com.medique.medique.repository.PatientRepository;
import com.medique.medique.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (req.getEmail() != null && userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (req.getPhone() != null && userRepository.existsByPhone(req.getPhone())) {
            throw new IllegalArgumentException("Phone already in use");
        }

        User user = User.builder()
                .email(req.getEmail())
                .phone(req.getPhone())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(req.getRole())
                .build();

        userRepository.save(user);

        // Auto-create Patient profile if role is PATIENT
        if (req.getRole() == Role.PATIENT) {
            Patient patient = Patient.builder()
                    .user(user)
                    .fullName(req.getFullName())
                    .age(req.getAge())
                    .gender(req.getGender())
                    .bloodGroup(req.getBloodGroup())
                    .city(req.getCity())
                    .allergies(req.getAllergies())
                    .medicalNotes(req.getMedicalNotes())
                    .emergencyContact(req.getEmergencyContact())
                    .build();
            patientRepository.save(patient);
        }

        String token = jwtService.generateToken(user.getId(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name());
    }

    public AuthResponse login(AuthRequest req) {
        User user = userRepository.findByEmail(req.getIdentifier())
                .or(() -> userRepository.findByPhone(req.getIdentifier()))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getId(), user.getRole().name());
        return new AuthResponse(token, user.getRole().name());
    }

    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));
    }
}