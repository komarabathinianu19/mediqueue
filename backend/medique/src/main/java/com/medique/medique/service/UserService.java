



// package com.medique.medique.service;

// import com.medique.medique.dto.AuthRequest;
// import com.medique.medique.dto.AuthResponse;
// import com.medique.medique.dto.RegisterRequest;
// import com.medique.medique.entity.Patient;
// import com.medique.medique.entity.User;
// import com.medique.medique.repository.PatientRepository;
// import com.medique.medique.repository.UserRepository;
// import com.medique.medique.security.JwtUtil;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.time.LocalDateTime;

// @Service
// public class UserService {

//     private final UserRepository userRepo;
//     private final PatientRepository patientRepo;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtUtil jwtUtil;

//     public UserService(UserRepository userRepo,
//                        PatientRepository patientRepo,
//                        PasswordEncoder passwordEncoder,
//                        JwtUtil jwtUtil) {
//         this.userRepo = userRepo;
//         this.patientRepo = patientRepo;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtUtil = jwtUtil;
//     }

//     // // ── REGISTER ──
//     // public AuthResponse register(RegisterRequest req) {
//     //     if (userRepo.existsByEmail(req.getEmail()))
//     //         throw new RuntimeException("Email already registered."); 

//     // In UserService.java register() method, add this:
// public AuthResponse register(RegisterRequest req) {
    
//     if (req.getEmail() != null && !req.getEmail().isBlank() 
//         && userRepo.existsByEmail(req.getEmail()))
//         throw new RuntimeException("Email already registered.");

//     if (req.getPhone() != null && !req.getPhone().isBlank() 
//         && userRepo.existsByPhone(req.getPhone()))           // ✅ add this check
//         throw new RuntimeException("Phone already registered.");

//     // rest of the method stays the same...

//         User user = User.builder()
//                 .name(req.getName())
//                 .email(req.getEmail())
//                 .phone(req.getPhone())
//                 .password(passwordEncoder.encode(req.getPassword()))
//                 .role("PATIENT") 
//                  .createdAt(LocalDateTime.now()) 
//                 .build();
//         user = userRepo.save(user);

//         Patient patient = Patient.builder()
//                 .fullName(req.getName())
//                 .email(req.getEmail())
//                 .phone(req.getPhone())
//                 .age(req.getAge())
//                 .gender(req.getGender())
//                 .bloodGroup(req.getBloodGroup())
//                 .city(req.getCity())
//                 .allergies(req.getAllergies())
//                 .medicalNotes(req.getMedicalNotes())
//                 .emergencyContact(req.getEmergencyContact())
//                 .user(user)
//                 .build();
//         patientRepo.save(patient);

//         // FIXED: Passing userId (Long) and role (String)
//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }

//     // ── LOGIN ──
//     public AuthResponse login(AuthRequest req) {
//         User user = userRepo.findByEmail(req.getIdentifier())
//                 .or(() -> userRepo.findByPhone(req.getIdentifier()))
//                 .orElseThrow(() -> new RuntimeException("User not found."));

//         if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
//             throw new RuntimeException("Incorrect password.");

//         // FIXED: Passing userId (Long) and role (String)
//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }
// }  






























// package com.medique.medique.service;

// import com.medique.medique.dto.AuthRequest;
// import com.medique.medique.dto.AuthResponse;
// import com.medique.medique.dto.RegisterRequest;
// import com.medique.medique.entity.Patient;
// import com.medique.medique.entity.User;
// import com.medique.medique.repository.PatientRepository;
// import com.medique.medique.repository.UserRepository;
// import com.medique.medique.security.JwtUtil;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.time.LocalDateTime;

// @Service
// public class UserService {

//     private final UserRepository userRepo;
//     private final PatientRepository patientRepo;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtUtil jwtUtil;

//     public UserService(UserRepository userRepo,
//                        PatientRepository patientRepo,
//                        PasswordEncoder passwordEncoder,
//                        JwtUtil jwtUtil) {
//         this.userRepo = userRepo;
//         this.patientRepo = patientRepo;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtUtil = jwtUtil;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     public AuthResponse register(RegisterRequest req) {

//         // Check duplicate email (only if provided)
//         if (req.getEmail() != null && !req.getEmail().isBlank()
//                 && userRepo.existsByEmail(req.getEmail()))
//             throw new RuntimeException("Email already registered.");

