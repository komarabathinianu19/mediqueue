





// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function QueueManagementScreen({ navigation }) {
//   const { tokens } = useQueue();

//   const activeTokens = tokens.filter(
//     (t) => t.status === "waiting" || t.status === "serving"
//   );

//   const grouped = {};

//   activeTokens.forEach((token) => {
//     const key = `${token.department}__${token.doctor}`;

//     if (!grouped[key]) {
//       grouped[key] = {
//         department: token.department,
//         doctor: token.doctor,
//         waiting: 0,
//         serving: 0,
//         total: 0,
//       };
//     }

//     grouped[key].total += 1;

//     if (token.status === "waiting") grouped[key].waiting += 1;
//     if (token.status === "serving") grouped[key].serving += 1;
//   });

//   const queueGroups = Object.values(grouped);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Queue Management</Text>
//           <Text style={styles.sub}>Select department and doctor queue</Text>
//         </View>

//         <View style={styles.headerIcon}>
//           <Ionicons name="people-outline" size={24} color={COLORS.staff} />
//         </View>
//       </View>

//       <FlatList
//         data={queueGroups}
//         keyExtractor={(item) => `${item.department}-${item.doctor}`}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="checkmark-circle-outline" size={44} color={COLORS.success} />
//             <Text style={styles.emptyTitle}>No active queues</Text>
//             <Text style={styles.emptySub}>
//               Patient bookings and walk-in tokens will appear here.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.queueCard}
//             activeOpacity={0.86}
//             onPress={() =>
//               navigation.navigate("DoctorQueueDetails", {
//                 department: item.department,
//                 doctor: item.doctor,
//               })
//             }
//           >
//             <View style={styles.iconBox}>
//               <Ionicons name="medkit-outline" size={24} color={COLORS.staff} />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.department}>{item.department}</Text>
//               <Text style={styles.doctor}>{item.doctor}</Text>

//               <View style={styles.statsLine}>
//                 <Text style={styles.statText}>{item.waiting} waiting</Text>
//                 <Text style={styles.dot}>•</Text>
//                 <Text style={styles.statText}>{item.serving} serving</Text>
//               </View>
//             </View>

//             <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 6, fontWeight: "600" },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//   },

//   queueCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     elevation: 2,
//   },

//   iconBox: {
//     width: 56,
//     height: 56,
//     borderRadius: 20,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   department: {
//     color: COLORS.staff,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   doctor: {
//     color: COLORS.text,
//     marginTop: 4,
//     fontWeight: "900",
//   },

//   statsLine: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 8,
//   },

//   statText: {
//     color: COLORS.muted,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   dot: { color: COLORS.muted, fontWeight: "900" },

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
//     marginTop: 6,
//     textAlign: "center",
//   },
// });  

























// import React, { useMemo } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// const slotLabels = {
//   morning: "Morning",
//   afternoon: "Afternoon",
//   night: "Night",
// };

// export default function QueueManagementScreen({ navigation }) {
//   const { tokens } = useQueue();

//   const queueGroups = useMemo(() => {
//     const activeTokens = tokens.filter(
//       (t) => t.status === "waiting" || t.status === "serving"
//     );

//     const grouped = {};

//     activeTokens.forEach((token) => {
//       const slot = token.slot || "morning";
//       const date = token.date || "Today";
//       const key = `${token.hospitalId || "h1"}__${token.department}__${token.doctor}__${date}__${slot}`;

//       if (!grouped[key]) {
//         grouped[key] = {
//           hospitalId: token.hospitalId || "h1",
//           hospitalName: token.hospitalName || "City Care Hospital",
//           department: token.department,
//           doctor: token.doctor,
//           date,
//           slot,
//           slotLabel: token.slotLabel || slotLabels[slot] || slot,
//           slotTime: token.slotTime || "",
//           waiting: 0,
//           serving: 0,
//           total: 0,
//         };
//       }

//       grouped[key].total += 1;

//       if (token.status === "waiting") grouped[key].waiting += 1;
//       if (token.status === "serving") grouped[key].serving += 1;
//     });

