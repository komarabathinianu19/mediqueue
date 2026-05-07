// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function PatientLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoBox}>
//         <Ionicons name="person-circle-outline" size={82} color={COLORS.primary} />
//         <Text style={styles.logo}>MediQueue</Text>
//         <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome Back!</Text>
//         <Text style={styles.sub}>Enter your mobile number to continue</Text>

//         <InputField label="Mobile Number" value="+91 98765 43210" keyboardType="phone-pad" />

//         <GradientButton
//           title="Send OTP"
//           onPress={() => navigation.replace("PatientTabs")}
//         />

//         <Text style={styles.terms}>
//           By continuing, you agree to our Terms & Conditions
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 22 },
//   logoBox: { alignItems: "center", marginTop: 86, marginBottom: 34 },
//   logo: { fontSize: 32, fontWeight: "900", color: COLORS.primary },
//   tagline: { color: COLORS.muted, marginTop: 8 },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 30,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     shadowColor: "#0F172A",
//     shadowOpacity: 0.08,
//     shadowRadius: 18,
//     elevation: 4,
//   },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 6, marginBottom: 18 },
//   terms: {
//     textAlign: "center",
//     color: COLORS.muted,
//     fontSize: 12,
//     marginTop: 24,
//   },
// });  




















import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";

export default function PatientLoginScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* 1. Animated Logo Section */}
      <MotiView 
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 1000 }}
        style={styles.logoBox}
      >
        <View style={styles.iconCircle}>
           <Ionicons name="person-circle-outline" size={72} color="#fff" />
        </View>
        <Text style={styles.logo}>MediQueue</Text>
        <Text style={styles.tagline}>Book hospital tokens in seconds</Text>
      </MotiView>

      {/* 2. Animated Login Card */}
      <MotiView 
        from={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 200 }}
        style={styles.card}
      >
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.sub}>Enter your details to access your account</Text>

        {/* 3. Staggered Inputs */}
        <MotiView
          from={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 400 }}
        >
          <InputField 
            label="Phone Number" 
            placeholder="+91 00000 00000"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad" 
            icon="call-outline"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -10 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 500 }}
        >
          <InputField 
            label="Password" 
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 700 }}
          style={{ marginTop: 10 }}
        >
          <GradientButton
            title="Login"
            onPress={() => navigation.replace("PatientTabs")}
          />
        </MotiView>

        <Pressable style={styles.forgotPass}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
        </Pressable>

        <Text style={styles.terms}>
          By continuing, you agree to our{" "}
          <Text style={{ fontWeight: "700" }}>Terms & Conditions</Text>
        </Text>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background, 
    padding: 24,
    justifyContent: 'center' 
  },
  logoBox: { 
    alignItems: "center", 
    marginBottom: 40 
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: { 
    fontSize: 34, 
    fontWeight: "900", 
    color: COLORS.primary,
    letterSpacing: -1 
  },
  tagline: { 
    color: COLORS.muted, 
    marginTop: 4,
    fontSize: 15,
    fontWeight: '500'
  },
  card: {
    backgroundColor: COLORS.card || "#FFF",
    borderRadius: 32,
    padding: 26,
    borderWidth: 1,
    borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 5,
  },
  title: { 
    fontSize: 26, 
    fontWeight: "800", 
    color: COLORS.text || "#1E293B" 
  },
  sub: { 
    color: COLORS.muted || "#64748B", 
    marginTop: 6, 
    marginBottom: 24,
    fontSize: 14,
    lineHeight: 20
  },
  forgotPass: {
    marginTop: 16,
    alignItems: 'center'
  },
  forgotText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 14
  },
  terms: {
    textAlign: "center",
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 30,
    opacity: 0.8
  },
});