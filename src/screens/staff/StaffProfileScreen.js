// src/screens/staff/StaffProfileScreen.js
// Fixed: fetches all hospital fields from /api/hospitals/details
//        saves via PUT /api/hospitals/profile
//        displays phone, address, city, type, openingTime, closingTime, bank details

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchMyHospitalDetails,
  fetchDoctors,
  addDoctor,
  deleteDoctor,
  updateHospitalProfile,
} from "../../services/apiService";
import { useHospital } from "../../context/HospitalContext";

const MEDICAL_DEPARTMENTS = [
  "General OPD",
  "Cardiology",
  "Cardiothoracic Surgery",
  "Dermatology",
  "Dental / Orthodontics",
  "Diabetology & Endocrinology",
  "Emergency & Trauma",
  "ENT (Ear, Nose & Throat)",
  "Gastroenterology",
  "General Surgery",
  "Gynaecology & Obstetrics",
  "Haematology",
  "Infectious Diseases",
  "Internal Medicine",
  "Nephrology & Urology",
  "Neurology",
  "Neurosurgery",
  "Oncology",
  "Ophthalmology (Eye)",
  "Orthopaedics",
  "Paediatrics (Children)",
  "Physiotherapy & Rehabilitation",
  "Plastic & Cosmetic Surgery",
  "Psychiatry & Psychology",
  "Pulmonology (Chest & Lungs)",
  "Radiology & Imaging",
  "Rheumatology",
  "Vascular Surgery",
];

