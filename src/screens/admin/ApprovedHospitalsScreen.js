
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";

export default function ApprovedHospitalsScreen({ navigation }) {
  const { approvedHospitals } = useHospital();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approved Hospitals</Text>
      <Text style={styles.sub}>Verified hospitals visible to patients</Text>

      <FlatList
        data={approvedHospitals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 18, paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No approved hospitals</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("HospitalVerification", { hospitalId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.city}</Text>
              <Text style={styles.status}>Approved</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={COLORS.muted} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },

  title: {
    marginTop: 52,
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },

  sub: { color: COLORS.muted, marginTop: 6 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  image: { width: 68, height: 68, borderRadius: 18 },

  name: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
  meta: { color: COLORS.muted, marginTop: 4 },
  status: { color: COLORS.success, fontWeight: "900", marginTop: 6 },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: { color: COLORS.text, fontWeight: "900" },
});