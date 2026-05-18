



 
// // QueueContext.js
// // All token operations now hit the real backend (MySQL).
// // In-memory state is used as a cache / optimistic update layer.
 
// import React, { createContext, useContext, useState, useCallback } from "react";
// import {
//   bookToken as apiBookToken,
//   fetchMyActiveToken,
//   fetchMyTokens,
//   fetchActiveQueue,
//   fetchQueueSummary,
//   callNextPatient as apiCallNext,
//   completeCurrentPatient as apiComplete,
//   skipCurrentPatient as apiSkip,
//   bookWalkInToken,
//   fetchHospitalDayTokens,
// } from "../services/apiService";
 
// const QueueContext = createContext(null);
 
// export const getTodayDate = () => new Date().toISOString().split("T")[0];
 
// export function QueueProvider({ children }) {
//   // Local cache of latest fetched tokens (so screens can read without extra calls)
//   const [myActiveToken, setMyActiveToken]   = useState(null);   // patient's live token
//   const [myTokenHistory, setMyTokenHistory] = useState([]);     // patient's past tokens
//   const [queueCache, setQueueCache]         = useState({});     // key → token[]
//   const [loading, setLoading]               = useState(false);
 
//   // ── PATIENT: Book token ───────────────────────────────────────────────────
//   const bookToken = useCallback(async (appointmentData) => {
//     setLoading(true);
//     try {
//       const token = await apiBookToken(appointmentData);
//       setMyActiveToken(token);  // immediately update hero card
//       return token;
//     } finally {
//       setLoading(false);
//     }
//   }, []);
 
//   // ── PATIENT: Walk-in token (staff books for patient at counter) ───────────
//   const bookWalkIn = useCallback(async (appointmentData) => {
//     setLoading(true);
//     try {
//       return await bookWalkInToken(appointmentData);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
 
//   // ── PATIENT: Fetch own active token (called on home screen load) ──────────
//   const loadMyActiveToken = useCallback(async () => {
//     try {
//       const token = await fetchMyActiveToken();
//       setMyActiveToken(token);
//       return token;
//     } catch (err) {
//       console.error("loadMyActiveToken:", err.message);
//       return null;
//     }
//   }, []);
 
//   // ── PATIENT: Fetch token history ──────────────────────────────────────────
//   const loadMyTokens = useCallback(async () => {
//     try {
//       const tokens = await fetchMyTokens();
//       setMyTokenHistory(tokens);
//       return tokens;
//     } catch (err) {
//       console.error("loadMyTokens:", err.message);
//       return [];
//     }
//   }, []);
 
//   // ── PUBLIC: Fetch live queue for a doctor slot ─────────────────────────────
//   // NOTE: deps=[] — we use functional setState so queueCache is NOT in deps.
//   // This prevents an infinite loop: cache update → new fn ref → re-fetch → loop.
//   const loadActiveQueue = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     const key = `${hospitalId}|${department}|${doctor}|${slot}|${date || getTodayDate()}`;
//     try {
//       const queue = await fetchActiveQueue(hospitalId, department, doctor, slot, date);
//       setQueueCache((prev) => ({ ...prev, [key]: queue }));
//       return queue;
//     } catch (err) {
//       console.error("loadActiveQueue:", err.message);
//       // Read from cache via functional form to avoid stale closure
//       return new Promise((resolve) =>
//         setQueueCache((prev) => { resolve(prev[key] || []); return prev; })
//       );
//     }
//   }, []);
 
//   // ── PUBLIC: Queue summary (stats for HospitalDetailsScreen) ───────────────
//   const loadQueueSummary = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await fetchQueueSummary(hospitalId, department, doctor, slot, date);
//     } catch (err) {
//       console.error("loadQueueSummary:", err.message);
//       return { waitingCount: 0, completedCount: 0, currentServingNo: "None", totalBooked: 0 };
//     }
//   }, []);
 
//   // ── STAFF: Call next patient ───────────────────────────────────────────────
//   const callNextPatient = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await apiCallNext(hospitalId, department, doctor, slot, date || getTodayDate());
//     } catch (err) {
//       throw err;
//     }
//   }, []);
 
//   // ── STAFF: Complete current ────────────────────────────────────────────────
//   const completeCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await apiComplete(hospitalId, department, doctor, slot, date || getTodayDate());
//     } catch (err) {
//       throw err;
//     }
//   }, []);
 
//   // ── STAFF: Skip current ────────────────────────────────────────────────────
//   const skipCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await apiSkip(hospitalId, department, doctor, slot, date || getTodayDate());
//     } catch (err) {
//       throw err;
//     }
//   }, []);
 
