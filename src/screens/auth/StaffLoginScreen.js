


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { loginHospitalStaff } from "../../services/apiService";
// import InputField from "../../components/InputField";

// export default function StaffLoginScreen({ navigation }) {
//   const [hospitalId, setHospitalId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");

//     if (!hospitalId.trim() || !email.trim() || !password.trim()) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const data = await loginHospitalStaff(
//         hospitalId.trim().toUpperCase(),
//         email.trim(),
//         password
//       );

//       // ✅ Save token AND hospitalId so StaffDashboard can use them
//       await AsyncStorage.multiSet([
//         ["token", data.token],
//         ["hospitalId", data.hospitalId],
//         ["hospitalName", data.name || ""],
//         ["hospitalEmail", data.email || ""],
//         ["hospitalPhone", data.phone || ""],
//         ["hospitalAddress", data.address || ""],
//         ["hospitalCity", data.city || ""],
//         ["hospitalType", data.type || ""],
//         ["hospitalImageUrl", data.imageUrl || ""],
//         ["hospitalStatus", data.status || ""],
//       ]);

//       // Navigate to staff tabs
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "StaffTabs" }],
//       });
//     } catch (err) {
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.content}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backBtn}
//           >
//             <Ionicons name="arrow-back" size={24} color={COLORS.text} />
//           </TouchableOpacity>
//         </View>

//         {/* Icon */}
//         <View style={styles.iconWrap}>
//           <Ionicons name="business" size={52} color={COLORS.staff} />
//         </View>

//         <Text style={styles.title}>Staff Login</Text>
//         <Text style={styles.sub}>Sign in to manage your hospital</Text>

//         {/* Error */}
//         {error ? (
//           <View style={styles.errorBox}>
//             <Ionicons name="alert-circle" size={16} color="#EF4444" />
//             <Text style={styles.errorText}>{error}</Text>
//           </View>
//         ) : null}

//         {/* Fields */}
//         <InputField
//           label="Hospital ID"
//           placeholder="e.g. HSP-XXXXXX"
//           value={hospitalId}
//           onChangeText={(t) => setHospitalId(t.toUpperCase())}
//           autoCapitalize="characters"
//         />

//         <InputField
//           label="Email"
//           placeholder="hospital@email.com"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <InputField
//           label="Password"
//           placeholder="Enter password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         {/* Login Button */}
//         <TouchableOpacity
//           style={[styles.btn, loading && styles.btnDisabled]}
//           onPress={handleLogin}
//           disabled={loading}
//           activeOpacity={0.85}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.btnText}>Sign In</Text>
//           )}
//         </TouchableOpacity>

