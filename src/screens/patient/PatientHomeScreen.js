


// // PatientHomeScreen.js
// // Shows real patient name from backend, real approved hospitals, real active token.

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View, Text, StyleSheet, ScrollView,
//   TouchableOpacity, Image, Dimensions, RefreshControl,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";
// import { useQueue } from "../../context/QueueContext";
// import { fetchMyProfile } from "../../services/apiService";
// import { useFocusEffect } from "@react-navigation/native";

// const { width } = Dimensions.get("window");

// const DEPT_IMAGES = {
//   "Cardiology":   require("../../../assets/departments/cardiology.jpg"),
//   "ENT":          require("../../../assets/departments/ent.jpg"),
//   "General OPD":  require("../../../assets/departments/generalopd.jpg"),
//   "Pediatrics":   require("../../../assets/departments/pediatrics.jpg"),
// };

// export default function PatientHomeScreen({ navigation }) {
//   const { hospitals, loading: hospitalsLoading, loadHospitals } = useHospital();
//   const { myActiveToken, loadMyActiveToken } = useQueue();

//   const [patientName, setPatientName]   = useState("");
//   const [refreshing, setRefreshing]     = useState(false);

//   // ── Load patient name + active token on mount ─────────────────────────────
//   useEffect(() => {
//     loadPatientData();
//   }, []);

//   // ── Reload active token every time screen comes into focus ────────────────
//   // This ensures the hero card disappears immediately after appointment completes
//   useFocusEffect(
//     useCallback(() => {
//       loadMyActiveToken();
//     }, [loadMyActiveToken])
//   );

//   const loadPatientData = async () => {
//     try {
//       // Try getting name from stored login data first (fast)
//       const storedName = await AsyncStorage.getItem("userName");
//       if (storedName) setPatientName(storedName);

//       // Then fetch full profile from backend (authoritative)
//       const profile = await fetchMyProfile();
//       if (profile?.fullName) {
//         setPatientName(profile.fullName);
//         await AsyncStorage.setItem("userName", profile.fullName);
//       }
//     } catch (err) {
//       console.log("Could not load patient profile:", err.message);
//     }

//     // Load active token
//     await loadMyActiveToken();
//   };

//   // ── Pull-to-refresh ───────────────────────────────────────────────────────
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await Promise.all([loadHospitals(), loadPatientData()]);
//     setRefreshing(false);
//   }, []);

//   const currentToken =
//     myActiveToken &&
//     (myActiveToken.status === "waiting" || myActiveToken.status === "serving")
//       ? myActiveToken
//       : null;

//   const firstName = patientName ? patientName.split(" ")[0] : "Patient";

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.welcomeText}>Health Dashboard</Text>
//           <Text style={styles.userName}>Hello, {firstName} 👋</Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollPadding}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
//         }
//       >
//         {/* Active Token Hero Card */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           style={styles.heroWrapper}
//         >
//           <LinearGradient
//             colors={[COLORS.primary, "#4F46E5"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.tokenCard}
//           >
//             <View style={styles.cardTop}>
//               <View style={styles.statusPill}>
//                 <Text style={styles.statusText}>
//                   {currentToken ? currentToken.status.toUpperCase() : "READY TO BOOK"}
//                 </Text>
//               </View>
//               <Ionicons name="medical" size={20} color="rgba(255,255,255,0.5)" />
//             </View>

//             <View style={styles.tokenMain}>
//               <Text style={styles.tokenNumber}>
//                 {currentToken ? currentToken.tokenNo : "--"}
//               </Text>
//               <View style={styles.tokenDetails}>
//                 <Text style={styles.hospitalLabel} numberOfLines={1}>
//                   {currentToken ? currentToken.hospitalName : "No Active Visit"}
//                 </Text>
//                 <Text style={styles.deptLabel}>
//                   {currentToken
//                     ? `${currentToken.department} • ${currentToken.doctor}`
//                     : "Select a hospital to begin"}
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.9}
//               style={styles.actionButton}
//               onPress={() =>
//                 currentToken
//                   ? navigation.navigate("LiveQueue")
//                   : navigation.navigate("Hospitals")
//               }
//             >
//               <Text style={styles.actionButtonText}>
//                 {currentToken ? "Track My Token" : "Book New Token"}
//               </Text>
//               <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
//             </TouchableOpacity>
//           </LinearGradient>
//         </MotiView>

//         {/* Hospital List */}
//         <Text style={styles.sectionTitle}>Available Hospitals</Text>

