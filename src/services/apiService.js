


// // src/services/apiService.js
// // Central API service for MediQueue — Patient, Staff, Admin

// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const BASE_URL = "http://192.168.0.3:8080/api"; // ← Your backend IP

// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// const getToken = async () => AsyncStorage.getItem("token");

// const authHeaders = async () => {
//   const token = await getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

// // const handleRes = async (res) => {
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
// //   return data;
// // };
 

// // Inside apiService.js, update handleRes:
// const handleRes = async (res) => {
//   const text = await res.text(); // Read as text first to avoid JSON errors
//   try {
//     const data = JSON.parse(text);
//     if (!res.ok) {
//        console.log("SERVER ERROR DATA:", data); // Check your terminal/log
//        throw new Error(data.message || `HTTP ${res.status}`);
//     }
//     return data;
//   } catch (e) {
//     console.log("RAW SERVER RESPONSE:", text); // This will show the Java stack trace
//     throw new Error("Server error. Check console for details.");
//   }
// };
// // ─── PATIENT AUTH ──────────────────────────────────────────────────────────────

// export const loginUser = async (phone, password) => {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, password }),
//   });
//   return handleRes(res);
// };

// export const registerUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return handleRes(res);
// };

// // ─── PATIENT PROFILE ──────────────────────────────────────────────────────────

// export const fetchMyProfile = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, { headers });
//   return handleRes(res);
// };

// export const updateMyProfile = async (updates) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   return handleRes(res);
// };

// // ─── PATIENT VISITS (tokens booked by the logged-in patient) ──────────────────

// export const fetchMyTokens = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
//   return handleRes(res);
// };

// export const fetchMyActiveToken = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
//   return handleRes(res);
// };

// // ─── HOSPITAL AUTH (Staff) ─────────────────────────────────────────────────────

// export const loginHospitalStaff = async (hospitalId, email, password) => {
//   const res = await fetch(`${BASE_URL}/hospitals/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ hospitalId, email, password }),
//   });
//   return handleRes(res);
// };

// export const registerHospital = async (payload) => {
//   const res = await fetch(`${BASE_URL}/hospitals/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return handleRes(res);
// };

// // ─── HOSPITAL PROFILE (Staff) ──────────────────────────────────────────────────

// // Fetches the hospital that belongs to the JWT token (staff session)
// export const fetchMyHospitalDetails = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
//   return handleRes(res);
// };

// export const fetchHospitalDetails = async (token) => {
//   const res = await fetch(`${BASE_URL}/hospitals/details`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return handleRes(res);
// };

// export const updateHospitalProfile = async (updates) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/profile`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   return handleRes(res);
// };

// export const uploadHospitalImage = async (imageUri) => {
//   const token = await getToken();
//   const formData = new FormData();
//   formData.append("file", {
//     uri: imageUri,
//     name: "hospital_profile.jpg",
//     type: "image/jpeg",
//   });
//   const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });
//   return handleRes(res);
// };

// // ─── HOSPITALS — Public (patients browse) ─────────────────────────────────────

// export const fetchApprovedHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/approved`);
//   return handleRes(res);
// };

// export const fetchHospitalById = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   return handleRes(res);
// };

// // Alias used by HospitalContext staff session — fetches full hospital profile by ID
// export const fetchHospitalProfile = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   return handleRes(res);
// };

// // ─── HOSPITALS — Admin ─────────────────────────────────────────────────────────

// export const fetchAllHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/all`, { headers });
//   return handleRes(res);
// };

// export const fetchPendingHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/pending`, { headers });
//   return handleRes(res);
// };

// export const fetchApprovedHospitalsCount = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/approved`, { headers });
//   const data = await handleRes(res);
//   return Array.isArray(data) ? data.length : 0;
// };

// export const approveHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
//     method: "PUT",
//     headers,
//   });
//   return handleRes(res);
// };

// export const rejectHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
//     method: "PUT",
//     headers,
//   });
//   return handleRes(res);
// };

// // Admin stats
// export const fetchAdminStats = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
//   return handleRes(res);
// };

// // ─── DEPARTMENTS ───────────────────────────────────────────────────────────────

// // Fetch all departments for a hospital (patients + staff)
// export const fetchDepartments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/departments/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// // Staff: Add a department to their hospital
// export const addDepartment = async (hospitalId, name) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/departments`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, name }),
//   });
//   return handleRes(res);
// };

// // Staff: Delete a department
// export const deleteDepartment = async (departmentId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// // ─── DOCTORS ────────────────────────────────────────────────────────────────────

// export const fetchDoctors = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// export const fetchDoctorsByDepartment = async (hospitalId, department) => {
//   const res = await fetch(
//     `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}`
//   );
//   return handleRes(res);
// };

// // Staff: Add a doctor to their hospital
// export const addDoctor = async (doctorData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   return handleRes(res);
// };

// // Staff: Update doctor
// export const updateDoctor = async (doctorId, doctorData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   return handleRes(res);
// };

// // Staff: Delete a doctor
// export const deleteDoctor = async (doctorId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// // Staff: Update doctor timings
// // timings is an object like { morning: {...}, afternoon: {...}, night: {...} }
// export const updateDoctorTimings = async (doctorId, timings) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(timings),
//   });
//   return handleRes(res);
// };

