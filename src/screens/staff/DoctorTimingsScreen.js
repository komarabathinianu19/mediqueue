// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";

// const SLOT_KEYS = ["morning", "afternoon", "night"];

// export default function DoctorTimingsScreen() {
//   const { hospitals, updateDoctorTimings } = useHospital();

//   // For demo staff hospital
//   const hospital = hospitals.find((h) => h.id === "h1") || hospitals[0];

//   const doctors = hospital?.doctorList || [];

//   const [selectedDoctorId, setSelectedDoctorId] = useState(
//     doctors[0]?.id || ""
//   );

//   const selectedDoctor =
//     doctors.find((doctor) => doctor.id === selectedDoctorId) || doctors[0];

//   const [timings, setTimings] = useState(
//     selectedDoctor?.timings || {
//       morning: {
//         label: "Morning",
//         enabled: true,
//         startTime: "09:00 AM",
//         endTime: "12:00 PM",
//         maxPatients: 30,
//       },
//       afternoon: {
//         label: "Afternoon",
//         enabled: true,
//         startTime: "01:00 PM",
//         endTime: "04:00 PM",
//         maxPatients: 25,
//       },
//       night: {
//         label: "Night",
//         enabled: true,
//         startTime: "06:00 PM",
//         endTime: "09:00 PM",
//         maxPatients: 20,
//       },
//     }
//   );

//   const selectDoctor = (doctor) => {
//     setSelectedDoctorId(doctor.id);
//     setTimings(doctor.timings);
//   };

//   const updateSlot = (slotKey, field, value) => {
//     setTimings((prev) => ({
//       ...prev,
//       [slotKey]: {
//         ...prev[slotKey],
//         [field]: field === "maxPatients" ? Number(value) || 0 : value,
//       },
//     }));
//   };

//   const toggleSlot = (slotKey) => {
//     setTimings((prev) => ({
//       ...prev,
//       [slotKey]: {
//         ...prev[slotKey],
//         enabled: !prev[slotKey]?.enabled,
//       },
//     }));
//   };

//   const saveTimings = () => {
//     if (!hospital?.id || !selectedDoctor?.id) {
//       Alert.alert("Missing Doctor", "Please select a doctor first.");
//       return;
//     }

//     updateDoctorTimings(hospital.id, selectedDoctor.id, timings);

//     Alert.alert(
//       "Timings Updated",
//       `${selectedDoctor.name} timings saved successfully.`
//     );
//   };

//   if (!hospital || doctors.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="medkit-outline" size={50} color={COLORS.muted} />
//         <Text style={styles.emptyTitle}>No doctors found</Text>
//         <Text style={styles.emptySub}>
//           Add doctors first, then staff can mention timings.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Doctor Timings</Text>
//           <Text style={styles.sub}>Set morning, afternoon and night slots</Text>
//         </View>

//         <View style={styles.headerIcon}>
//           <Ionicons name="time-outline" size={24} color={COLORS.staff} />
//         </View>
//       </View>

//       <Text style={styles.sectionTitle}>Select Doctor</Text>

//       {doctors.map((doctor) => {
//         const active = selectedDoctorId === doctor.id;

//         return (
//           <TouchableOpacity
//             key={doctor.id}
//             style={[styles.doctorCard, active && styles.activeDoctorCard]}
//             onPress={() => selectDoctor(doctor)}
//           >
//             <View style={styles.doctorIcon}>
//               <Ionicons
//                 name="medkit-outline"
//                 size={22}
//                 color={active ? "#fff" : COLORS.staff}
//               />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={[styles.doctorName, active && { color: "#fff" }]}>
//                 {doctor.name}
//               </Text>

//               <Text
//                 style={[
//                   styles.doctorSub,
//                   active && { color: "rgba(255,255,255,0.85)" },
//                 ]}
//               >
//                 {doctor.department} • ₹{doctor.fee || 500}
//               </Text>
//             </View>

//             {active && (
//               <Ionicons name="checkmark-circle" size={24} color="#fff" />
//             )}
//           </TouchableOpacity>
//         );
//       })}

//       <Text style={styles.sectionTitle}>Set Timings</Text>

