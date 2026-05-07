import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import PendingHospitalsScreen from "../screens/admin/PendingHospitalsScreen";
import ApprovedHospitalsScreen from "../screens/admin/ApprovedHospitalsScreen";
import BookingMonitorScreen from "../screens/admin/BookingMonitorScreen";
import ComplaintsScreen from "../screens/admin/ComplaintsScreen";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.admin,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: "shield-checkmark-outline",
            Pending: "time-outline",
            Approved: "business-outline",
            Bookings: "list-outline",
            Complaints: "warning-outline",
          };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Tab.Screen name="Pending" component={PendingHospitalsScreen} />
      <Tab.Screen name="Approved" component={ApprovedHospitalsScreen} />
      <Tab.Screen name="Bookings" component={BookingMonitorScreen} />
      <Tab.Screen name="Complaints" component={ComplaintsScreen} />
    </Tab.Navigator>
  );
}