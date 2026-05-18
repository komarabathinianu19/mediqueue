










// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("UPI");

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee = appointment?.doctorFee || 500;
//   const totalAmount = doctorFee + platformFee;

//   const paymentId = useMemo(() => {
//     return `PAY-${Date.now()}`;
//   }, []);

//   const confirmPayment = () => {
//     if (!appointment) {
//       Alert.alert("Missing Appointment", "Please book an appointment again.");
//       navigation.goBack();
//       return;
//     }

//     const token = bookToken({
//       ...appointment,
//       doctorFee,
//       platformFee,
//       totalAmount,
//       paymentMethod: selectedMethod,
//       paymentStatus:
//         selectedMethod === "Pay at Hospital" ? "PAY_AT_HOSPITAL" : "SUCCESS",
//       paymentId:
//         selectedMethod === "Pay at Hospital"
//           ? `PAY-HOSPITAL-${Date.now()}`
//           : paymentId,
//       appointmentStatus: "CONFIRMED",
//     });

//     navigation.replace("TokenSuccess", { token });
//   };

//   const payNow = () => {
//     if (Platform.OS === "web") {
//       const ok = window.confirm(
//         `Pay ₹${totalAmount} using ${selectedMethod}?`
//       );

//       if (ok) {
//         confirmPayment();
//       }

//       return;
//     }

//     Alert.alert(
//       "Confirm Payment",
//       `Pay ₹${totalAmount} using ${selectedMethod}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Pay Now", onPress: confirmPayment },
//       ]
//     );
//   };

//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>
//           Please go back and book your token again.
//         </Text>

//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Review and confirm your appointment</Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.doctorCard}
//       >
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Appointment Details</Text>

//         <InfoRow
//           icon="calendar-outline"
//           label="Date"
//           value={appointment?.displayDate || appointment?.date}
//         />

//         <InfoRow
//           icon="time-outline"
//           label="Slot"
//           value={`${appointment?.slotLabel || appointment?.slot || "-"}${
//             appointment?.slotTime ? ` • ${appointment.slotTime}` : ""
//           }`}
//         />

//         <InfoRow
//           icon="person-outline"
//           label="Patient"
//           value={`${appointment?.patientName || "-"}, ${
//             appointment?.age || "-"
//           } yrs`}
//         />

//         <InfoRow
//           icon="document-text-outline"
//           label="Visit Type"
//           value={appointment?.visitType}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Payment Method</Text>

//         {["UPI", "Card", "Net Banking", "Pay at Hospital"].map((method) => (
//           <TouchableOpacity
//             key={method}
//             style={[
//               styles.methodRow,
//               selectedMethod === method && styles.activeMethodRow,
//             ]}
//             onPress={() => setSelectedMethod(method)}
//           >
//             <View style={styles.methodLeft}>
//               <Ionicons
//                 name={
//                   method === "UPI"
//                     ? "phone-portrait-outline"
//                     : method === "Card"
//                     ? "card-outline"
//                     : method === "Net Banking"
//                     ? "globe-outline"
//                     : "business-outline"
//                 }
//                 size={20}
//                 color={selectedMethod === method ? COLORS.primary : COLORS.muted}
//               />

//               <Text
//                 style={[
//                   styles.methodText,
//                   selectedMethod === method && styles.activeMethodText,
//                 ]}
//               >
//                 {method}
//               </Text>
//             </View>

//             {selectedMethod === method && (
//               <Ionicons
//                 name="checkmark-circle"
//                 size={22}
//                 color={COLORS.primary}
//               />
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Fee Summary</Text>

//         <AmountRow label="Doctor Fee" value={doctorFee} />
//         <AmountRow label="Platform Fee" value={platformFee} />

//         <View style={styles.divider} />

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total Payable</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       <View style={styles.noteCard}>
//         <Ionicons
//           name="information-circle-outline"
//           size={22}
//           color={COLORS.warning}
//         />

//         <Text style={styles.noteText}>
//           Token will be generated only after payment confirmation.
//         </Text>
//       </View>

//       <TouchableOpacity activeOpacity={0.9} onPress={payNow}>
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.payButton}
//         >
//           <Ionicons
//             name={
//               selectedMethod === "Pay at Hospital"
//                 ? "business-outline"
//                 : "lock-closed-outline"
//             }
//             size={20}
//             color="#fff"
//           />

