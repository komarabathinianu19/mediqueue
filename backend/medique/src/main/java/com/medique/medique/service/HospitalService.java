


// package com.medique.medique.service;

// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.repository.HospitalRepository;

// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.security.SecureRandom;
// import java.util.List;

// @Service
// public class HospitalService {

//     private final HospitalRepository hospitalRepo;
//     private final PasswordEncoder passwordEncoder;

//     public HospitalService(
//             HospitalRepository hospitalRepo,
//             PasswordEncoder passwordEncoder
//     ) {
//         this.hospitalRepo = hospitalRepo;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ───────────────── REGISTER HOSPITAL ─────────────────

//     public Hospital register(HospitalRegisterRequest req) {

//         if (req.getName() == null || req.getName().isBlank()) {
//             throw new RuntimeException("Hospital name is required.");
//         }

//         if (req.getEmail() == null || req.getEmail().isBlank()) {
//             throw new RuntimeException("Email is required.");
//         }

//         if (req.getPassword() == null || req.getPassword().length() < 6) {
//             throw new RuntimeException(
//                     "Password must be at least 6 characters."
//             );
//         }

//         if (req.getPhone() == null || req.getPhone().isBlank()) {
//             throw new RuntimeException("Phone number is required.");
//         }

//         if (req.getLicenseNumber() == null
//                 || req.getLicenseNumber().isBlank()) {

//             throw new RuntimeException("License number is required.");
//         }

//         if (hospitalRepo.existsByEmail(req.getEmail())) {
//             throw new RuntimeException("Email already registered.");
//         }

//         Hospital hospital = new Hospital();

//         hospital.setHospitalId(generateUniqueHospitalId());

//         hospital.setName(req.getName());
//         hospital.setOwnerName(req.getOwnerName());

//         hospital.setEmail(req.getEmail());
//         hospital.setPhone(req.getPhone());

//         hospital.setPassword(
//                 passwordEncoder.encode(req.getPassword())
//         );

//         hospital.setType(req.getType());

//         hospital.setAddress(req.getAddress());
//         hospital.setCity(req.getCity());

//         hospital.setRegistrationNumber(
//                 req.getRegistrationNumber()
//         );

//         hospital.setLicenseNumber(
//                 req.getLicenseNumber()
//         );

//         // Example:
//         // "General OPD,Cardiology,ENT"

//         hospital.setDepartments(req.getDepartments());

//         hospital.setNumberOfDoctors(
//                 req.getNumberOfDoctors()
//         );

//         hospital.setImageUrl(req.getImageUrl());

//         // Default status
//         hospital.setStatus(HospitalStatus.PENDING);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── APPROVE HOSPITAL ─────────────────

//     public Hospital approve(String hospitalId) {

//         Hospital hospital = hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found: " + hospitalId
//                         ));

//         hospital.setStatus(HospitalStatus.APPROVED);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── REJECT HOSPITAL ─────────────────

//     public Hospital reject(String hospitalId) {

//         Hospital hospital = hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found: " + hospitalId
//                         ));

//         hospital.setStatus(HospitalStatus.REJECTED);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── GET PENDING HOSPITALS ─────────────────

//     public List<Hospital> getPending() {
//         return hospitalRepo.findByStatus(
//                 HospitalStatus.PENDING
//         );
//     }

//     // ───────────────── GET APPROVED HOSPITALS ─────────────────

//     public List<Hospital> getApproved() {
//         return hospitalRepo.findByStatus(
//                 HospitalStatus.APPROVED
//         );
//     }

//     // ───────────────── GET ALL HOSPITALS ─────────────────

//     public List<Hospital> getAll() {
//         return hospitalRepo.findAll();
//     }

//     // ───────────────── HOSPITAL LOGIN ─────────────────

//     public Hospital loginStaff(
//             String hospitalId,
//             String email,
//             String password
//     ) {

