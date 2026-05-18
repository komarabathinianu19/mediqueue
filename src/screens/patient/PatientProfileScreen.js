




















// // src/screens/patient/PatientProfileScreen.js
// // Shows real logged-in patient data fetched from backend

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { fetchMyProfile, updateMyProfile } from "../../services/apiService";

// export default function PatientProfileScreen({ navigation }) {
//   const [editMode, setEditMode]   = useState(false);
//   const [loading, setLoading]     = useState(true);
//   const [saving, setSaving]       = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [profile, setProfile] = useState({
//     fullName:         "",
//     phone:            "",
//     email:            "",
//     age:              "",
//     gender:           "",
//     bloodGroup:       "",
//     city:             "",
//     allergies:        "",
//     medicalNotes:     "",
//     emergencyContact: "",
//     photo:            null,
//   });

//   const loadProfile = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       const data = await fetchMyProfile();
//       setProfile({
//         fullName:         data.fullName        || "",
//         phone:            data.phone           || "",
//         email:            data.email           || "",
//         age:              data.age             ? String(data.age) : "",
//         gender:           data.gender          || "",
//         bloodGroup:       data.bloodGroup      || "",
//         city:             data.city            || "",
//         allergies:        data.allergies       || "",
//         medicalNotes:     data.medicalNotes    || "",
//         emergencyContact: data.emergencyContact || "",
//         photo:            data.photo           || null,
//       });
//     } catch (err) {
//       console.log("ProfileScreen error:", err.message);
//       Alert.alert("Error", "Could not load your profile. Please try again.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     loadProfile(true);
//   };

//   const updateField = (key, value) =>
//     setProfile((prev) => ({ ...prev, [key]: value }));

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });
//     if (!result.canceled) updateField("photo", result.assets[0].uri);
//   };

//   const saveProfile = async () => {
//     if (!profile.fullName.trim()) {
//       Alert.alert("Error", "Full name is required.");
//       return;
//     }
//     setSaving(true);
//     try {
//       await updateMyProfile({
//         fullName:         profile.fullName,
//         age:              profile.age ? parseInt(profile.age) : null,
//         gender:           profile.gender,
//         bloodGroup:       profile.bloodGroup,
//         city:             profile.city,
//         allergies:        profile.allergies,
//         medicalNotes:     profile.medicalNotes,
//         emergencyContact: profile.emergencyContact,
//       });
//       setEditMode(false);
//       Alert.alert("Success", "Profile updated successfully!");
//     } catch (err) {
//       Alert.alert("Error", err.message || "Update failed.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const logout = async () => {
//     await AsyncStorage.clear();
//     navigation.dispatch(
//       CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
//       }
//     >
//       {/* ── AVATAR ── */}
//       <View style={styles.avatarSection}>
//         <TouchableOpacity
//           onPress={editMode ? pickImage : null}
//           activeOpacity={editMode ? 0.8 : 1}
//         >
//           {profile.photo ? (
//             <Image source={{ uri: profile.photo }} style={styles.avatar} />
//           ) : (
//             <View style={styles.avatarPlaceholder}>
//               <Ionicons name="person" size={48} color={COLORS.primary} />
//             </View>
//           )}
//           {editMode && (
//             <View style={styles.cameraOverlay}>
//               <Ionicons name="camera" size={18} color="#fff" />
//             </View>
//           )}
//         </TouchableOpacity>

//         <Text style={styles.name}>{profile.fullName || "Patient"}</Text>
//         <Text style={styles.subName}>{profile.phone || profile.email || ""}</Text>
//       </View>

//       {/* ── EDIT TOGGLE ── */}
//       <View style={styles.editRow}>
//         {!editMode ? (
//           <TouchableOpacity
//             style={styles.editBtn}
//             onPress={() => setEditMode(true)}
//           >
//             <Ionicons name="pencil-outline" size={16} color={COLORS.primary} />
//             <Text style={styles.editBtnText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.editActionRow}>
//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => { setEditMode(false); loadProfile(); }}
//             >
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.saveBtn}
//               onPress={saveProfile}
//               disabled={saving}
//             >
//               {saving ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.saveBtnText}>Save</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* ── PERSONAL INFO ── */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Personal Information</Text>

//         <ProfileField
//           label="Full Name"
//           icon="person-outline"
//           value={profile.fullName}
//           edit={editMode}
//           onChangeText={(v) => updateField("fullName", v)}
//         />
//         <ProfileField
//           label="Phone"
//           icon="call-outline"
//           value={profile.phone}
//           edit={false}  // phone is login credential — not editable
//         />
//         <ProfileField
//           label="Email"
//           icon="mail-outline"
//           value={profile.email}
//           edit={false}
//         />
//         <ProfileField
//           label="Age"
//           icon="calendar-outline"
//           value={profile.age}
//           edit={editMode}
//           onChangeText={(v) => updateField("age", v)}
//           keyboardType="number-pad"
//         />
//         <ProfileField
//           label="Gender"
//           icon="male-female-outline"
//           value={profile.gender}
//           edit={editMode}
//           onChangeText={(v) => updateField("gender", v)}
//           placeholder="Male / Female / Other"
//         />
//         <ProfileField
//           label="Blood Group"
//           icon="water-outline"
//           value={profile.bloodGroup}
//           edit={editMode}
//           onChangeText={(v) => updateField("bloodGroup", v)}
//           placeholder="e.g. O+"
//         />
//         <ProfileField
//           label="City"
//           icon="location-outline"
//           value={profile.city}
//           edit={editMode}
//           onChangeText={(v) => updateField("city", v)}
//         />
//       </View>

