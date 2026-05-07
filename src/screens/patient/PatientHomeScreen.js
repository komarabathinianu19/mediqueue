

// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";
// import { useQueue } from "../../context/QueueContext";

// export default function PatientHomeScreen({ navigation }) {
//   const { approvedHospitals } = useHospital();
//   const { latestPatientToken } = useQueue();

//   const currentToken =
//     latestPatientToken &&
//     (latestPatientToken.status === "waiting" ||
//       latestPatientToken.status === "serving")
//       ? latestPatientToken
//       : null;

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.greet}>Hello, Ravi 👋</Text>
//           <Text style={styles.sub}>Find hospitals with less waiting time</Text>
//         </View>

//         <View style={styles.avatar}>
//           <Ionicons name="person-outline" size={22} color={COLORS.primary} />
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.tokenCard}
//       >
//         <View style={styles.tokenTopRow}>
//           <Text style={styles.whiteSub}>Your Current Token</Text>
//           <View style={styles.statusBadge}>
//             <Text style={styles.statusText}>
//               {currentToken ? currentToken.status : "none"}
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.token}>
//           {currentToken ? currentToken.tokenNo : "No Token"}
//         </Text>

//         <Text style={styles.whiteSub}>
//           {currentToken
//             ? `${currentToken.hospitalName} • ${currentToken.department}`
//             : "Book a hospital token to see live queue"}
//         </Text>

//         {currentToken && (
//           <Text style={styles.whiteSubSmall}>
//             Doctor: {currentToken.doctor || "Any Available"}
//           </Text>
//         )}

//         <TouchableOpacity
//           style={styles.tokenBtn}
//           onPress={() =>
//             currentToken
//               ? navigation.navigate("LiveQueue")
//               : navigation.navigate("Hospitals")
//           }
//         >
//           <Text style={styles.tokenBtnText}>
//             {currentToken ? "View Live Queue" : "Book Token"}
//           </Text>
//         </TouchableOpacity>
//       </LinearGradient>

//       <View style={styles.rowBetween}>
//         <Text style={styles.sectionTitle}>Approved Hospitals</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Hospitals")}>
//           <Text style={styles.link}>See All</Text>
//         </TouchableOpacity>
//       </View>

//       {approvedHospitals.length === 0 ? (
//         <View style={styles.emptyCard}>
//           <Text style={styles.emptyTitle}>No hospitals available</Text>
//           <Text style={styles.emptySub}>Approved hospitals will appear here.</Text>
//         </View>
//       ) : (
//         approvedHospitals.slice(0, 4).map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             style={styles.hospitalCard}
//             onPress={() =>
//               navigation.navigate("HospitalDetails", { hospital: item })
//             }
//           >
//             <Image source={{ uri: item.image }} style={styles.hospitalImage} />

//             <View style={{ flex: 1 }}>
//               <Text style={styles.hospitalName}>{item.name}</Text>
//               <Text style={styles.hospitalMeta}>
//                 {item.distance} • {item.wait}
//               </Text>
//             </View>

//             <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
//           </TouchableOpacity>
//         ))
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },

//   header: {
//     marginTop: 48,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   greet: { fontSize: 22, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4 },

//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   tokenCard: {
//     borderRadius: 26,
//     padding: 22,
//     marginBottom: 24,
//   },

//   tokenTopRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   whiteSub: { color: "rgba(255,255,255,0.9)", fontWeight: "700" },

//   whiteSubSmall: {
//     color: "rgba(255,255,255,0.82)",
//     fontWeight: "600",
//     marginTop: 8,
//     fontSize: 12,
//   },

//   statusBadge: {
//     backgroundColor: "rgba(255,255,255,0.22)",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 999,
//   },

//   statusText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 11,
//     textTransform: "capitalize",
//   },

//   token: {
//     color: "#fff",
//     fontSize: 42,
//     fontWeight: "900",
//     marginVertical: 8,
//   },

//   tokenBtn: {
//     backgroundColor: "rgba(255,255,255,0.22)",
//     padding: 12,
//     borderRadius: 16,
//     marginTop: 18,
//     alignItems: "center",
//   },

//   tokenBtnText: { color: "#fff", fontWeight: "900" },