//   // ── STAFF: Hospital day tokens ─────────────────────────────────────────────
//   const loadHospitalDayTokens = useCallback(async (hospitalId, date) => {
//     try {
//       return await fetchHospitalDayTokens(hospitalId, date);
//     } catch (err) {
//       console.error("loadHospitalDayTokens:", err.message);
//       return [];
//     }
//   }, []);
 
//   const value = {
//     // State
//     myActiveToken,
//     myTokenHistory,
//     queueCache,
//     loading,
 
//     // Patient actions
//     bookToken,
//     bookWalkIn,
//     loadMyActiveToken,
//     loadMyTokens,
 
//     // Public queue reads
//     loadActiveQueue,
//     loadQueueSummary,
 
//     // Staff actions
//     callNextPatient,
//     completeCurrent,
//     skipCurrent,
//     loadHospitalDayTokens,
 
//     getTodayDate,
//   };
 
//   return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
// }
 
// export function useQueue() {
//   const context = useContext(QueueContext);
//   if (!context) throw new Error("useQueue must be used inside QueueProvider");
//   return context;
// }


































// // QueueContext.js
// // All token operations now hit the real backend (MySQL).
// // In-memory state is used as a cache / optimistic update layer.
// // Global auto-polling: myActiveToken refreshes every 10s when any screen is mounted,
// // so PatientHomeScreen and LiveQueueScreen always stay in sync without per-screen timers.

// import React, {
//   createContext, useContext, useState,
//   useCallback, useEffect, useRef,
// } from "react";
// import {
//   bookToken as apiBookToken,
//   fetchMyActiveToken,
//   fetchMyTokens,
//   fetchActiveQueue,
//   fetchQueueSummary,
//   callNextPatient as apiCallNext,
//   completeCurrentPatient as apiComplete,
//   skipCurrentPatient as apiSkip,
//   bookWalkInToken,
//   fetchHospitalDayTokens,
// } from "../services/apiService";

// const QueueContext = createContext(null);

// export const getTodayDate = () => new Date().toISOString().split("T")[0];

// // How often (ms) to re-fetch the active token in the background.
// // 10 s gives near-real-time feel without hammering the backend.
// const ACTIVE_TOKEN_POLL_MS = 10000;

// export function QueueProvider({ children }) {
//   const [myActiveToken, setMyActiveToken]   = useState(null);
//   const [myTokenHistory, setMyTokenHistory] = useState([]);
//   const [queueCache, setQueueCache]         = useState({});
//   const [loading, setLoading]               = useState(false);

//   // ── PATIENT: Fetch own active token ──────────────────────────────────────
//   const loadMyActiveToken = useCallback(async () => {
//     try {
//       const token = await fetchMyActiveToken();
//       setMyActiveToken(token);
//       return token;
//     } catch (err) {
//       console.error("loadMyActiveToken:", err.message);
//       return null;
//     }
//   }, []);

//   // ── Global background poll ────────────────────────────────────────────────
//   // Runs as long as the app is alive (provider is mounted).
//   // Both PatientHomeScreen (reads myActiveToken) and LiveQueueScreen
//   // benefit automatically — no per-screen interval needed.
//   const loadMyActiveTokenRef = useRef(loadMyActiveToken);
//   useEffect(() => {
//     loadMyActiveTokenRef.current = loadMyActiveToken;
//   });

//   useEffect(() => {
//     // Initial fetch immediately on app start
//     loadMyActiveTokenRef.current();

//     const intervalId = setInterval(() => {
//       loadMyActiveTokenRef.current();
//     }, ACTIVE_TOKEN_POLL_MS);

//     return () => clearInterval(intervalId);
//   }, []); // runs once on mount, cleans up on unmount

//   // ── PATIENT: Book token ───────────────────────────────────────────────────
//   const bookToken = useCallback(async (appointmentData) => {
//     setLoading(true);
//     try {
//       const token = await apiBookToken(appointmentData);
//       setMyActiveToken(token); // immediately reflect on hero card
//       return token;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ── PATIENT: Walk-in token ────────────────────────────────────────────────
//   const bookWalkIn = useCallback(async (appointmentData) => {
//     setLoading(true);
//     try {
//       return await bookWalkInToken(appointmentData);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ── PATIENT: Fetch token history ──────────────────────────────────────────
//   const loadMyTokens = useCallback(async () => {
//     try {
//       const tokens = await fetchMyTokens();
//       setMyTokenHistory(tokens);
//       return tokens;
//     } catch (err) {
//       console.error("loadMyTokens:", err.message);
//       return [];
//     }
//   }, []);

//   // ── PUBLIC: Fetch live queue for a doctor slot ────────────────────────────
//   const loadActiveQueue = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     const key = `${hospitalId}|${department}|${doctor}|${slot}|${date || getTodayDate()}`;
//     try {
//       const queue = await fetchActiveQueue(hospitalId, department, doctor, slot, date);
//       setQueueCache((prev) => ({ ...prev, [key]: queue }));
//       return queue;
//     } catch (err) {
//       console.error("loadActiveQueue:", err.message);
//       return new Promise((resolve) =>
//         setQueueCache((prev) => { resolve(prev[key] || []); return prev; })
//       );
//     }
//   }, []);