//         {hospitalsLoading && hospitals.length === 0 ? (
//           <View style={styles.loadingCard}>
//             <Text style={styles.loadingText}>Loading hospitals...</Text>
//           </View>
//         ) : hospitals.length === 0 ? (
//           <View style={styles.emptyCard}>
//             <Ionicons name="business-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No hospitals available</Text>
//             <Text style={styles.emptySub}>Approved hospitals will appear here.</Text>
//           </View>
//         ) : (
//           hospitals.map((hospital, index) => (
//             <MotiView
//               key={hospital.id || hospital.hospitalId}
//               from={{ opacity: 0, translateY: 20 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{ delay: index * 80 }}
//             >
//               <TouchableOpacity
//                 style={styles.hospitalCard}
//                 onPress={() =>
//                   navigation.navigate("HospitalDetails", { hospital })
//                 }
//               >
//                 <View style={styles.cardHeader}>
//                   <Image
//                     source={{ uri: hospital.image || hospital.imageUrl }}
//                     style={styles.hospitalImage}
//                     defaultSource={require("../../../assets/departments/generalopd.jpg")}
//                   />
//                   <View style={styles.headerInfo}>
//                     <Text style={styles.hospitalName}>{hospital.name}</Text>
//                     <View style={styles.locationRow}>
//                       <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
//                       <Text style={styles.distanceText}>
//                         {hospital.city || "Nearby"}
//                       </Text>
//                     </View>
//                   </View>
//                   <Ionicons name="chevron-forward-outline" size={20} color="#CBD5E1" />
//                 </View>

//                 <View style={styles.cardDivider} />

//                 {/* Department chips */}
//                 <View style={styles.specialitySection}>
//                   <Text style={styles.label}>Available Specialities:</Text>
//                   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     {(Array.isArray(hospital.departments)
//                       ? hospital.departments
//                       : ["General OPD"]
//                     ).map((dept, i) => (
//                       <View key={i} style={styles.deptChip}>
//                         <Image
//                           source={DEPT_IMAGES[dept] || DEPT_IMAGES["General OPD"]}
//                           style={styles.chipIcon}
//                         />
//                         <Text style={styles.chipText}>{dept}</Text>
//                       </View>
//                     ))}
//                   </ScrollView>
//                 </View>
//               </TouchableOpacity>
//             </MotiView>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   scrollPadding: { paddingBottom: 100 },
//   header: {
//     paddingTop: 60, paddingHorizontal: 24,
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginBottom: 5,
//   },
//   welcomeText: { fontSize: 13, color: "#64748B", fontWeight: "700", textTransform: "uppercase" },
//   userName: { fontSize: 26, color: "#1E293B", fontWeight: "900" },

//   heroWrapper: { paddingHorizontal: 20, marginVertical: 20 },
//   tokenCard: { borderRadius: 32, padding: 24, elevation: 10, shadowColor: COLORS.primary, shadowOpacity: 0.2 },
//   cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
//   statusPill: { backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
//   statusText: { color: "#fff", fontSize: 10, fontWeight: "900" },
//   tokenMain: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   tokenNumber: { color: "#fff", fontSize: 56, fontWeight: "900" },
//   tokenDetails: { marginLeft: 18, flex: 1 },
//   hospitalLabel: { color: "#fff", fontSize: 18, fontWeight: "800" },
//   deptLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2, fontWeight: "600" },
//   actionButton: {
//     backgroundColor: "#fff", paddingVertical: 14, borderRadius: 18,
//     flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8,
//   },
//   actionButtonText: { color: COLORS.primary, fontWeight: "900" },

//   sectionTitle: { fontSize: 20, fontWeight: "900", color: "#1E293B", marginBottom: 15, marginLeft: 24 },

//   loadingCard: { margin: 20, padding: 30, backgroundColor: "#fff", borderRadius: 20, alignItems: "center" },
//   loadingText: { color: COLORS.muted, fontWeight: "700" },

//   emptyCard: {
//     margin: 20, padding: 30, backgroundColor: "#fff", borderRadius: 20,
//     alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   emptyTitle: { color: "#1E293B", fontWeight: "900", fontSize: 18, marginTop: 12 },
//   emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6 },

//   hospitalCard: {
//     backgroundColor: "#fff", borderRadius: 28, padding: 18,
//     marginHorizontal: 20, marginBottom: 16, elevation: 3,
//     shadowColor: "#000", shadowOpacity: 0.05,
//   },
//   cardHeader: { flexDirection: "row", alignItems: "center" },
//   hospitalImage: { width: 60, height: 60, borderRadius: 18, backgroundColor: "#E2E8F0" },
//   headerInfo: { flex: 1, marginLeft: 15 },
//   hospitalName: { fontSize: 17, fontWeight: "800", color: "#1E293B" },
//   locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 },
//   distanceText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
//   cardDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 15 },
//   specialitySection: { marginTop: 2 },
//   label: { fontSize: 11, color: "#94A3B8", fontWeight: "800", textTransform: "uppercase", marginBottom: 10 },
//   deptChip: {
//     flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC",
//     paddingRight: 12, paddingLeft: 6, paddingVertical: 6,
//     borderRadius: 99, marginRight: 10, borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   chipIcon: { width: 32, height: 32, borderRadius: 11 },
//   chipText: { fontSize: 11, fontWeight: "700", color: "#475569", marginLeft: 8 },
// });  































