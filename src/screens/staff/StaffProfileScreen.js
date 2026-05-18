

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   Modal,
//   Pressable,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";

// export default function StaffProfileScre2en({ navigation }) {
//   const [editMode, setEditMode] = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);

//   const [profile, setProfile] = useState({
//     hospitalName: "City Care Hospital",
//     hospitalId: "HSP12456",
//     hospitalType: "Multi-speciality",
//     phone: "+91 98765 43210",
//     email: "info@citycare.com",
//     address: "Madhapur, Hyderabad",
//     licenseNo: "LIC987654",
//     departments: "6",
//     doctors: "18",
//     openingTime: "09:00 AM",
//     closingTime: "08:00 PM",
//     image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
//   });

//   const updateField = (key, value) => {
//     setProfile((prev) => ({ ...prev, [key]: value }));
//   };

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
//       aspect: [16, 9],
//     });

//     if (!result.canceled) {
//       updateField("image", result.assets[0].uri);
//     }
//   };

//   const saveProfile = () => {
//     if (!profile.hospitalName.trim() || !profile.phone.trim()) {
//       Alert.alert("Error", "Hospital name and phone number are required.");
//       return;
//     }

//     setEditMode(false);
//     setSuccessPopup(true);
//   };

//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//   };

//   const logout = () => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: "RoleSelect" }],
//       })
//     );
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.heroCard}>
//           <TouchableOpacity
//             disabled={!editMode}
//             onPress={pickImage}
//             style={{ flex: 1 }}
//             activeOpacity={0.85}
//           >
//             <Image source={{ uri: profile.image }} style={styles.hospitalImage} />
//             <View style={styles.overlay} />

//             {editMode && (
//               <View style={styles.cameraBadge}>
//                 <Ionicons name="camera" size={18} color="#fff" />
//                 <Text style={styles.cameraText}>Change Photo</Text>
//               </View>
//             )}

//             <View style={styles.heroContent}>
//               {editMode ? (
//                 <>
//                   <TextInput
//                     value={profile.hospitalName}
//                     onChangeText={(v) => updateField("hospitalName", v)}
//                     style={styles.heroInput}
//                     placeholder="Hospital Name"
//                     placeholderTextColor="rgba(255,255,255,0.7)"
//                   />

//                   <TextInput
//                     value={profile.hospitalId}
//                     onChangeText={(v) => updateField("hospitalId", v)}
//                     style={styles.heroSubInput}
//                     placeholder="Hospital ID"
//                     placeholderTextColor="rgba(255,255,255,0.7)"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.hospitalName}>{profile.hospitalName}</Text>
//                   <Text style={styles.hospitalSub}>
//                     Hospital ID: {profile.hospitalId}
//                   </Text>
//                 </>
//               )}

//               <View style={styles.statusChip}>
//                 <Ionicons name="checkmark-circle" size={16} color="#fff" />
//                 <Text style={styles.statusText}>Verified Hospital</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Hospital Details</Text>

//           <Info
//             label="Hospital Type"
//             value={profile.hospitalType}
//             icon="business-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("hospitalType", v)}
//           />

//           <Info
//             label="Phone"
//             value={profile.phone}
//             icon="call-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("phone", v)}
//             keyboardType="phone-pad"
//           />

//           <Info
//             label="Email"
//             value={profile.email}
//             icon="mail-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("email", v)}
//             keyboardType="email-address"
//           />

//           <Info
//             label="Address"
//             value={profile.address}
//             icon="location-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("address", v)}
//           />

//           <Info
//             label="License No"
//             value={profile.licenseNo}
//             icon="document-text-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("licenseNo", v)}
//           />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>OPD Settings</Text>

//           <Info
//             label="Departments"
//             value={profile.departments}
//             icon="git-branch-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("departments", v)}
//             keyboardType="numeric"
//           />

//           <Info
//             label="Doctors"
//             value={profile.doctors}
//             icon="medkit-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("doctors", v)}
//             keyboardType="numeric"
//           />

//           <Info
//             label="Opening Time"
//             value={profile.openingTime}
//             icon="time-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("openingTime", v)}
//           />

//           <Info
//             label="Closing Time"
//             value={profile.closingTime}
//             icon="moon-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("closingTime", v)}
//           />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Staff Admin</Text>
//           <StaffMember name="Dr. Sandeep Kumar" role="General OPD Doctor" />
//           <StaffMember name="Nurse Priya" role="Queue Desk Staff" />
//           <StaffMember name="Rahul Verma" role="Reception Manager" />
//         </View>

//         <TouchableOpacity
//           style={styles.editBtn}
//           activeOpacity={0.88}
//           onPress={editMode ? saveProfile : () => setEditMode(true)}
//         >
//           <Ionicons
//             name={editMode ? "save-outline" : "create-outline"}
//             size={20}
//             color="#fff"
//           />
//           <Text style={styles.editText}>
//             {editMode ? "Save Hospital Profile" : "Edit Hospital Profile"}
//           </Text>
//         </TouchableOpacity>

//         {editMode && (
//           <TouchableOpacity
//             style={styles.cancelBtn}
//             activeOpacity={0.85}
//             onPress={() => setEditMode(false)}
//           >
//             <Text style={styles.cancelText}>Cancel Editing</Text>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85} onPress={logout}>
//           <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

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
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark-circle" size={58} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Profile Saved</Text>

//             <Text style={styles.successMessage}>
//               Hospital profile has been updated successfully.
//             </Text>

//             <View style={styles.savedBadge}>
//               <Ionicons name="business-outline" size={17} color={COLORS.staff} />
//               <Text style={styles.savedBadgeText}>{profile.hospitalName}</Text>
//             </View>

//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>OK</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// function Info({ label, value, icon, editMode, onChangeText, keyboardType }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <View style={styles.iconBox}>
//           <Ionicons name={icon} size={20} color={COLORS.staff} />
//         </View>

//         <Text style={styles.label}>{label}</Text>
//       </View>

//       {editMode ? (
//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           keyboardType={keyboardType}
//           style={styles.inlineInput}
//           placeholderTextColor={COLORS.muted}
//         />
//       ) : (
//         <Text style={styles.value}>{value}</Text>
//       )}
//     </View>
//   );
// }

// function StaffMember({ name, role }) {
//   return (
//     <View style={styles.staffRow}>
//       <View style={styles.staffIcon}>
//         <Ionicons name="person-outline" size={20} color={COLORS.staff} />
//       </View>

//       <View style={{ flex: 1 }}>
//         <Text style={styles.staffName}>{name}</Text>
//         <Text style={styles.staffRole}>{role}</Text>
//       </View>

//       <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   heroCard: {
//     marginTop: 52,
//     height: 250,
//     borderRadius: 30,
//     overflow: "hidden",
//     backgroundColor: COLORS.card,
//     elevation: 5,
//   },

//   hospitalImage: {
//     width: "100%",
//     height: "100%",
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },

//   cameraBadge: {
//     position: "absolute",
//     top: 18,
//     right: 18,
//     backgroundColor: COLORS.staff,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 999,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   cameraText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   heroContent: {
//     position: "absolute",
//     left: 20,
//     right: 20,
//     bottom: 20,
//   },

//   hospitalName: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "900",
//   },

//   hospitalSub: {
//     color: "rgba(255,255,255,0.88)",
//     marginTop: 6,
//     fontWeight: "700",
//   },

//   heroInput: {
//     color: "#fff",
//     fontSize: 23,
//     fontWeight: "900",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.6)",
//     paddingVertical: 4,
//   },

//   heroSubInput: {
//     color: "#fff",
//     fontWeight: "800",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.4)",
//     paddingVertical: 4,
//     marginTop: 6,
//   },

//   statusChip: {
//     marginTop: 14,
//     alignSelf: "flex-start",
//     backgroundColor: COLORS.success || "#16A34A",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 999,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   statusText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   card: {
//     marginTop: 18,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginBottom: 12,
//   },

//   infoRow: {
//     paddingVertical: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     flex: 1,
//   },

//   iconBox: {
//     width: 38,
//     height: 38,
//     borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   label: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   value: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "45%",
//     textAlign: "right",
//   },

//   inlineInput: {
//     width: "48%",
//     height: 42,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingHorizontal: 10,
//     color: COLORS.text,
//     fontWeight: "800",
//     textAlign: "right",
//     backgroundColor: COLORS.background,
//   },

//   staffRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },

//   staffIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   staffName: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },

//   staffRole: {
//     color: COLORS.muted,
//     marginTop: 3,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   editBtn: {
//     marginTop: 20,
//     height: 54,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//   },

//   editText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   cancelBtn: {
//     marginTop: 14,
//     height: 50,
//     borderRadius: 18,
//     backgroundColor: COLORS.card,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   cancelText: {
//     color: COLORS.muted,
//     fontWeight: "900",
//   },

//   logoutBtn: {
//     marginTop: 14,
//     marginBottom: 34,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },

//   logoutText: {
//     color: COLORS.danger,
//     fontWeight: "900",
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
//     maxWidth: 390,
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
//     backgroundColor: COLORS.staff,
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

//   savedBadge: {
//     marginTop: 18,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },

//   savedBadgeText: {
//     color: COLORS.staff,
//     fontSize: 13,
//     fontWeight: "900",
//   },

//   successButton: {
//     marginTop: 24,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });  


























// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';

// const StaffProfileScre2en = ({ route, navigation }) => {
//     const { hospitalId } = route.params;  // Hospital ID passed from Dashboard Screen
//     const [doctorName, setDoctorName] = useState('');
//     const [departmentName, setDepartmentName] = useState('');

//     const handleAddDoctor = () => {
//         const newDoctor = {
//             name: doctorName,
//             department: departmentName,
//             hospitalId: hospitalId,
//         };

//         axios.post('http://yourbackendapi/api/hospital/addDoctor', newDoctor)
//             .then(response => {
//                 Alert.alert('Success', 'Doctor added successfully');
//                 setDoctorName('');
//                 setDepartmentName('');
//             })
//             .catch(error => {
//                 console.error('Error adding doctor:', error);
//                 Alert.alert('Error', 'Could not add doctor');
//             });
//     };

//     const handleAddDepartment = () => {
//         const newDepartment = {
//             name: departmentName,
//             hospitalId: hospitalId,
//         };

//         axios.post('http://yourbackendapi/api/hospital/addDepartment', newDepartment)
//             .then(response => {
//                 Alert.alert('Success', 'Department added successfully');
//                 setDepartmentName('');
//             })
//             .catch(error => {
//                 console.error('Error adding department:', error);
//                 Alert.alert('Error', 'Could not add department');
//             });
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Doctor Name"
//                 value={doctorName}
//                 onChangeText={setDoctorName}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Department Name"
//                 value={departmentName}
//                 onChangeText={setDepartmentName}
//             />
//             <Button title="Add Doctor" onPress={handleAddDoctor} />
//             <Button title="Add Department" onPress={handleAddDepartment} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         marginBottom: 10,
//         padding: 10,
//         fontSize: 16,
//     },
// });

// export default StaffProfileScre2en;  





















// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   Modal,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// import { useHospital } from "../../context/HospitalContext"; // Import Context

// export default function StaffProfileScreen({ navigation }) {
//   const { staffHospitalData, updateHospitalProfile, loading } = useHospital();
//   const [editMode, setEditMode] = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);

//   // Sync local state with context data
//   const [profile, setProfile] = useState({
//     hospitalName: "",
//     hospitalId: "",
//     hospitalType: "",
//     phone: "",
//     email: "",
//     address: "",
//     licenseNo: "",
//     departments: "",
//     doctors: "",
//     openingTime: "",
//     closingTime: "",
//     image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
//   });

//   useEffect(() => {
//     if (staffHospitalData) {
//       setProfile(staffHospitalData);
//     }
//   }, [staffHospitalData]);

//   const updateField = (key, value) => {
//     setProfile((prev) => ({ ...prev, [key]: value }));
//   };

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
//       aspect: [16, 9],
//     });

//     if (!result.canceled) {
//       updateField("image", result.assets[0].uri);
//     }
//   };

