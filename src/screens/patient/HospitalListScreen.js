



import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useHospital } from "../../context/HospitalContext";

export default function HospitalListScreen({ navigation }) {
  const { approvedHospitals } = useHospital();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Hospital</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={COLORS.muted} />
        <TextInput
          placeholder="Search hospital or location"
          placeholderTextColor={COLORS.muted}
          style={styles.input}
        />
      </View>

      <View style={styles.filters}>
        {["Near Me", "Less Wait", "Open Now"].map((f) => (
          <TouchableOpacity key={f} style={styles.chip}>
            <Text style={styles.chipText}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {approvedHospitals.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="business-outline" size={42} color={COLORS.muted} />
            <Text style={styles.emptyTitle}>No approved hospitals</Text>
            <Text style={styles.emptySub}>
              Hospitals approved by admin will be visible here.
            </Text>
          </View>
        ) : (
          approvedHospitals.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("HospitalDetails", { hospital: item })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>
                  {Array.isArray(item.departments)
                    ? item.departments[0]
                    : "General OPD"}
                </Text>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={COLORS.success}
                  />
                  <Text style={styles.wait}>{item.wait}</Text>
                </View>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={COLORS.muted}
                  />
                  <Text style={styles.distance}>{item.distance}</Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.muted}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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

  searchBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 52,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: { flex: 1, marginLeft: 10, color: COLORS.text },

  filters: { flexDirection: "row", gap: 10, marginVertical: 18 },

  chip: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  chipText: { fontWeight: "700", color: COLORS.text },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 12,
    marginBottom: 14,
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
  },

  image: {
    width: 86,
    height: 86,
    borderRadius: 18,
    backgroundColor: COLORS.lightBlue,
  },

  name: { fontSize: 16, fontWeight: "900", color: COLORS.text },
  type: { color: COLORS.muted, marginTop: 4 },

  metaRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 7 },

  wait: { color: COLORS.success, fontWeight: "800", fontSize: 12 },
  distance: { color: COLORS.muted, fontSize: 12 },

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
    fontWeight: "900",
    fontSize: 18,
    marginTop: 12,
  },

  emptySub: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
  },
});   




















