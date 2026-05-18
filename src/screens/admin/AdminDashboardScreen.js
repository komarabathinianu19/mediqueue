

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";

// export default function AdminDashboardScreen({ navigation }) {
//   const handleLogout = () => {
//     navigation.getParent()?.reset({
//       index: 0,
//       routes: [{ name: "RoleSelect" }],
//     });
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Super Admin</Text>
//           <Text style={styles.sub}>Platform Verification Dashboard</Text>
//         </View>

//         <TouchableOpacity style={styles.logoutIconBtn} onPress={handleLogout}>
//           <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.grid}>
//         <Stat title="Pending Hospitals" value="12" color={COLORS.warning} />
//         <Stat title="Approved Hospitals" value="48" color={COLORS.success} />
//         <Stat title="Rejected Hospitals" value="3" color={COLORS.danger} />
//         <Stat title="Today Bookings" value="240" color={COLORS.primary} />
//         <Stat title="Active Queues" value="31" color={COLORS.text} />
//         <Stat title="Complaints" value="8" color={COLORS.danger} />
//       </View>

//       <TouchableOpacity
//         style={styles.mainAction}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Pending")}
//       >
//         <View style={{ flex: 1 }}>
//           <Text style={styles.mainTitle}>Review Pending Hospitals</Text>
//           <Text style={styles.mainSub}>
//             Verify documents and approve hospitals
//           </Text>
//         </View>

//         <Ionicons name="chevron-forward" size={24} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.sectionTitle}>Quick Actions</Text>

//       <TouchableOpacity
//         style={styles.action}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Approved")}
//       >
//         <View style={styles.actionIcon}>
//           <Ionicons name="business-outline" size={23} color={COLORS.admin} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.actionTitle}>Approved Hospitals</Text>
//           <Text style={styles.actionSub}>View verified hospitals</Text>
//         </View>
//         <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.action}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Bookings")}
//       >
//         <View style={styles.actionIcon}>
//           <Ionicons name="list-outline" size={23} color={COLORS.admin} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.actionTitle}>Booking Monitor</Text>
//           <Text style={styles.actionSub}>Track today’s patient tokens</Text>
//         </View>
//         <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.action}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Complaints")}
//       >
//         <View style={styles.actionIconDanger}>
//           <Ionicons name="warning-outline" size={23} color={COLORS.danger} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.actionTitle}>Complaints / Reports</Text>
//           <Text style={styles.actionSub}>Review patient complaints</Text>
//         </View>
//         <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function Stat({ title, value, color }) {
//   return (
//     <View style={styles.stat}>
//       <Text style={styles.statTitle}>{title}</Text>
//       <Text style={[styles.statValue, { color }]}>{value}</Text>
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
//     marginBottom: 22,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   logoutIconBtn: {
//     width: 46,
//     height: 46,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//   },

//   stat: {
//     width: "48%",
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.06,
//     shadowRadius: 14,
//     elevation: 3,
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontWeight: "800",
//     fontSize: 12,
//   },

//   statValue: {
//     fontSize: 28,
//     fontWeight: "900",
//     marginTop: 10,
//   },

//   mainAction: {
//     backgroundColor: COLORS.admin,
//     borderRadius: 24,
//     padding: 22,
//     marginTop: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.12,
//     shadowRadius: 18,
//     elevation: 5,
//   },

//   mainTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "900",
//   },

//   mainSub: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 26,
//     marginBottom: 12,
//   },

//   action: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.05,
//     shadowRadius: 12,
//     elevation: 2,
//   },

//   actionIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: "#F5F3FF",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   actionIconDanger: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   actionTitle: {
//     fontSize: 16,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   actionSub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   logoutBtn: {
//     marginTop: 12,
//     marginBottom: 34,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },

//   logoutText: {
//     color: COLORS.danger,
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  










// // src/screens/admin/AdminDashboardScreen.js
// // Fetches real stat counts from backend (pending, approved, rejected hospitals, bookings)

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
//   RefreshControl,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { CommonActions } from "@react-navigation/native";

