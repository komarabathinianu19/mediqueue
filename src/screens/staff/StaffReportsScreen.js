































// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     color: "#10B981",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     color: "#3B82F6",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     color: "#8B5CF6",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     color: "#F59E0B",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     color: "#EC4899",
//   },
// ];

// const DEPT_ICONS = {
//   "General OPD": "medkit",
//   Cardiology: "heart",
//   Pediatrics: "body",
//   Dental: "medical",
//   Orthopedic: "fitness",
//   Emergency: "alert-circle",
// };

// export default function StaffReportsScreen() {
//   const { patientFeedbacks } = useFeedback();

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: 0,
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({
//           ...item,
//           value: 0,
//         })),
//         departmentFeedback: [],
//       };
//     }

//     let totalRating = 0;
//     let totalQuestions = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, feedback) => {
//         return acc + (feedback.ratings?.[item.key] || 0);
//       }, 0);

//       totalRating += sum;
//       totalQuestions += totalFeedbacks;

//       const averageOutOfFive = sum / totalFeedbacks;
//       const percentage = Math.round((averageOutOfFive / 5) * 100);

//       return {
//         ...item,
//         value: percentage,
//       };
//     });

//     const overallRating =
//       totalQuestions > 0 ? (totalRating / totalQuestions).toFixed(1) : "0.0";

//     const groupedDepartments = patientFeedbacks.reduce((acc, feedback) => {
//       const dept = feedback.department || "General OPD";

//       if (!acc[dept]) {
//         acc[dept] = {
//           dept,
//           count: 0,
//           ratingTotal: 0,
//           latestOpinion: "",
//         };
//       }

//       const ratings = Object.values(feedback.ratings || {});
//       const feedbackAverage =
//         ratings.length > 0
//           ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
//           : 0;

//       acc[dept].count += 1;
//       acc[dept].ratingTotal += feedbackAverage;

//       if (feedback.comment) {
//         acc[dept].latestOpinion = feedback.comment;
//       }

//       return acc;
//     }, {});

//     const departmentFeedback = Object.values(groupedDepartments).map((item) => ({
//       dept: item.dept,
//       rating: (item.ratingTotal / item.count).toFixed(1),
//       opinion:
//         item.latestOpinion ||
//         `${item.count} patient feedback${item.count > 1 ? "s" : ""} received`,
//       icon: DEPT_ICONS[item.dept] || "business",
//     }));

//     return {
//       overallRating,
//       feedbackSummary,
//       departmentFeedback,
//     };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Analytics and Patient Sentiments</Text>
//           </View>

//           <MotiView
//             from={{ rotate: "0deg" }}
//             animate={{ rotate: "360deg" }}
//             transition={{ loop: true, duration: 4000, type: "timing" }}
//             style={styles.headerIcon}
//           >
//             <Ionicons name="scan-outline" size={24} color={STAFF_COLOR} />
//           </MotiView>
//         </View>

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#065F46"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>Overall Daily Rating</Text>

//               <MotiText
//                 from={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 500 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating} <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   let iconName = "star-outline";

//                   if (roundedOverall >= star) {
//                     iconName = "star";
//                   } else if (roundedOverall >= star - 0.5) {
//                     iconName = "star-half";
//                   }

//                   return (
//                     <Ionicons
//                       key={star}
//                       name={iconName}
//                       size={16}
//                       color="#FDE047"
//                     />
//                   );
//                 })}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 {patientFeedbacks.length} patient feedback
//                 {patientFeedbacks.length !== 1 ? "s" : ""} received
//               </Text>
//             </View>

//             <Ionicons
//               name="trending-up"
//               size={80}
//               color="rgba(255,255,255,0.1)"
//               style={styles.bgIcon}
//             />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Patient Feedback Summary</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.label} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>

//                 <MotiText
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 800 + index * 100 }}
//                   style={[styles.barValue, { color: item.color }]}
//                 >
//                   {item.value}%
//                 </MotiText>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{
//                     type: "timing",
//                     duration: 1500,
//                     delay: index * 200,
//                   }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         <Text style={styles.sectionTitle}>Department Sentiments</Text>

//         {reportData.departmentFeedback.length === 0 ? (
//           <View style={styles.emptyCard}>
//             <Ionicons name="chatbox-outline" size={34} color="#94A3B8" />
//             <Text style={styles.emptyTitle}>No feedback yet</Text>
//             <Text style={styles.emptySub}>
//               Once patients submit feedback, department reports will appear here.
//             </Text>
//           </View>
//         ) : (
//           reportData.departmentFeedback.map((item, index) => (
//             <MotiView
//               key={item.dept}
//               from={{ opacity: 0, translateX: -20 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 1200 + index * 100 }}
//               style={styles.feedbackCard}
//             >
//               <View
//                 style={[
//                   styles.feedbackIcon,
//                   { backgroundColor: STAFF_COLOR + "10" },
//                 ]}
//               >
//                 <Ionicons name={item.icon} size={22} color={STAFF_COLOR} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <View style={styles.cardHeaderRow}>
//                   <Text style={styles.dept}>{item.dept}</Text>

