// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function AdminLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoBox}>
//         <Ionicons name="shield-checkmark-outline" size={78} color={COLORS.admin} />
//         <Text style={styles.logo}>Super Admin</Text>
//         <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Admin Login</Text>

//         <InputField label="Email" value="admin@mediqueue.com" />
//         <InputField label="Password" value="123456" secureTextEntry />

//         <GradientButton
//           title="Login"
//           colors={[COLORS.admin, "#8B5CF6"]}
//           onPress={() => navigation.replace("AdminTabs")}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 22 },
//   logoBox: { alignItems: "center", marginTop: 86, marginBottom: 34 },
//   logo: { fontSize: 30, fontWeight: "900", color: COLORS.admin },
//   tagline: { color: COLORS.muted, marginTop: 8 },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 30,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 4,
//   },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text, marginBottom: 18 },
// });  




























// import React, { useState } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import * as Haptics from "expo-haptics";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function AdminLoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Tactile feedback for an "authorized" action
//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//     navigation.replace("AdminTabs");
//   };

//   return (
//     <View style={styles.container}>
//       {/* 1. Authority Logo Animation */}
//       <MotiView 
//         from={{ opacity: 0, scale: 0.7 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ type: 'timing', duration: 900 }}
//         style={styles.logoBox}
//       >
//         <View style={styles.shieldContainer}>
//           <Ionicons name="shield-checkmark" size={64} color="#fff" />
//         </View>
//         <Text style={styles.logo}>Super Admin</Text>
//         <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
//       </MotiView>

//       {/* 2. Entrance for the Card */}
//       <MotiView 
//         from={{ opacity: 0, translateY: 30 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: 'timing', duration: 700, delay: 200 }}
//         style={styles.card}
//       >
//         <Text style={styles.title}>Admin Login</Text>

//         {/* 3. Sequential Inputs */}
//         <MotiView
//           from={{ opacity: 0, translateX: -15 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 450 }}
//         >
//           <InputField 
//             label="Admin Email" 
//             placeholder="admin@mediqueue.com"
//             value={email}
//             onChangeText={setEmail}
//             icon="mail-unread-outline"
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateX: -15 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 600 }}
//         >
//           <InputField 
//             label="Security Password" 
//             placeholder="••••••••"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry 
//             icon="key-outline"
//           />
//         </MotiView>

//         {/* Login Action */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 800 }}
//           style={{ marginTop: 12 }}
//         >
//           <GradientButton
//             title="Access Control Center"
//             colors={[COLORS.admin, "#8B5CF6"]}
//             onPress={handleLogin}
//           />
//         </MotiView>

//         <MotiView 
//           from={{ opacity: 0 }}
//           animate={{ opacity: 0.6 }}
//           transition={{ delay: 1000 }}
//         >
//           <Text style={styles.footerNote}>
//             Authorized Personnel Only
//           </Text>
//         </MotiView>
//       </MotiView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     backgroundColor: COLORS.background, 
//     padding: 24,
//     justifyContent: 'center' 
//   },
//   logoBox: { 
//     alignItems: "center", 
//     marginBottom: 40 
//   },
//   shieldContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 24,
//     backgroundColor: COLORS.admin,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     // Deeper shadow for "Heavy" Admin feel
//     shadowColor: COLORS.admin,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 12,
//   },
//   logo: { 
//     fontSize: 32, 
//     fontWeight: "900", 
//     color: COLORS.admin,
//     letterSpacing: -0.5
//   },
//   tagline: { 
//     color: COLORS.muted, 
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: '500',
//     textAlign: 'center'
//   },
//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 26,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 20,
//     elevation: 6,
//   },
//   title: { 
//     fontSize: 24, 
//     fontWeight: "800", 
//     color: COLORS.text, 
//     marginBottom: 20 
//   },
//   footerNote: {
//     textAlign: "center",
//     marginTop: 24,
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "700",
//     textTransform: 'uppercase',
//     letterSpacing: 1
//   },
// });  






























// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import * as Haptics from "expo-haptics";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// // ─── Admin Credentials (hardcoded — no backend admin auth endpoint) ────────────
// const ADMIN_EMAIL = "admin@mediqueue.com";
// const ADMIN_PASSWORD = "Admin@123";
// // Security question for forgot password
// const SECURITY_QUESTION = "What is the MediQueue admin secret key?";
// const SECURITY_ANSWER = "mediqueue2026";

// export default function AdminLoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ── Screen mode: "login" | "forgot"
//   const [screen, setScreen] = useState("login");
//   const [forgotStep, setForgotStep] = useState(1); // 1=security Q, 2=new password
//   const [securityAnswer, setSecurityAnswer] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // ── Popup
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("error"); // "error" | "success"

//   const showPopup = (title, msg, type = "error") => {
//     setPopupTitle(title);
//     setPopupMessage(msg);
//     setPopupType(type);
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//     if (popupType === "success" && screen === "forgot") {
//       setScreen("login");
//       setForgotStep(1);
//       setSecurityAnswer("");
//       setNewPassword("");
//       setConfirmPassword("");
//     }
//   };

//   // ── LOGIN ────────────────────────────────────────────────────────────────────
//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       showPopup("Missing Fields", "Please enter both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Simulate slight network delay for UX
//       await new Promise((r) => setTimeout(r, 500));

//       if (
//         email.trim().toLowerCase() !== ADMIN_EMAIL ||
//         password !== ADMIN_PASSWORD
//       ) {
//         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//         showPopup(
//           "Access Denied",
//           "Incorrect email or password.\nPlease check your credentials."
//         );
//         return;
//       }