// // PatientHomeScreen.js
// // Reads myActiveToken directly from QueueContext which auto-polls every 10s.
// // No per-screen interval needed — the hero card updates automatically.

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View, Text, StyleSheet, ScrollView,
//   TouchableOpacity, Image, Dimensions, RefreshControl,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";
// import { useQueue } from "../../context/QueueContext";
// import { fetchMyProfile } from "../../services/apiService";

// const { width } = Dimensions.get("window");

// const DEPT_IMAGES = {
//   "Cardiology":  require("../../../assets/departments/cardiology.jpg"),
//   "ENT":         require("../../../assets/departments/ent.jpg"),
//   "General OPD": require("../../../assets/departments/generalopd.jpg"),
//   "Pediatrics":  require("../../../assets/departments/pediatrics.jpg"),
// };

// export default function PatientHomeScreen({ navigation }) {
//   const { hospitals, loading: hospitalsLoading, loadHospitals } = useHospital();
//   // myActiveToken is kept fresh by QueueContext's global 10s poll
//   const { myActiveToken, loadMyActiveToken } = useQueue();

//   const [patientName, setPatientName] = useState("");
//   const [refreshing, setRefreshing]   = useState(false);

//   // Load patient name once on mount
//   useEffect(() => {
//     loadPatientName();
//   }, []);

//   const loadPatientName = async () => {
//     try {
//       const storedName = await AsyncStorage.getItem("userName");
//       if (storedName) setPatientName(storedName);

//       const profile = await fetchMyProfile();
//       if (profile?.fullName) {
//         setPatientName(profile.fullName);
//         await AsyncStorage.setItem("userName", profile.fullName);
//       }
//     } catch (err) {
//       console.log("Could not load patient profile:", err.message);
//     }
//   };

//   // Pull-to-refresh: force an immediate token re-fetch + hospital reload
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await Promise.all([loadHospitals(), loadMyActiveToken(), loadPatientName()]);
//     setRefreshing(false);
//   }, [loadHospitals, loadMyActiveToken]);

//   // Hero card only shows waiting/serving tokens
//   const currentToken =
//     myActiveToken &&
//     (myActiveToken.status === "waiting" || myActiveToken.status === "serving")
//       ? myActiveToken
//       : null;

//   const firstName = patientName ? patientName.split(" ")[0] : "Patient";

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.welcomeText}>Health Dashboard</Text>
//           <Text style={styles.userName}>Hello, {firstName} 👋</Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollPadding}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[COLORS.primary]}
//           />
//         }
//       >
//         {/* ── Active Token Hero Card ──────────────────────────────────────── */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           style={styles.heroWrapper}
//         >
//           <LinearGradient
//             colors={[COLORS.primary, "#4F46E5"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.tokenCard}
//           >
//             <View style={styles.cardTop}>
//               <View style={styles.statusPill}>
//                 <Text style={styles.statusText}>
//                   {currentToken ? currentToken.status.toUpperCase() : "READY TO BOOK"}
//                 </Text>
//               </View>
//               <Ionicons name="medical" size={20} color="rgba(255,255,255,0.5)" />
//             </View>

//             <View style={styles.tokenMain}>
//               <Text style={styles.tokenNumber}>
//                 {currentToken ? currentToken.tokenNo : "--"}
//               </Text>
//               <View style={styles.tokenDetails}>
//                 <Text style={styles.hospitalLabel} numberOfLines={1}>
//                   {currentToken ? currentToken.hospitalName : "No Active Visit"}
//                 </Text>
//                 <Text style={styles.deptLabel}>
//                   {currentToken
//                     ? `${currentToken.department} • ${currentToken.doctor}`
//                     : "Select a hospital to begin"}
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.9}
//               style={styles.actionButton}
//               onPress={() =>
//                 currentToken
//                   ? navigation.navigate("LiveQueue")
//                   : navigation.navigate("Hospitals")
//               }
//             >
//               <Text style={styles.actionButtonText}>
//                 {currentToken ? "Track My Token" : "Book New Token"}
//               </Text>
//               <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
//             </TouchableOpacity>
//           </LinearGradient>
//         </MotiView>

//         {/* ── Hospital List ───────────────────────────────────────────────── */}
//         <Text style={styles.sectionTitle}>Available Hospitals</Text>

//         {hospitalsLoading && hospitals.length === 0 ? (
//           <View style={styles.loadingCard}>
//             <Text style={styles.loadingText}>Loading hospitals...</Text>
//           </View>
//         ) : hospitals.length === 0 ? (
//           <View style={styles.emptyCard}>
//             <Ionicons name="business-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No hospitals available</Text>
//             <Text style={styles.emptySub}>Approved hospitals will appear here.</Text>
//           </View>
//         ) : (
//           hospitals.map((hospital, index) => (
//             <MotiView
//               key={hospital.id || hospital.hospitalId}
//               from={{ opacity: 0, translateY: 20 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{ delay: index * 80 }}
//             >
//               <TouchableOpacity
//                 style={styles.hospitalCard}
//                 onPress={() => navigation.navigate("HospitalDetails", { hospital })}
//               >
//                 <View style={styles.cardHeader}>
//                   <Image
//                     source={{ uri: hospital.image || hospital.imageUrl }}
//                     style={styles.hospitalImage}
//                     defaultSource={require("../../../assets/departments/generalopd.jpg")}
//                   />
//                   <View style={styles.headerInfo}>
//                     <Text style={styles.hospitalName}>{hospital.name}</Text>
//                     <View style={styles.locationRow}>
//                       <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
//                       <Text style={styles.distanceText}>{hospital.city || "Nearby"}</Text>
//                     </View>
//                   </View>
//                   <Ionicons name="chevron-forward-outline" size={20} color="#CBD5E1" />
//                 </View>

