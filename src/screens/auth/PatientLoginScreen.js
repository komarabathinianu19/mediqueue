// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function PatientLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoBox}>
//         <Ionicons name="person-circle-outline" size={82} color={COLORS.primary} />
//         <Text style={styles.logo}>MediQueue</Text>
//         <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={styles.sub}>Enter your mobile number to continue</Text>

//         <InputField label="Mobile Number" value="+91 98765 43210" keyboardType="phone-pad" />

//         <GradientButton
//           title="Send OTP"
//           onPress={() => navigation.replace("PatientTabs")}
//         />

//         <Text style={styles.terms}>
//           By continuing, you agree to our Terms & Conditions
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 22 },
//   logoBox: { alignItems: "center", marginTop: 86, marginBottom: 34 },
//   logo: { fontSize: 32, fontWeight: "900", color: COLORS.primary },
//   tagline: { color: COLORS.muted, marginTop: 8 },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 30,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.08,
//     shadowRadius: 18,
//     elevation: 4,
//   },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 6, marginBottom: 18 },
//   terms: {
//     textAlign: "center",
//     color: COLORS.muted,
//     fontSize: 12,
//     marginTop: 24,
//   },
// });  




















// import React, { useState } from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function PatientLoginScreen({ navigation }) {
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");

//   return (
//     <View style={styles.container}>
//       {/* 1. Animated Logo Section */}
//       <MotiView 
//         from={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ type: 'spring', duration: 1000 }}
//         style={styles.logoBox}
//       >
//         <View style={styles.iconCircle}>
//            <Ionicons name="person-circle-outline" size={72} color="#fff" />
//         </View>
//         <Text style={styles.logo}>MediQueue</Text>
//         <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
//       </MotiView>

//       {/* 2. Animated Login Card */}
//       <MotiView 
//         from={{ opacity: 0, translateY: 50 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: 'timing', duration: 600, delay: 200 }}
//         style={styles.card}
//       >
//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={styles.sub}>Enter your details to access your account</Text>

//         {/* 3. Staggered Inputs */}
//         <MotiView
//           from={{ opacity: 0, translateX: -10 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 400 }}
//         >
//           <InputField 
//             label="Phone Number" 
//             placeholder="+91 00000 00000"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad" 
//             icon="call-outline"
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateX: -10 }}
//           animate={{ opacity: 1, translateX: 0 }}
//           transition={{ delay: 500 }}
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

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 700 }}
//           style={{ marginTop: 10 }}
//         >
//           <GradientButton
//             title="Login"
//             onPress={() => navigation.replace("PatientTabs")}
//           />
//         </MotiView>

//         <Pressable style={styles.forgotPass}>
//             <Text style={styles.forgotText}>Forgot Password?</Text>
//         </Pressable>