//           <Text style={styles.payButtonText}>
//             {selectedMethod === "Pay at Hospital"
//               ? `Confirm & Pay at Hospital`
//               : `Pay ₹${totalAmount} & Confirm`}
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function AmountRow({ label, value }) {
//   return (
//     <View style={styles.amountRow}>
//       <Text style={styles.amountLabel}>{label}</Text>
//       <Text style={styles.amountValue}>₹{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   contentContainer: {
//     paddingHorizontal: 18,
//     paddingBottom: 20,
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
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   doctorCard: {
//     borderRadius: 28,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     marginBottom: 16,
//   },

//   iconCircle: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   doctorMeta: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   cardTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     gap: 12,
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "56%",
//     textAlign: "right",
//   },

//   methodRow: {
//     minHeight: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   activeMethodRow: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },

//   methodLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   methodText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },

//   activeMethodText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },

//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 9,
//   },

//   amountLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   amountValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   totalLabel: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   totalValue: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: "900",
//   },

//   noteCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },

//   noteText: {
//     flex: 1,
//     color: COLORS.warning,
//     fontWeight: "800",
//   },

//   payButton: {
//     minHeight: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//     paddingHorizontal: 16,
//   },

//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//     textAlign: "center",
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 14,
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },

//   emptyText: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontWeight: "700",
//     textAlign: "center",
//   },

//   emptyButton: {
//     marginTop: 22,
//     height: 52,
//     borderRadius: 16,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  
































// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("UPI");

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee = appointment?.doctorFee || 500;
//   const totalAmount = doctorFee + platformFee;

//   const paymentId = useMemo(() => {
//     return `PAY-${Date.now()}`;
//   }, []);

//   const confirmPayment = async () => {
//     if (!appointment) {
//       Alert.alert("Missing Appointment", "Please book an appointment again.");
//       navigation.goBack();
//       return;
//     }
//     try {
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod: selectedMethod,
//         paymentStatus:
//           selectedMethod === "Pay at Hospital" ? "PAY_AT_HOSPITAL" : "SUCCESS",
//         paymentId:
//           selectedMethod === "Pay at Hospital"
//             ? `PAY-HOSPITAL-${Date.now()}`
//             : paymentId,
//         appointmentStatus: "CONFIRMED",
//       });
//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Booking Failed", err.message || "Could not book token. Please try again.");
//     }
//   };

//   const payNow = () => {
//     if (Platform.OS === "web") {
//       const ok = window.confirm(
//         `Pay ₹${totalAmount} using ${selectedMethod}?`
//       );

//       if (ok) {
//         confirmPayment();
//       }

//       return;
//     }

//     Alert.alert(
//       "Confirm Payment",
//       `Pay ₹${totalAmount} using ${selectedMethod}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Pay Now", onPress: confirmPayment },
//       ]
//     );
//   };

//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>
//           Please go back and book your token again.
//         </Text>

//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Review and confirm your appointment</Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.doctorCard}
//       >
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Appointment Details</Text>

//         <InfoRow
//           icon="calendar-outline"
//           label="Date"
//           value={appointment?.displayDate || appointment?.date}
//         />

//         <InfoRow
//           icon="time-outline"
//           label="Slot"
//           value={`${appointment?.slotLabel || appointment?.slot || "-"}${
//             appointment?.slotTime ? ` • ${appointment.slotTime}` : ""
//           }`}
//         />

//         <InfoRow
//           icon="person-outline"
//           label="Patient"
//           value={`${appointment?.patientName || "-"}, ${
//             appointment?.age || "-"
//           } yrs`}
//         />

//         <InfoRow
//           icon="document-text-outline"
//           label="Visit Type"
//           value={appointment?.visitType}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Payment Method</Text>

//         {["UPI", "Card", "Net Banking", "Pay at Hospital"].map((method) => (
//           <TouchableOpacity
//             key={method}
//             style={[
//               styles.methodRow,
//               selectedMethod === method && styles.activeMethodRow,
//             ]}
//             onPress={() => setSelectedMethod(method)}
//           >
//             <View style={styles.methodLeft}>
//               <Ionicons
//                 name={
//                   method === "UPI"
//                     ? "phone-portrait-outline"
//                     : method === "Card"
//                     ? "card-outline"
//                     : method === "Net Banking"
//                     ? "globe-outline"
//                     : "business-outline"
//                 }
//                 size={20}
//                 color={selectedMethod === method ? COLORS.primary : COLORS.muted}
//               />

//               <Text
//                 style={[
//                   styles.methodText,
//                   selectedMethod === method && styles.activeMethodText,
//                 ]}
//               >
//                 {method}
//               </Text>
//             </View>

//             {selectedMethod === method && (
//               <Ionicons
//                 name="checkmark-circle"
//                 size={22}
//                 color={COLORS.primary}
//               />
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Fee Summary</Text>

//         <AmountRow label="Doctor Fee" value={doctorFee} />
//         <AmountRow label="Platform Fee" value={platformFee} />

//         <View style={styles.divider} />

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total Payable</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       <View style={styles.noteCard}>
//         <Ionicons
//           name="information-circle-outline"
//           size={22}
//           color={COLORS.warning}
//         />

//         <Text style={styles.noteText}>
//           Token will be generated only after payment confirmation.
//         </Text>
//       </View>

//       <TouchableOpacity activeOpacity={0.9} onPress={payNow}>
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.payButton}
//         >
//           <Ionicons
//             name={
//               selectedMethod === "Pay at Hospital"
//                 ? "business-outline"
//                 : "lock-closed-outline"
//             }
//             size={20}
//             color="#fff"
//           />

