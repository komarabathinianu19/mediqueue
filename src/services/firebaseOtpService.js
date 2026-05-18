// src/services/firebaseOtpService.js
// Firebase Phone OTP via REST API — works with Expo Go (no native modules needed)

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Paste your Firebase Web API Key here
// Get it from: Firebase Console → Project Settings → General → Web API Key
// ─────────────────────────────────────────────────────────────────────────────
const FIREBASE_WEB_API_KEY = "AIzaSyAZb5z3k8gW5xS0mWqc2rii8fRACszfnmI"; // ← paste your key here

// ─────────────────────────────────────────────────────────────────────────────
// sendFirebaseOtp
// Sends OTP SMS to the given phone number via Firebase REST API.
// Returns sessionInfo string (needed to verify OTP later).
// ─────────────────────────────────────────────────────────────────────────────
export const sendFirebaseOtp = async (phone) => {
  // Ensure international format e.g. +91XXXXXXXXXX
  const phoneNumber = phone.trim().startsWith("+")
    ? phone.trim()
    : "+91" + phone.trim();

  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:sendVerificationCode?key=${FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phoneNumber,
        recaptchaToken: "ignored", // Firebase accepts this for mobile REST calls
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    // Map Firebase error codes to readable messages
    const code = data?.error?.message || "";
    if (code.includes("TOO_MANY_ATTEMPTS_TRY_LATER"))
      throw new Error("Too many OTP requests. Please wait a few minutes and try again.");
    if (code.includes("INVALID_PHONE_NUMBER"))
      throw new Error("Invalid phone number. Please use +91XXXXXXXXXX format.");
    if (code.includes("QUOTA_EXCEEDED"))
      throw new Error("SMS quota exceeded. Please try again later.");
    throw new Error(data?.error?.message || "Failed to send OTP.");
  }

  // sessionInfo is required to verify the OTP — save and pass it to verifyFirebaseOtp
  return data.sessionInfo;
};

// ─────────────────────────────────────────────────────────────────────────────
// verifyFirebaseOtp
// Verifies the OTP entered by user against Firebase.
// sessionInfo comes from sendFirebaseOtp().
// Returns true if OTP is correct, throws error if wrong/expired.
// ─────────────────────────────────────────────────────────────────────────────
export const verifyFirebaseOtp = async (sessionInfo, otp) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPhoneNumber?key=${FIREBASE_WEB_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionInfo,
        code: otp.trim(),
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    const code = data?.error?.message || "";
    if (code.includes("INVALID_CODE"))
      throw new Error("Invalid OTP. Please check and try again.");
    if (code.includes("SESSION_EXPIRED"))
      throw new Error("OTP has expired. Please request a new one.");
    if (code.includes("CODE_EXPIRED"))
      throw new Error("OTP has expired. Please request a new one.");
    throw new Error(data?.error?.message || "OTP verification failed.");
  }

  // OTP is correct — Firebase returns idToken confirming phone ownership
  return true;
};