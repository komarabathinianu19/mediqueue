




// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { fetchHospitalById, approveHospital, rejectHospital } from "../../services/apiService";

// export default function HospitalVerificationScreen({ route, navigation }) {
//   const { hospitalId } = route.params;
//   const [hospital, setHospital] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadHospitalData();
//   }, [hospitalId]);

//   const loadHospitalData = async () => {
//     try {
//       const data = await fetchHospitalById(hospitalId);
//       setHospital(data);
//     } catch (err) {
//       Alert.alert("Error", err.message || "Could not load hospital details.");
//       navigation.goBack();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async () => {
//     try {
//       await approveHospital(hospitalId);
//       setHospital((prev) => ({ ...prev, status: "APPROVED" }));
//       Alert.alert(
//         "Approved ✓",
//         `${hospital.name} is now approved and can login.`,
//         [{ text: "OK", onPress: () => navigation.goBack() }]
//       );
//     } catch (err) {
//       Alert.alert("Error", err.message || "Failed to approve.");
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await rejectHospital(hospitalId);
//       setHospital((prev) => ({ ...prev, status: "REJECTED" }));
//       Alert.alert(
//         "Rejected",
//         `${hospital.name} has been rejected.`,
//         [{ text: "OK", onPress: () => navigation.goBack() }]
//       );
//     } catch (err) {
//       Alert.alert("Error", err.message || "Failed to reject.");
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   if (!hospital) return null;

//   const statusColor =
//     hospital.status === "APPROVED" ? "#22C55E"
//     : hospital.status === "REJECTED" ? "#EF4444"
//     : "#F59E0B";

//   const statusBg =
//     hospital.status === "APPROVED" ? "#F0FDF4"
//     : hospital.status === "REJECTED" ? "#FEF2F2"
//     : "#FFF7ED";

//   const registeredOn = hospital.createdAt
//     ? new Date(hospital.createdAt).toLocaleDateString("en-IN", {
//         day: "numeric", month: "short", year: "numeric",
//         hour: "2-digit", minute: "2-digit",
//       })
//     : null;

//   const deptDisplay = Array.isArray(hospital.departments)
//     ? hospital.departments.join(", ")
//     : hospital.departments || null;

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//       </TouchableOpacity>
//       <Text style={styles.title}>Hospital Verification</Text>

//       <Image
//         source={{ uri: hospital.imageUrl || "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400" }}
//         style={styles.heroImage}
//       />

//       <View style={styles.nameRow}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.name}>{hospital.name}</Text>
//           <Text style={styles.cityText}>
//             {[hospital.city, hospital.type].filter(Boolean).join(" · ")}
//           </Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: statusBg, borderColor: statusColor + "40" }]}>
//           <Text style={[styles.statusText, { color: statusColor }]}>{hospital.status}</Text>
//         </View>
//       </View>

//       <SectionHeader title="Owner & Contact" icon="person-circle-outline" />
//       <View style={styles.card}>
//         <Info label="Owner Name"    value={hospital.ownerName} />
//         <Info label="Mobile Number" value={hospital.phone} />
//         <Info label="Email"         value={hospital.email} last />
//       </View>

//       <SectionHeader title="Location" icon="location-outline" />
//       <View style={styles.card}>
//         <Info label="City"    value={hospital.city} />
//         <Info label="Address" value={hospital.address} last />
//       </View>

//       <SectionHeader title="Licensing & Registration" icon="shield-checkmark-outline" />
//       <View style={styles.card}>
//         <Info label="Registration No." value={hospital.registrationNumber} mono />
//         <Info label="License No."      value={hospital.licenseNumber} mono last />
//       </View>

//       <SectionHeader title="Hospital Details" icon="business-outline" />
//       <View style={styles.card}>
//         <Info label="Hospital Type"     value={hospital.type} />
//         <Info label="Departments"       value={deptDisplay} />
//         <Info label="Number of Doctors" value={hospital.numberOfDoctors?.toString()} />
//         <Info label="Opening Time"      value={hospital.openingTime} />
//         <Info label="Closing Time"      value={hospital.closingTime} last />
//       </View>