//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.text },
//   link: { color: COLORS.primary, fontWeight: "800" },

//   hospitalCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 18,
//     padding: 14,
//     marginTop: 12,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   hospitalImage: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: COLORS.lightBlue,
//   },

//   hospitalName: { fontWeight: "900", color: COLORS.text },
//   hospitalMeta: { color: COLORS.muted, marginTop: 4, fontSize: 12 },

//   emptyCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 20,
//     padding: 20,
//     marginTop: 14,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   emptyTitle: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
//   emptySub: { color: COLORS.muted, marginTop: 6 },
// });  


























// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ImageBackground
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";
// import { useQueue } from "../../context/QueueContext";

// const { width } = Dimensions.get("window");

// export default function PatientHomeScreen({ navigation }) {
//   const { approvedHospitals } = useHospital();
//   const { latestPatientToken } = useQueue();

//   const currentToken =
//     latestPatientToken && (latestPatientToken.status === "waiting" || latestPatientToken.status === "serving")
//       ? latestPatientToken
//       : null;

//   return (
//     <View style={styles.container}>
//       {/* 1. Sleek Floating Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View style={styles.profileInfo}>
//             <Text style={styles.welcomeText}>Good Morning,</Text>
//             <Text style={styles.userName}>Ravi Kumar</Text>
//           </View>
//           <TouchableOpacity style={styles.notifBtn}>
//             <Ionicons name="notifications-outline" size={24} color="#1E293B" />
//             <View style={styles.dot} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
//         {/* 2. Floating Action Card (Minimalist Token) */}
//         <MotiView 
//           from={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           style={styles.actionCardWrapper}
//         >
//           <ImageBackground
//             source={{ uri: 'https://www.transparenttextures.com/patterns/cubes.png' }}
//             style={[styles.actionCard, { backgroundColor: COLORS.primary }]}
//             imageStyle={{ opacity: 0.1 }}
//           >
//             <View style={styles.cardHeader}>
//               <Text style={styles.activeLabel}>
//                 {currentToken ? "Active Appointment" : "No Active Booking"}
//               </Text>
//               <Ionicons name="medical" size={20} color="rgba(255,255,255,0.6)" />
//             </View>

//             <View style={styles.mainTokenSection}>
//               <Text style={styles.tokenTitle}>
//                 {currentToken ? currentToken.tokenNo : "--"}
//               </Text>
//               <View style={styles.verticalDivider} />
//               <View>
//                 <Text style={styles.hospitalNameSmall} numberOfLines={1}>
//                   {currentToken ? currentToken.hospitalName : "Ready to assist"}
//                 </Text>
//                 <Text style={styles.departmentText}>
//                   {currentToken ? currentToken.department : "Select a hospital"}
//                 </Text>
//               </View>
//             </View>

//             <TouchableOpacity 
//               style={styles.glassButton}
//               onPress={() => currentToken ? navigation.navigate("LiveQueue") : navigation.navigate("Hospitals")}
//             >
//               <Text style={styles.glassButtonText}>
//                 {currentToken ? "Track Progress" : "Book New Token"}
//               </Text>
//               <Ionicons name="chevron-forward" size={16} color="#fff" />
//             </TouchableOpacity>
//           </ImageBackground>
//         </MotiView>

//         {/* 3. Horizontal Featured Section */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Featured Hospitals</Text>
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false} 
//             contentContainerStyle={styles.horizontalScroll}
//           >
//             {approvedHospitals.map((item, index) => (
//               <MotiView
//                 key={item.id}
//                 from={{ opacity: 0, translateX: 50 }}
//                 animate={{ opacity: 1, translateX: 0 }}
//                 transition={{ delay: index * 100 }}
//               >
//                 <TouchableOpacity 
//                   style={styles.featuredCard}
//                   onPress={() => navigation.navigate("HospitalDetails", { hospital: item })}
//                 >
//                   <Image source={{ uri: item.image }} style={styles.featuredImg} />
//                   <LinearGradient
//                     colors={["transparent", "rgba(0,0,0,0.8)"]}
//                     style={styles.featuredOverlay}
//                   >
//                     <Text style={styles.fHospitalName}>{item.name}</Text>
//                     <View style={styles.fMeta}>
//                       <Ionicons name="star" size={12} color="#FBBF24" />
//                       <Text style={styles.fMetaText}>4.8 • {item.distance}</Text>
//                     </View>
//                   </LinearGradient>
//                 </TouchableOpacity>
//               </MotiView>
//             ))}
//           </ScrollView>
//         </View>

