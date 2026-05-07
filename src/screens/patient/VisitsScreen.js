


















// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function VisitsScreen({ navigation }) {
//   const { tokens } = useQueue();

//   const visits = [...tokens].reverse();

//   const openFeedback = (item) => {
//     navigation.navigate("PatientFeedback", {
//       tokenId: item.id,
//       patientName: item.patientName,
//       hospitalName: item.hospitalName,
//       department: item.department,
//       doctor: item.doctor || "Any Available",
//       tokenNo: item.tokenNo,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Visits</Text>
//       <Text style={styles.sub}>Your active and previous token history</Text>

//       <FlatList
//         data={visits}
//         keyExtractor={(item) => item.id}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="calendar-outline" size={44} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No visits yet</Text>
//             <Text style={styles.emptySub}>
//               Your booked hospital tokens will appear here.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <View style={styles.visitCard}>
//             <View style={styles.topRow}>
//               <View style={styles.tokenBox}>
//                 <Text style={styles.tokenText}>{item.tokenNo}</Text>
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.hospitalName}>{item.hospitalName}</Text>
//                 <Text style={styles.department}>
//                   {item.department} • {item.doctor || "Any Available"}
//                 </Text>
//               </View>

//               <Text
//                 style={[
//                   styles.statusChip,
//                   item.status === "completed" && styles.completedChip,
//                   item.status === "serving" && styles.servingChip,
//                   item.status === "skipped" && styles.skippedChip,
//                 ]}
//               >
//                 {item.status}
//               </Text>
//             </View>

//             <View style={styles.detailsRow}>
//               <Info icon="person-outline" text={item.patientName} />
//               <Info icon="time-outline" text={item.createdAt} />
//             </View>

//             <View style={styles.reasonBox}>
//               <Ionicons
//                 name="document-text-outline"
//                 size={16}
//                 color={COLORS.primary}
//               />
//               <Text style={styles.reasonText}>
//                 {item.symptoms || "No symptoms added"}
//               </Text>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={styles.feedbackBtn}
//               onPress={() => openFeedback(item)}
//             >
//               <View style={styles.feedbackIconBox}>
//                 <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.feedbackTitle}>Give Feedback</Text>
//                 <Text style={styles.feedbackSub}>
//                   Share your hospital visit experience
//                 </Text>
//               </View>

//               <Ionicons name="chevron-forward" size={20} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// function Info({ icon, text }) {
//   return (
//     <View style={styles.infoPill}>
//       <Ionicons name={icon} size={15} color={COLORS.primary} />
//       <Text style={styles.infoText}>{text || "-"}</Text>
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

//   visitCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   topRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   tokenBox: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   tokenText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   hospitalName: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 16,
//   },

//   department: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     fontSize: 12,
//     marginTop: 4,
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

//   completedChip: {
//     backgroundColor: "#DCFCE7",
//     color: COLORS.success,
//   },

//   servingChip: {
//     backgroundColor: "#EFF6FF",
//     color: COLORS.primary,
//   },

//   skippedChip: {
//     backgroundColor: "#FEF2F2",
//     color: COLORS.danger,
//   },

//   detailsRow: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 14,
//   },

//   infoPill: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     borderRadius: 14,
//     padding: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   infoText: {
//     color: COLORS.text,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   reasonBox: {
//     marginTop: 12,
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 14,
//     padding: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   reasonText: {
//     color: COLORS.primary,
//     fontWeight: "800",
//     flex: 1,
//     fontSize: 12,
//   },

//   feedbackBtn: {
//     marginTop: 14,
//     backgroundColor: COLORS.primary,
//     borderRadius: 18,
//     padding: 13,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     elevation: 3,
//   },

//   feedbackIconBox: {
//     width: 38,
//     height: 38,
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   feedbackTitle: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "900",
//   },

//   feedbackSub: {
//     color: "rgba(255,255,255,0.78)",
//     fontSize: 11,
//     fontWeight: "700",
//     marginTop: 2,
//   },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 30,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: {
//     color: COLORS.text,
//     fontWeight: "900",
//     fontSize: 18,
//     marginTop: 12,
//   },

