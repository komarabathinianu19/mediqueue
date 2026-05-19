package com.medique.medique.service;

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioOTPService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.verify.service.sid}")
    private String verifyServiceSid;

    @PostConstruct
    public void initTwilio() {
        // Initialize Twilio SDK on startup
        if (accountSid != null && !accountSid.startsWith("ACxxxxxxxx")) {
            Twilio.init(accountSid, authToken);
        } else {
            // Fallback for placeholder values to prevent runtime boot crashes
            Twilio.init("AC00000000000000000000000000000000", "00000000000000000000000000000000");
        }
    }

    /**
     * Sends an OTP code to a phone number using Twilio Verify
     * 
     * @param phone Phone number in E.164 format (e.g. +91XXXXXXXXXX)
     */
    public boolean sendOTP(String phone) {
        try {
            // If using placeholders, bypass API requests to Twilio and simulate success for
            // initial testing
            if (accountSid != null && accountSid.startsWith("ACxxxxxxxx")) {
                System.out.println("[DEV OTP] Twilio credentials are placeholders. Simulating OTP send to: " + phone);
                return true;
            }

            Verification verification = Verification.creator(
                    verifyServiceSid,
                    phone,
                    "sms").create();

            return "pending".equals(verification.getStatus());
        } catch (Exception e) {
            throw new RuntimeException("Failed to send OTP via Twilio: " + e.getMessage());
        }
    }

    /**
     * Verifies the OTP code supplied by the user
     * 
     * @param phone Phone number in E.164 format
     * @param code  The 4 to 6 digit code entered by the user
     * @return true if approved, false otherwise
     */
    public boolean verifyOTP(String phone, String code) {
        try {
            // If using placeholders or a dev fallback, allow 123456 as a default mock code
            if (accountSid != null && accountSid.startsWith("ACxxxxxxxx")) {
                System.out.println("[DEV OTP] Twilio credentials are placeholders. Mock code validation for: " + phone);
                return "123456".equals(code) || "1234".equals(code);
            }

            VerificationCheck check = VerificationCheck.creator(verifyServiceSid)
                    .setTo(phone)
                    .setCode(code)
                    .create();

            return "approved".equals(check.getStatus());
        } catch (Exception e) {
            throw new RuntimeException("OTP verification error: " + e.getMessage());
        }
    }
}