//   const saveProfile = async () => {
//     if (!profile.hospitalName.trim() || !profile.phone.trim()) {
//       Alert.alert("Error", "Hospital name and phone number are required.");
//       return;
//     }

//     // Call Context function to update MySQL
//     const result = await updateHospitalProfile(profile);
    
//     if (result.success) {
//       setEditMode(false);
//       setSuccessPopup(true);
//     } else {
//       Alert.alert("Update Failed", "Could not save profile to server.");
//     }
//   };

//   const logout = () => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: "RoleSelect" }],
//       })
//     );
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       {/* Loading Overlay */}
//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color={COLORS.staff} />
//         </View>
//       )}

//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         {/* Hero Section */}
//         <View style={styles.heroCard}>
//           <TouchableOpacity
//             disabled={!editMode}
//             onPress={pickImage}
//             style={{ flex: 1 }}
//             activeOpacity={0.85}
//           >
//             <Image source={{ uri: profile.image }} style={styles.hospitalImage} />
//             <View style={styles.overlay} />

//             {editMode && (
//               <View style={styles.cameraBadge}>
//                 <Ionicons name="camera" size={18} color="#fff" />
//                 <Text style={styles.cameraText}>Change Photo</Text>
//               </View>
//             )}

//             <View style={styles.heroContent}>
//               {editMode ? (
//                 <TextInput
//                   value={profile.hospitalName}
//                   onChangeText={(v) => updateField("hospitalName", v)}
//                   style={styles.heroInput}
//                   placeholder="Hospital Name"
//                   placeholderTextColor="rgba(255,255,255,0.7)"
//                 />
//               ) : (
//                 <Text style={styles.hospitalName}>{profile.hospitalName}</Text>
//               )}
//               <Text style={styles.hospitalSub}>ID: {profile.hospitalId}</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Details Card */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Contact & Location</Text>
//           <Info label="Phone" value={profile.phone} icon="call-outline" editMode={editMode} onChangeText={(v) => updateField("phone", v)} />
//           <Info label="Email" value={profile.email} icon="mail-outline" editMode={editMode} onChangeText={(v) => updateField("email", v)} />
//           <Info label="Address" value={profile.address} icon="location-outline" editMode={editMode} onChangeText={(v) => updateField("address", v)} />
//         </View>

//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Operations</Text>
//           <Info label="Departments" value={profile.departments.toString()} icon="grid-outline" editMode={editMode} onChangeText={(v) => updateField("departments", v)} keyboardType="numeric" />
//           <Info label="OPD Hours" value={`${profile.openingTime} - ${profile.closingTime}`} icon="time-outline" editMode={false} />
//         </View>

//         {/* Action Buttons */}
//         <TouchableOpacity 
//           style={[styles.editBtn, editMode && { backgroundColor: '#10B981' }]} 
//           onPress={editMode ? saveProfile : () => setEditMode(true)}
//         >
//           <Ionicons name={editMode ? "checkmark-done" : "create-outline"} size={20} color="#fff" />
//           <Text style={styles.editText}>{editMode ? "Commit Changes" : "Edit Profile"}</Text>
//         </TouchableOpacity>

//         {editMode && (
//           <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditMode(false)}>
//             <Text style={styles.cancelText}>Discard Changes</Text>
//           </TouchableOpacity>
//         )}

//         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//           <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//           <Text style={styles.logoutText}>Logout from MediQueue</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Success Modal remains the same as your previous version */}
//       <Modal visible={successPopup} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <MotiView 
//             from={{ scale: 0.9, opacity: 0 }} 
//             animate={{ scale: 1, opacity: 1 }} 
//             style={styles.successCard}
//           >
//             <Ionicons name="checkmark-circle" size={60} color={COLORS.staff} />
//             <Text style={styles.successTitle}>System Updated</Text>
//             <Text style={styles.successMessage}>Hospital records synchronized successfully.</Text>
//             <Pressable style={styles.successButton} onPress={() => setSuccessPopup(false)}>
//               <Text style={styles.successButtonText}>Continue</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // Sub-components (Info, StaffMember) and Styles remain largely the same
// // Added loadingOverlay style:
// const styles = StyleSheet.create({
//   // ... your existing styles ...
//   loadingOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     zIndex: 999,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }, 

//   mainWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   heroCard: {
//     marginTop: 52,
//     height: 250,
//     borderRadius: 30,
//     overflow: "hidden",
//     backgroundColor: COLORS.card,
//     elevation: 5,
//   },

//   hospitalImage: {
//     width: "100%",
//     height: "100%",
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },

//   cameraBadge: {
//     position: "absolute",
//     top: 18,
//     right: 18,
//     backgroundColor: COLORS.staff,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 999,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   cameraText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   heroContent: {
//     position: "absolute",
//     left: 20,
//     right: 20,
//     bottom: 20,
//   },

//   hospitalName: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "900",
//   },

//   hospitalSub: {
//     color: "rgba(255,255,255,0.88)",
//     marginTop: 6,
//     fontWeight: "700",
//   },

//   heroInput: {
//     color: "#fff",
//     fontSize: 23,
//     fontWeight: "900",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.6)",
//     paddingVertical: 4,
//   },

//   heroSubInput: {
//     color: "#fff",
//     fontWeight: "800",
//     borderBottomWidth: 1,
//     borderBottomColor: "rgba(255,255,255,0.4)",
//     paddingVertical: 4,
//     marginTop: 6,
//   },

//   statusChip: {
//     marginTop: 14,
//     alignSelf: "flex-start",
//     backgroundColor: COLORS.success || "#16A34A",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 999,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   statusText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   card: {
//     marginTop: 18,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginBottom: 12,
//   },

//   infoRow: {
//     paddingVertical: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     flex: 1,
//   },

//   iconBox: {
//     width: 38,
//     height: 38,
//     borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   label: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   value: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "45%",
//     textAlign: "right",
//   },

//   inlineInput: {
//     width: "48%",
//     height: 42,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingHorizontal: 10,
//     color: COLORS.text,
//     fontWeight: "800",
//     textAlign: "right",
//     backgroundColor: COLORS.background,
//   },

//   staffRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     paddingVertical: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },

//   staffIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   staffName: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },

//   staffRole: {
//     color: COLORS.muted,
//     marginTop: 3,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   editBtn: {
//     marginTop: 20,
//     height: 54,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//   },

//   editText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   cancelBtn: {
//     marginTop: 14,
//     height: 50,
//     borderRadius: 18,
//     backgroundColor: COLORS.card,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   cancelText: {
//     color: COLORS.muted,
//     fontWeight: "900",
//   },

//   logoutBtn: {
//     marginTop: 14,
//     marginBottom: 34,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },

//   logoutText: {
//     color: COLORS.danger,
//     fontWeight: "900",
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
//     maxWidth: 390,
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
//     backgroundColor: COLORS.staff,
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

//   savedBadge: {
//     marginTop: 18,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },

//   savedBadgeText: {
//     color: COLORS.staff,
//     fontSize: 13,
//     fontWeight: "900",
//   },

//   successButton: {
//     marginTop: 24,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });  





































// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   Alert,
//   Modal,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { Picker } from "@react-native-picker/picker";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// // Import your API services here
// // import { fetchHospitalProfile, updateHospitalProfile, addDoctorToDb } from "../../services/apiService";

// export default function StaffProfileScreen({ navigation }) {
//   const [editMode, setEditMode] = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);

//   // Profile State (Initially empty, filled by Backend)
//   const [profile, setProfile] = useState({
//     hospitalName: "",
//     hospitalId: "",
//     hospitalType: "",
//     phone: "",
//     email: "",
//     address: "",
//     licenseNo: "",
//     departments: [], // Array of department objects
//     image: "https://via.placeholder.com/900x500",
//   });

//   // New Doctor State
//   const [newDoc, setNewDoc] = useState({
//     name: "",
//     department: "",
//     fee: "",
//   });

//   useEffect(() => {
//     loadData();
//   }, []);

// // Inside StaffProfileScreen.js

// const loadData = async () => {
//   try {
//     setLoading(true);
    
//     // 1. Call your actual backend service
//     const data = await getHospitalProfile(); 
    
//     // 2. Map the backend fields to your state
//     // Ensure these keys match what your Spring Boot API returns (e.g., data.name vs data.hospitalName)
//     setProfile({
//       hospitalName: data.name || "Unknown Hospital",
//       hospitalId: data.hospitalId || "N/A",
//       hospitalType: data.type || "General",
//       phone: data.phone || "",
//       email: data.email || "",
//       address: data.address || "",
//       licenseNo: data.licenseNumber || "",
//       departments: data.departments || [], // Should be an array like ["Cardiology", "ER"]
//       image: data.imageUrl || "https://via.placeholder.com/900",
//     });

//   } catch (error) {
//     Alert.alert("Connection Error", "Failed to load Blue Hills Hospital data from the server.");
//   } finally {
//     setLoading(false);
//   }
// };


//   const updateField = (key, value) => {
//     setProfile((prev) => ({ ...prev, [key]: value }));
//   };

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
//       aspect: [16, 9],
//     });
//     if (!result.canceled) {
//       updateField("image", result.assets[0].uri);
//     }
//   };

//   const saveProfile = async () => {
//     setIsSaving(true);
//     try {
//       // await updateHospitalProfile(profile);
//       setEditMode(false);
//       setSuccessPopup(true);
//     } catch (error) {
//       Alert.alert("Error", "Update failed");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleAddDoctor = async () => {
//     if (!newDoc.name || !newDoc.department || !newDoc.fee) {
//       Alert.alert("Incomplete", "Please fill all doctor details.");
//       return;
//     }

//     try {
//       setIsSaving(true);
//       // await addDoctorToDb({ ...newDoc, hospitalId: profile.hospitalId });
//       Alert.alert("Success", `Dr. ${newDoc.name} added to ${newDoc.department}. Data synced to patients.`);
//       setNewDoc({ name: "", department: "", fee: "" });
//     } catch (error) {
//       Alert.alert("Error", "Could not save doctor to database.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const logout = () => {
//     navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: "RoleSelect" }],
//       })
//     );
//   };

//   if (loading) {
//     return (
//       <View style={[styles.mainWrapper, { justifyContent: "center" }]}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         {/* HERO SECTION */}
//         <View style={styles.heroCard}>
//           <TouchableOpacity
//             disabled={!editMode}
//             onPress={pickImage}
//             style={{ flex: 1 }}
//             activeOpacity={0.85}
//           >
//             <Image source={{ uri: profile.image }} style={styles.hospitalImage} />
//             <View style={styles.overlay} />

//             {editMode && (
//               <View style={styles.cameraBadge}>
//                 <Ionicons name="camera" size={18} color="#fff" />
//                 <Text style={styles.cameraText}>Change Photo</Text>
//               </View>
//             )}

//             <View style={styles.heroContent}>
//               {editMode ? (
//                 <>
//                   <TextInput
//                     value={profile.hospitalName}
//                     onChangeText={(v) => updateField("hospitalName", v)}
//                     style={styles.heroInput}
//                     placeholder="Hospital Name"
//                     placeholderTextColor="rgba(255,255,255,0.7)"
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Text style={styles.hospitalName}>{profile.hospitalName}</Text>
//                   <Text style={styles.hospitalSub}>Hospital ID: {profile.hospitalId}</Text>
//                 </>
//               )}
//               <View style={styles.statusChip}>
//                 <Ionicons name="checkmark-circle" size={16} color="#fff" />
//                 <Text style={styles.statusText}>Live on Patient App</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* DOCTOR MANAGEMENT SECTION (NEW) */}
//         <View style={[styles.card, { borderColor: COLORS.staff, borderWidth: 1.5 }]}>
//           <View style={styles.sectionHeader}>
//             <Ionicons name="person-add-outline" size={20} color={COLORS.staff} />
//             <Text style={styles.sectionTitle}>Add Department Doctor</Text>
//           </View>
          
//           <TextInput
//             style={styles.adminInput}
//             placeholder="Doctor Full Name"
//             value={newDoc.name}
//             onChangeText={(v) => setNewDoc({ ...newDoc, name: v })}
//           />

