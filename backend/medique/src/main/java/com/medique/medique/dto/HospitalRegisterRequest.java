






package com.medique.medique.dto;

public class HospitalRegisterRequest {

    private String name;
    private String ownerName;
    private String phone;
    private String email;
    private String password;
    private String type;
    private String address;
    private String city;
    private String registrationNumber;
    private String licenseNumber;
    private String departments;
    private Integer numberOfDoctors;
    private String imageUrl;

    // ── Getters & Setters ────────────────────────────────────────────────────

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String r) { this.registrationNumber = r; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String l) { this.licenseNumber = l; }

    public String getDepartments() { return departments; }
    public void setDepartments(String departments) { this.departments = departments; }

    public Integer getNumberOfDoctors() { return numberOfDoctors; }
    public void setNumberOfDoctors(Integer n) { this.numberOfDoctors = n; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}