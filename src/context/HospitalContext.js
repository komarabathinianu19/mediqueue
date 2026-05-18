




// // HospitalContext.js
// // Fetches approved hospitals + provides helpers for doctors and departments
// // Supports Staff Sessions, Profile Updates, and Feedback Reports

// import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
// import * as Api from "../services/apiService";

// const HospitalContext = createContext(null);

// export const DEPARTMENT_IMAGES = {
//   "General OPD": "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
//   Cardiology:    "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
//   Pediatrics:    "https://cdn-icons-png.flaticon.com/512/2966/2966535.png",
//   ENT:           "https://cdn-icons-png.flaticon.com/512/3209/3209072.png",
//   Ortho:         "https://cdn-icons-png.flaticon.com/512/2966/2966420.png",
//   Dermatology:   "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
//   Dental:        "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
//   Neurology:     "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
// };

// export const defaultDoctorTimings = {
//   morning: {
//     label: "Morning", enabled: true,
//     startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30,
//   },
//   afternoon: {
//     label: "Afternoon", enabled: true,
//     startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25,
//   },
//   night: {
//     label: "Night", enabled: true,
//     startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20,
//   },
// };

// export const parseTimings = (timingsJson) => {
//   if (!timingsJson) return defaultDoctorTimings;
//   if (typeof timingsJson === "object") return timingsJson;
//   try {
//     return JSON.parse(timingsJson);
//   } catch {
//     return defaultDoctorTimings;
//   }
// };

// export function HospitalProvider({ children }) {
//   const [hospitals, setHospitals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // ── STAFF & REPORTS STATE ──────────────────────────────────────────────────
//   const [staffHospitalData, setStaffHospitalData] = useState(null);
//   const [feedbacks, setFeedbacks] = useState([]);

//   // ── Patient Logic: Fetch approved hospitals ────────────────────────────────
//   const loadHospitals = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await Api.fetchApprovedHospitals();
//       setHospitals(data);
//     } catch (err) {
//       console.error("HospitalContext: loadHospitals failed:", err.message);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadHospitals();
//   }, [loadHospitals]);

//   // // ── Staff Session Logic ────────────────────────────────────────────────────
//   // const setStaffSession = useCallback(async (data) => {
//   //   // data contains { token, hospitalId, ... }
//   //   setStaffHospitalData(data);
    
//   //   // Once logged in, fetch live feedback for the reports screen
//   //   if (data?.hospitalId) {
//   //     try {
//   //       const feedbackList = await Api.fetchHospitalFeedback(data.hospitalId);
//   //       setFeedbacks(feedbackList || []);
//   //     } catch (err) {
//   //       console.error("Initial Feedback Load Error:", err);
//   //     }
//   //   }
//   // }, []);
 
//   // ── Staff Session Logic ────────────────────────────────────────────────────
// const setStaffSession = useCallback(async (loginData) => {
//   // loginData typically contains { token, hospitalId }
//   if (loginData?.hospitalId) {
//     setLoading(true);
//     try {
//       // 1. Fetch the full hospital profile
//       const hospitalProfile = await Api.fetchHospitalProfile(loginData.hospitalId);
      
//       // 2. Fetch doctors for this hospital and parse their timings
//       const rawDoctors = await Api.fetchDoctors(loginData.hospitalId);
//       const doctorList = (rawDoctors || []).map((d) => ({
//         ...d,
//         timings: parseTimings(d.timingsJson),
//       }));

//       // 3. Merge login data, full profile, and doctorList into state
//       setStaffHospitalData({ ...loginData, ...hospitalProfile, doctorList });

//       // 4. Fetch feedback for reports
//       const feedbackList = await Api.fetchHospitalFeedback(loginData.hospitalId);
//       setFeedbacks(feedbackList || []);
//     } catch (err) {
//       console.error("Error loading staff session data:", err);
//     } finally {
//       setLoading(false);
//     }
//   }
// }, []);

//   const clearStaffSession = useCallback(() => {
//     setStaffHospitalData(null);
//     setFeedbacks([]);
//   }, []);

