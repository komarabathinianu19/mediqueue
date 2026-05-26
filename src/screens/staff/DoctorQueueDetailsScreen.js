



// import React, { useMemo } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function DoctorQueueDetailsScreen({ route, navigation }) {
//   const {
//     hospitalId,
//     hospitalName,
//     department,
//     doctor,
//     date,
//     slot = "morning",
//     slotLabel = "Morning",
//     slotTime = "",
//   } = route.params || {};

//   const {
//     tokens,
//     callNextPatient,
//     completeDoctorPatient,
//     skipDoctorPatient,
//   } = useQueue();

//   const queueTokens = useMemo(() => {
//     return tokens
//       .filter(
//         (t) =>
//           (!hospitalId || t.hospitalId === hospitalId) &&
//           t.department === department &&
//           t.doctor === doctor &&
//           t.date === date &&
//           t.slot === slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => {
//         const aNo =
//           a.tokenNumber ||
//           Number(String(a.tokenNo || "").replace(/\D/g, "")) ||
//           0;

//         const bNo =
//           b.tokenNumber ||
//           Number(String(b.tokenNo || "").replace(/\D/g, "")) ||
//           0;

//         return aNo - bNo;
//       });
//   }, [tokens, hospitalId, department, doctor, date, slot]);

//   const servingToken = queueTokens.find((t) => t.status === "serving");
//   const waitingCount = queueTokens.filter((t) => t.status === "waiting").length;

//   const handleNext = () => {
//     /**
//      * NEXT button flow:
//      * 1. Current serving patient becomes completed.
//      * 2. Next waiting patient becomes serving.
//      * 3. Patient side feedback button enables for completed patient.
//      */

//     if (servingToken) {
//       completeDoctorPatient(department, doctor, slot, date, hospitalId);

//       setTimeout(() => {
//         callNextPatient(department, doctor, slot, date, hospitalId);
//       }, 100);

//       return;
//     }

//     callNextPatient(department, doctor, slot, date, hospitalId);
//   };

//   const handleComplete = () => {
//     /**
//      * COMPLETE button flow:
//      * 1. Current serving patient becomes completed.
//      * 2. No next patient will be called.
//      * 3. Patient side feedback button enables for completed patient.
//      */

//     if (!servingToken) {
//       Alert.alert("No Patient", "No patient is currently serving.");
//       return;
//     }

//     completeDoctorPatient(department, doctor, slot, date, hospitalId);

//     Alert.alert(
//       "Appointment Completed",
//       `${servingToken.patientName || "Patient"} appointment completed. Feedback is now enabled in patient visits.`
//     );
//   };

//   const handleSkip = () => {
//     if (!servingToken) {
//       Alert.alert("No Patient", "No patient is currently serving.");
//       return;
//     }

//     skipDoctorPatient(department, doctor, slot, date, hospitalId);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           activeOpacity={0.8}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{department}</Text>
//           <Text style={styles.sub}>{doctor}</Text>
//           <Text style={styles.slotSub}>
//             {slotLabel} {slotTime ? `• ${slotTime}` : ""} •{" "}
//             {hospitalName || "Hospital"}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.nowCard}>
//         <Text style={styles.nowLabel}>Now Serving</Text>

//         <Text style={styles.nowToken}>{servingToken?.tokenNo || "None"}</Text>

//         <Text style={styles.nowName}>
//           {servingToken?.patientName || "No patient currently serving"}
//         </Text>
//       </View>

//       <View style={styles.actionRow}>
//         <TouchableOpacity
//           style={styles.primaryBtn}
//           activeOpacity={0.85}
//           onPress={handleNext}
//         >
//           <Text style={styles.primaryText}>
//             {servingToken ? "Complete & Next" : "Next"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.secondaryBtn,
//             !servingToken && styles.disabledBtn,
//           ]}
//           activeOpacity={0.85}
//           onPress={handleComplete}
//           disabled={!servingToken}
//         >
//           <Text
//             style={[
//               styles.secondaryText,
//               !servingToken && styles.disabledText,
//             ]}
//           >
//             Complete
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.dangerBtn,
//             !servingToken && styles.disabledBtn,
//           ]}
//           activeOpacity={0.85}
//           onPress={handleSkip}
//           disabled={!servingToken}
//         >
//           <Text
//             style={[
//               styles.dangerText,
//               !servingToken && styles.disabledText,
//             ]}
//           >
//             Skip
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.sectionTitle}>Waiting Queue ({waitingCount})</Text>

//       <FlatList
//         data={queueTokens}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Text style={styles.emptyTitle}>No patients in this slot queue</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.card,
//               item.status === "serving" && styles.servingCard,
//             ]}
//           >
//             <View style={styles.tokenBox}>
//               <Text style={styles.token}>{item.tokenNo}</Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.patientName}</Text>
//               <Text style={styles.meta}>Age: {item.age || "-"}</Text>
//               <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
//               <Text style={styles.meta}>
//                 Visit: {item.visitType || "New Patient"}
//               </Text>
//               <Text style={styles.meta}>
//                 Payment: {item.paymentStatus || "PENDING"}
//               </Text>
//             </View>

//             <Text
//               style={[
//                 styles.status,
//                 item.status === "serving" && styles.servingStatus,
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 18,
//   },

//   header: {
//     marginTop: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 18,
//   },

//   backBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   title: {
//     fontSize: 23,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   slotSub: {
//     color: COLORS.staff,
//     marginTop: 4,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   nowCard: {
//     backgroundColor: COLORS.staff,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   nowLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   nowToken: {
//     color: "#fff",
//     fontSize: 44,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   nowName: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 6,
//   },

