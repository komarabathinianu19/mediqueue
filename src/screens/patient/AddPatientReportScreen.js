

















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   Alert,
//   Modal,
//   Pressable,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import { useReports } from "../../context/ReportsContext";

// const PRIMARY = COLORS?.primary || "#2563EB";

// const REPORT_TYPES = [
//   "Lab Report",
//   "Blood Test",
//   "X-Ray",
//   "Scan",
//   "Prescription",
//   "Discharge Summary",
//   "Other",
// ];

// export default function AddPatientReportScreen({ navigation }) {
//   const { addReport } = useReports();

//   const [successPopup, setSuccessPopup] = useState(false);

//   const [form, setForm] = useState({
//     reportName: "",
//     reportType: "Lab Report",
//     hospitalName: "",
//     fileUri: "",
//   });

//   const updateField = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickReportImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.85,
//       allowsEditing: false,
//     });

//     if (!result.canceled) {
//       updateField("fileUri", result.assets[0].uri);
//     }
//   };

//   const saveReport = () => {
//     if (!form.reportName.trim()) {
//       Alert.alert("Missing Report Name", "Please enter report name.");
//       return;
//     }

//     if (!form.fileUri) {
//       Alert.alert("Missing Report Image", "Please upload report image.");
//       return;
//     }

//     addReport({
//       ...form,
//       createdAt: new Date().toISOString(),
//     });

//     setSuccessPopup(true);
//   };

//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 35 }}
//         keyboardShouldPersistTaps="handled"
//       >
//         <LinearGradient
//           colors={[PRIMARY, "#1D4ED8"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.backBtn}
//             onPress={() => navigation.goBack()}
//           >
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>

//           <Text style={styles.title}>Add Medical Report</Text>
//           <Text style={styles.sub}>
//             Upload your report image and save important medical details.
//           </Text>
//         </LinearGradient>

//         <View style={styles.formCard}>
//           <Text style={styles.sectionTitle}>Report Image</Text>

//           <TouchableOpacity
//             activeOpacity={0.86}
//             style={styles.uploadBox}
//             onPress={pickReportImage}
//           >
//             {form.fileUri ? (
//               <Image source={{ uri: form.fileUri }} style={styles.reportImage} />
//             ) : (
//               <>
//                 <View style={styles.uploadIcon}>
//                   <Ionicons
//                     name="cloud-upload-outline"
//                     size={34}
//                     color={PRIMARY}
//                   />
//                 </View>

//                 <Text style={styles.uploadTitle}>Upload Report Image</Text>

//                 <Text style={styles.uploadSub}>
//                   Select prescription, scan, lab report or discharge summary
//                 </Text>
//               </>
//             )}
//           </TouchableOpacity>

//           {form.fileUri ? (
//             <TouchableOpacity
//               activeOpacity={0.85}
//               style={styles.changeImageBtn}
//               onPress={pickReportImage}
//             >
//               <Ionicons name="image-outline" size={18} color={PRIMARY} />
//               <Text style={styles.changeImageText}>Change Image</Text>
//             </TouchableOpacity>
//           ) : null}

//           <Text style={styles.sectionTitle}>Report Type</Text>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.typeList}
//           >
//             {REPORT_TYPES.map((type) => {
//               const selected = form.reportType === type;

//               return (
//                 <TouchableOpacity
//                   key={type}
//                   activeOpacity={0.85}
//                   onPress={() => updateField("reportType", type)}
//                   style={[
//                     styles.typeChip,
//                     selected && {
//                       backgroundColor: PRIMARY,
//                       borderColor: PRIMARY,
//                     },
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.typeText,
//                       selected && {
//                         color: "#fff",
//                       },
//                     ]}
//                   >
//                     {type}
//                   </Text>
//                 </TouchableOpacity>
//               );
//             })}
//           </ScrollView>

//           <Input
//             label="Report Name"
//             placeholder="Example: Blood Test Report"
//             value={form.reportName}
//             onChangeText={(v) => updateField("reportName", v)}
//           />

