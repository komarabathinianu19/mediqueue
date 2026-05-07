

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RoleSelectScreen from "../screens/RoleSelectScreen";

import PatientLoginScreen from "../screens/auth/PatientLoginScreen";
import StaffLoginScreen from "../screens/auth/StaffLoginScreen";
import AdminLoginScreen from "../screens/auth/AdminLoginScreen";
import HospitalRegisterScreen from "../screens/auth/HospitalRegisterScreen";

import PatientTabs from "./PatientTabs";
import StaffTabs from "./StaffTabs";
import AdminTabs from "./AdminTabs";

import HospitalDetailsScreen from "../screens/patient/HospitalDetailsScreen";
import BookTokenScreen from "../screens/patient/BookTokenScreen";
import TokenSuccessScreen from "../screens/patient/TokenSuccessScreen";
import LiveQueueScreen from "../screens/patient/LiveQueueScreen";
import HospitalVerificationScreen from "../screens/admin/HospitalVerificationScreen";
import DoctorQueueDetailsScreen from "../screens/staff/DoctorQueueDetailsScreen";
import DoctorLiveQueueScreen from "../screens/patient/DoctorLiveQueueScreen";
import PaymentScreen from "../screens/patient/PaymentScreen";
import SplashScreenComponent from "../screens/SplashScreen";
import PatientFeedbackScreen from "../screens/patient/PatientFeedbackScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />

      <Stack.Screen name="PatientLogin" component={PatientLoginScreen} />
      <Stack.Screen name="StaffLogin" component={StaffLoginScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="HospitalRegister" component={HospitalRegisterScreen} />

      <Stack.Screen name="PatientTabs" component={PatientTabs} />
      <Stack.Screen name="StaffTabs" component={StaffTabs} />
      <Stack.Screen name="AdminTabs" component={AdminTabs} />

      <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} />
      <Stack.Screen name="BookToken" component={BookTokenScreen} />
      <Stack.Screen name="TokenSuccess" component={TokenSuccessScreen} />
      <Stack.Screen name="LiveQueue" component={LiveQueueScreen} />
      <Stack.Screen name="HospitalVerification" component={HospitalVerificationScreen} />
      <Stack.Screen name="DoctorQueueDetails" component={DoctorQueueDetailsScreen} />
      <Stack.Screen name="DoctorLiveQueue" component={DoctorLiveQueueScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} /> 

      <Stack.Screen name="PatientFeedback" component={PatientFeedbackScreen} />
    </Stack.Navigator>
  );
}   
