//   emptySub: {
//     color: COLORS.muted,
//     textAlign: "center",
//     marginTop: 6,
//   },
// });












































import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";

export default function VisitsScreen({ navigation }) {
  const { tokens } = useQueue();

  const visits = [...tokens].reverse();

  const openFeedback = (item) => {
    navigation.navigate("PatientFeedback", {
      tokenId: item.id,
      patientName: item.patientName,
      hospitalName: item.hospitalName,
      department: item.department,
      doctor: item.doctor || "Any Available",
      tokenNo: item.tokenNo,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Visits</Text>
      <Text style={styles.sub}>Your active and previous token history</Text>

      <FlatList
        data={visits}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-outline" size={44} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No visits yet</Text>
            <Text style={styles.emptySub}>
              Your booked hospital tokens will appear here.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.visitCard}>
            <View style={styles.topRow}>
              <View style={styles.tokenBox}>
                <Text style={styles.tokenText}>{item.tokenNo}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.hospitalName}>{item.hospitalName}</Text>
                <Text style={styles.department}>
                  {item.department} • {item.doctor || "Any Available"}
                </Text>
              </View>

              <Text
                style={[
                  styles.statusChip,
                  item.status === "completed" && styles.completedChip,
                  item.status === "serving" && styles.servingChip,
                  item.status === "skipped" && styles.skippedChip,
                ]}
              >
                {item.status}
              </Text>
            </View>

            <View style={styles.detailsRow}>
              <Info icon="person-outline" text={item.patientName} />
              <Info icon="time-outline" text={item.createdAt} />
            </View>

            <View style={styles.reasonBox}>
              <Ionicons
                name="document-text-outline"
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.reasonText}>
                {item.symptoms || "No symptoms added"}
              </Text>
            </View>

           {item.status === "completed" ? (
  <TouchableOpacity
    activeOpacity={0.85}
    style={styles.feedbackBtn}
    onPress={() => openFeedback(item)}
  >
    <View style={styles.feedbackIconBox}>
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={18}
        color="#fff"
      />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.feedbackTitle}>Give Feedback</Text>
      <Text style={styles.feedbackSub}>
        Share your hospital visit experience
      </Text>
    </View>

    <Ionicons name="chevron-forward" size={20} color="#fff" />
  </TouchableOpacity>
) : (
  <View style={styles.feedbackLockedBox}>
    <Ionicons name="lock-closed-outline" size={16} color={COLORS.muted} />
    <Text style={styles.feedbackLockedText}>
      Feedback available after appointment completed
    </Text>
  </View>
)}
          </View>
        )}
      />
    </View>
  );
}

function Info({ icon, text }) {
  return (
    <View style={styles.infoPill}>
      <Ionicons name={icon} size={15} color={COLORS.primary} />
      <Text style={styles.infoText}>{text || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  title: {
    marginTop: 52,
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.muted,
    marginTop: 6,
    fontWeight: "600",
  },

  visitCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  tokenBox: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  tokenText: {
    color: COLORS.primary,
    fontWeight: "900",
    fontSize: 16,
  },

  hospitalName: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 16,
  },

  department: {
    color: COLORS.muted,
    fontWeight: "700",
    fontSize: 12,
    marginTop: 4,
  },

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

  completedChip: {
    backgroundColor: "#DCFCE7",
    color: COLORS.success,
  },

  servingChip: {
    backgroundColor: "#EFF6FF",
    color: COLORS.primary,
  },

  skippedChip: {
    backgroundColor: "#FEF2F2",
    color: COLORS.danger,
  },

  detailsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  infoPill: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 14,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  infoText: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 12,
  },

  reasonBox: {
    marginTop: 12,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  reasonText: {
    color: COLORS.primary,
    fontWeight: "800",
    flex: 1,
    fontSize: 12,
  },

  feedbackBtn: {
    marginTop: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 3,
  },

  feedbackIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  feedbackTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },

  feedbackSub: {
    color: "rgba(255,255,255,0.78)",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 18,
    marginTop: 12,
  },

  emptySub: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
  },
});




