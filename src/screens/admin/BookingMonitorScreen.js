// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { COLORS } from "../../constants/colors";

// export default function BookingMonitorScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Booking Monitor</Text>
//       <Text style={styles.sub}>Hospital-wise bookings and token status.</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
//   title: { marginTop: 52, fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { marginTop: 10, color: COLORS.muted },
// });  
































import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { BASE_URL } from "../../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Helpers ────────────────────────────────────────────────────────────────

const today = () => new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

const STATUS_META = {
  waiting:   { label: "Waiting",   color: COLORS.warning,  bg: "#FFF7ED", icon: "time-outline" },
  serving:   { label: "Serving",   color: COLORS.primary,  bg: "#EFF6FF", icon: "person-outline" },
  completed: { label: "Completed", color: COLORS.success,  bg: "#ECFDF5", icon: "checkmark-circle-outline" },
  skipped:   { label: "Skipped",   color: COLORS.danger,   bg: "#FEF2F2", icon: "close-circle-outline" },
};

const PAYMENT_META = {
  SUCCESS: { label: "Paid",    color: COLORS.success },
  PENDING: { label: "Pending", color: COLORS.warning },
};

const fmt = (isoDate) => {
  if (!isoDate) return "—";
  const d = new Date(isoDate);
  return d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });
};

// ─── Token Card ─────────────────────────────────────────────────────────────

function TokenCard({ item }) {
  const st  = STATUS_META[item.status]  || STATUS_META.waiting;
  const pay = PAYMENT_META[item.paymentStatus] || PAYMENT_META.PENDING;

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.cardTop}>
        <View style={styles.tokenBadge}>
          <Text style={styles.tokenNo}>{item.tokenNo || `#${item.id}`}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.patientName}>{item.patientName || "—"}</Text>
          <Text style={styles.hospitalName}>{item.hospitalName || item.hospitalId}</Text>
        </View>
        {/* Status chip */}
        <View style={[styles.chip, { backgroundColor: st.bg }]}>
          <Ionicons name={st.icon} size={12} color={st.color} />
          <Text style={[styles.chipText, { color: st.color }]}>{st.label}</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailRow}>
        <Detail icon="medkit-outline"     value={item.department || "—"} />
        <Detail icon="person-circle-outline" value={item.doctor || "—"} />
        <Detail icon="calendar-outline"   value={item.date || "—"} />
      </View>
      <View style={styles.detailRow}>
        <Detail icon="time-outline"       value={item.slotLabel || item.slot || "—"} />
        <Detail icon="walk-outline"       value={item.visitType || "—"} />
        <Detail icon="phone-portrait-outline" value={item.bookingSource === "staff" ? "Walk-in" : "App"} />
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.footerTime}>
          <Ionicons name="create-outline" size={11} color={COLORS.muted} /> {fmt(item.createdAt)}
        </Text>
        <View style={[styles.payChip, { backgroundColor: pay.color + "22" }]}>
          <Text style={[styles.payText, { color: pay.color }]}>{pay.label}</Text>
        </View>
        {item.doctorFee != null && (
          <Text style={styles.fee}>₹{(item.doctorFee || 0) + (item.platformFee || 0)}</Text>
        )}
      </View>
    </View>
  );
}

function Detail({ icon, value }) {
  return (
    <View style={styles.detail}>
      <Ionicons name={icon} size={13} color={COLORS.muted} />
      <Text style={styles.detailText} numberOfLines={1}>{value}</Text>
    </View>
  );
}

// ─── Summary bar ─────────────────────────────────────────────────────────────

function SummaryBar({ tokens }) {
  const count = (s) => tokens.filter((t) => t.status === s).length;
  return (
    <View style={styles.summaryBar}>
      <SumItem label="Total"     value={tokens.length}    color={COLORS.text} />
      <SumItem label="Waiting"   value={count("waiting")} color={COLORS.warning} />
      <SumItem label="Serving"   value={count("serving")} color={COLORS.primary} />
      <SumItem label="Done"      value={count("completed")} color={COLORS.success} />
      <SumItem label="Skipped"   value={count("skipped")} color={COLORS.danger} />
    </View>
  );
}

function SumItem({ label, value, color }) {
  return (
    <View style={styles.sumItem}>
      <Text style={[styles.sumValue, { color }]}>{value}</Text>
      <Text style={styles.sumLabel}>{label}</Text>
    </View>
  );
}

// ─── Filter pills ─────────────────────────────────────────────────────────────

const STATUS_FILTERS = ["all", "waiting", "serving", "completed", "skipped"];