//           <Text style={styles.payButtonText}>
//             {selectedMethod === "Pay at Hospital"
//               ? `Confirm & Pay at Hospital`
//               : `Pay ₹${totalAmount} & Confirm`}
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function AmountRow({ label, value }) {
//   return (
//     <View style={styles.amountRow}>
//       <Text style={styles.amountLabel}>{label}</Text>
//       <Text style={styles.amountValue}>₹{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   contentContainer: {
//     paddingHorizontal: 18,
//     paddingBottom: 20,
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
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   doctorCard: {
//     borderRadius: 28,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     marginBottom: 16,
//   },

//   iconCircle: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   doctorMeta: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   cardTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     gap: 12,
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "56%",
//     textAlign: "right",
//   },

//   methodRow: {
//     minHeight: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   activeMethodRow: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },

//   methodLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   methodText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },

//   activeMethodText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },

//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 9,
//   },

//   amountLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   amountValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   totalLabel: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   totalValue: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: "900",
//   },

//   noteCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },

//   noteText: {
//     flex: 1,
//     color: COLORS.warning,
//     fontWeight: "800",
//   },

//   payButton: {
//     minHeight: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//     paddingHorizontal: 16,
//   },

//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//     textAlign: "center",
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 14,
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },

//   emptyText: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontWeight: "700",
//     textAlign: "center",
//   },

//   emptyButton: {
//     marginTop: 22,
//     height: 52,
//     borderRadius: 16,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  



































// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
//   Linking,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { createPaymentOrder, verifyPayment, savePayAtHospital } from "../../services/apiService";

// // ─── Razorpay Web Checkout (works on Expo without native linking) ─────────────
// // For Android/iOS: install react-native-razorpay and replace openRazorpayCheckout
// // For Expo Go / web: we use the hosted checkout via deep-link
// // ─────────────────────────────────────────────────────────────────────────────

// // Try to import react-native-razorpay if available
// let RazorpayCheckout = null;
// try {
//   RazorpayCheckout = require("react-native-razorpay").default;
// } catch (e) {
//   // not installed — will use WebBrowser fallback
// }

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("Razorpay");
//   const [loading, setLoading] = useState(false);

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee   = appointment?.doctorFee   || 500;
//   const totalAmount = doctorFee + platformFee; // in rupees

//   // ── Handle "Pay at Hospital" (no Razorpay) ───────────────────────────────
//   const handlePayAtHospital = async () => {
//     setLoading(true);
//     try {
//       // Save record to backend
//       await savePayAtHospital({
//         hospitalId: appointment?.hospitalId || "",
//         patientId:  appointment?.patientId  || "",
//         doctorName: appointment?.doctor     || "",
//         department: appointment?.department || "",
//         amount:     totalAmount,
//         notes:      `Pay at hospital - Dr. ${appointment?.doctor}`,
//       });

//       // Book the token
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod:     "Pay at Hospital",
//         paymentStatus:     "PAY_AT_HOSPITAL",
//         paymentId:         `PAY-HOSPITAL-${Date.now()}`,
//         appointmentStatus: "CONFIRMED",
//       });

//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Error", err.message || "Could not complete. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }; 

//   // At the top of handleRazorpayPayment, add:
// const token = await AsyncStorage.getItem("token");
// if (!token) {
//   Alert.alert("Session Expired", "Please log in again.");
//   navigation.replace("PatientLogin");
//   return;
// }

//   // ── Handle Razorpay Payment ──────────────────────────────────────────────
//   const handleRazorpayPayment = async () => {
//     setLoading(true);
//     try {
//       // Step 1: Create order on your backend
//       const order = await createPaymentOrder({
//         amount:     totalAmount,
//         hospitalId: appointment?.hospitalId || "",
//         patientId:  appointment?.patientId  || "",
//         doctorName: appointment?.doctor     || "",
//         department: appointment?.department || "",
//         notes:      `Appointment - Dr. ${appointment?.doctor}`,
//       });

//       // Step 2: Open Razorpay checkout
//       if (RazorpayCheckout) {
//         // ── Native SDK (react-native-razorpay installed) ──────────────────
//         const options = {
//           description:   `Dr. ${appointment?.doctor} - ${appointment?.department}`,
//           image:         "", // your app logo URL
//           currency:      "INR",
//           key:           order.keyId,
//           amount:        order.amount,   // in paise
//           order_id:      order.orderId,
//           name:          appointment?.hospitalName || "Medique",
//           prefill: {
//             email:   appointment?.patientEmail   || "",
//             contact: appointment?.patientPhone   || "",
//             name:    appointment?.patientName    || "",
//           },
//           theme: { color: COLORS.primary || "#1A73E8" },
//         };

//         const data = await RazorpayCheckout.open(options);
//         // data = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
//         await onPaymentSuccess(data, order.orderId);

//       } else {
//         // ── Web / Expo Go fallback: open Razorpay hosted page ─────────────
//         // NOTE: This opens a browser tab. For production use react-native-razorpay.
//         const patientPhone = appointment?.patientPhone || "";
//         const patientName  = appointment?.patientName  || "";

//         // Build the checkout URL
//         const params = [
//           `key=${order.keyId}`,
//           `amount=${order.amount}`,
//           `currency=INR`,
//           `order_id=${order.orderId}`,
//           `name=${encodeURIComponent(appointment?.hospitalName || "Medique")}`,
//           `description=${encodeURIComponent(`Dr. ${appointment?.doctor}`)}`,
//           `prefill[name]=${encodeURIComponent(patientName)}`,
//           `prefill[contact]=${encodeURIComponent(patientPhone)}`,
//           // callback_url is called after payment with the payment data
//           // For proper callback you need a deep link or backend redirect
//         ].join("&");

//         await Linking.openURL(`https://rzp.io/l/medique?${params}`);

//         // Since we can't intercept the browser callback automatically in Expo Go,
//         // show a confirmation dialog
//         setLoading(false);
//         Alert.alert(
//           "Complete Payment",
//           "Please complete the payment in the browser and come back.",
//           [
//             { text: "Cancel",             style: "cancel" },
//             { text: "Payment Done ✓",     onPress: () => confirmAfterBrowserPayment(order.orderId) },
//           ]
//         );
//         return;
//       }
//     } catch (err) {
//       if (err?.code === "PAYMENT_CANCELLED") {
//         Alert.alert("Cancelled", "Payment was cancelled.");
//       } else {
//         Alert.alert("Payment Failed", err.message || "Payment could not be completed.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Called after react-native-razorpay returns success
//   const onPaymentSuccess = async (paymentData, orderId) => {
//     try {
//       // Step 3: Verify signature on your backend
//       const verified = await verifyPayment({
//         razorpay_order_id:   paymentData.razorpay_order_id  || orderId,
//         razorpay_payment_id: paymentData.razorpay_payment_id,
//         razorpay_signature:  paymentData.razorpay_signature,
//       });

//       if (!verified.verified) {
//         Alert.alert("Verification Failed", "Payment could not be verified. Contact support.");
//         return;
//       }

//       // Step 4: Book the token
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod:     "Razorpay",
//         paymentStatus:     "SUCCESS",
//         paymentId:         paymentData.razorpay_payment_id,
//         razorpayOrderId:   paymentData.razorpay_order_id || orderId,
//         appointmentStatus: "CONFIRMED",
//       });

//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Error", err.message || "Payment verified but booking failed.");
//     }
//   };

//   // Fallback: user confirms payment done in browser (Expo Go only)
//   const confirmAfterBrowserPayment = async (orderId) => {
//     setLoading(true);
//     try {
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod:     "Razorpay (Browser)",
//         paymentStatus:     "SUCCESS",
//         paymentId:         `RPY-${Date.now()}`,
//         razorpayOrderId:   orderId,
//         appointmentStatus: "CONFIRMED",
//       });
//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Error", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Main Pay Button Handler ───────────────────────────────────────────────
//   const payNow = () => {
//     if (!appointment) {
//       Alert.alert("Missing Appointment", "Please book an appointment again.");
//       navigation.goBack();
//       return;
//     }

//     if (selectedMethod === "Pay at Hospital") {
//       Alert.alert(
//         "Pay at Hospital",
//         `You will pay ₹${totalAmount} at the hospital.`,
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "Confirm", onPress: handlePayAtHospital },
//         ]
//       );
//       return;
//     }

//     // Razorpay or other online methods
//     handleRazorpayPayment();
//   };

//   // ── Empty state ───────────────────────────────────────────────────────────
//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>
//           Please go back and book your token again.
//         </Text>
//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // ── UI ────────────────────────────────────────────────────────────────────
//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Review and confirm your appointment</Text>
//         </View>
//       </View>