// const BASE_URL = "http://192.168.0.3:8080/api"; // same IP as apiService

// export default function AdminDashboardScreen({ navigation }) {
//   const [stats, setStats]         = useState(null);
//   const [loading, setLoading]     = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError]         = useState("");

//   const loadStats = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       setError("");

//       const token = await AsyncStorage.getItem("token");
//       const headers = {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       };

//       // Fetch pending and approved hospitals in parallel
//       const [pendingRes, approvedRes, allRes] = await Promise.all([
//         fetch(`${BASE_URL}/hospitals/pending`,  { headers }),
//         fetch(`${BASE_URL}/hospitals/approved`, { headers }),
//         fetch(`${BASE_URL}/hospitals/all`,      { headers }).catch(() => ({ ok: false })),
//       ]);

//       const pending  = pendingRes.ok  ? await pendingRes.json()  : [];
//       const approved = approvedRes.ok ? await approvedRes.json() : [];
//       const all      = allRes.ok      ? await allRes.json()      : [];

//       // Rejected = all - pending - approved
//       const rejectedCount = Math.max(
//         0,
//         (Array.isArray(all) ? all.length : 0) -
//         (Array.isArray(pending) ? pending.length : 0) -
//         (Array.isArray(approved) ? approved.length : 0)
//       );

