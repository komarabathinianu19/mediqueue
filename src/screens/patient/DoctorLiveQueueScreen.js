// import React from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function DoctorLiveQueueScreen({ route, navigation }) {
//   const { hospital, department, doctor } = route.params;
//   const { tokens } = useQueue();

//   const queue = tokens
//     .filter(
//       (t) =>
//         t.hospitalId === hospital?.id &&
//         t.department === department &&
//         t.doctor === doctor &&
//         (t.status === "waiting" || t.status === "serving")
//     )
//     .sort((a, b) => a.tokenNumber - b.tokenNumber);

//   const servingToken = queue.find((t) => t.status === "serving");
//   const waitingCount = queue.filter((t) => t.status === "waiting").length;
//   const estimatedWait = waitingCount * 5;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{department}</Text>
//           <Text style={styles.sub}>{doctor}</Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Now Serving</Text>
//         <Text style={styles.heroToken}>{servingToken?.tokenNo || "None"}</Text>
//         <Text style={styles.heroSub}>{hospital?.name}</Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Waiting" value={waitingCount} />
//         <Stat title="Active" value={queue.length} />
//         <Stat title="Wait" value={`${estimatedWait}m`} />
//       </View>

//       <Text style={styles.sectionTitle}>Live Queue List</Text>

//       <FlatList
//         data={queue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 110 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No active queue</Text>
//             <Text style={styles.emptySub}>
//               You can book the first token for this doctor.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={[styles.queueCard, item.status === "serving" && styles.servingCard]}>
//             <View style={[styles.tokenBadge, item.status === "serving" && styles.servingBadge]}>
//               <Text
//                 style={[
//                   styles.tokenBadgeText,
//                   item.status === "serving" && styles.servingBadgeText,
//                 ]}
//               >
//                 {item.tokenNo}
//               </Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.patientName}>{item.patientName}</Text>
//               <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
//               <Text style={styles.meta}>Visit: {item.visitType || "New Patient"}</Text>
//             </View>

//             <Text
//               style={[
//                 styles.statusChip,
//                 item.status === "serving" && styles.servingChip,
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.floatingBtn}
//         onPress={() =>
//           navigation.navigate("BookToken", {
//             hospital,
//             selectedDepartment: department,
//             selectedDoctor: doctor,
//           })
//         }
//       >
//         <Text style={styles.floatingText}>Book Appointment</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function Stat({ title, value }) {
//   return (
//     <View style={styles.statCard}>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
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

//   title: { fontSize: 23, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

//   heroCard: {
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
//   heroToken: { color: "#fff", fontSize: 46, fontWeight: "900", marginTop: 6 },
//   heroSub: { color: "rgba(255,255,255,0.9)", fontWeight: "700", marginTop: 8 },

//   statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   statValue: { color: COLORS.primary, fontSize: 20, fontWeight: "900" },
//   statTitle: { color: COLORS.muted, fontSize: 11, fontWeight: "800", marginTop: 5 },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 24,
//     marginBottom: 12,
//   },

//   queueCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },

//   servingCard: {
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.lightBlue,
//   },

//   tokenBadge: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   servingBadge: { backgroundColor: COLORS.primary },
//   tokenBadgeText: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
//   servingBadgeText: { color: "#fff" },

//   patientName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "700" },

//   statusChip: {
//     overflow: "hidden",
//     backgroundColor: "#FFF7ED",
//     color: COLORS.warning,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     fontSize: 11,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   servingChip: {
//     backgroundColor: "#DCFCE7",
//     color: COLORS.success,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 17,
//     marginTop: 12,
//   },

//   emptySub: {
//     color: COLORS.muted,
//     textAlign: "center",
//     marginTop: 6,
//   },

//   floatingBtn: {
//     position: "absolute",
//     left: 18,
//     right: 18,
//     bottom: 24,
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   floatingText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 16,
//   },
// });  





















// import React, { useMemo, useState } from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// const slotOptions = [
//   { key: "morning", label: "Morning", icon: "sunny-outline" },
//   { key: "afternoon", label: "Afternoon", icon: "partly-sunny-outline" },
//   { key: "night", label: "Night", icon: "moon-outline" },
// ];

// const getTodayDate = () => new Date().toISOString().split("T")[0];

// export default function DoctorLiveQueueScreen({ route, navigation }) {
//   const { hospital, department, doctor, selectedSlot = "morning" } = route.params || {};
//   const { tokens } = useQueue();

//   const [slot, setSlot] = useState(selectedSlot);

//   const queue = useMemo(() => {
//     return tokens
//       .filter(
//         (t) =>
//           t.hospitalId === hospital?.id &&
//           t.department === department &&
//           t.doctor === doctor &&
//           t.date === getTodayDate() &&
//           t.slot === slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, hospital?.id, department, doctor, slot]);