//       {/* Doctor Card */}
//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.doctorCard}
//       >
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       {/* Appointment Details */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Appointment Details</Text>
//         <InfoRow icon="calendar-outline"      label="Date"       value={appointment?.displayDate || appointment?.date} />
//         <InfoRow icon="time-outline"          label="Slot"       value={`${appointment?.slotLabel || appointment?.slot || "-"}${appointment?.slotTime ? ` • ${appointment.slotTime}` : ""}`} />
//         <InfoRow icon="person-outline"        label="Patient"    value={`${appointment?.patientName || "-"}, ${appointment?.age || "-"} yrs`} />
//         <InfoRow icon="document-text-outline" label="Visit Type" value={appointment?.visitType} />
//       </View>

//       {/* Payment Method */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Payment Method</Text>

//         {[
//           { key: "Razorpay",        icon: "card-outline",         label: "Pay Online", subtitle: "UPI • Cards • Net Banking" },
//           { key: "Pay at Hospital", icon: "business-outline",     label: "Pay at Hospital",       subtitle: "Pay when you arrive" },
//         ].map(({ key, icon, label, subtitle }) => (
//           <TouchableOpacity
//             key={key}
//             style={[styles.methodRow, selectedMethod === key && styles.activeMethodRow]}
//             onPress={() => setSelectedMethod(key)}
//           >
//             <View style={styles.methodLeft}>
//               <Ionicons
//                 name={icon}
//                 size={20}
//                 color={selectedMethod === key ? COLORS.primary : COLORS.muted}
//               />
//               <View>
//                 <Text style={[styles.methodText, selectedMethod === key && styles.activeMethodText]}>
//                   {label}
//                 </Text>
//                 <Text style={styles.methodSubtext}>{subtitle}</Text>
//               </View>
//             </View>
//             <Ionicons
//               name={selectedMethod === key ? "radio-button-on" : "radio-button-off"}
//               size={20}
//               color={selectedMethod === key ? COLORS.primary : COLORS.muted}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Amount Summary */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Amount Summary</Text>
//         <View style={styles.amountRow}>
//           <Text style={styles.amountLabel}>Doctor Consultation Fee</Text>
//           <Text style={styles.amountValue}>₹{doctorFee}</Text>
//         </View>
//         <View style={styles.amountRow}>
//           <Text style={styles.amountLabel}>Platform Fee</Text>
//           <Text style={styles.amountValue}>₹{platformFee}</Text>
//         </View>
//         <View style={styles.divider} />
//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total Amount</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       {/* Note */}
//       {selectedMethod === "Pay at Hospital" && (
//         <View style={styles.noteCard}>
//           <Ionicons name="information-circle-outline" size={20} color={COLORS.warning} />
//           <Text style={styles.noteText}>
//             Please carry exact change. Payment must be made before your consultation.
//           </Text>
//         </View>
//       )}

//       {!RazorpayCheckout && selectedMethod === "Razorpay" && (
//         <View style={styles.noteCard}>
//           <Ionicons name="globe-outline" size={20} color={COLORS.primary} />
//           <Text style={[styles.noteText, { color: COLORS.primary }]}>
//             Payment will open in browser. After paying, return to the app and confirm.
//           </Text>
//         </View>
//       )}

//       {/* Pay Button */}
//       <TouchableOpacity
//         activeOpacity={0.9}
//         onPress={payNow}
//         disabled={loading}
//       >
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.payButton}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <>
//               <Ionicons
//                 name={selectedMethod === "Pay at Hospital" ? "business-outline" : "lock-closed-outline"}
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={styles.payButtonText}>
//                 {selectedMethod === "Pay at Hospital"
//                   ? "Confirm Booking"
//                   : `Pay ₹${totalAmount} Securely`}
//               </Text>
//             </>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ── InfoRow component ─────────────────────────────────────────────────────────
// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>
//       <Text style={styles.infoValue} numberOfLines={2}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   contentContainer: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 20,
//     paddingTop: 8,
//   },
//   backBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   title: {
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },
//   sub: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 2,
//   },
//   doctorCard: {
//     borderRadius: 20,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     marginBottom: 16,
//   },
//   iconCircle: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   doctorName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },
//   doctorMeta: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontWeight: "700",
//   },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },
//   cardTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     gap: 12,
//   },
//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },
//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },
//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "56%",
//     textAlign: "right",
//   },
//   methodRow: {
//     minHeight: 60,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   activeMethodRow: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },
//   methodLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     flex: 1,
//   },
//   methodText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },
//   activeMethodText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },
//   methodSubtext: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 2,
//   },
//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 9,
//   },
//   amountLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },
//   amountValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   totalLabel: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//   },
//   totalValue: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: "900",
//   },
//   noteCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },
//   noteText: {
//     flex: 1,
//     color: COLORS.warning,
//     fontWeight: "800",
//   },
//   payButton: {
//     minHeight: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//     paddingHorizontal: 16,
//   },
//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//     textAlign: "center",
//   },
//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   emptyTitle: {
//     marginTop: 14,
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },
//   emptyText: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontWeight: "700",
//     textAlign: "center",
//   },
//   emptyButton: {
//     marginTop: 22,
//     height: 52,
//     borderRadius: 16,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  







































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   createPaymentOrder,
//   verifyPayment,
//   savePayAtHospital,
// } from "../../services/apiService";

// // ─── Try to import react-native-razorpay (native only) ───────────────────────
// let RazorpayCheckout = null;
// try {
//   RazorpayCheckout = require("react-native-razorpay").default;
// } catch (e) {
//   // Not installed — will use Razorpay Web SDK fallback
// }

// // ─── Inject Razorpay Web SDK script (web/Expo Go only) ───────────────────────
// function injectRazorpayScript() {
//   return new Promise((resolve, reject) => {
//     if (window.Razorpay) {
//       resolve(); // already loaded
//       return;
//     }
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve();
//     script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
//     document.body.appendChild(script);
//   });
// }

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("Razorpay");
//   const [loading, setLoading] = useState(false);

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee   = appointment?.doctorFee   || 500;
//   const totalAmount = doctorFee + platformFee;

