





// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Pressable,
//   ActivityIndicator,
//   Clipboard,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import AppHeader from "../../components/AppHeader";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";
// import { registerHospital } from "../../services/apiService";
// import { showAlert } from "../../utility/showAlert";

// export default function HospitalRegisterScreen({ navigation }) {
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [assignedHospitalId, setAssignedHospitalId] = useState("");
//   const [copied, setCopied] = useState(false);

//   const [image, setImage] = useState(
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
//   );

//   const [form, setForm] = useState({
//     name: "",
//     owner: "",
//     phone: "",
//     email: "",
//     type: "",
//     address: "",
//     city: "",
//     regNo: "",
//     license: "",
//     departments: "",
//     doctors: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

//   // ── FORM VALIDATION ────────────────────────────────────────────────────────
//   // All fields must be non-empty, password >= 6 chars, passwords must match
//   const isFormValid =
//     form.name.trim() !== "" &&
//     form.owner.trim() !== "" &&
//     form.phone.trim() !== "" &&
//     form.email.trim() !== "" &&
//     form.type.trim() !== "" &&
//     form.address.trim() !== "" &&
//     form.city.trim() !== "" &&
//     form.regNo.trim() !== "" &&
//     form.license.trim() !== "" &&
//     form.departments.trim() !== "" &&
//     form.doctors.trim() !== "" &&
//     form.password.trim().length >= 6 &&
//     form.confirmPassword.trim() !== "" &&
//     form.password === form.confirmPassword &&
//     documents.length > 0;

//   const pickHospitalImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       showAlert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });
//     if (!result.canceled) setImage(result.assets[0].uri);
//   };

//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ["application/pdf", "image/*"],
//       copyToCacheDirectory: true,
//       multiple: false,
//     });
//     if (!result.canceled) {
//       const file = result.assets[0];
//       setDocuments((prev) => [...prev, file]);
//     }
//   };

//   const removeDocument = (index) =>
//     setDocuments((prev) => prev.filter((_, i) => i !== index));

//   const copyHospitalId = () => {
//     Clipboard.setString(assignedHospitalId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ── SUBMIT ─────────────────────────────────────────────────────────────────
//   const submit = async () => {
//     if (!isFormValid) return;

//     setLoading(true);
//     try {
//       const res = await registerHospital({
//         name: form.name.trim(),
//         ownerName: form.owner.trim(),
//         phone: form.phone.trim(),
//         email: form.email.trim(),
//         password: form.password,
//         type: form.type.trim(),
//         address: form.address.trim(),
//         city: form.city.trim(),
//         registrationNumber: form.regNo.trim(),
//         licenseNumber: form.license.trim(),
//         departments: form.departments.trim(),
//         numberOfDoctors: parseInt(form.doctors, 10) || 0,
//         imageUrl: image,
//         documentNames: documents.map((d) => d.name),
//         status: "PENDING",
//       });

//       setAssignedHospitalId(res.hospitalId);
//       setSuccessPopup(true);
//     } catch (err) {
//       showAlert("Submission Failed", err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // After closing popup → go to Pending Hospitals screen
//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     navigation.navigate("PendingHospitals");
//   };

//   // ── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <View style={styles.wrapper}>
//       <AppHeader
//         title="Hospital Register"
//         subtitle="Submit details for verification"
//         showBack
//         onBack={() => navigation.goBack()}
//       />

//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Hospital Image */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           <TouchableOpacity activeOpacity={0.86} style={styles.imageCard} onPress={pickHospitalImage}>
//             <Image source={{ uri: image }} style={styles.image} />
//             <View style={styles.imageOverlay}>
//               <View style={styles.camCircle}>
//                 <Ionicons name="camera" size={24} color="#fff" />
//               </View>
//               <Text style={styles.imageText}>Change Hospital Image</Text>
//             </View>
//           </TouchableOpacity>
//         </MotiView>

//         {/* Basic Information */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 200 }}
//         >
//           <Text style={styles.section}>Basic Information</Text>
//           <InputField
//             label="Hospital Name"
//             value={form.name}
//             onChangeText={(v) => update("name", v)}
//             icon="business-outline"
//           />
//           <InputField
//             label="Owner / Admin Name"
//             value={form.owner}
//             onChangeText={(v) => update("owner", v)}
//             icon="person-outline"
//           />
//           <InputField
//             label="Email"
//             value={form.email}
//             onChangeText={(v) => update("email", v)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             icon="mail-outline"
//           />
//           <InputField
//             label="Hospital Type"
//             value={form.type}
//             onChangeText={(v) => update("type", v)}
//             icon="medkit-outline"
//           />

//           <View style={styles.row}>
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="Phone"
//                 value={form.phone}
//                 keyboardType="phone-pad"
//                 onChangeText={(v) => update("phone", v)}
//                 icon="call-outline"
//               />
//             </View>
//             <View style={{ width: 12 }} />
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="City"
//                 value={form.city}
//                 onChangeText={(v) => update("city", v)}
//                 icon="location-outline"
//               />
//             </View>
//           </View>

//           <InputField
//             label="Address"
//             value={form.address}
//             multiline
//             onChangeText={(v) => update("address", v)}
//             icon="home-outline"
//           />
//         </MotiView>

//         {/* Licensing & Staff */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 400 }}
//         >
//           <Text style={styles.section}>Licensing & Staff</Text>
//           <InputField
//             label="Registration No."
//             value={form.regNo}
//             onChangeText={(v) => update("regNo", v)}
//             icon="document-text-outline"
//           />
//           <InputField
//             label="License No."
//             value={form.license}
//             onChangeText={(v) => update("license", v)}
//             icon="shield-checkmark-outline"
//           />
//           <InputField
//             label="Departments"
//             placeholder="e.g. Cardiology, ENT, General"
//             value={form.departments}
//             onChangeText={(v) => update("departments", v)}
//             icon="grid-outline"
//           />
//           <InputField
//             label="Number of Doctors"
//             value={form.doctors}
//             onChangeText={(v) => update("doctors", v)}
//             keyboardType="number-pad"
//             icon="people-outline"
//           />
//         </MotiView>

//         {/* Security / Password */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 550 }}
//         >
//           <Text style={styles.section}>Security</Text>
//           <InputField
//             label="Password"
//             value={form.password}
//             onChangeText={(v) => update("password", v)}
//             secureTextEntry
//             icon="lock-closed-outline"
//             placeholder="Min. 6 characters"
//           />
//           <InputField
//             label="Confirm Password"
//             value={form.confirmPassword}
//             onChangeText={(v) => update("confirmPassword", v)}
//             secureTextEntry
//             icon="lock-closed-outline"
//             placeholder="Re-enter password"
//           />