//         Hospital hospital = hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Invalid Hospital ID."
//                         ));

//         // Check email
//         if (!hospital.getEmail().equalsIgnoreCase(email)) {

//             throw new RuntimeException(
//                     "Email does not match this Hospital ID."
//             );
//         }

//         // Check password
//         if (!passwordEncoder.matches(
//                 password,
//                 hospital.getPassword()
//         )) {

//             throw new RuntimeException(
//                     "Incorrect password."
//             );
//         }

//         // Check approval status
//         if (hospital.getStatus() == HospitalStatus.PENDING) {

//             throw new RuntimeException(
//                     "Your hospital is still pending admin approval."
//             );
//         }

//         if (hospital.getStatus() == HospitalStatus.REJECTED) {

//             throw new RuntimeException(
//                     "Your hospital registration was rejected."
//             );
//         }

//         return hospital;
//     }

//     // ───────────────── GET HOSPITAL BY HOSPITAL ID ─────────────────

//     public Hospital getHospitalById(String hospitalId) {

//         return hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found"
//                         ));
//     }

//     // ───────────────── GET HOSPITAL BY EMAIL ─────────────────

//     public Hospital getHospitalByEmail(String email) {

//         return hospitalRepo
//                 .findByEmail(email)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found with email: "
//                                         + email
//                         ));
//     }

//     // ───────────────── GENERATE UNIQUE HOSPITAL ID ─────────────────

//     private static final String CHARS =
//             "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//     private static final SecureRandom RANDOM =
//             new SecureRandom();

//     private String generateUniqueHospitalId() {

//         String id;

//         do {

//             StringBuilder sb = new StringBuilder("HSP-");

//             for (int i = 0; i < 6; i++) {

//                 sb.append(
//                         CHARS.charAt(
//                                 RANDOM.nextInt(CHARS.length())
//                         )
//                 );
//             }

//             id = sb.toString();

//         } while (hospitalRepo.existsByHospitalId(id));

//         return id;
//     }
// }   





























// package com.medique.medique.service;

// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.repository.HospitalRepository;

// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.security.SecureRandom;
// import java.util.List;
// import java.util.Map;

// @Service
// public class HospitalService {

//     private final HospitalRepository hospitalRepo;
//     private final PasswordEncoder passwordEncoder;

//     public HospitalService(HospitalRepository hospitalRepo, PasswordEncoder passwordEncoder) {
//         this.hospitalRepo = hospitalRepo;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ───────────────── UPDATE HOSPITAL PROFILE (NEW) ─────────────────
//     // This method handles the updates from the Staff Profile screen
//     public Hospital updateHospitalProfile(String hospitalId, Map<String, Object> updates) {
//         Hospital hospital = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));

//         if (updates.containsKey("name")) hospital.setName((String) updates.get("name"));
//         if (updates.containsKey("phone")) hospital.setPhone((String) updates.get("phone"));
//         if (updates.containsKey("address")) hospital.setAddress((String) updates.get("address"));
//         if (updates.containsKey("city")) hospital.setCity((String) updates.get("city"));
//         if (updates.containsKey("imageUrl")) hospital.setImageUrl((String) updates.get("imageUrl"));
        
//         // Handle the new staff-specific fields
//         if (updates.containsKey("openingTime")) hospital.setOpeningTime((String) updates.get("openingTime"));
//         if (updates.containsKey("closingTime")) hospital.setClosingTime((String) updates.get("closingTime"));
//         if (updates.containsKey("description")) hospital.setDescription((String) updates.get("description"));

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── REGISTER HOSPITAL ─────────────────
//     public Hospital register(HospitalRegisterRequest req) {
//         if (req.getName() == null || req.getName().isBlank()) throw new RuntimeException("Hospital name is required.");
//         if (req.getEmail() == null || req.getEmail().isBlank()) throw new RuntimeException("Email is required.");
//         if (req.getPassword() == null || req.getPassword().length() < 6) throw new RuntimeException("Password must be at least 6 characters.");
//         if (req.getPhone() == null || req.getPhone().isBlank()) throw new RuntimeException("Phone number is required.");
//         if (req.getLicenseNumber() == null || req.getLicenseNumber().isBlank()) throw new RuntimeException("License number is required.");
//         if (hospitalRepo.existsByEmail(req.getEmail())) throw new RuntimeException("Email already registered.");

