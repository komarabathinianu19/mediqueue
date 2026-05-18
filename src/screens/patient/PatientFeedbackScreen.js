



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useFeedback } from "../../context/FeedbackContext";

// const BLUE_PRIMARY = "#2563EB";
// const BLUE_DARK    = "#1D4ED8";
// const BLUE_LIGHT   = "#EFF6FF";

// const QUESTIONS = [
//   { key: "patientSatisfaction", label: "Patient Satisfaction", icon: "happy-outline" },
//   { key: "queueExperience",     label: "Queue Experience",     icon: "time-outline" },
//   { key: "doctorResponse",      label: "Doctor Response",      icon: "medkit-outline" },
//   { key: "staffBehaviour",      label: "Staff Behaviour",      icon: "people-outline" },
//   { key: "cleanliness",         label: "Cleanliness",          icon: "sparkles-outline" },
// ];

// const INIT_RATINGS = {
//   patientSatisfaction: 0,
//   queueExperience: 0,
//   doctorResponse: 0,
//   staffBehaviour: 0,
//   cleanliness: 0,
// };

// export default function PatientFeedbackScreen({ navigation, route }) {
//   const { submitFeedback } = useFeedback();

//   const {
//     tokenId,
//     patientName,
//     patientPhone,
//     hospitalId,
//     hospitalName,
//     department,
//     doctor,
//     tokenNo,
//   } = route?.params || {};

//   const [ratings, setRatings]           = useState({ ...INIT_RATINGS });
//   const [submitting, setSubmitting]     = useState(false);
//   const [successPopup, setSuccessPopup] = useState(false);
//   const [finalOverall, setFinalOverall] = useState("0.0");

//   const updateRating = (key, value) =>
//     setRatings((prev) => ({ ...prev, [key]: value }));

//   const calcOverall = (r = ratings) => {
//     const vals = Object.values(r).filter((v) => v > 0);
//     if (!vals.length) return "0.0";
//     return (vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(1);
//   };

//   const handleSubmit = async () => {
//     const incomplete = QUESTIONS.some((q) => ratings[q.key] === 0);
//     if (incomplete) {
//       Alert.alert("Incomplete", "Please rate all 5 categories before submitting.");
//       return;
//     }
//     if (!hospitalId) {
//       Alert.alert("Error", "Hospital info missing. Please try again from Visits tab.");
//       return;
//     }

//     const overall = calcOverall();
//     setSubmitting(true);

//     // submitFeedback via context → saves to backend AND optimistically updates
//     // patientFeedbacks state so StaffReportsScreen reflects instantly
//     const result = await submitFeedback({
//       hospitalId,
//       patientName:   patientName  || "Patient",
//       patientPhone:  patientPhone || "",
//       ratings,
//       overallRating: parseFloat(overall),
//       submittedAt:   new Date().toISOString(),
//     });

//     setSubmitting(false);

//     if (result?.success === false) {
//       Alert.alert("Submission Failed", result.error || "Could not submit feedback. Please try again.");
//       return;
//     }

//     setFinalOverall(overall);
//     setSuccessPopup(true);
//   };

//   const handleDone = () => {
//     setSuccessPopup(false);
//     setRatings({ ...INIT_RATINGS });
//     // Navigate back to the Visits tab with the tokenId so it can remove the visit
//     navigation.navigate("PatientTabs", {
//       screen: "Visits",
//       params: { feedbackSubmittedForId: tokenId },
//     });
//   };

//   const overall = calcOverall();

//   return (
//     <View style={styles.wrapper}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 50 }}
//       >
//         {/* Header */}
//         <LinearGradient
//           colors={[BLUE_PRIMARY, BLUE_DARK]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             style={styles.backBtn}
//             onPress={() => navigation?.goBack?.()}
//             activeOpacity={0.8}
//           >
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.headerTitle}>Rate Your Visit</Text>
//             <Text style={styles.headerSub}>
//               {hospitalName
//                 ? `${hospitalName}${department ? "  •  " + department : ""}`
//                 : "Hospital feedback"}
//             </Text>
//           </View>
//           <View style={styles.headerIcon}>
//             <Ionicons name="star-outline" size={22} color="#fff" />
//           </View>
//         </LinearGradient>

//         {/* Token pill */}
//         {tokenNo ? (
//           <View style={styles.tokenPill}>
//             <Ionicons name="ticket-outline" size={15} color={BLUE_PRIMARY} />
//             <Text style={styles.tokenPillText}>
//               Token {tokenNo}{doctor ? `  ·  Dr. ${doctor}` : ""}
//             </Text>
//           </View>
//         ) : null}

//         {/* Live overall score card */}
//         <View style={styles.overallCard}>
//           <Text style={styles.overallLabel}>YOUR OVERALL RATING</Text>
//           <Text style={styles.overallScore}>
//             {overall}
//             <Text style={styles.overallMax}> / 5</Text>
//           </Text>
//           <View style={styles.starsRow}>
//             {[1, 2, 3, 4, 5].map((s) => {
//               const n = Number(overall);
//               return (
//                 <Ionicons
//                   key={s}
//                   name={n >= s ? "star" : n >= s - 0.5 ? "star-half" : "star-outline"}
//                   size={22}
//                   color="#F59E0B"
//                 />
//               );
//             })}
//           </View>
//         </View>

//         <Text style={styles.sectionLabel}>Feedback Questions</Text>

