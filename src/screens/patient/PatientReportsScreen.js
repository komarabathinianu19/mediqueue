// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useReports } from "../../context/ReportsContext";

// const PRIMARY = COLORS?.primary || "#2563EB";

// export default function PatientReportsScreen({ navigation }) {
//   const { reports, deleteReport } = useReports();

//   const confirmDelete = (reportId) => {
//     Alert.alert("Delete Report", "Are you sure you want to delete this report?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => deleteReport(reportId),
//       },
//     ]);
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 35 }}
//       >
//         <LinearGradient
//           colors={[PRIMARY, "#1D4ED8"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <View style={styles.headerTop}>
//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={styles.backBtn}
//               onPress={() => navigation.goBack()}
//             >
//               <Ionicons name="arrow-back" size={22} color="#fff" />
//             </TouchableOpacity>

//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={styles.addHeaderBtn}
//               onPress={() => navigation.navigate("AddPatientReport")}
//             >
//               <Ionicons name="add" size={22} color={PRIMARY} />
//             </TouchableOpacity>
//           </View>

//           <Text style={styles.title}>My Medical Reports</Text>
//           <Text style={styles.sub}>
//             Save prescriptions, lab reports, scans and hospital documents safely.
//           </Text>

//           <View style={styles.summaryCard}>
//             <View>
//               <Text style={styles.summaryLabel}>Saved Reports</Text>
//               <Text style={styles.summaryValue}>{reports.length}</Text>
//             </View>

//             <View style={styles.summaryIcon}>
//               <Ionicons name="folder-open-outline" size={30} color="#fff" />
//             </View>
//           </View>
//         </LinearGradient>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent Reports</Text>

//           <TouchableOpacity
//             activeOpacity={0.85}
//             style={styles.addBtn}
//             onPress={() => navigation.navigate("AddPatientReport")}
//           >
//             <Ionicons name="add-circle-outline" size={18} color="#fff" />
//             <Text style={styles.addText}>Add Report</Text>
//           </TouchableOpacity>
//         </View>

//         {reports.length === 0 ? (
//           <View style={styles.emptyCard}>
//             <View style={styles.emptyIcon}>
//               <Ionicons name="document-attach-outline" size={42} color={PRIMARY} />
//             </View>

//             <Text style={styles.emptyTitle}>No reports saved yet</Text>
//             <Text style={styles.emptySub}>
//               Add your first report so you can access it anytime during hospital visits.
//             </Text>

//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={styles.emptyButton}
//               onPress={() => navigation.navigate("AddPatientReport")}
//             >
//               <Text style={styles.emptyButtonText}>Upload Report</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           reports.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               activeOpacity={0.88}
//               style={styles.reportCard}
//               onPress={() =>
//                 navigation.navigate("PatientReportDetails", {
//                   reportId: item.id,
//                 })
//               }
//             >
//               <View style={styles.reportThumb}>
//                 {item.fileUri ? (
//                   <Image source={{ uri: item.fileUri }} style={styles.thumbImage} />
//                 ) : (
//                   <Ionicons name="document-text-outline" size={28} color={PRIMARY} />
//                 )}
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.reportName}>{item.reportName}</Text>
//                 <Text style={styles.reportMeta}>
//                   {item.reportType} • {item.reportDate || "No date"}
//                 </Text>
//                 <Text style={styles.reportSub}>
//                   {item.hospitalName || "Hospital not added"}
//                 </Text>
//               </View>

//               <TouchableOpacity
//                 activeOpacity={0.8}
//                 style={styles.deleteBtn}
//                 onPress={() => confirmDelete(item.id)}
//               >
//                 <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
//               </TouchableOpacity>
//             </TouchableOpacity>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     flex: 1,
//   },

//   header: {
//     paddingTop: 24,
//     paddingHorizontal: 20,
//     paddingBottom: 26,
//     borderBottomLeftRadius: 34,
//     borderBottomRightRadius: 34,
//   },

//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   backBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 15,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   addHeaderBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   title: {
//     marginTop: 4,
//     color: "#fff",
//     fontSize: 27,
//     fontWeight: "900",
//   },

//   sub: {
//     marginTop: 8,
//     color: "rgba(255,255,255,0.82)",
//     fontSize: 13,
//     fontWeight: "700",
//     lineHeight: 19,
//   },

//   summaryCard: {
//     marginTop: 22,
//     backgroundColor: "rgba(255,255,255,0.16)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.22)",
//     borderRadius: 24,
//     padding: 16,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   summaryLabel: {
//     color: "rgba(255,255,255,0.78)",
//     fontSize: 12,
//     fontWeight: "900",
//     textTransform: "uppercase",
//   },

