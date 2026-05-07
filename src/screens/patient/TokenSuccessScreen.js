




import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

export default function TokenSuccessScreen({ route, navigation }) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.successCircle}>
        <Ionicons name="checkmark" size={58} color="#fff" />
      </View>

      <Text style={styles.title}>Booking Confirmed</Text>

      <View style={styles.tokenCard}>
        <Text style={styles.small}>Your Token Number</Text>
        <Text style={styles.token}>{token.tokenNo}</Text>
        <Text style={styles.small}>
          {token.hospitalName} • {token.department}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "PatientTabs" }],
          })
        }
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  successCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.success,
    marginBottom: 22,
  },
  tokenCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  small: {
    color: COLORS.muted,
    fontWeight: "700",
    textAlign: "center",
  },
  token: {
    fontSize: 46,
    fontWeight: "900",
    color: COLORS.text,
    marginVertical: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    width: "100%",
    height: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "900",
  },
});