//       {/* ── MEDICAL INFO ── */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Medical Information</Text>

//         <ProfileField
//           label="Allergies"
//           icon="warning-outline"
//           value={profile.allergies}
//           edit={editMode}
//           onChangeText={(v) => updateField("allergies", v)}
//           placeholder="e.g. Penicillin, Dust"
//           multiline
//         />
//         <ProfileField
//           label="Medical Notes"
//           icon="document-text-outline"
//           value={profile.medicalNotes}
//           edit={editMode}
//           onChangeText={(v) => updateField("medicalNotes", v)}
//           placeholder="Any existing conditions, medications…"
//           multiline
//         />
//         <ProfileField
//           label="Emergency Contact"
//           icon="call-outline"
//           value={profile.emergencyContact}
//           edit={editMode}
//           onChangeText={(v) => updateField("emergencyContact", v)}
//           keyboardType="phone-pad"
//         />
//       </View>

//       {/* ── LOGOUT ── */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>

//       <View style={{ height: 40 }} />
//     </ScrollView>
//   );
// }

// // ── ProfileField Component ─────────────────────────────────────────────────────
// function ProfileField({ label, icon, value, edit, onChangeText, placeholder, keyboardType, multiline }) {
//   return (
//     <View style={fieldStyles.row}>
//       <View style={fieldStyles.iconWrap}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={fieldStyles.label}>{label}</Text>
//         {edit ? (
//           <TextInput
//             style={[fieldStyles.input, multiline && { height: 60 }]}
//             value={value}
//             onChangeText={onChangeText}
//             placeholder={placeholder || label}
//             placeholderTextColor={COLORS.muted}
//             keyboardType={keyboardType || "default"}
//             multiline={multiline}
//           />
//         ) : (
//           <Text style={fieldStyles.value}>{value || "—"}</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// // ── Styles ──────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
//   avatarSection: { alignItems: "center", paddingTop: 60, paddingBottom: 20 },
//   avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.primary },
//   avatarPlaceholder: {
//     width: 100, height: 100, borderRadius: 50,
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 2, borderColor: COLORS.primary,
//   },
//   cameraOverlay: {
//     position: "absolute", bottom: 0, right: 0,
//     width: 32, height: 32, borderRadius: 16,
//     backgroundColor: COLORS.primary,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 2, borderColor: "#fff",
//   },
//   name: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 12 },
//   subName: { color: COLORS.muted, marginTop: 4, fontSize: 14 },
//   editRow: { paddingHorizontal: 20, marginBottom: 8 },
//   editBtn: {
//     flexDirection: "row", alignItems: "center", gap: 6,
//     alignSelf: "flex-end",
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     paddingHorizontal: 16, paddingVertical: 8,
//     borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary,
//   },
//   editBtnText: { color: COLORS.primary, fontWeight: "800", fontSize: 14 },
//   editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
//   cancelBtn: {
//     paddingHorizontal: 20, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.background,
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
//   saveBtn: {
//     paddingHorizontal: 24, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.primary,
//     minWidth: 80, alignItems: "center",
//   },
//   saveBtnText: { color: "#fff", fontWeight: "900" },
//   card: {
//     marginHorizontal: 18, marginBottom: 16,
//     backgroundColor: COLORS.card,
//     borderRadius: 24, padding: 18,
//     borderWidth: 1, borderColor: COLORS.border,
//     elevation: 2,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14 },
//   logoutBtn: {
//     marginHorizontal: 18, marginBottom: 12, height: 52,
//     borderRadius: 18, backgroundColor: "#FEF2F2",
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     borderWidth: 1, borderColor: "#FECACA",
//   },
//   logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },
// });

// const fieldStyles = StyleSheet.create({
//   row: {
//     flexDirection: "row", alignItems: "flex-start", gap: 12,
//     paddingVertical: 10,
//     borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   iconWrap: { marginTop: 2, width: 24, alignItems: "center" },
//   label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
//   value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
//   input: {
//     fontSize: 15, fontWeight: "700", color: COLORS.text,
//     borderBottomWidth: 1, borderBottomColor: COLORS.primary,
//     paddingVertical: 2,
//   },
// });  

























// // src/screens/patient/PatientProfileScreen.js
// // Shows real logged-in patient data fetched from backend
// // ── Reports button added → navigates to PatientReports ──

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { fetchMyProfile, updateMyProfile } from "../../services/apiService";

// export default function PatientProfileScreen({ navigation }) {
//   const [editMode, setEditMode]     = useState(false);
//   const [loading, setLoading]       = useState(true);
//   const [saving, setSaving]         = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [profile, setProfile] = useState({
//     fullName:         "",
//     phone:            "",
//     email:            "",
//     age:              "",
//     gender:           "",
//     bloodGroup:       "",
//     city:             "",
//     allergies:        "",
//     medicalNotes:     "",
//     emergencyContact: "",
//     photo:            null,
//   });