//   summaryValue: {
//     color: "#fff",
//     fontSize: 36,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   summaryIcon: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sectionHeader: {
//     marginTop: 24,
//     marginBottom: 14,
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   sectionTitle: {
//     color: COLORS.text,
//     fontSize: 18,
//     fontWeight: "900",
//   },

//   addBtn: {
//     backgroundColor: PRIMARY,
//     borderRadius: 15,
//     paddingHorizontal: 12,
//     paddingVertical: 9,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   addText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   emptyCard: {
//     marginHorizontal: 18,
//     backgroundColor: COLORS.card,
//     borderRadius: 26,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyIcon: {
//     width: 76,
//     height: 76,
//     borderRadius: 26,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   emptyTitle: {
//     color: COLORS.text,
//     fontSize: 18,
//     fontWeight: "900",
//     marginTop: 16,
//   },

//   emptySub: {
//     color: COLORS.muted,
//     fontSize: 13,
//     fontWeight: "600",
//     textAlign: "center",
//     lineHeight: 19,
//     marginTop: 7,
//   },

//   emptyButton: {
//     marginTop: 18,
//     backgroundColor: PRIMARY,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 16,
//   },

//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//   },

//   reportCard: {
//     marginHorizontal: 18,
//     marginBottom: 14,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//     elevation: 2,
//   },

//   reportThumb: {
//     width: 58,
//     height: 58,
//     borderRadius: 18,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//   },

//   thumbImage: {
//     width: "100%",
//     height: "100%",
//   },

//   reportName: {
//     color: COLORS.text,
//     fontSize: 15,
//     fontWeight: "900",
//   },

//   reportMeta: {
//     color: PRIMARY,
//     fontSize: 12,
//     fontWeight: "800",
//     marginTop: 4,
//   },

//   reportSub: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "700",
//     marginTop: 4,
//   },

//   deleteBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 14,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });  






























// src/screens/patient/PatientReportsScreen.js
// Lists all reports for the logged-in patient from backend DB

import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import { useReports } from "../../context/ReportsContext";

const PRIMARY = COLORS?.primary || "#2563EB";

export default function PatientReportsScreen({ navigation }) {
  const { reports, loading, error, fetchReports, deleteReport } = useReports();

  // Load reports from backend every time this screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchReports();
    });
    return unsubscribe;
  }, [navigation, fetchReports]);

  // ── Delete with confirmation ────────────────────────────────────────────────
  const confirmDelete = (reportId, reportName) => {
    Alert.alert(
      "Delete Report",
      `Are you sure you want to delete "${reportName}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReport(reportId);
            } catch (err) {
              Alert.alert("Error", err.message || "Could not delete report.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchReports}
            colors={[PRIMARY]}
          />
        }
      >
        {/* ── HEADER ── */}
        <LinearGradient
          colors={[PRIMARY, "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.addHeaderBtn}
              onPress={() => navigation.navigate("AddPatientReport")}
            >
              <Ionicons name="add" size={24} color={PRIMARY} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>My Medical Reports</Text>
          <Text style={styles.sub}>
            Your prescriptions, lab reports, scans and hospital documents — saved safely.
          </Text>

          <View style={styles.summaryCard}>
            <View>
              <Text style={styles.summaryLabel}>Total Reports</Text>
              <Text style={styles.summaryValue}>
                {loading ? "..." : reports.length}
              </Text>
            </View>
            <View style={styles.summaryIcon}>
              <Ionicons name="folder-open-outline" size={30} color="#fff" />
            </View>
          </View>
        </LinearGradient>

        {/* ── SECTION HEADER ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Reports</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.addBtn}
            onPress={() => navigation.navigate("AddPatientReport")}
          >
            <Ionicons name="add-circle-outline" size={18} color="#fff" />
            <Text style={styles.addText}>Add Report</Text>
          </TouchableOpacity>
        </View>

        {/* ── LOADING STATE ── */}
        {loading && reports.length === 0 && (
          <View style={styles.centerBox}>
            <ActivityIndicator size="large" color={PRIMARY} />
            <Text style={styles.loadingText}>Loading your reports…</Text>
          </View>
        )}

        {/* ── ERROR STATE ── */}
        {!loading && error && reports.length === 0 && (
          <View style={styles.emptyCard}>
            <View style={[styles.emptyIcon, { backgroundColor: "#FEF2F2" }]}>
              <Ionicons name="alert-circle-outline" size={42} color={COLORS.danger} />
            </View>
            <Text style={styles.emptyTitle}>Could not load reports</Text>
            <Text style={styles.emptySub}>{error}</Text>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.emptyButton}
              onPress={fetchReports}
            >
              <Text style={styles.emptyButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !error && reports.length === 0 && (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="document-attach-outline" size={42} color={PRIMARY} />
            </View>
            <Text style={styles.emptyTitle}>No reports saved yet</Text>
            <Text style={styles.emptySub}>
              Add your first report so you can access it anytime during hospital visits.
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.emptyButton}
              onPress={() => navigation.navigate("AddPatientReport")}
            >
              <Text style={styles.emptyButtonText}>Add First Report</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── REPORTS LIST ── */}
        {reports.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.88}
            style={styles.reportCard}
            onPress={() =>
              navigation.navigate("PatientReportDetails", { reportId: item.id })
            }
          >
            {/* Thumbnail */}
            <View style={styles.reportThumb}>
              {item.fileUri ? (
                <Image source={{ uri: item.fileUri }} style={styles.thumbImage} />
              ) : (
                <Ionicons name="document-text-outline" size={28} color={PRIMARY} />
              )}
            </View>

            {/* Info */}
            <View style={{ flex: 1 }}>
              <Text style={styles.reportName} numberOfLines={1}>
                {item.reportName}
              </Text>
              <Text style={styles.reportMeta}>
                {item.reportType}
                {item.reportDate ? ` • ${item.reportDate}` : ""}
              </Text>
              {item.hospitalName ? (
                <Text style={styles.reportSub} numberOfLines={1}>
                  {item.hospitalName}
                </Text>
              ) : null}
            </View>

            {/* Delete */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteBtn}
              onPress={() => confirmDelete(item.id, item.reportName)}
            >
              <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.background },
  container:   { flex: 1 },

  // Header
  header: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 26,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center", justifyContent: "center",
  },
  addHeaderBtn: {
    width: 42, height: 42, borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center", justifyContent: "center",
  },
  title: { marginTop: 14, color: "#fff", fontSize: 27, fontWeight: "900" },
  sub: {
    marginTop: 8, color: "rgba(255,255,255,0.82)",
    fontSize: 13, fontWeight: "700", lineHeight: 19,
  },

  // Summary card inside header
  summaryCard: {
    marginTop: 22,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.22)",
    borderRadius: 24, padding: 16,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.78)", fontSize: 12,
    fontWeight: "900", textTransform: "uppercase",
  },
  summaryValue: { color: "#fff", fontSize: 36, fontWeight: "900", marginTop: 4 },
  summaryIcon: {
    width: 58, height: 58, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center", justifyContent: "center",
  },

  // Section row
  sectionHeader: {
    marginTop: 24, marginBottom: 14,
    paddingHorizontal: 18,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900" },
  addBtn: {
    backgroundColor: PRIMARY, borderRadius: 15,
    paddingHorizontal: 12, paddingVertical: 9,
    flexDirection: "row", alignItems: "center", gap: 6,
  },
  addText: { color: "#fff", fontWeight: "900", fontSize: 12 },

  // Loading
  centerBox: {
    alignItems: "center", justifyContent: "center", paddingVertical: 40,
  },
  loadingText: { color: COLORS.muted, marginTop: 12, fontWeight: "700" },

  // Empty / error state
  emptyCard: {
    marginHorizontal: 18, backgroundColor: COLORS.card,
    borderRadius: 26, padding: 26, alignItems: "center",
    borderWidth: 1, borderColor: COLORS.border,
  },
  emptyIcon: {
    width: 76, height: 76, borderRadius: 26,
    backgroundColor: COLORS.lightBlue || "#EFF6FF",
    alignItems: "center", justifyContent: "center",
  },
  emptyTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900", marginTop: 16 },
  emptySub: {
    color: COLORS.muted, fontSize: 13, fontWeight: "600",
    textAlign: "center", lineHeight: 19, marginTop: 7,
  },
  emptyButton: {
    marginTop: 18, backgroundColor: PRIMARY,
    paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16,
  },
  emptyButtonText: { color: "#fff", fontWeight: "900" },

  // Report card
  reportCard: {
    marginHorizontal: 18, marginBottom: 14,
    backgroundColor: COLORS.card, borderRadius: 24, padding: 14,
    borderWidth: 1, borderColor: COLORS.border,
    flexDirection: "row", alignItems: "center", gap: 13, elevation: 2,
  },
  reportThumb: {
    width: 58, height: 58, borderRadius: 18,
    backgroundColor: COLORS.lightBlue || "#EFF6FF",
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  thumbImage: { width: "100%", height: "100%" },
  reportName: { color: COLORS.text, fontSize: 15, fontWeight: "900" },
  reportMeta: { color: PRIMARY, fontSize: 12, fontWeight: "800", marginTop: 4 },
  reportSub:  { color: COLORS.muted, fontSize: 12, fontWeight: "700", marginTop: 3 },
  deleteBtn: {
    width: 38, height: 38, borderRadius: 14,
    backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center",
  },
});