


// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import RoleSelectScreen from "../screens/RoleSelectScreen";

// import PatientLoginScreen from "../screens/auth/PatientLoginScreen";
// import StaffLoginScreen from "../screens/auth/StaffLoginScreen";
// import AdminLoginScreen from "../screens/auth/AdminLoginScreen";
// import HospitalRegisterScreen from "../screens/auth/HospitalRegisterScreen";

// import PatientTabs from "./PatientTabs";
// import StaffTabs from "./StaffTabs";
// import AdminTabs from "./AdminTabs";

// import HospitalDetailsScreen from "../screens/patient/HospitalDetailsScreen";
// import BookTokenScreen from "../screens/patient/BookTokenScreen";
// import TokenSuccessScreen from "../screens/patient/TokenSuccessScreen";
// import LiveQueueScreen from "../screens/patient/LiveQueueScreen";
// import DoctorLiveQueueScreen from "../screens/patient/DoctorLiveQueueScreen";
// import PaymentScreen from "../screens/patient/PaymentScreen";
// import PatientFeedbackScreen from "../screens/patient/PatientFeedbackScreen";

// import PatientReportsScreen from "../screens/patient/PatientReportsScreen";
// import AddPatientReportScreen from "../screens/patient/AddPatientReportScreen";
// import PatientReportDetailsScreen from "../screens/patient/PatientReportDetailsScreen";

// import HospitalVerificationScreen from "../screens/admin/HospitalVerificationScreen";
// import DoctorQueueDetailsScreen from "../screens/staff/DoctorQueueDetailsScreen";
// import SplashScreenComponent from "../screens/SplashScreen";

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
//       <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />

//       <Stack.Screen name="PatientLogin" component={PatientLoginScreen} />
//       <Stack.Screen name="StaffLogin" component={StaffLoginScreen} />
//       <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
//       <Stack.Screen name="HospitalRegister" component={HospitalRegisterScreen} />

//       <Stack.Screen name="PatientTabs" component={PatientTabs} />
//       <Stack.Screen name="StaffTabs" component={StaffTabs} />
//       <Stack.Screen name="AdminTabs" component={AdminTabs} />

//       <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} />
//       <Stack.Screen name="BookToken" component={BookTokenScreen} />
//       <Stack.Screen name="TokenSuccess" component={TokenSuccessScreen} />
//       <Stack.Screen name="LiveQueue" component={LiveQueueScreen} />
//       <Stack.Screen name="DoctorLiveQueue" component={DoctorLiveQueueScreen} />
//       <Stack.Screen name="Payment" component={PaymentScreen} />
//       <Stack.Screen name="PatientFeedback" component={PatientFeedbackScreen} />

//       <Stack.Screen name="PatientReports" component={PatientReportsScreen} />
//       <Stack.Screen name="AddPatientReport" component={AddPatientReportScreen} />
//       <Stack.Screen name="PatientReportDetails" component={PatientReportDetailsScreen} />

//       <Stack.Screen name="HospitalVerification" component={HospitalVerificationScreen} />
//       <Stack.Screen name="DoctorQueueDetails" component={DoctorQueueDetailsScreen} />
//     </Stack.Navigator>
//   );
// }






























import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ReportsProvider } from "../context/ReportsContext";

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
import DoctorLiveQueueScreen from "../screens/patient/DoctorLiveQueueScreen";
import PaymentScreen from "../screens/patient/PaymentScreen";
import PatientFeedbackScreen from "../screens/patient/PatientFeedbackScreen";

import PatientReportsScreen from "../screens/patient/PatientReportsScreen";
import AddPatientReportScreen from "../screens/patient/AddPatientReportScreen";
import PatientReportDetailsScreen from "../screens/patient/PatientReportDetailsScreen";

import HospitalVerificationScreen from "../screens/admin/HospitalVerificationScreen";
import DoctorQueueDetailsScreen from "../screens/staff/DoctorQueueDetailsScreen";
import PendingHospitalsScreen from "../screens/admin/PendingHospitalsScreen";
import SplashScreenComponent from "../screens/SplashScreen";
import { QueueProvider } from "../context/QueueContext";
import { FeedbackProvider } from "../context/FeedbackContext";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <QueueProvider>
      <FeedbackProvider>
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
      <Stack.Screen name="DoctorLiveQueue" component={DoctorLiveQueueScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="PatientFeedback" component={PatientFeedbackScreen} />

      <Stack.Screen name="PatientReports" component={PatientReportsScreen} />
      <Stack.Screen name="AddPatientReport" component={AddPatientReportScreen} />
      <Stack.Screen name="PatientReportDetails" component={PatientReportDetailsScreen} /> 

      <Stack.Screen name="HospitalVerification" component={HospitalVerificationScreen} />
      <Stack.Screen name="DoctorQueueDetails" component={DoctorQueueDetailsScreen} />
      <Stack.Screen name="PendingHospitals" component={PendingHospitalsScreen} />
    </Stack.Navigator>
      </FeedbackProvider>
    </QueueProvider>
  );
}