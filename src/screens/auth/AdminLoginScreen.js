// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";

// export default function AdminLoginScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.logoBox}>
//         <Ionicons name="shield-checkmark-outline" size={78} color={COLORS.admin} />
//         <Text style={styles.logo}>Super Admin</Text>
//         <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.title}>Admin Login</Text>

//         <InputField label="Email" value="admin@mediqueue.com" />
//         <InputField label="Password" value="123456" secureTextEntry />

//         <GradientButton
//           title="Login"
//           colors={[COLORS.admin, "#8B5CF6"]}
//           onPress={() => navigation.replace("AdminTabs")}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 22 },
//   logoBox: { alignItems: "center", marginTop: 86, marginBottom: 34 },
//   logo: { fontSize: 30, fontWeight: "900", color: COLORS.admin },
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
// });  




























import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import { COLORS } from "../../constants/colors";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Tactile feedback for an "authorized" action
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.replace("AdminTabs");
  };

  return (
    <View style={styles.container}>
      {/* 1. Authority Logo Animation */}
      <MotiView 
        from={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 900 }}
        style={styles.logoBox}
      >
        <View style={styles.shieldContainer}>
          <Ionicons name="shield-checkmark" size={64} color="#fff" />
        </View>
        <Text style={styles.logo}>Super Admin</Text>
        <Text style={styles.tagline}>Verify hospitals and monitor platform</Text>
      </MotiView>

      {/* 2. Entrance for the Card */}
      <MotiView 
        from={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 700, delay: 200 }}
        style={styles.card}
      >
        <Text style={styles.title}>Admin Login</Text>

        {/* 3. Sequential Inputs */}
        <MotiView
          from={{ opacity: 0, translateX: -15 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 450 }}
        >
          <InputField 
            label="Admin Email" 
            placeholder="admin@mediqueue.com"
            value={email}
            onChangeText={setEmail}
            icon="mail-unread-outline"
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -15 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ delay: 600 }}
        >
          <InputField 
            label="Security Password" 
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry 
            icon="key-outline"
          />
        </MotiView>

        {/* Login Action */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 800 }}
          style={{ marginTop: 12 }}
        >
          <GradientButton
            title="Access Control Center"
            colors={[COLORS.admin, "#8B5CF6"]}
            onPress={handleLogin}
          />
        </MotiView>

        <MotiView 
          from={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1000 }}
        >
          <Text style={styles.footerNote}>
            Authorized Personnel Only
          </Text>
        </MotiView>
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
  shieldContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: COLORS.admin,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // Deeper shadow for "Heavy" Admin feel
    shadowColor: COLORS.admin,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  logo: { 
    fontSize: 32, 
    fontWeight: "900", 
    color: COLORS.admin,
    letterSpacing: -0.5
  },
  tagline: { 
    color: COLORS.muted, 
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center'
  },
  card: {
    backgroundColor: COLORS.card || "#FFF",
    borderRadius: 32,
    padding: 26,
    borderWidth: 1,
    borderColor: COLORS.border || "#E2E8F0",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: COLORS.text, 
    marginBottom: 20 
  },
  footerNote: {
    textAlign: "center",
    marginTop: 24,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: 'uppercase',
    letterSpacing: 1
  },
});