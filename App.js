import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { HospitalProvider } from "./src/context/HospitalContext";
import { QueueProvider } from "./src/context/QueueContext";
import { FeedbackProvider } from "./src/context/FeedbackContext";

export default function App() {
  return (
    <FeedbackProvider>
    <HospitalProvider>
      <QueueProvider>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    </QueueProvider>
    </HospitalProvider>
    </FeedbackProvider>
  );
}