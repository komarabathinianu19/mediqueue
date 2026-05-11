


// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   TextInput,
//   Image,
//   Alert,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// const fallbackDoctorMap = {
//   "General OPD": ["Dr. Sandeep", "Dr. Ramesh"],
//   Cardiology: ["Dr. Rao", "Dr. Kavitha"],
//   Pediatrics: ["Dr. Meena", "Dr. John"],
//   Ortho: ["Dr. Kiran", "Dr. Vivek"],
//   Dental: ["Dr. Neha", "Dr. Arjun"],
//   ENT: ["Dr. Sameer Khan"],
// };

// const fallbackDoctorFees = {
//   "Dr. Sandeep": 400,
//   "Dr. Ramesh": 450,
//   "Dr. Rao": 700,
//   "Dr. Kavitha": 750,
//   "Dr. Meena": 500,
//   "Dr. John": 500,
//   "Dr. Kiran": 650,
//   "Dr. Vivek": 650,
//   "Dr. Neha": 350,
//   "Dr. Arjun": 400,
//   "Dr. Sameer Khan": 450,
//   "Any Available": 300,
// };

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

// const getTodayDate = () => {
//   return new Date().toISOString().split("T")[0];
// };

// export default function BookTokenScreen({ route, navigation }) {
//   const { hospital, selectedDepartment, selectedDoctor } = route.params || {};
//   const { tokens } = useQueue();

//   const departments = useMemo(() => {
//     if (Array.isArray(hospital?.departments) && hospital.departments.length > 0) {
//       return hospital.departments;
//     }

//     return ["General OPD", "Cardiology", "Pediatrics"];
//   }, [hospital]);

//   const [department, setDepartment] = useState(
//     selectedDepartment || departments[0]
//   );

//   const doctorsFromHospital = useMemo(() => {
//     const doctorList = hospital?.doctorList || [];

//     const filteredDoctors = doctorList.filter(
//       (doctorItem) => doctorItem.department === department
//     );

//     if (filteredDoctors.length > 0) {
//       return filteredDoctors;
//     }

//     return (fallbackDoctorMap[department] || ["Any Available"]).map((name) => ({
//       id: name,
//       name,
//       department,
//       fee: fallbackDoctorFees[name] || 500,
//       qualification: "Available Doctor",
//       experience: "Available today",
//       timings: defaultTimings,
//     }));
//   }, [hospital, department]);

//   const firstDoctorName =
//     selectedDoctor || doctorsFromHospital[0]?.name || "Any Available";

//   const [doctor, setDoctor] = useState(firstDoctorName);
//   const [selectedSlot, setSelectedSlot] = useState("morning");

//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [symptoms, setSymptoms] = useState("");
//   const [visitType, setVisitType] = useState("New Patient");

//   const selectedDoctorObject = useMemo(() => {
//     return (
//       doctorsFromHospital.find((doctorItem) => doctorItem.name === doctor) ||
//       doctorsFromHospital[0]
//     );
//   }, [doctorsFromHospital, doctor]);

//   const doctorTimings = selectedDoctorObject?.timings || defaultTimings;

//   const availableSlots = useMemo(() => {
//     return Object.entries(doctorTimings).map(([slotKey, slotData]) => {
//       const doctorName = selectedDoctorObject?.name || doctor;

//       const slotTokens = (tokens || []).filter(
//         (token) =>
//           token.hospitalId === hospital?.id &&
//           token.department === department &&
//           token.doctor === doctorName &&
//           token.date === getTodayDate() &&
//           token.slot === slotKey
//       );

//       const bookedCount = slotTokens.length;
//       const maxPatients = Number(slotData?.maxPatients || 0);
//       const isFull = maxPatients > 0 && bookedCount >= maxPatients;

