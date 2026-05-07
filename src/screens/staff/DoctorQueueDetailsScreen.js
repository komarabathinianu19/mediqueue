





// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
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
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, hospitalId, department, doctor, date, slot]);

//   const servingToken = queueTokens.find((t) => t.status === "serving");
//   const waitingCount = queueTokens.filter((t) => t.status === "waiting").length;

//   const handleNext = () => {
//     callNextPatient(department, doctor, slot, date, hospitalId);
//   };

//   const handleComplete = () => {
//     completeDoctorPatient(department, doctor, slot, date, hospitalId);
//   };

//   const handleSkip = () => {
//     skipDoctorPatient(department, doctor, slot, date, hospitalId);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{department}</Text>
//           <Text style={styles.sub}>{doctor}</Text>
//           <Text style={styles.slotSub}>
//             {slotLabel} {slotTime ? `• ${slotTime}` : ""} • {hospitalName || "Hospital"}
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
//         <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
//           <Text style={styles.primaryText}>Next</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.secondaryBtn} onPress={handleComplete}>
//           <Text style={styles.secondaryText}>Complete</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.dangerBtn} onPress={handleSkip}>
//           <Text style={styles.dangerText}>Skip</Text>
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
//           <View style={[styles.card, item.status === "serving" && styles.servingCard]}>
//             <View style={styles.tokenBox}>
//               <Text style={styles.token}>{item.tokenNo}</Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.patientName}</Text>
//               <Text style={styles.meta}>Age: {item.age || "-"}</Text>
//               <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
//               <Text style={styles.meta}>Visit: {item.visitType || "New Patient"}</Text>
//               <Text style={styles.meta}>
//                 Payment: {item.paymentStatus || "PENDING"}
//               </Text>
//             </View>

//             <Text style={styles.status}>{item.status}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },

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

//   title: { fontSize: 23, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

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

//   nowLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
//   nowToken: { color: "#fff", fontSize: 44, fontWeight: "900", marginTop: 6 },
//   nowName: { color: "rgba(255,255,255,0.9)", fontWeight: "700", marginTop: 6 },

//   actionRow: { flexDirection: "row", gap: 8, marginTop: 16 },

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

//   primaryText: { color: "#fff", fontWeight: "900" },
//   secondaryText: { color: COLORS.staff, fontWeight: "900" },
//   dangerText: { color: COLORS.danger, fontWeight: "900" },

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

//   token: { color: COLORS.staff, fontWeight: "900", fontSize: 16 },
//   name: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },

//   status: {
//     color: COLORS.warning,
//     fontWeight: "900",
//     textTransform: "capitalize",
//     fontSize: 12,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 24,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: { color: COLORS.text, fontWeight: "900" },
// }); 































// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
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
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   }, [tokens, hospitalId, department, doctor, date, slot]);

//   const servingToken = queueTokens.find((t) => t.status === "serving");
//   const waitingCount = queueTokens.filter((t) => t.status === "waiting").length;

//   const handleNext = () => {
//     callNextPatient(department, doctor, slot, date, hospitalId);
//   };

//   const handleComplete = () => {
//     // Staff clicks "Complete", navigate to feedback form for the patient
//     navigation.navigate("PatientTab", {
//       patientName: servingToken?.patientName,
//       hospitalName: hospitalName || "Hospital", // Pass the hospital details
//     });
//   };