//   // ── Check session before any payment ─────────────────────────────────────
//   const checkSession = async () => {
//     const token = await AsyncStorage.getItem("token");
//     if (!token) {
//       Alert.alert("Session Expired", "Please log in again.");
//       navigation.replace("PatientLogin");
//       return false;
//     }
//     return true;
//   };

//   // ── Handle "Pay at Hospital" ──────────────────────────────────────────────
//   const handlePayAtHospital = async () => {
//     const valid = await checkSession();
//     if (!valid) return;

//     setLoading(true);
//     try {
//       await savePayAtHospital({
//         hospitalId: appointment?.hospitalId || "",
//         patientId:  appointment?.patientId  || "",
//         doctorName: appointment?.doctor     || "",
//         department: appointment?.department || "",
//         amount:     totalAmount,
//         notes:      `Pay at hospital - Dr. ${appointment?.doctor}`,
//       });

//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod:     "Pay at Hospital",
//         paymentStatus:     "PAY_AT_HOSPITAL",
//         paymentId:         `PAY-HOSPITAL-${Date.now()}`,
//         appointmentStatus: "CONFIRMED",
//       });

//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Error", err.message || "Could not complete. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Called after Razorpay returns success (native or web) ────────────────
//   const onPaymentSuccess = async (paymentData, orderId) => {
//     try {
//       const verified = await verifyPayment({
//         razorpay_order_id:   paymentData.razorpay_order_id  || orderId,
//         razorpay_payment_id: paymentData.razorpay_payment_id,
//         razorpay_signature:  paymentData.razorpay_signature,
//       });

//       if (!verified.verified) {
//         Alert.alert(
//           "Verification Failed",
//           "Payment could not be verified. Please contact support."
//         );
//         return;
//       }

//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod:     "Razorpay",
//         paymentStatus:     "SUCCESS",
//         paymentId:         paymentData.razorpay_payment_id,
//         razorpayOrderId:   paymentData.razorpay_order_id || orderId,
//         appointmentStatus: "CONFIRMED",
//       });

//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Error", err.message || "Payment verified but booking failed.");
//     }
//   };

//   // ── Handle Razorpay Payment ───────────────────────────────────────────────
//   const handleRazorpayPayment = async () => {
//     // 1. Check session first
//     const valid = await checkSession();
//     if (!valid) return;

//     setLoading(true);
//     try {
//       // 2. Create order on backend
//       const order = await createPaymentOrder({
//         amount:     totalAmount,
//         hospitalId: appointment?.hospitalId || "",
//         patientId:  appointment?.patientId  || "",
//         doctorName: appointment?.doctor     || "",
//         department: appointment?.department || "",
//         notes:      `Appointment - Dr. ${appointment?.doctor}`,
//       });

//       // 3a. Native SDK (react-native-razorpay installed on Android/iOS)
//       if (RazorpayCheckout) {
//         const options = {
//           description:   `Dr. ${appointment?.doctor} - ${appointment?.department}`,
//           image:         "",
//           currency:      "INR",
//           key:           order.keyId,
//           amount:        order.amount,
//           order_id:      order.orderId,
//           name:          appointment?.hospitalName || "Medique",
//           prefill: {
//             email:   appointment?.patientEmail || "",
//             contact: appointment?.patientPhone || "",
//             name:    appointment?.patientName  || "",
//           },
//           theme: { color: COLORS.primary || "#1A73E8" },
//         };

//         const data = await RazorpayCheckout.open(options);
//         await onPaymentSuccess(data, order.orderId);

//       // 3b. Web SDK (Expo Go / browser)
//       } else if (Platform.OS === "web") {
//         setLoading(false); // release spinner while popup is open
//         await injectRazorpayScript();

//         await new Promise((resolve, reject) => {
//           const rzp = new window.Razorpay({
//             key:         order.keyId,
//             amount:      order.amount,
//             currency:    "INR",
//             order_id:    order.orderId,
//             name:        appointment?.hospitalName || "Medique",
//             description: `Dr. ${appointment?.doctor} - ${appointment?.department}`,
//             prefill: {
//               name:    appointment?.patientName  || "",
//               contact: appointment?.patientPhone || "",
//               email:   appointment?.patientEmail || "",
//             },
//             theme: { color: COLORS.primary || "#1A73E8" },
//             handler: async (response) => {
//               // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
//               setLoading(true);
//               try {
//                 await onPaymentSuccess(response, order.orderId);
//                 resolve();
//               } catch (e) {
//                 reject(e);
//               } finally {
//                 setLoading(false);
//               }
//             },
//             modal: {
//               ondismiss: () => {
//                 reject({ code: "PAYMENT_CANCELLED" });
//               },
//             },
//           });
//           rzp.open();
//         });

//       // 3c. Expo Go on mobile (no native SDK, no browser window.Razorpay)
//       } else {
//         setLoading(false);
//         Alert.alert(
//           "Payment",
//           "Online payment requires the full app build. Please use 'Pay at Hospital' or build the app with react-native-razorpay installed.",
//           [{ text: "OK" }]
//         );
//       }
//     } catch (err) {
//       if (err?.code === "PAYMENT_CANCELLED") {
//         Alert.alert("Cancelled", "Payment was cancelled.");
//       } else {
//         Alert.alert(
//           "Payment Failed",
//           err.message || "Payment could not be completed. Please try again."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Main Pay Button Handler ───────────────────────────────────────────────
//   const payNow = () => {
//     if (!appointment) {
//       Alert.alert("Missing Appointment", "Please book an appointment again.");
//       navigation.goBack();
//       return;
//     }

//     if (selectedMethod === "Pay at Hospital") {
//       Alert.alert(
//         "Pay at Hospital",
//         `Confirm booking? You will pay ₹${totalAmount} at the hospital.`,
//         [
//           { text: "Cancel",  style: "cancel" },
//           { text: "Confirm", onPress: handlePayAtHospital },
//         ]
//       );
//       return;
//     }

//     handleRazorpayPayment();
//   };

//   // ── Empty / no appointment state ──────────────────────────────────────────
//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>
//           Please go back and book your token again.
//         </Text>
//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // ── UI ────────────────────────────────────────────────────────────────────
//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Review and confirm your appointment</Text>
//         </View>
//       </View>

