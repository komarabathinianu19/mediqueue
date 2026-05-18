




// // HospitalDetailsScreen.js
// // Loads real doctors from backend and real live queue stats.

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   View, Text, StyleSheet, TouchableOpacity,
//   ScrollView, Image, RefreshControl,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useHospital } from "../../context/HospitalContext";
// import { useQueue } from "../../context/QueueContext";

// const departmentImages = {
//   "General OPD": require("../../../assets/departments/generalopd.jpg"),
//   Cardiology:    require("../../../assets/departments/cardiology.jpg"),
//   Pediatrics:    require("../../../assets/departments/pediatrics.jpg"),
//   ENT:           require("../../../assets/departments/ent.jpg"),
// };

// const getTodayDate = () => new Date().toISOString().split("T")[0];

// export default function HospitalDetailsScreen({ navigation, route }) {
//   const hospital = route?.params?.hospital;
//   const { getDoctorsByHospital } = useHospital();
//   const { loadQueueSummary } = useQueue();

//   const [doctors, setDoctors]         = useState([]);
//   const [summaries, setSummaries]     = useState({});  // key: "dept|doctor" → summary
//   const [loadingDocs, setLoadingDocs] = useState(true);
//   const [refreshing, setRefreshing]   = useState(false);

//   const hospitalId = hospital?.id || hospital?.hospitalId;

//   // Derive departments from doctors once loaded; fall back to hospital.departments or default
//   const departments = useMemo(() => {
//     if (doctors.length > 0) {
//       const fromDoctors = [...new Set(doctors.map((d) => d.department).filter(Boolean))];
//       if (fromDoctors.length > 0) return fromDoctors;
//     }
//     if (Array.isArray(hospital?.departments) && hospital.departments.length > 0)
//       return hospital.departments;
//     return ["General OPD"];
//   }, [doctors, hospital]);

//   // ── Load doctors ──────────────────────────────────────────────────────────
//   const loadDoctors = useCallback(async () => {
//     if (!hospitalId) return;
//     setLoadingDocs(true);
//     try {
//       const docs = await getDoctorsByHospital(hospitalId);
//       setDoctors(docs);
//     } catch (err) {
//       console.error("loadDoctors:", err.message);
//     } finally {
//       setLoadingDocs(false);
//     }
//   }, [hospitalId, getDoctorsByHospital]);

//   // ── Load queue summaries for all doctors ──────────────────────────────────
//   const loadAllSummaries = useCallback(async (docList) => {
//     if (!hospitalId || !docList.length) return;
//     const today = getTodayDate();

//     const results = await Promise.allSettled(
//       docList.map((doc) =>
//         loadQueueSummary(hospitalId, doc.department, doc.name, "morning", today)
//           .then((summary) => ({ key: `${doc.department}|${doc.name}`, summary }))
//       )
//     );

//     const map = {};
//     results.forEach((r) => {
//       if (r.status === "fulfilled" && r.value) {
//         map[r.value.key] = r.value.summary;
//       }
//     });
//     setSummaries(map);
//   }, [hospitalId, loadQueueSummary]);

//   useEffect(() => {
//     loadDoctors();
//   }, [loadDoctors]);

//   // When doctors state changes, load their summaries
//   useEffect(() => {
//     if (doctors.length > 0) {
//       loadAllSummaries(doctors);
//     }
//   }, [doctors]);

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     await loadDoctors();
//     setRefreshing(false);
//   }, [loadDoctors]);

//   // Group doctors by department
//   const doctorsByDept = departments.reduce((acc, dept) => {
//     acc[dept] = doctors.filter((d) => d.department === dept);
//     return acc;
//   }, {});

//   const getSummary = (department, doctorName) => {
//     return summaries[`${department}|${doctorName}`] || {
//       waitingCount: 0, currentServingNo: "None", totalBooked: 0,
//     };
//   };

//   // Navigate to BookToken with optional pre-filled department
//   const goToBookToken = (department = null) => {
//     navigation.navigate("BookToken", { hospital, selectedDepartment: department });
//   };

//   return (
//     <ScrollView
//       style={styles.container}
//       showsVerticalScrollIndicator={false}
//       refreshControl={
//         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
//       }
//     >
//       {/* Hero Image */}
//       <View style={styles.hero}>
//         <Image
//           source={{ uri: hospital?.image || hospital?.imageUrl }}
//           style={styles.heroImage}
//           defaultSource={require("../../../assets/departments/generalopd.jpg")}
//         />
//         <LinearGradient
//           colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.65)"]}
//           style={styles.overlay}
//         />
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Ionicons name="arrow-back" size={22} color="#fff" />
//         </TouchableOpacity>

