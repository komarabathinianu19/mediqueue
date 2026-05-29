// Central API service for MediQueue — Patient, Staff, Admin

import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://16.112.236.123:8080/api"; // ← Your backend IP

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const getToken = async () => AsyncStorage.getItem("token");

const authHeaders = async () => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ✅ ADDED: Public headers helper (no auth token needed)
const getPublicHeaders = () => ({
  "Content-Type": "application/json",
});

// const handleRes = async (res) => {
//   const text = await res.text();
//   try {
//     const data = JSON.parse(text);
//     if (!res.ok) {
//       console.log("SERVER ERROR DATA:", data);
//       throw new Error(data.message || `HTTP ${res.status}`);
//     }
//     return data;
//   } catch (e) {
//     console.log("RAW SERVER RESPONSE:", text);
//     throw new Error("Server error. Check console for details.");
//   }
// };  


const handleRes = async (res) => {
  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch (e) {
    // response wasn't JSON at all
    throw new Error("Server error. Please try again.");
  }
  if (!res.ok) {
    // ✅ Always throw the real backend message (e.g. "Incorrect password.")
    throw new Error(data?.message || `Error ${res.status}`);
  }
  return data;
};

// ─── PATIENT AUTH ──────────────────────────────────────────────────────────────

export const loginUser = async (phone, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  return handleRes(res);
};

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleRes(res);
};

export const resetUserPassword = async (phone, code, newPassword) => {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ phone, code, newPassword }),
  });
  return handleRes(res);
};

export const sendBackendOtp = async (phone) => {
  const res = await fetch(`${BASE_URL}/auth/otp/send`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ phone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send OTP");
  return data;
};

export const fetchMyProfile = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patients/me`, { headers });
  return handleRes(res);
};

export const updateMyProfile = async (updates) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patients/me`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  });
  return handleRes(res);
};

// ─── PATIENT VISITS (tokens booked by the logged-in patient) ──────────────────

export const fetchMyTokens = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
  return handleRes(res);
};

export const fetchMyActiveToken = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
  return handleRes(res);
};

// ─── HOSPITAL AUTH (Staff) ─────────────────────────────────────────────────────

export const loginHospitalStaff = async (hospitalId, phone, password) => {
  const res = await fetch(`${BASE_URL}/hospitals/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hospitalId, phone, password }),
  });
  return handleRes(res);
};

export const registerHospital = async (payload) => {
  const res = await fetch(`${BASE_URL}/hospitals/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleRes(res);
};

export const checkHospitalPhoneRegistered = async (phone) => {
  const res = await fetch(
    `${BASE_URL}/hospitals/check-phone?phone=${encodeURIComponent(phone)}`,
    { headers: getPublicHeaders() }
  );
  const data = await res.json();
  return data;
};

export const sendHospitalBackendOtp = async (phone) => {
  const res = await fetch(`${BASE_URL}/hospitals/otp/send`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ phone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send OTP");
  return data;
};

export const resetHospitalPassword = async (phone, code, newPassword) => {
  const res = await fetch(`${BASE_URL}/hospitals/reset-password`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ phone, code, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Reset failed");
  return data;
};

export const fetchMyHospitalDetails = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
  return handleRes(res);
};

export const fetchHospitalDetails = async (token) => {
  const res = await fetch(`${BASE_URL}/hospitals/details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleRes(res);
};

export const updateHospitalProfile = async (updates) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/profile`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  });
  return handleRes(res);
};

export const uploadHospitalImage = async (imageUri) => {
  const token = await getToken();
  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    name: "hospital_profile.jpg",
    type: "image/jpeg",
  });
  const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return handleRes(res);
};

// ─── HOSPITALS — Public (patients browse) ─────────────────────────────────────

export const fetchApprovedHospitals = async () => {
  const res = await fetch(`${BASE_URL}/hospitals/approved`);
  return handleRes(res);
};

export const fetchHospitalById = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
  return handleRes(res);
};

export const fetchHospitalProfile = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
  return handleRes(res);
};

// ─── HOSPITALS — Admin ─────────────────────────────────────────────────────────

export const fetchAllHospitals = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/all`, { headers });
  return handleRes(res);
};

export const fetchPendingHospitals = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/pending`, { headers });
  return handleRes(res);
};

export const fetchApprovedHospitalsCount = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/approved`, { headers });
  const data = await handleRes(res);
  return Array.isArray(data) ? data.length : 0;
};

export const approveHospital = async (hospitalId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
    method: "PUT",
    headers,
  });
  return handleRes(res);
};

export const rejectHospital = async (hospitalId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
    method: "PUT",
    headers,
  });
  return handleRes(res);
};

export const fetchAdminStats = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
  return handleRes(res);
};

// ─── DEPARTMENTS ───────────────────────────────────────────────────────────────

export const fetchDepartments = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/departments/hospital/${hospitalId}`);
  return handleRes(res);
};

export const addDepartment = async (hospitalId, name) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/departments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, name }),
  });
  return handleRes(res);
};