//         // Check duplicate phone
//         if (req.getPhone() != null && !req.getPhone().isBlank()
//                 && userRepo.existsByPhone(req.getPhone()))
//             throw new RuntimeException("Phone number already registered.");

//         User user = User.builder()
//                 .name(req.getName())
//                 .email((req.getEmail() != null && !req.getEmail().isBlank()) ? req.getEmail() : null)
//                 .phone(req.getPhone())
//                 .password(passwordEncoder.encode(req.getPassword()))
//                 .role("PATIENT")
//                 .createdAt(LocalDateTime.now())
//                 .build();
//         user = userRepo.save(user);

//         Patient patient = Patient.builder()
//                 .fullName(req.getName())
//                 .email(req.getEmail())
//                 .phone(req.getPhone())
//                 .age(req.getAge())
//                 .gender(req.getGender())
//                 .bloodGroup(req.getBloodGroup())
//                 .city(req.getCity())
//                 .allergies(req.getAllergies())
//                 .medicalNotes(req.getMedicalNotes())
//                 .emergencyContact(req.getEmergencyContact())
//                 .user(user)
//                 .build();
//         patientRepo.save(patient);

//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     public AuthResponse login(AuthRequest req) {
//         User user = userRepo.findByEmail(req.getIdentifier())
//                 .or(() -> userRepo.findByPhone(req.getIdentifier()))
//                 .orElseThrow(() -> new RuntimeException("User not found."));

//         if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
//             throw new RuntimeException("Incorrect password.");

//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }
// }  































// package com.medique.medique.service;

// import com.medique.medique.dto.AuthRequest;
// import com.medique.medique.dto.AuthResponse;
// import com.medique.medique.dto.RegisterRequest;
// import com.medique.medique.entity.Patient;
// import com.medique.medique.entity.User;
// import com.medique.medique.repository.PatientRepository;
// import com.medique.medique.repository.UserRepository;
// import com.medique.medique.security.JwtUtil;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class UserService {

//     private final UserRepository userRepo;
//     private final PatientRepository patientRepo;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtUtil jwtUtil;

//     public UserService(UserRepository userRepo,
//                        PatientRepository patientRepo,
//                        PasswordEncoder passwordEncoder,
//                        JwtUtil jwtUtil) {
//         this.userRepo = userRepo;
//         this.patientRepo = patientRepo;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtUtil = jwtUtil;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     public AuthResponse register(RegisterRequest req) {

//         // Validate phone is provided
//         if (req.getPhone() == null || req.getPhone().isBlank())
//             throw new RuntimeException("Phone number is required.");

//         // Check duplicate phone
//         if (userRepo.existsByPhone(req.getPhone()))
//             throw new RuntimeException("Phone number already registered.");

//         // Check duplicate email (only if provided)
//         if (req.getEmail() != null && !req.getEmail().isBlank()
//                 && userRepo.existsByEmail(req.getEmail()))
//             throw new RuntimeException("Email already registered.");

//         User user = User.builder()
//                 .name(req.getName())
//                 .email((req.getEmail() != null && !req.getEmail().isBlank()) ? req.getEmail() : null)
//                 .phone(req.getPhone())
//                 .password(passwordEncoder.encode(req.getPassword()))
//                 .role("PATIENT")
//                 .createdAt(LocalDateTime.now())
//                 .build();
//         user = userRepo.save(user);

//         Patient patient = Patient.builder()
//                 .fullName(req.getName())
//                 .email(req.getEmail())
//                 .phone(req.getPhone())
//                 .age(req.getAge())
//                 .gender(req.getGender())
//                 .bloodGroup(req.getBloodGroup())
//                 .city(req.getCity())
//                 .allergies(req.getAllergies())
//                 .medicalNotes(req.getMedicalNotes())
//                 .emergencyContact(req.getEmergencyContact())
//                 .user(user)
//                 .build();
//         patientRepo.save(patient);

//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     public AuthResponse login(AuthRequest req) {
//         if (req.getIdentifier() == null || req.getIdentifier().isBlank())
//             throw new RuntimeException("Phone number or email is required.");

//         // Try phone first, then email — using safe lookup that handles duplicates gracefully
//         User user = findUserByIdentifier(req.getIdentifier());

//         if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
//             throw new RuntimeException("Incorrect password.");

//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }

//     /**
//      * Looks up a user by phone or email.
//      * Uses findAll-style queries to detect and report duplicates clearly
//      * instead of crashing with "Query did not return a unique result".
//      */
//     private User findUserByIdentifier(String identifier) {
//         // Determine if it looks like an email
//         boolean isEmail = identifier.contains("@");

//         if (isEmail) {
//             List<User> users = userRepo.findAllByEmail(identifier);
//             if (users.isEmpty())
//                 throw new RuntimeException("No account found with this email.");
//             if (users.size() > 1)
//                 throw new RuntimeException("Multiple accounts found. Please contact support.");
//             return users.get(0);
//         } else {
//             List<User> users = userRepo.findAllByPhone(identifier);
//             if (users.isEmpty())
//                 throw new RuntimeException("No account found with this phone number.");
//             if (users.size() > 1)
//                 throw new RuntimeException("Multiple accounts found with this phone. Please contact support.");
//             return users.get(0);
//         }
//     }
// }  



































// package com.medique.medique.service;

// import com.medique.medique.dto.AuthRequest;
// import com.medique.medique.dto.AuthResponse;
// import com.medique.medique.dto.RegisterRequest;
// import com.medique.medique.entity.Patient;
// import com.medique.medique.entity.User;
// import com.medique.medique.repository.PatientRepository;
// import com.medique.medique.repository.UserRepository;
// import com.medique.medique.security.JwtUtil;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;
// import java.time.LocalDateTime;
// import java.util.List;

// @Service
// public class UserService {

//     private final UserRepository userRepo;
//     private final PatientRepository patientRepo;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtUtil jwtUtil;

//     public UserService(UserRepository userRepo,
//                        PatientRepository patientRepo,
//                        PasswordEncoder passwordEncoder,
//                        JwtUtil jwtUtil) {
//         this.userRepo = userRepo;
//         this.patientRepo = patientRepo;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtUtil = jwtUtil;
//     }

//     // ── REGISTER ──────────────────────────────────────────────────────────────
//     public AuthResponse register(RegisterRequest req) {

//         // Validate phone is provided
//         if (req.getPhone() == null || req.getPhone().isBlank())
//             throw new RuntimeException("Phone number is required.");

//         // Check duplicate phone
//         if (userRepo.existsByPhone(req.getPhone()))
//             throw new RuntimeException("Phone number already registered.");

//         // Check duplicate email (only if provided)
//         if (req.getEmail() != null && !req.getEmail().isBlank()
//                 && userRepo.existsByEmail(req.getEmail()))
//             throw new RuntimeException("Email already registered.");

//         User user = User.builder()
//                 .name(req.getName())
//                 .email((req.getEmail() != null && !req.getEmail().isBlank()) ? req.getEmail() : null)
//                 .phone(req.getPhone())
//                 .password(passwordEncoder.encode(req.getPassword()))
//                 .role("PATIENT")
//                 .createdAt(LocalDateTime.now())
//                 .build();
//         user = userRepo.save(user);

//         Patient patient = Patient.builder()
//                 .fullName(req.getName())
//                 .email(req.getEmail())
//                 .phone(req.getPhone())
//                 .age(req.getAge())
//                 .gender(req.getGender())
//                 .bloodGroup(req.getBloodGroup())
//                 .city(req.getCity())
//                 .allergies(req.getAllergies())
//                 .medicalNotes(req.getMedicalNotes())
//                 .emergencyContact(req.getEmergencyContact())
//                 .user(user)
//                 .build();
//         patientRepo.save(patient);

//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }

//     // ── LOGIN ─────────────────────────────────────────────────────────────────
//     public AuthResponse login(AuthRequest req) {
//         // getPhone() works whether frontend sent "phone" or "identifier"
//         String phoneOrEmail = req.getPhone();

//         if (phoneOrEmail == null || phoneOrEmail.isBlank())
//             throw new RuntimeException("Phone number is required.");

//         // Determine if input looks like an email or phone
//         User user;
//         boolean isEmail = phoneOrEmail.contains("@");

//         if (isEmail) {
//             List<User> users = userRepo.findAllByEmail(phoneOrEmail);
//             if (users.isEmpty())
//                 throw new RuntimeException("Invalid phone number or password.");
//             if (users.size() > 1)
//                 throw new RuntimeException("Multiple accounts found. Please contact support.");
//             user = users.get(0);
//         } else {
//             List<User> users = userRepo.findAllByPhone(phoneOrEmail);
//             if (users.isEmpty())
//                 throw new RuntimeException("Invalid phone number or password.");
//             if (users.size() > 1)
//                 throw new RuntimeException("Multiple accounts found. Please contact support.");
//             user = users.get(0);
//         }

