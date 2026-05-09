// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function StaffLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoBox}>
//         <Ionicons name="medkit-outline" size={78} color={COLORS.staff} />
//         <Text style={styles.logo}>Hospital Staff</Text>
//         <Text style={styles.tagline}>Manage live queue and tokens</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Staff Login</Text>

//         <InputField label="Hospital ID" value="HSP12456" />
//         <InputField label="Mobile / Email" value="staff@citycare.com" />
//         <InputField label="Password" value="123456" secureTextEntry />

//         <GradientButton
//           title="Login"
//           colors={[COLORS.staff, "#14B8A6"]}
//           onPress={() => navigation.replace("StaffTabs")}
//         />

//         <TouchableOpacity onPress={() => navigation.navigate("HospitalRegister")}>
//           <Text style={styles.register}>Register New Hospital</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 22 },
//   logoBox: { alignItems: "center", marginTop: 72, marginBottom: 28 },
//   logo: { fontSize: 30, fontWeight: "900", color: COLORS.staff },
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
//   register: {
//     textAlign: "center",
//     marginTop: 22,
//     color: COLORS.staff,
//     fontWeight: "900",
//   },
// });  























// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import * as Haptics from "expo-haptics";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function StaffLoginScreen({ navigation }) {
//   const [hospitalId, setHospitalId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//     navigation.replace("StaffTabs");
//   };

//   return (
//     <View style={styles.container}>
//       {/* 1. Logo & Header Animation */}
//       <MotiView 
//         from={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ type: 'timing', duration: 800 }}
//         style={styles.logoBox}
//       >
//         <View style={[styles.iconCircle, { backgroundColor: COLORS.staff }]}>
//           <Ionicons name="medkit" size={60} color="#fff" />
//         </View>
//         <Text style={styles.logo}>Hospital Staff</Text>
//         <Text style={styles.tagline}>Manage live queue and tokens</Text>
//       </MotiView>

//       {/* 2. Main Login Card Animation */}
//       <MotiView 
//         from={{ opacity: 0, translateY: 40 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: 'timing', duration: 600, delay: 200 }}
//         style={styles.card}
//       >
//         <Text style={styles.title}>Staff Login</Text>

//         {/* 3. Input Fields - One by One Slide */}
//         <MotiView
//           from={{ opacity: 0, translateX: -20 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 400 }}
//         >
//           <InputField 
//             label="Hospital ID" 
//             placeholder="HSP12345"
//             value={hospitalId}
//             onChangeText={setHospitalId}
//             icon="business-outline"
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateX: -20 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 550 }}
//         >
//           <InputField 
//             label="Mobile / Email" 
//             placeholder="staff@citycare.com"
//             value={email}
//             onChangeText={setEmail}
//             icon="mail-outline"
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateX: -20 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 700 }}
//         >
//           <InputField 
//             label="Password" 
//             placeholder="••••••••"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry 
//             icon="lock-closed-outline"
//           />
//         </MotiView>

//         {/* Login Button with subtle pop */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 900 }}
//           style={{ marginTop: 12 }}
//         >
//           <GradientButton
//             title="Login to Dashboard"
//             colors={[COLORS.staff, "#14B8A6"]}
//             onPress={handleLogin}
//           />
//         </MotiView>

//         <TouchableOpacity 
//           onPress={() => navigation.navigate("HospitalRegister")}
//           activeOpacity={0.7}
//         >
//           <MotiView
//             from={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1100 }}
//           >
//             <Text style={styles.register}>Register New Hospital</Text>
//           </MotiView>
//         </TouchableOpacity>
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
//     marginBottom: 32 
//   },
//   iconCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 28, // More "medical" squared-circle look
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 6,
//   },
//   logo: { 
//     fontSize: 32, 
//     fontWeight: "900", 
//     color: COLORS.staff,
//     letterSpacing: -0.5
//   },
//   tagline: { 
//     color: COLORS.muted, 
//     marginTop: 6,
//     fontSize: 15,
//     fontWeight: '500'
//   },
//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 26,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 15,
//     elevation: 5,
//   },
//   title: { 
//     fontSize: 24, 
//     fontWeight: "800", 
//     color: COLORS.text, 
//     marginBottom: 20 
//   },
//   register: {
//     textAlign: "center",
//     marginTop: 22,
//     color: COLORS.staff,
//     fontWeight: "800",
//     fontSize: 15,
//     textDecorationLine: 'underline'
//   },
// });  




























// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Pressable,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import * as Haptics from "expo-haptics";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function StaffLoginScreen({ navigation }) {
//   const [hospitalId, setHospitalId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [forgotModalVisible, setForgotModalVisible] = useState(false);
//   const [resetHospitalId, setResetHospitalId] = useState("");
//   const [resetEmail, setResetEmail] = useState("");
//   const [resetSuccessVisible, setResetSuccessVisible] = useState(false);

//   const handleLogin = () => {
//     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

//     // You can add real validation/backend login here later.
//     navigation.replace("StaffTabs");
//   };

//   const openForgotPassword = () => {
//     setResetHospitalId(hospitalId);
//     setResetEmail(email);
//     setForgotModalVisible(true);
//   };

//   const closeForgotPassword = () => {
//     setForgotModalVisible(false);
//   };

//   const handleSendResetLink = () => {
//     if (!resetHospitalId.trim()) {
//       Alert.alert("Hospital ID Required", "Please enter your Hospital ID.");
//       return;
//     }

//     if (!resetEmail.trim()) {
//       Alert.alert(
//         "Mobile / Email Required",
//         "Please enter registered mobile number or email."
//       );
//       return;
//     }

//     Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

//     setForgotModalVisible(false);
//     setResetSuccessVisible(true);
//   };

//   const closeResetSuccess = () => {
//     setResetSuccessVisible(false);
//     setResetHospitalId("");
//     setResetEmail("");
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Logo & Header Animation */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 800 }}
//           style={styles.logoBox}
//         >
//           <View style={[styles.iconCircle, { backgroundColor: COLORS.staff }]}>
//             <Ionicons name="medkit" size={60} color="#fff" />
//           </View>

//           <Text style={styles.logo}>Hospital Staff</Text>
//           <Text style={styles.tagline}>Manage live queue and tokens</Text>
//         </MotiView>

//         {/* Main Login Card Animation */}
//         <MotiView
//           from={{ opacity: 0, translateY: 40 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 600, delay: 200 }}
//           style={styles.card}
//         >
//           <Text style={styles.title}>Staff Login</Text>

//           <MotiView
//             from={{ opacity: 0, translateX: -20 }}
//             animate={{ opacity: 1, translateX: 0 }}
//             transition={{ delay: 400 }}
//           >
//             <InputField
//               label="Hospital ID"
//               placeholder="HSP12345"
//               value={hospitalId}
//               onChangeText={setHospitalId}
//               icon="business-outline"
//             />
//           </MotiView>

//           <MotiView
//             from={{ opacity: 0, translateX: -20 }}
//             animate={{ opacity: 1, translateX: 0 }}
//             transition={{ delay: 550 }}
//           >
//             <InputField
//               label="Mobile / Email"
//               placeholder="staff@citycare.com"
//               value={email}
//               onChangeText={setEmail}
//               icon="mail-outline"
//             />
//           </MotiView>

//           <MotiView
//             from={{ opacity: 0, translateX: -20 }}
//             animate={{ opacity: 1, translateX: 0 }}
//             transition={{ delay: 700 }}
//           >
//             <InputField
//               label="Password"
//               placeholder="••••••••"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               icon="lock-closed-outline"
//             />
//           </MotiView>

//           <TouchableOpacity
//             activeOpacity={0.75}
//             onPress={openForgotPassword}
//             style={styles.forgotButton}
//           >
//             <Text style={styles.forgotText}>Forgot Password?</Text>
//           </TouchableOpacity>

//           <MotiView
//             from={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 900 }}
//             style={{ marginTop: 12 }}
//           >
//             <GradientButton
//               title="Login to Dashboard"
//               colors={[COLORS.staff, "#14B8A6"]}
//               onPress={handleLogin}
//             />
//           </MotiView>

//           <TouchableOpacity
//             onPress={() => navigation.navigate("HospitalRegister")}
//             activeOpacity={0.7}
//           >
//             <MotiView
//               from={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1100 }}
//             >
//               <Text style={styles.register}>Register New Hospital</Text>
//             </MotiView>
//           </TouchableOpacity>
//         </MotiView>
//       </ScrollView>

//       {/* Forgot Password Modal */}
//       <Modal
//         visible={forgotModalVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeForgotPassword}
//       >
//         <KeyboardAvoidingView
//           style={styles.modalOverlay}
//           behavior={Platform.OS === "ios" ? "padding" : undefined}
//         >
//           <MotiView
//             from={{ opacity: 0, scale: 0.85, translateY: 20 }}
//             animate={{ opacity: 1, scale: 1, translateY: 0 }}
//             transition={{ type: "spring", duration: 500 }}
//             style={styles.modalCard}
//           >
//             <Pressable style={styles.closeButton} onPress={closeForgotPassword}>
//               <Ionicons name="close" size={22} color={COLORS.text} />
//             </Pressable>