//       {SLOT_KEYS.map((slotKey) => {
//         const slot = timings[slotKey];
//         const enabled = slot?.enabled;

//         return (
//           <View key={slotKey} style={styles.slotCard}>
//             <View style={styles.slotHeader}>
//               <View style={styles.slotTitleRow}>
//                 <View style={styles.slotIcon}>
//                   <Ionicons
//                     name={
//                       slotKey === "morning"
//                         ? "sunny-outline"
//                         : slotKey === "afternoon"
//                         ? "partly-sunny-outline"
//                         : "moon-outline"
//                     }
//                     size={22}
//                     color={COLORS.staff}
//                   />
//                 </View>

//                 <View>
//                   <Text style={styles.slotTitle}>{slot?.label}</Text>
//                   <Text style={styles.slotSub}>
//                     {enabled ? "Available for booking" : "Disabled"}
//                   </Text>
//                 </View>
//               </View>

//               <TouchableOpacity
//                 style={[styles.toggleBtn, enabled && styles.activeToggleBtn]}
//                 onPress={() => toggleSlot(slotKey)}
//               >
//                 <Text
//                   style={[
//                     styles.toggleText,
//                     enabled && styles.activeToggleText,
//                   ]}
//                 >
//                   {enabled ? "ON" : "OFF"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputRow}>
//               <Input
//                 label="Start Time"
//                 value={slot?.startTime}
//                 onChangeText={(value) =>
//                   updateSlot(slotKey, "startTime", value)
//                 }
//                 placeholder="09:00 AM"
//               />

//               <Input
//                 label="End Time"
//                 value={slot?.endTime}
//                 onChangeText={(value) => updateSlot(slotKey, "endTime", value)}
//                 placeholder="12:00 PM"
//               />
//             </View>

//             <Input
//               label="Max Patients"
//               value={String(slot?.maxPatients || "")}
//               onChangeText={(value) => updateSlot(slotKey, "maxPatients", value)}
//               placeholder="30"
//               keyboardType="numeric"
//             />
//           </View>
//         );
//       })}

//       <TouchableOpacity style={styles.saveBtn} onPress={saveTimings}>
//         <Ionicons name="save-outline" size={20} color="#fff" />
//         <Text style={styles.saveText}>Save Doctor Timings</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function Input({ label, value, onChangeText, placeholder, keyboardType }) {
//   return (
//     <View style={styles.inputBox}>
//       <Text style={styles.label}>{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor={COLORS.muted}
//         keyboardType={keyboardType}
//         style={styles.input}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   header: {
//     marginTop: 52,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 12,
//     marginBottom: 12,
//   },

//   doctorCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   activeDoctorCard: {
//     backgroundColor: COLORS.staff,
//     borderColor: COLORS.staff,
//   },

//   doctorIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   doctorSub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   slotCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   slotHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 14,
//   },

//   slotTitleRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     flex: 1,
//   },

//   slotIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   slotTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   slotSub: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     fontSize: 12,
//     marginTop: 4,
//   },

//   toggleBtn: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 999,
//     backgroundColor: "#FEF2F2",
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },

//   activeToggleBtn: {
//     backgroundColor: "#ECFDF5",
//     borderColor: "#BBF7D0",
//   },

//   toggleText: {
//     color: COLORS.danger,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   activeToggleText: {
//     color: COLORS.staff,
//   },

//   inputRow: {
//     flexDirection: "row",
//     gap: 10,
//   },

//   inputBox: {
//     flex: 1,
//     marginBottom: 12,
//   },

//   label: {
//     color: COLORS.text,
//     fontWeight: "800",
//     marginBottom: 8,
//     fontSize: 12,
//   },

//   input: {
//     height: 50,
//     backgroundColor: COLORS.background,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingHorizontal: 14,
//     color: COLORS.text,
//     fontWeight: "700",
//   },

//   saveBtn: {
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 10,
//     marginBottom: 34,
//   },

//   saveText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 12,
//     color: COLORS.text,
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   emptySub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     textAlign: "center",
//     fontWeight: "700",
//   },
// });   






























// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";

// const SLOT_KEYS = ["morning", "afternoon", "night"];

// export default function DoctorTimingsScreen() {
//   const { staffHospitalData, updateDoctorTimings } = useHospital();
//   const [loading, setLoading] = useState(false);

//   // Get doctors from the logged-in staff's hospital
//   const doctors = staffHospitalData?.doctorList || [];

//   const [selectedDoctorId, setSelectedDoctorId] = useState(
//     doctors[0]?.id || ""
//   );

//   const selectedDoctor =
//     doctors.find((doctor) => doctor.id === selectedDoctorId) || doctors[0];

//   // Local state for the form inputs
//   const [timings, setTimings] = useState({});

//   // // Sync local state when selected doctor changes
//   // useEffect(() => {
//   //   if (selectedDoctor?.timings) {
//   //     setTimings(selectedDoctor.timings);
//   //   } else {
//   //     // Default fallback if no timings exist yet
//   //     setTimings({
//   //       morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
//   //       afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
//   //       night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
//   //     });
//   //   }
//   // }, [selectedDoctorId, selectedDoctor]);


// useEffect(() => {
//   // Check if the doctor has the JSON string
//   if (selectedDoctor?.timingsJson) {
//     try {
//       // Parse the String back into a Javascript Object for the form
//       const savedTimings = JSON.parse(selectedDoctor.timingsJson);
//       setTimings(savedTimings);
//     } catch (e) {
//       console.log("Parsing error:", e);
//     }
//   } else {
//     // Default fallback if brand new
//     setTimings({
//       morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
//       afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
//       night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
//     });
//   }
// }, [selectedDoctorId, selectedDoctor]);


//   const updateSlot = (slotKey, field, value) => {
//     setTimings((prev) => ({
//       ...prev,
//       [slotKey]: {
//         ...prev[slotKey],
//         [field]: field === "maxPatients" ? Number(value) || 0 : value,
//       },
//     }));
//   };

//   const toggleSlot = (slotKey) => {
//     setTimings((prev) => ({
//       ...prev,
//       [slotKey]: {
//         ...prev[slotKey],
//         enabled: !prev[slotKey]?.enabled,
//       },
//     }));
//   };


  
//   const saveTimings = async () => {
//     if (!staffHospitalData?.hospitalId || !selectedDoctor?.id) {
//       Alert.alert("Error", "Required data missing to save timings.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // This calls the context method which should handle the API/MySQL update
//       await updateDoctorTimings(staffHospitalData.hospitalId, selectedDoctor.id, timings);
      
//       Alert.alert(
//         "Success",
//         `${selectedDoctor.name}'s schedule has been updated for patients.`
//       );
//     } catch (error) {
//       Alert.alert("Update Failed", "Could not save timings to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!staffHospitalData || doctors.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="medkit-outline" size={50} color={COLORS.muted} />
//         <Text style={styles.emptyTitle}>No Doctors Assigned</Text>
//         <Text style={styles.emptySub}>
//           Assign doctors to {staffHospitalData?.name || 'your hospital'} to manage their slots.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Doctor Timings</Text>
//           <Text style={styles.sub}>Manage booking availability</Text>
//         </View>
//         <View style={styles.headerIcon}>
//           <Ionicons name="time-outline" size={24} color={COLORS.staff} />
//         </View>
//       </View>

//       <Text style={styles.sectionTitle}>Select Doctor</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10}}>
//         {doctors.map((doctor) => {
//             const active = selectedDoctorId === doctor.id;
//             return (
//               <TouchableOpacity
//                 key={doctor.id}
//                 style={[styles.miniDoctorChip, active && styles.activeChip]}
//                 onPress={() => setSelectedDoctorId(doctor.id)}
//               >
//                 <Text style={[styles.chipText, active && {color: '#fff'}]}>{doctor.name}</Text>
//               </TouchableOpacity>
//             );
//         })}
//       </ScrollView>

//       {/* Main Form Area */}
//       <View style={styles.focusCard}>
//           <Text style={styles.focusName}>{selectedDoctor?.name}</Text>
//           <Text style={styles.focusSub}>{selectedDoctor?.department}</Text>
//       </View>

