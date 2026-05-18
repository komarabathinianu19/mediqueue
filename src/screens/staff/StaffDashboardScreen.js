




// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   RefreshControl,
//   TouchableOpacity,
//   Image,
//   StatusBar,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import {
//   fetchMyHospitalDetails,
//   fetchDepartments,
//   fetchDoctors,
// } from "../../services/apiService";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// export default function StaffDashboardScreen({ navigation }) {
//   const [hospital, setHospital] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");

//   const loadData = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       setError("");

//       const storedHospitalId = await AsyncStorage.getItem("hospitalId");
//       if (!storedHospitalId) {
//         setError("Session expired. Please log in again.");
//         return;
//       }

//       // Fetch from Backend
//       const hospitalData = await fetchMyHospitalDetails();
//       setHospital(hospitalData);

//       const [depts, docs] = await Promise.all([
//         fetchDepartments(storedHospitalId),
//         fetchDoctors(storedHospitalId),
//       ]);

//       setDepartments(depts);
//       setDoctors(docs);
//     } catch (err) {
//       console.log("Dashboard Error:", err.message);
//       setError(err.message || "Failed to load hospital data.");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     loadData(true);
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={STAFF_COLOR} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.mainWrapper}>
//       <StatusBar barStyle="light-content" backgroundColor={STAFF_COLOR} />

//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 35 }}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[STAFF_COLOR]} />
//         }
//       >
//         {/* ── HEADER ── */}
//         <LinearGradient
//           colors={[STAFF_COLOR, "#0f9f9a", "#0f9f9a"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <View style={styles.headerTop}>
//             <View>
//               <Text style={styles.welcomeText}>Welcome back</Text>
//               <Text style={styles.title}>{hospital?.name || "Loading..."}</Text>
//               <Text style={styles.sub}>Hospital ID: {hospital?.hospitalId || "N/A"}</Text>
//             </View>
//             <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//                <View style={styles.profileCircle}>
//                   {hospital?.imageUrl ? (
//                     <Image source={{ uri: hospital.imageUrl }} style={styles.profileImg} />
//                   ) : (
//                     <Ionicons name="business" size={24} color={STAFF_COLOR} />
//                   )}
//                </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.headerBottom}>
//             <View style={styles.liveBadge}>
//               <View style={styles.liveDot} />
//               <Text style={styles.liveText}>Live OPD Active</Text>
//             </View>
//           </View>

//           <Ionicons
//             name="medkit-outline"
//             size={110}
//             color="rgba(255,255,255,0.08)"
//             style={styles.bgHeaderIcon}
//           />
//         </LinearGradient>

//         {/* ── DUTY CARD ── */}
//         <View style={styles.dutyCard}>
//           <View style={styles.dutyIconBox}>
//             <Ionicons name="pulse-outline" size={26} color={STAFF_COLOR} />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.dutyTitle}>Today’s Queue Duty</Text>
//             <Text style={styles.dutySub}>
//               {hospital?.city}, {hospital?.address}
//             </Text>
//           </View>
//           <View style={styles.shiftBadge}>
//             <Text style={styles.shiftText}>Active</Text>
//           </View>
//         </View>

//         {/* ── STATS (Dynamic) ── */}
//         <View style={styles.grid}>
//           <Stat
//             title="Departments"
//             value={departments.length.toString()}
//             icon="business-outline"
//             color="#2563EB"
//             bg="#EFF6FF"
//           />
//           <Stat
//             title="Doctors"
//             value={doctors.length.toString()}
//             icon="people-outline"
//             color="#F59E0B"
//             bg="#FFFBEB"
//           />
//           <Stat
//             title="Serving"
//             value="A-12"
//             icon="pulse-outline"
//             color="#8B5CF6"
//             bg="#F5F3FF"
//           />
//           <Stat
//             title="Status"
//             value={hospital?.status === "APPROVED" ? "Live" : "Pending"}
//             icon="checkmark-done-outline"
//             color="#059669"
//             bg="#ECFDF5"
//           />
//         </View>

//         {/* ── QUICK ACTIONS ── */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//         </View>