//         {/* 4. Category Grid */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Specialities</Text>
//           <View style={styles.grid}>
//             {[
//                 { name: 'Cardiology', icon: 'heart', color: '#FEE2E2', iconColor: '#EF4444' },
//                 { name: 'Pediatrics', icon: 'happy', color: '#E0F2FE', iconColor: '#0EA5E9' },
//                 { name: 'General', icon: 'medkit', color: '#F0FDF4', iconColor: '#22C55E' },
//                 { name: 'Dental', icon: 'sparkles', color: '#FEF3C7', iconColor: '#D97706' },
//             ].map((cat, i) => (
//               <TouchableOpacity key={i} style={styles.gridItem}>
//                 <View style={[styles.gridIcon, { backgroundColor: cat.color }]}>
//                   <Ionicons name={cat.icon} size={24} color={cat.iconColor} />
//                 </View>
//                 <Text style={styles.gridText}>{cat.name}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 20 },
//   headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   welcomeText: { fontSize: 14, color: '#64748B', fontWeight: '500' },
//   userName: { fontSize: 22, color: '#1E293B', fontWeight: '800' },
//   notifBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
//   dot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#fff' },
  
//   // Action Card
//   actionCardWrapper: { paddingHorizontal: 24, marginVertical: 10 },
//   actionCard: { borderRadius: 32, padding: 24, overflow: 'hidden', elevation: 15, shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 20 },
//   cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
//   activeLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
//   mainTokenSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
//   tokenTitle: { color: '#fff', fontSize: 44, fontWeight: '900' },
//   verticalDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 20 },
//   hospitalNameSmall: { color: '#fff', fontSize: 18, fontWeight: '700', width: width * 0.4 },
//   departmentText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2 },
//   glassButton: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 12, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, borderContent: 1, borderColor: 'rgba(255,255,255,0.3)' },
//   glassButtonText: { color: '#fff', fontWeight: '800' },

//   // Featured Scroll
//   section: { marginTop: 30 },
//   sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginLeft: 24, marginBottom: 15 },
//   horizontalScroll: { paddingLeft: 24, paddingRight: 10 },
//   featuredCard: { width: 220, height: 140, borderRadius: 24, marginRight: 15, overflow: 'hidden' },
//   featuredImg: { width: '100%', height: '100%' },
//   featuredOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 15 },
//   fHospitalName: { color: '#fff', fontSize: 16, fontWeight: '800' },
//   fMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
//   fMetaText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },

//   // Specialities Grid
//   grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, justifyContent: 'space-between' },
//   gridItem: { width: '23%', alignItems: 'center', marginBottom: 20 },
//   gridIcon: { width: 55, height: 55, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
//   gridText: { fontSize: 11, fontWeight: '700', color: '#475569' }
// }); 

















import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";
import { useQueue } from "../../context/QueueContext";

const { width } = Dimensions.get("window");

// Local asset mapping
const DEPT_IMAGES = {
  "Cardiology": require('../../../assets/departments/cardiology.jpg'),
  "ENT": require('../../../assets/departments/ent.jpg'),
  "General OPD": require('../../../assets/departments/generalopd.jpg'),
  "Pediatrics": require('../../../assets/departments/pediatrics.jpg'),
};