//                 <View style={styles.cardDivider} />

//                 <View style={styles.specialitySection}>
//                   <Text style={styles.label}>Available Specialities:</Text>
//                   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     {(Array.isArray(hospital.departments)
//                       ? hospital.departments
//                       : ["General OPD"]
//                     ).map((dept, i) => (
//                       <View key={i} style={styles.deptChip}>
//                         <Image
//                           source={DEPT_IMAGES[dept] || DEPT_IMAGES["General OPD"]}
//                           style={styles.chipIcon}
//                         />
//                         <Text style={styles.chipText}>{dept}</Text>
//                       </View>
//                     ))}
//                   </ScrollView>
//                 </View>
//               </TouchableOpacity>
//             </MotiView>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   scrollPadding: { paddingBottom: 100 },
//   header: {
//     paddingTop: 60, paddingHorizontal: 24,
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginBottom: 5,
//   },
//   welcomeText: { fontSize: 13, color: "#64748B", fontWeight: "700", textTransform: "uppercase" },
//   userName: { fontSize: 26, color: "#1E293B", fontWeight: "900" },

//   heroWrapper: { paddingHorizontal: 20, marginVertical: 20 },
//   tokenCard: {
//     borderRadius: 32, padding: 24, elevation: 10,
//     shadowColor: COLORS.primary, shadowOpacity: 0.2,
//   },
//   cardTop: {
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginBottom: 10,
//   },
//   statusPill: {
//     backgroundColor: "rgba(255,255,255,0.15)",
//     paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
//   },
//   statusText: { color: "#fff", fontSize: 10, fontWeight: "900" },
//   tokenMain: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   tokenNumber: { color: "#fff", fontSize: 56, fontWeight: "900" },
//   tokenDetails: { marginLeft: 18, flex: 1 },
//   hospitalLabel: { color: "#fff", fontSize: 18, fontWeight: "800" },
//   deptLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2, fontWeight: "600" },
//   actionButton: {
//     backgroundColor: "#fff", paddingVertical: 14, borderRadius: 18,
//     flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8,
//   },
//   actionButtonText: { color: COLORS.primary, fontWeight: "900" },

//   sectionTitle: {
//     fontSize: 20, fontWeight: "900", color: "#1E293B",
//     marginBottom: 15, marginLeft: 24,
//   },
//   loadingCard: {
//     margin: 20, padding: 30, backgroundColor: "#fff",
//     borderRadius: 20, alignItems: "center",
//   },
//   loadingText: { color: COLORS.muted, fontWeight: "700" },
//   emptyCard: {
//     margin: 20, padding: 30, backgroundColor: "#fff", borderRadius: 20,
//     alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   emptyTitle: { color: "#1E293B", fontWeight: "900", fontSize: 18, marginTop: 12 },
//   emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6 },

//   hospitalCard: {
//     backgroundColor: "#fff", borderRadius: 28, padding: 18,
//     marginHorizontal: 20, marginBottom: 16, elevation: 3,
//     shadowColor: "#000", shadowOpacity: 0.05,
//   },
//   cardHeader: { flexDirection: "row", alignItems: "center" },
//   hospitalImage: { width: 60, height: 60, borderRadius: 18, backgroundColor: "#E2E8F0" },
//   headerInfo: { flex: 1, marginLeft: 15 },
//   hospitalName: { fontSize: 17, fontWeight: "800", color: "#1E293B" },
//   locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 },
//   distanceText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
//   cardDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 15 },
//   specialitySection: { marginTop: 2 },
//   label: {
//     fontSize: 11, color: "#94A3B8", fontWeight: "800",
//     textTransform: "uppercase", marginBottom: 10,
//   },
//   deptChip: {
//     flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC",
//     paddingRight: 12, paddingLeft: 6, paddingVertical: 6,
//     borderRadius: 99, marginRight: 10, borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   chipIcon: { width: 32, height: 32, borderRadius: 11 },
//   chipText: { fontSize: 11, fontWeight: "700", color: "#475569", marginLeft: 8 },
// });  











































// // PatientHomeScreen.js
// // Reads myActiveToken directly from QueueContext which auto-polls every 10s.
// // No per-screen interval needed — the hero card updates automatically.

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   View, Text, StyleSheet, ScrollView,
//   TouchableOpacity, Image, Dimensions, RefreshControl,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";
// import { useQueue } from "../../context/QueueContext";
// import { fetchMyProfile } from "../../services/apiService";