//         <ActionCard
//           title="Queue Management"
//           sub="Next, skip and complete patients"
//           icon="list-outline"
//           color={STAFF_COLOR}
//           onPress={() => navigation.navigate("Queue")}
//         />

//         <ActionCard
//           title="Manage Doctors"
//           sub={`Update info for ${doctors.length} doctors`}
//           icon="person-add-outline"
//           color="#2563EB"
//           onPress={() => navigation.navigate("ManageDoctors", { hospitalId: hospital.hospitalId })}
//         />

//         <ActionCard
//           title="Manage Departments"
//           sub={`${departments.length} departments currently active`}
//           icon="grid-outline"
//           color="#8B5CF6"
//           onPress={() => navigation.navigate("ManageDepartments", { hospitalId: hospital.hospitalId })}
//         />

//         <ActionCard
//           title="Hospital Reports"
//           sub="Check patient satisfaction & feedback"
//           icon="stats-chart-outline"
//           color="#EC4899"
//           onPress={() => navigation.navigate("Reports")}
//         />
//       </ScrollView>
//     </View>
//   );
// }

// // Sub-components
// function Stat({ title, value, icon, color, bg }) {
//   return (
//     <View style={styles.stat}>
//       <View style={styles.statTop}>
//         <View style={[styles.statIcon, { backgroundColor: bg }]}>
//           <Ionicons name={icon} size={21} color={color} />
//         </View>
//       </View>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//     </View>
//   );
// }

// function ActionCard({ title, sub, icon, color, onPress }) {
//   return (
//     <TouchableOpacity style={styles.action} activeOpacity={0.86} onPress={onPress}>
//       <View style={[styles.actionIcon, { backgroundColor: color + "14" }]}>
//         <Ionicons name={icon} size={24} color={color} />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.actionTitle}>{title}</Text>
//         <Text style={styles.actionSub}>{sub}</Text>
//       </View>
//       <View style={styles.chevronBox}>
//         <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: COLORS.background },
//   container: { flex: 1 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background },
//   header: {
//     paddingTop: 56,
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//     borderBottomLeftRadius: 34,
//     borderBottomRightRadius: 34,
//     overflow: "hidden",
//   },
//   headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   welcomeText: { color: "rgba(255,255,255,0.76)", fontSize: 13, fontWeight: "800", marginBottom: 4 },
//   title: { fontSize: 22, fontWeight: "900", color: "#fff", letterSpacing: -0.4 },
//   sub: { color: "rgba(255,255,255,0.78)", marginTop: 6, fontWeight: "700", fontSize: 12 },
//   profileCircle: { width: 50, height: 50, borderRadius: 18, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", overflow: 'hidden' },
//   profileImg: { width: '100%', height: '100%' },
//   headerBottom: { marginTop: 24, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   liveBadge: { backgroundColor: "rgba(255,255,255,0.16)", borderWidth: 1, borderColor: "rgba(255,255,255,0.22)", paddingHorizontal: 13, paddingVertical: 9, borderRadius: 999, flexDirection: "row", alignItems: "center", gap: 8 },
//   liveDot: { width: 8, height: 8, borderRadius: 99, backgroundColor: "#22C55E" },
//   liveText: { color: "#fff", fontSize: 12, fontWeight: "900" },
//   bgHeaderIcon: { position: "absolute", right: -20, bottom: -24 },
//   dutyCard: { marginHorizontal: 18, marginTop: -22, backgroundColor: COLORS.card, borderRadius: 24, padding: 16, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", gap: 13, elevation: 5 },
//   dutyIconBox: { width: 50, height: 50, borderRadius: 17, backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center" },
//   dutyTitle: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
//   dutySub: { color: COLORS.muted, fontSize: 12, fontWeight: "700", marginTop: 4 },
//   shiftBadge: { backgroundColor: "#ECFDF5", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999 },
//   shiftText: { color: STAFF_COLOR, fontSize: 11, fontWeight: "900" },
//   grid: { marginTop: 22, paddingHorizontal: 18, flexDirection: "row", flexWrap: "wrap", gap: 12 },
//   stat: { width: "48%", backgroundColor: COLORS.card, borderRadius: 24, padding: 17, borderWidth: 1, borderColor: COLORS.border, elevation: 3 },
//   statTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   statIcon: { width: 42, height: 42, borderRadius: 15, alignItems: "center", justifyContent: "center" },
//   statValue: { fontSize: 24, fontWeight: "900", color: COLORS.text, marginTop: 14 },
//   statTitle: { color: COLORS.muted, fontWeight: "800", fontSize: 12, marginTop: 4 },
//   sectionHeader: { marginTop: 28, marginBottom: 12, paddingHorizontal: 18 },
//   sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
//   action: { marginHorizontal: 18, backgroundColor: COLORS.card, borderRadius: 23, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: COLORS.border, flexDirection: "row", alignItems: "center", gap: 14, elevation: 2 },
//   actionIcon: { width: 50, height: 50, borderRadius: 17, alignItems: "center", justifyContent: "center" },
//   actionTitle: { fontSize: 16, fontWeight: "900", color: COLORS.text },
//   actionSub: { color: COLORS.muted, marginTop: 4, fontSize: 12, fontWeight: "600" },
//   chevronBox: { width: 32, height: 32, borderRadius: 12, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center" },
// });  









































// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   RefreshControl,
//   TouchableOpacity,
//   Image,
//   StatusBar,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import {
//   fetchMyHospitalDetails,
//   fetchDepartments,
//   fetchDoctors,
// } from "../../services/apiService";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// export default function StaffDashboardScreen({ navigation }) {
//   const [hospital, setHospital] = useState(null);
//   const [departments, setDepartments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState("");

//   const loadData = useCallback(async (isRefresh = false) => {
//     try {
//       if (!isRefresh) setLoading(true);
//       setError("");

//       const storedHospitalId = await AsyncStorage.getItem("hospitalId");
//       if (!storedHospitalId) {
//         setError("Session expired. Please log in again.");
//         return;
//       }

//       // Fetch hospital details from Backend
//       const hospitalData = await fetchMyHospitalDetails();
//       setHospital(hospitalData);

//       // Fetch departments and doctors in parallel
//       const [depts, docs] = await Promise.all([
//         fetchDepartments(storedHospitalId),
//         fetchDoctors(storedHospitalId),
//       ]);

//       setDepartments(depts);
//       setDoctors(docs);
//     } catch (err) {
//       console.log("Dashboard Error:", err.message);
//       setError(err.message || "Failed to load hospital data.");

//       // Fallback: show cached data from AsyncStorage
//       try {
//         const [name, hId, email, phone, address, city, status] =
//           await AsyncStorage.multiGet([
//             "hospitalName",
//             "hospitalId",
//             "hospitalEmail",
//             "hospitalPhone",
//             "hospitalAddress",
//             "hospitalCity",
//             "hospitalStatus",
//           ]);
//         if (name[1]) {
//           setHospital({
//             name: name[1],
//             hospitalId: hId[1],
//             email: email[1],
//             phone: phone[1],
//             address: address[1],
//             city: city[1],
//             status: status[1],
//           });
//         }
//       } catch (cacheErr) {
//         console.log("Cache fallback error:", cacheErr);
//       }
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     loadData(true);
//   };

//   // ── Loading ──────────────────────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={STAFF_COLOR} />
//       </View>
//     );
//   }

//   // ── Error / No data ──────────────────────────────────────────────────────────
//   if (!hospital) {
//     return (
//       <View style={styles.center}>
//         <Ionicons name="alert-circle-outline" size={48} color={COLORS.muted} />
//         <Text style={styles.errorMsg}>{error || "No hospital data found."}</Text>
//         <TouchableOpacity style={styles.retryBtn} onPress={() => loadData()}>
//           <Text style={styles.retryText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // ── Main UI ──────────────────────────────────────────────────────────────────
//   return (
//     <View style={styles.mainWrapper}>
//       <StatusBar barStyle="light-content" backgroundColor={STAFF_COLOR} />

