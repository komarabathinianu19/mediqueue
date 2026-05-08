


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
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { CommonActions } from "@react-navigation/native";

// export default function StaffProfileScre2en({ navigation }) {
//   const [editMode, setEditMode] = useState(false);

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
//     Alert.alert("Saved", "Hospital profile updated successfully.");
//   };

// const logout = () => {
//   navigation.dispatch(
//     CommonActions.reset({
//       index: 0,
//       routes: [{ name: "RoleSelect" }],
//     })
//   );
// };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.heroCard}>
//         <TouchableOpacity disabled={!editMode} onPress={pickImage} style={{ flex: 1 }}>
//           <Image source={{ uri: profile.image }} style={styles.hospitalImage} />
//           <View style={styles.overlay} />

//           {editMode && (
//             <View style={styles.cameraBadge}>
//               <Ionicons name="camera" size={18} color="#fff" />
//               <Text style={styles.cameraText}>Change Photo</Text>
//             </View>
//           )}

//           <View style={styles.heroContent}>
//             {editMode ? (
//               <>
//                 <TextInput
//                   value={profile.hospitalName}
//                   onChangeText={(v) => updateField("hospitalName", v)}
//                   style={styles.heroInput}
//                 />
//                 <TextInput
//                   value={profile.hospitalId}
//                   onChangeText={(v) => updateField("hospitalId", v)}
//                   style={styles.heroSubInput}
//                 />
//               </>
//             ) : (
//               <>
//                 <Text style={styles.hospitalName}>{profile.hospitalName}</Text>
//                 <Text style={styles.hospitalSub}>Hospital ID: {profile.hospitalId}</Text>
//               </>
//             )}

//             <View style={styles.statusChip}>
//               <Ionicons name="checkmark-circle" size={16} color="#fff" />
//               <Text style={styles.statusText}>Verified Hospital</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Hospital Details</Text>

//         <Info
//           label="Hospital Type"
//           value={profile.hospitalType}
//           icon="business-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("hospitalType", v)}
//         />
//         <Info
//           label="Phone"
//           value={profile.phone}
//           icon="call-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("phone", v)}
//         />
//         <Info
//           label="Email"
//           value={profile.email}
//           icon="mail-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("email", v)}
//         />
//         <Info
//           label="Address"
//           value={profile.address}
//           icon="location-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("address", v)}
//         />
//         <Info
//           label="License No"
//           value={profile.licenseNo}
//           icon="document-text-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("licenseNo", v)}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>OPD Settings</Text>

//         <Info
//           label="Departments"
//           value={profile.departments}
//           icon="git-branch-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("departments", v)}
//           keyboardType="numeric"
//         />
//         <Info
//           label="Doctors"
//           value={profile.doctors}
//           icon="medkit-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("doctors", v)}
//           keyboardType="numeric"
//         />
//         <Info
//           label="Opening Time"
//           value={profile.openingTime}
//           icon="time-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("openingTime", v)}
//         />
//         <Info
//           label="Closing Time"
//           value={profile.closingTime}
//           icon="moon-outline"
//           editMode={editMode}
//           onChangeText={(v) => updateField("closingTime", v)}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Staff Admin</Text>
//         <StaffMember name="Dr. Sandeep Kumar" role="General OPD Doctor" />
//         <StaffMember name="Nurse Priya" role="Queue Desk Staff" />
//         <StaffMember name="Rahul Verma" role="Reception Manager" />
//       </View>

//       <TouchableOpacity
//         style={styles.editBtn}
//         onPress={editMode ? saveProfile : () => setEditMode(true)}
//       >
//         <Ionicons name={editMode ? "save-outline" : "create-outline"} size={20} color="#fff" />
//         <Text style={styles.editText}>{editMode ? "Save Hospital Profile" : "Edit Hospital Profile"}</Text>
//       </TouchableOpacity>