// const { width } = Dimensions.get("window");

// const DEPT_IMAGES = {
//   "Cardiology":  require("../../../assets/departments/cardiology.jpg"),
//   "ENT":         require("../../../assets/departments/ent.jpg"),
//   "General OPD": require("../../../assets/departments/generalopd.jpg"),
//   "Pediatrics":  require("../../../assets/departments/pediatrics.jpg"),
// };

// export default function PatientHomeScreen({ navigation }) {
//   const { hospitals, loading: hospitalsLoading, loadHospitals } = useHospital();
//   // myActiveToken is kept fresh by QueueContext's global 10s poll
//   const { myActiveToken, loadMyActiveToken } = useQueue();

//   const [patientName, setPatientName] = useState("");
//   const [refreshing, setRefreshing]   = useState(false);

//   // Load patient name once on mount
//   useEffect(() => {
//     loadPatientName();
//   }, []);

//   const loadPatientName = async () => {
//     try {
//       const storedName = await AsyncStorage.getItem("userName");
//       if (storedName) setPatientName(storedName);

//       const profile = await fetchMyProfile();
//       if (profile?.fullName) {
//         setPatientName(profile.fullName);
//         await AsyncStorage.setItem("userName", profile.fullName);
//       }
//     } catch (err) {
//       console.log("Could not load patient profile:", err.message);
//     }
//   };

//   // Pull-to-refresh: force an immediate token re-fetch + hospital reload
//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await Promise.all([loadHospitals(), loadMyActiveToken(), loadPatientName()]);
//     setRefreshing(false);
//   }, [loadHospitals, loadMyActiveToken]);

//   // Hero card shows token for all statuses throughout the day
//   // waiting/serving → live tracking; completed/skipped → appointment done
//   const currentToken = myActiveToken || null;

//   const tokenStatusColor = () => {
//     if (!currentToken) return [COLORS.primary, "#4F46E5"];
//     switch (currentToken.status) {
//       case "completed": return ["#16A34A", "#15803D"]; // green
//       case "skipped":   return ["#DC2626", "#B91C1C"]; // red
//       case "serving":   return ["#D97706", "#B45309"]; // amber
//       default:          return [COLORS.primary, "#4F46E5"]; // blue (waiting)
//     }
//   };

//   const tokenStatusLabel = () => {
//     if (!currentToken) return "READY TO BOOK";
//     switch (currentToken.status) {
//       case "completed": return "✓ COMPLETED";
//       case "skipped":   return "SKIPPED";
//       case "serving":   return "🔔 NOW SERVING";
//       default:          return "WAITING";
//     }
//   };

//   const firstName = patientName ? patientName.split(" ")[0] : "Patient";

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.welcomeText}>Health Dashboard</Text>
//           <Text style={styles.userName}>Hello, {firstName} 👋</Text>
//         </View>
//       </View>

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollPadding}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={[COLORS.primary]}
//           />
//         }
//       >
//         {/* ── Active Token Hero Card ──────────────────────────────────────── */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           style={styles.heroWrapper}
//         >
//           <LinearGradient
//             colors={[COLORS.primary, "#4F46E5"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.tokenCard}
//           >
//             <View style={styles.cardTop}>
//               <View style={styles.statusPill}>
//                 <Text style={styles.statusText}>
//                   {currentToken ? currentToken.status.toUpperCase() : "READY TO BOOK"}
//                 </Text>
//               </View>
//               <Ionicons name="medical" size={20} color="rgba(255,255,255,0.5)" />
//             </View>

//             <View style={styles.tokenMain}>
//               <Text style={styles.tokenNumber}>
//                 {currentToken ? currentToken.tokenNo : "--"}
//               </Text>
//               <View style={styles.tokenDetails}>
//                 <Text style={styles.hospitalLabel} numberOfLines={1}>
//                   {currentToken ? currentToken.hospitalName : "No Active Visit"}
//                 </Text>
//                 <Text style={styles.deptLabel}>
//                   {currentToken
//                     ? `${currentToken.department} • ${currentToken.doctor}`
//                     : "Select a hospital to begin"}
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity
//               activeOpacity={0.9}
//               style={styles.actionButton}
//               onPress={() => {
//                 if (!currentToken) {
//                   navigation.navigate("Hospitals");
//                 } else if (currentToken.status === "completed" || currentToken.status === "skipped") {
//                   navigation.navigate("Visits");
//                 } else {
//                   navigation.navigate("LiveQueue");
//                 }
//               }}
//             >
//               <Text style={styles.actionButtonText}>
//                 {currentToken ? "Track My Token" : "Book New Token"}
//               </Text>
//               <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
//             </TouchableOpacity>
//           </LinearGradient>
//         </MotiView>

//         {/* ── Hospital List ───────────────────────────────────────────────── */}
//         <Text style={styles.sectionTitle}>Available Hospitals</Text>

