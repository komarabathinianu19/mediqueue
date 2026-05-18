

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
//   Linking,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import { useHospital } from "../../context/HospitalContext";

// const getTodayDate = () => new Date().toISOString().split("T")[0];

// const STAFF_COLOR = COLORS.staff || "#14A39A";
// const BG_COLOR = COLORS.background || "#F8FAFC";
// const CARD_COLOR = COLORS.card || "#FFFFFF";
// const TEXT_COLOR = COLORS.text || "#0F172A";
// const MUTED_COLOR = COLORS.muted || "#64748B";
// const BORDER_COLOR = COLORS.border || "#E2E8F0";
// const DANGER_COLOR = COLORS.danger || "#EF4444";

// const defaultTimings = {
//   morning: {
//     label: "Morning",
//     enabled: true,
//     startTime: "09:00 AM",
//     endTime: "12:00 PM",
//     maxPatients: 30,
//   },
//   afternoon: {
//     label: "Afternoon",
//     enabled: true,
//     startTime: "01:00 PM",
//     endTime: "04:00 PM",
//     maxPatients: 25,
//   },
//   night: {
//     label: "Night",
//     enabled: true,
//     startTime: "06:00 PM",
//     endTime: "09:00 PM",
//     maxPatients: 20,
//   },
// };

// export default function CreateTokenScreen({ navigation }) {
//   const { bookToken, tokens } = useQueue();
//   const { hospitals } = useHospital();

//   const hospital = hospitals?.find((h) => h.id === "h1") || hospitals?.[0];
//   const hospitalDoctors = hospital?.doctorList || [];

//   const departments = useMemo(() => {
//     const uniqueDepartments = [
//       ...new Set(
//         hospitalDoctors
//           .map((doctor) => doctor?.department)
//           .filter(Boolean)
//       ),
//     ];

//     if (uniqueDepartments.length > 0) {
//       return uniqueDepartments;
//     }

//     return hospital?.departments || ["General OPD"];
//   }, [hospitalDoctors, hospital]);

//   const [department, setDepartment] = useState(departments[0] || "General OPD");
//   const [selectedDoctorId, setSelectedDoctorId] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("morning");

//   const doctors = useMemo(() => {
//     return hospitalDoctors.filter((doctor) => doctor.department === department);
//   }, [hospitalDoctors, department]);

//   const selectedDoctor = useMemo(() => {
//     return doctors.find((doctor) => doctor.id === selectedDoctorId) || doctors[0];
//   }, [doctors, selectedDoctorId]);

//   const doctorTimings = selectedDoctor?.timings || defaultTimings;

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [phone, setPhone] = useState("");
//   const [symptoms, setSymptoms] = useState("");
//   const [visitType, setVisitType] = useState("Walk-in");

//   const [successPopup, setSuccessPopup] = useState(false);

//   const [createdToken, setCreatedToken] = useState({
//     tokenNo: "",
//     slotLabel: "",
//     slotTime: "",
//     doctorName: "",
//     department: "",
//     patientName: "",
//     patientPhone: "",
//   });

//   useEffect(() => {
//     if (!department && departments.length > 0) {
//       setDepartment(departments[0]);
//     }
//   }, [department, departments]);

//   useEffect(() => {
//     if (
//       doctors.length > 0 &&
//       !doctors.some((doc) => doc.id === selectedDoctorId)
//     ) {
//       setSelectedDoctorId(doctors[0].id);
//       setSelectedSlot("morning");
//     }
//   }, [doctors, selectedDoctorId]);

//   const slotList = useMemo(() => {
//     return Object.entries(doctorTimings).map(([key, data]) => {
//       const slotTokens = tokens.filter(
//         (t) =>
//           t.hospitalId === hospital?.id &&
//           t.department === department &&
//           t.doctor === selectedDoctor?.name &&
//           t.date === getTodayDate() &&
//           t.slot === key
//       );

//       const bookedCount = slotTokens.length;
//       const waitingCount = slotTokens.filter(
//         (t) => t.status === "waiting"
//       ).length;

//       const maxPatients = Number(data?.maxPatients || 0);
//       const isFull = maxPatients > 0 && bookedCount >= maxPatients;

//       return {
//         key,
//         label: data?.label || key,
//         enabled: !!data?.enabled,
//         startTime: data?.startTime || "",
//         endTime: data?.endTime || "",
//         maxPatients,
//         bookedCount,
//         waitingCount,
//         isFull,
//       };
//     });
//   }, [doctorTimings, tokens, hospital?.id, department, selectedDoctor]);

//   useEffect(() => {
//     const currentSlot = slotList.find((slot) => slot.key === selectedSlot);

//     if (!currentSlot || !currentSlot.enabled || currentSlot.isFull) {
//       const firstAvailableSlot = slotList.find(
//         (slot) => slot.enabled && !slot.isFull
//       );
//       setSelectedSlot(firstAvailableSlot?.key || "morning");
//     }
//   }, [slotList, selectedSlot]);

//   const changeDepartment = (dept) => {
//     const deptDoctors = hospitalDoctors.filter(
//       (doctor) => doctor.department === dept
//     );

//     setDepartment(dept);
//     setSelectedDoctorId(deptDoctors[0]?.id || "");
//     setSelectedSlot("morning");
//   };

//   const changeDoctor = (doctorId) => {
//     setSelectedDoctorId(doctorId);
//     setSelectedSlot("morning");
//   };

//   const resetForm = () => {
//     const firstDepartment = departments[0] || "General OPD";
//     const firstDoctor = hospitalDoctors.find(
//       (doctor) => doctor.department === firstDepartment
//     );

//     setName("");
//     setAge("");
//     setPhone("");
//     setSymptoms("");
//     setDepartment(firstDepartment);
//     setSelectedDoctorId(firstDoctor?.id || "");
//     setSelectedSlot("morning");
//     setVisitType("Walk-in");
//   };

//   const create = () => {
//     if (!selectedDoctor) {
//       Alert.alert("No Doctor", "Please add doctors first.");
//       return;
//     }

//     if (!name.trim() || !age.trim() || !symptoms.trim()) {
//       Alert.alert(
//         "Missing Details",
//         "Please enter patient name, age and symptoms."
//       );
//       return;
//     }

//     const slotInfo = slotList.find((slot) => slot.key === selectedSlot);

//     if (!slotInfo || !slotInfo.enabled) {
//       Alert.alert("Slot Not Available", "Please select an available slot.");
//       return;
//     }

//     if (slotInfo.isFull) {
//       Alert.alert("Slot Full", "Please select another available slot.");
//       return;
//     }

//     const token = bookToken({
//       hospitalId: hospital?.id || "h1",
//       hospitalName: hospital?.name || "City Care Hospital",

//       department,
//       doctor: selectedDoctor.name,
//       doctorId: selectedDoctor.id,

//       bookingSource: "staff",
//       createdBy: "staff",

//       patientName: name.trim(),
//       age: age.trim(),
//       phone: phone.trim(),
//       symptoms: symptoms.trim(),
//       visitType,

//       date: getTodayDate(),
//       displayDate: "Today",
//       slot: selectedSlot,
//       slotLabel: slotInfo.label,
//       slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,

//       doctorFee: selectedDoctor.fee || 0,
//       platformFee: 0,
//       totalAmount: selectedDoctor.fee || 0,
//       paymentMethod: "Walk-in",
//       paymentStatus: "PAY_AT_HOSPITAL",
//       appointmentStatus: "CONFIRMED",
//       status: "waiting",
//     });

//     setCreatedToken({
//       tokenNo: token?.tokenNo || "",
//       slotLabel: slotInfo.label,
//       slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
//       doctorName: selectedDoctor.name,
//       department,
//       patientName: name.trim(),
//       patientPhone: phone.trim(),
//     });

//     setSuccessPopup(true);
//   };



// const shareTokenToPatient = async () => {
//   if (!createdToken.patientPhone) {
//     Alert.alert(
//       "Phone Number Missing",
//       "Please enter patient phone number before sharing token."
//     );
//     return;
//   }

//   const cleanPhone = createdToken.patientPhone.replace(/\D/g, "");

//   const message = `Hello ${createdToken.patientName || "Patient"},

// Your hospital walk-in token has been created successfully.

// Token No: ${createdToken.tokenNo}
// Department: ${createdToken.department}
// Doctor: ${createdToken.doctorName}
// Slot: ${createdToken.slotLabel} (${createdToken.slotTime})

// Please wait for your token number to be called.

// Thank you.`;

//   const encodedMessage = encodeURIComponent(message);

//   try {
//     // WEB FALLBACK: Opens WhatsApp Web
//     if (Platform.OS === "web") {
//       const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodedMessage}`;
//       window.open(whatsappUrl, "_blank");
//       return;
//     }