//   actionRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginTop: 16,
//   },

//   primaryBtn: {
//     flex: 1,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   secondaryBtn: {
//     flex: 1,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: "#ECFDF5",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   dangerBtn: {
//     flex: 1,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: "#FEF2F2",
//     borderWidth: 1,
//     borderColor: "#FECACA",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   disabledBtn: {
//     backgroundColor: "#F1F5F9",
//     borderColor: "#E2E8F0",
//   },

//   primaryText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   secondaryText: {
//     color: COLORS.staff,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   dangerText: {
//     color: COLORS.danger,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   disabledText: {
//     color: COLORS.muted,
//   },

//   sectionTitle: {
//     marginTop: 24,
//     marginBottom: 12,
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     gap: 14,
//   },

//   servingCard: {
//     backgroundColor: "#ECFDF5",
//     borderColor: COLORS.staff,
//   },

//   tokenBox: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   token: {
//     color: COLORS.staff,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   name: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   status: {
//     color: COLORS.warning,
//     fontWeight: "900",
//     textTransform: "capitalize",
//     fontSize: 12,
//   },

//   servingStatus: {
//     color: COLORS.staff,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 24,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },
// });  

























// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function DoctorQueueDetailsScreen({ route, navigation }) {
//   const {
//     hospitalId,
//     hospitalName,
//     department,
//     doctor,
//     date,
//     slot = "morning",
//     slotLabel = "Morning",
//     slotTime = "",
//   } = route.params || {};

//   const {
//     tokens,
//     callNextPatient,
//     completeDoctorPatient,
//     skipDoctorPatient,
//   } = useQueue();

//   const [processing, setProcessing] = useState(false);

//   // Filter and sort tokens for the specific doctor and slot
//   const queueTokens = useMemo(() => {
//     return tokens
//       .filter(
//         (t) =>
//           (!hospitalId || t.hospitalId === hospitalId) &&
//           t.department === department &&
//           t.doctor === doctor &&
//           t.date === date &&
//           t.slot === slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => {
//         const aNo = a.tokenNumber || Number(String(a.tokenNo || "").replace(/\D/g, "")) || 0;
//         const bNo = b.tokenNumber || Number(String(b.tokenNo || "").replace(/\D/g, "")) || 0;
//         return aNo - bNo;
//       });
//   }, [tokens, hospitalId, department, doctor, date, slot]);

//   const servingToken = queueTokens.find((t) => t.status === "serving");
//   const waitingCount = queueTokens.filter((t) => t.status === "waiting").length;

//   const handleNext = async () => {
//     setProcessing(true);
//     try {
//       if (servingToken) {
//         // Complete current, then call next
//         await completeDoctorPatient(department, doctor, slot, date, hospitalId);
//       }
//       await callNextPatient(department, doctor, slot, date, hospitalId);
//     } catch (error) {
//       Alert.alert("Error", "Could not update queue. Please check connection.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleComplete = async () => {
//     if (!servingToken) return;
    
//     setProcessing(true);
//     try {
//       await completeDoctorPatient(department, doctor, slot, date, hospitalId);
//       Alert.alert("Success", "Appointment completed. Patient can now leave feedback.");
//     } catch (error) {
//       Alert.alert("Error", "Failed to complete appointment.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleSkip = async () => {
//     if (!servingToken) return;

//     Alert.alert(
//       "Skip Patient",
//       "Move this patient to the end of the queue?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { 
//           text: "Skip", 
//           onPress: async () => {
//             setProcessing(true);
//             await skipDoctorPatient(department, doctor, slot, date, hospitalId);
//             setProcessing(false);
//           } 
//         }
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{doctor}</Text>
//           <Text style={styles.sub}>{department} • {hospitalName}</Text>
//           <Text style={styles.slotSub}>{slotLabel} {slotTime ? `(${slotTime})` : ""}</Text>
//         </View>
//       </View>

//       <View style={styles.nowCard}>
//         <View style={styles.nowHeader}>
//            <Text style={styles.nowLabel}>NOW SERVING</Text>
//            {processing && <ActivityIndicator color="#fff" size="small" />}
//         </View>
//         <Text style={styles.nowToken}>{servingToken?.tokenNo || "---"}</Text>
//         <Text style={styles.nowName}>
//           {servingToken?.patientName || "Waiting for next patient..."}
//         </Text>
//       </View>

//       <View style={styles.actionRow}>
//         <TouchableOpacity
//           style={[styles.primaryBtn, processing && styles.disabledBtn]}
//           onPress={handleNext}
//           disabled={processing}
//         >
//           <Text style={styles.primaryText}>
//             {servingToken ? "Complete & Next" : "Call First Patient"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.dangerBtn, (!servingToken || processing) && styles.disabledBtn]}
//           onPress={handleSkip}
//           disabled={!servingToken || processing}
//         >
//           <Text style={[styles.dangerText, (!servingToken || processing) && styles.disabledText]}>Skip</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Upcoming Queue</Text>
//         <View style={styles.countBadge}>
//             <Text style={styles.countText}>{waitingCount} Waiting</Text>
//         </View>
//       </View>

