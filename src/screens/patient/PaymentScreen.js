




// // src/screens/patient/PaymentScreen.js
// //
// // ✅ Works on:  Expo Go (Android & iOS)
// // ✅ Works on:  Expo Web (browser)
// // ✅ Works on:  Native / EAS build
// //
// // Strategy:
// //   • Web  → window.Razorpay via <script> tag (standard browser checkout)
// //   • Mobile (Expo Go & native) → expo-web-view renders Razorpay HTML page
// //     and posts result back via window.ReactNativeWebView.postMessage()

// import React, { useState, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
//   Modal,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { WebView } from "react-native-webview";
// import { COLORS } from "../../constants/colors";
// import { bookToken, BASE_URL } from "../../services/apiService";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // ─── Razorpay Key (Test) — swap to live key when going live ───────────────────
// const RAZORPAY_KEY_ID = "rzp_test_Sqk3fiqKhObzAs"; // ← paste your test key here

// // ─── Build the HTML page that Razorpay opens inside WebView ──────────────────
// // ✅ UPDATED: Added UPI intent config so PhonePe / GPay / Paytm appear as buttons
// const buildRazorpayHTML = ({ orderId, amount, keyId, hospitalName, department, patientName, patientPhone, patientEmail }) => `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
//   <style>
//     * { margin: 0; padding: 0; box-sizing: border-box; }
//     body {
//       background: #0f172a;
//       display: flex; align-items: center; justify-content: center;
//       height: 100vh; font-family: sans-serif;
//     }
//     .loader { text-align: center; color: #94a3b8; }
//     .dot {
//       display: inline-block; width: 10px; height: 10px;
//       border-radius: 50%; background: #3b82f6; margin: 0 4px;
//       animation: bounce 1.2s infinite ease-in-out;
//     }
//     .dot:nth-child(2) { animation-delay: 0.2s; }
//     .dot:nth-child(3) { animation-delay: 0.4s; }
//     @keyframes bounce {
//       0%, 80%, 100% { transform: scale(0); }
//       40% { transform: scale(1); }
//     }
//     p { margin-top: 16px; font-size: 14px; }
//   </style>
// </head>
// <body>
//   <div class="loader">
//     <div class="dot"></div>
//     <div class="dot"></div>
//     <div class="dot"></div>
//     <p>Opening Razorpay...</p>
//   </div>

//   <script>
//     function postMsg(data) {
//       if (window.ReactNativeWebView) {
//         window.ReactNativeWebView.postMessage(JSON.stringify(data));
//       }
//     }

//     window.onload = function () {
//       var options = {
//         key: "${keyId}",
//         amount: ${amount * 100},
//         currency: "INR",
//         order_id: "${orderId}",
//         name: "${hospitalName}",
//         description: "Appointment - ${department}",
//         prefill: {
//           name: "${patientName}",
//           contact: "${patientPhone}",
//           email: "${patientEmail}"
//         },
//         // ✅ This config makes PhonePe / Google Pay / Paytm appear as direct buttons
//         config: {
//           display: {
//             blocks: {
//               upi_block: {
//                 name: "Pay via UPI App",
//                 instruments: [
//                   { method: "upi", flows: ["intent"] }
//                 ]
//               }
//             },
//             sequence: ["block.upi_block"],
//             preferences: { show_default_blocks: true }
//           }
//         },
//         theme: { color: "#3B82F6" },
//         handler: function (response) {
//           postMsg({ type: "PAYMENT_SUCCESS", data: response });
//         },
//         modal: {
//           ondismiss: function () {
//             postMsg({ type: "PAYMENT_CANCELLED" });
//           }
//         }
//       };

//       var rzp = new Razorpay(options);
//       rzp.on("payment.failed", function (response) {
//         postMsg({ type: "PAYMENT_FAILED", error: response.error.description });
//       });
//       rzp.open();
//     };
//   </script>
// </body>
// </html>
// `;

// // ─── Main Screen ──────────────────────────────────────────────────────────────
// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};

//   const [loading, setLoading]               = useState(false);
//   const [showWebView, setShowWebView]       = useState(false);
//   const [razorpayHTML, setRazorpayHTML]     = useState("");
//   const [currentOrderId, setCurrentOrderId] = useState(null);
//   const [currentToken, setCurrentToken]     = useState(null);
//   const webViewRef                          = useRef(null);

//   const platformFee = appointment?.platformFee || 2;
//   const doctorFee   = appointment?.doctorFee   || 500;
//   const totalAmount = doctorFee + platformFee;

//   // ── Step 1: Create order on backend ────────────────────────────────────────
//   const createOrder = async () => {
//     const patientId = (await AsyncStorage.getItem("patientId")) || "guest";
//     const token     = await AsyncStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}/payments/create-order`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify({
//         hospitalId:      appointment.hospitalId,
//         amount:          totalAmount,
//         patientId,
//         patientName:     appointment.patientName,
//         appointmentDate: appointment.date,
//         slotLabel:       appointment.slotLabel || appointment.slot,
//         doctorId:        appointment.doctorId,
//       }),
//     });

//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to create payment order");
//     }
//     return res.json(); // { orderId, keyId, amount, currency }
//   };

//   // ── Step 2: Verify payment on backend ──────────────────────────────────────
//   const verifyPayment = async (paymentResponse, token) => {
//     const res = await fetch(`${BASE_URL}/payments/verify`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//       body: JSON.stringify({
//         razorpay_order_id:   paymentResponse.razorpay_order_id,
//         razorpay_payment_id: paymentResponse.razorpay_payment_id,
//         razorpay_signature:  paymentResponse.razorpay_signature,
//       }),
//     });

//     if (!res.ok) throw new Error("Payment verification failed");
//     return res.json();
//   };

//   // ── Step 3: Book token after verified payment ───────────────────────────────
//   const finishBooking = async (paymentId) => {
//     const booked = await bookToken({
//       ...appointment,
//       doctorFee,
//       platformFee,
//       totalAmount,
//       paymentMethod:     "RAZORPAY",
//       paymentStatus:     "SUCCESS",
//       paymentId,
//       appointmentStatus: "CONFIRMED",
//     });
//     navigation.replace("TokenSuccess", { token: booked });
//   };

//   // ── Handle messages from WebView (mobile) ──────────────────────────────────
//   const handleWebViewMessage = async (event) => {
//     try {
//       const msg = JSON.parse(event.nativeEvent.data);

//       if (msg.type === "PAYMENT_SUCCESS") {
//         setShowWebView(false);
//         setLoading(true);
//         try {
//           const token = await AsyncStorage.getItem("token");
//           await verifyPayment(msg.data, token);
//           await finishBooking(msg.data.razorpay_payment_id);
//         } catch (err) {
//           Alert.alert("Error", err.message || "Verification failed. Contact support.");
//         } finally {
//           setLoading(false);
//         }

//       } else if (msg.type === "PAYMENT_CANCELLED") {
//         setShowWebView(false);
//         setLoading(false);
//         Alert.alert("Cancelled", "Payment was cancelled.");

//       } else if (msg.type === "PAYMENT_FAILED") {
//         setShowWebView(false);
//         setLoading(false);
//         Alert.alert("Payment Failed", msg.error || "Something went wrong.");
//       }
//     } catch (e) {
//       // ignore non-JSON messages from Razorpay internals
//     }
//   };

//   // ── Main pay handler ────────────────────────────────────────────────────────
//   const handlePay = async () => {
//     if (!appointment) {
//       Alert.alert("Error", "Appointment details missing.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const orderData = await createOrder();
//       const keyId     = orderData.keyId || RAZORPAY_KEY_ID;

//       if (Platform.OS === "web") {
//         // ── WEB: load Razorpay checkout.js into browser ────────────────────
//         const loaded = await loadRazorpayWebScript();
//         if (!loaded) throw new Error("Could not load Razorpay. Check your internet.");