//     return Object.values(grouped).sort((a, b) => {
//       const slotOrder = { morning: 1, afternoon: 2, night: 3 };
//       return (slotOrder[a.slot] || 9) - (slotOrder[b.slot] || 9);
//     });
//   }, [tokens]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Queue Management</Text>
//           <Text style={styles.sub}>Manage live queue by doctor and slot</Text>
//         </View>

//         <View style={styles.headerIcon}>
//           <Ionicons name="people-outline" size={24} color={COLORS.staff} />
//         </View>
//       </View>

//       <FlatList
//         data={queueGroups}
//         keyExtractor={(item) =>
//           `${item.hospitalId}-${item.department}-${item.doctor}-${item.date}-${item.slot}`
//         }
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons
//               name="checkmark-circle-outline"
//               size={44}
//               color={COLORS.success}
//             />
//             <Text style={styles.emptyTitle}>No active queues</Text>
//             <Text style={styles.emptySub}>
//               Patient bookings and walk-in tokens will appear here.
//             </Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.queueCard}
//             activeOpacity={0.86}
//             onPress={() =>
//               navigation.navigate("DoctorQueueDetails", {
//                 hospitalId: item.hospitalId,
//                 hospitalName: item.hospitalName,
//                 department: item.department,
//                 doctor: item.doctor,
//                 date: item.date,
//                 slot: item.slot,
//                 slotLabel: item.slotLabel,
//                 slotTime: item.slotTime,
//               })
//             }
//           >
//             <View style={styles.iconBox}>
//               <Ionicons
//                 name={
//                   item.slot === "morning"
//                     ? "sunny-outline"
//                     : item.slot === "afternoon"
//                     ? "partly-sunny-outline"
//                     : "moon-outline"
//                 }
//                 size={24}
//                 color={COLORS.staff}
//               />
//             </View>

//             <View style={{ flex: 1 }}>
//               <Text style={styles.department}>{item.department}</Text>
//               <Text style={styles.doctor}>{item.doctor}</Text>

//               <Text style={styles.slotText}>
//                 {item.slotLabel} {item.slotTime ? `• ${item.slotTime}` : ""}
//               </Text>

//               <View style={styles.statsLine}>
//                 <Text style={styles.statText}>{item.waiting} waiting</Text>
//                 <Text style={styles.dot}>•</Text>
//                 <Text style={styles.statText}>{item.serving} serving</Text>
//                 <Text style={styles.dot}>•</Text>
//                 <Text style={styles.statText}>{item.total} active</Text>
//               </View>
//             </View>

//             <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 6, fontWeight: "600" },

//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//   },

//   queueCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     elevation: 2,
//   },

//   iconBox: {
//     width: 56,
//     height: 56,
//     borderRadius: 20,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   department: {
//     color: COLORS.staff,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   doctor: {
//     color: COLORS.text,
//     marginTop: 4,
//     fontWeight: "900",
//   },

//   slotText: {
//     color: COLORS.staff,
//     marginTop: 5,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   statsLine: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 8,
//     flexWrap: "wrap",
//   },

//   statText: {
//     color: COLORS.muted,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   dot: { color: COLORS.muted, fontWeight: "900" },

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
//     marginTop: 6,
//     textAlign: "center",
//   },
// }); 












































