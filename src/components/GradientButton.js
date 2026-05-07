import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientButton({
  title,
  onPress,
  colors = ["#2563EB", "#06B6D4"],
  style,
}) {
  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={style}>
      <LinearGradient colors={colors} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});