//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 35 }}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[STAFF_COLOR]}
//           />
//         }
//       >
//         {/* ── HEADER ── */}
//         <LinearGradient
//           colors={[STAFF_COLOR, "#0f9f9a", "#0f9f9a"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <View style={styles.headerTop}>
//             <View style={{ flex: 1, marginRight: 12 }}>
//               <Text style={styles.welcomeText}>Welcome back</Text>
//               <Text style={styles.title} numberOfLines={1}>
//                 {hospital?.name || "Loading..."}
//               </Text>
//               <Text style={styles.sub}>
//                 Hospital ID: {hospital?.hospitalId || "N/A"}
//               </Text>
//             </View>

//             {/* Profile icon navigates to Profile screen */}
//             <TouchableOpacity
//               onPress={() => navigation.navigate("Profile")}
//               activeOpacity={0.85}
//             >
//               <View style={styles.profileCircle}>
//                 {hospital?.imageUrl ? (
//                   <Image
//                     source={{ uri: hospital.imageUrl }}
//                     style={styles.profileImg}
//                   />
//                 ) : (
//                   <Ionicons name="business" size={24} color={STAFF_COLOR} />
//                 )}
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.headerBottom}>
//             <View style={styles.liveBadge}>
//               <View style={styles.liveDot} />
//               <Text style={styles.liveText}>Live OPD Active</Text>
//             </View>
//           </View>

//           <Ionicons
//             name="medkit-outline"
//             size={110}
//             color="rgba(255,255,255,0.08)"
//             style={styles.bgHeaderIcon}
//           />
//         </LinearGradient>

//         {/* ── DUTY CARD ── */}
//         <View style={styles.dutyCard}>
//           <View style={styles.dutyIconBox}>
//             <Ionicons name="pulse-outline" size={26} color={STAFF_COLOR} />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.dutyTitle}>Today's Queue Duty</Text>
//             <Text style={styles.dutySub} numberOfLines={1}>
//               {[hospital?.city, hospital?.address].filter(Boolean).join(", ") ||
//                 "Manage patient queue & walk-in tokens"}
//             </Text>
//           </View>
//           <View style={styles.shiftBadge}>
//             <Text style={styles.shiftText}>Active</Text>
//           </View>
//         </View>

//         {/* ── STAT CARDS (only 2 — both from DB) ── */}
//         <View style={styles.grid}>
//           {/* Departments — count from DB */}
//           <StatCard
//             title="Departments"
//             value={departments.length.toString()}
//             icon="business-outline"
//             color="#2563EB"
//             bg="#EFF6FF"
//           />

//           {/* Doctors — count from DB */}
//           <StatCard
//             title="Doctors"
//             value={doctors.length.toString()}
//             icon="people-outline"
//             color="#F59E0B"
//             bg="#FFFBEB"
//           />
//         </View>

//         {/* ── QUICK ACTIONS ── */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//         </View>

//         {/* Queue Management → QueueManagementScreen */}
//         <ActionCard
//           title="Queue Management"
//           sub="Next, skip and complete patients"
//           icon="list-outline"
//           color={STAFF_COLOR}
//           onPress={() => navigation.navigate("Queue")}
//         />

//         {/* Manage Doctors → DoctorTimingsScreen */}
//         <ActionCard
//           title="Manage Doctors"
//           sub={`Update timings for ${doctors.length} doctor${doctors.length !== 1 ? "s" : ""}`}
//           icon="person-add-outline"
//           color="#2563EB"
//           onPress={() => navigation.navigate("Timings")}
//         />

//         {/* Manage Departments → Profile (StaffProfileScreen) */}
//         <ActionCard
//           title="Manage Departments"
//           sub={`${departments.length} department${departments.length !== 1 ? "s" : ""} currently active`}
//           icon="grid-outline"
//           color="#8B5CF6"
//           onPress={() => navigation.navigate("Profile")}
//         />

//         {/* Hospital Reports → FeedbackScreen */}
//         <ActionCard
//           title="Hospital Reports"
//           sub="Check patient satisfaction & feedback"
//           icon="stats-chart-outline"
//           color="#EC4899"
//           onPress={() => navigation.navigate("Feedback")}
//         />
//       </ScrollView>
//     </View>
//   );
// }