//         {/* Question cards */}
//         {QUESTIONS.map((q) => (
//           <View key={q.key} style={styles.qCard}>
//             <View style={styles.qTop}>
//               <View style={styles.qIcon}>
//                 <Ionicons name={q.icon} size={21} color={BLUE_PRIMARY} />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.qLabel}>{q.label}</Text>
//                 <Text style={styles.qHint}>Tap to rate 1 – 5 stars</Text>
//               </View>
//               {ratings[q.key] > 0 && (
//                 <View style={styles.qBadge}>
//                   <Text style={styles.qBadgeText}>{ratings[q.key]}/5</Text>
//                 </View>
//               )}
//             </View>
//             <View style={styles.starRow}>
//               {[1, 2, 3, 4, 5].map((v) => (
//                 <TouchableOpacity
//                   key={v}
//                   onPress={() => updateRating(q.key, v)}
//                   activeOpacity={0.7}
//                   style={styles.starBtn}
//                 >
//                   <Ionicons
//                     name={ratings[q.key] >= v ? "star" : "star-outline"}
//                     size={34}
//                     color={ratings[q.key] >= v ? "#F59E0B" : "#CBD5E1"}
//                   />
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         ))}

//         {/* Submit button */}
//         <TouchableOpacity
//           onPress={handleSubmit}
//           disabled={submitting}
//           activeOpacity={0.9}
//           style={styles.submitWrap}
//         >
//           <LinearGradient
//             colors={submitting ? ["#93C5FD", "#93C5FD"] : [BLUE_PRIMARY, BLUE_DARK]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.submitBtn}
//           >
//             {submitting ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Ionicons name="send-outline" size={20} color="#fff" />
//             )}
//             <Text style={styles.submitText}>
//               {submitting ? "Submitting…" : "Submit Feedback"}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* SUCCESS POPUP */}
//       <Modal
//         visible={successPopup}
//         transparent
//         animationType="fade"
//         statusBarTranslucent
//         onRequestClose={handleDone}
//       >
//         <View style={styles.overlay}>
//           <View style={styles.popup}>
//             <View style={styles.checkCircle}>
//               <Ionicons name="checkmark" size={36} color="#fff" />
//             </View>
//             <Text style={styles.popupTitle}>Feedback Submitted!</Text>
//             <Text style={styles.popupMsg}>
//               Thank you for sharing your experience.
//             </Text>
//             <Pressable style={styles.doneBtn} onPress={handleDone}>
//               <Text style={styles.doneBtnText}>Done</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: { flex: 1, backgroundColor: "#F8FAFC" },

//   header: {
//     paddingTop: 56, paddingBottom: 24,
//     paddingHorizontal: 20,
//     flexDirection: "row", alignItems: "center", gap: 14,
//   },
//   backBtn: {
//     width: 40, height: 40, borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.2)",
//     alignItems: "center", justifyContent: "center",
//   },
//   headerTitle: { fontSize: 22, fontWeight: "900", color: "#fff" },
//   headerSub:   { color: "rgba(255,255,255,0.8)", fontWeight: "700", fontSize: 12, marginTop: 2 },
//   headerIcon: {
//     width: 44, height: 44, borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center", justifyContent: "center",
//   },

//   tokenPill: {
//     flexDirection: "row", alignItems: "center", gap: 7,
//     backgroundColor: BLUE_LIGHT, borderRadius: 12,
//     paddingHorizontal: 14, paddingVertical: 9,
//     marginHorizontal: 20, marginTop: 16,
//     borderWidth: 1, borderColor: "#BFDBFE",
//   },
//   tokenPillText: { color: BLUE_PRIMARY, fontWeight: "800", fontSize: 13 },

//   overallCard: {
//     backgroundColor: "#fff", borderRadius: 24,
//     padding: 22, marginHorizontal: 20, marginTop: 14,
//     alignItems: "center", elevation: 3,
//     borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   overallLabel: { color: "#94A3B8", fontWeight: "900", fontSize: 11, letterSpacing: 1 },
//   overallScore: { fontSize: 48, fontWeight: "900", color: "#0F172A", marginTop: 4 },
//   overallMax:   { fontSize: 22, color: "#94A3B8" },
//   starsRow: { flexDirection: "row", gap: 4, marginTop: 8 },

//   sectionLabel: {
//     fontSize: 16, fontWeight: "900", color: "#0F172A",
//     marginTop: 24, marginBottom: 10, marginHorizontal: 20,
//   },

//   qCard: {
//     backgroundColor: "#fff", borderRadius: 20,
//     padding: 16, marginHorizontal: 20, marginBottom: 14,
//     elevation: 2, borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   qTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
//   qIcon: {
//     width: 44, height: 44, borderRadius: 14,
//     backgroundColor: BLUE_LIGHT,
//     alignItems: "center", justifyContent: "center",
//   },
//   qLabel: { color: "#0F172A", fontWeight: "900", fontSize: 15 },
//   qHint:  { color: "#94A3B8", fontSize: 12, fontWeight: "600", marginTop: 2 },
//   qBadge: {
//     backgroundColor: "#DCFCE7", borderRadius: 10,
//     paddingHorizontal: 8, paddingVertical: 4,
//   },
//   qBadgeText: { color: "#15803D", fontWeight: "900", fontSize: 12 },
//   starRow: { flexDirection: "row", justifyContent: "space-around" },
//   starBtn: { padding: 4 },

//   submitWrap: { marginHorizontal: 20, marginTop: 24 },
//   submitBtn: {
//     borderRadius: 20, paddingVertical: 18,
//     flexDirection: "row", alignItems: "center",
//     justifyContent: "center", gap: 10, elevation: 4,
//   },
//   submitText: { color: "#fff", fontSize: 16, fontWeight: "900" },