//       {/* Doctor Card */}
//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.doctorCard}
//       >
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       {/* Appointment Details */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Appointment Details</Text>
//         <InfoRow
//           icon="calendar-outline"
//           label="Date"
//           value={appointment?.displayDate || appointment?.date}
//         />
//         <InfoRow
//           icon="time-outline"
//           label="Slot"
//           value={`${appointment?.slotLabel || appointment?.slot || "-"}${
//             appointment?.slotTime ? ` • ${appointment.slotTime}` : ""
//           }`}
//         />
//         <InfoRow
//           icon="person-outline"
//           label="Patient"
//           value={`${appointment?.patientName || "-"}, ${appointment?.age || "-"} yrs`}
//         />
//         <InfoRow
//           icon="document-text-outline"
//           label="Visit Type"
//           value={appointment?.visitType}
//         />
//       </View>

//       {/* Payment Method */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Payment Method</Text>
//         {[
//           {
//             key:      "Razorpay",
//             icon:     "card-outline",
//             label:    "Pay Online",
//             subtitle: "UPI • Cards • Net Banking",
//           },
//           {
//             key:      "Pay at Hospital",
//             icon:     "business-outline",
//             label:    "Pay at Hospital",
//             subtitle: "Pay when you arrive",
//           },
//         ].map(({ key, icon, label, subtitle }) => (
//           <TouchableOpacity
//             key={key}
//             style={[
//               styles.methodRow,
//               selectedMethod === key && styles.activeMethodRow,
//             ]}
//             onPress={() => setSelectedMethod(key)}
//           >
//             <View style={styles.methodLeft}>
//               <Ionicons
//                 name={icon}
//                 size={20}
//                 color={selectedMethod === key ? COLORS.primary : COLORS.muted}
//               />
//               <View>
//                 <Text
//                   style={[
//                     styles.methodText,
//                     selectedMethod === key && styles.activeMethodText,
//                   ]}
//                 >
//                   {label}
//                 </Text>
//                 <Text style={styles.methodSubtext}>{subtitle}</Text>
//               </View>
//             </View>
//             <Ionicons
//               name={
//                 selectedMethod === key
//                   ? "radio-button-on"
//                   : "radio-button-off"
//               }
//               size={20}
//               color={selectedMethod === key ? COLORS.primary : COLORS.muted}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Amount Summary */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Amount Summary</Text>
//         <View style={styles.amountRow}>
//           <Text style={styles.amountLabel}>Doctor Consultation Fee</Text>
//           <Text style={styles.amountValue}>₹{doctorFee}</Text>
//         </View>
//         <View style={styles.amountRow}>
//           <Text style={styles.amountLabel}>Platform Fee</Text>
//           <Text style={styles.amountValue}>₹{platformFee}</Text>
//         </View>
//         <View style={styles.divider} />
//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total Amount</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       {/* Info notes */}
//       {selectedMethod === "Pay at Hospital" && (
//         <View style={styles.noteCard}>
//           <Ionicons
//             name="information-circle-outline"
//             size={20}
//             color={COLORS.warning}
//           />
//           <Text style={styles.noteText}>
//             Please carry exact change. Payment must be made before your
//             consultation.
//           </Text>
//         </View>
//       )}

//       {selectedMethod === "Razorpay" && Platform.OS === "web" && (
//         <View style={[styles.noteCard, { backgroundColor: "#EFF6FF" }]}>
//           <Ionicons name="globe-outline" size={20} color={COLORS.primary} />
//           <Text style={[styles.noteText, { color: COLORS.primary }]}>
//             A secure Razorpay popup will open for payment.
//           </Text>
//         </View>
//       )}

//       {/* Pay Button */}
//       <TouchableOpacity
//         activeOpacity={loading ? 1 : 0.9}
//         onPress={payNow}
//         disabled={loading}
//       >
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={[styles.payButton, loading && { opacity: 0.7 }]}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <>
//               <Ionicons
//                 name={
//                   selectedMethod === "Pay at Hospital"
//                     ? "business-outline"
//                     : "lock-closed-outline"
//                 }
//                 size={20}
//                 color="#fff"
//               />
//               <Text style={styles.payButtonText}>
//                 {selectedMethod === "Pay at Hospital"
//                   ? "Confirm Booking"
//                   : `Pay ₹${totalAmount} Securely`}
//               </Text>
//             </>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ── InfoRow ───────────────────────────────────────────────────────────────────
// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>
//       <Text style={styles.infoValue} numberOfLines={2}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   contentContainer: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 20,
//     paddingTop: 8,
//   },
//   backBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   title: {
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },
//   sub: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 2,
//   },
//   doctorCard: {
//     borderRadius: 20,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     marginBottom: 16,
//   },
//   iconCircle: {
//     width: 52,
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   doctorName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },
//   doctorMeta: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontWeight: "700",
//   },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },
//   cardTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },
//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     gap: 12,
//   },
//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },
//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },
//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "56%",
//     textAlign: "right",
//   },
//   methodRow: {
//     minHeight: 60,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   activeMethodRow: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },
//   methodLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     flex: 1,
//   },
//   methodText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },
//   activeMethodText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },
//   methodSubtext: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 2,
//   },
//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 9,
//   },
//   amountLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },
//   amountValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   totalLabel: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//   },
//   totalValue: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: "900",
//   },
//   noteCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },
//   noteText: {
//     flex: 1,
//     color: COLORS.warning,
//     fontWeight: "800",
//   },
//   payButton: {
//     minHeight: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//     paddingHorizontal: 16,
//   },
//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//     textAlign: "center",
//   },
//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },
//   emptyTitle: {
//     marginTop: 14,
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },
//   emptyText: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontWeight: "700",
//     textAlign: "center",
//   },
//   emptyButton: {
//     marginTop: 22,
//     height: 52,
//     borderRadius: 16,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  

































import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createPaymentOrder,
  verifyPayment,
  savePayAtHospital,
} from "../../services/apiService";

// ─── Try to import react-native-razorpay (native Android/iOS builds only) ────
let RazorpayCheckout = null;
try {
  RazorpayCheckout = require("react-native-razorpay").default;
} catch (e) {
  // Not installed — will use Razorpay Web SDK (window.Razorpay) for web/Expo Go
}