//         const token = await AsyncStorage.getItem("token");

//         // ✅ UPDATED: Added prefill contact/email + UPI intent config
//         const options = {
//           key:         keyId,
//           amount:      totalAmount * 100,
//           currency:    "INR",
//           order_id:    orderData.orderId,
//           name:        appointment.hospitalName,
//           description: `Appointment - ${appointment.department}`,
//           prefill: {
//             name:    appointment.patientName,
//             contact: appointment.patientPhone || "",
//             email:   appointment.patientEmail || "",
//           },
//           // ✅ This config makes PhonePe / Google Pay / Paytm appear as direct buttons
//           config: {
//             display: {
//               blocks: {
//                 upi_block: {
//                   name: "Pay via UPI App",
//                   instruments: [
//                     { method: "upi", flows: ["intent"] }
//                   ],
//                 },
//               },
//               sequence: ["block.upi_block"],
//               preferences: { show_default_blocks: true },
//             },
//           },
//           theme: { color: "#3B82F6" },
//           handler: async (response) => {
//             setLoading(true);
//             try {
//               await verifyPayment(response, token);
//               await finishBooking(response.razorpay_payment_id);
//             } catch (err) {
//               Alert.alert("Error", err.message);
//             } finally {
//               setLoading(false);
//             }
//           },
//           modal: {
//             ondismiss: () => setLoading(false),
//           },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.on("payment.failed", (r) => {
//           setLoading(false);
//           Alert.alert("Payment Failed", r.error.description);
//         });
//         rzp.open();

//       } else {
//         // ── MOBILE (Expo Go + native): use WebView ─────────────────────────
//         const html = buildRazorpayHTML({
//           orderId:      orderData.orderId,
//           amount:       totalAmount,
//           keyId,
//           hospitalName: appointment.hospitalName || "Hospital",
//           department:   appointment.department   || "OPD",
//           patientName:  appointment.patientName  || "Patient",
//           patientPhone: appointment.patientPhone || "",   // ✅ NEW
//           patientEmail: appointment.patientEmail || "",   // ✅ NEW
//         });

//         setCurrentOrderId(orderData.orderId);
//         setCurrentToken(await AsyncStorage.getItem("token"));
//         setRazorpayHTML(html);
//         setLoading(false);
//         setShowWebView(true);
//       }

//     } catch (err) {
//       Alert.alert("Error", err.message || "Could not initiate payment.");
//       setLoading(false);
//     }
//   };

//   // ── Pay at Hospital ─────────────────────────────────────────────────────────
//   const handlePayAtHospital = async () => {
//     setLoading(true);
//     try {
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod:     "PAY_AT_HOSPITAL",
//         paymentStatus:     "PAY_AT_HOSPITAL",
//         paymentId:         `PAH-${Date.now()}`,
//         appointmentStatus: "CONFIRMED",
//       });
//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Booking Failed", err.message || "Could not book token.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Empty state ─────────────────────────────────────────────────────────────
//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>Please go back and book your token again.</Text>
//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // ── Main UI ─────────────────────────────────────────────────────────────────
//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.contentContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//             <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//           </TouchableOpacity>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.title}>Payment</Text>
//             <Text style={styles.sub}>Review and confirm your appointment</Text>
//           </View>
//         </View>

//         {/* Doctor card */}
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.doctorCard}
//         >
//           <View style={styles.iconCircle}>
//             <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//           </View>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//             <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//             <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//           </View>
//         </LinearGradient>

//         {/* Appointment details */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Appointment Details</Text>
//           <InfoRow icon="calendar-outline"     label="Date"       value={appointment?.displayDate || appointment?.date} />
//           <InfoRow icon="time-outline"          label="Slot"       value={`${appointment?.slotLabel || appointment?.slot || "—"}${appointment?.slotTime ? ` • ${appointment.slotTime}` : ""}`} />
//           <InfoRow icon="person-outline"        label="Patient"    value={`${appointment?.patientName || "—"}, ${appointment?.age || "—"} yrs`} />
//           <InfoRow icon="document-text-outline" label="Visit Type" value={appointment?.visitType} />
//         </View>

//         {/* Fee summary */}
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Fee Summary</Text>
//           <AmountRow label="Doctor Consultation Fee" value={doctorFee} />
//           <AmountRow label="Platform Fee"            value={platformFee} />
//           <View style={styles.divider} />
//           <View style={styles.totalRow}>
//             <Text style={styles.totalLabel}>Total Payable</Text>
//             <Text style={styles.totalValue}>₹{totalAmount}</Text>
//           </View>
//         </View>

//         {/* Security note */}
//         <View style={styles.secureNote}>
//           <Ionicons name="shield-checkmark-outline" size={16} color="#10B981" />
//           <Text style={styles.secureText}>100% secure payments powered by Razorpay</Text>
//         </View>

//         {/* Pay with Razorpay button */}
//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={handlePay}
//           disabled={loading}
//         >
//           <LinearGradient
//             colors={["#1a73e8", "#0d47a1"]}
//             style={[styles.payButton, loading && { opacity: 0.7 }]}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <>
//                 <Ionicons name="lock-closed-outline" size={20} color="#fff" />
//                 <Text style={styles.payButtonText}>Pay ₹{totalAmount} with Razorpay</Text>
//               </>
//             )}
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* Divider */}
//         <View style={styles.orRow}>
//           <View style={styles.orLine} />
//           <Text style={styles.orText}>OR</Text>
//           <View style={styles.orLine} />
//         </View>

//         {/* Pay at hospital button */}
//         <TouchableOpacity
//           style={[styles.hospitalButton, loading && { opacity: 0.6 }]}
//           activeOpacity={0.85}
//           onPress={handlePayAtHospital}
//           disabled={loading}
//         >
//           <Ionicons name="business-outline" size={20} color={COLORS.text} />
//           <Text style={styles.hospitalButtonText}>Pay at Hospital</Text>
//         </TouchableOpacity>

//         <Text style={styles.hospitalNote}>
//           Token will be reserved but payment is due at the hospital counter.
//         </Text>

//         <View style={{ height: 30 }} />
//       </ScrollView>

//       {/* ── WebView Modal for Razorpay (mobile only) ── */}
//       {Platform.OS !== "web" && (
//         <Modal
//           visible={showWebView}
//           animationType="slide"
//           transparent={false}
//           onRequestClose={() => {
//             setShowWebView(false);
//             setLoading(false);
//           }}
//         >
//           <View style={styles.webViewContainer}>
//             {/* Close bar */}
//             <View style={styles.webViewTopBar}>
//               <TouchableOpacity
//                 style={styles.webViewCloseBtn}
//                 onPress={() => {
//                   setShowWebView(false);
//                   setLoading(false);
//                 }}
//               >
//                 <Ionicons name="close" size={22} color={COLORS.text} />
//               </TouchableOpacity>
//               <Text style={styles.webViewTitle}>Secure Payment</Text>
//               <View style={styles.webViewLock}>
//                 <Ionicons name="lock-closed" size={14} color="#10B981" />
//                 <Text style={styles.webViewLockText}>Razorpay</Text>
//               </View>
//             </View>