//       return {
//         key: slotKey,
//         label: slotData?.label || slotKey,
//         enabled: !!slotData?.enabled,
//         startTime: slotData?.startTime || "",
//         endTime: slotData?.endTime || "",
//         maxPatients,
//         bookedCount,
//         waitingCount: slotTokens.filter((token) => token.status === "waiting")
//           .length,
//         isFull,
//       };
//     });
//   }, [
//     doctorTimings,
//     tokens,
//     hospital?.id,
//     department,
//     doctor,
//     selectedDoctorObject,
//   ]);

//   const changeDepartment = (dept) => {
//     setDepartment(dept);

//     const hospitalDoctors = hospital?.doctorList || [];
//     const firstHospitalDoctor = hospitalDoctors.find(
//       (doctorItem) => doctorItem.department === dept
//     );

//     const fallbackDoctor = fallbackDoctorMap[dept]?.[0] || "Any Available";

//     setDoctor(firstHospitalDoctor?.name || fallbackDoctor);
//     setSelectedSlot("morning");
//   };

//   const changeDoctor = (doctorName) => {
//     setDoctor(doctorName);
//     setSelectedSlot("morning");
//   };

//   const submit = () => {
//     if (!name.trim() || !age.trim() || !symptoms.trim()) {
//       Alert.alert(
//         "Missing Details",
//         "Please enter patient name, age and symptoms."
//       );
//       return;
//     }

//     const slotInfo = availableSlots.find((slot) => slot.key === selectedSlot);

//     if (!slotInfo || !slotInfo.enabled) {
//       Alert.alert("Slot Not Available", "Please select an available slot.");
//       return;
//     }

//     if (slotInfo.isFull) {
//       Alert.alert(
//         "Slot Full",
//         "This slot is already full. Please select another slot."
//       );
//       return;
//     }

//     const doctorFee =
//       selectedDoctorObject?.fee || fallbackDoctorFees[doctor] || 500;

//     const appointment = {
//   hospitalId: hospital?.id,
//   hospitalName: hospital?.name,
//   department,
//   doctor,
//   doctorId: selectedDoctorObject?.id || doctor,

//   bookingSource: "patient",
//   createdBy: "patient",

//   patientName: name,
//   age,
//   symptoms,
//   visitType,

//       date: getTodayDate(),
//       displayDate: "Today",

//       slot: selectedSlot,
//       slotLabel: slotInfo.label,
//       slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,

//       doctorFee,
//       platformFee: 20,
//       appointmentStatus: "PAYMENT_PENDING",
//       paymentStatus: "PENDING",
//     };

//     navigation.navigate("Payment", { appointment });
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.hero}>
//         <Image source={{ uri: hospital?.image }} style={styles.heroImage} />

//         <LinearGradient
//           colors={["rgba(15,23,42,0.15)", "rgba(15,23,42,0.80)"]}
//           style={styles.overlay}
//         />

//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.heroText}>
//           <Text style={styles.heroTitle}>Book Token</Text>
//           <Text style={styles.heroSub}>{hospital?.name}</Text>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.sectionTitle}>Select Department</Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.chipRow}
//         >
//           {departments.map((dept) => (
//             <TouchableOpacity
//               key={dept}
//               style={[styles.chip, department === dept && styles.activeChip]}
//               onPress={() => changeDepartment(dept)}
//             >
//               <Text
//                 style={[
//                   styles.chipText,
//                   department === dept && styles.activeChipText,
//                 ]}
//               >
//                 {dept}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>

//         <Text style={styles.sectionTitle}>Select Doctor</Text>

//         {doctorsFromHospital.map((doc) => (
//           <TouchableOpacity
//             key={doc.id || doc.name}
//             style={[
//               styles.doctorCard,
//               doctor === doc.name && styles.activeDoctorCard,
//             ]}
//             onPress={() => changeDoctor(doc.name)}
//           >
//             <View style={styles.doctorIcon}>
//               <Ionicons
//                 name="medkit-outline"
//                 size={22}
//                 color={doctor === doc.name ? "#fff" : COLORS.primary}
//               />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text
//                 style={[
//                   styles.doctorName,
//                   doctor === doc.name && { color: "#fff" },
//                 ]}
//               >
//                 {doc.name}
//               </Text>

