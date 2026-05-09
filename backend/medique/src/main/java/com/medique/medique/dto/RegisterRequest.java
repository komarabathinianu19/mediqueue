package com.medique.medique.dto;


import com.medique.medique.entity.User.Role;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String phone;
    private String password;
    private Role role;

    // Patient profile fields (optional, used when role = PATIENT)
    private String fullName;
    private String age;
    private String gender;
    private String bloodGroup;
    private String city;
    private String allergies;
    private String medicalNotes;
    private String emergencyContact;
}