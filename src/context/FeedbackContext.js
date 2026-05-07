// import React, { createContext, useContext, useMemo, useState } from "react";

// const FeedbackContext = createContext(null);

// const DEFAULT_FEEDBACK = [
//   {
//     id: "demo-1",
//     ratings: {
//       patientSatisfaction: 4,
//       queueExperience: 4,
//       doctorResponse: 5,
//       staffBehaviour: 4,
//       cleanliness: 5,
//     },
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: "demo-2",
//     ratings: {
//       patientSatisfaction: 5,
//       queueExperience: 4,
//       doctorResponse: 5,
//       staffBehaviour: 4,
//       cleanliness: 4,
//     },
//     createdAt: new Date().toISOString(),
//   },
// ];

// export function FeedbackProvider({ children }) {
//   const [patientFeedbacks, setPatientFeedbacks] = useState(DEFAULT_FEEDBACK);

//   const submitFeedback = (feedback) => {
//     const newFeedback = {
//       id: Date.now().toString(),
//       ratings: feedback.ratings,
//       createdAt: new Date().toISOString(),
//     };

//     setPatientFeedbacks((prev) => [newFeedback, ...prev]);
//   };

//   const clearFeedbacks = () => {
//     setPatientFeedbacks([]);
//   };

//   const value = useMemo(
//     () => ({
//       patientFeedbacks,
//       submitFeedback,
//       clearFeedbacks,
//     }),
//     [patientFeedbacks]
//   );

//   return (
//     <FeedbackContext.Provider value={value}>
//       {children}
//     </FeedbackContext.Provider>
//   );
// }

// export function useFeedback() {
//   const context = useContext(FeedbackContext);

//   if (!context) {
//     throw new Error("useFeedback must be used inside FeedbackProvider");
//   }

//   return context;
// }  






















import React, { createContext, useContext, useMemo, useState } from "react";

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [patientFeedbacks, setPatientFeedbacks] = useState([]);

  const submitFeedback = (feedback) => {
    const newFeedback = {
      id: Date.now().toString(),
      ratings: feedback.ratings,
      createdAt: new Date().toISOString(),
    };

    setPatientFeedbacks((prev) => [newFeedback, ...prev]);
  };

  const clearFeedbacks = () => {
    setPatientFeedbacks([]);
  };

  const value = useMemo(
    () => ({
      patientFeedbacks,
      submitFeedback,
      clearFeedbacks,
    }),
    [patientFeedbacks]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error("useFeedback must be used inside FeedbackProvider");
  }

  return context;
}