// // ─── TOKENS — Patient Booking ──────────────────────────────────────────────────

// export const bookToken = async (appointmentData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/book`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   return handleRes(res);
// };

// // ─── TOKENS — Queue (public read) ─────────────────────────────────────────────

// export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
//   const params = new URLSearchParams({ hospitalId, department, doctor, slot });
//   if (date) params.append("date", date);
//   const res = await fetch(`${BASE_URL}/tokens/queue?${params}`);
//   return handleRes(res);
// };

// export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
//   const params = new URLSearchParams({ hospitalId, department, doctor, slot });
//   if (date) params.append("date", date);
//   const res = await fetch(`${BASE_URL}/tokens/summary?${params}`);
//   return handleRes(res);
// };

// // ─── TOKENS — Staff Queue Management ──────────────────────────────────────────

// export const bookWalkInToken = async (appointmentData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/walkin`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   return handleRes(res);
// };

// export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/next`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/complete`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/skip`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const fetchHospitalDayTokens = async (hospitalId, date) => {
//   const headers = await authHeaders();
//   const params = date ? `?date=${date}` : "";
//   const res = await fetch(`${BASE_URL}/tokens/hospital/${hospitalId}${params}`, { headers });
//   return handleRes(res);
// };

// // ─── FEEDBACK ─────────────────────────────────────────────────────────────────

// export const fetchHospitalFeedback = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/feedback/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// export const submitFeedback = async (feedbackData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/submit`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(feedbackData),
//   });
//   return handleRes(res);
// };  



































// // src/services/apiService.js
// // Central API service for MediQueue — Patient, Staff, Admin

// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const BASE_URL = "http://192.168.0.4:8080/api"; // ← Your backend IP

// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// const getToken = async () => AsyncStorage.getItem("token");

// const authHeaders = async () => {
//   const token = await getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

// // const handleRes = async (res) => {
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
// //   return data;
// // };
 

// // Inside apiService.js, update handleRes:
// const handleRes = async (res) => {
//   const text = await res.text(); // Read as text first to avoid JSON errors
//   try {
//     const data = JSON.parse(text);
//     if (!res.ok) {
//        console.log("SERVER ERROR DATA:", data); // Check your terminal/log
//        throw new Error(data.message || `HTTP ${res.status}`);
//     }
//     return data;
//   } catch (e) {
//     console.log("RAW SERVER RESPONSE:", text); // This will show the Java stack trace
//     throw new Error("Server error. Check console for details.");
//   }
// };
// // ─── PATIENT AUTH ──────────────────────────────────────────────────────────────

// export const loginUser = async (phone, password) => {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, password }),
//   });
//   return handleRes(res);
// };

// export const registerUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return handleRes(res);
// };

// // ─── PATIENT PROFILE ──────────────────────────────────────────────────────────

// export const fetchMyProfile = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, { headers });
//   return handleRes(res);
// };

// export const updateMyProfile = async (updates) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   return handleRes(res);
// };

// // ─── PATIENT VISITS (tokens booked by the logged-in patient) ──────────────────

// export const fetchMyTokens = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
//   return handleRes(res);
// };

// export const fetchMyActiveToken = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
//   return handleRes(res);
// };

// // ─── HOSPITAL AUTH (Staff) ─────────────────────────────────────────────────────

// export const loginHospitalStaff = async (hospitalId, email, password) => {
//   const res = await fetch(`${BASE_URL}/hospitals/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ hospitalId, email, password }),
//   });
//   return handleRes(res);
// };

// export const registerHospital = async (payload) => {
//   const res = await fetch(`${BASE_URL}/hospitals/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return handleRes(res);
// };

// // ─── HOSPITAL PROFILE (Staff) ──────────────────────────────────────────────────

// // Fetches the hospital that belongs to the JWT token (staff session)
// export const fetchMyHospitalDetails = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
//   return handleRes(res);
// };

// export const fetchHospitalDetails = async (token) => {
//   const res = await fetch(`${BASE_URL}/hospitals/details`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return handleRes(res);
// };

// export const updateHospitalProfile = async (updates) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/profile`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   return handleRes(res);
// };

// export const uploadHospitalImage = async (imageUri) => {
//   const token = await getToken();
//   const formData = new FormData();
//   formData.append("file", {
//     uri: imageUri,
//     name: "hospital_profile.jpg",
//     type: "image/jpeg",
//   });
//   const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });
//   return handleRes(res);
// };

// // ─── HOSPITALS — Public (patients browse) ─────────────────────────────────────

// export const fetchApprovedHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/approved`);
//   return handleRes(res);
// };

// export const fetchHospitalById = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   return handleRes(res);
// };

// // Alias used by HospitalContext staff session — fetches full hospital profile by ID
// export const fetchHospitalProfile = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   return handleRes(res);
// };

// // ─── HOSPITALS — Admin ─────────────────────────────────────────────────────────

// export const fetchAllHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/all`, { headers });
//   return handleRes(res);
// };

// export const fetchPendingHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/pending`, { headers });
//   return handleRes(res);
// };