//   // ── Load profile from backend ───────────────────────────────────────────────
//   const loadProfile = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       const data = await fetchMyProfile();
//       setProfile({
//         fullName:         data.fullName         || "",
//         phone:            data.phone            || "",
//         email:            data.email            || "",
//         age:              data.age              ? String(data.age) : "",
//         gender:           data.gender           || "",
//         bloodGroup:       data.bloodGroup       || "",
//         city:             data.city             || "",
//         allergies:        data.allergies        || "",
//         medicalNotes:     data.medicalNotes     || "",
//         emergencyContact: data.emergencyContact || "",
//         photo:            data.photo            || null,
//       });
//     } catch (err) {
//       console.log("ProfileScreen error:", err.message);
//       Alert.alert("Error", "Could not load your profile. Please try again.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => { loadProfile(); }, []);

//   const onRefresh = () => { setRefreshing(true); loadProfile(true); };

//   const updateField = (key, value) =>
//     setProfile((prev) => ({ ...prev, [key]: value }));

//   // ── Pick photo ──────────────────────────────────────────────────────────────
//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });
//     if (!result.canceled) updateField("photo", result.assets[0].uri);
//   };

//   // ── Save profile ────────────────────────────────────────────────────────────
//   const saveProfile = async () => {
//     if (!profile.fullName.trim()) {
//       Alert.alert("Error", "Full name is required.");
//       return;
//     }
//     setSaving(true);
//     try {
//       await updateMyProfile({
//         fullName:         profile.fullName,
//         age:              profile.age ? parseInt(profile.age) : null,
//         gender:           profile.gender,
//         bloodGroup:       profile.bloodGroup,
//         city:             profile.city,
//         allergies:        profile.allergies,
//         medicalNotes:     profile.medicalNotes,
//         emergencyContact: profile.emergencyContact,
//       });
//       setEditMode(false);
//       Alert.alert("Success", "Profile updated successfully!");
//     } catch (err) {
//       Alert.alert("Error", err.message || "Update failed.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Logout ──────────────────────────────────────────────────────────────────
//   const logout = async () => {
//     await AsyncStorage.clear();
//     navigation.dispatch(
//       CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
//     );
//   };

//   // ── Loading state ───────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 40 }}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={[COLORS.primary]}
//         />
//       }
//     >
//       {/* ── AVATAR SECTION ── */}
//       <View style={styles.avatarSection}>
//         <TouchableOpacity
//           onPress={editMode ? pickImage : null}
//           activeOpacity={editMode ? 0.8 : 1}
//         >
//           {profile.photo ? (
//             <Image source={{ uri: profile.photo }} style={styles.avatar} />
//           ) : (
//             <View style={styles.avatarPlaceholder}>
//               <Ionicons name="person" size={48} color={COLORS.primary} />
//             </View>
//           )}
//           {editMode && (
//             <View style={styles.cameraOverlay}>
//               <Ionicons name="camera" size={18} color="#fff" />
//             </View>
//           )}
//         </TouchableOpacity>

//         <Text style={styles.name}>{profile.fullName || "Patient"}</Text>
//         <Text style={styles.subName}>{profile.phone || profile.email || ""}</Text>
//       </View>

//       {/* ── EDIT TOGGLE ── */}
//       <View style={styles.editRow}>
//         {!editMode ? (
//           <TouchableOpacity
//             style={styles.editBtn}
//             onPress={() => setEditMode(true)}
//           >
//             <Ionicons name="pencil-outline" size={16} color={COLORS.primary} />
//             <Text style={styles.editBtnText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.editActionRow}>
//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => { setEditMode(false); loadProfile(); }}
//             >
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.saveBtn}
//               onPress={saveProfile}
//               disabled={saving}
//             >
//               {saving ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.saveBtnText}>Save</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* ── MY REPORTS BUTTON ── */}
//       <TouchableOpacity
//         activeOpacity={0.86}
//         style={styles.reportsCard}
//         onPress={() => navigation.navigate("PatientReports")}
//       >
//         <View style={styles.reportsIconBox}>
//           <Ionicons name="folder-open-outline" size={26} color="#fff" />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.reportsTitle}>My Medical Reports</Text>
//           <Text style={styles.reportsSub}>
//             View, add and manage your lab reports, scans & prescriptions
//           </Text>
//         </View>

//         <View style={styles.reportsChevron}>
//           <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
//         </View>
//       </TouchableOpacity>

//       {/* ── PERSONAL INFO ── */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Personal Information</Text>

//         <ProfileField
//           label="Full Name"
//           icon="person-outline"
//           value={profile.fullName}
//           edit={editMode}
//           onChangeText={(v) => updateField("fullName", v)}
//         />
//         <ProfileField
//           label="Phone"
//           icon="call-outline"
//           value={profile.phone}
//           edit={false}
//         />
//         <ProfileField
//           label="Email"
//           icon="mail-outline"
//           value={profile.email}
//           edit={false}
//         />
//         <ProfileField
//           label="Age"
//           icon="calendar-outline"
//           value={profile.age}
//           edit={editMode}
//           onChangeText={(v) => updateField("age", v)}
//           keyboardType="number-pad"
//         />
//         <ProfileField
//           label="Gender"
//           icon="male-female-outline"
//           value={profile.gender}
//           edit={editMode}
//           onChangeText={(v) => updateField("gender", v)}
//           placeholder="Male / Female / Other"
//         />
//         <ProfileField
//           label="Blood Group"
//           icon="water-outline"
//           value={profile.bloodGroup}
//           edit={editMode}
//           onChangeText={(v) => updateField("bloodGroup", v)}
//           placeholder="e.g. O+"
//         />
//         <ProfileField
//           label="City"
//           icon="location-outline"
//           value={profile.city}
//           edit={editMode}
//           onChangeText={(v) => updateField("city", v)}
//         />
//       </View>