//           <View style={styles.pickerWrapper}>
//             <Picker
//               selectedValue={newDoc.department}
//               onValueChange={(val) => setNewDoc({ ...newDoc, department: val })}
//               style={styles.picker}
//             >
//               <Picker.Item label="Select Department" value="" color={COLORS.muted} />
//               {profile.departments.map((dept, idx) => (
//                 <Picker.Item key={idx} label={dept} value={dept} />
//               ))}
//             </Picker>
//           </View>

//           <TextInput
//             style={styles.adminInput}
//             placeholder="Consultation Fee (₹)"
//             keyboardType="numeric"
//             value={newDoc.fee}
//             onChangeText={(v) => setNewDoc({ ...newDoc, fee: v })}
//           />

//           <TouchableOpacity style={styles.addDocBtn} onPress={handleAddDoctor}>
//             <Text style={styles.addDocBtnText}>Save & Sync to DB</Text>
//           </TouchableOpacity>
//         </View>

//         {/* HOSPITAL DETAILS SECTION */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Hospital Profile</Text>
//           <Info
//             label="Phone"
//             value={profile.phone}
//             icon="call-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("phone", v)}
//             keyboardType="phone-pad"
//           />
//           <Info
//             label="Email"
//             value={profile.email}
//             icon="mail-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("email", v)}
//           />
//           <Info
//             label="Address"
//             value={profile.address}
//             icon="location-outline"
//             editMode={editMode}
//             onChangeText={(v) => updateField("address", v)}
//           />
//         </View>

//         {/* BUTTONS */}
//         <TouchableOpacity
//           style={styles.editBtn}
//           activeOpacity={0.88}
//           onPress={editMode ? saveProfile : () => setEditMode(true)}
//         >
//           {isSaving ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons name={editMode ? "save-outline" : "create-outline"} size={20} color="#fff" />
//               <Text style={styles.editText}>{editMode ? "Confirm Changes" : "Edit Profile"}</Text>
//             </>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//           <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* SUCCESS MODAL */}
//       <Modal visible={successPopup} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             style={styles.successCard}
//           >
//             <View style={styles.successIcon}>
//               <Ionicons name="cloud-upload" size={40} color="#fff" />
//             </View>
//             <Text style={styles.successTitle}>Database Updated</Text>
//             <Text style={styles.successMessage}>Your hospital information is now synced with the patient servers.</Text>
//             <Pressable style={styles.successButton} onPress={() => setSuccessPopup(false)}>
//               <Text style={styles.successButtonText}>Got it</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// function Info({ label, value, icon, editMode, onChangeText, keyboardType }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <View style={styles.iconBox}>
//           <Ionicons name={icon} size={18} color={COLORS.staff} />
//         </View>
//         <Text style={styles.label}>{label}</Text>
//       </View>
//       {editMode ? (
//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           keyboardType={keyboardType}
//           style={styles.inlineInput}
//         />
//       ) : (
//         <Text style={styles.value}>{value}</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: COLORS.background },
//   container: { flex: 1, paddingHorizontal: 18 },
//   heroCard: { marginTop: 52, height: 220, borderRadius: 30, overflow: "hidden", elevation: 5 },
//   hospitalImage: { width: "100%", height: "100%" },
//   overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.4)" },
//   cameraBadge: { position: "absolute", top: 15, right: 15, backgroundColor: COLORS.staff, padding: 8, borderRadius: 20, flexDirection: "row", alignItems: "center", gap: 5 },
//   cameraText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
//   heroContent: { position: "absolute", left: 20, bottom: 20 },
//   hospitalName: { color: "#fff", fontSize: 24, fontWeight: "900" },
//   hospitalSub: { color: "#E2E8F0", fontSize: 14 },
//   heroInput: { color: "#fff", fontSize: 22, fontWeight: "900", borderBottomWidth: 1, borderBottomColor: "#fff" },
//   statusChip: { marginTop: 10, alignSelf: "flex-start", backgroundColor: "#10B981", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, flexDirection: "row", alignItems: "center", gap: 5 },
//   statusText: { color: "#fff", fontWeight: "bold", fontSize: 11 },
//   card: { marginTop: 20, backgroundColor: COLORS.card, borderRadius: 24, padding: 20, elevation: 2 },
//   sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
//   sectionTitle: { fontSize: 17, fontWeight: "900", color: COLORS.text },
//   adminInput: { backgroundColor: "#F1F5F9", padding: 12, borderRadius: 12, marginBottom: 10, fontWeight: "600" },
//   pickerWrapper: { backgroundColor: "#F1F5F9", borderRadius: 12, marginBottom: 10, overflow: "hidden" },
//   picker: { height: 50 },
//   addDocBtn: { backgroundColor: COLORS.staff, padding: 15, borderRadius: 12, alignItems: "center" },
//   addDocBtnText: { color: "#fff", fontWeight: "bold" },
//   infoRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   infoLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
//   iconBox: { width: 34, height: 34, borderRadius: 10, backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center" },
//   label: { color: COLORS.muted, fontWeight: "700", fontSize: 13 },
//   value: { color: COLORS.text, fontWeight: "800", fontSize: 14 },
//   inlineInput: { width: "50%", backgroundColor: "#F8FAFC", padding: 8, borderRadius: 8, textAlign: "right", fontWeight: "700" },
//   editBtn: { marginTop: 20, height: 55, borderRadius: 18, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 },
//   editText: { color: "#fff", fontWeight: "900", fontSize: 16 },
//   logoutBtn: { marginVertical: 20, height: 50, borderRadius: 18, backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderWidth: 1, borderColor: "#FECACA" },
//   logoutText: { color: COLORS.danger, fontWeight: "900" },
//   modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", padding: 25 },
//   successCard: { backgroundColor: COLORS.card, borderRadius: 30, padding: 25, alignItems: "center" },
//   successIcon: { width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", marginBottom: 15 },
//   successTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   successMessage: { textAlign: "center", color: COLORS.muted, marginTop: 10, lineHeight: 20 },
//   successButton: { marginTop: 20, width: "100%", backgroundColor: COLORS.staff, padding: 15, borderRadius: 15, alignItems: "center" },
//   successButtonText: { color: "#fff", fontWeight: "bold" },
// });  






















// // src/screens/staff/StaffProfileScreen.js
// // Loads real hospital data from backend
// // Department dropdown with medical specialties, doctor management with fee

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
//   Modal,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   fetchMyHospitalDetails,
//   fetchDoctors,
//   addDoctor,
//   deleteDoctor,
//   updateHospitalProfile,
// } from "../../services/apiService";

// // ── Full list of medical departments ──────────────────────────────────────────
// const MEDICAL_DEPARTMENTS = [
//   "General OPD",
//   "Cardiology",
//   "Cardiothoracic Surgery",
//   "Dermatology",
//   "Dental / Orthodontics",
//   "Diabetology & Endocrinology",
//   "Emergency & Trauma",
//   "ENT (Ear, Nose & Throat)",
//   "Gastroenterology",
//   "General Surgery",
//   "Gynaecology & Obstetrics",
//   "Haematology",
//   "Infectious Diseases",
//   "Internal Medicine",
//   "Nephrology & Urology",
//   "Neurology",
//   "Neurosurgery",
//   "Oncology",
//   "Ophthalmology (Eye)",
//   "Orthopaedics",
//   "Paediatrics (Children)",
//   "Physiotherapy & Rehabilitation",
//   "Plastic & Cosmetic Surgery",
//   "Psychiatry & Psychology",
//   "Pulmonology (Chest & Lungs)",
//   "Radiology & Imaging",
//   "Rheumatology",
//   "Vascular Surgery",
// ];

// export default function StaffProfileScreen({ navigation }) {
//   const [editMode, setEditMode]       = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [loading, setLoading]         = useState(true);
//   const [isSaving, setIsSaving]       = useState(false);
//   const [doctors, setDoctors]         = useState([]);
//   const [showAddDoctor, setShowAddDoctor] = useState(false);

//   const [profile, setProfile] = useState({
//     hospitalName: "",
//     hospitalId:   "",
//     hospitalType: "",
//     phone:        "",
//     email:        "",
//     address:      "",
//     city:         "",
//     openingTime:  "",
//     closingTime:  "",
//     licenseNo:    "",
//     image:        null,
//   });

//   const [newDoc, setNewDoc] = useState({
//     name:       "",
//     department: MEDICAL_DEPARTMENTS[0],
//     fee:        "",
//     qualification: "",
//   });

//   // ── Load from backend ───────────────────────────────────────────────────────
//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await fetchMyHospitalDetails();

//       setProfile({
//         hospitalName: data.name          || "",
//         hospitalId:   data.hospitalId    || "",
//         hospitalType: data.type          || "",
//         phone:        data.phone         || "",
//         email:        data.email         || "",
//         address:      data.address       || "",
//         city:         data.city          || "",
//         openingTime:  data.openingTime   || "",
//         closingTime:  data.closingTime   || "",
//         licenseNo:    data.licenseNumber || "",
//         image:        data.imageUrl      || null,
//       });

//       // Fetch doctors for this hospital
//       if (data.hospitalId) {
//         const docList = await fetchDoctors(data.hospitalId);
//         setDoctors(Array.isArray(docList) ? docList : []);
//       }
//     } catch (err) {
//       console.log("StaffProfile loadData error:", err.message);
//       // Fallback to AsyncStorage if network fails
//       const storedName = await AsyncStorage.getItem("hospitalName");
//       const storedId   = await AsyncStorage.getItem("hospitalId");
//       const storedEmail = await AsyncStorage.getItem("hospitalEmail");
//       if (storedName) {
//         setProfile((prev) => ({
//           ...prev,
//           hospitalName: storedName || "",
//           hospitalId:   storedId   || "",
//           email:        storedEmail || "",
//         }));
//       } else {
//         Alert.alert("Connection Error", "Failed to load hospital data.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const updateField = (key, value) =>
//     setProfile((prev) => ({ ...prev, [key]: value }));

//   // ── Image picker ────────────────────────────────────────────────────────────
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
//       aspect: [16, 9],
//     });
//     if (!result.canceled) updateField("image", result.assets[0].uri);
//   };

//   // ── Save profile ────────────────────────────────────────────────────────────
//   const saveProfile = async () => {
//     if (!profile.hospitalName.trim()) {
//       Alert.alert("Error", "Hospital name is required.");
//       return;
//     }
//     setIsSaving(true);
//     try {
//       await updateHospitalProfile({
//         name:        profile.hospitalName,
//         phone:       profile.phone,
//         address:     profile.address,
//         city:        profile.city,
//         openingTime: profile.openingTime,
//         closingTime: profile.closingTime,
//       });
//       setEditMode(false);
//       setSuccessPopup(true);
//     } catch (err) {
//       Alert.alert("Error", err.message || "Update failed.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // // ── Add doctor ──────────────────────────────────────────────────────────────
//   // const handleAddDoctor = async () => {
//   //   if (!newDoc.name.trim() || !newDoc.department || !newDoc.fee.trim()) {
//   //     Alert.alert("Incomplete", "Please fill doctor name, department and fee.");
//   //     return;
//   //   }
//   //   setIsSaving(true);
//   //   try {
//   //     const hospitalId = await AsyncStorage.getItem("hospitalId");
//   //     const saved = await addDoctor({
//   //       name:          newDoc.name.trim(),
//   //       department:    newDoc.department,
//   //       fee:           parseFloat(newDoc.fee),
//   //       qualification: newDoc.qualification.trim(),
//   //       hospitalId,
//   //     });
//   //     setDoctors((prev) => [...prev, saved]);
//   //     setNewDoc({ name: "", department: MEDICAL_DEPARTMENTS[0], fee: "", qualification: "" });
//   //     setShowAddDoctor(false);
//   //     Alert.alert("Success", `Dr. ${saved.name || newDoc.name} added successfully!`);
//   //   } catch (err) {
//   //     Alert.alert("Error", err.message || "Could not save doctor.");
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };  


//   const handleAddDoctor = async () => {
//   if (!newDoc.name.trim() || !newDoc.department || !newDoc.fee.trim()) {
//     Alert.alert("Incomplete", "Please fill doctor name, department and fee.");
//     return;
//   }