//   // Modal
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 32,
//   },
//   popup: {
//     backgroundColor: "#fff",
//     borderRadius: 24,
//     padding: 32,
//     alignItems: "center",
//     width: "100%",
//     elevation: 10,
//   },
//   checkCircle: {
//     width: 72,
//     height: 72,
//     borderRadius: 36,
//     backgroundColor: "#10B981",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },
//   popupTitle: {
//     fontSize: 20,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginBottom: 8,
//   },
//   popupMsg: {
//     color: "#64748B",
//     fontSize: 14,
//     fontWeight: "600",
//     textAlign: "center",
//     marginBottom: 24,
//   },
//   doneBtn: {
//     backgroundColor: BLUE_PRIMARY,
//     borderRadius: 16,
//     paddingVertical: 14,
//     paddingHorizontal: 48,
//   },
//   doneBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
// });  


































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const PATIENT_COLOR = COLORS?.patient || COLORS?.primary || "#E83E7C";

// const QUESTIONS = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     icon: "happy-outline",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     icon: "time-outline",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     icon: "medkit-outline",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     icon: "people-outline",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     icon: "sparkles-outline",
//   },
// ];

// export default function PatientFeedbackScreen({ navigation }) {
//   const { submitFeedback } = useFeedback();

//   const [ratings, setRatings] = useState({
//     patientSatisfaction: 0,
//     queueExperience: 0,
//     doctorResponse: 0,
//     staffBehaviour: 0,
//     cleanliness: 0,
//   });

//   const updateRating = (key, value) => {
//     setRatings((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const overallRating = () => {
//     const values = Object.values(ratings);
//     const answered = values.filter((value) => value > 0);

//     if (answered.length === 0) return "0.0";

//     const total = answered.reduce((sum, value) => sum + value, 0);
//     return (total / answered.length).toFixed(1);
//   };

//   const handleSubmit = () => {
//     const notAnswered = QUESTIONS.some((q) => ratings[q.key] === 0);

//     if (notAnswered) {
//       Alert.alert("Incomplete Feedback", "Please answer all feedback questions.");
//       return;
//     }

//     submitFeedback({
//       ratings,
//     });

//     Alert.alert("Thank You", "Your feedback has been submitted successfully.", [
//       {
//         text: "OK",
//         onPress: () => {
//           if (navigation?.goBack) {
//             navigation.goBack();
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         <LinearGradient
//           colors={[PATIENT_COLOR, "#BE185D"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.backBtn}
//             onPress={() => navigation?.goBack?.()}
//           >
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>

//           <View style={{ flex: 1 }}>
//             <Text style={styles.title}>Patient Feedback</Text>
//             <Text style={styles.sub}>
//               Please rate your hospital visit experience
//             </Text>
//           </View>

//           <View style={styles.headerIcon}>
//             <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
//           </View>
//         </LinearGradient>

//         <View style={styles.overallCard}>
//           <Text style={styles.overallLabel}>Your Overall Rating</Text>

//           <Text style={styles.overallValue}>
//             {overallRating()} <Text style={styles.overallMax}>/ 5</Text>
//           </Text>

//           <View style={styles.overallStars}>
//             {[1, 2, 3, 4, 5].map((star) => {
//               const current = Number(overallRating());
//               let iconName = "star-outline";

//               if (current >= star) {
//                 iconName = "star";
//               } else if (current >= star - 0.5) {
//                 iconName = "star-half";
//               }

//               return (
//                 <Ionicons
//                   key={star}
//                   name={iconName}
//                   size={20}
//                   color="#F59E0B"
//                 />
//               );
//             })}
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Feedback Questions</Text>

//         {QUESTIONS.map((question) => (
//           <View key={question.key} style={styles.questionCard}>
//             <View style={styles.questionTop}>
//               <View style={styles.questionIcon}>
//                 <Ionicons name={question.icon} size={22} color={PATIENT_COLOR} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.questionLabel}>{question.label}</Text>
//                 <Text style={styles.questionHint}>Rate from 1 to 5 stars</Text>
//               </View>
//             </View>

//             <View style={styles.starRow}>
//               {[1, 2, 3, 4, 5].map((value) => {
//                 const active = ratings[question.key] >= value;

//                 return (
//                   <TouchableOpacity
//                     key={value}
//                     activeOpacity={0.8}
//                     onPress={() => updateRating(question.key, value)}
//                     style={styles.starBtn}
//                   >
//                     <Ionicons
//                       name={active ? "star" : "star-outline"}
//                       size={32}
//                       color={active ? "#F59E0B" : "#CBD5E1"}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         ))}

//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={handleSubmit}
//           style={styles.submitBtnWrapper}
//         >
//           <LinearGradient
//             colors={[PATIENT_COLOR, "#BE185D"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.submitBtn}
//           >
//             <Ionicons name="send-outline" size={20} color="#fff" />
//             <Text style={styles.submitText}>Submit Feedback</Text>
//           </LinearGradient>
//         </TouchableOpacity>
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
//   },

//   header: {
//     paddingTop: 55,
//     paddingHorizontal: 20,
//     paddingBottom: 28,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },

//   backBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "900",
//   },

//   sub: {
//     color: "rgba(255,255,255,0.82)",
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 4,
//     lineHeight: 18,
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   overallCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginTop: 22,
//     borderRadius: 26,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     elevation: 2,
//     alignItems: "center",
//   },

//   overallLabel: {
//     color: "#64748B",
//     fontSize: 12,
//     fontWeight: "900",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },

//   overallValue: {
//     color: "#0F172A",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   overallMax: {
//     color: "#94A3B8",
//     fontSize: 18,
//   },

//   overallStars: {
//     flexDirection: "row",
//     gap: 5,
//     marginTop: 8,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginHorizontal: 20,
//     marginTop: 24,
//     marginBottom: 14,
//   },

//   questionCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginBottom: 14,
//     borderRadius: 24,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     elevation: 2,
//   },

//   questionTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//     marginBottom: 14,
//   },