//       // ✅ Save admin session to AsyncStorage for auto-login
//       await AsyncStorage.multiSet([
//         ["adminToken", "admin_session_active"],
//         ["userRole", "ADMIN"],
//       ]);

//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//       navigation.reset({ index: 0, routes: [{ name: "AdminTabs" }] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── FORGOT PASSWORD ──────────────────────────────────────────────────────────
//   const handleForgotStep1 = () => {
//     if (!securityAnswer.trim()) {
//       showPopup("Missing Answer", "Please enter the answer to the security question.");
//       return;
//     }
//     if (securityAnswer.trim().toLowerCase() !== SECURITY_ANSWER) {
//       showPopup("Wrong Answer", "The security answer you entered is incorrect.");
//       return;
//     }
//     setForgotStep(2);
//   };

//   const handleResetPassword = () => {
//     if (!newPassword.trim() || !confirmPassword.trim()) {
//       showPopup("Missing Fields", "Please fill in both password fields.");
//       return;
//     }
//     if (newPassword.length < 6) {
//       showPopup("Weak Password", "Password must be at least 6 characters.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       showPopup("Password Mismatch", "Passwords do not match.");
//       return;
//     }
//     // NOTE: Since admin credentials are hardcoded, inform user of the constraint
//     showPopup(
//       "Reset Not Available",
//       "Admin password is managed by the system. Please contact the system administrator to update credentials.",
//       "error"
//     );
//   };

//   // ── RENDER ───────────────────────────────────────────────────────────────────
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Logo */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.7 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 900 }}
//           style={styles.logoBox}
//         >
//           <View style={styles.shieldContainer}>
//             <Ionicons name="shield-checkmark" size={64} color="#fff" />
//           </View>
//           <Text style={styles.logo}>Super Admin</Text>
//           <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
//         </MotiView>

//         {/* ─── LOGIN SCREEN ─────────────────────────────────────────────────── */}
//         {screen === "login" && (
//           <MotiView
//             from={{ opacity: 0, translateY: 30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 700, delay: 200 }}
//             style={styles.card}
//           >
//             <Text style={styles.title}>Admin Login</Text>

//             <MotiView
//               from={{ opacity: 0, translateX: -15 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 450 }}
//             >
//               <InputField
//                 label="Admin Email"
//                 placeholder="admin@mediqueue.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 icon="mail-unread-outline"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </MotiView>

//             <MotiView
//               from={{ opacity: 0, translateX: -15 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 600 }}
//             >
//               <InputField
//                 label="Security Password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 icon="key-outline"
//               />
//             </MotiView>

//             {/* Forgot Password Link */}
//             <Pressable
//               onPress={() => {
//                 setScreen("forgot");
//                 setForgotStep(1);
//               }}
//               style={styles.forgotLink}
//             >
//               <Text style={styles.forgotText}>Forgot Password?</Text>
//             </Pressable>

//             <MotiView
//               from={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 800 }}
//               style={{ marginTop: 12 }}
//             >
//               <GradientButton
//                 title={loading ? "Verifying..." : "Access Control Center"}
//                 colors={[COLORS.admin, "#8B5CF6"]}
//                 onPress={handleLogin}
//                 disabled={loading}
//               />
//             </MotiView>

//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               transition={{ delay: 1000 }}
//             >
//               <Text style={styles.footerNote}>Authorized Personnel Only</Text>
//             </MotiView>
//           </MotiView>
//         )}

//         {/* ─── FORGOT PASSWORD SCREEN ───────────────────────────────────────── */}
//         {screen === "forgot" && (
//           <MotiView
//             from={{ opacity: 0, translateY: 30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//             style={styles.card}
//           >
//             <Pressable onPress={() => setScreen("login")} style={styles.backRow}>
//               <Ionicons name="arrow-back" size={20} color={COLORS.admin} />
//               <Text style={styles.backText}>Back to Login</Text>
//             </Pressable>

//             <Text style={styles.title}>Reset Password</Text>

//             {forgotStep === 1 && (
//               <>
//                 <Text style={styles.sectionLabel}>Security Question</Text>
//                 <View style={styles.questionBox}>
//                   <Ionicons
//                     name="help-circle-outline"
//                     size={20}
//                     color={COLORS.admin}
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={styles.questionText}>{SECURITY_QUESTION}</Text>
//                 </View>

//                 <InputField
//                   label="Your Answer"
//                   placeholder="Enter the secret key"
//                   value={securityAnswer}
//                   onChangeText={setSecurityAnswer}
//                   icon="lock-closed-outline"
//                   autoCapitalize="none"
//                 />

//                 <GradientButton
//                   title="Verify Answer"
//                   colors={[COLORS.admin, "#8B5CF6"]}
//                   onPress={handleForgotStep1}
//                 />
//               </>
//             )}

//             {forgotStep === 2 && (
//               <>
//                 <InputField
//                   label="New Password"
//                   placeholder="Min. 6 characters"
//                   value={newPassword}
//                   onChangeText={setNewPassword}
//                   secureTextEntry
//                   icon="key-outline"
//                 />
//                 <InputField
//                   label="Confirm Password"
//                   placeholder="Repeat new password"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry
//                   icon="checkmark-circle-outline"
//                 />
//                 <GradientButton
//                   title="Reset Password"
//                   colors={[COLORS.admin, "#8B5CF6"]}
//                   onPress={handleResetPassword}
//                 />
//               </>
//             )}
//           </MotiView>
//         )}
//       </ScrollView>