//         if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
//             throw new RuntimeException("Invalid phone number or password.");

//         String token = jwtUtil.generateToken(user.getId(), user.getRole());
//         return new AuthResponse(token, user.getId(), user.getRole());
//     }
// }

























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
import java.time.LocalDateTime;
import java.util.List;

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

    // ── REGISTER ──────────────────────────────────────────────────────────────
    public AuthResponse register(RegisterRequest req) {

        if (req.getPhone() == null || req.getPhone().isBlank())
            throw new RuntimeException("Phone number is required.");

        if (userRepo.existsByPhone(req.getPhone()))
            throw new RuntimeException("Phone number already registered.");

        if (req.getEmail() != null && !req.getEmail().isBlank()
                && userRepo.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email already registered.");

        User user = User.builder()
                .name(req.getName())
                .email((req.getEmail() != null && !req.getEmail().isBlank()) ? req.getEmail() : null)
                .phone(req.getPhone())
                .password(passwordEncoder.encode(req.getPassword()))
                .role("PATIENT")
                .createdAt(LocalDateTime.now())
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

        String token = jwtUtil.generateToken(user.getId(), user.getRole());
        return new AuthResponse(token, user.getId(), user.getRole());
    }

    // ── LOGIN ─────────────────────────────────────────────────────────────────
    public AuthResponse login(AuthRequest req) {
        String phoneOrEmail = req.getPhone();

        if (phoneOrEmail == null || phoneOrEmail.isBlank())
            throw new RuntimeException("Phone number is required.");

        User user;
        boolean isEmail = phoneOrEmail.contains("@");

        if (isEmail) {
            List<User> users = userRepo.findAllByEmail(phoneOrEmail);
            if (users.isEmpty())
                throw new RuntimeException("Invalid phone number or password.");
            if (users.size() > 1)
                throw new RuntimeException("Multiple accounts found. Please contact support.");
            user = users.get(0);
        } else {
            List<User> users = userRepo.findAllByPhone(phoneOrEmail);
            if (users.isEmpty())
                throw new RuntimeException("Invalid phone number or password.");
            if (users.size() > 1)
                throw new RuntimeException("Multiple accounts found. Please contact support.");
            user = users.get(0);
        }

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword()))
            throw new RuntimeException("Invalid phone number or password.");

        String token = jwtUtil.generateToken(user.getId(), user.getRole());
        return new AuthResponse(token, user.getId(), user.getRole());
    }

    // ── CHECK PHONE REGISTERED ────────────────────────────────────────────────
    // Called before sending Firebase OTP — verifies the phone exists in MySQL.
    // Strips +91 prefix so it matches how numbers are stored in the DB.
    public boolean isPhoneRegistered(String phone) {
        String normalized = normalizePhone(phone);
        List<User> users = userRepo.findAllByPhone(normalized);
        return !users.isEmpty();
    }

    // ── RESET PASSWORD ────────────────────────────────────────────────────────
    // Called after Firebase OTP is verified on the frontend.
    // Normalizes +91 prefix so it matches how numbers are stored in the DB.
    public void resetPassword(String phone, String newPassword) {
        String normalized = normalizePhone(phone);

        if (newPassword == null || newPassword.isBlank() || newPassword.length() < 6)
            throw new RuntimeException("Password must be at least 6 characters.");

        List<User> users = userRepo.findAllByPhone(normalized);

        if (users.isEmpty())
            throw new RuntimeException("No account found with this phone number.");

        if (users.size() > 1)
            throw new RuntimeException("Multiple accounts found. Please contact support.");

        User user = users.get(0);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    // ── HELPER: normalize phone to plain 10-digit format ─────────────────────
    // DB stores numbers as 10 digits (e.g. 9876543210).
    // Frontend may send +919876543210 after Firebase OTP — strip the prefix.
    private String normalizePhone(String phone) {
        if (phone == null) return "";
        String p = phone.trim();
        if (p.startsWith("+91") && p.length() == 13) return p.substring(3);  // +91XXXXXXXXXX → XXXXXXXXXX
        if (p.startsWith("91") && p.length() == 12)  return p.substring(2);  // 91XXXXXXXXXX  → XXXXXXXXXX
        return p;
    }
}