//             {/* Razorpay WebView */}
//             <WebView
//               ref={webViewRef}
//               source={{ html: razorpayHTML }}
//               onMessage={handleWebViewMessage}
//               javaScriptEnabled={true}
//               domStorageEnabled={true}
//               originWhitelist={["*"]}
//               // ✅ Required for UPI intent to open PhonePe / GPay / Paytm app
//               setSupportMultipleWindows={false}
//               onShouldStartLoadWithRequest={(request) => {
//                 const { url } = request;
//                 // Allow UPI deep links to pass through to the OS
//                 if (
//                   url.startsWith("intent://") ||
//                   url.startsWith("upi://") ||
//                   url.startsWith("phonepe://") ||
//                   url.startsWith("paytmmp://") ||
//                   url.startsWith("tez://") ||
//                   url.startsWith("gpay://")
//                 ) {
//                   // On Android these are handled automatically by the OS via intent://
//                   // On iOS the Linking API is needed — but UPI apps are Android-only anyway
//                   return false; // let Android handle it natively
//                 }
//                 return true;
//               }}
//               style={{ flex: 1 }}
//               startInLoadingState={true}
//               renderLoading={() => (
//                 <View style={styles.webViewLoading}>
//                   <ActivityIndicator size="large" color={COLORS.primary} />
//                   <Text style={styles.webViewLoadingText}>Loading payment gateway...</Text>
//                 </View>
//               )}
//             />
//           </View>
//         </Modal>
//       )}
//     </View>
//   );
// }

// // ─── Load Razorpay script for web ─────────────────────────────────────────────
// function loadRazorpayWebScript() {
//   return new Promise((resolve) => {
//     if (typeof window === "undefined") return resolve(false);
//     if (window.Razorpay) return resolve(true);
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload  = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────
// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>
//       <Text style={styles.infoValue}>{value || "—"}</Text>
//     </View>
//   );
// }

// function AmountRow({ label, value }) {
//   return (
//     <View style={styles.amountRow}>
//       <Text style={styles.amountLabel}>{label}</Text>
//       <Text style={styles.amountValue}>₹{value}</Text>
//     </View>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   contentContainer: {
//     paddingHorizontal: 18,
//     paddingBottom: 20,
//   },

//   // Header
//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   backBtn: {
//     width: 44, height: 44, borderRadius: 16,
//     backgroundColor: COLORS.card,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub:   { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

//   // Doctor card
//   doctorCard: {
//     borderRadius: 28, padding: 18,
//     flexDirection: "row", alignItems: "center",
//     gap: 14, marginBottom: 16,
//   },
//   iconCircle: {
//     width: 58, height: 58, borderRadius: 20,
//     backgroundColor: "#fff",
//     alignItems: "center", justifyContent: "center",
//   },
//   doctorName: { color: "#fff", fontSize: 20, fontWeight: "900" },
//   doctorMeta: { color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: "700" },

//   // Generic card
//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24, padding: 16,
//     marginBottom: 16,
//     borderWidth: 1, borderColor: COLORS.border,
//     elevation: 2,
//   },
//   cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: "900", marginBottom: 12 },

//   // Info rows
//   infoRow: {
//     flexDirection: "row", justifyContent: "space-between",
//     alignItems: "center", paddingVertical: 10, gap: 12,
//   },
//   infoLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
//   infoLabel: { color: COLORS.muted, fontWeight: "800" },
//   infoValue: { color: COLORS.text, fontWeight: "900", maxWidth: "56%", textAlign: "right" },

//   // Amount rows
//   amountRow:  { flexDirection: "row", justifyContent: "space-between", paddingVertical: 9 },
//   amountLabel:{ color: COLORS.muted, fontWeight: "800" },
//   amountValue:{ color: COLORS.text,  fontWeight: "900" },
//   divider:    { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
//   totalRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
//   totalLabel: { color: COLORS.text, fontSize: 17, fontWeight: "900" },
//   totalValue: { color: COLORS.primary, fontSize: 24, fontWeight: "900" },

//   // Secure note
//   secureNote: {
//     flexDirection: "row", alignItems: "center", justifyContent: "center",
//     gap: 6, marginBottom: 14,
//   },
//   secureText: { color: "#10B981", fontWeight: "700", fontSize: 13 },

//   // Pay button
//   payButton: {
//     minHeight: 58, borderRadius: 18,
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     marginBottom: 16, paddingHorizontal: 16,
//     elevation: 3,
//   },
//   payButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },

//   // OR divider
//   orRow:  { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
//   orLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
//   orText: { color: COLORS.muted, fontWeight: "800", fontSize: 13 },

//   // Pay at hospital button
//   hospitalButton: {
//     minHeight: 54, borderRadius: 18,
//     backgroundColor: COLORS.card,
//     borderWidth: 1, borderColor: COLORS.border,
//     alignItems: "center", justifyContent: "center",
//     flexDirection: "row", gap: 8,
//     marginBottom: 10, paddingHorizontal: 16,
//   },
//   hospitalButtonText: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
//   hospitalNote: {
//     color: COLORS.muted, textAlign: "center",
//     fontSize: 12, fontWeight: "600", marginBottom: 6,
//   },

//   // Empty state
//   emptyContainer: {
//     flex: 1, backgroundColor: COLORS.background,
//     alignItems: "center", justifyContent: "center", padding: 24,
//   },
//   emptyTitle:  { marginTop: 14, color: COLORS.text, fontSize: 22, fontWeight: "900" },
//   emptyText:   { marginTop: 8, color: COLORS.muted, fontWeight: "700", textAlign: "center" },
//   emptyButton: {
//     marginTop: 22, height: 52, borderRadius: 16,
//     paddingHorizontal: 28, alignItems: "center", justifyContent: "center",
//   },
//   emptyButtonText: { color: "#fff", fontWeight: "900", fontSize: 15 },

//   // WebView Modal
//   webViewContainer: { flex: 1, backgroundColor: COLORS.background },
//   webViewTopBar: {
//     flexDirection: "row", alignItems: "center",
//     paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
//     backgroundColor: COLORS.card,
//     borderBottomWidth: 1, borderBottomColor: COLORS.border,
//     gap: 12,
//   },
//   webViewCloseBtn: {
//     width: 38, height: 38, borderRadius: 12,
//     backgroundColor: COLORS.background,
//     alignItems: "center", justifyContent: "center",
//     borderWidth: 1, borderColor: COLORS.border,
//   },
//   webViewTitle: {
//     flex: 1, fontSize: 17, fontWeight: "900", color: COLORS.text,
//   },
//   webViewLock: {
//     flexDirection: "row", alignItems: "center", gap: 4,
//     backgroundColor: "#ECFDF5", paddingHorizontal: 10, paddingVertical: 5,
//     borderRadius: 20, borderWidth: 1, borderColor: "#6EE7B7",
//   },
//   webViewLockText: { color: "#10B981", fontWeight: "800", fontSize: 12 },
//   webViewLoading: {
//     position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//     alignItems: "center", justifyContent: "center",
//     backgroundColor: COLORS.background,
//   },
//   webViewLoadingText: {
//     marginTop: 12, color: COLORS.muted, fontWeight: "700",
//   },
// });  










































// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("UPI");

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee = appointment?.doctorFee || 500;
//   const totalAmount = doctorFee + platformFee;

//   const paymentId = useMemo(() => {
//     return `PAY-${Date.now()}`;
//   }, []);

//   const confirmPayment = () => {
//     if (!appointment) {
//       Alert.alert("Missing Appointment", "Please book an appointment again.");
//       navigation.goBack();
//       return;
//     }

//     const token = bookToken({
//       ...appointment,
//       doctorFee,
//       platformFee,
//       totalAmount,
//       paymentMethod: selectedMethod,
//       paymentStatus:
//         selectedMethod === "Pay at Hospital" ? "PAY_AT_HOSPITAL" : "SUCCESS",
//       paymentId:
//         selectedMethod === "Pay at Hospital"
//           ? `PAY-HOSPITAL-${Date.now()}`
//           : paymentId,
//       appointmentStatus: "CONFIRMED",
//     });

//     navigation.replace("TokenSuccess", { token });
//   };