//       setStats({
//         pending:  Array.isArray(pending)  ? pending.length  : 0,
//         approved: Array.isArray(approved) ? approved.length : 0,
//         rejected: rejectedCount,
//         // Placeholders — wire these up once you have booking/queue endpoints
//         todayBookings: "—",
//         activeQueues:  "—",
//         complaints:    "—",
//       });
//     } catch (err) {
//       console.log("AdminDashboard stats error:", err.message);
//       setError("Could not load stats. Check backend connection.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     loadStats(true);
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.clear();
//     navigation.dispatch(
//       CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
//     );
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       refreshControl={
//         <RefreshControl
//           refreshing={refreshing}
//           onRefresh={onRefresh}
//           colors={[COLORS.admin || "#7C3AED"]}
//         />
//       }
//     >
//       {/* ── HEADER ── */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>Super Admin</Text>
//           <Text style={styles.sub}>Platform Verification Dashboard</Text>
//         </View>

//         <TouchableOpacity style={styles.logoutIconBtn} onPress={handleLogout}>
//           <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
//         </TouchableOpacity>
//       </View>

//       {/* ── ERROR BANNER ── */}
//       {error ? (
//         <View style={styles.errorBox}>
//           <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
//           <Text style={styles.errorText}>{error}</Text>
//           <TouchableOpacity onPress={() => loadStats()}>
//             <Text style={styles.retryText}>Retry</Text>
//           </TouchableOpacity>
//         </View>
//       ) : null}

//       {/* ── STAT GRID ── */}
//       {loading ? (
//         <View style={styles.loadingGrid}>
//           <ActivityIndicator size="large" color={COLORS.admin || "#7C3AED"} />
//           <Text style={styles.loadingText}>Loading stats…</Text>
//         </View>
//       ) : (
//         <View style={styles.grid}>
//           <Stat
//             title="Pending Hospitals"
//             value={stats?.pending ?? "—"}
//             color={COLORS.warning || "#F59E0B"}
//             icon="hourglass-outline"
//             onPress={() => navigation.navigate("Pending")}
//           />
//           <Stat
//             title="Approved Hospitals"
//             value={stats?.approved ?? "—"}
//             color={COLORS.success || "#16A34A"}
//             icon="checkmark-circle-outline"
//             onPress={() => navigation.navigate("Approved")}
//           />
//           <Stat
//             title="Rejected Hospitals"
//             value={stats?.rejected ?? "—"}
//             color={COLORS.danger || "#EF4444"}
//             icon="close-circle-outline"
//           />
//           <Stat
//             title="Today Bookings"
//             value={stats?.todayBookings ?? "—"}
//             color={COLORS.primary || "#2563EB"}
//             icon="ticket-outline"
//             onPress={() => navigation.navigate("Bookings")}
//           />
//           <Stat
//             title="Active Queues"
//             value={stats?.activeQueues ?? "—"}
//             color={COLORS.text || "#1E293B"}
//             icon="pulse-outline"
//           />
//           <Stat
//             title="Complaints"
//             value={stats?.complaints ?? "—"}
//             color={COLORS.danger || "#EF4444"}
//             icon="warning-outline"
//             onPress={() => navigation.navigate("Complaints")}
//           />
//         </View>
//       )}

//       {/* ── MAIN CTA ── */}
//       <TouchableOpacity
//         style={styles.mainAction}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Pending")}
//       >
//         <View style={{ flex: 1 }}>
//           <Text style={styles.mainTitle}>Review Pending Hospitals</Text>
//           <Text style={styles.mainSub}>
//             {stats?.pending
//               ? `${stats.pending} hospital${stats.pending !== 1 ? "s" : ""} waiting for verification`
//               : "Verify documents and approve hospitals"}
//           </Text>
//         </View>
//         <Ionicons name="chevron-forward" size={24} color="#fff" />
//       </TouchableOpacity>

//       {/* ── QUICK ACTIONS ── */}
//       <Text style={styles.sectionTitle}>Quick Actions</Text>

//       <ActionRow
//         icon="business-outline"
//         title="Approved Hospitals"
//         sub="View all verified hospitals"
//         onPress={() => navigation.navigate("Approved")}
//       />
//       <ActionRow
//         icon="list-outline"
//         title="Booking Monitor"
//         sub="Track today's patient tokens"
//         onPress={() => navigation.navigate("Bookings")}
//       />
//       <ActionRow
//         icon="warning-outline"
//         title="Complaints / Reports"
//         sub="Review patient complaints"
//         danger
//         onPress={() => navigation.navigate("Complaints")}
//       />

//       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//         <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// // ── Sub-components ─────────────────────────────────────────────────────────────

// function Stat({ title, value, color, icon, onPress }) {
//   const Wrapper = onPress ? TouchableOpacity : View;
//   return (
//     <Wrapper
//       style={styles.stat}
//       activeOpacity={0.8}
//       onPress={onPress}
//     >
//       <Ionicons name={icon} size={22} color={color} style={{ marginBottom: 8 }} />
//       <Text style={[styles.statValue, { color }]}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//       {onPress ? (
//         <Ionicons
//           name="chevron-forward-outline"
//           size={14}
//           color={COLORS.muted}
//           style={{ marginTop: 4 }}
//         />
//       ) : null}
//     </Wrapper>
//   );
// }

// function ActionRow({ icon, title, sub, onPress, danger }) {
//   return (
//     <TouchableOpacity
//       style={styles.action}
//       activeOpacity={0.85}
//       onPress={onPress}
//     >
//       <View style={[styles.actionIcon, danger && styles.actionIconDanger]}>
//         <Ionicons
//           name={icon}
//           size={23}
//           color={danger ? COLORS.danger : COLORS.admin || "#7C3AED"}
//         />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.actionTitle}>{title}</Text>
//         <Text style={styles.actionSub}>{sub}</Text>
//       </View>
//       <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
//     </TouchableOpacity>
//   );
// }

// // ── Styles ─────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

//   header: {
//     marginTop: 52,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 20,
//   },
//   title: { fontSize: 26, fontWeight: "900", color: COLORS.text },
//   sub:   { color: COLORS.muted, marginTop: 4, fontWeight: "600" },
//   logoutIconBtn: {
//     width: 42, height: 42, borderRadius: 14,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center", justifyContent: "center",
//   },

//   errorBox: {
//     flexDirection: "row", alignItems: "center", gap: 8,
//     backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12,
//     marginBottom: 12, borderWidth: 1, borderColor: "#FECACA",
//   },
//   errorText: { color: COLORS.danger, flex: 1, fontSize: 13 },
//   retryText: { color: COLORS.primary, fontWeight: "800", fontSize: 13 },

//   loadingGrid: { alignItems: "center", paddingVertical: 40, gap: 12 },
//   loadingText: { color: COLORS.muted, fontWeight: "700" },

//   grid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//     marginBottom: 20,
//   },
//   stat: {
//     width: "48%",
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },
//   statValue: { fontSize: 28, fontWeight: "900" },
//   statTitle: { color: COLORS.muted, fontSize: 12, fontWeight: "700", marginTop: 4 },