//   const servingToken = queue.find((t) => t.status === "serving");
//   const waitingCount = queue.filter((t) => t.status === "waiting").length;
//   const estimatedWait = waitingCount * 5;

//   const selectedSlotLabel =
//     slotOptions.find((slotItem) => slotItem.key === slot)?.label || slot;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{department}</Text>
//           <Text style={styles.sub}>{doctor}</Text>
//         </View>
//       </View>

//       <View style={styles.slotRow}>
//         {slotOptions.map((item) => (
//           <TouchableOpacity
//             key={item.key}
//             style={[styles.slotBtn, slot === item.key && styles.activeSlotBtn]}
//             onPress={() => setSlot(item.key)}
//           >
//             <Ionicons
//               name={item.icon}
//               size={17}
//               color={slot === item.key ? "#fff" : COLORS.primary}
//             />
//             <Text
//               style={[
//                 styles.slotBtnText,
//                 slot === item.key && styles.activeSlotBtnText,
//               ]}
//             >
//               {item.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Now Serving</Text>
//         <Text style={styles.heroToken}>{servingToken?.tokenNo || "None"}</Text>
//         <Text style={styles.heroSub}>{hospital?.name}</Text>
//         <Text style={styles.heroSub}>{selectedSlotLabel} Slot</Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Waiting" value={waitingCount} />
//         <Stat title="Active" value={queue.length} />
//         <Stat title="Wait" value={`${estimatedWait}m`} />
//       </View>

//       <Text style={styles.sectionTitle}>Live Queue List</Text>

//       <FlatList
//         data={queue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 110 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No active queue</Text>
//             <Text style={styles.emptySub}>
//               You can book the first token for this slot.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={[styles.queueCard, item.status === "serving" && styles.servingCard]}>
//             <View style={[styles.tokenBadge, item.status === "serving" && styles.servingBadge]}>
//               <Text
//                 style={[
//                   styles.tokenBadgeText,
//                   item.status === "serving" && styles.servingBadgeText,
//                 ]}
//               >
//                 {item.tokenNo}
//               </Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.patientName}>{item.patientName}</Text>
//               <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
//               <Text style={styles.meta}>Visit: {item.visitType || "New Patient"}</Text>
//               <Text style={styles.meta}>
//                 {item.slotLabel || item.slot} • {item.slotTime || item.date}
//               </Text>
//             </View>

//             <Text
//               style={[
//                 styles.statusChip,
//                 item.status === "serving" && styles.servingChip,
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.floatingBtn}
//         onPress={() =>
//           navigation.navigate("BookToken", {
//             hospital,
//             selectedDepartment: department,
//             selectedDoctor: doctor,
//             selectedSlot: slot,
//           })
//         }
//       >
//         <Text style={styles.floatingText}>Book Appointment</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function Stat({ title, value }) {
//   return (
//     <View style={styles.statCard}>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
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

//   title: { fontSize: 23, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

//   slotRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 16,
//   },

//   slotBtn: {
//     flex: 1,
//     minHeight: 44,
//     borderRadius: 16,
//     backgroundColor: COLORS.card,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 6,
//     paddingHorizontal: 8,
//   },

//   activeSlotBtn: {
//     backgroundColor: COLORS.primary,
//     borderColor: COLORS.primary,
//   },

//   slotBtnText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   activeSlotBtnText: {
//     color: "#fff",
//   },

//   heroCard: {
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
//   heroToken: { color: "#fff", fontSize: 46, fontWeight: "900", marginTop: 6 },
//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   statValue: { color: COLORS.primary, fontSize: 20, fontWeight: "900" },
//   statTitle: { color: COLORS.muted, fontSize: 11, fontWeight: "800", marginTop: 5 },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 24,
//     marginBottom: 12,
//   },

//   queueCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },

//   servingCard: {
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.lightBlue,
//   },

//   tokenBadge: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   servingBadge: { backgroundColor: COLORS.primary },
//   tokenBadgeText: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
//   servingBadgeText: { color: "#fff" },

//   patientName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "700" },

//   statusChip: {
//     overflow: "hidden",
//     backgroundColor: "#FFF7ED",
//     color: COLORS.warning,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     fontSize: 11,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   servingChip: {
//     backgroundColor: "#DCFCE7",
//     color: COLORS.success,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 17,
//     marginTop: 12,
//   },

//   emptySub: {
//     color: COLORS.muted,
//     textAlign: "center",
//     marginTop: 6,
//   },

//   floatingBtn: {
//     position: "absolute",
//     left: 18,
//     right: 18,
//     bottom: 24,
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   floatingText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 16,
//   },
// });  



