//     // MOBILE: Opens SMS app
//     const smsUrl =
//       Platform.OS === "ios"
//         ? `sms:${createdToken.patientPhone}&body=${encodedMessage}`
//         : `sms:${createdToken.patientPhone}?body=${encodedMessage}`;

//     const canOpen = await Linking.canOpenURL(smsUrl);

//     if (!canOpen) {
//       Alert.alert("SMS Not Available", "Unable to open SMS app on this device.");
//       return;
//     }

//     await Linking.openURL(smsUrl);
//   } catch (error) {
//     Alert.alert("Error", "Unable to share token. Please try again.");
//   }
// };









//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     resetForm();
//   };

//   const goToQueue = () => {
//     setSuccessPopup(false);
//     resetForm();
//     navigation.navigate("Queue");
//   };

//   if (!hospital || hospitalDoctors.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="medkit-outline" size={50} color={MUTED_COLOR} />
//         <Text style={styles.emptyTitle}>No doctors found</Text>
//         <Text style={styles.emptySub}>
//           Add doctors in HospitalContext first. Then staff can create tokens for
//           those same doctors.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Walk-in Token</Text>
//             <Text style={styles.sub}>
//               Create token for direct hospital visitors
//             </Text>
//           </View>

//           <View style={styles.headerIcon}>
//             <Ionicons name="add-circle-outline" size={26} color={STAFF_COLOR} />
//           </View>
//         </View>

//         <View style={styles.infoCard}>
//           <Ionicons name="business-outline" size={22} color="#FFFFFF" />
//           <View style={{ flex: 1 }}>
//             <Text style={styles.infoTitle}>{hospital?.name}</Text>
//             <Text style={styles.infoSub}>
//               Reception desk • Staff token creation
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Select Department</Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.chipRow}
//         >
//           {departments.map((dept) => {
//             const active = department === dept;

//             return (
//               <TouchableOpacity
//                 key={dept}
//                 activeOpacity={0.85}
//                 style={[styles.chip, active && styles.activeChip]}
//                 onPress={() => changeDepartment(dept)}
//               >
//                 <Text style={[styles.chipText, active && styles.activeChipText]}>
//                   {dept}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>

//         <Text style={styles.sectionTitle}>Select Doctor</Text>

//         {doctors.map((doc) => {
//           const active = selectedDoctorId === doc.id;

//           return (
//             <TouchableOpacity
//               key={doc.id}
//               activeOpacity={0.86}
//               style={[styles.doctorCard, active && styles.activeDoctorCard]}
//               onPress={() => changeDoctor(doc.id)}
//             >
//               <View style={[styles.doctorIcon, active && styles.activeIconBox]}>
//                 <Ionicons name="medkit-outline" size={22} color={STAFF_COLOR} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={[styles.doctorName, active && styles.activeWhiteText]}>
//                   {doc.name}
//                 </Text>

//                 <Text style={[styles.doctorSub, active && styles.activeSubWhiteText]}>
//                   {doc.department} • ₹{doc.fee || 0}
//                 </Text>
//               </View>

//               {active && (
//                 <Ionicons name="checkmark-circle" size={23} color="#FFFFFF" />
//               )}
//             </TouchableOpacity>
//           );
//         })}

//         <Text style={styles.sectionTitle}>Select Slot</Text>

//         {slotList.map((slot) => {
//           const active = selectedSlot === slot.key;
//           const disabled = !slot.enabled || slot.isFull;

//           const iconName =
//             slot.key === "morning"
//               ? "sunny-outline"
//               : slot.key === "afternoon"
//               ? "partly-sunny-outline"
//               : "moon-outline";

//           return (
//             <TouchableOpacity
//               key={slot.key}
//               activeOpacity={0.86}
//               disabled={disabled}
//               style={[
//                 styles.slotCard,
//                 active && styles.activeSlotCard,
//                 disabled && styles.disabledSlotCard,
//               ]}
//               onPress={() => setSelectedSlot(slot.key)}
//             >
//               <View style={[styles.slotIcon, active && styles.activeIconBox]}>
//                 <Ionicons name={iconName} size={23} color={STAFF_COLOR} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={[styles.slotTitle, active && styles.activeWhiteText]}>
//                   {slot.label}
//                 </Text>

//                 <Text style={[styles.slotSub, active && styles.activeSubWhiteText]}>
//                   {slot.enabled
//                     ? `${slot.startTime} - ${slot.endTime}`
//                     : "Not available"}
//                 </Text>

//                 <Text style={[styles.slotSub, active && styles.activeSubWhiteText]}>
//                   Queue: {slot.waitingCount} waiting • {slot.bookedCount}/
//                   {slot.maxPatients}
//                 </Text>
//               </View>

//               {slot.isFull ? (
//                 <Text style={styles.fullText}>Full</Text>
//               ) : active ? (
//                 <Ionicons name="checkmark-circle" size={23} color="#FFFFFF" />
//               ) : null}
//             </TouchableOpacity>
//           );
//         })}

//         <View style={styles.formCard}>
//           <Text style={styles.formTitle}>Patient Details</Text>

//           <Input
//             label="Patient Name"
//             value={name}
//             onChangeText={setName}
//             placeholder="Enter patient name"
//           />

//           <Input
//             label="Age"
//             value={age}
//             onChangeText={setAge}
//             placeholder="Enter age"
//             keyboardType="numeric"
//           />

//           <Input
//             label="Phone Number"
//             value={phone}
//             onChangeText={setPhone}
//             placeholder="Enter phone number"
//             keyboardType="phone-pad"
//           />

//           <Text style={styles.label}>Visit Type</Text>

//           <View style={styles.visitRow}>
//             {["Walk-in", "Emergency", "Follow-up"].map((type) => (
//               <TouchableOpacity
//                 key={type}
//                 activeOpacity={0.85}
//                 style={[
//                   styles.visitBtn,
//                   visitType === type && styles.activeVisit,
//                 ]}
//                 onPress={() => setVisitType(type)}
//               >
//                 <Text
//                   style={[
//                     styles.visitText,
//                     visitType === type && styles.activeVisitText,
//                   ]}
//                 >
//                   {type}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <Input
//             label="Symptoms / Reason"
//             value={symptoms}
//             onChangeText={setSymptoms}
//             placeholder="Example: Fever, headache"
//             multiline
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.createBtn}
//           activeOpacity={0.88}
//           onPress={create}
//         >
//           <Ionicons name="ticket-outline" size={20} color="#FFFFFF" />
//           <Text style={styles.createText}>Create Walk-in Token</Text>
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
//               <Ionicons name="checkmark-circle" size={58} color="#FFFFFF" />
//             </View>

//             <Text style={styles.successTitle}>Token Created Successfully</Text>

//             <Text style={styles.successMessage}>
//               Walk-in token has been created successfully for{" "}
//               {createdToken.slotLabel}.
//             </Text>

//             <View style={styles.tokenBox}>
//               <Text style={styles.tokenLabel}>Token Number</Text>
//               <Text style={styles.tokenValue}>{createdToken.tokenNo}</Text>
//             </View>

//             <View style={styles.detailsBox}>
//               <InfoLine
//                 icon="person-outline"
//                 label="Patient"
//                 value={createdToken.patientName}
//               />

//               <InfoLine
//                 icon="call-outline"
//                 label="Phone"
//                 value={createdToken.patientPhone}
//               />

//               <InfoLine
//                 icon="medkit-outline"
//                 label="Doctor"
//                 value={createdToken.doctorName}
//               />

//               <InfoLine
//                 icon="grid-outline"
//                 label="Department"
//                 value={createdToken.department}
//               />

//               <InfoLine
//                 icon="time-outline"
//                 label="Slot"
//                 value={`${createdToken.slotLabel} • ${createdToken.slotTime}`}
//               />
//             </View>

//             <View style={styles.modalActionsColumn}>
//               <Pressable style={styles.shareButton} onPress={shareTokenToPatient}>
//                 <Ionicons name="share-social-outline" size={18} color="#FFFFFF" />
//                 <Text style={styles.shareButtonText}>Share Token to Patient</Text>
//               </Pressable>

//               <View style={styles.modalActions}>
//                 <Pressable
//                   style={styles.secondaryButton}
//                   onPress={closeSuccessPopup}
//                 >
//                   <Text style={styles.secondaryButtonText}>Create Another</Text>
//                 </Pressable>

//                 <Pressable style={styles.successButton} onPress={goToQueue}>
//                   <Text style={styles.successButtonText}>View Queue</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// function Input({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   keyboardType,
//   multiline,
// }) {
//   return (
//     <View style={styles.inputBox}>
//       <Text style={styles.label}>{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor={MUTED_COLOR}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         style={[styles.input, multiline && styles.multiline]}
//       />
//     </View>
//   );
// }

