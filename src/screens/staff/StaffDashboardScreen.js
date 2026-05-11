


// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";

// const STAFF_COLOR = COLORS?.staff || "#059669";

// export default function StaffDashboardScreen({ navigation }) {
//   return (
//     <View style={styles.mainWrapper}>
//       <StatusBar barStyle="light-content" backgroundColor={STAFF_COLOR} />

//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 35 }}
//       >
//         {/* HEADER */}
//         <LinearGradient
//           colors={[STAFF_COLOR, "#0f9f9a", "#0f9f9a"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <View style={styles.headerTop}>
//             <View>
//               <Text style={styles.welcomeText}>Welcome back</Text>
//               <Text style={styles.title}>City Care Hospital</Text>
//               <Text style={styles.sub}>Hospital ID: HSP12456</Text>
//             </View>

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

//         {/* DUTY CARD */}
//         <View style={styles.dutyCard}>
//           <View style={styles.dutyIconBox}>
//             <Ionicons name="pulse-outline" size={26} color={STAFF_COLOR} />
//           </View>

//           <View style={{ flex: 1 }}>
//             <Text style={styles.dutyTitle}>Today’s Queue Duty</Text>
//             <Text style={styles.dutySub}>
//               Manage patient queue, walk-in tokens and reports
//             </Text>
//           </View>

//           <View style={styles.shiftBadge}>
//             <Text style={styles.shiftText}>Morning</Text>
//           </View>
//         </View>

//         {/* STATS */}
//         <View style={styles.grid}>
//           <Stat
//             title="Total Tokens"
//             value="86"
//             icon="ticket-outline"
//             color="#2563EB"
//             bg="#EFF6FF"
//           />
//           <Stat
//             title="Waiting"
//             value="24"
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
//             title="Completed"
//             value="62"
//             icon="checkmark-done-outline"
//             color="#059669"
//             bg="#ECFDF5"
//           />
//         </View>

//         {/* QUICK ACTIONS */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <Text style={styles.sectionLink}>Today</Text>
//         </View>

//         <ActionCard
//           title="Queue Management"
//           sub="Next, skip and complete patients"
//           icon="list-outline"
//           color={STAFF_COLOR}
//           onPress={() => navigation.navigate("Queue")}
//         />

//         <ActionCard
//           title="Create Walk-in Token"
//           sub="Add patient directly at hospital"
//           icon="add-circle-outline"
//           color="#2563EB"
//           onPress={() => navigation.navigate("Tokens")}
//         />

//         <ActionCard
//           title="View Reports"
//           sub="Overall rating and patient feedback reports"
//           icon="stats-chart-outline"
//           color="#8B5CF6"
//           onPress={() => navigation.navigate("Reports")}
//         />

//         <ActionCard
//           title="Patient Feedback"
//           sub="Check satisfaction, queue, doctor and cleanliness ratings"
//           icon="chatbox-ellipses-outline"
//           color="#EC4899"
//           onPress={() => navigation.navigate("Reports")}
//         />
//       </ScrollView>
//     </View>
//   );
// }

// function Stat({ title, value, icon, color, bg }) {
//   return (
//     <View style={styles.stat}>
//       <View style={styles.statTop}>
//         <View style={[styles.statIcon, { backgroundColor: bg }]}>
//           <Ionicons name={icon} size={21} color={color} />
//         </View>

//         <View style={styles.statMiniBadge}>
//           <Ionicons name="trending-up-outline" size={13} color={color} />
//         </View>
//       </View>

//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statTitle}>{title}</Text>
//     </View>
//   );
// }

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

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   container: {
//     flex: 1,
//   },

//   header: {
//     paddingTop: 56,
//     paddingHorizontal: 20,
//     paddingBottom: 28,
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
//     fontSize: 25,
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
//     elevation: 4,
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

//   bellBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 15,
//     backgroundColor: "rgba(255,255,255,0.16)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   notificationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 99,
//     backgroundColor: "#F97316",
//     position: "absolute",
//     top: 10,
//     right: 10,
//     borderWidth: 1.5,
//     borderColor: "#fff",
//   },

//   bgHeaderIcon: {
//     position: "absolute",
//     right: -20,
//     bottom: -24,
//   },

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

//   grid: {
//     marginTop: 22,
//     paddingHorizontal: 18,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 12,
//   },

//   stat: {
//     width: "48%",
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 17,
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
//     width: 42,
//     height: 42,
//     borderRadius: 15,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   statMiniBadge: {
//     width: 24,
//     height: 24,
//     borderRadius: 10,
//     backgroundColor: "#F8FAFC",
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

//   sectionLink: {
//     color: STAFF_COLOR,
//     fontSize: 12,
//     fontWeight: "900",
//   },

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

























// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const StaffDashboardScreen = ({ navigation }) => {
//     const [hospitalDetails, setHospitalDetails] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get('http://yourbackendapi/api/hospital/details')
//             .then(response => {
//                 setHospitalDetails(response.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching hospital details:', error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Hospital Dashboard</Text>
//             <Text>Name: {hospitalDetails.name}</Text>
//             <Text>Address: {hospitalDetails.address}</Text>
//             <Text>Contact: {hospitalDetails.contact}</Text>
//             {/* Display other hospital details as necessary */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
// });

// export default StaffDashboardScreen; 
























import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../constants/colors";

const BASE_URL = "http://192.168.0.3:8080/api";

export default function StaffDashboardScreen() {
  const [hospitalDetails, setHospitalDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHospital();
  }, []);

  const loadHospital = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/hospitals/details`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("Hospital Details:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to load hospital");
      }

      setHospitalDetails(data);
    } catch (err) {
      console.log("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.staff} />
      </View>
    );
  }

  if (!hospitalDetails) {
    return (
      <View style={styles.center}>
        <Text>No hospital data found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hospital Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Hospital Name</Text>
        <Text style={styles.value}>{hospitalDetails.name}</Text>

        <Text style={styles.label}>Hospital ID</Text>
        <Text style={styles.value}>{hospitalDetails.hospitalId}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{hospitalDetails.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>{hospitalDetails.phone}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{hospitalDetails.address}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{hospitalDetails.status}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.staff,
    marginTop: 60,
    marginBottom: 20,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  label: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 14,
  },

  value: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 4,
  },
});