//           {/* Password mismatch hint */}
//           {form.password.length > 0 &&
//             form.confirmPassword.length > 0 &&
//             form.password !== form.confirmPassword && (
//               <View style={styles.hintRow}>
//                 <Ionicons name="alert-circle-outline" size={14} color="#EF4444" />
//                 <Text style={styles.hintText}>Passwords do not match</Text>
//               </View>
//             )}

//           {/* Password too short hint */}
//           {form.password.length > 0 && form.password.length < 6 && (
//             <View style={styles.hintRow}>
//               <Ionicons name="alert-circle-outline" size={14} color="#F59E0B" />
//               <Text style={[styles.hintText, { color: "#F59E0B" }]}>
//                 Password must be at least 6 characters
//               </Text>
//             </View>
//           )}
//         </MotiView>

//         {/* Documents */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 600 }}
//         >
//           <Text style={styles.section}>Verification Documents</Text>

//           <TouchableOpacity
//             activeOpacity={0.86}
//             style={[styles.uploadBox, documents.length === 0 && styles.uploadBoxRequired]}
//             onPress={pickDocument}
//           >
//             <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
//             <Text style={styles.uploadTitle}>Upload Certificate</Text>
//             <Text style={styles.uploadSub}>PDF or high-res images</Text>
//           </TouchableOpacity>

//           {documents.map((doc, index) => (
//             <MotiView
//               key={`${doc.name}-${index}`}
//               from={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               style={styles.docRow}
//             >
//               <Ionicons name="document-attach" size={22} color={COLORS.staff} />
//               <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
//               <TouchableOpacity onPress={() => removeDocument(index)}>
//                 <Ionicons name="close-circle" size={20} color="#EF4444" />
//               </TouchableOpacity>
//             </MotiView>
//           ))}

//           {/* Completion hint shown while form is incomplete */}
//           {!isFormValid && (
//             <View style={styles.completionHint}>
//               <Ionicons name="information-circle-outline" size={15} color={COLORS.muted} />
//               <Text style={styles.completionHintText}>
//                 Fill in all fields to enable submission
//               </Text>
//             </View>
//           )}

//           {loading ? (
//             <ActivityIndicator
//               color={COLORS.staff}
//               size="large"
//               style={{ marginTop: 24, marginBottom: 50 }}
//             />
//           ) : (
//             <TouchableOpacity
//               activeOpacity={isFormValid ? 0.85 : 1}
//               onPress={isFormValid ? submit : undefined}
//               style={[
//                 styles.submitBtn,
//                 !isFormValid && styles.submitBtnDisabled,
//               ]}
//               style={{ marginTop: 24, marginBottom: 50 }}
//             >
//               <GradientButton
//                 title="Submit for Verification"
//                 colors={isFormValid ? [COLORS.staff, "#14B8A6"] : ["#CBD5E1", "#94A3B8"]}
//                 onPress={isFormValid ? submit : undefined}
//                 disabled={!isFormValid}
//                 style={{ marginTop: 24, marginBottom: 50, opacity: isFormValid ? 1 : 0.6 }}
//               />
//             </TouchableOpacity>
//           )}
//         </MotiView>
//       </ScrollView>

//       {/* ── SUCCESS MODAL ── */}
//       <Modal
//         visible={successPopup}
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
//             {/* Check Icon */}
//             <View style={styles.successIconWrap}>
//               <Ionicons name="checkmark-circle" size={58} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Registration Submitted!</Text>
//             <Text style={styles.successMessage}>
//               Your hospital registration has been submitted successfully and is now under admin
//               verification. Please save your Hospital ID — you will need it to login.
//             </Text>

//             {/* Unique Hospital ID Badge */}
//             <View style={styles.idCard}>
//               <Text style={styles.idLabel}>YOUR HOSPITAL ID</Text>
//               <Text style={styles.idValue}>{assignedHospitalId}</Text>
//               <TouchableOpacity style={styles.copyBtn} onPress={copyHospitalId} activeOpacity={0.8}>
//                 <Ionicons
//                   name={copied ? "checkmark-circle" : "copy-outline"}
//                   size={16}
//                   color={copied ? "#22C55E" : COLORS.staff}
//                 />
//                 <Text style={[styles.copyText, copied && { color: "#22C55E" }]}>
//                   {copied ? "Copied!" : "Copy ID"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Status badge */}
//             <View style={styles.statusBadge}>
//               <Ionicons name="time-outline" size={17} color={COLORS.staff} />
//               <Text style={styles.statusText}>Pending Admin Verification</Text>
//             </View>

//             <Text style={styles.loginHint}>
//               Once approved, login using your Hospital ID, email, and password.
//             </Text>

//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>Got it!</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: COLORS.background },
//   content: { padding: 20, paddingBottom: 34 },

//   imageCard: {
//     height: 190,
//     borderRadius: 28,
//     overflow: "hidden",
//     marginBottom: 24,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     backgroundColor: "#fff",
//   },
//   image: { width: "100%", height: "100%" },
//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   camCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   imageText: { color: "#fff", fontWeight: "800", fontSize: 14 },

//   section: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 12,
//     marginBottom: 16,
//     letterSpacing: -0.5,
//   },
//   row: { flexDirection: "row", alignItems: "center" },

//   uploadBox: {
//     height: 140,
//     backgroundColor: "#F0FDFA",
//     borderRadius: 24,
//     borderWidth: 2,
//     borderStyle: "dashed",
//     borderColor: COLORS.staff + "50",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   uploadBoxRequired: {
//     borderColor: "#F59E0B",
//     backgroundColor: "#FFFBEB",
//   },
//   uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 10 },
//   uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },

//   docRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },

//   // ── Hints ──────────────────────────────────────────────────────────────────
//   hintRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: -6,
//     marginBottom: 10,
//     paddingHorizontal: 4,
//   },
//   hintText: {
//     fontSize: 12,
//     color: "#EF4444",
//     fontWeight: "600",
//   },
//   completionHint: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 8,
//     marginBottom: 4,
//     paddingHorizontal: 4,
//   },
//   completionHintText: {
//     fontSize: 12,
//     color: COLORS.muted,
//     fontWeight: "500",
//   },