//         {/* Register link */}
//         <TouchableOpacity
//           onPress={() => navigation.navigate("HospitalRegister")}
//           style={styles.registerLink}
//         >
//           <Text style={styles.registerText}>
//             New hospital?{" "}
//             <Text style={{ color: COLORS.staff, fontWeight: "800" }}>
//               Register here
//             </Text>
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   content: {
//     padding: 24,
//     paddingBottom: 48,
//   },
//   header: {
//     marginTop: 52,
//     marginBottom: 8,
//   },
//   backBtn: {
//     padding: 4,
//     alignSelf: "flex-start",
//   },
//   iconWrap: {
//     alignSelf: "center",
//     marginTop: 16,
//     marginBottom: 16,
//     width: 90,
//     height: 90,
//     borderRadius: 28,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: COLORS.text,
//     textAlign: "center",
//   },
//   sub: {
//     color: COLORS.muted,
//     textAlign: "center",
//     marginTop: 6,
//     marginBottom: 28,
//   },
//   errorBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     backgroundColor: "#FEF2F2",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },
//   errorText: {
//     color: "#EF4444",
//     flex: 1,
//     fontSize: 14,
//   },
//   btn: {
//     backgroundColor: COLORS.staff,
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 24,
//   },
//   btnDisabled: {
//     opacity: 0.6,
//   },
//   btnText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 16,
//   },
//   registerLink: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   registerText: {
//     color: COLORS.muted,
//     fontSize: 14,
//   },
// });































// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { loginHospitalStaff } from "../../services/apiService";
// import InputField from "../../components/InputField";
// import { useHospital } from "../../context/HospitalContext"; // ✅ Added Context

// export default function StaffLoginScreen({ navigation }) {
//   const { setStaffSession } = useHospital(); // ✅ Hook to save session globally
//   const [hospitalId, setHospitalId] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");

//     if (!hospitalId.trim() || !email.trim() || !password.trim()) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const data = await loginHospitalStaff(
//         hospitalId.trim().toUpperCase(),
//         email.trim(),
//         password
//       );

//       // ✅ 1. Save to Global Context (Makes other screens work instantly)
//       setStaffSession(data);

//       // ✅ 2. Persistent Storage (For app restarts)
//       await AsyncStorage.multiSet([
//         ["token", data.token],
//         ["hospitalId", data.hospitalId],
//         ["hospitalName", data.name || ""],
//         ["hospitalEmail", data.email || ""],
//         ["hospitalPhone", data.phone || ""],
//         ["hospitalAddress", data.address || ""],
//         ["hospitalCity", data.city || ""],
//         ["hospitalType", data.type || ""],
//         ["hospitalImageUrl", data.imageUrl || ""],
//         ["hospitalStatus", data.status || ""],
//       ]);

//       // ✅ 3. Navigate to staff tabs
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "StaffTabs" }],
//       });
//     } catch (err) {
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.content}
//         keyboardShouldPersistTaps="handled"
//       >


//         <View style={styles.iconWrap}>
//           <Ionicons name="business" size={52} color={COLORS.staff} />
//         </View>

//         <Text style={styles.title}>Staff Login</Text>
//         <Text style={styles.sub}>Sign in to manage your hospital</Text>

//         {error ? (
//           <View style={styles.errorBox}>
//             <Ionicons name="alert-circle" size={16} color="#EF4444" />
//             <Text style={styles.errorText}>{error}</Text>
//           </View>
//         ) : null}

//         <InputField
//           label="Hospital ID"
//           placeholder="e.g. HSP-XXXXXX"
//           value={hospitalId}
//           onChangeText={(t) => setHospitalId(t.toUpperCase())}
//           autoCapitalize="characters"
//         />

//         <InputField
//           label="Email"
//           placeholder="hospital@email.com"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//         />

//         <InputField
//           label="Password"
//           placeholder="Enter password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={[styles.btn, loading && styles.btnDisabled]}
//           onPress={handleLogin}
//           disabled={loading}
//           activeOpacity={0.85}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.btnText}>Sign In</Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//           onPress={() => navigation.navigate("HospitalRegister")}
//           style={styles.registerLink}
//         >
//           <Text style={styles.registerText}>
//             New hospital?{" "}
//             <Text style={{ color: COLORS.staff, fontWeight: "800" }}>
//               Register here
//             </Text>
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   content: { padding: 24, paddingBottom: 48 },
//   header: { marginTop: 52, marginBottom: 8 },
//   backBtn: { padding: 4, alignSelf: "flex-start" },
//   iconWrap: {
//     alignSelf: "center",
//     marginTop: 16,
//     marginBottom: 16,
//     width: 90,
//     height: 90,
//     borderRadius: 28,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   title: { fontSize: 28, fontWeight: "900", color: COLORS.text, textAlign: "center" },
//   sub: { color: COLORS.muted, textAlign: "center", marginTop: 6, marginBottom: 28 },
//   errorBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     backgroundColor: "#FEF2F2",
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#FECACA",
//   },
//   errorText: { color: "#EF4444", flex: 1, fontSize: 14 },
//   btn: {
//     backgroundColor: COLORS.staff,
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: "center",
//     marginTop: 24,
//   },
//   btnDisabled: { opacity: 0.6 },
//   btnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
//   registerLink: { marginTop: 20, alignItems: "center" },
//   registerText: { color: COLORS.muted, fontSize: 14 },
// });  

































import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { loginHospitalStaff } from "../../services/apiService";
import InputField from "../../components/InputField";
import { useHospital } from "../../context/HospitalContext";