// function InfoLine({ icon, label, value }) {
//   return (
//     <View style={styles.infoLine}>
//       <View style={styles.infoLineLeft}>
//         <Ionicons name={icon} size={17} color={STAFF_COLOR} />
//         <Text style={styles.infoLineLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoLineValue} numberOfLines={1}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     paddingHorizontal: 18,
//   },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//   },

//   sub: {
//     color: MUTED_COLOR,
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

//   infoCard: {
//     backgroundColor: STAFF_COLOR,
//     borderRadius: 24,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },

//   infoTitle: {
//     color: "#FFFFFF",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   infoSub: {
//     color: "rgba(255,255,255,0.86)",
//     marginTop: 4,
//     fontWeight: "600",
//     fontSize: 12,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     marginTop: 20,
//     marginBottom: 12,
//   },

//   chipRow: {
//     gap: 10,
//     paddingRight: 18,
//   },

//   chip: {
//     paddingHorizontal: 16,
//     paddingVertical: 11,
//     borderRadius: 999,
//     backgroundColor: CARD_COLOR,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//   },

//   activeChip: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   chipText: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//   },

//   activeChipText: {
//     color: "#FFFFFF",
//   },

//   doctorCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   activeDoctorCard: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   doctorIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeIconBox: {
//     backgroundColor: "#FFFFFF",
//     borderColor: "rgba(255,255,255,0.9)",
//   },

//   doctorName: {
//     color: TEXT_COLOR,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   doctorSub: {
//     color: MUTED_COLOR,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   activeWhiteText: {
//     color: "#FFFFFF",
//   },

//   activeSubWhiteText: {
//     color: "rgba(255,255,255,0.9)",
//   },

//   slotCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   activeSlotCard: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   disabledSlotCard: {
//     opacity: 0.55,
//   },

//   slotIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   slotTitle: {
//     color: TEXT_COLOR,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   slotSub: {
//     color: MUTED_COLOR,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   fullText: {
//     color: DANGER_COLOR,
//     fontWeight: "900",
//   },

//   formCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     marginTop: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   formTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     marginBottom: 14,
//   },

//   inputBox: {
//     marginBottom: 14,
//   },

//   label: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//     marginBottom: 8,
//   },

//   input: {
//     height: 52,
//     backgroundColor: BG_COLOR,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     paddingHorizontal: 14,
//     color: TEXT_COLOR,
//     fontWeight: "700",
//   },

//   multiline: {
//     height: 96,
//     paddingTop: 14,
//     textAlignVertical: "top",
//   },

//   visitRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 14,
//   },

//   visitBtn: {
//     flex: 1,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: BG_COLOR,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeVisit: {
//     backgroundColor: "#ECFDF5",
//     borderColor: STAFF_COLOR,
//   },

//   visitText: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   activeVisitText: {
//     color: STAFF_COLOR,
//     fontWeight: "900",
//   },

//   createBtn: {
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 20,
//     marginBottom: 34,
//   },