//       {/* ─── POPUP MODAL ──────────────────────────────────────────────────────── */}
//       <Modal
//         visible={popupVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closePopup}
//       >
//         <View style={styles.overlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             style={styles.popup}
//           >
//             <View
//               style={[
//                 styles.popupIconWrap,
//                 {
//                   backgroundColor:
//                     popupType === "success"
//                       ? "#D1FAE5"
//                       : "#FEE2E2",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name={
//                   popupType === "success"
//                     ? "checkmark-circle"
//                     : "alert-circle"
//                 }
//                 size={36}
//                 color={popupType === "success" ? "#10B981" : "#EF4444"}
//               />
//             </View>
//             <Text style={styles.popupTitle}>{popupTitle}</Text>
//             <Text style={styles.popupMessage}>{popupMessage}</Text>
//             <Pressable
//               style={[
//                 styles.popupBtn,
//                 {
//                   backgroundColor:
//                     popupType === "success" ? "#10B981" : COLORS.admin,
//                 },
//               ]}
//               onPress={closePopup}
//             >
//               <Text style={styles.popupBtnText}>OK</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: COLORS.background,
//     padding: 24,
//     justifyContent: "center",
//   },
//   logoBox: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   shieldContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 24,
//     backgroundColor: COLORS.admin,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//     shadowColor: COLORS.admin,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 12,
//   },
//   logo: {
//     fontSize: 32,
//     fontWeight: "900",
//     color: COLORS.admin,
//     letterSpacing: -0.5,
//   },
//   tagline: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 26,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 20,
//     elevation: 6,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: COLORS.text,
//     marginBottom: 20,
//   },
//   forgotLink: {
//     alignSelf: "flex-end",
//     marginTop: 4,
//     marginBottom: 8,
//   },
//   forgotText: {
//     color: COLORS.admin,
//     fontSize: 13,
//     fontWeight: "700",
//   },
//   footerNote: {
//     textAlign: "center",
//     marginTop: 24,
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   backRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   backText: {
//     color: COLORS.admin,
//     fontWeight: "700",
//     fontSize: 14,
//     marginLeft: 6,
//   },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: COLORS.muted,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: 8,
//   },
//   questionBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.background || "#F8FAFC",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//   },
//   questionText: {
//     flex: 1,
//     color: COLORS.text,
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   // Popup
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.45)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//   },
//   popup: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//     width: "100%",
//     maxWidth: 360,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   popupIconWrap: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 14,
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: COLORS.text || "#1E293B",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   popupMessage: {
//     fontSize: 14,
//     color: COLORS.muted || "#64748B",
//     textAlign: "center",
//     lineHeight: 20,
//     marginBottom: 20,
//   },
//   popupBtn: {
//     paddingHorizontal: 36,
//     paddingVertical: 12,
//     borderRadius: 14,
//   },
//   popupBtnText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 15,
//   },
// });  































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import * as Haptics from "expo-haptics";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// // ─── Admin Credentials (hardcoded — no backend admin auth endpoint) ────────────
// const ADMIN_EMAIL = "admin@mediqueue.com";
// const ADMIN_PASSWORD = "Admin@123";
// // Security question for forgot password
// const SECURITY_QUESTION = "What is the MediQueue admin secret key?";
// const SECURITY_ANSWER = "mediqueue2026";

// export default function AdminLoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ── Screen mode: "login" | "forgot"
//   const [screen, setScreen] = useState("login");
//   const [forgotStep, setForgotStep] = useState(1); // 1=security Q, 2=new password
//   const [securityAnswer, setSecurityAnswer] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // ── Popup
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("error"); // "error" | "success"

//   const showPopup = (title, msg, type = "error") => {
//     setPopupTitle(title);
//     setPopupMessage(msg);
//     setPopupType(type);
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//     if (popupType === "success" && screen === "forgot") {
//       setScreen("login");
//       setForgotStep(1);
//       setSecurityAnswer("");
//       setNewPassword("");
//       setConfirmPassword("");
//     }
//   };

//   // ── LOGIN ────────────────────────────────────────────────────────────────────
//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       showPopup("Missing Fields", "Please enter both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await new Promise((r) => setTimeout(r, 500));

//       // Check if admin has set a custom password — fall back to default if not
//       const savedPassword = await AsyncStorage.getItem("adminPassword");
//       const activePassword = savedPassword || ADMIN_PASSWORD;

//       if (
//         email.trim().toLowerCase() !== ADMIN_EMAIL ||
//         password !== activePassword
//       ) {
//         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//         showPopup(
//           "Access Denied",
//           "Incorrect email or password.\nPlease check your credentials."
//         );
//         return;
//       }

//       await AsyncStorage.multiSet([
//         ["adminToken", "admin_session_active"],
//         ["userRole", "ADMIN"],
//       ]);

//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//       navigation.reset({ index: 0, routes: [{ name: "AdminTabs" }] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── FORGOT PASSWORD ──────────────────────────────────────────────────────────
//   const handleForgotStep1 = () => {
//     if (!securityAnswer.trim()) {
//       showPopup("Missing Answer", "Please enter the answer to the security question.");
//       return;
//     }
//     if (securityAnswer.trim().toLowerCase() !== SECURITY_ANSWER) {
//       showPopup("Wrong Answer", "The security answer you entered is incorrect.");
//       return;
//     }
//     setForgotStep(2);
//   };

//   const handleResetPassword = async () => {
//     if (!newPassword.trim() || !confirmPassword.trim()) {
//       showPopup("Missing Fields", "Please fill in both password fields.");
//       return;
//     }
//     if (newPassword.length < 6) {
//       showPopup("Weak Password", "Password must be at least 6 characters.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       showPopup("Password Mismatch", "Passwords do not match.");
//       return;
//     }
//     // Save new password to AsyncStorage so it persists across sessions
//     await AsyncStorage.setItem("adminPassword", newPassword);
//     showPopup(
//       "Password Reset Successful",
//       "Your admin password has been updated. Please login with your new password.",
//       "success"
//     );
//   };

//   // ── RENDER ───────────────────────────────────────────────────────────────────
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Logo */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.7 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 900 }}
//           style={styles.logoBox}
//         >
//           <View style={styles.shieldContainer}>
//             <Ionicons name="shield-checkmark" size={64} color="#fff" />
//           </View>
//           <Text style={styles.logo}>Super Admin</Text>
//           <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
//         </MotiView>

