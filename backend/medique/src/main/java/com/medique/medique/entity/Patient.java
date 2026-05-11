


package com.medique.medique.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String city;
    private String allergies;
    private String medicalNotes;
    private String emergencyContact;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    // ── Getters & Setters ────────────────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public String getMedicalNotes() { return medicalNotes; }
    public void setMedicalNotes(String medicalNotes) { this.medicalNotes = medicalNotes; }

    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    // ── Builder (replaces Lombok @Builder) ───────────────────────────────────

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private final Patient p = new Patient();

        public Builder id(Long id) { p.id = id; return this; }
        public Builder fullName(String v) { p.fullName = v; return this; }
        public Builder email(String v) { p.email = v; return this; }
        public Builder phone(String v) { p.phone = v; return this; }
        public Builder age(Integer v) { p.age = v; return this; }
        public Builder gender(String v) { p.gender = v; return this; }
        public Builder bloodGroup(String v) { p.bloodGroup = v; return this; }
        public Builder city(String v) { p.city = v; return this; }
        public Builder allergies(String v) { p.allergies = v; return this; }
        public Builder medicalNotes(String v) { p.medicalNotes = v; return this; }
        public Builder emergencyContact(String v) { p.emergencyContact = v; return this; }
        public Builder user(User v) { p.user = v; return this; }
        public Patient build() { return p; }
    }
}