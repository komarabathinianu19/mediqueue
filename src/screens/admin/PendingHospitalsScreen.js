





// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";

// export default function PendingHospitalsScreen({ navigation }) {
//   const { pendingHospitals } = useHospital();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Pending Hospitals</Text>
//       <Text style={styles.sub}>Verify hospital details and documents</Text>

//       <FlatList
//         data={pendingHospitals}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ marginTop: 18, paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Ionicons name="checkmark-circle-outline" size={46} color={COLORS.success} />
//             <Text style={styles.emptyTitle}>No pending requests</Text>
//             <Text style={styles.emptySub}>New hospital registrations will show here.</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             activeOpacity={0.85}
//             onPress={() =>
//               navigation.navigate("HospitalVerification", { hospitalId: item.id })
//             }
//           >
//             <Image source={{ uri: item.image }} style={styles.image} />

//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.meta}>{item.city}</Text>
//               <Text style={styles.date}>Owner: {item.owner}</Text>
//             </View>

//             <Text style={styles.pending}>Pending</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },

//   title: {
//     marginTop: 52,
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: { color: COLORS.muted, marginTop: 6 },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 16,
//     marginBottom: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   image: {
//     width: 64,
//     height: 64,
//     borderRadius: 18,
//     backgroundColor: "#F5F3FF",
//   },

//   name: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4 },
//   date: { color: COLORS.muted, marginTop: 3, fontSize: 12 },

//   pending: { color: COLORS.warning, fontWeight: "900" },

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
//     fontSize: 18,
//     fontWeight: "900",
//     marginTop: 12,
//   },

//   emptySub: {
//     color: COLORS.muted,
//     textAlign: "center",
//     marginTop: 6,
//   },
// });  

























import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { fetchPendingHospitals, approveHospital, rejectHospital } from "../../services/apiService";
import { showAlert } from "../../utility/showAlert";

export default function PendingHospitalsScreen({ navigation }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // hospitalId being acted on

  // ── Load pending hospitals from backend ────────────────────────────────────
  const loadPending = useCallback(async () => {
    try {
      const data = await fetchPendingHospitals();
      setHospitals(data);
    } catch (err) {
      showAlert("Error", err.message || "Failed to load pending hospitals.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadPending();
  }, [loadPending]);

  const onRefresh = () => {
    setRefreshing(true);
    loadPending();
  };

  // ── APPROVE ────────────────────────────────────────────────────────────────
  const handleApprove = (hospitalId, hospitalName) => {
    Alert.alert(
      "Approve Hospital",
      `Approve "${hospitalName}"? They will be able to login immediately.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Approve",
          style: "default",
          onPress: async () => {
            setActionLoading(hospitalId);
            try {
              await approveHospital(hospitalId);
              setHospitals((prev) => prev.filter((h) => h.hospitalId !== hospitalId));
              showAlert("Approved ✓", `${hospitalName} has been approved.`);
            } catch (err) {
              showAlert("Error", err.message || "Failed to approve.");
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  // ── REJECT ─────────────────────────────────────────────────────────────────
  const handleReject = (hospitalId, hospitalName) => {
    Alert.alert(
      "Reject Hospital",
      `Reject "${hospitalName}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: async () => {
            setActionLoading(hospitalId);
            try {
              await rejectHospital(hospitalId);
              setHospitals((prev) => prev.filter((h) => h.hospitalId !== hospitalId));
              showAlert("Rejected", `${hospitalName} has been rejected.`);
            } catch (err) {
              showAlert("Error", err.message || "Failed to reject.");
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  // ── RENDER ITEM ────────────────────────────────────────────────────────────
// ── RENDER ITEM ────────────────────────────────────────────────────────────
const renderItem = ({ item, index }) => (
  <MotiView
    from={{ opacity: 0, translateY: 20 }}
    animate={{ opacity: 1, translateY: 0 }}
    transition={{ type: "timing", duration: 400, delay: index * 80 }}
  >
    <View style={styles.card}>
      
      {/* LEFT CLICKABLE AREA */}
      <TouchableOpacity
        style={styles.cardContent}
        activeOpacity={0.85}
        onPress={() => {
          console.log("Opening HospitalVerification:", item.hospitalId);

          navigation.navigate("HospitalVerification", {
            hospitalId: item.hospitalId,
          });
        }}
      >
        {/* Hospital image */}
        <Image
          source={{
            uri:
              item.imageUrl ||
              "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400",
          }}
          style={styles.image}
        />

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>

          <Text style={styles.meta}>
            {item.city || "—"}
          </Text>

          <Text style={styles.meta}>
            Owner: {item.ownerName || "—"}
          </Text>

          {/* Hospital ID badge */}
          <View style={styles.idBadge}>
            <Ionicons
              name="barcode-outline"
              size={13}
              color={COLORS.staff}
            />

            <Text style={styles.idText}>
              {item.hospitalId}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

    </View>
  </MotiView>
);
  // ── FULL SCREEN LOADER ─────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.staff} size="large" />
        <Text style={styles.loadingText}>Loading pending hospitals…</Text>
      </View>
    );
  }

  // ── MAIN RENDER ────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Hospitals</Text>
      <Text style={styles.sub}>Verify hospital details and documents</Text>

      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.hospitalId}
        contentContainerStyle={{ marginTop: 18, paddingBottom: 30 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.staff}
            colors={[COLORS.staff]}
          />
        }
        ListEmptyComponent={
          <MotiView
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "timing", duration: 400 }}
            style={styles.emptyCard}
          >
            <Ionicons name="checkmark-circle-outline" size={52} color={COLORS.success || "#22C55E"} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>No pending hospital registrations right now.</Text>
          </MotiView>
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
  loadingText: { marginTop: 14, color: COLORS.muted, fontWeight: "600" },

  title: { marginTop: 52, fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub: { color: COLORS.muted, marginTop: 6 },
  cardContent: {
  flex: 1,
  flexDirection: "row",
  gap: 12,
},

card: {
  backgroundColor: COLORS.card,
  borderRadius: 20,
  padding: 14,
  marginBottom: 14,
  flexDirection: "row",
  alignItems: "flex-start",
  borderWidth: 1,
  borderColor: COLORS.border,
  elevation: 3,
  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 8,
},
  image: {
    width: 66,
    height: 66,
    borderRadius: 18,
    backgroundColor: "#F0FDFA",
  },
  infoBox: { flex: 1, gap: 3 },
  name: { fontWeight: "900", color: COLORS.text, fontSize: 15 },
  meta: { color: COLORS.muted, fontSize: 12 },
  idBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
    backgroundColor: "#F0FDFA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.staff + "30",
  },
  idText: { color: COLORS.staff, fontSize: 11, fontWeight: "800", letterSpacing: 1 },

  actionsCol: { alignItems: "center", gap: 6, minWidth: 78 },
  pendingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFF7ED",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#F59E0B40",
  },
  pendingText: { color: "#F59E0B", fontWeight: "900", fontSize: 11 },

  approveBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#22C55E",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: "100%",
    justifyContent: "center",
  },
  approveBtnText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  rejectBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#EF444440",
  },
  rejectBtnText: { color: "#EF4444", fontWeight: "900", fontSize: 12 },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 36,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 20,
  },
  emptyTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900", marginTop: 14 },
  emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6, lineHeight: 20 },
});