//         {/* ─── LOGIN SCREEN ─────────────────────────────────────────────────── */}
//         {screen === "login" && (
//           <MotiView
//             from={{ opacity: 0, translateY: 30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 700, delay: 200 }}
//             style={styles.card}
//           >
//             <Text style={styles.title}>Admin Login</Text>

//             <MotiView
//               from={{ opacity: 0, translateX: -15 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 450 }}
//             >
//               <InputField
//                 label="Admin Email"
//                 placeholder="admin@mediqueue.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 icon="mail-unread-outline"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </MotiView>

//             <MotiView
//               from={{ opacity: 0, translateX: -15 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 600 }}
//             >
//               <InputField
//                 label="Security Password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 icon="key-outline"
//               />
//             </MotiView>

//             {/* Forgot Password Link */}
//             <Pressable
//               onPress={() => {
//                 setScreen("forgot");
//                 setForgotStep(1);
//               }}
//               style={styles.forgotLink}
//             >
//               <Text style={styles.forgotText}>Forgot Password?</Text>
//             </Pressable>

//             <MotiView
//               from={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 800 }}
//               style={{ marginTop: 12 }}
//             >
//               <GradientButton
//                 title={loading ? "Verifying..." : "Access Control Center"}
//                 colors={[COLORS.admin, "#8B5CF6"]}
//                 onPress={handleLogin}
//                 disabled={loading}
//               />
//             </MotiView>

//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               transition={{ delay: 1000 }}
//             >
//               <Text style={styles.footerNote}>Authorized Personnel Only</Text>
//             </MotiView>
//           </MotiView>
//         )}

//         {/* ─── FORGOT PASSWORD SCREEN ───────────────────────────────────────── */}
//         {screen === "forgot" && (
//           <MotiView
//             from={{ opacity: 0, translateY: 30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//             style={styles.card}
//           >
//             <Pressable onPress={() => setScreen("login")} style={styles.backRow}>
//               <Ionicons name="arrow-back" size={20} color={COLORS.admin} />
//               <Text style={styles.backText}>Back to Login</Text>
//             </Pressable>

//             <Text style={styles.title}>Reset Password</Text>

//             {forgotStep === 1 && (
//               <>
//                 <Text style={styles.sectionLabel}>Security Question</Text>
//                 <View style={styles.questionBox}>
//                   <Ionicons
//                     name="help-circle-outline"
//                     size={20}
//                     color={COLORS.admin}
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={styles.questionText}>{SECURITY_QUESTION}</Text>
//                 </View>

//                 <InputField
//                   label="Your Answer"
//                   placeholder="Enter the secret key"
//                   value={securityAnswer}
//                   onChangeText={setSecurityAnswer}
//                   icon="lock-closed-outline"
//                   autoCapitalize="none"
//                 />

//                 <GradientButton
//                   title="Verify Answer"
//                   colors={[COLORS.admin, "#8B5CF6"]}
//                   onPress={handleForgotStep1}
//                 />
//               </>
//             )}

//             {forgotStep === 2 && (
//               <>
//                 <InputField
//                   label="New Password"
//                   placeholder="Min. 6 characters"
//                   value={newPassword}
//                   onChangeText={setNewPassword}
//                   secureTextEntry
//                   icon="key-outline"
//                 />
//                 <InputField
//                   label="Confirm Password"
//                   placeholder="Repeat new password"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry
//                   icon="checkmark-circle-outline"
//                 />
//                 <GradientButton
//                   title="Reset Password"
//                   colors={[COLORS.admin, "#8B5CF6"]}
//                   onPress={handleResetPassword}
//                 />
//               </>
//             )}
//           </MotiView>
//         )}
//       </ScrollView>