//       {/* ── MEDICAL INFO ── */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Medical Information</Text>

//         <ProfileField
//           label="Allergies"
//           icon="warning-outline"
//           value={profile.allergies}
//           edit={editMode}
//           onChangeText={(v) => updateField("allergies", v)}
//           placeholder="e.g. Penicillin, Dust"
//           multiline
//         />
//         <ProfileField
//           label="Medical Notes"
//           icon="document-text-outline"
//           value={profile.medicalNotes}
//           edit={editMode}
//           onChangeText={(v) => updateField("medicalNotes", v)}
//           placeholder="Any existing conditions, medications…"
//           multiline
//         />
//         <ProfileField
//           label="Emergency Contact"
//           icon="call-outline"
//           value={profile.emergencyContact}
//           edit={editMode}
//           onChangeText={(v) => updateField("emergencyContact", v)}
//           keyboardType="phone-pad"
//         />
//       </View>

//       {/* ── LOGOUT ── */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ── ProfileField Component ─────────────────────────────────────────────────────
// function ProfileField({
//   label, icon, value, edit, onChangeText,
//   placeholder, keyboardType, multiline,
// }) {
//   return (
//     <View style={fieldStyles.row}>
//       <View style={fieldStyles.iconWrap}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={fieldStyles.label}>{label}</Text>
//         {edit ? (
//           <TextInput
//             style={[fieldStyles.input, multiline && { height: 60 }]}
//             value={value}
//             onChangeText={onChangeText}
//             placeholder={placeholder || label}
//             placeholderTextColor={COLORS.muted}
//             keyboardType={keyboardType || "default"}
//             multiline={multiline}
//           />
//         ) : (
//           <Text style={fieldStyles.value}>{value || "—"}</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },

//   center: {
//     flex: 1, justifyContent: "center", alignItems: "center",
//     backgroundColor: COLORS.background,
//   },

//   // Avatar
//   avatarSection: {
//     alignItems: "center",
//     paddingTop: 60,
//     paddingBottom: 20,
//   },
//   avatar: {
//     width: 100, height: 100, borderRadius: 50,
//     borderWidth: 3, borderColor: COLORS.primary,
//   },
//   avatarPlaceholder: {
//     width: 100, height: 100, borderRadius: 50,
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 2, borderColor: COLORS.primary,
//   },
//   cameraOverlay: {
//     position: "absolute", bottom: 0, right: 0,
//     width: 32, height: 32, borderRadius: 16,
//     backgroundColor: COLORS.primary,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 2, borderColor: "#fff",
//   },
//   name: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 12 },
//   subName: { color: COLORS.muted, marginTop: 4, fontSize: 14 },

//   // Edit row
//   editRow: { paddingHorizontal: 20, marginBottom: 8 },
//   editBtn: {
//     flexDirection: "row", alignItems: "center", gap: 6,
//     alignSelf: "flex-end",
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     paddingHorizontal: 16, paddingVertical: 8,
//     borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary,
//   },
//   editBtnText: { color: COLORS.primary, fontWeight: "800", fontSize: 14 },
//   editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
//   cancelBtn: {
//     paddingHorizontal: 20, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.background,
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
//   saveBtn: {
//     paddingHorizontal: 24, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.primary,
//     minWidth: 80, alignItems: "center",
//   },
//   saveBtnText: { color: "#fff", fontWeight: "900" },

//   // ── Reports Card ──────────────────────────────────────────────────────────
//   reportsCard: {
//     marginHorizontal: 18,
//     marginBottom: 16,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     borderWidth: 1.5,
//     borderColor: COLORS.primary,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     elevation: 3,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.12,
//     shadowRadius: 12,
//   },
//   reportsIconBox: {
//     width: 54,
//     height: 54,
//     borderRadius: 18,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   reportsTitle: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   reportsSub: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 4,
//     lineHeight: 17,
//   },
//   reportsChevron: {
//     width: 32,
//     height: 32,
//     borderRadius: 12,
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   // Cards
//   card: {
//     marginHorizontal: 18, marginBottom: 16,
//     backgroundColor: COLORS.card,
//     borderRadius: 24, padding: 18,
//     borderWidth: 1, borderColor: COLORS.border,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14,
//   },

//   // Logout
//   logoutBtn: {
//     marginHorizontal: 18,
//     marginBottom: 12,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     borderWidth: 1, borderColor: "#FECACA",
//   },
//   logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },
// });