// export const fetchApprovedHospitalsCount = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/approved`, { headers });
//   const data = await handleRes(res);
//   return Array.isArray(data) ? data.length : 0;
// };

// export const approveHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
//     method: "PUT",
//     headers,
//   });
//   return handleRes(res);
// };

// export const rejectHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
//     method: "PUT",
//     headers,
//   });
//   return handleRes(res);
// };

// // Admin stats
// export const fetchAdminStats = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
//   return handleRes(res);
// };

// // ─── DEPARTMENTS ───────────────────────────────────────────────────────────────

// // Fetch all departments for a hospital (patients + staff)
// export const fetchDepartments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/departments/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// // Staff: Add a department to their hospital
// export const addDepartment = async (hospitalId, name) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/departments`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, name }),
//   });
//   return handleRes(res);
// };

// // Staff: Delete a department
// export const deleteDepartment = async (departmentId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// // ─── DOCTORS ────────────────────────────────────────────────────────────────────

// export const fetchDoctors = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// export const fetchDoctorsByDepartment = async (hospitalId, department) => {
//   const res = await fetch(
//     `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}`
//   );
//   return handleRes(res);
// };

// // Staff: Add a doctor to their hospital
// export const addDoctor = async (doctorData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   return handleRes(res);
// };

// // Staff: Update doctor
// export const updateDoctor = async (doctorId, doctorData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   return handleRes(res);
// };

// // Staff: Delete a doctor
// export const deleteDoctor = async (doctorId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// // Staff: Update doctor timings
// // timings is an object like { morning: {...}, afternoon: {...}, night: {...} }
// export const updateDoctorTimings = async (doctorId, timings) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(timings),
//   });
//   return handleRes(res);
// };

// // ─── TOKENS — Patient Booking ──────────────────────────────────────────────────

// export const bookToken = async (appointmentData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/book`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   return handleRes(res);
// };

// // ─── TOKENS — Queue (public read) ─────────────────────────────────────────────

// export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
//   const params = new URLSearchParams({ hospitalId, department, doctor, slot });
//   if (date) params.append("date", date);
//   const res = await fetch(`${BASE_URL}/tokens/queue?${params}`);
//   return handleRes(res);
// };

// export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
//   const params = new URLSearchParams({ hospitalId, department, doctor, slot });
//   if (date) params.append("date", date);
//   const res = await fetch(`${BASE_URL}/tokens/summary?${params}`);
//   return handleRes(res);
// };

// // ─── TOKENS — Staff Queue Management ──────────────────────────────────────────

// export const bookWalkInToken = async (appointmentData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/walkin`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   return handleRes(res);
// };

// export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/next`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/complete`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/skip`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const fetchHospitalDayTokens = async (hospitalId, date) => {
//   const headers = await authHeaders();
//   const params = date ? `?date=${date}` : "";
//   const res = await fetch(`${BASE_URL}/tokens/hospital/${hospitalId}${params}`, { headers });
//   return handleRes(res);
// };

// // ─── FEEDBACK ─────────────────────────────────────────────────────────────────

// export const fetchHospitalFeedback = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/hospital/${hospitalId}`, { headers });
//   return handleRes(res);
// };

// export const submitFeedback = async (feedbackData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/submit`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(feedbackData),
//   });
//   return handleRes(res);
// };

// // Returns array of tokenIds for which this patient has already submitted feedback
// export const fetchMySubmittedTokenIds = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/my-submitted-token-ids`, { headers });
//   return handleRes(res);
// }; 


// // ─── PATIENT REPORTS ───────────────────────────────────────────────────────────

// export const fetchMyReports = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports`, { headers }); // ✅ was /reports/my
//   return handleRes(res);
// };

// export const addReport = async (reportData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports`, {             // ✅ was /reports
//     method: "POST",
//     headers,
//     body: JSON.stringify(reportData),
//   });
//   return handleRes(res);
// };

// export const deleteReport = async (reportId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, { // ✅ was /reports/:id
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// export const fetchReportById = async (reportId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, { // ✅ was /reports/:id
//     headers,
//   });
//   return handleRes(res);
// };  

































// // src/services/apiService.js
// // Central API service for MediQueue — Patient, Staff, Admin

// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const BASE_URL = "http://192.168.0.4:8080/api"; // ← Your backend IP

// // ─── HELPERS ──────────────────────────────────────────────────────────────────

// const getToken = async () => AsyncStorage.getItem("token");

// const authHeaders = async () => {
//   const token = await getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

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

// // ─── PATIENT AUTH ──────────────────────────────────────────────────────────────

// export const loginUser = async (phone, password) => {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, password }),
//   });
//   return handleRes(res);
// };

// export const registerUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return handleRes(res);
// };

// // ─── RESET PASSWORD (called after Firebase OTP is verified on frontend) ────────
// // No token needed — user is unauthenticated when resetting password.
// export const resetUserPassword = async (phone, newPassword) => {
//   const res = await fetch(`${BASE_URL}/auth/reset-password`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, newPassword }),
//   });
//   return handleRes(res);
// };

// // ─── PATIENT PROFILE ──────────────────────────────────────────────────────────