//         Hospital hospital = new Hospital();
//         hospital.setHospitalId(generateUniqueHospitalId());
//         hospital.setName(req.getName());
//         hospital.setOwnerName(req.getOwnerName());
//         hospital.setEmail(req.getEmail());
//         hospital.setPhone(req.getPhone());
//         hospital.setPassword(passwordEncoder.encode(req.getPassword()));
//         hospital.setType(req.getType());
//         hospital.setAddress(req.getAddress());
//         hospital.setCity(req.getCity());
//         hospital.setRegistrationNumber(req.getRegistrationNumber());
//         hospital.setLicenseNumber(req.getLicenseNumber());
//         hospital.setDepartments(req.getDepartments());
//         hospital.setNumberOfDoctors(req.getNumberOfDoctors());
//         hospital.setImageUrl(req.getImageUrl());
//         hospital.setStatus(HospitalStatus.PENDING);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── AUTH & FETCH LOGIC ─────────────────

//     public Hospital loginStaff(String hospitalId, String email, String password) {
//         Hospital hospital = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Invalid Hospital ID."));

//         if (!hospital.getEmail().equalsIgnoreCase(email)) throw new RuntimeException("Email does not match this Hospital ID.");
//         if (!passwordEncoder.matches(password, hospital.getPassword())) throw new RuntimeException("Incorrect password.");
//         if (hospital.getStatus() == HospitalStatus.PENDING) throw new RuntimeException("Your hospital is still pending admin approval.");
//         if (hospital.getStatus() == HospitalStatus.REJECTED) throw new RuntimeException("Your hospital registration was rejected.");

//         return hospital;
//     }

//     public Hospital approve(String hospitalId) {
//         Hospital hospital = getHospitalById(hospitalId);
//         hospital.setStatus(HospitalStatus.APPROVED);
//         return hospitalRepo.save(hospital);
//     }

//     public Hospital reject(String hospitalId) {
//         Hospital hospital = getHospitalById(hospitalId);
//         hospital.setStatus(HospitalStatus.REJECTED);
//         return hospitalRepo.save(hospital);
//     }

//     public List<Hospital> getPending() { return hospitalRepo.findByStatus(HospitalStatus.PENDING); }
//     public List<Hospital> getApproved() { return hospitalRepo.findByStatus(HospitalStatus.APPROVED); }
//     public List<Hospital> getAll() { return hospitalRepo.findAll(); }

//     public Hospital getHospitalById(String hospitalId) {
//         return hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found"));
//     }

//     public Hospital getHospitalByEmail(String email) {
//         return hospitalRepo.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found with email: " + email));
//     }

//     // ───────────────── ID GENERATION ─────────────────

//     private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     private static final SecureRandom RANDOM = new SecureRandom();

//     private String generateUniqueHospitalId() {
//         String id;
//         do {
//             StringBuilder sb = new StringBuilder("HSP-");
//             for (int i = 0; i < 6; i++) {
//                 sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
//             }
//             id = sb.toString();
//         } while (hospitalRepo.existsByHospitalId(id));
//         return id;
//     }
// }  































// package com.medique.medique.service;

// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.repository.HospitalRepository;

// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.security.SecureRandom;
// import java.util.List;

// @Service
// public class HospitalService {

//     private final HospitalRepository hospitalRepo;
//     private final PasswordEncoder passwordEncoder;