//               <Text
//                 style={[
//                   styles.doctorSub,
//                   doctor === doc.name && { color: "rgba(255,255,255,0.85)" },
//                 ]}
//               >
//                 {doc.qualification || department} • ₹{doc.fee || 500}
//               </Text>
//             </View>

//             {doctor === doc.name && (
//               <Ionicons name="checkmark-circle" size={24} color="#fff" />
//             )}
//           </TouchableOpacity>
//         ))}

//         <Text style={styles.sectionTitle}>Select Appointment Slot</Text>

//         {availableSlots.map((slot) => {
//           const isActive = selectedSlot === slot.key;
//           const disabled = !slot.enabled || slot.isFull;

//           return (
//             <TouchableOpacity
//               key={slot.key}
//               disabled={disabled}
//               style={[
//                 styles.slotCard,
//                 isActive && styles.activeSlotCard,
//                 disabled && styles.disabledSlotCard,
//               ]}
//               onPress={() => setSelectedSlot(slot.key)}
//             >
//               <View style={styles.slotLeft}>
//                 <View
//                   style={[
//                     styles.slotIcon,
//                     isActive && { backgroundColor: "rgba(255,255,255,0.20)" },
//                   ]}
//                 >
//                   <Ionicons
//                     name={
//                       slot.key === "morning"
//                         ? "sunny-outline"
//                         : slot.key === "afternoon"
//                         ? "partly-sunny-outline"
//                         : "moon-outline"
//                     }
//                     size={22}
//                     color={isActive ? "#fff" : COLORS.primary}
//                   />
//                 </View>

//                 <View style={{ flex: 1 }}>
//                   <Text
//                     style={[
//                       styles.slotTitle,
//                       isActive && { color: "#fff" },
//                       disabled && { color: COLORS.muted },
//                     ]}
//                   >
//                     {slot.label}
//                   </Text>

//                   <Text
//                     style={[
//                       styles.slotTime,
//                       isActive && { color: "rgba(255,255,255,0.88)" },
//                     ]}
//                   >
//                     {slot.enabled
//                       ? `${slot.startTime} - ${slot.endTime}`
//                       : "Not available"}
//                   </Text>

//                   <Text
//                     style={[
//                       styles.slotQueue,
//                       isActive && { color: "rgba(255,255,255,0.88)" },
//                     ]}
//                   >
//                     Live Queue: {slot.waitingCount} waiting • {slot.bookedCount}/
//                     {slot.maxPatients || 0} booked
//                   </Text>
//                 </View>
//               </View>

//               {slot.isFull ? (
//                 <Text style={styles.fullText}>Full</Text>
//               ) : isActive ? (
//                 <Ionicons name="checkmark-circle" size={24} color="#fff" />
//               ) : null}
//             </TouchableOpacity>
//           );
//         })}

//         <Text style={styles.sectionTitle}>Patient Details</Text>

//         <Input label="Patient Name" value={name} onChangeText={setName} />

//         <Input
//           label="Age"
//           value={age}
//           onChangeText={setAge}
//           keyboardType="numeric"
//         />

//         <Text style={styles.label}>Visit Type</Text>

//         <View style={styles.visitRow}>
//           {["New Patient", "Follow-up"].map((type) => (
//             <TouchableOpacity
//               key={type}
//               style={[
//                 styles.visitBtn,
//                 visitType === type && styles.activeVisitBtn,
//               ]}
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
//           label="Symptoms"
//           value={symptoms}
//           onChangeText={setSymptoms}
//           placeholder="Example: Fever, headache"
//           multiline
//         />