// export const fetchMyProfile = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, { headers });
//   return handleRes(res);
// };

// export const updateMyProfile = async (updates) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   return handleRes(res);
// };

// // ─── PATIENT VISITS (tokens booked by the logged-in patient) ──────────────────

// export const fetchMyTokens = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
//   return handleRes(res);
// };

// export const fetchMyActiveToken = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
//   return handleRes(res);
// };

// // ─── HOSPITAL AUTH (Staff) ─────────────────────────────────────────────────────

// export const loginHospitalStaff = async (hospitalId, email, password) => {
//   const res = await fetch(`${BASE_URL}/hospitals/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ hospitalId, email, password }),
//   });
//   return handleRes(res);
// };

// export const registerHospital = async (payload) => {
//   const res = await fetch(`${BASE_URL}/hospitals/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return handleRes(res);
// };

// // ─── HOSPITAL PROFILE (Staff) ──────────────────────────────────────────────────

// export const fetchMyHospitalDetails = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
//   return handleRes(res);
// };

// export const fetchHospitalDetails = async (token) => {
//   const res = await fetch(`${BASE_URL}/hospitals/details`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return handleRes(res);
// };

// export const updateHospitalProfile = async (updates) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/profile`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   return handleRes(res);
// };

// export const uploadHospitalImage = async (imageUri) => {
//   const token = await getToken();
//   const formData = new FormData();
//   formData.append("file", {
//     uri: imageUri,
//     name: "hospital_profile.jpg",
//     type: "image/jpeg",
//   });
//   const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });
//   return handleRes(res);
// };

// // ─── HOSPITALS — Public (patients browse) ─────────────────────────────────────

// export const fetchApprovedHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/approved`);
//   return handleRes(res);
// };

// export const fetchHospitalById = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   return handleRes(res);
// };

// export const fetchHospitalProfile = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   return handleRes(res);
// };

// // ─── HOSPITALS — Admin ─────────────────────────────────────────────────────────

// export const fetchAllHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/all`, { headers });
//   return handleRes(res);
// };

// export const fetchPendingHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/pending`, { headers });
//   return handleRes(res);
// };

// export const fetchApprovedHospitalsCount = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/approved`, { headers });
//   const data = await handleRes(res);
//   return Array.isArray(data) ? data.length : 0;
// };

// export const approveHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
//     method: "PUT",
//     headers,
//   });
//   return handleRes(res);
// };

// export const rejectHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
//     method: "PUT",
//     headers,
//   });
//   return handleRes(res);
// };

// export const fetchAdminStats = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
//   return handleRes(res);
// };

// // ─── DEPARTMENTS ───────────────────────────────────────────────────────────────

// export const fetchDepartments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/departments/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// export const addDepartment = async (hospitalId, name) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/departments`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, name }),
//   });
//   return handleRes(res);
// };

// export const deleteDepartment = async (departmentId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// // ─── DOCTORS ────────────────────────────────────────────────────────────────────

// export const fetchDoctors = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`);
//   return handleRes(res);
// };

// export const fetchDoctorsByDepartment = async (hospitalId, department) => {
//   const res = await fetch(
//     `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}`
//   );
//   return handleRes(res);
// };

// export const addDoctor = async (doctorData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   return handleRes(res);
// };

// export const updateDoctor = async (doctorId, doctorData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   return handleRes(res);
// };

// export const deleteDoctor = async (doctorId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// export const updateDoctorTimings = async (doctorId, timings) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(timings),
//   });
//   return handleRes(res);
// };

// // ─── TOKENS — Patient Booking ──────────────────────────────────────────────────

// export const bookToken = async (appointmentData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/book`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   return handleRes(res);
// };

// // ─── TOKENS — Queue (public read) ─────────────────────────────────────────────

// export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
//   const params = new URLSearchParams({ hospitalId, department, doctor, slot });
//   if (date) params.append("date", date);
//   const res = await fetch(`${BASE_URL}/tokens/queue?${params}`);
//   return handleRes(res);
// };

// export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
//   const params = new URLSearchParams({ hospitalId, department, doctor, slot });
//   if (date) params.append("date", date);
//   const res = await fetch(`${BASE_URL}/tokens/summary?${params}`);
//   return handleRes(res);
// };

// // ─── TOKENS — Staff Queue Management ──────────────────────────────────────────

// export const bookWalkInToken = async (appointmentData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/walkin`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   return handleRes(res);
// };

// export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/next`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/complete`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/skip`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   return handleRes(res);
// };

// export const fetchHospitalDayTokens = async (hospitalId, date) => {
//   const headers = await authHeaders();
//   const params = date ? `?date=${date}` : "";
//   const res = await fetch(`${BASE_URL}/tokens/hospital/${hospitalId}${params}`, { headers });
//   return handleRes(res);
// };

// // ─── FEEDBACK ─────────────────────────────────────────────────────────────────

// export const fetchHospitalFeedback = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/hospital/${hospitalId}`, { headers });
//   return handleRes(res);
// };

// export const submitFeedback = async (feedbackData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/submit`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(feedbackData),
//   });
//   return handleRes(res);
// };