export default function PatientHomeScreen({ navigation }) {
  const { approvedHospitals } = useHospital();
  const { latestPatientToken } = useQueue();

  const currentToken =
    latestPatientToken && (latestPatientToken.status === "waiting" || latestPatientToken.status === "serving")
      ? latestPatientToken
      : null;

  return (
    <View style={styles.container}>
      {/* 1. Profile Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Health Dashboard</Text>
          <Text style={styles.userName}>Hello, Ravi 👋</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        
        {/* 2. Restored Token Hero Card */}
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
                   {currentToken ? currentToken.status.toUpperCase() : "READY TO BOOK"}
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
                  {currentToken ? currentToken.department : "Select a hospital to begin"}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              activeOpacity={0.9}
              style={styles.actionButton}
              onPress={() => currentToken ? navigation.navigate("LiveQueue") : navigation.navigate("Hospitals")}
            >
              <Text style={styles.actionButtonText}>
                {currentToken ? "Track My Token" : "Book New Token"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </LinearGradient>
        </MotiView>

        {/* 3. Hospital Cards (Wait-time removed) */}
        <Text style={styles.sectionTitle}>Available Hospitals</Text>

        {approvedHospitals.map((hospital, index) => (
          <MotiView
            key={hospital.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 100 }}
          >
            <TouchableOpacity 
              style={styles.hospitalCard}
              onPress={() => navigation.navigate("HospitalDetails", { hospital })}
            >
              {/* Image & Primary Info */}
              <View style={styles.cardHeader}>
                <Image source={{ uri: hospital.image }} style={styles.hospitalImage} />
                <View style={styles.headerInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-sharp" size={14} color={COLORS.primary} />
                    <Text style={styles.distanceText}>
                        {hospital.distance || "0.8 km"} • {hospital.city || "Hyderabad"}
                    </Text>
                  </View>
                </View>
                {/* Arrow instead of wait badge for cleaner look */}
                <Ionicons name="chevron-forward-outline" size={20} color="#CBD5E1" />
              </View>

              <View style={styles.cardDivider} />

              {/* Specialities Chips */}
              <View style={styles.specialitySection}>
                <Text style={styles.label}>Available Specialities:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                  {(hospital.departments || ["General OPD"]).map((dept, i) => (
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
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollPadding: { paddingBottom: 100 },
  header: { 
    paddingTop: 60, 
    paddingHorizontal: 24, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 5 
  },
  welcomeText: { fontSize: 13, color: '#64748B', fontWeight: '700', textTransform: 'uppercase' },
  userName: { fontSize: 26, color: '#1E293B', fontWeight: '900' },
  avatarBtn: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#fff', elevation: 3 },
  avatarImg: { width: '100%', height: '100%', borderRadius: 25 },

  // Token Hero Card Styles
  heroWrapper: { paddingHorizontal: 20, marginVertical: 20 },
  tokenCard: { borderRadius: 32, padding: 24, elevation: 10, shadowColor: COLORS.primary, shadowOpacity: 0.2 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusPill: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '900' },
  tokenMain: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  tokenNumber: { color: '#fff', fontSize: 56, fontWeight: '900' },
  tokenDetails: { marginLeft: 18, flex: 1 },
  hospitalLabel: { color: '#fff', fontSize: 18, fontWeight: '800' },
  deptLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 2, fontWeight: '600' },
  actionButton: { 
    backgroundColor: '#fff', 
    paddingVertical: 14, 
    borderRadius: 18, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    gap: 8 
  },
  actionButtonText: { color: COLORS.primary, fontWeight: '900' },

  // Hospital Card Styles
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#1E293B', marginBottom: 15, marginLeft: 24 },
  hospitalCard: { 
    backgroundColor: '#fff', 
    borderRadius: 28, 
    padding: 18, 
    marginHorizontal: 20,
    marginBottom: 16, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.05,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  hospitalImage: { width: 60, height: 60, borderRadius: 18 },
  headerInfo: { flex: 1, marginLeft: 15 },
  hospitalName: { fontSize: 17, fontWeight: '800', color: '#1E293B' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 4 },
  distanceText: { fontSize: 13, color: '#64748B', fontWeight: '600' },
  
  cardDivider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },

  specialitySection: { marginTop: 2 },
  label: { fontSize: 11, color: '#94A3B8', fontWeight: '800', textTransform: 'uppercase', marginBottom: 10 },
  chipScroll: { flexDirection: 'row' },
  deptChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F8FAFC', 
    paddingRight: 12, 
    paddingLeft: 6,
    paddingVertical: 6, 
    borderRadius: 99, 
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  chipIcon: { width: 32, height: 32, borderRadius: 11 },
  chipText: { fontSize: 11, fontWeight: '700', color: '#475569', marginLeft: 8 }
});