


// import React, { createContext, useContext, useMemo, useState } from "react";

// const FeedbackContext = createContext(null);

// export function FeedbackProvider({ children }) {
//   const [patientFeedbacks, setPatientFeedbacks] = useState([]);

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






























import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitFeedback as apiSubmitFeedback, fetchHospitalFeedback } from "../services/apiService";

const FeedbackContext = createContext(null);

export function FeedbackProvider({ children }) {
  const [patientFeedbacks, setPatientFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Staff: load feedbacks for a specific hospital from the backend ─────────
  const refreshFeedbacks = useCallback(async () => {
    try {
      setLoading(true);
      const hospitalId = await AsyncStorage.getItem("hospitalId");
      if (!hospitalId) return;
      const data = await fetchHospitalFeedback(hospitalId);
      // Normalise: backend returns ratings as a plain object
      const normalised = Array.isArray(data)
        ? data.map((f) => ({
            ...f,
            ratings: f.ratings || {},
          }))
        : [];
      setPatientFeedbacks(normalised);
    } catch (err) {
      console.error("refreshFeedbacks:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Patient: submit feedback to backend and optimistically update local state
  const submitFeedback = useCallback(async (feedback) => {
    try {
      // feedback must contain: hospitalId, patientName, patientPhone, ratings
      const saved = await apiSubmitFeedback(feedback);
      // Optimistic update so staff reports reflect instantly in same session
      const newEntry = {
        id: saved?.id ?? Date.now().toString(),
        hospitalId: feedback.hospitalId,
        patientName: feedback.patientName,
        patientPhone: feedback.patientPhone,
        ratings: feedback.ratings,
        createdAt: new Date().toISOString(),
      };
      setPatientFeedbacks((prev) => [newEntry, ...prev]);
      return { success: true };
    } catch (err) {
      console.error("submitFeedback:", err.message);
      return { success: false, error: err.message };
    }
  }, []);

  const clearFeedbacks = useCallback(() => {
    setPatientFeedbacks([]);
  }, []);

  const value = useMemo(
    () => ({
      patientFeedbacks,
      loading,
      submitFeedback,
      refreshFeedbacks,
      clearFeedbacks,
    }),
    [patientFeedbacks, loading, submitFeedback, refreshFeedbacks, clearFeedbacks]
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