//   // ── Staff Action: Update Hospital Profile ──────────────────────────────────
//   const updateHospitalProfile = useCallback(async (updates) => {
//     setLoading(true);
//     try {
//       let finalUpdates = { ...updates };

//       // Handle Image upload if image is a local path
//       if (updates.image && updates.image.startsWith('file://')) {
//         const uploadRes = await Api.uploadHospitalImage(updates.image);
//         finalUpdates.image = uploadRes.imageUrl;
//       }

//       const updatedProfile = await Api.updateHospitalProfile(finalUpdates);
      
//       // Update local session state with new data from MySQL
//       setStaffHospitalData((prev) => ({ ...prev, ...updatedProfile }));
//       return { success: true };
//     } catch (err) {
//       console.error("updateHospitalProfile failed:", err.message);
//       return { success: false, error: err.message };
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ── Staff Action: Refresh Reports ──────────────────────────────────────────
//   const refreshFeedbacks = useCallback(async () => {
//     if (!staffHospitalData?.hospitalId) return;
//     try {
//       const data = await Api.fetchHospitalFeedback(staffHospitalData.hospitalId);
//       setFeedbacks(data || []);
//     } catch (err) {
//       console.error("refreshFeedbacks failed:", err.message);
//     }
//   }, [staffHospitalData]); 


//   const refreshDoctors = useCallback(async (hospitalId) => {
//     try {
//       const rawDoctors = await Api.fetchDoctors(hospitalId);
//       const doctorList = (rawDoctors || []).map((d) => ({
//         ...d,
//         timings: parseTimings(d.timingsJson),
//       }));
//       setStaffHospitalData((prev) => ({ ...prev, doctorList }));
//       return doctorList;
//     } catch (err) {
//       console.error("refreshDoctors failed:", err.message);
//       return [];
//     }
//   }, []);

//   const updateDoctorTimings = useCallback(async (hospitalId, doctorId, timings) => {
//     try {
//       const response = await Api.updateDoctorTimings(doctorId, timings);
      
//       // Refresh doctorList so DoctorTimingsScreen and CreateTokenScreen see updated timings
//       const rawDoctors = await Api.fetchDoctors(hospitalId);
//       const doctorList = (rawDoctors || []).map((d) => ({
//         ...d,
//         timings: parseTimings(d.timingsJson),
//       }));
//       setStaffHospitalData((prev) => ({ ...prev, doctorList }));
      
//       return response;
//     } catch (err) {
//       console.error("updateDoctorTimings failed:", err.message);
//       throw err;
//     }
//   }, []);

//   // ── Data Helpers (Patients & Staff) ────────────────────────────────────────
//   const getDepartmentsByHospital = useCallback(async (hospitalId) => {
//     try {
//       return await Api.fetchDepartments(hospitalId);
//     } catch (err) {
//       console.error("getDepartmentsByHospital failed:", err.message);
//       return [];
//     }
//   }, []);

//   const getDoctorsByHospital = useCallback(async (hospitalId) => {
//     try {
//       const doctors = await Api.fetchDoctors(hospitalId);
//       return doctors.map((d) => ({
//         ...d,
//         timings: parseTimings(d.timingsJson),
//       }));
//     } catch (err) {
//       console.error("getDoctorsByHospital failed:", err.message);
//       return [];
//     }
//   }, []);

//   const getHospitalById = useCallback(
//     (hospitalId) =>
//       hospitals.find((h) => h.id === hospitalId || h.hospitalId === hospitalId),
//     [hospitals]
//   );

//   const getDepartmentImage = useCallback((departmentName) => {
//     return (
//       DEPARTMENT_IMAGES[departmentName] ||
//       "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
//     );
//   }, []);

//   const value = {
//     hospitals,
//     loading,
//     error,
//     loadHospitals,

//     // Staff state & actions
//     staffHospitalData,
//     feedbacks,
//     setStaffSession,
//     clearStaffSession,
//     updateHospitalProfile,
//     updateDoctorTimings,
//     refreshDoctors,
//     refreshFeedbacks,

//     // Data Helpers
//     getHospitalById,
//     getDoctorsByHospital,
//     getDepartmentsByHospital,
//     getDepartmentImage,

