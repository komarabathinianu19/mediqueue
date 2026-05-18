import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

import StaffDashboardScreen from "../screens/staff/StaffDashboardScreen";
import QueueManagementScreen from "../screens/staff/QueueManagementScreen";
import CreateTokenScreen from "../screens/staff/CreateTokenScreen";
import StaffReportsScreen from "../screens/staff/StaffReportsScreen";
import StaffProfileScreen from "../screens/staff/StaffProfileScreen";
import DoctorTimingsScreen from "../screens/staff/DoctorTimingsScreen";

const Tab = createBottomTabNavigator();

export default function StaffTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.staff,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: "grid-outline",
            Queue: "people-outline",
            Tokens: "add-circle-outline",
            Feedback: "stats-chart-outline",
              Timings: "time-outline",
            Profile: "person-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={StaffDashboardScreen} />
      <Tab.Screen name="Queue" component={QueueManagementScreen} />
      <Tab.Screen name="Tokens" component={CreateTokenScreen} />
      <Tab.Screen name="Feedback" component={StaffReportsScreen} /> 
      <Tab.Screen name="Timings" component={DoctorTimingsScreen} />
      <Tab.Screen name="Profile" component={StaffProfileScreen} /> 

    </Tab.Navigator>
  );
} 