//         <TouchableOpacity activeOpacity={0.9} onPress={submit}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.button}
//           >
//             <Ionicons name="card-outline" size={20} color="#fff" />
//             <Text style={styles.buttonText}>Continue to Payment</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// function Input({
//   label,
//   value,
//   onChangeText,
//   keyboardType,
//   placeholder,
//   multiline,
// }) {
//   return (
//     <View style={styles.inputBox}>
//       <Text style={styles.label}>{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         keyboardType={keyboardType}
//         placeholder={placeholder}
//         placeholderTextColor={COLORS.muted}
//         multiline={multiline}
//         style={[styles.input, multiline && styles.multiline]}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },

//   hero: {
//     height: 240,
//     position: "relative",
//   },

//   heroImage: {
//     width: "100%",
//     height: "100%",
//   },

//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//   },

//   backBtn: {
//     position: "absolute",
//     top: 52,
//     left: 18,
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   heroText: {
//     position: "absolute",
//     left: 18,
//     right: 18,
//     bottom: 24,
//   },

//   heroTitle: {
//     color: "#fff",
//     fontSize: 30,
//     fontWeight: "900",
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.88)",
//     fontWeight: "700",
//     marginTop: 6,
//   },

//   content: {
//     padding: 18,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 18,
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
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
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
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },

//   doctorIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: COLORS.lightBlue,
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
//     borderRadius: 22,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     elevation: 2,
//   },

//   activeSlotCard: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },

//   disabledSlotCard: {
//     opacity: 0.55,
//   },

//   slotLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     flex: 1,
//   },

//   slotIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   slotTitle: {
//     color: COLORS.text,
//     fontSize: 15,
//     fontWeight: "900",
//   },

//   slotTime: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontWeight: "700",
//     fontSize: 12,
//   },

//   slotQueue: {
//     color: COLORS.primary,
//     marginTop: 4,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   fullText: {
//     color: COLORS.warning,
//     fontWeight: "900",
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
//     backgroundColor: COLORS.card,
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
//     gap: 12,
//     marginBottom: 14,
//   },

//   visitBtn: {
//     flex: 1,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: COLORS.card,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   activeVisitBtn: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },

//   visitText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },

//   activeVisitText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },

//   button: {
//     height: 56,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 16,
//     marginBottom: 34,
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });































// BookTokenScreen.js
// Uses real doctors from backend. Queue counts come from real DB tokens.

import React, { useMemo, useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput, Image, Alert, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital, parseTimings, defaultDoctorTimings } from "../../context/HospitalContext";
import { useQueue } from "../../context/QueueContext";

const getTodayDate = () => new Date().toISOString().split("T")[0];

