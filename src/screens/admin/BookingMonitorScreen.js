import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default function BookingMonitorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Monitor</Text>
      <Text style={styles.sub}>Hospital-wise bookings and token status.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
  title: { marginTop: 52, fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub: { marginTop: 10, color: COLORS.muted },
});