//   questionIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: "#FDF2F8",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   questionLabel: {
//     color: "#1E293B",
//     fontSize: 16,
//     fontWeight: "900",
//   },

//   questionHint: {
//     color: "#64748B",
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 3,
//   },

//   starRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#F8FAFC",
//     borderRadius: 18,
//     padding: 10,
//   },

//   starBtn: {
//     padding: 4,
//   },

//   submitBtnWrapper: {
//     marginHorizontal: 20,
//     marginTop: 24,
//   },

//   submitBtn: {
//     height: 58,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 10,
//     elevation: 4,
//   },

//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });  


























// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const BLUE_PRIMARY = "#2563EB";
// const BLUE_DARK = "#1D4ED8";
// const BLUE_LIGHT = "#EFF6FF";

// const QUESTIONS = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     icon: "happy-outline",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     icon: "time-outline",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     icon: "medkit-outline",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     icon: "people-outline",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     icon: "sparkles-outline",
//   },
// ];

// export default function PatientFeedbackScreen({ navigation }) {
//   const { submitFeedback } = useFeedback();

//   const [successPopup, setSuccessPopup] = useState(false);

//   const [ratings, setRatings] = useState({
//     patientSatisfaction: 0,
//     queueExperience: 0,
//     doctorResponse: 0,
//     staffBehaviour: 0,
//     cleanliness: 0,
//   });

//   const updateRating = (key, value) => {
//     setRatings((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const overallRating = () => {
//     const values = Object.values(ratings);
//     const answered = values.filter((value) => value > 0);

//     if (answered.length === 0) return "0.0";

//     const total = answered.reduce((sum, value) => sum + value, 0);
//     return (total / answered.length).toFixed(1);
//   };

//   const handleSubmit = () => {
//     const notAnswered = QUESTIONS.some((q) => ratings[q.key] === 0);

//     if (notAnswered) {
//       Alert.alert("Incomplete Feedback", "Please answer all feedback questions.");
//       return;
//     }

//     submitFeedback({
//       ratings,
//       overallRating: overallRating(),
//       submittedAt: new Date().toISOString(),
//     });

//     setSuccessPopup(true);
//   };

//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);

//     setRatings({
//       patientSatisfaction: 0,
//       queueExperience: 0,
//       doctorResponse: 0,
//       staffBehaviour: 0,
//       cleanliness: 0,
//     });

//     if (navigation?.goBack) {
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         <LinearGradient
//           colors={[BLUE_PRIMARY, BLUE_DARK]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.backBtn}
//             onPress={() => navigation?.goBack?.()}
//           >
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>

//           <View style={{ flex: 1 }}>
//             <Text style={styles.title}>Patient Feedback</Text>
//             <Text style={styles.sub}>
//               Please rate your hospital visit experience
//             </Text>
//           </View>

//           <View style={styles.headerIcon}>
//             <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
//           </View>
//         </LinearGradient>

//         <View style={styles.overallCard}>
//           <Text style={styles.overallLabel}>Your Overall Rating</Text>

//           <Text style={styles.overallValue}>
//             {overallRating()} <Text style={styles.overallMax}>/ 5</Text>
//           </Text>

//           <View style={styles.overallStars}>
//             {[1, 2, 3, 4, 5].map((star) => {
//               const current = Number(overallRating());
//               let iconName = "star-outline";

//               if (current >= star) {
//                 iconName = "star";
//               } else if (current >= star - 0.5) {
//                 iconName = "star-half";
//               }

//               return (
//                 <Ionicons
//                   key={star}
//                   name={iconName}
//                   size={20}
//                   color="#F59E0B"
//                 />
//               );
//             })}
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Feedback Questions</Text>

//         {QUESTIONS.map((question) => (
//           <View key={question.key} style={styles.questionCard}>
//             <View style={styles.questionTop}>
//               <View style={styles.questionIcon}>
//                 <Ionicons name={question.icon} size={22} color={BLUE_PRIMARY} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.questionLabel}>{question.label}</Text>
//                 <Text style={styles.questionHint}>Rate from 1 to 5 stars</Text>
//               </View>
//             </View>

//             <View style={styles.starRow}>
//               {[1, 2, 3, 4, 5].map((value) => {
//                 const active = ratings[question.key] >= value;

//                 return (
//                   <TouchableOpacity
//                     key={value}
//                     activeOpacity={0.8}
//                     onPress={() => updateRating(question.key, value)}
//                     style={styles.starBtn}
//                   >
//                     <Ionicons
//                       name={active ? "star" : "star-outline"}
//                       size={32}
//                       color={active ? "#F59E0B" : "#CBD5E1"}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         ))}

//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={handleSubmit}
//           style={styles.submitBtnWrapper}
//         >
//           <LinearGradient
//             colors={[BLUE_PRIMARY, BLUE_DARK]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.submitBtn}
//           >
//             <Ionicons name="send-outline" size={20} color="#fff" />
//             <Text style={styles.submitText}>Submit Feedback</Text>
//           </LinearGradient>
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

//             <Text style={styles.successTitle}>Feedback Submitted</Text>

//             <Text style={styles.successMessage}>
//               Thank you! Your feedback has been submitted successfully.
//             </Text>

//             <View style={styles.ratingBadge}>
//               <Ionicons name="star" size={17} color="#F59E0B" />
//               <Text style={styles.ratingBadgeText}>
//                 Overall Rating: {overallRating()} / 5
//               </Text>
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

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },

//   container: {
//     flex: 1,
//   },

//   header: {
//     paddingTop: 55,
//     paddingHorizontal: 20,
//     paddingBottom: 28,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },

//   backBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "900",
//   },