// const fieldStyles = StyleSheet.create({
//   row: {
//     flexDirection: "row", alignItems: "flex-start", gap: 12,
//     paddingVertical: 10,
//     borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   iconWrap: { marginTop: 2, width: 24, alignItems: "center" },
//   label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
//   value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
//   input: {
//     fontSize: 15, fontWeight: "700", color: COLORS.text,
//     borderBottomWidth: 1, borderBottomColor: COLORS.primary,
//     paddingVertical: 2,
//   },
// });  








































// // src/screens/patient/PatientProfileScreen.js
// // Shows real logged-in patient data fetched from backend
// // ── Reports button added → navigates to PatientReports ──

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useQueue } from "../../context/QueueContext";
// import { fetchMyProfile, updateMyProfile } from "../../services/apiService";

// export default function PatientProfileScreen({ navigation }) {
//   const [editMode, setEditMode]     = useState(false);
//   const [loading, setLoading]       = useState(true);
//   const [saving, setSaving]         = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const [profile, setProfile] = useState({
//     fullName:         "",
//     phone:            "",
//     email:            "",
//     age:              "",
//     gender:           "",
//     bloodGroup:       "",
//     city:             "",
//     allergies:        "",
//     medicalNotes:     "",
//     emergencyContact: "",
//     photo:            null,
//   });

//   // ── Load profile from backend ───────────────────────────────────────────────
//   const loadProfile = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       const data = await fetchMyProfile();
//       setProfile({
//         fullName:         data.fullName         || "",
//         phone:            data.phone            || "",
//         email:            data.email            || "",
//         age:              data.age              ? String(data.age) : "",
//         gender:           data.gender           || "",
//         bloodGroup:       data.bloodGroup       || "",
//         city:             data.city             || "",
//         allergies:        data.allergies        || "",
//         medicalNotes:     data.medicalNotes     || "",
//         emergencyContact: data.emergencyContact || "",
//         photo:            data.photo            || null,
//       });
//     } catch (err) {
//       console.log("ProfileScreen error:", err.message);
//       Alert.alert("Error", "Could not load your profile. Please try again.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => { loadProfile(); }, []);

//   const onRefresh = () => { setRefreshing(true); loadProfile(true); };

//   const updateField = (key, value) =>
//     setProfile((prev) => ({ ...prev, [key]: value }));

//   // ── Pick photo ──────────────────────────────────────────────────────────────
//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [1, 1],
//     });
//     if (!result.canceled) updateField("photo", result.assets[0].uri);
//   };

//   // ── Save profile ────────────────────────────────────────────────────────────
//   const saveProfile = async () => {
//     if (!profile.fullName.trim()) {
//       Alert.alert("Error", "Full name is required.");
//       return;
//     }
//     setSaving(true);
//     try {
//       await updateMyProfile({
//         fullName:         profile.fullName,
//         age:              profile.age ? parseInt(profile.age) : null,
//         gender:           profile.gender,
//         bloodGroup:       profile.bloodGroup,
//         city:             profile.city,
//         allergies:        profile.allergies,
//         medicalNotes:     profile.medicalNotes,
//         emergencyContact: profile.emergencyContact,
//       });
//       setEditMode(false);
//       Alert.alert("Success", "Profile updated successfully!");
//     } catch (err) {
//       Alert.alert("Error", err.message || "Update failed.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Logout ──────────────────────────────────────────────────────────────────
//   const logout = async () => {
//     clearActiveToken();
//     await AsyncStorage.clear();
//     navigation.dispatch(
//       CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
//     );
//   };

//   // ── Loading state ───────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       contentContainerStyle={{ paddingBottom: 40 }}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={[COLORS.primary]}
//         />
//       }
//     >
//       {/* ── AVATAR SECTION ── */}
//       <View style={styles.avatarSection}>
//         <TouchableOpacity
//           onPress={editMode ? pickImage : null}
//           activeOpacity={editMode ? 0.8 : 1}
//         >
//           {profile.photo ? (
//             <Image source={{ uri: profile.photo }} style={styles.avatar} />
//           ) : (
//             <View style={styles.avatarPlaceholder}>
//               <Ionicons name="person" size={48} color={COLORS.primary} />
//             </View>
//           )}
//           {editMode && (
//             <View style={styles.cameraOverlay}>
//               <Ionicons name="camera" size={18} color="#fff" />
//             </View>
//           )}
//         </TouchableOpacity>

//         <Text style={styles.name}>{profile.fullName || "Patient"}</Text>
//         <Text style={styles.subName}>{profile.phone || profile.email || ""}</Text>
//       </View>

//       {/* ── EDIT TOGGLE ── */}
//       <View style={styles.editRow}>
//         {!editMode ? (
//           <TouchableOpacity
//             style={styles.editBtn}
//             onPress={() => setEditMode(true)}
//           >
//             <Ionicons name="pencil-outline" size={16} color={COLORS.primary} />
//             <Text style={styles.editBtnText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.editActionRow}>
//             <TouchableOpacity
//               style={styles.cancelBtn}
//               onPress={() => { setEditMode(false); loadProfile(); }}
//             >
//               <Text style={styles.cancelBtnText}>Cancel</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.saveBtn}
//               onPress={saveProfile}
//               disabled={saving}
//             >
//               {saving ? (
//                 <ActivityIndicator size="small" color="#fff" />
//               ) : (
//                 <Text style={styles.saveBtnText}>Save</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* ── MY REPORTS BUTTON ── */}
//       <TouchableOpacity
//         activeOpacity={0.86}
//         style={styles.reportsCard}
//         onPress={() => navigation.navigate("PatientReports")}
//       >
//         <View style={styles.reportsIconBox}>
//           <Ionicons name="folder-open-outline" size={26} color="#fff" />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.reportsTitle}>My Medical Reports</Text>
//           <Text style={styles.reportsSub}>
//             View, add and manage your lab reports, scans & prescriptions
//           </Text>
//         </View>