//                   <View style={styles.ratingBadge}>
//                     <Ionicons name="star" size={12} color="#F59E0B" />
//                     <Text style={styles.ratingText}>{item.rating}</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.opinion}>{item.opinion}</Text>
//               </View>
//             </MotiView>
//           ))
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   header: {
//     marginTop: 60,
//     marginBottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#0F172A",
//     letterSpacing: -0.5,
//   },
//   sub: {
//     color: "#64748B",
//     fontWeight: "600",
//     fontSize: 13,
//     marginTop: 2,
//   },
//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     elevation: 2,
//   },

//   scoreCard: {
//     borderRadius: 32,
//     padding: 25,
//     marginBottom: 30,
//     overflow: "hidden",
//     elevation: 8,
//     shadowColor: STAFF_COLOR,
//     shadowOpacity: 0.3,
//   },
//   scoreInfo: {
//     zIndex: 2,
//   },
//   scoreLabel: {
//     color: "rgba(255,255,255,0.7)",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     fontSize: 11,
//     letterSpacing: 1,
//   },
//   score: {
//     color: "#fff",
//     fontSize: 52,
//     fontWeight: "900",
//     marginTop: 5,
//   },
//   scoreMax: {
//     fontSize: 20,
//     color: "rgba(255,255,255,0.5)",
//   },
//   ratingStars: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 4,
//   },
//   feedbackCount: {
//     marginTop: 10,
//     color: "rgba(255,255,255,0.75)",
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   bgIcon: {
//     position: "absolute",
//     right: -10,
//     bottom: -10,
//     zIndex: 1,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 15,
//     marginTop: 10,
//   },

//   graphCard: {
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 25,
//   },
//   barRow: {
//     marginBottom: 20,
//   },
//   barTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   barLabel: {
//     color: "#475569",
//     fontWeight: "700",
//     fontSize: 13,
//   },
//   barValue: {
//     fontWeight: "900",
//     fontSize: 13,
//   },
//   track: {
//     height: 8,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   fill: {
//     height: "100%",
//     borderRadius: 10,
//   },

//   feedbackCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//   },
//   feedbackIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   dept: {
//     color: "#1E293B",
//     fontSize: 16,
//     fontWeight: "800",
//   },
//   ratingBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFBEB",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     gap: 4,
//   },
//   ratingText: {
//     fontSize: 12,
//     fontWeight: "800",
//     color: "#B45309",
//   },
//   opinion: {
//     color: "#64748B",
//     marginTop: 4,
//     fontSize: 13,
//     fontWeight: "500",
//   },

//   emptyCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   emptyTitle: {
//     marginTop: 10,
//     color: "#0F172A",
//     fontSize: 17,
//     fontWeight: "900",
//   },
//   emptySub: {
//     marginTop: 6,
//     color: "#64748B",
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "600",
//     lineHeight: 19,
//   },
// });  























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     color: "#10B981",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     color: "#3B82F6",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     color: "#8B5CF6",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     color: "#F59E0B",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     color: "#EC4899",
//   },
// ];

// export default function StaffReportsScreen() {
//   const { patientFeedbacks } = useFeedback();

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: "0.0",
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({
//           ...item,
//           value: 0,
//         })),
//       };
//     }

//     let totalRating = 0;
//     let totalQuestions = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, feedback) => {
//         return acc + (feedback.ratings?.[item.key] || 0);
//       }, 0);

//       totalRating += sum;
//       totalQuestions += totalFeedbacks;

//       const averageOutOfFive = sum / totalFeedbacks;
//       const percentage = Math.round((averageOutOfFive / 5) * 100);

//       return {
//         ...item,
//         value: percentage,
//       };
//     });

//     const overallRating =
//       totalQuestions > 0 ? (totalRating / totalQuestions).toFixed(1) : "0.0";

//     return {
//       overallRating,
//       feedbackSummary,
//     };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Overall Patient Feedback Report</Text>
//           </View>

//           <MotiView
//             from={{ rotate: "0deg" }}
//             animate={{ rotate: "360deg" }}
//             transition={{ loop: true, duration: 4000, type: "timing" }}
//             style={styles.headerIcon}
//           >
//             <Ionicons name="scan-outline" size={24} color={STAFF_COLOR} />
//           </MotiView>
//         </View>

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#065F46"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>Overall Rating</Text>

//               <MotiText
//                 from={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 500 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating}{" "}
//                 <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   let iconName = "star-outline";

//                   if (roundedOverall >= star) {
//                     iconName = "star";
//                   } else if (roundedOverall >= star - 0.5) {
//                     iconName = "star-half";
//                   }

//                   return (
//                     <Ionicons
//                       key={star}
//                       name={iconName}
//                       size={16}
//                       color="#FDE047"
//                     />
//                   );
//                 })}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 {patientFeedbacks.length} patient feedback
//                 {patientFeedbacks.length !== 1 ? "s" : ""} received
//               </Text>
//             </View>

//             <Ionicons
//               name="trending-up"
//               size={80}
//               color="rgba(255,255,255,0.1)"
//               style={styles.bgIcon}
//             />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Feedback Questions Report</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.label} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>

//                 <MotiText
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 800 + index * 100 }}
//                   style={[styles.barValue, { color: item.color }]}
//                 >
//                   {item.value}%
//                 </MotiText>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{
//                     type: "timing",
//                     duration: 1500,
//                     delay: index * 200,
//                   }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         {patientFeedbacks.length === 0 && (
//           <View style={styles.emptyCard}>
//             <Ionicons name="chatbox-outline" size={34} color="#94A3B8" />
//             <Text style={styles.emptyTitle}>No feedback yet</Text>
//             <Text style={styles.emptySub}>
//               Once patients submit feedback, the report will appear here.
//             </Text>
//           </View>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   header: {
//     marginTop: 60,
//     marginBottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#0F172A",
//     letterSpacing: -0.5,
//   },

//   sub: {
//     color: "#64748B",
//     fontWeight: "600",
//     fontSize: 13,
//     marginTop: 2,
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     elevation: 2,
//   },

//   scoreCard: {
//     borderRadius: 32,
//     padding: 25,
//     marginBottom: 30,
//     overflow: "hidden",
//     elevation: 8,
//     shadowColor: STAFF_COLOR,
//     shadowOpacity: 0.3,
//   },

//   scoreInfo: {
//     zIndex: 2,
//   },

//   scoreLabel: {
//     color: "rgba(255,255,255,0.7)",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     fontSize: 11,
//     letterSpacing: 1,
//   },

//   score: {
//     color: "#fff",
//     fontSize: 52,
//     fontWeight: "900",
//     marginTop: 5,
//   },

//   scoreMax: {
//     fontSize: 20,
//     color: "rgba(255,255,255,0.5)",
//   },

//   ratingStars: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 4,
//   },

//   feedbackCount: {
//     marginTop: 10,
//     color: "rgba(255,255,255,0.75)",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   bgIcon: {
//     position: "absolute",
//     right: -10,
//     bottom: -10,
//     zIndex: 1,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 15,
//     marginTop: 10,
//   },

//   graphCard: {
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 25,
//   },

//   barRow: {
//     marginBottom: 20,
//   },

//   barTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   barLabel: {
//     color: "#475569",
//     fontWeight: "700",
//     fontSize: 13,
//   },

//   barValue: {
//     fontWeight: "900",
//     fontSize: 13,
//   },

//   track: {
//     height: 8,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     overflow: "hidden",
//   },

//   fill: {
//     height: "100%",
//     borderRadius: 10,
//   },

//   emptyCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },

//   emptyTitle: {
//     marginTop: 10,
//     color: "#0F172A",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   emptySub: {
//     marginTop: 6,
//     color: "#64748B",
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "600",
//     lineHeight: 19,
//   },
// });  


























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     color: "#10B981",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     color: "#3B82F6",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     color: "#8B5CF6",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     color: "#F59E0B",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     color: "#EC4899",
//   },
// ];

// export default function StaffReportsScreen() {
//   const { patientFeedbacks } = useFeedback();

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: "0.0",
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({
//           ...item,
//           value: 0,
//         })),
//       };
//     }

//     let totalRating = 0;
//     let totalQuestions = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, feedback) => {
//         return acc + (feedback.ratings?.[item.key] || 0);
//       }, 0);

//       totalRating += sum;
//       totalQuestions += totalFeedbacks;

//       const averageOutOfFive = sum / totalFeedbacks;
//       const percentage = Math.round((averageOutOfFive / 5) * 100);

//       return {
//         ...item,
//         value: percentage,
//       };
//     });

//     const overallRating =
//       totalQuestions > 0 ? (totalRating / totalQuestions).toFixed(1) : "0.0";

//     return {
//       overallRating,
//       feedbackSummary,
//     };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Overall Patient Feedback Report</Text>
//           </View>


//         </View>

//         <MotiView
//           from={{ opacity: 0, translateY: 12 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 450 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#047857"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>Overall Rating</Text>

//               <MotiText
//                 from={{ opacity: 0, translateY: 6 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: 200, type: "timing", duration: 400 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating}{" "}
//                 <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   let iconName = "star-outline";

//                   if (roundedOverall >= star) {
//                     iconName = "star";
//                   } else if (roundedOverall >= star - 0.5) {
//                     iconName = "star-half";
//                   }

//                   return (
//                     <Ionicons
//                       key={star}
//                       name={iconName}
//                       size={16}
//                       color="#FDE047"
//                     />
//                   );
//                 })}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 {patientFeedbacks.length} patient feedback
//                 {patientFeedbacks.length !== 1 ? "s" : ""} received
//               </Text>
//             </View>

//             <Ionicons
//               name="trending-up"
//               size={70}
//               color="rgba(255,255,255,0.08)"
//               style={styles.bgIcon}
//             />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Feedback Questions Report</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.label} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>

//                 <MotiText
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 300 + index * 80 }}
//                   style={[styles.barValue, { color: item.color }]}
//                 >
//                   {item.value}%
//                 </MotiText>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{
//                     type: "timing",
//                     duration: 800,
//                     delay: index * 100,
//                   }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         {patientFeedbacks.length === 0 && (
//           <View style={styles.emptyCard}>
//             <Ionicons name="chatbox-outline" size={34} color="#94A3B8" />
//             <Text style={styles.emptyTitle}>No feedback yet</Text>
//             <Text style={styles.emptySub}>
//               Once patients submit feedback, the report will appear here.
//             </Text>
//           </View>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   header: {
//     marginTop: 60,
//     marginBottom: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#0F172A",
//     letterSpacing: -0.5,
//   },

//   sub: {
//     color: "#64748B",
//     fontWeight: "600",
//     fontSize: 13,
//     marginTop: 2,
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     elevation: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//   },

//   scoreCard: {
//     borderRadius: 28,
//     padding: 24,
//     marginBottom: 28,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//   },

//   scoreInfo: {
//     zIndex: 2,
//   },

//   scoreLabel: {
//     color: "rgba(255,255,255,0.76)",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     fontSize: 11,
//     letterSpacing: 1,
//   },

//   score: {
//     color: "#fff",
//     fontSize: 50,
//     fontWeight: "900",
//     marginTop: 5,
//   },

//   scoreMax: {
//     fontSize: 20,
//     color: "rgba(255,255,255,0.55)",
//   },

//   ratingStars: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 4,
//   },

//   feedbackCount: {
//     marginTop: 10,
//     color: "rgba(255,255,255,0.78)",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   bgIcon: {
//     position: "absolute",
//     right: -8,
//     bottom: -8,
//     zIndex: 1,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 15,
//     marginTop: 8,
//   },

//   graphCard: {
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 25,
//   },

//   barRow: {
//     marginBottom: 20,
//   },

//   barTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   barLabel: {
//     color: "#475569",
//     fontWeight: "700",
//     fontSize: 13,
//   },

//   barValue: {
//     fontWeight: "900",
//     fontSize: 13,
//   },

//   track: {
//     height: 8,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     overflow: "hidden",
//   },

//   fill: {
//     height: "100%",
//     borderRadius: 10,
//   },

//   emptyCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },

//   emptyTitle: {
//     marginTop: 10,
//     color: "#0F172A",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   emptySub: {
//     marginTop: 6,
//     color: "#64748B",
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "600",
//     lineHeight: 19,
//   },
// });  






























// import React, { useMemo, useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   { key: "patientSatisfaction", label: "Patient Satisfaction", color: "#10B981" },
//   { key: "queueExperience", label: "Queue Experience", color: "#3B82F6" },
//   { key: "doctorResponse", label: "Doctor Response", color: "#8B5CF6" },
//   { key: "staffBehaviour", label: "Staff Behaviour", color: "#F59E0B" },
//   { key: "cleanliness", label: "Cleanliness", color: "#EC4899" },
// ];

// export default function StaffReportsScreen() {
//   const { patientFeedbacks, refreshFeedbacks, loading } = useFeedback();
//   const [refreshing, setRefreshing] = useState(false);

//   // Handle pull-to-refresh for latest MySQL data
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refreshFeedbacks();
//     setRefreshing(false);
//   };

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: "0.0",
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({ ...item, value: 0 })),
//       };
//     }

//     let totalRatingSum = 0;
//     let totalMetricsCount = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, f) => acc + (f.ratings?.[item.key] || 0), 0);
//       const averageOutOfFive = sum / totalFeedbacks;
      
//       totalRatingSum += sum;
//       totalMetricsCount += totalFeedbacks;

//       return {
//         ...item,
//         value: Math.round((averageOutOfFive / 5) * 100),
//       };
//     });

//     const overallRating = (totalRatingSum / totalMetricsCount).toFixed(1);

//     return { overallRating, feedbackSummary };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView 
//         style={styles.container} 
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={STAFF_COLOR} />
//         }
//       >
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Live Patient Analytics</Text>
//           </View>
//           <View style={styles.headerIcon}>
//              <Ionicons name="stats-chart" size={20} color={STAFF_COLOR} />
//           </View>
//         </View>

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#065F46"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>COMMUNITY TRUST SCORE</Text>

//               <MotiText
//                 from={{ opacity: 0, translateY: 10 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating} <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Ionicons
//                     key={star}
//                     name={roundedOverall >= star ? "star" : roundedOverall >= star - 0.5 ? "star-half" : "star-outline"}
//                     size={18}
//                     color="#FDE047"
//                   />
//                 ))}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 Based on {patientFeedbacks.length} verified patient reviews
//               </Text>
//             </View>

//             <Ionicons name="shield-checkmark" size={100} color="rgba(255,255,255,0.1)" style={styles.bgIcon} />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Performance Metrics</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.key} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>
//                 <Text style={[styles.barValue, { color: item.color }]}>{item.value}%</Text>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{ type: "timing", duration: 1000, delay: index * 150 }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         {patientFeedbacks.length === 0 && !loading && (
//           <MotiView 
//             from={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             style={styles.emptyCard}
//           >
//             <View style={styles.emptyIconBox}>
//                 <Ionicons name="analytics-outline" size={30} color={COLORS.muted} />
//             </View>
//             <Text style={styles.emptyTitle}>Awaiting Data</Text>
//             <Text style={styles.emptySub}>
//               Reports will generate automatically as patients complete their visits and leave feedback.
//             </Text>
//           </MotiView>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
//   container: { flex: 1, paddingHorizontal: 20 },
//   header: { marginTop: 60, marginBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   title: { fontSize: 26, fontWeight: "900", color: "#0F172A", letterSpacing: -0.8 },
//   sub: { color: "#64748B", fontWeight: "700", fontSize: 13, marginTop: 2 },
//   headerIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", elevation: 2 },
//   scoreCard: { borderRadius: 32, padding: 26, marginBottom: 28, overflow: "hidden", elevation: 8 },
//   scoreInfo: { zIndex: 2 },
//   scoreLabel: { color: "rgba(255,255,255,0.7)", fontWeight: "900", fontSize: 10, letterSpacing: 1.5 },
//   score: { color: "#fff", fontSize: 56, fontWeight: "900", marginTop: 4 },
//   scoreMax: { fontSize: 22, color: "rgba(255,255,255,0.4)" },
//   ratingStars: { flexDirection: "row", marginTop: 8, gap: 5 },
//   feedbackCount: { marginTop: 15, color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" },
//   bgIcon: { position: "absolute", right: -15, bottom: -15 },
//   sectionTitle: { fontSize: 19, fontWeight: "900", color: "#0F172A", marginBottom: 16 },
//   graphCard: { backgroundColor: "#fff", borderRadius: 28, padding: 24, elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 15 },
//   barRow: { marginBottom: 22 },
//   barTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   barLabel: { color: "#334155", fontWeight: "800", fontSize: 13 },
//   barValue: { fontWeight: "900", fontSize: 13 },
//   track: { height: 10, backgroundColor: "#F1F5F9", borderRadius: 10, overflow: "hidden" },
//   fill: { height: "100%", borderRadius: 10 },
//   emptyCard: { backgroundColor: "#fff", borderRadius: 24, padding: 30, alignItems: "center", borderWidth: 1, borderColor: "#F1F5F9" },
//   emptyIconBox: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
//   emptyTitle: { color: "#0F172A", fontSize: 18, fontWeight: "900" },
//   emptySub: { marginTop: 8, color: "#64748B", textAlign: "center", fontSize: 13, fontWeight: "600", lineHeight: 20 },
// });  




































// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     color: "#10B981",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     color: "#3B82F6",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     color: "#8B5CF6",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     color: "#F59E0B",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     color: "#EC4899",
//   },
// ];

// const DEPT_ICONS = {
//   "General OPD": "medkit",
//   Cardiology: "heart",
//   Pediatrics: "body",
//   Dental: "medical",
//   Orthopedic: "fitness",
//   Emergency: "alert-circle",
// };

// export default function StaffReportsScreen() {
//   const { patientFeedbacks } = useFeedback();

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: 0,
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({
//           ...item,
//           value: 0,
//         })),
//         departmentFeedback: [],
//       };
//     }

//     let totalRating = 0;
//     let totalQuestions = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, feedback) => {
//         return acc + (feedback.ratings?.[item.key] || 0);
//       }, 0);

//       totalRating += sum;
//       totalQuestions += totalFeedbacks;

//       const averageOutOfFive = sum / totalFeedbacks;
//       const percentage = Math.round((averageOutOfFive / 5) * 100);

//       return {
//         ...item,
//         value: percentage,
//       };
//     });

//     const overallRating =
//       totalQuestions > 0 ? (totalRating / totalQuestions).toFixed(1) : "0.0";

//     const groupedDepartments = patientFeedbacks.reduce((acc, feedback) => {
//       const dept = feedback.department || "General OPD";

//       if (!acc[dept]) {
//         acc[dept] = {
//           dept,
//           count: 0,
//           ratingTotal: 0,
//           latestOpinion: "",
//         };
//       }

//       const ratings = Object.values(feedback.ratings || {});
//       const feedbackAverage =
//         ratings.length > 0
//           ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length
//           : 0;

//       acc[dept].count += 1;
//       acc[dept].ratingTotal += feedbackAverage;

//       if (feedback.comment) {
//         acc[dept].latestOpinion = feedback.comment;
//       }

//       return acc;
//     }, {});

//     const departmentFeedback = Object.values(groupedDepartments).map((item) => ({
//       dept: item.dept,
//       rating: (item.ratingTotal / item.count).toFixed(1),
//       opinion:
//         item.latestOpinion ||
//         `${item.count} patient feedback${item.count > 1 ? "s" : ""} received`,
//       icon: DEPT_ICONS[item.dept] || "business",
//     }));

//     return {
//       overallRating,
//       feedbackSummary,
//       departmentFeedback,
//     };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Analytics and Patient Sentiments</Text>
//           </View>

//           <MotiView
//             from={{ rotate: "0deg" }}
//             animate={{ rotate: "360deg" }}
//             transition={{ loop: true, duration: 4000, type: "timing" }}
//             style={styles.headerIcon}
//           >
//             <Ionicons name="scan-outline" size={24} color={STAFF_COLOR} />
//           </MotiView>
//         </View>

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#065F46"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>Overall Daily Rating</Text>

//               <MotiText
//                 from={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 500 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating} <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   let iconName = "star-outline";

//                   if (roundedOverall >= star) {
//                     iconName = "star";
//                   } else if (roundedOverall >= star - 0.5) {
//                     iconName = "star-half";
//                   }

//                   return (
//                     <Ionicons
//                       key={star}
//                       name={iconName}
//                       size={16}
//                       color="#FDE047"
//                     />
//                   );
//                 })}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 {patientFeedbacks.length} patient feedback
//                 {patientFeedbacks.length !== 1 ? "s" : ""} received
//               </Text>
//             </View>

//             <Ionicons
//               name="trending-up"
//               size={80}
//               color="rgba(255,255,255,0.1)"
//               style={styles.bgIcon}
//             />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Patient Feedback Summary</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.label} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>

//                 <MotiText
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 800 + index * 100 }}
//                   style={[styles.barValue, { color: item.color }]}
//                 >
//                   {item.value}%
//                 </MotiText>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{
//                     type: "timing",
//                     duration: 1500,
//                     delay: index * 200,
//                   }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         <Text style={styles.sectionTitle}>Department Sentiments</Text>

//         {reportData.departmentFeedback.length === 0 ? (
//           <View style={styles.emptyCard}>
//             <Ionicons name="chatbox-outline" size={34} color="#94A3B8" />
//             <Text style={styles.emptyTitle}>No feedback yet</Text>
//             <Text style={styles.emptySub}>
//               Once patients submit feedback, department reports will appear here.
//             </Text>
//           </View>
//         ) : (
//           reportData.departmentFeedback.map((item, index) => (
//             <MotiView
//               key={item.dept}
//               from={{ opacity: 0, translateX: -20 }}
//               animate={{ opacity: 1, translateX: 0 }}
//               transition={{ delay: 1200 + index * 100 }}
//               style={styles.feedbackCard}
//             >
//               <View
//                 style={[
//                   styles.feedbackIcon,
//                   { backgroundColor: STAFF_COLOR + "10" },
//                 ]}
//               >
//                 <Ionicons name={item.icon} size={22} color={STAFF_COLOR} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <View style={styles.cardHeaderRow}>
//                   <Text style={styles.dept}>{item.dept}</Text>

//                   <View style={styles.ratingBadge}>
//                     <Ionicons name="star" size={12} color="#F59E0B" />
//                     <Text style={styles.ratingText}>{item.rating}</Text>
//                   </View>
//                 </View>

//                 <Text style={styles.opinion}>{item.opinion}</Text>
//               </View>
//             </MotiView>
//           ))
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   header: {
//     marginTop: 60,
//     marginBottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#0F172A",
//     letterSpacing: -0.5,
//   },
//   sub: {
//     color: "#64748B",
//     fontWeight: "600",
//     fontSize: 13,
//     marginTop: 2,
//   },
//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     elevation: 2,
//   },

//   scoreCard: {
//     borderRadius: 32,
//     padding: 25,
//     marginBottom: 30,
//     overflow: "hidden",
//     elevation: 8,
//     shadowColor: STAFF_COLOR,
//     shadowOpacity: 0.3,
//   },
//   scoreInfo: {
//     zIndex: 2,
//   },
//   scoreLabel: {
//     color: "rgba(255,255,255,0.7)",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     fontSize: 11,
//     letterSpacing: 1,
//   },
//   score: {
//     color: "#fff",
//     fontSize: 52,
//     fontWeight: "900",
//     marginTop: 5,
//   },
//   scoreMax: {
//     fontSize: 20,
//     color: "rgba(255,255,255,0.5)",
//   },
//   ratingStars: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 4,
//   },
//   feedbackCount: {
//     marginTop: 10,
//     color: "rgba(255,255,255,0.75)",
//     fontSize: 12,
//     fontWeight: "700",
//   },
//   bgIcon: {
//     position: "absolute",
//     right: -10,
//     bottom: -10,
//     zIndex: 1,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 15,
//     marginTop: 10,
//   },

//   graphCard: {
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 25,
//   },
//   barRow: {
//     marginBottom: 20,
//   },
//   barTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   barLabel: {
//     color: "#475569",
//     fontWeight: "700",
//     fontSize: 13,
//   },
//   barValue: {
//     fontWeight: "900",
//     fontSize: 13,
//   },
//   track: {
//     height: 8,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   fill: {
//     height: "100%",
//     borderRadius: 10,
//   },

//   feedbackCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     flexDirection: "row",
//     gap: 15,
//     alignItems: "center",
//   },
//   feedbackIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cardHeaderRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   dept: {
//     color: "#1E293B",
//     fontSize: 16,
//     fontWeight: "800",
//   },
//   ratingBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FFFBEB",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 8,
//     gap: 4,
//   },
//   ratingText: {
//     fontSize: 12,
//     fontWeight: "800",
//     color: "#B45309",
//   },
//   opinion: {
//     color: "#64748B",
//     marginTop: 4,
//     fontSize: 13,
//     fontWeight: "500",
//   },

//   emptyCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   emptyTitle: {
//     marginTop: 10,
//     color: "#0F172A",
//     fontSize: 17,
//     fontWeight: "900",
//   },
//   emptySub: {
//     marginTop: 6,
//     color: "#64748B",
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "600",
//     lineHeight: 19,
//   },
// });  























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     color: "#10B981",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     color: "#3B82F6",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     color: "#8B5CF6",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     color: "#F59E0B",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     color: "#EC4899",
//   },
// ];

// export default function StaffReportsScreen() {
//   const { patientFeedbacks } = useFeedback();

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: "0.0",
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({
//           ...item,
//           value: 0,
//         })),
//       };
//     }

//     let totalRating = 0;
//     let totalQuestions = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, feedback) => {
//         return acc + (feedback.ratings?.[item.key] || 0);
//       }, 0);

//       totalRating += sum;
//       totalQuestions += totalFeedbacks;

//       const averageOutOfFive = sum / totalFeedbacks;
//       const percentage = Math.round((averageOutOfFive / 5) * 100);

//       return {
//         ...item,
//         value: percentage,
//       };
//     });

//     const overallRating =
//       totalQuestions > 0 ? (totalRating / totalQuestions).toFixed(1) : "0.0";

//     return {
//       overallRating,
//       feedbackSummary,
//     };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Overall Patient Feedback Report</Text>
//           </View>

//           <MotiView
//             from={{ rotate: "0deg" }}
//             animate={{ rotate: "360deg" }}
//             transition={{ loop: true, duration: 4000, type: "timing" }}
//             style={styles.headerIcon}
//           >
//             <Ionicons name="scan-outline" size={24} color={STAFF_COLOR} />
//           </MotiView>
//         </View>

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#065F46"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>Overall Rating</Text>

//               <MotiText
//                 from={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 500 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating}{" "}
//                 <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   let iconName = "star-outline";

//                   if (roundedOverall >= star) {
//                     iconName = "star";
//                   } else if (roundedOverall >= star - 0.5) {
//                     iconName = "star-half";
//                   }

//                   return (
//                     <Ionicons
//                       key={star}
//                       name={iconName}
//                       size={16}
//                       color="#FDE047"
//                     />
//                   );
//                 })}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 {patientFeedbacks.length} patient feedback
//                 {patientFeedbacks.length !== 1 ? "s" : ""} received
//               </Text>
//             </View>

//             <Ionicons
//               name="trending-up"
//               size={80}
//               color="rgba(255,255,255,0.1)"
//               style={styles.bgIcon}
//             />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Feedback Questions Report</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.label} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>

//                 <MotiText
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 800 + index * 100 }}
//                   style={[styles.barValue, { color: item.color }]}
//                 >
//                   {item.value}%
//                 </MotiText>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{
//                     type: "timing",
//                     duration: 1500,
//                     delay: index * 200,
//                   }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         {patientFeedbacks.length === 0 && (
//           <View style={styles.emptyCard}>
//             <Ionicons name="chatbox-outline" size={34} color="#94A3B8" />
//             <Text style={styles.emptyTitle}>No feedback yet</Text>
//             <Text style={styles.emptySub}>
//               Once patients submit feedback, the report will appear here.
//             </Text>
//           </View>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   header: {
//     marginTop: 60,
//     marginBottom: 25,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#0F172A",
//     letterSpacing: -0.5,
//   },

//   sub: {
//     color: "#64748B",
//     fontWeight: "600",
//     fontSize: 13,
//     marginTop: 2,
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     elevation: 2,
//   },

//   scoreCard: {
//     borderRadius: 32,
//     padding: 25,
//     marginBottom: 30,
//     overflow: "hidden",
//     elevation: 8,
//     shadowColor: STAFF_COLOR,
//     shadowOpacity: 0.3,
//   },

//   scoreInfo: {
//     zIndex: 2,
//   },

//   scoreLabel: {
//     color: "rgba(255,255,255,0.7)",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     fontSize: 11,
//     letterSpacing: 1,
//   },

//   score: {
//     color: "#fff",
//     fontSize: 52,
//     fontWeight: "900",
//     marginTop: 5,
//   },

//   scoreMax: {
//     fontSize: 20,
//     color: "rgba(255,255,255,0.5)",
//   },

//   ratingStars: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 4,
//   },

//   feedbackCount: {
//     marginTop: 10,
//     color: "rgba(255,255,255,0.75)",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   bgIcon: {
//     position: "absolute",
//     right: -10,
//     bottom: -10,
//     zIndex: 1,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 15,
//     marginTop: 10,
//   },

//   graphCard: {
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 25,
//   },

//   barRow: {
//     marginBottom: 20,
//   },

//   barTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   barLabel: {
//     color: "#475569",
//     fontWeight: "700",
//     fontSize: 13,
//   },

//   barValue: {
//     fontWeight: "900",
//     fontSize: 13,
//   },

//   track: {
//     height: 8,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     overflow: "hidden",
//   },

//   fill: {
//     height: "100%",
//     borderRadius: 10,
//   },

//   emptyCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },

//   emptyTitle: {
//     marginTop: 10,
//     color: "#0F172A",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   emptySub: {
//     marginTop: 6,
//     color: "#64748B",
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "600",
//     lineHeight: 19,
//   },
// });  


























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     color: "#10B981",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     color: "#3B82F6",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     color: "#8B5CF6",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     color: "#F59E0B",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     color: "#EC4899",
//   },
// ];

// export default function StaffReportsScreen() {
//   const { patientFeedbacks } = useFeedback();

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: "0.0",
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({
//           ...item,
//           value: 0,
//         })),
//       };
//     }

//     let totalRating = 0;
//     let totalQuestions = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, feedback) => {
//         return acc + (feedback.ratings?.[item.key] || 0);
//       }, 0);

//       totalRating += sum;
//       totalQuestions += totalFeedbacks;

//       const averageOutOfFive = sum / totalFeedbacks;
//       const percentage = Math.round((averageOutOfFive / 5) * 100);

//       return {
//         ...item,
//         value: percentage,
//       };
//     });

//     const overallRating =
//       totalQuestions > 0 ? (totalRating / totalQuestions).toFixed(1) : "0.0";

//     return {
//       overallRating,
//       feedbackSummary,
//     };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Overall Patient Feedback Report</Text>
//           </View>


//         </View>

//         <MotiView
//           from={{ opacity: 0, translateY: 12 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 450 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#047857"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>Overall Rating</Text>

//               <MotiText
//                 from={{ opacity: 0, translateY: 6 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 transition={{ delay: 200, type: "timing", duration: 400 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating}{" "}
//                 <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => {
//                   let iconName = "star-outline";

//                   if (roundedOverall >= star) {
//                     iconName = "star";
//                   } else if (roundedOverall >= star - 0.5) {
//                     iconName = "star-half";
//                   }

//                   return (
//                     <Ionicons
//                       key={star}
//                       name={iconName}
//                       size={16}
//                       color="#FDE047"
//                     />
//                   );
//                 })}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 {patientFeedbacks.length} patient feedback
//                 {patientFeedbacks.length !== 1 ? "s" : ""} received
//               </Text>
//             </View>

//             <Ionicons
//               name="trending-up"
//               size={70}
//               color="rgba(255,255,255,0.08)"
//               style={styles.bgIcon}
//             />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Feedback Questions Report</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.label} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>

//                 <MotiText
//                   from={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 300 + index * 80 }}
//                   style={[styles.barValue, { color: item.color }]}
//                 >
//                   {item.value}%
//                 </MotiText>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{
//                     type: "timing",
//                     duration: 800,
//                     delay: index * 100,
//                   }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         {patientFeedbacks.length === 0 && (
//           <View style={styles.emptyCard}>
//             <Ionicons name="chatbox-outline" size={34} color="#94A3B8" />
//             <Text style={styles.emptyTitle}>No feedback yet</Text>
//             <Text style={styles.emptySub}>
//               Once patients submit feedback, the report will appear here.
//             </Text>
//           </View>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },

//   header: {
//     marginTop: 60,
//     marginBottom: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "900",
//     color: "#0F172A",
//     letterSpacing: -0.5,
//   },

//   sub: {
//     color: "#64748B",
//     fontWeight: "600",
//     fontSize: 13,
//     marginTop: 2,
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//     elevation: 1,
//     shadowColor: "#000",
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//   },

//   scoreCard: {
//     borderRadius: 28,
//     padding: 24,
//     marginBottom: 28,
//     overflow: "hidden",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//   },

//   scoreInfo: {
//     zIndex: 2,
//   },

//   scoreLabel: {
//     color: "rgba(255,255,255,0.76)",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     fontSize: 11,
//     letterSpacing: 1,
//   },

//   score: {
//     color: "#fff",
//     fontSize: 50,
//     fontWeight: "900",
//     marginTop: 5,
//   },

//   scoreMax: {
//     fontSize: 20,
//     color: "rgba(255,255,255,0.55)",
//   },

//   ratingStars: {
//     flexDirection: "row",
//     marginTop: 10,
//     gap: 4,
//   },

//   feedbackCount: {
//     marginTop: 10,
//     color: "rgba(255,255,255,0.78)",
//     fontSize: 12,
//     fontWeight: "700",
//   },

//   bgIcon: {
//     position: "absolute",
//     right: -8,
//     bottom: -8,
//     zIndex: 1,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 15,
//     marginTop: 8,
//   },

//   graphCard: {
//     backgroundColor: "#fff",
//     borderRadius: 28,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     marginBottom: 25,
//   },

//   barRow: {
//     marginBottom: 20,
//   },

//   barTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },

//   barLabel: {
//     color: "#475569",
//     fontWeight: "700",
//     fontSize: 13,
//   },

//   barValue: {
//     fontWeight: "900",
//     fontSize: 13,
//   },

//   track: {
//     height: 8,
//     backgroundColor: "#F1F5F9",
//     borderRadius: 10,
//     overflow: "hidden",
//   },

//   fill: {
//     height: "100%",
//     borderRadius: 10,
//   },

//   emptyCard: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },

//   emptyTitle: {
//     marginTop: 10,
//     color: "#0F172A",
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   emptySub: {
//     marginTop: 6,
//     color: "#64748B",
//     textAlign: "center",
//     fontSize: 13,
//     fontWeight: "600",
//     lineHeight: 19,
//   },
// });  






























// import React, { useMemo, useState, useEffect } from "react";
// import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// const FEEDBACK_CONFIG = [
//   { key: "patientSatisfaction", label: "Patient Satisfaction", color: "#10B981" },
//   { key: "queueExperience", label: "Queue Experience", color: "#3B82F6" },
//   { key: "doctorResponse", label: "Doctor Response", color: "#8B5CF6" },
//   { key: "staffBehaviour", label: "Staff Behaviour", color: "#F59E0B" },
//   { key: "cleanliness", label: "Cleanliness", color: "#EC4899" },
// ];

// export default function StaffReportsScreen() {
//   const { patientFeedbacks, refreshFeedbacks, loading } = useFeedback();
//   const [refreshing, setRefreshing] = useState(false);

//   // Load feedbacks from backend on mount
//   useEffect(() => {
//     refreshFeedbacks();
//   }, []);

//   // Handle pull-to-refresh for latest MySQL data
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refreshFeedbacks();
//     setRefreshing(false);
//   };

//   const reportData = useMemo(() => {
//     const totalFeedbacks = patientFeedbacks.length;

//     if (totalFeedbacks === 0) {
//       return {
//         overallRating: "0.0",
//         feedbackSummary: FEEDBACK_CONFIG.map((item) => ({ ...item, value: 0 })),
//       };
//     }

//     let totalRatingSum = 0;
//     let totalMetricsCount = 0;

//     const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
//       const sum = patientFeedbacks.reduce((acc, f) => acc + (f.ratings?.[item.key] || 0), 0);
//       const averageOutOfFive = sum / totalFeedbacks;
      
//       totalRatingSum += sum;
//       totalMetricsCount += totalFeedbacks;

//       return {
//         ...item,
//         value: Math.round((averageOutOfFive / 5) * 100),
//       };
//     });

//     const overallRating = (totalRatingSum / totalMetricsCount).toFixed(1);

//     return { overallRating, feedbackSummary };
//   }, [patientFeedbacks]);

//   const roundedOverall = Number(reportData.overallRating || 0);

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView 
//         style={styles.container} 
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={STAFF_COLOR} />
//         }
//       >
//         <View style={styles.header}>
//           <View>
//             <Text style={styles.title}>Hospital Insights</Text>
//             <Text style={styles.sub}>Live Patient Analytics</Text>
//           </View>
//           <View style={styles.headerIcon}>
//              <Ionicons name="stats-chart" size={20} color={STAFF_COLOR} />
//           </View>
//         </View>

//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "spring", damping: 15 }}
//         >
//           <LinearGradient
//             colors={[STAFF_COLOR, "#065F46"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.scoreCard}
//           >
//             <View style={styles.scoreInfo}>
//               <Text style={styles.scoreLabel}>COMMUNITY TRUST SCORE</Text>

//               <MotiText
//                 from={{ opacity: 0, translateY: 10 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 style={styles.score}
//               >
//                 {reportData.overallRating} <Text style={styles.scoreMax}>/ 5</Text>
//               </MotiText>

//               <View style={styles.ratingStars}>
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Ionicons
//                     key={star}
//                     name={roundedOverall >= star ? "star" : roundedOverall >= star - 0.5 ? "star-half" : "star-outline"}
//                     size={18}
//                     color="#FDE047"
//                   />
//                 ))}
//               </View>

//               <Text style={styles.feedbackCount}>
//                 Based on {patientFeedbacks.length} verified patient reviews
//               </Text>
//             </View>

//             <Ionicons name="shield-checkmark" size={100} color="rgba(255,255,255,0.1)" style={styles.bgIcon} />
//           </LinearGradient>
//         </MotiView>

//         <Text style={styles.sectionTitle}>Performance Metrics</Text>

//         <View style={styles.graphCard}>
//           {reportData.feedbackSummary.map((item, index) => (
//             <View key={item.key} style={styles.barRow}>
//               <View style={styles.barTop}>
//                 <Text style={styles.barLabel}>{item.label}</Text>
//                 <Text style={[styles.barValue, { color: item.color }]}>{item.value}%</Text>
//               </View>

//               <View style={styles.track}>
//                 <MotiView
//                   from={{ width: "0%" }}
//                   animate={{ width: `${item.value}%` }}
//                   transition={{ type: "timing", duration: 1000, delay: index * 150 }}
//                   style={[styles.fill, { backgroundColor: item.color }]}
//                 />
//               </View>
//             </View>
//           ))}
//         </View>

//         {patientFeedbacks.length === 0 && !loading && (
//           <MotiView 
//             from={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             style={styles.emptyCard}
//           >
//             <View style={styles.emptyIconBox}>
//                 <Ionicons name="analytics-outline" size={30} color={COLORS.muted} />
//             </View>
//             <Text style={styles.emptyTitle}>Awaiting Data</Text>
//             <Text style={styles.emptySub}>
//               Reports will generate automatically as patients complete their visits and leave feedback.
//             </Text>
//           </MotiView>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
//   container: { flex: 1, paddingHorizontal: 20 },
//   header: { marginTop: 60, marginBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   title: { fontSize: 26, fontWeight: "900", color: "#0F172A", letterSpacing: -0.8 },
//   sub: { color: "#64748B", fontWeight: "700", fontSize: 13, marginTop: 2 },
//   headerIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", elevation: 2 },
//   scoreCard: { borderRadius: 32, padding: 26, marginBottom: 28, overflow: "hidden", elevation: 8 },
//   scoreInfo: { zIndex: 2 },
//   scoreLabel: { color: "rgba(255,255,255,0.7)", fontWeight: "900", fontSize: 10, letterSpacing: 1.5 },
//   score: { color: "#fff", fontSize: 56, fontWeight: "900", marginTop: 4 },
//   scoreMax: { fontSize: 22, color: "rgba(255,255,255,0.4)" },
//   ratingStars: { flexDirection: "row", marginTop: 8, gap: 5 },
//   feedbackCount: { marginTop: 15, color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" },
//   bgIcon: { position: "absolute", right: -15, bottom: -15 },
//   sectionTitle: { fontSize: 19, fontWeight: "900", color: "#0F172A", marginBottom: 16 },
//   graphCard: { backgroundColor: "#fff", borderRadius: 28, padding: 24, elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 15 },
//   barRow: { marginBottom: 22 },
//   barTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   barLabel: { color: "#334155", fontWeight: "800", fontSize: 13 },
//   barValue: { fontWeight: "900", fontSize: 13 },
//   track: { height: 10, backgroundColor: "#F1F5F9", borderRadius: 10, overflow: "hidden" },
//   fill: { height: "100%", borderRadius: 10 },
//   emptyCard: { backgroundColor: "#fff", borderRadius: 24, padding: 30, alignItems: "center", borderWidth: 1, borderColor: "#F1F5F9" },
//   emptyIconBox: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
//   emptyTitle: { color: "#0F172A", fontSize: 18, fontWeight: "900" },
//   emptySub: { marginTop: 8, color: "#64748B", textAlign: "center", fontSize: 13, fontWeight: "600", lineHeight: 20 },
// });  









































import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import { useFeedback } from "../../context/FeedbackContext";
 
const STAFF_COLOR = COLORS?.staff || "#059669";
 
const FEEDBACK_CONFIG = [
  { key: "patientSatisfaction", label: "Patient Satisfaction", color: "#10B981" },
  { key: "queueExperience", label: "Queue Experience", color: "#3B82F6" },
  { key: "doctorResponse", label: "Doctor Response", color: "#8B5CF6" },
  { key: "staffBehaviour", label: "Staff Behaviour", color: "#F59E0B" },
  { key: "cleanliness", label: "Cleanliness", color: "#EC4899" },
];
 
export default function StaffReportsScreen() {
  const { patientFeedbacks, refreshFeedbacks, loading } = useFeedback();
  const [refreshing, setRefreshing] = useState(false);
 
  // Reload feedbacks every time the Reports tab comes into focus
  // This ensures new patient feedback is visible immediately after submission
  useFocusEffect(
    useCallback(() => {
      refreshFeedbacks();
    }, [refreshFeedbacks])
  );
 
  // Handle pull-to-refresh for latest MySQL data
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshFeedbacks();
    setRefreshing(false);
  };
 
  const reportData = useMemo(() => {
    const totalFeedbacks = patientFeedbacks.length;
 
    if (totalFeedbacks === 0) {
      return {
        overallRating: "0.0",
        feedbackSummary: FEEDBACK_CONFIG.map((item) => ({ ...item, value: 0 })),
      };
    }
 
    let totalRatingSum = 0;
    let totalMetricsCount = 0;
 
    const feedbackSummary = FEEDBACK_CONFIG.map((item) => {
      const sum = patientFeedbacks.reduce((acc, f) => acc + (f.ratings?.[item.key] || 0), 0);
      const averageOutOfFive = sum / totalFeedbacks;
      
      totalRatingSum += sum;
      totalMetricsCount += totalFeedbacks;
 
      return {
        ...item,
        value: Math.round((averageOutOfFive / 5) * 100),
      };
    });
 
    const overallRating = (totalRatingSum / totalMetricsCount).toFixed(1);
 
    return { overallRating, feedbackSummary };
  }, [patientFeedbacks]);
 
  const roundedOverall = Number(reportData.overallRating || 0);
 
  return (
    <View style={styles.mainWrapper}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={STAFF_COLOR} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Hospital Insights</Text>
            <Text style={styles.sub}>Live Patient Analytics</Text>
          </View>
          <View style={styles.headerIcon}>
             <Ionicons name="stats-chart" size={20} color={STAFF_COLOR} />
          </View>
        </View>
 
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <LinearGradient
            colors={[STAFF_COLOR, "#065F46"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.scoreCard}
          >
            <View style={styles.scoreInfo}>
              <Text style={styles.scoreLabel}>COMMUNITY TRUST SCORE</Text>
 
              <MotiText
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                style={styles.score}
              >
                {reportData.overallRating} <Text style={styles.scoreMax}>/ 5</Text>
              </MotiText>
 
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={roundedOverall >= star ? "star" : roundedOverall >= star - 0.5 ? "star-half" : "star-outline"}
                    size={18}
                    color="#FDE047"
                  />
                ))}
              </View>
 
              <Text style={styles.feedbackCount}>
                Based on {patientFeedbacks.length} verified patient reviews
              </Text>
            </View>
 
            <Ionicons name="shield-checkmark" size={100} color="rgba(255,255,255,0.1)" style={styles.bgIcon} />
          </LinearGradient>
        </MotiView>
 
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
 
        <View style={styles.graphCard}>
          {reportData.feedbackSummary.map((item, index) => (
            <View key={item.key} style={styles.barRow}>
              <View style={styles.barTop}>
                <Text style={styles.barLabel}>{item.label}</Text>
                <Text style={[styles.barValue, { color: item.color }]}>{item.value}%</Text>
              </View>
 
              <View style={styles.track}>
                <MotiView
                  from={{ width: "0%" }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ type: "timing", duration: 1000, delay: index * 150 }}
                  style={[styles.fill, { backgroundColor: item.color }]}
                />
              </View>
            </View>
          ))}
        </View>
 
        {patientFeedbacks.length === 0 && !loading && (
          <MotiView 
            from={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={styles.emptyCard}
          >
            <View style={styles.emptyIconBox}>
                <Ionicons name="analytics-outline" size={30} color={COLORS.muted} />
            </View>
            <Text style={styles.emptyTitle}>Awaiting Data</Text>
            <Text style={styles.emptySub}>
              Reports will generate automatically as patients complete their visits and leave feedback.
            </Text>
          </MotiView>
        )}
 
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  container: { flex: 1, paddingHorizontal: 20 },
  header: { marginTop: 60, marginBottom: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "900", color: "#0F172A", letterSpacing: -0.8 },
  sub: { color: "#64748B", fontWeight: "700", fontSize: 13, marginTop: 2 },
  headerIcon: { width: 46, height: 46, borderRadius: 16, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", elevation: 2 },
  scoreCard: { borderRadius: 32, padding: 26, marginBottom: 28, overflow: "hidden", elevation: 8 },
  scoreInfo: { zIndex: 2 },
  scoreLabel: { color: "rgba(255,255,255,0.7)", fontWeight: "900", fontSize: 10, letterSpacing: 1.5 },
  score: { color: "#fff", fontSize: 56, fontWeight: "900", marginTop: 4 },
  scoreMax: { fontSize: 22, color: "rgba(255,255,255,0.4)" },
  ratingStars: { flexDirection: "row", marginTop: 8, gap: 5 },
  feedbackCount: { marginTop: 15, color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" },
  bgIcon: { position: "absolute", right: -15, bottom: -15 },
  sectionTitle: { fontSize: 19, fontWeight: "900", color: "#0F172A", marginBottom: 16 },
  graphCard: { backgroundColor: "#fff", borderRadius: 28, padding: 24, elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 15 },
  barRow: { marginBottom: 22 },
  barTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  barLabel: { color: "#334155", fontWeight: "800", fontSize: 13 },
  barValue: { fontWeight: "900", fontSize: 13 },
  track: { height: 10, backgroundColor: "#F1F5F9", borderRadius: 10, overflow: "hidden" },
  fill: { height: "100%", borderRadius: 10 },
  emptyCard: { backgroundColor: "#fff", borderRadius: 24, padding: 30, alignItems: "center", borderWidth: 1, borderColor: "#F1F5F9" },
  emptyIconBox: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  emptyTitle: { color: "#0F172A", fontSize: 18, fontWeight: "900" },
  emptySub: { marginTop: 8, color: "#64748B", textAlign: "center", fontSize: 13, fontWeight: "600", lineHeight: 20 },
});