//   mainAction: {
//     backgroundColor: COLORS.admin || "#7C3AED",
//     borderRadius: 24,
//     padding: 22,
//     marginBottom: 24,
//     flexDirection: "row",
//     alignItems: "center",
//     elevation: 5,
//   },
//   mainTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
//   mainSub:   { color: "rgba(255,255,255,0.85)", marginTop: 6, fontWeight: "600" },

//   sectionTitle: {
//     fontSize: 18, fontWeight: "900", color: COLORS.text,
//     marginBottom: 12,
//   },
//   action: {
//     backgroundColor: COLORS.card,
//     borderRadius: 22,
//     padding: 16,
//     marginBottom: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     elevation: 2,
//   },
//   actionIcon: {
//     width: 48, height: 48, borderRadius: 16,
//     backgroundColor: "#F5F3FF",
//     alignItems: "center", justifyContent: "center",
//   },
//   actionIconDanger: {
//     backgroundColor: "#FEF2F2",
//   },
//   actionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text },
//   actionSub:   { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },

//   logoutBtn: {
//     marginTop: 12,
//     marginBottom: 34,
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: "#FEF2F2",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },
//   logoutText: { color: COLORS.danger, fontWeight: "900", fontSize: 15 },
// });  

























// src/screens/admin/AdminDashboardScreen.js

import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import {
  fetchPendingHospitals,
  fetchApprovedHospitals,
  fetchAllHospitals,
  fetchHospitalDayTokens,
} from "../../services/apiService";