//   const payNow = () => {
//     if (Platform.OS === "web") {
//       const ok = window.confirm(
//         `Pay ₹${totalAmount} using ${selectedMethod}?`
//       );

//       if (ok) {
//         confirmPayment();
//       }

//       return;
//     }

//     Alert.alert(
//       "Confirm Payment",
//       `Pay ₹${totalAmount} using ${selectedMethod}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Pay Now", onPress: confirmPayment },
//       ]
//     );
//   };

//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>
//           Please go back and book your token again.
//         </Text>

//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Review and confirm your appointment</Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.doctorCard}
//       >
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Appointment Details</Text>

//         <InfoRow
//           icon="calendar-outline"
//           label="Date"
//           value={appointment?.displayDate || appointment?.date}
//         />

//         <InfoRow
//           icon="time-outline"
//           label="Slot"
//           value={`${appointment?.slotLabel || appointment?.slot || "-"}${
//             appointment?.slotTime ? ` • ${appointment.slotTime}` : ""
//           }`}
//         />

//         <InfoRow
//           icon="person-outline"
//           label="Patient"
//           value={`${appointment?.patientName || "-"}, ${
//             appointment?.age || "-"
//           } yrs`}
//         />

//         <InfoRow
//           icon="document-text-outline"
//           label="Visit Type"
//           value={appointment?.visitType}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Payment Method</Text>

//         {["UPI", "Card", "Net Banking", "Pay at Hospital"].map((method) => (
//           <TouchableOpacity
//             key={method}
//             style={[
//               styles.methodRow,
//               selectedMethod === method && styles.activeMethodRow,
//             ]}
//             onPress={() => setSelectedMethod(method)}
//           >
//             <View style={styles.methodLeft}>
//               <Ionicons
//                 name={
//                   method === "UPI"
//                     ? "phone-portrait-outline"
//                     : method === "Card"
//                     ? "card-outline"
//                     : method === "Net Banking"
//                     ? "globe-outline"
//                     : "business-outline"
//                 }
//                 size={20}
//                 color={selectedMethod === method ? COLORS.primary : COLORS.muted}
//               />

//               <Text
//                 style={[
//                   styles.methodText,
//                   selectedMethod === method && styles.activeMethodText,
//                 ]}
//               >
//                 {method}
//               </Text>
//             </View>

//             {selectedMethod === method && (
//               <Ionicons
//                 name="checkmark-circle"
//                 size={22}
//                 color={COLORS.primary}
//               />
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Fee Summary</Text>

//         <AmountRow label="Doctor Fee" value={doctorFee} />
//         <AmountRow label="Platform Fee" value={platformFee} />

//         <View style={styles.divider} />

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total Payable</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       <View style={styles.noteCard}>
//         <Ionicons
//           name="information-circle-outline"
//           size={22}
//           color={COLORS.warning}
//         />

//         <Text style={styles.noteText}>
//           Token will be generated only after payment confirmation.
//         </Text>
//       </View>

//       <TouchableOpacity activeOpacity={0.9} onPress={payNow}>
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.payButton}
//         >
//           <Ionicons
//             name={
//               selectedMethod === "Pay at Hospital"
//                 ? "business-outline"
//                 : "lock-closed-outline"
//             }
//             size={20}
//             color="#fff"
//           />

//           <Text style={styles.payButtonText}>
//             {selectedMethod === "Pay at Hospital"
//               ? `Confirm & Pay at Hospital`
//               : `Pay ₹${totalAmount} & Confirm`}
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function AmountRow({ label, value }) {
//   return (
//     <View style={styles.amountRow}>
//       <Text style={styles.amountLabel}>{label}</Text>
//       <Text style={styles.amountValue}>₹{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   contentContainer: {
//     paddingHorizontal: 18,
//     paddingBottom: 20,
//   },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   backBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   doctorCard: {
//     borderRadius: 28,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     marginBottom: 16,
//   },

//   iconCircle: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   doctorMeta: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   cardTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     gap: 12,
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "56%",
//     textAlign: "right",
//   },

//   methodRow: {
//     minHeight: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   activeMethodRow: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },

//   methodLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   methodText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },

//   activeMethodText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },

//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 9,
//   },

//   amountLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   amountValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   totalLabel: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   totalValue: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: "900",
//   },

//   noteCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },

//   noteText: {
//     flex: 1,
//     color: COLORS.warning,
//     fontWeight: "800",
//   },

//   payButton: {
//     minHeight: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//     paddingHorizontal: 16,
//   },

//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//     textAlign: "center",
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 14,
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },

//   emptyText: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontWeight: "700",
//     textAlign: "center",
//   },

//   emptyButton: {
//     marginTop: 22,
//     height: 52,
//     borderRadius: 16,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  
































// import React, { useMemo, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();

//   const [selectedMethod, setSelectedMethod] = useState("UPI");

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee = appointment?.doctorFee || 500;
//   const totalAmount = doctorFee + platformFee;

//   const paymentId = useMemo(() => {
//     return `PAY-${Date.now()}`;
//   }, []);

//   const confirmPayment = async () => {
//     if (!appointment) {
//       Alert.alert("Missing Appointment", "Please book an appointment again.");
//       navigation.goBack();
//       return;
//     }
//     try {
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod: selectedMethod,
//         paymentStatus:
//           selectedMethod === "Pay at Hospital" ? "PAY_AT_HOSPITAL" : "SUCCESS",
//         paymentId:
//           selectedMethod === "Pay at Hospital"
//             ? `PAY-HOSPITAL-${Date.now()}`
//             : paymentId,
//         appointmentStatus: "CONFIRMED",
//       });
//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Booking Failed", err.message || "Could not book token. Please try again.");
//     }
//   };

//   const payNow = () => {
//     if (Platform.OS === "web") {
//       const ok = window.confirm(
//         `Pay ₹${totalAmount} using ${selectedMethod}?`
//       );

//       if (ok) {
//         confirmPayment();
//       }

//       return;
//     }

//     Alert.alert(
//       "Confirm Payment",
//       `Pay ₹${totalAmount} using ${selectedMethod}?`,
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Pay Now", onPress: confirmPayment },
//       ]
//     );
//   };

//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <Text style={styles.emptyText}>
//           Please go back and book your token again.
//         </Text>

//         <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
//           <LinearGradient
//             colors={[COLORS.primary, COLORS.secondary]}
//             style={styles.emptyButton}
//           >
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.contentContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       <View style={styles.header}>
//         <TouchableOpacity
//           style={styles.backBtn}
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Review and confirm your appointment</Text>
//         </View>
//       </View>

//       <LinearGradient
//         colors={[COLORS.primary, COLORS.secondary]}
//         style={styles.doctorCard}
//       >
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Appointment Details</Text>

//         <InfoRow
//           icon="calendar-outline"
//           label="Date"
//           value={appointment?.displayDate || appointment?.date}
//         />

//         <InfoRow
//           icon="time-outline"
//           label="Slot"
//           value={`${appointment?.slotLabel || appointment?.slot || "-"}${
//             appointment?.slotTime ? ` • ${appointment.slotTime}` : ""
//           }`}
//         />

//         <InfoRow
//           icon="person-outline"
//           label="Patient"
//           value={`${appointment?.patientName || "-"}, ${
//             appointment?.age || "-"
//           } yrs`}
//         />

//         <InfoRow
//           icon="document-text-outline"
//           label="Visit Type"
//           value={appointment?.visitType}
//         />
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Payment Method</Text>

