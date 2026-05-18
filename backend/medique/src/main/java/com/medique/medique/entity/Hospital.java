




// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;
// import java.util.List;
// import com.fasterxml.jackson.annotation.JsonManagedReference;

// @Entity
// @Table(name = "hospitals")
// public class Hospital {


// @JsonManagedReference
//     @OneToMany(fetch = FetchType.EAGER)
// @JoinColumn(name = "hospital_Id", referencedColumnName = "hospitalId", insertable = false, updatable = false)
// private List<Doctor> doctorList;

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(unique = true, nullable = false)
//     private String hospitalId;

//     @Column(nullable = false)
//     private String name;

//     private String ownerName;

//     @Column(unique = true)
//     private String email;

//     private String password;
//     private String phone;
//     private String type;
//     private String address;
//     private String city;
//     private String registrationNumber;
//     private String licenseNumber;
//     private String departments;
//     private Integer numberOfDoctors;
//     private String imageUrl;

//     // ── NEW FIELDS FOR STAFF PROFILE ──
//     private String openingTime; // e.g., "09:00 AM"
//     private String closingTime; // e.g., "09:00 PM"
    
//     @Column(columnDefinition = "TEXT")
//     private String description; // For the "About" section

//     @Enumerated(EnumType.STRING)
//     private HospitalStatus status = HospitalStatus.PENDING;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // ── Existing Getters & Setters ────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getOwnerName() { return ownerName; }
//     public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }

//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }

//     public String getType() { return type; }
//     public void setType(String type) { this.type = type; }

//     public String getAddress() { return address; }
//     public void setAddress(String address) { this.address = address; }

//     public String getCity() { return city; }
//     public void setCity(String city) { this.city = city; }

//     public String getRegistrationNumber() { return registrationNumber; }
//     public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

//     public String getLicenseNumber() { return licenseNumber; }
//     public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

//     public String getDepartments() { return departments; }
//     public void setDepartments(String departments) { this.departments = departments; }

//     public Integer getNumberOfDoctors() { return numberOfDoctors; }
//     public void setNumberOfDoctors(Integer numberOfDoctors) { this.numberOfDoctors = numberOfDoctors; }

//     public String getImageUrl() { return imageUrl; }
//     public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

//     public HospitalStatus getStatus() { return status; }
//     public void setStatus(HospitalStatus status) { this.status = status; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

//     // ── NEW Getters & Setters ──

//     public String getOpeningTime() { return openingTime; }
//     public void setOpeningTime(String openingTime) { this.openingTime = openingTime; }

//     public String getClosingTime() { return closingTime; }
//     public void setClosingTime(String closingTime) { this.closingTime = closingTime; }

//     public String getDescription() { return description; }
//     public void setDescription(String description) { this.description = description; }

//     // Add Getter and Setter
// public List<Doctor> getDoctorList() { return doctorList; }
// public void setDoctorList(List<Doctor> doctorList) { this.doctorList = doctorList; }
// }  
































// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;

// @Entity
// @Table(name = "hospitals")
// public class Hospital {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(unique = true, nullable = false)
//     private String hospitalId;

//     @Column(nullable = false)
//     private String name;

//     private String ownerName;

//     @Column(unique = true)
//     private String email;

//     private String password;
//     private String phone;
//     private String type;
//     private String address;
//     private String city;
//     private String registrationNumber;
//     private String licenseNumber;
//     private String departments;
//     private Integer numberOfDoctors;
//     private String imageUrl;

//     @Enumerated(EnumType.STRING)
//     private HospitalStatus status = HospitalStatus.PENDING;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // ── Getters & Setters ────────────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getOwnerName() { return ownerName; }
//     public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }

//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }

//     public String getType() { return type; }
//     public void setType(String type) { this.type = type; }

//     public String getAddress() { return address; }
//     public void setAddress(String address) { this.address = address; }