//   setIsSaving(true);
//   try {
//     // 1. Get the current hospital's ID
//     const hId = await AsyncStorage.getItem("hospitalId") || profile.hospitalId;

//     if (!hId) {
//       Alert.alert("Error", "Hospital ID not found. Please log in again.");
//       return;
//     }

//     // 2. Build the payload exactly as the Backend Entity expects
//     const doctorPayload = {
//       name: newDoc.name.trim(),
//       department: newDoc.department,
//       fee: parseFloat(newDoc.fee),
//       qualification: newDoc.qualification.trim(),
//       hospitalId: hId, // The crucial link
//       available: true,
//       timingsJson: JSON.stringify({
//         morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
//         afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
//         night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 }
//       })
//     };

//     // 3. Send to API
//     const saved = await addDoctor(doctorPayload);

//     // 4. Update local state so the list refreshes immediately
//     setDoctors((prev) => [...prev, saved]);
//     setNewDoc({ name: "", department: MEDICAL_DEPARTMENTS[0], fee: "", qualification: "" });
//     setShowAddDoctor(false);
    
//     Alert.alert("Success", "Doctor added and linked to your hospital!");
//   } catch (err) {
//     Alert.alert("Error", err.message || "Could not save doctor.");
//   } finally {
//     setIsSaving(false);
//   }
// };

//   // ── Delete doctor ───────────────────────────────────────────────────────────
//   const handleDeleteDoctor = (doc) => {
//     Alert.alert(
//       "Delete Doctor",
//       `Remove Dr. ${doc.name} from the hospital?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               await deleteDoctor(doc.id);
//               setDoctors((prev) => prev.filter((d) => d.id !== doc.id));
//             } catch (err) {
//               Alert.alert("Error", err.message || "Delete failed.");
//             }
//           },
//         },
//       ]
//     );
//   };

//   const logout = async () => {
//     await AsyncStorage.clear();
//     navigation.dispatch(
//       CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
//     );
//   };

//   if (loading) {
//     return (
//       <View style={[styles.mainWrapper, { justifyContent: "center" }]}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

//         {/* ── HERO IMAGE CARD ── */}
//         <View style={styles.heroCard}>
//           <TouchableOpacity
//             disabled={!editMode}
//             onPress={pickImage}
//             style={{ flex: 1 }}
//             activeOpacity={0.85}
//           >
//             <Image
//               source={{
//                 uri: profile.image || "https://via.placeholder.com/900x400?text=Hospital",
//               }}
//               style={styles.hospitalImage}
//             />
//             <View style={styles.overlay} />

//             {editMode && (
//               <View style={styles.cameraBadge}>
//                 <Ionicons name="camera" size={18} color="#fff" />
//                 <Text style={styles.cameraText}>Change Photo</Text>
//               </View>
//             )}

//             <View style={styles.heroContent}>
//               {editMode ? (
//                 <TextInput
//                   value={profile.hospitalName}
//                   onChangeText={(v) => updateField("hospitalName", v)}
//                   style={styles.heroInput}
//                   placeholder="Hospital Name"
//                   placeholderTextColor="rgba(255,255,255,0.7)"
//                 />
//               ) : (
//                 <>
//                   <Text style={styles.hospitalName}>{profile.hospitalName || "Hospital"}</Text>
//                   <Text style={styles.hospitalSub}>ID: {profile.hospitalId}</Text>
//                 </>
//               )}
//               <View style={styles.statusChip}>
//                 <Ionicons name="checkmark-circle" size={16} color="#fff" />
//                 <Text style={styles.statusText}>Live on Patient App</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* ── EDIT / SAVE BUTTONS ── */}
//         <View style={styles.editRow}>
//           {!editMode ? (
//             <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(true)}>
//               <Ionicons name="pencil-outline" size={16} color={COLORS.staff} />
//               <Text style={styles.editBtnText}>Edit Profile</Text>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.editActionRow}>
//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={() => { setEditMode(false); loadData(); }}
//               >
//                 <Text style={styles.cancelBtnText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.saveBtn}
//                 onPress={saveProfile}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                   <Text style={styles.saveBtnText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* ── HOSPITAL DETAILS CARD ── */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Hospital Details</Text>

//           <InfoField label="Hospital Type" icon="business-outline" value={profile.hospitalType} edit={false} />
//           <InfoField label="Email" icon="mail-outline" value={profile.email} edit={false} />
//           <InfoField label="Phone" icon="call-outline" value={profile.phone}
//             edit={editMode} onChangeText={(v) => updateField("phone", v)} keyboardType="phone-pad" />
//           <InfoField label="Address" icon="location-outline" value={profile.address}
//             edit={editMode} onChangeText={(v) => updateField("address", v)} />
//           <InfoField label="City" icon="map-outline" value={profile.city}
//             edit={editMode} onChangeText={(v) => updateField("city", v)} />
//           <InfoField label="Opening Time" icon="time-outline" value={profile.openingTime}
//             edit={editMode} onChangeText={(v) => updateField("openingTime", v)} placeholder="e.g. 09:00 AM" />
//           <InfoField label="Closing Time" icon="time-outline" value={profile.closingTime}
//             edit={editMode} onChangeText={(v) => updateField("closingTime", v)} placeholder="e.g. 08:00 PM" />
//         </View>

//         {/* ── DOCTOR MANAGEMENT ── */}
//         <View style={styles.card}>
//           <View style={styles.doctorHeader}>
//             <Text style={styles.sectionTitle}>Doctors ({doctors.length})</Text>
//             <TouchableOpacity
//               style={styles.addDocBtn}
//               onPress={() => setShowAddDoctor(true)}
//             >
//               <Ionicons name="add" size={18} color="#fff" />
//               <Text style={styles.addDocBtnText}>Add Doctor</Text>
//             </TouchableOpacity>
//           </View>

//           {doctors.length === 0 ? (
//             <View style={styles.emptyDocs}>
//               <Ionicons name="person-add-outline" size={32} color={COLORS.muted} />
//               <Text style={styles.emptyDocsText}>No doctors added yet.</Text>
//               <Text style={styles.emptyDocsSub}>
//                 Add doctors so patients can book appointments.
//               </Text>
//             </View>
//           ) : (
//             doctors.map((doc) => (
//               <View key={doc.id || doc.name} style={styles.doctorRow}>
//                 <View style={styles.doctorAvatar}>
//                   <Ionicons name="person" size={22} color={COLORS.staff} />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.doctorName}>Dr. {doc.name}</Text>
//                   <Text style={styles.doctorDept}>{doc.department}</Text>
//                   {doc.qualification ? (
//                     <Text style={styles.doctorMeta}>{doc.qualification}</Text>
//                   ) : null}
//                 </View>
//                 <View style={styles.doctorRight}>
//                   <Text style={styles.doctorFee}>₹{doc.fee}</Text>
//                   <TouchableOpacity onPress={() => handleDeleteDoctor(doc)}>
//                     <Ionicons name="trash-outline" size={18} color={COLORS.danger || "#EF4444"} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))
//           )}
//         </View>

//         {/* ── LOGOUT ── */}
//         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//           <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <View style={{ height: 40 }} />
//       </ScrollView>

//       {/* ── ADD DOCTOR MODAL ── */}
//       <Modal
//         visible={showAddDoctor}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowAddDoctor(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <MotiView
//             from={{ opacity: 0, translateY: 60 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "spring", duration: 400 }}
//             style={styles.modalCard}
//           >
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add New Doctor</Text>
//               <Pressable onPress={() => setShowAddDoctor(false)}>
//                 <Ionicons name="close" size={24} color={COLORS.muted} />
//               </Pressable>
//             </View>

//             <Text style={styles.inputLabel}>Doctor Name *</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder="e.g. Dr. Ravi Kumar"
//               value={newDoc.name}
//               onChangeText={(v) => setNewDoc((p) => ({ ...p, name: v }))}
//               placeholderTextColor={COLORS.muted}
//             />

//             <Text style={styles.inputLabel}>Department *</Text>
//             <View style={styles.pickerWrap}>
//               <Picker
//                 selectedValue={newDoc.department}
//                 onValueChange={(v) => setNewDoc((p) => ({ ...p, department: v }))}
//                 style={styles.picker}
//               >
//                 {MEDICAL_DEPARTMENTS.map((dept) => (
//                   <Picker.Item key={dept} label={dept} value={dept} />
//                 ))}
//               </Picker>
//             </View>

//             <Text style={styles.inputLabel}>Qualification</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder="e.g. MBBS, MD Cardiology"
//               value={newDoc.qualification}
//               onChangeText={(v) => setNewDoc((p) => ({ ...p, qualification: v }))}
//               placeholderTextColor={COLORS.muted}
//             />

//             <Text style={styles.inputLabel}>Consultation Fee (₹) *</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder="e.g. 500"
//               value={newDoc.fee}
//               onChangeText={(v) => setNewDoc((p) => ({ ...p, fee: v }))}
//               keyboardType="number-pad"
//               placeholderTextColor={COLORS.muted}
//             />

//             <TouchableOpacity
//               style={styles.modalSaveBtn}
//               onPress={handleAddDoctor}
//               disabled={isSaving}
//             >
//               {isSaving ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.modalSaveBtnText}>Save Doctor</Text>
//               )}
//             </TouchableOpacity>
//           </MotiView>
//         </View>
//       </Modal>

//       {/* ── SUCCESS POPUP ── */}
//       <Modal visible={successPopup} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.successCard}>
//             <Ionicons name="checkmark-circle" size={60} color={COLORS.staff} />
//             <Text style={styles.successTitle}>Profile Updated!</Text>
//             <Text style={styles.successSub}>
//               Your hospital details have been saved successfully.
//             </Text>
//             <Pressable style={styles.okBtn} onPress={() => setSuccessPopup(false)}>
//               <Text style={styles.okBtnText}>OK</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // ── InfoField component ────────────────────────────────────────────────────────
// function InfoField({ label, icon, value, edit, onChangeText, placeholder, keyboardType }) {
//   return (
//     <View style={infoStyles.row}>
//       <Ionicons name={icon} size={18} color={COLORS.staff} style={infoStyles.icon} />
//       <View style={{ flex: 1 }}>
//         <Text style={infoStyles.label}>{label}</Text>
//         {edit ? (
//           <TextInput
//             style={infoStyles.input}
//             value={value}
//             onChangeText={onChangeText}
//             placeholder={placeholder || label}
//             placeholderTextColor={COLORS.muted}
//             keyboardType={keyboardType || "default"}
//           />
//         ) : (
//           <Text style={infoStyles.value}>{value || "—"}</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: COLORS.background },
//   container:   { flex: 1 },

//   heroCard: {
//     height: 240,
//     marginHorizontal: 18,
//     marginTop: 52,
//     borderRadius: 28,
//     overflow: "hidden",
//     elevation: 5,
//   },
//   hospitalImage: { width: "100%", height: "100%", resizeMode: "cover" },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },
//   cameraBadge: {
//     position: "absolute", top: 14, right: 14,
//     flexDirection: "row", alignItems: "center", gap: 6,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
//   },
//   cameraText: { color: "#fff", fontWeight: "800", fontSize: 13 },
//   heroContent: {
//     position: "absolute", bottom: 20, left: 20,
//   },
//   hospitalName: { color: "#fff", fontSize: 22, fontWeight: "900" },
//   hospitalSub:  { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
//   heroInput: {
//     color: "#fff", fontSize: 20, fontWeight: "900",
//     borderBottomWidth: 1, borderBottomColor: "#fff", paddingVertical: 2, minWidth: 200,
//   },
//   statusChip: {
//     marginTop: 10, flexDirection: "row", alignItems: "center", gap: 6,
//     backgroundColor: COLORS.staff,
//     paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
//     alignSelf: "flex-start",
//   },
//   statusText: { color: "#fff", fontSize: 12, fontWeight: "800" },