//     defaultDoctorTimings,
//     DEPARTMENT_IMAGES,
//     parseTimings,
//   };

//   return (
//     <HospitalContext.Provider value={value}>
//       {children}
//     </HospitalContext.Provider>
//   );
// }

// export function useHospital() {
//   const context = useContext(HospitalContext);
//   if (!context)
//     throw new Error("useHospital must be used inside HospitalProvider");
//   return context;
// } 
































// HospitalContext.js
// Fetches approved hospitals + provides helpers for doctors and departments
// Supports Staff Sessions, Profile Updates, and Feedback Reports

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as Api from "../services/apiService";

const HospitalContext = createContext(null);

export const DEPARTMENT_IMAGES = {
  "General OPD": "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
  Cardiology:    "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
  Pediatrics:    "https://cdn-icons-png.flaticon.com/512/2966/2966535.png",
  ENT:           "https://cdn-icons-png.flaticon.com/512/3209/3209072.png",
  Ortho:         "https://cdn-icons-png.flaticon.com/512/2966/2966420.png",
  Dermatology:   "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
  Dental:        "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
  Neurology:     "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
};

export const defaultDoctorTimings = {
  morning: {
    label: "Morning", enabled: true,
    startTime: "09:00 AM", endTime: "12:00 PM", maxPatients: 30,
  },
  afternoon: {
    label: "Afternoon", enabled: true,
    startTime: "01:00 PM", endTime: "04:00 PM", maxPatients: 25,
  },
  night: {
    label: "Night", enabled: true,
    startTime: "06:00 PM", endTime: "09:00 PM", maxPatients: 20,
  },
};

export const parseTimings = (timingsJson) => {
  if (!timingsJson) return defaultDoctorTimings;
  if (typeof timingsJson === "object") return timingsJson;
  try {
    return JSON.parse(timingsJson);
  } catch {
    return defaultDoctorTimings;
  }
};