//       {SLOT_KEYS.map((slotKey) => {
//         const slot = timings[slotKey];
//         const enabled = slot?.enabled;

//         return (
//           <View key={slotKey} style={[styles.slotCard, !enabled && {opacity: 0.7}]}>
//             <View style={styles.slotHeader}>
//               <View style={styles.slotTitleRow}>
//                 <Ionicons
//                   name={slotKey === "morning" ? "sunny" : slotKey === "afternoon" ? "partly-sunny" : "moon"}
//                   size={20}
//                   color={enabled ? COLORS.staff : COLORS.muted}
//                 />
//                 <Text style={styles.slotTitle}>{slot?.label}</Text>
//               </View>

//               <TouchableOpacity
//                 style={[styles.toggleBtn, enabled && styles.activeToggleBtn]}
//                 onPress={() => toggleSlot(slotKey)}
//               >
//                 <Text style={[styles.toggleText, enabled && styles.activeToggleText]}>
//                   {enabled ? "ACTIVE" : "PAUSED"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputRow}>
//               <Input
//                 label="Start"
//                 value={slot?.startTime}
//                 onChangeText={(v) => updateSlot(slotKey, "startTime", v)}
//                 placeholder="09:00 AM"
//               />
//               <Input
//                 label="End"
//                 value={slot?.endTime}
//                 onChangeText={(v) => updateSlot(slotKey, "endTime", v)}
//                 placeholder="12:00 PM"
//               />
//               <Input
//                 label="Limit"
//                 value={String(slot?.maxPatients || "")}
//                 onChangeText={(v) => updateSlot(slotKey, "maxPatients", v)}
//                 placeholder="30"
//                 keyboardType="numeric"
//               />
//             </View>
//           </View>
//         );
//       })}