//   sub: {
//     color: "rgba(255,255,255,0.82)",
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 4,
//     lineHeight: 18,
//   },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   overallCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginTop: 22,
//     borderRadius: 26,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: "#DBEAFE",
//     elevation: 2,
//     alignItems: "center",
//   },

//   overallLabel: {
//     color: "#64748B",
//     fontSize: 12,
//     fontWeight: "900",
//     textTransform: "uppercase",
//     letterSpacing: 1,
//   },

//   overallValue: {
//     color: "#0F172A",
//     fontSize: 46,
//     fontWeight: "900",
//     marginTop: 6,
//   },

//   overallMax: {
//     color: "#94A3B8",
//     fontSize: 18,
//   },

//   overallStars: {
//     flexDirection: "row",
//     gap: 5,
//     marginTop: 8,
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginHorizontal: 20,
//     marginTop: 24,
//     marginBottom: 14,
//   },

//   questionCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginBottom: 14,
//     borderRadius: 24,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#DBEAFE",
//     elevation: 2,
//   },

//   questionTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//     marginBottom: 14,
//   },

//   questionIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: BLUE_LIGHT,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   questionLabel: {
//     color: "#1E293B",
//     fontSize: 16,
//     fontWeight: "900",
//   },

//   questionHint: {
//     color: "#64748B",
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 3,
//   },

//   starRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#F8FAFC",
//     borderRadius: 18,
//     padding: 10,
//   },

//   starBtn: {
//     padding: 4,
//   },

//   submitBtnWrapper: {
//     marginHorizontal: 20,
//     marginTop: 24,
//   },

//   submitBtn: {
//     height: 58,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 10,
//     elevation: 4,
//   },

//   submitText: {
//     color: "#fff",
//     fontSize: 16,
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
//     borderColor: "#DBEAFE",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: BLUE_PRIMARY,
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

//   ratingBadge: {
//     marginTop: 18,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#FFFBEB",
//     borderWidth: 1,
//     borderColor: "#FDE68A",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },

//   ratingBadgeText: {
//     color: "#92400E",
//     fontSize: 13,
//     fontWeight: "900",
//   },

//   successButton: {
//     marginTop: 24,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: BLUE_PRIMARY,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });  




























// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Pressable,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const BLUE_PRIMARY = "#2563EB";
// const BLUE_DARK = "#1D4ED8";
// const BLUE_LIGHT = "#EFF6FF";

// const QUESTIONS = [
//   { key: "patientSatisfaction", label: "Patient Satisfaction", icon: "happy-outline" },
//   { key: "queueExperience",     label: "Queue Experience",     icon: "time-outline" },
//   { key: "doctorResponse",      label: "Doctor Response",      icon: "medkit-outline" },
//   { key: "staffBehaviour",      label: "Staff Behaviour",      icon: "people-outline" },
//   { key: "cleanliness",         label: "Cleanliness",          icon: "sparkles-outline" },
// ];

// export default function PatientFeedbackScreen({ navigation, route }) {
//   const { submitFeedback } = useFeedback();

//   // ── Params passed from VisitsScreen.openFeedback() ───────────────────────
//   const {
//     tokenId,
//     patientName,
//     patientPhone,
//     hospitalId,
//     hospitalName,
//     department,
//     doctor,
//     tokenNo,
//   } = route?.params || {};

//   const [successPopup, setSuccessPopup] = useState(false);
//   const [submitting, setSubmitting]     = useState(false);

//   const [ratings, setRatings] = useState({
//     patientSatisfaction: 0,
//     queueExperience: 0,
//     doctorResponse: 0,
//     staffBehaviour: 0,
//     cleanliness: 0,
//   });

//   const updateRating = (key, value) => {
//     setRatings((prev) => ({ ...prev, [key]: value }));
//   };

//   const overallRating = () => {
//     const values = Object.values(ratings);
//     const answered = values.filter((v) => v > 0);
//     if (answered.length === 0) return "0.0";
//     return (answered.reduce((s, v) => s + v, 0) / answered.length).toFixed(1);
//   };

//   const handleSubmit = async () => {
//     const notAnswered = QUESTIONS.some((q) => ratings[q.key] === 0);
//     if (notAnswered) {
//       Alert.alert("Incomplete Feedback", "Please answer all feedback questions.");
//       return;
//     }

//     if (!hospitalId) {
//       Alert.alert("Error", "Hospital information is missing. Please try again.");
//       return;
//     }

//     setSubmitting(true);
//     const result = await submitFeedback({
//       hospitalId,
//       patientName:  patientName  || "Patient",
//       patientPhone: patientPhone || "",
//       ratings,
//       overallRating: overallRating(),
//       submittedAt: new Date().toISOString(),
//     });
//     setSubmitting(false);

//     if (result?.success === false) {
//       Alert.alert("Submission Failed", result.error || "Could not submit feedback. Please try again.");
//       return;
//     }

//     setSuccessPopup(true);
//   };

//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     setRatings({
//       patientSatisfaction: 0,
//       queueExperience: 0,
//       doctorResponse: 0,
//       staffBehaviour: 0,
//       cleanliness: 0,
//     });
//     if (navigation?.goBack) navigation.goBack();
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         {/* ── Header ───────────────────────────────────────────────────────── */}
//         <LinearGradient
//           colors={[BLUE_PRIMARY, BLUE_DARK]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.backBtn}
//             onPress={() => navigation?.goBack?.()}
//           >
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>

//           <View style={{ flex: 1 }}>
//             <Text style={styles.title}>Patient Feedback</Text>
//             <Text style={styles.sub}>
//               {hospitalName
//                 ? `${hospitalName}${department ? " • " + department : ""}`
//                 : "Rate your hospital visit experience"}
//             </Text>
//           </View>