//       {hospital.description ? (
//         <>
//           <SectionHeader title="About" icon="information-circle-outline" />
//           <View style={[styles.card, { paddingVertical: 14 }]}>
//             <Text style={styles.description}>{hospital.description}</Text>
//           </View>
//         </>
//       ) : null}

//       <SectionHeader title="Registration Meta" icon="time-outline" />
//       <View style={styles.card}>
//         <Info label="Hospital ID"  value={hospital.hospitalId} mono />
//         {registeredOn && <Info label="Submitted On" value={registeredOn} />}
//         <Info label="Status" value={hospital.status} last />
//       </View>

//       {hospital.status === "PENDING" && (
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.approve} onPress={handleApprove}>
//             <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
//             <Text style={styles.approveText}>Approve</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.reject} onPress={handleReject}>
//             <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
//             <Text style={styles.rejectText}>Reject</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <View style={{ height: 40 }} />
//     </ScrollView>
//   );
// }

// function SectionHeader({ title, icon }) {
//   return (
//     <View style={styles.sectionHeader}>
//       <Ionicons name={icon} size={16} color={COLORS.staff} />
//       <Text style={styles.sectionTitle}>{title}</Text>
//     </View>
//   );
// }

// function Info({ label, value, mono, last }) {
//   return (
//     <View style={[styles.infoRow, last && { borderBottomWidth: 0 }]}>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={[styles.value, mono && styles.mono]} numberOfLines={2}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
//   center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
//   backBtn: {
//     marginTop: 52, width: 44, height: 44, borderRadius: 16,
//     backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   title: { marginTop: 16, fontSize: 24, fontWeight: "900", color: COLORS.text },
//   heroImage: { width: "100%", height: 190, borderRadius: 24, marginTop: 18, backgroundColor: COLORS.card },
//   nameRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 16, marginBottom: 4, gap: 10 },
//   name: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   cityText: { color: COLORS.muted, marginTop: 3, fontSize: 13 },
//   statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, marginTop: 2 },
//   statusText: { fontSize: 12, fontWeight: "900", letterSpacing: 0.5 },
//   sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 20, marginBottom: 8, paddingHorizontal: 2 },
//   sectionTitle: { fontSize: 13, fontWeight: "800", color: COLORS.staff, textTransform: "uppercase", letterSpacing: 0.8 },
//   card: { backgroundColor: COLORS.card, borderRadius: 22, paddingHorizontal: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
//   infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
//   label: { color: COLORS.muted, fontWeight: "700", flex: 1, fontSize: 13 },
//   value: { color: COLORS.text, fontWeight: "800", flex: 1.2, textAlign: "right", fontSize: 13 },
//   mono: { fontFamily: "monospace", fontSize: 12, letterSpacing: 0.5 },
//   description: { color: COLORS.text, fontSize: 13, lineHeight: 20, fontWeight: "500" },
//   row: { flexDirection: "row", gap: 12, marginTop: 24 },
//   approve: { flex: 1, height: 54, borderRadius: 16, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
//   reject: { flex: 1, height: 54, borderRadius: 16, backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderWidth: 1, borderColor: "#FECACA" },
//   approveText: { color: "#fff", fontWeight: "900", fontSize: 15 },
//   rejectText: { color: "#EF4444", fontWeight: "900", fontSize: 15 },
// });  

































// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { fetchHospitalById, approveHospital, rejectHospital } from "../../services/apiService";

// export default function HospitalVerificationScreen({ route, navigation }) {
//   const { hospitalId } = route.params;
//   const [hospital, setHospital] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadHospitalData();
//   }, [hospitalId]);