//       <TouchableOpacity 
//         style={[styles.saveBtn, loading && {opacity: 0.7}]} 
//         onPress={saveTimings}
//         disabled={loading}
//       >
//         {loading ? (
//             <ActivityIndicator color="#fff" />
//         ) : (
//             <>
//                 <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
//                 <Text style={styles.saveText}>Update Schedule</Text>
//             </>
//         )}
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function Input({ label, value, onChangeText, placeholder, keyboardType }) {
//   return (
//     <View style={styles.inputBox}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor={COLORS.muted}
//         keyboardType={keyboardType}
//         style={styles.input}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
//   header: { marginTop: 52, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "600" },
//   headerIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center" },
//   sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text, marginBottom: 12 },
//   miniDoctorChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.card, marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
//   activeChip: { backgroundColor: COLORS.staff, borderColor: COLORS.staff },
//   chipText: { fontWeight: "700", color: COLORS.text, fontSize: 13 },
//   focusCard: { backgroundColor: COLORS.card, padding: 16, borderRadius: 20, marginBottom: 20, marginTop: 10, borderWidth: 1, borderColor: COLORS.border },
//   focusName: { fontSize: 18, fontWeight: "900", color: COLORS.text },
//   focusSub: { color: COLORS.staff, fontWeight: "700", fontSize: 13, marginTop: 2 },
//   slotCard: { backgroundColor: COLORS.card, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
//   slotHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
//   slotTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
//   slotTitle: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
//   toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F1F5F9" },
//   activeToggleBtn: { backgroundColor: "#DCFCE7" },
//   toggleText: { fontSize: 11, fontWeight: "900", color: COLORS.muted },
//   activeToggleText: { color: COLORS.staff },
//   inputRow: { flexDirection: "row", gap: 10 },
//   inputBox: { flex: 1 },
//   label: { color: COLORS.muted, fontWeight: "700", marginBottom: 6, fontSize: 11 },
//   input: { height: 45, backgroundColor: COLORS.background, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 10, color: COLORS.text, fontWeight: "700", fontSize: 13 },
//   saveBtn: { height: 56, borderRadius: 18, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, marginVertical: 30 },
//   saveText: { color: "#fff", fontWeight: "900", fontSize: 16 },
//   emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
//   emptyTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text, marginTop: 16 },
//   emptySub: { textAlign: "center", color: COLORS.muted, marginTop: 8, lineHeight: 20 }
// });  
































import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";
import { useFocusEffect } from "@react-navigation/native";

const SLOT_KEYS = ["morning", "afternoon", "night"];

export default function DoctorTimingsScreen() {
  const { staffHospitalData, updateDoctorTimings, refreshDoctors } = useHospital();
  const [loading, setLoading] = useState(false);

  // Refresh doctor list every time this screen is focused
  // (handles case where a doctor was just added in StaffProfileScreen)
  useFocusEffect(
    useCallback(() => {
      if (staffHospitalData?.hospitalId) {
        refreshDoctors(staffHospitalData.hospitalId);
      }
    }, [staffHospitalData?.hospitalId])
  );

  // Get doctors from the logged-in staff's hospital
  const doctors = staffHospitalData?.doctorList || [];

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctors[0]?.id || ""
  );

  const selectedDoctor =
    doctors.find((doctor) => doctor.id === selectedDoctorId) || doctors[0];

  // Local state for the form inputs
  const [timings, setTimings] = useState({});

  // // Sync local state when selected doctor changes
  // useEffect(() => {
  //   if (selectedDoctor?.timings) {
  //     setTimings(selectedDoctor.timings);
  //   } else {
  //     // Default fallback if no timings exist yet
  //     setTimings({
  //       morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
  //       afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
  //       night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
  //     });
  //   }
  // }, [selectedDoctorId, selectedDoctor]);


useEffect(() => {
  // Check if the doctor has the JSON string
  if (selectedDoctor?.timingsJson) {
    try {
      // Parse the String back into a Javascript Object for the form
      const savedTimings = JSON.parse(selectedDoctor.timingsJson);
      setTimings(savedTimings);
    } catch (e) {
      console.log("Parsing error:", e);
    }
  } else {
    // Default fallback if brand new
    setTimings({
      morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
      afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
      night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
    });
  }
}, [selectedDoctorId, selectedDoctor]);


  const updateSlot = (slotKey, field, value) => {
    setTimings((prev) => ({
      ...prev,
      [slotKey]: {
        ...prev[slotKey],
        [field]: field === "maxPatients" ? Number(value) || 0 : value,
      },
    }));
  };

  const toggleSlot = (slotKey) => {
    setTimings((prev) => ({
      ...prev,
      [slotKey]: {
        ...prev[slotKey],
        enabled: !prev[slotKey]?.enabled,
      },
    }));
  };


  
  const saveTimings = async () => {
    if (!staffHospitalData?.hospitalId || !selectedDoctor?.id) {
      Alert.alert("Error", "Required data missing to save timings.");
      return;
    }

    setLoading(true);
    try {
      // This calls the context method which should handle the API/MySQL update
      await updateDoctorTimings(staffHospitalData.hospitalId, selectedDoctor.id, timings);
      
      Alert.alert(
        "Success",
        `${selectedDoctor.name}'s schedule has been updated for patients.`
      );
    } catch (error) {
      Alert.alert("Update Failed", "Could not save timings to server.");
    } finally {
      setLoading(false);
    }
  };

  if (!staffHospitalData || doctors.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="medkit-outline" size={50} color={COLORS.muted} />
        <Text style={styles.emptyTitle}>No Doctors Assigned</Text>
        <Text style={styles.emptySub}>
          Assign doctors to {staffHospitalData?.name || 'your hospital'} to manage their slots.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Doctor Timings</Text>
          <Text style={styles.sub}>Manage booking availability</Text>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="time-outline" size={24} color={COLORS.staff} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select Doctor</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10}}>
        {doctors.map((doctor) => {
            const active = selectedDoctorId === doctor.id;
            return (
              <TouchableOpacity
                key={doctor.id}
                style={[styles.miniDoctorChip, active && styles.activeChip]}
                onPress={() => setSelectedDoctorId(doctor.id)}
              >
                <Text style={[styles.chipText, active && {color: '#fff'}]}>{doctor.name}</Text>
              </TouchableOpacity>
            );
        })}
      </ScrollView>

      {/* Main Form Area */}
      <View style={styles.focusCard}>
          <Text style={styles.focusName}>{selectedDoctor?.name}</Text>
          <Text style={styles.focusSub}>{selectedDoctor?.department}</Text>
      </View>

      {SLOT_KEYS.map((slotKey) => {
        const slot = timings[slotKey];
        const enabled = slot?.enabled;

        return (
          <View key={slotKey} style={[styles.slotCard, !enabled && {opacity: 0.7}]}>
            <View style={styles.slotHeader}>
              <View style={styles.slotTitleRow}>
                <Ionicons
                  name={slotKey === "morning" ? "sunny" : slotKey === "afternoon" ? "partly-sunny" : "moon"}
                  size={20}
                  color={enabled ? COLORS.staff : COLORS.muted}
                />
                <Text style={styles.slotTitle}>{slot?.label}</Text>
              </View>

              <TouchableOpacity
                style={[styles.toggleBtn, enabled && styles.activeToggleBtn]}
                onPress={() => toggleSlot(slotKey)}
              >
                <Text style={[styles.toggleText, enabled && styles.activeToggleText]}>
                  {enabled ? "ACTIVE" : "PAUSED"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputRow}>
              <Input
                label="Start"
                value={slot?.startTime}
                onChangeText={(v) => updateSlot(slotKey, "startTime", v)}
                placeholder="09:00 AM"
              />
              <Input
                label="End"
                value={slot?.endTime}
                onChangeText={(v) => updateSlot(slotKey, "endTime", v)}
                placeholder="12:00 PM"
              />
              <Input
                label="Limit"
                value={String(slot?.maxPatients || "")}
                onChangeText={(v) => updateSlot(slotKey, "maxPatients", v)}
                placeholder="30"
                keyboardType="numeric"
              />
            </View>
          </View>
        );
      })}

      <TouchableOpacity 
        style={[styles.saveBtn, loading && {opacity: 0.7}]} 
        onPress={saveTimings}
        disabled={loading}
      >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <>
                <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                <Text style={styles.saveText}>Update Schedule</Text>
            </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