//         <View style={styles.heroText}>
//           <Text style={styles.name}>{hospital?.name || "Hospital"}</Text>
//           <Text style={styles.address}>{hospital?.address || hospital?.city || ""}</Text>
//           <View style={styles.ratingRow}>
//             <Ionicons name="star" size={16} color="#FACC15" />
//             <Text style={styles.rating}>{hospital?.rating || "4.5"}</Text>
//             <Text style={styles.dot}>•</Text>
//             <Text style={styles.rating}>{hospital?.city || "Nearby"}</Text>
//           </View>
//         </View>
//       </View>

//       {/* Book Token CTA */}
//       <TouchableOpacity
//         style={styles.bookCTA}
//         onPress={() => goToBookToken()}
//       >
//         <LinearGradient
//           colors={[COLORS.primary, "#4F46E5"]}
//           style={styles.bookGradient}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 0 }}
//         >
//           <Ionicons name="ticket-outline" size={20} color="#fff" />
//           <Text style={styles.bookText}>Book Token</Text>
//         </LinearGradient>
//       </TouchableOpacity>

//       <View style={styles.content}>
//         <Text style={styles.section}>Departments & Doctors</Text>
//         <Text style={styles.sectionSub}>Tap a department or doctor to book a token.</Text>

//         {loadingDocs ? (
//           <View style={styles.loadingCard}>
//             <Text style={styles.loadingText}>Loading doctors...</Text>
//           </View>
//         ) : (
//           departments.map((department) => {
//             const deptDoctors = doctorsByDept[department] || [];
//             const deptImage = departmentImages[department] || departmentImages["General OPD"];

//             return (
//               <View key={department} style={styles.departmentBlock}>

//                 {/* ── Department header — tappable → BookToken with dept pre-filled ── */}
//                 <TouchableOpacity
//                   style={styles.departmentHeader}
//                   activeOpacity={0.82}
//                   onPress={() => goToBookToken(department)}
//                 >
//                   <View style={styles.departmentLeft}>
//                     <Image source={deptImage} style={styles.departmentImage} />
//                     <View style={{ flex: 1 }}>
//                       <Text style={styles.departmentTitle}>{department}</Text>
//                       <Text style={styles.departmentSub}>
//                         {deptDoctors.length > 0
//                           ? `${deptDoctors.length} doctor(s) available`
//                           : "No doctors added yet"}
//                       </Text>
//                     </View>
//                   </View>
//                   {/* Arrow to signal it's tappable */}
//                   <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
//                 </TouchableOpacity>

//                 {deptDoctors.length === 0 ? (
//                   <View style={styles.noDoctorsCard}>
//                     <Text style={styles.noDoctorsText}>No doctors added by hospital yet.</Text>
//                   </View>
//                 ) : (
//                   deptDoctors.map((doc) => {
//                     const stats = getSummary(department, doc.name);

//                     return (
//                       <TouchableOpacity
//                         key={doc.id}
//                         style={styles.doctorCard}
//                         activeOpacity={0.86}
//                         onPress={() =>
//                           navigation.navigate("DoctorLiveQueue", {
//                             hospital,
//                             department,
//                             doctor: doc.name,
//                             doctorId: doc.id,
//                           })
//                         }
//                       >
//                         <View style={styles.doctorIcon}>
//                           {doc.imageUrl ? (
//                             <Image source={{ uri: doc.imageUrl }} style={styles.doctorImg} />
//                           ) : (
//                             <Ionicons name="medkit-outline" size={22} color={COLORS.primary} />
//                           )}
//                         </View>

//                         <View style={{ flex: 1 }}>
//                           <Text style={styles.doctorName}>{doc.name}</Text>
//                           <Text style={styles.doctorMeta}>
//                             {doc.qualification || department}
//                             {doc.experience ? ` • ${doc.experience}` : ""}
//                           </Text>
//                           <Text style={styles.doctorMeta}>
//                             Now Serving: {stats.currentServingNo} • Waiting: {stats.waitingCount}
//                           </Text>
//                           <Text style={styles.doctorFee}>₹{doc.fee || 500} consultation</Text>
//                         </View>

//                         <View style={styles.waitPill}>
//                           <Text style={styles.waitPillText}>
//                             {(stats.waitingCount || 0) * 5} min
//                           </Text>
//                         </View>

