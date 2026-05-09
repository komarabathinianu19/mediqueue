package com.medique.medique.dto;

import lombok.Data;

@Data
public class AuthRequest {
    private String identifier; // email or phone
    private String password;
}