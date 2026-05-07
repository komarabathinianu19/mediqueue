


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";

export default function HospitalVerificationScreen({ route, navigation }) {
  const { hospitals, approveHospital, rejectHospital } = useHospital();

  const hospitalId = route?.params?.hospitalId;
  const hospital =
    hospitals.find((h) => h.id === hospitalId) || route?.params?.hospital;

  if (!hospital) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Hospital not found</Text>
      </View>
    );
  }

  const handleApprove = () => {
    approveHospital(hospital.id);
    Alert.alert("Approved", `${hospital.name} is now visible to patients.`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  const handleReject = () => {
    rejectHospital(hospital.id, "Invalid or incomplete verification documents");
    Alert.alert("Rejected", `${hospital.name} has been rejected.`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} color={COLORS.text} />
      </TouchableOpacity>

      <Text style={styles.title}>Hospital Verification</Text>

      <Image source={{ uri: hospital.image }} style={styles.heroImage} />

      <View style={styles.card}>
        <Text style={styles.name}>{hospital.name}</Text>
        <Text style={styles.city}>{hospital.city}</Text>

        <Info label="Owner Name" value={hospital.owner} />
        <Info label="Mobile Number" value={hospital.phone} />
        <Info label="Email" value={hospital.email} />
        <Info label="Address" value={hospital.address} />
        <Info label="Registration No" value={hospital.regNo} />
        <Info label="License No" value={hospital.license} />
        <Info
          label="Departments"
          value={
            Array.isArray(hospital.departments)
              ? hospital.departments.join(", ")
              : String(hospital.departments || "")
          }
        />
        <Info label="Doctors" value={String(hospital.doctors)} />
        <Info label="Status" value={hospital.status} />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Documents</Text>

        {hospital.documents && hospital.documents.length > 0 ? (
          hospital.documents.map((doc, index) => (
            <View key={`${doc.name}-${index}`} style={styles.docRow}>
              <Ionicons name="document-text-outline" size={22} color={COLORS.admin} />
              <Text style={styles.docName} numberOfLines={1}>
                {doc.name}
              </Text>
              <Text style={styles.viewText}>View</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDocs}>No documents uploaded in demo data.</Text>
        )}
      </View>

      {hospital.status === "pending" && (
        <View style={styles.row}>
          <TouchableOpacity style={styles.approve} onPress={handleApprove}>
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reject} onPress={handleReject}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

function Info({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },

  notFound: { color: COLORS.text, fontWeight: "900", fontSize: 18 },

  backBtn: {
    marginTop: 52,
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },

  heroImage: {
    width: "100%",
    height: 180,
    borderRadius: 24,
    marginTop: 18,
    backgroundColor: COLORS.card,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  name: { fontSize: 20, fontWeight: "900", color: COLORS.text },
  city: { color: COLORS.muted, marginTop: 4, marginBottom: 14 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },

  label: { color: COLORS.muted, fontWeight: "700", flex: 1 },
  value: { color: COLORS.text, fontWeight: "800", flex: 1, textAlign: "right" },

  docRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  docName: { flex: 1, color: COLORS.text, fontWeight: "800" },
  viewText: { color: COLORS.admin, fontWeight: "900" },

  noDocs: { color: COLORS.muted, fontWeight: "700" },

  row: { flexDirection: "row", gap: 12, marginTop: 20, marginBottom: 34 },

  approve: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
  },

  reject: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  approveText: { color: "#fff", fontWeight: "900" },
  rejectText: { color: COLORS.danger, fontWeight: "900" },
});