// export const fetchMySubmittedTokenIds = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/feedback/my-submitted-token-ids`, { headers });
//   return handleRes(res);
// };

// // ─── PATIENT REPORTS ───────────────────────────────────────────────────────────

// export const fetchMyReports = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports`, { headers });
//   return handleRes(res);
// };

// export const addReport = async (reportData) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(reportData),
//   });
//   return handleRes(res);
// };

// export const deleteReport = async (reportId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
//     method: "DELETE",
//     headers,
//   });
//   return handleRes(res);
// };

// export const fetchReportById = async (reportId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
//     headers,
//   });
//   return handleRes(res);
// };  


// // Add to apiService.js
// export const checkPhoneRegistered = async (phone) => {
//   // Normalize: strip +91 before sending (backend expects plain 10-digit)
//   const normalized = phone.trim().startsWith("+91")
//     ? phone.trim().substring(3)
//     : phone.trim();

//   const res = await fetch(`${BASE_URL}/auth/check-phone?phone=${encodeURIComponent(normalized)}`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Phone number is not registered.");
//   return data;
// };  

































// import AsyncStorage from "@react-native-async-storage/async-storage";

// // export const BASE_URL = "http://192.168.0.4:8080/api"; // ← Your backend IP
// export const BASE_URL = "https://abc123.ngrok.io/api";

// // ── Helper ────────────────────────────────────────────────────────────────────
// const getAuthHeaders = async () => {
//   const token = await AsyncStorage.getItem("token");
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  AUTH
// // ─────────────────────────────────────────────────────────────────────────────
// export const loginUser = async (phone, password) => {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Login failed");
//   return data;
// };

// export const registerUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Registration failed");
//   return data;
// };

// export const resetUserPassword = async (phone, newPassword) => {
//   const res = await fetch(`${BASE_URL}/auth/reset-password`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ phone, newPassword }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Reset failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  PATIENT
// // ─────────────────────────────────────────────────────────────────────────────
// export const fetchMyProfile = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
//   return data;
// };

// export const updateMyProfile = async (updates) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to update profile");
//   return data;
// };

// export const fetchMyTokens = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch tokens");
//   return data;
// };

// export const fetchMyActiveToken = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch active token");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  HOSPITAL AUTH
// // ─────────────────────────────────────────────────────────────────────────────
// export const loginHospitalStaff = async (hospitalId, email, password) => {
//   const res = await fetch(`${BASE_URL}/hospitals/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ hospitalId, email, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Login failed");
//   return data;
// };

// export const registerHospital = async (payload) => {
//   const res = await fetch(`${BASE_URL}/hospitals/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Registration failed");
//   return data;
// };

// export const fetchMyHospitalDetails = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalDetails = async (token) => {
//   const res = await fetch(`${BASE_URL}/hospitals/details`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const updateHospitalProfile = async (updates) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/profile`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Update failed");
//   return data;
// };

// export const uploadHospitalImage = async (imageUri) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ imageUri }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Upload failed");
//   return data;
// };

// export const fetchApprovedHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/approved`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalById = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalProfile = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchAllHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/all`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchPendingHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/pending`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchApprovedHospitalsCount = async () => {
//   const hospitals = await fetchApprovedHospitals();
//   return hospitals.length;
// };

// export const approveHospital = async (hospitalId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
//     method: "PUT",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const rejectHospital = async (hospitalId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
//     method: "PUT",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchAdminStats = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  DEPARTMENTS & DOCTORS
// // ─────────────────────────────────────────────────────────────────────────────
// export const fetchDepartments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/departments/${hospitalId}`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const addDepartment = async (hospitalId, name) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/departments`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, name }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const deleteDepartment = async (departmentId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
//     method: "DELETE",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // export const fetchDoctors = async (hospitalId) => {
// //   const res = await fetch(`${BASE_URL}/doctors/${hospitalId}`);
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.message || "Failed");
// //   return data;
// // };

// // export const fetchDoctorsByDepartment = async (hospitalId, department) => {
// //   const res = await fetch(
// //     `${BASE_URL}/doctors/${hospitalId}/department/${encodeURIComponent(department)}`
// //   );
// //   const data = await res.json();
// //   if (!res.ok) throw new Error(data.message || "Failed");
// //   return data;
// // }; 


// // ── CHANGE THIS ──
// export const fetchDoctors = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`); // Added /hospital
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ── CHANGE THIS ──
// export const fetchDoctorsByDepartment = async (hospitalId, department) => {
//   const res = await fetch(
//     `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}` // Added /hospital
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };


// export const addDoctor = async (doctorData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const updateDoctor = async (doctorId, doctorData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const deleteDoctor = async (doctorId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "DELETE",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const updateDoctorTimings = async (doctorId, timings) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(timings),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  QUEUE / BOOKING
// // ─────────────────────────────────────────────────────────────────────────────
// export const bookToken = async (appointmentData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/book`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Booking failed");
//   return data;
// };

// export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
//   const res = await fetch(
//     `${BASE_URL}/tokens/queue?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
//   const res = await fetch(
//     `${BASE_URL}/tokens/queue/summary?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const bookWalkInToken = async (appointmentData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/walkin`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Walk-in booking failed");
//   return data;
// };