//   editRow: { paddingHorizontal: 18, marginTop: 14, marginBottom: 4 },
//   editBtn: {
//     flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-end",
//     backgroundColor: "#ECFDF5", paddingHorizontal: 16, paddingVertical: 8,
//     borderRadius: 20, borderWidth: 1, borderColor: COLORS.staff,
//   },
//   editBtnText: { color: COLORS.staff, fontWeight: "800" },
//   editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
//   cancelBtn: {
//     paddingHorizontal: 20, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.background,
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
//   saveBtn: {
//     paddingHorizontal: 24, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.staff,
//     minWidth: 120, alignItems: "center",
//   },
//   saveBtnText: { color: "#fff", fontWeight: "900" },

//   card: {
//     marginHorizontal: 18, marginBottom: 16,
//     backgroundColor: COLORS.card, borderRadius: 24,
//     padding: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14 },

//   doctorHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
//   addDocBtn: {
//     flexDirection: "row", alignItems: "center", gap: 4,
//     backgroundColor: COLORS.staff, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14,
//   },
//   addDocBtnText: { color: "#fff", fontWeight: "800", fontSize: 13 },

//   emptyDocs: { alignItems: "center", paddingVertical: 20 },
//   emptyDocsText: { color: COLORS.text, fontWeight: "800", marginTop: 10, fontSize: 15 },
//   emptyDocsSub: { color: COLORS.muted, textAlign: "center", marginTop: 4, fontSize: 13 },

//   doctorRow: {
//     flexDirection: "row", alignItems: "center", gap: 12,
//     paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   doctorAvatar: {
//     width: 44, height: 44, borderRadius: 14,
//     backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center",
//   },
//   doctorName:  { fontWeight: "800", color: COLORS.text, fontSize: 15 },
//   doctorDept:  { color: COLORS.staff, fontSize: 13, marginTop: 2 },
//   doctorMeta:  { color: COLORS.muted, fontSize: 12, marginTop: 1 },
//   doctorRight: { alignItems: "flex-end", gap: 6 },
//   doctorFee:   { fontWeight: "900", color: COLORS.text, fontSize: 15 },

//   logoutBtn: {
//     marginHorizontal: 18, marginBottom: 12, height: 52,
//     borderRadius: 18, backgroundColor: "#FEF2F2",
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     borderWidth: 1, borderColor: "#FECACA",
//   },
//   logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },

//   // Modal
//   modalOverlay: {
//     flex: 1, backgroundColor: "rgba(15,23,42,0.55)",
//     justifyContent: "flex-end",
//   },
//   modalCard: {
//     backgroundColor: COLORS.card, borderTopLeftRadius: 30, borderTopRightRadius: 30,
//     padding: 24, paddingBottom: 40,
//   },
//   modalHeader: {
//     flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
//   },
//   modalTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   inputLabel: { fontSize: 13, color: COLORS.muted, fontWeight: "700", marginBottom: 6, marginTop: 12 },
//   modalInput: {
//     backgroundColor: COLORS.background, borderRadius: 14, padding: 14,
//     fontSize: 15, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border,
//   },
//   pickerWrap: {
//     backgroundColor: COLORS.background, borderRadius: 14,
//     borderWidth: 1, borderColor: COLORS.border, overflow: "hidden",
//   },
//   picker: { color: COLORS.text },
//   modalSaveBtn: {
//     marginTop: 22, backgroundColor: COLORS.staff, borderRadius: 16,
//     paddingVertical: 16, alignItems: "center",
//   },
//   modalSaveBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },

//   // Success popup
//   successCard: {
//     margin: 30, backgroundColor: COLORS.card, borderRadius: 28,
//     padding: 30, alignItems: "center",
//   },
//   successTitle: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 14 },
//   successSub:   { color: COLORS.muted, textAlign: "center", marginTop: 8 },
//   okBtn: {
//     marginTop: 22, backgroundColor: COLORS.staff,
//     paddingHorizontal: 40, paddingVertical: 12, borderRadius: 14,
//   },
//   okBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
// });

// const infoStyles = StyleSheet.create({
//   row: {
//     flexDirection: "row", alignItems: "flex-start", gap: 12,
//     paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   icon:  { marginTop: 2 },
//   label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
//   value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
//   input: {
//     fontSize: 15, fontWeight: "700", color: COLORS.text,
//     borderBottomWidth: 1, borderBottomColor: COLORS.staff, paddingVertical: 2,
//   },
// });  








































// // src/screens/staff/StaffProfileScreen.js
// // Loads real hospital data from backend
// // Department dropdown with medical specialties, doctor management with fee

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
//   Modal,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   fetchMyHospitalDetails,
//   fetchDoctors,
//   addDoctor,
//   deleteDoctor,
//   updateHospitalProfile,
// } from "../../services/apiService";
// import { useHospital } from "../../context/HospitalContext";

// // ── Full list of medical departments ──────────────────────────────────────────
// const MEDICAL_DEPARTMENTS = [
//   "General OPD",
//   "Cardiology",
//   "Cardiothoracic Surgery",
//   "Dermatology",
//   "Dental / Orthodontics",
//   "Diabetology & Endocrinology",
//   "Emergency & Trauma",
//   "ENT (Ear, Nose & Throat)",
//   "Gastroenterology",
//   "General Surgery",
//   "Gynaecology & Obstetrics",
//   "Haematology",
//   "Infectious Diseases",
//   "Internal Medicine",
//   "Nephrology & Urology",
//   "Neurology",
//   "Neurosurgery",
//   "Oncology",
//   "Ophthalmology (Eye)",
//   "Orthopaedics",
//   "Paediatrics (Children)",
//   "Physiotherapy & Rehabilitation",
//   "Plastic & Cosmetic Surgery",
//   "Psychiatry & Psychology",
//   "Pulmonology (Chest & Lungs)",
//   "Radiology & Imaging",
//   "Rheumatology",
//   "Vascular Surgery",
// ];

// export default function StaffProfileScreen({ navigation }) {
//   const { refreshDoctors } = useHospital();
//   const [editMode, setEditMode]       = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [loading, setLoading]         = useState(true);
//   const [isSaving, setIsSaving]       = useState(false);
//   const [doctors, setDoctors]         = useState([]);
//   const [showAddDoctor, setShowAddDoctor] = useState(false);

//   const [profile, setProfile] = useState({
//     hospitalName: "",
//     hospitalId:   "",
//     hospitalType: "",
//     phone:        "",
//     email:        "",
//     address:      "",
//     city:         "",
//     openingTime:  "",
//     closingTime:  "",
//     licenseNo:    "",
//     image:        null,
//   });

//   const [newDoc, setNewDoc] = useState({
//     name:       "",
//     department: MEDICAL_DEPARTMENTS[0],
//     fee:        "",
//     qualification: "",
//   });

//   // ── Load from backend ───────────────────────────────────────────────────────
//   const loadData = useCallback(async () => {
//     try {
//       setLoading(true);
//       const data = await fetchMyHospitalDetails();

//       setProfile({
//         hospitalName: data.name          || "",
//         hospitalId:   data.hospitalId    || "",
//         hospitalType: data.type          || "",
//         phone:        data.phone         || "",
//         email:        data.email         || "",
//         address:      data.address       || "",
//         city:         data.city          || "",
//         openingTime:  data.openingTime   || "",
//         closingTime:  data.closingTime   || "",
//         licenseNo:    data.licenseNumber || "",
//         image:        data.imageUrl      || null,
//       });

//       // Fetch doctors for this hospital
//       if (data.hospitalId) {
//         const docList = await fetchDoctors(data.hospitalId);
//         setDoctors(Array.isArray(docList) ? docList : []);
//       }
//     } catch (err) {
//       console.log("StaffProfile loadData error:", err.message);
//       // Fallback to AsyncStorage if network fails
//       const storedName = await AsyncStorage.getItem("hospitalName");
//       const storedId   = await AsyncStorage.getItem("hospitalId");
//       const storedEmail = await AsyncStorage.getItem("hospitalEmail");
//       if (storedName) {
//         setProfile((prev) => ({
//           ...prev,
//           hospitalName: storedName || "",
//           hospitalId:   storedId   || "",
//           email:        storedEmail || "",
//         }));
//       } else {
//         Alert.alert("Connection Error", "Failed to load hospital data.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const updateField = (key, value) =>
//     setProfile((prev) => ({ ...prev, [key]: value }));

//   // ── Image picker ────────────────────────────────────────────────────────────
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
//       aspect: [16, 9],
//     });
//     if (!result.canceled) updateField("image", result.assets[0].uri);
//   };

//   // ── Save profile ────────────────────────────────────────────────────────────
//   const saveProfile = async () => {
//     if (!profile.hospitalName.trim()) {
//       Alert.alert("Error", "Hospital name is required.");
//       return;
//     }
//     setIsSaving(true);
//     try {
//       await updateHospitalProfile({
//         name:        profile.hospitalName,
//         phone:       profile.phone,
//         address:     profile.address,
//         city:        profile.city,
//         openingTime: profile.openingTime,
//         closingTime: profile.closingTime,
//       });
//       setEditMode(false);
//       setSuccessPopup(true);
//     } catch (err) {
//       Alert.alert("Error", err.message || "Update failed.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // // ── Add doctor ──────────────────────────────────────────────────────────────
//   // const handleAddDoctor = async () => {
//   //   if (!newDoc.name.trim() || !newDoc.department || !newDoc.fee.trim()) {
//   //     Alert.alert("Incomplete", "Please fill doctor name, department and fee.");
//   //     return;
//   //   }
//   //   setIsSaving(true);
//   //   try {
//   //     const hospitalId = await AsyncStorage.getItem("hospitalId");
//   //     const saved = await addDoctor({
//   //       name:          newDoc.name.trim(),
//   //       department:    newDoc.department,
//   //       fee:           parseFloat(newDoc.fee),
//   //       qualification: newDoc.qualification.trim(),
//   //       hospitalId,
//   //     });
//   //     setDoctors((prev) => [...prev, saved]);
//   //     setNewDoc({ name: "", department: MEDICAL_DEPARTMENTS[0], fee: "", qualification: "" });
//   //     setShowAddDoctor(false);
//   //     Alert.alert("Success", `Dr. ${saved.name || newDoc.name} added successfully!`);
//   //   } catch (err) {
//   //     Alert.alert("Error", err.message || "Could not save doctor.");
//   //   } finally {
//   //     setIsSaving(false);
//   //   }
//   // };  


//   const handleAddDoctor = async () => {
//   if (!newDoc.name.trim() || !newDoc.department || !newDoc.fee.trim()) {
//     Alert.alert("Incomplete", "Please fill doctor name, department and fee.");
//     return;
//   }

//   setIsSaving(true);
//   try {
//     // 1. Get the current hospital's ID
//     const hId = await AsyncStorage.getItem("hospitalId") || profile.hospitalId;

//     if (!hId) {
//       Alert.alert("Error", "Hospital ID not found. Please log in again.");
//       return;
//     }

//     // 2. Build the payload exactly as the Backend Entity expects
//     const doctorPayload = {
//       name: newDoc.name.trim(),
//       department: newDoc.department,
//       fee: parseFloat(newDoc.fee),
//       qualification: newDoc.qualification.trim(),
//       hospitalId: hId, // The crucial link
//       available: true,
//       timingsJson: JSON.stringify({
//         morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
//         afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
//         night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 }
//       })
//     };

//     // 3. Send to API
//     const saved = await addDoctor(doctorPayload);

//     // 4. Update local state so the list refreshes immediately
//     setDoctors((prev) => [...prev, saved]);
//     // 5. Also refresh the global context doctorList so other screens see the new doctor
//     if (hId) refreshDoctors(hId);
//     setNewDoc({ name: "", department: MEDICAL_DEPARTMENTS[0], fee: "", qualification: "" });
//     setShowAddDoctor(false);
    
//     Alert.alert("Success", "Doctor added and linked to your hospital!");
//   } catch (err) {
//     Alert.alert("Error", err.message || "Could not save doctor.");
//   } finally {
//     setIsSaving(false);
//   }
// };