export default function StaffProfileScreen({ navigation }) {
  const { refreshDoctors } = useHospital();

  const [editMode,      setEditMode]      = useState(false);
  const [successPopup,  setSuccessPopup]  = useState(false);
  const [loading,       setLoading]       = useState(true);
  const [isSaving,      setIsSaving]      = useState(false);
  const [doctors,       setDoctors]       = useState([]);
  const [showAddDoctor, setShowAddDoctor] = useState(false);

  const [profile, setProfile] = useState({
    hospitalName:      "",
    hospitalId:        "",
    hospitalType:      "",
    phone:             "",
    email:             "",
    address:           "",
    city:              "",
    openingTime:       "",
    closingTime:       "",
    licenseNo:         "",
    image:             null,
    upiId:             "",
    bankAccountName:   "",
    bankAccountNumber: "",
    bankIfsc:          "",
    bankName:          "",
  });

  const [newDoc, setNewDoc] = useState({
    name:          "",
    department:    MEDICAL_DEPARTMENTS[0],
    fee:           "",
    qualification: "",
  });

  // ── Load hospital data from backend ──────────────────────────────────────────
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // Calls GET /api/hospitals/details  (JWT-authenticated)
      const data = await fetchMyHospitalDetails();

      setProfile({
        hospitalName:      data.name             || "",
        hospitalId:        data.hospitalId       || "",
        hospitalType:      data.type             || "",
        phone:             data.phone            || "",
        email:             data.email            || "",
        address:           data.address          || "",
        city:              data.city             || "",
        openingTime:       data.openingTime      || "",
        closingTime:       data.closingTime      || "",
        licenseNo:         data.licenseNumber    || "",
        image:             data.imageUrl         || null,
        upiId:             data.upiId            || "",
        bankAccountName:   data.bankAccountName  || "",
        bankAccountNumber: data.bankAccountNumber|| "",
        bankIfsc:          data.bankIfsc         || "",
        bankName:          data.bankName         || "",
      });

      if (data.hospitalId) {
        const docList = await fetchDoctors(data.hospitalId);
        setDoctors(Array.isArray(docList) ? docList : []);
      }
    } catch (err) {
      console.log("StaffProfile loadData error:", err.message);

      // Fallback: use data that was saved in AsyncStorage at login time
      const [
        storedName,
        storedId,
        storedEmail,
        storedPhone,
        storedAddress,
        storedCity,
        storedType,
        storedImage,
      ] = await Promise.all([
        AsyncStorage.getItem("hospitalName"),
        AsyncStorage.getItem("hospitalId"),
        AsyncStorage.getItem("hospitalEmail"),
        AsyncStorage.getItem("hospitalPhone"),
        AsyncStorage.getItem("hospitalAddress"),
        AsyncStorage.getItem("hospitalCity"),
        AsyncStorage.getItem("hospitalType"),
        AsyncStorage.getItem("hospitalImageUrl"),
      ]);

      if (storedName) {
        setProfile((prev) => ({
          ...prev,
          hospitalName: storedName    || "",
          hospitalId:   storedId      || "",
          email:        storedEmail   || "",
          phone:        storedPhone   || "",
          address:      storedAddress || "",
          city:         storedCity    || "",
          hospitalType: storedType    || "",
          image:        storedImage   || null,
        }));

        if (storedId) {
          try {
            const docList = await fetchDoctors(storedId);
            setDoctors(Array.isArray(docList) ? docList : []);
          } catch (_) {}
        }
      } else {
        Alert.alert("Connection Error", "Failed to load hospital data.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const updateField = (key, value) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  // ── Image picker ─────────────────────────────────────────────────────────────
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [16, 9],
    });
    if (!result.canceled) updateField("image", result.assets[0].uri);
  };

  // ── Save profile ──────────────────────────────────────────────────────────────
  const saveProfile = async () => {
    if (!profile.hospitalName.trim()) {
      Alert.alert("Error", "Hospital name is required.");
      return;
    }
    if (
      profile.bankIfsc &&
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(profile.bankIfsc.toUpperCase())
    ) {
      Alert.alert(
        "Invalid IFSC",
        "Please enter a valid IFSC code (e.g. SBIN0001234)."
      );
      return;
    }

    setIsSaving(true);
    try {
      // Calls PUT /api/hospitals/profile  (JWT-authenticated)
      await updateHospitalProfile({
        name:              profile.hospitalName,
        phone:             profile.phone,
        address:           profile.address,
        city:              profile.city,
        openingTime:       profile.openingTime,
        closingTime:       profile.closingTime,
        upiId:             profile.upiId,
        bankAccountName:   profile.bankAccountName,
        bankAccountNumber: profile.bankAccountNumber,
        bankIfsc:          profile.bankIfsc
          ? profile.bankIfsc.toUpperCase()
          : "",
        bankName:          profile.bankName,
      });

      setEditMode(false);
      setSuccessPopup(true);
    } catch (err) {
      Alert.alert("Error", err.message || "Update failed.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Add doctor ────────────────────────────────────────────────────────────────
  const handleAddDoctor = async () => {
    if (!newDoc.name.trim() || !newDoc.department || !newDoc.fee.trim()) {
      Alert.alert("Incomplete", "Please fill doctor name, department and fee.");
      return;
    }
    setIsSaving(true);
    try {
      const hId =
        (await AsyncStorage.getItem("hospitalId")) || profile.hospitalId;
      if (!hId) {
        Alert.alert("Error", "Hospital ID not found. Please log in again.");
        return;
      }
      const doctorPayload = {
        name:          newDoc.name.trim(),
        department:    newDoc.department,
        fee:           parseFloat(newDoc.fee),
        qualification: newDoc.qualification.trim(),
        hospitalId:    hId,
        available:     true,
        timingsJson:   JSON.stringify({
          morning:   {
            label: "Morning",   enabled: true,
            startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30,
          },
          afternoon: {
            label: "Afternoon", enabled: true,
            startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25,
          },
          night:     {
            label: "Night",     enabled: true,
            startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20,
          },
        }),
      };
      const saved = await addDoctor(doctorPayload);
      setDoctors((prev) => [...prev, saved]);
      if (hId) refreshDoctors(hId);
      setNewDoc({
        name: "", department: MEDICAL_DEPARTMENTS[0], fee: "", qualification: "",
      });
      setShowAddDoctor(false);
      Alert.alert("Success", "Doctor added and linked to your hospital!");
    } catch (err) {
      Alert.alert("Error", err.message || "Could not save doctor.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Delete doctor ─────────────────────────────────────────────────────────────
  const handleDeleteDoctor = (doc) => {
    Alert.alert(
      "Delete Doctor",
      `Remove Dr. ${doc.name} from the hospital?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoctor(doc.id);
              setDoctors((prev) => prev.filter((d) => d.id !== doc.id));
              if (profile.hospitalId) refreshDoctors(profile.hospitalId);
            } catch (err) {
              Alert.alert("Error", err.message || "Delete failed.");
            }
          },
        },
      ]
    );
  };

  // ── Logout ────────────────────────────────────────────────────────────────────
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: "RoleSelect" }] })
    );
  };

  // ── Loading state ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={[styles.mainWrapper, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={COLORS.staff} />
      </View>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* ── HERO IMAGE CARD ── */}
        <View style={styles.heroCard}>
          <TouchableOpacity
            disabled={!editMode}
            onPress={pickImage}
            style={{ flex: 1 }}
            activeOpacity={0.85}
          >
            <Image
              source={{
                uri:
                  profile.image ||
                  "https://via.placeholder.com/900x400?text=Hospital",
              }}
              style={styles.hospitalImage}
            />
            <View style={styles.overlay} />
            {editMode && (
              <View style={styles.cameraBadge}>
                <Ionicons name="camera" size={18} color="#fff" />
                <Text style={styles.cameraText}>Change Photo</Text>
              </View>
            )}
            <View style={styles.heroContent}>
              {editMode ? (
                <TextInput
                  value={profile.hospitalName}
                  onChangeText={(v) => updateField("hospitalName", v)}
                  style={styles.heroInput}
                  placeholder="Hospital Name"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                />
              ) : (
                <>
                  <Text style={styles.hospitalName}>
                    {profile.hospitalName || "Hospital"}
                  </Text>
                  <Text style={styles.hospitalSub}>
                    ID: {profile.hospitalId}
                  </Text>
                </>
              )}
              <View style={styles.statusChip}>
                <Ionicons name="checkmark-circle" size={16} color="#fff" />
                <Text style={styles.statusText}>Live on Patient App</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── EDIT / SAVE BUTTONS ── */}
        <View style={styles.editRow}>
          {!editMode ? (
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditMode(true)}
            >
              <Ionicons name="pencil-outline" size={16} color={COLORS.staff} />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setEditMode(false);
                  loadData();
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={saveProfile}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveBtnText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── HOSPITAL DETAILS CARD ── */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Hospital Details</Text>

          <InfoField
            label="Hospital Type"
            icon="business-outline"
            value={profile.hospitalType}
            edit={false}
          />
          <InfoField
            label="Email"
            icon="mail-outline"
            value={profile.email}
            edit={false}
          />
          <InfoField
            label="Phone"
            icon="call-outline"
            value={profile.phone}
            edit={editMode}
            onChangeText={(v) => updateField("phone", v)}
            keyboardType="phone-pad"
          />
          <InfoField
            label="Address"
            icon="location-outline"
            value={profile.address}
            edit={editMode}
            onChangeText={(v) => updateField("address", v)}
          />
          <InfoField
            label="City"
            icon="map-outline"
            value={profile.city}
            edit={editMode}
            onChangeText={(v) => updateField("city", v)}
          />
          <InfoField
            label="Opening Time"
            icon="time-outline"
            value={profile.openingTime}
            edit={editMode}
            onChangeText={(v) => updateField("openingTime", v)}
            placeholder="e.g. 09:00 AM"
          />
          <InfoField
            label="Closing Time"
            icon="time-outline"
            value={profile.closingTime}
            edit={editMode}
            onChangeText={(v) => updateField("closingTime", v)}
            placeholder="e.g. 08:00 PM"
          />
        </View>

        {/* ── PAYMENT / BANK DETAILS CARD ── */}
        <View style={styles.card}>
          <View style={styles.paymentHeader}>
            <Ionicons name="card-outline" size={20} color={COLORS.staff} />
            <Text style={styles.sectionTitle}>Payment & Bank Details</Text>
          </View>
          <Text style={styles.paymentNote}>
            Patient payments will be tracked against your hospital. Add your
            bank details for records.
          </Text>

          <InfoField
            label="UPI ID"
            icon="phone-portrait-outline"
            value={profile.upiId}
            edit={editMode}
            onChangeText={(v) => updateField("upiId", v)}
            placeholder="e.g. hospital@upi"
            keyboardType="email-address"
          />
          <InfoField
            label="Bank Name"
            icon="business-outline"
            value={profile.bankName}
            edit={editMode}
            onChangeText={(v) => updateField("bankName", v)}
            placeholder="e.g. State Bank of India"
          />
          <InfoField
            label="Account Holder Name"
            icon="person-outline"
            value={profile.bankAccountName}
            edit={editMode}
            onChangeText={(v) => updateField("bankAccountName", v)}
            placeholder="Name as on bank account"
          />
          <InfoField
            label="Account Number"
            icon="lock-closed-outline"
            value={
              editMode
                ? profile.bankAccountNumber
                : profile.bankAccountNumber
                ? "••••" + profile.bankAccountNumber.slice(-4)
                : ""
            }
            edit={editMode}
            onChangeText={(v) => updateField("bankAccountNumber", v)}
            placeholder="Bank account number"
            keyboardType="number-pad"
          />
          <InfoField
            label="IFSC Code"
            icon="barcode-outline"
            value={profile.bankIfsc}
            edit={editMode}
            onChangeText={(v) => updateField("bankIfsc", v.toUpperCase())}
            placeholder="e.g. SBIN0001234"
            autoCapitalize="characters"
          />

          {!editMode && !profile.upiId && !profile.bankAccountNumber && (
            <TouchableOpacity
              style={styles.addBankBtn}
              onPress={() => setEditMode(true)}
            >
              <Ionicons
                name="add-circle-outline"
                size={18}
                color={COLORS.staff}
              />
              <Text style={styles.addBankBtnText}>Add Bank Details</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── DOCTOR MANAGEMENT ── */}
        <View style={styles.card}>
          <View style={styles.doctorHeader}>
            <Text style={styles.sectionTitle}>
              Doctors ({doctors.length})
            </Text>
            <TouchableOpacity
              style={styles.addDocBtn}
              onPress={() => setShowAddDoctor(true)}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addDocBtnText}>Add Doctor</Text>
            </TouchableOpacity>
          </View>

          {doctors.length === 0 ? (
            <View style={styles.emptyDocs}>
              <Ionicons
                name="person-add-outline"
                size={32}
                color={COLORS.muted}
              />
              <Text style={styles.emptyDocsText}>No doctors added yet.</Text>
              <Text style={styles.emptyDocsSub}>
                Add doctors so patients can book appointments.
              </Text>
            </View>
          ) : (
            doctors.map((doc) => (
              <View key={doc.id || doc.name} style={styles.doctorRow}>
                <View style={styles.doctorAvatar}>
                  <Ionicons name="person" size={22} color={COLORS.staff} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.doctorName}>Dr. {doc.name}</Text>
                  <Text style={styles.doctorDept}>{doc.department}</Text>
                  {doc.qualification ? (
                    <Text style={styles.doctorMeta}>{doc.qualification}</Text>
                  ) : null}
                </View>
                <View style={styles.doctorRight}>
                  <Text style={styles.doctorFee}>₹{doc.fee}</Text>
                  <TouchableOpacity onPress={() => handleDeleteDoctor(doc)}>
                    <Ionicons
                      name="trash-outline"
                      size={18}
                      color={COLORS.danger || "#EF4444"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* ── LOGOUT ── */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={COLORS.danger || "#EF4444"}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* ── ADD DOCTOR MODAL ── */}
      <Modal
        visible={showAddDoctor}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddDoctor(false)}
      >
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 400 }}
            style={styles.modalCard}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Doctor</Text>
              <Pressable onPress={() => setShowAddDoctor(false)}>
                <Ionicons name="close" size={24} color={COLORS.muted} />
              </Pressable>
            </View>

            <Text style={styles.inputLabel}>Doctor Name *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Dr. Ravi Kumar"
              value={newDoc.name}
              onChangeText={(v) => setNewDoc((p) => ({ ...p, name: v }))}
              placeholderTextColor={COLORS.muted}
            />

            <Text style={styles.inputLabel}>Department *</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={newDoc.department}
                onValueChange={(v) =>
                  setNewDoc((p) => ({ ...p, department: v }))
                }
                style={styles.picker}
              >
                {MEDICAL_DEPARTMENTS.map((dept) => (
                  <Picker.Item key={dept} label={dept} value={dept} />
                ))}
              </Picker>
            </View>

            <Text style={styles.inputLabel}>Qualification</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. MBBS, MD Cardiology"
              value={newDoc.qualification}
              onChangeText={(v) =>
                setNewDoc((p) => ({ ...p, qualification: v }))
              }
              placeholderTextColor={COLORS.muted}
            />

            <Text style={styles.inputLabel}>Consultation Fee (₹) *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 500"
              value={newDoc.fee}
              onChangeText={(v) => setNewDoc((p) => ({ ...p, fee: v }))}
              keyboardType="number-pad"
              placeholderTextColor={COLORS.muted}
            />

            <TouchableOpacity
              style={styles.modalSaveBtn}
              onPress={handleAddDoctor}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalSaveBtnText}>Save Doctor</Text>
              )}
            </TouchableOpacity>
          </MotiView>
        </View>
      </Modal>

      {/* ── SUCCESS POPUP ── */}
      <Modal visible={successPopup} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Ionicons
              name="checkmark-circle"
              size={60}
              color={COLORS.staff}
            />
            <Text style={styles.successTitle}>Profile Updated!</Text>
            <Text style={styles.successSub}>
              Your hospital details have been saved successfully.
            </Text>
            <Pressable
              style={styles.okBtn}
              onPress={() => setSuccessPopup(false)}
            >
              <Text style={styles.okBtnText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ── InfoField component ──────────────────────────────────────────────────────
function InfoField({
  label,
  icon,
  value,
  edit,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize,
}) {
  return (
    <View style={infoStyles.row}>
      <Ionicons
        name={icon}
        size={18}
        color={COLORS.staff}
        style={infoStyles.icon}
      />
      <View style={{ flex: 1 }}>
        <Text style={infoStyles.label}>{label}</Text>
        {edit ? (
          <TextInput
            style={infoStyles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder || label}
            placeholderTextColor={COLORS.muted}
            keyboardType={keyboardType || "default"}
            autoCapitalize={autoCapitalize || "sentences"}
          />
        ) : (
          <Text style={infoStyles.value}>{value || "—"}</Text>
        )}
      </View>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: COLORS.background },
  container:   { flex: 1 },

  heroCard: {
    height: 240,
    marginHorizontal: 18,
    marginTop: 52,
    borderRadius: 28,
    overflow: "hidden",
    elevation: 5,
  },
  hospitalImage: { width: "100%", height: "100%", resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  cameraBadge: {
    position: "absolute", top: 14, right: 14,
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  cameraText: { color: "#fff", fontWeight: "800", fontSize: 13 },
  heroContent: { position: "absolute", bottom: 20, left: 20 },
  hospitalName: { color: "#fff", fontSize: 22, fontWeight: "900" },
  hospitalSub:  { color: "rgba(255,255,255,0.8)", fontSize: 13, marginTop: 4 },
  heroInput: {
    color: "#fff", fontSize: 20, fontWeight: "900",
    borderBottomWidth: 1, borderBottomColor: "#fff",
    paddingVertical: 2, minWidth: 200,
  },
  statusChip: {
    marginTop: 10, flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: COLORS.staff,
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, alignSelf: "flex-start",
  },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "800" },

  editRow: { paddingHorizontal: 18, marginTop: 14, marginBottom: 4 },
  editBtn: {
    flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-end",
    backgroundColor: "#ECFDF5", paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: COLORS.staff,
  },
  editBtnText:    { color: COLORS.staff, fontWeight: "800" },
  editActionRow:  { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  cancelBtn: {
    paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: 14, backgroundColor: COLORS.background,
    borderWidth: 1, borderColor: COLORS.border,
  },
  cancelBtnText: { color: COLORS.muted, fontWeight: "800" },
  saveBtn: {
    paddingHorizontal: 24, paddingVertical: 10,
    borderRadius: 14, backgroundColor: COLORS.staff,
    minWidth: 120, alignItems: "center",
  },
  saveBtnText: { color: "#fff", fontWeight: "900" },

  card: {
    marginHorizontal: 18, marginBottom: 16,
    backgroundColor: COLORS.card, borderRadius: 24,
    padding: 18, borderWidth: 1, borderColor: COLORS.border, elevation: 2,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: "900", color: COLORS.text, marginBottom: 14,
  },

  paymentHeader: {
    flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6,
  },
  paymentNote: {
    color: COLORS.muted, fontSize: 12, fontWeight: "600",
    marginBottom: 14, lineHeight: 18,
  },
  addBankBtn: {
    flexDirection: "row", alignItems: "center", gap: 6, marginTop: 14,
    paddingVertical: 10, justifyContent: "center",
    backgroundColor: "#ECFDF5", borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.staff,
  },
  addBankBtnText: { color: COLORS.staff, fontWeight: "800" },

  doctorHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 14,
  },
  addDocBtn: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: COLORS.staff,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14,
  },
  addDocBtnText:  { color: "#fff", fontWeight: "800", fontSize: 13 },
  emptyDocs:      { alignItems: "center", paddingVertical: 20 },
  emptyDocsText:  { color: COLORS.text, fontWeight: "800", marginTop: 10, fontSize: 15 },
  emptyDocsSub:   { color: COLORS.muted, textAlign: "center", marginTop: 4, fontSize: 13 },

  doctorRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  doctorAvatar: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: "#ECFDF5", alignItems: "center", justifyContent: "center",
  },
  doctorName:  { fontWeight: "800", color: COLORS.text, fontSize: 15 },
  doctorDept:  { color: COLORS.staff, fontSize: 13, marginTop: 2 },
  doctorMeta:  { color: COLORS.muted, fontSize: 12, marginTop: 1 },
  doctorRight: { alignItems: "flex-end", gap: 6 },
  doctorFee:   { fontWeight: "900", color: COLORS.text, fontSize: 15 },

  logoutBtn: {
    marginHorizontal: 18, marginBottom: 12, height: 52,
    borderRadius: 18, backgroundColor: "#FEF2F2",
    alignItems: "center", justifyContent: "center",
    flexDirection: "row", gap: 8,
    borderWidth: 1, borderColor: "#FECACA",
  },
  logoutText: { color: COLORS.danger || "#EF4444", fontWeight: "900", fontSize: 15 },

  modalOverlay: {
    flex: 1, backgroundColor: "rgba(15,23,42,0.55)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 24, paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 20,
  },
  modalTitle:  { fontSize: 20, fontWeight: "900", color: COLORS.text },
  inputLabel:  {
    fontSize: 13, color: COLORS.muted, fontWeight: "700",
    marginBottom: 6, marginTop: 12,
  },
  modalInput: {
    backgroundColor: COLORS.background, borderRadius: 14, padding: 14,
    fontSize: 15, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border,
  },
  pickerWrap: {
    backgroundColor: COLORS.background, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.border, overflow: "hidden",
  },
  picker:        { color: COLORS.text },
  modalSaveBtn:  {
    marginTop: 22, backgroundColor: COLORS.staff,
    borderRadius: 16, paddingVertical: 16, alignItems: "center",
  },
  modalSaveBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  successCard: {
    margin: 30, backgroundColor: COLORS.card,
    borderRadius: 28, padding: 30, alignItems: "center",
  },
  successTitle: {
    fontSize: 22, fontWeight: "900", color: COLORS.text, marginTop: 14,
  },
  successSub:  { color: COLORS.muted, textAlign: "center", marginTop: 8 },
  okBtn: {
    marginTop: 22, backgroundColor: COLORS.staff,
    paddingHorizontal: 40, paddingVertical: 12, borderRadius: 14,
  },
  okBtnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
});

const infoStyles = StyleSheet.create({
  row: {
    flexDirection: "row", alignItems: "flex-start", gap: 12,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  icon:  { marginTop: 2 },
  label: { fontSize: 11, color: COLORS.muted, fontWeight: "700", marginBottom: 2 },
  value: { fontSize: 15, fontWeight: "700", color: COLORS.text },
  input: {
    fontSize: 15, fontWeight: "700", color: COLORS.text,
    borderBottomWidth: 1, borderBottomColor: COLORS.staff, paddingVertical: 2,
  },
});