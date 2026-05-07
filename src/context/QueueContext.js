







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

//   const callNextPatient = (
//     department,
//     doctor,
//     slot = "morning",
//     date = getTodayDate(),
//     hospitalId
//   ) => {
//     setTokens((prev) => {
//       const current = prev.find(
//         (t) =>
//           t.status === "serving" &&
//           t.department === department &&
//           t.doctor === doctor &&
//           t.slot === slot &&
//           t.date === date &&
//           (!hospitalId || t.hospitalId === hospitalId)
//       );

//       const next = prev
//         .filter(
//           (t) =>
//             t.status === "waiting" &&
//             t.department === department &&
//             t.doctor === doctor &&
//             t.slot === slot &&
//             t.date === date &&
//             (!hospitalId || t.hospitalId === hospitalId)
//         )
//         .sort((a, b) => a.tokenNumber - b.tokenNumber)[0];

//       return prev.map((t) => {
//         if (current && t.id === current.id) {
//           return { ...t, status: "completed" };
//         }

//         if (next && t.id === next.id) {
//           return { ...t, status: "serving" };
//         }

//         return t;
//       });
//     });
//   };

//   const completeDoctorPatient = (
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
//           ? { ...t, status: "completed" }
//           : t
//       )
//     );
//   };

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































import React, { createContext, useContext, useMemo, useState } from "react";

const QueueContext = createContext(null);