//         <View style={styles.reportsChevron}>
//           <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
//         </View>
//       </TouchableOpacity>

//       {/* ── PERSONAL INFO ── */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Personal Information</Text>

//         <ProfileField
//           label="Full Name"
//           icon="person-outline"
//           value={profile.fullName}
//           edit={editMode}
//           onChangeText={(v) => updateField("fullName", v)}
//         />
//         <ProfileField
//           label="Phone"
//           icon="call-outline"
//           value={profile.phone}
//           edit={false}
//         />
//         <ProfileField
//           label="Email"
//           icon="mail-outline"
//           value={profile.email}
//           edit={false}
//         />
//         <ProfileField
//           label="Age"
//           icon="calendar-outline"
//           value={profile.age}
//           edit={editMode}
//           onChangeText={(v) => updateField("age", v)}
//           keyboardType="number-pad"
//         />
//         <ProfileField
//           label="Gender"
//           icon="male-female-outline"
//           value={profile.gender}
//           edit={editMode}
//           onChangeText={(v) => updateField("gender", v)}
//           placeholder="Male / Female / Other"
//         />
//         <ProfileField
//           label="Blood Group"
//           icon="water-outline"
//           value={profile.bloodGroup}
//           edit={editMode}
//           onChangeText={(v) => updateField("bloodGroup", v)}
//           placeholder="e.g. O+"
//         />
//         <ProfileField
//           label="City"
//           icon="location-outline"
//           value={profile.city}
//           edit={editMode}
//           onChangeText={(v) => updateField("city", v)}
//         />
//       </View>

//       {/* ── MEDICAL INFO ── */}
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Medical Information</Text>

//         <ProfileField
//           label="Allergies"
//           icon="warning-outline"
//           value={profile.allergies}
//           edit={editMode}
//           onChangeText={(v) => updateField("allergies", v)}
//           placeholder="e.g. Penicillin, Dust"
//           multiline
//         />
//         <ProfileField
//           label="Medical Notes"
//           icon="document-text-outline"
//           value={profile.medicalNotes}
//           edit={editMode}
//           onChangeText={(v) => updateField("medicalNotes", v)}
//           placeholder="Any existing conditions, medications…"
//           multiline
//         />
//         <ProfileField
//           label="Emergency Contact"
//           icon="call-outline"
//           value={profile.emergencyContact}
//           edit={editMode}
//           onChangeText={(v) => updateField("emergencyContact", v)}
//           keyboardType="phone-pad"
//         />
//       </View>

//       {/* ── LOGOUT ── */}
//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ── ProfileField Component ─────────────────────────────────────────────────────
// function ProfileField({
//   label, icon, value, edit, onChangeText,
//   placeholder, keyboardType, multiline,
// }) {
//   return (
//     <View style={fieldStyles.row}>
//       <View style={fieldStyles.iconWrap}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={fieldStyles.label}>{label}</Text>
//         {edit ? (
//           <TextInput
//             style={[fieldStyles.input, multiline && { height: 60 }]}
//             value={value}
//             onChangeText={onChangeText}
//             placeholder={placeholder || label}
//             placeholderTextColor={COLORS.muted}
//             keyboardType={keyboardType || "default"}
//             multiline={multiline}
//           />
//         ) : (
//           <Text style={fieldStyles.value}>{value || "—"}</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },

//   center: {
//     flex: 1, justifyContent: "center", alignItems: "center",
//     backgroundColor: COLORS.background,
//   },

//   // Avatar
//   avatarSection: {
//     alignItems: "center",
//     paddingTop: 60,
//     paddingBottom: 20,
//   },
//   avatar: {
//     width: 100, height: 100, borderRadius: 50,
//     borderWidth: 3, borderColor: COLORS.primary,
//   },
//   avatarPlaceholder: {
//     width: 100, height: 100, borderRadius: 50,
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 2, borderColor: COLORS.primary,
//   },
//   cameraOverlay: {
//     position: "absolute", bottom: 0, right: 0,
//     width: 32, height: 32, borderRadius: 16,
//     backgroundColor: COLORS.primary,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 2, borderColor: "#fff",
//   },
//   name: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 12 },
//   subName: { color: COLORS.muted, marginTop: 4, fontSize: 14 },

//   // Edit row
//   editRow: { paddingHorizontal: 20, marginBottom: 8 },
//   editBtn: {
//     flexDirection: "row", alignItems: "center", gap: 6,
//     alignSelf: "flex-end",
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     paddingHorizontal: 16, paddingVertical: 8,
//     borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary,
//   },
//   editBtnText: { color: COLORS.primary, fontWeight: "800", fontSize: 14 },
//   editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
//   cancelBtn: {
//     paddingHorizontal: 20, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.background,
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
//   saveBtn: {
//     paddingHorizontal: 24, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.primary,
//     minWidth: 80, alignItems: "center",
//   },
//   saveBtnText: { color: "#fff", fontWeight: "900" },