//   // ── PUBLIC: Queue summary ─────────────────────────────────────────────────
//   const loadQueueSummary = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await fetchQueueSummary(hospitalId, department, doctor, slot, date);
//     } catch (err) {
//       console.error("loadQueueSummary:", err.message);
//       return { waitingCount: 0, completedCount: 0, currentServingNo: "None", totalBooked: 0 };
//     }
//   }, []);

//   // ── STAFF: Call next patient ──────────────────────────────────────────────
//   const callNextPatient = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await apiCallNext(hospitalId, department, doctor, slot, date || getTodayDate());
//     } catch (err) {
//       throw err;
//     }
//   }, []);

//   // ── STAFF: Complete current ───────────────────────────────────────────────
//   const completeCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await apiComplete(hospitalId, department, doctor, slot, date || getTodayDate());
//     } catch (err) {
//       throw err;
//     }
//   }, []);

//   // ── STAFF: Skip current ───────────────────────────────────────────────────
//   const skipCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
//     try {
//       return await apiSkip(hospitalId, department, doctor, slot, date || getTodayDate());
//     } catch (err) {
//       throw err;
//     }
//   }, []);

//   // ── STAFF: Hospital day tokens ────────────────────────────────────────────
//   const loadHospitalDayTokens = useCallback(async (hospitalId, date) => {
//     try {
//       return await fetchHospitalDayTokens(hospitalId, date);
//     } catch (err) {
//       console.error("loadHospitalDayTokens:", err.message);
//       return [];
//     }
//   }, []);

//   const value = {
//     // State
//     myActiveToken,
//     myTokenHistory,
//     queueCache,
//     loading,

//     // Patient actions
//     bookToken,
//     bookWalkIn,
//     loadMyActiveToken,
//     loadMyTokens,

//     // Public queue reads
//     loadActiveQueue,
//     loadQueueSummary,

//     // Staff actions
//     callNextPatient,
//     completeCurrent,
//     skipCurrent,
//     loadHospitalDayTokens,

//     getTodayDate,
//   };

//   return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
// }

// export function useQueue() {
//   const context = useContext(QueueContext);
//   if (!context) throw new Error("useQueue must be used inside QueueProvider");
//   return context;
// }  



































import React, {
  createContext, useContext, useState,
  useCallback, useEffect, useRef,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  bookToken as apiBookToken,
  fetchMyActiveToken,
  fetchMyTokens,
  fetchActiveQueue,
  fetchQueueSummary,
  callNextPatient as apiCallNext,
  completeCurrentPatient as apiComplete,
  skipCurrentPatient as apiSkip,
  bookWalkInToken,
  fetchHospitalDayTokens,
} from "../services/apiService";

const QueueContext = createContext(null);

export const getTodayDate = () => new Date().toISOString().split("T")[0];

// How often (ms) to re-fetch the active token in the background.
const ACTIVE_TOKEN_POLL_MS = 3000;

// Decode JWT payload without a library
function decodeJwtUserId(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    // Spring sets subject = userId (Long as string)
    return decoded.sub || null;
  } catch {
    return null;
  }
}