// // ── Stat Card Component ────────────────────────────────────────────────────────
// function StatCard({ title, value, icon, color, bg }) {
//   return (
//     <View style={styles.stat}>
//       <View style={styles.statTop}>
//         <View style={[styles.statIcon, { backgroundColor: bg }]}>
//           <Ionicons name={icon} size={22} color={color} />
//         </View>
//       </View>
//       <Text style={[styles.statValue, { color }]}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//     </View>
//   );
// }

// // ── Action Card Component ──────────────────────────────────────────────────────
// function ActionCard({ title, sub, icon, color, onPress }) {
//   return (
//     <TouchableOpacity
//       style={styles.action}
//       activeOpacity={0.86}
//       onPress={onPress}
//     >
//       <View style={[styles.actionIcon, { backgroundColor: color + "14" }]}>
//         <Ionicons name={icon} size={24} color={color} />
//       </View>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.actionTitle}>{title}</Text>
//         <Text style={styles.actionSub}>{sub}</Text>
//       </View>
//       <View style={styles.chevronBox}>
//         <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
//       </View>
//     </TouchableOpacity>
//   );
// }

// // ── Styles ────────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     flex: 1,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.background,
//     padding: 24,
//   },

//   errorMsg: {
//     color: COLORS.muted,
//     marginTop: 12,
//     textAlign: "center",
//     fontSize: 14,
//   },

//   retryBtn: {
//     marginTop: 16,
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//     backgroundColor: STAFF_COLOR,
//     borderRadius: 12,
//   },

//   retryText: {
//     color: "#fff",
//     fontWeight: "800",
//   },

//   // ── Header ──
//   header: {
//     paddingTop: 56,
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//     borderBottomLeftRadius: 34,
//     borderBottomRightRadius: 34,
//     overflow: "hidden",
//   },

//   headerTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   welcomeText: {
//     color: "rgba(255,255,255,0.76)",
//     fontSize: 13,
//     fontWeight: "800",
//     marginBottom: 4,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: "#fff",
//     letterSpacing: -0.4,
//   },

//   sub: {
//     color: "rgba(255,255,255,0.78)",
//     marginTop: 6,
//     fontWeight: "700",
//     fontSize: 12,
//   },

//   profileCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 18,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//     elevation: 4,
//   },

//   profileImg: {
//     width: "100%",
//     height: "100%",
//   },

//   headerBottom: {
//     marginTop: 24,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   liveBadge: {
//     backgroundColor: "rgba(255,255,255,0.16)",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.22)",
//     paddingHorizontal: 13,
//     paddingVertical: 9,
//     borderRadius: 999,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   liveDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: "#22C55E",
//   },

//   liveText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "900",
//   },

//   bgHeaderIcon: {
//     position: "absolute",
//     right: -20,
//     bottom: -24,
//   },

//   // ── Duty Card ──
//   dutyCard: {
//     marginHorizontal: 18,
//     marginTop: -22,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.1,
//     shadowRadius: 18,
//     elevation: 5,
//   },

//   dutyIconBox: {
//     width: 50,
//     height: 50,
//     borderRadius: 17,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   dutyTitle: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: "900",
//   },

//   dutySub: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "700",
//     marginTop: 4,
//     lineHeight: 17,
//   },

//   shiftBadge: {
//     backgroundColor: "#ECFDF5",
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//     borderRadius: 999,
//   },

//   shiftText: {
//     color: STAFF_COLOR,
//     fontSize: 11,
//     fontWeight: "900",
//   },

//   // ── Stats Grid (2 cards, full width each half) ──
//   grid: {
//     marginTop: 22,
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     gap: 12,
//   },

//   stat: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.06,
//     shadowRadius: 14,
//     elevation: 3,
//   },

//   statTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   statIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   statValue: {
//     fontSize: 32,
//     fontWeight: "900",
//     marginTop: 14,
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontWeight: "800",
//     fontSize: 12,
//     marginTop: 4,
//   },

//   // ── Section Header ──
//   sectionHeader: {
//     marginTop: 28,
//     marginBottom: 12,
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   // ── Action Cards ──
//   action: {
//     marginHorizontal: 18,
//     backgroundColor: COLORS.card,
//     borderRadius: 23,
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
//     width: 50,
//     height: 50,
//     borderRadius: 17,
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
//     lineHeight: 17,
//   },