//   const handleSkip = () => {
//     skipDoctorPatient(department, doctor, slot, date, hospitalId);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{department}</Text>
//           <Text style={styles.sub}>{doctor}</Text>
//           <Text style={styles.slotSub}>
//             {slotLabel} {slotTime ? `• ${slotTime}` : ""} • {hospitalName || "Hospital"}
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
//         <TouchableOpacity style={styles.primaryBtn} onPress={handleNext}>
//           <Text style={styles.primaryText}>Next</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.secondaryBtn} onPress={handleComplete}>
//           <Text style={styles.secondaryText}>Complete</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.dangerBtn} onPress={handleSkip}>
//           <Text style={styles.dangerText}>Skip</Text>
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
//           <View style={[styles.card, item.status === "serving" && styles.servingCard]}>
//             <View style={styles.tokenBox}>
//               <Text style={styles.token}>{item.tokenNo}</Text>
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.patientName}</Text>
//               <Text style={styles.meta}>Age: {item.age || "-"}</Text>
//               <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
//               <Text style={styles.meta}>Visit: {item.visitType || "New Patient"}</Text>
//               <Text style={styles.meta}>
//                 Payment: {item.paymentStatus || "PENDING"}
//               </Text>
//             </View>

//             <Text style={styles.status}>{item.status}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },

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

//   title: { fontSize: 23, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

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

//   nowLabel: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
//   nowToken: { color: "#fff", fontSize: 44, fontWeight: "900", marginTop: 6 },
//   nowName: { color: "rgba(255,255,255,0.9)", fontWeight: "700", marginTop: 6 },

//   actionRow: { flexDirection: "row", gap: 8, marginTop: 16 },

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

//   primaryText: { color: "#fff", fontWeight: "900" },
//   secondaryText: { color: COLORS.staff, fontWeight: "900" },
//   dangerText: { color: COLORS.danger, fontWeight: "900" },

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

//   token: { color: COLORS.staff, fontWeight: "900", fontSize: 16 },
//   name: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },

//   status: {
//     color: COLORS.warning,
//     fontWeight: "900",
//     textTransform: "capitalize",
//     fontSize: 12,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 24,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: { color: COLORS.text, fontWeight: "900" },
// });  
























import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";

