

// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import { useHospital } from "../../context/HospitalContext";

// const getTodayDate = () => new Date().toISOString().split("T")[0];

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

//   // Demo staff hospital
//   const hospital = hospitals.find((h) => h.id === "h1") || hospitals[0];

//   const hospitalDoctors = hospital?.doctorList || [];

//   const departments = useMemo(() => {
//     const uniqueDepartments = [
//       ...new Set(hospitalDoctors.map((doctor) => doctor.department)),
//     ];

//     if (uniqueDepartments.length > 0) {
//       return uniqueDepartments;
//     }

//     return hospital?.departments || ["General OPD"];
//   }, [hospitalDoctors, hospital]);

//   const [department, setDepartment] = useState(departments[0] || "General OPD");

//   const doctors = useMemo(() => {
//     return hospitalDoctors.filter((doctor) => doctor.department === department);
//   }, [hospitalDoctors, department]);

//   const [selectedDoctorId, setSelectedDoctorId] = useState(
//     doctors[0]?.id || ""
//   );

//   const selectedDoctor =
//     doctors.find((doctor) => doctor.id === selectedDoctorId) || doctors[0];

//   const doctorTimings = selectedDoctor?.timings || defaultTimings;

//   const [selectedSlot, setSelectedSlot] = useState("morning");

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [phone, setPhone] = useState("");
//   const [symptoms, setSymptoms] = useState("");
//   const [visitType, setVisitType] = useState("Walk-in");

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

// const token = bookToken({
//   hospitalId: hospital?.id || "h1",
//   hospitalName: hospital?.name || "City Care Hospital",

//   department,
//   doctor: selectedDoctor.name,
//   doctorId: selectedDoctor.id,

//   bookingSource: "staff",
//   createdBy: "staff",

//   patientName: name,
//   age,
//   phone,
//       symptoms,
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
//     });

//     Alert.alert(
//       "Token Created",
//       `Walk-in token ${token.tokenNo} created successfully for ${slotInfo.label}.`,
//       [
//         {
//           text: "View Queue",
//           onPress: () => navigation.navigate("Queue"),
//         },
//         {
//           text: "Create Another",
//           onPress: resetForm,
//         },
//       ]
//     );
//   };

//   if (!hospital || hospitalDoctors.length === 0) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="medkit-outline" size={50} color={COLORS.muted} />
//         <Text style={styles.emptyTitle}>No doctors found</Text>
//         <Text style={styles.emptySub}>
//           Add doctors in HospitalContext first. Then staff can create tokens for
//           those same doctors.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Walk-in Token</Text>
//           <Text style={styles.sub}>Create token for direct hospital visitors</Text>
//         </View>

//         <View style={styles.headerIcon}>
//           <Ionicons name="add-circle-outline" size={26} color={COLORS.staff} />
//         </View>
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="business-outline" size={22} color="#fff" />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.infoTitle}>{hospital?.name}</Text>
//           <Text style={styles.infoSub}>Reception desk • Staff token creation</Text>
//         </View>
//       </View>

//       <Text style={styles.sectionTitle}>Select Department</Text>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.chipRow}
//       >
//         {departments.map((dept) => (
//           <TouchableOpacity
//             key={dept}
//             style={[styles.chip, department === dept && styles.activeChip]}
//             onPress={() => changeDepartment(dept)}
//           >
//             <Text
//               style={[
//                 styles.chipText,
//                 department === dept && styles.activeChipText,
//               ]}
//             >
//               {dept}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <Text style={styles.sectionTitle}>Select Doctor</Text>

//       {doctors.map((doc) => (
//         <TouchableOpacity
//           key={doc.id}
//           style={[
//             styles.doctorCard,
//             selectedDoctorId === doc.id && styles.activeDoctorCard,
//           ]}
//           onPress={() => changeDoctor(doc.id)}
//         >
//           <View style={styles.doctorIcon}>
//             <Ionicons
//               name="medkit-outline"
//               size={21}
//               color={selectedDoctorId === doc.id ? "#fff" : COLORS.staff}
//             />
//           </View>

//           <View style={{ flex: 1 }}>
//             <Text
//               style={[
//                 styles.doctorName,
//                 selectedDoctorId === doc.id && { color: "#fff" },
//               ]}
//             >
//               {doc.name}
//             </Text>
//             <Text
//               style={[
//                 styles.doctorSub,
//                 selectedDoctorId === doc.id && {
//                   color: "rgba(255,255,255,0.85)",
//                 },
//               ]}
//             >
//               {doc.department} • ₹{doc.fee || 0}
//             </Text>
//           </View>

