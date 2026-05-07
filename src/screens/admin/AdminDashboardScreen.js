

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function AdminDashboardScreen({ navigation }) {
  const handleLogout = () => {
    navigation.getParent()?.reset({
      index: 0,
      routes: [{ name: "RoleSelect" }],
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Super Admin</Text>
          <Text style={styles.sub}>Platform Verification Dashboard</Text>
        </View>

        <TouchableOpacity style={styles.logoutIconBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        <Stat title="Pending Hospitals" value="12" color={COLORS.warning} />
        <Stat title="Approved Hospitals" value="48" color={COLORS.success} />
        <Stat title="Rejected Hospitals" value="3" color={COLORS.danger} />
        <Stat title="Today Bookings" value="240" color={COLORS.primary} />
        <Stat title="Active Queues" value="31" color={COLORS.text} />
        <Stat title="Complaints" value="8" color={COLORS.danger} />
      </View>

      <TouchableOpacity
        style={styles.mainAction}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Pending")}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.mainTitle}>Review Pending Hospitals</Text>
          <Text style={styles.mainSub}>
            Verify documents and approve hospitals
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Approved")}
      >
        <View style={styles.actionIcon}>
          <Ionicons name="business-outline" size={23} color={COLORS.admin} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>Approved Hospitals</Text>
          <Text style={styles.actionSub}>View verified hospitals</Text>
        </View>
        <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Bookings")}
      >
        <View style={styles.actionIcon}>
          <Ionicons name="list-outline" size={23} color={COLORS.admin} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>Booking Monitor</Text>
          <Text style={styles.actionSub}>Track today’s patient tokens</Text>
        </View>
        <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.action}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("Complaints")}
      >
        <View style={styles.actionIconDanger}>
          <Ionicons name="warning-outline" size={23} color={COLORS.danger} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>Complaints / Reports</Text>
          <Text style={styles.actionSub}>Review patient complaints</Text>
        </View>
        <Ionicons name="chevron-forward" size={21} color={COLORS.muted} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Stat({ title, value, color }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 18,
  },

  header: {
    marginTop: 52,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },

  sub: {
    color: COLORS.muted,
    marginTop: 6,
    fontWeight: "600",
  },

  logoutIconBtn: {
    width: 46,
    height: 46,
    borderRadius: 18,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  stat: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },

  statTitle: {
    color: COLORS.muted,
    fontWeight: "800",
    fontSize: 12,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 10,
  },

  mainAction: {
    backgroundColor: COLORS.admin,
    borderRadius: 24,
    padding: 22,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 5,
  },

  mainTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },

  mainSub: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 26,
    marginBottom: 12,
  },

  action: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
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
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F5F3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  actionIconDanger: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FEF2F2",
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
  },

  logoutBtn: {
    marginTop: 12,
    marginBottom: 34,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  logoutText: {
    color: COLORS.danger,
    fontWeight: "900",
    fontSize: 15,
  },
});