function Input({ label, value, onChangeText, placeholder, keyboardType }) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
  header: { marginTop: 52, marginBottom: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub: { color: COLORS.muted, marginTop: 4, fontWeight: "600" },
  headerIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center" },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: COLORS.text, marginBottom: 12 },
  miniDoctorChip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: COLORS.card, marginRight: 8, borderWidth: 1, borderColor: COLORS.border },
  activeChip: { backgroundColor: COLORS.staff, borderColor: COLORS.staff },
  chipText: { fontWeight: "700", color: COLORS.text, fontSize: 13 },
  focusCard: { backgroundColor: COLORS.card, padding: 16, borderRadius: 20, marginBottom: 20, marginTop: 10, borderWidth: 1, borderColor: COLORS.border },
  focusName: { fontSize: 18, fontWeight: "900", color: COLORS.text },
  focusSub: { color: COLORS.staff, fontWeight: "700", fontSize: 13, marginTop: 2 },
  slotCard: { backgroundColor: COLORS.card, borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  slotHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  slotTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  slotTitle: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
  toggleBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: "#F1F5F9" },
  activeToggleBtn: { backgroundColor: "#DCFCE7" },
  toggleText: { fontSize: 11, fontWeight: "900", color: COLORS.muted },
  activeToggleText: { color: COLORS.staff },
  inputRow: { flexDirection: "row", gap: 10 },
  inputBox: { flex: 1 },
  label: { color: COLORS.muted, fontWeight: "700", marginBottom: 6, fontSize: 11 },
  input: { height: 45, backgroundColor: COLORS.background, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 10, color: COLORS.text, fontWeight: "700", fontSize: 13 },
  saveBtn: { height: 56, borderRadius: 18, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, marginVertical: 30 },
  saveText: { color: "#fff", fontWeight: "900", fontSize: 16 },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40 },
  emptyTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text, marginTop: 16 },
  emptySub: { textAlign: "center", color: COLORS.muted, marginTop: 8, lineHeight: 20 }
});