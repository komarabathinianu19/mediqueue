


import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';

import PatientHomeScreen from "../screens/patient/PatientHomeScreen";
import HospitalListScreen from "../screens/patient/HospitalListScreen";
import LiveQueueScreen from "../screens/patient/LiveQueueScreen";
import VisitsScreen from "../screens/patient/VisitsScreen";
import PatientProfileScreen from "../screens/patient/PatientProfileScreen";

const Tab = createBottomTabNavigator();

export default function PatientTabs({ route, navigation }) {
  const { triggerFeedbackForm, patientName, hospitalName } = route.params || {};

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  // Show feedback form if the flag is passed
  useEffect(() => {
    if (triggerFeedbackForm) {
      setIsFeedbackVisible(true);  // Show feedback form
      navigation.navigate("Visits");  // Navigate to VisitsScreen where the feedback form will be shown
    }
  }, [triggerFeedbackForm, patientName, hospitalName, navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: COLORS.border,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home-outline",
            Hospitals: "business-outline",
            Token: "ticket-outline",
            Visits: "calendar-outline",
            Profile: "person-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={PatientHomeScreen} />
      <Tab.Screen name="Hospitals" component={HospitalListScreen} />
      <Tab.Screen name="Token" component={LiveQueueScreen} />
      <Tab.Screen name="Visits" component={VisitsScreen} />
      <Tab.Screen name="Profile" component={PatientProfileScreen} />
    </Tab.Navigator>
  );
}