//     public HospitalService(
//             HospitalRepository hospitalRepo,
//             PasswordEncoder passwordEncoder
//     ) {
//         this.hospitalRepo = hospitalRepo;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ───────────────── REGISTER HOSPITAL ─────────────────

//     public Hospital register(HospitalRegisterRequest req) {

//         if (req.getName() == null || req.getName().isBlank()) {
//             throw new RuntimeException("Hospital name is required.");
//         }

//         if (req.getEmail() == null || req.getEmail().isBlank()) {
//             throw new RuntimeException("Email is required.");
//         }

//         if (req.getPassword() == null || req.getPassword().length() < 6) {
//             throw new RuntimeException(
//                     "Password must be at least 6 characters."
//             );
//         }

//         if (req.getPhone() == null || req.getPhone().isBlank()) {
//             throw new RuntimeException("Phone number is required.");
//         }

//         if (req.getLicenseNumber() == null
//                 || req.getLicenseNumber().isBlank()) {

//             throw new RuntimeException("License number is required.");
//         }

//         if (hospitalRepo.existsByEmail(req.getEmail())) {
//             throw new RuntimeException("Email already registered.");
//         }

//         Hospital hospital = new Hospital();

//         hospital.setHospitalId(generateUniqueHospitalId());

//         hospital.setName(req.getName());
//         hospital.setOwnerName(req.getOwnerName());

//         hospital.setEmail(req.getEmail());
//         hospital.setPhone(req.getPhone());

//         hospital.setPassword(
//                 passwordEncoder.encode(req.getPassword())
//         );

//         hospital.setType(req.getType());

//         hospital.setAddress(req.getAddress());
//         hospital.setCity(req.getCity());

//         hospital.setRegistrationNumber(
//                 req.getRegistrationNumber()
//         );

//         hospital.setLicenseNumber(
//                 req.getLicenseNumber()
//         );

//         // Example:
//         // "General OPD,Cardiology,ENT"

//         hospital.setDepartments(req.getDepartments());

//         hospital.setNumberOfDoctors(
//                 req.getNumberOfDoctors()
//         );

//         hospital.setImageUrl(req.getImageUrl());

//         // Default status
//         hospital.setStatus(HospitalStatus.PENDING);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── APPROVE HOSPITAL ─────────────────

//     public Hospital approve(String hospitalId) {

//         Hospital hospital = hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found: " + hospitalId
//                         ));

//         hospital.setStatus(HospitalStatus.APPROVED);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── REJECT HOSPITAL ─────────────────

//     public Hospital reject(String hospitalId) {

//         Hospital hospital = hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found: " + hospitalId
//                         ));

//         hospital.setStatus(HospitalStatus.REJECTED);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── GET PENDING HOSPITALS ─────────────────

//     public List<Hospital> getPending() {
//         return hospitalRepo.findByStatus(
//                 HospitalStatus.PENDING
//         );
//     }

//     // ───────────────── GET APPROVED HOSPITALS ─────────────────

//     public List<Hospital> getApproved() {
//         return hospitalRepo.findByStatus(
//                 HospitalStatus.APPROVED
//         );
//     }

//     // ───────────────── GET ALL HOSPITALS ─────────────────

//     public List<Hospital> getAll() {
//         return hospitalRepo.findAll();
//     }

//     // ───────────────── HOSPITAL LOGIN ─────────────────

//     public Hospital loginStaff(
//             String hospitalId,
//             String email,
//             String password
//     ) {

//         Hospital hospital = hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Invalid Hospital ID."
//                         ));

//         // Check email
//         if (!hospital.getEmail().equalsIgnoreCase(email)) {

//             throw new RuntimeException(
//                     "Email does not match this Hospital ID."
//             );
//         }

//         // Check password
//         if (!passwordEncoder.matches(
//                 password,
//                 hospital.getPassword()
//         )) {

//             throw new RuntimeException(
//                     "Incorrect password."
//             );
//         }

//         // Check approval status
//         if (hospital.getStatus() == HospitalStatus.PENDING) {

