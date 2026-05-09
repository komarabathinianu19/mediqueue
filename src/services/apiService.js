// ─────────────────────────────────────────────────────────────────────────────
//  apiService.js  –  MediQueue Backend Client
//  Base URL: update to your Spring Boot server IP/domain
// ─────────────────────────────────────────────────────────────────────────────

import AsyncStorage from "@react-native-async-storage/async-storage";

// ── CONFIG ────────────────────────────────────────────────────────────────────
// Change this to your actual Spring Boot server address
const BASE_URL = "http://192.168.1.5:8085/api";

// ── STORAGE HELPERS ───────────────────────────────────────────────────────────

const getToken = async () => {
  return await AsyncStorage.getItem("authToken");
};

const saveToken = async (token) => {
  await AsyncStorage.setItem("authToken", token);
};

const saveUser = async (user) => {
  await AsyncStorage.setItem("currentUser", JSON.stringify(user));
};

export const getUser = async () => {
  const raw = await AsyncStorage.getItem("currentUser");
  return raw ? JSON.parse(raw) : null;
};

export const clearSession = async () => {
  await AsyncStorage.multiRemove(["authToken", "currentUser"]);
};

// ── REQUEST HELPERS ───────────────────────────────────────────────────────────

const authHeaders = async () => {
  const token = await getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Central fetch wrapper with consistent error handling.
 * Throws an Error with the server's error message on non-2xx responses.
 */
const request = async (method, path, body = null, requiresAuth = false) => {
  const headers = requiresAuth
    ? await authHeaders()
    : { "Content-Type": "application/json" };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, config);

  // Handle 204 No Content (e.g. DELETE)
  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    // Spring Boot returns { error: "message" } or { message: "..." }
    throw new Error(
      data?.error || data?.message || `Request failed (${response.status})`
    );
  }

  return data;
};

// ── AUTH APIs ─────────────────────────────────────────────────────────────────

/**
 * Register a new user (patient or staff).
 *
 * POST /api/auth/register
 *
 * Payload for PATIENT:
 * {
 *   fullName, phone, age, gender, bloodGroup, city,
 *   allergies, medicalNotes, emergencyContact,
 *   password, role: "PATIENT"
 * }
 *
 * Payload for STAFF:
 * {
 *   fullName, phone (or email), hospitalId,
 *   password, role: "STAFF"
 * }
 *
 * Returns: { token: string, role: "PATIENT" | "STAFF" | "ADMIN" }
 */
export const registerUser = async (payload) => {
  const data = await request("POST", "/auth/register", payload);
  await saveToken(data.token);
  await saveUser({ role: data.role, ...data });
  return data;
};

/**
 * Login for any role (patient, staff, admin).
 *
 * POST /api/auth/login
 * Body: { identifier: string (phone or email), password: string }
 *
 * Returns: { token: string, role: "PATIENT" | "STAFF" | "ADMIN" }
 */
export const loginUser = async (identifier, password) => {
  const data = await request("POST", "/auth/login", { identifier, password });
  await saveToken(data.token);
  await saveUser({ role: data.role, ...data });
  return data;
};

// ── PATIENT APIs ──────────────────────────────────────────────────────────────

/**
 * Get the logged-in patient's own profile.
 * GET /api/patients/me
 * Requires: Auth token
 */
export const getMyPatientProfile = async () => {
  return request("GET", "/patients/me", null, true);
};

/**
 * Update the logged-in patient's own profile.
 * PUT /api/patients/me
 * Requires: Auth token
 *
 * Body: Partial Patient fields
 */
export const updateMyPatientProfile = async (payload) => {
  return request("PUT", "/patients/me", payload, true);
};

/**
 * Get any patient by userId (staff/admin use).
 * GET /api/patients/:userId
 * Requires: Auth token
 */
export const getPatientByUserId = async (userId) => {
  return request("GET", `/patients/${userId}`, null, true);
};

// ── HOSPITAL APIs ─────────────────────────────────────────────────────────────

/**
 * Staff submits a new hospital registration.
 *
 * POST /api/hospitals
 * Requires: Auth token (staff role)
 *
 * Body:
 * {
 *   name, ownerName, phone, email, type, address, city,
 *   registrationNumber, licenseNumber, departments,
 *   numberOfDoctors, imageUrl, documentNames[], status: "PENDING"
 * }
 */
export const registerHospital = async (payload) => {
  return request("POST", "/hospitals", payload, true);
};

/**
 * Get all hospitals. Optionally filter by status or city.
 *
 * GET /api/hospitals
 * GET /api/hospitals?status=APPROVED
 * GET /api/hospitals?city=Hyderabad
 *
 * Public endpoint — no auth required.
 */
export const getHospitals = async ({ status, city } = {}) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (city) params.append("city", city);
  const query = params.toString() ? `?${params.toString()}` : "";
  return request("GET", `/hospitals${query}`);
};

/**
 * Get a single hospital by ID.
 * GET /api/hospitals/:id
 * Public endpoint.
 */
export const getHospitalById = async (id) => {
  return request("GET", `/hospitals/${id}`);
};

/**
 * Staff updates their hospital details.
 * PUT /api/hospitals/:id
 * Requires: Auth token
 */
export const updateHospital = async (id, payload) => {
  return request("PUT", `/hospitals/${id}`, payload, true);
};

/**
 * Admin approves or rejects a hospital.
 *
 * PATCH /api/hospitals/:id/status?status=APPROVED
 * Requires: Auth token (admin role)
 *
 * @param {string|number} id - Hospital ID
 * @param {"APPROVED"|"REJECTED"|"PENDING"} status
 */
export const updateHospitalStatus = async (id, status) => {
  return request("PATCH", `/hospitals/${id}/status?status=${status}`, null, true);
};

/**
 * Delete a hospital.
 * DELETE /api/hospitals/:id
 * Requires: Auth token (admin role)
 */
export const deleteHospital = async (id) => {
  return request("DELETE", `/hospitals/${id}`, null, true);
};
export const staffLogin = async (hospitalId, identifier, password) => {
  const response = await request("POST", "/api/auth/staff-login", {
    hospitalId: parseInt(hospitalId),
    identifier,   // email or phone
    password,
  });
  return response;
};