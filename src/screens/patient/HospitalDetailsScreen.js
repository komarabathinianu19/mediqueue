




// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// const doctorMap = {
//   "General OPD": ["Dr. Sandeep", "Dr. Ramesh"],
//   Cardiology: ["Dr. Rao", "Dr. Kavitha"],
//   Pediatrics: ["Dr. Meena", "Dr. John"],
//   Ortho: ["Dr. Kiran", "Dr. Vivek"],
//   Dental: ["Dr. Neha", "Dr. Arjun"],
// };

// export default function HospitalDetailsScreen({ navigation, route }) {
//   const hospital = route?.params?.hospital;
//   const { tokens } = useQueue();

//   const departments =
//     Array.isArray(hospital?.departments) && hospital.departments.length > 0
//       ? hospital.departments
//       : ["General OPD"];

//   const getQueueStats = (department, doctor) => {
//     const queue = tokens.filter(
//       (t) =>
//         t.hospitalId === hospital?.id &&
//         t.department === department &&
//         t.doctor === doctor &&
//         (t.status === "waiting" || t.status === "serving")
//     );

//     return {
//       active: queue.length,
//       waiting: queue.filter((t) => t.status === "waiting").length,
//       serving: queue.find((t) => t.status === "serving")?.tokenNo || "None",
//     };
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <View style={styles.hero}>
//         <Image source={{ uri: hospital?.image }} style={styles.heroImage} />

//         <LinearGradient
//           colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.65)"]}
//           style={styles.overlay}
//         />

//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Ionicons name="arrow-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.heroText}>
//           <Text style={styles.name}>{hospital?.name || "City Care Hospital"}</Text>
//           <Text style={styles.address}>{hospital?.address || "Hyderabad"}</Text>

//           <View style={styles.ratingRow}>
//             <Ionicons name="star" size={16} color="#FACC15" />
//             <Text style={styles.rating}>{hospital?.rating || 4.5}</Text>
//             <Text style={styles.dot}>•</Text>
//             <Text style={styles.rating}>{hospital?.distance || "Nearby"}</Text>
//           </View>
//         </View>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.section}>Select Department & Doctor</Text>
//         <Text style={styles.sectionSub}>
//           Tap any doctor to view live queue and book appointment
//         </Text>

//         {departments.map((department) => {
//           const doctors = doctorMap[department] || ["Any Available"];

//           return (
//             <View key={department} style={styles.departmentBlock}>
//               <View style={styles.departmentHeader}>
//                 <View>
//                   <Text style={styles.departmentTitle}>{department}</Text>
//                   <Text style={styles.departmentSub}>
//                     {doctors.length} doctor(s) available
//                   </Text>
//                 </View>

//                 <View style={styles.departmentIcon}>
//                   <Ionicons
//                     name="git-branch-outline"
//                     size={20}
//                     color={COLORS.primary}
//                   />
//                 </View>
//               </View>

//               {doctors.map((doctor) => {
//                 const stats = getQueueStats(department, doctor);

//                 return (
//                   <TouchableOpacity
//                     key={`${department}-${doctor}`}
//                     style={styles.doctorCard}
//                     activeOpacity={0.86}
//                     onPress={() =>
//                       navigation.navigate("DoctorLiveQueue", {
//                         hospital,
//                         department,
//                         doctor,
//                       })
//                     }
//                   >
//                     <View style={styles.doctorIcon}>
//                       <Ionicons
//                         name="medkit-outline"
//                         size={22}
//                         color={COLORS.primary}
//                       />
//                     </View>

//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.doctorName}>{doctor}</Text>
//                       <Text style={styles.doctorMeta}>
//                         Serving: {stats.serving} • Waiting: {stats.waiting}
//                       </Text>
//                     </View>

//                     <View style={styles.waitPill}>
//                       <Text style={styles.waitPillText}>
//                         {stats.waiting * 5} min
//                       </Text>
//                     </View>

//                     <Ionicons
//                       name="chevron-forward"
//                       size={20}
//                       color={COLORS.muted}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           );
//         })}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },

//   hero: { height: 300, position: "relative" },
//   heroImage: { width: "100%", height: "100%" },
//   overlay: { ...StyleSheet.absoluteFillObject },