import React, { useMemo, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";
import { fetchHospitalDayTokens } from "../../services/apiService";

const slotLabels = {
  morning: "Morning",
  afternoon: "Afternoon",
  night: "Night",
};

export default function QueueManagementScreen({ navigation }) {
  const { staffHospitalData } = useHospital();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ── Fetch Tokens for this specific Hospital ───────────────────────────────
  const loadQueueData = useCallback(async () => {
    if (!staffHospitalData?.hospitalId) return;
    
    setLoading(true);
    try {
      // Fetching for today's date (passing null to API defaults to today in backend)
      const data = await fetchHospitalDayTokens(staffHospitalData.hospitalId);
      setTokens(data);
    } catch (err) {
      console.error("QueueManagement: Failed to fetch tokens", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [staffHospitalData]);

  useEffect(() => {
    loadQueueData();
  }, [loadQueueData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadQueueData();
  };

  // ── Grouping logic for the UI ─────────────────────────────────────────────
  const queueGroups = useMemo(() => {
    const activeTokens = tokens.filter(
      (t) => t.status === "waiting" || t.status === "serving"
    );

    const grouped = {};

    activeTokens.forEach((token) => {
      const slot = token.slot || "morning";
      const date = token.date || "Today";
      const key = `${token.department}__${token.doctor}__${date}__${slot}`;

      if (!grouped[key]) {
        grouped[key] = {
          hospitalId: staffHospitalData?.hospitalId,
          hospitalName: staffHospitalData?.name || "My Hospital",
          department: token.department,
          doctor: token.doctor,
          date,
          slot,
          slotLabel: slotLabels[slot] || slot,
          slotTime: token.slotTime || "",
          waiting: 0,
          serving: 0,
          total: 0,
        };
      }

      grouped[key].total += 1;
      if (token.status === "waiting") grouped[key].waiting += 1;
      if (token.status === "serving") grouped[key].serving += 1;
    });

    return Object.values(grouped).sort((a, b) => {
      const slotOrder = { morning: 1, afternoon: 2, night: 3 };
      return (slotOrder[a.slot] || 9) - (slotOrder[b.slot] || 9);
    });
  }, [tokens, staffHospitalData]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Queue Management</Text>
          <Text style={styles.sub}>Manage live queue by doctor and slot</Text>
        </View>

        <TouchableOpacity onPress={onRefresh} style={styles.headerIcon}>
          <Ionicons name="refresh-outline" size={24} color={COLORS.staff} />
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color={COLORS.staff} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={queueGroups}
          keyExtractor={(item) =>
            `${item.department}-${item.doctor}-${item.date}-${item.slot}`
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.staff]} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Ionicons
                name="checkmark-circle-outline"
                size={44}
                color={COLORS.success}
              />
              <Text style={styles.emptyTitle}>No active queues</Text>
              <Text style={styles.emptySub}>
                Patient bookings and walk-in tokens will appear here after they are created.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.queueCard}
              activeOpacity={0.86}
              onPress={() =>
                navigation.navigate("DoctorQueueDetails", {
                  hospitalId: item.hospitalId,
                  hospitalName: item.hospitalName,
                  department: item.department,
                  doctor: item.doctor,
                  date: item.date,
                  slot: item.slot,
                  slotLabel: item.slotLabel,
                  slotTime: item.slotTime,
                })
              }
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={
                    item.slot === "morning"
                      ? "sunny-outline"
                      : item.slot === "afternoon"
                      ? "partly-sunny-outline"
                      : "moon-outline"
                  }
                  size={24}
                  color={COLORS.staff}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.department}>{item.department}</Text>
                <Text style={styles.doctor}>{item.doctor}</Text>

                <Text style={styles.slotText}>
                  {item.slotLabel} {item.slotTime ? `• ${item.slotTime}` : ""}
                </Text>

                <View style={styles.statsLine}>
                  <Text style={styles.statText}>{item.waiting} waiting</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.statText}>{item.serving} serving</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.statText}>{item.total} active</Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

  header: {
    marginTop: 52,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub: { color: COLORS.muted, marginTop: 6, fontWeight: "600" },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  queueCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    elevation: 2,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  department: {
    color: COLORS.staff,
    fontSize: 17,
    fontWeight: "900",
  },

  doctor: {
    color: COLORS.text,
    marginTop: 4,
    fontWeight: "900",
  },

  slotText: {
    color: COLORS.staff,
    marginTop: 5,
    fontWeight: "900",
    fontSize: 12,
  },

  statsLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    flexWrap: "wrap",
  },

  statText: {
    color: COLORS.muted,
    fontWeight: "800",
    fontSize: 12,
  },

  dot: { color: COLORS.muted, fontWeight: "900" },

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
    marginTop: 6,
    textAlign: "center",
  },
}); 




