//           {selectedDoctorId === doc.id && (
//             <Ionicons name="checkmark-circle" size={23} color="#fff" />
//           )}
//         </TouchableOpacity>
//       ))}

//       <Text style={styles.sectionTitle}>Select Slot</Text>

//       {slotList.map((slot) => {
//         const active = selectedSlot === slot.key;
//         const disabled = !slot.enabled || slot.isFull;

//         return (
//           <TouchableOpacity
//             key={slot.key}
//             disabled={disabled}
//             style={[
//               styles.slotCard,
//               active && styles.activeSlotCard,
//               disabled && styles.disabledSlotCard,
//             ]}
//             onPress={() => setSelectedSlot(slot.key)}
//           >
//             <View style={styles.slotIcon}>
//               <Ionicons
//                 name={
//                   slot.key === "morning"
//                     ? "sunny-outline"
//                     : slot.key === "afternoon"
//                     ? "partly-sunny-outline"
//                     : "moon-outline"
//                 }
//                 size={22}
//                 color={active ? "#fff" : COLORS.staff}
//               />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={[styles.slotTitle, active && { color: "#fff" }]}>
//                 {slot.label}
//               </Text>

//               <Text
//                 style={[
//                   styles.slotSub,
//                   active && { color: "rgba(255,255,255,0.85)" },
//                 ]}
//               >
//                 {slot.enabled
//                   ? `${slot.startTime} - ${slot.endTime}`
//                   : "Not available"}
//               </Text>

//               <Text
//                 style={[
//                   styles.slotSub,
//                   active && { color: "rgba(255,255,255,0.85)" },
//                 ]}
//               >
//                 Queue: {slot.waitingCount} waiting • {slot.bookedCount}/
//                 {slot.maxPatients}
//               </Text>
//             </View>

//             {slot.isFull ? (
//               <Text style={styles.fullText}>Full</Text>
//             ) : active ? (
//               <Ionicons name="checkmark-circle" size={23} color="#fff" />
//             ) : null}
//           </TouchableOpacity>
//         );
//       })}

//       <View style={styles.formCard}>
//         <Text style={styles.formTitle}>Patient Details</Text>

//         <Input
//           label="Patient Name"
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter patient name"
//         />

//         <Input
//           label="Age"
//           value={age}
//           onChangeText={setAge}
//           placeholder="Enter age"
//           keyboardType="numeric"
//         />

//         <Input
//           label="Phone Number"
//           value={phone}
//           onChangeText={setPhone}
//           placeholder="Optional"
//           keyboardType="phone-pad"
//         />

//         <Text style={styles.label}>Visit Type</Text>

//         <View style={styles.visitRow}>
//           {["Walk-in", "Emergency", "Follow-up"].map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[styles.visitBtn, visitType === type && styles.activeVisit]}
//               onPress={() => setVisitType(type)}
//             >
//               <Text
//                 style={[
//                   styles.visitText,
//                   visitType === type && styles.activeVisitText,
//                 ]}
//               >
//                 {type}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <Input
//           label="Symptoms / Reason"
//           value={symptoms}
//           onChangeText={setSymptoms}
//           placeholder="Example: Fever, headache"
//           multiline
//         />
//       </View>

//       <TouchableOpacity style={styles.createBtn} activeOpacity={0.88} onPress={create}>
//         <Ionicons name="ticket-outline" size={20} color="#fff" />
//         <Text style={styles.createText}>Create Walk-in Token</Text>
//       </TouchableOpacity>
//     </ScrollView>
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
//         placeholderTextColor={COLORS.muted}
//         keyboardType={keyboardType}
//         multiline={multiline}
//         style={[styles.input, multiline && styles.multiline]}
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
//     marginBottom: 18,
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

//   infoCard: {
//     backgroundColor: COLORS.staff,
//     borderRadius: 24,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 8,
//   },

//   infoTitle: {
//     color: "#fff",
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
//     color: COLORS.text,
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
//     backgroundColor: COLORS.card,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   activeChip: {
//     backgroundColor: COLORS.staff,
//     borderColor: COLORS.staff,
//   },

//   chipText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },

//   activeChipText: {
//     color: "#fff",
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
//     elevation: 2,
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
//     fontWeight: "600",
//   },

//   slotCard: {
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

//   activeSlotCard: {
//     backgroundColor: COLORS.staff,
//     borderColor: COLORS.staff,
//   },

