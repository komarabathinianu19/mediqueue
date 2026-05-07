// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../constants/colors";

// export default function RoleSelectScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.logo}>MediQueue</Text>
//       <Text style={styles.tagline}>Skip the waiting. Reach on time.</Text>

//       <RoleCard
//         title="Patient App"
//         subtitle="Book token • Check live queue"
//         icon="person-outline"
//         colors={[COLORS.primary, COLORS.secondary]}
//         onPress={() => navigation.replace("PatientLogin")}
//       />

//       <RoleCard
//         title="Staff / Hospital App"
//         subtitle="Manage queue • Create tokens"
//         icon="medkit-outline"
//         colors={[COLORS.staff, "#14B8A6"]}
//         onPress={() => navigation.replace("StaffLogin")}
//       />

//       <RoleCard
//         title="Admin / Super Admin"
//         subtitle="Verify hospitals • Monitor platform"
//         icon="shield-checkmark-outline"
//         colors={[COLORS.admin, "#8B5CF6"]}
//         onPress={() => navigation.replace("AdminLogin")}
//       />
//     </View>
//   );
// }

// function RoleCard({ title, subtitle, icon, colors, onPress }) {
//   return (
//     <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
//       <LinearGradient colors={colors} style={styles.roleCard}>
//         <Ionicons name={icon} size={40} color="#fff" />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.roleTitle}>{title}</Text>
//           <Text style={styles.roleSub}>{subtitle}</Text>
//         </View>
//         <Ionicons name="chevron-forward" size={24} color="#fff" />
//       </LinearGradient>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 24,
//     justifyContent: "center",
//   },
//   logo: {
//     fontSize: 36,
//     fontWeight: "900",
//     color: COLORS.primary,
//     textAlign: "center",
//   },
//   tagline: {
//     fontSize: 15,
//     color: COLORS.muted,
//     textAlign: "center",
//     marginBottom: 40,
//     marginTop: 8,
//   },
//   roleCard: {
//     minHeight: 120,
//     borderRadius: 28,
//     padding: 22,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 16,
//   },
//   roleTitle: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },
//   roleSub: {
//     color: "rgba(255,255,255,0.9)",
//     marginTop: 6,
//     fontSize: 13,
//   },
// }); 


























// import React from "react";
// import { View, Text, StyleSheet, Pressable } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView, MotiText } from "moti";
// import * as Haptics from "expo-haptics";
// import { COLORS } from "../constants/colors";

// export default function RoleSelectScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       {/* Decorative Background Element */}
//       <View style={styles.circleDecor} />

//       <MotiView 
//         from={{ opacity: 0, translateY: -20 }}
//         animate={{ opacity: 1, translateY: 0 }}
//         transition={{ type: 'timing', duration: 800 }}
//         style={styles.header}
//       >
//         <Text style={styles.logo}>MediQueue</Text>
//         <Text style={styles.tagline}>Skip the waiting. Reach on time.</Text>
//       </MotiView>

//       <View style={styles.cardContainer}>
//         <RoleCard
//           index={1}
//           title="Patient Portal"
//           subtitle="Book tokens & track live queues"
//           icon="person"
//           colors={[COLORS.primary, "#4F46E5"]}
//           onPress={() => navigation.replace("PatientLogin")}
//         />

//         <RoleCard
//           index={2}
//           title="Hospital Staff"
//           subtitle="Manage flow & patient arrivals"
//           icon="medkit"
//           colors={["#0D9488", "#14B8A6"]}
//           onPress={() => navigation.replace("StaffLogin")}
//         />

//         <RoleCard
//           index={3}
//           title="System Admin"
//           subtitle="Verify entities & platform health"
//           icon="shield-checkmark"
//           colors={["#7C3AED", "#A855F7"]}
//           onPress={() => navigation.replace("AdminLogin")}
//         />
//       </View>
//     </View>
//   );
// }

// function RoleCard({ title, subtitle, icon, colors, onPress, index }) {
//   return (
//     <MotiView
//       from={{ opacity: 0, scale: 0.9, translateX: -20 }}
//       animate={{ opacity: 1, scale: 1, translateX: 0 }}
//       transition={{ 
//         type: 'spring', 
//         delay: index * 150, // Staggered entrance
//         damping: 15 
//       }}
//     >
//       <Pressable
//         onPressIn={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
//         onPress={onPress}
//         style={({ pressed }) => [
//           { transform: [{ scale: pressed ? 0.97 : 1 }] },
//           styles.pressable
//         ]}
//       >
//         <LinearGradient 
//             colors={colors} 
//             start={{ x: 0, y: 0 }} 
//             end={{ x: 1, y: 1 }} 
//             style={styles.roleCard}
//         >
//           <View style={styles.iconContainer}>
//             <Ionicons name={icon} size={32} color="#fff" />
//           </View>
          