//       <FlatList
//         data={queueTokens.filter(t => t.status === "waiting")}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="people-outline" size={40} color={COLORS.border} />
//             <Text style={styles.emptyTitle}>Queue is empty</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View style={styles.tokenBox}>
//               <Text style={styles.token}>{item.tokenNo}</Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.patientName}</Text>
//               <Text style={styles.meta}>
//                 {item.visitType || "Routine Checkup"} • {item.age ? `${item.age} yrs` : "Age N/A"}
//               </Text>
//               {item.symptoms && (
//                 <Text style={styles.symptoms} numberOfLines={1}>
//                    Note: {item.symptoms}
//                 </Text>
//               )}
//             </View>
            
//             <Ionicons name="ellipsis-vertical" size={20} color={COLORS.border} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
//   header: { marginTop: 52, flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
//   backBtn: { width: 44, height: 44, borderRadius: 16, backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
//   title: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, fontSize: 13, fontWeight: "700", marginTop: 2 },
//   slotSub: { color: COLORS.staff, fontWeight: "800", fontSize: 12, marginTop: 4 },
//   nowCard: { backgroundColor: COLORS.staff, borderRadius: 24, padding: 24, alignItems: "center", elevation: 4 },
//   nowHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
//   nowLabel: { color: "rgba(255,255,255,0.7)", fontWeight: "900", fontSize: 12, letterSpacing: 1 },
//   nowToken: { color: "#fff", fontSize: 48, fontWeight: "900", marginVertical: 8 },
//   nowName: { color: "#fff", fontWeight: "700", fontSize: 16 },
//   actionRow: { flexDirection: "row", gap: 10, marginTop: 16 },
//   primaryBtn: { flex: 3, height: 54, borderRadius: 18, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", borderBottomWidth: 4, borderBottomColor: 'rgba(0,0,0,0.1)' },
//   dangerBtn: { flex: 1, height: 54, borderRadius: 18, backgroundColor: "#FEF2F2", borderWidth: 1, borderColor: "#FECACA", alignItems: "center", justifyContent: "center" },
//   disabledBtn: { backgroundColor: "#F1F5F9", borderColor: "#E2E8F0", borderBottomWidth: 0 },
//   primaryText: { color: "#fff", fontWeight: "900", fontSize: 14 },
//   dangerText: { color: COLORS.danger, fontWeight: "900" },
//   disabledText: { color: COLORS.muted },
//   sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 15 },
//   sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
//   countBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
//   countText: { fontSize: 12, fontWeight: '800', color: COLORS.muted },
//   card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", gap: 12 },
//   tokenBox: { width: 50, height: 50, borderRadius: 14, backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center" },
//   token: { color: COLORS.staff, fontWeight: "900", fontSize: 15 },
//   name: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
//   meta: { color: COLORS.muted, marginTop: 3, fontSize: 12, fontWeight: "600" },
//   symptoms: { color: COLORS.staff, fontSize: 11, fontWeight: "700", marginTop: 4 },
//   emptyCard: { padding: 40, alignItems: "center" },
//   emptyTitle: { color: COLORS.muted, fontWeight: "700", marginTop: 10 },
// });  



































// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function DoctorQueueDetailsScreen({ route, navigation }) {
//   const {
//     hospitalId,
//     hospitalName,
//     department,
//     doctor,
//     date,
//     slot = "morning",
//     slotLabel = "Morning",
//     slotTime = "",
//   } = route.params || {};

//   const { callNextPatient, completeCurrent, skipCurrent, loadHospitalDayTokens } = useQueue();

//   const [tokens, setTokens] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   // ── Fetch tokens for this specific doctor / slot ───────────────────────────
//   const loadTokens = useCallback(async () => {
//     if (!hospitalId) return;
//     try {
//       const all = await loadHospitalDayTokens(hospitalId, date);
//       // Filter to this doctor + slot + active statuses
//       const filtered = (all || [])
//         .filter(
//           (t) =>
//             t.department === department &&
//             t.doctor === doctor &&
//             t.slot === slot &&
//             (t.status === "waiting" || t.status === "serving")
//         )
//         .sort((a, b) => {
//           const aNo = Number(String(a.tokenNo || "0").replace(/\D/g, "")) || 0;
//           const bNo = Number(String(b.tokenNo || "0").replace(/\D/g, "")) || 0;
//           return aNo - bNo;
//         });
//       setTokens(filtered);
//     } catch (err) {
//       console.error("DoctorQueueDetails: Failed to load tokens", err.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [hospitalId, department, doctor, slot, date, loadHospitalDayTokens]);

//   useEffect(() => {
//     loadTokens();
//   }, [loadTokens]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     loadTokens();
//   };

//   const servingToken = tokens.find((t) => t.status === "serving");
//   const waitingTokens = tokens.filter((t) => t.status === "waiting");

//   // ── Queue actions ─────────────────────────────────────────────────────────
//   const handleNext = async () => {
//     setProcessing(true);
//     try {
//       if (servingToken) {
//         await completeCurrent(hospitalId, department, doctor, slot, date);
//       }
//       await callNextPatient(hospitalId, department, doctor, slot, date);
//       await loadTokens();
//     } catch (error) {
//       Alert.alert("Error", "Could not update queue. Please check connection.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleSkip = async () => {
//     if (!servingToken) return;
//     Alert.alert(
//       "Skip Patient",
//       "Move this patient to the end of the queue?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Skip",
//           onPress: async () => {
//             setProcessing(true);
//             try {
//               await skipCurrent(hospitalId, department, doctor, slot, date);
//               await loadTokens();
//             } catch (err) {
//               Alert.alert("Error", "Could not skip patient.");
//             } finally {
//               setProcessing(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{doctor}</Text>
//           <Text style={styles.sub}>{department} • {hospitalName}</Text>
//           <Text style={styles.slotSub}>
//             {slotLabel} {slotTime ? `(${slotTime})` : ""}
//           </Text>
//         </View>
//         <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
//           <Ionicons name="refresh-outline" size={20} color={COLORS.staff} />
//         </TouchableOpacity>
//       </View>

