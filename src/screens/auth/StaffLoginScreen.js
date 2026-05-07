// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function StaffLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoBox}>
//         <Ionicons name="medkit-outline" size={78} color={COLORS.staff} />
//         <Text style={styles.logo}>Hospital Staff</Text>
//         <Text style={styles.tagline}>Manage live queue and tokens</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Staff Login</Text>

//         <InputField label="Hospital ID" value="HSP12456" />
//         <InputField label="Mobile / Email" value="staff@citycare.com" />
//         <InputField label="Password" value="123456" secureTextEntry />

//         <GradientButton
//           title="Login"
//           colors={[COLORS.staff, "#14B8A6"]}
//           onPress={() => navigation.replace("StaffTabs")}
//         />

//         <TouchableOpacity onPress={() => navigation.navigate("HospitalRegister")}>
//           <Text style={styles.register}>Register New Hospital</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 22 },
//   logoBox: { alignItems: "center", marginTop: 72, marginBottom: 28 },
//   logo: { fontSize: 30, fontWeight: "900", color: COLORS.staff },
//   tagline: { color: COLORS.muted, marginTop: 8 },
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 30,
//     padding: 22,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 4,
//   },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text, marginBottom: 18 },
//   register: {
//     textAlign: "center",
//     marginTop: 22,
//     color: COLORS.staff,
//     fontWeight: "900",
//   },
// });  























import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import { COLORS } from "../../constants/colors";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";

export default function StaffLoginScreen({ navigation }) {
  const [hospitalId, setHospitalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.replace("StaffTabs");
  };

  return (
    <View style={styles.container}>
      {/* 1. Logo & Header Animation */}
      <MotiView 
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.logoBox}
      >
        <View style={[styles.iconCircle, { backgroundColor: COLORS.staff }]}>
          <Ionicons name="medkit" size={60} color="#fff" />
        </View>
        <Text style={styles.logo}>Hospital Staff</Text>
        <Text style={styles.tagline}>Manage live queue and tokens</Text>
      </MotiView>

      {/* 2. Main Login Card Animation */}
      <MotiView 
        from={{ opacity: 0, translateY: 40 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600, delay: 200 }}
        style={styles.card}
      >
        <Text style={styles.title}>Staff Login</Text>

        {/* 3. Input Fields - One by One Slide */}
        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 400 }}
        >
          <InputField 
            label="Hospital ID" 
            placeholder="HSP12345"
            value={hospitalId}
            onChangeText={setHospitalId}
            icon="business-outline"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 550 }}
        >
          <InputField 
            label="Mobile / Email" 
            placeholder="staff@citycare.com"
            value={email}
            onChangeText={setEmail}
            icon="mail-outline"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 700 }}
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

        {/* Login Button with subtle pop */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 900 }}
          style={{ marginTop: 12 }}
        >
          <GradientButton
            title="Login to Dashboard"
            colors={[COLORS.staff, "#14B8A6"]}
            onPress={handleLogin}
          />
        </MotiView>

        <TouchableOpacity 
          onPress={() => navigation.navigate("HospitalRegister")}
          activeOpacity={0.7}
        >
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1100 }}
          >
            <Text style={styles.register}>Register New Hospital</Text>
          </MotiView>
        </TouchableOpacity>
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
    marginBottom: 32 
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 28, // More "medical" squared-circle look
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  logo: { 
    fontSize: 32, 
    fontWeight: "900", 
    color: COLORS.staff,
    letterSpacing: -0.5
  },
  tagline: { 
    color: COLORS.muted, 
    marginTop: 6,
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
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: COLORS.text, 
    marginBottom: 20 
  },
  register: {
    textAlign: "center",
    marginTop: 22,
    color: COLORS.staff,
    fontWeight: "800",
    fontSize: 15,
    textDecorationLine: 'underline'
  },
});