//         {["UPI", "Card", "Net Banking", "Pay at Hospital"].map((method) => (
//           <TouchableOpacity
//             key={method}
//             style={[
//               styles.methodRow,
//               selectedMethod === method && styles.activeMethodRow,
//             ]}
//             onPress={() => setSelectedMethod(method)}
//           >
//             <View style={styles.methodLeft}>
//               <Ionicons
//                 name={
//                   method === "UPI"
//                     ? "phone-portrait-outline"
//                     : method === "Card"
//                     ? "card-outline"
//                     : method === "Net Banking"
//                     ? "globe-outline"
//                     : "business-outline"
//                 }
//                 size={20}
//                 color={selectedMethod === method ? COLORS.primary : COLORS.muted}
//               />

//               <Text
//                 style={[
//                   styles.methodText,
//                   selectedMethod === method && styles.activeMethodText,
//                 ]}
//               >
//                 {method}
//               </Text>
//             </View>

//             {selectedMethod === method && (
//               <Ionicons
//                 name="checkmark-circle"
//                 size={22}
//                 color={COLORS.primary}
//               />
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Fee Summary</Text>

//         <AmountRow label="Doctor Fee" value={doctorFee} />
//         <AmountRow label="Platform Fee" value={platformFee} />

//         <View style={styles.divider} />

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Total Payable</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       <View style={styles.noteCard}>
//         <Ionicons
//           name="information-circle-outline"
//           size={22}
//           color={COLORS.warning}
//         />

//         <Text style={styles.noteText}>
//           Token will be generated only after payment confirmation.
//         </Text>
//       </View>

//       <TouchableOpacity activeOpacity={0.9} onPress={payNow}>
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.secondary]}
//           style={styles.payButton}
//         >
//           <Ionicons
//             name={
//               selectedMethod === "Pay at Hospital"
//                 ? "business-outline"
//                 : "lock-closed-outline"
//             }
//             size={20}
//             color="#fff"
//           />

//           <Text style={styles.payButtonText}>
//             {selectedMethod === "Pay at Hospital"
//               ? `Confirm & Pay at Hospital`
//               : `Pay ₹${totalAmount} & Confirm`}
//           </Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function InfoRow({ icon, label, value }) {
//   return (
//     <View style={styles.infoRow}>
//       <View style={styles.infoLeft}>
//         <Ionicons name={icon} size={18} color={COLORS.primary} />
//         <Text style={styles.infoLabel}>{label}</Text>
//       </View>

//       <Text style={styles.infoValue}>{value || "-"}</Text>
//     </View>
//   );
// }

// function AmountRow({ label, value }) {
//   return (
//     <View style={styles.amountRow}>
//       <Text style={styles.amountLabel}>{label}</Text>
//       <Text style={styles.amountValue}>₹{value}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   contentContainer: {
//     paddingHorizontal: 18,
//     paddingBottom: 20,
//   },

//   header: {
//     marginTop: 52,
//     marginBottom: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },

//   backBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 16,
//     backgroundColor: COLORS.card,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: COLORS.text,
//   },