//   chevronBox: {
//     width: 32,
//     height: 32,
//     borderRadius: 12,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });  







































import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import {
  fetchMyHospitalDetails,
  fetchDoctors,
} from "../../services/apiService";

const STAFF_COLOR = COLORS?.staff || "#059669";

export default function StaffDashboardScreen({ navigation }) {
  const [hospital, setHospital] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // Departments are NOT a separate API — they come from unique doctor.department values
  const uniqueDepartments = [...new Set(doctors.map((d) => d.department).filter(Boolean))];
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setError("");

      // Fetch hospital details from Backend
      const hospitalData = await fetchMyHospitalDetails();
      setHospital(hospitalData);

      // Fetch doctors (departments are derived from their department field)
      const storedHospitalId = await AsyncStorage.getItem("hospitalId");
      if (!storedHospitalId) {
        setError("Session expired. Please log in again.");
        return;
      }

      const docs = await fetchDoctors(storedHospitalId);
      setDoctors(Array.isArray(docs) ? docs : []);
    } catch (err) {
      console.log("Dashboard Error:", err.message);
      setError(err.message || "Failed to load hospital data.");

      // Fallback: show cached data from AsyncStorage
      try {
        const [name, hId, email, phone, address, city, status] =
          await AsyncStorage.multiGet([
            "hospitalName",
            "hospitalId",
            "hospitalEmail",
            "hospitalPhone",
            "hospitalAddress",
            "hospitalCity",
            "hospitalStatus",
          ]);
        if (name[1]) {
          setHospital({
            name: name[1],
            hospitalId: hId[1],
            email: email[1],
            phone: phone[1],
            address: address[1],
            city: city[1],
            status: status[1],
          });
        }
      } catch (cacheErr) {
        console.log("Cache fallback error:", cacheErr);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={STAFF_COLOR} />
      </View>
    );
  }

  // ── Error / No data ──────────────────────────────────────────────────────────
  if (!hospital) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle-outline" size={48} color={COLORS.muted} />
        <Text style={styles.errorMsg}>{error || "No hospital data found."}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => loadData()}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Main UI ──────────────────────────────────────────────────────────────────
  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={STAFF_COLOR} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[STAFF_COLOR]}
          />
        }
      >
        {/* ── HEADER ── */}
        <LinearGradient
          colors={[STAFF_COLOR, "#0f9f9a", "#0f9f9a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.title} numberOfLines={1}>
                {hospital?.name || "Loading..."}
              </Text>
              <Text style={styles.sub}>
                Hospital ID: {hospital?.hospitalId || "N/A"}
              </Text>
            </View>

            {/* Profile icon navigates to Profile screen */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.85}
            >
              <View style={styles.profileCircle}>
                {hospital?.imageUrl ? (
                  <Image
                    source={{ uri: hospital.imageUrl }}
                    style={styles.profileImg}
                  />
                ) : (
                  <Ionicons name="business" size={24} color={STAFF_COLOR} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.headerBottom}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live OPD Active</Text>
            </View>
          </View>

          <Ionicons
            name="medkit-outline"
            size={110}
            color="rgba(255,255,255,0.08)"
            style={styles.bgHeaderIcon}
          />
        </LinearGradient>

        {/* ── DUTY CARD ── */}
        <View style={styles.dutyCard}>
          <View style={styles.dutyIconBox}>
            <Ionicons name="pulse-outline" size={26} color={STAFF_COLOR} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dutyTitle}>Today's Queue Duty</Text>
            <Text style={styles.dutySub} numberOfLines={1}>
              {[hospital?.city, hospital?.address].filter(Boolean).join(", ") ||
                "Manage patient queue & walk-in tokens"}
            </Text>
          </View>
          <View style={styles.shiftBadge}>
            <Text style={styles.shiftText}>Active</Text>
          </View>
        </View>

        {/* ── STAT CARDS (only 2 — both from DB) ── */}
        <View style={styles.grid}>
          {/* Departments — derived from unique doctor department values */}
          <StatCard
            title="Departments"
            value={uniqueDepartments.length.toString()}
            icon="business-outline"
            color="#2563EB"
            bg="#EFF6FF"
          />

          {/* Doctors — count from DB */}
          <StatCard
            title="Doctors"
            value={doctors.length.toString()}
            icon="people-outline"
            color="#F59E0B"
            bg="#FFFBEB"
          />
        </View>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        {/* Queue Management → QueueManagementScreen */}
        <ActionCard
          title="Queue Management"
          sub="Next, skip and complete patients"
          icon="list-outline"
          color={STAFF_COLOR}
          onPress={() => navigation.navigate("Queue")}
        />

        {/* Manage Doctors → DoctorTimingsScreen */}
        <ActionCard
          title="Manage Doctors Timings"
          sub={`Update timings for ${doctors.length} doctor${doctors.length !== 1 ? "s" : ""}`}
          icon="person-add-outline"
          color="#2563EB"
          onPress={() => navigation.navigate("Timings")}
        />

        {/* Manage Departments → Profile (StaffProfileScreen) */}
        <ActionCard
          title="Manage Departments"
          sub={`${uniqueDepartments.length} department${uniqueDepartments.length !== 1 ? "s" : ""} currently active`}
          icon="grid-outline"
          color="#8B5CF6"
          onPress={() => navigation.navigate("Profile")}
        />

        {/* Hospital Reports → FeedbackScreen */}
        <ActionCard
          title="Hospital Reports"
          sub="Check patient satisfaction & feedback"
          icon="stats-chart-outline"
          color="#EC4899"
          onPress={() => navigation.navigate("Feedback")}
        />
      </ScrollView>
    </View>
  );
}