//   backBtn: {
//     position: "absolute",
//     top: 52,
//     left: 18,
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   heroText: {
//     position: "absolute",
//     left: 18,
//     right: 18,
//     bottom: 24,
//   },

//   name: { fontSize: 28, fontWeight: "900", color: "#fff" },

//   address: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   ratingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     marginTop: 10,
//   },

//   rating: { color: "#fff", fontWeight: "800" },
//   dot: { color: "#fff", fontWeight: "900" },

//   content: { padding: 18 },

//   section: {
//     marginTop: 10,
//     marginBottom: 8,
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sectionSub: {
//     color: COLORS.muted,
//     fontWeight: "600",
//     marginBottom: 14,
//   },

//   departmentBlock: {
//     backgroundColor: COLORS.card,
//     borderRadius: 26,
//     padding: 14,
//     marginBottom: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   departmentHeader: {
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 20,
//     padding: 14,
//     marginBottom: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   departmentTitle: {
//     color: COLORS.primary,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   departmentSub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontWeight: "700",
//     fontSize: 12,
//   },

//   departmentIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 16,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorCard: {
//     backgroundColor: "#fff",
//     borderRadius: 22,
//     padding: 14,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   doctorIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorName: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: "900",
//   },

//   doctorMeta: {
//     color: COLORS.muted,
//     fontWeight: "700",
//     marginTop: 4,
//     fontSize: 12,
//   },

//   waitPill: {
//     backgroundColor: "#ECFDF5",
//     paddingHorizontal: 10,
//     paddingVertical: 7,
//     borderRadius: 999,
//   },

//   waitPillText: {
//     color: COLORS.success,
//     fontSize: 12,
//     fontWeight: "900",
//   },
// });  
























import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useQueue } from "../../context/QueueContext";

const departmentImages = {
  "General OPD": require("../../../assets/departments/generalopd.jpg"),
  Cardiology: require("../../../assets/departments/cardiology.jpg"),
  Pediatrics: require("../../../assets/departments/pediatrics.jpg"),
  ENT: require("../../../assets/departments/ent.jpg")

};

const doctorMap = {
  "General OPD": ["Dr. Sandeep", "Dr. Ramesh"],
  Cardiology: ["Dr. Rao", "Dr. Kavitha"],
  Pediatrics: ["Dr. Meena", "Dr. John"],
  Ortho: ["Dr. Kiran", "Dr. Vivek"],
  Dental: ["Dr. Neha", "Dr. Arjun"],
  ENT: ["Dr. Sameer Khan"],
};

const getTodayDate = () => new Date().toISOString().split("T")[0];

export default function HospitalDetailsScreen({ navigation, route }) {
  const hospital = route?.params?.hospital;
  const { tokens } = useQueue();

  const departments =
    Array.isArray(hospital?.departments) && hospital.departments.length > 0
      ? hospital.departments
      : ["General OPD"];

  const getDoctors = (department) => {
    const hospitalDoctors = hospital?.doctorList || [];
    const filtered = hospitalDoctors.filter((doc) => doc.department === department);

    if (filtered.length > 0) return filtered;

    return (doctorMap[department] || ["Any Available"]).map((name) => ({
      id: name,
      name,
      department,
      qualification: department,
      fee: 500,
    }));
  };

  const getQueueStats = (department, doctor) => {
    const todayQueue = tokens.filter(
      (t) =>
        t.hospitalId === hospital?.id &&
        t.department === department &&
        t.doctor === doctor &&
        t.date === getTodayDate() &&
        (t.status === "waiting" || t.status === "serving")
    );

    return {
      active: todayQueue.length,
      waiting: todayQueue.filter((t) => t.status === "waiting").length,
      serving: todayQueue.find((t) => t.status === "serving")?.tokenNo || "None",
    };
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Image source={{ uri: hospital?.image }} style={styles.heroImage} />

        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.65)"]}
          style={styles.overlay}
        />

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroText}>
          <Text style={styles.name}>{hospital?.name || "City Care Hospital"}</Text>
          <Text style={styles.address}>{hospital?.address || "Hyderabad"}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FACC15" />
            <Text style={styles.rating}>{hospital?.rating || 4.5}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.rating}>{hospital?.distance || "Nearby"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.section}>Select Department & Doctor</Text>
        <Text style={styles.sectionSub}>
          Tap any doctor to view Morning, Afternoon and Night live queue.
        </Text>

        {departments.map((department) => {
          const doctors = getDoctors(department);
          const deptImage =
            departmentImages[department] || departmentImages["General OPD"];

          return (
            <View key={department} style={styles.departmentBlock}>
              <View style={styles.departmentHeader}>
                <View style={styles.departmentLeft}>
                  <Image source={deptImage } style={styles.departmentImage} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.departmentTitle}>{department}</Text>
                    <Text style={styles.departmentSub}>
                      {doctors.length} doctor(s) available
                    </Text>
                  </View>
                </View>
              </View>

              {doctors.map((doctorItem) => {
                const doctorName = doctorItem.name || doctorItem;
                const stats = getQueueStats(department, doctorName);

                return (
                  <TouchableOpacity
                    key={`${department}-${doctorName}`}
                    style={styles.doctorCard}
                    activeOpacity={0.86}
                    onPress={() =>
                      navigation.navigate("DoctorLiveQueue", {
                        hospital,
                        department,
                        doctor: doctorName,
                      })
                    }
                  >
                    <View style={styles.doctorIcon}>
                      <Ionicons
                        name="medkit-outline"
                        size={22}
                        color={COLORS.primary}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.doctorName}>{doctorName}</Text>
                      <Text style={styles.doctorMeta}>
                        Serving: {stats.serving} • Waiting: {stats.waiting}
                      </Text>
                      <Text style={styles.doctorMeta}>
                        Fee: ₹{doctorItem.fee || 500}
                      </Text>
                    </View>

                    <View style={styles.waitPill}>
                      <Text style={styles.waitPillText}>{stats.waiting * 5} min</Text>
                    </View>

                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={COLORS.muted}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  hero: { height: 300, position: "relative" },
  heroImage: { width: "100%", height: "100%" },
  overlay: { ...StyleSheet.absoluteFillObject },

  backBtn: {
    position: "absolute",
    top: 52,
    left: 18,
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  heroText: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 24,
  },

  name: { fontSize: 28, fontWeight: "900", color: "#fff" },

  address: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
    fontWeight: "600",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },

  rating: { color: "#fff", fontWeight: "800" },
  dot: { color: "#fff", fontWeight: "900" },

  content: { padding: 18 },

  section: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
  },

  sectionSub: {
    color: COLORS.muted,
    fontWeight: "600",
    marginBottom: 14,
  },

  departmentBlock: {
    backgroundColor: COLORS.card,
    borderRadius: 26,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  departmentHeader: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },

  departmentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  departmentImage: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#fff",
  },

  departmentTitle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "900",
  },

  departmentSub: {
    color: COLORS.muted,
    marginTop: 4,
    fontWeight: "700",
    fontSize: 12,
  },

  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  doctorIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  doctorName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "900",
  },

  doctorMeta: {
    color: COLORS.muted,
    fontWeight: "700",
    marginTop: 4,
    fontSize: 12,
  },

  waitPill: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
  },

  waitPillText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: "900",
  },
});