//         <Text style={styles.terms}>
//           By continuing, you agree to our{" "}
//           <Text style={{ fontWeight: "700" }}>Terms & Conditions</Text>
//         </Text>
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
//   iconCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   logo: { 
//     fontSize: 34, 
//     fontWeight: "900", 
//     color: COLORS.primary,
//     letterSpacing: -1 
//   },
//   tagline: { 
//     color: COLORS.muted, 
//     marginTop: 4,
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
//     shadowOpacity: 0.06,
//     shadowRadius: 20,
//     elevation: 5,
//   },
//   title: { 
//     fontSize: 26, 
//     fontWeight: "800", 
//     color: COLORS.text || "#1E293B" 
//   },
//   sub: { 
//     color: COLORS.muted || "#64748B", 
//     marginTop: 6, 
//     marginBottom: 24,
//     fontSize: 14,
//     lineHeight: 20
//   },
//   forgotPass: {
//     marginTop: 16,
//     alignItems: 'center'
//   },
//   forgotText: {
//     color: COLORS.primary,
//     fontWeight: '700',
//     fontSize: 14
//   },
//   terms: {
//     textAlign: "center",
//     color: COLORS.muted,
//     fontSize: 12,
//     marginTop: 30,
//     opacity: 0.8
//   },
// });  
































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function PatientLoginScreen({ navigation }) {
//   const [screen, setScreen] = useState("login"); // login | register | forgot
//   const [forgotStep, setForgotStep] = useState(1);

//   const [loginForm, setLoginForm] = useState({
//     phone: "",
//     password: "",
//   });

//   const [registerForm, setRegisterForm] = useState({
//     name: "",
//     phone: "",
//     age: "",
//     gender: "",
//     bloodGroup: "",
//     city: "",
//     allergies: "",
//     medicalNotes: "",
//     emergencyContact: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [forgotForm, setForgotForm] = useState({
//     phone: "",
//     otp: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const updateLogin = (key, value) => {
//     setLoginForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const updateRegister = (key, value) => {
//     setRegisterForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const updateForgot = (key, value) => {
//     setForgotForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const goToLogin = () => {
//     setScreen("login");
//     setForgotStep(1);
//   };

//   const handleLogin = () => {
//     if (!loginForm.phone.trim()) {
//       Alert.alert("Missing Phone", "Please enter your phone number.");
//       return;
//     }

//     if (!loginForm.password.trim()) {
//       Alert.alert("Missing Password", "Please enter your password.");
//       return;
//     }

//     navigation.replace("PatientTabs");
//   };

//   const handleRegister = () => {
//   if (!registerForm.name.trim()) {
//     Alert.alert("Missing Name", "Please enter patient name.");
//     return;
//   }

//   if (!registerForm.phone.trim()) {
//     Alert.alert("Missing Phone", "Please enter phone number.");
//     return;
//   }

//   if (!registerForm.age.trim()) {
//     Alert.alert("Missing Age", "Please enter age.");
//     return;
//   }

//   if (!registerForm.gender.trim()) {
//     Alert.alert("Missing Gender", "Please enter gender.");
//     return;
//   }

//   if (!registerForm.city.trim()) {
//     Alert.alert("Missing City", "Please enter city.");
//     return;
//   }

//   if (!registerForm.emergencyContact.trim()) {
//     Alert.alert("Missing Emergency Contact", "Please enter emergency contact.");
//     return;
//   }

//   if (!registerForm.password.trim()) {
//     Alert.alert("Missing Password", "Please create password.");
//     return;
//   }

//   if (registerForm.password.length < 6) {
//     Alert.alert("Weak Password", "Password must be at least 6 characters.");
//     return;
//   }

//   if (registerForm.password !== registerForm.confirmPassword) {
//     Alert.alert("Password Mismatch", "Password and confirm password must match.");
//     return;
//   }

//   Alert.alert(
//     "Registration Successful",
//     "Your patient account has been created successfully. Please login now.",
//     [
//       {
//         text: "OK",
//         onPress: () => {
//           setScreen("login");

//           setLoginForm({
//             phone: registerForm.phone,
//             password: "",
//           });

//           setRegisterForm({
//             name: "",
//             phone: "",
//             age: "",
//             gender: "",
//             bloodGroup: "",
//             city: "",
//             allergies: "",
//             medicalNotes: "",
//             emergencyContact: "",
//             password: "",
//             confirmPassword: "",
//           });
//         },
//       },
//     ]
//   );
// };
//   const sendOtp = () => {
//     if (!forgotForm.phone.trim()) {
//       Alert.alert("Missing Phone", "Please enter your registered phone number.");
//       return;
//     }

//     Alert.alert("OTP Sent", "Demo OTP sent successfully. Use any 4 digits.");
//     setForgotStep(2);
//   };

// const resetPassword = () => {
//   if (!forgotForm.otp.trim()) {
//     Alert.alert("Missing OTP", "Please enter OTP.");
//     return;
//   }

//   if (!forgotForm.newPassword.trim()) {
//     Alert.alert("Missing Password", "Please enter new password.");
//     return;
//   }

//   if (forgotForm.newPassword.length < 6) {
//     Alert.alert("Weak Password", "Password must be at least 6 characters.");
//     return;
//   }

//   if (forgotForm.newPassword !== forgotForm.confirmPassword) {
//     Alert.alert("Password Mismatch", "Passwords do not match.");
//     return;
//   }

//   Alert.alert(
//     "Password Reset Successful",
//     "Your password has been reset successfully. Please login with your new password.",
//     [
//       {
//         text: "OK",
//         onPress: () => {
//           setScreen("login");
//           setForgotStep(1);

//           setLoginForm({
//             phone: forgotForm.phone,
//             password: "",
//           });

//           setForgotForm({
//             phone: "",
//             otp: "",
//             newPassword: "",
//             confirmPassword: "",
//           });
//         },
//       },
//     ]
//   );
// };

//   return (
//     <KeyboardAvoidingView
//       style={styles.wrapper}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.container}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <MotiView
//           from={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", duration: 1000 }}
//           style={styles.logoBox}
//         >
//           <View style={styles.iconCircle}>
//             <Ionicons
//               name={
//                 screen === "login"
//                   ? "person-circle-outline"
//                   : screen === "register"
//                   ? "medical-outline"
//                   : "key-outline"
//               }
//               size={screen === "login" ? 72 : 46}
//               color="#fff"
//             />
//           </View>

//           <Text style={styles.logo}>MediQueue</Text>
//           <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
//         </MotiView>

//         {screen === "login" && (
//           <MotiView
//             key="login"
//             from={{ opacity: 0, translateY: 50 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//             style={styles.card}
//           >
//             <Text style={styles.title}>Welcome Back!</Text>
//             <Text style={styles.sub}>
//               Enter your details to access your account
//             </Text>

//             <InputField
//               label="Phone Number"
//               placeholder="+91 00000 00000"
//               value={loginForm.phone}
//               onChangeText={(v) => updateLogin("phone", v)}
//               keyboardType="phone-pad"
//               icon="call-outline"
//             />

//             <InputField
//               label="Password"
//               placeholder="••••••••"
//               value={loginForm.password}
//               onChangeText={(v) => updateLogin("password", v)}
//               secureTextEntry
//               icon="lock-closed-outline"
//             />

//             <View style={styles.buttonBox}>
//               <GradientButton title="Login" onPress={handleLogin} />
//             </View>

//             <Pressable
//               style={styles.centerBtn}
//               onPress={() => {
//                 setScreen("forgot");
//                 setForgotStep(1);
//               }}
//             >
//               <Text style={styles.linkText}>Forgot Password?</Text>
//             </Pressable>

//             <View style={styles.rowCenter}>
//               <Text style={styles.normalText}>New patient?</Text>
//               <Pressable onPress={() => setScreen("register")}>
//                 <Text style={styles.linkText}> Register Now</Text>
//               </Pressable>
//             </View>

//             <Text style={styles.terms}>
//               By continuing, you agree to our{" "}
//               <Text style={{ fontWeight: "700" }}>Terms & Conditions</Text>
//             </Text>
//           </MotiView>
//         )}

//         {screen === "register" && (
//           <MotiView
//             key="register"
//             from={{ opacity: 0, translateY: 50 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//             style={styles.card}
//           >
//             <View style={styles.cardHeaderRow}>
//               <Pressable style={styles.smallBackBtn} onPress={goToLogin}>
//                 <Ionicons name="chevron-back" size={22} color={COLORS.text} />
//               </Pressable>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.title}>Patient Registration</Text>
//                 <Text style={styles.sub}>
//                   Add patient details for hospital token booking
//                 </Text>
//               </View>
//             </View>

//             <Text style={styles.sectionTitle}>Personal Details</Text>

//             <InputField
//               label="Full Name"
//               placeholder="Enter patient name"
//               value={registerForm.name}
//               onChangeText={(v) => updateRegister("name", v)}
//               icon="person-outline"
//             />

//             <InputField
//               label="Phone Number"
//               placeholder="+91 00000 00000"
//               value={registerForm.phone}
//               onChangeText={(v) => updateRegister("phone", v)}
//               keyboardType="phone-pad"
//               icon="call-outline"
//             />

//             <InputField
//               label="Age"
//               placeholder="Example: 28"
//               value={registerForm.age}
//               onChangeText={(v) => updateRegister("age", v)}
//               keyboardType="number-pad"
//               icon="calendar-outline"
//             />

//             <InputField
//               label="Gender"
//               placeholder="Male / Female / Other"
//               value={registerForm.gender}
//               onChangeText={(v) => updateRegister("gender", v)}
//               icon="male-female-outline"
//             />

//             <InputField
//               label="Blood Group"
//               placeholder="Example: O+"
//               value={registerForm.bloodGroup}
//               onChangeText={(v) => updateRegister("bloodGroup", v)}
//               icon="water-outline"
//             />

//             <InputField
//               label="City"
//               placeholder="Enter city"
//               value={registerForm.city}
//               onChangeText={(v) => updateRegister("city", v)}
//               icon="location-outline"
//             />

//             <Text style={styles.sectionTitle}>Health Details</Text>

//             <InputField
//               label="Allergies"
//               placeholder="Example: No known allergies"
//               value={registerForm.allergies}
//               onChangeText={(v) => updateRegister("allergies", v)}
//               icon="medkit-outline"
//             />

//             <InputField
//               label="Medical Notes"
//               placeholder="Example: Regular OPD visitor"
//               value={registerForm.medicalNotes}
//               onChangeText={(v) => updateRegister("medicalNotes", v)}
//               icon="document-text-outline"
//             />

//             <InputField
//               label="Emergency Contact"
//               placeholder="+91 00000 00000"
//               value={registerForm.emergencyContact}
//               onChangeText={(v) => updateRegister("emergencyContact", v)}
//               keyboardType="phone-pad"
//               icon="call-outline"
//             />

//             <Text style={styles.sectionTitle}>Security</Text>

//             <InputField
//               label="Password"
//               placeholder="Create password"
//               value={registerForm.password}
//               onChangeText={(v) => updateRegister("password", v)}
//               secureTextEntry
//               icon="lock-closed-outline"
//             />

//             <InputField
//               label="Confirm Password"
//               placeholder="Re-enter password"
//               value={registerForm.confirmPassword}
//               onChangeText={(v) => updateRegister("confirmPassword", v)}
//               secureTextEntry
//               icon="shield-checkmark-outline"
//             />

//             <View style={styles.buttonBox}>
//               <GradientButton title="Create Account" onPress={handleRegister} />
//             </View>

//             <View style={styles.rowCenter}>
//               <Text style={styles.normalText}>Already have an account?</Text>
//               <Pressable onPress={goToLogin}>
//                 <Text style={styles.linkText}> Login</Text>
//               </Pressable>
//             </View>
//           </MotiView>
//         )}

//         {screen === "forgot" && (
//           <MotiView
//             key="forgot"
//             from={{ opacity: 0, translateY: 50 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "timing", duration: 600 }}
//             style={styles.card}
//           >
//             <View style={styles.cardHeaderRow}>
//               <Pressable style={styles.smallBackBtn} onPress={goToLogin}>
//                 <Ionicons name="chevron-back" size={22} color={COLORS.text} />
//               </Pressable>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.title}>Forgot Password?</Text>
//                 <Text style={styles.sub}>
//                   {forgotStep === 1
//                     ? "Enter your phone number to receive OTP"
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
//                   onChangeText={(v) => updateForgot("phone", v)}
//                   keyboardType="phone-pad"
//                   icon="call-outline"
//                 />

//                 <View style={styles.buttonBox}>
//                   <GradientButton title="Send OTP" onPress={sendOtp} />
//                 </View>
//               </>
//             ) : (
//               <>
//                 <InputField
//                   label="OTP"
//                   placeholder="Enter OTP"
//                   value={forgotForm.otp}
//                   onChangeText={(v) => updateForgot("otp", v)}
//                   keyboardType="number-pad"
//                   icon="shield-checkmark-outline"
//                 />

//                 <InputField
//                   label="New Password"
//                   placeholder="Create new password"
//                   value={forgotForm.newPassword}
//                   onChangeText={(v) => updateForgot("newPassword", v)}
//                   secureTextEntry
//                   icon="lock-closed-outline"
//                 />

//                 <InputField
//                   label="Confirm Password"
//                   placeholder="Re-enter new password"
//                   value={forgotForm.confirmPassword}
//                   onChangeText={(v) => updateForgot("confirmPassword", v)}
//                   secureTextEntry
//                   icon="lock-closed-outline"
//                 />

//                 <View style={styles.buttonBox}>
//                   <GradientButton title="Reset Password" onPress={resetPassword} />
//                 </View>

//                 <Pressable
//                   style={styles.centerBtn}
//                   onPress={() => setForgotStep(1)}
//                 >
//                   <Text style={styles.linkText}>Change phone number</Text>
//                 </Pressable>
//               </>
//             )}

//             <Pressable style={styles.centerBtn} onPress={goToLogin}>
//               <Text style={styles.normalText}>Back to Login</Text>
//             </Pressable>
//           </MotiView>
//         )}
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   scroll: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     flexGrow: 1,
//     padding: 24,
//     justifyContent: "center",
//     paddingTop: 54,
//     paddingBottom: 40,
//   },

//   logoBox: {
//     alignItems: "center",
//     marginBottom: 34,
//   },

//   iconCircle: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 10,
//   },

//   logo: {
//     fontSize: 34,
//     fontWeight: "900",
//     color: COLORS.primary,
//     letterSpacing: -1,
//   },

//   tagline: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 15,
//     fontWeight: "500",
//   },

//   card: {
//     backgroundColor: COLORS.card || "#FFF",
//     borderRadius: 32,
//     padding: 24,
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.06,
//     shadowRadius: 20,
//     elevation: 5,
//   },

//   cardHeaderRow: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     gap: 12,
//     marginBottom: 10,
//   },

//   smallBackBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 15,
//     backgroundColor: COLORS.background || "#F8FAFC",
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 2,
//   },

//   title: {
//     fontSize: 25,
//     fontWeight: "900",
//     color: COLORS.text || "#1E293B",
//   },

//   sub: {
//     color: COLORS.muted || "#64748B",
//     marginTop: 6,
//     marginBottom: 22,
//     fontSize: 14,
//     lineHeight: 20,
//     fontWeight: "600",
//   },

//   sectionTitle: {
//     fontSize: 17,
//     fontWeight: "900",
//     color: COLORS.text || "#1E293B",
//     marginTop: 12,
//     marginBottom: 10,
//   },

//   buttonBox: {
//     marginTop: 12,
//   },

//   centerBtn: {
//     marginTop: 16,
//     alignItems: "center",
//   },

//   rowCenter: {
//     marginTop: 18,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   normalText: {
//     color: COLORS.muted || "#64748B",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   linkText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 14,
//   },

//   terms: {
//     textAlign: "center",
//     color: COLORS.muted,
//     fontSize: 12,
//     marginTop: 26,
//     opacity: 0.8,
//     lineHeight: 18,
//   },
// });  



























  // import React, { useState } from "react";
  // import {
  //   View,
  //   Text,
  //   StyleSheet,
  //   Pressable,
  //   Alert,
  //   KeyboardAvoidingView,
  //   Platform,
  //   ScrollView,
  //   Modal,
  // } from "react-native";
  // import { Ionicons } from "@expo/vector-icons";
  // import { MotiView } from "moti";
  // import { COLORS } from "../../constants/colors";
  // import InputField from "../../components/InputField";
  // import GradientButton from "../../components/GradientButton";

  // export default function PatientLoginScreen({ navigation }) {
  //   const [screen, setScreen] = useState("login"); // login | register | forgot
  //   const [forgotStep, setForgotStep] = useState(1);

  //   const [successPopup, setSuccessPopup] = useState({
  //     visible: false,
  //     title: "",
  //     message: "",
  //     type: "",
  //   });

  //   const [loginForm, setLoginForm] = useState({
  //     phone: "",
  //     password: "",
  //   });

  //   const [registerForm, setRegisterForm] = useState({
  //     name: "",
  //     phone: "",
  //     age: "",
  //     gender: "",
  //     bloodGroup: "",
  //     city: "",
  //     allergies: "",
  //     medicalNotes: "",
  //     emergencyContact: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  //   const [forgotForm, setForgotForm] = useState({
  //     phone: "",
  //     otp: "",
  //     newPassword: "",
  //     confirmPassword: "",
  //   });

  //   const updateLogin = (key, value) => {
  //     setLoginForm((prev) => ({ ...prev, [key]: value }));
  //   };

  //   const updateRegister = (key, value) => {
  //     setRegisterForm((prev) => ({ ...prev, [key]: value }));
  //   };

  //   const updateForgot = (key, value) => {
  //     setForgotForm((prev) => ({ ...prev, [key]: value }));
  //   };

  //   const goToLogin = () => {
  //     setScreen("login");
  //     setForgotStep(1);
  //   };

  //   const showSuccessPopup = (title, message, type) => {
  //     setSuccessPopup({
  //       visible: true,
  //       title,
  //       message,
  //       type,
  //     });
  //   };

  //   const closeSuccessPopup = () => {
  //     const popupType = successPopup.type;

  //     setSuccessPopup({
  //       visible: false,
  //       title: "",
  //       message: "",
  //       type: "",
  //     });

  //     if (popupType === "register") {
  //       setScreen("login");

  //       setLoginForm({
  //         phone: registerForm.phone,
  //         password: "",
  //       });

  //       setRegisterForm({
  //         name: "",
  //         phone: "",
  //         age: "",
  //         gender: "",
  //         bloodGroup: "",
  //         city: "",
  //         allergies: "",
  //         medicalNotes: "",
  //         emergencyContact: "",
  //         password: "",
  //         confirmPassword: "",
  //       });
  //     }

  //     if (popupType === "reset") {
  //       setScreen("login");
  //       setForgotStep(1);

  //       setLoginForm({
  //         phone: forgotForm.phone,
  //         password: "",
  //       });

  //       setForgotForm({
  //         phone: "",
  //         otp: "",
  //         newPassword: "",
  //         confirmPassword: "",
  //       });
  //     }
  //   };

  //   const handleLogin = () => {
  //     if (!loginForm.phone.trim()) {
  //       Alert.alert("Missing Phone", "Please enter your phone number.");
  //       return;
  //     }

  //     if (!loginForm.password.trim()) {
  //       Alert.alert("Missing Password", "Please enter your password.");
  //       return;
  //     }

  //     navigation.replace("PatientTabs");
  //   };

  //   const handleRegister = () => {
  //     if (!registerForm.name.trim()) {
  //       Alert.alert("Missing Name", "Please enter patient name.");
  //       return;
  //     }

  //     if (!registerForm.phone.trim()) {
  //       Alert.alert("Missing Phone", "Please enter phone number.");
  //       return;
  //     }

  //     if (!registerForm.age.trim()) {
  //       Alert.alert("Missing Age", "Please enter age.");
  //       return;
  //     }

  //     if (!registerForm.gender.trim()) {
  //       Alert.alert("Missing Gender", "Please enter gender.");
  //       return;
  //     }

  //     if (!registerForm.city.trim()) {
  //       Alert.alert("Missing City", "Please enter city.");
  //       return;
  //     }

  //     if (!registerForm.emergencyContact.trim()) {
  //       Alert.alert("Missing Emergency Contact", "Please enter emergency contact.");
  //       return;
  //     }

  //     if (!registerForm.password.trim()) {
  //       Alert.alert("Missing Password", "Please create password.");
  //       return;
  //     }

  //     if (registerForm.password.length < 6) {
  //       Alert.alert("Weak Password", "Password must be at least 6 characters.");
  //       return;
  //     }

  //     if (registerForm.password !== registerForm.confirmPassword) {
  //       Alert.alert(
  //         "Password Mismatch",
  //         "Password and confirm password must match."
  //       );
  //       return;
  //     }

  //     showSuccessPopup(
  //       "Registration Successful",
  //       "Your patient account has been created successfully. Please login now.",
  //       "register"
  //     );
  //   };

  //   const sendOtp = () => {
  //     if (!forgotForm.phone.trim()) {
  //       Alert.alert("Missing Phone", "Please enter your registered phone number.");
  //       return;
  //     }

  //     Alert.alert("OTP Sent", "Demo OTP sent successfully. Use any 4 digits.");
  //     setForgotStep(2);
  //   };

  //   const resetPassword = () => {
  //     if (!forgotForm.otp.trim()) {
  //       Alert.alert("Missing OTP", "Please enter OTP.");
  //       return;
  //     }

  //     if (!forgotForm.newPassword.trim()) {
  //       Alert.alert("Missing Password", "Please enter new password.");
  //       return;
  //     }

  //     if (forgotForm.newPassword.length < 6) {
  //       Alert.alert("Weak Password", "Password must be at least 6 characters.");
  //       return;
  //     }

  //     if (forgotForm.newPassword !== forgotForm.confirmPassword) {
  //       Alert.alert("Password Mismatch", "Passwords do not match.");
  //       return;
  //     }

  //     showSuccessPopup(
  //       "Password Reset Successful",
  //       "Your password has been reset successfully. Please login with your new password.",
  //       "reset"
  //     );
  //   };

  //   return (
  //     <KeyboardAvoidingView
  //       style={styles.wrapper}
  //       behavior={Platform.OS === "ios" ? "padding" : undefined}
  //     >
  //       <ScrollView
  //         style={styles.scroll}
  //         contentContainerStyle={styles.container}
  //         showsVerticalScrollIndicator={false}
  //         keyboardShouldPersistTaps="handled"
  //       >
  //         <MotiView
  //           from={{ opacity: 0, scale: 0.5 }}
  //           animate={{ opacity: 1, scale: 1 }}
  //           transition={{ type: "spring", duration: 1000 }}
  //           style={styles.logoBox}
  //         >
  //           <View style={styles.iconCircle}>
  //             <Ionicons
  //               name={
  //                 screen === "login"
  //                   ? "person-circle-outline"
  //                   : screen === "register"
  //                   ? "medical-outline"
  //                   : "key-outline"
  //               }
  //               size={screen === "login" ? 72 : 46}
  //               color="#fff"
  //             />
  //           </View>

  //           <Text style={styles.logo}>MediQueue</Text>
  //           <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
  //         </MotiView>

  //         {screen === "login" && (
  //           <MotiView
  //             key="login"
  //             from={{ opacity: 0, translateY: 50 }}
  //             animate={{ opacity: 1, translateY: 0 }}
  //             transition={{ type: "timing", duration: 600 }}
  //             style={styles.card}
  //           >
  //             <Text style={styles.title}>Welcome Back!</Text>
  //             <Text style={styles.sub}>
  //               Enter your details to access your account
  //             </Text>

  //             <InputField
  //               label="Phone Number"
  //               placeholder="+91 00000 00000"
  //               value={loginForm.phone}
  //               onChangeText={(v) => updateLogin("phone", v)}
  //               keyboardType="phone-pad"
  //               icon="call-outline"
  //             />

  //             <InputField
  //               label="Password"
  //               placeholder="••••••••"
  //               value={loginForm.password}
  //               onChangeText={(v) => updateLogin("password", v)}
  //               secureTextEntry
  //               icon="lock-closed-outline"
  //             />

  //             <View style={styles.buttonBox}>
  //               <GradientButton title="Login" onPress={handleLogin} />
  //             </View>

  //             <Pressable
  //               style={styles.centerBtn}
  //               onPress={() => {
  //                 setScreen("forgot");
  //                 setForgotStep(1);
  //               }}
  //             >
  //               <Text style={styles.linkText}>Forgot Password?</Text>
  //             </Pressable>

  //             <View style={styles.rowCenter}>
  //               <Text style={styles.normalText}>New patient?</Text>
  //               <Pressable onPress={() => setScreen("register")}>
  //                 <Text style={styles.linkText}> Register Now</Text>
  //               </Pressable>
  //             </View>

  //             <Text style={styles.terms}>
  //               By continuing, you agree to our{" "}
  //               <Text style={{ fontWeight: "700" }}>Terms & Conditions</Text>
  //             </Text>
  //           </MotiView>
  //         )}

  //         {screen === "register" && (
  //           <MotiView
  //             key="register"
  //             from={{ opacity: 0, translateY: 50 }}
  //             animate={{ opacity: 1, translateY: 0 }}
  //             transition={{ type: "timing", duration: 600 }}
  //             style={styles.card}
  //           >
  //             <View style={styles.cardHeaderRow}>
  //               <Pressable style={styles.smallBackBtn} onPress={goToLogin}>
  //                 <Ionicons name="chevron-back" size={22} color={COLORS.text} />
  //               </Pressable>

  //               <View style={{ flex: 1 }}>
  //                 <Text style={styles.title}>Patient Registration</Text>
  //                 <Text style={styles.sub}>
  //                   Add patient details for hospital token booking
  //                 </Text>
  //               </View>
  //             </View>

  //             <Text style={styles.sectionTitle}>Personal Details</Text>

  //             <InputField
  //               label="Full Name"
  //               placeholder="Enter patient name"
  //               value={registerForm.name}
  //               onChangeText={(v) => updateRegister("name", v)}
  //               icon="person-outline"
  //             />

  //             <InputField
  //               label="Phone Number"
  //               placeholder="+91 00000 00000"
  //               value={registerForm.phone}
  //               onChangeText={(v) => updateRegister("phone", v)}
  //               keyboardType="phone-pad"
  //               icon="call-outline"
  //             />

  //             <InputField
  //               label="Age"
  //               placeholder="Example: 28"
  //               value={registerForm.age}
  //               onChangeText={(v) => updateRegister("age", v)}
  //               keyboardType="number-pad"
  //               icon="calendar-outline"
  //             />

  //             <InputField
  //               label="Gender"
  //               placeholder="Male / Female / Other"
  //               value={registerForm.gender}
  //               onChangeText={(v) => updateRegister("gender", v)}
  //               icon="male-female-outline"
  //             />

  //             <InputField
  //               label="Blood Group"
  //               placeholder="Example: O+"
  //               value={registerForm.bloodGroup}
  //               onChangeText={(v) => updateRegister("bloodGroup", v)}
  //               icon="water-outline"
  //             />

  //             <InputField
  //               label="City"
  //               placeholder="Enter city"
  //               value={registerForm.city}
  //               onChangeText={(v) => updateRegister("city", v)}
  //               icon="location-outline"
  //             />

  //             <Text style={styles.sectionTitle}>Health Details</Text>

  //             <InputField
  //               label="Allergies"
  //               placeholder="Example: No known allergies"
  //               value={registerForm.allergies}
  //               onChangeText={(v) => updateRegister("allergies", v)}
  //               icon="medkit-outline"
  //             />

  //             <InputField
  //               label="Medical Notes"
  //               placeholder="Example: Regular OPD visitor"
  //               value={registerForm.medicalNotes}
  //               onChangeText={(v) => updateRegister("medicalNotes", v)}
  //               icon="document-text-outline"
  //             />

  //             <InputField
  //               label="Emergency Contact"
  //               placeholder="+91 00000 00000"
  //               value={registerForm.emergencyContact}
  //               onChangeText={(v) => updateRegister("emergencyContact", v)}
  //               keyboardType="phone-pad"
  //               icon="call-outline"
  //             />

  //             <Text style={styles.sectionTitle}>Security</Text>

  //             <InputField
  //               label="Password"
  //               placeholder="Create password"
  //               value={registerForm.password}
  //               onChangeText={(v) => updateRegister("password", v)}
  //               secureTextEntry
  //               icon="lock-closed-outline"
  //             />

  //             <InputField
  //               label="Confirm Password"
  //               placeholder="Re-enter password"
  //               value={registerForm.confirmPassword}
  //               onChangeText={(v) => updateRegister("confirmPassword", v)}
  //               secureTextEntry
  //               icon="shield-checkmark-outline"
  //             />

  //             <View style={styles.buttonBox}>
  //               <GradientButton title="Create Account" onPress={handleRegister} />
  //             </View>

  //             <View style={styles.rowCenter}>
  //               <Text style={styles.normalText}>Already have an account?</Text>
  //               <Pressable onPress={goToLogin}>
  //                 <Text style={styles.linkText}> Login</Text>
  //               </Pressable>
  //             </View>
  //           </MotiView>
  //         )}

  //         {screen === "forgot" && (
  //           <MotiView
  //             key="forgot"
  //             from={{ opacity: 0, translateY: 50 }}
  //             animate={{ opacity: 1, translateY: 0 }}
  //             transition={{ type: "timing", duration: 600 }}
  //             style={styles.card}
  //           >
  //             <View style={styles.cardHeaderRow}>
  //               <Pressable style={styles.smallBackBtn} onPress={goToLogin}>
  //                 <Ionicons name="chevron-back" size={22} color={COLORS.text} />
  //               </Pressable>

  //               <View style={{ flex: 1 }}>
  //                 <Text style={styles.title}>Forgot Password?</Text>
  //                 <Text style={styles.sub}>
  //                   {forgotStep === 1
  //                     ? "Enter your phone number to receive OTP"
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
  //                   onChangeText={(v) => updateForgot("phone", v)}
  //                   keyboardType="phone-pad"
  //                   icon="call-outline"
  //                 />

  //                 <View style={styles.buttonBox}>
  //                   <GradientButton title="Send OTP" onPress={sendOtp} />
  //                 </View>
  //               </>
  //             ) : (
  //               <>
  //                 <InputField
  //                   label="OTP"
  //                   placeholder="Enter OTP"
  //                   value={forgotForm.otp}
  //                   onChangeText={(v) => updateForgot("otp", v)}
  //                   keyboardType="number-pad"
  //                   icon="shield-checkmark-outline"
  //                 />

  //                 <InputField
  //                   label="New Password"
  //                   placeholder="Create new password"
  //                   value={forgotForm.newPassword}
  //                   onChangeText={(v) => updateForgot("newPassword", v)}
  //                   secureTextEntry
  //                   icon="lock-closed-outline"
  //                 />

  //                 <InputField
  //                   label="Confirm Password"
  //                   placeholder="Re-enter new password"
  //                   value={forgotForm.confirmPassword}
  //                   onChangeText={(v) => updateForgot("confirmPassword", v)}
  //                   secureTextEntry
  //                   icon="lock-closed-outline"
  //                 />

  //                 <View style={styles.buttonBox}>
  //                   <GradientButton title="Reset Password" onPress={resetPassword} />
  //                 </View>

  //                 <Pressable
  //                   style={styles.centerBtn}
  //                   onPress={() => setForgotStep(1)}
  //                 >
  //                   <Text style={styles.linkText}>Change phone number</Text>
  //                 </Pressable>
  //               </>
  //             )}

  //             <Pressable style={styles.centerBtn} onPress={goToLogin}>
  //               <Text style={styles.normalText}>Back to Login</Text>
  //             </Pressable>
  //           </MotiView>
  //         )}
  //       </ScrollView>

  //       <Modal
  //         visible={successPopup.visible}
  //         transparent
  //         animationType="fade"
  //         onRequestClose={closeSuccessPopup}
  //       >
  //         <View style={styles.modalOverlay}>
  //           <MotiView
  //             from={{ opacity: 0, scale: 0.8, translateY: 20 }}
  //             animate={{ opacity: 1, scale: 1, translateY: 0 }}
  //             transition={{ type: "spring", duration: 500 }}
  //             style={styles.successCard}
  //           >
  //             <View style={styles.successIcon}>
  //               <Ionicons name="checkmark-circle" size={58} color="#fff" />
  //             </View>

  //             <Text style={styles.successTitle}>{successPopup.title}</Text>
  //             <Text style={styles.successMessage}>{successPopup.message}</Text>

  //             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
  //               <Text style={styles.successButtonText}>OK</Text>
  //             </Pressable>
  //           </MotiView>
  //         </View>
  //       </Modal>
  //     </KeyboardAvoidingView>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   wrapper: {
  //     flex: 1,
  //     backgroundColor: COLORS.background,
  //   },

  //   scroll: {
  //     flex: 1,
  //     backgroundColor: COLORS.background,
  //   },

  //   container: {
  //     flexGrow: 1,
  //     padding: 24,
  //     justifyContent: "center",
  //     paddingTop: 54,
  //     paddingBottom: 40,
  //   },

  //   logoBox: {
  //     alignItems: "center",
  //     marginBottom: 34,
  //   },

  //   iconCircle: {
  //     width: 100,
  //     height: 100,
  //     borderRadius: 50,
  //     backgroundColor: COLORS.primary,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     marginBottom: 16,
  //     shadowColor: COLORS.primary,
  //     shadowOpacity: 0.3,
  //     shadowRadius: 20,
  //     elevation: 10,
  //   },

  //   logo: {
  //     fontSize: 34,
  //     fontWeight: "900",
  //     color: COLORS.primary,
  //     letterSpacing: -1,
  //   },

  //   tagline: {
  //     color: COLORS.muted,
  //     marginTop: 4,
  //     fontSize: 15,
  //     fontWeight: "500",
  //   },

  //   card: {
  //     backgroundColor: COLORS.card || "#fff",
  //     borderRadius: 32,
  //     padding: 24,
  //     borderWidth: 1,
  //     borderColor: COLORS.border || "#E2E8F0",
  //     shadowColor: "#000",
  //     shadowOpacity: 0.06,
  //     shadowRadius: 20,
  //     elevation: 5,
  //   },

  //   cardHeaderRow: {
  //     flexDirection: "row",
  //     alignItems: "flex-start",
  //     gap: 12,
  //     marginBottom: 10,
  //   },

  //   smallBackBtn: {
  //     width: 42,
  //     height: 42,
  //     borderRadius: 15,
  //     backgroundColor: COLORS.background || "#F8FAFC",
  //     borderWidth: 1,
  //     borderColor: COLORS.border || "#E2E8F0",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginTop: 2,
  //   },

  //   title: {
  //     fontSize: 25,
  //     fontWeight: "900",
  //     color: COLORS.text || "#1E293B",
  //   },

  //   sub: {
  //     color: COLORS.muted || "#64748B",
  //     marginTop: 6,
  //     marginBottom: 22,
  //     fontSize: 14,
  //     lineHeight: 20,
  //     fontWeight: "600",
  //   },

  //   sectionTitle: {
  //     fontSize: 17,
  //     fontWeight: "900",
  //     color: COLORS.text || "#1E293B",
  //     marginTop: 12,
  //     marginBottom: 10,
  //   },

  //   buttonBox: {
  //     marginTop: 12,
  //   },

  //   centerBtn: {
  //     marginTop: 16,
  //     alignItems: "center",
  //   },

  //   rowCenter: {
  //     marginTop: 18,
  //     flexDirection: "row",
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },

  //   normalText: {
  //     color: COLORS.muted || "#64748B",
  //     fontWeight: "700",
  //     fontSize: 14,
  //   },

  //   linkText: {
  //     color: COLORS.primary,
  //     fontWeight: "900",
  //     fontSize: 14,
  //   },

  //   terms: {
  //     textAlign: "center",
  //     color: COLORS.muted,
  //     fontSize: 12,
  //     marginTop: 26,
  //     opacity: 0.8,
  //     lineHeight: 18,
  //   },

  //   modalOverlay: {
  //     flex: 1,
  //     backgroundColor: "rgba(15, 23, 42, 0.55)",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     padding: 24,
  //   },

  //   successCard: {
  //     width: "100%",
  //     maxWidth: 380,
  //     backgroundColor: COLORS.card || "#fff",
  //     borderRadius: 30,
  //     padding: 26,
  //     alignItems: "center",
  //     borderWidth: 1,
  //     borderColor: COLORS.border || "#E2E8F0",
  //     shadowColor: "#000",
  //     shadowOpacity: 0.15,
  //     shadowRadius: 24,
  //     elevation: 12,
  //   },

  //   successIcon: {
  //     width: 90,
  //     height: 90,
  //     borderRadius: 45,
  //     backgroundColor: COLORS.primary,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     marginBottom: 18,
  //   },

  //   successTitle: {
  //     fontSize: 23,
  //     fontWeight: "900",
  //     color: COLORS.text || "#1E293B",
  //     textAlign: "center",
  //   },

  //   successMessage: {
  //     marginTop: 10,
  //     fontSize: 14,
  //     lineHeight: 21,
  //     color: COLORS.muted || "#64748B",
  //     textAlign: "center",
  //     fontWeight: "600",
  //   },

  //   successButton: {
  //     marginTop: 24,
  //     width: "100%",
  //     height: 52,
  //     borderRadius: 18,
  //     backgroundColor: COLORS.primary,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },

  //   successButtonText: {
  //     color: "#fff",
  //     fontSize: 16,
  //     fontWeight: "900",
  //   },
  // });



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
  import { Ionicons } from "@expo/vector-icons";
  import { MotiView } from "moti";
  import { COLORS } from "../../constants/colors";
  import InputField from "../../components/InputField";
  import GradientButton from "../../components/GradientButton";
  import { loginUser, registerUser } from "../../services/apiService";
 import { showAlert } from "../../utility/showAlert";
  
  export default function PatientLoginScreen({ navigation }) {
    const [screen, setScreen] = useState("login"); // login | register | forgot
    const [forgotStep, setForgotStep] = useState(1);
    const [loading, setLoading] = useState(false);
  
    const [successPopup, setSuccessPopup] = useState({
      visible: false,
      title: "",
      message: "",
      type: "",
    });
  
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
      emergencyContact: "",
      password: "",
      confirmPassword: "",
    });
  
    const [forgotForm, setForgotForm] = useState({
      phone: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    });
  
    const updateLogin = (key, value) => setLoginForm((p) => ({ ...p, [key]: value }));
    const updateRegister = (key, value) => setRegisterForm((p) => ({ ...p, [key]: value }));
    const updateForgot = (key, value) => setForgotForm((p) => ({ ...p, [key]: value }));
  
    const goToLogin = () => { setScreen("login"); setForgotStep(1); };
  
    const showSuccessPopup = (title, message, type) =>
      setSuccessPopup({ visible: true, title, message, type });
  
    const closeSuccessPopup = () => {
      const type = successPopup.type;
      setSuccessPopup({ visible: false, title: "", message: "", type: "" });
  
      if (type === "register") {
        setScreen("login");
        setLoginForm({ phone: registerForm.phone, password: "" });
        setRegisterForm({
          name: "", phone: "", age: "", gender: "", bloodGroup: "",
          city: "", allergies: "", medicalNotes: "", emergencyContact: "",
          password: "", confirmPassword: "",
        });
      }
  
      if (type === "reset") {
        setScreen("login");
        setForgotStep(1);
        setLoginForm({ phone: forgotForm.phone, password: "" });
        setForgotForm({ phone: "", otp: "", newPassword: "", confirmPassword: "" });
      }
    };
  
    // ── LOGIN ──────────────────────────────────────────────────────────────────
    const handleLogin = async () => {
      if (!loginForm.phone.trim()) {
        showAlert("Missing Phone", "Please enter your phone number.");
        return;
      }
      if (!loginForm.password.trim()) {
        showAlert("Missing Password", "Please enter your password.");
        return;
      }
  
      setLoading(true);
      try {
        const data = await loginUser(loginForm.phone.trim(), loginForm.password);
        // data = { token, role }
        if (data.role !== "PATIENT") {
          showAlert("Access Denied", "This login is only for patients.");
          return;
        }
        navigation.replace("PatientTabs");
      } catch (err) {
        showAlert("Login Failed", err.message || "Invalid credentials. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    // ── REGISTER ───────────────────────────────────────────────────────────────
    const handleRegister = async () => {
      if (!registerForm.name.trim()) return showAlert("Missing Name", "Please enter patient name.");
      if (!registerForm.phone.trim()) return showAlert("Missing Phone", "Please enter phone number.");
      if (!registerForm.age.trim()) return showAlert("Missing Age", "Please enter age.");
      if (!registerForm.gender.trim()) return showAlert("Missing Gender", "Please enter gender.");
      if (!registerForm.city.trim()) return showAlert("Missing City", "Please enter city.");
      if (!registerForm.emergencyContact.trim())
        return showAlert("Missing Emergency Contact", "Please enter emergency contact.");
      if (!registerForm.password.trim())
        return showAlert("Missing Password", "Please create a password.");
      if (registerForm.password.length < 6)
        return showAlert("Weak Password", "Password must be at least 6 characters.");
      if (registerForm.password !== registerForm.confirmPassword)
        return showAlert("Password Mismatch", "Password and confirm password must match.");
  
      setLoading(true);
      try {
        await registerUser({
          fullName: registerForm.name.trim(),
          phone: registerForm.phone.trim(),
          age: parseInt(registerForm.age, 10),
          gender: registerForm.gender.trim(),
          bloodGroup: registerForm.bloodGroup.trim(),
          city: registerForm.city.trim(),
          allergies: registerForm.allergies.trim(),
          medicalNotes: registerForm.medicalNotes.trim(),
          emergencyContact: registerForm.emergencyContact.trim(),
          password: registerForm.password,
          role: "PATIENT",
        });
        showSuccessPopup(
          "Registration Successful",
          "Your patient account has been created successfully. Please login now.",
          "register"
        );
      } catch (err) {
        showAlert("Registration Failed", err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    // ── FORGOT PASSWORD (OTP step — backend endpoint wired when available) ─────
    const sendOtp = async () => {
      if (!forgotForm.phone.trim()) {
      showAlert("Missing Phone", "Please enter your registered phone number.");
        return;
      }
      setLoading(true);
      try {
        // TODO: await sendOtpApi(forgotForm.phone);
        // Demo simulation until OTP endpoint is ready
        await new Promise((r) => setTimeout(r, 800));
       showAlert("OTP Sent", "Demo OTP sent successfully. Use any 4 digits.");
        setForgotStep(2);
      } catch (err) {
        showAlert("Error", err.message || "Failed to send OTP.");
      } finally {
        setLoading(false);
      }
    };
  
    const resetPassword = async () => {
      if (!forgotForm.otp.trim()) returnshowAlert("Missing OTP", "Please enter OTP.");
      if (!forgotForm.newPassword.trim())
        return showAlert("Missing Password", "Please enter new password.");
      if (forgotForm.newPassword.length < 6)
        return showAlert("Weak Password", "Password must be at least 6 characters.");
      if (forgotForm.newPassword !== forgotForm.confirmPassword)
        return showAlert("Password Mismatch", "Passwords do not match.");
  
      setLoading(true);
      try {
        // TODO: await resetPasswordApi({ phone: forgotForm.phone, otp: forgotForm.otp, newPassword: forgotForm.newPassword });
        await new Promise((r) => setTimeout(r, 800));
        showSuccessPopup(
          "Password Reset Successful",
          "Your password has been reset. Please login with your new password.",
          "reset"
        );
      } catch (err) {
        showAlert("Error", err.message || "Failed to reset password.");
      } finally {
        setLoading(false);
      }
    };
  
    // ── RENDER ─────────────────────────────────────────────────────────────────
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
              <InputField label="Emergency Contact" placeholder="+91 00000 00000" value={registerForm.emergencyContact} onChangeText={(v) => updateRegister("emergencyContact", v)} keyboardType="phone-pad" icon="call-outline" />
  
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
                  <InputField label="Registered Phone Number" placeholder="+91 00000 00000" value={forgotForm.phone} onChangeText={(v) => updateForgot("phone", v)} keyboardType="phone-pad" icon="call-outline" />
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
                  <InputField label="OTP" placeholder="Enter OTP" value={forgotForm.otp} onChangeText={(v) => updateForgot("otp", v)} keyboardType="number-pad" icon="shield-checkmark-outline" />
                  <InputField label="New Password" placeholder="Create new password" value={forgotForm.newPassword} onChangeText={(v) => updateForgot("newPassword", v)} secureTextEntry icon="lock-closed-outline" />
                  <InputField label="Confirm Password" placeholder="Re-enter new password" value={forgotForm.confirmPassword} onChangeText={(v) => updateForgot("confirmPassword", v)} secureTextEntry icon="lock-closed-outline" />
                  <View style={styles.buttonBox}>
                    {loading ? (
                      <ActivityIndicator color={COLORS.primary} size="large" />
                    ) : (
                      <GradientButton title="Reset Password" onPress={resetPassword} />
                    )}
                  </View>
                  <Pressable style={styles.centerBtn} onPress={() => setForgotStep(1)}>
                    <Text style={styles.linkText}>Change phone number</Text>
                  </Pressable>
                </>
              )}
  
              <Pressable style={styles.centerBtn} onPress={goToLogin}>
                <Text style={styles.normalText}>Back to Login</Text>
              </Pressable>
            </MotiView>
          )}
        </ScrollView>
  
        {/* ── SUCCESS POPUP ── */}
        <Modal visible={successPopup.visible} transparent animationType="fade" onRequestClose={closeSuccessPopup}>
          <View style={styles.modalOverlay}>
            <MotiView
              from={{ opacity: 0, scale: 0.8, translateY: 20 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              transition={{ type: "spring", duration: 500 }}
              style={styles.successCard}
            >
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={58} color="#fff" />
              </View>
              <Text style={styles.successTitle}>{successPopup.title}</Text>
              <Text style={styles.successMessage}>{successPopup.message}</Text>
              <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
                <Text style={styles.successButtonText}>OK</Text>
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
    successCard: { width: "100%", maxWidth: 380, backgroundColor: COLORS.card || "#fff", borderRadius: 30, padding: 26, alignItems: "center", borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 24, elevation: 12 },
    successIcon: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", marginBottom: 18 },
    successTitle: { fontSize: 23, fontWeight: "900", color: COLORS.text || "#1E293B", textAlign: "center" },
    successMessage: { marginTop: 10, fontSize: 14, lineHeight: 21, color: COLORS.muted || "#64748B", textAlign: "center", fontWeight: "600" },
    successButton: { marginTop: 24, width: "100%", height: 52, borderRadius: 18, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
    successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
  });
  