//   // ── Reports Card ──────────────────────────────────────────────────────────
//   reportsCard: {
//     marginHorizontal: 18,
//     marginBottom: 16,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     borderWidth: 1.5,
//     borderColor: COLORS.primary,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     elevation: 3,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.12,
//     shadowRadius: 12,
//   },
//   reportsIconBox: {
//     width: 54,
//     height: 54,
//     borderRadius: 18,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   reportsTitle: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   reportsSub: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 4,
//     lineHeight: 17,
//   },
//   reportsChevron: {
//     width: 32,
//     height: 32,
//     borderRadius: 12,
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   // Cards
//   card: {
//     marginHorizontal: 18, marginBottom: 16,
//     backgroundColor: COLORS.card,
//     borderRadius: 24, padding: 18,
//     borderWidth: 1, borderColor: COLORS.border,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14,
//   },

//   // Logout
//   logoutBtn: {
//     marginHorizontal: 18,
//     marginBottom: 12,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     borderWidth: 1, borderColor: "#FECACA",
//   },
//   logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },
// });

// const fieldStyles = StyleSheet.create({
//   row: {
//     flexDirection: "row", alignItems: "flex-start", gap: 12,
//     paddingVertical: 10,
//     borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   iconWrap: { marginTop: 2, width: 24, alignItems: "center" },
//   label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
//   value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
//   input: {
//     fontSize: 15, fontWeight: "700", color: COLORS.text,
//     borderBottomWidth: 1, borderBottomColor: COLORS.primary,
//     paddingVertical: 2,
//   },
// });  





































// src/screens/patient/PatientProfileScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueue } from "../../context/QueueContext";
import { fetchMyProfile, updateMyProfile } from "../../services/apiService";

