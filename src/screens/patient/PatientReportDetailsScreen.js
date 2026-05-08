import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useReports } from "../../context/ReportsContext";

const PRIMARY = COLORS?.primary || "#2563EB";

export default function PatientReportDetailsScreen({ route, navigation }) {
  const { reports, deleteReport } = useReports();
  const { reportId } = route.params || {};

  const report = reports.find((item) => item.id === reportId);

  if (!report) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="document-text-outline" size={48} color={COLORS.muted} />
        <Text style={styles.notFoundTitle}>Report not found</Text>

        <TouchableOpacity style={styles.backHomeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backHomeText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert("Delete Report", "Are you sure you want to delete this report?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteReport(report.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 35 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.text} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Report Details</Text>
            <Text style={styles.sub}>View saved medical document</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.deleteTopBtn}
            onPress={confirmDelete}
          >
            <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
          </TouchableOpacity>
        </View>

        <View style={styles.imageCard}>
          {report.fileUri ? (
            <Image source={{ uri: report.fileUri }} style={styles.reportImage} />
          ) : (
            <View style={styles.noImage}>
              <Ionicons name="document-text-outline" size={44} color={PRIMARY} />
              <Text style={styles.noImageText}>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.reportName}>{report.reportName}</Text>

          <View style={styles.typeBadge}>
            <Ionicons name="document-attach-outline" size={16} color={PRIMARY} />
            <Text style={styles.typeBadgeText}>{report.reportType}</Text>
          </View>

          <Info label="Hospital" value={report.hospitalName || "-"} icon="business-outline" />
          <Info label="Doctor" value={report.doctorName || "-"} icon="person-outline" />
          <Info label="Department" value={report.department || "-"} icon="medkit-outline" />
          <Info label="Report Date" value={report.reportDate || "-"} icon="calendar-outline" />
          <Info label="Notes" value={report.notes || "-"} icon="reader-outline" />
        </View>
      </ScrollView>
    </View>
  );
}

function Info({ label, value, icon }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <View style={styles.infoIcon}>
          <Ionicons name={icon} size={18} color={PRIMARY} />
        </View>
        <Text style={styles.infoLabel}>{label}</Text>
      </View>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 18,
  },

  header: {
    marginTop: 54,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  backBtn: {
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
    color: COLORS.text,
    fontSize: 23,
    fontWeight: "900",
  },

  sub: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },

  deleteTopBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  imageCard: {
    backgroundColor: COLORS.card,
    borderRadius: 26,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  reportImage: {
    width: "100%",
    height: 420,
    borderRadius: 22,
    resizeMode: "cover",
  },

  noImage: {
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },

  noImageText: {
    color: COLORS.muted,
    fontWeight: "900",
    marginTop: 8,
  },

  detailsCard: {
    marginTop: 18,
    backgroundColor: COLORS.card,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  reportName: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "900",
  },

  typeBadge: {
    marginTop: 12,
    marginBottom: 10,
    alignSelf: "flex-start",
    backgroundColor: COLORS.lightBlue,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  typeBadgeText: {
    color: PRIMARY,
    fontSize: 12,
    fontWeight: "900",
  },

  infoRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 13,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  infoLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
  },

  infoValue: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "900",
    maxWidth: "48%",
    textAlign: "right",
  },

  notFound: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  notFoundTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 12,
  },

  backHomeBtn: {
    marginTop: 18,
    backgroundColor: PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },

  backHomeText: {
    color: "#fff",
    fontWeight: "900",
  },
});