export default function BookTokenScreen({ route, navigation }) {
  const { hospital, selectedDepartment, selectedDoctor } = route.params || {};
  const { getDoctorsByHospital } = useHospital();
  const { bookToken, loadActiveQueue } = useQueue();

  const hospitalId = hospital?.id || hospital?.hospitalId;

  // ── State ─────────────────────────────────────────────────────────────────
  const [allDoctors, setAllDoctors]       = useState([]);
  const [loadingDocs, setLoadingDocs]     = useState(true);
  const [slotCounts, setSlotCounts]       = useState({}); // slotKey → { booked, waiting }
  const [submitting, setSubmitting]       = useState(false);

  const departments = useMemo(() => {
    if (Array.isArray(hospital?.departments) && hospital.departments.length > 0)
      return hospital.departments;
    return ["General OPD"];
  }, [hospital]);

  const [department, setDepartment] = useState(selectedDepartment || departments[0]);
  const [doctor, setDoctor]         = useState(selectedDoctor || "");
  const [selectedSlot, setSelectedSlot] = useState("morning");

  const [name, setName]       = useState("");
  const [age, setAge]         = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [visitType, setVisitType] = useState("New Patient");

  // ── Load doctors from backend ─────────────────────────────────────────────
  useEffect(() => {
    if (!hospitalId) return;
    setLoadingDocs(true);
    getDoctorsByHospital(hospitalId)
      .then((docs) => {
        setAllDoctors(docs);
        // Set default doctor for the current department
        const firstDoc = docs.find((d) => d.department === department);
        if (!doctor && firstDoc) setDoctor(firstDoc.name);
      })
      .finally(() => setLoadingDocs(false));
  }, [hospitalId]);

  // ── Doctors for the selected department ───────────────────────────────────
  const doctorsForDept = useMemo(() => {
    return allDoctors.filter((d) => d.department === department);
  }, [allDoctors, department]);

  // ── Selected doctor object ─────────────────────────────────────────────────
  const selectedDoctorObj = useMemo(() => {
    return doctorsForDept.find((d) => d.name === doctor) || doctorsForDept[0] || null;
  }, [doctorsForDept, doctor]);

  // ── Doctor timings ─────────────────────────────────────────────────────────
  const doctorTimings = useMemo(() => {
    if (!selectedDoctorObj) return defaultDoctorTimings;
    return parseTimings(selectedDoctorObj.timingsJson) || defaultDoctorTimings;
  }, [selectedDoctorObj]);

  // ── Load real queue counts for all slots ──────────────────────────────────
  useEffect(() => {
    if (!hospitalId || !doctor) return;
    const today = getTodayDate();

    const loadCounts = async () => {
      const counts = {};
      for (const slotKey of ["morning", "afternoon", "night"]) {
        try {
          const queue = await loadActiveQueue(hospitalId, department, doctor, slotKey, today);
          counts[slotKey] = {
            booked: queue.length,
            waiting: queue.filter((t) => t.status === "waiting").length,
          };
        } catch {
          counts[slotKey] = { booked: 0, waiting: 0 };
        }
      }
      setSlotCounts(counts);
    };

    loadCounts();
  }, [hospitalId, department, doctor]);

  // ── Available slots with real counts ──────────────────────────────────────
  const availableSlots = useMemo(() => {
    return Object.entries(doctorTimings).map(([slotKey, slotData]) => {
      const counts = slotCounts[slotKey] || { booked: 0, waiting: 0 };
      const maxPatients = Number(slotData?.maxPatients || 0);
      const isFull = maxPatients > 0 && counts.booked >= maxPatients;
      return {
        key: slotKey,
        label: slotData?.label || slotKey,
        enabled: !!slotData?.enabled,
        startTime: slotData?.startTime || "",
        endTime: slotData?.endTime || "",
        maxPatients,
        bookedCount: counts.booked,
        waitingCount: counts.waiting,
        isFull,
      };
    });
  }, [doctorTimings, slotCounts]);

  // ── Department change ─────────────────────────────────────────────────────
  const changeDepartment = (dept) => {
    setDepartment(dept);
    const firstDoc = allDoctors.find((d) => d.department === dept);
    setDoctor(firstDoc?.name || "");
    setSelectedSlot("morning");
  };

  // ── Submit → book token via backend ───────────────────────────────────────
  const submit = async () => {
    if (!name.trim() || !age.trim() || !symptoms.trim()) {
      Alert.alert("Missing Details", "Please enter patient name, age and symptoms.");
      return;
    }

    const slotInfo = availableSlots.find((s) => s.key === selectedSlot);
    if (!slotInfo?.enabled) {
      Alert.alert("Slot Not Available", "Please select an available slot.");
      return;
    }
    if (slotInfo.isFull) {
      Alert.alert("Slot Full", "This slot is full. Please select another slot.");
      return;
    }
    if (!selectedDoctorObj) {
      Alert.alert("No Doctor", "Please select a doctor.");
      return;
    }

    const appointment = {
      hospitalId,
      hospitalName: hospital?.name,
      department,
      doctor: selectedDoctorObj.name,
      doctorId: selectedDoctorObj.id,
      bookingSource: "patient",
      patientName: name,
      age,
      symptoms,
      visitType,
      date: getTodayDate(),
      slot: selectedSlot,
      slotLabel: slotInfo.label,
      slotTime: `${slotInfo.startTime} - ${slotInfo.endTime}`,
      doctorFee: selectedDoctorObj.fee || 500,
      platformFee: 20,
      appointmentStatus: "PAYMENT_PENDING",
      paymentStatus: "PENDING",
    };

    // Navigate to payment screen — payment screen will call bookToken after payment
    navigation.navigate("Payment", { appointment });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Image source={{ uri: hospital?.image || hospital?.imageUrl }} style={styles.heroImage} />
        <LinearGradient colors={["rgba(15,23,42,0.15)", "rgba(15,23,42,0.80)"]} style={styles.overlay} />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>Book Token</Text>
          <Text style={styles.heroSub}>{hospital?.name}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {/* Department */}
        <Text style={styles.sectionTitle}>Select Department</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {departments.map((dept) => (
            <TouchableOpacity
              key={dept}
              style={[styles.chip, department === dept && styles.activeChip]}
              onPress={() => changeDepartment(dept)}
            >
              <Text style={[styles.chipText, department === dept && styles.activeChipText]}>{dept}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Doctors */}
        <Text style={styles.sectionTitle}>Select Doctor</Text>
        {loadingDocs ? (
          <ActivityIndicator color={COLORS.primary} style={{ marginVertical: 20 }} />
        ) : doctorsForDept.length === 0 ? (
          <View style={styles.emptyDoctors}>
            <Text style={styles.emptyDoctorsText}>No doctors added for this department yet.</Text>
          </View>
        ) : (
          doctorsForDept.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={[styles.doctorCard, doctor === doc.name && styles.activeDoctorCard]}
              onPress={() => { setDoctor(doc.name); setSelectedSlot("morning"); }}
            >
              <View style={styles.doctorIcon}>
                <Ionicons
                  name="medkit-outline" size={22}
                  color={doctor === doc.name ? "#fff" : COLORS.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.doctorName, doctor === doc.name && { color: "#fff" }]}>
                  {doc.name}
                </Text>
                <Text style={[styles.doctorSub, doctor === doc.name && { color: "rgba(255,255,255,0.85)" }]}>
                  {doc.qualification || department} • ₹{doc.fee || 500}
                </Text>
              </View>
              {doctor === doc.name && <Ionicons name="checkmark-circle" size={24} color="#fff" />}
            </TouchableOpacity>
          ))
        )}

        {/* Slots */}
        <Text style={styles.sectionTitle}>Select Appointment Slot</Text>
        {availableSlots.map((slot) => {
          const isActive = selectedSlot === slot.key;
          const disabled = !slot.enabled || slot.isFull;
          return (
            <TouchableOpacity
              key={slot.key}
              disabled={disabled}
              style={[styles.slotCard, isActive && styles.activeSlotCard, disabled && styles.disabledSlotCard]}
              onPress={() => setSelectedSlot(slot.key)}
            >
              <View style={styles.slotLeft}>
                <View style={[styles.slotIcon, isActive && { backgroundColor: "rgba(255,255,255,0.20)" }]}>
                  <Ionicons
                    name={slot.key === "morning" ? "sunny-outline" : slot.key === "afternoon" ? "partly-sunny-outline" : "moon-outline"}
                    size={22} color={isActive ? "#fff" : COLORS.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.slotTitle, isActive && { color: "#fff" }, disabled && { color: COLORS.muted }]}>
                    {slot.label}
                  </Text>
                  <Text style={[styles.slotTime, isActive && { color: "rgba(255,255,255,0.88)" }]}>
                    {slot.enabled ? `${slot.startTime} - ${slot.endTime}` : "Not available"}
                  </Text>
                  <Text style={[styles.slotQueue, isActive && { color: "rgba(255,255,255,0.88)" }]}>
                    Live Queue: {slot.waitingCount} waiting • {slot.bookedCount}/{slot.maxPatients || 0} booked
                  </Text>
                </View>
              </View>
              {slot.isFull ? (
                <Text style={styles.fullText}>Full</Text>
              ) : isActive ? (
                <Ionicons name="checkmark-circle" size={24} color="#fff" />
              ) : null}
            </TouchableOpacity>
          );
        })}

        {/* Patient Details */}
        <Text style={styles.sectionTitle}>Patient Details</Text>
        <Input label="Patient Name" value={name} onChangeText={setName} />
        <Input label="Age" value={age} onChangeText={setAge} keyboardType="numeric" />

        <Text style={styles.label}>Visit Type</Text>
        <View style={styles.visitRow}>
          {["New Patient", "Follow-up"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.visitBtn, visitType === type && styles.activeVisitBtn]}
              onPress={() => setVisitType(type)}
            >
              <Text style={[styles.visitText, visitType === type && styles.activeVisitText]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input label="Symptoms" value={symptoms} onChangeText={setSymptoms}
          placeholder="Example: Fever, headache" multiline />

        <TouchableOpacity activeOpacity={0.9} onPress={submit} disabled={submitting}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.button}>
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="card-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>Continue to Payment</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Input({ label, value, onChangeText, keyboardType, placeholder, multiline }) {
  return (
    <View style={styles.inputBox}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={COLORS.muted}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { height: 240, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject },
  backBtn: {
    position: "absolute", top: 52, left: 18, width: 44, height: 44,
    borderRadius: 16, backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center", justifyContent: "center",
  },
  heroText: { position: "absolute", left: 18, right: 18, bottom: 24 },
  heroTitle: { color: "#fff", fontSize: 30, fontWeight: "900" },
  heroSub: { color: "rgba(255,255,255,0.88)", fontWeight: "700", marginTop: 6 },
  content: { padding: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text, marginTop: 18, marginBottom: 12 },
  chipRow: { gap: 10, paddingRight: 18 },
  chip: { paddingHorizontal: 16, paddingVertical: 11, borderRadius: 999, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  activeChip: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { color: COLORS.text, fontWeight: "800" },
  activeChipText: { color: "#fff" },
  emptyDoctors: { padding: 20, alignItems: "center", backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  emptyDoctorsText: { color: COLORS.muted, fontWeight: "600" },
  doctorCard: { backgroundColor: COLORS.card, borderRadius: 20, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", gap: 12, elevation: 2 },
  activeDoctorCard: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  doctorIcon: { width: 44, height: 44, borderRadius: 16, backgroundColor: COLORS.lightBlue, alignItems: "center", justifyContent: "center" },
  doctorName: { color: COLORS.text, fontWeight: "900", fontSize: 15 },
  doctorSub: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },
  slotCard: { backgroundColor: COLORS.card, borderRadius: 22, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", justifyContent: "space-between", elevation: 2 },
  activeSlotCard: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  disabledSlotCard: { opacity: 0.55 },
  slotLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  slotIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: COLORS.lightBlue, alignItems: "center", justifyContent: "center" },
  slotTitle: { color: COLORS.text, fontSize: 15, fontWeight: "900" },
  slotTime: { color: COLORS.muted, marginTop: 4, fontWeight: "700", fontSize: 12 },
  slotQueue: { color: COLORS.primary, marginTop: 4, fontWeight: "800", fontSize: 12 },
  fullText: { color: COLORS.warning, fontWeight: "900" },
  inputBox: { marginBottom: 14 },
  label: { color: COLORS.text, fontWeight: "800", marginBottom: 8 },
  input: { height: 52, backgroundColor: COLORS.card, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 14, color: COLORS.text, fontWeight: "700" },
  multiline: { height: 96, paddingTop: 14, textAlignVertical: "top" },
  visitRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  visitBtn: { flex: 1, height: 48, borderRadius: 16, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, alignItems: "center", justifyContent: "center" },
  activeVisitBtn: { backgroundColor: COLORS.lightBlue, borderColor: COLORS.primary },
  visitText: { color: COLORS.text, fontWeight: "800" },
  activeVisitText: { color: COLORS.primary, fontWeight: "900" },
  button: { height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, marginTop: 16, marginBottom: 34 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});