// import React from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function DoctorLiveQueueScreen({ route, navigation }) {
//   const { hospital, department, doctor } = route.params;
//   const { tokens } = useQueue();

//   const queue = tokens
//     .filter(
//       (t) =>
//         t.hospitalId === hospital?.id &&
//         t.department === department &&
//         t.doctor === doctor &&
//         (t.status === "waiting" || t.status === "serving")
//     )
//     .sort((a, b) => a.tokenNumber - b.tokenNumber);

//   const servingToken = queue.find((t) => t.status === "serving");
//   const waitingCount = queue.filter((t) => t.status === "waiting").length;
//   const estimatedWait = waitingCount * 5;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{department}</Text>
//           <Text style={styles.sub}>{doctor}</Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Now Serving</Text>
//         <Text style={styles.heroToken}>{servingToken?.tokenNo || "None"}</Text>
//         <Text style={styles.heroSub}>{hospital?.name}</Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Waiting" value={waitingCount} />
//         <Stat title="Active" value={queue.length} />
//         <Stat title="Wait" value={`${estimatedWait}m`} />
//       </View>

//       <Text style={styles.sectionTitle}>Live Queue List</Text>

//       <FlatList
//         data={queue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 110 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No active queue</Text>
//             <Text style={styles.emptySub}>
//               You can book the first token for this doctor.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={[styles.queueCard, item.status === "serving" && styles.servingCard]}>
//             <View style={[styles.tokenBadge, item.status === "serving" && styles.servingBadge]}>
//               <Text
//                 style={[
//                   styles.tokenBadgeText,
//                   item.status === "serving" && styles.servingBadgeText,
//                 ]}
//               >
//                 {item.tokenNo}
//               </Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.patientName}>{item.patientName}</Text>
//               <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
//               <Text style={styles.meta}>Visit: {item.visitType || "New Patient"}</Text>
//             </View>

//             <Text
//               style={[
//                 styles.statusChip,
//                 item.status === "serving" && styles.servingChip,
//               ]}
//             >
//               {item.status}
//             </Text>
//           </View>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.floatingBtn}
//         onPress={() =>
//           navigation.navigate("BookToken", {
//             hospital,
//             selectedDepartment: department,
//             selectedDoctor: doctor,
//           })
//         }
//       >
//         <Text style={styles.floatingText}>Book Appointment</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function Stat({ title, value }) {
//   return (
//     <View style={styles.statCard}>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
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

//   title: { fontSize: 23, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

//   heroCard: {
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
//   heroToken: { color: "#fff", fontSize: 46, fontWeight: "900", marginTop: 6 },
//   heroSub: { color: "rgba(255,255,255,0.9)", fontWeight: "700", marginTop: 8 },

//   statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   statValue: { color: COLORS.primary, fontSize: 20, fontWeight: "900" },
//   statTitle: { color: COLORS.muted, fontSize: 11, fontWeight: "800", marginTop: 5 },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 24,
//     marginBottom: 12,
//   },

//   queueCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },

//   servingCard: {
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.lightBlue,
//   },

//   tokenBadge: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   servingBadge: { backgroundColor: COLORS.primary },
//   tokenBadgeText: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
//   servingBadgeText: { color: "#fff" },

//   patientName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "700" },

//   statusChip: {
//     overflow: "hidden",
//     backgroundColor: "#FFF7ED",
//     color: COLORS.warning,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 999,
//     fontSize: 11,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   servingChip: {
//     backgroundColor: "#DCFCE7",
//     color: COLORS.success,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 28,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 17,
//     marginTop: 12,
//   },

//   emptySub: {
//     color: COLORS.muted,
//     textAlign: "center",
//     marginTop: 6,
//   },

//   floatingBtn: {
//     position: "absolute",
//     left: 18,
//     right: 18,
//     bottom: 24,
//     height: 56,
//     borderRadius: 18,
//     backgroundColor: COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   floatingText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 16,
//   },
// });  

