//             throw new RuntimeException(
//                     "Your hospital is still pending admin approval."
//             );
//         }

//         if (hospital.getStatus() == HospitalStatus.REJECTED) {

//             throw new RuntimeException(
//                     "Your hospital registration was rejected."
//             );
//         }

//         return hospital;
//     }

//     // ───────────────── GET HOSPITAL BY HOSPITAL ID ─────────────────

//     public Hospital getHospitalById(String hospitalId) {

//         return hospitalRepo
//                 .findByHospitalId(hospitalId)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found"
//                         ));
//     }

//     // ───────────────── GET HOSPITAL BY EMAIL ─────────────────

//     public Hospital getHospitalByEmail(String email) {

//         return hospitalRepo
//                 .findByEmail(email)
//                 .orElseThrow(() ->
//                         new RuntimeException(
//                                 "Hospital not found with email: "
//                                         + email
//                         ));
//     }

//     // ───────────────── GENERATE UNIQUE HOSPITAL ID ─────────────────

//     private static final String CHARS =
//             "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

//     private static final SecureRandom RANDOM =
//             new SecureRandom();

//     private String generateUniqueHospitalId() {

//         String id;

//         do {

//             StringBuilder sb = new StringBuilder("HSP-");

//             for (int i = 0; i < 6; i++) {

//                 sb.append(
//                         CHARS.charAt(
//                                 RANDOM.nextInt(CHARS.length())
//                         )
//                 );
//             }

//             id = sb.toString();

//         } while (hospitalRepo.existsByHospitalId(id));

//         return id;
//     }
// }   





























// package com.medique.medique.service;

// import com.medique.medique.dto.HospitalRegisterRequest;
// import com.medique.medique.entity.Hospital;
// import com.medique.medique.entity.HospitalStatus;
// import com.medique.medique.repository.HospitalRepository;

// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import java.security.SecureRandom;
// import java.util.List;
// import java.util.Map;

// @Service
// public class HospitalService {

//     private final HospitalRepository hospitalRepo;
//     private final PasswordEncoder passwordEncoder;

//     public HospitalService(HospitalRepository hospitalRepo, PasswordEncoder passwordEncoder) {
//         this.hospitalRepo = hospitalRepo;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // ───────────────── UPDATE HOSPITAL PROFILE (NEW) ─────────────────
//     // This method handles the updates from the Staff Profile screen
//     public Hospital updateHospitalProfile(String hospitalId, Map<String, Object> updates) {
//         Hospital hospital = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));

//         if (updates.containsKey("name")) hospital.setName((String) updates.get("name"));
//         if (updates.containsKey("phone")) hospital.setPhone((String) updates.get("phone"));
//         if (updates.containsKey("address")) hospital.setAddress((String) updates.get("address"));
//         if (updates.containsKey("city")) hospital.setCity((String) updates.get("city"));
//         if (updates.containsKey("imageUrl")) hospital.setImageUrl((String) updates.get("imageUrl"));
        
//         // Handle the new staff-specific fields
//         if (updates.containsKey("openingTime")) hospital.setOpeningTime((String) updates.get("openingTime"));
//         if (updates.containsKey("closingTime")) hospital.setClosingTime((String) updates.get("closingTime"));
//         if (updates.containsKey("description")) hospital.setDescription((String) updates.get("description"));

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── REGISTER HOSPITAL ─────────────────
//     public Hospital register(HospitalRegisterRequest req) {
//         if (req.getName() == null || req.getName().isBlank()) throw new RuntimeException("Hospital name is required.");
//         if (req.getEmail() == null || req.getEmail().isBlank()) throw new RuntimeException("Email is required.");
//         if (req.getPassword() == null || req.getPassword().length() < 6) throw new RuntimeException("Password must be at least 6 characters.");
//         if (req.getPhone() == null || req.getPhone().isBlank()) throw new RuntimeException("Phone number is required.");
//         if (req.getLicenseNumber() == null || req.getLicenseNumber().isBlank()) throw new RuntimeException("License number is required.");
//         if (hospitalRepo.existsByEmail(req.getEmail())) throw new RuntimeException("Email already registered.");