export function HospitalProvider({ children }) {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── STAFF & REPORTS STATE ──────────────────────────────────────────────────
  const [staffHospitalData, setStaffHospitalData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  // ── Patient Logic: Fetch approved hospitals ────────────────────────────────
  const loadHospitals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await Api.fetchApprovedHospitals();
      setHospitals(data);
    } catch (err) {
      console.error("HospitalContext: loadHospitals failed:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHospitals();
  }, [loadHospitals]);

  // // ── Staff Session Logic ────────────────────────────────────────────────────
  // const setStaffSession = useCallback(async (data) => {
  //   // data contains { token, hospitalId, ... }
  //   setStaffHospitalData(data);
    
  //   // Once logged in, fetch live feedback for the reports screen
  //   if (data?.hospitalId) {
  //     try {
  //       const feedbackList = await Api.fetchHospitalFeedback(data.hospitalId);
  //       setFeedbacks(feedbackList || []);
  //     } catch (err) {
  //       console.error("Initial Feedback Load Error:", err);
  //     }
  //   }
  // }, []);
 
  // ── Staff Session Logic ────────────────────────────────────────────────────
const setStaffSession = useCallback(async (loginData) => {
  // loginData typically contains { token, hospitalId }
  if (loginData?.hospitalId) {
    setLoading(true);
    try {
      // 1. Fetch the full hospital profile
      const hospitalProfile = await Api.fetchHospitalProfile(loginData.hospitalId);
      
      // 2. Fetch doctors for this hospital and parse their timings
      const rawDoctors = await Api.fetchDoctors(loginData.hospitalId);
      const doctorList = (rawDoctors || []).map((d) => ({
        ...d,
        timings: parseTimings(d.timingsJson),
      }));

      // 3. Merge login data, full profile, and doctorList into state
      setStaffHospitalData({ ...loginData, ...hospitalProfile, doctorList });

      // 4. Fetch feedback for reports
      const feedbackList = await Api.fetchHospitalFeedback(loginData.hospitalId);
      setFeedbacks(feedbackList || []);
    } catch (err) {
      console.error("Error loading staff session data:", err);
    } finally {
      setLoading(false);
    }
  }
}, []);

  const clearStaffSession = useCallback(() => {
    setStaffHospitalData(null);
    setFeedbacks([]);
  }, []);

  // ── Staff Action: Update Hospital Profile ──────────────────────────────────
  const updateHospitalProfile = useCallback(async (updates) => {
    setLoading(true);
    try {
      let finalUpdates = { ...updates };

      // Handle Image upload if image is a local path
      if (updates.image && updates.image.startsWith('file://')) {
        const uploadRes = await Api.uploadHospitalImage(updates.image);
        finalUpdates.image = uploadRes.imageUrl;
      }

      const updatedProfile = await Api.updateHospitalProfile(finalUpdates);
      
      // Update local session state with new data from MySQL
      setStaffHospitalData((prev) => ({ ...prev, ...updatedProfile }));
      return { success: true };
    } catch (err) {
      console.error("updateHospitalProfile failed:", err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Staff Action: Refresh Reports ──────────────────────────────────────────
  const refreshFeedbacks = useCallback(async () => {
    if (!staffHospitalData?.hospitalId) return;
    try {
      const data = await Api.fetchHospitalFeedback(staffHospitalData.hospitalId);
      setFeedbacks(data || []);
    } catch (err) {
      console.error("refreshFeedbacks failed:", err.message);
    }
  }, [staffHospitalData]); 


  const refreshDoctors = useCallback(async (hospitalId) => {
    try {
      const rawDoctors = await Api.fetchDoctors(hospitalId);
      const doctorList = (rawDoctors || []).map((d) => ({
        ...d,
        timings: parseTimings(d.timingsJson),
      }));
      setStaffHospitalData((prev) => ({ ...prev, doctorList }));
      return doctorList;
    } catch (err) {
      console.error("refreshDoctors failed:", err.message);
      return [];
    }
  }, []);

  const updateDoctorTimings = useCallback(async (hospitalId, doctorId, timings) => {
    try {
      const response = await Api.updateDoctorTimings(doctorId, timings);
      
      // Refresh doctorList so DoctorTimingsScreen and CreateTokenScreen see updated timings
      const rawDoctors = await Api.fetchDoctors(hospitalId);
      const doctorList = (rawDoctors || []).map((d) => ({
        ...d,
        timings: parseTimings(d.timingsJson),
      }));
      setStaffHospitalData((prev) => ({ ...prev, doctorList }));
      
      return response;
    } catch (err) {
      console.error("updateDoctorTimings failed:", err.message);
      throw err;
    }
  }, []);

  // ── Data Helpers (Patients & Staff) ────────────────────────────────────────
  const getDepartmentsByHospital = useCallback(async (hospitalId) => {
    try {
      return await Api.fetchDepartments(hospitalId);
    } catch (err) {
      console.error("getDepartmentsByHospital failed:", err.message);
      return [];
    }
  }, []);

  const getDoctorsByHospital = useCallback(async (hospitalId) => {
    try {
      const doctors = await Api.fetchDoctors(hospitalId);
      return doctors.map((d) => ({
        ...d,
        timings: parseTimings(d.timingsJson),
      }));
    } catch (err) {
      console.error("getDoctorsByHospital failed:", err.message);
      return [];
    }
  }, []);

  const getHospitalById = useCallback(
    (hospitalId) =>
      hospitals.find((h) => h.id === hospitalId || h.hospitalId === hospitalId),
    [hospitals]
  );

  const getDepartmentImage = useCallback((departmentName) => {
    return (
      DEPARTMENT_IMAGES[departmentName] ||
      "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
    );
  }, []);

  const value = {
    hospitals,
    loading,
    error,
    loadHospitals,

    // Staff state & actions
    staffHospitalData,
    feedbacks,
    setStaffSession,
    clearStaffSession,
    updateHospitalProfile,
    updateDoctorTimings,
    refreshDoctors,
    refreshFeedbacks,

    // Data Helpers
    getHospitalById,
    getDoctorsByHospital,
    getDepartmentsByHospital,
    getDepartmentImage,

    defaultDoctorTimings,
    DEPARTMENT_IMAGES,
    parseTimings,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);
  if (!context)
    throw new Error("useHospital must be used inside HospitalProvider");
  return context;
}