import React, { useMemo, useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";
import { useFocusEffect } from "@react-navigation/native";

const slotOptions = [
  { key: "morning", label: "Morning", icon: "sunny-outline" },
  { key: "afternoon", label: "Afternoon", icon: "partly-sunny-outline" },
  { key: "night", label: "Night", icon: "moon-outline" },
];

const getTodayDate = () => new Date().toISOString().split("T")[0];

export default function DoctorLiveQueueScreen({ route, navigation }) {
  const { hospital, department, doctor, selectedSlot = "morning" } = route.params || {};
  const { tokens, loadActiveQueue } = useQueue();

  const hospitalId = hospital?.id || hospital?.hospitalId;
  const [slot, setSlot] = useState(selectedSlot);

  // Poll the queue every 10s while patient is watching
  useFocusEffect(
    useCallback(() => {
      if (hospitalId && department && doctor) {
        const load = () => loadActiveQueue(hospitalId, department, doctor, slot, getTodayDate());
        load();
        const interval = setInterval(load, 10000);
        return () => clearInterval(interval);
      }
    }, [hospitalId, department, doctor, slot])
  );

  const queue = useMemo(() => {
    return tokens
      .filter(
        (t) =>
          t.hospitalId === hospitalId &&
          t.department === department &&
          t.doctor === doctor &&
          t.date === getTodayDate() &&
          t.slot === slot &&
          (t.status === "waiting" || t.status === "serving")
      )
      .sort((a, b) => a.tokenNumber - b.tokenNumber);
  }, [tokens, hospitalId, department, doctor, slot]);

  const servingToken = queue.find((t) => t.status === "serving");
  const waitingCount = queue.filter((t) => t.status === "waiting").length;
  const estimatedWait = waitingCount * 5;

  const selectedSlotLabel =
    slotOptions.find((slotItem) => slotItem.key === slot)?.label || slot;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{department}</Text>
          <Text style={styles.sub}>{doctor}</Text>
        </View>
      </View>

      <View style={styles.slotRow}>
        {slotOptions.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.slotBtn, slot === item.key && styles.activeSlotBtn]}
            onPress={() => setSlot(item.key)}
          >
            <Ionicons
              name={item.icon}
              size={17}
              color={slot === item.key ? "#fff" : COLORS.primary}
            />
            <Text
              style={[
                styles.slotBtnText,
                slot === item.key && styles.activeSlotBtnText,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.heroCard}
      >
        <Text style={styles.heroLabel}>Now Serving</Text>
        <Text style={styles.heroToken}>{servingToken?.tokenNo || "None"}</Text>
        <Text style={styles.heroSub}>{hospital?.name}</Text>
        <Text style={styles.heroSub}>{selectedSlotLabel} Slot</Text>
      </LinearGradient>

      <View style={styles.statsRow}>
        <Stat title="Waiting" value={waitingCount} />
        <Stat title="Active" value={queue.length} />
        <Stat title="Wait" value={`${estimatedWait}m`} />
      </View>

      <Text style={styles.sectionTitle}>Live Queue List</Text>

      <FlatList
        data={queue}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No active queue</Text>
            <Text style={styles.emptySub}>
              You can book the first token for this slot.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.queueCard, item.status === "serving" && styles.servingCard]}>
            <View style={[styles.tokenBadge, item.status === "serving" && styles.servingBadge]}>
              <Text
                style={[
                  styles.tokenBadgeText,
                  item.status === "serving" && styles.servingBadgeText,
                ]}
              >
                {item.tokenNo}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
              <Text style={styles.meta}>Visit: {item.visitType || "New Patient"}</Text>
              <Text style={styles.meta}>
                {item.slotLabel || item.slot} • {item.slotTime || item.date}
              </Text>
            </View>

            <Text
              style={[
                styles.statusChip,
                item.status === "serving" && styles.servingChip,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() =>
          navigation.navigate("BookToken", {
            hospital,
            selectedDepartment: department,
            selectedDoctor: doctor,
            selectedSlot: slot,
          })
        }
      >
        <Text style={styles.floatingText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

function Stat({ title, value }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

  header: {
    marginTop: 52,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: { fontSize: 23, fontWeight: "900", color: COLORS.text },
  sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

  slotRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },

  slotBtn: {
    flex: 1,
    minHeight: 44,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 8,
  },

  activeSlotBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  slotBtnText: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 12,
  },

  activeSlotBtnText: {
    color: "#fff",
  },

  heroCard: {
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
  },

  heroLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
  heroToken: { color: "#fff", fontSize: 46, fontWeight: "900", marginTop: 6 },
  heroSub: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },

  statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  statValue: { color: COLORS.primary, fontSize: 20, fontWeight: "900" },
  statTitle: { color: COLORS.muted, fontSize: 11, fontWeight: "800", marginTop: 5 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 24,
    marginBottom: 12,
  },

  queueCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  servingCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightBlue,
  },

  tokenBadge: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  servingBadge: { backgroundColor: COLORS.primary },
  tokenBadgeText: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
  servingBadgeText: { color: "#fff" },

  patientName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
  meta: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "700" },

  statusChip: {
    overflow: "hidden",
    backgroundColor: "#FFF7ED",
    color: COLORS.warning,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "900",
    textTransform: "capitalize",
  },

  servingChip: {
    backgroundColor: "#DCFCE7",
    color: COLORS.success,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 17,
    marginTop: 12,
  },

  emptySub: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
  },

  floatingBtn: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 24,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  floatingText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});