//   const loadHospitalData = async () => {
//     try {
//       const data = await fetchHospitalById(hospitalId);
//       setHospital(data);
//     } catch (err) {
//       Alert.alert("Error", err.message || "Could not load hospital details.");
//       navigation.goBack();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async () => {
//     try {
//       await approveHospital(hospitalId);
//       setHospital((prev) => ({ ...prev, status: "APPROVED" }));
//       Alert.alert(
//         "Approved ✓",
//         `${hospital.name} is now approved and can login.`,
//         [{ text: "OK", onPress: () => navigation.goBack() }]
//       );
//     } catch (err) {
//       Alert.alert("Error", err.message || "Failed to approve.");
//     }
//   };

//   const handleReject = async () => {
//     try {
//       await rejectHospital(hospitalId);
//       setHospital((prev) => ({ ...prev, status: "REJECTED" }));
//       Alert.alert(
//         "Rejected",
//         `${hospital.name} has been rejected.`,
//         [{ text: "OK", onPress: () => navigation.goBack() }]
//       );
//     } catch (err) {
//       Alert.alert("Error", err.message || "Failed to reject.");
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color={COLORS.staff} />
//       </View>
//     );
//   }

//   if (!hospital) return null;

//   const statusColor =
//     hospital.status === "APPROVED" ? "#22C55E"
//     : hospital.status === "REJECTED" ? "#EF4444"
//     : "#F59E0B";

//   const statusBg =
//     hospital.status === "APPROVED" ? "#F0FDF4"
//     : hospital.status === "REJECTED" ? "#FEF2F2"
//     : "#FFF7ED";

//   const registeredOn = hospital.createdAt
//     ? new Date(hospital.createdAt).toLocaleDateString("en-IN", {
//         day: "numeric", month: "short", year: "numeric",
//         hour: "2-digit", minute: "2-digit",
//       })
//     : null;

//   const deptDisplay = Array.isArray(hospital.departments)
//     ? hospital.departments.join(", ")
//     : hospital.departments || null;

//   // Parse documentUrls — stored as JSON array of {name, data}
//   let parsedDocs = [];
//   try {
//     if (hospital.documentUrls) {
//       parsedDocs = JSON.parse(hospital.documentUrls);
//     }
//   } catch (_) {}

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//       </TouchableOpacity>
//       <Text style={styles.title}>Hospital Verification</Text>

//       <Image
//         source={{ uri: hospital.imageUrl || "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400" }}
//         style={styles.heroImage}
//       />

//       <View style={styles.nameRow}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.name}>{hospital.name}</Text>
//           <Text style={styles.cityText}>
//             {[hospital.city, hospital.type].filter(Boolean).join(" · ")}
//           </Text>
//         </View>
//         <View style={[styles.statusBadge, { backgroundColor: statusBg, borderColor: statusColor + "40" }]}>
//           <Text style={[styles.statusText, { color: statusColor }]}>{hospital.status}</Text>
//         </View>
//       </View>

//       <SectionHeader title="Owner & Contact" icon="person-circle-outline" />
//       <View style={styles.card}>
//         <Info label="Owner Name"    value={hospital.ownerName} />
//         <Info label="Mobile Number" value={hospital.phone} />
//         <Info label="Email"         value={hospital.email} last />
//       </View>

//       <SectionHeader title="Location" icon="location-outline" />
//       <View style={styles.card}>
//         <Info label="City"    value={hospital.city} />
//         <Info label="Address" value={hospital.address} last />
//       </View>

//       <SectionHeader title="Licensing & Registration" icon="shield-checkmark-outline" />
//       <View style={styles.card}>
//         <Info label="Registration No." value={hospital.registrationNumber} mono />
//         <Info label="License No."      value={hospital.licenseNumber} mono last />
//       </View>

//       <SectionHeader title="Hospital Details" icon="business-outline" />
//       <View style={styles.card}>
//         <Info label="Hospital Type"     value={hospital.type} />
//         <Info label="Departments"       value={deptDisplay} />
//         <Info label="Number of Doctors" value={hospital.numberOfDoctors?.toString()} />
//         <Info label="Opening Time"      value={hospital.openingTime} />
//         <Info label="Closing Time"      value={hospital.closingTime} last />
//       </View>