//       {/* ─── POPUP MODAL ──────────────────────────────────────────────────────── */}
//       <Modal
//         visible={popupVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closePopup}
//       >
//         <View style={styles.overlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             style={styles.popup}
//           >
//             <View
//               style={[
//                 styles.popupIconWrap,
//                 {
//                   backgroundColor:
//                     popupType === "success"
//                       ? "#D1FAE5"
//                       : "#FEE2E2",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name={
//                   popupType === "success"
//                     ? "checkmark-circle"
//                     : "alert-circle"
//                 }
//                 size={36}
//                 color={popupType === "success" ? "#10B981" : "#EF4444"}
//               />
//             </View>
//             <Text style={styles.popupTitle}>{popupTitle}</Text>
//             <Text style={styles.popupMessage}>{popupMessage}</Text>
//             <Pressable
//               style={[
//                 styles.popupBtn,
//                 {
//                   backgroundColor:
//                     popupType === "success" ? "#10B981" : COLORS.admin,
//                 },
//               ]}
//               onPress={closePopup}
//             >
//               <Text style={styles.popupBtnText}>OK</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: COLORS.background,
//     padding: 24,
//     justifyContent: "center",
//   },
//   logoBox: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   shieldContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 24,
//     backgroundColor: COLORS.admin,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//     shadowColor: COLORS.admin,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 12,
//   },
//   logo: {
//     fontSize: 32,
//     fontWeight: "900",
//     color: COLORS.admin,
//     letterSpacing: -0.5,
//   },
//   tagline: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 26,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 20,
//     elevation: 6,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: COLORS.text,
//     marginBottom: 20,
//   },
//   forgotLink: {
//     alignSelf: "flex-end",
//     marginTop: 4,
//     marginBottom: 8,
//   },
//   forgotText: {
//     color: COLORS.admin,
//     fontSize: 13,
//     fontWeight: "700",
//   },
//   footerNote: {
//     textAlign: "center",
//     marginTop: 24,
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   backRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   backText: {
//     color: COLORS.admin,
//     fontWeight: "700",
//     fontSize: 14,
//     marginLeft: 6,
//   },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: COLORS.muted,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: 8,
//   },
//   questionBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.background || "#F8FAFC",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//   },
//   questionText: {
//     flex: 1,
//     color: COLORS.text,
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   // Popup
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.45)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//   },
//   popup: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//     width: "100%",
//     maxWidth: 360,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   popupIconWrap: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 14,
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: COLORS.text || "#1E293B",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   popupMessage: {
//     fontSize: 14,
//     color: COLORS.muted || "#64748B",
//     textAlign: "center",
//     lineHeight: 20,
//     marginBottom: 20,
//   },
//   popupBtn: {
//     paddingHorizontal: 36,
//     paddingVertical: 12,
//     borderRadius: 14,
//   },
//   popupBtnText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 15,
//   },
// });  































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Modal,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import * as Haptics from "expo-haptics";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// // ─── Admin Credentials (hardcoded — no backend admin auth endpoint) ────────────
// const ADMIN_EMAIL = "admin@mediqueue.com";
// const ADMIN_PASSWORD = "Admin@123";
// // Security question for forgot password
// const SECURITY_QUESTION = "What is the MediQueue admin secret key?";
// const SECURITY_ANSWER = "mediqueue2026";

// export default function AdminLoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ── Screen mode: "login" | "forgot"
//   const [screen, setScreen] = useState("login");
//   const [forgotStep, setForgotStep] = useState(1); // 1=security Q, 2=new password
//   const [securityAnswer, setSecurityAnswer] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // ── Popup
//   const [popupVisible, setPopupVisible] = useState(false);
//   const [popupTitle, setPopupTitle] = useState("");
//   const [popupMessage, setPopupMessage] = useState("");
//   const [popupType, setPopupType] = useState("error"); // "error" | "success"

//   const showPopup = (title, msg, type = "error") => {
//     setPopupTitle(title);
//     setPopupMessage(msg);
//     setPopupType(type);
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//     if (popupType === "success" && screen === "forgot") {
//       setScreen("login");
//       setForgotStep(1);
//       setSecurityAnswer("");
//       setNewPassword("");
//       setConfirmPassword("");
//     }
//   };

//   // ── LOGIN ────────────────────────────────────────────────────────────────────
//   const handleLogin = async () => {
//     if (!email.trim() || !password.trim()) {
//       showPopup("Missing Fields", "Please enter both email and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await new Promise((r) => setTimeout(r, 500));

//       // Check if admin has set a custom password — fall back to default if not
//       const savedPassword = await AsyncStorage.getItem("adminPassword");
//       const activePassword = savedPassword || ADMIN_PASSWORD;

//       // ✅ FIX: trim both sides to avoid whitespace mismatch
//       if (
//         email.trim().toLowerCase() !== ADMIN_EMAIL ||
//         password.trim() !== activePassword.trim()
//       ) {
//         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//         showPopup(
//           "Access Denied",
//           "Incorrect email or password.\nPlease check your credentials."
//         );
//         return;
//       }

//       await AsyncStorage.multiSet([
//         ["adminToken", "admin_session_active"],
//         ["userRole", "ADMIN"],
//       ]);

//       Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//       navigation.reset({ index: 0, routes: [{ name: "AdminTabs" }] });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── FORGOT PASSWORD ──────────────────────────────────────────────────────────
//   const handleForgotStep1 = () => {
//     if (!securityAnswer.trim()) {
//       showPopup("Missing Answer", "Please enter the answer to the security question.");
//       return;
//     }
//     if (securityAnswer.trim().toLowerCase() !== SECURITY_ANSWER) {
//       showPopup("Wrong Answer", "The security answer you entered is incorrect.");
//       return;
//     }
//     setForgotStep(2);
//   };

//   const handleResetPassword = async () => {
//     if (!newPassword.trim() || !confirmPassword.trim()) {
//       showPopup("Missing Fields", "Please fill in both password fields.");
//       return;
//     }
//     if (newPassword.length < 6) {
//       showPopup("Weak Password", "Password must be at least 6 characters.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       showPopup("Password Mismatch", "Passwords do not match.");
//       return;
//     }
//     // ✅ FIX: trim before saving so no hidden whitespace causes mismatch on login
//     await AsyncStorage.setItem("adminPassword", newPassword.trim());
//     showPopup(
//       "Password Reset Successful",
//       "Your admin password has been updated. Please login with your new password.",
//       "success"
//     );
//   };

//   // ── RENDER ───────────────────────────────────────────────────────────────────
//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Logo */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.7 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 900 }}
//           style={styles.logoBox}
//         >
//           <View style={styles.shieldContainer}>
//             <Ionicons name="shield-checkmark" size={64} color="#fff" />
//           </View>
//           <Text style={styles.logo}>Super Admin</Text>
//           <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
//         </MotiView>

//         {/* ─── LOGIN SCREEN ─────────────────────────────────────────────────── */}
//         {screen === "login" && (
//           <MotiView
//             from={{ opacity: 0, translateY: 30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 700, delay: 200 }}
//             style={styles.card}
//           >
//             <Text style={styles.title}>Admin Login</Text>

//             <MotiView
//               from={{ opacity: 0, translateX: -15 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 450 }}
//             >
//               <InputField
//                 label="Admin Email"
//                 placeholder="admin@mediqueue.com"
//                 value={email}
//                 onChangeText={setEmail}
//                 icon="mail-unread-outline"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//               />
//             </MotiView>

//             <MotiView
//               from={{ opacity: 0, translateX: -15 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 600 }}
//             >
//               <InputField
//                 label="Security Password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//                 icon="key-outline"
//               />
//             </MotiView>

//             {/* Forgot Password Link */}
//             <Pressable
//               onPress={() => {
//                 setScreen("forgot");
//                 setForgotStep(1);
//               }}
//               style={styles.forgotLink}
//             >
//               <Text style={styles.forgotText}>Forgot Password?</Text>
//             </Pressable>

//             <MotiView
//               from={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 800 }}
//               style={{ marginTop: 12 }}
//             >
//               <GradientButton
//                 title={loading ? "Verifying..." : "Access Control Center"}
//                 colors={[COLORS.admin, "#8B5CF6"]}
//                 onPress={handleLogin}
//                 disabled={loading}
//               />
//             </MotiView>

//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 0.6 }}
//               transition={{ delay: 1000 }}
//             >
//               <Text style={styles.footerNote}>Authorized Personnel Only</Text>
//             </MotiView>
//           </MotiView>
//         )}

//         {/* ─── FORGOT PASSWORD SCREEN ───────────────────────────────────────── */}
//         {screen === "forgot" && (
//           <MotiView
//             from={{ opacity: 0, translateY: 30 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//             style={styles.card}
//           >
//             <Pressable onPress={() => setScreen("login")} style={styles.backRow}>
//               <Ionicons name="arrow-back" size={20} color={COLORS.admin} />
//               <Text style={styles.backText}>Back to Login</Text>
//             </Pressable>

//             <Text style={styles.title}>Reset Password</Text>

//             {forgotStep === 1 && (
//               <>
//                 <Text style={styles.sectionLabel}>Security Question</Text>
//                 <View style={styles.questionBox}>
//                   <Ionicons
//                     name="help-circle-outline"
//                     size={20}
//                     color={COLORS.admin}
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={styles.questionText}>{SECURITY_QUESTION}</Text>
//                 </View>

//                 <InputField
//                   label="Your Answer"
//                   placeholder="Enter the secret key"
//                   value={securityAnswer}
//                   onChangeText={setSecurityAnswer}
//                   icon="lock-closed-outline"
//                   autoCapitalize="none"
//                 />

//                 <GradientButton
//                   title="Verify Answer"
//                   colors={[COLORS.admin, "#8B5CF6"]}
//                   onPress={handleForgotStep1}
//                 />
//               </>
//             )}

//             {forgotStep === 2 && (
//               <>
//                 <InputField
//                   label="New Password"
//                   placeholder="Min. 6 characters"
//                   value={newPassword}
//                   onChangeText={setNewPassword}
//                   secureTextEntry
//                   icon="key-outline"
//                 />
//                 <InputField
//                   label="Confirm Password"
//                   placeholder="Repeat new password"
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry
//                   icon="checkmark-circle-outline"
//                 />
//                 <GradientButton
//                   title="Reset Password"
//                   colors={[COLORS.admin, "#8B5CF6"]}
//                   onPress={handleResetPassword}
//                 />
//               </>
//             )}
//           </MotiView>
//         )}
//       </ScrollView>

//       {/* ─── POPUP MODAL ──────────────────────────────────────────────────────── */}
//       <Modal
//         visible={popupVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closePopup}
//       >
//         <View style={styles.overlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.85 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             style={styles.popup}
//           >
//             <View
//               style={[
//                 styles.popupIconWrap,
//                 {
//                   backgroundColor:
//                     popupType === "success" ? "#D1FAE5" : "#FEE2E2",
//                 },
//               ]}
//             >
//               <Ionicons
//                 name={popupType === "success" ? "checkmark-circle" : "alert-circle"}
//                 size={36}
//                 color={popupType === "success" ? "#10B981" : "#EF4444"}
//               />
//             </View>
//             <Text style={styles.popupTitle}>{popupTitle}</Text>
//             <Text style={styles.popupMessage}>{popupMessage}</Text>
//             <Pressable
//               style={[
//                 styles.popupBtn,
//                 {
//                   backgroundColor:
//                     popupType === "success" ? "#10B981" : COLORS.admin,
//                 },
//               ]}
//               onPress={closePopup}
//             >
//               <Text style={styles.popupBtnText}>OK</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: COLORS.background,
//     padding: 24,
//     justifyContent: "center",
//   },
//   logoBox: {
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   shieldContainer: {
//     width: 100,
//     height: 100,
//     borderRadius: 24,
//     backgroundColor: COLORS.admin,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//     shadowColor: COLORS.admin,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     elevation: 12,
//   },
//   logo: {
//     fontSize: 32,
//     fontWeight: "900",
//     color: COLORS.admin,
//     letterSpacing: -0.5,
//   },
//   tagline: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontSize: 14,
//     fontWeight: "500",
//     textAlign: "center",
//   },
//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 26,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 20,
//     elevation: 6,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: COLORS.text,
//     marginBottom: 20,
//   },
//   forgotLink: {
//     alignSelf: "flex-end",
//     marginTop: 4,
//     marginBottom: 8,
//   },
//   forgotText: {
//     color: COLORS.admin,
//     fontSize: 13,
//     fontWeight: "700",
//   },
//   footerNote: {
//     textAlign: "center",
//     marginTop: 24,
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "700",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },
//   backRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   backText: {
//     color: COLORS.admin,
//     fontWeight: "700",
//     fontSize: 14,
//     marginLeft: 6,
//   },
//   sectionLabel: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: COLORS.muted,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: 8,
//   },
//   questionBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: COLORS.background || "#F8FAFC",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//   },
//   questionText: {
//     flex: 1,
//     color: COLORS.text,
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   // Popup
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.45)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//   },
//   popup: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//     width: "100%",
//     maxWidth: 360,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   popupIconWrap: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 14,
//   },
//   popupTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: COLORS.text || "#1E293B",
//     textAlign: "center",
//     marginBottom: 8,
//   },
//   popupMessage: {
//     fontSize: 14,
//     color: COLORS.muted || "#64748B",
//     textAlign: "center",
//     lineHeight: 20,
//     marginBottom: 20,
//   },
//   popupBtn: {
//     paddingHorizontal: 36,
//     paddingVertical: 12,
//     borderRadius: 14,
//   },
//   popupBtnText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 15,
//   },
// });  





