// ── Stat Card Component ────────────────────────────────────────────────────────
function StatCard({ title, value, icon, color, bg }) {
  return (
    <View style={styles.stat}>
      <View style={styles.statTop}>
        <View style={[styles.statIcon, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
      </View>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

// ── Action Card Component ──────────────────────────────────────────────────────
function ActionCard({ title, sub, icon, color, onPress }) {
  return (
    <TouchableOpacity
      style={styles.action}
      activeOpacity={0.86}
      onPress={onPress}
    >
      <View style={[styles.actionIcon, { backgroundColor: color + "14" }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSub}>{sub}</Text>
      </View>
      <View style={styles.chevronBox}>
        <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
      </View>
    </TouchableOpacity>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 24,
  },

  errorMsg: {
    color: COLORS.muted,
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
  },

  retryBtn: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: STAFF_COLOR,
    borderRadius: 12,
  },

  retryText: {
    color: "#fff",
    fontWeight: "800",
  },

  // ── Header ──
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    overflow: "hidden",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcomeText: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: -0.4,
  },

  sub: {
    color: "rgba(255,255,255,0.78)",
    marginTop: 6,
    fontWeight: "700",
    fontSize: 12,
  },

  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    elevation: 4,
  },

  profileImg: {
    width: "100%",
    height: "100%",
  },

  headerBottom: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  liveBadge: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#22C55E",
  },

  liveText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "900",
  },

  bgHeaderIcon: {
    position: "absolute",
    right: -20,
    bottom: -24,
  },

  // ── Duty Card ──
  dutyCard: {
    marginHorizontal: 18,
    marginTop: -22,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    shadowColor: "#0F172A",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 5,
  },

  dutyIconBox: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  dutyTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },

  dutySub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    lineHeight: 17,
  },

  shiftBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },

  shiftText: {
    color: STAFF_COLOR,
    fontSize: 11,
    fontWeight: "900",
  },

  // ── Stats Grid (2 cards, full width each half) ──
  grid: {
    marginTop: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    gap: 12,
  },

  stat: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontSize: 32,
    fontWeight: "900",
    marginTop: 14,
  },

  statTitle: {
    color: COLORS.muted,
    fontWeight: "800",
    fontSize: 12,
    marginTop: 4,
  },

  // ── Section Header ──
  sectionHeader: {
    marginTop: 28,
    marginBottom: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },

  // ── Action Cards ──
  action: {
    marginHorizontal: 18,
    backgroundColor: COLORS.card,
    borderRadius: 23,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.text,
  },

  actionSub: {
    color: COLORS.muted,
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },

  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
});