//             <View style={styles.modalIcon}>
//               <Ionicons name="key-outline" size={36} color="#fff" />
//             </View>

//             <Text style={styles.modalTitle}>Forgot Password</Text>

//             <Text style={styles.modalSub}>
//               Enter your registered Hospital ID and Mobile / Email. We will send
//               password reset instructions.
//             </Text>

//             <View style={styles.modalInputWrap}>
//               <InputField
//                 label="Hospital ID"
//                 placeholder="HSP12345"
//                 value={resetHospitalId}
//                 onChangeText={setResetHospitalId}
//                 icon="business-outline"
//               />

//               <InputField
//                 label="Mobile / Email"
//                 placeholder="staff@citycare.com"
//                 value={resetEmail}
//                 onChangeText={setResetEmail}
//                 icon="mail-outline"
//               />
//             </View>

//             <GradientButton
//               title="Send Reset Link"
//               colors={[COLORS.staff, "#14B8A6"]}
//               onPress={handleSendResetLink}
//             />

//             <TouchableOpacity
//               activeOpacity={0.75}
//               onPress={closeForgotPassword}
//               style={styles.cancelBtn}
//             >
//               <Text style={styles.cancelText}>Back to Login</Text>
//             </TouchableOpacity>
//           </MotiView>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Success Modal */}
//       <Modal
//         visible={resetSuccessVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={closeResetSuccess}
//       >
//         <View style={styles.modalOverlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.85, translateY: 20 }}
//             animate={{ opacity: 1, scale: 1, translateY: 0 }}
//             transition={{ type: "spring", duration: 500 }}
//             style={styles.successCard}
//           >
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark-circle" size={62} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Reset Link Sent</Text>

//             <Text style={styles.successMessage}>
//               Password reset instructions have been sent to the registered
//               mobile number or email.
//             </Text>

//             <Pressable style={styles.doneButton} onPress={closeResetSuccess}>
//               <Text style={styles.doneButtonText}>Done</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   scrollContent: {
//     flexGrow: 1,
//     padding: 24,
//     justifyContent: "center",
//   },

//   logoBox: {
//     alignItems: "center",
//     marginBottom: 32,
//   },

//   iconCircle: {
//     width: 90,
//     height: 90,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 6,
//   },

//   logo: {
//     fontSize: 32,
//     fontWeight: "900",
//     color: COLORS.staff,
//     letterSpacing: -0.5,
//   },

//   tagline: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontSize: 15,
//     fontWeight: "500",
//   },

//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 26,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 15,
//     elevation: 5,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "800",
//     color: COLORS.text,
//     marginBottom: 20,
//   },

//   forgotButton: {
//     alignSelf: "flex-end",
//     marginTop: 2,
//     marginBottom: 4,
//     paddingVertical: 6,
//   },

//   forgotText: {
//     color: COLORS.staff,
//     fontWeight: "900",
//     fontSize: 14,
//   },