//   createText: {
//     color: "#FFFFFF",
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 12,
//     color: TEXT_COLOR,
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   emptySub: {
//     color: MUTED_COLOR,
//     marginTop: 6,
//     textAlign: "center",
//     fontWeight: "700",
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
//     maxWidth: 400,
//     backgroundColor: CARD_COLOR,
//     borderRadius: 30,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   successTitle: {
//     fontSize: 23,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     textAlign: "center",
//   },

//   successMessage: {
//     marginTop: 10,
//     fontSize: 14,
//     lineHeight: 21,
//     color: MUTED_COLOR,
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   tokenBox: {
//     marginTop: 18,
//     width: "100%",
//     borderRadius: 22,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     padding: 18,
//     alignItems: "center",
//   },

//   tokenLabel: {
//     color: MUTED_COLOR,
//     fontSize: 12,
//     fontWeight: "900",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },

//   tokenValue: {
//     color: STAFF_COLOR,
//     fontSize: 42,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   detailsBox: {
//     width: "100%",
//     marginTop: 16,
//     borderRadius: 20,
//     backgroundColor: "#F8FAFC",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     padding: 14,
//   },

//   infoLine: {
//     paddingVertical: 9,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//   },

//   infoLineLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLineLabel: {
//     color: MUTED_COLOR,
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   infoLineValue: {
//     color: TEXT_COLOR,
//     fontSize: 13,
//     fontWeight: "900",
//     maxWidth: "52%",
//     textAlign: "right",
//   },

//   modalActionsColumn: {
//     width: "100%",
//     marginTop: 24,
//   },

//   shareButton: {
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 12,
//   },

//   shareButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   modalActions: {
//     width: "100%",
//     flexDirection: "row",
//     gap: 10,
//   },

//   secondaryButton: {
//     flex: 1,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   secondaryButtonText: {
//     color: STAFF_COLOR,
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   successButton: {
//     flex: 1,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "900",
//   },
// });  


































// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
//   Linking,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import { useHospital } from "../../context/HospitalContext";
// import { fetchHospitalDayTokens } from "../../services/apiService";

// const getTodayDate = () => new Date().toISOString().split("T")[0];

// const STAFF_COLOR = COLORS.staff || "#14A39A";
// const BG_COLOR = COLORS.background || "#F8FAFC";
// const CARD_COLOR = COLORS.card || "#FFFFFF";
// const TEXT_COLOR = COLORS.text || "#0F172A";
// const MUTED_COLOR = COLORS.muted || "#64748B";
// const BORDER_COLOR = COLORS.border || "#E2E8F0";
// const DANGER_COLOR = COLORS.danger || "#EF4444";

// const defaultTimings = {
//   morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
//   afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
//   night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
// };

// export default function CreateTokenScreen({ navigation }) {
//   const { bookToken } = useQueue(); // Assuming bookToken calls your backend
//   const { staffHospitalData } = useHospital();
  
//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [department, setDepartment] = useState("");
//   const [selectedDoctorId, setSelectedDoctorId] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("morning");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [phone, setPhone] = useState("");
//   const [symptoms, setSymptoms] = useState("");
//   const [visitType, setVisitType] = useState("Walk-in");
//   const [successPopup, setSuccessPopup] = useState(false);

//   const [createdToken, setCreatedToken] = useState({
//     tokenNo: "", slotLabel: "", slotTime: "", doctorName: "", department: "", patientName: "", patientPhone: "",
//   });

//   // ── Sync with Backend ──────────────────────────────────────────────────
//   const hospitalDoctors = staffHospitalData?.doctorList || [];

//   const loadData = useCallback(async () => {
//     if (!staffHospitalData?.hospitalId) return;
//     setLoading(true);
//     try {
//       const dayTokens = await fetchHospitalDayTokens(staffHospitalData.hospitalId);
//       setTokens(dayTokens);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [staffHospitalData]);

//   useEffect(() => { loadData(); }, [loadData]);

//   // ── Derived Data ──────────────────────────────────────────────────────
//   const departments = useMemo(() => {
//     const uniqueDepts = [...new Set(hospitalDoctors.map(d => d.department).filter(Boolean))];
//     return uniqueDepts.length > 0 ? uniqueDepts : ["General OPD"];
//   }, [hospitalDoctors]);

//   const filteredDoctors = useMemo(() => {
//     return hospitalDoctors.filter(d => d.department === (department || departments[0]));
//   }, [hospitalDoctors, department, departments]);

//   const selectedDoctor = useMemo(() => {
//     return filteredDoctors.find(d => d.id === selectedDoctorId) || filteredDoctors[0];
//   }, [filteredDoctors, selectedDoctorId]);

//   const doctorTimings = selectedDoctor?.timings || defaultTimings;

//   useEffect(() => {
//     if (!department && departments.length > 0) setDepartment(departments[0]);
//   }, [departments]);

//   useEffect(() => {
//     if (filteredDoctors.length > 0 && !filteredDoctors.some(d => d.id === selectedDoctorId)) {
//       setSelectedDoctorId(filteredDoctors[0].id);
//     }
//   }, [filteredDoctors]);

//   const slotList = useMemo(() => {
//     return Object.entries(doctorTimings).map(([key, data]) => {
//       const slotTokens = tokens.filter(
//         t => t.doctor === selectedDoctor?.name && t.slot === key
//       );
//       const bookedCount = slotTokens.length;
//       const maxPatients = Number(data?.maxPatients || 0);
//       return {
//         key,
//         label: data?.label || key,
//         enabled: !!data?.enabled,
//         startTime: data?.startTime || "",
//         endTime: data?.endTime || "",
//         maxPatients,
//         bookedCount,
//         isFull: maxPatients > 0 && bookedCount >= maxPatients,
//         waitingCount: slotTokens.filter(t => t.status === "waiting").length,
//       };
//     });
//   }, [doctorTimings, tokens, selectedDoctor]);

//   // ── Logic ─────────────────────────────────────────────────────────────
//   const create = async () => {
//     if (!selectedDoctor || !name.trim() || !age.trim()) {
//       Alert.alert("Missing Info", "Please fill patient name, age and select a doctor.");
//       return;
//     }

//     const slotInfo = slotList.find(s => s.key === selectedSlot);
//     if (!slotInfo || !slotInfo.enabled || slotInfo.isFull) {
//       Alert.alert("Invalid Slot", "This slot is either full or unavailable.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await bookToken({
//         hospitalId: staffHospitalData.hospitalId,
//         hospitalName: staffHospitalData.name,
//         department: department || departments[0],
//         doctor: selectedDoctor.name,
//         doctorId: selectedDoctor.id,
//         bookingSource: "staff",
//         patientName: name.trim(),
//         age: age.trim(),
//         phone: phone.trim(),
//         symptoms: symptoms.trim(),
//         visitType,
//         date: getTodayDate(),
//         slot: selectedSlot,
//         slotLabel: slotInfo.label,
//         slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
//         paymentStatus: "PAY_AT_HOSPITAL",
//         status: "waiting",
//       });

//       setCreatedToken({
//         tokenNo: token?.tokenNo || "...",
//         slotLabel: slotInfo.label,
//         slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
//         doctorName: selectedDoctor.name,
//         department: department || departments[0],
//         patientName: name.trim(),
//         patientPhone: phone.trim(),
//       });
//       setSuccessPopup(true);
//       loadData(); // Refresh counts
//     } catch (err) {
//       Alert.alert("Error", "Could not create token. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shareTokenToPatient = async () => {
//     if (!createdToken.patientPhone) {
//       Alert.alert("Phone Missing", "Enter patient phone number to share.");
//       return;
//     }
//     const message = `Hello ${createdToken.patientName},\n\nYour Walk-in Token for ${createdToken.doctorName} (${createdToken.department}) is confirmed.\n\nToken No: ${createdToken.tokenNo}\nSlot: ${createdToken.slotLabel}\n\nThank you!`;
//     const url = `whatsapp://send?phone=91${createdToken.patientPhone}&text=${encodeURIComponent(message)}`;
    
//     try {
//       const canOpen = await Linking.canOpenURL(url);
//       if (canOpen) await Linking.openURL(url);
//       else await Linking.openURL(`sms:${createdToken.patientPhone}${Platform.OS === 'ios' ? '&' : '?'}body=${encodeURIComponent(message)}`);
//     } catch (e) {
//       Alert.alert("Error", "Could not open messaging app.");
//     }
//   };

//   if (loading && tokens.length === 0) {
//     return <View style={styles.emptyContainer}><ActivityIndicator size="large" color={STAFF_COLOR} /></View>;
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Walk-in Token</Text>
//             <Text style={styles.sub}>Reception • {staffHospitalData?.name}</Text>
//           </View>
//           <TouchableOpacity onPress={loadData} style={styles.headerIcon}>
//             <Ionicons name="refresh" size={22} color={STAFF_COLOR} />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionTitle}>Select Department</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
//           {departments.map((dept) => (
//             <TouchableOpacity 
//               key={dept} 
//               style={[styles.chip, department === dept && styles.activeChip]} 
//               onPress={() => { setDepartment(dept); setSelectedDoctorId(""); }}
//             >
//               <Text style={[styles.chipText, department === dept && styles.activeChipText]}>{dept}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Text style={styles.sectionTitle}>Select Doctor</Text>
//         {filteredDoctors.map((doc) => (
//           <TouchableOpacity 
//             key={doc.id} 
//             style={[styles.doctorCard, selectedDoctorId === doc.id && styles.activeDoctorCard]} 
//             onPress={() => setSelectedDoctorId(doc.id)}
//           >
//             <View style={[styles.doctorIcon, selectedDoctorId === doc.id && styles.activeIconBox]}>
//               <Ionicons name="person" size={20} color={STAFF_COLOR} />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={[styles.doctorName, selectedDoctorId === doc.id && styles.activeWhiteText]}>{doc.name}</Text>
//               <Text style={[styles.doctorSub, selectedDoctorId === doc.id && styles.activeSubWhiteText]}>₹{doc.fee || 0}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}

//         <Text style={styles.sectionTitle}>Select Slot</Text>
//         {slotList.map((slot) => (
//           <TouchableOpacity 
//             key={slot.key} 
//             disabled={!slot.enabled || slot.isFull}
//             style={[styles.slotCard, selectedSlot === slot.key && styles.activeSlotCard, (!slot.enabled || slot.isFull) && styles.disabledSlotCard]} 
//             onPress={() => setSelectedSlot(slot.key)}
//           >
//             <Text style={[styles.slotTitle, selectedSlot === slot.key && styles.activeWhiteText]}>{slot.label} ({slot.startTime})</Text>
//             <Text style={[styles.slotSub, selectedSlot === slot.key && styles.activeSubWhiteText]}>{slot.bookedCount} booked</Text>
//           </TouchableOpacity>
//         ))}

//         <View style={styles.formCard}>
//           <Text style={styles.formTitle}>Patient Details</Text>
//           <Input label="Name" value={name} onChangeText={setName} placeholder="Patient Full Name" />
//           <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="10-digit number" keyboardType="phone-pad" />
//           <Input label="Age" value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
//           <Input label="Symptoms" value={symptoms} onChangeText={setSymptoms} placeholder="Reason for visit" multiline />
//         </View>

//         <TouchableOpacity style={styles.createBtn} onPress={create} disabled={loading}>
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createText}>Create Token</Text>}
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Success Modal remains similar but using createdToken state */}
//       <Modal visible={successPopup} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//              <MotiView from={{scale:0.9}} animate={{scale:1}} style={styles.successCard}>
//                 <Ionicons name="checkmark-circle" size={60} color={STAFF_COLOR} />
//                 <Text style={styles.successTitle}>Token: {createdToken.tokenNo}</Text>
//                 <Text style={styles.successMessage}>Confirmed for {createdToken.patientName}</Text>
//                 <TouchableOpacity style={styles.shareButton} onPress={shareTokenToPatient}>
//                     <Text style={styles.shareButtonText}>WhatsApp Token</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.secondaryButton} onPress={() => setSuccessPopup(false)}>
//                     <Text style={styles.secondaryButtonText}>Done</Text>
//                 </TouchableOpacity>
//              </MotiView>
//           </View>
//       </Modal>
//     </View>
//   );
// }


// function Input({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   keyboardType,
//   multiline,
// }) {
//   return (
//     <View style={styles.inputBox}>
//       <Text style={styles.label}>{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor={MUTED_COLOR}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         style={[styles.input, multiline && styles.multiline]}
//       />
//     </View>
//   );
// }

// function InfoLine({ icon, label, value }) {
//   return (
//     <View style={styles.infoLine}>
//       <View style={styles.infoLineLeft}>
//         <Ionicons name={icon} size={17} color={STAFF_COLOR} />
//         <Text style={styles.infoLineLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoLineValue} numberOfLines={1}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     paddingHorizontal: 18,
//   },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//   },

//   sub: {
//     color: MUTED_COLOR,
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

//   infoCard: {
//     backgroundColor: STAFF_COLOR,
//     borderRadius: 24,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },

//   infoTitle: {
//     color: "#FFFFFF",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   infoSub: {
//     color: "rgba(255,255,255,0.86)",
//     marginTop: 4,
//     fontWeight: "600",
//     fontSize: 12,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     marginTop: 20,
//     marginBottom: 12,
//   },

//   chipRow: {
//     gap: 10,
//     paddingRight: 18,
//   },

//   chip: {
//     paddingHorizontal: 16,
//     paddingVertical: 11,
//     borderRadius: 999,
//     backgroundColor: CARD_COLOR,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//   },

//   activeChip: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   chipText: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//   },

//   activeChipText: {
//     color: "#FFFFFF",
//   },

//   doctorCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   activeDoctorCard: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   doctorIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeIconBox: {
//     backgroundColor: "#FFFFFF",
//     borderColor: "rgba(255,255,255,0.9)",
//   },

//   doctorName: {
//     color: TEXT_COLOR,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   doctorSub: {
//     color: MUTED_COLOR,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   activeWhiteText: {
//     color: "#FFFFFF",
//   },

//   activeSubWhiteText: {
//     color: "rgba(255,255,255,0.9)",
//   },

//   slotCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   activeSlotCard: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   disabledSlotCard: {
//     opacity: 0.55,
//   },

//   slotIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   slotTitle: {
//     color: TEXT_COLOR,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   slotSub: {
//     color: MUTED_COLOR,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   fullText: {
//     color: DANGER_COLOR,
//     fontWeight: "900",
//   },

//   formCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     marginTop: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   formTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     marginBottom: 14,
//   },

//   inputBox: {
//     marginBottom: 14,
//   },

//   label: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//     marginBottom: 8,
//   },

//   input: {
//     height: 52,
//     backgroundColor: BG_COLOR,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     paddingHorizontal: 14,
//     color: TEXT_COLOR,
//     fontWeight: "700",
//   },

//   multiline: {
//     height: 96,
//     paddingTop: 14,
//     textAlignVertical: "top",
//   },

//   visitRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 14,
//   },

//   visitBtn: {
//     flex: 1,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: BG_COLOR,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeVisit: {
//     backgroundColor: "#ECFDF5",
//     borderColor: STAFF_COLOR,
//   },

//   visitText: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   activeVisitText: {
//     color: STAFF_COLOR,
//     fontWeight: "900",
//   },

//   createBtn: {
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 20,
//     marginBottom: 34,
//   },

//   createText: {
//     color: "#FFFFFF",
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 12,
//     color: TEXT_COLOR,
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   emptySub: {
//     color: MUTED_COLOR,
//     marginTop: 6,
//     textAlign: "center",
//     fontWeight: "700",
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
//     maxWidth: 400,
//     backgroundColor: CARD_COLOR,
//     borderRadius: 30,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   successTitle: {
//     fontSize: 23,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     textAlign: "center",
//   },

//   successMessage: {
//     marginTop: 10,
//     fontSize: 14,
//     lineHeight: 21,
//     color: MUTED_COLOR,
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   tokenBox: {
//     marginTop: 18,
//     width: "100%",
//     borderRadius: 22,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     padding: 18,
//     alignItems: "center",
//   },

//   tokenLabel: {
//     color: MUTED_COLOR,
//     fontSize: 12,
//     fontWeight: "900",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },

//   tokenValue: {
//     color: STAFF_COLOR,
//     fontSize: 42,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   detailsBox: {
//     width: "100%",
//     marginTop: 16,
//     borderRadius: 20,
//     backgroundColor: "#F8FAFC",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     padding: 14,
//   },

//   infoLine: {
//     paddingVertical: 9,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//   },

//   infoLineLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLineLabel: {
//     color: MUTED_COLOR,
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   infoLineValue: {
//     color: TEXT_COLOR,
//     fontSize: 13,
//     fontWeight: "900",
//     maxWidth: "52%",
//     textAlign: "right",
//   },

//   modalActionsColumn: {
//     width: "100%",
//     marginTop: 24,
//   },

//   shareButton: {
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 12,
//   },

//   shareButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   modalActions: {
//     width: "100%",
//     flexDirection: "row",
//     gap: 10,
//   },

//   secondaryButton: {
//     flex: 1,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   secondaryButtonText: {
//     color: STAFF_COLOR,
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   successButton: {
//     flex: 1,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "900",
//   },
// });  



















// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
//   Linking,
//   Platform,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import { useHospital } from "../../context/HospitalContext";
// import { fetchHospitalDayTokens } from "../../services/apiService";
// import { useFocusEffect } from "@react-navigation/native";

// const getTodayDate = () => new Date().toISOString().split("T")[0];

// const STAFF_COLOR = COLORS.staff || "#14A39A";
// const BG_COLOR = COLORS.background || "#F8FAFC";
// const CARD_COLOR = COLORS.card || "#FFFFFF";
// const TEXT_COLOR = COLORS.text || "#0F172A";
// const MUTED_COLOR = COLORS.muted || "#64748B";
// const BORDER_COLOR = COLORS.border || "#E2E8F0";
// const DANGER_COLOR = COLORS.danger || "#EF4444";

// const defaultTimings = {
//   morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
//   afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
//   night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
// };

// export default function CreateTokenScreen({ navigation }) {
//   const { bookToken } = useQueue();
//   const { staffHospitalData, refreshDoctors } = useHospital();

//   // Refresh doctor list every time this screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       if (staffHospitalData?.hospitalId) {
//         refreshDoctors(staffHospitalData.hospitalId);
//       }
//     }, [staffHospitalData?.hospitalId])
//   );

  
//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [department, setDepartment] = useState("");
//   const [selectedDoctorId, setSelectedDoctorId] = useState("");
//   const [selectedSlot, setSelectedSlot] = useState("morning");
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [phone, setPhone] = useState("");
//   const [symptoms, setSymptoms] = useState("");
//   const [visitType, setVisitType] = useState("Walk-in");
//   const [successPopup, setSuccessPopup] = useState(false);

//   const [createdToken, setCreatedToken] = useState({
//     tokenNo: "", slotLabel: "", slotTime: "", doctorName: "", department: "", patientName: "", patientPhone: "",
//   });

//   // ── Sync with Backend ──────────────────────────────────────────────────
//   const hospitalDoctors = staffHospitalData?.doctorList || [];

//   const loadData = useCallback(async () => {
//     if (!staffHospitalData?.hospitalId) return;
//     setLoading(true);
//     try {
//       const dayTokens = await fetchHospitalDayTokens(staffHospitalData.hospitalId);
//       setTokens(dayTokens);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [staffHospitalData]);

//   useEffect(() => { loadData(); }, [loadData]);

//   // ── Derived Data ──────────────────────────────────────────────────────
//   const departments = useMemo(() => {
//     const uniqueDepts = [...new Set(hospitalDoctors.map(d => d.department).filter(Boolean))];
//     return uniqueDepts.length > 0 ? uniqueDepts : ["General OPD"];
//   }, [hospitalDoctors]);

//   const filteredDoctors = useMemo(() => {
//     return hospitalDoctors.filter(d => d.department === (department || departments[0]));
//   }, [hospitalDoctors, department, departments]);

//   const selectedDoctor = useMemo(() => {
//     return filteredDoctors.find(d => d.id === selectedDoctorId) || filteredDoctors[0];
//   }, [filteredDoctors, selectedDoctorId]);

//   const doctorTimings = selectedDoctor?.timings || defaultTimings;

//   useEffect(() => {
//     if (!department && departments.length > 0) setDepartment(departments[0]);
//   }, [departments]);

//   useEffect(() => {
//     if (filteredDoctors.length > 0 && !filteredDoctors.some(d => d.id === selectedDoctorId)) {
//       setSelectedDoctorId(filteredDoctors[0].id);
//     }
//   }, [filteredDoctors]);

//   const slotList = useMemo(() => {
//     return Object.entries(doctorTimings).map(([key, data]) => {
//       const slotTokens = tokens.filter(
//         t => t.doctor === selectedDoctor?.name && t.slot === key
//       );
//       const bookedCount = slotTokens.length;
//       const maxPatients = Number(data?.maxPatients || 0);
//       return {
//         key,
//         label: data?.label || key,
//         enabled: !!data?.enabled,
//         startTime: data?.startTime || "",
//         endTime: data?.endTime || "",
//         maxPatients,
//         bookedCount,
//         isFull: maxPatients > 0 && bookedCount >= maxPatients,
//         waitingCount: slotTokens.filter(t => t.status === "waiting").length,
//       };
//     });
//   }, [doctorTimings, tokens, selectedDoctor]);

//   // ── Logic ─────────────────────────────────────────────────────────────
//   const create = async () => {
//     if (!selectedDoctor || !name.trim() || !age.trim()) {
//       Alert.alert("Missing Info", "Please fill patient name, age and select a doctor.");
//       return;
//     }

//     const slotInfo = slotList.find(s => s.key === selectedSlot);
//     if (!slotInfo || !slotInfo.enabled || slotInfo.isFull) {
//       Alert.alert("Invalid Slot", "This slot is either full or unavailable.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = await bookToken({
//         hospitalId: staffHospitalData.hospitalId,
//         hospitalName: staffHospitalData.name,
//         department: department || departments[0],
//         doctor: selectedDoctor.name,
//         doctorId: selectedDoctor.id,
//         bookingSource: "staff",
//         patientName: name.trim(),
//         age: age.trim(),
//         phone: phone.trim(),
//         symptoms: symptoms.trim(),
//         visitType,
//         date: getTodayDate(),
//         slot: selectedSlot,
//         slotLabel: slotInfo.label,
//         slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
//         paymentStatus: "PAY_AT_HOSPITAL",
//         status: "waiting",
//       });

//       setCreatedToken({
//         tokenNo: token?.tokenNo || "...",
//         slotLabel: slotInfo.label,
//         slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
//         doctorName: selectedDoctor.name,
//         department: department || departments[0],
//         patientName: name.trim(),
//         patientPhone: phone.trim(),
//       });
//       setSuccessPopup(true);
//       loadData(); // Refresh counts
//     } catch (err) {
//       Alert.alert("Error", "Could not create token. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shareTokenToPatient = async () => {
//     if (!createdToken.patientPhone) {
//       Alert.alert("Phone Missing", "Enter patient phone number to share.");
//       return;
//     }
//     const message = `Hello ${createdToken.patientName},\n\nYour Walk-in Token for ${createdToken.doctorName} (${createdToken.department}) is confirmed.\n\nToken No: ${createdToken.tokenNo}\nSlot: ${createdToken.slotLabel}\n\nThank you!`;
//     const url = `whatsapp://send?phone=91${createdToken.patientPhone}&text=${encodeURIComponent(message)}`;
    
//     try {
//       const canOpen = await Linking.canOpenURL(url);
//       if (canOpen) await Linking.openURL(url);
//       else await Linking.openURL(`sms:${createdToken.patientPhone}${Platform.OS === 'ios' ? '&' : '?'}body=${encodeURIComponent(message)}`);
//     } catch (e) {
//       Alert.alert("Error", "Could not open messaging app.");
//     }
//   };

//   if (loading && tokens.length === 0) {
//     return <View style={styles.emptyContainer}><ActivityIndicator size="large" color={STAFF_COLOR} /></View>;
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Walk-in Token</Text>
//             <Text style={styles.sub}>Reception • {staffHospitalData?.name}</Text>
//           </View>
//           <TouchableOpacity onPress={loadData} style={styles.headerIcon}>
//             <Ionicons name="refresh" size={22} color={STAFF_COLOR} />
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.sectionTitle}>Select Department</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
//           {departments.map((dept) => (
//             <TouchableOpacity 
//               key={dept} 
//               style={[styles.chip, department === dept && styles.activeChip]} 
//               onPress={() => { setDepartment(dept); setSelectedDoctorId(""); }}
//             >
//               <Text style={[styles.chipText, department === dept && styles.activeChipText]}>{dept}</Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Text style={styles.sectionTitle}>Select Doctor</Text>
//         {filteredDoctors.map((doc) => (
//           <TouchableOpacity 
//             key={doc.id} 
//             style={[styles.doctorCard, selectedDoctorId === doc.id && styles.activeDoctorCard]} 
//             onPress={() => setSelectedDoctorId(doc.id)}
//           >
//             <View style={[styles.doctorIcon, selectedDoctorId === doc.id && styles.activeIconBox]}>
//               <Ionicons name="person" size={20} color={STAFF_COLOR} />
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={[styles.doctorName, selectedDoctorId === doc.id && styles.activeWhiteText]}>{doc.name}</Text>
//               <Text style={[styles.doctorSub, selectedDoctorId === doc.id && styles.activeSubWhiteText]}>₹{doc.fee || 0}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}

//         <Text style={styles.sectionTitle}>Select Slot</Text>
//         {slotList.map((slot) => (
//           <TouchableOpacity 
//             key={slot.key} 
//             disabled={!slot.enabled || slot.isFull}
//             style={[styles.slotCard, selectedSlot === slot.key && styles.activeSlotCard, (!slot.enabled || slot.isFull) && styles.disabledSlotCard]} 
//             onPress={() => setSelectedSlot(slot.key)}
//           >
//             <Text style={[styles.slotTitle, selectedSlot === slot.key && styles.activeWhiteText]}>{slot.label} ({slot.startTime})</Text>
//             <Text style={[styles.slotSub, selectedSlot === slot.key && styles.activeSubWhiteText]}>{slot.bookedCount} booked</Text>
//           </TouchableOpacity>
//         ))}

//         <View style={styles.formCard}>
//           <Text style={styles.formTitle}>Patient Details</Text>
//           <Input label="Name" value={name} onChangeText={setName} placeholder="Patient Full Name" />
//           <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="10-digit number" keyboardType="phone-pad" />
//           <Input label="Age" value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
//           <Input label="Symptoms" value={symptoms} onChangeText={setSymptoms} placeholder="Reason for visit" multiline />
//         </View>

//         <TouchableOpacity style={styles.createBtn} onPress={create} disabled={loading}>
//           {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createText}>Create Token</Text>}
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Success Modal remains similar but using createdToken state */}
//       <Modal visible={successPopup} transparent animationType="fade">
//           <View style={styles.modalOverlay}>
//              <MotiView from={{scale:0.9}} animate={{scale:1}} style={styles.successCard}>
//                 <Ionicons name="checkmark-circle" size={60} color={STAFF_COLOR} />
//                 <Text style={styles.successTitle}>Token: {createdToken.tokenNo}</Text>
//                 <Text style={styles.successMessage}>Confirmed for {createdToken.patientName}</Text>
//                 <TouchableOpacity style={styles.shareButton} onPress={shareTokenToPatient}>
//                     <Text style={styles.shareButtonText}>WhatsApp Token</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.secondaryButton} onPress={() => setSuccessPopup(false)}>
//                     <Text style={styles.secondaryButtonText}>Done</Text>
//                 </TouchableOpacity>
//              </MotiView>
//           </View>
//       </Modal>
//     </View>
//   );
// }


// function Input({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   keyboardType,
//   multiline,
// }) {
//   return (
//     <View style={styles.inputBox}>
//       <Text style={styles.label}>{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor={MUTED_COLOR}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         style={[styles.input, multiline && styles.multiline]}
//       />
//     </View>
//   );
// }

// function InfoLine({ icon, label, value }) {
//   return (
//     <View style={styles.infoLine}>
//       <View style={styles.infoLineLeft}>
//         <Ionicons name={icon} size={17} color={STAFF_COLOR} />
//         <Text style={styles.infoLineLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoLineValue} numberOfLines={1}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//   },

//   container: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     paddingHorizontal: 18,
//   },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//   },

//   sub: {
//     color: MUTED_COLOR,
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

//   infoCard: {
//     backgroundColor: STAFF_COLOR,
//     borderRadius: 24,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },

//   infoTitle: {
//     color: "#FFFFFF",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   infoSub: {
//     color: "rgba(255,255,255,0.86)",
//     marginTop: 4,
//     fontWeight: "600",
//     fontSize: 12,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     marginTop: 20,
//     marginBottom: 12,
//   },

//   chipRow: {
//     gap: 10,
//     paddingRight: 18,
//   },

//   chip: {
//     paddingHorizontal: 16,
//     paddingVertical: 11,
//     borderRadius: 999,
//     backgroundColor: CARD_COLOR,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//   },

//   activeChip: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   chipText: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//   },

//   activeChipText: {
//     color: "#FFFFFF",
//   },

//   doctorCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   activeDoctorCard: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   doctorIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeIconBox: {
//     backgroundColor: "#FFFFFF",
//     borderColor: "rgba(255,255,255,0.9)",
//   },

//   doctorName: {
//     color: TEXT_COLOR,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   doctorSub: {
//     color: MUTED_COLOR,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   activeWhiteText: {
//     color: "#FFFFFF",
//   },

//   activeSubWhiteText: {
//     color: "rgba(255,255,255,0.9)",
//   },

//   slotCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   activeSlotCard: {
//     backgroundColor: STAFF_COLOR,
//     borderColor: STAFF_COLOR,
//   },

//   disabledSlotCard: {
//     opacity: 0.55,
//   },

//   slotIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#D1FAE5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   slotTitle: {
//     color: TEXT_COLOR,
//     fontWeight: "900",
//     fontSize: 15,
//   },

//   slotSub: {
//     color: MUTED_COLOR,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   fullText: {
//     color: DANGER_COLOR,
//     fontWeight: "900",
//   },

//   formCard: {
//     backgroundColor: CARD_COLOR,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     marginTop: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//   },

//   formTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     marginBottom: 14,
//   },

//   inputBox: {
//     marginBottom: 14,
//   },

//   label: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//     marginBottom: 8,
//   },

//   input: {
//     height: 52,
//     backgroundColor: BG_COLOR,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     paddingHorizontal: 14,
//     color: TEXT_COLOR,
//     fontWeight: "700",
//   },

//   multiline: {
//     height: 96,
//     paddingTop: 14,
//     textAlignVertical: "top",
//   },

//   visitRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 14,
//   },

//   visitBtn: {
//     flex: 1,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: BG_COLOR,
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeVisit: {
//     backgroundColor: "#ECFDF5",
//     borderColor: STAFF_COLOR,
//   },

//   visitText: {
//     color: TEXT_COLOR,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   activeVisitText: {
//     color: STAFF_COLOR,
//     fontWeight: "900",
//   },

//   createBtn: {
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 20,
//     marginBottom: 34,
//   },

//   createText: {
//     color: "#FFFFFF",
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 12,
//     color: TEXT_COLOR,
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   emptySub: {
//     color: MUTED_COLOR,
//     marginTop: 6,
//     textAlign: "center",
//     fontWeight: "700",
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
//     maxWidth: 400,
//     backgroundColor: CARD_COLOR,
//     borderRadius: 30,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: BORDER_COLOR,
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   successTitle: {
//     fontSize: 23,
//     fontWeight: "900",
//     color: TEXT_COLOR,
//     textAlign: "center",
//   },

//   successMessage: {
//     marginTop: 10,
//     fontSize: 14,
//     lineHeight: 21,
//     color: MUTED_COLOR,
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   tokenBox: {
//     marginTop: 18,
//     width: "100%",
//     borderRadius: 22,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     padding: 18,
//     alignItems: "center",
//   },

//   tokenLabel: {
//     color: MUTED_COLOR,
//     fontSize: 12,
//     fontWeight: "900",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },

//   tokenValue: {
//     color: STAFF_COLOR,
//     fontSize: 42,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   detailsBox: {
//     width: "100%",
//     marginTop: 16,
//     borderRadius: 20,
//     backgroundColor: "#F8FAFC",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     padding: 14,
//   },

//   infoLine: {
//     paddingVertical: 9,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     gap: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#E2E8F0",
//   },

//   infoLineLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLineLabel: {
//     color: MUTED_COLOR,
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   infoLineValue: {
//     color: TEXT_COLOR,
//     fontSize: 13,
//     fontWeight: "900",
//     maxWidth: "52%",
//     textAlign: "right",
//   },

//   modalActionsColumn: {
//     width: "100%",
//     marginTop: 24,
//   },

//   shareButton: {
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 12,
//   },

//   shareButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   modalActions: {
//     width: "100%",
//     flexDirection: "row",
//     gap: 10,
//   },

//   secondaryButton: {
//     flex: 1,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   secondaryButtonText: {
//     color: STAFF_COLOR,
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   successButton: {
//     flex: 1,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: STAFF_COLOR,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#FFFFFF",
//     fontSize: 14,
//     fontWeight: "900",
//   },
// });  










































import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";
import { useHospital } from "../../context/HospitalContext";
import { fetchHospitalDayTokens } from "../../services/apiService";
import { useFocusEffect } from "@react-navigation/native";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const STAFF_COLOR = COLORS.staff || "#14A39A";
const BG_COLOR = COLORS.background || "#F8FAFC";
const CARD_COLOR = COLORS.card || "#FFFFFF";
const TEXT_COLOR = COLORS.text || "#0F172A";
const MUTED_COLOR = COLORS.muted || "#64748B";
const BORDER_COLOR = COLORS.border || "#E2E8F0";
const DANGER_COLOR = COLORS.danger || "#EF4444";

const defaultTimings = {
  morning: { label: "Morning", enabled: true, startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30 },
  afternoon: { label: "Afternoon", enabled: true, startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25 },
  night: { label: "Night", enabled: true, startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20 },
};

export default function CreateTokenScreen({ navigation }) {
  const { bookWalkIn } = useQueue();
  const { staffHospitalData, refreshDoctors } = useHospital();

  // Refresh doctor list every time this screen is focused
  useFocusEffect(
    useCallback(() => {
      if (staffHospitalData?.hospitalId) {
        refreshDoctors(staffHospitalData.hospitalId);
      }
    }, [staffHospitalData?.hospitalId])
  );

  
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [visitType, setVisitType] = useState("Walk-in");
  const [successPopup, setSuccessPopup] = useState(false);

  const [createdToken, setCreatedToken] = useState({
    tokenNo: "", slotLabel: "", slotTime: "", doctorName: "", department: "", patientName: "", patientPhone: "",
  });

  // ── Sync with Backend ──────────────────────────────────────────────────
  const hospitalDoctors = staffHospitalData?.doctorList || [];

  const loadData = useCallback(async () => {
    if (!staffHospitalData?.hospitalId) return;
    setLoading(true);
    try {
      const dayTokens = await fetchHospitalDayTokens(staffHospitalData.hospitalId);
      setTokens(dayTokens);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [staffHospitalData]);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Derived Data ──────────────────────────────────────────────────────
  const departments = useMemo(() => {
    const uniqueDepts = [...new Set(hospitalDoctors.map(d => d.department).filter(Boolean))];
    return uniqueDepts.length > 0 ? uniqueDepts : ["General OPD"];
  }, [hospitalDoctors]);

  const filteredDoctors = useMemo(() => {
    return hospitalDoctors.filter(d => d.department === (department || departments[0]));
  }, [hospitalDoctors, department, departments]);

  const selectedDoctor = useMemo(() => {
    return filteredDoctors.find(d => d.id === selectedDoctorId) || filteredDoctors[0];
  }, [filteredDoctors, selectedDoctorId]);

  const doctorTimings = selectedDoctor?.timings || defaultTimings;

  useEffect(() => {
    if (!department && departments.length > 0) setDepartment(departments[0]);
  }, [departments]);

  useEffect(() => {
    if (filteredDoctors.length > 0 && !filteredDoctors.some(d => d.id === selectedDoctorId)) {
      setSelectedDoctorId(filteredDoctors[0].id);
    }
  }, [filteredDoctors]);

  const slotList = useMemo(() => {
    return Object.entries(doctorTimings).map(([key, data]) => {
      const slotTokens = tokens.filter(
        t => t.doctor === selectedDoctor?.name && t.slot === key
      );
      const bookedCount = slotTokens.length;
      const maxPatients = Number(data?.maxPatients || 0);
      return {
        key,
        label: data?.label || key,
        enabled: !!data?.enabled,
        startTime: data?.startTime || "",
        endTime: data?.endTime || "",
        maxPatients,
        bookedCount,
        isFull: maxPatients > 0 && bookedCount >= maxPatients,
        waitingCount: slotTokens.filter(t => t.status === "waiting").length,
      };
    });
  }, [doctorTimings, tokens, selectedDoctor]);

  // ── Logic ─────────────────────────────────────────────────────────────
  const create = async () => {
    if (!selectedDoctor || !name.trim() || !age.trim()) {
      Alert.alert("Missing Info", "Please fill patient name, age and select a doctor.");
      return;
    }

    const slotInfo = slotList.find(s => s.key === selectedSlot);
    if (!slotInfo || !slotInfo.enabled || slotInfo.isFull) {
      Alert.alert("Invalid Slot", "This slot is either full or unavailable.");
      return;
    }

    setLoading(true);
    try {
      const token = await bookWalkIn({
        hospitalId: staffHospitalData.hospitalId,
        hospitalName: staffHospitalData.name,
        department: department || departments[0],
        doctor: selectedDoctor.name,
        doctorId: selectedDoctor.id,
        bookingSource: "staff",
        patientName: name.trim(),
        age: age.trim(),
        phone: phone.trim(),
        symptoms: symptoms.trim(),
        visitType,
        date: getTodayDate(),
        slot: selectedSlot,
        slotLabel: slotInfo.label,
        slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
        paymentStatus: "PAY_AT_HOSPITAL",
        status: "waiting",
      });

      setCreatedToken({
        tokenNo: token?.tokenNo || "...",
        slotLabel: slotInfo.label,
        slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
        doctorName: selectedDoctor.name,
        department: department || departments[0],
        patientName: name.trim(),
        patientPhone: phone.trim(),
      });
      setSuccessPopup(true);
      loadData(); // Refresh counts
    } catch (err) {
      Alert.alert("Error", "Could not create token. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const shareTokenToPatient = async () => {
    if (!createdToken.patientPhone) {
      Alert.alert("Phone Missing", "Enter patient phone number to share.");
      return;
    }
    const message = `Hello ${createdToken.patientName},\n\nYour Walk-in Token for ${createdToken.doctorName} (${createdToken.department}) is confirmed.\n\nToken No: ${createdToken.tokenNo}\nSlot: ${createdToken.slotLabel}\n\nThank you!`;
    const url = `whatsapp://send?phone=91${createdToken.patientPhone}&text=${encodeURIComponent(message)}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) await Linking.openURL(url);
      else await Linking.openURL(`sms:${createdToken.patientPhone}${Platform.OS === 'ios' ? '&' : '?'}body=${encodeURIComponent(message)}`);
    } catch (e) {
      Alert.alert("Error", "Could not open messaging app.");
    }
  };

  if (loading && tokens.length === 0) {
    return <View style={styles.emptyContainer}><ActivityIndicator size="large" color={STAFF_COLOR} /></View>;
  }

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Walk-in Token</Text>
            <Text style={styles.sub}>Reception • {staffHospitalData?.name}</Text>
          </View>
          <TouchableOpacity onPress={loadData} style={styles.headerIcon}>
            <Ionicons name="refresh" size={22} color={STAFF_COLOR} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Select Department</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {departments.map((dept) => (
            <TouchableOpacity 
              key={dept} 
              style={[styles.chip, department === dept && styles.activeChip]} 
              onPress={() => { setDepartment(dept); setSelectedDoctorId(""); }}
            >
              <Text style={[styles.chipText, department === dept && styles.activeChipText]}>{dept}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Select Doctor</Text>
        {filteredDoctors.map((doc) => (
          <TouchableOpacity 
            key={doc.id} 
            style={[styles.doctorCard, selectedDoctorId === doc.id && styles.activeDoctorCard]} 
            onPress={() => setSelectedDoctorId(doc.id)}
          >
            <View style={[styles.doctorIcon, selectedDoctorId === doc.id && styles.activeIconBox]}>
              <Ionicons name="person" size={20} color={STAFF_COLOR} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.doctorName, selectedDoctorId === doc.id && styles.activeWhiteText]}>{doc.name}</Text>
              <Text style={[styles.doctorSub, selectedDoctorId === doc.id && styles.activeSubWhiteText]}>₹{doc.fee || 0}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.sectionTitle}>Select Slot</Text>
        {slotList.map((slot) => (
          <TouchableOpacity 
            key={slot.key} 
            disabled={!slot.enabled || slot.isFull}
            style={[styles.slotCard, selectedSlot === slot.key && styles.activeSlotCard, (!slot.enabled || slot.isFull) && styles.disabledSlotCard]} 
            onPress={() => setSelectedSlot(slot.key)}
          >
            <Text style={[styles.slotTitle, selectedSlot === slot.key && styles.activeWhiteText]}>{slot.label} ({slot.startTime})</Text>
            <Text style={[styles.slotSub, selectedSlot === slot.key && styles.activeSubWhiteText]}>{slot.bookedCount} booked</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Patient Details</Text>
          <Input label="Name" value={name} onChangeText={setName} placeholder="Patient Full Name" />
          <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="10-digit number" keyboardType="phone-pad" />
          <Input label="Age" value={age} onChangeText={setAge} placeholder="Age" keyboardType="numeric" />
          <Input label="Symptoms" value={symptoms} onChangeText={setSymptoms} placeholder="Reason for visit" multiline />
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={create} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createText}>Create Token</Text>}
        </TouchableOpacity>
      </ScrollView>

      {/* Success Modal remains similar but using createdToken state */}
      <Modal visible={successPopup} transparent animationType="fade">
          <View style={styles.modalOverlay}>
             <MotiView from={{scale:0.9}} animate={{scale:1}} style={styles.successCard}>
                <Ionicons name="checkmark-circle" size={60} color={STAFF_COLOR} />
                <Text style={styles.successTitle}>Token: {createdToken.tokenNo}</Text>
                <Text style={styles.successMessage}>Confirmed for {createdToken.patientName}</Text>
                <TouchableOpacity style={styles.shareButton} onPress={shareTokenToPatient}>
                    <Text style={styles.shareButtonText}>WhatsApp Token</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={() => setSuccessPopup(false)}>
                    <Text style={styles.secondaryButtonText}>Done</Text>
                </TouchableOpacity>
             </MotiView>
          </View>
      </Modal>
    </View>
  );
}


function Input({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
}) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={MUTED_COLOR}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}

function InfoLine({ icon, label, value }) {
  return (
    <View style={styles.infoLine}>
      <View style={styles.infoLineLeft}>
        <Ionicons name={icon} size={17} color={STAFF_COLOR} />
        <Text style={styles.infoLineLabel}>{label}</Text>
      </View>

      <Text style={styles.infoLineValue} numberOfLines={1}>
        {value || "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },

  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingHorizontal: 18,
  },

  header: {
    marginTop: 52,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: TEXT_COLOR,
  },

  sub: {
    color: MUTED_COLOR,
    marginTop: 6,
    fontWeight: "600",
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    alignItems: "center",
    justifyContent: "center",
  },

  infoCard: {
    backgroundColor: STAFF_COLOR,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  infoSub: {
    color: "rgba(255,255,255,0.86)",
    marginTop: 4,
    fontWeight: "600",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: TEXT_COLOR,
    marginTop: 20,
    marginBottom: 12,
  },

  chipRow: {
    gap: 10,
    paddingRight: 18,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 999,
    backgroundColor: CARD_COLOR,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },

  activeChip: {
    backgroundColor: STAFF_COLOR,
    borderColor: STAFF_COLOR,
  },

  chipText: {
    color: TEXT_COLOR,
    fontWeight: "800",
  },

  activeChipText: {
    color: "#FFFFFF",
  },

  doctorCard: {
    backgroundColor: CARD_COLOR,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  activeDoctorCard: {
    backgroundColor: STAFF_COLOR,
    borderColor: STAFF_COLOR,
  },

  doctorIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },

  activeIconBox: {
    backgroundColor: "#FFFFFF",
    borderColor: "rgba(255,255,255,0.9)",
  },

  doctorName: {
    color: TEXT_COLOR,
    fontWeight: "900",
    fontSize: 15,
  },

  doctorSub: {
    color: MUTED_COLOR,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  activeWhiteText: {
    color: "#FFFFFF",
  },

  activeSubWhiteText: {
    color: "rgba(255,255,255,0.9)",
  },

  slotCard: {
    backgroundColor: CARD_COLOR,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  activeSlotCard: {
    backgroundColor: STAFF_COLOR,
    borderColor: STAFF_COLOR,
  },

  disabledSlotCard: {
    opacity: 0.55,
  },

  slotIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },

  slotTitle: {
    color: TEXT_COLOR,
    fontWeight: "900",
    fontSize: 15,
  },

  slotSub: {
    color: MUTED_COLOR,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },

  fullText: {
    color: DANGER_COLOR,
    fontWeight: "900",
  },

  formCard: {
    backgroundColor: CARD_COLOR,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    marginTop: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: TEXT_COLOR,
    marginBottom: 14,
  },

  inputBox: {
    marginBottom: 14,
  },

  label: {
    color: TEXT_COLOR,
    fontWeight: "800",
    marginBottom: 8,
  },

  input: {
    height: 52,
    backgroundColor: BG_COLOR,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    paddingHorizontal: 14,
    color: TEXT_COLOR,
    fontWeight: "700",
  },

  multiline: {
    height: 96,
    paddingTop: 14,
    textAlignVertical: "top",
  },

  visitRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  visitBtn: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: BG_COLOR,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },

  activeVisit: {
    backgroundColor: "#ECFDF5",
    borderColor: STAFF_COLOR,
  },

  visitText: {
    color: TEXT_COLOR,
    fontWeight: "800",
    fontSize: 12,
  },

  activeVisitText: {
    color: STAFF_COLOR,
    fontWeight: "900",
  },

  createBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: STAFF_COLOR,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    marginBottom: 34,
  },

  createText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: BG_COLOR,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyTitle: {
    marginTop: 12,
    color: TEXT_COLOR,
    fontSize: 20,
    fontWeight: "900",
  },

  emptySub: {
    color: MUTED_COLOR,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "700",
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
    maxWidth: 400,
    backgroundColor: CARD_COLOR,
    borderRadius: 30,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },

  successIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: STAFF_COLOR,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  successTitle: {
    fontSize: 23,
    fontWeight: "900",
    color: TEXT_COLOR,
    textAlign: "center",
  },

  successMessage: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: MUTED_COLOR,
    textAlign: "center",
    fontWeight: "600",
  },

  tokenBox: {
    marginTop: 18,
    width: "100%",
    borderRadius: 22,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    padding: 18,
    alignItems: "center",
  },

  tokenLabel: {
    color: MUTED_COLOR,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  tokenValue: {
    color: STAFF_COLOR,
    fontSize: 42,
    fontWeight: "900",
    marginTop: 4,
  },

  detailsBox: {
    width: "100%",
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
  },

  infoLine: {
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  infoLineLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  infoLineLabel: {
    color: MUTED_COLOR,
    fontSize: 13,
    fontWeight: "800",
  },

  infoLineValue: {
    color: TEXT_COLOR,
    fontSize: 13,
    fontWeight: "900",
    maxWidth: "52%",
    textAlign: "right",
  },

  modalActionsColumn: {
    width: "100%",
    marginTop: 24,
  },

  shareButton: {
    width: "100%",
    height: 52,
    borderRadius: 18,
    backgroundColor: STAFF_COLOR,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },

  shareButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  modalActions: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: STAFF_COLOR,
    fontSize: 14,
    fontWeight: "900",
  },

  successButton: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: STAFF_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },

  successButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});  