//           <Input
//             label="Hospital Name"
//             placeholder="Example: City Care Hospital"
//             value={form.hospitalName}
//             onChangeText={(v) => updateField("hospitalName", v)}
//           />

//           <TouchableOpacity
//             activeOpacity={0.9}
//             style={styles.saveBtn}
//             onPress={saveReport}
//           >
//             <LinearGradient
//               colors={[PRIMARY, "#1D4ED8"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 1 }}
//               style={styles.saveGradient}
//             >
//               <Ionicons name="save-outline" size={20} color="#fff" />
//               <Text style={styles.saveText}>Save Report</Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       <Modal
//         visible={successPopup}
//         transparent
//         animationType="fade"
//         onRequestClose={closeSuccessPopup}
//       >
//         <View style={styles.modalOverlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.8, translateY: 20 }}
//             animate={{ opacity: 1, scale: 1, translateY: 0 }}
//             transition={{ type: "spring", duration: 500 }}
//             style={styles.successCard}
//           >
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark-circle" size={58} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Report Saved</Text>

//             <Text style={styles.successMessage}>
//               Your medical report has been added successfully.
//             </Text>

//             <View style={styles.reportBadge}>
//               <Ionicons name="document-text-outline" size={17} color={PRIMARY} />
//               <Text style={styles.reportBadgeText} numberOfLines={1}>
//                 {form.reportName}
//               </Text>
//             </View>

//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>OK</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// function Input({
//   label,
//   placeholder,
//   value,
//   onChangeText,
//   multiline = false,
// }) {
//   return (
//     <View style={styles.inputGroup}>
//       <Text style={styles.inputLabel}>{label}</Text>

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#94A3B8"
//         multiline={multiline}
//         style={[styles.input, multiline && styles.textArea]}
//       />
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
//     paddingBottom: 28,
//     borderBottomLeftRadius: 34,
//     borderBottomRightRadius: 34,
//   },

//   backBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 15,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   title: {
//     color: "#fff",
//     fontSize: 27,
//     fontWeight: "900",
//     marginTop: 4,
//   },

//   sub: {
//     color: "rgba(255,255,255,0.82)",
//     fontSize: 13,
//     fontWeight: "700",
//     lineHeight: 19,
//     marginTop: 8,
//   },

//   formCard: {
//     marginTop: 18,
//     marginHorizontal: 18,
//     backgroundColor: COLORS.card,
//     borderRadius: 26,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   sectionTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//     marginTop: 4,
//   },

//   uploadBox: {
//     minHeight: 190,
//     borderRadius: 24,
//     borderWidth: 1.4,
//     borderColor: COLORS.border,
//     borderStyle: "dashed",
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 18,
//     overflow: "hidden",
//   },

//   uploadIcon: {
//     width: 68,
//     height: 68,
//     borderRadius: 24,
//     backgroundColor: COLORS.lightBlue,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   uploadTitle: {
//     color: COLORS.text,
//     fontSize: 16,
//     fontWeight: "900",
//     marginTop: 14,
//   },

//   uploadSub: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "600",
//     textAlign: "center",
//     lineHeight: 18,
//     marginTop: 6,
//   },

//   reportImage: {
//     width: "100%",
//     height: 240,
//     borderRadius: 22,
//   },

//   changeImageBtn: {
//     marginTop: 12,
//     alignSelf: "flex-start",
//     backgroundColor: COLORS.lightBlue,
//     borderRadius: 15,
//     paddingHorizontal: 13,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },

//   changeImageText: {
//     color: PRIMARY,
//     fontWeight: "900",
//     fontSize: 12,
//   },

//   typeList: {
//     gap: 10,
//     paddingBottom: 6,
//   },

//   typeChip: {
//     backgroundColor: COLORS.background,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 999,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//   },

//   typeText: {
//     color: COLORS.muted,
//     fontSize: 12,
//     fontWeight: "900",
//   },

//   inputGroup: {
//     marginTop: 15,
//   },

//   inputLabel: {
//     color: COLORS.text,
//     fontSize: 13,
//     fontWeight: "900",
//     marginBottom: 8,
//   },

