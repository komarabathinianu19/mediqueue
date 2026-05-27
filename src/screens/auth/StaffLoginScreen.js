
















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   Pressable,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import {
//   loginHospitalStaff,
//   checkHospitalPhoneRegistered,
//   sendHospitalBackendOtp,
//   resetHospitalPassword,
// } from "../../services/apiService";
// import InputField from "../../components/InputField";
// import { useHospital } from "../../context/HospitalContext";

// export default function StaffLoginScreen({ navigation }) {
//   const { setStaffSession } = useHospital();
//   const [hospitalId, setHospitalId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ── Forgot Password States ──────────────────────────────────────────────────
//   const [screen, setScreen] = useState("login"); // login | forgot
//   const [forgotStep, setForgotStep] = useState(1);
//   const [forgotForm, setForgotForm] = useState({
//     phone: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // ── Unified Popup States ─────────────────────────────────────────────────────
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupType, setPopupType] = useState("error"); // "error" | "success" | "info"

//   const showPopup = (title, msg, type = "error") => {
//     setPopupTitle(title);
//     setPopupMessage(msg);
//     setPopupType(type);
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//     if (popupType === "success") {
//       setScreen("login");
//       setForgotStep(1);
//       setForgotForm({ phone: "", otp: "", newPassword: "", confirmPassword: "" });
//     }
//   };

//   const showError = (msg) => {
//     showPopup("Login Failed", msg, "error");
//   };

//   const handleLogin = async () => {
//     if (!hospitalId.trim() || !email.trim() || !password.trim()) {
//       showError("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = await loginHospitalStaff(
//         hospitalId.trim().toUpperCase(),
//         email.trim(),
//         password
//       );

//       setStaffSession(data);

//       await AsyncStorage.multiSet([
//         ["token", data.token],
//         ["hospitalId", data.hospitalId],
//         ["hospitalName", data.name || ""],
//         ["hospitalEmail", data.email || ""],
//         ["hospitalPhone", data.phone || ""],
//         ["hospitalAddress", data.address || ""],
//         ["hospitalCity", data.city || ""],
//         ["hospitalType", data.type || ""],
//         ["hospitalImageUrl", data.imageUrl || ""],
//         ["hospitalStatus", data.status || ""],
//       ]);

//       navigation.reset({ index: 0, routes: [{ name: "StaffTabs" }] });
//     } catch (err) {
//       const msg = err?.message || "";
//       if (
//         msg.toLowerCase().includes("invalid") ||
//         msg.toLowerCase().includes("incorrect") ||
//         msg.toLowerCase().includes("wrong") ||
//         msg.toLowerCase().includes("unauthorized") ||
//         msg.toLowerCase().includes("401") ||
//         msg.toLowerCase().includes("403") ||
//         msg.toLowerCase().includes("not found") ||
//         msg.toLowerCase().includes("server error") ||
//         msg.toLowerCase().includes("check console")
//       ) {
//         showError("Incorrect Hospital ID, email, or password.\nPlease check your credentials and try again.");
//       } else {
//         showError(msg || "Login failed. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendOtp = async () => {
//     if (!forgotForm.phone.trim()) {
//       showPopup("Missing Phone", "Please enter your registered hospital phone number.", "error");
//       return;
//     }

//     setLoading(true);
//     try {
//       const phoneNumber = forgotForm.phone.trim().startsWith("+")
//         ? forgotForm.phone.trim()
//         : "+91" + forgotForm.phone.trim();

//       const phoneCheck = await checkHospitalPhoneRegistered(phoneNumber);
//       if (!phoneCheck.registered) {
//         showPopup("Not Registered", "This phone number is not registered for any hospital. Please register first.", "error");
//         setLoading(false);
//         return;
//       }

//       await sendHospitalBackendOtp(phoneNumber);