// ─── Inject Razorpay Web Checkout script into the page (web only) ────────────
function injectRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Not running in a browser environment"));
      return;
    }
    if (window.Razorpay) {
      resolve(); // already loaded
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK. Check internet connection."));
    document.body.appendChild(script);
  });
}

export default function PaymentScreen({ route, navigation }) {
  const { appointment } = route.params || {};
  const { bookToken } = useQueue();

  const [selectedMethod, setSelectedMethod] = useState("Razorpay");
  const [loading, setLoading] = useState(false);

  const platformFee = appointment?.platformFee ?? 20;
  const doctorFee   = appointment?.doctorFee   ?? 500;
  const totalAmount = doctorFee + platformFee;

  // ── Check auth session ────────────────────────────────────────────────────
  const checkSession = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Session Expired", "Please log in again.");
      navigation.replace("PatientLogin");
      return false;
    }
    return true;
  };

  // ── After Razorpay confirms success, verify on backend then book token ────
  const onPaymentSuccess = async (paymentData, orderId) => {
    try {
      const verified = await verifyPayment({
        razorpay_order_id:   paymentData.razorpay_order_id  || orderId,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature:  paymentData.razorpay_signature,
      });

      if (!verified.verified) {
        Alert.alert(
          "Verification Failed",
          "Payment signature mismatch. Please contact support."
        );
        return;
      }

      // Book the token after verified payment
      const booked = await bookToken({
        ...appointment,
        doctorFee,
        platformFee,
        totalAmount,
        paymentMethod:     "Razorpay",
        paymentStatus:     "SUCCESS",
        paymentId:         paymentData.razorpay_payment_id,
        razorpayOrderId:   paymentData.razorpay_order_id || orderId,
        appointmentStatus: "CONFIRMED",
      });

      navigation.replace("TokenSuccess", { token: booked });
    } catch (err) {
      Alert.alert("Error", err.message || "Payment verified but booking failed. Contact support.");
    }
  };

  // ── Handle Pay at Hospital (no Razorpay) ─────────────────────────────────
  const handlePayAtHospital = async () => {
    const valid = await checkSession();
    if (!valid) return;

    setLoading(true);
    try {
      await savePayAtHospital({
        hospitalId: appointment?.hospitalId || "",
        patientId:  appointment?.patientId  || "",
        doctorName: appointment?.doctor     || "",
        department: appointment?.department || "",
        amount:     totalAmount,
        notes:      `Pay at hospital - Dr. ${appointment?.doctor}`,
      });

      const booked = await bookToken({
        ...appointment,
        doctorFee,
        platformFee,
        totalAmount,
        paymentMethod:     "Pay at Hospital",
        paymentStatus:     "PAY_AT_HOSPITAL",
        paymentId:         `PAY-HOSPITAL-${Date.now()}`,
        appointmentStatus: "CONFIRMED",
      });

      navigation.replace("TokenSuccess", { token: booked });
    } catch (err) {
      Alert.alert("Error", err.message || "Could not complete. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Handle Razorpay Payment ───────────────────────────────────────────────
  const handleRazorpayPayment = async () => {
    const valid = await checkSession();
    if (!valid) return;

    setLoading(true);
    try {
      // Step 1: Create order on backend → get orderId + keyId
      const order = await createPaymentOrder({
        amount:     totalAmount,          // in rupees; backend converts to paise
        hospitalId: appointment?.hospitalId || "",
        patientId:  appointment?.patientId  || "",
        doctorName: appointment?.doctor     || "",
        department: appointment?.department || "",
        notes:      `Appointment - Dr. ${appointment?.doctor}`,
      });

      // Step 2a: Native Android/iOS — react-native-razorpay installed
      if (RazorpayCheckout) {
        const options = {
          description:   `Dr. ${appointment?.doctor} - ${appointment?.department}`,
          image:         "",           // your app logo URL (optional)
          currency:      "INR",
          key:           order.keyId,
          amount:        order.amount, // in paise (backend already sent paise)
          order_id:      order.orderId,
          name:          appointment?.hospitalName || "Medique",
          prefill: {
            email:   appointment?.patientEmail || "",
            contact: appointment?.patientPhone || "",
            name:    appointment?.patientName  || "",
          },
          theme: { color: COLORS.primary || "#1A73E8" },
        };

        setLoading(false); // spinner not needed — native popup handles UX
        const data = await RazorpayCheckout.open(options);
        // data = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        setLoading(true);
        await onPaymentSuccess(data, order.orderId);

      // Step 2b: Web / Expo Go on browser — use window.Razorpay popup
      } else if (Platform.OS === "web" && typeof window !== "undefined") {
        await injectRazorpayScript();
        setLoading(false); // release spinner while popup is open

        await new Promise((resolve, reject) => {
          const rzp = new window.Razorpay({
            key:         order.keyId,
            amount:      order.amount,   // paise
            currency:    "INR",
            order_id:    order.orderId,
            name:        appointment?.hospitalName || "Medique",
            description: `Dr. ${appointment?.doctor} - ${appointment?.department}`,
            prefill: {
              name:    appointment?.patientName  || "",
              contact: appointment?.patientPhone || "",
              email:   appointment?.patientEmail || "",
            },
            theme: { color: COLORS.primary || "#1A73E8" },

            // ✅ This is the KEY fix — handler is called after successful payment
            handler: async (response) => {
              // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
              setLoading(true);
              try {
                await onPaymentSuccess(response, order.orderId);
                resolve();
              } catch (e) {
                reject(e);
              } finally {
                setLoading(false);
              }
            },

            modal: {
              // Called when user closes the popup without paying
              ondismiss: () => {
                reject({ code: "PAYMENT_CANCELLED" });
              },
            },
          });

          rzp.open(); // ← This opens the Razorpay popup
        });

      // Step 2c: Expo Go on mobile (no native SDK, no browser — unsupported)
      } else {
        setLoading(false);
        Alert.alert(
          "Online Payment Not Available",
          "Please use 'Pay at Hospital' in Expo Go, or build the app with react-native-razorpay for Android/iOS.",
          [{ text: "OK" }]
        );
      }
    } catch (err) {
      if (err?.code === "PAYMENT_CANCELLED") {
        Alert.alert("Cancelled", "Payment was cancelled.");
      } else {
        Alert.alert(
          "Payment Failed",
          err.message || "Payment could not be completed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Main Pay Button ───────────────────────────────────────────────────────
  const payNow = () => {
    if (!appointment) {
      Alert.alert("Missing Appointment", "Please book an appointment again.");
      navigation.goBack();
      return;
    }

    if (selectedMethod === "Pay at Hospital") {
      Alert.alert(
        "Pay at Hospital",
        `Confirm booking? You will pay ₹${totalAmount} at the hospital.`,
        [
          { text: "Cancel",  style: "cancel" },
          { text: "Confirm", onPress: handlePayAtHospital },
        ]
      );
      return;
    }

    handleRazorpayPayment();
  };

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!appointment) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
        <Text style={styles.emptyTitle}>Appointment not found</Text>
        <Text style={styles.emptyText}>
          Please go back and book your token again.
        </Text>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  // ── UI ────────────────────────────────────────────────────────────────────
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.sub}>Review and confirm your appointment</Text>
        </View>
      </View>

      {/* Doctor Card */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.doctorCard}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.doctorName}>{appointment?.doctor}</Text>
          <Text style={styles.doctorMeta}>{appointment?.department}</Text>
          <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
        </View>
      </LinearGradient>

      {/* Appointment Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appointment Details</Text>
        <InfoRow
          icon="calendar-outline"
          label="Date"
          value={appointment?.displayDate || appointment?.date}
        />
        <InfoRow
          icon="time-outline"
          label="Slot"
          value={`${appointment?.slotLabel || appointment?.slot || "-"}${
            appointment?.slotTime ? ` • ${appointment.slotTime}` : ""
          }`}
        />
        <InfoRow
          icon="person-outline"
          label="Patient"
          value={`${appointment?.patientName || "-"}, ${appointment?.age || "-"} yrs`}
        />
        <InfoRow
          icon="document-text-outline"
          label="Visit Type"
          value={appointment?.visitType}
        />
      </View>

      {/* Payment Method */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Method</Text>
        {[
          {
            key:      "Razorpay",
            icon:     "card-outline",
            label:    "Pay Online",
            subtitle: "UPI • Cards • Net Banking",
          },
          {
            key:      "Pay at Hospital",
            icon:     "business-outline",
            label:    "Pay at Hospital",
            subtitle: "Pay when you arrive",
          },
        ].map(({ key, icon, label, subtitle }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.methodRow,
              selectedMethod === key && styles.activeMethodRow,
            ]}
            onPress={() => setSelectedMethod(key)}
          >
            <View style={styles.methodLeft}>
              <Ionicons
                name={icon}
                size={20}
                color={selectedMethod === key ? COLORS.primary : COLORS.muted}
              />
              <View>
                <Text
                  style={[
                    styles.methodText,
                    selectedMethod === key && styles.activeMethodText,
                  ]}
                >
                  {label}
                </Text>
                <Text style={styles.methodSubtext}>{subtitle}</Text>
              </View>
            </View>
            <Ionicons
              name={
                selectedMethod === key
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={selectedMethod === key ? COLORS.primary : COLORS.muted}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Amount Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Amount Summary</Text>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Doctor Consultation Fee</Text>
          <Text style={styles.amountValue}>₹{doctorFee}</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Platform Fee</Text>
          <Text style={styles.amountValue}>₹{platformFee}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>₹{totalAmount}</Text>
        </View>
      </View>

      {/* Info Notes */}
      {selectedMethod === "Pay at Hospital" && (
        <View style={styles.noteCard}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={COLORS.warning}
          />
          <Text style={styles.noteText}>
            Please carry exact change. Payment must be made before your consultation.
          </Text>
        </View>
      )}

      {selectedMethod === "Razorpay" && Platform.OS === "web" && (
        <View style={[styles.noteCard, { backgroundColor: "#EFF6FF" }]}>
          <Ionicons name="globe-outline" size={20} color={COLORS.primary} />
          <Text style={[styles.noteText, { color: COLORS.primary }]}>
            A secure Razorpay popup will open for payment.
          </Text>
        </View>
      )}

      {/* Pay Button */}
      <TouchableOpacity
        activeOpacity={loading ? 1 : 0.9}
        onPress={payNow}
        disabled={loading}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={[styles.payButton, loading && { opacity: 0.7 }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <Ionicons
                name={
                  selectedMethod === "Pay at Hospital"
                    ? "business-outline"
                    : "lock-closed-outline"
                }
                size={20}
                color="#fff"
              />
              <Text style={styles.payButtonText}>
                {selectedMethod === "Pay at Hospital"
                  ? "Confirm Booking"
                  : `Pay ₹${totalAmount} Securely`}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Helper Components ─────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue} numberOfLines={2}>
        {value || "-"}
      </Text>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    paddingTop: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
  },
  sub: {
    color: COLORS.muted,
    fontWeight: "700",
    marginTop: 2,
  },
  doctorCard: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  doctorName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },
  doctorMeta: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
    fontWeight: "700",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  infoLabel: {
    color: COLORS.muted,
    fontWeight: "800",
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: "900",
    maxWidth: "56%",
    textAlign: "right",
  },
  methodRow: {
    minHeight: 60,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activeMethodRow: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.primary,
  },
  methodLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  methodText: {
    color: COLORS.text,
    fontWeight: "800",
  },
  activeMethodText: {
    color: COLORS.primary,
    fontWeight: "900",
  },
  methodSubtext: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
  },
  amountLabel: {
    color: COLORS.muted,
    fontWeight: "800",
  },
  amountValue: {
    color: COLORS.text,
    fontWeight: "900",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "900",
  },
  totalValue: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "900",
  },
  noteCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  noteText: {
    flex: 1,
    color: COLORS.warning,
    fontWeight: "800",
  },
  payButton: {
    minHeight: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 36,
    paddingHorizontal: 16,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    marginTop: 14,
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
  },
  emptyText: {
    marginTop: 8,
    color: COLORS.muted,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyButton: {
    marginTop: 22,
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
  },
});