



// // ─────────────────────────────────────────────────────────────────────────────
// // apiService.js  —  All API calls for the Medique app
// // Change BASE_URL to match your machine's local IP and Spring Boot port
// // ─────────────────────────────────────────────────────────────────────────────

// const BASE_URL = "http://192.168.0.3:8080/api";

// // ── Helper ────────────────────────────────────────────────────────────────────
// const getToken = async () => {
//   const AsyncStorage =
//     require("@react-native-async-storage/async-storage").default;
//   return await AsyncStorage.getItem("token");
// };

// const authHeaders = async () => {
//   const token = await getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // AUTH  (existing user login / register)
// // ─────────────────────────────────────────────────────────────────────────────

// export const registerUser = async (payload) => {
//   const res = await fetch(`${BASE_URL}/auth/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Registration failed.");
//   return data;
// };

// export const loginUser = async (email, password) => {
//   const res = await fetch(`${BASE_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Login failed.");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // HOSPITAL REGISTRATION  (Public — no token needed)
// // POST /api/hospitals/register
// // Returns: { hospitalId, message, status, name }
// // ─────────────────────────────────────────────────────────────────────────────

// export const registerHospital = async (payload) => {
//   const res = await fetch(`${BASE_URL}/hospitals/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Hospital registration failed.");
//   return data; // { hospitalId: "HSP-A3F9K2", message: "...", status: "PENDING", name: "..." }
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // HOSPITAL STAFF LOGIN  (Public — no token needed)
// // POST /api/hospitals/login
// // Returns: { token, hospitalId, name, email, city, imageUrl, role }
// // ─────────────────────────────────────────────────────────────────────────────

// export const loginHospitalStaff = async (hospitalId, email, password) => {
//   const res = await fetch(`${BASE_URL}/hospitals/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ hospitalId, email, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Login failed.");
//   return data;
// };

// // ─────────────────────────────────────────────────────────────────────────────
// // ADMIN — PENDING HOSPITALS
// // GET /api/hospitals/pending   (requires ADMIN token)
// // ─────────────────────────────────────────────────────────────────────────────

// // --- ADMIN HOSPITAL ACTIONS ---
// // Fetches the full list of pending hospitals
// export const fetchPendingHospitals = async () => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/pending`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch pending hospitals.");
//   return data;
// };

// // NEW: Fetches specific details for the verification screen
// export const fetchHospitalById = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`, { headers });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Failed to fetch hospital details.");
//   return data;
// };

// // PUT request to approve a hospital
// export const approveHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
//     method: "PUT",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Approval failed.");
//   return data;
// };

// // PUT request to reject a hospital
// export const rejectHospital = async (hospitalId) => {
//   const headers = await authHeaders();
//   const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
//     method: "PUT",
//     headers,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || "Rejection failed.");
//   return data;
// }; 


// // ─────────────────────────────────────────────
// // FETCH ALL HOSPITALS
// // ─────────────────────────────────────────────
// export const fetchAllHospitals = async () => {

//   const headers = await authHeaders();

//   const res = await fetch(`${BASE_URL}/hospitals/all`, {
//     headers,
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Failed to fetch hospitals.");
//   }

//   return data;
// };






















// ─────────────────────────────────────────────────────────────────────────────
// apiService.js  —  All API calls for the Medique app
// Change BASE_URL to match your machine's local IP and Spring Boot port
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "http://192.168.0.3:8080/api"; // ← update to your IP

// ── Storage Helper ────────────────────────────────────────────────────────────
const getToken = async () => {
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  return await AsyncStorage.getItem("token");
};

const authHeaders = async () => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// AUTH — PATIENT
// ─────────────────────────────────────────────────────────────────────────────

export const registerUser = async (payload) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed.");
  return data; // { token, userId, role }
};

