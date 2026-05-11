




// import React, { createContext, useContext, useMemo, useState } from "react";

// const QueueContext = createContext(null);

// const getTodayDate = () => {
//   return new Date().toISOString().split("T")[0];
// };

// export function QueueProvider({ children }) {
//   const [tokens, setTokens] = useState([]);

//   const waitingTokens = useMemo(
//     () => tokens.filter((t) => t.status === "waiting"),
//     [tokens]
//   );

//   const activeTokens = useMemo(
//     () => tokens.filter((t) => t.status === "waiting" || t.status === "serving"),
//     [tokens]
//   );

//   const currentServing = useMemo(
//     () => tokens.find((t) => t.status === "serving"),
//     [tokens]
//   );

//   const latestPatientToken = useMemo(() => {
//   const patientTokens = activeTokens.filter(
//     (token) => token.bookingSource === "patient"
//   );

//   return patientTokens.length > 0
//     ? patientTokens[patientTokens.length - 1]
//     : null;
// }, [activeTokens]);

//   const getQueueFilter = (data) => {
//     return (t) =>
//       t.hospitalId === data.hospitalId &&
//       t.department === data.department &&
//       t.doctor === data.doctor &&
//       t.date === data.date &&
//       t.slot === data.slot;
//   };

//   const bookToken = (data) => {
//     const appointmentDate = data.date || getTodayDate();
//     const selectedSlot = data.slot || "morning";

//     const sameSlotQueue = tokens.filter(
//       (t) =>
//         t.hospitalId === data.hospitalId &&
//         t.department === data.department &&
//         t.doctor === data.doctor &&
//         t.date === appointmentDate &&
//         t.slot === selectedSlot
//     );

//     const nextNumber =
//       sameSlotQueue.length > 0
//         ? Math.max(...sameSlotQueue.map((t) => t.tokenNumber)) + 1
//         : 1;

//     const slotPrefix = {
//       morning: "M",
//       afternoon: "A",
//       night: "N",
//     };

// const newToken = {
//   id: Date.now().toString(),
//   tokenNo: `${slotPrefix[selectedSlot] || "T"}-${nextNumber}`,
//   tokenNumber: nextNumber,

//   date: appointmentDate,
//   slot: selectedSlot,
//   slotLabel: data.slotLabel || selectedSlot,

//   bookingSource: data.bookingSource || "patient",
//   createdBy: data.createdBy || "patient",

//   status: "waiting",
//       appointmentStatus: "CONFIRMED",
//       paymentStatus: data.paymentStatus || "SUCCESS",
//       paymentId: data.paymentId || `PAY-${Date.now()}`,

//       createdAt: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),

//       ...data,
//       date: appointmentDate,
//       slot: selectedSlot,
//     };

//     setTokens((prev) => [...prev, newToken]);
//     return newToken;
//   };

//   const getTokensByDoctorSlot = ({
//     hospitalId,
//     department,
//     doctor,
//     date = getTodayDate(),
//     slot = "morning",
//   }) => {
//     return tokens
//       .filter(
//         (t) =>
//           t.hospitalId === hospitalId &&
//           t.department === department &&
//           t.doctor === doctor &&
//           t.date === date &&
//           t.slot === slot
//       )
//       .sort((a, b) => a.tokenNumber - b.tokenNumber);
//   };

//   const getQueueSummary = ({
//     hospitalId,
//     department,
//     doctor,
//     date = getTodayDate(),
//     slot = "morning",
//   }) => {
//     const queueTokens = getTokensByDoctorSlot({
//       hospitalId,
//       department,
//       doctor,
//       date,
//       slot,
//     });

//     const serving = queueTokens.find((t) => t.status === "serving");
//     const waiting = queueTokens.filter((t) => t.status === "waiting");
//     const completed = queueTokens.filter((t) => t.status === "completed");
//     const skipped = queueTokens.filter((t) => t.status === "skipped");

//     return {
//       totalBooked: queueTokens.length,
//       currentServing: serving || null,
//       currentServingNo: serving ? serving.tokenNo : "Not Started",
//       waitingCount: waiting.length,
//       completedCount: completed.length,
//       skippedCount: skipped.length,
//       nextToken: waiting.length > 0 ? waiting[0] : null,
//       tokens: queueTokens,
//     };
//   };

//   const getCurrentServingByDoctor = (
//     department,
//     doctor,
//     slot = "morning",
//     date = getTodayDate(),
//     hospitalId
//   ) => {
//     return tokens.find(
//       (t) =>
//         t.status === "serving" &&
//         t.department === department &&
//         t.doctor === doctor &&
//         t.slot === slot &&
//         t.date === date &&
//         (!hospitalId || t.hospitalId === hospitalId)
//     );
//   };

// const callNextPatient = (department, doctor, slot, date, hospitalId) => {
//   setTokens((prev) => {
//     const sorted = [...prev].sort((a, b) => {
//       const aNo =
//         a.tokenNumber ||
//         Number(String(a.tokenNo || "").replace(/\D/g, "")) ||
//         0;

//       const bNo =
//         b.tokenNumber ||
//         Number(String(b.tokenNo || "").replace(/\D/g, "")) ||
//         0;

//       return aNo - bNo;
//     });

//     const nextWaiting = sorted.find(
//       (token) =>
//         (!hospitalId || token.hospitalId === hospitalId) &&
//         token.department === department &&
//         token.doctor === doctor &&
//         token.slot === slot &&
//         token.date === date &&
//         token.status === "waiting"
//     );

//     if (!nextWaiting) return prev;