//   sub: {
//     color: COLORS.muted,
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   doctorCard: {
//     borderRadius: 28,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//     marginBottom: 16,
//   },

//   iconCircle: {
//     width: 58,
//     height: 58,
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   doctorName: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "900",
//   },

//   doctorMeta: {
//     color: "rgba(255,255,255,0.85)",
//     marginTop: 4,
//     fontWeight: "700",
//   },

//   card: {
//     backgroundColor: COLORS.card,
//     borderRadius: 24,
//     padding: 16,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     elevation: 2,
//   },

//   cardTitle: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//     marginBottom: 12,
//   },

//   infoRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//     gap: 12,
//   },

//   infoLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     flex: 1,
//   },

//   infoLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   infoValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//     maxWidth: "56%",
//     textAlign: "right",
//   },

//   methodRow: {
//     minHeight: 52,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     marginBottom: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   activeMethodRow: {
//     backgroundColor: COLORS.lightBlue,
//     borderColor: COLORS.primary,
//   },

//   methodLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },

//   methodText: {
//     color: COLORS.text,
//     fontWeight: "800",
//   },

//   activeMethodText: {
//     color: COLORS.primary,
//     fontWeight: "900",
//   },

//   amountRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 9,
//   },

//   amountLabel: {
//     color: COLORS.muted,
//     fontWeight: "800",
//   },

//   amountValue: {
//     color: COLORS.text,
//     fontWeight: "900",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginVertical: 10,
//   },

//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   totalLabel: {
//     color: COLORS.text,
//     fontSize: 17,
//     fontWeight: "900",
//   },

//   totalValue: {
//     color: COLORS.primary,
//     fontSize: 24,
//     fontWeight: "900",
//   },

//   noteCard: {
//     backgroundColor: "#FFF7ED",
//     borderRadius: 18,
//     padding: 14,
//     flexDirection: "row",
//     gap: 10,
//     marginBottom: 16,
//   },

//   noteText: {
//     flex: 1,
//     color: COLORS.warning,
//     fontWeight: "800",
//   },

//   payButton: {
//     minHeight: 58,
//     borderRadius: 18,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 36,
//     paddingHorizontal: 16,
//   },

//   payButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//     textAlign: "center",
//   },

//   emptyContainer: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   emptyTitle: {
//     marginTop: 14,
//     color: COLORS.text,
//     fontSize: 22,
//     fontWeight: "900",
//   },

//   emptyText: {
//     marginTop: 8,
//     color: COLORS.muted,
//     fontWeight: "700",
//     textAlign: "center",
//   },

//   emptyButton: {
//     marginTop: 22,
//     height: 52,
//     borderRadius: 16,
//     paddingHorizontal: 28,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   emptyButtonText: {
//     color: "#fff",
//     fontWeight: "900",
//     fontSize: 15,
//   },
// });  























// import React, { useState } from "react";
// import {
//   View, Text, StyleSheet, TouchableOpacity,
//   ScrollView, Alert, ActivityIndicator, Platform,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import { useQueue } from "../../context/QueueContext";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Import Razorpay (only works in bare/dev build, not Expo Go)
// let RazorpayCheckout;
// try {
//   RazorpayCheckout = require("react-native-razorpay").default;
// } catch (e) {
//   RazorpayCheckout = null;
// }

// const BASE_URL = "http://YOUR_BACKEND_IP:8080"; // ← Change this

// export default function PaymentScreen({ route, navigation }) {
//   const { appointment } = route.params || {};
//   const { bookToken } = useQueue();
//   const [loading, setLoading] = useState(false);

//   const platformFee = appointment?.platformFee || 20;
//   const doctorFee = appointment?.doctorFee || 500;
//   const totalAmount = doctorFee + platformFee;

//   const handleRazorpayPayment = async () => {
//     if (!appointment) {
//       Alert.alert("Error", "Appointment details missing.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const patientId = await AsyncStorage.getItem("patientId") || "guest";
//       const token = await AsyncStorage.getItem("token");

//       // Step 1: Create Razorpay order from backend
//       const orderRes = await fetch(`${BASE_URL}/api/payments/create-order`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           hospitalId: appointment.hospitalId,
//           amount: totalAmount,
//           patientId,
//           patientName: appointment.patientName,
//           appointmentDate: appointment.date,
//           slotLabel: appointment.slotLabel,
//           doctorId: appointment.doctorId,
//         }),
//       });

//       const orderData = await orderRes.json();
//       if (!orderRes.ok) throw new Error(orderData.message || "Order creation failed");

//       // Step 2: Open Razorpay checkout
//       const options = {
//         description: `Appointment at ${appointment.hospitalName}`,
//         image: "https://your-app-logo-url.png", // optional
//         currency: "INR",
//         key: orderData.keyId, // rzp_test_XXXX from backend
//         amount: totalAmount * 100, // paise
//         order_id: orderData.orderId,
//         name: appointment.hospitalName,
//         prefill: {
//           name: appointment.patientName,
//           // email: "patient@email.com",
//           // contact: "9999999999",
//         },
//         theme: { color: COLORS.primary || "#3B82F6" },
//       };

//       const paymentData = await RazorpayCheckout.open(options);

//       // Step 3: Verify payment on backend
//       const verifyRes = await fetch(`${BASE_URL}/api/payments/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           razorpay_order_id: paymentData.razorpay_order_id,
//           razorpay_payment_id: paymentData.razorpay_payment_id,
//           razorpay_signature: paymentData.razorpay_signature,
//         }),
//       });

//       const verifyData = await verifyRes.json();
//       if (!verifyRes.ok || !verifyData.success) throw new Error("Payment verification failed");

//       // Step 4: Book the token after successful payment
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod: "RAZORPAY",
//         paymentStatus: "SUCCESS",
//         paymentId: paymentData.razorpay_payment_id,
//         appointmentStatus: "CONFIRMED",
//       });

//       navigation.replace("TokenSuccess", { token: booked });

//     } catch (error) {
//       // Razorpay throws an error object with description when user cancels
//       if (error?.description) {
//         Alert.alert("Payment Cancelled", "You cancelled the payment.");
//       } else {
//         Alert.alert("Payment Failed", error.message || "Something went wrong.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePayAtHospital = async () => {
//     try {
//       const booked = await bookToken({
//         ...appointment,
//         doctorFee,
//         platformFee,
//         totalAmount,
//         paymentMethod: "Pay at Hospital",
//         paymentStatus: "PAY_AT_HOSPITAL",
//         paymentId: `PAY-HOSPITAL-${Date.now()}`,
//         appointmentStatus: "CONFIRMED",
//       });
//       navigation.replace("TokenSuccess", { token: booked });
//     } catch (err) {
//       Alert.alert("Booking Failed", err.message);
//     }
//   };

//   if (!appointment) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
//         <Text style={styles.emptyTitle}>Appointment not found</Text>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.emptyButton}>
//             <Text style={styles.emptyButtonText}>Go Back</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.content}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
//           <Ionicons name="arrow-back" size={22} color={COLORS.text} />
//         </TouchableOpacity>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>Payment</Text>
//           <Text style={styles.sub}>Secure payment via Razorpay</Text>
//         </View>
//       </View>

//       {/* Doctor Card */}
//       <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.doctorCard}>
//         <View style={styles.iconCircle}>
//           <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
//         </View>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.doctorName}>{appointment?.doctor}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.department}</Text>
//           <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
//         </View>
//       </LinearGradient>

//       {/* Fee Summary */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Fee Summary</Text>
//         <View style={styles.feeRow}>
//           <Text style={styles.feeLabel}>Doctor Consultation Fee</Text>
//           <Text style={styles.feeValue}>₹{doctorFee}</Text>
//         </View>
//         <View style={styles.feeRow}>
//           <Text style={styles.feeLabel}>Platform Fee</Text>
//           <Text style={styles.feeValue}>₹{platformFee}</Text>
//         </View>
//         <View style={styles.divider} />
//         <View style={styles.feeRow}>
//           <Text style={styles.totalLabel}>Total Payable</Text>
//           <Text style={styles.totalValue}>₹{totalAmount}</Text>
//         </View>
//       </View>

//       {/* Pay with Razorpay */}
//       <TouchableOpacity
//         activeOpacity={0.9}
//         onPress={handleRazorpayPayment}
//         disabled={loading || !RazorpayCheckout}
//       >
//         <LinearGradient
//           colors={["#1a73e8", "#0d47a1"]}
//           style={[styles.payBtn, loading && { opacity: 0.7 }]}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <>
//               <Ionicons name="lock-closed-outline" size={20} color="#fff" />
//               <Text style={styles.payBtnText}>Pay ₹{totalAmount} with Razorpay</Text>
//             </>
//           )}
//         </LinearGradient>
//       </TouchableOpacity>

//       {!RazorpayCheckout && (
//         <Text style={styles.warningText}>
//           ⚠️ Razorpay requires a development build (not Expo Go). Run: npx expo run:android
//         </Text>
//       )}

//       {/* Pay at Hospital */}
//       <TouchableOpacity style={styles.hospitalBtn} onPress={handlePayAtHospital} disabled={loading}>
//         <Ionicons name="business-outline" size={20} color={COLORS.text} />
//         <Text style={styles.hospitalBtnText}>Pay at Hospital Instead</Text>
//       </TouchableOpacity>

//       <View style={styles.note}>
//         <Ionicons name="shield-checkmark-outline" size={16} color="#10B981" />
//         <Text style={styles.noteText}>Payments are 100% secure via Razorpay</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   content: { paddingHorizontal: 18, paddingBottom: 30 },
//   header: { marginTop: 52, marginBottom: 18, flexDirection: "row", alignItems: "center", gap: 12 },
//   backBtn: { width: 44, height: 44, borderRadius: 16, backgroundColor: COLORS.card, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.border },
//   title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
//   sub: { color: COLORS.muted, marginTop: 4, fontWeight: "700" },
//   doctorCard: { borderRadius: 28, padding: 18, flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
//   iconCircle: { width: 58, height: 58, borderRadius: 20, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
//   doctorName: { color: "#fff", fontSize: 20, fontWeight: "900" },
//   doctorMeta: { color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: "700" },
//   card: { backgroundColor: COLORS.card, borderRadius: 24, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border, elevation: 2 },
//   cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: "900", marginBottom: 12 },
//   feeRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 9 },
//   feeLabel: { color: COLORS.muted, fontWeight: "800" },
//   feeValue: { color: COLORS.text, fontWeight: "900" },
//   divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
//   totalLabel: { color: COLORS.text, fontSize: 17, fontWeight: "900" },
//   totalValue: { color: COLORS.primary, fontSize: 24, fontWeight: "900" },
//   payBtn: { minHeight: 58, borderRadius: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, marginBottom: 12, paddingHorizontal: 16 },
//   payBtnText: { color: "#fff", fontSize: 16, fontWeight: "900" },
//   hospitalBtn: { minHeight: 52, borderRadius: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, marginBottom: 12, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
//   hospitalBtnText: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
//   note: { flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 8 },
//   noteText: { color: "#10B981", fontWeight: "700", fontSize: 13 },
//   warningText: { color: "#F97316", textAlign: "center", marginBottom: 12, fontWeight: "700", fontSize: 13 },
//   emptyContainer: { flex: 1, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center", padding: 24 },
//   emptyTitle: { marginTop: 14, color: COLORS.text, fontSize: 22, fontWeight: "900" },
//   emptyButton: { marginTop: 22, height: 52, borderRadius: 16, paddingHorizontal: 28, alignItems: "center", justifyContent: "center" },
//   emptyButtonText: { color: "#fff", fontWeight: "900", fontSize: 15 },
// });  
















































// src/screens/patient/PaymentScreen.js
//
// ✅ Works on:  Expo Go (Android & iOS)
// ✅ Works on:  Expo Web (browser)
// ✅ Works on:  Native / EAS build
//
// Strategy:
//   • Web  → window.Razorpay via <script> tag (standard browser checkout)
//   • Mobile (Expo Go & native) → expo-web-view renders Razorpay HTML page
//     and posts result back via window.ReactNativeWebView.postMessage()

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview"; // expo install react-native-webview
import { COLORS } from "../../constants/colors";
import { bookToken, BASE_URL } from "../../services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Razorpay Key (Test) — swap to live key when going live ───────────────────
const RAZORPAY_KEY_ID = "rzp_test_Sqk3fiqKhObzAs"; // ← paste your test key here

// ─── Build the HTML page that Razorpay opens inside WebView ──────────────────
const buildRazorpayHTML = ({ orderId, amount, keyId, hospitalName, department, patientName }) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0f172a;
      display: flex; align-items: center; justify-content: center;
      height: 100vh; font-family: sans-serif;
    }
    .loader {
      text-align: center; color: #94a3b8;
    }
    .dot {
      display: inline-block; width: 10px; height: 10px;
      border-radius: 50%; background: #3b82f6; margin: 0 4px;
      animation: bounce 1.2s infinite ease-in-out;
    }
    .dot:nth-child(2) { animation-delay: 0.2s; }
    .dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
    p { margin-top: 16px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="loader">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <p>Opening Razorpay...</p>
  </div>

  <script>
    function postMsg(data) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    }

    window.onload = function () {
      var options = {
        key: "${keyId}",
        amount: ${amount * 100},
        currency: "INR",
        order_id: "${orderId}",
        name: "${hospitalName}",
        description: "Appointment - ${department}",
        prefill: { name: "${patientName}" },
        theme: { color: "#3B82F6" },
        handler: function (response) {
          postMsg({ type: "PAYMENT_SUCCESS", data: response });
        },
        modal: {
          ondismiss: function () {
            postMsg({ type: "PAYMENT_CANCELLED" });
          }
        }
      };

      var rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response) {
        postMsg({ type: "PAYMENT_FAILED", error: response.error.description });
      });
      rzp.open();
    };
  </script>
