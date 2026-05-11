


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