//     return prev.map((token) =>
//       token.id === nextWaiting.id
//         ? {
//             ...token,
//             status: "serving",
//             servingAt: new Date().toISOString(),
//           }
//         : token
//     );
//   });
// };




// const completeDoctorPatient = (department, doctor, slot, date, hospitalId) => {
//   setTokens((prev) =>
//     prev.map((token) => {
//       const isCurrentServing =
//         (!hospitalId || token.hospitalId === hospitalId) &&
//         token.department === department &&
//         token.doctor === doctor &&
//         token.slot === slot &&
//         token.date === date &&
//         token.status === "serving";

//       if (isCurrentServing) {
//         return {
//           ...token,
//           status: "completed",
//           completedAt: new Date().toISOString(),
//         };
//       }

//       return token;
//     })
//   );
// };
//   const skipDoctorPatient = (
//     department,
//     doctor,
//     slot = "morning",
//     date = getTodayDate(),
//     hospitalId
//   ) => {
//     setTokens((prev) =>
//       prev.map((t) =>
//         t.status === "serving" &&
//         t.department === department &&
//         t.doctor === doctor &&
//         t.slot === slot &&
//         t.date === date &&
//         (!hospitalId || t.hospitalId === hospitalId)
//           ? { ...t, status: "skipped" }
//           : t
//       )
//     );
//   };

//   const completeCurrentPatient = () => {
//     setTokens((prev) =>
//       prev.map((t) =>
//         t.status === "serving" ? { ...t, status: "completed" } : t
//       )
//     );
//   };

//   const skipCurrentPatient = () => {
//     setTokens((prev) =>
//       prev.map((t) =>
//         t.status === "serving" ? { ...t, status: "skipped" } : t
//       )
//     );
//   };

//   const value = {
//     tokens,
//     activeTokens,
//     waitingTokens,
//     currentServing,
//     latestPatientToken,

//     bookToken,
//     getTokensByDoctorSlot,
//     getQueueSummary,
//     getCurrentServingByDoctor,

//     callNextPatient,
//     completeDoctorPatient,
//     skipDoctorPatient,

//     completeCurrentPatient,
//     skipCurrentPatient,

//     getTodayDate,
//   };

//   return (
//     <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
//   );
// }

// export function useQueue() {
//   const context = useContext(QueueContext);

//   if (!context) {
//     throw new Error("useQueue must be used inside QueueProvider");
//   }

//   return context;
// }























// QueueContext.js
// All token operations now hit the real backend (MySQL).
// In-memory state is used as a cache / optimistic update layer.

import React, { createContext, useContext, useState, useCallback } from "react";
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

export function QueueProvider({ children }) {
  // Local cache of latest fetched tokens (so screens can read without extra calls)
  const [myActiveToken, setMyActiveToken]   = useState(null);   // patient's live token
  const [myTokenHistory, setMyTokenHistory] = useState([]);     // patient's past tokens
  const [queueCache, setQueueCache]         = useState({});     // key → token[]
  const [loading, setLoading]               = useState(false);

  // ── PATIENT: Book token ───────────────────────────────────────────────────
  const bookToken = useCallback(async (appointmentData) => {
    setLoading(true);
    try {
      const token = await apiBookToken(appointmentData);
      setMyActiveToken(token);  // immediately update hero card
      return token;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── PATIENT: Walk-in token (staff books for patient at counter) ───────────
  const bookWalkIn = useCallback(async (appointmentData) => {
    setLoading(true);
    try {
      return await bookWalkInToken(appointmentData);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── PATIENT: Fetch own active token (called on home screen load) ──────────
  const loadMyActiveToken = useCallback(async () => {
    try {
      const token = await fetchMyActiveToken();
      setMyActiveToken(token);
      return token;
    } catch (err) {
      console.error("loadMyActiveToken:", err.message);
      return null;
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

  // ── PUBLIC: Fetch live queue for a doctor slot ─────────────────────────────
  const loadActiveQueue = useCallback(async (hospitalId, department, doctor, slot, date) => {
    const key = `${hospitalId}|${department}|${doctor}|${slot}|${date || getTodayDate()}`;
    try {
      const queue = await fetchActiveQueue(hospitalId, department, doctor, slot, date);
      setQueueCache((prev) => ({ ...prev, [key]: queue }));
      return queue;
    } catch (err) {
      console.error("loadActiveQueue:", err.message);
      return queueCache[key] || [];
    }
  }, [queueCache]);

  // ── PUBLIC: Queue summary (stats for HospitalDetailsScreen) ───────────────
  const loadQueueSummary = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await fetchQueueSummary(hospitalId, department, doctor, slot, date);
    } catch (err) {
      console.error("loadQueueSummary:", err.message);
      return { waitingCount: 0, completedCount: 0, currentServingNo: "None", totalBooked: 0 };
    }
  }, []);

  // ── STAFF: Call next patient ───────────────────────────────────────────────
  const callNextPatient = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await apiCallNext(hospitalId, department, doctor, slot, date || getTodayDate());
    } catch (err) {
      throw err;
    }
  }, []);

  // ── STAFF: Complete current ────────────────────────────────────────────────
  const completeCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await apiComplete(hospitalId, department, doctor, slot, date || getTodayDate());
    } catch (err) {
      throw err;
    }
  }, []);

  // ── STAFF: Skip current ────────────────────────────────────────────────────
  const skipCurrent = useCallback(async (hospitalId, department, doctor, slot, date) => {
    try {
      return await apiSkip(hospitalId, department, doctor, slot, date || getTodayDate());
    } catch (err) {
      throw err;
    }
  }, []);

  // ── STAFF: Hospital day tokens ─────────────────────────────────────────────
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