//     public String getCity() { return city; }
//     public void setCity(String city) { this.city = city; }

//     public String getRegistrationNumber() { return registrationNumber; }
//     public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

//     public String getLicenseNumber() { return licenseNumber; }
//     public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

//     public String getDepartments() { return departments; }
//     public void setDepartments(String departments) { this.departments = departments; }

//     public Integer getNumberOfDoctors() { return numberOfDoctors; }
//     public void setNumberOfDoctors(Integer numberOfDoctors) { this.numberOfDoctors = numberOfDoctors; }

//     public String getImageUrl() { return imageUrl; }
//     public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

//     public HospitalStatus getStatus() { return status; }
//     public void setStatus(HospitalStatus status) { this.status = status; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
// }   





















// package com.medique.medique.entity;

// import jakarta.persistence.*;
// import java.time.LocalDateTime;
// import java.util.List;
// import com.fasterxml.jackson.annotation.JsonManagedReference;

// @Entity
// @Table(name = "hospitals")
// public class Hospital {


// @JsonManagedReference
//     @OneToMany(fetch = FetchType.EAGER)
// @JoinColumn(name = "hospital_Id", referencedColumnName = "hospitalId", insertable = false, updatable = false)
// private List<Doctor> doctorList;

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(unique = true, nullable = false)
//     private String hospitalId;

//     @Column(nullable = false)
//     private String name;

//     private String ownerName;

//     @Column(unique = true)
//     private String email;

//     private String password;
//     private String phone;
//     private String type;
//     private String address;
//     private String city;
//     private String registrationNumber;
//     private String licenseNumber;
//     private String departments;
//     private Integer numberOfDoctors;

//     @Column(columnDefinition = "LONGTEXT")
//     private String imageUrl;

//     @Column(columnDefinition = "LONGTEXT")
//     private String documentUrls; // JSON array of base64 strings or public URLs

//     // ── NEW FIELDS FOR STAFF PROFILE ──
//     private String openingTime; // e.g., "09:00 AM"
//     private String closingTime; // e.g., "09:00 PM"
    
//     @Column(columnDefinition = "TEXT")
//     private String description; // For the "About" section

//     @Enumerated(EnumType.STRING)
//     private HospitalStatus status = HospitalStatus.PENDING;

//     private LocalDateTime createdAt = LocalDateTime.now();

//     // ── Existing Getters & Setters ────────────────────────────────────────────

//     public Long getId() { return id; }
//     public void setId(Long id) { this.id = id; }

//     public String getHospitalId() { return hospitalId; }
//     public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }

//     public String getOwnerName() { return ownerName; }
//     public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }

//     public String getPhone() { return phone; }
//     public void setPhone(String phone) { this.phone = phone; }

//     public String getType() { return type; }
//     public void setType(String type) { this.type = type; }

//     public String getAddress() { return address; }
//     public void setAddress(String address) { this.address = address; }

//     public String getCity() { return city; }
//     public void setCity(String city) { this.city = city; }

//     public String getRegistrationNumber() { return registrationNumber; }
//     public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

//     public String getLicenseNumber() { return licenseNumber; }
//     public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

//     public String getDepartments() { return departments; }
//     public void setDepartments(String departments) { this.departments = departments; }

//     public Integer getNumberOfDoctors() { return numberOfDoctors; }
//     public void setNumberOfDoctors(Integer numberOfDoctors) { this.numberOfDoctors = numberOfDoctors; }

//     public String getImageUrl() { return imageUrl; }
//     public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

//     public String getDocumentUrls() { return documentUrls; }
//     public void setDocumentUrls(String documentUrls) { this.documentUrls = documentUrls; }

//     public HospitalStatus getStatus() { return status; }
//     public void setStatus(HospitalStatus status) { this.status = status; }

//     public LocalDateTime getCreatedAt() { return createdAt; }
//     public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

//     // ── NEW Getters & Setters ──