//           <View style={{ flex: 1 }}>
//             <Text style={styles.roleTitle}>{title}</Text>
//             <Text style={styles.roleSub}>{subtitle}</Text>
//           </View>

//           <MotiView
//             animate={{ translateX: [0, 5, 0] }}
//             transition={{ loop: true, duration: 2000, type: 'timing' }}
//           >
//             <Ionicons name="arrow-forward-circle" size={28} color="rgba(255,255,255,0.8)" />
//           </MotiView>
//         </LinearGradient>
//       </Pressable>
//     </MotiView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8FAFC', // Modern off-white/slate
//     padding: 24,
//     justifyContent: "center",
//   },
//   circleDecor: {
//     position: 'absolute',
//     top: -100,
//     right: -100,
//     width: 300,
//     height: 300,
//     borderRadius: 150,
//     backgroundColor: COLORS.primary + '10', // 10% opacity
//   },
//   header: {
//     marginBottom: 50,
//     alignItems: 'center',
//   },
//   logo: {
//     fontSize: 42,
//     fontWeight: "900",
//     color: '#1E293B',
//     letterSpacing: -1,
//   },
//   tagline: {
//     fontSize: 16,
//     color: '#64748B',
//     marginTop: 8,
//     fontWeight: '500',
//   },
//   cardContainer: {
//     gap: 20,
//   },
//   pressable: {
//     borderRadius: 24,
//     // Shadow for iOS
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     // Elevation for Android
//     elevation: 8,
//   },
//   roleCard: {
//     minHeight: 110,
//     borderRadius: 24,
//     padding: 20,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 16,
//     overflow: 'hidden',
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 18,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   roleTitle: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "800",
//   },
//   roleSub: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontSize: 14,
//     fontWeight: '500',
//   },
// });



















import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, MotiText } from "moti";
import * as Haptics from "expo-haptics";
import { COLORS } from "../constants/colors"; // Make sure this path is correct

const ROLES = [
  {
    title: "Patient App",
    subtitle: "Book tokens & check live queue",
    icon: "person-outline",
    colors: [COLORS.primary, COLORS.secondary],
    route: "PatientLogin",
  },
  {
    title: "Hospital Staff",
    subtitle: "Manage queue & create tokens",
    icon: "medkit-outline",
    colors: [COLORS.staff, "#14B8A6"],
    route: "StaffLogin",
  },
  {
    title: "System Admin",
    subtitle: "Verify hospitals & monitor platform",
    icon: "shield-checkmark-outline",
    colors: [COLORS.admin, "#8B5CF6"],
    route: "AdminLogin",
  },
];

export default function RoleSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Animated Title */}
        <MotiText
          from={{ opacity: 0, translateY: -15 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800 }}
          style={styles.logo}
        >
          MediQueue
        </MotiText>
        
        {/* Animated Tagline */}
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 800, delay: 300 }}
          style={styles.tagline}
        >
          Select your destination portal
        </MotiText>
      </View>

      <View style={styles.cardContainer}>
        {ROLES.map((item, index) => (
          <RoleCard
            key={index}
            index={index}
            item={item}
            onPress={() => {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              navigation.replace(item.route);
            }}
          />
        ))}
      </View>
    </View>
  );
}

function RoleCard({ item, onPress, index }) {
  return (
    <MotiView
      // The Core Sequential Effect: delay increases with index
      from={{ opacity: 0, scale: 0.8, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ 
        type: "timing", 
        duration: 500, 
        delay: index * 200 // Staggered delay (0ms, 200ms, 400ms)
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.98 : 1 }] },
          styles.pressable,
        ]}
      >
        <LinearGradient
          colors={item.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.roleCard}
        >
          <View style={styles.iconBackground}>
            <Ionicons name={item.icon} size={32} color="#fff" />
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.roleTitle}>{item.title}</Text>
            <Text style={styles.roleSub}>{item.subtitle}</Text>
          </View>

          {/* Constant, Subtle Shimmer Animation */}
          <MotiView
            animate={{ translateX: [0, 5, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ loop: true, duration: 1500, type: "timing" }}
          >
            <Ionicons
              name="chevron-forward-circle"
              size={26}
              color="rgba(255,255,255,0.7)"
            />
          </MotiView>
        </LinearGradient>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#F8FAFC",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 40,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: -1.5,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.muted || "#64748B",
    marginTop: 6,
    fontWeight: "500",
  },
  cardContainer: {
    gap: 18,
  },
  pressable: {
    borderRadius: 24,
    // Add depth to the card
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  roleCard: {
    minHeight: 110,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    overflow: 'hidden', // Required for gradient overflow on older Android
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Translucent icon box
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  roleTitle: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "800",
  },
  roleSub: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    fontSize: 13,
    fontWeight: "500",
  },
});