export default function StaffLoginScreen({ navigation }) {
  const { setStaffSession } = useHospital();
  const [hospitalId, setHospitalId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Error popup state ────────────────────────────────────────────────────────
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const showError = (msg) => {
    setPopupMessage(msg);
    setPopupVisible(true);
  };

  const handleLogin = async () => {
    if (!hospitalId.trim() || !email.trim() || !password.trim()) {
      showError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginHospitalStaff(
        hospitalId.trim().toUpperCase(),
        email.trim(),
        password
      );

      setStaffSession(data);

      await AsyncStorage.multiSet([
        ["token", data.token],
        ["hospitalId", data.hospitalId],
        ["hospitalName", data.name || ""],
        ["hospitalEmail", data.email || ""],
        ["hospitalPhone", data.phone || ""],
        ["hospitalAddress", data.address || ""],
        ["hospitalCity", data.city || ""],
        ["hospitalType", data.type || ""],
        ["hospitalImageUrl", data.imageUrl || ""],
        ["hospitalStatus", data.status || ""],
      ]);

      navigation.reset({ index: 0, routes: [{ name: "StaffTabs" }] });
    } catch (err) {
      // Show a friendly popup for any login failure
      const msg = err?.message || "";

      if (
        msg.toLowerCase().includes("invalid") ||
        msg.toLowerCase().includes("incorrect") ||
        msg.toLowerCase().includes("wrong") ||
        msg.toLowerCase().includes("unauthorized") ||
        msg.toLowerCase().includes("401") ||
        msg.toLowerCase().includes("403") ||
        msg.toLowerCase().includes("not found") ||
        msg.toLowerCase().includes("server error") ||
        msg.toLowerCase().includes("check console")
      ) {
        showError("Incorrect Hospital ID, email, or password.\nPlease check your credentials and try again.");
      } else {
        showError(msg || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.iconWrap}>
          <Ionicons name="business" size={52} color={COLORS.staff} />
        </View>

        <Text style={styles.title}>Staff Login</Text>
        <Text style={styles.sub}>Sign in to manage your hospital</Text>

        <InputField
          label="Hospital ID"
          placeholder="e.g. HSP-XXXXXX"
          value={hospitalId}
          onChangeText={(t) => setHospitalId(t.toUpperCase())}
          autoCapitalize="characters"
        />

        <InputField
          label="Email"
          placeholder="hospital@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputField
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("HospitalRegister")}
          style={styles.registerLink}
        >
          <Text style={styles.registerText}>
            New hospital?{" "}
            <Text style={{ color: COLORS.staff, fontWeight: "800" }}>
              Register here
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* ── Error Popup Modal ── */}
      <Modal
        visible={popupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPopupVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            {/* Icon */}
            <View style={styles.popupIconWrap}>
              <Ionicons name="close-circle" size={48} color="#EF4444" />
            </View>

            <Text style={styles.popupTitle}>Login Failed</Text>
            <Text style={styles.popupMessage}>{popupMessage}</Text>

            <Pressable
              style={styles.popupBtn}
              onPress={() => setPopupVisible(false)}
            >
              <Text style={styles.popupBtnText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 24, paddingBottom: 48 },
  iconWrap: {
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 16,
    width: 90,
    height: 90,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: { fontSize: 28, fontWeight: "900", color: COLORS.text, textAlign: "center" },
  sub: { color: COLORS.muted, textAlign: "center", marginTop: 6, marginBottom: 28 },
  btn: {
    backgroundColor: COLORS.staff,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 24,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#fff", fontWeight: "900", fontSize: 16 },
  registerLink: { marginTop: 20, alignItems: "center" },
  registerText: { color: COLORS.muted, fontSize: 14 },

  // ── Popup ────────────────────────────────────────────────────────────────────
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  popup: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 12,
  },
  popupIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#1E293B",
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 21,
    fontWeight: "500",
    marginBottom: 24,
  },
  popupBtn: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
  popupBtnText: { color: "#fff", fontWeight: "900", fontSize: 15 },
});