</body>
</html>
`;

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function PaymentScreen({ route, navigation }) {
  const { appointment } = route.params || {};

  const [loading, setLoading]             = useState(false);
  const [showWebView, setShowWebView]     = useState(false);
  const [razorpayHTML, setRazorpayHTML]   = useState("");
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [currentToken, setCurrentToken]   = useState(null);
  const webViewRef                        = useRef(null);

  const platformFee = appointment?.platformFee || 10;
  const doctorFee   = appointment?.doctorFee   || 500;
  const totalAmount = doctorFee + platformFee;

  // ── Step 1: Create order on backend ────────────────────────────────────────
  const createOrder = async () => {
    const patientId = await AsyncStorage.getItem("patientId") || "guest";
    const token     = await AsyncStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        hospitalId:      appointment.hospitalId,
        amount:          totalAmount,
        patientId,
        patientName:     appointment.patientName,
        appointmentDate: appointment.date,
        slotLabel:       appointment.slotLabel || appointment.slot,
        doctorId:        appointment.doctorId,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to create payment order");
    }
    return res.json(); // { orderId, keyId, amount, currency }
  };

  // ── Step 2: Verify payment on backend ──────────────────────────────────────
  const verifyPayment = async (paymentResponse, token) => {
    const res = await fetch(`${BASE_URL}/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        razorpay_order_id:   paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature:  paymentResponse.razorpay_signature,
      }),
    });

    if (!res.ok) throw new Error("Payment verification failed");
    return res.json();
  };

  // ── Step 3: Book token after verified payment ───────────────────────────────
  const finishBooking = async (paymentId) => {
    const booked = await bookToken({
      ...appointment,
      doctorFee,
      platformFee,
      totalAmount,
      paymentMethod:     "RAZORPAY",
      paymentStatus:     "SUCCESS",
      paymentId,
      appointmentStatus: "CONFIRMED",
    });
    navigation.replace("TokenSuccess", { token: booked });
  };

  // ── Handle messages from WebView (mobile) ──────────────────────────────────
  const handleWebViewMessage = async (event) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);

      if (msg.type === "PAYMENT_SUCCESS") {
        setShowWebView(false);
        setLoading(true);
        try {
          const token = await AsyncStorage.getItem("token");
          await verifyPayment(msg.data, token);
          await finishBooking(msg.data.razorpay_payment_id);
        } catch (err) {
          Alert.alert("Error", err.message || "Verification failed. Contact support.");
        } finally {
          setLoading(false);
        }

      } else if (msg.type === "PAYMENT_CANCELLED") {
        setShowWebView(false);
        setLoading(false);
        Alert.alert("Cancelled", "Payment was cancelled.");

      } else if (msg.type === "PAYMENT_FAILED") {
        setShowWebView(false);
        setLoading(false);
        Alert.alert("Payment Failed", msg.error || "Something went wrong.");
      }
    } catch (e) {
      // ignore non-JSON messages from Razorpay internals
    }
  };

  // ── Main pay handler ────────────────────────────────────────────────────────
  const handlePay = async () => {
    if (!appointment) {
      Alert.alert("Error", "Appointment details missing.");
      return;
    }

    setLoading(true);

    try {
      const orderData = await createOrder();
      const keyId     = orderData.keyId || RAZORPAY_KEY_ID;

      if (Platform.OS === "web") {
        // ── WEB: load Razorpay checkout.js into browser ────────────────────
        const loaded = await loadRazorpayWebScript();
        if (!loaded) throw new Error("Could not load Razorpay. Check your internet.");

        const token = await AsyncStorage.getItem("token");

        const options = {
          key:         keyId,
          amount:      totalAmount * 100,
          currency:    "INR",
          order_id:    orderData.orderId,
          name:        appointment.hospitalName,
          description: `Appointment - ${appointment.department}`,
          prefill:     { name: appointment.patientName },
          theme:       { color: "#3B82F6" },
          handler: async (response) => {
            setLoading(true);
            try {
              await verifyPayment(response, token);
              await finishBooking(response.razorpay_payment_id);
            } catch (err) {
              Alert.alert("Error", err.message);
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: () => setLoading(false),
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (r) => {
          setLoading(false);
          Alert.alert("Payment Failed", r.error.description);
        });
        rzp.open();
        // loading stops inside handler / ondismiss

      } else {
        // ── MOBILE (Expo Go + native): use WebView ─────────────────────────
        const html = buildRazorpayHTML({
          orderId:      orderData.orderId,
          amount:       totalAmount,
          keyId,
          hospitalName: appointment.hospitalName   || "Hospital",
          department:   appointment.department     || "OPD",
          patientName:  appointment.patientName    || "Patient",
        });

        setCurrentOrderId(orderData.orderId);
        setCurrentToken(await AsyncStorage.getItem("token"));
        setRazorpayHTML(html);
        setLoading(false);
        setShowWebView(true);
      }

    } catch (err) {
      Alert.alert("Error", err.message || "Could not initiate payment.");
      setLoading(false);
    }
  };

  // ── Pay at Hospital ─────────────────────────────────────────────────────────
  const handlePayAtHospital = async () => {
    setLoading(true);
    try {
      const booked = await bookToken({
        ...appointment,
        doctorFee,
        platformFee,
        totalAmount,
        paymentMethod:     "PAY_AT_HOSPITAL",
        paymentStatus:     "PENDING", // ✅ Patient hasn't paid yet — pending at counter
        paymentId:         `PAH-${Date.now()}`,
        appointmentStatus: "CONFIRMED",
      });
      navigation.replace("TokenSuccess", { token: booked });
    } catch (err) {
      Alert.alert("Booking Failed", err.message || "Could not book token.");
    } finally {
      setLoading(false);
    }
  };

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (!appointment) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={54} color={COLORS.warning} />
        <Text style={styles.emptyTitle}>Appointment not found</Text>
        <Text style={styles.emptyText}>Please go back and book your token again.</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.secondary]}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Go Back</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Main UI ─────────────────────────────────────────────────────────────────
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color={COLORS.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Payment</Text>
            <Text style={styles.sub}>Review and confirm your appointment</Text>
          </View>
        </View>

        {/* Doctor card */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          style={styles.doctorCard}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="medkit-outline" size={26} color={COLORS.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>{appointment?.doctor}</Text>
            <Text style={styles.doctorMeta}>{appointment?.department}</Text>
            <Text style={styles.doctorMeta}>{appointment?.hospitalName}</Text>
          </View>
        </LinearGradient>

        {/* Appointment details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appointment Details</Text>
          <InfoRow icon="calendar-outline"      label="Date"       value={appointment?.displayDate || appointment?.date} />
          <InfoRow icon="time-outline"           label="Slot"       value={`${appointment?.slotLabel || appointment?.slot || "—"}${appointment?.slotTime ? ` • ${appointment.slotTime}` : ""}`} />
          <InfoRow icon="person-outline"         label="Patient"    value={`${appointment?.patientName || "—"}, ${appointment?.age || "—"} yrs`} />
          <InfoRow icon="document-text-outline"  label="Visit Type" value={appointment?.visitType} />
        </View>

        {/* Fee summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fee Summary</Text>
          <AmountRow label="Doctor Consultation Fee" value={doctorFee} />
          <AmountRow label="Platform Fee"            value={platformFee} />
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>₹{totalAmount}</Text>
          </View>
        </View>

        {/* Security note */}
        <View style={styles.secureNote}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#10B981" />
          <Text style={styles.secureText}>100% secure payments powered by Razorpay</Text>
        </View>

        {/* Pay with Razorpay button */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handlePay}
          disabled={loading}
        >
          <LinearGradient
            colors={["#1a73e8", "#0d47a1"]}
            style={[styles.payButton, loading && { opacity: 0.7 }]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" />
                <Text style={styles.payButtonText}>
                  Pay ₹{totalAmount} online
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.orLine} />
        </View>

        {/* Pay at hospital button */}
        <TouchableOpacity
          style={[styles.hospitalButton, loading && { opacity: 0.6 }]}
          activeOpacity={0.85}
          onPress={handlePayAtHospital}
          disabled={loading}
        >
          <Ionicons name="business-outline" size={20} color={COLORS.text} />
          <Text style={styles.hospitalButtonText}>Pay at Hospital</Text>
        </TouchableOpacity>

        <Text style={styles.hospitalNote}>
          Token will be reserved but payment is due at the hospital counter.
        </Text>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ── WebView Modal for Razorpay (mobile only) ── */}
      {Platform.OS !== "web" && (
        <Modal
          visible={showWebView}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            setShowWebView(false);
            setLoading(false);
          }}
        >
          <View style={styles.webViewContainer}>
            {/* Close bar */}
            <View style={styles.webViewTopBar}>
              <TouchableOpacity
                style={styles.webViewCloseBtn}
                onPress={() => {
                  setShowWebView(false);
                  setLoading(false);
                }}
              >
                <Ionicons name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.webViewTitle}>Secure Payment</Text>
              <View style={styles.webViewLock}>
                <Ionicons name="lock-closed" size={14} color="#10B981" />
                <Text style={styles.webViewLockText}>Razorpay</Text>
              </View>
            </View>

            {/* Razorpay WebView */}
            <WebView
              ref={webViewRef}
              source={{ html: razorpayHTML }}
              onMessage={handleWebViewMessage}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              originWhitelist={["*"]}
              style={{ flex: 1 }}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.webViewLoading}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={styles.webViewLoadingText}>Loading payment gateway...</Text>
                </View>
              )}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

