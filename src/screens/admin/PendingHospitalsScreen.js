





import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";

export default function PendingHospitalsScreen({ navigation }) {
  const { pendingHospitals } = useHospital();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Hospitals</Text>
      <Text style={styles.sub}>Verify hospital details and documents</Text>

      <FlatList
        data={pendingHospitals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 18, paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-circle-outline" size={46} color={COLORS.success} />
            <Text style={styles.emptyTitle}>No pending requests</Text>
            <Text style={styles.emptySub}>New hospital registrations will show here.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("HospitalVerification", { hospitalId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.city}</Text>
              <Text style={styles.date}>Owner: {item.owner}</Text>
            </View>

            <Text style={styles.pending}>Pending</Text>
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
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#F5F3FF",
  },

  name: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
  meta: { color: COLORS.muted, marginTop: 4 },
  date: { color: COLORS.muted, marginTop: 3, fontSize: 12 },

  pending: { color: COLORS.warning, fontWeight: "900" },

  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyTitle: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 12,
  },

  emptySub: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
  },
});