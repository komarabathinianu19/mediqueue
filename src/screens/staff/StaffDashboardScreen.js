



// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";

// export default function StaffDashboardScreen({ navigation }) {
//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.title}>City Care Hospital</Text>
//           <Text style={styles.sub}>Hospital ID: HSP12456</Text>
//         </View>

//       </View>
//       <View style={styles.grid}>
//         <Stat title="Total Tokens" value="86" icon="ticket-outline" />
//         <Stat title="Waiting" value="24" icon="people-outline" />
//         <Stat title="Serving" value="A-12" icon="pulse-outline" />
//         <Stat title="Completed" value="62" icon="checkmark-done-outline" />
//       </View>

//       <Text style={styles.sectionTitle}>Quick Actions</Text>

//       <TouchableOpacity
//         style={styles.action}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Queue")}
//       >
//         <View style={styles.actionIcon}>
//           <Ionicons name="list-outline" size={24} color={COLORS.staff} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.actionTitle}>Queue Management</Text>
//           <Text style={styles.actionSub}>Next, skip and complete patients</Text>
//         </View>

//         <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.action}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Tokens")}
//       >
//         <View style={styles.actionIcon}>
//           <Ionicons name="add-circle-outline" size={24} color={COLORS.staff} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.actionTitle}>Create Walk-in Token</Text>
//           <Text style={styles.actionSub}>Add patient directly at hospital</Text>
//         </View>

//         <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.action}
//         activeOpacity={0.85}
//         onPress={() => navigation.navigate("Reports")}
//       >
//         <View style={styles.actionIcon}>
//           <Ionicons name="stats-chart-outline" size={24} color={COLORS.staff} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.actionTitle}>View Reports</Text>
//           <Text style={styles.actionSub}>Waiting time and department load</Text>
//         </View>