//           <View style={styles.headerIcon}>
//             <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
//           </View>
//         </LinearGradient>

//         {/* ── Visit info pill ───────────────────────────────────────────────── */}
//         {(tokenNo || doctor) ? (
//           <View style={styles.visitPill}>
//             <Ionicons name="ticket-outline" size={16} color={BLUE_PRIMARY} />
//             <Text style={styles.visitPillText}>
//               Token {tokenNo}{doctor ? `  •  Dr. ${doctor}` : ""}
//             </Text>
//           </View>
//         ) : null}

//         {/* ── Overall rating card ───────────────────────────────────────────── */}
//         <View style={styles.overallCard}>
//           <Text style={styles.overallLabel}>Your Overall Rating</Text>
//           <Text style={styles.overallValue}>
//             {overallRating()} <Text style={styles.overallMax}>/ 5</Text>
//           </Text>
//           <View style={styles.overallStars}>
//             {[1, 2, 3, 4, 5].map((star) => {
//               const current = Number(overallRating());
//               let iconName = "star-outline";
//               if (current >= star) iconName = "star";
//               else if (current >= star - 0.5) iconName = "star-half";
//               return <Ionicons key={star} name={iconName} size={20} color="#F59E0B" />;
//             })}
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Feedback Questions</Text>

//         {/* ── Question cards ─────────────────────────────────────────────────── */}
//         {QUESTIONS.map((question) => (
//           <View key={question.key} style={styles.questionCard}>
//             <View style={styles.questionTop}>
//               <View style={styles.questionIcon}>
//                 <Ionicons name={question.icon} size={22} color={BLUE_PRIMARY} />
//               </View>
//               <View style={{ flex: 1 }}>
//                 <Text style={styles.questionLabel}>{question.label}</Text>
//                 <Text style={styles.questionHint}>Rate from 1 to 5 stars</Text>
//               </View>
//             </View>
//             <View style={styles.starRow}>
//               {[1, 2, 3, 4, 5].map((value) => {
//                 const active = ratings[question.key] >= value;
//                 return (
//                   <TouchableOpacity
//                     key={value}
//                     activeOpacity={0.8}
//                     onPress={() => updateRating(question.key, value)}
//                     style={styles.starBtn}
//                   >
//                     <Ionicons
//                       name={active ? "star" : "star-outline"}
//                       size={32}
//                       color={active ? "#F59E0B" : "#CBD5E1"}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         ))}

//         {/* ── Submit button ─────────────────────────────────────────────────── */}
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={handleSubmit}
//           disabled={submitting}
//           style={styles.submitBtnWrapper}
//         >
//           <LinearGradient
//             colors={[BLUE_PRIMARY, BLUE_DARK]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.submitBtn}
//           >
//             {submitting ? (
//               <ActivityIndicator size="small" color="#fff" />
//             ) : (
//               <Ionicons name="send-outline" size={20} color="#fff" />
//             )}
//             <Text style={styles.submitText}>
//               {submitting ? "Submitting…" : "Submit Feedback"}
//             </Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* ── Success modal ─────────────────────────────────────────────────── */}
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
//             <Text style={styles.successTitle}>Feedback Submitted!</Text>
//             <Text style={styles.successMessage}>
//               Thank you! Your feedback has been shared with{" "}
//               {hospitalName || "the hospital"}.
//             </Text>
//             <View style={styles.ratingBadge}>
//               <Ionicons name="star" size={17} color="#F59E0B" />
//               <Text style={styles.ratingBadgeText}>
//                 Overall Rating: {overallRating()} / 5
//               </Text>
//             </View>
//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>Done</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: "#F8FAFC" },
//   container:   { flex: 1 },

//   header: {
//     paddingTop: 56,
//     paddingBottom: 24,
//     paddingHorizontal: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },
//   backBtn: {
//     width: 40, height: 40, borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center", justifyContent: "center",
//   },
//   headerIcon: {
//     width: 46, height: 46, borderRadius: 16,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center", justifyContent: "center",
//   },
//   title: { fontSize: 22, fontWeight: "900", color: "#fff" },
//   sub:   { color: "rgba(255,255,255,0.8)", fontWeight: "700", fontSize: 12, marginTop: 2 },

//   visitPill: {
//     flexDirection: "row", alignItems: "center", gap: 8,
//     backgroundColor: BLUE_LIGHT,
//     borderRadius: 12, padding: 10, marginHorizontal: 20, marginTop: 16,
//     borderWidth: 1, borderColor: "#BFDBFE",
//   },
//   visitPillText: { color: BLUE_PRIMARY, fontWeight: "800", fontSize: 13 },

//   overallCard: {
//     backgroundColor: "#fff", borderRadius: 24, padding: 20,
//     marginHorizontal: 20, marginTop: 16, alignItems: "center",
//     elevation: 3, borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   overallLabel: { color: "#64748B", fontWeight: "800", fontSize: 12, letterSpacing: 0.5 },
//   overallValue: { fontSize: 42, fontWeight: "900", color: "#0F172A", marginTop: 6 },
//   overallMax:   { fontSize: 20, color: "#94A3B8" },
//   overallStars: { flexDirection: "row", gap: 4, marginTop: 8 },

//   sectionTitle: {
//     fontSize: 16, fontWeight: "900", color: "#0F172A",
//     marginTop: 24, marginBottom: 12, marginHorizontal: 20,
//   },