//   // ── Modal ──────────────────────────────────────────────────────────────────
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.6)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   successCard: {
//     width: "100%",
//     maxWidth: 400,
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
//   successIconWrap: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },
//   successTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: COLORS.text,
//     textAlign: "center",
//   },
//   successMessage: {
//     marginTop: 10,
//     fontSize: 13,
//     lineHeight: 20,
//     color: COLORS.muted,
//     textAlign: "center",
//     fontWeight: "500",
//   },

//   idCard: {
//     marginTop: 20,
//     width: "100%",
//     backgroundColor: "#F0FDFA",
//     borderRadius: 18,
//     padding: 18,
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: COLORS.staff + "50",
//   },
//   idLabel: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: COLORS.muted,
//     letterSpacing: 2,
//     textTransform: "uppercase",
//   },
//   idValue: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: COLORS.staff,
//     letterSpacing: 3,
//     marginTop: 6,
//     marginBottom: 12,
//   },
//   copyBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: COLORS.staff + "40",
//   },
//   copyText: {
//     color: COLORS.staff,
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   statusBadge: {
//     marginTop: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#FFF7ED",
//     borderWidth: 1,
//     borderColor: "#F59E0B40",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },
//   statusText: { color: "#F59E0B", fontSize: 13, fontWeight: "900" },

//   loginHint: {
//     marginTop: 14,
//     fontSize: 12,
//     color: COLORS.muted,
//     textAlign: "center",
//     fontWeight: "500",
//     lineHeight: 18,
//   },

//   successButton: {
//     marginTop: 20,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
// });  





































// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Pressable,
//   ActivityIndicator,
//   Clipboard,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import AppHeader from "../../components/AppHeader";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";
// import { registerHospital } from "../../services/apiService";
// import { showAlert } from "../../utility/showAlert";

// export default function HospitalRegisterScreen({ navigation }) {
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [assignedHospitalId, setAssignedHospitalId] = useState("");
//   const [copied, setCopied] = useState(false);

//   const [image, setImage] = useState(
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
//   );

//   const [form, setForm] = useState({
//     name: "",
//     owner: "",
//     phone: "",
//     email: "",
//     type: "",
//     address: "",
//     city: "",
//     regNo: "",
//     license: "",
//     departments: "",
//     doctors: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

//   const pickHospitalImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       showAlert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });
//     if (!result.canceled) setImage(result.assets[0].uri);
//   };

//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ["application/pdf", "image/*"],
//       copyToCacheDirectory: true,
//       multiple: false,
//     });
//     if (!result.canceled) {
//       const file = result.assets[0];
//       setDocuments((prev) => [...prev, file]);
//     }
//   };

//   const removeDocument = (index) =>
//     setDocuments((prev) => prev.filter((_, i) => i !== index));

//   const copyHospitalId = () => {
//     Clipboard.setString(assignedHospitalId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ── SUBMIT ─────────────────────────────────────────────────────────────────
//   const submit = async () => {
//     if (!form.name.trim()) {
//       showAlert("Missing Details", "Hospital name is required.");
//       return;
//     }
//     if (!form.phone.trim()) {
//       showAlert("Missing Details", "Phone number is required.");
//       return;
//     }
//     if (!form.email.trim()) {
//       showAlert("Missing Details", "Email is required.");
//       return;
//     }
//     if (!form.license.trim()) {
//       showAlert("Missing Details", "License number is required.");
//       return;
//     }
//     if (!form.password.trim() || form.password.length < 6) {
//       showAlert("Weak Password", "Password must be at least 6 characters.");
//       return;
//     }
//     if (form.password !== form.confirmPassword) {
//       showAlert("Password Mismatch", "Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await registerHospital({
//         name: form.name.trim(),
//         ownerName: form.owner.trim(),
//         phone: form.phone.trim(),
//         email: form.email.trim(),
//         password: form.password,
//         type: form.type.trim(),
//         address: form.address.trim(),
//         city: form.city.trim(),
//         registrationNumber: form.regNo.trim(),
//         licenseNumber: form.license.trim(),
//         departments: form.departments.trim(),
//         numberOfDoctors: parseInt(form.doctors, 10) || 0,
//         imageUrl: image,
//         documentNames: documents.map((d) => d.name),
//         status: "PENDING",
//       });

//       // Save the unique hospital ID returned from backend
//       setAssignedHospitalId(res.hospitalId);
//       setSuccessPopup(true);
//     } catch (err) {
//       showAlert("Submission Failed", err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // After closing popup → go to Pending Hospitals screen
//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     navigation.navigate("PendingHospitals");
//   };

//   // ── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <View style={styles.wrapper}>
//       <AppHeader
//         title="Hospital Register"
//         subtitle="Submit details for verification"
//         showBack
//         onBack={() => navigation.goBack()}
//       />

//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Hospital Image */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           <TouchableOpacity activeOpacity={0.86} style={styles.imageCard} onPress={pickHospitalImage}>
//             <Image source={{ uri: image }} style={styles.image} />
//             <View style={styles.imageOverlay}>
//               <View style={styles.camCircle}>
//                 <Ionicons name="camera" size={24} color="#fff" />
//               </View>
//               <Text style={styles.imageText}>Change Hospital Image</Text>
//             </View>
//           </TouchableOpacity>
//         </MotiView>

//         {/* Basic Information */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 200 }}
//         >
//           <Text style={styles.section}>Basic Information</Text>
//           <InputField
//             label="Hospital Name"
//             value={form.name}
//             onChangeText={(v) => update("name", v)}
//             icon="business-outline"
//           />
//           <InputField
//             label="Owner / Admin Name"
//             value={form.owner}
//             onChangeText={(v) => update("owner", v)}
//             icon="person-outline"
//           />
//           <InputField
//             label="Email"
//             value={form.email}
//             onChangeText={(v) => update("email", v)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             icon="mail-outline"
//           />
//           <InputField
//             label="Hospital Type"
//             value={form.type}
//             onChangeText={(v) => update("type", v)}
//             icon="medkit-outline"
//           />

//           <View style={styles.row}>
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="Phone"
//                 value={form.phone}
//                 keyboardType="phone-pad"
//                 onChangeText={(v) => update("phone", v)}
//                 icon="call-outline"
//               />
//             </View>
//             <View style={{ width: 12 }} />
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="City"
//                 value={form.city}
//                 onChangeText={(v) => update("city", v)}
//                 icon="location-outline"
//               />
//             </View>
//           </View>

//           <InputField
//             label="Address"
//             value={form.address}
//             multiline
//             onChangeText={(v) => update("address", v)}
//             icon="home-outline"
//           />
//         </MotiView>

//         {/* Licensing & Staff */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 400 }}
//         >
//           <Text style={styles.section}>Licensing & Staff</Text>
//           <InputField
//             label="Registration No."
//             value={form.regNo}
//             onChangeText={(v) => update("regNo", v)}
//             icon="document-text-outline"
//           />
//           <InputField
//             label="License No."
//             value={form.license}
//             onChangeText={(v) => update("license", v)}
//             icon="shield-checkmark-outline"
//           />
//           <InputField
//             label="Departments"
//             placeholder="e.g. Cardiology, ENT, General"
//             value={form.departments}
//             onChangeText={(v) => update("departments", v)}
//             icon="grid-outline"
//           />
//           <InputField
//             label="Number of Doctors"
//             value={form.doctors}
//             onChangeText={(v) => update("doctors", v)}
//             keyboardType="number-pad"
//             icon="people-outline"
//           />
//         </MotiView>

//         {/* Security / Password */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 550 }}
//         >
//           <Text style={styles.section}>Security</Text>
//           <InputField
//             label="Password"
//             value={form.password}
//             onChangeText={(v) => update("password", v)}
//             secureTextEntry
//             icon="lock-closed-outline"
//             placeholder="Min. 6 characters"
//           />
//           <InputField
//             label="Confirm Password"
//             value={form.confirmPassword}
//             onChangeText={(v) => update("confirmPassword", v)}
//             secureTextEntry
//             icon="lock-closed-outline"
//             placeholder="Re-enter password"
//           />
//         </MotiView>

//         {/* Documents */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 600 }}
//         >
//           <Text style={styles.section}>Verification Documents</Text>

//           <TouchableOpacity activeOpacity={0.86} style={styles.uploadBox} onPress={pickDocument}>
//             <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
//             <Text style={styles.uploadTitle}>Upload Certificate</Text>
//             <Text style={styles.uploadSub}>PDF or high-res images</Text>
//           </TouchableOpacity>

//           {documents.map((doc, index) => (
//             <MotiView
//               key={`${doc.name}-${index}`}
//               from={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               style={styles.docRow}
//             >
//               <Ionicons name="document-attach" size={22} color={COLORS.staff} />
//               <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
//               <TouchableOpacity onPress={() => removeDocument(index)}>
//                 <Ionicons name="close-circle" size={20} color="#EF4444" />
//               </TouchableOpacity>
//             </MotiView>
//           ))}

//           {loading ? (
//             <ActivityIndicator
//               color={COLORS.staff}
//               size="large"
//               style={{ marginTop: 24, marginBottom: 50 }}
//             />
//           ) : (
//             <GradientButton
//               title="Submit for Verification"
//               colors={[COLORS.staff, "#14B8A6"]}
//               onPress={submit}
//               style={{ marginTop: 24, marginBottom: 50 }}
//             />
//           )}
//         </MotiView>
//       </ScrollView>

//       {/* ── SUCCESS MODAL ── */}
//       <Modal
//         visible={successPopup}
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
//             {/* Check Icon */}
//             <View style={styles.successIconWrap}>
//               <Ionicons name="checkmark-circle" size={58} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Registration Submitted!</Text>
//             <Text style={styles.successMessage}>
//               Your hospital registration has been submitted successfully and is now under admin
//               verification. Please save your Hospital ID — you will need it to login.
//             </Text>

//             {/* Unique Hospital ID Badge */}
//             <View style={styles.idCard}>
//               <Text style={styles.idLabel}>YOUR HOSPITAL ID</Text>
//               <Text style={styles.idValue}>{assignedHospitalId}</Text>
//               <TouchableOpacity style={styles.copyBtn} onPress={copyHospitalId} activeOpacity={0.8}>
//                 <Ionicons
//                   name={copied ? "checkmark-circle" : "copy-outline"}
//                   size={16}
//                   color={copied ? "#22C55E" : COLORS.staff}
//                 />
//                 <Text style={[styles.copyText, copied && { color: "#22C55E" }]}>
//                   {copied ? "Copied!" : "Copy ID"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Status badge */}
//             <View style={styles.statusBadge}>
//               <Ionicons name="time-outline" size={17} color={COLORS.staff} />
//               <Text style={styles.statusText}>Pending Admin Verification</Text>
//             </View>

//             <Text style={styles.loginHint}>
//               Once approved, login using your Hospital ID, email, and password.
//             </Text>

//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>Got it!</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: COLORS.background },
//   content: { padding: 20, paddingBottom: 34 },

//   imageCard: {
//     height: 190,
//     borderRadius: 28,
//     overflow: "hidden",
//     marginBottom: 24,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     backgroundColor: "#fff",
//   },
//   image: { width: "100%", height: "100%" },
//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   camCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   imageText: { color: "#fff", fontWeight: "800", fontSize: 14 },

//   section: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 12,
//     marginBottom: 16,
//     letterSpacing: -0.5,
//   },
//   row: { flexDirection: "row", alignItems: "center" },

//   uploadBox: {
//     height: 140,
//     backgroundColor: "#F0FDFA",
//     borderRadius: 24,
//     borderWidth: 2,
//     borderStyle: "dashed",
//     borderColor: COLORS.staff + "50",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 10 },
//   uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },

//   docRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },

//   // ── Modal ──────────────────────────────────────────────────────────────────
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.6)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   successCard: {
//     width: "100%",
//     maxWidth: 400,
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
//   successIconWrap: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },
//   successTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: COLORS.text,
//     textAlign: "center",
//   },
//   successMessage: {
//     marginTop: 10,
//     fontSize: 13,
//     lineHeight: 20,
//     color: COLORS.muted,
//     textAlign: "center",
//     fontWeight: "500",
//   },

//   // Hospital ID card
//   idCard: {
//     marginTop: 20,
//     width: "100%",
//     backgroundColor: "#F0FDFA",
//     borderRadius: 18,
//     padding: 18,
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: COLORS.staff + "50",
//   },
//   idLabel: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: COLORS.muted,
//     letterSpacing: 2,
//     textTransform: "uppercase",
//   },
//   idValue: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: COLORS.staff,
//     letterSpacing: 3,
//     marginTop: 6,
//     marginBottom: 12,
//   },
//   copyBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: COLORS.staff + "40",
//   },
//   copyText: {
//     color: COLORS.staff,
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   statusBadge: {
//     marginTop: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#FFF7ED",
//     borderWidth: 1,
//     borderColor: "#F59E0B40",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },
//   statusText: { color: "#F59E0B", fontSize: 13, fontWeight: "900" },

//   loginHint: {
//     marginTop: 14,
//     fontSize: 12,
//     color: COLORS.muted,
//     textAlign: "center",
//     fontWeight: "500",
//     lineHeight: 18,
//   },

//   successButton: {
//     marginTop: 20,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
// });
























// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Modal,
//   Pressable,
//   ActivityIndicator,
//   Clipboard,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import AppHeader from "../../components/AppHeader";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";
// import { registerHospital } from "../../services/apiService";
// import { showAlert } from "../../utility/showAlert";

// export default function HospitalRegisterScreen({ navigation }) {
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [assignedHospitalId, setAssignedHospitalId] = useState("");
//   const [copied, setCopied] = useState(false);

//   const [image, setImage] = useState(
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
//   );

//   const [form, setForm] = useState({
//     name: "",
//     owner: "",
//     phone: "",
//     email: "",
//     type: "",
//     address: "",
//     city: "",
//     regNo: "",
//     license: "",
//     departments: "",
//     doctors: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

//   // ── FORM VALIDATION ────────────────────────────────────────────────────────
//   // All fields must be non-empty, password >= 6 chars, passwords must match
//   const isFormValid =
//     form.name.trim() !== "" &&
//     form.owner.trim() !== "" &&
//     form.phone.trim() !== "" &&
//     form.email.trim() !== "" &&
//     form.type.trim() !== "" &&
//     form.address.trim() !== "" &&
//     form.city.trim() !== "" &&
//     form.regNo.trim() !== "" &&
//     form.license.trim() !== "" &&
//     form.departments.trim() !== "" &&
//     form.doctors.trim() !== "" &&
//     form.password.trim().length >= 6 &&
//     form.confirmPassword.trim() !== "" &&
//     form.password === form.confirmPassword &&
//     documents.length > 0;

//   const pickHospitalImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       showAlert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });
//     if (!result.canceled) setImage(result.assets[0].uri);
//   };

//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ["application/pdf", "image/*"],
//       copyToCacheDirectory: true,
//       multiple: false,
//     });
//     if (!result.canceled) {
//       const file = result.assets[0];
//       setDocuments((prev) => [...prev, file]);
//     }
//   };

//   const removeDocument = (index) =>
//     setDocuments((prev) => prev.filter((_, i) => i !== index));

//   const copyHospitalId = () => {
//     Clipboard.setString(assignedHospitalId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // ── SUBMIT ─────────────────────────────────────────────────────────────────
//   const submit = async () => {
//     if (!isFormValid) return;

//     setLoading(true);
//     try {
//       // Convert hospital image to base64 (only if it's a local file URI)
//       let imageData = image;
//       if (image && image.startsWith("file://")) {
//         const base64 = await FileSystem.readAsStringAsync(image, {
//           encoding: FileSystem.EncodingType.Base64,
//         });
//         // Detect mime type from URI extension
//         const ext = image.split(".").pop().toLowerCase();
//         const mime = ext === "png" ? "image/png" : "image/jpeg";
//         imageData = `data:${mime};base64,${base64}`;
//       }

//       // Convert each document to base64
//       const docBase64List = await Promise.all(
//         documents.map(async (doc) => {
//           const base64 = await FileSystem.readAsStringAsync(doc.uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           const mime = doc.mimeType || "application/octet-stream";
//           return {
//             name: doc.name,
//             data: `data:${mime};base64,${base64}`,
//           };
//         })
//       );

//       const res = await registerHospital({
//         name: form.name.trim(),
//         ownerName: form.owner.trim(),
//         phone: form.phone.trim(),
//         email: form.email.trim(),
//         password: form.password,
//         type: form.type.trim(),
//         address: form.address.trim(),
//         city: form.city.trim(),
//         registrationNumber: form.regNo.trim(),
//         licenseNumber: form.license.trim(),
//         departments: form.departments.trim(),
//         numberOfDoctors: parseInt(form.doctors, 10) || 0,
//         imageUrl: imageData,
//         documentUrls: JSON.stringify(docBase64List),
//         status: "PENDING",
//       });

//       setAssignedHospitalId(res.hospitalId);
//       setSuccessPopup(true);
//     } catch (err) {
//       showAlert("Submission Failed", err.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // After closing popup → go to Pending Hospitals screen
//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     navigation.navigate("PendingHospitals");
//   };

//   // ── RENDER ─────────────────────────────────────────────────────────────────
//   return (
//     <View style={styles.wrapper}>
//       <AppHeader
//         title="Hospital Register"
//         subtitle="Submit details for verification"
//         showBack
//         onBack={() => navigation.goBack()}
//       />

//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Hospital Image */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           <TouchableOpacity activeOpacity={0.86} style={styles.imageCard} onPress={pickHospitalImage}>
//             <Image source={{ uri: image }} style={styles.image} />
//             <View style={styles.imageOverlay}>
//               <View style={styles.camCircle}>
//                 <Ionicons name="camera" size={24} color="#fff" />
//               </View>
//               <Text style={styles.imageText}>Change Hospital Image</Text>
//             </View>
//           </TouchableOpacity>
//         </MotiView>

//         {/* Basic Information */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 200 }}
//         >
//           <Text style={styles.section}>Basic Information</Text>
//           <InputField
//             label="Hospital Name"
//             value={form.name}
//             onChangeText={(v) => update("name", v)}
//             icon="business-outline"
//           />
//           <InputField
//             label="Owner / Admin Name"
//             value={form.owner}
//             onChangeText={(v) => update("owner", v)}
//             icon="person-outline"
//           />
//           <InputField
//             label="Email"
//             value={form.email}
//             onChangeText={(v) => update("email", v)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             icon="mail-outline"
//           />
//           <InputField
//             label="Hospital Type"
//             value={form.type}
//             onChangeText={(v) => update("type", v)}
//             icon="medkit-outline"
//           />

//           <View style={styles.row}>
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="Phone"
//                 value={form.phone}
//                 keyboardType="phone-pad"
//                 onChangeText={(v) => update("phone", v)}
//                 icon="call-outline"
//               />
//             </View>
//             <View style={{ width: 12 }} />
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="City"
//                 value={form.city}
//                 onChangeText={(v) => update("city", v)}
//                 icon="location-outline"
//               />
//             </View>
//           </View>

//           <InputField
//             label="Address"
//             value={form.address}
//             multiline
//             onChangeText={(v) => update("address", v)}
//             icon="home-outline"
//           />
//         </MotiView>

//         {/* Licensing & Staff */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 400 }}
//         >
//           <Text style={styles.section}>Licensing & Staff</Text>
//           <InputField
//             label="Registration No."
//             value={form.regNo}
//             onChangeText={(v) => update("regNo", v)}
//             icon="document-text-outline"
//           />
//           <InputField
//             label="License No."
//             value={form.license}
//             onChangeText={(v) => update("license", v)}
//             icon="shield-checkmark-outline"
//           />
//           <InputField
//             label="Departments"
//             placeholder="e.g. Cardiology, ENT, General"
//             value={form.departments}
//             onChangeText={(v) => update("departments", v)}
//             icon="grid-outline"
//           />
//           <InputField
//             label="Number of Doctors"
//             value={form.doctors}
//             onChangeText={(v) => update("doctors", v)}
//             keyboardType="number-pad"
//             icon="people-outline"
//           />
//         </MotiView>

//         {/* Security / Password */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 550 }}
//         >
//           <Text style={styles.section}>Security</Text>
//           <InputField
//             label="Password"
//             value={form.password}
//             onChangeText={(v) => update("password", v)}
//             secureTextEntry
//             icon="lock-closed-outline"
//             placeholder="Min. 6 characters"
//           />
//           <InputField
//             label="Confirm Password"
//             value={form.confirmPassword}
//             onChangeText={(v) => update("confirmPassword", v)}
//             secureTextEntry
//             icon="lock-closed-outline"
//             placeholder="Re-enter password"
//           />

//           {/* Password mismatch hint */}
//           {form.password.length > 0 &&
//             form.confirmPassword.length > 0 &&
//             form.password !== form.confirmPassword && (
//               <View style={styles.hintRow}>
//                 <Ionicons name="alert-circle-outline" size={14} color="#EF4444" />
//                 <Text style={styles.hintText}>Passwords do not match</Text>
//               </View>
//             )}

//           {/* Password too short hint */}
//           {form.password.length > 0 && form.password.length < 6 && (
//             <View style={styles.hintRow}>
//               <Ionicons name="alert-circle-outline" size={14} color="#F59E0B" />
//               <Text style={[styles.hintText, { color: "#F59E0B" }]}>
//                 Password must be at least 6 characters
//               </Text>
//             </View>
//           )}
//         </MotiView>

//         {/* Documents */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 600 }}
//         >
//           <Text style={styles.section}>Verification Documents</Text>

//           <TouchableOpacity
//             activeOpacity={0.86}
//             style={[styles.uploadBox, documents.length === 0 && styles.uploadBoxRequired]}
//             onPress={pickDocument}
//           >
//             <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
//             <Text style={styles.uploadTitle}>Upload Certificate</Text>
//             <Text style={styles.uploadSub}>PDF or high-res images</Text>
//           </TouchableOpacity>

//           {documents.map((doc, index) => (
//             <MotiView
//               key={`${doc.name}-${index}`}
//               from={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               style={styles.docRow}
//             >
//               <Ionicons name="document-attach" size={22} color={COLORS.staff} />
//               <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
//               <TouchableOpacity onPress={() => removeDocument(index)}>
//                 <Ionicons name="close-circle" size={20} color="#EF4444" />
//               </TouchableOpacity>
//             </MotiView>
//           ))}

//           {/* Completion hint shown while form is incomplete */}
//           {!isFormValid && (
//             <View style={styles.completionHint}>
//               <Ionicons name="information-circle-outline" size={15} color={COLORS.muted} />
//               <Text style={styles.completionHintText}>
//                 Fill in all fields to enable submission
//               </Text>
//             </View>
//           )}

//           {loading ? (
//             <ActivityIndicator
//               color={COLORS.staff}
//               size="large"
//               style={{ marginTop: 24, marginBottom: 50 }}
//             />
//           ) : (
//             <TouchableOpacity
//               activeOpacity={isFormValid ? 0.85 : 1}
//               onPress={isFormValid ? submit : undefined}
//               style={[
//                 styles.submitBtn,
//                 !isFormValid && styles.submitBtnDisabled,
//               ]}
//               style={{ marginTop: 24, marginBottom: 50 }}
//             >
//               <GradientButton
//                 title="Submit for Verification"
//                 colors={isFormValid ? [COLORS.staff, "#14B8A6"] : ["#CBD5E1", "#94A3B8"]}
//                 onPress={isFormValid ? submit : undefined}
//                 disabled={!isFormValid}
//                 style={{ marginTop: 24, marginBottom: 50, opacity: isFormValid ? 1 : 0.6 }}
//               />
//             </TouchableOpacity>
//           )}
//         </MotiView>
//       </ScrollView>

//       {/* ── SUCCESS MODAL ── */}
//       <Modal
//         visible={successPopup}
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
//             {/* Check Icon */}
//             <View style={styles.successIconWrap}>
//               <Ionicons name="checkmark-circle" size={58} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Registration Submitted!</Text>
//             <Text style={styles.successMessage}>
//               Your hospital registration has been submitted successfully and is now under admin
//               verification. Please save your Hospital ID — you will need it to login.
//             </Text>

//             {/* Unique Hospital ID Badge */}
//             <View style={styles.idCard}>
//               <Text style={styles.idLabel}>YOUR HOSPITAL ID</Text>
//               <Text style={styles.idValue}>{assignedHospitalId}</Text>
//               <TouchableOpacity style={styles.copyBtn} onPress={copyHospitalId} activeOpacity={0.8}>
//                 <Ionicons
//                   name={copied ? "checkmark-circle" : "copy-outline"}
//                   size={16}
//                   color={copied ? "#22C55E" : COLORS.staff}
//                 />
//                 <Text style={[styles.copyText, copied && { color: "#22C55E" }]}>
//                   {copied ? "Copied!" : "Copy ID"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Status badge */}
//             <View style={styles.statusBadge}>
//               <Ionicons name="time-outline" size={17} color={COLORS.staff} />
//               <Text style={styles.statusText}>Pending Admin Verification</Text>
//             </View>

//             <Text style={styles.loginHint}>
//               Once approved, login using your Hospital ID, email, and password.
//             </Text>

//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>Got it!</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: COLORS.background },
//   content: { padding: 20, paddingBottom: 34 },

//   imageCard: {
//     height: 190,
//     borderRadius: 28,
//     overflow: "hidden",
//     marginBottom: 24,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     backgroundColor: "#fff",
//   },
//   image: { width: "100%", height: "100%" },
//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   camCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },
//   imageText: { color: "#fff", fontWeight: "800", fontSize: 14 },

//   section: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 12,
//     marginBottom: 16,
//     letterSpacing: -0.5,
//   },
//   row: { flexDirection: "row", alignItems: "center" },

//   uploadBox: {
//     height: 140,
//     backgroundColor: "#F0FDFA",
//     borderRadius: 24,
//     borderWidth: 2,
//     borderStyle: "dashed",
//     borderColor: COLORS.staff + "50",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   uploadBoxRequired: {
//     borderColor: "#F59E0B",
//     backgroundColor: "#FFFBEB",
//   },
//   uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 10 },
//   uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },

//   docRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },

//   // ── Hints ──────────────────────────────────────────────────────────────────
//   hintRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: -6,
//     marginBottom: 10,
//     paddingHorizontal: 4,
//   },
//   hintText: {
//     fontSize: 12,
//     color: "#EF4444",
//     fontWeight: "600",
//   },
//   completionHint: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 8,
//     marginBottom: 4,
//     paddingHorizontal: 4,
//   },
//   completionHintText: {
//     fontSize: 12,
//     color: COLORS.muted,
//     fontWeight: "500",
//   },

//   // ── Modal ──────────────────────────────────────────────────────────────────
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.6)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   successCard: {
//     width: "100%",
//     maxWidth: 400,
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
//   successIconWrap: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },
//   successTitle: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: COLORS.text,
//     textAlign: "center",
//   },
//   successMessage: {
//     marginTop: 10,
//     fontSize: 13,
//     lineHeight: 20,
//     color: COLORS.muted,
//     textAlign: "center",
//     fontWeight: "500",
//   },

//   idCard: {
//     marginTop: 20,
//     width: "100%",
//     backgroundColor: "#F0FDFA",
//     borderRadius: 18,
//     padding: 18,
//     alignItems: "center",
//     borderWidth: 1.5,
//     borderColor: COLORS.staff + "50",
//   },
//   idLabel: {
//     fontSize: 11,
//     fontWeight: "800",
//     color: COLORS.muted,
//     letterSpacing: 2,
//     textTransform: "uppercase",
//   },
//   idValue: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: COLORS.staff,
//     letterSpacing: 3,
//     marginTop: 6,
//     marginBottom: 12,
//   },
//   copyBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: COLORS.staff + "40",
//   },
//   copyText: {
//     color: COLORS.staff,
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   statusBadge: {
//     marginTop: 16,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#FFF7ED",
//     borderWidth: 1,
//     borderColor: "#F59E0B40",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },
//   statusText: { color: "#F59E0B", fontSize: 13, fontWeight: "900" },

//   loginHint: {
//     marginTop: 14,
//     fontSize: 12,
//     color: COLORS.muted,
//     textAlign: "center",
//     fontWeight: "500",
//     lineHeight: 18,
//   },

//   successButton: {
//     marginTop: 20,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
// });  




























import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import AppHeader from "../../components/AppHeader";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { registerHospital } from "../../services/apiService";
import { showAlert } from "../../utility/showAlert";

export default function HospitalRegisterScreen({ navigation }) {
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [assignedHospitalId, setAssignedHospitalId] = useState("");
  const [copied, setCopied] = useState(false);

  // No default image — starts as null, user must pick one
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    owner: "",
    phone: "",
    email: "",
    type: "",
    address: "",
    city: "",
    regNo: "",
    license: "",
    departments: "",
    doctors: "",
    password: "",
    confirmPassword: "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  // ── FORM VALIDATION ────────────────────────────────────────────────────────
  const isFormValid =
    form.name.trim() !== "" &&
    form.owner.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== "" &&
    form.type.trim() !== "" &&
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.regNo.trim() !== "" &&
    form.license.trim() !== "" &&
    form.departments.trim() !== "" &&
    form.doctors.trim() !== "" &&
    form.password.trim().length >= 6 &&
    form.confirmPassword.trim() !== "" &&
    form.password === form.confirmPassword &&
    documents.length > 0 &&
    image !== null;

  const pickHospitalImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showAlert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsEditing: true,
      aspect: [16, 9],
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!result.canceled) {
      const file = result.assets[0];
      setDocuments((prev) => [...prev, file]);
    }
  };

  const removeDocument = (index) =>
    setDocuments((prev) => prev.filter((_, i) => i !== index));

  const copyHospitalId = () => {
    Clipboard.setString(assignedHospitalId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── HELPERS ────────────────────────────────────────────────────────────────
  // Converts any URI (file://, blob:, or already data:) to a base64 data URL.
  // Works on both native (uses expo-file-system) and web (uses fetch + FileReader).
  const uriToBase64DataUrl = async (uri, mimeHint = "image/jpeg") => {
    // Already a data URL — pass through
    if (uri.startsWith("data:")) return uri;

    if (Platform.OS === "web" || uri.startsWith("blob:")) {
      // Web path: fetch blob → FileReader
      const resp = await fetch(uri);
      const blob = await resp.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // already "data:<mime>;base64,..."
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } else {
      // Native path: expo-file-system
      const FileSystem = require("expo-file-system");
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:${mimeHint};base64,${base64}`;
    }
  };

  // ── SUBMIT ─────────────────────────────────────────────────────────────────
  const submit = async () => {
    if (!isFormValid) return;

    setLoading(true);
    try {
      // Convert hospital image to base64 data URL
      const ext = (image || "").split(".").pop().toLowerCase();
      const imageMime = ext === "png" ? "image/png" : "image/jpeg";
      const imageData = await uriToBase64DataUrl(image, imageMime);

      // Convert each document to base64 data URL
      const docBase64List = await Promise.all(
        documents.map(async (doc) => {
          const mime = doc.mimeType || "application/octet-stream";
          const data = await uriToBase64DataUrl(doc.uri, mime);
          return { name: doc.name, data };
        })
      );

      const res = await registerHospital({
        name: form.name.trim(),
        ownerName: form.owner.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        type: form.type.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        registrationNumber: form.regNo.trim(),
        licenseNumber: form.license.trim(),
        departments: form.departments.trim(),
        numberOfDoctors: parseInt(form.doctors, 10) || 0,
        imageUrl: imageData,
        documentUrls: JSON.stringify(docBase64List),
        status: "PENDING",
      });

      setAssignedHospitalId(res.hospitalId);
      setSuccessPopup(true);
    } catch (err) {
      showAlert("Submission Failed", err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessPopup(false);
    navigation.navigate("PendingHospitals");
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.wrapper}>
      <AppHeader
        title="Hospital Register"
        subtitle="Submit details for verification"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Hospital Photo Upload ── */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <Text style={styles.section}>Hospital Photo</Text>

          {image ? (
            // Preview of picked image with option to change
            <TouchableOpacity
              activeOpacity={0.86}
              style={styles.imagePreviewCard}
              onPress={pickHospitalImage}
            >
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <View style={styles.imageOverlay}>
                <View style={styles.camCircle}>
                  <Ionicons name="camera" size={22} color="#fff" />
                </View>
                <Text style={styles.imageChangeText}>Tap to change photo</Text>
              </View>
            </TouchableOpacity>
          ) : (
            // Empty state upload box
            <TouchableOpacity
              activeOpacity={0.86}
              style={[styles.uploadBox, styles.uploadBoxRequired]}
              onPress={pickHospitalImage}
            >
              <View style={styles.photoIconCircle}>
                <Ionicons name="camera-outline" size={32} color={COLORS.staff} />
              </View>
              <Text style={styles.uploadTitle}>Upload Hospital Photo</Text>
              <Text style={styles.uploadSub}>Tap to select from gallery · Required</Text>
            </TouchableOpacity>
          )}
        </MotiView>

        {/* Basic Information */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
        >
          <Text style={styles.section}>Basic Information</Text>
          <InputField
            label="Hospital Name"
            value={form.name}
            onChangeText={(v) => update("name", v)}
            icon="business-outline"
          />
          <InputField
            label="Owner / Admin Name"
            value={form.owner}
            onChangeText={(v) => update("owner", v)}
            icon="person-outline"
          />
          <InputField
            label="Email"
            value={form.email}
            onChangeText={(v) => update("email", v)}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          <InputField
            label="Hospital Type"
            value={form.type}
            onChangeText={(v) => update("type", v)}
            icon="medkit-outline"
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <InputField
                label="Phone"
                value={form.phone}
                keyboardType="phone-pad"
                onChangeText={(v) => update("phone", v)}
                icon="call-outline"
              />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <InputField
                label="City"
                value={form.city}
                onChangeText={(v) => update("city", v)}
                icon="location-outline"
              />
            </View>
          </View>

          <InputField
            label="Address"
            value={form.address}
            multiline
            onChangeText={(v) => update("address", v)}
            icon="home-outline"
          />
        </MotiView>

        {/* Licensing & Staff */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 400 }}
        >
          <Text style={styles.section}>Licensing & Staff</Text>
          <InputField
            label="Registration No."
            value={form.regNo}
            onChangeText={(v) => update("regNo", v)}
            icon="document-text-outline"
          />
          <InputField
            label="License No."
            value={form.license}
            onChangeText={(v) => update("license", v)}
            icon="shield-checkmark-outline"
          />
          <InputField
            label="Departments"
            placeholder="e.g. Cardiology, ENT, General"
            value={form.departments}
            onChangeText={(v) => update("departments", v)}
            icon="grid-outline"
          />
          <InputField
            label="Number of Doctors"
            value={form.doctors}
            onChangeText={(v) => update("doctors", v)}
            keyboardType="number-pad"
            icon="people-outline"
          />
        </MotiView>

        {/* Security / Password */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 550 }}
        >
          <Text style={styles.section}>Security</Text>
          <InputField
            label="Password"
            value={form.password}
            onChangeText={(v) => update("password", v)}
            secureTextEntry
            icon="lock-closed-outline"
            placeholder="Min. 6 characters"
          />
          <InputField
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(v) => update("confirmPassword", v)}
            secureTextEntry
            icon="lock-closed-outline"
            placeholder="Re-enter password"
          />

          {form.password.length > 0 &&
            form.confirmPassword.length > 0 &&
            form.password !== form.confirmPassword && (
              <View style={styles.hintRow}>
                <Ionicons name="alert-circle-outline" size={14} color="#EF4444" />
                <Text style={styles.hintText}>Passwords do not match</Text>
              </View>
            )}

          {form.password.length > 0 && form.password.length < 6 && (
            <View style={styles.hintRow}>
              <Ionicons name="alert-circle-outline" size={14} color="#F59E0B" />
              <Text style={[styles.hintText, { color: "#F59E0B" }]}>
                Password must be at least 6 characters
              </Text>
            </View>
          )}
        </MotiView>

        {/* Verification Documents */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 600 }}
        >
          <Text style={styles.section}>Verification Documents</Text>

          <TouchableOpacity
            activeOpacity={0.86}
            style={[styles.uploadBox, documents.length === 0 && styles.uploadBoxRequired]}
            onPress={pickDocument}
          >
            <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
            <Text style={styles.uploadTitle}>Upload Certificate</Text>
            <Text style={styles.uploadSub}>PDF or high-res images · Required</Text>
          </TouchableOpacity>

          {documents.map((doc, index) => (
            <MotiView
              key={`${doc.name}-${index}`}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.docRow}
            >
              <Ionicons name="document-attach" size={22} color={COLORS.staff} />
              <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
              <TouchableOpacity onPress={() => removeDocument(index)}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
              </TouchableOpacity>
            </MotiView>
          ))}

          {!isFormValid && (
            <View style={styles.completionHint}>
              <Ionicons name="information-circle-outline" size={15} color={COLORS.muted} />
              <Text style={styles.completionHintText}>
                Fill in all fields, upload a hospital photo & at least one document
              </Text>
            </View>
          )}

          {loading ? (
            <ActivityIndicator
              color={COLORS.staff}
              size="large"
              style={{ marginTop: 24, marginBottom: 50 }}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={isFormValid ? 0.85 : 1}
              onPress={isFormValid ? submit : undefined}
              style={{ marginTop: 24, marginBottom: 50 }}
            >
              <GradientButton
                title="Submit for Verification"
                colors={isFormValid ? [COLORS.staff, "#14B8A6"] : ["#CBD5E1", "#94A3B8"]}
                onPress={isFormValid ? submit : undefined}
                disabled={!isFormValid}
                style={{ opacity: isFormValid ? 1 : 0.6 }}
              />
            </TouchableOpacity>
          )}
        </MotiView>
      </ScrollView>

      {/* ── SUCCESS MODAL ── */}
      <Modal
        visible={successPopup}
        transparent
        animationType="fade"
        onRequestClose={closeSuccessPopup}
      >
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.8, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.successCard}
          >
            <View style={styles.successIconWrap}>
              <Ionicons name="checkmark-circle" size={58} color="#fff" />
            </View>

            <Text style={styles.successTitle}>Registration Submitted!</Text>
            <Text style={styles.successMessage}>
              Your hospital registration has been submitted successfully and is now under admin
              verification. Please save your Hospital ID — you will need it to login.
            </Text>

            <View style={styles.idCard}>
              <Text style={styles.idLabel}>YOUR HOSPITAL ID</Text>
              <Text style={styles.idValue}>{assignedHospitalId}</Text>
              <TouchableOpacity style={styles.copyBtn} onPress={copyHospitalId} activeOpacity={0.8}>
                <Ionicons
                  name={copied ? "checkmark-circle" : "copy-outline"}
                  size={16}
                  color={copied ? "#22C55E" : COLORS.staff}
                />
                <Text style={[styles.copyText, copied && { color: "#22C55E" }]}>
                  {copied ? "Copied!" : "Copy ID"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.statusBadge}>
              <Ionicons name="time-outline" size={17} color={COLORS.staff} />
              <Text style={styles.statusText}>Pending Admin Verification</Text>
            </View>

            <Text style={styles.loginHint}>
              Once approved, login using your Hospital ID, email, and password.
            </Text>

            <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
              <Text style={styles.successButtonText}>Got it!</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 34 },

  // ── Image picker ────────────────────────────────────────────────────────────
  imagePreviewCard: {
    height: 190,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backgroundColor: "#fff",
  },
  imagePreview: { width: "100%", height: "100%" },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  camCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  imageChangeText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  photoIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.staff + "15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  section: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  row: { flexDirection: "row", alignItems: "center" },

  uploadBox: {
    height: 140,
    backgroundColor: "#F0FDFA",
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.staff + "50",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadBoxRequired: {
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
  },
  uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 6 },
  uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },

  docRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },

  hintRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: -6,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  hintText: { fontSize: 12, color: "#EF4444", fontWeight: "600" },
  completionHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  completionHintText: { fontSize: 12, color: COLORS.muted, fontWeight: "500" },

  // ── Modal ────────────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  successCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: COLORS.card || "#fff",
    borderRadius: 30,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  successIconWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  successTitle: { fontSize: 22, fontWeight: "900", color: COLORS.text, textAlign: "center" },
  successMessage: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.muted,
    textAlign: "center",
    fontWeight: "500",
  },
  idCard: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#F0FDFA",
    borderRadius: 18,
    padding: 18,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.staff + "50",
  },
  idLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.muted,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  idValue: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.staff,
    letterSpacing: 3,
    marginTop: 6,
    marginBottom: 12,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.staff + "40",
  },
  copyText: { color: COLORS.staff, fontSize: 13, fontWeight: "800" },
  statusBadge: {
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#F59E0B40",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  statusText: { color: "#F59E0B", fontSize: 13, fontWeight: "900" },
  loginHint: {
    marginTop: 14,
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 18,
  },
  successButton: {
    marginTop: 20,
    width: "100%",
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
  },
  successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});