// ─── Load Razorpay script for web ─────────────────────────────────────────────
function loadRazorpayWebScript() {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value || "—"}</Text>
    </View>
  );
}

function AmountRow({ label, value }) {
  return (
    <View style={styles.amountRow}>
      <Text style={styles.amountLabel}>{label}</Text>
      <Text style={styles.amountValue}>₹{value}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  // Header
  header: {
    marginTop: 52,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 16,
    backgroundColor: COLORS.card,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: COLORS.border,
  },
  title: { fontSize: 24, fontWeight: "900", color: COLORS.text },
  sub:   { color: COLORS.muted, marginTop: 4, fontWeight: "700" },

  // Doctor card
  doctorCard: {
    borderRadius: 28, padding: 18,
    flexDirection: "row", alignItems: "center",
    gap: 14, marginBottom: 16,
  },
  iconCircle: {
    width: 58, height: 58, borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center", justifyContent: "center",
  },
  doctorName: { color: "#fff", fontSize: 20, fontWeight: "900" },
  doctorMeta: { color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: "700" },

  // Generic card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24, padding: 16,
    marginBottom: 16,
    borderWidth: 1, borderColor: COLORS.border,
    elevation: 2,
  },
  cardTitle: { color: COLORS.text, fontSize: 17, fontWeight: "900", marginBottom: 12 },

  // Info rows
  infoRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", paddingVertical: 10, gap: 12,
  },
  infoLeft: { flexDirection: "row", alignItems: "center", gap: 8, flex: 1 },
  infoLabel: { color: COLORS.muted, fontWeight: "800" },
  infoValue: { color: COLORS.text, fontWeight: "900", maxWidth: "56%", textAlign: "right" },

  // Amount rows
  amountRow:  { flexDirection: "row", justifyContent: "space-between", paddingVertical: 9 },
  amountLabel:{ color: COLORS.muted, fontWeight: "800" },
  amountValue:{ color: COLORS.text,  fontWeight: "900" },
  divider:    { height: 1, backgroundColor: COLORS.border, marginVertical: 10 },
  totalRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  totalLabel: { color: COLORS.text, fontSize: 17, fontWeight: "900" },
  totalValue: { color: COLORS.primary, fontSize: 24, fontWeight: "900" },

  // Secure note
  secureNote: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 6, marginBottom: 14,
  },
  secureText: { color: "#10B981", fontWeight: "700", fontSize: 13 },

  // Pay button
  payButton: {
    minHeight: 58, borderRadius: 18,
    alignItems: "center", justifyContent: "center",
    flexDirection: "row", gap: 8,
    marginBottom: 16, paddingHorizontal: 16,
    elevation: 3,
  },
  payButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  // OR divider
  orRow:  { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
  orLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  orText: { color: COLORS.muted, fontWeight: "800", fontSize: 13 },

  // Pay at hospital button
  hospitalButton: {
    minHeight: 54, borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1, borderColor: COLORS.border,
    alignItems: "center", justifyContent: "center",
    flexDirection: "row", gap: 8,
    marginBottom: 10, paddingHorizontal: 16,
  },
  hospitalButtonText: { color: COLORS.text, fontWeight: "800", fontSize: 15 },
  hospitalNote: {
    color: COLORS.muted, textAlign: "center",
    fontSize: 12, fontWeight: "600", marginBottom: 6,
  },

  // Empty state
  emptyContainer: {
    flex: 1, backgroundColor: COLORS.background,
    alignItems: "center", justifyContent: "center", padding: 24,
  },
  emptyTitle:  { marginTop: 14, color: COLORS.text, fontSize: 22, fontWeight: "900" },
  emptyText:   { marginTop: 8, color: COLORS.muted, fontWeight: "700", textAlign: "center" },
  emptyButton: {
    marginTop: 22, height: 52, borderRadius: 16,
    paddingHorizontal: 28, alignItems: "center", justifyContent: "center",
  },
  emptyButtonText: { color: "#fff", fontWeight: "900", fontSize: 15 },

  // WebView Modal
  webViewContainer: { flex: 1, backgroundColor: COLORS.background },
  webViewTopBar: {
    flexDirection: "row", alignItems: "center",
    paddingHorizontal: 16, paddingTop: 52, paddingBottom: 12,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    gap: 12,
  },
  webViewCloseBtn: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: COLORS.border,
  },
  webViewTitle: {
    flex: 1, fontSize: 17, fontWeight: "900", color: COLORS.text,
  },
  webViewLock: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#ECFDF5", paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1, borderColor: "#6EE7B7",
  },
  webViewLockText: { color: "#10B981", fontWeight: "800", fontSize: 12 },
  webViewLoading: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    alignItems: "center", justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  webViewLoadingText: {
    marginTop: 12, color: COLORS.muted, fontWeight: "700",
  },
});