export const deleteDepartment = async (departmentId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
    method: "DELETE",
    headers,
  });
  return handleRes(res);
};

// ─── DOCTORS ────────────────────────────────────────────────────────────────────

export const fetchDoctors = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`);
  return handleRes(res);
};

export const fetchDoctorsByDepartment = async (hospitalId, department) => {
  const res = await fetch(
    `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}`
  );
  return handleRes(res);
};

export const addDoctor = async (doctorData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors`, {
    method: "POST",
    headers,
    body: JSON.stringify(doctorData),
  });
  return handleRes(res);
};

export const updateDoctor = async (doctorId, doctorData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(doctorData),
  });
  return handleRes(res);
};

export const deleteDoctor = async (doctorId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
    method: "DELETE",
    headers,
  });
  return handleRes(res);
};

export const updateDoctorTimings = async (doctorId, timings) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
    method: "PUT",
    headers,
    body: JSON.stringify(timings),
  });
  return handleRes(res);
};

// ─── TOKENS — Patient Booking ──────────────────────────────────────────────────

export const bookToken = async (appointmentData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/book`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });
  return handleRes(res);
};

// ─── TOKENS — Queue (public read) ─────────────────────────────────────────────

export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
  const params = new URLSearchParams({ hospitalId, department, doctor, slot });
  if (date) params.append("date", date);
  const res = await fetch(`${BASE_URL}/tokens/queue?${params}`);
  return handleRes(res);
};

export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
  const params = new URLSearchParams({ hospitalId, department, doctor, slot });
  if (date) params.append("date", date);
  const res = await fetch(`${BASE_URL}/tokens/summary?${params}`);
  return handleRes(res);
};

// ─── TOKENS — Staff Queue Management ──────────────────────────────────────────

export const bookWalkInToken = async (appointmentData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/walkin`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });
  return handleRes(res);
};

export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/next`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  return handleRes(res);
};

export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/complete`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  return handleRes(res);
};

export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/skip`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  return handleRes(res);
};

export const fetchHospitalDayTokens = async (hospitalId, date) => {
  const headers = await authHeaders();
  const params = date ? `?date=${date}` : "";
  const res = await fetch(`${BASE_URL}/tokens/hospital/${hospitalId}${params}`, { headers });
  return handleRes(res);
};

// ─── FEEDBACK ─────────────────────────────────────────────────────────────────

export const fetchHospitalFeedback = async (hospitalId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/feedback/hospital/${hospitalId}`, { headers });
  return handleRes(res);
};

export const submitFeedback = async (feedbackData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/feedback/submit`, {
    method: "POST",
    headers,
    body: JSON.stringify(feedbackData),
  });
  return handleRes(res);
};

export const fetchMySubmittedTokenIds = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/feedback/my-submitted-token-ids`, { headers });
  return handleRes(res);
};

// ─── PATIENT REPORTS ───────────────────────────────────────────────────────────

export const fetchMyReports = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports`, { headers });
  return handleRes(res);
};

export const addReport = async (reportData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports`, {
    method: "POST",
    headers,
    body: JSON.stringify(reportData),
  });
  return handleRes(res);
};

export const deleteReport = async (reportId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
    method: "DELETE",
    headers,
  });
  return handleRes(res);
};

export const fetchReportById = async (reportId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
    headers,
  });
  return handleRes(res);
};

export const checkPhoneRegistered = async (phone) => {
  // Normalize: strip +91 before sending (backend expects plain 10-digit)
  const normalized = phone.trim().startsWith("+91")
    ? phone.trim().substring(3)
    : phone.trim();

  const res = await fetch(
    `${BASE_URL}/auth/check-phone?phone=${encodeURIComponent(normalized)}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Phone number is not registered.");
  return data;
};

// ─── SESSION MANAGEMENT (Logout helpers for all roles) ─────────────────────────

export const logoutPatient = async () => {
  await AsyncStorage.removeItem("token");
};

export const logoutStaff = async () => {
  await AsyncStorage.multiRemove([
    "token",
    "hospitalId",
    "hospitalName",
    "hospitalEmail",
    "hospitalPhone",
    "hospitalAddress",
    "hospitalCity",
    "hospitalType",
    "hospitalImageUrl",
    "hospitalStatus",
  ]);
};

export const logoutAdmin = async () => {
  await AsyncStorage.multiRemove(["adminToken", "userRole"]);
};

// ─── ADMIN AUTH ────────────────────────────────────────────────────────────────

/**
 * POST /api/admin/login
 * Verifies email + password against MySQL admins table
 */
export const adminLogin = async (email, password) => {
  const res = await fetch(`${BASE_URL}/admin/login`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ email, password }),
  });
  return handleRes(res);
};

/**
 * POST /api/admin/reset-password
 * Validates security answer + saves new hashed password to MySQL
 */
export const adminResetPassword = async (email, securityAnswer, newPassword) => {
  const res = await fetch(`${BASE_URL}/admin/reset-password`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ email, securityAnswer, newPassword }),
  });
  return handleRes(res);
};