//   questionCard: {
//     backgroundColor: "#fff", borderRadius: 20, padding: 16,
//     marginHorizontal: 20, marginBottom: 14,
//     elevation: 2, borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   questionTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
//   questionIcon: {
//     width: 44, height: 44, borderRadius: 14,
//     backgroundColor: BLUE_LIGHT,
//     alignItems: "center", justifyContent: "center",
//   },
//   questionLabel: { color: "#0F172A", fontWeight: "900", fontSize: 15 },
//   questionHint:  { color: "#94A3B8", fontSize: 12, fontWeight: "600", marginTop: 2 },
//   starRow:  { flexDirection: "row", justifyContent: "space-around" },
//   starBtn:  { padding: 4 },

//   submitBtnWrapper: { marginHorizontal: 20, marginTop: 24 },
//   submitBtn: {
//     borderRadius: 20, padding: 18,
//     flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10,
//     elevation: 4,
//   },
//   submitText: { color: "#fff", fontSize: 16, fontWeight: "900" },

//   // ── Modal ──────────────────────────────────────────────────────────────────
//   modalOverlay: {
//     flex: 1, backgroundColor: "rgba(0,0,0,0.55)",
//     justifyContent: "center", alignItems: "center", padding: 24,
//   },
//   successCard: {
//     backgroundColor: "#fff", borderRadius: 32, padding: 32,
//     alignItems: "center", width: "100%",
//   },
//   successIcon: {
//     width: 80, height: 80, borderRadius: 40,
//     backgroundColor: "#10B981",
//     alignItems: "center", justifyContent: "center", marginBottom: 16,
//   },
//   successTitle:   { fontSize: 22, fontWeight: "900", color: "#0F172A" },
//   successMessage: {
//     color: "#64748B", textAlign: "center", marginTop: 8,
//     fontSize: 14, fontWeight: "600", lineHeight: 20,
//   },
//   ratingBadge: {
//     flexDirection: "row", alignItems: "center", gap: 6,
//     backgroundColor: "#FEF9C3", borderRadius: 12,
//     paddingHorizontal: 14, paddingVertical: 8, marginTop: 16,
//   },
//   ratingBadgeText: { color: "#92400E", fontWeight: "900", fontSize: 14 },
//   successButton: {
//     marginTop: 20, backgroundColor: BLUE_PRIMARY,
//     borderRadius: 16, paddingVertical: 14, paddingHorizontal: 40,
//   },
//   successButtonText: { color: "#fff", fontWeight: "900", fontSize: 16 },
// });  












































































































import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFeedback } from "../../context/FeedbackContext";

const BLUE_PRIMARY = "#2563EB";
const BLUE_DARK    = "#1D4ED8";
const BLUE_LIGHT   = "#EFF6FF";

const QUESTIONS = [
  { key: "patientSatisfaction", label: "Patient Satisfaction", icon: "happy-outline" },
  { key: "queueExperience",     label: "Queue Experience",     icon: "time-outline" },
  { key: "doctorResponse",      label: "Doctor Response",      icon: "medkit-outline" },
  { key: "staffBehaviour",      label: "Staff Behaviour",      icon: "people-outline" },
  { key: "cleanliness",         label: "Cleanliness",          icon: "sparkles-outline" },
];

const INIT_RATINGS = {
  patientSatisfaction: 0,
  queueExperience: 0,
  doctorResponse: 0,
  staffBehaviour: 0,
  cleanliness: 0,
};