//         Hospital hospital = new Hospital();
//         hospital.setHospitalId(generateUniqueHospitalId());
//         hospital.setName(req.getName());
//         hospital.setOwnerName(req.getOwnerName());
//         hospital.setEmail(req.getEmail());
//         hospital.setPhone(req.getPhone());
//         hospital.setPassword(passwordEncoder.encode(req.getPassword()));
//         hospital.setType(req.getType());
//         hospital.setAddress(req.getAddress());
//         hospital.setCity(req.getCity());
//         hospital.setRegistrationNumber(req.getRegistrationNumber());
//         hospital.setLicenseNumber(req.getLicenseNumber());
//         hospital.setDepartments(req.getDepartments());
//         hospital.setNumberOfDoctors(req.getNumberOfDoctors());
//         hospital.setImageUrl(req.getImageUrl());
//         hospital.setDocumentUrls(req.getDocumentUrls());
//         hospital.setStatus(HospitalStatus.PENDING);

//         return hospitalRepo.save(hospital);
//     }

//     // ───────────────── AUTH & FETCH LOGIC ─────────────────

//     public Hospital loginStaff(String hospitalId, String email, String password) {
//         Hospital hospital = hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Invalid Hospital ID."));

//         if (!hospital.getEmail().equalsIgnoreCase(email)) throw new RuntimeException("Email does not match this Hospital ID.");
//         if (!passwordEncoder.matches(password, hospital.getPassword())) throw new RuntimeException("Incorrect password.");
//         if (hospital.getStatus() == HospitalStatus.PENDING) throw new RuntimeException("Your hospital is still pending admin approval.");
//         if (hospital.getStatus() == HospitalStatus.REJECTED) throw new RuntimeException("Your hospital registration was rejected.");

//         return hospital;
//     }

//     public Hospital approve(String hospitalId) {
//         Hospital hospital = getHospitalById(hospitalId);
//         hospital.setStatus(HospitalStatus.APPROVED);
//         return hospitalRepo.save(hospital);
//     }

//     public Hospital reject(String hospitalId) {
//         Hospital hospital = getHospitalById(hospitalId);
//         hospital.setStatus(HospitalStatus.REJECTED);
//         return hospitalRepo.save(hospital);
//     }

//     public List<Hospital> getPending() { return hospitalRepo.findByStatus(HospitalStatus.PENDING); }
//     public List<Hospital> getApproved() { return hospitalRepo.findByStatus(HospitalStatus.APPROVED); }
//     public List<Hospital> getAll() { return hospitalRepo.findAll(); }

//     public Hospital getHospitalById(String hospitalId) {
//         return hospitalRepo.findByHospitalId(hospitalId)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found"));
//     }

//     public Hospital getHospitalByEmail(String email) {
//         return hospitalRepo.findByEmail(email)
//                 .orElseThrow(() -> new RuntimeException("Hospital not found with email: " + email));
//     }

//     // ───────────────── ID GENERATION ─────────────────

//     private static final String CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     private static final SecureRandom RANDOM = new SecureRandom();

//     private String generateUniqueHospitalId() {
//         String id;
//         do {
//             StringBuilder sb = new StringBuilder("HSP-");
//             for (int i = 0; i < 6; i++) {
//                 sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
//             }
//             id = sb.toString();
//         } while (hospitalRepo.existsByHospitalId(id));
//         return id;
//     }
// }  




























package com.medique.medique.service;

import com.medique.medique.dto.HospitalRegisterRequest;
import com.medique.medique.entity.Hospital;
import com.medique.medique.entity.HospitalStatus;
import com.medique.medique.repository.HospitalRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Map;