//       {/* Now Serving Card */}
//       <View style={styles.nowCard}>
//         <View style={styles.nowHeader}>
//           <Text style={styles.nowLabel}>NOW SERVING</Text>
//           {processing && <ActivityIndicator color="#fff" size="small" />}
//         </View>
//         <Text style={styles.nowToken}>{servingToken?.tokenNo || "---"}</Text>
//         <Text style={styles.nowName}>
//           {servingToken?.patientName || "Waiting for next patient..."}
//         </Text>
//       </View>

//       {/* Action Buttons */}
//       <View style={styles.actionRow}>
//         <TouchableOpacity
//           style={[styles.primaryBtn, processing && styles.disabledBtn]}
//           onPress={handleNext}
//           disabled={processing}
//         >
//           <Text style={styles.primaryText}>
//             {servingToken ? "Complete & Next" : "Call First Patient"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.dangerBtn, (!servingToken || processing) && styles.disabledBtn]}
//           onPress={handleSkip}
//           disabled={!servingToken || processing}
//         >
//           <Text style={[styles.dangerText, (!servingToken || processing) && styles.disabledText]}>
//             Skip
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Waiting Queue */}
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Upcoming Queue</Text>
//         <View style={styles.countBadge}>
//           <Text style={styles.countText}>{waitingTokens.length} Waiting</Text>
//         </View>
//       </View>

//       <FlatList
//         data={waitingTokens}
//         keyExtractor={(item) => String(item.id || item.tokenNo)}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.staff]} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="people-outline" size={40} color={COLORS.border} />
//             <Text style={styles.emptyTitle}>Queue is empty</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <View style={styles.tokenBox}>
//               <Text style={styles.token}>{item.tokenNo}</Text>
//             </View>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.patientName}</Text>
//               <Text style={styles.meta}>
//                 {item.visitType || "Routine Checkup"} •{" "}
//                 {item.age ? `${item.age} yrs` : "Age N/A"}
//               </Text>
//               {item.symptoms ? (
//                 <Text style={styles.symptoms} numberOfLines={1}>
//                   Note: {item.symptoms}
//                 </Text>
//               ) : null}
//             </View>
//             <Ionicons name="ellipsis-vertical" size={20} color={COLORS.border} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },
//   header: {
//     marginTop: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 20,
//   },
//   backBtn: {
//     width: 44, height: 44, borderRadius: 16,
//     backgroundColor: COLORS.card,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   refreshBtn: {
//     width: 40, height: 40, borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: "#BBF7D0",
//   },
//   title: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, fontSize: 13, fontWeight: "700", marginTop: 2 },
//   slotSub: { color: COLORS.staff, fontWeight: "800", fontSize: 12, marginTop: 4 },

//   nowCard: {
//     backgroundColor: COLORS.staff, borderRadius: 24,
//     padding: 24, alignItems: "center", elevation: 4,
//   },
//   nowHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
//   nowLabel: {
//     color: "rgba(255,255,255,0.7)", fontWeight: "900",
//     fontSize: 12, letterSpacing: 1,
//   },
//   nowToken: { color: "#fff", fontSize: 48, fontWeight: "900", marginVertical: 8 },
//   nowName: { color: "#fff", fontWeight: "700", fontSize: 16 },

//   actionRow: { flexDirection: "row", gap: 10, marginTop: 16 },
//   primaryBtn: {
//     flex: 3, height: 54, borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center", justifyContent: "center",
//     borderBottomWidth: 4, borderBottomColor: "rgba(0,0,0,0.1)",
//   },
//   dangerBtn: {
//     flex: 1, height: 54, borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     borderWidth: 1, borderColor: "#FECACA",
//     alignItems: "center", justifyContent: "center",
//   },
//   disabledBtn: {
//     backgroundColor: "#F1F5F9", borderColor: "#E2E8F0", borderBottomWidth: 0,
//   },
//   primaryText: { color: "#fff", fontWeight: "900", fontSize: 14 },
//   dangerText: { color: COLORS.danger, fontWeight: "900" },
//   disabledText: { color: COLORS.muted },

//   sectionHeader: {
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginTop: 28, marginBottom: 15,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
//   countBadge: {
//     backgroundColor: "#F1F5F9", paddingHorizontal: 10,
//     paddingVertical: 4, borderRadius: 8,
//   },
//   countText: { fontSize: 12, fontWeight: "800", color: COLORS.muted },

//   card: {
//     backgroundColor: COLORS.card, borderRadius: 20, padding: 14,
//     marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
//     flexDirection: "row", alignItems: "center", gap: 12,
//   },
//   tokenBox: {
//     width: 50, height: 50, borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center", justifyContent: "center",
//   },
//   token: { color: COLORS.staff, fontWeight: "900", fontSize: 15 },
//   name: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
//   meta: { color: COLORS.muted, marginTop: 3, fontSize: 12, fontWeight: "600" },
//   symptoms: { color: COLORS.staff, fontSize: 11, fontWeight: "700", marginTop: 4 },
//   emptyCard: { padding: 40, alignItems: "center" },
//   emptyTitle: { color: COLORS.muted, fontWeight: "700", marginTop: 10 },
// });  



























