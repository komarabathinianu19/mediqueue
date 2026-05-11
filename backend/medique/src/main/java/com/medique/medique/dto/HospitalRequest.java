
package com.medique.medique.dto;

import lombok.Data;

@Data
public class HospitalRequest {
    private String name;
    private String ownerName;
    private String phone;
    private String email;
    private String hospitalType;
    private String address;
    private String city;
    private String imageUrl;
    private String registrationNo;      // ← frontend must send "registrationNo"
    private String licenseNo;           // ← frontend must send "licenseNo"
    private String departments;
    private Integer doctorCount;
}