export default function DoctorQueueDetailsScreen({ route, navigation }) {
  const {
    hospitalId,
    hospitalName,
    department,
    doctor,
    date,
    slot = "morning",
    slotLabel = "Morning",
    slotTime = "",
  } = route.params || {};

  const {
    tokens,
    callNextPatient,
    completeDoctorPatient,
    skipDoctorPatient,
  } = useQueue();

  const queueTokens = useMemo(() => {
    return tokens
      .filter(
        (t) =>
          (!hospitalId || t.hospitalId === hospitalId) &&
          t.department === department &&
          t.doctor === doctor &&
          t.date === date &&
          t.slot === slot &&
          (t.status === "waiting" || t.status === "serving")
      )
      .sort((a, b) => {
        const aNo =
          a.tokenNumber ||
          Number(String(a.tokenNo || "").replace(/\D/g, "")) ||
          0;

        const bNo =
          b.tokenNumber ||
          Number(String(b.tokenNo || "").replace(/\D/g, "")) ||
          0;

        return aNo - bNo;
      });
  }, [tokens, hospitalId, department, doctor, date, slot]);

  const servingToken = queueTokens.find((t) => t.status === "serving");
  const waitingCount = queueTokens.filter((t) => t.status === "waiting").length;

  const handleNext = () => {
    /**
     * NEXT button flow:
     * 1. Current serving patient becomes completed.
     * 2. Next waiting patient becomes serving.
     * 3. Patient side feedback button enables for completed patient.
     */

    if (servingToken) {
      completeDoctorPatient(department, doctor, slot, date, hospitalId);

      setTimeout(() => {
        callNextPatient(department, doctor, slot, date, hospitalId);
      }, 100);

      return;
    }

    callNextPatient(department, doctor, slot, date, hospitalId);
  };

  const handleComplete = () => {
    /**
     * COMPLETE button flow:
     * 1. Current serving patient becomes completed.
     * 2. No next patient will be called.
     * 3. Patient side feedback button enables for completed patient.
     */

    if (!servingToken) {
      Alert.alert("No Patient", "No patient is currently serving.");
      return;
    }

    completeDoctorPatient(department, doctor, slot, date, hospitalId);

    Alert.alert(
      "Appointment Completed",
      `${servingToken.patientName || "Patient"} appointment completed. Feedback is now enabled in patient visits.`
    );
  };

  const handleSkip = () => {
    if (!servingToken) {
      Alert.alert("No Patient", "No patient is currently serving.");
      return;
    }

    skipDoctorPatient(department, doctor, slot, date, hospitalId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{department}</Text>
          <Text style={styles.sub}>{doctor}</Text>
          <Text style={styles.slotSub}>
            {slotLabel} {slotTime ? `• ${slotTime}` : ""} •{" "}
            {hospitalName || "Hospital"}
          </Text>
        </View>
      </View>

      <View style={styles.nowCard}>
        <Text style={styles.nowLabel}>Now Serving</Text>

        <Text style={styles.nowToken}>{servingToken?.tokenNo || "None"}</Text>

        <Text style={styles.nowName}>
          {servingToken?.patientName || "No patient currently serving"}
        </Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.primaryText}>
            {servingToken ? "Complete & Next" : "Next"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.secondaryBtn,
            !servingToken && styles.disabledBtn,
          ]}
          activeOpacity={0.85}
          onPress={handleComplete}
          disabled={!servingToken}
        >
          <Text
            style={[
              styles.secondaryText,
              !servingToken && styles.disabledText,
            ]}
          >
            Complete
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.dangerBtn,
            !servingToken && styles.disabledBtn,
          ]}
          activeOpacity={0.85}
          onPress={handleSkip}
          disabled={!servingToken}
        >
          <Text
            style={[
              styles.dangerText,
              !servingToken && styles.disabledText,
            ]}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Waiting Queue ({waitingCount})</Text>

      <FlatList
        data={queueTokens}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No patients in this slot queue</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.status === "serving" && styles.servingCard,
            ]}
          >
            <View style={styles.tokenBox}>
              <Text style={styles.token}>{item.tokenNo}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.patientName}</Text>
              <Text style={styles.meta}>Age: {item.age || "-"}</Text>
              <Text style={styles.meta}>Symptoms: {item.symptoms || "-"}</Text>
              <Text style={styles.meta}>
                Visit: {item.visitType || "New Patient"}
              </Text>
              <Text style={styles.meta}>
                Payment: {item.paymentStatus || "PENDING"}
              </Text>
            </View>

            <Text
              style={[
                styles.status,
                item.status === "serving" && styles.servingStatus,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18,
  },

  header: {
    marginTop: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
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
    fontSize: 23,
    fontWeight: "900",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "700",
  },

  slotSub: {
    color: COLORS.staff,
    marginTop: 4,
    fontWeight: "900",
    fontSize: 12,
  },

  nowCard: {
    backgroundColor: COLORS.staff,
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
  },

  nowLabel: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "800",
  },

  nowToken: {
    color: "#fff",
    fontSize: 44,
    fontWeight: "900",
    marginTop: 6,
  },

  nowName: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "700",
    marginTop: 6,
  },

  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },

  primaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: COLORS.staff,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryBtn: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    alignItems: "center",
    justifyContent: "center",
  },

  dangerBtn: {
    flex: 1,
    height: 46,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledBtn: {
    backgroundColor: "#F1F5F9",
    borderColor: "#E2E8F0",
  },

  primaryText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
  },

  secondaryText: {
    color: COLORS.staff,
    fontWeight: "900",
    fontSize: 12,
  },

  dangerText: {
    color: COLORS.danger,
    fontWeight: "900",
    fontSize: 12,
  },

  disabledText: {
    color: COLORS.muted,
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    gap: 14,
  },

  servingCard: {
    backgroundColor: "#ECFDF5",
    borderColor: COLORS.staff,
  },

  tokenBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  token: {
    color: COLORS.staff,
    fontWeight: "900",
    fontSize: 16,
  },

  name: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 16,
  },

  meta: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
  },

  status: {
    color: COLORS.warning,
    fontWeight: "900",
    textTransform: "capitalize",
    fontSize: 12,
  },

  servingStatus: {
    color: COLORS.staff,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
  },
});