//   // ── Delete doctor ───────────────────────────────────────────────────────────
//   const handleDeleteDoctor = (doc) => {
//     Alert.alert(
//       "Delete Doctor",
//       `Remove Dr. ${doc.name} from the hospital?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               await deleteDoctor(doc.id);
//               setDoctors((prev) => prev.filter((d) => d.id !== doc.id));
//               // Refresh the global context doctorList
//               if (profile.hospitalId) refreshDoctors(profile.hospitalId);
//             } catch (err) {
//               Alert.alert("Error", err.message || "Delete failed.");
//             }
//           },
//         },
//       ]
//     );
//   };

//   const logout = async () => {
//     await AsyncStorage.clear();
//     navigation.dispatch(
//       CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
//     );
//   };

//   if (loading) {
//     return (
//       <View style={[styles.mainWrapper, { justifyContent: "center" }]}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

//         {/* ── HERO IMAGE CARD ── */}
//         <View style={styles.heroCard}>
//           <TouchableOpacity
//             disabled={!editMode}
//             onPress={pickImage}
//             style={{ flex: 1 }}
//             activeOpacity={0.85}
//           >
//             <Image
//               source={{
//                 uri: profile.image || "https://via.placeholder.com/900x400?text=Hospital",
//               }}
//               style={styles.hospitalImage}
//             />
//             <View style={styles.overlay} />

//             {editMode && (
//               <View style={styles.cameraBadge}>
//                 <Ionicons name="camera" size={18} color="#fff" />
//                 <Text style={styles.cameraText}>Change Photo</Text>
//               </View>
//             )}

//             <View style={styles.heroContent}>
//               {editMode ? (
//                 <TextInput
//                   value={profile.hospitalName}
//                   onChangeText={(v) => updateField("hospitalName", v)}
//                   style={styles.heroInput}
//                   placeholder="Hospital Name"
//                   placeholderTextColor="rgba(255,255,255,0.7)"
//                 />
//               ) : (
//                 <>
//                   <Text style={styles.hospitalName}>{profile.hospitalName || "Hospital"}</Text>
//                   <Text style={styles.hospitalSub}>ID: {profile.hospitalId}</Text>
//                 </>
//               )}
//               <View style={styles.statusChip}>
//                 <Ionicons name="checkmark-circle" size={16} color="#fff" />
//                 <Text style={styles.statusText}>Live on Patient App</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* ── EDIT / SAVE BUTTONS ── */}
//         <View style={styles.editRow}>
//           {!editMode ? (
//             <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(true)}>
//               <Ionicons name="pencil-outline" size={16} color={COLORS.staff} />
//               <Text style={styles.editBtnText}>Edit Profile</Text>
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.editActionRow}>
//               <TouchableOpacity
//                 style={styles.cancelBtn}
//                 onPress={() => { setEditMode(false); loadData(); }}
//               >
//                 <Text style={styles.cancelBtnText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.saveBtn}
//                 onPress={saveProfile}
//                 disabled={isSaving}
//               >
//                 {isSaving ? (
//                   <ActivityIndicator size="small" color="#fff" />
//                 ) : (
//                   <Text style={styles.saveBtnText}>Save Changes</Text>
//                 )}
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* ── HOSPITAL DETAILS CARD ── */}
//         <View style={styles.card}>
//           <Text style={styles.sectionTitle}>Hospital Details</Text>

//           <InfoField label="Hospital Type" icon="business-outline" value={profile.hospitalType} edit={false} />
//           <InfoField label="Email" icon="mail-outline" value={profile.email} edit={false} />
//           <InfoField label="Phone" icon="call-outline" value={profile.phone}
//             edit={editMode} onChangeText={(v) => updateField("phone", v)} keyboardType="phone-pad" />
//           <InfoField label="Address" icon="location-outline" value={profile.address}
//             edit={editMode} onChangeText={(v) => updateField("address", v)} />
//           <InfoField label="City" icon="map-outline" value={profile.city}
//             edit={editMode} onChangeText={(v) => updateField("city", v)} />
//           <InfoField label="Opening Time" icon="time-outline" value={profile.openingTime}
//             edit={editMode} onChangeText={(v) => updateField("openingTime", v)} placeholder="e.g. 09:00 AM" />
//           <InfoField label="Closing Time" icon="time-outline" value={profile.closingTime}
//             edit={editMode} onChangeText={(v) => updateField("closingTime", v)} placeholder="e.g. 08:00 PM" />
//         </View>

//         {/* ── DOCTOR MANAGEMENT ── */}
//         <View style={styles.card}>
//           <View style={styles.doctorHeader}>
//             <Text style={styles.sectionTitle}>Doctors ({doctors.length})</Text>
//             <TouchableOpacity
//               style={styles.addDocBtn}
//               onPress={() => setShowAddDoctor(true)}
//             >
//               <Ionicons name="add" size={18} color="#fff" />
//               <Text style={styles.addDocBtnText}>Add Doctor</Text>
//             </TouchableOpacity>
//           </View>

//           {doctors.length === 0 ? (
//             <View style={styles.emptyDocs}>
//               <Ionicons name="person-add-outline" size={32} color={COLORS.muted} />
//               <Text style={styles.emptyDocsText}>No doctors added yet.</Text>
//               <Text style={styles.emptyDocsSub}>
//                 Add doctors so patients can book appointments.
//               </Text>
//             </View>
//           ) : (
//             doctors.map((doc) => (
//               <View key={doc.id || doc.name} style={styles.doctorRow}>
//                 <View style={styles.doctorAvatar}>
//                   <Ionicons name="person" size={22} color={COLORS.staff} />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.doctorName}>Dr. {doc.name}</Text>
//                   <Text style={styles.doctorDept}>{doc.department}</Text>
//                   {doc.qualification ? (
//                     <Text style={styles.doctorMeta}>{doc.qualification}</Text>
//                   ) : null}
//                 </View>
//                 <View style={styles.doctorRight}>
//                   <Text style={styles.doctorFee}>₹{doc.fee}</Text>
//                   <TouchableOpacity onPress={() => handleDeleteDoctor(doc)}>
//                     <Ionicons name="trash-outline" size={18} color={COLORS.danger || "#EF4444"} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))
//           )}
//         </View>

//         {/* ── LOGOUT ── */}
//         <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//           <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
//           <Text style={styles.logoutText}>Logout</Text>
//         </TouchableOpacity>

//         <View style={{ height: 40 }} />
//       </ScrollView>

//       {/* ── ADD DOCTOR MODAL ── */}
//       <Modal
//         visible={showAddDoctor}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowAddDoctor(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <MotiView
//             from={{ opacity: 0, translateY: 60 }}
//             animate={{ opacity: 1, translateY: 0 }}
//             transition={{ type: "spring", duration: 400 }}
//             style={styles.modalCard}
//           >
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Add New Doctor</Text>
//               <Pressable onPress={() => setShowAddDoctor(false)}>
//                 <Ionicons name="close" size={24} color={COLORS.muted} />
//               </Pressable>
//             </View>

//             <Text style={styles.inputLabel}>Doctor Name *</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder="e.g. Dr. Ravi Kumar"
//               value={newDoc.name}
//               onChangeText={(v) => setNewDoc((p) => ({ ...p, name: v }))}
//               placeholderTextColor={COLORS.muted}
//             />

//             <Text style={styles.inputLabel}>Department *</Text>
//             <View style={styles.pickerWrap}>
//               <Picker
//                 selectedValue={newDoc.department}
//                 onValueChange={(v) => setNewDoc((p) => ({ ...p, department: v }))}
//                 style={styles.picker}
//               >
//                 {MEDICAL_DEPARTMENTS.map((dept) => (
//                   <Picker.Item key={dept} label={dept} value={dept} />
//                 ))}
//               </Picker>
//             </View>

//             <Text style={styles.inputLabel}>Qualification</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder="e.g. MBBS, MD Cardiology"
//               value={newDoc.qualification}
//               onChangeText={(v) => setNewDoc((p) => ({ ...p, qualification: v }))}
//               placeholderTextColor={COLORS.muted}
//             />

//             <Text style={styles.inputLabel}>Consultation Fee (₹) *</Text>
//             <TextInput
//               style={styles.modalInput}
//               placeholder="e.g. 500"
//               value={newDoc.fee}
//               onChangeText={(v) => setNewDoc((p) => ({ ...p, fee: v }))}
//               keyboardType="number-pad"
//               placeholderTextColor={COLORS.muted}
//             />

//             <TouchableOpacity
//               style={styles.modalSaveBtn}
//               onPress={handleAddDoctor}
//               disabled={isSaving}
//             >
//               {isSaving ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.modalSaveBtnText}>Save Doctor</Text>
//               )}
//             </TouchableOpacity>
//           </MotiView>
//         </View>
//       </Modal>

//       {/* ── SUCCESS POPUP ── */}
//       <Modal visible={successPopup} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.successCard}>
//             <Ionicons name="checkmark-circle" size={60} color={COLORS.staff} />
//             <Text style={styles.successTitle}>Profile Updated!</Text>
//             <Text style={styles.successSub}>
//               Your hospital details have been saved successfully.
//             </Text>
//             <Pressable style={styles.okBtn} onPress={() => setSuccessPopup(false)}>
//               <Text style={styles.okBtnText}>OK</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// // ── InfoField component ────────────────────────────────────────────────────────
// function InfoField({ label, icon, value, edit, onChangeText, placeholder, keyboardType }) {
//   return (
//     <View style={infoStyles.row}>
//       <Ionicons name={icon} size={18} color={COLORS.staff} style={infoStyles.icon} />
//       <View style={{ flex: 1 }}>
//         <Text style={infoStyles.label}>{label}</Text>
//         {edit ? (
//           <TextInput
//             style={infoStyles.input}
//             value={value}
//             onChangeText={onChangeText}
//             placeholder={placeholder || label}
//             placeholderTextColor={COLORS.muted}
//             keyboardType={keyboardType || "default"}
//           />
//         ) : (
//           <Text style={infoStyles.value}>{value || "—"}</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: COLORS.background },
//   container:   { flex: 1 },

//   heroCard: {
//     height: 240,
//     marginHorizontal: 18,
//     marginTop: 52,
//     borderRadius: 28,
//     overflow: "hidden",
//     elevation: 5,
//   },
//   hospitalImage: { width: "100%", height: "100%", resizeMode: "cover" },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.45)",
//   },
//   cameraBadge: {
//     position: "absolute", top: 14, right: 14,
//     flexDirection: "row", alignItems: "center", gap: 6,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
//   },
//   cameraText: { color: "#fff", fontWeight: "800", fontSize: 13 },
//   heroContent: {
//     position: "absolute", bottom: 20, left: 20,
//   },
//   hospitalName: { color: "#fff", fontSize: 22, fontWeight: "900" },
//   hospitalSub:  { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
//   heroInput: {
//     color: "#fff", fontSize: 20, fontWeight: "900",
//     borderBottomWidth: 1, borderBottomColor: "#fff", paddingVertical: 2, minWidth: 200,
//   },
//   statusChip: {
//     marginTop: 10, flexDirection: "row", alignItems: "center", gap: 6,
//     backgroundColor: COLORS.staff,
//     paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
//     alignSelf: "flex-start",
//   },
//   statusText: { color: "#fff", fontSize: 12, fontWeight: "800" },

//   editRow: { paddingHorizontal: 18, marginTop: 14, marginBottom: 4 },
//   editBtn: {
//     flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-end",
//     backgroundColor: "#ECFDF5", paddingHorizontal: 16, paddingVertical: 8,
//     borderRadius: 20, borderWidth: 1, borderColor: COLORS.staff,
//   },
//   editBtnText: { color: COLORS.staff, fontWeight: "800" },
//   editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
//   cancelBtn: {
//     paddingHorizontal: 20, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.background,
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
//   saveBtn: {
//     paddingHorizontal: 24, paddingVertical: 10,
//     borderRadius: 14, backgroundColor: COLORS.staff,
//     minWidth: 120, alignItems: "center",
//   },
//   saveBtnText: { color: "#fff", fontWeight: "900" },

//   card: {
//     marginHorizontal: 18, marginBottom: 16,
//     backgroundColor: COLORS.card, borderRadius: 24,
//     padding: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14 },