// export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/next`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/complete`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/skip`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAYMENT  (NEW)
// // ─────────────────────────────────────────────────────────────────────────────

// /**
//  * Creates a Razorpay order on the backend.
//  * Returns { orderId, amount (paise), currency, keyId }
//  */
// export const createPaymentOrder = async ({
//   amount,       // in RUPEES (e.g. 520)
//   hospitalId,
//   patientId,
//   doctorName,
//   department,
//   notes,
// }) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/payment/create-order`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ amount, hospitalId, patientId, doctorName, department, notes }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Failed to create payment order");
//   return data;
// };

// /**
//  * Verifies the Razorpay payment signature with the backend.
//  * Call this after Razorpay SDK returns success.
//  */
// export const verifyPayment = async ({
//   razorpay_order_id,
//   razorpay_payment_id,
//   razorpay_signature,
// }) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/payment/verify`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Payment verification failed");
//   return data;
// };

// /**
//  * Saves a "Pay at Hospital" record to the backend without Razorpay.
//  */
// export const savePayAtHospital = async ({
//   hospitalId,
//   patientId,
//   doctorName,
//   department,
//   amount,
//   notes,
// }) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/payment/pay-at-hospital`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, patientId, doctorName, department, amount, notes }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Failed to save payment record");
//   return data;
// };

// /**
//  * Fetches all payments for a hospital (for staff dashboard).
//  */
// export const fetchHospitalPayments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/payment/hospital/${hospitalId}`);
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch payments");
//   return data;
// }; 





































// import AsyncStorage from "@react-native-async-storage/async-storage";

// // ─── IMPORTANT: Replace with your actual ngrok URL every time you restart ngrok
// // Run: ngrok http 8080  → copy the https://xxxx.ngrok-free.app URL
// export const BASE_URL = "http://192.168.0.5:8080/api";  // your PC's local IP

// // ── Helpers ───────────────────────────────────────────────────────────────────

// // For authenticated requests (sends JWT + skips ngrok warning page)
// const getAuthHeaders = async () => {
//   const token = await AsyncStorage.getItem("token");
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//     "ngrok-skip-browser-warning": "true",   // ← required for ngrok
//   };
// };

// // For public requests (no JWT, but still skips ngrok warning page)
// const getPublicHeaders = () => ({
//   "Content-Type": "application/json",
//   "ngrok-skip-browser-warning": "true",     // ← required for ngrok
// });

// // ─────────────────────────────────────────────────────────────────────────────
// //  AUTH
// // ─────────────────────────────────────────────────────────────────────────────
// export const loginUser = async (phone, password) => {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: getPublicHeaders(),
//     body: JSON.stringify({ phone, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Login failed");
//   return data;
// };

// export const registerUser = async (userData) => {
//   const res = await fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: getPublicHeaders(),
//     body: JSON.stringify(userData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Registration failed");
//   return data;
// };

// export const resetUserPassword = async (phone, newPassword) => {
//   const res = await fetch(`${BASE_URL}/auth/reset-password`, {
//     method: "POST",
//     headers: getPublicHeaders(),
//     body: JSON.stringify({ phone, newPassword }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Reset failed");
//   return data;
// };

// export const checkPhoneRegistered = async (phone) => {
//   const res = await fetch(`${BASE_URL}/auth/check-phone?phone=${encodeURIComponent(phone)}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   return data; // { registered: true/false }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  PATIENT
// // ─────────────────────────────────────────────────────────────────────────────
// export const fetchMyProfile = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
//   return data;
// };

// export const updateMyProfile = async (updates) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patients/me`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to update profile");
//   return data;
// };

// export const fetchMyTokens = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch tokens");
//   return data;
// };

// export const fetchMyActiveToken = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch active token");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  HOSPITAL AUTH
// // ─────────────────────────────────────────────────────────────────────────────
// export const loginHospitalStaff = async (hospitalId, email, password) => {
//   const res = await fetch(`${BASE_URL}/hospitals/login`, {
//     method: "POST",
//     headers: getPublicHeaders(),
//     body: JSON.stringify({ hospitalId, email, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Login failed");
//   return data;
// };

// export const registerHospital = async (payload) => {
//   const res = await fetch(`${BASE_URL}/hospitals/register`, {
//     method: "POST",
//     headers: getPublicHeaders(),
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Registration failed");
//   return data;
// };