export default function PatientProfileScreen({ navigation }) {
  const { clearActiveToken } = useQueue();   // ← properly destructured here

  const [editMode, setEditMode]     = useState(false);
  const [loading, setLoading]       = useState(true);
  const [saving, setSaving]         = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [profile, setProfile] = useState({
    fullName:         "",
    phone:            "",
    email:            "",
    age:              "",
    gender:           "",
    bloodGroup:       "",
    city:             "",
    allergies:        "",
    medicalNotes:     "",
    emergencyContact: "",
    photo:            null,
  });

  // ── Load profile from backend ───────────────────────────────────────────────
  const loadProfile = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const data = await fetchMyProfile();
      setProfile({
        fullName:         data.fullName         || "",
        phone:            data.phone            || "",
        email:            data.email            || "",
        age:              data.age              ? String(data.age) : "",
        gender:           data.gender           || "",
        bloodGroup:       data.bloodGroup       || "",
        city:             data.city             || "",
        allergies:        data.allergies        || "",
        medicalNotes:     data.medicalNotes     || "",
        emergencyContact: data.emergencyContact || "",
        photo:            data.photo            || null,
      });
    } catch (err) {
      console.log("ProfileScreen error:", err.message);
      Alert.alert("Error", "Could not load your profile. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadProfile(); }, []);

  const onRefresh = () => { setRefreshing(true); loadProfile(true); };

  const updateField = (key, value) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  // ── Pick photo ──────────────────────────────────────────────────────────────
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) updateField("photo", result.assets[0].uri);
  };

  // ── Save profile ────────────────────────────────────────────────────────────
  const saveProfile = async () => {
    if (!profile.fullName.trim()) {
      Alert.alert("Error", "Full name is required.");
      return;
    }
    setSaving(true);
    try {
      await updateMyProfile({
        fullName:         profile.fullName,
        age:              profile.age ? parseInt(profile.age) : null,
        gender:           profile.gender,
        bloodGroup:       profile.bloodGroup,
        city:             profile.city,
        allergies:        profile.allergies,
        medicalNotes:     profile.medicalNotes,
        emergencyContact: profile.emergencyContact,
      });
      setEditMode(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err) {
      Alert.alert("Error", err.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = async () => {
    clearActiveToken();          // stop poll + wipe state
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
    );
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
        />
      }
    >
      {/* ── AVATAR SECTION ── */}
      <View style={styles.avatarSection}>
        <TouchableOpacity
          onPress={editMode ? pickImage : null}
          activeOpacity={editMode ? 0.8 : 1}
        >
          {profile.photo ? (
            <Image source={{ uri: profile.photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={48} color={COLORS.primary} />
            </View>
          )}
          {editMode && (
            <View style={styles.cameraOverlay}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.name}>{profile.fullName || "Patient"}</Text>
        <Text style={styles.subName}>{profile.phone || profile.email || ""}</Text>
      </View>

      {/* ── EDIT TOGGLE ── */}
      <View style={styles.editRow}>
        {!editMode ? (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditMode(true)}
          >
            <Ionicons name="pencil-outline" size={16} color={COLORS.primary} />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActionRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => { setEditMode(false); loadProfile(); }}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={saveProfile}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveBtnText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ── MY REPORTS BUTTON ── */}
      <TouchableOpacity
        activeOpacity={0.86}
        style={styles.reportsCard}
        onPress={() => navigation.navigate("PatientReports")}
      >
        <View style={styles.reportsIconBox}>
          <Ionicons name="folder-open-outline" size={26} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.reportsTitle}>My Medical Reports</Text>
          <Text style={styles.reportsSub}>
            View, add and manage your lab reports, scans & prescriptions
          </Text>
        </View>
        <View style={styles.reportsChevron}>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
        </View>
      </TouchableOpacity>

      {/* ── PERSONAL INFO ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <ProfileField label="Full Name" icon="person-outline" value={profile.fullName} edit={editMode} onChangeText={(v) => updateField("fullName", v)} />
        <ProfileField label="Phone" icon="call-outline" value={profile.phone} edit={false} />
        <ProfileField label="Email" icon="mail-outline" value={profile.email} edit={false} />
        <ProfileField label="Age" icon="calendar-outline" value={profile.age} edit={editMode} onChangeText={(v) => updateField("age", v)} keyboardType="number-pad" />
        <ProfileField label="Gender" icon="male-female-outline" value={profile.gender} edit={editMode} onChangeText={(v) => updateField("gender", v)} placeholder="Male / Female / Other" />
        <ProfileField label="Blood Group" icon="water-outline" value={profile.bloodGroup} edit={editMode} onChangeText={(v) => updateField("bloodGroup", v)} placeholder="e.g. O+" />
        <ProfileField label="City" icon="location-outline" value={profile.city} edit={editMode} onChangeText={(v) => updateField("city", v)} />
      </View>

      {/* ── MEDICAL INFO ── */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Medical Information</Text>
        <ProfileField label="Allergies" icon="warning-outline" value={profile.allergies} edit={editMode} onChangeText={(v) => updateField("allergies", v)} placeholder="e.g. Penicillin, Dust" multiline />
        <ProfileField label="Medical Notes" icon="document-text-outline" value={profile.medicalNotes} edit={editMode} onChangeText={(v) => updateField("medicalNotes", v)} placeholder="Any existing conditions, medications…" multiline />
        <ProfileField label="Emergency Contact" icon="call-outline" value={profile.emergencyContact} edit={editMode} onChangeText={(v) => updateField("emergencyContact", v)} keyboardType="phone-pad" />
      </View>

      {/* ── LOGOUT ── */}
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── ProfileField Component ─────────────────────────────────────────────────────
function ProfileField({ label, icon, value, edit, onChangeText, placeholder, keyboardType, multiline }) {
  return (
    <View style={fieldStyles.row}>
      <View style={fieldStyles.iconWrap}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={fieldStyles.label}>{label}</Text>
        {edit ? (
          <TextInput
            style={[fieldStyles.input, multiline && { height: 60 }]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || label}
            placeholderTextColor={COLORS.muted}
            keyboardType={keyboardType || "default"}
            multiline={multiline}
          />
        ) : (
          <Text style={fieldStyles.value}>{value || "—"}</Text>
        )}
      </View>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
  avatarSection: { alignItems: "center", paddingTop: 60, paddingBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: COLORS.primary },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.lightBlue || "#EFF6FF", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: COLORS.primary },
  cameraOverlay: { position: "absolute", bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#fff" },
  name: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 12 },
  subName: { color: COLORS.muted, marginTop: 4, fontSize: 14 },
  editRow: { paddingHorizontal: 20, marginBottom: 8 },
  editBtn: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-end", backgroundColor: COLORS.lightBlue || "#EFF6FF", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: COLORS.primary },
  editBtnText: { color: COLORS.primary, fontWeight: "800", fontSize: 14 },
  editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  cancelBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
  saveBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 14, backgroundColor: COLORS.primary, minWidth: 80, alignItems: "center" },
  saveBtnText: { color: "#fff", fontWeight: "900" },
  reportsCard: { marginHorizontal: 18, marginBottom: 16, backgroundColor: COLORS.card, borderRadius: 24, padding: 16, borderWidth: 1.5, borderColor: COLORS.primary, flexDirection: "row", alignItems: "center", gap: 14, elevation: 3, shadowColor: COLORS.primary, shadowOpacity: 0.12, shadowRadius: 12 },
  reportsIconBox: { width: 54, height: 54, borderRadius: 18, backgroundColor: COLORS.primary, alignItems: "center", justifyContent: "center" },
  reportsTitle: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  reportsSub: { color: COLORS.muted, fontSize: 12, fontWeight: "600", marginTop: 4, lineHeight: 17 },
  reportsChevron: { width: 32, height: 32, borderRadius: 12, backgroundColor: COLORS.lightBlue || "#EFF6FF", alignItems: "center", justifyContent: "center" },
  card: { marginHorizontal: 18, marginBottom: 16, backgroundColor: COLORS.card, borderRadius: 24, padding: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14 },
  logoutBtn: { marginHorizontal: 18, marginBottom: 12, height: 52, borderRadius: 18, backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderWidth: 1, borderColor: "#FECACA" },
  logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },
});

const fieldStyles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  iconWrap: { marginTop: 2, width: 24, alignItems: "center" },
  label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
  value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  input: { fontSize: 15, fontWeight: "700", color: COLORS.text, borderBottomWidth: 1, borderBottomColor: COLORS.primary, paddingVertical: 2 },
});