function FilterPills({ active, onChange }) {
  return (
    <View style={styles.pills}>
      {STATUS_FILTERS.map((f) => {
        const sel = f === active;
        const meta = STATUS_META[f];
        return (
          <TouchableOpacity
            key={f}
            style={[styles.pill, sel && { backgroundColor: meta ? meta.color : COLORS.admin }]}
            onPress={() => onChange(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.pillText, sel && { color: "#fff" }]}>
              {f === "all" ? "All" : (meta?.label || f)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function BookingMonitorScreen() {
  const [tokens, setTokens]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError]         = useState(null);

  const [date, setDate]           = useState(today());
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatus] = useState("all");
  const [showAll, setShowAll]     = useState(false); // false = today only

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchTokens = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const dateParam = showAll ? "" : `?date=${date}`;
      const res = await fetch(`${BASE_URL}/admin/allTokens${dateParam}`, { headers });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      setTokens(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [date, showAll]);

  useEffect(() => { fetchTokens(); }, [fetchTokens]);

  const onRefresh = () => { setRefreshing(true); fetchTokens(true); };

  // ── Filter + search ────────────────────────────────────────────────────────
  const visible = tokens.filter((t) => {
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (t.patientName || "").toLowerCase().includes(q) ||
      (t.hospitalName || "").toLowerCase().includes(q) ||
      (t.doctor || "").toLowerCase().includes(q) ||
      (t.department || "").toLowerCase().includes(q) ||
      (t.tokenNo || "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Booking Monitor</Text>
          <Text style={styles.sub}>All hospital token bookings</Text>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={() => fetchTokens()}>
          <Ionicons name="refresh" size={20} color={COLORS.admin} />
        </TouchableOpacity>
      </View>

      {/* Date toggle + input */}
      <View style={styles.dateRow}>
        <TouchableOpacity
          style={[styles.toggleBtn, !showAll && styles.toggleActive]}
          onPress={() => setShowAll(false)}
        >
          <Ionicons name="calendar-outline" size={14} color={!showAll ? "#fff" : COLORS.admin} />
          <Text style={[styles.toggleText, !showAll && { color: "#fff" }]}>By Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, showAll && styles.toggleActive]}
          onPress={() => setShowAll(true)}
        >
          <Ionicons name="list-outline" size={14} color={showAll ? "#fff" : COLORS.admin} />
          <Text style={[styles.toggleText, showAll && { color: "#fff" }]}>All Time</Text>
        </TouchableOpacity>

        {!showAll && (
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={COLORS.muted}
            onBlur={() => fetchTokens()}
          />
        )}
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={16} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search patient, doctor, hospital..."
          placeholderTextColor={COLORS.muted}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={16} color={COLORS.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Status filter */}
      <FilterPills active={statusFilter} onChange={setStatus} />

      {/* Summary */}
      {tokens.length > 0 && <SummaryBar tokens={tokens} />}

      {/* List */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.admin} />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={48} color={COLORS.danger} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => fetchTokens()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : visible.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="receipt-outline" size={52} color={COLORS.border} />
          <Text style={styles.emptyTitle}>No bookings found</Text>
          <Text style={styles.emptyText}>
            {search || statusFilter !== "all"
              ? "Try changing your filters"
              : showAll
              ? "No tokens booked yet"
              : `No tokens booked on ${date}`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TokenCard item={item} />}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.admin]}
              tintColor={COLORS.admin}
            />
          }
          ListHeaderComponent={
            <Text style={styles.countText}>
              Showing {visible.length} of {tokens.length} booking{tokens.length !== 1 ? "s" : ""}
            </Text>
          }
        />
      )}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },

  header:        { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 52, marginBottom: 14 },
  title:         { fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub:           { marginTop: 2, fontSize: 13, color: COLORS.muted },
  refreshBtn:    { padding: 8, backgroundColor: "#EDE9FE", borderRadius: 10 },

  dateRow:       { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  toggleBtn:     { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1.5, borderColor: COLORS.admin },
  toggleActive:  { backgroundColor: COLORS.admin },
  toggleText:    { fontSize: 12, fontWeight: "600", color: COLORS.admin },
  dateInput:     { flex: 1, borderWidth: 1.5, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7, fontSize: 13, color: COLORS.text, backgroundColor: COLORS.card },

  searchBox:     { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.card, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, borderWidth: 1, borderColor: COLORS.border, marginBottom: 10, gap: 8 },
  searchInput:   { flex: 1, fontSize: 14, color: COLORS.text },

  pills:         { flexDirection: "row", gap: 6, marginBottom: 10, flexWrap: "wrap" },
  pill:          { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  pillText:      { fontSize: 12, fontWeight: "600", color: COLORS.muted },

  summaryBar:    { flexDirection: "row", backgroundColor: COLORS.card, borderRadius: 12, padding: 12, marginBottom: 12, justifyContent: "space-around", borderWidth: 1, borderColor: COLORS.border },
  sumItem:       { alignItems: "center" },
  sumValue:      { fontSize: 18, fontWeight: "800" },
  sumLabel:      { fontSize: 11, color: COLORS.muted, marginTop: 2 },

  countText:     { fontSize: 12, color: COLORS.muted, marginBottom: 8 },

  card:          { backgroundColor: COLORS.card, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, ...Platform.select({ ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 }, android: { elevation: 2 } }) },
  cardTop:       { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  tokenBadge:    { backgroundColor: "#EDE9FE", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, minWidth: 50, alignItems: "center" },
  tokenNo:       { fontSize: 15, fontWeight: "800", color: COLORS.admin },
  patientName:   { fontSize: 15, fontWeight: "700", color: COLORS.text },
  hospitalName:  { fontSize: 12, color: COLORS.muted, marginTop: 1 },
  chip:          { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  chipText:      { fontSize: 11, fontWeight: "700" },

  detailRow:     { flexDirection: "row", gap: 6, marginBottom: 4, flexWrap: "wrap" },
  detail:        { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: COLORS.background, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  detailText:    { fontSize: 12, color: COLORS.text, maxWidth: 100 },

  cardFooter:    { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  footerTime:    { fontSize: 11, color: COLORS.muted, flex: 1 },
  payChip:       { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  payText:       { fontSize: 11, fontWeight: "700" },
  fee:           { fontSize: 12, fontWeight: "700", color: COLORS.text },

  center:        { flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 60 },
  loadingText:   { marginTop: 12, color: COLORS.muted, fontSize: 14 },
  errorText:     { marginTop: 10, color: COLORS.danger, fontSize: 14, textAlign: "center" },
  retryBtn:      { marginTop: 14, backgroundColor: COLORS.admin, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20 },
  retryText:     { color: "#fff", fontWeight: "700" },
  emptyTitle:    { marginTop: 12, fontSize: 16, fontWeight: "700", color: COLORS.text },
  emptyText:     { marginTop: 6, fontSize: 13, color: COLORS.muted, textAlign: "center" },
});