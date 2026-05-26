

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueue } from "../../context/QueueContext";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { loginUser, registerUser, resetUserPassword, checkPhoneRegistered, sendBackendOtp } from "../../services/apiService";

export default function PatientLoginScreen({ navigation }) {
  const { onUserLogin } = useQueue();
  const [screen, setScreen] = useState("login"); // login | register | forgot
  const [forgotStep, setForgotStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Holds the sessionInfo returned by Firebase after sending OTP
  const [otpSessionInfo, setOtpSessionInfo] = useState(null);

  // ── UNIFIED POPUP STATE ──────────────────────────────────────────────────
  const [popup, setPopup] = useState({
    visible: false,
    title: "",
    message: "",
    type: "",
  });

  const showPopup = (title, message, type = "error") =>
    setPopup({ visible: true, title, message, type });

  const closePopup = () => {
    const type = popup.type;
    setPopup({ visible: false, title: "", message: "", type: "" });

    if (type === "register") {
      setScreen("login");
      setLoginForm({ phone: registerForm.phone, password: "" });
      setRegisterForm({
        name: "", phone: "", age: "", gender: "", bloodGroup: "",
        city: "", allergies: "", medicalNotes: "",
        password: "", confirmPassword: "",
      });
    }

    if (type === "reset") {
      setScreen("login");
      setForgotStep(1);
      setOtpSessionInfo(null);
      setLoginForm({ phone: forgotForm.phone, password: "" });
      setForgotForm({ phone: "", otp: "", newPassword: "", confirmPassword: "" });
    }
  };

  const [loginForm, setLoginForm] = useState({ phone: "", password: "" });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    city: "",
    allergies: "",
    medicalNotes: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotForm, setForgotForm] = useState({
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateLogin    = (key, value) => setLoginForm((p) => ({ ...p, [key]: value }));
  const updateRegister = (key, value) => setRegisterForm((p) => ({ ...p, [key]: value }));
  const updateForgot   = (key, value) => setForgotForm((p) => ({ ...p, [key]: value }));

  const goToLogin = () => {
    setScreen("login");
    setForgotStep(1);
    setOtpSessionInfo(null);
  };

  // ── LOGIN ────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!loginForm.phone.trim()) {
      showPopup("Missing Phone", "Please enter your phone number.");
      return;
    }
    if (!loginForm.password.trim()) {
      showPopup("Missing Password", "Please enter your password.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser(loginForm.phone.trim(), loginForm.password);

      if (data.role !== "PATIENT") {
        showPopup("Access Denied", "This login is only for patients.");
        return;
      }

      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
        await onUserLogin(data.token);
      }

      navigation.replace("PatientTabs");
    } catch (err) {
      showPopup("Login Failed", "Invalid phone number or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── REGISTER ─────────────────────────────────────────────────────────────
  const handleRegister = async () => {
    if (!registerForm.name.trim())             return showPopup("Missing Name", "Please enter patient name.");
    if (!registerForm.phone.trim())            return showPopup("Missing Phone", "Please enter phone number.");
    if (!registerForm.age.trim())              return showPopup("Missing Age", "Please enter age.");
    if (!registerForm.gender.trim())           return showPopup("Missing Gender", "Please enter gender.");
    if (!registerForm.city.trim())             return showPopup("Missing City", "Please enter city.");
    if (!registerForm.password.trim())         return showPopup("Missing Password", "Please create a password.");
    if (registerForm.password.length < 6)      return showPopup("Weak Password", "Password must be at least 6 characters.");
    if (registerForm.password !== registerForm.confirmPassword)
      return showPopup("Password Mismatch", "Password and confirm password must match.");

    setLoading(true);
    try {
      await registerUser({
        name:         registerForm.name.trim(),
        phone:        registerForm.phone.trim(),
        age:          parseInt(registerForm.age, 10),
        gender:       registerForm.gender.trim(),
        bloodGroup:   registerForm.bloodGroup.trim(),
        city:         registerForm.city.trim(),
        allergies:    registerForm.allergies.trim(),
        medicalNotes: registerForm.medicalNotes.trim(),
        password:     registerForm.password,
        role:         "PATIENT",
      });
      showPopup(
        "Registration Successful",
        "Your patient account has been created successfully. Please login now.",
        "register"
      );
    } catch (err) {
      showPopup("Registration Failed", err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // // ── SEND OTP via Firebase REST (works in Expo Go) ────────────────────────
  // const sendOtp = async () => {
  //   if (!forgotForm.phone.trim()) {
  //     showPopup("Missing Phone", "Please enter your registered phone number.");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const sessionInfo = await sendFirebaseOtp(forgotForm.phone.trim());
  //     setOtpSessionInfo(sessionInfo);
  //     showPopup("OTP Sent", "A 6-digit OTP has been sent to your phone number.", "info");
  //     setForgotStep(2);
  //   } catch (err) {
  //     showPopup("Error", err.message || "Failed to send OTP. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }; 


  const sendOtp = async () => {
    if (!forgotForm.phone.trim()) {
      showPopup("Missing Phone", "Please enter your registered phone number.");
      return;
    }

    setLoading(true);
    try {
      const phoneNumber = forgotForm.phone.trim().startsWith("+")
        ? forgotForm.phone.trim()
        : "+91" + forgotForm.phone.trim();

      // ── Step 1: Send OTP through our secure Spring Boot backend ───────
      await sendBackendOtp(phoneNumber);
      
      showPopup("OTP Sent", "A 6-digit OTP has been sent to your phone number.", "info");
      setForgotStep(2);
    } catch (err) {
      if (err.message?.includes("not registered")) {
        showPopup("Not Registered", "This phone number is not registered. Please sign up first.");
      } else {
        showPopup("Error", err.message || "Failed to send OTP. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── VERIFY OTP + RESET PASSWORD ──────────────────────────────────────────
  const resetPassword = async () => {
    if (!forgotForm.otp.trim())             return showPopup("Missing OTP", "Please enter the OTP.");
    if (!forgotForm.newPassword.trim())     return showPopup("Missing Password", "Please enter new password.");
    if (forgotForm.newPassword.length < 6)  return showPopup("Weak Password", "Password must be at least 6 characters.");
    if (forgotForm.newPassword !== forgotForm.confirmPassword)
      return showPopup("Password Mismatch", "Passwords do not match.");

    setLoading(true);
    try {
      const phoneNumber = forgotForm.phone.trim().startsWith("+")
        ? forgotForm.phone.trim()
        : "+91" + forgotForm.phone.trim();

      // ── Step 2: Request backend to verify the OTP and reset password ────
      await resetUserPassword(phoneNumber, forgotForm.otp.trim(), forgotForm.newPassword);

      showPopup(
        "Password Reset Successful",
        "Your password has been reset. Please login with your new password.",
        "reset"
      );
    } catch (err) {
      showPopup("Error", err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── POPUP ICON & COLOR ───────────────────────────────────────────────────
  const popupIsSuccess = popup.type === "register" || popup.type === "reset";
  const popupIsInfo    = popup.type === "info";
  const popupIconName  = popupIsSuccess ? "checkmark-circle" : popupIsInfo ? "information-circle" : "alert-circle";
  const popupIconColor = popupIsSuccess ? "#22C55E" : popupIsInfo ? COLORS.primary : "#EF4444";

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <MotiView
          from={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1000 }}
          style={styles.logoBox}
        >
          <View style={styles.iconCircle}>
            <Ionicons
              name={
                screen === "login"
                  ? "person-circle-outline"
                  : screen === "register"
                  ? "medical-outline"
                  : "key-outline"
              }
              size={screen === "login" ? 72 : 46}
              color="#fff"
            />
          </View>
          <Text style={styles.logo}>MediQueue</Text>
          <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
        </MotiView>

        {/* ── LOGIN CARD ── */}
        {screen === "login" && (
          <MotiView
            key="login"
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 600 }}
            style={styles.card}
          >
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.sub}>Enter your details to access your account</Text>

            <InputField
              label="Phone Number"
              placeholder="+91 00000 00000"
              value={loginForm.phone}
              onChangeText={(v) => updateLogin("phone", v)}
              keyboardType="phone-pad"
              icon="call-outline"
            />
            <InputField
              label="Password"
              placeholder="••••••••"
              value={loginForm.password}
              onChangeText={(v) => updateLogin("password", v)}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <View style={styles.buttonBox}>
              {loading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
              ) : (
                <GradientButton title="Login" onPress={handleLogin} />
              )}
            </View>

            <Pressable
              style={styles.centerBtn}
              onPress={() => { setScreen("forgot"); setForgotStep(1); }}
            >
              <Text style={styles.linkText}>Forgot Password?</Text>
            </Pressable>

            <View style={styles.rowCenter}>
              <Text style={styles.normalText}>New patient?</Text>
              <Pressable onPress={() => setScreen("register")}>
                <Text style={styles.linkText}> Register Now</Text>
              </Pressable>
            </View>

            <Text style={styles.terms}>
              By continuing, you agree to our{" "}
              <Text style={{ fontWeight: "700" }}>Terms & Conditions</Text>
            </Text>
          </MotiView>
        )}

        {/* ── REGISTER CARD ── */}
        {screen === "register" && (
          <MotiView
            key="register"
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 600 }}
            style={styles.card}
          >
            <View style={styles.cardHeaderRow}>
              <Pressable style={styles.smallBackBtn} onPress={goToLogin}>
                <Ionicons name="chevron-back" size={22} color={COLORS.text} />
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Patient Registration</Text>
                <Text style={styles.sub}>Add patient details for hospital token booking</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Personal Details</Text>
            <InputField label="Full Name" placeholder="Enter patient name" value={registerForm.name} onChangeText={(v) => updateRegister("name", v)} icon="person-outline" />
            <InputField label="Phone Number" placeholder="+91 00000 00000" value={registerForm.phone} onChangeText={(v) => updateRegister("phone", v)} keyboardType="phone-pad" icon="call-outline" />
            <InputField label="Age" placeholder="Example: 28" value={registerForm.age} onChangeText={(v) => updateRegister("age", v)} keyboardType="number-pad" icon="calendar-outline" />
            <InputField label="Gender" placeholder="Male / Female / Other" value={registerForm.gender} onChangeText={(v) => updateRegister("gender", v)} icon="male-female-outline" />
            <InputField label="Blood Group" placeholder="Example: O+" value={registerForm.bloodGroup} onChangeText={(v) => updateRegister("bloodGroup", v)} icon="water-outline" />
            <InputField label="City" placeholder="Enter city" value={registerForm.city} onChangeText={(v) => updateRegister("city", v)} icon="location-outline" />

            <Text style={styles.sectionTitle}>Health Details</Text>
            <InputField label="Allergies" placeholder="Example: No known allergies" value={registerForm.allergies} onChangeText={(v) => updateRegister("allergies", v)} icon="medkit-outline" />
            <InputField label="Medical Notes" placeholder="Example: Regular OPD visitor" value={registerForm.medicalNotes} onChangeText={(v) => updateRegister("medicalNotes", v)} icon="document-text-outline" />

            <Text style={styles.sectionTitle}>Security</Text>
            <InputField label="Password" placeholder="Create password" value={registerForm.password} onChangeText={(v) => updateRegister("password", v)} secureTextEntry icon="lock-closed-outline" />
            <InputField label="Confirm Password" placeholder="Re-enter password" value={registerForm.confirmPassword} onChangeText={(v) => updateRegister("confirmPassword", v)} secureTextEntry icon="shield-checkmark-outline" />

            <View style={styles.buttonBox}>
              {loading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
              ) : (
                <GradientButton title="Create Account" onPress={handleRegister} />
              )}
            </View>

            <View style={styles.rowCenter}>
              <Text style={styles.normalText}>Already have an account?</Text>
              <Pressable onPress={goToLogin}>
                <Text style={styles.linkText}> Login</Text>
              </Pressable>
            </View>
          </MotiView>
        )}

        {/* ── FORGOT PASSWORD CARD ── */}
        {screen === "forgot" && (
          <MotiView
            key="forgot"
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 600 }}
            style={styles.card}
          >
            <View style={styles.cardHeaderRow}>
              <Pressable style={styles.smallBackBtn} onPress={goToLogin}>
                <Ionicons name="chevron-back" size={22} color={COLORS.text} />
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.sub}>
                  {forgotStep === 1
                    ? "Enter your phone number to receive OTP"
                    : "Enter OTP and create your new password"}
                </Text>
              </View>
            </View>

            {forgotStep === 1 ? (
              <>
                <InputField
                  label="Registered Phone Number"
                  placeholder="+91 00000 00000"
                  value={forgotForm.phone}
                  onChangeText={(v) => updateForgot("phone", v)}
                  keyboardType="phone-pad"
                  icon="call-outline"
                />
                <View style={styles.buttonBox}>
                  {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" />
                  ) : (
                    <GradientButton title="Send OTP" onPress={sendOtp} />
                  )}
                </View>
              </>
            ) : (
              <>
                <InputField
                  label="OTP"
                  placeholder="Enter 6-digit OTP"
                  value={forgotForm.otp}
                  onChangeText={(v) => updateForgot("otp", v)}
                  keyboardType="number-pad"
                  icon="shield-checkmark-outline"
                />
                <InputField
                  label="New Password"
                  placeholder="Create new password"
                  value={forgotForm.newPassword}
                  onChangeText={(v) => updateForgot("newPassword", v)}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
                <InputField
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  value={forgotForm.confirmPassword}
                  onChangeText={(v) => updateForgot("confirmPassword", v)}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
                <View style={styles.buttonBox}>
                  {loading ? (
                    <ActivityIndicator color={COLORS.primary} size="large" />
                  ) : (
                    <GradientButton title="Reset Password" onPress={resetPassword} />
                  )}
                </View>
                <Pressable
                  style={styles.centerBtn}
                  onPress={() => { setForgotStep(1); setOtpSessionInfo(null); }}
                >
                  <Text style={styles.linkText}>Change number / Resend OTP</Text>
                </Pressable>
              </>
            )}

            <Pressable style={styles.centerBtn} onPress={goToLogin}>
              <Text style={styles.normalText}>Back to Login</Text>
            </Pressable>
          </MotiView>
        )}
      </ScrollView>

      {/* ── UNIFIED POPUP MODAL ── */}
      <Modal
        visible={popup.visible}
        transparent
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.8, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.popupCard}
          >
            <View style={[styles.popupIconCircle, { backgroundColor: popupIconColor }]}>
              <Ionicons name={popupIconName} size={58} color="#fff" />
            </View>

            <Text style={styles.popupTitle}>{popup.title}</Text>
            <Text style={styles.popupMessage}>{popup.message}</Text>

            <Pressable
              style={[styles.popupButton, { backgroundColor: popupIconColor }]}
              onPress={closePopup}
            >
              <Text style={styles.popupButtonText}>OK</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1, backgroundColor: COLORS.background },
  container: { flexGrow: 1, padding: 24, justifyContent: "center", paddingTop: 54, paddingBottom: 40 },
  logoBox: { alignItems: "center", marginBottom: 34 },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.primary, justifyContent: "center", alignItems: "center", marginBottom: 16, shadowColor: COLORS.primary, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  logo: { fontSize: 34, fontWeight: "900", color: COLORS.primary, letterSpacing: -1 },
  tagline: { color: COLORS.muted, marginTop: 4, fontSize: 15, fontWeight: "500" },
  card: { backgroundColor: COLORS.card || "#fff", borderRadius: 32, padding: 24, borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 20, elevation: 5 },
  cardHeaderRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 10 },
  smallBackBtn: { width: 42, height: 42, borderRadius: 15, backgroundColor: COLORS.background || "#F8FAFC", borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", alignItems: "center", justifyContent: "center", marginTop: 2 },
  title: { fontSize: 25, fontWeight: "900", color: COLORS.text || "#1E293B" },
  sub: { color: COLORS.muted || "#64748B", marginTop: 6, marginBottom: 22, fontSize: 14, lineHeight: 20, fontWeight: "600" },
  sectionTitle: { fontSize: 17, fontWeight: "900", color: COLORS.text || "#1E293B", marginTop: 12, marginBottom: 10 },
  buttonBox: { marginTop: 12 },
  centerBtn: { marginTop: 16, alignItems: "center" },
  rowCenter: { marginTop: 18, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  normalText: { color: COLORS.muted || "#64748B", fontWeight: "700", fontSize: 14 },
  linkText: { color: COLORS.primary, fontWeight: "900", fontSize: 14 },
  terms: { textAlign: "center", color: COLORS.muted, fontSize: 12, marginTop: 26, opacity: 0.8, lineHeight: 18 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.55)", alignItems: "center", justifyContent: "center", padding: 24 },
  popupCard: { width: "100%", maxWidth: 380, backgroundColor: COLORS.card || "#fff", borderRadius: 30, padding: 26, alignItems: "center", borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 24, elevation: 12 },
  popupIconCircle: { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  popupTitle: { fontSize: 23, fontWeight: "900", color: COLORS.text || "#1E293B", textAlign: "center" },
  popupMessage: { marginTop: 10, fontSize: 14, lineHeight: 21, color: COLORS.muted || "#64748B", textAlign: "center", fontWeight: "600" },
  popupButton: { marginTop: 24, width: "100%", height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  popupButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});