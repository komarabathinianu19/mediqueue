// import "react-native-gesture-handler";
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import RootNavigator from "./src/navigation/RootNavigator";
// import { HospitalProvider } from "./src/context/HospitalContext";
// import { QueueProvider } from "./src/context/QueueContext";
// import { FeedbackProvider } from "./src/context/FeedbackContext";
// import { ReportProvider } from "./src/context/ReportsContext";

// export default function App() {
//   return (
//     <ReportsProvider>
//     <FeedbackProvider>
//     <HospitalProvider>
//       <QueueProvider>
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//     </QueueProvider>
//     </HospitalProvider>
//     </FeedbackProvider>
//     </ReportsProvider>
//   );
// }  




















import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";

import { HospitalProvider } from "./src/context/HospitalContext";
import { QueueProvider } from "./src/context/QueueContext";
import { FeedbackProvider } from "./src/context/FeedbackContext";
import { ReportsProvider } from "./src/context/ReportsContext";

export default function App() {
  return (
    <ReportsProvider>
      <FeedbackProvider>
        <HospitalProvider>
          <QueueProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </QueueProvider>
        </HospitalProvider>
      </FeedbackProvider>
    </ReportsProvider>
  );
}