// export const fetchMyHospitalDetails = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalDetails = async (token) => {
//   const res = await fetch(`${BASE_URL}/hospitals/details`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//       "ngrok-skip-browser-warning": "true",
//     },
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const updateHospitalProfile = async (updates) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/profile`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(updates),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Update failed");
//   return data;
// };

// export const uploadHospitalImage = async (imageUri) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ imageUri }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Upload failed");
//   return data;
// };

// export const fetchApprovedHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/approved`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalById = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalProfile = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchAllHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/all`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchPendingHospitals = async () => {
//   const res = await fetch(`${BASE_URL}/hospitals/pending`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchApprovedHospitalsCount = async () => {
//   const hospitals = await fetchApprovedHospitals();
//   return hospitals.length;
// };

// export const approveHospital = async (hospitalId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
//     method: "PUT",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const rejectHospital = async (hospitalId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
//     method: "PUT",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchAdminStats = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  DEPARTMENTS & DOCTORS
// // ─────────────────────────────────────────────────────────────────────────────
// export const fetchDepartments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/departments/${hospitalId}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const addDepartment = async (hospitalId, name) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/departments`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, name }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const deleteDepartment = async (departmentId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
//     method: "DELETE",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchDoctors = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchDoctorsByDepartment = async (hospitalId, department) => {
//   const res = await fetch(
//     `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}`,
//     { headers: getPublicHeaders() }
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const addDoctor = async (doctorData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const updateDoctor = async (doctorId, doctorData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(doctorData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const deleteDoctor = async (doctorId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
//     method: "DELETE",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const updateDoctorTimings = async (doctorId, timings) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(timings),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  QUEUE / BOOKING
// // ─────────────────────────────────────────────────────────────────────────────
// export const bookToken = async (appointmentData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/book`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Booking failed");
//   return data;
// };

// export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
//   const res = await fetch(
//     `${BASE_URL}/tokens/queue?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`,
//     { headers: getPublicHeaders() }
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
//   const res = await fetch(
//     `${BASE_URL}/tokens/queue/summary?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`,
//     { headers: getPublicHeaders() }
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const fetchHospitalDayTokens = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(
//     `${BASE_URL}/tokens/hospital/day?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`,
//     { headers }
//   );
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const bookWalkInToken = async (appointmentData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/walkin`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(appointmentData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Walk-in booking failed");
//   return data;
// };

// export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/next`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/complete`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/tokens/skip`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  PATIENT REPORTS
// // ─────────────────────────────────────────────────────────────────────────────
// export const fetchPatientReports = async () => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch reports");
//   return data;
// };

// export const addPatientReport = async (reportData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(reportData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to add report");
//   return data;
// };

// export const deletePatientReport = async (reportId) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
//     method: "DELETE",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to delete report");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  FEEDBACK
// // ─────────────────────────────────────────────────────────────────────────────
// export const submitFeedback = async (feedbackData) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/feedback`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(feedbackData),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to submit feedback");
//   return data;
// };

// export const fetchHospitalFeedback = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/feedback/hospital/${hospitalId}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch feedback");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// //  PAYMENT
// // ─────────────────────────────────────────────────────────────────────────────
// export const createPaymentOrder = async ({
//   amount,
//   hospitalId,
//   patientId,
//   doctorName,
//   department,
//   notes,
// }) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/payment/create-order`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ amount, hospitalId, patientId, doctorName, department, notes }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Failed to create payment order");
//   return data;
// };

// export const verifyPayment = async ({
//   razorpay_order_id,
//   razorpay_payment_id,
//   razorpay_signature,
// }) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/payment/verify`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Payment verification failed");
//   return data;
// };

// export const savePayAtHospital = async ({
//   hospitalId,
//   patientId,
//   doctorName,
//   department,
//   amount,
//   notes,
// }) => {
//   const headers = await getAuthHeaders();
//   const res = await fetch(`${BASE_URL}/payment/pay-at-hospital`, {
//     method: "POST",
//     headers,
//     body: JSON.stringify({ hospitalId, patientId, doctorName, department, amount, notes }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Failed to save payment record");
//   return data;
// };

// export const fetchHospitalPayments = async (hospitalId) => {
//   const res = await fetch(`${BASE_URL}/payment/hospital/${hospitalId}`, {
//     headers: getPublicHeaders(),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch payments");
//   return data;
// };  








































import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "http://192.168.1.14:8080/api";  // your PC's local IP

// ── Helpers ───────────────────────────────────────────────────────────────────

const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "true",
  };
};

const getPublicHeaders = () => ({
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "true",
});

// ─────────────────────────────────────────────────────────────────────────────
//  AUTH
// ─────────────────────────────────────────────────────────────────────────────
export const loginUser = async (phone, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ phone, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

export const resetUserPassword = async (phone, code, newPassword) => {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ phone, code, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Reset failed");
  return data;
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

export const checkPhoneRegistered = async (phone) => {
  const res = await fetch(`${BASE_URL}/auth/check-phone?phone=${encodeURIComponent(phone)}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  return data; // { registered: true/false }
};

// ─────────────────────────────────────────────────────────────────────────────
//  PATIENT
// ─────────────────────────────────────────────────────────────────────────────
export const fetchMyProfile = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/patients/me`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
  return data;
};

export const updateMyProfile = async (updates) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/patients/me`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};

export const fetchMyTokens = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch tokens");
  return data;
};

// ✅ FIX 1: Safe JSON parse — backend returns empty body on 403, res.json() crashes
export const fetchMyActiveToken = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.message || "Failed to fetch active token");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
//  HOSPITAL AUTH
// ─────────────────────────────────────────────────────────────────────────────
export const loginHospitalStaff = async (hospitalId, email, password) => {
  const res = await fetch(`${BASE_URL}/hospitals/login`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify({ hospitalId, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const registerHospital = async (payload) => {
  const res = await fetch(`${BASE_URL}/hospitals/register`, {
    method: "POST",
    headers: getPublicHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

export const checkHospitalPhoneRegistered = async (phone) => {
  const res = await fetch(`${BASE_URL}/hospitals/check-phone?phone=${encodeURIComponent(phone)}`, {
    headers: getPublicHeaders(),
  });
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
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/details`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchHospitalDetails = async (token) => {
  const res = await fetch(`${BASE_URL}/hospitals/details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true",
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const updateHospitalProfile = async (updates) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/profile`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed");
  return data;
};

export const uploadHospitalImage = async (imageUri) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/upload-image`, {
    method: "POST",
    headers,
    body: JSON.stringify({ imageUri }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
};

export const fetchApprovedHospitals = async () => {
  const res = await fetch(`${BASE_URL}/hospitals/approved`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchHospitalById = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchHospitalProfile = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchAllHospitals = async () => {
  const res = await fetch(`${BASE_URL}/hospitals/all`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchPendingHospitals = async () => {
  const res = await fetch(`${BASE_URL}/hospitals/pending`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchApprovedHospitalsCount = async () => {
  const hospitals = await fetchApprovedHospitals();
  return hospitals.length;
};

export const approveHospital = async (hospitalId) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
    method: "PUT",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const rejectHospital = async (hospitalId) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
    method: "PUT",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchAdminStats = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/admin/stats`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
//  DEPARTMENTS & DOCTORS
// ─────────────────────────────────────────────────────────────────────────────
export const fetchDepartments = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/departments/${hospitalId}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const addDepartment = async (hospitalId, name) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/departments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const deleteDepartment = async (departmentId) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/departments/${departmentId}`, {
    method: "DELETE",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchDoctors = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/doctors/hospital/${hospitalId}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchDoctorsByDepartment = async (hospitalId, department) => {
  const res = await fetch(
    `${BASE_URL}/doctors/hospital/${hospitalId}/department/${encodeURIComponent(department)}`,
    { headers: getPublicHeaders() }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const addDoctor = async (doctorData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/doctors`, {
    method: "POST",
    headers,
    body: JSON.stringify(doctorData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const updateDoctor = async (doctorId, doctorData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(doctorData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const deleteDoctor = async (doctorId) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
    method: "DELETE",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const updateDoctorTimings = async (doctorId, timings) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
    method: "PUT",
    headers,
    body: JSON.stringify(timings),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
//  QUEUE / BOOKING
// ─────────────────────────────────────────────────────────────────────────────
export const bookToken = async (appointmentData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/book`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Booking failed");
  return data;
};

export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
  const res = await fetch(
    `${BASE_URL}/tokens/queue?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`,
    { headers: getPublicHeaders() }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

// ✅ FIX 2: Wrong URL was /tokens/queue/summary → correct is /tokens/summary
//           Also safe JSON parse for empty error responses
export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
  const res = await fetch(
    `${BASE_URL}/tokens/summary?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`,
    { headers: getPublicHeaders() }
  );
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const fetchHospitalDayTokens = async (hospitalId, department, doctor, slot, date) => {
  const headers = await getAuthHeaders();
  const res = await fetch(
    `${BASE_URL}/tokens/hospital/day?hospitalId=${hospitalId}&department=${encodeURIComponent(department)}&doctor=${encodeURIComponent(doctor)}&slot=${slot}&date=${date}`,
    { headers }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const bookWalkInToken = async (appointmentData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/walkin`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Walk-in booking failed");
  return data;
};

export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/next`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/complete`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/tokens/skip`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
//  PATIENT REPORTS
// ─────────────────────────────────────────────────────────────────────────────
export const fetchPatientReports = async () => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch reports");
  return data;
};

export const addPatientReport = async (reportData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports`, {
    method: "POST",
    headers,
    body: JSON.stringify(reportData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add report");
  return data;
};

export const deletePatientReport = async (reportId) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/patient/reports/${reportId}`, {
    method: "DELETE",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete report");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
//  FEEDBACK
// ─────────────────────────────────────────────────────────────────────────────
export const submitFeedback = async (feedbackData) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/feedback`, {
    method: "POST",
    headers,
    body: JSON.stringify(feedbackData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to submit feedback");
  return data;
};

export const fetchHospitalFeedback = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/feedback/hospital/${hospitalId}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch feedback");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
//  PAYMENT
// ─────────────────────────────────────────────────────────────────────────────
export const createPaymentOrder = async ({
  amount,
  hospitalId,
  patientId,
  doctorName,
  department,
  notes,
}) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/payment/create-order`, {
    method: "POST",
    headers,
    body: JSON.stringify({ amount, hospitalId, patientId, doctorName, department, notes }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create payment order");
  return data;
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/payment/verify`, {
    method: "POST",
    headers,
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Payment verification failed");
  return data;
};

export const savePayAtHospital = async ({
  hospitalId,
  patientId,
  doctorName,
  department,
  amount,
  notes,
}) => {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/payment/pay-at-hospital`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, patientId, doctorName, department, amount, notes }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to save payment record");
  return data;
};

export const fetchHospitalPayments = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/payment/hospital/${hospitalId}`, {
    headers: getPublicHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch payments");
  return data;
};