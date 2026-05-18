// package com.medique.medique.dto;

// import lombok.Data;

// @Data
// public class AuthRequest {
//     private String identifier; // email or phone
//     private String password;
// }  























package com.medique.medique.dto;

public class AuthRequest {
    private String phone;     // frontend sends "phone"
    private String password;

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    // Also support "identifier" field name for backward compatibility
    public String getIdentifier() { return phone; }
    public void setIdentifier(String identifier) { this.phone = identifier; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
