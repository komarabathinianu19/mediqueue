package com.medique.medique.dto;

public class HospitalLoginRequest {

    private String hospitalId;
    private String email;
    private String password;

    // ── Getters & Setters ────────────────────────────────────────────────────

    public String getHospitalId() { return hospitalId; }
    public void setHospitalId(String hospitalId) { this.hospitalId = hospitalId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}