//         {hospitalsLoading && hospitals.length === 0 ? (
//           <View style={styles.loadingCard}>
//             <Text style={styles.loadingText}>Loading hospitals...</Text>
//           </View>
//         ) : hospitals.length === 0 ? (
//           <View style={styles.emptyCard}>
//             <Ionicons name="business-outline" size={42} color={COLORS.muted} />
//             <Text style={styles.emptyTitle}>No hospitals available</Text>
//             <Text style={styles.emptySub}>Approved hospitals will appear here.</Text>
//           </View>
//         ) : (
//           hospitals.map((hospital, index) => (
//             <MotiView
//               key={hospital.id || hospital.hospitalId}
//               from={{ opacity: 0, translateY: 20 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{ delay: index * 80 }}
//             >
//               <TouchableOpacity
//                 style={styles.hospitalCard}
//                 onPress={() => navigation.navigate("HospitalDetails", { hospital })}
//               >
//                 <View style={styles.cardHeader}>
//                   <Image
//                     source={{ uri: hospital.image || hospital.imageUrl }}
//                     style={styles.hospitalImage}
//                     defaultSource={require("../../../assets/departments/generalopd.jpg")}
//                   />
//                   <View style={styles.headerInfo}>
//                     <Text style={styles.hospitalName}>{hospital.name}</Text>
//                     <View style={styles.locationRow}>
//                       <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
//                       <Text style={styles.distanceText}>{hospital.city || "Nearby"}</Text>
//                     </View>
//                   </View>
//                   <Ionicons name="chevron-forward-outline" size={20} color="#CBD5E1" />
//                 </View>

//                 <View style={styles.cardDivider} />

//                 <View style={styles.specialitySection}>
//                   <Text style={styles.label}>Available Specialities:</Text>
//                   <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                     {(Array.isArray(hospital.departments)
//                       ? hospital.departments
//                       : ["General OPD"]
//                     ).map((dept, i) => (
//                       <View key={i} style={styles.deptChip}>
//                         <Image
//                           source={DEPT_IMAGES[dept] || DEPT_IMAGES["General OPD"]}
//                           style={styles.chipIcon}
//                         />
//                         <Text style={styles.chipText}>{dept}</Text>
//                       </View>
//                     ))}
//                   </ScrollView>
//                 </View>
//               </TouchableOpacity>
//             </MotiView>
//           ))
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F8FAFC" },
//   scrollPadding: { paddingBottom: 100 },
//   header: {
//     paddingTop: 60, paddingHorizontal: 24,
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginBottom: 5,
//   },
//   welcomeText: { fontSize: 13, color: "#64748B", fontWeight: "700", textTransform: "uppercase" },
//   userName: { fontSize: 26, color: "#1E293B", fontWeight: "900" },

//   heroWrapper: { paddingHorizontal: 20, marginVertical: 20 },
//   tokenCard: {
//     borderRadius: 32, padding: 24, elevation: 10,
//     shadowColor: COLORS.primary, shadowOpacity: 0.2,
//   },
//   cardTop: {
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", marginBottom: 10,
//   },
//   statusPill: {
//     backgroundColor: "rgba(255,255,255,0.15)",
//     paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
//   },
//   statusText: { color: "#fff", fontSize: 10, fontWeight: "900" },
//   tokenMain: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   tokenNumber: { color: "#fff", fontSize: 56, fontWeight: "900" },
//   tokenDetails: { marginLeft: 18, flex: 1 },
//   hospitalLabel: { color: "#fff", fontSize: 18, fontWeight: "800" },
//   deptLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2, fontWeight: "600" },
//   actionButton: {
//     backgroundColor: "#fff", paddingVertical: 14, borderRadius: 18,
//     flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8,
//   },
//   actionButtonText: { color: COLORS.primary, fontWeight: "900" },

//   sectionTitle: {
//     fontSize: 20, fontWeight: "900", color: "#1E293B",
//     marginBottom: 15, marginLeft: 24,
//   },
//   loadingCard: {
//     margin: 20, padding: 30, backgroundColor: "#fff",
//     borderRadius: 20, alignItems: "center",
//   },
//   loadingText: { color: COLORS.muted, fontWeight: "700" },
//   emptyCard: {
//     margin: 20, padding: 30, backgroundColor: "#fff", borderRadius: 20,
//     alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   emptyTitle: { color: "#1E293B", fontWeight: "900", fontSize: 18, marginTop: 12 },
//   emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6 },

//   hospitalCard: {
//     backgroundColor: "#fff", borderRadius: 28, padding: 18,
//     marginHorizontal: 20, marginBottom: 16, elevation: 3,
//     shadowColor: "#000", shadowOpacity: 0.05,
//   },
//   cardHeader: { flexDirection: "row", alignItems: "center" },
//   hospitalImage: { width: 60, height: 60, borderRadius: 18, backgroundColor: "#E2E8F0" },
//   headerInfo: { flex: 1, marginLeft: 15 },
//   hospitalName: { fontSize: 17, fontWeight: "800", color: "#1E293B" },
//   locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 },
//   distanceText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
//   cardDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 15 },
//   specialitySection: { marginTop: 2 },
//   label: {
//     fontSize: 11, color: "#94A3B8", fontWeight: "800",
//     textTransform: "uppercase", marginBottom: 10,
//   },
//   deptChip: {
//     flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC",
//     paddingRight: 12, paddingLeft: 6, paddingVertical: 6,
//     borderRadius: 99, marginRight: 10, borderWidth: 1, borderColor: "#E2E8F0",
//   },
//   chipIcon: { width: 32, height: 32, borderRadius: 11 },
//   chipText: { fontSize: 11, fontWeight: "700", color: "#475569", marginLeft: 8 },
// });  








