//       {editMode && (
//         <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditMode(false)}>
//           <Text style={styles.cancelText}>Cancel Editing</Text>
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
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
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   heroCard: {
//     marginTop: 52,
//     height: 250,
//     borderRadius: 30,
//     overflow: "hidden",
//     backgroundColor: COLORS.card,
//     elevation: 5,
//   },

//   hospitalImage: { width: "100%", height: "100%" },

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

//   cameraText: { color: "#fff", fontWeight: "900", fontSize: 12 },

//   heroContent: {
//     position: "absolute",
//     left: 20,
//     right: 20,
//     bottom: 20,
//   },

//   hospitalName: { color: "#fff", fontSize: 25, fontWeight: "900" },

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
//     backgroundColor: COLORS.success,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 999,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   statusText: { color: "#fff", fontWeight: "900", fontSize: 12 },

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

//   label: { color: COLORS.muted, fontWeight: "800" },

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

//   staffName: { color: COLORS.text, fontWeight: "900" },

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

//   editText: { color: "#fff", fontWeight: "900", fontSize: 15 },

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

//   cancelText: { color: COLORS.muted, fontWeight: "900" },

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

//   logoutText: { color: COLORS.danger, fontWeight: "900" },
// });  


























import React, { useState } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { CommonActions } from "@react-navigation/native";

export default function StaffProfileScre2en({ navigation }) {
  const [editMode, setEditMode] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [profile, setProfile] = useState({
    hospitalName: "City Care Hospital",
    hospitalId: "HSP12456",
    hospitalType: "Multi-speciality",
    phone: "+91 98765 43210",
    email: "info@citycare.com",
    address: "Madhapur, Hyderabad",
    licenseNo: "LIC987654",
    departments: "6",
    doctors: "18",
    openingTime: "09:00 AM",
    closingTime: "08:00 PM",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
  });

  const updateField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

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

    if (!result.canceled) {
      updateField("image", result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    if (!profile.hospitalName.trim() || !profile.phone.trim()) {
      Alert.alert("Error", "Hospital name and phone number are required.");
      return;
    }

    setEditMode(false);
    setSuccessPopup(true);
  };

  const closeSuccessPopup = () => {
    setSuccessPopup(false);
  };

  const logout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "RoleSelect" }],
      })
    );
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <TouchableOpacity
            disabled={!editMode}
            onPress={pickImage}
            style={{ flex: 1 }}
            activeOpacity={0.85}
          >
            <Image source={{ uri: profile.image }} style={styles.hospitalImage} />
            <View style={styles.overlay} />

            {editMode && (
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={18} color="#fff" />
                <Text style={styles.cameraText}>Change Photo</Text>
              </View>
            )}

            <View style={styles.heroContent}>
              {editMode ? (
                <>
                  <TextInput
                    value={profile.hospitalName}
                    onChangeText={(v) => updateField("hospitalName", v)}
                    style={styles.heroInput}
                    placeholder="Hospital Name"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                  />

                  <TextInput
                    value={profile.hospitalId}
                    onChangeText={(v) => updateField("hospitalId", v)}
                    style={styles.heroSubInput}
                    placeholder="Hospital ID"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                  />
                </>
              ) : (
                <>
                  <Text style={styles.hospitalName}>{profile.hospitalName}</Text>
                  <Text style={styles.hospitalSub}>
                    Hospital ID: {profile.hospitalId}
                  </Text>
                </>
              )}

              <View style={styles.statusChip}>
                <Ionicons name="checkmark-circle" size={16} color="#fff" />
                <Text style={styles.statusText}>Verified Hospital</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Hospital Details</Text>

          <Info
            label="Hospital Type"
            value={profile.hospitalType}
            icon="business-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("hospitalType", v)}
          />

          <Info
            label="Phone"
            value={profile.phone}
            icon="call-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("phone", v)}
            keyboardType="phone-pad"
          />

          <Info
            label="Email"
            value={profile.email}
            icon="mail-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("email", v)}
            keyboardType="email-address"
          />

          <Info
            label="Address"
            value={profile.address}
            icon="location-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("address", v)}
          />

          <Info
            label="License No"
            value={profile.licenseNo}
            icon="document-text-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("licenseNo", v)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>OPD Settings</Text>

          <Info
            label="Departments"
            value={profile.departments}
            icon="git-branch-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("departments", v)}
            keyboardType="numeric"
          />

          <Info
            label="Doctors"
            value={profile.doctors}
            icon="medkit-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("doctors", v)}
            keyboardType="numeric"
          />

          <Info
            label="Opening Time"
            value={profile.openingTime}
            icon="time-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("openingTime", v)}
          />

          <Info
            label="Closing Time"
            value={profile.closingTime}
            icon="moon-outline"
            editMode={editMode}
            onChangeText={(v) => updateField("closingTime", v)}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Staff Admin</Text>
          <StaffMember name="Dr. Sandeep Kumar" role="General OPD Doctor" />
          <StaffMember name="Nurse Priya" role="Queue Desk Staff" />
          <StaffMember name="Rahul Verma" role="Reception Manager" />
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.88}
          onPress={editMode ? saveProfile : () => setEditMode(true)}
        >
          <Ionicons
            name={editMode ? "save-outline" : "create-outline"}
            size={20}
            color="#fff"
          />
          <Text style={styles.editText}>
            {editMode ? "Save Hospital Profile" : "Edit Hospital Profile"}
          </Text>
        </TouchableOpacity>

        {editMode && (
          <TouchableOpacity
            style={styles.cancelBtn}
            activeOpacity={0.85}
            onPress={() => setEditMode(false)}
          >
            <Text style={styles.cancelText}>Cancel Editing</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.85} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

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
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={58} color="#fff" />
            </View>

            <Text style={styles.successTitle}>Profile Saved</Text>

            <Text style={styles.successMessage}>
              Hospital profile has been updated successfully.
            </Text>

            <View style={styles.savedBadge}>
              <Ionicons name="business-outline" size={17} color={COLORS.staff} />
              <Text style={styles.savedBadgeText}>{profile.hospitalName}</Text>
            </View>

            <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
              <Text style={styles.successButtonText}>OK</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}

