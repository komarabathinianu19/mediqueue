import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export default function StatusChip({ label, type = "pending" }) {
  const config = {
    pending: ["#FFF7ED", COLORS.warning],
    approved: ["#ECFDF5", COLORS.success],
    rejected: ["#FEF2F2", COLORS.danger],
    serving: ["#EFF6FF", COLORS.primary],
  };

  const [bg, color] = config[type] || config.pending;

  return (
    <Text style={[styles.chip, { backgroundColor: bg, color }]}>{label}</Text>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "900",
    fontSize: 12,
    overflow: "hidden",
  },
});