// import React, { useState, useEffect, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
//   Alert,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// // ─── Payment badge helper ─────────────────────────────────────────────────────
// // paymentStatus values from backend:
// //   "SUCCESS"        → patient paid online  ✅
// //   "PAY_AT_HOSPITAL"→ patient chose to pay at counter  ⚠️
// //   "PENDING"        → default / unknown  🔴
// function PaymentBadge({ status, small = false }) {
//   let icon, label, bg, color;

//   switch (status) {
//     case "SUCCESS":
//       icon  = "checkmark-circle";
//       label = "Paid Online";
//       bg    = "#DCFCE7";
//       color = "#16A34A";
//       break;
//     case "PAY_AT_HOSPITAL":
//       icon  = "time-outline";
//       label = "Pay at Counter";
//       bg    = "#FEF9C3";
//       color = "#CA8A04";
//       break;
//     default:
//       icon  = "alert-circle-outline";
//       label = "Payment Pending";
//       bg    = "#FEE2E2";
//       color = "#DC2626";
//   }

//   return (
//     <View style={[
//       styles.payBadge,
//       { backgroundColor: bg },
//       small && { paddingHorizontal: 7, paddingVertical: 3 },
//     ]}>
//       <Ionicons name={icon} size={small ? 11 : 13} color={color} />
//       <Text style={[styles.payBadgeText, { color }, small && { fontSize: 10 }]}>
//         {label}
//       </Text>
//     </View>
//   );
// }

// // ─── Main Screen ──────────────────────────────────────────────────────────────
// export default function DoctorQueueDetailsScreen({ route, navigation }) {
//   const {
//     hospitalId,
//     hospitalName,
//     department,
//     doctor,
//     date,
//     slot      = "morning",
//     slotLabel = "Morning",
//     slotTime  = "",
//   } = route.params || {};

//   const { callNextPatient, completeCurrent, skipCurrent, loadHospitalDayTokens } = useQueue();

//   const [tokens,     setTokens]     = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [processing, setProcessing] = useState(false);

//   // ── Load tokens for this doctor/slot ───────────────────────────────────────
//   const loadTokens = useCallback(async () => {
//     if (!hospitalId) return;
//     try {
//       const all = await loadHospitalDayTokens(hospitalId, date);
//       const filtered = (all || [])
//         .filter(
//           (t) =>
//             t.department === department &&
//             t.doctor     === doctor &&
//             t.slot       === slot &&
//             (t.status === "waiting" || t.status === "serving")
//         )
//         .sort((a, b) => {
//           const aNo = Number(String(a.tokenNo || "0").replace(/\D/g, "")) || 0;
//           const bNo = Number(String(b.tokenNo || "0").replace(/\D/g, "")) || 0;
//           return aNo - bNo;
//         });
//       setTokens(filtered);
//     } catch (err) {
//       console.error("DoctorQueueDetails: load failed", err.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [hospitalId, department, doctor, slot, date, loadHospitalDayTokens]);

//   useEffect(() => { loadTokens(); }, [loadTokens]);

//   const onRefresh = () => { setRefreshing(true); loadTokens(); };

//   const servingToken  = tokens.find((t) => t.status === "serving");
//   const waitingTokens = tokens.filter((t) => t.status === "waiting");

//   // ── Queue actions ──────────────────────────────────────────────────────────
//   const handleNext = async () => {
//     setProcessing(true);
//     try {
//       if (servingToken) {
//         await completeCurrent(hospitalId, department, doctor, slot, date);
//       }
//       await callNextPatient(hospitalId, department, doctor, slot, date);
//       await loadTokens();
//     } catch (error) {
//       Alert.alert("Error", "Could not update queue. Please check connection.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handleSkip = async () => {
//     if (!servingToken) return;
//     Alert.alert(
//       "Skip Patient",
//       "Move this patient to the end of the queue?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Skip",
//           onPress: async () => {
//             setProcessing(true);
//             try {
//               await skipCurrent(hospitalId, department, doctor, slot, date);
//               await loadTokens();
//             } catch (err) {
//               Alert.alert("Error", "Could not skip patient.");
//             } finally {
//               setProcessing(false);
//             }
//           },
//         },
//       ]
//     );
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>

//       {/* ── Header ── */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{doctor}</Text>
//           <Text style={styles.sub}>{department} • {hospitalName}</Text>
//           <Text style={styles.slotSub}>
//             {slotLabel}{slotTime ? ` (${slotTime})` : ""}
//           </Text>
//         </View>
//         <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
//           <Ionicons name="refresh-outline" size={20} color={COLORS.staff} />
//         </TouchableOpacity>
//       </View>

//       {/* ── Now Serving Card ── */}
//       <View style={styles.nowCard}>
//         <View style={styles.nowHeader}>
//           <Text style={styles.nowLabel}>NOW SERVING</Text>
//           {processing && <ActivityIndicator color="#fff" size="small" />}
//         </View>

//         <Text style={styles.nowToken}>{servingToken?.tokenNo || "---"}</Text>

//         <Text style={styles.nowName}>
//           {servingToken?.patientName || "Waiting for next patient..."}
//         </Text>

//         {/* ✅ Payment badge inside Now Serving card */}
//         {servingToken && (
//           <View style={styles.nowPaymentRow}>
//             <PaymentBadge status={servingToken.paymentStatus} />
//           </View>
//         )}
//       </View>