export function QueueProvider({ children }) {
  const [myActiveToken, setMyActiveToken]   = useState(null);
  const [myTokenHistory, setMyTokenHistory] = useState([]);
  const [queueCache, setQueueCache]         = useState({});
  const [loading, setLoading]               = useState(false);

  // Track which user's data is currently loaded
  const currentUserIdRef = useRef(null);
  const pollIntervalRef  = useRef(null);

  // ── PATIENT: Fetch own active token ──────────────────────────────────────
  const loadMyActiveToken = useCallback(async () => {
    try {
      // Only fetch if a patient JWT is stored
      const jwt = await AsyncStorage.getItem("token");
      if (!jwt) return null;

      const token = await fetchMyActiveToken();
      setMyActiveToken(token);
      return token;
    } catch (err) {
      console.error("loadMyActiveToken:", err.message);
      return null;
    }
  }, []);

  // ── START polling for a specific user ─────────────────────────────────────
  const startPolling = useCallback(() => {
    // Clear any existing interval first
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
    }
    // Fetch immediately for this user
    loadMyActiveToken();
    // Then poll every 10s
    pollIntervalRef.current = setInterval(() => {
      loadMyActiveToken();
    }, ACTIVE_TOKEN_POLL_MS);
  }, [loadMyActiveToken]);

  // ── STOP polling (on logout) ──────────────────────────────────────────────
  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  }, []);

  // ── Called on login: switch to new user's context ─────────────────────────
  const onUserLogin = useCallback(async (jwt) => {
    const userId = decodeJwtUserId(jwt);

    // Clear previous user's state immediately
    setMyActiveToken(null);
    setMyTokenHistory([]);
    setQueueCache({});
    currentUserIdRef.current = userId;

    // Start fresh poll for this user
    startPolling();
  }, [startPolling]);

  // ── Called on logout: clear everything ───────────────────────────────────
  const clearActiveToken = useCallback(() => {
    stopPolling();
    setMyActiveToken(null);
    setMyTokenHistory([]);
    setQueueCache({});
    currentUserIdRef.current = null;
  }, [stopPolling]);

  // ── On app start: check if patient JWT already exists (re-open app) ───────
  useEffect(() => {
    const checkExistingSession = async () => {
      const jwt = await AsyncStorage.getItem("token");
      if (jwt) {
        const userId = decodeJwtUserId(jwt);
        currentUserIdRef.current = userId;
        startPolling();
      }
      // No JWT = not logged in, don't poll
    };
    checkExistingSession();

    return () => stopPolling(); // cleanup on unmount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── PATIENT: Book token ───────────────────────────────────────────────────
  const bookToken = useCallback(async (appointmentData) => {
    setLoading(true);
    try {
      const token = await apiBookToken(appointmentData);
      setMyActiveToken(token);
      return token;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── PATIENT: Walk-in token ────────────────────────────────────────────────
  const bookWalkIn = useCallback(async (appointmentData) => {
    setLoading(true);
    try {
      return await bookWalkInToken(appointmentData);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── PATIENT: Fetch token history ──────────────────────────────────────────
  const loadMyTokens = useCallback(async () => {
    try {
      const tokens = await fetchMyTokens();
      setMyTokenHistory(tokens);
      return tokens;
    } catch (err) {
      console.error("loadMyTokens:", err.message);
      return [];
    }
  }, []);

  // ── PUBLIC: Fetch live queue for a doctor slot ────────────────────────────
  const loadActiveQueue = useCallback(async (hospitalId, department, doctor, slot, date) => {
    const key = `${hospitalId}|${department}|${doctor}|${slot}|${date || getTodayDate()}`;
    try {
      const queue = await fetchActiveQueue(hospitalId, department, doctor, slot, date);
      setQueueCache((prev) => ({ ...prev, [key]: queue }));
      return queue;
    } catch (err) {
      console.error("loadActiveQueue:", err.message);
      return new Promise((resolve) =>
        setQueueCache((prev) => { resolve(prev[key] || []); return prev; })
      );
    }
  }, []);

  // ── PUBLIC: Queue summary ─────────────────────────────────────────────────
  const loadQueueSummary = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await fetchQueueSummary(hospitalId, department, doctor, slot, date);
    } catch (err) {
      console.error("loadQueueSummary:", err.message);
      return { waitingCount: 0, completedCount: 0, currentServingNo: "None", totalBooked: 0 };
    }
  }, []);

  // ── STAFF: Call next patient ──────────────────────────────────────────────
  const callNextPatient = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await apiCallNext(hospitalId, department, doctor, slot, date || getTodayDate());
    } catch (err) {
      throw err;
    }
  }, []);

  // ── STAFF: Complete current ───────────────────────────────────────────────
  const completeCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await apiComplete(hospitalId, department, doctor, slot, date || getTodayDate());
    } catch (err) {
      throw err;
    }
  }, []);

  // ── STAFF: Skip current ───────────────────────────────────────────────────
  const skipCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await apiSkip(hospitalId, department, doctor, slot, date || getTodayDate());
    } catch (err) {
      throw err;
    }
  }, []);

  // ── STAFF: Hospital day tokens ────────────────────────────────────────────
  const loadHospitalDayTokens = useCallback(async (hospitalId, date) => {
    try {
      return await fetchHospitalDayTokens(hospitalId, date);
    } catch (err) {
      console.error("loadHospitalDayTokens:", err.message);
      return [];
    }
  }, []);

  const value = {
    // State
    myActiveToken,
    myTokenHistory,
    queueCache,
    loading,

    // Auth hooks (call these on login/logout)
    onUserLogin,
    clearActiveToken,

    // Patient actions
    bookToken,
    bookWalkIn,
    loadMyActiveToken,
    loadMyTokens,

    // Public queue reads
    loadActiveQueue,
    loadQueueSummary,

    // Staff actions
    callNextPatient,
    completeCurrent,
    skipCurrent,
    loadHospitalDayTokens,

    getTodayDate,
  };

  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
}

export function useQueue() {
  const context = useContext(QueueContext);
  if (!context) throw new Error("useQueue must be used inside QueueProvider");
  return context;
}
