


// import React, { useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   Animated,
//   Easing,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import * as ExpoSplashScreen from "expo-splash-screen";

// // IMPORTANT: call this outside component
// // This helps mobile keep native splash until React screen is ready.
// ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

// export default function SplashScreenComponent({ navigation }) {
//   const logoFade = useRef(new Animated.Value(0)).current;
//   const logoSlide = useRef(new Animated.Value(30)).current;

//   const nameFade = useRef(new Animated.Value(0)).current;
//   const nameSlide = useRef(new Animated.Value(25)).current;

//   const captionFade = useRef(new Animated.Value(0)).current;
//   const captionSlide = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     let timer;

//     const startSplash = async () => {
//       // Hide Expo native splash when this custom splash screen is ready
//       try {
//         await ExpoSplashScreen.hideAsync();
//       } catch (e) {}

//       Animated.stagger(700, [
//         Animated.parallel([
//           Animated.timing(logoFade, {
//             toValue: 1,
//             duration: 700,
//             easing: Easing.out(Easing.back(1.3)),
//             useNativeDriver: true,
//           }),
//           Animated.timing(logoSlide, {
//             toValue: 0,
//             duration: 700,
//             easing: Easing.out(Easing.back(1.3)),
//             useNativeDriver: true,
//           }),
//         ]),

//         Animated.parallel([
//           Animated.timing(nameFade, {
//             toValue: 1,
//             duration: 650,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//           }),
//           Animated.timing(nameSlide, {
//             toValue: 0,
//             duration: 650,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//           }),
//         ]),

//         Animated.parallel([
//           Animated.timing(captionFade, {
//             toValue: 1,
//             duration: 650,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//           }),
//           Animated.timing(captionSlide, {
//             toValue: 0,
//             duration: 650,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//           }),
//         ]),
//       ]).start();

//       // Keep custom splash visible properly on mobile and web
//       timer = setTimeout(() => {
//         navigation.replace("RoleSelect");
//       }, 4500);
//     };

//     startSplash();

//     return () => {
//       if (timer) clearTimeout(timer);
//     };
//   }, [navigation, logoFade, logoSlide, nameFade, nameSlide, captionFade, captionSlide]);

//   return (
//     <LinearGradient colors={["#00BFAE", "#004B6D"]} style={styles.container}>
//       <View style={styles.content}>
//         <Animated.View
//           style={[
//             styles.logoWrapper,
//             {
//               opacity: logoFade,
//               transform: [{ translateY: logoSlide }],
//             },
//           ]}
//         >
//           <Image
//             source={require("../../assets/splash-icon.png")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </Animated.View>

//         <Animated.Text
//           style={[
//             styles.appName,
//             {
//               opacity: nameFade,
//               transform: [{ translateY: nameSlide }],
//             },
//           ]}
//         >
//           MediQueue
//         </Animated.Text>

//         <Animated.View
//           style={[
//             styles.captionContainer,
//             {
//               opacity: captionFade,
//               transform: [{ translateY: captionSlide }],
//             },
//           ]}
//         >
//           <View style={styles.line} />
//           <Text style={styles.caption}>Skip the waiting. Reach on time.</Text>
//           <View style={styles.line} />
//         </Animated.View>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     paddingHorizontal: 24,
//   },

//   logoWrapper: {
//     width: 122,
//     height: 122,
//     borderRadius: 34,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.25)",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 14 },
//     shadowOpacity: Platform.OS === "web" ? 0.12 : 0.22,
//     shadowRadius: 22,
//     elevation: 8,
//   },

//   logo: {
//     width: 92,
//     height: 92,
//     borderRadius: 24,
//   },

//   appName: {
//     fontSize: 44,
//     fontWeight: "900",
//     color: "#FFFFFF",
//     letterSpacing: 2,
//     marginBottom: 12,
//     textShadowColor: "rgba(0, 0, 0, 0.16)",
//     textShadowOffset: { width: 1, height: 2 },
//     textShadowRadius: 4,
//   },