//       showPopup("OTP Sent", "A 6-digit OTP has been sent to your registered phone number.", "info");
//       setForgotStep(2);
//     } catch (err) {
//       showPopup("Error", err.message || "Failed to send OTP. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!forgotForm.otp.trim())             return showPopup("Missing OTP", "Please enter the OTP.", "error");
//     if (!forgotForm.newPassword.trim())     return showPopup("Missing Password", "Please enter new password.", "error");
//     if (forgotForm.newPassword.length < 6)  return showPopup("Weak Password", "Password must be at least 6 characters.", "error");
//     if (forgotForm.newPassword !== forgotForm.confirmPassword)
//       return showPopup("Password Mismatch", "Passwords do not match.", "error");

//     setLoading(true);
//     try {
//       const phoneNumber = forgotForm.phone.trim().startsWith("+")
//         ? forgotForm.phone.trim()
//         : "+91" + forgotForm.phone.trim();

//       await resetHospitalPassword(phoneNumber, forgotForm.otp.trim(), forgotForm.newPassword);

//       showPopup(
//         "Password Reset Successful",
//         "Your password has been reset. Please login with your new password.",
//         "success"
//       );
//     } catch (err) {
//       showPopup("Error", err.message || "Failed to reset password. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.content}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.iconWrap}>
//           <Ionicons name="business" size={52} color={COLORS.staff} />
//         </View>

//         <Text style={styles.title}>Staff Login</Text>
//         <Text style={styles.sub}>Sign in to manage your hospital</Text>

//         {screen === "login" ? (
//           <MotiView
//             key="login"
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 500 }}
//           >
//             <InputField
//               label="Hospital ID"
//               placeholder="e.g. HSP-XXXXXX"
//               value={hospitalId}
//               onChangeText={(t) => setHospitalId(t.toUpperCase())}
//               autoCapitalize="characters"
//             />

//             <InputField
//               label="Email"
//               placeholder="hospital@email.com"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />

//             <InputField
//               label="Password"
//               placeholder="Enter password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />

//             <TouchableOpacity
//               style={styles.forgotLink}
//               onPress={() => { setScreen("forgot"); setForgotStep(1); }}
//             >
//               <Text style={styles.forgotText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.btn, loading && styles.btnDisabled]}
//               onPress={handleLogin}
//               disabled={loading}
//               activeOpacity={0.85}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.btnText}>Sign In</Text>
//               )}
//             </TouchableOpacity>
//           </MotiView>
//         ) : (
//           <MotiView
//             key="forgot"
//             from={{ opacity: 0, translateY: 20 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 500 }}
//           >
//             <View style={styles.cardHeaderRow}>
//               <Pressable
//                 style={styles.smallBackBtn}
//                 onPress={() => { setScreen("login"); setForgotStep(1); }}
//               >
//                 <Ionicons name="chevron-back" size={22} color={COLORS.text} />
//               </Pressable>
//               <View style={{ flex: 1, marginLeft: 8 }}>
//                 <Text style={styles.titleSmall}>Forgot Password?</Text>
//                 <Text style={styles.subSmall}>
//                   {forgotStep === 1
//                     ? "Enter phone number to receive OTP"
//                     : "Enter OTP and create your new password"}
//                 </Text>
//               </View>
//             </View>