//         <Ionicons name="chevron-forward" size={22} color={COLORS.muted} />
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function Stat({ title, value, icon }) {
//   return (
//     <View style={styles.stat}>
//       <View style={styles.statTop}>
//         <View style={styles.statIcon}>
//           <Ionicons name={icon} size={20} color={COLORS.staff} />
//         </View>
//       </View>

//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
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
//     marginBottom: 18,
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

//   profileCircle: {
//     width: 46,
//     height: 46,
//     borderRadius: 18,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#BBF7D0",
//   },

//   doctorCard: {
//     backgroundColor: COLORS.staff,
//     borderRadius: 28,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     overflow: "hidden",
//     marginBottom: 22,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.12,
//     shadowRadius: 18,
//     elevation: 5,
//   },

//   doctorTitle: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "900",
//   },

//   doctorSub: {
//     color: "rgba(255,255,255,0.88)",
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   doctorToken: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "900",
//     marginTop: 14,
//   },

//   doctorImage: {
//     width: 96,
//     height: 96,
//     borderRadius: 24,
//     backgroundColor: "rgba(255,255,255,0.2)",
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

//   statTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   statIcon: {
//     width: 38,
//     height: 38,
//     borderRadius: 14,
//     backgroundColor: "#ECFDF5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   statValue: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 14,
//   },

//   statTitle: {
//     color: COLORS.muted,
//     fontWeight: "800",
//     fontSize: 12,
//     marginTop: 4,
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
//     backgroundColor: "#ECFDF5",
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
// });  
























// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";

// export default function StaffDashboardScreen({ navigation }) {
//   return (
//     <View style={styles.mainWrapper}>
//       <StatusBar barStyle="light-content" />
      
//       {/* 1. Dark Compact Header */}
//       <View style={styles.topBar}>
//         <View style={styles.headerContent}>
//           <View>
//             <Text style={styles.hospitalName}>City Care Hospital</Text>
//             <Text style={styles.hospitalId}>ID: HSP12456 • Staff Portal</Text>
//           </View>
//           <TouchableOpacity style={styles.iconCircle}>
//             <Ionicons name="notifications-outline" size={20} color="#fff" />
//             <View style={styles.notifDot} />
//           </TouchableOpacity>
//         </View>

//         {/* 2. New Horizontal Serving Row (Replaces the large card) */}
//         <View style={styles.nowServingRow}>
//           <View style={styles.servingInfo}>
//             <Text style={styles.servingLabel}>CURRENTLY SERVING</Text>
//             <Text style={styles.servingValue}>A-12 <Text style={styles.servingDept}>• Gen OPD</Text></Text>
//           </View>
//           <TouchableOpacity 
//             style={styles.nextBtn}
//             onPress={() => navigation.navigate("Queue")}
//           >
//             <Text style={styles.nextBtnText}>NEXT PATIENT</Text>
//             <Ionicons name="play-skip-forward" size={14} color="#10B981" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
//         {/* 3. Metric Tiles (Compact Grid) */}
//         <Text style={styles.sectionTitle}>Shift Overview</Text>
//         <View style={styles.grid}>
//           <MetricTile title="Total Booked" value="86" icon="ticket-outline" color="#3B82F6" />
//           <MetricTile title="In Waiting" value="24" icon="people-outline" color="#F59E0B" />
//           <MetricTile title="Avg. Cycle" value="14m" icon="timer-outline" color="#8B5CF6" />
//           <MetricTile title="Completed" value="62" icon="checkmark-done" color="#10B981" />
//         </View>

//         {/* 4. Action List */}
//         <Text style={styles.sectionTitle}>Operations</Text>
        
//         <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Queue")}>
//           <View style={[styles.actionIcon, {backgroundColor: '#DBEAFE'}]}>
//             <Ionicons name="list" size={22} color="#1E40AF" />
//           </View>
//           <View style={{flex: 1}}>
//             <Text style={styles.actionTitle}>Queue Management</Text>
//             <Text style={styles.actionSub}>Call, skip, or transfer patients</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Tokens")}>
//           <View style={[styles.actionIcon, {backgroundColor: '#DCFCE7'}]}>
//             <Ionicons name="add-circle" size={22} color="#166534" />
//           </View>
//           <View style={{flex: 1}}>
//             <Text style={styles.actionTitle}>Walk-in Registration</Text>
//             <Text style={styles.actionSub}>Generate instant paper tokens</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate("Reports")}>
//           <View style={[styles.actionIcon, {backgroundColor: '#F3E8FF'}]}>
//             <Ionicons name="pie-chart" size={22} color="#6B21A8" />
//           </View>
//           <View style={{flex: 1}}>
//             <Text style={styles.actionTitle}>Shift Analytics</Text>
//             <Text style={styles.actionSub}>Check department load & bottlenecks</Text>
//           </View>
//           <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
//         </TouchableOpacity>

//         <View style={styles.footerInfo}>
//           <Text style={styles.footerText}>Logged in as Ravi (Senior Staff)</Text>
//           <Text style={styles.footerTime}>Shift ends in 3h 20m</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// // Compact Metric Component
// function MetricTile({ title, value, icon, color }) {
//   return (
//     <View style={styles.tile}>
//       <Ionicons name={icon} size={20} color={color} style={{marginBottom: 8}} />
//       <Text style={styles.tileValue}>{value}</Text>
//       <Text style={styles.tileTitle}>{title}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: { flex: 1, backgroundColor: "#F1F5F9" },
//   topBar: { backgroundColor: "#0F172A", paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
//   headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
//   hospitalName: { color: '#fff', fontSize: 20, fontWeight: '900' },
//   hospitalId: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '600' },
//   iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
//   notifDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#0F172A' },
  
//   nowServingRow: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
//   servingLabel: { color: '#10B981', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
//   servingValue: { color: '#fff', fontSize: 22, fontWeight: '900' },
//   servingDept: { fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: '600' },
//   nextBtn: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 6 },
//   nextBtnText: { color: '#10B981', fontWeight: '900', fontSize: 11 },

//   container: { flex: 1, paddingHorizontal: 20 },
//   sectionTitle: { fontSize: 14, fontWeight: "800", color: "#64748B", textTransform: 'uppercase', letterSpacing: 1, marginTop: 25, marginBottom: 15 },
  
//   grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: 'space-between', gap: 10 },
//   tile: { width: "48%", backgroundColor: "#fff", borderRadius: 20, padding: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05 },
//   tileValue: { fontSize: 24, fontWeight: "900", color: "#0F172A" },
//   tileTitle: { color: "#94A3B8", fontWeight: "700", fontSize: 12, marginTop: 2 },

//   actionCard: { backgroundColor: "#fff", borderRadius: 20, padding: 16, marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 15 },
//   actionIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
//   actionTitle: { fontSize: 16, fontWeight: "800", color: "#1E293B" },
//   actionSub: { color: "#94A3B8", fontSize: 12, fontWeight: "500", marginTop: 2 },

//   footerInfo: { marginTop: 30, marginBottom: 50, alignItems: 'center' },
//   footerText: { color: '#94A3B8', fontSize: 12, fontWeight: '700' },
//   footerTime: { color: '#64748B', fontSize: 11, marginTop: 4, fontWeight: '500' }
// });   





























import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";

const STAFF_COLOR = COLORS?.staff || "#059669";

export default function StaffDashboardScreen({ navigation }) {
  return (
    <View style={styles.mainWrapper}>
      <StatusBar barStyle="light-content" backgroundColor={STAFF_COLOR} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        {/* HEADER */}
        <LinearGradient
          colors={[STAFF_COLOR, "#0f9f9a", "#0f9f9a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.title}>City Care Hospital</Text>
              <Text style={styles.sub}>Hospital ID: HSP12456</Text>
            </View>

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

        {/* DUTY CARD */}
        <View style={styles.dutyCard}>
          <View style={styles.dutyIconBox}>
            <Ionicons name="pulse-outline" size={26} color={STAFF_COLOR} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.dutyTitle}>Today’s Queue Duty</Text>
            <Text style={styles.dutySub}>
              Manage patient queue, walk-in tokens and reports
            </Text>
          </View>

          <View style={styles.shiftBadge}>
            <Text style={styles.shiftText}>Morning</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.grid}>
          <Stat
            title="Total Tokens"
            value="86"
            icon="ticket-outline"
            color="#2563EB"
            bg="#EFF6FF"
          />
          <Stat
            title="Waiting"
            value="24"
            icon="people-outline"
            color="#F59E0B"
            bg="#FFFBEB"
          />
          <Stat
            title="Serving"
            value="A-12"
            icon="pulse-outline"
            color="#8B5CF6"
            bg="#F5F3FF"
          />
          <Stat
            title="Completed"
            value="62"
            icon="checkmark-done-outline"
            color="#059669"
            bg="#ECFDF5"
          />
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Text style={styles.sectionLink}>Today</Text>
        </View>

        <ActionCard
          title="Queue Management"
          sub="Next, skip and complete patients"
          icon="list-outline"
          color={STAFF_COLOR}
          onPress={() => navigation.navigate("Queue")}
        />

        <ActionCard
          title="Create Walk-in Token"
          sub="Add patient directly at hospital"
          icon="add-circle-outline"
          color="#2563EB"
          onPress={() => navigation.navigate("Tokens")}
        />

        <ActionCard
          title="View Reports"
          sub="Overall rating and patient feedback reports"
          icon="stats-chart-outline"
          color="#8B5CF6"
          onPress={() => navigation.navigate("Reports")}
        />

        <ActionCard
          title="Patient Feedback"
          sub="Check satisfaction, queue, doctor and cleanliness ratings"
          icon="chatbox-ellipses-outline"
          color="#EC4899"
          onPress={() => navigation.navigate("Reports")}
        />
      </ScrollView>
    </View>
  );
}

function Stat({ title, value, icon, color, bg }) {
  return (
    <View style={styles.stat}>
      <View style={styles.statTop}>
        <View style={[styles.statIcon, { backgroundColor: bg }]}>
          <Ionicons name={icon} size={21} color={color} />
        </View>

        <View style={styles.statMiniBadge}>
          <Ionicons name="trending-up-outline" size={13} color={color} />
        </View>
      </View>

      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

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

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
  },

  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 28,
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
    fontSize: 25,
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
    elevation: 4,
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

  bellBtn: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 99,
    backgroundColor: "#F97316",
    position: "absolute",
    top: 10,
    right: 10,
    borderWidth: 1.5,
    borderColor: "#fff",
  },

  bgHeaderIcon: {
    position: "absolute",
    right: -20,
    bottom: -24,
  },

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

  grid: {
    marginTop: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  stat: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 17,
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
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  statMiniBadge: {
    width: 24,
    height: 24,
    borderRadius: 10,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
  },

  statValue: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 14,
  },

  statTitle: {
    color: COLORS.muted,
    fontWeight: "800",
    fontSize: 12,
    marginTop: 4,
  },

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

  sectionLink: {
    color: STAFF_COLOR,
    fontSize: 12,
    fontWeight: "900",
  },

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