//   doctorHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
//   addDocBtn: {
//     flexDirection: "row", alignItems: "center", gap: 4,
//     backgroundColor: COLORS.staff, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14,
//   },
//   addDocBtnText: { color: "#fff", fontWeight: "800", fontSize: 13 },

//   emptyDocs: { alignItems: "center", paddingVertical: 20 },
//   emptyDocsText: { color: COLORS.text, fontWeight: "800", marginTop: 10, fontSize: 15 },
//   emptyDocsSub: { color: COLORS.muted, textAlign: "center", marginTop: 4, fontSize: 13 },

//   doctorRow: {
//     flexDirection: "row", alignItems: "center", gap: 12,
//     paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   doctorAvatar: {
//     width: 44, height: 44, borderRadius: 14,
//     backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center",
//   },
//   doctorName:  { fontWeight: "800", color: COLORS.text, fontSize: 15 },
//   doctorDept:  { color: COLORS.staff, fontSize: 13, marginTop: 2 },
//   doctorMeta:  { color: COLORS.muted, fontSize: 12, marginTop: 1 },
//   doctorRight: { alignItems: "flex-end", gap: 6 },
//   doctorFee:   { fontWeight: "900", color: COLORS.text, fontSize: 15 },

//   logoutBtn: {
//     marginHorizontal: 18, marginBottom: 12, height: 52,
//     borderRadius: 18, backgroundColor: "#FEF2F2",
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     borderWidth: 1, borderColor: "#FECACA",
//   },
//   logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },

//   // Modal
//   modalOverlay: {
//     flex: 1, backgroundColor: "rgba(15,23,42,0.55)",
//     justifyContent: "flex-end",
//   },
//   modalCard: {
//     backgroundColor: COLORS.card, borderTopLeftRadius: 30, borderTopRightRadius: 30,
//     padding: 24, paddingBottom: 40,
//   },
//   modalHeader: {
//     flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
//   },
//   modalTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   inputLabel: { fontSize: 13, color: COLORS.muted, fontWeight: "700", marginBottom: 6, marginTop: 12 },
//   modalInput: {
//     backgroundColor: COLORS.background, borderRadius: 14, padding: 14,
//     fontSize: 15, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border,
//   },
//   pickerWrap: {
//     backgroundColor: COLORS.background, borderRadius: 14,
//     borderWidth: 1, borderColor: COLORS.border, overflow: "hidden",
//   },
//   picker: { color: COLORS.text },
//   modalSaveBtn: {
//     marginTop: 22, backgroundColor: COLORS.staff, borderRadius: 16,
//     paddingVertical: 16, alignItems: "center",
//   },
//   modalSaveBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },

//   // Success popup
//   successCard: {
//     margin: 30, backgroundColor: COLORS.card, borderRadius: 28,
//     padding: 30, alignItems: "center",
//   },
//   successTitle: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 14 },
//   successSub:   { color: COLORS.muted, textAlign: "center", marginTop: 8 },
//   okBtn: {
//     marginTop: 22, backgroundColor: COLORS.staff,
//     paddingHorizontal: 40, paddingVertical: 12, borderRadius: 14,
//   },
//   okBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
// });

// const infoStyles = StyleSheet.create({
//   row: {
//     flexDirection: "row", alignItems: "flex-start", gap: 12,
//     paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
//   },
//   icon:  { marginTop: 2 },
//   label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
//   value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
//   input: {
//     fontSize: 15, fontWeight: "700", color: COLORS.text,
//     borderBottomWidth: 1, borderBottomColor: COLORS.staff, paddingVertical: 2,
//   },
// });  




































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
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchMyHospitalDetails,
  fetchDoctors,
  addDoctor,
  deleteDoctor,
  updateHospitalProfile,
} from "../../services/apiService";
import { useHospital } from "../../context/HospitalContext";

const MEDICAL_DEPARTMENTS = [
  "General OPD",
  "Cardiology",
  "Cardiothoracic Surgery",
  "Dermatology",
  "Dental / Orthodontics",
  "Diabetology & Endocrinology",
  "Emergency & Trauma",
  "ENT (Ear, Nose & Throat)",
  "Gastroenterology",
  "General Surgery",
  "Gynaecology & Obstetrics",
  "Haematology",
  "Infectious Diseases",
  "Internal Medicine",
  "Nephrology & Urology",
  "Neurology",
  "Neurosurgery",
  "Oncology",
  "Ophthalmology (Eye)",
  "Orthopaedics",
  "Paediatrics (Children)",
  "Physiotherapy & Rehabilitation",
  "Plastic & Cosmetic Surgery",
  "Psychiatry & Psychology",
  "Pulmonology (Chest & Lungs)",
  "Radiology & Imaging",
  "Rheumatology",
  "Vascular Surgery",
];