@Service
public class HospitalService {

    private final HospitalRepository hospitalRepo;
    private final PasswordEncoder passwordEncoder;

    public HospitalService(HospitalRepository hospitalRepo, PasswordEncoder passwordEncoder) {
        this.hospitalRepo = hospitalRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Hospital updateHospitalProfile(String hospitalId, Map<String, Object> updates) {
        Hospital hospital = hospitalRepo.findByHospitalId(hospitalId)
                .orElseThrow(() -> new RuntimeException("Hospital not found: " + hospitalId));

        // Existing profile fields
        if (updates.containsKey("name"))        hospital.setName((String) updates.get("name"));
        if (updates.containsKey("phone"))       hospital.setPhone((String) updates.get("phone"));
        if (updates.containsKey("address"))     hospital.setAddress((String) updates.get("address"));
        if (updates.containsKey("city"))        hospital.setCity((String) updates.get("city"));
        if (updates.containsKey("imageUrl"))    hospital.setImageUrl((String) updates.get("imageUrl"));
        if (updates.containsKey("openingTime")) hospital.setOpeningTime((String) updates.get("openingTime"));
        if (updates.containsKey("closingTime")) hospital.setClosingTime((String) updates.get("closingTime"));
        if (updates.containsKey("description")) hospital.setDescription((String) updates.get("description"));

        // ── Payment / Bank fields ──────────────────────────────────────────
        if (updates.containsKey("upiId"))             hospital.setUpiId((String) updates.get("upiId"));
        if (updates.containsKey("bankAccountName"))   hospital.setBankAccountName((String) updates.get("bankAccountName"));
        if (updates.containsKey("bankAccountNumber")) hospital.setBankAccountNumber((String) updates.get("bankAccountNumber"));
        if (updates.containsKey("bankIfsc"))          hospital.setBankIfsc((String) updates.get("bankIfsc"));
        if (updates.containsKey("bankName"))          hospital.setBankName((String) updates.get("bankName"));
        // ──────────────────────────────────────────────────────────────────

        return hospitalRepo.save(hospital);
    }

    public Hospital register(HospitalRegisterRequest req) {
        if (req.getName() == null || req.getName().isBlank())           throw new RuntimeException("Hospital name is required.");
        if (req.getEmail() == null || req.getEmail().isBlank())         throw new RuntimeException("Email is required.");
        if (req.getPassword() == null || req.getPassword().length() < 6) throw new RuntimeException("Password must be at least 6 characters.");
        if (req.getPhone() == null || req.getPhone().isBlank())         throw new RuntimeException("Phone number is required.");
        if (req.getLicenseNumber() == null || req.getLicenseNumber().isBlank()) throw new RuntimeException("License number is required.");
        if (hospitalRepo.existsByEmail(req.getEmail()))                 throw new RuntimeException("Email already registered.");

        Hospital hospital = new Hospital();
        hospital.setHospitalId(generateUniqueHospitalId());
        hospital.setName(req.getName());
        hospital.setOwnerName(req.getOwnerName());
        hospital.setEmail(req.getEmail());
        hospital.setPhone(req.getPhone());
        hospital.setPassword(passwordEncoder.encode(req.getPassword()));
        hospital.setType(req.getType());
        hospital.setAddress(req.getAddress());
        hospital.setCity(req.getCity());
        hospital.setRegistrationNumber(req.getRegistrationNumber());
        hospital.setLicenseNumber(req.getLicenseNumber());
        hospital.setDepartments(req.getDepartments());
        hospital.setNumberOfDoctors(req.getNumberOfDoctors());
        hospital.setImageUrl(req.getImageUrl());
        hospital.setDocumentUrls(req.getDocumentUrls());
        hospital.setStatus(HospitalStatus.PENDING);

        // ── Save bank/payment details if provided ──────────────────────────
        if (req.getUpiId() != null)             hospital.setUpiId(req.getUpiId());
        if (req.getBankAccountName() != null)   hospital.setBankAccountName(req.getBankAccountName());
        if (req.getBankAccountNumber() != null) hospital.setBankAccountNumber(req.getBankAccountNumber());
        if (req.getBankIfsc() != null)          hospital.setBankIfsc(req.getBankIfsc());
        if (req.getBankName() != null)          hospital.setBankName(req.getBankName());
        // ──────────────────────────────────────────────────────────────────

        return hospitalRepo.save(hospital);
    }

    public Hospital loginStaff(String hospitalId, String email, String password) {
        Hospital hospital = hospitalRepo.findByHospitalId(hospitalId)
                .orElseThrow(() -> new RuntimeException("Invalid Hospital ID."));

        if (!hospital.getEmail().equalsIgnoreCase(email)) throw new RuntimeException("Email does not match this Hospital ID.");
        if (!passwordEncoder.matches(password, hospital.getPassword())) throw new RuntimeException("Incorrect password.");
        if (hospital.getStatus() == HospitalStatus.PENDING) throw new RuntimeException("Your hospital is still pending admin approval.");
        if (hospital.getStatus() == HospitalStatus.REJECTED) throw new RuntimeException("Your hospital registration was rejected.");

        return hospital;
    }

    public Hospital approve(String hospitalId) {
        Hospital hospital = getHospitalById(hospitalId);
        hospital.setStatus(HospitalStatus.APPROVED);
        return hospitalRepo.save(hospital);
    }

    public Hospital reject(String hospitalId) {
        Hospital hospital = getHospitalById(hospitalId);
        hospital.setStatus(HospitalStatus.REJECTED);
        return hospitalRepo.save(hospital);
    }

    public List<Hospital> getPending()  { return hospitalRepo.findByStatus(HospitalStatus.PENDING); }
    public List<Hospital> getApproved() { return hospitalRepo.findByStatus(HospitalStatus.APPROVED); }
    public List<Hospital> getAll()      { return hospitalRepo.findAll(); }

    public Hospital getHospitalById(String hospitalId) {
        return hospitalRepo.findByHospitalId(hospitalId)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));
    }

    public Hospital getHospitalByEmail(String email) {
        return hospitalRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Hospital not found with email: " + email));
    }

    public boolean isPhoneRegistered(String phone) {
        // Try exact match first, then alternate formats
        if (hospitalRepo.existsByPhone(phone)) return true;
        // If phone starts with +91, also try without prefix
        if (phone.startsWith("+91")) {
            String raw = phone.substring(3);
            if (hospitalRepo.existsByPhone(raw)) return true;
        }
        // If phone is raw digits, also try with +91 prefix
        if (!phone.startsWith("+")) {
            if (hospitalRepo.existsByPhone("+91" + phone)) return true;
        }
        return false;
    }

    public void resetPassword(String phone, String newPassword) {
        // Try exact match first, then alternate formats
        Hospital hospital = hospitalRepo.findByPhone(phone)
                .or(() -> phone.startsWith("+91") ? hospitalRepo.findByPhone(phone.substring(3)) : java.util.Optional.empty())
                .or(() -> !phone.startsWith("+") ? hospitalRepo.findByPhone("+91" + phone) : java.util.Optional.empty())
                .orElseThrow(() -> new RuntimeException("Hospital with this phone number not found."));
        hospital.setPassword(passwordEncoder.encode(newPassword));
        hospitalRepo.save(hospital);
    }

    private static final String CHARS  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    private String generateUniqueHospitalId() {
        String id;
        do {
            StringBuilder sb = new StringBuilder("HSP-");
            for (int i = 0; i < 6; i++) {
                sb.append(CHARS.charAt(RANDOM.nextInt(CHARS.length())));
            }
            id = sb.toString();
        } while (hospitalRepo.existsByHospitalId(id));
        return id;
    }
}