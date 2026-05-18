



// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen() {
//   const { tokens, latestPatientToken } = useQueue();

//   const activeToken = latestPatientToken;

//   const myDoctorQueue = activeToken
//     ? [...tokens]
//         .filter(
//           (t) =>
//             t.hospitalId === activeToken.hospitalId &&
//             t.department === activeToken.department &&
//             t.doctor === activeToken.doctor &&
//             (t.status === "waiting" || t.status === "serving")
//         )
//         .sort((a, b) => a.tokenNumber - b.tokenNumber)
//     : [];

//   const doctorServing = myDoctorQueue.find((t) => t.status === "serving");

//   const peopleBefore = activeToken
//     ? myDoctorQueue.filter(
//         (t) =>
//           t.status === "waiting" &&
//           t.tokenNumber < activeToken.tokenNumber
//       ).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Queue</Text>
//       <Text style={styles.sub}>
//         {activeToken
//           ? `${activeToken.hospitalName} • ${activeToken.department}`
//           : "No active token found"}
//       </Text>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Your Token</Text>
//         <Text style={styles.heroToken}>
//           {activeToken ? activeToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.doctor || "Any Available"}`
//             : "Book a token first"}
//         </Text>

//         <Text style={styles.heroSub}>
//           Now Serving: {doctorServing?.tokenNo || "None"}
//         </Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//         <Stat title="Wait Time" value={activeToken ? `${estimatedWait}m` : "-"} />
//         <Stat title="Status" value={activeToken?.status || "-"} />
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//         <Text style={styles.infoText}>
//           This queue is only for your selected department and doctor.
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Doctor Queue</Text>

//       <FlatList
//         data={myDoctorQueue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No queue available</Text>
//             <Text style={styles.emptySub}>Book a token to track live queue.</Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine = activeToken?.id === item.id;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text
//                   style={[
//                     styles.tokenBadgeText,
//                     isMine && styles.myTokenBadgeText,
//                   ]}
//                 >
//                   {item.tokenNo}
//                 </Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text> 

//                 <Text style={styles.symptoms}>
//   Symptoms: {item.symptoms || "-"}
// </Text>