//             {forgotStep === 1 ? (
//               <>
//                 <InputField
//                   label="Registered Phone Number"
//                   placeholder="+91 00000 00000"
//                   value={forgotForm.phone}
//                   onChangeText={(v) => setForgotForm({ ...forgotForm, phone: v })}
//                   keyboardType="phone-pad"
//                 />
//                 <TouchableOpacity
//                   style={[styles.btn, loading && styles.btnDisabled]}
//                   onPress={handleSendOtp}
//                   disabled={loading}
//                   activeOpacity={0.85}
//                 >
//                   {loading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.btnText}>Send OTP</Text>
//                   )}
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <>
//                 <InputField
//                   label="OTP"
//                   placeholder="Enter 6-digit OTP"
//                   value={forgotForm.otp}
//                   onChangeText={(v) => setForgotForm({ ...forgotForm, otp: v })}
//                   keyboardType="number-pad"
//                 />
//                 <InputField
//                   label="New Password"
//                   placeholder="Create new password"
//                   value={forgotForm.newPassword}
//                   onChangeText={(v) => setForgotForm({ ...forgotForm, newPassword: v })}
//                   secureTextEntry
//                 />
//                 <InputField
//                   label="Confirm Password"
//                   placeholder="Re-enter new password"
//                   value={forgotForm.confirmPassword}
//                   onChangeText={(v) => setForgotForm({ ...forgotForm, confirmPassword: v })}
//                   secureTextEntry
//                 />
//                 <TouchableOpacity
//                   style={[styles.btn, loading && styles.btnDisabled]}
//                   onPress={handleResetPassword}
//                   disabled={loading}
//                   activeOpacity={0.85}
//                 >
//                   {loading ? (
//                     <ActivityIndicator color="#fff" />
//                   ) : (
//                     <Text style={styles.btnText}>Reset Password</Text>
//                   )}
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.forgotLinkCenter}
//                   onPress={() => { setForgotStep(1); }}
//                 >
//                   <Text style={styles.forgotText}>Change number / Resend OTP</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </MotiView>
//         )}

//         <TouchableOpacity
//           onPress={() => navigation.navigate("HospitalRegister")}
//           style={styles.registerLink}
//         >
//           <Text style={styles.registerText}>
//             New hospital?{" "}
//             <Text style={{ color: COLORS.staff, fontWeight: "800" }}>
//               Register here
//             </Text>
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* ── Error/Success Popup Modal ── */}
//       <Modal
//         visible={popupVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closePopup}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.popup}>
//             {/* Icon */}
//             <View style={[
//               styles.popupIconWrap,
//               popupType === "success" && { backgroundColor: "#ECFDF5" },
//               popupType === "info" && { backgroundColor: "#EFF6FF" }
//             ]}>
//               <Ionicons
//                 name={
//                   popupType === "success"
//                     ? "checkmark-circle"
//                     : popupType === "info"
//                     ? "information-circle"
//                     : "close-circle"
//                 }
//                 size={48}
//                 color={
//                   popupType === "success"
//                     ? "#10B981"
//                     : popupType === "info"
//                     ? COLORS.staff
//                     : "#EF4444"
//                 }
//               />
//             </View>

//             <Text style={styles.popupTitle}>{popupTitle}</Text>
//             <Text style={styles.popupMessage}>{popupMessage}</Text>

//             <Pressable
//               style={[
//                 styles.popupBtn,
//                 popupType === "success" && { backgroundColor: "#10B981" },
//                 popupType === "info" && { backgroundColor: COLORS.staff }
//               ]}
//               onPress={closePopup}
//             >
//               <Text style={styles.popupBtnText}>
//                 {popupType === "success" ? "Continue to Login" : "OK"}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   content: { padding: 24, paddingBottom: 48 },
//   iconWrap: {
//     alignSelf: "center",
//     marginTop: 60,
//     marginBottom: 16,
//     width: 90,
//     height: 90,
//     borderRadius: 28,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   title: { fontSize: 28, fontWeight: "900", color: COLORS.text, textAlign: "center" },
//   sub: { color: COLORS.muted, textAlign: "center", marginTop: 6, marginBottom: 28 },
//   btn: {
//     backgroundColor: COLORS.staff,
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 24,
//   },
//   btnDisabled: { opacity: 0.6 },
//   btnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
//   registerLink: { marginTop: 20, alignItems: "center" },
//   registerText: { color: COLORS.muted, fontSize: 14 },