export default function PatientFeedbackScreen({ navigation, route }) {
  const { submitFeedback } = useFeedback();

  const {
    tokenId,
    patientName,
    patientPhone,
    hospitalId,
    hospitalName,
    department,
    doctor,
    tokenNo,
  } = route?.params || {};

  const [ratings, setRatings]           = useState({ ...INIT_RATINGS });
  const [submitting, setSubmitting]     = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [finalOverall, setFinalOverall] = useState("0.0");

  const updateRating = (key, value) =>
    setRatings((prev) => ({ ...prev, [key]: value }));

  const calcOverall = (r = ratings) => {
    const vals = Object.values(r).filter((v) => v > 0);
    if (!vals.length) return "0.0";
    return (vals.reduce((s, v) => s + v, 0) / vals.length).toFixed(1);
  };

  const handleSubmit = async () => {
    const incomplete = QUESTIONS.some((q) => ratings[q.key] === 0);
    if (incomplete) {
      Alert.alert("Incomplete", "Please rate all 5 categories before submitting.");
      return;
    }
    if (!hospitalId) {
      Alert.alert("Error", "Hospital info missing. Please try again from Visits tab.");
      return;
    }

    const overall = calcOverall();
    setSubmitting(true);

    // submitFeedback via context → saves to backend AND optimistically updates
    // patientFeedbacks state so StaffReportsScreen reflects instantly
    const result = await submitFeedback({
      tokenId:       tokenId ? Number(tokenId) : null,
      hospitalId,
      patientName:   patientName  || "Patient",
      patientPhone:  patientPhone || "",
      ratings,
      overallRating: parseFloat(overall),
      submittedAt:   new Date().toISOString(),
    });

    setSubmitting(false);

    if (result?.success === false) {
      Alert.alert("Submission Failed", result.error || "Could not submit feedback. Please try again.");
      return;
    }

    setFinalOverall(overall);
    setSuccessPopup(true);
  };

  const handleDone = () => {
    setSuccessPopup(false);
    setRatings({ ...INIT_RATINGS });
    // Navigate back to the Visits tab with the tokenId so it can remove the visit
    navigation.navigate("PatientTabs", {
      screen: "Visits",
      params: { feedbackSubmittedForId: tokenId },
    });
  };

  const overall = calcOverall();

  return (
    <View style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Header */}
        <LinearGradient
          colors={[BLUE_PRIMARY, BLUE_DARK]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation?.goBack?.()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Rate Your Visit</Text>
            <Text style={styles.headerSub}>
              {hospitalName
                ? `${hospitalName}${department ? "  •  " + department : ""}`
                : "Hospital feedback"}
            </Text>
          </View>
          <View style={styles.headerIcon}>
            <Ionicons name="star-outline" size={22} color="#fff" />
          </View>
        </LinearGradient>

        {/* Token pill */}
        {tokenNo ? (
          <View style={styles.tokenPill}>
            <Ionicons name="ticket-outline" size={15} color={BLUE_PRIMARY} />
            <Text style={styles.tokenPillText}>
              Token {tokenNo}{doctor ? `  ·  Dr. ${doctor}` : ""}
            </Text>
          </View>
        ) : null}

        {/* Live overall score card */}
        <View style={styles.overallCard}>
          <Text style={styles.overallLabel}>YOUR OVERALL RATING</Text>
          <Text style={styles.overallScore}>
            {overall}
            <Text style={styles.overallMax}> / 5</Text>
          </Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => {
              const n = Number(overall);
              return (
                <Ionicons
                  key={s}
                  name={n >= s ? "star" : n >= s - 0.5 ? "star-half" : "star-outline"}
                  size={22}
                  color="#F59E0B"
                />
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionLabel}>Feedback Questions</Text>

        {/* Question cards */}
        {QUESTIONS.map((q) => (
          <View key={q.key} style={styles.qCard}>
            <View style={styles.qTop}>
              <View style={styles.qIcon}>
                <Ionicons name={q.icon} size={21} color={BLUE_PRIMARY} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.qLabel}>{q.label}</Text>
                <Text style={styles.qHint}>Tap to rate 1 – 5 stars</Text>
              </View>
              {ratings[q.key] > 0 && (
                <View style={styles.qBadge}>
                  <Text style={styles.qBadgeText}>{ratings[q.key]}/5</Text>
                </View>
              )}
            </View>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((v) => (
                <TouchableOpacity
                  key={v}
                  onPress={() => updateRating(q.key, v)}
                  activeOpacity={0.7}
                  style={styles.starBtn}
                >
                  <Ionicons
                    name={ratings[q.key] >= v ? "star" : "star-outline"}
                    size={34}
                    color={ratings[q.key] >= v ? "#F59E0B" : "#CBD5E1"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Submit button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          activeOpacity={0.9}
          style={styles.submitWrap}
        >
          <LinearGradient
            colors={submitting ? ["#93C5FD", "#93C5FD"] : [BLUE_PRIMARY, BLUE_DARK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitBtn}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="send-outline" size={20} color="#fff" />
            )}
            <Text style={styles.submitText}>
              {submitting ? "Submitting…" : "Submit Feedback"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* SUCCESS POPUP */}
      <Modal
        visible={successPopup}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleDone}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={36} color="#fff" />
            </View>
            <Text style={styles.popupTitle}>Feedback Submitted!</Text>
            <Text style={styles.popupMsg}>
              Thank you for sharing your experience.
            </Text>
            <Pressable style={styles.doneBtn} onPress={handleDone}>
              <Text style={styles.doneBtnText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    paddingTop: 56, paddingBottom: 24,
    paddingHorizontal: 20,
    flexDirection: "row", alignItems: "center", gap: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center", justifyContent: "center",
  },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#fff" },
  headerSub:   { color: "rgba(255,255,255,0.8)", fontWeight: "700", fontSize: 12, marginTop: 2 },
  headerIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center", justifyContent: "center",
  },

  tokenPill: {
    flexDirection: "row", alignItems: "center", gap: 7,
    backgroundColor: BLUE_LIGHT, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 9,
    marginHorizontal: 20, marginTop: 16,
    borderWidth: 1, borderColor: "#BFDBFE",
  },
  tokenPillText: { color: BLUE_PRIMARY, fontWeight: "800", fontSize: 13 },

  overallCard: {
    backgroundColor: "#fff", borderRadius: 24,
    padding: 22, marginHorizontal: 20, marginTop: 14,
    alignItems: "center", elevation: 3,
    borderWidth: 1, borderColor: "#E2E8F0",
  },
  overallLabel: { color: "#94A3B8", fontWeight: "900", fontSize: 11, letterSpacing: 1 },
  overallScore: { fontSize: 48, fontWeight: "900", color: "#0F172A", marginTop: 4 },
  overallMax:   { fontSize: 22, color: "#94A3B8" },
  starsRow: { flexDirection: "row", gap: 4, marginTop: 8 },

  sectionLabel: {
    fontSize: 16, fontWeight: "900", color: "#0F172A",
    marginTop: 24, marginBottom: 10, marginHorizontal: 20,
  },

  qCard: {
    backgroundColor: "#fff", borderRadius: 20,
    padding: 16, marginHorizontal: 20, marginBottom: 14,
    elevation: 2, borderWidth: 1, borderColor: "#E2E8F0",
  },
  qTop: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
  qIcon: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: BLUE_LIGHT,
    alignItems: "center", justifyContent: "center",
  },
  qLabel: { color: "#0F172A", fontWeight: "900", fontSize: 15 },
  qHint:  { color: "#94A3B8", fontSize: 12, fontWeight: "600", marginTop: 2 },
  qBadge: {
    backgroundColor: "#DCFCE7", borderRadius: 10,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  qBadgeText: { color: "#15803D", fontWeight: "900", fontSize: 12 },
  starRow: { flexDirection: "row", justifyContent: "space-around" },
  starBtn: { padding: 4 },

  submitWrap: { marginHorizontal: 20, marginTop: 24 },
  submitBtn: {
    borderRadius: 20, paddingVertical: 18,
    flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 10, elevation: 4,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    width: "100%",
    elevation: 10,
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 8,
  },
  popupMsg: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  doneBtn: {
    backgroundColor: BLUE_PRIMARY,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 48,
  },
  doneBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});