//       {/* ── Action Buttons ── */}
//       <View style={styles.actionRow}>
//         <TouchableOpacity
//           style={[styles.primaryBtn, processing && styles.disabledBtn]}
//           onPress={handleNext}
//           disabled={processing}
//         >
//           <Text style={styles.primaryText}>
//             {servingToken ? "Complete & Next" : "Call First Patient"}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.dangerBtn, (!servingToken || processing) && styles.disabledBtn]}
//           onPress={handleSkip}
//           disabled={!servingToken || processing}
//         >
//           <Text style={[styles.dangerText, (!servingToken || processing) && styles.disabledText]}>
//             Skip
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* ── Waiting Queue List ── */}
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Upcoming Queue</Text>
//         <View style={styles.countBadge}>
//           <Text style={styles.countText}>{waitingTokens.length} Waiting</Text>
//         </View>
//       </View>

//       <FlatList
//         data={waitingTokens}
//         keyExtractor={(item) => String(item.id || item.tokenNo)}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.staff]} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="people-outline" size={40} color={COLORS.border} />
//             <Text style={styles.emptyTitle}>Queue is empty</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={[
//             styles.card,
//             // ✅ Highlight card border based on payment status
//             item.paymentStatus === "PAY_AT_HOSPITAL" && styles.cardPending,
//             item.paymentStatus === "SUCCESS"         && styles.cardPaid,
//           ]}>
//             {/* Token number box */}
//             <View style={[
//               styles.tokenBox,
//               item.paymentStatus === "PAY_AT_HOSPITAL" && { backgroundColor: "#FEF9C3" },
//               item.paymentStatus === "SUCCESS"         && { backgroundColor: "#DCFCE7" },
//             ]}>
//               <Text style={[
//                 styles.token,
//                 item.paymentStatus === "PAY_AT_HOSPITAL" && { color: "#CA8A04" },
//                 item.paymentStatus === "SUCCESS"         && { color: "#16A34A" },
//               ]}>
//                 {item.tokenNo}
//               </Text>
//             </View>

//             {/* Patient info */}
//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.patientName}</Text>
//               <Text style={styles.meta}>
//                 {item.visitType || "Routine Checkup"} •{" "}
//                 {item.age ? `${item.age} yrs` : "Age N/A"}
//               </Text>
//               {item.symptoms ? (
//                 <Text style={styles.symptoms} numberOfLines={1}>
//                   Note: {item.symptoms}
//                 </Text>
//               ) : null}

//               {/* ✅ Payment badge on each queue card */}
//               <View style={{ marginTop: 6 }}>
//                 <PaymentBadge status={item.paymentStatus} small />
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52, flexDirection: "row",
//     alignItems: "center", gap: 12, marginBottom: 20,
//   },
//   backBtn: {
//     width: 44, height: 44, borderRadius: 16,
//     backgroundColor: COLORS.card,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   refreshBtn: {
//     width: 40, height: 40, borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: "#BBF7D0",
//   },
//   title:   { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   sub:     { color: COLORS.muted, fontSize: 13, fontWeight: "700", marginTop: 2 },
//   slotSub: { color: COLORS.staff, fontWeight: "800", fontSize: 12, marginTop: 4 },

//   // Now Serving
//   nowCard: {
//     backgroundColor: COLORS.staff, borderRadius: 24,
//     padding: 24, alignItems: "center", elevation: 4,
//   },
//   nowHeader:     { flexDirection: "row", alignItems: "center", gap: 10 },
//   nowLabel:      { color: "rgba(255,255,255,0.7)", fontWeight: "900", fontSize: 12, letterSpacing: 1 },
//   nowToken:      { color: "#fff", fontSize: 48, fontWeight: "900", marginVertical: 8 },
//   nowName:       { color: "#fff", fontWeight: "700", fontSize: 16 },
//   nowPaymentRow: { marginTop: 12 },

//   // Payment Badge
//   payBadge: {
//     flexDirection: "row", alignItems: "center", gap: 4,
//     paddingHorizontal: 10, paddingVertical: 5,
//     borderRadius: 20,
//   },
//   payBadgeText: { fontSize: 12, fontWeight: "800" },

//   // Action buttons
//   actionRow: { flexDirection: "row", gap: 10, marginTop: 16 },
//   primaryBtn: {
//     flex: 3, height: 54, borderRadius: 18,
//     backgroundColor: COLORS.staff,
//     alignItems: "center", justifyContent: "center",
//     borderBottomWidth: 4, borderBottomColor: "rgba(0,0,0,0.1)",
//   },
//   dangerBtn: {
//     flex: 1, height: 54, borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     borderWidth: 1, borderColor: "#FECACA",
//     alignItems: "center", justifyContent: "center",
//   },
//   disabledBtn:  { backgroundColor: "#F1F5F9", borderColor: "#E2E8F0", borderBottomWidth: 0 },
//   primaryText:  { color: "#fff", fontWeight: "900", fontSize: 14 },
//   dangerText:   { color: COLORS.danger, fontWeight: "900" },
//   disabledText: { color: COLORS.muted },

//   // Section header
//   sectionHeader: {
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginTop: 28, marginBottom: 15,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
//   countBadge:   { backgroundColor: "#F1F5F9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
//   countText:    { fontSize: 12, fontWeight: "800", color: COLORS.muted },

//   // Queue cards
//   card: {
//     backgroundColor: COLORS.card, borderRadius: 20, padding: 14,
//     marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
//     flexDirection: "row", alignItems: "center", gap: 12,
//   },
//   // ✅ Card border color changes based on payment
//   cardPending: { borderColor: "#FDE68A", backgroundColor: "#FFFBEB" },
//   cardPaid:    { borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" },