//     public String getOpeningTime() { return openingTime; }
//     public void setOpeningTime(String openingTime) { this.openingTime = openingTime; }

//     public String getClosingTime() { return closingTime; }
//     public void setClosingTime(String closingTime) { this.closingTime = closingTime; }

//     public String getDescription() { return description; }
//     public void setDescription(String description) { this.description = description; }

//     // Add Getter and Setter
// public List<Doctor> getDoctorList() { return doctorList; }
// public void setDoctorList(List<Doctor> doctorList) { this.doctorList = doctorList; }
// }























package com.medique.medique.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "hospitals")
public class Hospital {

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_Id", referencedColumnName = "hospitalId", insertable = false, updatable = false)
    private List<Doctor> doctorList;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String hospitalId;

    @Column(nullable = false)
    private String name;

    private String ownerName;

    @Column(unique = true)
    private String email;

    private String password;
    private String phone;
    private String type;
    private String address;
    private String city;
    private String registrationNumber;
    private String licenseNumber;
    private String departments;
    private Integer numberOfDoctors;

    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;

    @Column(columnDefinition = "LONGTEXT")
    private String documentUrls; // JSON array of base64 strings or public URLs

    // ── STAFF PROFILE FIELDS ──
    private String openingTime;   // e.g. "09:00 AM"
    private String closingTime;   // e.g. "09:00 PM"

    @Column(columnDefinition = "TEXT")
    private String description;   // About section

    // ── PAYMENT / BANK DETAILS ──────────────────────────────────────────────
    private String upiId;             // e.g. hospital@upi  (for manual transfers)
    private String bankAccountName;   // Account holder name
    private String bankAccountNumber; // Bank account number
    private String bankIfsc;          // IFSC code e.g. SBIN0001234
    private String bankName;          // Bank name e.g. SBI, HDFC
    // For Razorpay Route (future): each hospital's linked account ID
    private String razorpayLinkedAccountId;
    // ────────────────────────────────────────────────────────────────────────

    @Enumerated(EnumType.STRING)
    private HospitalStatus status = HospitalStatus.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getDepartments() { return departments; }
    public void setDepartments(String departments) { this.departments = departments; }

    public Integer getNumberOfDoctors() { return numberOfDoctors; }
    public void setNumberOfDoctors(Integer numberOfDoctors) { this.numberOfDoctors = numberOfDoctors; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getDocumentUrls() { return documentUrls; }
    public void setDocumentUrls(String documentUrls) { this.documentUrls = documentUrls; }

    public HospitalStatus getStatus() { return status; }
    public void setStatus(HospitalStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getOpeningTime() { return openingTime; }
    public void setOpeningTime(String openingTime) { this.openingTime = openingTime; }

    public String getClosingTime() { return closingTime; }
    public void setClosingTime(String closingTime) { this.closingTime = closingTime; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    // ── Payment getters/setters ──
    public String getUpiId() { return upiId; }
    public void setUpiId(String upiId) { this.upiId = upiId; }

    public String getBankAccountName() { return bankAccountName; }
    public void setBankAccountName(String bankAccountName) { this.bankAccountName = bankAccountName; }

    public String getBankAccountNumber() { return bankAccountNumber; }
    public void setBankAccountNumber(String bankAccountNumber) { this.bankAccountNumber = bankAccountNumber; }

    public String getBankIfsc() { return bankIfsc; }
    public void setBankIfsc(String bankIfsc) { this.bankIfsc = bankIfsc; }

    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }

    public String getRazorpayLinkedAccountId() { return razorpayLinkedAccountId; }
    public void setRazorpayLinkedAccountId(String razorpayLinkedAccountId) {
        this.razorpayLinkedAccountId = razorpayLinkedAccountId;
    }

    // DoctorList
    public List<Doctor> getDoctorList() { return doctorList; }
    public void setDoctorList(List<Doctor> doctorList) { this.doctorList = doctorList; }
}