//   register: {
//     textAlign: "center",
//     marginTop: 22,
//     color: COLORS.staff,
//     fontWeight: "800",
//     fontSize: 15,
//     textDecorationLine: "underline",
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.55)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   modalCard: {
//     width: "100%",
//     maxWidth: 420,
//     backgroundColor: COLORS.card || "#FFFFFF",
//     borderRadius: 30,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.16,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   closeButton: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: COLORS.background || "#F8FAFC",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 2,
//   },

//   modalIcon: {
//     width: 74,
//     height: 74,
//     borderRadius: 24,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//     marginBottom: 16,
//   },

//   modalTitle: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//     textAlign: "center",
//   },

//   modalSub: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontSize: 14,
//     lineHeight: 21,
//     fontWeight: "600",
//     textAlign: "center",
//   },

//   modalInputWrap: {
//     marginTop: 20,
//   },

//   cancelBtn: {
//     marginTop: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//   },

//   cancelText: {
//     color: COLORS.muted,
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   successCard: {
//     width: "100%",
//     maxWidth: 390,
//     backgroundColor: COLORS.card || "#FFFFFF",
//     borderRadius: 30,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.16,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 92,
//     height: 92,
//     borderRadius: 46,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   successTitle: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//     textAlign: "center",
//   },

//   successMessage: {
//     marginTop: 10,
//     color: COLORS.muted,
//     fontSize: 14,
//     lineHeight: 21,
//     fontWeight: "600",
//     textAlign: "center",
//   },

//   doneButton: {
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 24,
//   },

//   doneButtonText: {
//     color: "#FFFFFF",
//     fontSize: 15,
//     fontWeight: "900",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import { COLORS } from "../../constants/colors";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { loginUser } from "../../services/apiService";
import { showAlert } from "../../utility/showAlert";

export default function StaffLoginScreen({ navigation }) {
  const [hospitalId, setHospitalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [forgotModalVisible, setForgotModalVisible] = useState(false);
  const [resetHospitalId, setResetHospitalId] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccessVisible, setResetSuccessVisible] = useState(false);

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!hospitalId.trim()) {
     showAlert("Missing Hospital ID", "Please enter your Hospital ID.");
      return;
    }
    if (!email.trim()) {
      showAlert("Missing Email/Mobile", "Please enter your mobile or email.");
      return;
    }
    if (!password.trim()) {
     showAlert("Missing Password", "Please enter your password.");
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setLoading(true);
    try {
      // identifier sent as email/phone; hospitalId stored on backend per user profile
      const data = await loginUser(email.trim(), password);
      if (data.role !== "STAFF") {
        showAlert("Access Denied", "This login is only for hospital staff.");
        return;
      }
      navigation.replace("StaffTabs");
    } catch (err) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
     showAlert("Login Failed", err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openForgotPassword = () => {
    setResetHospitalId(hospitalId);
    setResetEmail(email);
    setForgotModalVisible(true);
  };

  const closeForgotPassword = () => setForgotModalVisible(false);

  // ── FORGOT / RESET ─────────────────────────────────────────────────────────
  const handleSendResetLink = async () => {
    if (!resetHospitalId.trim()) {
      showAlert("Hospital ID Required", "Please enter your Hospital ID.");
      return;
    }
    if (!resetEmail.trim()) {
      showAlert("Mobile / Email Required", "Please enter registered mobile number or email.");
      return;
    }

    setResetLoading(true);
    try {
      // TODO: await sendStaffPasswordResetApi({ hospitalId: resetHospitalId, identifier: resetEmail });
      await new Promise((r) => setTimeout(r, 800)); // demo delay
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setForgotModalVisible(false);
      setResetSuccessVisible(true);
    } catch (err) {
      showAlert("Error", err.message || "Failed to send reset link.");
    } finally {
      setResetLoading(false);
    }
  };

  const closeResetSuccess = () => {
    setResetSuccessVisible(false);
    setResetHospitalId("");
    setResetEmail("");
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 800 }}
          style={styles.logoBox}
        >
          <View style={[styles.iconCircle, { backgroundColor: COLORS.staff }]}>
            <Ionicons name="medkit" size={60} color="#fff" />
          </View>
          <Text style={styles.logo}>Hospital Staff</Text>
          <Text style={styles.tagline}>Manage live queue and tokens</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 40 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600, delay: 200 }}
          style={styles.card}
        >
          <Text style={styles.title}>Staff Login</Text>

          <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 400 }}>
            <InputField label="Hospital ID" placeholder="HSP12345" value={hospitalId} onChangeText={setHospitalId} icon="business-outline" />
          </MotiView>

          <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 550 }}>
            <InputField label="Mobile / Email" placeholder="staff@citycare.com" value={email} onChangeText={setEmail} icon="mail-outline" />
          </MotiView>

          <MotiView from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: 700 }}>
            <InputField label="Password" placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry icon="lock-closed-outline" />
          </MotiView>

          <TouchableOpacity activeOpacity={0.75} onPress={openForgotPassword} style={styles.forgotButton}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 900 }} style={{ marginTop: 12 }}>
            {loading ? (
              <ActivityIndicator color={COLORS.staff} size="large" style={{ marginVertical: 10 }} />
            ) : (
              <GradientButton title="Login to Dashboard" colors={[COLORS.staff, "#14B8A6"]} onPress={handleLogin} />
            )}
          </MotiView>

          <TouchableOpacity onPress={() => navigation.navigate("HospitalRegister")} activeOpacity={0.7}>
            <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1100 }}>
              <Text style={styles.register}>Register New Hospital</Text>
            </MotiView>
          </TouchableOpacity>
        </MotiView>
      </ScrollView>

      {/* ── FORGOT PASSWORD MODAL ── */}
      <Modal visible={forgotModalVisible} transparent animationType="fade" onRequestClose={closeForgotPassword}>
        <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <MotiView
            from={{ opacity: 0, scale: 0.85, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.modalCard}
          >
            <Pressable style={styles.closeButton} onPress={closeForgotPassword}>
              <Ionicons name="close" size={22} color={COLORS.text} />
            </Pressable>

            <View style={styles.modalIcon}>
              <Ionicons name="key-outline" size={36} color="#fff" />
            </View>

            <Text style={styles.modalTitle}>Forgot Password</Text>
            <Text style={styles.modalSub}>
              Enter your registered Hospital ID and Mobile / Email. We will send password reset instructions.
            </Text>

            <View style={styles.modalInputWrap}>
              <InputField label="Hospital ID" placeholder="HSP12345" value={resetHospitalId} onChangeText={setResetHospitalId} icon="business-outline" />
              <InputField label="Mobile / Email" placeholder="staff@citycare.com" value={resetEmail} onChangeText={setResetEmail} icon="mail-outline" />
            </View>

            {resetLoading ? (
              <ActivityIndicator color={COLORS.staff} size="large" style={{ marginVertical: 10 }} />
            ) : (
              <GradientButton title="Send Reset Link" colors={[COLORS.staff, "#14B8A6"]} onPress={handleSendResetLink} />
            )}

            <TouchableOpacity activeOpacity={0.75} onPress={closeForgotPassword} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Back to Login</Text>
            </TouchableOpacity>
          </MotiView>
        </KeyboardAvoidingView>
      </Modal>

      {/* ── RESET SUCCESS MODAL ── */}
      <Modal visible={resetSuccessVisible} transparent animationType="fade" onRequestClose={closeResetSuccess}>
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.85, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.successCard}
          >
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={62} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Reset Link Sent</Text>
            <Text style={styles.successMessage}>
              Password reset instructions have been sent to the registered mobile number or email.
            </Text>
            <Pressable style={styles.doneButton} onPress={closeResetSuccess}>
              <Text style={styles.doneButtonText}>Done</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, padding: 24, justifyContent: "center" },
  logoBox: { alignItems: "center", marginBottom: 32 },
  iconCircle: { width: 90, height: 90, borderRadius: 28, justifyContent: "center", alignItems: "center", marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 6 },
  logo: { fontSize: 32, fontWeight: "900", color: COLORS.staff, letterSpacing: -0.5 },
  tagline: { color: COLORS.muted, marginTop: 6, fontSize: 15, fontWeight: "500" },
  card: { backgroundColor: COLORS.card || "#FFF", borderRadius: 32, padding: 26, borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 15, elevation: 5 },
  title: { fontSize: 24, fontWeight: "800", color: COLORS.text, marginBottom: 20 },
  forgotButton: { alignSelf: "flex-end", marginTop: 2, marginBottom: 4, paddingVertical: 6 },
  forgotText: { color: COLORS.staff, fontWeight: "900", fontSize: 14 },
  register: { textAlign: "center", marginTop: 22, color: COLORS.staff, fontWeight: "800", fontSize: 15, textDecorationLine: "underline" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.55)", alignItems: "center", justifyContent: "center", padding: 24 },
  modalCard: { width: "100%", maxWidth: 420, backgroundColor: COLORS.card || "#FFFFFF", borderRadius: 30, padding: 24, borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.16, shadowRadius: 24, elevation: 12 },
  closeButton: { position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.background || "#F8FAFC", alignItems: "center", justifyContent: "center", zIndex: 2 },
  modalIcon: { width: 74, height: 74, borderRadius: 24, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 16 },
  modalTitle: { fontSize: 24, fontWeight: "900", color: COLORS.text, textAlign: "center" },
  modalSub: { marginTop: 8, color: COLORS.muted, fontSize: 14, lineHeight: 21, fontWeight: "600", textAlign: "center" },
  modalInputWrap: { marginTop: 20 },
  cancelBtn: { marginTop: 16, alignItems: "center", justifyContent: "center", paddingVertical: 10 },
  cancelText: { color: COLORS.muted, fontSize: 14, fontWeight: "900" },
  successCard: { width: "100%", maxWidth: 390, backgroundColor: COLORS.card || "#FFFFFF", borderRadius: 30, padding: 26, alignItems: "center", borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.16, shadowRadius: 24, elevation: 12 },
  successIcon: { width: 92, height: 92, borderRadius: 46, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  successTitle: { fontSize: 24, fontWeight: "900", color: COLORS.text, textAlign: "center" },
  successMessage: { marginTop: 10, color: COLORS.muted, fontSize: 14, lineHeight: 21, fontWeight: "600", textAlign: "center" },
  doneButton: { width: "100%", height: 52, borderRadius: 18, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", marginTop: 24 },
  doneButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
});