//   tokenBox: {
//     width: 50, height: 50, borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center", justifyContent: "center",
//   },
//   token:    { color: COLORS.staff, fontWeight: "900", fontSize: 15 },
//   name:     { color: COLORS.text, fontWeight: "800", fontSize: 15 },
//   meta:     { color: COLORS.muted, marginTop: 3, fontSize: 12, fontWeight: "600" },
//   symptoms: { color: COLORS.staff, fontSize: 11, fontWeight: "700", marginTop: 4 },
//   emptyCard:  { padding: 40, alignItems: "center" },
//   emptyTitle: { color: COLORS.muted, fontWeight: "700", marginTop: 10 },
// });  






































import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";

// ─── Payment badge helper ─────────────────────────────────────────────────────
// paymentStatus values from backend:
//   "SUCCESS"        → patient paid online  ✅
//   "PAY_AT_HOSPITAL"→ patient chose to pay at counter  ⚠️
//   "PENDING"        → default / unknown  🔴
function PaymentBadge({ status, small = false }) {
  const isPaid = status === "SUCCESS";

  const icon  = isPaid ? "checkmark-circle"    : "time-outline";
  const label = isPaid ? "Payment Successful"  : "Payment Pending";
  const bg    = isPaid ? "#DCFCE7"             : "#FEE2E2";
  const color = isPaid ? "#16A34A"             : "#DC2626";

  return (
    <View style={[
      styles.payBadge,
      { backgroundColor: bg },
      small && { paddingHorizontal: 7, paddingVertical: 3 },
    ]}>
      <Ionicons name={icon} size={small ? 11 : 13} color={color} />
      <Text style={[styles.payBadgeText, { color }, small && { fontSize: 10 }]}>
        {label}
      </Text>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function DoctorQueueDetailsScreen({ route, navigation }) {
  const {
    hospitalId,
    hospitalName,
    department,
    doctor,
    date,
    slot      = "morning",
    slotLabel = "Morning",
    slotTime  = "",
  } = route.params || {};

  const { callNextPatient, completeCurrent, skipCurrent, loadHospitalDayTokens } = useQueue();

  const [tokens,     setTokens]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processing, setProcessing] = useState(false);

  // ── Load tokens for this doctor/slot ───────────────────────────────────────
  const loadTokens = useCallback(async () => {
    if (!hospitalId) return;
    try {
      const all = await loadHospitalDayTokens(hospitalId, date);
      const filtered = (all || [])
        .filter(
          (t) =>
            t.department === department &&
            t.doctor     === doctor &&
            t.slot       === slot &&
            (t.status === "waiting" || t.status === "serving")
        )
        .sort((a, b) => {
          const aNo = Number(String(a.tokenNo || "0").replace(/\D/g, "")) || 0;
          const bNo = Number(String(b.tokenNo || "0").replace(/\D/g, "")) || 0;
          return aNo - bNo;
        });
      setTokens(filtered);
    } catch (err) {
      console.error("DoctorQueueDetails: load failed", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [hospitalId, department, doctor, slot, date, loadHospitalDayTokens]);

  useEffect(() => { loadTokens(); }, [loadTokens]);

  const onRefresh = () => { setRefreshing(true); loadTokens(); };

  const servingToken  = tokens.find((t) => t.status === "serving");
  const waitingTokens = tokens.filter((t) => t.status === "waiting");

  // ── Queue actions ──────────────────────────────────────────────────────────
  const handleNext = async () => {
    setProcessing(true);
    try {
      if (servingToken) {
        await completeCurrent(hospitalId, department, doctor, slot, date);
      }
      await callNextPatient(hospitalId, department, doctor, slot, date);
      await loadTokens();
    } catch (error) {
      Alert.alert("Error", "Could not update queue. Please check connection.");
    } finally {
      setProcessing(false);
    }
  };

  const handleSkip = async () => {
    if (!servingToken) return;
    Alert.alert(
      "Skip Patient",
      "Move this patient to the end of the queue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Skip",
          onPress: async () => {
            setProcessing(true);
            try {
              await skipCurrent(hospitalId, department, doctor, slot, date);
              await loadTokens();
            } catch (err) {
              Alert.alert("Error", "Could not skip patient.");
            } finally {
              setProcessing(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.staff} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{doctor}</Text>
          <Text style={styles.sub}>{department} • {hospitalName}</Text>
          <Text style={styles.slotSub}>
            {slotLabel}{slotTime ? ` (${slotTime})` : ""}
          </Text>
        </View>
        <TouchableOpacity onPress={onRefresh} style={styles.refreshBtn}>
          <Ionicons name="refresh-outline" size={20} color={COLORS.staff} />
        </TouchableOpacity>
      </View>

      {/* ── Now Serving Card ── */}
      <View style={styles.nowCard}>
        <View style={styles.nowHeader}>
          <Text style={styles.nowLabel}>NOW SERVING</Text>
          {processing && <ActivityIndicator color="#fff" size="small" />}
        </View>

        <Text style={styles.nowToken}>{servingToken?.tokenNo || "---"}</Text>

        <Text style={styles.nowName}>
          {servingToken?.patientName || "Waiting for next patient..."}
        </Text>

        {/* ✅ Payment badge inside Now Serving card */}
        {servingToken && (
          <View style={styles.nowPaymentRow}>
            <PaymentBadge status={servingToken.paymentStatus} />
          </View>
        )}
      </View>

      {/* ── Action Buttons ── */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.primaryBtn, processing && styles.disabledBtn]}
          onPress={handleNext}
          disabled={processing}
        >
          <Text style={styles.primaryText}>
            {servingToken ? "Complete & Next" : "Call First Patient"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dangerBtn, (!servingToken || processing) && styles.disabledBtn]}
          onPress={handleSkip}
          disabled={!servingToken || processing}
        >
          <Text style={[styles.dangerText, (!servingToken || processing) && styles.disabledText]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Waiting Queue List ── */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Queue</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{waitingTokens.length} Waiting</Text>
        </View>
      </View>

      <FlatList
        data={waitingTokens}
        keyExtractor={(item) => String(item.id || item.tokenNo)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.staff]} />
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="people-outline" size={40} color={COLORS.border} />
            <Text style={styles.emptyTitle}>Queue is empty</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[
            styles.card,
            // ✅ Green border = paid, Red border = pending
            item.paymentStatus === "SUCCESS" ? styles.cardPaid : styles.cardPending,
          ]}>
            {/* Token number box */}
            <View style={[
              styles.tokenBox,
              item.paymentStatus === "SUCCESS" ? { backgroundColor: "#DCFCE7" } : { backgroundColor: "#FEE2E2" },
            ]}>
              <Text style={[
                styles.token,
                item.paymentStatus === "SUCCESS" ? { color: "#16A34A" } : { color: "#DC2626" },
              ]}>
                {item.tokenNo}
              </Text>
            </View>

            {/* Patient info */}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.patientName}</Text>
              <Text style={styles.meta}>
                {item.visitType || "Routine Checkup"} •{" "}
                {item.age ? `${item.age} yrs` : "Age N/A"}
              </Text>
              {item.symptoms ? (
                <Text style={styles.symptoms} numberOfLines={1}>
                  Note: {item.symptoms}
                </Text>
              ) : null}

              {/* ✅ Payment badge on each queue card */}
              <View style={{ marginTop: 6 }}>
                <PaymentBadge status={item.paymentStatus} small />
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

  header: {
    marginTop: 52, flexDirection: "row",
    alignItems: "center", gap: 12, marginBottom: 20,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 16,
    backgroundColor: COLORS.card,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: COLORS.border,
  },
  refreshBtn: {
    width: 40, height: 40, borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "#BBF7D0",
  },
  title:   { fontSize: 20, fontWeight: "900", color: COLORS.text },
  sub:     { color: COLORS.muted, fontSize: 13, fontWeight: "700", marginTop: 2 },
  slotSub: { color: COLORS.staff, fontWeight: "800", fontSize: 12, marginTop: 4 },

  // Now Serving
  nowCard: {
    backgroundColor: COLORS.staff, borderRadius: 24,
    padding: 24, alignItems: "center", elevation: 4,
  },
  nowHeader:     { flexDirection: "row", alignItems: "center", gap: 10 },
  nowLabel:      { color: "rgba(255,255,255,0.7)", fontWeight: "900", fontSize: 12, letterSpacing: 1 },
  nowToken:      { color: "#fff", fontSize: 48, fontWeight: "900", marginVertical: 8 },
  nowName:       { color: "#fff", fontWeight: "700", fontSize: 16 },
  nowPaymentRow: { marginTop: 12 },

  // Payment Badge
  payBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20,
  },
  payBadgeText: { fontSize: 12, fontWeight: "800" },

  // Action buttons
  actionRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  primaryBtn: {
    flex: 3, height: 54, borderRadius: 18,
    backgroundColor: COLORS.staff,
    alignItems: "center", justifyContent: "center",
    borderBottomWidth: 4, borderBottomColor: "rgba(0,0,0,0.1)",
  },
  dangerBtn: {
    flex: 1, height: 54, borderRadius: 18,
    backgroundColor: "#FEF2F2",
    borderWidth: 1, borderColor: "#FECACA",
    alignItems: "center", justifyContent: "center",
  },
  disabledBtn:  { backgroundColor: "#F1F5F9", borderColor: "#E2E8F0", borderBottomWidth: 0 },
  primaryText:  { color: "#fff", fontWeight: "900", fontSize: 14 },
  dangerText:   { color: COLORS.danger, fontWeight: "900" },
  disabledText: { color: COLORS.muted },

  // Section header
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 28, marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
  countBadge:   { backgroundColor: "#F1F5F9", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  countText:    { fontSize: 12, fontWeight: "800", color: COLORS.muted },

  // Queue cards
  card: {
    backgroundColor: COLORS.card, borderRadius: 20, padding: 14,
    marginBottom: 12, borderWidth: 1, borderColor: COLORS.border,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  // ✅ Card colors: green = paid, red = pending
  cardPending: { borderColor: "#FECACA", backgroundColor: "#FFF5F5" },
  cardPaid:    { borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" },

  tokenBox: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: "#ECFDF5",
    alignItems: "center", justifyContent: "center",
  },
  token:    { color: COLORS.staff, fontWeight: "900", fontSize: 15 },
  name:     { color: COLORS.text, fontWeight: "800", fontSize: 15 },
  meta:     { color: COLORS.muted, marginTop: 3, fontSize: 12, fontWeight: "600" },
  symptoms: { color: COLORS.staff, fontSize: 11, fontWeight: "700", marginTop: 4 },
  emptyCard:  { padding: 40, alignItems: "center" },
  emptyTitle: { color: COLORS.muted, fontWeight: "700", marginTop: 10 },
});