export const loginUser = async (identifier, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed.");
  return data; // { token, userId, role }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT PROFILE
// ─────────────────────────────────────────────────────────────────────────────

// Fetch logged-in patient's profile
export const fetchMyProfile = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patients/me`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile.");
  return data; // Patient object
};

// Update logged-in patient's profile
export const updateMyProfile = async (updates) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/patients/me`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Update failed.");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// HOSPITAL AUTH
// ─────────────────────────────────────────────────────────────────────────────

export const registerHospital = async (payload) => {
  const res = await fetch(`${BASE_URL}/hospitals/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Hospital registration failed.");
  return data; // { hospitalId, message, status, name }
};

export const loginHospitalStaff = async (hospitalId, email, password) => {
  const res = await fetch(`${BASE_URL}/hospitals/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ hospitalId, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed.");
  return data;
  // { token, hospitalId, name, email, city, address, imageUrl, departments[], role }
};

// ─────────────────────────────────────────────────────────────────────────────
// HOSPITALS — Public (patients browse)
// ─────────────────────────────────────────────────────────────────────────────

// Approved hospitals for patient list screen
export const fetchApprovedHospitals = async () => {
  const res = await fetch(`${BASE_URL}/hospitals/approved`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch hospitals.");
  return data;
  // Array of { id, hospitalId, name, city, address, departments[], imageUrl, image, rating, ... }
};

// Single hospital details
export const fetchHospitalById = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch hospital.");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// HOSPITALS — Admin
// ─────────────────────────────────────────────────────────────────────────────

export const fetchAllHospitals = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/all`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch hospitals.");
  return data;
};

export const fetchPendingHospitals = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/pending`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch pending hospitals.");
  return data;
};

export const approveHospital = async (hospitalId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/approve`, {
    method: "PUT",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Approval failed.");
  return data;
};

export const rejectHospital = async (hospitalId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/hospitals/${hospitalId}/reject`, {
    method: "PUT",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Rejection failed.");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// DOCTORS
// ─────────────────────────────────────────────────────────────────────────────

// Get all doctors for a hospital
export const fetchDoctors = async (hospitalId) => {
  const res = await fetch(`${BASE_URL}/doctors/${hospitalId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch doctors.");
  return data;
  // Array of Doctor objects with timingsJson field
};

// Get doctors filtered by department
export const fetchDoctorsByDepartment = async (hospitalId, department) => {
  const res = await fetch(
    `${BASE_URL}/doctors/${hospitalId}/department/${encodeURIComponent(department)}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch doctors.");
  return data;
};

// Staff: Add a doctor to their hospital
export const addDoctor = async (hospitalId, doctorData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${hospitalId}`, {
    method: "POST",
    headers,
    body: JSON.stringify(doctorData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add doctor.");
  return data;
};

// Staff: Update doctor timings
export const updateDoctorTimings = async (doctorId, timingsJson) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}/timings`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ timingsJson }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update timings.");
  return data;
};

// Staff: Delete a doctor
export const deleteDoctor = async (doctorId) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/doctors/${doctorId}`, {
    method: "DELETE",
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete doctor.");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS — Patient
// ─────────────────────────────────────────────────────────────────────────────

// Book a token (patient)
export const bookToken = async (appointmentData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/book`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Booking failed.");
  return data; // Token object
};

// Get patient's token history
export const fetchMyTokens = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/my`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch tokens.");
  return data;
};

// Get patient's current active token (for home screen hero card)
export const fetchMyActiveToken = async () => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/my/active`, { headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch active token.");
  return data; // Token object or null
};

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS — Queue (public read)
// ─────────────────────────────────────────────────────────────────────────────

// Live active queue for a doctor slot
export const fetchActiveQueue = async (hospitalId, department, doctor, slot, date) => {
  const params = new URLSearchParams({ hospitalId, department, doctor, slot });
  if (date) params.append("date", date);
  const res = await fetch(`${BASE_URL}/tokens/queue?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch queue.");
  return data; // Array of Token objects
};

// Queue summary (counts, currently serving)
export const fetchQueueSummary = async (hospitalId, department, doctor, slot, date) => {
  const params = new URLSearchParams({ hospitalId, department, doctor, slot });
  if (date) params.append("date", date);
  const res = await fetch(`${BASE_URL}/tokens/summary?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch summary.");
  return data;
  // { totalBooked, waitingCount, completedCount, skippedCount, currentServingNo, currentServing }
};

// All tokens in a slot (including completed/skipped)
export const fetchAllInSlot = async (hospitalId, department, doctor, slot, date) => {
  const params = new URLSearchParams({ hospitalId, department, doctor, slot });
  if (date) params.append("date", date);
  const res = await fetch(`${BASE_URL}/tokens/slot?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch slot tokens.");
  return data;
};

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS — Staff queue management
// ─────────────────────────────────────────────────────────────────────────────

// Staff: book walk-in token
export const bookWalkInToken = async (appointmentData) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/walkin`, {
    method: "POST",
    headers,
    body: JSON.stringify(appointmentData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Walk-in booking failed.");
  return data;
};

// Staff: Call next patient
export const callNextPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/next`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "No waiting patients.");
  return data;
};

// Staff: Complete current patient
export const completeCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/complete`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to complete.");
  return data;
};

// Staff: Skip current patient
export const skipCurrentPatient = async (hospitalId, department, doctor, slot, date) => {
  const headers = await authHeaders();
  const res = await fetch(`${BASE_URL}/tokens/skip`, {
    method: "POST",
    headers,
    body: JSON.stringify({ hospitalId, department, doctor, slot, date }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to skip.");
  return data;
};

// Staff: Get all tokens for hospital today
export const fetchHospitalDayTokens = async (hospitalId, date) => {
  const headers = await authHeaders();
  const params = date ? `?date=${date}` : "";
  const res = await fetch(`${BASE_URL}/tokens/hospital/${hospitalId}${params}`, {
    headers,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch tokens.");
  return data;
};