//       {/* ── Section: Uploaded Documents ── */}
//       {parsedDocs.length > 0 ? (
//         <>
//           <SectionHeader title="Uploaded Documents" icon="document-attach-outline" />
//           <View style={styles.card}>
//             {parsedDocs.map((doc, i) => (
//               <View
//                 key={i}
//                 style={[styles.infoRow, i === parsedDocs.length - 1 && { borderBottomWidth: 0 }]}
//               >
//                 <View style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 8 }}>
//                   <Ionicons name="document-text" size={18} color={COLORS.staff} />
//                   <Text style={[styles.label, { color: COLORS.text }]} numberOfLines={1}>
//                     {doc.name || `Document ${i + 1}`}
//                   </Text>
//                 </View>
//                 {doc.data && doc.data.startsWith("data:image") && (
//                   <Image
//                     source={{ uri: doc.data }}
//                     style={{ width: 60, height: 60, borderRadius: 10 }}
//                     resizeMode="cover"
//                   />
//                 )}
//                 {doc.data && doc.data.startsWith("data:application/pdf") && (
//                   <View style={styles.pdfBadge}>
//                     <Text style={styles.pdfText}>PDF</Text>
//                   </View>
//                 )}
//               </View>
//             ))}
//           </View>
//         </>
//       ) : null}

//       {hospital.description ? (
//         <>
//           <SectionHeader title="About" icon="information-circle-outline" />
//           <View style={[styles.card, { paddingVertical: 14 }]}>
//             <Text style={styles.description}>{hospital.description}</Text>
//           </View>
//         </>
//       ) : null}

//       <SectionHeader title="Registration Meta" icon="time-outline" />
//       <View style={styles.card}>
//         <Info label="Hospital ID"  value={hospital.hospitalId} mono />
//         {registeredOn && <Info label="Submitted On" value={registeredOn} />}
//         <Info label="Status" value={hospital.status} last />
//       </View>

//       {hospital.status === "PENDING" && (
//         <View style={styles.row}>
//           <TouchableOpacity style={styles.approve} onPress={handleApprove}>
//             <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
//             <Text style={styles.approveText}>Approve</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.reject} onPress={handleReject}>
//             <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
//             <Text style={styles.rejectText}>Reject</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       <View style={{ height: 40 }} />
//     </ScrollView>
//   );
// }

// function SectionHeader({ title, icon }) {
//   return (
//     <View style={styles.sectionHeader}>
//       <Ionicons name={icon} size={16} color={COLORS.staff} />
//       <Text style={styles.sectionTitle}>{title}</Text>
//     </View>
//   );
// }

// function Info({ label, value, mono, last }) {
//   return (
//     <View style={[styles.infoRow, last && { borderBottomWidth: 0 }]}>
//       <Text style={styles.label}>{label}</Text>
//       <Text style={[styles.value, mono && styles.mono]} numberOfLines={2}>
//         {value || "-"}
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
//   center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
//   backBtn: {
//     marginTop: 52, width: 44, height: 44, borderRadius: 16,
//     backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   title: { marginTop: 16, fontSize: 24, fontWeight: "900", color: COLORS.text },
//   heroImage: { width: "100%", height: 190, borderRadius: 24, marginTop: 18, backgroundColor: COLORS.card },
//   nameRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 16, marginBottom: 4, gap: 10 },
//   name: { fontSize: 20, fontWeight: "900", color: COLORS.text },
//   cityText: { color: COLORS.muted, marginTop: 3, fontSize: 13 },
//   statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, marginTop: 2 },
//   statusText: { fontSize: 12, fontWeight: "900", letterSpacing: 0.5 },
//   sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 20, marginBottom: 8, paddingHorizontal: 2 },
//   sectionTitle: { fontSize: 13, fontWeight: "800", color: COLORS.staff, textTransform: "uppercase", letterSpacing: 0.8 },
//   card: { backgroundColor: COLORS.card, borderRadius: 22, paddingHorizontal: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
//   infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
//   label: { color: COLORS.muted, fontWeight: "700", flex: 1, fontSize: 13 },
//   value: { color: COLORS.text, fontWeight: "800", flex: 1.2, textAlign: "right", fontSize: 13 },
//   mono: { fontFamily: "monospace", fontSize: 12, letterSpacing: 0.5 },
//   description: { color: COLORS.text, fontSize: 13, lineHeight: 20, fontWeight: "500" },
//   row: { flexDirection: "row", gap: 12, marginTop: 24 },
//   approve: { flex: 1, height: 54, borderRadius: 16, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
//   reject: { flex: 1, height: 54, borderRadius: 16, backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderWidth: 1, borderColor: "#FECACA" },
//   approveText: { color: "#fff", fontWeight: "900", fontSize: 15 },
//   rejectText: { color: "#EF4444", fontWeight: "900", fontSize: 15 },
//   pdfBadge: {
//     backgroundColor: "#FEF2F2",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },
//   pdfText: { color: "#EF4444", fontWeight: "900", fontSize: 12 },
// });  




