const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export function QueueProvider({ children }) {
  const [tokens, setTokens] = useState([]);

  const waitingTokens = useMemo(
    () => tokens.filter((t) => t.status === "waiting"),
    [tokens]
  );

  const activeTokens = useMemo(
    () => tokens.filter((t) => t.status === "waiting" || t.status === "serving"),
    [tokens]
  );

  const currentServing = useMemo(
    () => tokens.find((t) => t.status === "serving"),
    [tokens]
  );

  const latestPatientToken = useMemo(() => {
  const patientTokens = activeTokens.filter(
    (token) => token.bookingSource === "patient"
  );

  return patientTokens.length > 0
    ? patientTokens[patientTokens.length - 1]
    : null;
}, [activeTokens]);

  const getQueueFilter = (data) => {
    return (t) =>
      t.hospitalId === data.hospitalId &&
      t.department === data.department &&
      t.doctor === data.doctor &&
      t.date === data.date &&
      t.slot === data.slot;
  };

  const bookToken = (data) => {
    const appointmentDate = data.date || getTodayDate();
    const selectedSlot = data.slot || "morning";

    const sameSlotQueue = tokens.filter(
      (t) =>
        t.hospitalId === data.hospitalId &&
        t.department === data.department &&
        t.doctor === data.doctor &&
        t.date === appointmentDate &&
        t.slot === selectedSlot
    );

    const nextNumber =
      sameSlotQueue.length > 0
        ? Math.max(...sameSlotQueue.map((t) => t.tokenNumber)) + 1
        : 1;

    const slotPrefix = {
      morning: "M",
      afternoon: "A",
      night: "N",
    };

const newToken = {
  id: Date.now().toString(),
  tokenNo: `${slotPrefix[selectedSlot] || "T"}-${nextNumber}`,
  tokenNumber: nextNumber,

  date: appointmentDate,
  slot: selectedSlot,
  slotLabel: data.slotLabel || selectedSlot,

  bookingSource: data.bookingSource || "patient",
  createdBy: data.createdBy || "patient",

  status: "waiting",
      appointmentStatus: "CONFIRMED",
      paymentStatus: data.paymentStatus || "SUCCESS",
      paymentId: data.paymentId || `PAY-${Date.now()}`,

      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      ...data,
      date: appointmentDate,
      slot: selectedSlot,
    };

    setTokens((prev) => [...prev, newToken]);
    return newToken;
  };

  const getTokensByDoctorSlot = ({
    hospitalId,
    department,
    doctor,
    date = getTodayDate(),
    slot = "morning",
  }) => {
    return tokens
      .filter(
        (t) =>
          t.hospitalId === hospitalId &&
          t.department === department &&
          t.doctor === doctor &&
          t.date === date &&
          t.slot === slot
      )
      .sort((a, b) => a.tokenNumber - b.tokenNumber);
  };

  const getQueueSummary = ({
    hospitalId,
    department,
    doctor,
    date = getTodayDate(),
    slot = "morning",
  }) => {
    const queueTokens = getTokensByDoctorSlot({
      hospitalId,
      department,
      doctor,
      date,
      slot,
    });

    const serving = queueTokens.find((t) => t.status === "serving");
    const waiting = queueTokens.filter((t) => t.status === "waiting");
    const completed = queueTokens.filter((t) => t.status === "completed");
    const skipped = queueTokens.filter((t) => t.status === "skipped");

    return {
      totalBooked: queueTokens.length,
      currentServing: serving || null,
      currentServingNo: serving ? serving.tokenNo : "Not Started",
      waitingCount: waiting.length,
      completedCount: completed.length,
      skippedCount: skipped.length,
      nextToken: waiting.length > 0 ? waiting[0] : null,
      tokens: queueTokens,
    };
  };

  const getCurrentServingByDoctor = (
    department,
    doctor,
    slot = "morning",
    date = getTodayDate(),
    hospitalId
  ) => {
    return tokens.find(
      (t) =>
        t.status === "serving" &&
        t.department === department &&
        t.doctor === doctor &&
        t.slot === slot &&
        t.date === date &&
        (!hospitalId || t.hospitalId === hospitalId)
    );
  };

const callNextPatient = (department, doctor, slot, date, hospitalId) => {
  setTokens((prev) => {
    const sorted = [...prev].sort((a, b) => {
      const aNo =
        a.tokenNumber ||
        Number(String(a.tokenNo || "").replace(/\D/g, "")) ||
        0;

      const bNo =
        b.tokenNumber ||
        Number(String(b.tokenNo || "").replace(/\D/g, "")) ||
        0;

      return aNo - bNo;
    });

    const nextWaiting = sorted.find(
      (token) =>
        (!hospitalId || token.hospitalId === hospitalId) &&
        token.department === department &&
        token.doctor === doctor &&
        token.slot === slot &&
        token.date === date &&
        token.status === "waiting"
    );

    if (!nextWaiting) return prev;

    return prev.map((token) =>
      token.id === nextWaiting.id
        ? {
            ...token,
            status: "serving",
            servingAt: new Date().toISOString(),
          }
        : token
    );
  });
};




const completeDoctorPatient = (department, doctor, slot, date, hospitalId) => {
  setTokens((prev) =>
    prev.map((token) => {
      const isCurrentServing =
        (!hospitalId || token.hospitalId === hospitalId) &&
        token.department === department &&
        token.doctor === doctor &&
        token.slot === slot &&
        token.date === date &&
        token.status === "serving";

      if (isCurrentServing) {
        return {
          ...token,
          status: "completed",
          completedAt: new Date().toISOString(),
        };
      }

      return token;
    })
  );
};
  const skipDoctorPatient = (
    department,
    doctor,
    slot = "morning",
    date = getTodayDate(),
    hospitalId
  ) => {
    setTokens((prev) =>
      prev.map((t) =>
        t.status === "serving" &&
        t.department === department &&
        t.doctor === doctor &&
        t.slot === slot &&
        t.date === date &&
        (!hospitalId || t.hospitalId === hospitalId)
          ? { ...t, status: "skipped" }
          : t
      )
    );
  };

  const completeCurrentPatient = () => {
    setTokens((prev) =>
      prev.map((t) =>
        t.status === "serving" ? { ...t, status: "completed" } : t
      )
    );
  };

  const skipCurrentPatient = () => {
    setTokens((prev) =>
      prev.map((t) =>
        t.status === "serving" ? { ...t, status: "skipped" } : t
      )
    );
  };

  const value = {
    tokens,
    activeTokens,
    waitingTokens,
    currentServing,
    latestPatientToken,

    bookToken,
    getTokensByDoctorSlot,
    getQueueSummary,
    getCurrentServingByDoctor,

    callNextPatient,
    completeDoctorPatient,
    skipDoctorPatient,

    completeCurrentPatient,
    skipCurrentPatient,

    getTodayDate,
  };

  return (
    <QueueContext.Provider value={value}>{children}</QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);

  if (!context) {
    throw new Error("useQueue must be used inside QueueProvider");
  }

  return context;
}