import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/colors";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { adminLogin, adminResetPassword } from "../../services/apiService";

// Security question (answer also validated on backend)
const SECURITY_QUESTION = "What is the MediQueue admin secret key?";

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const [screen, setScreen]         = useState("login");
  const [forgotStep, setForgotStep] = useState(1);
  const [securityAnswer, setSecurityAnswer]   = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle]     = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType]       = useState("error");

  const showPopup = (title, msg, type = "error") => {
    setPopupTitle(title);
    setPopupMessage(msg);
    setPopupType(type);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    if (popupType === "success" && screen === "forgot") {
      setScreen("login");
      setForgotStep(1);
      setSecurityAnswer("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // ── LOGIN — calls POST /api/admin/login → verified against MySQL DB ────────
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showPopup("Missing Fields", "Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await adminLogin(email.trim().toLowerCase(), password.trim());
      await AsyncStorage.multiSet([
        ["adminToken", "admin_session_active"],
        ["userRole",   "ADMIN"],
      ]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.reset({ index: 0, routes: [{ name: "AdminTabs" }] });
    } catch (err) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showPopup(
        "Access Denied",
        err.message || "Incorrect email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  // ── STEP 1: verify security answer ───────────────────────────────────────
  const handleForgotStep1 = () => {
    if (!securityAnswer.trim()) {
      showPopup("Missing Answer", "Please enter the answer to the security question.");
      return;
    }
    if (securityAnswer.trim().toLowerCase() !== "mediqueue2026") {
      showPopup("Wrong Answer", "The security answer you entered is incorrect.");
      return;
    }
    setForgotStep(2);
  };

  // ── STEP 2: reset password → saved to MySQL DB ────────────────────────────
  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      showPopup("Missing Fields", "Please fill in both password fields.");
      return;
    }
    if (newPassword.trim().length < 6) {
      showPopup("Weak Password", "Password must be at least 6 characters.");
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      showPopup("Password Mismatch", "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await adminResetPassword(
        "",
        securityAnswer.trim(),
        newPassword.trim()
      );
      showPopup(
        "Password Reset Successful",
        "Your admin password has been updated. Please login with your new password.",
        "success"
      );
    } catch (err) {
      showPopup("Error", err.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <MotiView
          from={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 900 }}
          style={styles.logoBox}
        >
          <View style={styles.shieldContainer}>
            <Ionicons name="shield-checkmark" size={64} color="#fff" />
          </View>
          <Text style={styles.logo}>Super Admin</Text>
          <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
        </MotiView>

        {screen === "login" && (
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 700, delay: 200 }}
            style={styles.card}
          >
            <Text style={styles.title}>Admin Login</Text>
            <MotiView from={{ opacity: 0, translateX: -15 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 450 }}>
              <InputField
                label="Admin Email"
                placeholder=""
                value={email}
                onChangeText={setEmail}
                icon="mail-unread-outline"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </MotiView>
            <MotiView from={{ opacity: 0, translateX: -15 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 600 }}>
              <InputField
                label="Security Password"
                placeholder=""
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon="key-outline"
              />
            </MotiView>
            <Pressable onPress={() => { setScreen("forgot"); setForgotStep(1); }} style={styles.forgotLink}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
            <MotiView from={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 800 }} style={{ marginTop: 12 }}>
              <GradientButton
                title={loading ? "Verifying..." : "Access Control Center"}
                colors={[COLORS.admin, "#8B5CF6"]}
                onPress={handleLogin}
                disabled={loading}
              />
            </MotiView>
            <MotiView from={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1000 }}>
              <Text style={styles.footerNote}>Authorized Personnel Only</Text>
            </MotiView>
          </MotiView>
        )}

        {screen === "forgot" && (
          <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 600 }}
            style={styles.card}
          >
            <Pressable onPress={() => setScreen("login")} style={styles.backRow}>
              <Ionicons name="arrow-back" size={20} color={COLORS.admin} />
              <Text style={styles.backText}>Back to Login</Text>
            </Pressable>
            <Text style={styles.title}>Reset Password</Text>

            {forgotStep === 1 && (
              <>
                <Text style={styles.sectionLabel}>Security Question</Text>
                <View style={styles.questionBox}>
                  <Ionicons name="help-circle-outline" size={20} color={COLORS.admin} style={{ marginRight: 8 }} />
                  <Text style={styles.questionText}>{SECURITY_QUESTION}</Text>
                </View>
                <InputField
                  label="Your Answer"
                  placeholder="Enter the secret key"
                  value={securityAnswer}
                  onChangeText={setSecurityAnswer}
                  icon="lock-closed-outline"
                  autoCapitalize="none"
                />
                <GradientButton title="Verify Answer" colors={[COLORS.admin, "#8B5CF6"]} onPress={handleForgotStep1} />
              </>
            )}

            {forgotStep === 2 && (
              <>
                <InputField
                  label="New Password"
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  icon="key-outline"
                />
                <InputField
                  label="Confirm Password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  icon="checkmark-circle-outline"
                />
                <GradientButton
                  title={loading ? "Resetting..." : "Reset Password"}
                  colors={[COLORS.admin, "#8B5CF6"]}
                  onPress={handleResetPassword}
                  disabled={loading}
                />
              </>
            )}
          </MotiView>
        )}
      </ScrollView>

      <Modal visible={popupVisible} transparent animationType="fade" onRequestClose={closePopup}>
        <View style={styles.overlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={styles.popup}
          >
            <View style={[styles.popupIconWrap, { backgroundColor: popupType === "success" ? "#D1FAE5" : "#FEE2E2" }]}>
              <Ionicons
                name={popupType === "success" ? "checkmark-circle" : "alert-circle"}
                size={36}
                color={popupType === "success" ? "#10B981" : "#EF4444"}
              />
            </View>
            <Text style={styles.popupTitle}>{popupTitle}</Text>
            <Text style={styles.popupMessage}>{popupMessage}</Text>
            <Pressable style={[styles.popupBtn, { backgroundColor: popupType === "success" ? "#10B981" : COLORS.admin }]} onPress={closePopup}>
              <Text style={styles.popupBtnText}>{popupType === "success" ? "Go to Login" : "OK"}</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: COLORS.background, padding: 24, justifyContent: "center" },
  logoBox: { alignItems: "center", marginBottom: 40 },
  shieldContainer: {
    width: 100, height: 100, borderRadius: 24, backgroundColor: COLORS.admin,
    justifyContent: "center", alignItems: "center", marginBottom: 16,
    shadowColor: COLORS.admin, shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3, shadowRadius: 15, elevation: 12,
  },
  logo: { fontSize: 32, fontWeight: "900", color: COLORS.admin, letterSpacing: -0.5 },
  tagline: { color: COLORS.muted, marginTop: 6, fontSize: 14, fontWeight: "500", textAlign: "center" },
  card: {
    backgroundColor: COLORS.card || "#FFF", borderRadius: 32, padding: 26,
    borderWidth: 1, borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 20, elevation: 6,
  },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.text, marginBottom: 20 },
  forgotLink: { alignSelf: "flex-end", marginTop: 4, marginBottom: 8 },
  forgotText: { color: COLORS.admin, fontSize: 13, fontWeight: "700" },
  footerNote: { textAlign: "center", marginTop: 24, color: COLORS.muted, fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 },
  backRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backText: { color: COLORS.admin, fontWeight: "700", fontSize: 14, marginLeft: 6 },
  sectionLabel: { fontSize: 13, fontWeight: "700", color: COLORS.muted, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 },
  questionBox: {
    flexDirection: "row", alignItems: "center", backgroundColor: COLORS.background || "#F8FAFC",
    borderRadius: 12, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border || "#E2E8F0",
  },
  questionText: { flex: 1, color: COLORS.text, fontSize: 14, fontWeight: "600" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center", padding: 24 },
  popup: {
    backgroundColor: "#fff", borderRadius: 24, padding: 28, alignItems: "center",
    width: "100%", maxWidth: 360, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 20, elevation: 10,
  },
  popupIconWrap: { width: 64, height: 64, borderRadius: 32, justifyContent: "center", alignItems: "center", marginBottom: 14 },
  popupTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text || "#1E293B", textAlign: "center", marginBottom: 8 },
  popupMessage: { fontSize: 14, color: COLORS.muted || "#64748B", textAlign: "center", lineHeight: 20, marginBottom: 20 },
  popupBtn: { paddingHorizontal: 36, paddingVertical: 12, borderRadius: 14 },
  popupBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 },
});