//                         <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
//                       </TouchableOpacity>
//                     );
//                   })
//                 )}
//               </View>
//             );
//           })
//         )}
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
//     position: "absolute", top: 52, left: 18,
//     width: 44, height: 44, borderRadius: 16,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     alignItems: "center", justifyContent: "center",
//   },
//   heroText: { position: "absolute", left: 18, right: 18, bottom: 24 },
//   name: { fontSize: 28, fontWeight: "900", color: "#fff" },
//   address: { color: "rgba(255,255,255,0.85)", marginTop: 6, fontWeight: "600" },
//   ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
//   rating: { color: "#fff", fontWeight: "800" },
//   dot: { color: "#fff", fontWeight: "900" },

//   bookCTA: { marginHorizontal: 18, marginTop: 18, borderRadius: 18, overflow: "hidden" },
//   bookGradient: {
//     flexDirection: "row", alignItems: "center", justifyContent: "center",
//     gap: 10, paddingVertical: 16,
//   },
//   bookText: { color: "#fff", fontWeight: "900", fontSize: 16 },

//   content: { padding: 18 },
//   section: { marginTop: 10, marginBottom: 8, fontSize: 18, fontWeight: "900", color: COLORS.text },
//   sectionSub: { color: COLORS.muted, fontWeight: "600", marginBottom: 14 },

//   loadingCard: {
//     backgroundColor: COLORS.card, borderRadius: 20, padding: 24,
//     alignItems: "center", borderWidth: 1, borderColor: COLORS.border,
//   },
//   loadingText: { color: COLORS.muted, fontWeight: "700" },

//   departmentBlock: {
//     backgroundColor: COLORS.card, borderRadius: 26, padding: 14,
//     marginBottom: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2,
//   },
//   // FIX: departmentHeader is now a TouchableOpacity — styled to signal it's tappable
//   departmentHeader: {
//     backgroundColor: COLORS.lightBlue, borderRadius: 20, padding: 14, marginBottom: 12,
//     flexDirection: "row", alignItems: "center", justifyContent: "space-between",
//   },
//   departmentLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
//   departmentImage: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#fff" },
//   departmentTitle: { color: COLORS.primary, fontSize: 17, fontWeight: "900" },
//   departmentSub: { color: COLORS.muted, marginTop: 4, fontWeight: "700", fontSize: 12 },

//   noDoctorsCard: { padding: 14, alignItems: "center" },
//   noDoctorsText: { color: COLORS.muted, fontWeight: "600" },

//   doctorCard: {
//     backgroundColor: "#fff", borderRadius: 22, padding: 14, marginBottom: 12,
//     borderWidth: 1, borderColor: COLORS.border,
//     flexDirection: "row", alignItems: "center", gap: 12,
//   },
//   doctorIcon: {
//     width: 48, height: 48, borderRadius: 16,
//     backgroundColor: COLORS.lightBlue, alignItems: "center", justifyContent: "center",
//     overflow: "hidden",
//   },
//   doctorImg: { width: 48, height: 48 },
//   doctorName: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
//   doctorMeta: { color: COLORS.muted, fontWeight: "700", marginTop: 4, fontSize: 12 },
//   doctorFee: { color: COLORS.primary, fontWeight: "800", marginTop: 4, fontSize: 12 },
//   waitPill: {
//     backgroundColor: "#ECFDF5", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999,
//   },
//   waitPillText: { color: COLORS.success, fontSize: 12, fontWeight: "900" },
// });  






























// HospitalDetailsScreen.js
// Loads real doctors from backend and real live queue stats.

import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Image, RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";
import { useQueue } from "../../context/QueueContext";

const departmentImages = {
  "General OPD": require("../../../assets/departments/generalopd.jpg"),
  Cardiology:    require("../../../assets/departments/cardiology.jpg"),
  Pediatrics:    require("../../../assets/departments/pediatrics.jpg"),
  ENT:           require("../../../assets/departments/ent.jpg"),
};

const getTodayDate = () => new Date().toISOString().split("T")[0];

