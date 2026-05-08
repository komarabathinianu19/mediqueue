import React, { createContext, useContext, useMemo, useState } from "react";

const ReportContext = createContext(null);

export function ReportProvider({ children }) {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    const newReport = {
      id: Date.now().toString(),
      reportName: report.reportName,
      reportType: report.reportType,
      hospitalName: report.hospitalName,
      doctorName: report.doctorName,
      department: report.department,
      reportDate: report.reportDate,
      notes: report.notes,
      fileUri: report.fileUri,
      createdAt: new Date().toISOString(),
    };

    setReports((prev) => [newReport, ...prev]);
  };

  const deleteReport = (reportId) => {
    setReports((prev) => prev.filter((item) => item.id !== reportId));
  };

  const value = useMemo(
    () => ({
      reports,
      addReport,
      deleteReport,
    }),
    [reports]
  );

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);

  if (!context) {
    throw new Error("useReports must be used inside ReportProvider");
  }

  return context;
}