//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   title: {
//     marginTop: 52,
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   heroCard: {
//     marginTop: 20,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   heroToken: {
//     color: "#fff",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 16,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   statValue: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontSize: 11,
//     fontWeight: "800",
//     marginTop: 5,
//   },

//   infoCard: {
//     marginTop: 16,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoText: {
//     flex: 1,
//     color: COLORS.primary,
//     fontWeight: "800",
//   },

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
//     elevation: 2,
//   },

//   myQueueCard: {
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

//   myTokenBadge: {
//     backgroundColor: COLORS.primary,
//   },

//   tokenBadgeText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   myTokenBadgeText: {
//     color: "#fff",
//   },

//   patientName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   symptoms: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//   },

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
// });  



























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen() {
//   const { tokens, latestPatientToken } = useQueue();

//   const activeToken = latestPatientToken;

//   const myDoctorQueue = useMemo(() => {
//     if (!activeToken) return [];

//     return [...tokens]
//       .filter(
//         (t) =>
//           t.hospitalId === activeToken.hospitalId &&
//           t.department === activeToken.department &&
//           t.doctor === activeToken.doctor &&
//           t.date === activeToken.date &&
//           t.slot === activeToken.slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, activeToken]);

//   const doctorServing = myDoctorQueue.find((t) => t.status === "serving");

//   const peopleBefore = activeToken
//     ? myDoctorQueue.filter(
//         (t) => t.status === "waiting" && t.tokenNumber < activeToken.tokenNumber
//       ).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Queue</Text>
//       <Text style={styles.sub}>
//         {activeToken
//           ? `${activeToken.hospitalName} • ${activeToken.department}`
//           : "No active token found"}
//       </Text>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Your Token</Text>
//         <Text style={styles.heroToken}>
//           {activeToken ? activeToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.doctor || "Any Available"}`
//             : "Book a token first"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.slotLabel || activeToken.slot} • ${
//                 activeToken.slotTime || activeToken.date
//               }`
//             : "Morning / Afternoon / Night queue"}
//         </Text>

//         <Text style={styles.heroSub}>
//           Now Serving: {doctorServing?.tokenNo || "None"}
//         </Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//         <Stat title="Wait Time" value={activeToken ? `${estimatedWait}m` : "-"} />
//         <Stat title="Status" value={activeToken?.status || "-"} />
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//         <Text style={styles.infoText}>
//           This queue is only for your selected doctor, date and slot.
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Slot Queue</Text>

//       <FlatList
//         data={myDoctorQueue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No queue available</Text>
//             <Text style={styles.emptySub}>Book a token to track live queue.</Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine = activeToken?.id === item.id;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text
//                   style={[
//                     styles.tokenBadgeText,
//                     isMine && styles.myTokenBadgeText,
//                   ]}
//                 >
//                   {item.tokenNo}
//                 </Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.slotLabel || item.slot} • {item.slotTime || item.date}
//                 </Text>

//                 <Text style={styles.symptoms}>Symptoms: {item.symptoms || "-"}</Text>
//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   title: {
//     marginTop: 52,
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   heroCard: {
//     marginTop: 20,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   heroToken: {
//     color: "#fff",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 16,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   statValue: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontSize: 11,
//     fontWeight: "800",
//     marginTop: 5,
//   },

//   infoCard: {
//     marginTop: 16,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoText: {
//     flex: 1,
//     color: COLORS.primary,
//     fontWeight: "800",
//   },

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
//     elevation: 2,
//   },

//   myQueueCard: {
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

//   myTokenBadge: {
//     backgroundColor: COLORS.primary,
//   },

//   tokenBadgeText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   myTokenBadgeText: {
//     color: "#fff",
//   },

//   patientName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   symptoms: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//   },

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
// });  

























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen({ navigation }) {
//   const { tokens, latestPatientToken } = useQueue();

//   const activeToken = latestPatientToken;

//   const myDoctorQueue = useMemo(() => {
//     if (!activeToken) return [];

//     return [...tokens]
//       .filter(
//         (t) =>
//           t.hospitalId === activeToken.hospitalId &&
//           t.department === activeToken.department &&
//           t.doctor === activeToken.doctor &&
//           t.date === activeToken.date &&
//           t.slot === activeToken.slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, activeToken]);

//   const doctorServing = myDoctorQueue.find((t) => t.status === "serving");

//   const peopleBefore = activeToken
//     ? myDoctorQueue.filter(
//         (t) => t.status === "waiting" && t.tokenNumber < activeToken.tokenNumber
//       ).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   const handleBack = () => {
//     if (navigation?.canGoBack?.()) {
//       navigation.goBack();
//       return;
//     }

//     navigation.navigate("Home");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Live Queue</Text>
//           <Text style={styles.sub}>
//             {activeToken
//               ? `${activeToken.hospitalName} • ${activeToken.department}`
//               : "No active token found"}
//           </Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Your Token</Text>
//         <Text style={styles.heroToken}>
//           {activeToken ? activeToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.doctor || "Any Available"}`
//             : "Book a token first"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.slotLabel || activeToken.slot} • ${
//                 activeToken.slotTime || activeToken.date
//               }`
//             : "Morning / Afternoon / Night queue"}
//         </Text>

//         <Text style={styles.heroSub}>
//           Now Serving: {doctorServing?.tokenNo || "None"}
//         </Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//         <Stat title="Wait Time" value={activeToken ? `${estimatedWait}m` : "-"} />
//         <Stat title="Status" value={activeToken?.status || "-"} />
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//         <Text style={styles.infoText}>
//           This queue is only for your selected doctor, date and slot.
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Slot Queue</Text>

//       <FlatList
//         data={myDoctorQueue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No queue available</Text>
//             <Text style={styles.emptySub}>Book a token to track live queue.</Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine = activeToken?.id === item.id;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text
//                   style={[
//                     styles.tokenBadgeText,
//                     isMine && styles.myTokenBadgeText,
//                   ]}
//                 >
//                   {item.tokenNo}
//                 </Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.slotLabel || item.slot} • {item.slotTime || item.date}
//                 </Text>

//                 <Text style={styles.symptoms}>
//                   Symptoms: {item.symptoms || "-"}
//                 </Text>
//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

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

//   heroCard: {
//     marginTop: 4,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   heroToken: {
//     color: "#fff",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 16,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   statValue: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontSize: 11,
//     fontWeight: "800",
//     marginTop: 5,
//   },

//   infoCard: {
//     marginTop: 16,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoText: {
//     flex: 1,
//     color: COLORS.primary,
//     fontWeight: "800",
//   },

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
//     elevation: 2,
//   },

//   myQueueCard: {
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

//   myTokenBadge: {
//     backgroundColor: COLORS.primary,
//   },

//   tokenBadgeText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   myTokenBadgeText: {
//     color: "#fff",
//   },

//   patientName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   symptoms: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//   },

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
// });  




























// import React, { useEffect, useState, useCallback, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen({ navigation }) {
//   const { loadMyActiveToken, loadActiveQueue } = useQueue();

//   const [activeToken, setActiveToken] = useState(null);
//   const [queueList, setQueueList]     = useState([]);
//   const [loading, setLoading]         = useState(true);
//   const [refreshing, setRefreshing]   = useState(false);
//   const [error, setError]             = useState("");

//   // ✅ Store latest function references in refs so useEffect dependency stays []
//   // Without this, any context re-render gives new function refs → infinite loop
//   const loadMyActiveTokenRef = useRef(loadMyActiveToken);
//   const loadActiveQueueRef   = useRef(loadActiveQueue);
//   useEffect(() => {
//     loadMyActiveTokenRef.current = loadMyActiveToken;
//     loadActiveQueueRef.current   = loadActiveQueue;
//   });

//   // ── Load data — stable callback, runs ONCE on mount ──────────────────────
//   const loadData = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       setError("");

//       const token = await loadMyActiveTokenRef.current();
//       setActiveToken(token);

//       if (!token) {
//         setQueueList([]);
//         return;
//       }

//       const queue = await loadActiveQueueRef.current(
//         token.hospitalId,
//         token.department,
//         token.doctor,
//         token.slot,
//         token.date
//       );

//       const sorted = Array.isArray(queue)
//         ? [...queue].sort((a, b) => {
//             const aNo = Number(String(a.tokenNo || "0").replace(/\D/g, "")) || 0;
//             const bNo = Number(String(b.tokenNo || "0").replace(/\D/g, "")) || 0;
//             return aNo - bNo;
//           })
//         : [];

//       setQueueList(sorted);
//     } catch (err) {
//       console.error("LiveQueueScreen:", err.message);
//       setError("Could not load live queue. Pull down to retry.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []); // ← empty deps: loadData is created once, useEffect fires once

//   useEffect(() => {
//     loadData();
//   }, [loadData]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     loadData(true);
//   };

//   // ── Derived values ────────────────────────────────────────────────────────
//   const doctorServing = queueList.find((t) => t.status === "serving");

//   const myTokenNo = activeToken
//     ? Number(String(activeToken.tokenNo || "0").replace(/\D/g, "")) || 0
//     : 0;

//   const peopleBefore = activeToken
//     ? queueList.filter((t) => {
//         const no = Number(String(t.tokenNo || "0").replace(/\D/g, "")) || 0;
//         return t.status === "waiting" && no < myTokenNo;
//       }).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   const handleBack = () => {
//     if (navigation?.canGoBack?.()) {
//       navigation.goBack();
//       return;
//     }
//     navigation.navigate("Home");
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.primary} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Live Queue</Text>
//           <Text style={styles.sub}>
//             {activeToken
//               ? `${activeToken.hospitalName} • ${activeToken.department}`
//               : "No active token found"}
//           </Text>
//         </View>
//         <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
//           <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       {/* Error banner */}
//       {error ? (
//         <View style={styles.errorBox}>
//           <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity onPress={() => loadData()}>
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : null}

//       <FlatList
//         data={queueList}
//         keyExtractor={(item) => String(item.id || item.tokenNo)}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[COLORS.primary]}
//           />
//         }
//         ListHeaderComponent={
//           <>
//             <LinearGradient
//               colors={[COLORS.primary, COLORS.secondary || "#4F46E5"]}
//               style={styles.heroCard}
//             >
//               <Text style={styles.heroLabel}>Your Token</Text>
//               <Text style={styles.heroToken}>
//                 {activeToken ? activeToken.tokenNo : "No Token"}
//               </Text>
//               <Text style={styles.heroSub}>
//                 {activeToken ? activeToken.doctor || "Any Available" : "Book a token first"}
//               </Text>
//               <Text style={styles.heroSub}>
//                 {activeToken
//                   ? `${activeToken.slotLabel || activeToken.slot || ""} • ${activeToken.slotTime || activeToken.date || ""}`
//                   : "Morning / Afternoon / Night queue"}
//               </Text>
//               <Text style={styles.heroSub}>
//                 Now Serving: {doctorServing?.tokenNo || "Not Started"}
//               </Text>
//             </LinearGradient>

//             <View style={styles.statsRow}>
//               <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//               <Stat title="Approx 7Wait Time"  value={activeToken ? `${estimatedWait}m` : "-"} />
//               <Stat title="Status"     value={activeToken?.status || "-"} />
//             </View>

//             <View style={styles.infoCard}>
//               <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//               <Text style={styles.infoText}>
//                 {activeToken
//                   ? "Pull down to refresh the queue anytime."
//                   : "Book a token from any hospital to track live queue here."}
//               </Text>
//             </View>

//             <Text style={styles.sectionTitle}>
//               Your Slot Queue ({queueList.length})
//             </Text>
//           </>
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>
//               {activeToken ? "Queue is empty" : "No active token"}
//             </Text>
//             <Text style={styles.emptySub}>
//               {activeToken
//                 ? "No patients in this slot yet."
//                 : "Book a token to track the live queue."}
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine =
//             activeToken?.id === item.id ||
//             activeToken?.tokenNo === item.tokenNo;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text style={[styles.tokenBadgeText, isMine && styles.myTokenBadgeText]}>
//                   {item.tokenNo}
//                 </Text>
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName || "Patient"}
//                 </Text>
//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text>
//                 <Text style={styles.meta}>
//                   {item.slotLabel || item.slot} • {item.slotTime || item.date}
//                 </Text>
//                 {item.symptoms ? (
//                   <Text style={styles.symptoms}>Note: {item.symptoms}</Text>
//                 ) : null}
//               </View>
//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                   isMine && item.status === "waiting" && styles.myWaitingChip,
//                 ]}
//               >
//                 {isMine ? "YOU" : item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
//   header: { marginTop: 52, marginBottom: 18, flexDirection: "row", alignItems: "center", gap: 12 },
//   backBtn: { width: 44, height: 44, borderRadius: 16, backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
//   refreshBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: COLORS.lightBlue || "#EFF6FF", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "600" },
//   errorBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#FECACA" },
//   errorText: { color: COLORS.danger, flex: 1, fontSize: 13 },
//   retryText: { color: COLORS.primary, fontWeight: "800", fontSize: 13 },
//   heroCard: { borderRadius: 28, padding: 24, alignItems: "center" },
//   heroLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
//   heroToken: { color: "#fff", fontSize: 46, fontWeight: "900", marginTop: 6 },
//   heroSub: { color: "rgba(255,255,255,0.9)", fontWeight: "700", marginTop: 8, textAlign: "center" },
//   statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },
//   statCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 20, padding: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
//   statValue: { color: COLORS.primary, fontSize: 20, fontWeight: "900", textTransform: "capitalize" },
//   statTitle: { color: COLORS.muted, fontSize: 11, fontWeight: "800", marginTop: 5 },
//   infoCard: { marginTop: 16, backgroundColor: COLORS.lightBlue || "#EFF6FF", borderRadius: 18, padding: 14, flexDirection: "row", alignItems: "center", gap: 10 },
//   infoText: { flex: 1, color: COLORS.primary, fontWeight: "700", fontSize: 13 },
//   sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text, marginTop: 24, marginBottom: 12 },
//   queueCard: { backgroundColor: COLORS.card, borderRadius: 22, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", gap: 14, elevation: 2 },
//   myQueueCard: { borderColor: COLORS.primary, backgroundColor: COLORS.lightBlue || "#EFF6FF" },
//   tokenBadge: { width: 58, height: 58, borderRadius: 20, backgroundColor: COLORS.lightBlue || "#EFF6FF", alignItems: "center", justifyContent: "center" },
//   myTokenBadge: { backgroundColor: COLORS.primary },
//   tokenBadgeText: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
//   myTokenBadgeText: { color: "#fff" },
//   patientName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   meta: { color: COLORS.muted, fontWeight: "700", marginTop: 4, fontSize: 12 },
//   symptoms: { color: COLORS.muted, marginTop: 4, fontSize: 12 },
//   statusChip: { overflow: "hidden", backgroundColor: "#FFF7ED", color: COLORS.warning, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, fontSize: 11, fontWeight: "900", textTransform: "capitalize" },
//   servingChip: { backgroundColor: "#DCFCE7", color: COLORS.success || "#16A34A" },
//   myWaitingChip: { backgroundColor: COLORS.primary, color: "#fff" },
//   emptyCard: { backgroundColor: COLORS.card, borderRadius: 24, padding: 28, alignItems: "center", borderWidth: 1, borderColor: COLORS.border },
//   emptyTitle: { color: COLORS.text, fontWeight: "900", fontSize: 17, marginTop: 12 },
//   emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6 },
// });  







































// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen() {
//   const { tokens, latestPatientToken } = useQueue();

//   const activeToken = latestPatientToken;

//   const myDoctorQueue = activeToken
//     ? [...tokens]
//         .filter(
//           (t) =>
//             t.hospitalId === activeToken.hospitalId &&
//             t.department === activeToken.department &&
//             t.doctor === activeToken.doctor &&
//             (t.status === "waiting" || t.status === "serving")
//         )
//         .sort((a, b) => a.tokenNumber - b.tokenNumber)
//     : [];

//   const doctorServing = myDoctorQueue.find((t) => t.status === "serving");

//   const peopleBefore = activeToken
//     ? myDoctorQueue.filter(
//         (t) =>
//           t.status === "waiting" &&
//           t.tokenNumber < activeToken.tokenNumber
//       ).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Queue</Text>
//       <Text style={styles.sub}>
//         {activeToken
//           ? `${activeToken.hospitalName} • ${activeToken.department}`
//           : "No active token found"}
//       </Text>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Your Token</Text>
//         <Text style={styles.heroToken}>
//           {activeToken ? activeToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.doctor || "Any Available"}`
//             : "Book a token first"}
//         </Text>

//         <Text style={styles.heroSub}>
//           Now Serving: {doctorServing?.tokenNo || "None"}
//         </Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//         <Stat title="Wait Time" value={activeToken ? `${estimatedWait}m` : "-"} />
//         <Stat title="Status" value={activeToken?.status || "-"} />
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//         <Text style={styles.infoText}>
//           This queue is only for your selected department and doctor.
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Doctor Queue</Text>

//       <FlatList
//         data={myDoctorQueue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No queue available</Text>
//             <Text style={styles.emptySub}>Book a token to track live queue.</Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine = activeToken?.id === item.id;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text
//                   style={[
//                     styles.tokenBadgeText,
//                     isMine && styles.myTokenBadgeText,
//                   ]}
//                 >
//                   {item.tokenNo}
//                 </Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text> 

//                 <Text style={styles.symptoms}>
//   Symptoms: {item.symptoms || "-"}
// </Text>

//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   title: {
//     marginTop: 52,
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   heroCard: {
//     marginTop: 20,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   heroToken: {
//     color: "#fff",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 16,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   statValue: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontSize: 11,
//     fontWeight: "800",
//     marginTop: 5,
//   },

//   infoCard: {
//     marginTop: 16,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoText: {
//     flex: 1,
//     color: COLORS.primary,
//     fontWeight: "800",
//   },

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
//     elevation: 2,
//   },

//   myQueueCard: {
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

//   myTokenBadge: {
//     backgroundColor: COLORS.primary,
//   },

//   tokenBadgeText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   myTokenBadgeText: {
//     color: "#fff",
//   },

//   patientName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   symptoms: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//   },

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
// });  



























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen() {
//   const { tokens, latestPatientToken } = useQueue();

//   const activeToken = latestPatientToken;

//   const myDoctorQueue = useMemo(() => {
//     if (!activeToken) return [];

//     return [...tokens]
//       .filter(
//         (t) =>
//           t.hospitalId === activeToken.hospitalId &&
//           t.department === activeToken.department &&
//           t.doctor === activeToken.doctor &&
//           t.date === activeToken.date &&
//           t.slot === activeToken.slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, activeToken]);

//   const doctorServing = myDoctorQueue.find((t) => t.status === "serving");

//   const peopleBefore = activeToken
//     ? myDoctorQueue.filter(
//         (t) => t.status === "waiting" && t.tokenNumber < activeToken.tokenNumber
//       ).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Queue</Text>
//       <Text style={styles.sub}>
//         {activeToken
//           ? `${activeToken.hospitalName} • ${activeToken.department}`
//           : "No active token found"}
//       </Text>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Your Token</Text>
//         <Text style={styles.heroToken}>
//           {activeToken ? activeToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.doctor || "Any Available"}`
//             : "Book a token first"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.slotLabel || activeToken.slot} • ${
//                 activeToken.slotTime || activeToken.date
//               }`
//             : "Morning / Afternoon / Night queue"}
//         </Text>

//         <Text style={styles.heroSub}>
//           Now Serving: {doctorServing?.tokenNo || "None"}
//         </Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//         <Stat title="Wait Time" value={activeToken ? `${estimatedWait}m` : "-"} />
//         <Stat title="Status" value={activeToken?.status || "-"} />
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//         <Text style={styles.infoText}>
//           This queue is only for your selected doctor, date and slot.
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Slot Queue</Text>

//       <FlatList
//         data={myDoctorQueue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No queue available</Text>
//             <Text style={styles.emptySub}>Book a token to track live queue.</Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine = activeToken?.id === item.id;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text
//                   style={[
//                     styles.tokenBadgeText,
//                     isMine && styles.myTokenBadgeText,
//                   ]}
//                 >
//                   {item.tokenNo}
//                 </Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.slotLabel || item.slot} • {item.slotTime || item.date}
//                 </Text>

//                 <Text style={styles.symptoms}>Symptoms: {item.symptoms || "-"}</Text>
//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

//   title: {
//     marginTop: 52,
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   heroCard: {
//     marginTop: 20,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   heroToken: {
//     color: "#fff",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 16,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   statValue: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontSize: 11,
//     fontWeight: "800",
//     marginTop: 5,
//   },

//   infoCard: {
//     marginTop: 16,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoText: {
//     flex: 1,
//     color: COLORS.primary,
//     fontWeight: "800",
//   },

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
//     elevation: 2,
//   },

//   myQueueCard: {
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

//   myTokenBadge: {
//     backgroundColor: COLORS.primary,
//   },

//   tokenBadgeText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   myTokenBadgeText: {
//     color: "#fff",
//   },

//   patientName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   symptoms: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//   },

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
// });  

























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function LiveQueueScreen({ navigation }) {
//   const { tokens, latestPatientToken } = useQueue();

//   const activeToken = latestPatientToken;

//   const myDoctorQueue = useMemo(() => {
//     if (!activeToken) return [];

//     return [...tokens]
//       .filter(
//         (t) =>
//           t.hospitalId === activeToken.hospitalId &&
//           t.department === activeToken.department &&
//           t.doctor === activeToken.doctor &&
//           t.date === activeToken.date &&
//           t.slot === activeToken.slot &&
//           (t.status === "waiting" || t.status === "serving")
//       )
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, activeToken]);

//   const doctorServing = myDoctorQueue.find((t) => t.status === "serving");

//   const peopleBefore = activeToken
//     ? myDoctorQueue.filter(
//         (t) => t.status === "waiting" && t.tokenNumber < activeToken.tokenNumber
//       ).length
//     : 0;

//   const estimatedWait = peopleBefore * 5;

//   const handleBack = () => {
//     if (navigation?.canGoBack?.()) {
//       navigation.goBack();
//       return;
//     }

//     navigation.navigate("Home");
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Live Queue</Text>
//           <Text style={styles.sub}>
//             {activeToken
//               ? `${activeToken.hospitalName} • ${activeToken.department}`
//               : "No active token found"}
//           </Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.heroCard}
//       >
//         <Text style={styles.heroLabel}>Your Token</Text>
//         <Text style={styles.heroToken}>
//           {activeToken ? activeToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.doctor || "Any Available"}`
//             : "Book a token first"}
//         </Text>

//         <Text style={styles.heroSub}>
//           {activeToken
//             ? `${activeToken.slotLabel || activeToken.slot} • ${
//                 activeToken.slotTime || activeToken.date
//               }`
//             : "Morning / Afternoon / Night queue"}
//         </Text>

//         <Text style={styles.heroSub}>
//           Now Serving: {doctorServing?.tokenNo || "None"}
//         </Text>
//       </LinearGradient>

//       <View style={styles.statsRow}>
//         <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
//         <Stat title="Wait Time" value={activeToken ? `${estimatedWait}m` : "-"} />
//         <Stat title="Status" value={activeToken?.status || "-"} />
//       </View>

//       <View style={styles.infoCard}>
//         <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
//         <Text style={styles.infoText}>
//           This queue is only for your selected doctor, date and slot.
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Slot Queue</Text>

//       <FlatList
//         data={myDoctorQueue}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No queue available</Text>
//             <Text style={styles.emptySub}>Book a token to track live queue.</Text>
//           </View>
//         }
//         renderItem={({ item }) => {
//           const isMine = activeToken?.id === item.id;

//           return (
//             <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
//               <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
//                 <Text
//                   style={[
//                     styles.tokenBadgeText,
//                     isMine && styles.myTokenBadgeText,
//                   ]}
//                 >
//                   {item.tokenNo}
//                 </Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.patientName}>
//                   {isMine ? "Your Token" : item.patientName}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text>

//                 <Text style={styles.meta}>
//                   {item.slotLabel || item.slot} • {item.slotTime || item.date}
//                 </Text>

//                 <Text style={styles.symptoms}>
//                   Symptoms: {item.symptoms || "-"}
//                 </Text>
//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "serving" && styles.servingChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>
//           );
//         }}
//       />
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
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 18,
//   },

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

//   heroCard: {
//     marginTop: 4,
//     borderRadius: 28,
//     padding: 24,
//     alignItems: "center",
//   },

//   heroLabel: {
//     color: "rgba(255,255,255,0.85)",
//     fontWeight: "800",
//   },

//   heroToken: {
//     color: "#fff",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   heroSub: {
//     color: "rgba(255,255,255,0.9)",
//     fontWeight: "700",
//     marginTop: 8,
//     textAlign: "center",
//   },

//   statsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 16,
//   },

//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 14,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   statValue: {
//     color: COLORS.primary,
//     fontSize: 20,
//     fontWeight: "900",
//     textTransform: "capitalize",
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontSize: 11,
//     fontWeight: "800",
//     marginTop: 5,
//   },

//   infoCard: {
//     marginTop: 16,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   infoText: {
//     flex: 1,
//     color: COLORS.primary,
//     fontWeight: "800",
//   },

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
//     elevation: 2,
//   },

//   myQueueCard: {
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

//   myTokenBadge: {
//     backgroundColor: COLORS.primary,
//   },

//   tokenBadgeText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   myTokenBadgeText: {
//     color: "#fff",
//   },

//   patientName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   meta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   symptoms: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//   },

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
// });  




























import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";

export default function LiveQueueScreen({ navigation }) {
  const { loadMyActiveToken, loadActiveQueue } = useQueue();

  const [activeToken, setActiveToken] = useState(null);
  const [queueList, setQueueList]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [refreshing, setRefreshing]   = useState(false);
  const [error, setError]             = useState("");

  // ✅ Store latest function references in refs so useEffect dependency stays []
  // Without this, any context re-render gives new function refs → infinite loop
  const loadMyActiveTokenRef = useRef(loadMyActiveToken);
  const loadActiveQueueRef   = useRef(loadActiveQueue);
  useEffect(() => {
    loadMyActiveTokenRef.current = loadMyActiveToken;
    loadActiveQueueRef.current   = loadActiveQueue;
  });

  // ── Load data — stable callback, runs ONCE on mount ──────────────────────
  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError("");

      const token = await loadMyActiveTokenRef.current();
      setActiveToken(token);

      if (!token) {
        setQueueList([]);
        return;
      }

      const queue = await loadActiveQueueRef.current(
        token.hospitalId,
        token.department,
        token.doctor,
        token.slot,
        token.date
      );

      const sorted = Array.isArray(queue)
        ? [...queue].sort((a, b) => {
            const aNo = Number(String(a.tokenNo || "0").replace(/\D/g, "")) || 0;
            const bNo = Number(String(b.tokenNo || "0").replace(/\D/g, "")) || 0;
            return aNo - bNo;
          })
        : [];

      setQueueList(sorted);
    } catch (err) {
      console.error("LiveQueueScreen:", err.message);
      setError("Could not load live queue. Pull down to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []); // ← empty deps: loadData is created once, useEffect fires once

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const doctorServing = queueList.find((t) => t.status === "serving");

  const myTokenNo = activeToken
    ? Number(String(activeToken.tokenNo || "0").replace(/\D/g, "")) || 0
    : 0;

  const peopleBefore = activeToken
    ? queueList.filter((t) => {
        const no = Number(String(t.tokenNo || "0").replace(/\D/g, "")) || 0;
        return t.status === "waiting" && no < myTokenNo;
      }).length
    : 0;

  const estimatedWait = peopleBefore * 5;

  const handleBack = () => {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }
    navigation.navigate("Home");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Live Queue</Text>
          <Text style={styles.sub}>
            {activeToken
              ? `${activeToken.hospitalName} • ${activeToken.department}`
              : "No active token found"}
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
          <Ionicons name="refresh-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Error banner */}
      {error ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => loadData()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* ── Appointment Completed Banner ─────────────────────────────────── */}
      {activeToken && (activeToken.status === "completed" || activeToken.status === "COMPLETED") ? (
        <View style={styles.completedBanner}>
          <View style={styles.completedIconBox}>
            <Ionicons name="checkmark-circle" size={54} color="#10B981" />
          </View>
          <Text style={styles.completedTitle}>Appointment Completed!</Text>
          <Text style={styles.completedSub}>
            Your appointment at {activeToken.hospitalName} has been successfully completed.
          </Text>
          <View style={styles.completedPill}>
            <Ionicons name="ticket-outline" size={14} color="#fff" />
            <Text style={styles.completedPillText}>Token {activeToken.tokenNo}</Text>
          </View>
          <Text style={styles.completedHint}>
            Visit the <Text style={{ fontWeight: "900" }}>Visits</Text> tab to give your feedback.
          </Text>
        </View>
      ) : null}

      <FlatList
        data={queueList}
        keyExtractor={(item) => String(item.id || item.tokenNo)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary || "#4F46E5"]}
              style={styles.heroCard}
            >
              <Text style={styles.heroLabel}>Your Token</Text>
              <Text style={styles.heroToken}>
                {activeToken ? activeToken.tokenNo : "No Token"}
              </Text>
              <Text style={styles.heroSub}>
                {activeToken ? activeToken.doctor || "Any Available" : "Book a token first"}
              </Text>
              <Text style={styles.heroSub}>
                {activeToken
                  ? `${activeToken.slotLabel || activeToken.slot || ""} • ${activeToken.slotTime || activeToken.date || ""}`
                  : "Morning / Afternoon / Night queue"}
              </Text>
              <Text style={styles.heroSub}>
                Now Serving: {doctorServing?.tokenNo || "Not Started"}
              </Text>
            </LinearGradient>

            <View style={styles.statsRow}>
              <Stat title="Before You" value={activeToken ? peopleBefore : "-"} />
              <Stat title="Approx Wait Time"  value={activeToken ? `${estimatedWait}m` : "-"} />
              <Stat title="Status"     value={activeToken?.status || "-"} />
            </View>


            <View style={styles.infoCard}>
              <Ionicons name="notifications-outline" size={22} color={COLORS.primary} />
              <Text style={styles.infoText}>
                {activeToken
                  ? "Pull down to refresh the queue anytime."
                  : "Book a token from any hospital to track live queue here."}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              Your Slot Queue ({queueList.length})
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="ticket-outline" size={42} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>
              {activeToken ? "Queue is empty" : "No active token"}
            </Text>
            <Text style={styles.emptySub}>
              {activeToken
                ? "No patients in this slot yet."
                : "Book a token to track the live queue."}
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isMine =
            activeToken?.id === item.id ||
            activeToken?.tokenNo === item.tokenNo;

          return (
            <View style={[styles.queueCard, isMine && styles.myQueueCard]}>
              <View style={[styles.tokenBadge, isMine && styles.myTokenBadge]}>
                <Text style={[styles.tokenBadgeText, isMine && styles.myTokenBadgeText]}>
                  {item.tokenNo}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.patientName}>
                  {isMine ? "Your Token" : item.patientName || "Patient"}
                </Text>
                <Text style={styles.meta}>
                  {item.department} • {item.doctor || "Any Available"}
                </Text>
                <Text style={styles.meta}>
                  {item.slotLabel || item.slot} • {item.slotTime || item.date}
                </Text>
                {item.symptoms ? (
                  <Text style={styles.symptoms}>Note: {item.symptoms}</Text>
                ) : null}
              </View>
              <Text
                style={[
                  styles.statusChip,
                  item.status === "serving" && styles.servingChip,
                  isMine && item.status === "waiting" && styles.myWaitingChip,
                ]}
              >
                {isMine ? "YOU" : item.status}
              </Text>
            </View>
          );
        }}
      />
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
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
  header: { marginTop: 52, marginBottom: 18, flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 16, backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
  refreshBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: COLORS.lightBlue || "#EFF6FF", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
  title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub: { color: COLORS.muted, marginTop: 4, fontWeight: "600" },
  errorBox: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: "#FECACA" },
  errorText: { color: COLORS.danger, flex: 1, fontSize: 13 },
  retryText: { color: COLORS.primary, fontWeight: "800", fontSize: 13 },
  heroCard: { borderRadius: 28, padding: 24, alignItems: "center" },
  heroLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
  heroToken: { color: "#fff", fontSize: 46, fontWeight: "900", marginTop: 6 },
  heroSub: { color: "rgba(255,255,255,0.9)", fontWeight: "700", marginTop: 8, textAlign: "center" },
  statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  statCard: { flex: 1, backgroundColor: COLORS.card, borderRadius: 20, padding: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
  statValue: { color: COLORS.primary, fontSize: 20, fontWeight: "900", textTransform: "capitalize" },
  statTitle: { color: COLORS.muted, fontSize: 11, fontWeight: "800", marginTop: 5 },
  infoCard: { marginTop: 16, backgroundColor: COLORS.lightBlue || "#EFF6FF", borderRadius: 18, padding: 14, flexDirection: "row", alignItems: "center", gap: 10 },
  infoText: { flex: 1, color: COLORS.primary, fontWeight: "700", fontSize: 13 },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text, marginTop: 24, marginBottom: 12 },
  queueCard: { backgroundColor: COLORS.card, borderRadius: 22, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", gap: 14, elevation: 2 },
  myQueueCard: { borderColor: COLORS.primary, backgroundColor: COLORS.lightBlue || "#EFF6FF" },
  tokenBadge: { width: 58, height: 58, borderRadius: 20, backgroundColor: COLORS.lightBlue || "#EFF6FF", alignItems: "center", justifyContent: "center" },
  myTokenBadge: { backgroundColor: COLORS.primary },
  tokenBadgeText: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
  myTokenBadgeText: { color: "#fff" },
  patientName: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
  meta: { color: COLORS.muted, fontWeight: "700", marginTop: 4, fontSize: 12 },
  symptoms: { color: COLORS.muted, marginTop: 4, fontSize: 12 },
  statusChip: { overflow: "hidden", backgroundColor: "#FFF7ED", color: COLORS.warning, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, fontSize: 11, fontWeight: "900", textTransform: "capitalize" },
  servingChip: { backgroundColor: "#DCFCE7", color: COLORS.success || "#16A34A" },
  myWaitingChip: { backgroundColor: COLORS.primary, color: "#fff" },
  emptyCard: { backgroundColor: COLORS.card, borderRadius: 24, padding: 28, alignItems: "center", borderWidth: 1, borderColor: COLORS.border },
  emptyTitle: { color: COLORS.text, fontWeight: "900", fontSize: 17, marginTop: 12 },
  emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6 },

  // Completed banner
  completedBanner: {
    backgroundColor: "#ECFDF5",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6EE7B7",
    elevation: 3,
  },
  completedIconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  completedTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#064E3B",
    textAlign: "center",
  },
  completedSub: {
    color: "#065F46",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
  },
  completedPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#10B981",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginTop: 14,
  },
  completedPillText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 13,
  },
  completedHint: {
    color: "#047857",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 12,
    textAlign: "center",
  },
});