//   disabledSlotCard: {
//     opacity: 0.55,
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
//     fontSize: 15,
//   },

//   slotSub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   fullText: {
//     color: COLORS.danger,
//     fontWeight: "900",
//   },

//   formCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     marginTop: 12,
//     elevation: 2,
//   },

//   formTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginBottom: 14,
//   },

//   inputBox: {
//     marginBottom: 14,
//   },

//   label: {
//     color: COLORS.text,
//     fontWeight: "800",
//     marginBottom: 8,
//   },

//   input: {
//     height: 52,
//     backgroundColor: COLORS.background,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingHorizontal: 14,
//     color: COLORS.text,
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
//     backgroundColor: COLORS.background,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeVisit: {
//     backgroundColor: "#ECFDF5",
//     borderColor: COLORS.staff,
//   },

//   visitText: {
//     color: COLORS.text,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   activeVisitText: {
//     color: COLORS.staff,
//     fontWeight: "900",
//   },

//   createBtn: {
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 20,
//     marginBottom: 34,
//   },

//   createText: {
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

















import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";
import { useHospital } from "../../context/HospitalContext";

const getTodayDate = () => new Date().toISOString().split("T")[0];

const defaultTimings = {
  morning: {
    label: "Morning",
    enabled: true,
    startTime: "09:00 AM",
    endTime: "12:00 PM",
    maxPatients: 30,
  },
  afternoon: {
    label: "Afternoon",
    enabled: true,
    startTime: "01:00 PM",
    endTime: "04:00 PM",
    maxPatients: 25,
  },
  night: {
    label: "Night",
    enabled: true,
    startTime: "06:00 PM",
    endTime: "09:00 PM",
    maxPatients: 20,
  },
};