function Info({ label, value, icon, editMode, onChangeText, keyboardType }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={20} color={COLORS.staff} />
        </View>

        <Text style={styles.label}>{label}</Text>
      </View>

      {editMode ? (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={styles.inlineInput}
          placeholderTextColor={COLORS.muted}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
}

function StaffMember({ name, role }) {
  return (
    <View style={styles.staffRow}>
      <View style={styles.staffIcon}>
        <Ionicons name="person-outline" size={20} color={COLORS.staff} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.staffName}>{name}</Text>
        <Text style={styles.staffRole}>{role}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  heroCard: {
    marginTop: 52,
    height: 250,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: COLORS.card,
    elevation: 5,
  },

  hospitalImage: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  cameraBadge: {
    position: "absolute",
    top: 18,
    right: 18,
    backgroundColor: COLORS.staff,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  cameraText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
  },

  heroContent: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },

  hospitalName: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },

  hospitalSub: {
    color: "rgba(255,255,255,0.88)",
    marginTop: 6,
    fontWeight: "700",
  },

  heroInput: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.6)",
    paddingVertical: 4,
  },

  heroSubInput: {
    color: "#fff",
    fontWeight: "800",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.4)",
    paddingVertical: 4,
    marginTop: 6,
  },

  statusChip: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: COLORS.success || "#16A34A",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statusText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
  },

  card: {
    marginTop: 18,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 12,
  },

  infoRow: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    color: COLORS.muted,
    fontWeight: "800",
  },

  value: {
    color: COLORS.text,
    fontWeight: "900",
    maxWidth: "45%",
    textAlign: "right",
  },

  inlineInput: {
    width: "48%",
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    color: COLORS.text,
    fontWeight: "800",
    textAlign: "right",
    backgroundColor: COLORS.background,
  },

  staffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  staffIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  staffName: {
    color: COLORS.text,
    fontWeight: "900",
  },

  staffRole: {
    color: COLORS.muted,
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
  },

  editBtn: {
    marginTop: 20,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  editText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
  },

  cancelBtn: {
    marginTop: 14,
    height: 50,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: COLORS.muted,
    fontWeight: "900",
  },

  logoutBtn: {
    marginTop: 14,
    marginBottom: 34,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  logoutText: {
    color: COLORS.danger,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  successCard: {
    width: "100%",
    maxWidth: 390,
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

  successIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  successTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: COLORS.text || "#1E293B",
    textAlign: "center",
  },

  successMessage: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.muted || "#64748B",
    textAlign: "center",
    fontWeight: "600",
  },

  savedBadge: {
    marginTop: 18,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  savedBadgeText: {
    color: COLORS.staff,
    fontSize: 13,
    fontWeight: "900",
  },

  successButton: {
    marginTop: 24,
    width: "100%",
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
  },

  successButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
});