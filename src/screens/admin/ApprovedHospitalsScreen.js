
// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";

// export default function ApprovedHospitalsScreen({ navigation }) {
//   const { approvedHospitals } = useHospital();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Approved Hospitals</Text>
//       <Text style={styles.sub}>Verified hospitals visible to patients</Text>

//       <FlatList
//         data={approvedHospitals}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ marginTop: 18, paddingBottom: 30 }}
//         ListEmptyComponent={
//           <View style={styles.emptyCard}>
//             <Text style={styles.emptyTitle}>No approved hospitals</Text>
//           </View>
//         }
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.card}
//             onPress={() =>
//               navigation.navigate("HospitalVerification", { hospitalId: item.id })
//             }
//           >
//             <Image source={{ uri: item.image }} style={styles.image} />

//             <View style={{ flex: 1 }}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.meta}>{item.city}</Text>
//               <Text style={styles.status}>Approved</Text>
//             </View>

//             <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
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
//     padding: 14,
//     marginBottom: 14,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   image: { width: 68, height: 68, borderRadius: 18 },

//   name: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
//   meta: { color: COLORS.muted, marginTop: 4 },
//   status: { color: COLORS.success, fontWeight: "900", marginTop: 6 },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: { color: COLORS.text, fontWeight: "900" },
// });  






















import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { fetchAllHospitals } from "../../services/apiService";

export default function ApprovedHospitalsScreen({ navigation }) {

  const [approvedHospitals, setApprovedHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ─────────────────────────────────────────────
  // LOAD APPROVED HOSPITALS
  // ─────────────────────────────────────────────
  const loadApprovedHospitals = async () => {
    try {

      const allHospitals = await fetchAllHospitals();

      // filter only APPROVED
      const approved = allHospitals.filter(
        (hospital) => hospital.status === "APPROVED"
      );

      setApprovedHospitals(approved);

    } catch (err) {
      console.log("FAILED:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadApprovedHospitals();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadApprovedHospitals();
  };

  // ─────────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.staff} />
      </View>
    );
  }

  // ─────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Approved Hospitals</Text>
      <Text style={styles.sub}>
        Verified hospitals visible to patients
      </Text>

      <FlatList
        data={approvedHospitals}
        keyExtractor={(item) => item.hospitalId}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.staff]}
          />
        }
        contentContainerStyle={{
          marginTop: 18,
          paddingBottom: 30,
        }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No approved hospitals
            </Text>
          </View>
        }
        renderItem={({ item }) => (

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("HospitalVerification", {
                hospitalId: item.hospitalId,
              })
            }
          >

            <Image
              source={{
                uri:
                  item.imageUrl ||
                  "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400",
              }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.meta}>
                {item.city}
              </Text>

              <View style={styles.badge}>
                <Ionicons
                  name="checkmark-circle"
                  size={14}
                  color="#22C55E"
                />

                <Text style={styles.status}>
                  Approved
                </Text>
              </View>

            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.muted}
            />

          </TouchableOpacity>
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

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
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
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  image: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: "#E2E8F0",
  },

  name: {
    fontWeight: "900",
    color: COLORS.text,
    fontSize: 16,
  },

  meta: {
    color: COLORS.muted,
    marginTop: 4,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },

  status: {
    color: "#22C55E",
    fontWeight: "900",
  },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    color: COLORS.text,
    fontWeight: "900",
  },
});