//   // Forgot password styles
//   forgotLink: {
//     alignSelf: "flex-end",
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   forgotLinkCenter: {
//     alignSelf: "center",
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   forgotText: {
//     color: COLORS.staff,
//     fontWeight: "700",
//     fontSize: 14,
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   smallBackBtn: {
//     padding: 8,
//     borderRadius: 12,
//     backgroundColor: COLORS.card,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   titleSmall: {
//     fontSize: 20,
//     fontWeight: "900",
//     color: COLORS.text,
//   },
//   subSmall: {
//     fontSize: 13,
//     color: COLORS.muted,
//     marginTop: 3,
//   },

//   // ── Popup ────────────────────────────────────────────────────────────────────
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.55)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 32,
//   },
//   popup: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 28,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.18,
//     shadowRadius: 20,
//     elevation: 12,
//   },
//   popupIconWrap: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   popupTitle: {
//     fontSize: 20,
//     fontWeight: "900",
//     color: "#1E293B",
//     marginBottom: 10,
//   },
//   popupMessage: {
//     fontSize: 14,
//     color: "#64748B",
//     textAlign: "center",
//     lineHeight: 21,
//     fontWeight: "500",
//     marginBottom: 24,
//   },
//   popupBtn: {
//     width: "100%",
//     height: 50,
//     borderRadius: 16,
//     backgroundColor: "#EF4444",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   popupBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },
// });  






























import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import {
  loginHospitalStaff,
  checkHospitalPhoneRegistered,
  sendHospitalBackendOtp,
  resetHospitalPassword,
} from "../../services/apiService";
import InputField from "../../components/InputField";
import { useHospital } from "../../context/HospitalContext";

export default function StaffLoginScreen({ navigation }) {
  const { setStaffSession } = useHospital();

  // ── Login fields ─────────────────────────────────────────────────────────────
  const [hospitalId, setHospitalId] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Forgot Password States ────────────────────────────────────────────────────
  const [screen, setScreen] = useState("login"); // "login" | "forgot"
  const [forgotStep, setForgotStep] = useState(1); // 1 = enter phone, 2 = OTP + new password
  const [forgotForm, setForgotForm] = useState({
    phone: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ── Popup States ──────────────────────────────────────────────────────────────
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupType, setPopupType] = useState("error"); // "error" | "success" | "info"

  const showPopup = (title, msg, type = "error") => {
    setPopupTitle(title);
    setPopupMessage(msg);
    setPopupType(type);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    if (popupType === "success") {
      // After password reset success → go back to login
      setScreen("login");
      setForgotStep(1);
      setForgotForm({ phone: "", otp: "", newPassword: "", confirmPassword: "" });
    }
  };

  // ── LOGIN ─────────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!hospitalId.trim() || !phone.trim() || !password.trim()) {
      showPopup("Missing Fields", "Please fill in all fields.", "error");
      return;
    }

    setLoading(true);
    try {
      // Normalize phone: ensure +91 prefix
      const normalizedPhone = phone.trim().startsWith("+")
        ? phone.trim()
        : "+91" + phone.trim();

      const data = await loginHospitalStaff(
        hospitalId.trim().toUpperCase(),
        normalizedPhone,
        password
      );

      setStaffSession(data);

      await AsyncStorage.multiSet([
        ["token", data.token],
        ["hospitalId", data.hospitalId],
        ["hospitalName", data.name || ""],
        ["hospitalEmail", data.email || ""],
        ["hospitalPhone", data.phone || ""],
        ["hospitalAddress", data.address || ""],
        ["hospitalCity", data.city || ""],
        ["hospitalType", data.type || ""],
        ["hospitalImageUrl", data.imageUrl || ""],
        ["hospitalStatus", data.status || ""],
      ]);

      navigation.reset({ index: 0, routes: [{ name: "StaffTabs" }] });
    } catch (err) {
      const msg = err?.message || "";
      if (
        msg.toLowerCase().includes("invalid") ||
        msg.toLowerCase().includes("incorrect") ||
        msg.toLowerCase().includes("wrong") ||
        msg.toLowerCase().includes("does not match") ||
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("not found")
      ) {
        showPopup(
          "Login Failed",
          "Incorrect Hospital ID, phone number, or password.\nPlease check your credentials and try again.",
          "error"
        );
      } else if (msg.toLowerCase().includes("pending")) {
        showPopup("Pending Approval", msg, "info");
      } else if (msg.toLowerCase().includes("rejected")) {
        showPopup("Registration Rejected", msg, "error");
      } else {
        showPopup("Login Failed", msg || "Login failed. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── SEND OTP ──────────────────────────────────────────────────────────────────
  const handleSendOtp = async () => {
    if (!forgotForm.phone.trim()) {
      showPopup("Missing Phone", "Please enter your registered hospital phone number.", "error");
      return;
    }

    setLoading(true);
    try {
      const phoneNumber = forgotForm.phone.trim().startsWith("+")
        ? forgotForm.phone.trim()
        : "+91" + forgotForm.phone.trim();

      // Check if phone is registered
      const phoneCheck = await checkHospitalPhoneRegistered(phoneNumber);
      if (!phoneCheck.registered) {
        showPopup(
          "Not Registered",
          "This phone number is not registered for any hospital. Please register first.",
          "error"
        );
        return;
      }

      // Send OTP via Twilio
      await sendHospitalBackendOtp(phoneNumber);

      showPopup("OTP Sent", "A 6-digit OTP has been sent to your registered phone number.", "info");
      setForgotStep(2);
    } catch (err) {
      showPopup("Error", err.message || "Failed to send OTP. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── RESET PASSWORD ────────────────────────────────────────────────────────────
  const handleResetPassword = async () => {
    if (!forgotForm.otp.trim())
      return showPopup("Missing OTP", "Please enter the OTP.", "error");
    if (!forgotForm.newPassword.trim())
      return showPopup("Missing Password", "Please enter your new password.", "error");
    if (forgotForm.newPassword.length < 6)
      return showPopup("Weak Password", "Password must be at least 6 characters.", "error");
    if (forgotForm.newPassword !== forgotForm.confirmPassword)
      return showPopup("Password Mismatch", "Passwords do not match.", "error");

    setLoading(true);
    try {
      const phoneNumber = forgotForm.phone.trim().startsWith("+")
        ? forgotForm.phone.trim()
        : "+91" + forgotForm.phone.trim();

      // Verifies OTP + saves new password to DB via backend
      await resetHospitalPassword(phoneNumber, forgotForm.otp.trim(), forgotForm.newPassword);

      showPopup(
        "Password Reset Successful",
        "Your password has been updated. Please login with your new password.",
        "success"
      );
    } catch (err) {
      showPopup("Error", err.message || "Failed to reset password. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Icon */}
        <View style={styles.iconWrap}>
          <Ionicons name="business" size={52} color={COLORS.staff} />
        </View>

        <Text style={styles.title}>Staff Login</Text>
        <Text style={styles.sub}>Sign in to manage your hospital</Text>

        {/* ── LOGIN SCREEN ── */}
        {screen === "login" && (
          <MotiView
            key="login"
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <InputField
              label="Hospital ID"
              placeholder=""
              value={hospitalId}
              onChangeText={(t) => setHospitalId(t.toUpperCase())}
              autoCapitalize="characters"
              icon="id-card-outline"
            />

            <InputField
              label="Registered Phone Number"
              placeholder=""
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="call-outline"
            />

            <InputField
              label="Password"
              placeholder=""
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <TouchableOpacity
              style={styles.forgotLink}
              onPress={() => { setScreen("forgot"); setForgotStep(1); }}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </MotiView>
        )}

        {/* ── FORGOT PASSWORD SCREEN ── */}
        {screen === "forgot" && (
          <MotiView
            key="forgot"
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 500 }}
          >
            <View style={styles.cardHeaderRow}>
              <Pressable
                style={styles.smallBackBtn}
                onPress={() => { setScreen("login"); setForgotStep(1); }}
              >
                <Ionicons name="chevron-back" size={22} color={COLORS.text} />
              </Pressable>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.titleSmall}>Forgot Password?</Text>
                <Text style={styles.subSmall}>
                  {forgotStep === 1
                    ? "Enter registered phone number to receive OTP"
                    : "Enter OTP and create your new password"}
                </Text>
              </View>
            </View>

            {/* Step 1 — Enter phone */}
            {forgotStep === 1 && (
              <>
                <InputField
                  label="Registered Phone Number"
                  placeholder=""
                  value={forgotForm.phone}
                  onChangeText={(v) => setForgotForm({ ...forgotForm, phone: v })}
                  keyboardType="phone-pad"
                  icon="call-outline"
                />
                <TouchableOpacity
                  style={[styles.btn, loading && styles.btnDisabled]}
                  onPress={handleSendOtp}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Send OTP</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {/* Step 2 — OTP + new password */}
            {forgotStep === 2 && (
              <>
                <InputField
                  label="OTP"
                  placeholder="Enter 6-digit OTP"
                  value={forgotForm.otp}
                  onChangeText={(v) => setForgotForm({ ...forgotForm, otp: v })}
                  keyboardType="number-pad"
                  icon="shield-checkmark-outline"
                />
                <InputField
                  label="New Password"
                  placeholder="Create new password"
                  value={forgotForm.newPassword}
                  onChangeText={(v) => setForgotForm({ ...forgotForm, newPassword: v })}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
                <InputField
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  value={forgotForm.confirmPassword}
                  onChangeText={(v) => setForgotForm({ ...forgotForm, confirmPassword: v })}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
                <TouchableOpacity
                  style={[styles.btn, loading && styles.btnDisabled]}
                  onPress={handleResetPassword}
                  disabled={loading}
                  activeOpacity={0.85}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Reset Password</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.forgotLinkCenter}
                  onPress={() => setForgotStep(1)}
                >
                  <Text style={styles.forgotText}>Change number / Resend OTP</Text>
                </TouchableOpacity>
              </>
            )}
          </MotiView>
        )}

        {/* Register link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("HospitalRegister")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            New hospital?{" "}
            <Text style={{ color: COLORS.staff, fontWeight: "800" }}>
              Register here
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Popup Modal ── */}
      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={closePopup}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={[
              styles.popupIconWrap,
              popupType === "success" && { backgroundColor: "#ECFDF5" },
              popupType === "info"    && { backgroundColor: "#EFF6FF" },
            ]}>
              <Ionicons
                name={
                  popupType === "success" ? "checkmark-circle"
                  : popupType === "info"  ? "information-circle"
                  : "close-circle"
                }
                size={48}
                color={
                  popupType === "success" ? "#10B981"
                  : popupType === "info"  ? COLORS.staff
                  : "#EF4444"
                }
              />
            </View>

            <Text style={styles.popupTitle}>{popupTitle}</Text>
            <Text style={styles.popupMessage}>{popupMessage}</Text>

            <Pressable
              style={[
                styles.popupBtn,
                popupType === "success" && { backgroundColor: "#10B981" },
                popupType === "info"    && { backgroundColor: COLORS.staff },
              ]}
              onPress={closePopup}
            >
              <Text style={styles.popupBtnText}>
                {popupType === "success" ? "Go to Login" : "OK"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingBottom: 48 },
  iconWrap: {
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 16,
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: { fontSize: 28, fontWeight: "900", color: COLORS.text, textAlign: "center" },
  sub: { color: COLORS.muted, textAlign: "center", marginTop: 6, marginBottom: 28 },
  btn: {
    backgroundColor: COLORS.staff,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
  registerLink: { marginTop: 20, alignItems: "center" },
  registerText: { color: COLORS.muted, fontSize: 14 },
  forgotLink: { alignSelf: "flex-end", marginTop: 10, marginBottom: 4 },
  forgotLinkCenter: { alignSelf: "center", marginTop: 20 },
  forgotText: { color: COLORS.staff, fontWeight: "700", fontSize: 14 },
  cardHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 10 },
  smallBackBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  titleSmall: { fontSize: 20, fontWeight: "900", color: COLORS.text },
  subSmall: { fontSize: 13, color: COLORS.muted, marginTop: 3 },
  // Popup
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  popup: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  popupIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  popupTitle: { fontSize: 20, fontWeight: "900", color: "#1E293B", marginBottom: 10 },
  popupMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    fontWeight: "500",
    marginBottom: 24,
  },
  popupBtn: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  popupBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },
});