export default function HospitalDetailsScreen({ navigation, route }) {
  const hospital = route?.params?.hospital;
  const { getDoctorsByHospital } = useHospital();
  const { loadQueueSummary } = useQueue();

  const [doctors, setDoctors]         = useState([]);
  const [summaries, setSummaries]     = useState({});  // key: "dept|doctor" → summary
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [refreshing, setRefreshing]   = useState(false);

  const hospitalId = hospital?.id || hospital?.hospitalId;

  // Derive departments from doctors once loaded; fall back to hospital.departments or default
  const departments = useMemo(() => {
    if (doctors.length > 0) {
      const fromDoctors = [...new Set(doctors.map((d) => d.department).filter(Boolean))];
      if (fromDoctors.length > 0) return fromDoctors;
    }
    if (Array.isArray(hospital?.departments) && hospital.departments.length > 0)
      return hospital.departments;
    return ["General OPD"];
  }, [doctors, hospital]);

  // ── Load doctors ──────────────────────────────────────────────────────────
  const loadDoctors = useCallback(async () => {
    if (!hospitalId) return;
    setLoadingDocs(true);
    try {
      const docs = await getDoctorsByHospital(hospitalId);
      setDoctors(docs);
    } catch (err) {
      console.error("loadDoctors:", err.message);
    } finally {
      setLoadingDocs(false);
    }
  }, [hospitalId, getDoctorsByHospital]);

  // ── Load queue summaries for all doctors ──────────────────────────────────
  const loadAllSummaries = useCallback(async (docList) => {
    if (!hospitalId || !docList.length) return;
    const today = getTodayDate();

    const results = await Promise.allSettled(
      docList.map((doc) =>
        loadQueueSummary(hospitalId, doc.department, doc.name, "morning", today)
          .then((summary) => ({ key: `${doc.department}|${doc.name}`, summary }))
      )
    );

    const map = {};
    results.forEach((r) => {
      if (r.status === "fulfilled" && r.value) {
        map[r.value.key] = r.value.summary;
      }
    });
    setSummaries(map);
  }, [hospitalId, loadQueueSummary]);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  // When doctors state changes, load their summaries
  useEffect(() => {
    if (doctors.length > 0) {
      loadAllSummaries(doctors);
    }
  }, [doctors]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDoctors();
    setRefreshing(false);
  }, [loadDoctors]);

  // Group doctors by department
  const doctorsByDept = departments.reduce((acc, dept) => {
    acc[dept] = doctors.filter((d) => d.department === dept);
    return acc;
  }, {});

  const getSummary = (department, doctorName) => {
    return summaries[`${department}|${doctorName}`] || {
      waitingCount: 0, currentServingNo: "None", totalBooked: 0,
    };
  };

  // Navigate to BookToken with optional pre-filled department and/or doctor
  const goToBookToken = (department = null, doctor = null) => {
    navigation.navigate("BookToken", {
      hospital,
      selectedDepartment: department,
      selectedDoctor: doctor,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
      }
    >
      {/* Hero Image */}
      <View style={styles.hero}>
        <Image
          source={{ uri: hospital?.image || hospital?.imageUrl }}
          style={styles.heroImage}
          defaultSource={require("../../../assets/departments/generalopd.jpg")}
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.15)", "rgba(0,0,0,0.65)"]}
          style={styles.overlay}
        />
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.heroText}>
          <Text style={styles.name}>{hospital?.name || "Hospital"}</Text>
          <Text style={styles.address}>{hospital?.address || hospital?.city || ""}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FACC15" />
            <Text style={styles.rating}>{hospital?.rating || "4.5"}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.rating}>{hospital?.city || "Nearby"}</Text>
          </View>
        </View>
      </View>

      {/* Book Token CTA */}
      <TouchableOpacity
        style={styles.bookCTA}
        onPress={() => goToBookToken()}
      >
        <LinearGradient
          colors={[COLORS.primary, "#4F46E5"]}
          style={styles.bookGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="ticket-outline" size={20} color="#fff" />
          <Text style={styles.bookText}>Book Token</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.section}>Departments & Doctors</Text>
        <Text style={styles.sectionSub}>Tap a department or doctor to book a token.</Text>

        {loadingDocs ? (
          <View style={styles.loadingCard}>
            <Text style={styles.loadingText}>Loading doctors...</Text>
          </View>
        ) : (
          departments.map((department) => {
            const deptDoctors = doctorsByDept[department] || [];
            const deptImage = departmentImages[department] || departmentImages["General OPD"];

            return (
              <View key={department} style={styles.departmentBlock}>

                {/* Department header → BookToken with dept pre-filled */}
                <TouchableOpacity
                  style={styles.departmentHeader}
                  activeOpacity={0.82}
                  onPress={() => goToBookToken(department)}
                >
                  <View style={styles.departmentLeft}>
                    <Image source={deptImage} style={styles.departmentImage} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.departmentTitle}>{department}</Text>
                      <Text style={styles.departmentSub}>
                        {deptDoctors.length > 0
                          ? `${deptDoctors.length} doctor(s) available`
                          : "No doctors added yet"}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
                </TouchableOpacity>

                {deptDoctors.length === 0 ? (
                  <View style={styles.noDoctorsCard}>
                    <Text style={styles.noDoctorsText}>No doctors added by hospital yet.</Text>
                  </View>
                ) : (
                  deptDoctors.map((doc) => {
                    const stats = getSummary(department, doc.name);

                    return (
                      // Doctor card → BookToken with dept + doctor pre-filled
                      <TouchableOpacity
                        key={doc.id}
                        style={styles.doctorCard}
                        activeOpacity={0.86}
                        onPress={() => goToBookToken(department, doc.name)}
                      >
                        <View style={styles.doctorIcon}>
                          {doc.imageUrl ? (
                            <Image source={{ uri: doc.imageUrl }} style={styles.doctorImg} />
                          ) : (
                            <Ionicons name="medkit-outline" size={22} color={COLORS.primary} />
                          )}
                        </View>

                        <View style={{ flex: 1 }}>
                          <Text style={styles.doctorName}>{doc.name}</Text>
                          <Text style={styles.doctorMeta}>
                            {doc.qualification || department}
                            {doc.experience ? ` • ${doc.experience}` : ""}
                          </Text>
                          <Text style={styles.doctorMeta}>
                            Now Serving: {stats.currentServingNo} • Waiting: {stats.waitingCount}
                          </Text>
                          <Text style={styles.doctorFee}>₹{doc.fee || 500} consultation</Text>
                        </View>

                        <View style={styles.waitPill}>
                          <Text style={styles.waitPillText}>
                            {(stats.waitingCount || 0) * 5} min
                          </Text>
                        </View>

                        <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            );
          })
        )}
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
    position: "absolute", top: 52, left: 18,
    width: 44, height: 44, borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center", justifyContent: "center",
  },
  heroText: { position: "absolute", left: 18, right: 18, bottom: 24 },
  name: { fontSize: 28, fontWeight: "900", color: "#fff" },
  address: { color: "rgba(255,255,255,0.85)", marginTop: 6, fontWeight: "600" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 10 },
  rating: { color: "#fff", fontWeight: "800" },
  dot: { color: "#fff", fontWeight: "900" },

  bookCTA: { marginHorizontal: 18, marginTop: 18, borderRadius: 18, overflow: "hidden" },
  bookGradient: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 10, paddingVertical: 16,
  },
  bookText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  content: { padding: 18 },
  section: { marginTop: 10, marginBottom: 8, fontSize: 18, fontWeight: "900", color: COLORS.text },
  sectionSub: { color: COLORS.muted, fontWeight: "600", marginBottom: 14 },

  loadingCard: {
    backgroundColor: COLORS.card, borderRadius: 20, padding: 24,
    alignItems: "center", borderWidth: 1, borderColor: COLORS.border,
  },
  loadingText: { color: COLORS.muted, fontWeight: "700" },

  departmentBlock: {
    backgroundColor: COLORS.card, borderRadius: 26, padding: 14,
    marginBottom: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2,
  },
  departmentHeader: {
    backgroundColor: COLORS.lightBlue, borderRadius: 20, padding: 14, marginBottom: 12,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  departmentLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  departmentImage: { width: 48, height: 48, borderRadius: 16, backgroundColor: "#fff" },
  departmentTitle: { color: COLORS.primary, fontSize: 17, fontWeight: "900" },
  departmentSub: { color: COLORS.muted, marginTop: 4, fontWeight: "700", fontSize: 12 },

  noDoctorsCard: { padding: 14, alignItems: "center" },
  noDoctorsText: { color: COLORS.muted, fontWeight: "600" },

  doctorCard: {
    backgroundColor: "#fff", borderRadius: 22, padding: 14, marginBottom: 12,
    borderWidth: 1, borderColor: COLORS.border,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  doctorIcon: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: COLORS.lightBlue, alignItems: "center", justifyContent: "center",
    overflow: "hidden",
  },
  doctorImg: { width: 48, height: 48 },
  doctorName: { color: COLORS.text, fontSize: 16, fontWeight: "900" },
  doctorMeta: { color: COLORS.muted, fontWeight: "700", marginTop: 4, fontSize: 12 },
  doctorFee: { color: COLORS.primary, fontWeight: "800", marginTop: 4, fontSize: 12 },
  waitPill: {
    backgroundColor: "#ECFDF5", paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999,
  },
  waitPillText: { color: COLORS.success, fontSize: 12, fontWeight: "900" },
});