export default function StaffProfileScreen({ navigation }) {
  const { refreshDoctors } = useHospital();
  const [editMode, setEditMode]         = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading]           = useState(true);
  const [isSaving, setIsSaving]         = useState(false);
  const [doctors, setDoctors]           = useState([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);

  const [profile, setProfile] = useState({
    hospitalName: "",
    hospitalId:   "",
    hospitalType: "",
    phone:        "",
    email:        "",
    address:      "",
    city:         "",
    openingTime:  "",
    closingTime:  "",
    licenseNo:    "",
    image:        null,
    // ── Payment / Bank Details ─────────────────────
    upiId:             "",
    bankAccountName:   "",
    bankAccountNumber: "",
    bankIfsc:          "",
    bankName:          "",
    // ──────────────────────────────────────────────
  });

  const [newDoc, setNewDoc] = useState({
    name:          "",
    department:    MEDICAL_DEPARTMENTS[0],
    fee:           "",
    qualification: "",
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMyHospitalDetails();

      setProfile({
        hospitalName:      data.name             || "",
        hospitalId:        data.hospitalId       || "",
        hospitalType:      data.type             || "",
        phone:             data.phone            || "",
        email:             data.email            || "",
        address:           data.address          || "",
        city:              data.city             || "",
        openingTime:       data.openingTime      || "",
        closingTime:       data.closingTime      || "",
        licenseNo:         data.licenseNumber    || "",
        image:             data.imageUrl         || null,
        // ── Bank details from backend ──────────────
        upiId:             data.upiId            || "",
        bankAccountName:   data.bankAccountName  || "",
        bankAccountNumber: data.bankAccountNumber|| "",
        bankIfsc:          data.bankIfsc         || "",
        bankName:          data.bankName         || "",
        // ───────────────────────────────────────────
      });

      if (data.hospitalId) {
        const docList = await fetchDoctors(data.hospitalId);
        setDoctors(Array.isArray(docList) ? docList : []);
      }
    } catch (err) {
      console.log("StaffProfile loadData error:", err.message);
      const storedName  = await AsyncStorage.getItem("hospitalName");
      const storedId    = await AsyncStorage.getItem("hospitalId");
      const storedEmail = await AsyncStorage.getItem("hospitalEmail");
      if (storedName) {
        setProfile((prev) => ({
          ...prev,
          hospitalName: storedName  || "",
          hospitalId:   storedId    || "",
          email:        storedEmail || "",
        }));
      } else {
        Alert.alert("Connection Error", "Failed to load hospital data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const updateField = (key, value) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

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
      aspect: [16, 9],
    });
    if (!result.canceled) updateField("image", result.assets[0].uri);
  };

  const saveProfile = async () => {
    if (!profile.hospitalName.trim()) {
      Alert.alert("Error", "Hospital name is required.");
      return;
    }
    // Basic IFSC validation if filled
    if (profile.bankIfsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(profile.bankIfsc.toUpperCase())) {
      Alert.alert("Invalid IFSC", "Please enter a valid IFSC code (e.g. SBIN0001234).");
      return;
    }
    setIsSaving(true);
    try {
      await updateHospitalProfile({
        name:        profile.hospitalName,
        phone:       profile.phone,
        address:     profile.address,
        city:        profile.city,
        openingTime: profile.openingTime,
        closingTime: profile.closingTime,
        // ── Bank details ──────────────────────────
        upiId:             profile.upiId,
        bankAccountName:   profile.bankAccountName,
        bankAccountNumber: profile.bankAccountNumber,
        bankIfsc:          profile.bankIfsc.toUpperCase(),
        bankName:          profile.bankName,
        // ─────────────────────────────────────────
      });
      setEditMode(false);
      setSuccessPopup(true);
    } catch (err) {
      Alert.alert("Error", err.message || "Update failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDoctor = async () => {
    if (!newDoc.name.trim() || !newDoc.department || !newDoc.fee.trim()) {
      Alert.alert("Incomplete", "Please fill doctor name, department and fee.");
      return;
    }
    setIsSaving(true);
    try {
      const hId = await AsyncStorage.getItem("hospitalId") || profile.hospitalId;
      if (!hId) {
        Alert.alert("Error", "Hospital ID not found. Please log in again.");
        return;
      }
      const doctorPayload = {
        name:          newDoc.name.trim(),
        department:    newDoc.department,
        fee:           parseFloat(newDoc.fee),
        qualification: newDoc.qualification.trim(),
        hospitalId:    hId,
        available:     true,
        timingsJson:   JSON.stringify({
          morning:   { label: "Morning",   enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
          afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
          night:     { label: "Night",     enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
        }),
      };
      const saved = await addDoctor(doctorPayload);
      setDoctors((prev) => [...prev, saved]);
      if (hId) refreshDoctors(hId);
      setNewDoc({ name: "", department: MEDICAL_DEPARTMENTS[0], fee: "", qualification: "" });
      setShowAddDoctor(false);
      Alert.alert("Success", "Doctor added and linked to your hospital!");
    } catch (err) {
      Alert.alert("Error", err.message || "Could not save doctor.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDoctor = (doc) => {
    Alert.alert(
      "Delete Doctor",
      `Remove Dr. ${doc.name} from the hospital?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoctor(doc.id);
              setDoctors((prev) => prev.filter((d) => d.id !== doc.id));
              if (profile.hospitalId) refreshDoctors(profile.hospitalId);
            } catch (err) {
              Alert.alert("Error", err.message || "Delete failed.");
            }
          },
        },
      ]
    );
  };

  const logout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
    );
  };

  if (loading) {
    return (
      <View style={[styles.mainWrapper, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.staff} />
      </View>
    );
  }

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── HERO IMAGE CARD ── */}
        <View style={styles.heroCard}>
          <TouchableOpacity
            disabled={!editMode}
            onPress={pickImage}
            style={{ flex: 1 }}
            activeOpacity={0.85}
          >
            <Image
              source={{ uri: profile.image || "https://via.placeholder.com/900x400?text=Hospital" }}
              style={styles.hospitalImage}
            />
            <View style={styles.overlay} />
            {editMode && (
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={18} color="#fff" />
                <Text style={styles.cameraText}>Change Photo</Text>
              </View>
            )}
            <View style={styles.heroContent}>
              {editMode ? (
                <TextInput
                  value={profile.hospitalName}
                  onChangeText={(v) => updateField("hospitalName", v)}
                  style={styles.heroInput}
                  placeholder="Hospital Name"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
              ) : (
                <>
                  <Text style={styles.hospitalName}>{profile.hospitalName || "Hospital"}</Text>
                  <Text style={styles.hospitalSub}>ID: {profile.hospitalId}</Text>
                </>
              )}
              <View style={styles.statusChip}>
                <Ionicons name="checkmark-circle" size={16} color="#fff" />
                <Text style={styles.statusText}>Live on Patient App</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── EDIT / SAVE BUTTONS ── */}
        <View style={styles.editRow}>
          {!editMode ? (
            <TouchableOpacity style={styles.editBtn} onPress={() => setEditMode(true)}>
              <Ionicons name="pencil-outline" size={16} color={COLORS.staff} />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => { setEditMode(false); loadData(); }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveProfile}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── HOSPITAL DETAILS CARD ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Hospital Details</Text>
          <InfoField label="Hospital Type" icon="business-outline"  value={profile.hospitalType} edit={false} />
          <InfoField label="Email"         icon="mail-outline"      value={profile.email}        edit={false} />
          <InfoField label="Phone"         icon="call-outline"      value={profile.phone}
            edit={editMode} onChangeText={(v) => updateField("phone", v)} keyboardType="phone-pad" />
          <InfoField label="Address"       icon="location-outline"  value={profile.address}
            edit={editMode} onChangeText={(v) => updateField("address", v)} />
          <InfoField label="City"          icon="map-outline"       value={profile.city}
            edit={editMode} onChangeText={(v) => updateField("city", v)} />
          <InfoField label="Opening Time"  icon="time-outline"      value={profile.openingTime}
            edit={editMode} onChangeText={(v) => updateField("openingTime", v)} placeholder="e.g. 09:00 AM" />
          <InfoField label="Closing Time"  icon="time-outline"      value={profile.closingTime}
            edit={editMode} onChangeText={(v) => updateField("closingTime", v)} placeholder="e.g. 08:00 PM" />
        </View>

        {/* ── PAYMENT / BANK DETAILS CARD ── */}
        <View style={styles.card}>
          <View style={styles.paymentHeader}>
            <Ionicons name="card-outline" size={20} color={COLORS.staff} />
            <Text style={styles.sectionTitle}>Payment & Bank Details</Text>
          </View>
          <Text style={styles.paymentNote}>
            Patient payments will be tracked against your hospital. Add your bank details for records.
          </Text>

          <InfoField
            label="UPI ID"
            icon="phone-portrait-outline"
            value={profile.upiId}
            edit={editMode}
            onChangeText={(v) => updateField("upiId", v)}
            placeholder="e.g. hospital@upi"
            keyboardType="email-address"
          />
          <InfoField
            label="Bank Name"
            icon="business-outline"
            value={profile.bankName}
            edit={editMode}
            onChangeText={(v) => updateField("bankName", v)}
            placeholder="e.g. State Bank of India"
          />
          <InfoField
            label="Account Holder Name"
            icon="person-outline"
            value={profile.bankAccountName}
            edit={editMode}
            onChangeText={(v) => updateField("bankAccountName", v)}
            placeholder="Name as on bank account"
          />
          <InfoField
            label="Account Number"
            icon="lock-closed-outline"
            value={
              editMode
                ? profile.bankAccountNumber
                : profile.bankAccountNumber
                  ? "••••" + profile.bankAccountNumber.slice(-4)
                  : ""
            }
            edit={editMode}
            onChangeText={(v) => updateField("bankAccountNumber", v)}
            placeholder="Bank account number"
            keyboardType="number-pad"
          />
          <InfoField
            label="IFSC Code"
            icon="barcode-outline"
            value={profile.bankIfsc}
            edit={editMode}
            onChangeText={(v) => updateField("bankIfsc", v.toUpperCase())}
            placeholder="e.g. SBIN0001234"
            autoCapitalize="characters"
          />

          {!editMode && !profile.upiId && !profile.bankAccountNumber && (
            <TouchableOpacity
              style={styles.addBankBtn}
              onPress={() => setEditMode(true)}
            >
              <Ionicons name="add-circle-outline" size={18} color={COLORS.staff} />
              <Text style={styles.addBankBtnText}>Add Bank Details</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── DOCTOR MANAGEMENT ── */}
        <View style={styles.card}>
          <View style={styles.doctorHeader}>
            <Text style={styles.sectionTitle}>Doctors ({doctors.length})</Text>
            <TouchableOpacity
              style={styles.addDocBtn}
              onPress={() => setShowAddDoctor(true)}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addDocBtnText}>Add Doctor</Text>
            </TouchableOpacity>
          </View>

          {doctors.length === 0 ? (
            <View style={styles.emptyDocs}>
              <Ionicons name="person-add-outline" size={32} color={COLORS.muted} />
              <Text style={styles.emptyDocsText}>No doctors added yet.</Text>
              <Text style={styles.emptyDocsSub}>
                Add doctors so patients can book appointments.
              </Text>
            </View>
          ) : (
            doctors.map((doc) => (
              <View key={doc.id || doc.name} style={styles.doctorRow}>
                <View style={styles.doctorAvatar}>
                  <Ionicons name="person" size={22} color={COLORS.staff} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.doctorName}>Dr. {doc.name}</Text>
                  <Text style={styles.doctorDept}>{doc.department}</Text>
                  {doc.qualification ? (
                    <Text style={styles.doctorMeta}>{doc.qualification}</Text>
                  ) : null}
                </View>
                <View style={styles.doctorRight}>
                  <Text style={styles.doctorFee}>₹{doc.fee}</Text>
                  <TouchableOpacity onPress={() => handleDeleteDoctor(doc)}>
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger || "#EF4444"} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ── LOGOUT ── */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger || "#EF4444"} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── ADD DOCTOR MODAL ── */}
      <Modal
        visible={showAddDoctor}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddDoctor(false)}
      >
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 400 }}
            style={styles.modalCard}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Doctor</Text>
              <Pressable onPress={() => setShowAddDoctor(false)}>
                <Ionicons name="close" size={24} color={COLORS.muted} />
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>Doctor Name *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Dr. Ravi Kumar"
              value={newDoc.name}
              onChangeText={(v) => setNewDoc((p) => ({ ...p, name: v }))}
              placeholderTextColor={COLORS.muted}
            />

            <Text style={styles.inputLabel}>Department *</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={newDoc.department}
                onValueChange={(v) => setNewDoc((p) => ({ ...p, department: v }))}
                style={styles.picker}
              >
                {MEDICAL_DEPARTMENTS.map((dept) => (
                  <Picker.Item key={dept} label={dept} value={dept} />
                ))}
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Qualification</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. MBBS, MD Cardiology"
              value={newDoc.qualification}
              onChangeText={(v) => setNewDoc((p) => ({ ...p, qualification: v }))}
              placeholderTextColor={COLORS.muted}
            />

            <Text style={styles.inputLabel}>Consultation Fee (₹) *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 500"
              value={newDoc.fee}
              onChangeText={(v) => setNewDoc((p) => ({ ...p, fee: v }))}
              keyboardType="number-pad"
              placeholderTextColor={COLORS.muted}
            />

            <TouchableOpacity
              style={styles.modalSaveBtn}
              onPress={handleAddDoctor}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalSaveBtnText}>Save Doctor</Text>
              )}
            </TouchableOpacity>
          </MotiView>
        </View>
      </Modal>

      {/* ── SUCCESS POPUP ── */}
      <Modal visible={successPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Ionicons name="checkmark-circle" size={60} color={COLORS.staff} />
            <Text style={styles.successTitle}>Profile Updated!</Text>
            <Text style={styles.successSub}>
              Your hospital details have been saved successfully.
            </Text>
            <Pressable style={styles.okBtn} onPress={() => setSuccessPopup(false)}>
              <Text style={styles.okBtnText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ── InfoField component ───────────────────────────────────────────────────────
function InfoField({ label, icon, value, edit, onChangeText, placeholder, keyboardType, autoCapitalize }) {
  return (
    <View style={infoStyles.row}>
      <Ionicons name={icon} size={18} color={COLORS.staff} style={infoStyles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={infoStyles.label}>{label}</Text>
        {edit ? (
          <TextInput
            style={infoStyles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || label}
            placeholderTextColor={COLORS.muted}
            keyboardType={keyboardType || "default"}
            autoCapitalize={autoCapitalize || "sentences"}
          />
        ) : (
          <Text style={infoStyles.value}>{value || "—"}</Text>
        )}
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.background },
  container:   { flex: 1 },

  heroCard: {
    height: 240,
    marginHorizontal: 18,
    marginTop: 52,
    borderRadius: 28,
    overflow: "hidden",
    elevation: 5,
  },
  hospitalImage: { width: "100%", height: "100%", resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  cameraBadge: {
    position: "absolute", top: 14, right: 14,
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  cameraText: { color: "#fff", fontWeight: "800", fontSize: 13 },
  heroContent: {
    position: "absolute", bottom: 20, left: 20,
  },
  hospitalName: { color: "#fff", fontSize: 22, fontWeight: "900" },
  hospitalSub:  { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
  heroInput: {
    color: "#fff", fontSize: 20, fontWeight: "900",
    borderBottomWidth: 1, borderBottomColor: "#fff", paddingVertical: 2, minWidth: 200,
  },
  statusChip: {
    marginTop: 10, flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: COLORS.staff,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "800" },

  editRow: { paddingHorizontal: 18, marginTop: 14, marginBottom: 4 },
  editBtn: {
    flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-end",
    backgroundColor: "#ECFDF5", paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: COLORS.staff,
  },
  editBtnText: { color: COLORS.staff, fontWeight: "800" },
  editActionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  cancelBtn: {
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 14, backgroundColor: COLORS.background,
    borderWidth: 1, borderColor: COLORS.border,
  },
  cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
  saveBtn: {
    paddingHorizontal: 24, paddingVertical: 10,
    borderRadius: 14, backgroundColor: COLORS.staff,
    minWidth: 120, alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "900" },

  card: {
    marginHorizontal: 18, marginBottom: 16,
    backgroundColor: COLORS.card, borderRadius: 24,
    padding: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14 },

  // ── Payment card styles ──
  paymentHeader: {
    flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6,
  },
  paymentNote: {
    color: COLORS.muted, fontSize: 12, fontWeight: "600",
    marginBottom: 14, lineHeight: 18,
  },
  addBankBtn: {
    flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14,
    paddingVertical: 10, justifyContent: "center",
    backgroundColor: "#ECFDF5", borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.staff,
  },
  addBankBtnText: { color: COLORS.staff, fontWeight: "800" },

  doctorHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  addDocBtn: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: COLORS.staff, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14,
  },
  addDocBtnText: { color: "#fff", fontWeight: "800", fontSize: 13 },

  emptyDocs: { alignItems: "center", paddingVertical: 20 },
  emptyDocsText: { color: COLORS.text, fontWeight: "800", marginTop: 10, fontSize: 15 },
  emptyDocsSub: { color: COLORS.muted, textAlign: "center", marginTop: 4, fontSize: 13 },

  doctorRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  doctorAvatar: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center",
  },
  doctorName:  { fontWeight: "800", color: COLORS.text, fontSize: 15 },
  doctorDept:  { color: COLORS.staff, fontSize: 13, marginTop: 2 },
  doctorMeta:  { color: COLORS.muted, fontSize: 12, marginTop: 1 },
  doctorRight: { alignItems: "flex-end", gap: 6 },
  doctorFee:   { fontWeight: "900", color: COLORS.text, fontSize: 15 },

  logoutBtn: {
    marginHorizontal: 18, marginBottom: 12, height: 52,
    borderRadius: 18, backgroundColor: "#FEF2F2",
    alignItems: "center", justifyContent: "center",
    flexDirection: "row", gap: 8,
    borderWidth: 1, borderColor: "#FECACA",
  },
  logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },

  modalOverlay: {
    flex: 1, backgroundColor: "rgba(15,23,42,0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.card, borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 24, paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text },
  inputLabel: { fontSize: 13, color: COLORS.muted, fontWeight: "700", marginBottom: 6, marginTop: 12 },
  modalInput: {
    backgroundColor: COLORS.background, borderRadius: 14, padding: 14,
    fontSize: 15, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border,
  },
  pickerWrap: {
    backgroundColor: COLORS.background, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.border, overflow: "hidden",
  },
  picker: { color: COLORS.text },
  modalSaveBtn: {
    marginTop: 22, backgroundColor: COLORS.staff, borderRadius: 16,
    paddingVertical: 16, alignItems: "center",
  },
  modalSaveBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  successCard: {
    margin: 30, backgroundColor: COLORS.card, borderRadius: 28,
    padding: 30, alignItems: "center",
  },
  successTitle: { fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 14 },
  successSub:   { color: COLORS.muted, textAlign: "center", marginTop: 8 },
  okBtn: {
    marginTop: 22, backgroundColor: COLORS.staff,
    paddingHorizontal: 40, paddingVertical: 12, borderRadius: 14,
  },
  okBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "flex-start", gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  icon:  { marginTop: 2 },
  label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
  value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  input: {
    fontSize: 15, fontWeight: "700", color: COLORS.text,
    borderBottomWidth: 1, borderBottomColor: COLORS.staff, paddingVertical: 2,
  },
});