export default function CreateTokenScreen({ navigation }) {
  const { bookToken, tokens } = useQueue();
  const { hospitals } = useHospital();

  const hospital = hospitals.find((h) => h.id === "h1") || hospitals[0];

  const hospitalDoctors = hospital?.doctorList || [];

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(hospitalDoctors.map((doctor) => doctor.department)),
    ];

    if (uniqueDepartments.length > 0) {
      return uniqueDepartments;
    }

    return hospital?.departments || ["General OPD"];
  }, [hospitalDoctors, hospital]);

  const [department, setDepartment] = useState(departments[0] || "General OPD");

  const doctors = useMemo(() => {
    return hospitalDoctors.filter((doctor) => doctor.department === department);
  }, [hospitalDoctors, department]);

  const [selectedDoctorId, setSelectedDoctorId] = useState(
    doctors[0]?.id || ""
  );

  const selectedDoctor =
    doctors.find((doctor) => doctor.id === selectedDoctorId) || doctors[0];

  const doctorTimings = selectedDoctor?.timings || defaultTimings;

  const [selectedSlot, setSelectedSlot] = useState("morning");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [visitType, setVisitType] = useState("Walk-in");

  const [modalVisible, setModalVisible] = useState(false);
  const [tokenNo, setTokenNo] = useState(null);
  const [slotLabel, setSlotLabel] = useState("");

  const slotList = useMemo(() => {
    return Object.entries(doctorTimings).map(([key, data]) => {
      const slotTokens = tokens.filter(
        (t) =>
          t.hospitalId === hospital?.id &&
          t.department === department &&
          t.doctor === selectedDoctor?.name &&
          t.date === getTodayDate() &&
          t.slot === key
      );

      const bookedCount = slotTokens.length;
      const waitingCount = slotTokens.filter(
        (t) => t.status === "waiting"
      ).length;
      const maxPatients = Number(data?.maxPatients || 0);
      const isFull = maxPatients > 0 && bookedCount >= maxPatients;

      return {
        key,
        label: data?.label || key,
        enabled: !!data?.enabled,
        startTime: data?.startTime || "",
        endTime: data?.endTime || "",
        maxPatients,
        bookedCount,
        waitingCount,
        isFull,
      };
    });
  }, [doctorTimings, tokens, hospital?.id, department, selectedDoctor]);

  const changeDepartment = (dept) => {
    const deptDoctors = hospitalDoctors.filter(
      (doctor) => doctor.department === dept
    );

    setDepartment(dept);
    setSelectedDoctorId(deptDoctors[0]?.id || "");
    setSelectedSlot("morning");
  };

  const changeDoctor = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setSelectedSlot("morning");
  };

  const resetForm = () => {
    const firstDepartment = departments[0] || "General OPD";
    const firstDoctor = hospitalDoctors.find(
      (doctor) => doctor.department === firstDepartment
    );

    setName("");
    setAge("");
    setPhone("");
    setSymptoms("");
    setDepartment(firstDepartment);
    setSelectedDoctorId(firstDoctor?.id || "");
    setSelectedSlot("morning");
    setVisitType("Walk-in");
  };

  const create = () => {
    if (!selectedDoctor) {
      Alert.alert("No Doctor", "Please add doctors first.");
      return;
    }

    if (!name.trim() || !age.trim() || !symptoms.trim()) {
      Alert.alert(
        "Missing Details",
        "Please enter patient name, age and symptoms."
      );
      return;
    }

    const slotInfo = slotList.find((slot) => slot.key === selectedSlot);

    if (!slotInfo || !slotInfo.enabled) {
      Alert.alert("Slot Not Available", "Please select an available slot.");
      return;
    }

    if (slotInfo.isFull) {
      Alert.alert("Slot Full", "Please select another available slot.");
      return;
    }

    const token = bookToken({
      hospitalId: hospital?.id || "h1",
      hospitalName: hospital?.name || "City Care Hospital",

      department,
      doctor: selectedDoctor.name,
      doctorId: selectedDoctor.id,

      bookingSource: "staff",
      createdBy: "staff",

      patientName: name,
      age,
      phone,
      symptoms,
      visitType,

      date: getTodayDate(),
      displayDate: "Today",
      slot: selectedSlot,
      slotLabel: slotInfo.label,
      slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,

      doctorFee: selectedDoctor.fee || 0,
      platformFee: 0,
      totalAmount: selectedDoctor.fee || 0,
      paymentMethod: "Walk-in",
      paymentStatus: "PAY_AT_HOSPITAL",
      appointmentStatus: "CONFIRMED",
    });

    // Mobile alert for mobile
    if (Platform.OS === 'mobile') {
      Alert.alert(
        "Token Created",
        `Walk-in token ${token.tokenNo} created successfully for ${slotInfo.label}.`,
        [
          {
            text: "View Queue",
            onPress: () => navigation.navigate("Queue"),
          },
          {
            text: "Create Another",
            onPress: resetForm,
          },
        ]
      );
    }

    // For Web: show modal
    if (Platform.OS === 'web') {
      setTokenNo(token.tokenNo);
      setSlotLabel(slotInfo.label);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm();
  };

  if (!hospital || hospitalDoctors.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="medkit-outline" size={50} color={COLORS.muted} />
        <Text style={styles.emptyTitle}>No doctors found</Text>
        <Text style={styles.emptySub}>
          Add doctors in HospitalContext first. Then staff can create tokens for
          those same doctors.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Walk-in Token</Text>
          <Text style={styles.sub}>Create token for direct hospital visitors</Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="add-circle-outline" size={26} color={COLORS.staff} />
        </View>
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="business-outline" size={22} color="#fff" />
        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>{hospital?.name}</Text>
          <Text style={styles.infoSub}>Reception desk • Staff token creation</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select Department</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {departments.map((dept) => (
          <TouchableOpacity
            key={dept}
            style={[styles.chip, department === dept && styles.activeChip]}
            onPress={() => changeDepartment(dept)}
          >
            <Text
              style={[
                styles.chipText,
                department === dept && styles.activeChipText,
              ]}
            >
              {dept}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Select Doctor</Text>

      {doctors.map((doc) => (
        <TouchableOpacity
          key={doc.id}
          style={[
            styles.doctorCard,
            selectedDoctorId === doc.id && styles.activeDoctorCard,
          ]}
          onPress={() => changeDoctor(doc.id)}
        >
          <View style={styles.doctorIcon}>
            <Ionicons
              name="medkit-outline"
              size={21}
              color={selectedDoctorId === doc.id ? "#fff" : COLORS.staff}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.doctorName,
                selectedDoctorId === doc.id && { color: "#fff" },
              ]}
            >
              {doc.name}
            </Text>
            <Text
              style={[
                styles.doctorSub,
                selectedDoctorId === doc.id && {
                  color: "rgba(255,255,255,0.85)",
                },
              ]}
            >
              {doc.department} • ₹{doc.fee || 0}
            </Text>
          </View>

          {selectedDoctorId === doc.id && (
            <Ionicons name="checkmark-circle" size={23} color="#fff" />
          )}
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Select Slot</Text>

      {slotList.map((slot) => {
        const active = selectedSlot === slot.key;
        const disabled = !slot.enabled || slot.isFull;

        return (
          <TouchableOpacity
            key={slot.key}
            disabled={disabled}
            style={[
              styles.slotCard,
              active && styles.activeSlotCard,
              disabled && styles.disabledSlotCard,
            ]}
            onPress={() => setSelectedSlot(slot.key)}
          >
            <View style={styles.slotIcon}>
              <Ionicons
                name={
                  slot.key === "morning"
                    ? "sunny-outline"
                    : slot.key === "afternoon"
                    ? "partly-sunny-outline"
                    : "moon-outline"
                }
                size={22}
                color={active ? "#fff" : COLORS.staff}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={[styles.slotTitle, active && { color: "#fff" }]}>
                {slot.label}
              </Text>

              <Text
                style={[
                  styles.slotSub,
                  active && { color: "rgba(255,255,255,0.85)" },
                ]}
              >
                {slot.enabled
                  ? `${slot.startTime} - ${slot.endTime}`
                  : "Not available"}
              </Text>

              <Text
                style={[
                  styles.slotSub,
                  active && { color: "rgba(255,255,255,0.85)" },
                ]}
              >
                Queue: {slot.waitingCount} waiting • {slot.bookedCount}/
                {slot.maxPatients}
              </Text>
            </View>

            {slot.isFull ? (
              <Text style={styles.fullText}>Full</Text>
            ) : active ? (
              <Ionicons name="checkmark-circle" size={23} color="#fff" />
            ) : null}
          </TouchableOpacity>
        );
      })}

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Patient Details</Text>

        <Input
          label="Patient Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter patient name"
        />

        <Input
          label="Age"
          value={age}
          onChangeText={setAge}
          placeholder="Enter age"
          keyboardType="numeric"
        />

        <Input
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Optional"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Visit Type</Text>

        <View style={styles.visitRow}>
          {["Walk-in", "Emergency", "Follow-up"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.visitBtn, visitType === type && styles.activeVisit]}
              onPress={() => setVisitType(type)}
            >
              <Text
                style={[
                  styles.visitText,
                  visitType === type && styles.activeVisitText,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Symptoms / Reason"
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="Example: Fever, headache"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.createBtn} activeOpacity={0.88} onPress={create}>
        <Ionicons name="ticket-outline" size={20} color="#fff" />
        <Text style={styles.createText}>Create Walk-in Token</Text>
      </TouchableOpacity>

      {/* Modal for Web */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Token Created</Text>
              <Text style={styles.modalMessage}>
                Walk-in token {tokenNo} created successfully for {slotLabel}.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
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
        placeholderTextColor={COLORS.muted}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
  },

  sub: {
    color: COLORS.muted,
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
    backgroundColor: COLORS.staff,
    borderRadius: 24,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },

  infoTitle: {
    color: "#fff",
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
    color: COLORS.text,
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
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activeChip: {
    backgroundColor: COLORS.staff,
    borderColor: COLORS.staff,
  },

  chipText: {
    color: COLORS.text,
    fontWeight: "800",
  },

  activeChipText: {
    color: "#fff",
  },

  doctorCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
  },

  activeDoctorCard: {
    backgroundColor: COLORS.staff,
    borderColor: COLORS.staff,
  },

  doctorIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  doctorName: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 15,
  },

  doctorSub: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  slotCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  activeSlotCard: {
    backgroundColor: COLORS.staff,
    borderColor: COLORS.staff,
  },

  disabledSlotCard: {
    opacity: 0.55,
  },

  slotIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  slotTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 15,
  },

  slotSub: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
  },

  fullText: {
    color: COLORS.danger,
    fontWeight: "900",
  },

  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 12,
    elevation: 2,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 14,
  },

  inputBox: {
    marginBottom: 14,
  },

  label: {
    color: COLORS.text,
    fontWeight: "800",
    marginBottom: 8,
  },

  input: {
    height: 52,
    backgroundColor: COLORS.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    color: COLORS.text,
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
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  activeVisit: {
    backgroundColor: "#ECFDF5",
    borderColor: COLORS.staff,
  },

  visitText: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 12,
  },

  activeVisitText: {
    color: COLORS.staff,
    fontWeight: "900",
  },

  createBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    marginBottom: 34,
  },

  createText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyTitle: {
    marginTop: 12,
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "900",
  },

  emptySub: {
    color: COLORS.muted,
    marginTop: 6,
    textAlign: "center",
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },

  modalButton: {
    backgroundColor: COLORS.staff,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});  





