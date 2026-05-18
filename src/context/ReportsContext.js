// import React, { createContext, useContext, useMemo, useState } from "react";

// const ReportContext = createContext(null);

// export function ReportProvider({ children }) {
//   const [reports, setReports] = useState([]);

//   const addReport = (report) => {
//     const newReport = {
//       id: Date.now().toString(),
//       reportName: report.reportName,
//       reportType: report.reportType,
//       hospitalName: report.hospitalName,
//       doctorName: report.doctorName,
//       department: report.department,
//       reportDate: report.reportDate,
//       notes: report.notes,
//       fileUri: report.fileUri,
//       createdAt: new Date().toISOString(),
//     };

//     setReports((prev) => [newReport, ...prev]);
//   };

//   const deleteReport = (reportId) => {
//     setReports((prev) => prev.filter((item) => item.id !== reportId));
//   };

//   const value = useMemo(
//     () => ({
//       reports,
//       addReport,
//       deleteReport,
//     }),
//     [reports]
//   );

//   return (
//     <ReportContext.Provider value={value}>
//       {children}
//     </ReportContext.Provider>
//   );
// }

// export function useReports() {
//   const context = useContext(ReportContext);

//   if (!context) {
//     throw new Error("useReports must be used inside ReportProvider");
//   }

//   return context;
// }  





























// src/context/ReportsContext.js
// Manages patient medical reports — fetches & saves to backend DB per patient

import React, { createContext, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../services/apiService";

const ReportsContext = createContext(null);

export function ReportsProvider({ children }) {
  const [reports, setReports]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  // ── Helper: get auth token ──────────────────────────────────────────────────
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Not authenticated. Please log in again.");
    return token;
  };

  // ── FETCH all reports for the logged-in patient ─────────────────────────────
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const token = await getToken();

      const res = await fetch(`${BASE_URL}/patient/reports`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load reports.");

      // Backend returns array of report objects
      setReports(Array.isArray(data) ? data : data.reports || []);
    } catch (err) {
      console.log("ReportsContext fetchReports error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── ADD a new report ────────────────────────────────────────────────────────
  // reportData = { reportName, reportType, hospitalName, reportDate, doctorName,
  //                department, notes, fileUri (base64 or upload URL) }
  const addReport = async (reportData) => {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/patient/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to save report.");

    // Add the newly created report (returned by backend) to local state
    setReports((prev) => [data, ...prev]);
    return data;
  };

  // ── DELETE a report ─────────────────────────────────────────────────────────
  const deleteReport = async (reportId) => {
    const token = await getToken();

    const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || "Failed to delete report.");
    }

    // Remove from local state
    setReports((prev) => prev.filter((r) => r.id !== reportId));
  };

  return (
    <ReportsContext.Provider
      value={{ reports, loading, error, fetchReports, addReport, deleteReport }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const ctx = useContext(ReportsContext);
  if (!ctx) throw new Error("useReports must be used inside <ReportsProvider>");
  return ctx;
}