import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { fetchHospitalById, approveHospital, rejectHospital } from "../../services/apiService";

const { width: SCREEN_W } = Dimensions.get("window");

export default function HospitalVerificationScreen({ route, navigation }) {
  const { hospitalId } = route.params;
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  // For full-screen image viewer
  const [viewerVisible, setViewerVisible] = useState(false);
  const [viewerUri, setViewerUri] = useState(null);

  useEffect(() => {
    loadHospitalData();
  }, [hospitalId]);

  const loadHospitalData = async () => {
    try {
      const data = await fetchHospitalById(hospitalId);
      setHospital(data);
    } catch (err) {
      Alert.alert("Error", err.message || "Could not load hospital details.");
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await approveHospital(hospitalId);
      setHospital((prev) => ({ ...prev, status: "APPROVED" }));
      Alert.alert(
        "Approved ✓",
        `${hospital.name} is now approved and can login.`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to approve.");
    }
  };

  const handleReject = async () => {
    try {
      await rejectHospital(hospitalId);
      setHospital((prev) => ({ ...prev, status: "REJECTED" }));
      Alert.alert(
        "Rejected",
        `${hospital.name} has been rejected.`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert("Error", err.message || "Failed to reject.");
    }
  };

  const openImageViewer = (uri) => {
    setViewerUri(uri);
    setViewerVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.staff} />
      </View>
    );
  }

  if (!hospital) return null;

  const statusColor =
    hospital.status === "APPROVED" ? "#22C55E"
    : hospital.status === "REJECTED" ? "#EF4444"
    : "#F59E0B";

  const statusBg =
    hospital.status === "APPROVED" ? "#F0FDF4"
    : hospital.status === "REJECTED" ? "#FEF2F2"
    : "#FFF7ED";

  const registeredOn = hospital.createdAt
    ? new Date(hospital.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      })
    : null;

  const deptDisplay = Array.isArray(hospital.departments)
    ? hospital.departments.join(", ")
    : hospital.departments || null;

  // Parse documentUrls — stored as JSON array of {name, data}
  let parsedDocs = [];
  try {
    if (hospital.documentUrls) {
      parsedDocs = JSON.parse(hospital.documentUrls);
    }
  } catch (_) {}

  // Determine if hospital photo is a user-uploaded base64 or a URL
  const hasHospitalPhoto = hospital.imageUrl && hospital.imageUrl.length > 0;
  const isBase64Photo = hasHospitalPhoto && hospital.imageUrl.startsWith("data:");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.title}>Hospital Verification</Text>

      {/* ── Hospital Photo (uploaded by hospital) ── */}
      {hasHospitalPhoto ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => openImageViewer(hospital.imageUrl)}
        >
          <Image
            source={{ uri: hospital.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.photoTapHint}>
            <Ionicons name="expand-outline" size={14} color="#fff" />
            <Text style={styles.photoTapHintText}>Tap to expand</Text>
          </View>
        </TouchableOpacity>
      ) : (
        // No photo uploaded
        <View style={[styles.heroImage, styles.noPhotoBox]}>
          <Ionicons name="camera-off-outline" size={36} color={COLORS.muted} />
          <Text style={styles.noPhotoText}>No hospital photo uploaded</Text>
        </View>
      )}

      <View style={styles.nameRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{hospital.name}</Text>
          <Text style={styles.cityText}>
            {[hospital.city, hospital.type].filter(Boolean).join(" · ")}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusBg, borderColor: statusColor + "40" }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{hospital.status}</Text>
        </View>
      </View>

      <SectionHeader title="Owner & Contact" icon="person-circle-outline" />
      <View style={styles.card}>
        <Info label="Owner Name"    value={hospital.ownerName} />
        <Info label="Mobile Number" value={hospital.phone} />
        <Info label="Email"         value={hospital.email} last />
      </View>

      <SectionHeader title="Location" icon="location-outline" />
      <View style={styles.card}>
        <Info label="City"    value={hospital.city} />
        <Info label="Address" value={hospital.address} last />
      </View>

      <SectionHeader title="Licensing & Registration" icon="shield-checkmark-outline" />
      <View style={styles.card}>
        <Info label="Registration No." value={hospital.registrationNumber} mono />
        <Info label="License No."      value={hospital.licenseNumber} mono last />
      </View>

      <SectionHeader title="Hospital Details" icon="business-outline" />
      <View style={styles.card}>
        <Info label="Hospital Type"     value={hospital.type} />
        <Info label="Departments"       value={deptDisplay} />
        <Info label="Number of Doctors" value={hospital.numberOfDoctors?.toString()} last />
      </View>

      {/* ── Verification Documents ── */}
      <SectionHeader title="Verification Documents" icon="document-attach-outline" />
      {parsedDocs.length > 0 ? (
        <View style={styles.card}>
          {parsedDocs.map((doc, i) => {
            const isImage = doc.data && doc.data.startsWith("data:image");
            const isPdf   = doc.data && doc.data.startsWith("data:application/pdf");
            return (
              <View
                key={i}
                style={[styles.docItemRow, i === parsedDocs.length - 1 && { borderBottomWidth: 0 }]}
              >
                <View style={styles.docInfo}>
                  <Ionicons
                    name={isPdf ? "document-text" : "image"}
                    size={20}
                    color={COLORS.staff}
                  />
                  <Text style={styles.docItemName} numberOfLines={1}>
                    {doc.name || `Document ${i + 1}`}
                  </Text>
                </View>

                {isImage && (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => openImageViewer(doc.data)}
                  >
                    <Image
                      source={{ uri: doc.data }}
                      style={styles.docThumb}
                      resizeMode="cover"
                    />
                    <View style={styles.docThumbOverlay}>
                      <Ionicons name="expand-outline" size={12} color="#fff" />
                    </View>
                  </TouchableOpacity>
                )}

                {isPdf && (
                  <View style={styles.pdfBadge}>
                    <Ionicons name="document-text" size={14} color="#EF4444" />
                    <Text style={styles.pdfText}>PDF</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <View style={[styles.card, styles.noDocsBox]}>
          <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />
          <Text style={styles.noDocsText}>No documents submitted</Text>
        </View>
      )}

      {hospital.description ? (
        <>
          <SectionHeader title="About" icon="information-circle-outline" />
          <View style={[styles.card, { paddingVertical: 14 }]}>
            <Text style={styles.description}>{hospital.description}</Text>
          </View>
        </>
      ) : null}

      <SectionHeader title="Registration Meta" icon="time-outline" />
      <View style={styles.card}>
        <Info label="Hospital ID"  value={hospital.hospitalId} mono />
        {registeredOn && <Info label="Submitted On" value={registeredOn} />}
        <Info label="Status" value={hospital.status} last />
      </View>

      {hospital.status === "PENDING" && (
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.approve} onPress={handleApprove}>
            <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reject} onPress={handleReject}>
            <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ height: 40 }} />

      {/* ── Full-screen image viewer modal ── */}
      <Modal
        visible={viewerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setViewerVisible(false)}
      >
        <View style={styles.viewerOverlay}>
          <TouchableOpacity
            style={styles.viewerClose}
            onPress={() => setViewerVisible(false)}
          >
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
          {viewerUri && (
            <Image
              source={{ uri: viewerUri }}
              style={styles.viewerImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

function SectionHeader({ title, icon }) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={16} color={COLORS.staff} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Info({ label, value, mono, last }) {
  return (
    <View style={[styles.infoRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, mono && styles.mono]} numberOfLines={2}>
        {value || "-"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
  backBtn: {
    marginTop: 52, width: 44, height: 44, borderRadius: 16,
    backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: COLORS.border,
  },
  title: { marginTop: 16, fontSize: 24, fontWeight: "900", color: COLORS.text },

  // ── Hospital photo ───────────────────────────────────────────────────────────
  heroImage: {
    width: "100%",
    height: 200,
    borderRadius: 24,
    marginTop: 18,
    backgroundColor: COLORS.card,
  },
  noPhotoBox: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.border,
  },
  noPhotoText: { color: COLORS.muted, marginTop: 8, fontWeight: "600", fontSize: 13 },
  photoTapHint: {
    position: "absolute",
    bottom: 10,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  photoTapHintText: { color: "#fff", fontSize: 11, fontWeight: "700" },

  nameRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 16, marginBottom: 4, gap: 10 },
  name: { fontSize: 20, fontWeight: "900", color: COLORS.text },
  cityText: { color: COLORS.muted, marginTop: 3, fontSize: 13 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, marginTop: 2 },
  statusText: { fontSize: 12, fontWeight: "900", letterSpacing: 0.5 },

  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 20, marginBottom: 8, paddingHorizontal: 2 },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: COLORS.staff, textTransform: "uppercase", letterSpacing: 0.8 },

  card: { backgroundColor: COLORS.card, borderRadius: 22, paddingHorizontal: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: COLORS.border, gap: 12 },
  label: { color: COLORS.muted, fontWeight: "700", flex: 1, fontSize: 13 },
  value: { color: COLORS.text, fontWeight: "800", flex: 1.2, textAlign: "right", fontSize: 13 },
  mono: { fontFamily: "monospace", fontSize: 12, letterSpacing: 0.5 },
  description: { color: COLORS.text, fontSize: 13, lineHeight: 20, fontWeight: "500" },

  // ── Documents ────────────────────────────────────────────────────────────────
  docItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  docInfo: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  docItemName: { color: COLORS.text, fontWeight: "700", fontSize: 13, flex: 1 },
  docThumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: COLORS.background,
  },
  docThumbOverlay: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 6,
    padding: 3,
  },
  pdfBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FEF2F2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  pdfText: { color: "#EF4444", fontWeight: "900", fontSize: 12 },
  noDocsBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  noDocsText: { color: "#F59E0B", fontWeight: "700", fontSize: 13 },

  // ── Action buttons ───────────────────────────────────────────────────────────
  actionRow: { flexDirection: "row", gap: 12, marginTop: 24 },
  approve: { flex: 1, height: 54, borderRadius: 16, backgroundColor: COLORS.staff, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
  reject: { flex: 1, height: 54, borderRadius: 16, backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, borderWidth: 1, borderColor: "#FECACA" },
  approveText: { color: "#fff", fontWeight: "900", fontSize: 15 },
  rejectText: { color: "#EF4444", fontWeight: "900", fontSize: 15 },

  // ── Full-screen image viewer ─────────────────────────────────────────────────
  viewerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  viewerClose: {
    position: "absolute",
    top: 52,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  viewerImage: {
    width: SCREEN_W,
    height: SCREEN_W * 1.3,
  },
});