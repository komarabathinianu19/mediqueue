import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default function ComplaintsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complaints</Text>
      <Text style={styles.sub}>Patient complaints and hospital issues.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
  title: { marginTop: 52, fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub: { marginTop: 10, color: COLORS.muted },
});