//   captionContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//   },

//   caption: {
//     fontSize: 15,
//     color: "rgba(255, 255, 255, 0.92)",
//     fontWeight: "700",
//     marginHorizontal: 12,
//     letterSpacing: 0.5,
//   },

//   line: {
//     width: 25,
//     height: 1.5,
//     borderRadius: 10,
//     backgroundColor: "rgba(255, 255, 255, 0.45)",
//   },
// });  




























import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ExpoSplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// IMPORTANT: call this outside component
// This helps mobile keep native splash until React screen is ready.
ExpoSplashScreen.preventAutoHideAsync().catch(() => {});

export default function SplashScreenComponent({ navigation }) {
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoSlide = useRef(new Animated.Value(30)).current;

  const nameFade = useRef(new Animated.Value(0)).current;
  const nameSlide = useRef(new Animated.Value(25)).current;

  const captionFade = useRef(new Animated.Value(0)).current;
  const captionSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    let timer;

    const startSplash = async () => {
      // Hide Expo native splash when this custom splash screen is ready
      try {
        await ExpoSplashScreen.hideAsync();
      } catch (e) {}

      Animated.stagger(700, [
        Animated.parallel([
          Animated.timing(logoFade, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.back(1.3)),
            useNativeDriver: true,
          }),
          Animated.timing(logoSlide, {
            toValue: 0,
            duration: 700,
            easing: Easing.out(Easing.back(1.3)),
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(nameFade, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(nameSlide, {
            toValue: 0,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),

        Animated.parallel([
          Animated.timing(captionFade, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(captionSlide, {
            toValue: 0,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ]).start();

      timer = setTimeout(async () => {
        await checkSessionAndNavigate();
      }, 4500);
    };

    startSplash();

    return () => clearTimeout(timer);
  }, []);

  // ── Auto-login: check stored session and route accordingly ──────────────────
  const checkSessionAndNavigate = async () => {
    try {
      // Check for ADMIN session
      const adminToken = await AsyncStorage.getItem("adminToken");
      if (adminToken === "admin_session_active") {
        navigation.replace("AdminTabs");
        return;
      }

      // Check for STAFF (hospital) session
      const hospitalToken = await AsyncStorage.getItem("token");
      const hospitalId = await AsyncStorage.getItem("hospitalId");
      if (hospitalToken && hospitalId) {
        navigation.replace("StaffTabs");
        return;
      }

      // Check for PATIENT session
      // Patient stores "token" but NOT "hospitalId"
      if (hospitalToken && !hospitalId) {
        navigation.replace("PatientTabs");
        return;
      }
    } catch (e) {
      // If AsyncStorage fails, fall through to RoleSelect
    }

    // No active session — go to role selection
    navigation.replace("RoleSelect");
  };

  return (
    <LinearGradient
      colors={["#0EA5E9", "#6366F1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoFade,
              transform: [{ translateY: logoSlide }],
            },
          ]}
        >
          <Image
            source={require("../../assets/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: nameFade,
              transform: [{ translateY: nameSlide }],
            },
          ]}
        >
          MediQueue
        </Animated.Text>

        <Animated.View
          style={[
            styles.captionContainer,
            {
              opacity: captionFade,
              transform: [{ translateY: captionSlide }],
            },
          ]}
        >
          <View style={styles.line} />
          <Text style={styles.caption}>Skip the waiting. Reach on time.</Text>
          <View style={styles.line} />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 24,
  },

  logoWrapper: {
    width: 122,
    height: 122,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: Platform.OS === "web" ? 0.12 : 0.22,
    shadowRadius: 22,
    elevation: 8,
  },

  logo: {
    width: 92,
    height: 92,
    borderRadius: 24,
  },

  appName: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.16)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },

  captionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  caption: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.92)",
    fontWeight: "700",
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },

  line: {
    width: 25,
    height: 1.5,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
});