//   input: {
//     minHeight: 48,
//     borderRadius: 16,
//     backgroundColor: COLORS.background,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingHorizontal: 14,
//     color: COLORS.text,
//     fontSize: 14,
//     fontWeight: "700",
//   },

//   textArea: {
//     minHeight: 92,
//     paddingTop: 13,
//     textAlignVertical: "top",
//   },

//   saveBtn: {
//     marginTop: 22,
//   },

//   saveGradient: {
//     height: 56,
//     borderRadius: 19,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 9,
//   },

//   saveText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.55)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   successCard: {
//     width: "100%",
//     maxWidth: 390,
//     backgroundColor: COLORS.card || "#fff",
//     borderRadius: 30,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: PRIMARY,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   successTitle: {
//     fontSize: 23,
//     fontWeight: "900",
//     color: COLORS.text || "#1E293B",
//     textAlign: "center",
//   },

//   successMessage: {
//     marginTop: 10,
//     fontSize: 14,
//     lineHeight: 21,
//     color: COLORS.muted || "#64748B",
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   reportBadge: {
//     marginTop: 18,
//     maxWidth: "100%",
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: COLORS.lightBlue || "#EFF6FF",
//     borderWidth: 1,
//     borderColor: "#BFDBFE",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },

//   reportBadgeText: {
//     color: PRIMARY,
//     fontSize: 13,
//     fontWeight: "900",
//     maxWidth: 230,
//   },

//   successButton: {
//     marginTop: 24,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: PRIMARY,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });             






































// src/screens/patient/AddPatientReportScreen.js
// Saves report to backend DB — tied to the logged-in patient via JWT

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { useReports } from "../../context/ReportsContext";

const PRIMARY = COLORS?.primary || "#2563EB";

const REPORT_TYPES = [
  "Lab Report",
  "Blood Test",
  "X-Ray",
  "Scan / MRI",
  "Prescription",
  "Discharge Summary",
  "ECG",
  "Other",
];

export default function AddPatientReportScreen({ navigation }) {
  const { addReport } = useReports();

  const [saving, setSaving]           = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [form, setForm] = useState({
    reportName:   "",
    reportType:   "Lab Report",
    hospitalName: "",
    doctorName:   "",
    department:   "",
    reportDate:   "",
    notes:        "",
    fileUri:      "",          // local URI from ImagePicker
  });

  const updateField = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ── Pick report image from gallery ─────────────────────────────────────────
  const pickReportImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      allowsEditing: false,
    });
    if (!result.canceled) updateField("fileUri", result.assets[0].uri);
  };

  // ── Save report to backend ──────────────────────────────────────────────────
  const saveReport = async () => {
    if (!form.reportName.trim()) {
      Alert.alert("Missing Report Name", "Please enter a report name.");
      return;
    }
    if (!form.fileUri) {
      Alert.alert("Missing Image", "Please upload the report image.");
      return;
    }

    setSaving(true);
    try {
      await addReport({
        reportName:   form.reportName.trim(),
        reportType:   form.reportType,
        hospitalName: form.hospitalName.trim(),
        doctorName:   form.doctorName.trim(),
        department:   form.department.trim(),
        reportDate:   form.reportDate.trim(),
        notes:        form.notes.trim(),
        fileUri:      form.fileUri,        // backend should handle upload / storage
        createdAt:    new Date().toISOString(),
      });
      setSuccessPopup(true);
    } catch (err) {
      Alert.alert("Save Failed", err.message || "Could not save report. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessPopup(false);
    navigation.goBack();
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── HEADER ── */}
        <LinearGradient
          colors={[PRIMARY, "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Add Medical Report</Text>
          <Text style={styles.sub}>
            Upload your report image and fill in the details. It will be saved to your profile.
          </Text>
        </LinearGradient>

        {/* ── FORM CARD ── */}
        <View style={styles.formCard}>

          {/* Report Image Upload */}
          <Text style={styles.sectionTitle}>Report Image *</Text>

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.uploadBox}
            onPress={pickReportImage}
          >
            {form.fileUri ? (
              <Image source={{ uri: form.fileUri }} style={styles.reportImage} />
            ) : (
              <>
                <View style={styles.uploadIcon}>
                  <Ionicons name="cloud-upload-outline" size={34} color={PRIMARY} />
                </View>
                <Text style={styles.uploadTitle}>Upload Report Image</Text>
                <Text style={styles.uploadSub}>
                  Select prescription, scan, lab report or discharge summary
                </Text>
              </>
            )}
          </TouchableOpacity>

          {form.fileUri ? (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.changeImageBtn}
              onPress={pickReportImage}
            >
              <Ionicons name="image-outline" size={18} color={PRIMARY} />
              <Text style={styles.changeImageText}>Change Image</Text>
            </TouchableOpacity>
          ) : null}

          {/* Report Type Chips */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Report Type</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.typeList}
          >
            {REPORT_TYPES.map((type) => {
              const selected = form.reportType === type;
              return (
                <TouchableOpacity
                  key={type}
                  activeOpacity={0.85}
                  onPress={() => updateField("reportType", type)}
                  style={[
                    styles.typeChip,
                    selected && { backgroundColor: PRIMARY, borderColor: PRIMARY },
                  ]}
                >
                  <Text style={[styles.typeText, selected && { color: "#fff" }]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Form Fields */}
          <FormInput
            label="Report Name *"
            placeholder="e.g. Blood Test Report"
            value={form.reportName}
            onChangeText={(v) => updateField("reportName", v)}
          />
          <FormInput
            label="Hospital Name"
            placeholder="e.g. City Care Hospital"
            value={form.hospitalName}
            onChangeText={(v) => updateField("hospitalName", v)}
          />
          <FormInput
            label="Doctor Name"
            placeholder="e.g. Dr. Sharma"
            value={form.doctorName}
            onChangeText={(v) => updateField("doctorName", v)}
          />
          <FormInput
            label="Department"
            placeholder="e.g. Cardiology"
            value={form.department}
            onChangeText={(v) => updateField("department", v)}
          />
          <FormInput
            label="Report Date"
            placeholder="e.g. 12 May 2026"
            value={form.reportDate}
            onChangeText={(v) => updateField("reportDate", v)}
          />
          <FormInput
            label="Notes"
            placeholder="Any important notes or observations…"
            value={form.notes}
            onChangeText={(v) => updateField("notes", v)}
            multiline
          />

          {/* Save Button */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveBtn}
            onPress={saveReport}
            disabled={saving}
          >
            <LinearGradient
              colors={[PRIMARY, "#1D4ED8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.saveGradient}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Ionicons name="save-outline" size={20} color="#fff" />
                  <Text style={styles.saveText}>Save Report</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── SUCCESS POPUP ── */}
      <Modal
        visible={successPopup}
        transparent
        animationType="fade"
        onRequestClose={closeSuccessPopup}
      >
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.8, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.successCard}
          >
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={58} color="#fff" />
            </View>

            <Text style={styles.successTitle}>Report Saved!</Text>
            <Text style={styles.successMessage}>
              Your medical report has been saved to your profile successfully.
            </Text>

            <View style={styles.reportBadge}>
              <Ionicons name="document-text-outline" size={17} color={PRIMARY} />
              <Text style={styles.reportBadgeText} numberOfLines={1}>
                {form.reportName}
              </Text>
            </View>

            <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
              <Text style={styles.successButtonText}>View My Reports</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}

// ── Form Input Component ───────────────────────────────────────────────────────
function FormInput({ label, placeholder, value, onChangeText, multiline = false }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        multiline={multiline}
        style={[styles.input, multiline && styles.textArea]}
      />
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.background },
  container:   { flex: 1 },

  header: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center", justifyContent: "center",
  },
  title: { color: "#fff", fontSize: 27, fontWeight: "900", marginTop: 14 },
  sub: {
    color: "rgba(255,255,255,0.82)", fontSize: 13,
    fontWeight: "700", lineHeight: 19, marginTop: 8,
  },

  formCard: {
    marginTop: 18, marginHorizontal: 18,
    backgroundColor: COLORS.card,
    borderRadius: 26, padding: 18,
    borderWidth: 1, borderColor: COLORS.border, elevation: 2,
  },
  sectionTitle: { color: COLORS.text, fontSize: 17, fontWeight: "900", marginBottom: 12 },

  // Upload box
  uploadBox: {
    minHeight: 190, borderRadius: 24,
    borderWidth: 1.4, borderColor: COLORS.border,
    borderStyle: "dashed", backgroundColor: COLORS.background,
    alignItems: "center", justifyContent: "center",
    padding: 18, overflow: "hidden",
  },
  uploadIcon: {
    width: 68, height: 68, borderRadius: 24,
    backgroundColor: COLORS.lightBlue || "#EFF6FF",
    alignItems: "center", justifyContent: "center",
  },
  uploadTitle: { color: COLORS.text, fontSize: 16, fontWeight: "900", marginTop: 14 },
  uploadSub: {
    color: COLORS.muted, fontSize: 12, fontWeight: "600",
    textAlign: "center", lineHeight: 18, marginTop: 6,
  },
  reportImage: { width: "100%", height: 240, borderRadius: 22 },
  changeImageBtn: {
    marginTop: 12, alignSelf: "flex-start",
    backgroundColor: COLORS.lightBlue || "#EFF6FF",
    borderRadius: 15, paddingHorizontal: 13, paddingVertical: 10,
    flexDirection: "row", alignItems: "center", gap: 7,
  },
  changeImageText: { color: PRIMARY, fontWeight: "900", fontSize: 12 },

  // Type chips
  typeList: { gap: 10, paddingBottom: 6 },
  typeChip: {
    backgroundColor: COLORS.background, borderWidth: 1,
    borderColor: COLORS.border, borderRadius: 999,
    paddingHorizontal: 14, paddingVertical: 9,
  },
  typeText: { color: COLORS.muted, fontSize: 12, fontWeight: "900" },

  // Inputs
  inputGroup: { marginTop: 15 },
  inputLabel: { color: COLORS.text, fontSize: 13, fontWeight: "900", marginBottom: 8 },
  input: {
    minHeight: 48, borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 14, color: COLORS.text,
    fontSize: 14, fontWeight: "700",
  },
  textArea: { minHeight: 92, paddingTop: 13, textAlignVertical: "top" },

  // Save button
  saveBtn: { marginTop: 22 },
  saveGradient: {
    height: 56, borderRadius: 19,
    alignItems: "center", justifyContent: "center",
    flexDirection: "row", gap: 9,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center", justifyContent: "center", padding: 24,
  },
  successCard: {
    width: "100%", maxWidth: 390,
    backgroundColor: COLORS.card || "#fff",
    borderRadius: 30, padding: 26, alignItems: "center",
    borderWidth: 1, borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000", shadowOpacity: 0.15,
    shadowRadius: 24, elevation: 12,
  },
  successIcon: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: PRIMARY,
    alignItems: "center", justifyContent: "center", marginBottom: 18,
  },
  successTitle: {
    fontSize: 23, fontWeight: "900",
    color: COLORS.text || "#1E293B", textAlign: "center",
  },
  successMessage: {
    marginTop: 10, fontSize: 14, lineHeight: 21,
    color: COLORS.muted || "#64748B",
    textAlign: "center", fontWeight: "600",
  },
  reportBadge: {
    marginTop: 18, paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: COLORS.lightBlue || "#EFF6FF",
    borderWidth: 1, borderColor: "#BFDBFE",
    flexDirection: "row", alignItems: "center", gap: 7,
  },
  reportBadgeText: { color: PRIMARY, fontSize: 13, fontWeight: "900", maxWidth: 230 },
  successButton: {
    marginTop: 24, width: "100%", height: 52,
    borderRadius: 18, backgroundColor: PRIMARY,
    alignItems: "center", justifyContent: "center",
  },
  successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});