export default function AdminDashboardScreen({ navigation }) {
  const [stats, setStats]           = useState(null);
  const [loading, setLoading]       = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]           = useState("");

  const getTodayString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm   = String(d.getMonth() + 1).padStart(2, "0");
    const dd   = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const loadStats = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError("");

      // ── Fetch hospital lists in parallel ──────────────────────────────────
      const [pending, approved, all] = await Promise.all([
        fetchPendingHospitals().catch(() => []),
        fetchApprovedHospitals().catch(() => []),
        fetchAllHospitals().catch(() => []),
      ]);

      const pendingCount  = Array.isArray(pending)  ? pending.length  : 0;
      const approvedCount = Array.isArray(approved) ? approved.length : 0;
      const allCount      = Array.isArray(all)      ? all.length      : 0;
      const rejectedCount = Math.max(0, allCount - pendingCount - approvedCount);

      // ── Today's bookings: sum tokens across all approved hospitals ─────────
      let todayBookings = 0;
      if (Array.isArray(approved) && approved.length > 0) {
        const today = getTodayString();
        const tokenResults = await Promise.allSettled(
          approved.map((h) => fetchHospitalDayTokens(h.id, today))
        );
        tokenResults.forEach((result) => {
          if (result.status === "fulfilled" && Array.isArray(result.value)) {
            todayBookings += result.value.length;
          }
        });
      }

      setStats({
        pending:       pendingCount,
        approved:      approvedCount,
        rejected:      rejectedCount,
        todayBookings,
      });
    } catch (err) {
      console.log("AdminDashboard stats error:", err.message);
      setError("Could not load stats. Check backend connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadStats(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
    );
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.admin || "#7C3AED"]}
        />
      }
    >
      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Super Admin</Text>
          <Text style={styles.sub}>Platform Verification Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.logoutIconBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      {/* ── ERROR BANNER ── */}
      {error ? (
        <View style={styles.errorBox}>
          <Ionicons name="alert-circle-outline" size={16} color={COLORS.danger} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={() => loadStats()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* ── STAT GRID ── */}
      {loading ? (
        <View style={styles.loadingGrid}>
          <ActivityIndicator size="large" color={COLORS.admin || "#7C3AED"} />
          <Text style={styles.loadingText}>Loading stats…</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          <Stat
            title="Pending Hospitals"
            value={stats?.pending ?? "—"}
            color={COLORS.warning || "#F59E0B"}
            icon="hourglass-outline"
            onPress={() => navigation.navigate("Pending")}
          />
          <Stat
            title="Approved Hospitals"
            value={stats?.approved ?? "—"}
            color={COLORS.success || "#16A34A"}
            icon="checkmark-circle-outline"
            onPress={() => navigation.navigate("Approved")}
          />
          <Stat
            title="Rejected Hospitals"
            value={stats?.rejected ?? "—"}
            color={COLORS.danger || "#EF4444"}
            icon="close-circle-outline"
          />
          <Stat
            title="Today's Bookings"
            value={stats?.todayBookings ?? "—"}
            color={COLORS.primary || "#2563EB"}
            icon="ticket-outline"
            onPress={() => navigation.navigate("Bookings")}
          />
        </View>
      )}

      {/* ── MAIN CTA ── */}
      <TouchableOpacity
        style={styles.mainAction}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Pending")}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.mainTitle}>Review Pending Hospitals</Text>
          <Text style={styles.mainSub}>
            {stats?.pending
              ? `${stats.pending} hospital${stats.pending !== 1 ? "s" : ""} waiting for verification`
              : "Verify documents and approve hospitals"}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>

      {/* ── QUICK ACTIONS ── */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <ActionRow
        icon="business-outline"
        title="Approved Hospitals"
        sub="View all verified hospitals"
        onPress={() => navigation.navigate("Approved")}
      />
      <ActionRow
        icon="list-outline"
        title="Booking Monitor"
        sub="Track today's patient tokens"
        onPress={() => navigation.navigate("Bookings")}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Stat({ title, value, color, icon, onPress }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper style={styles.stat} activeOpacity={0.8} onPress={onPress}>
      <Ionicons name={icon} size={22} color={color} style={{ marginBottom: 8 }} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {onPress ? (
        <Ionicons
          name="chevron-forward-outline"
          size={14}
          color={COLORS.muted}
          style={{ marginTop: 4 }}
        />
      ) : null}
    </Wrapper>
  );
}

function ActionRow({ icon, title, sub, onPress }) {
  return (
    <TouchableOpacity style={styles.action} activeOpacity={0.85} onPress={onPress}>
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={23} color={COLORS.admin || "#7C3AED"} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSub}>{sub}</Text>
      </View>
      <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
    </TouchableOpacity>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

  header: {
    marginTop: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: "900", color: COLORS.text },
  sub:   { color: COLORS.muted, marginTop: 4, fontWeight: "600" },
  logoutIconBtn: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: "#FEF2F2",
    alignItems: "center", justifyContent: "center",
  },

  errorBox: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#FEF2F2", borderRadius: 12, padding: 12,
    marginBottom: 12, borderWidth: 1, borderColor: "#FECACA",
  },
  errorText: { color: COLORS.danger, flex: 1, fontSize: 13 },
  retryText: { color: COLORS.primary, fontWeight: "800", fontSize: 13 },

  loadingGrid: { alignItems: "center", paddingVertical: 40, gap: 12 },
  loadingText: { color: COLORS.muted, fontWeight: "700" },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  stat: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  statValue: { fontSize: 28, fontWeight: "900" },
  statTitle: { color: COLORS.muted, fontSize: 12, fontWeight: "700", marginTop: 4 },

  mainAction: {
    backgroundColor: COLORS.admin || "#7C3AED",
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
  },
  mainTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },
  mainSub:   { color: "rgba(255,255,255,0.85)", marginTop: 6, fontWeight: "600" },

  sectionTitle: {
    fontSize: 18, fontWeight: "900", color: COLORS.text,
    marginBottom: 12,
  },
  action: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    elevation: 2,
  },
  actionIcon: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: "#F5F3FF",
    alignItems: "center", justifyContent: "center",
  },
  actionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text },
  actionSub:   { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },

  logoutBtn: {
    marginTop: 12,
    marginBottom: 34,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: { color: COLORS.danger, fontWeight: "900", fontSize: 15 },
});