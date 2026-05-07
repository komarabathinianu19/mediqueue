// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params;
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("UPI");

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee = appointment?.doctorFee || 500;
//   const totalAmount = doctorFee + platformFee;

//   const paymentId = useMemo(() => {
//     return `PAY-${Date.now()}`;
//   }, []);

//   const confirmPayment = () => {
//     const token = bookToken({
//       ...appointment,
//       doctorFee,
//       platformFee,
//       totalAmount,
//       paymentMethod: selectedMethod,
//       paymentStatus: "SUCCESS",
//       paymentId,
//     });

//     navigation.replace("TokenSuccess", { token });
//   };

//   const payNow = () => {
//     Alert.alert(
//       "Confirm Payment",
//       `Pay ₹${totalAmount} using ${selectedMethod}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Pay Now", onPress: confirmPayment },
//       ]
//     );
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View>
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

//         <InfoRow icon="calendar-outline" label="Date" value={appointment?.date} />
//         <InfoRow icon="time-outline" label="Slot" value={appointment?.slot} />
//         <InfoRow
//           icon="person-outline"
//           label="Patient"
//           value={`${appointment?.patientName}, ${appointment?.age} yrs`}
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
//               <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />
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
//         <Ionicons name="information-circle-outline" size={22} color={COLORS.warning} />
//         <Text style={styles.noteText}>
//           Token will be generated only after payment confirmation.
//         </Text>
//       </View>

//       <TouchableOpacity activeOpacity={0.9} onPress={payNow}>
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.payButton}
//         >
//           <Ionicons name="lock-closed-outline" size={20} color="#fff" />
//           <Text style={styles.payButtonText}>Pay ₹{totalAmount} & Confirm</Text>
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
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "52%",
//     textAlign: "right",
//   },

//   methodRow: {
//     height: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
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
//     height: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//   },

//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });  





























import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";

export default function PaymentScreen({ route, navigation }) {
  const { appointment } = route.params || {};
  const { bookToken } = useQueue();

  const [selectedMethod, setSelectedMethod] = useState("UPI");

  const platformFee = appointment?.platformFee || 20;
  const doctorFee = appointment?.doctorFee || 500;
  const totalAmount = doctorFee + platformFee;

  const paymentId = useMemo(() => {
    return `PAY-${Date.now()}`;
  }, []);

  const confirmPayment = () => {
    if (!appointment) {
      Alert.alert("Missing Appointment", "Please book an appointment again.");
      navigation.goBack();
      return;
    }

    const token = bookToken({
      ...appointment,
      doctorFee,
      platformFee,
      totalAmount,
      paymentMethod: selectedMethod,
      paymentStatus:
        selectedMethod === "Pay at Hospital" ? "PAY_AT_HOSPITAL" : "SUCCESS",
      paymentId:
        selectedMethod === "Pay at Hospital"
          ? `PAY-HOSPITAL-${Date.now()}`
          : paymentId,
      appointmentStatus: "CONFIRMED",
    });

    navigation.replace("TokenSuccess", { token });
  };

  const payNow = () => {
    if (Platform.OS === "web") {
      const ok = window.confirm(
        `Pay ₹${totalAmount} using ${selectedMethod}?`
      );

      if (ok) {
        confirmPayment();
      }

      return;
    }

    Alert.alert(
      "Confirm Payment",
      `Pay ₹${totalAmount} using ${selectedMethod}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Pay Now", onPress: confirmPayment },
      ]
    );
  };

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
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
          value={`${appointment?.patientName || "-"}, ${
            appointment?.age || "-"
          } yrs`}
        />

        <InfoRow
          icon="document-text-outline"
          label="Visit Type"
          value={appointment?.visitType}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Method</Text>

        {["UPI", "Card", "Net Banking", "Pay at Hospital"].map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.methodRow,
              selectedMethod === method && styles.activeMethodRow,
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <View style={styles.methodLeft}>
              <Ionicons
                name={
                  method === "UPI"
                    ? "phone-portrait-outline"
                    : method === "Card"
                    ? "card-outline"
                    : method === "Net Banking"
                    ? "globe-outline"
                    : "business-outline"
                }
                size={20}
                color={selectedMethod === method ? COLORS.primary : COLORS.muted}
              />

              <Text
                style={[
                  styles.methodText,
                  selectedMethod === method && styles.activeMethodText,
                ]}
              >
                {method}
              </Text>
            </View>

            {selectedMethod === method && (
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.primary}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fee Summary</Text>

        <AmountRow label="Doctor Fee" value={doctorFee} />
        <AmountRow label="Platform Fee" value={platformFee} />

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Payable</Text>
          <Text style={styles.totalValue}>₹{totalAmount}</Text>
        </View>
      </View>

      <View style={styles.noteCard}>
        <Ionicons
          name="information-circle-outline"
          size={22}
          color={COLORS.warning}
        />

        <Text style={styles.noteText}>
          Token will be generated only after payment confirmation.
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.9} onPress={payNow}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.payButton}
        >
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
              ? `Confirm & Pay at Hospital`
              : `Pay ₹${totalAmount} & Confirm`}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>

      <Text style={styles.infoValue}>{value || "-"}</Text>
    </View>
  );
}

function AmountRow({ label, value }) {
  return (
    <View style={styles.amountRow}>
      <Text style={styles.amountLabel}>{label}</Text>
      <Text style={styles.amountValue}>₹{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

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

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "700",
  },

  doctorCard: {
    borderRadius: 28,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },

  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 20,
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
    minHeight: 52,
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
  },

  methodText: {
    color: COLORS.text,
    fontWeight: "800",
  },

  activeMethodText: {
    color: COLORS.primary,
    fontWeight: "900",
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