// PatientHomeScreen.js
// Reads myActiveToken directly from QueueContext which auto-polls every 10s.
// No per-screen interval needed — the hero card updates automatically.

import React, { useEffect, useState, useCallback } from "react";
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Dimensions, RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";
import { useQueue } from "../../context/QueueContext";
import { fetchMyProfile } from "../../services/apiService";

const { width } = Dimensions.get("window");

const DEPT_IMAGES = {
  "Cardiology":  require("../../../assets/departments/cardiology.jpg"),
  "ENT":         require("../../../assets/departments/ent.jpg"),
  "General OPD": require("../../../assets/departments/generalopd.jpg"),
  "Pediatrics":  require("../../../assets/departments/pediatrics.jpg"),
};

export default function PatientHomeScreen({ navigation }) {
  const { hospitals, loading: hospitalsLoading, loadHospitals } = useHospital();
  // myActiveToken is kept fresh by QueueContext's global 10s poll
  const { myActiveToken, loadMyActiveToken } = useQueue();

  const [patientName, setPatientName] = useState("");
  const [refreshing, setRefreshing]   = useState(false);

  // Load patient name once on mount
  useEffect(() => {
    loadPatientName();
  }, []);

  const loadPatientName = async () => {
    try {
      const storedName = await AsyncStorage.getItem("userName");
      if (storedName) setPatientName(storedName);

      const profile = await fetchMyProfile();
      if (profile?.fullName) {
        setPatientName(profile.fullName);
        await AsyncStorage.setItem("userName", profile.fullName);
      }
    } catch (err) {
      console.log("Could not load patient profile:", err.message);
    }
  };

  // Pull-to-refresh: force an immediate token re-fetch + hospital reload
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadHospitals(), loadMyActiveToken(), loadPatientName()]);
    setRefreshing(false);
  }, [loadHospitals, loadMyActiveToken]);

  // Hero card shows token for all statuses throughout the day
  // waiting/serving → live tracking; completed/skipped → appointment done
  const currentToken = myActiveToken || null;

  const tokenStatusColor = () => {
    if (!currentToken) return [COLORS.primary, "#4F46E5"];
    switch (currentToken.status) {
      case "completed": return ["#16A34A", "#15803D"]; // green
      case "skipped":   return ["#DC2626", "#B91C1C"]; // red
      case "serving":   return ["#D97706", "#B45309"]; // amber
      default:          return [COLORS.primary, "#4F46E5"]; // blue (waiting)
    }
  };

  const tokenStatusLabel = () => {
    if (!currentToken) return "READY TO BOOK";
    switch (currentToken.status) {
      case "completed": return "✓ COMPLETED";
      case "skipped":   return "SKIPPED";
      case "serving":   return "🔔 NOW SERVING";
      default:          return "WAITING";
    }
  };

  const firstName = patientName ? patientName.split(" ")[0] : "Patient";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Health Dashboard</Text>
          <Text style={styles.userName}>Hello, {firstName} 👋</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* ── Active Token Hero Card ──────────────────────────────────────── */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.heroWrapper}
        >
          <LinearGradient
            colors={[COLORS.primary, "#4F46E5"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tokenCard}
          >
            <View style={styles.cardTop}>
              <View style={styles.statusPill}>
                <Text style={styles.statusText}>
              {currentToken ? tokenStatusLabel() : "READY TO BOOK"}
                </Text>
              </View>
              <Ionicons name="medical" size={20} color="rgba(255,255,255,0.5)" />
            </View>

            <View style={styles.tokenMain}>
              <Text style={styles.tokenNumber}>
                {currentToken ? currentToken.tokenNo : "--"}
              </Text>
              <View style={styles.tokenDetails}>
                <Text style={styles.hospitalLabel} numberOfLines={1}>
                  {currentToken ? currentToken.hospitalName : "No Active Visit"}
                </Text>
                <Text style={styles.deptLabel}>
                  {currentToken
                    ? `${currentToken.department} • ${currentToken.doctor}`
                    : "Select a hospital to begin"}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.actionButton}
              onPress={() => {
                if (!currentToken) {
                  navigation.navigate("Hospitals");
                } else if (currentToken.status === "completed" || currentToken.status === "skipped") {
                  navigation.navigate("Visits");
                } else {
                  navigation.navigate("LiveQueue");
                }
              }}
            >
              <Text style={styles.actionButtonText}>
                {currentToken ? "Track My Token" : "Book New Token"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        {/* ── Hospital List ───────────────────────────────────────────────── */}
        <Text style={styles.sectionTitle}>Available Hospitals</Text>

        {hospitalsLoading && hospitals.length === 0 ? (
          <View style={styles.loadingCard}>
            <Text style={styles.loadingText}>Loading hospitals...</Text>
          </View>
        ) : hospitals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="business-outline" size={42} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No hospitals available</Text>
            <Text style={styles.emptySub}>Approved hospitals will appear here.</Text>
          </View>
        ) : (
          hospitals.map((hospital, index) => (
            <MotiView
              key={hospital.id || hospital.hospitalId}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 80 }}
            >
              <TouchableOpacity
                style={styles.hospitalCard}
                onPress={() => navigation.navigate("HospitalDetails", { hospital })}
              >
                <View style={styles.cardHeader}>
                  <Image
                    source={{ uri: hospital.image || hospital.imageUrl }}
                    style={styles.hospitalImage}
                    defaultSource={require("../../../assets/departments/generalopd.jpg")}
                  />
                  <View style={styles.headerInfo}>
                    <Text style={styles.hospitalName}>{hospital.name}</Text>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
                      <Text style={styles.distanceText}>{hospital.city || "Nearby"}</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward-outline" size={20} color="#CBD5E1" />
                </View>

                <View style={styles.cardDivider} />

                <View style={styles.specialitySection}>
                  <Text style={styles.label}>Available Specialities:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {(Array.isArray(hospital.departments)
                      ? hospital.departments
                      : ["General OPD"]
                    ).map((dept, i) => (
                      <View key={i} style={styles.deptChip}>
                        <Image
                          source={DEPT_IMAGES[dept] || DEPT_IMAGES["General OPD"]}
                          style={styles.chipIcon}
                        />
                        <Text style={styles.chipText}>{dept}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </MotiView>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollPadding: { paddingBottom: 100 },
  header: {
    paddingTop: 60, paddingHorizontal: 24,
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 5,
  },
  welcomeText: { fontSize: 13, color: "#64748B", fontWeight: "700", textTransform: "uppercase" },
  userName: { fontSize: 26, color: "#1E293B", fontWeight: "900" },

  heroWrapper: { paddingHorizontal: 20, marginVertical: 20 },
  tokenCard: {
    borderRadius: 32, padding: 24, elevation: 10,
    shadowColor: COLORS.primary, shadowOpacity: 0.2,
  },
  cardTop: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 10,
  },
  statusPill: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10,
  },
  statusText: { color: "#fff", fontSize: 10, fontWeight: "900" },
  tokenMain: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  tokenNumber: { color: "#fff", fontSize: 56, fontWeight: "900" },
  tokenDetails: { marginLeft: 18, flex: 1 },
  hospitalLabel: { color: "#fff", fontSize: 18, fontWeight: "800" },
  deptLabel: { color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 2, fontWeight: "600" },
  actionButton: {
    backgroundColor: "#fff", paddingVertical: 14, borderRadius: 18,
    flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 8,
  },
  actionButtonText: { color: COLORS.primary, fontWeight: "900" },

  sectionTitle: {
    fontSize: 20, fontWeight: "900", color: "#1E293B",
    marginBottom: 15, marginLeft: 24,
  },
  loadingCard: {
    margin: 20, padding: 30, backgroundColor: "#fff",
    borderRadius: 20, alignItems: "center",
  },
  loadingText: { color: COLORS.muted, fontWeight: "700" },
  emptyCard: {
    margin: 20, padding: 30, backgroundColor: "#fff", borderRadius: 20,
    alignItems: "center", borderWidth: 1, borderColor: "#E2E8F0",
  },
  emptyTitle: { color: "#1E293B", fontWeight: "900", fontSize: 18, marginTop: 12 },
  emptySub: { color: COLORS.muted, textAlign: "center", marginTop: 6 },

  hospitalCard: {
    backgroundColor: "#fff", borderRadius: 28, padding: 18,
    marginHorizontal: 20, marginBottom: 16, elevation: 3,
    shadowColor: "#000", shadowOpacity: 0.05,
  },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  hospitalImage: { width: 60, height: 60, borderRadius: 18, backgroundColor: "#E2E8F0" },
  headerInfo: { flex: 1, marginLeft: 15 },
  hospitalName: { fontSize: 17, fontWeight: "800", color: "#1E293B" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4, gap: 4 },
  distanceText: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  cardDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 15 },
  specialitySection: { marginTop: 2 },
  label: {
    fontSize: 11, color: "#94A3B8", fontWeight: "800",
    textTransform: "uppercase", marginBottom: 10,
  },
  deptChip: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAFC",
    paddingRight: 12, paddingLeft: 6, paddingVertical: 6,
    borderRadius: 99, marginRight: 10, borderWidth: 1, borderColor: "#E2E8F0",
  },
  chipIcon: { width: 32, height: 32, borderRadius: 11 },
  chipText: { fontSize: 11, fontWeight: "700", color: "#475569", marginLeft: 8 },
});