













// import React, { useEffect, useRef } from "react";
// import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import * as SplashScreen from "expo-splash-screen";

// export default function SplashScreenComponent({ navigation }) {
//   // Individual animation values for staggered effect
//   const logoFade = useRef(new Animated.Value(0)).current;
//   const logoSlide = useRef(new Animated.Value(20)).current;
  
//   const nameFade = useRef(new Animated.Value(0)).current;
//   const nameSlide = useRef(new Animated.Value(20)).current;
  
//   const captionFade = useRef(new Animated.Value(0)).current;
//   const captionSlide = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     SplashScreen.preventAutoHideAsync();

//     // Staggered Animation Sequence
//     Animated.stagger(400, [
//       // 1. Logo Animation
//       Animated.parallel([
//         Animated.timing(logoFade, { toValue: 1, duration: 800, useNativeDriver: true }),
//         Animated.timing(logoSlide, { toValue: 0, duration: 800, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true })
//       ]),
//       // 2. Name Animation
//       Animated.parallel([
//         Animated.timing(nameFade, { toValue: 1, duration: 800, useNativeDriver: true }),
//         Animated.timing(nameSlide, { toValue: 0, duration: 800, easing: Easing.out(Easing.quad), useNativeDriver: true })
//       ]),
//       // 3. Caption Animation
//       Animated.parallel([
//         Animated.timing(captionFade, { toValue: 1, duration: 800, useNativeDriver: true }),
//         Animated.timing(captionSlide, { toValue: 0, duration: 800, easing: Easing.out(Easing.quad), useNativeDriver: true })
//       ])
//     ]).start();

//     // Transition to main screen after animations finish
//     const timer = setTimeout(async () => {
//       await SplashScreen.hideAsync();
//       navigation.replace("RoleSelect");
//     }, 4500); 

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <LinearGradient
//       colors={["#00bfae", "#004b6d"]}
//       style={styles.container}
//     >
//       <View style={styles.content}>
        
//         {/* 1. LOGO */}
//         <Animated.View style={[
//           styles.logoWrapper, 
//           { opacity: logoFade, transform: [{ translateY: logoSlide }] }
//         ]}>
//           <Image
//             source={require("../../assets/splash-icon.png")}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//         </Animated.View>

//         {/* 2. APP NAME */}
//         <Animated.Text style={[
//           styles.appName, 
//           { opacity: nameFade, transform: [{ translateY: nameSlide }] }
//         ]}>
//           MediQueue
//         </Animated.Text>

//         {/* 3. CAPTION */}
//         <Animated.View style={[
//           styles.captionContainer, 
//           { opacity: captionFade, transform: [{ translateY: captionSlide }] }
//         ]}>
//             <View style={styles.line} />
//             <Text style={styles.caption}>Skip the waiting. Reach on time.</Text>
//             <View style={styles.line} />
//         </Animated.View>

//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   content: {
//     alignItems: "center",
//     width: '100%',
//   },

//   logo: {
//     width: 100,
//     height: 100,
//     borderRadius: 20,
//   },
//   appName: {
//     fontSize: 44,
//     fontWeight: "900",
//     color: "#FFFFFF",
//     letterSpacing: 2,
//     marginBottom: 12,
//     textShadowColor: 'rgba(0, 0, 0, 0.1)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 3,
//   },
//   captionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   caption: {
//     fontSize: 15,
//     color: "rgba(255, 255, 255, 0.9)",
//     fontWeight: "600",
//     marginHorizontal: 12,
//     letterSpacing: 0.5,
//   },
//   line: {
//     width: 25,
//     height: 1.5,
//     backgroundColor: "rgba(255, 255, 255, 0.4)",
//   }
// });  




































import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SplashScreen from "expo-splash-screen";

export default function SplashScreenComponent({ navigation }) {
  // Individual animation values for staggered effect
  const logoFade = useRef(new Animated.Value(0)).current;
  const logoSlide = useRef(new Animated.Value(20)).current;
  
  const nameFade = useRef(new Animated.Value(0)).current;
  const nameSlide = useRef(new Animated.Value(20)).current;
  
  const captionFade = useRef(new Animated.Value(0)).current;
  const captionSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    // Sequence: Logo -> (Wait 800ms) -> Name -> (Wait 800ms) -> Caption
    Animated.stagger(800, [
      // 1. Logo Animation
      Animated.parallel([
        Animated.timing(logoFade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(logoSlide, { toValue: 0, duration: 600, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true })
      ]),
      // 2. Name Animation
      Animated.parallel([
        Animated.timing(nameFade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(nameSlide, { toValue: 0, duration: 600, easing: Easing.out(Easing.quad), useNativeDriver: true })
      ]),
      // 3. Caption Animation
      Animated.parallel([
        Animated.timing(captionFade, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(captionSlide, { toValue: 0, duration: 600, easing: Easing.out(Easing.quad), useNativeDriver: true })
      ])
    ]).start();

    // Transition to main screen
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
      navigation.replace("RoleSelect");
    }, 4000); // Adjusted total time

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <LinearGradient
      colors={["#00bfae", "#004b6d"]}
      style={styles.container}
    >
      <View style={styles.content}>
        
        {/* 1. LOGO */}
        <Animated.View style={[
          styles.logoWrapper, 
          { opacity: logoFade, transform: [{ translateY: logoSlide }] }
        ]}>
          <Image
            source={require("../../assets/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        {/* 2. APP NAME */}
        <Animated.Text style={[
          styles.appName, 
          { opacity: nameFade, transform: [{ translateY: nameSlide }] }
        ]}>
          MediQueue
        </Animated.Text>

        {/* 3. CAPTION */}
        <Animated.View style={[
          styles.captionContainer, 
          { opacity: captionFade, transform: [{ translateY: captionSlide }] }
        ]}>
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
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: '100%',
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  appName: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  caption: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "600",
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  line: {
    width: 25,
    height: 1.5,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  }
});