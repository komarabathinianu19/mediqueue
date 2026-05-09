


// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constants/colors";
// import AppHeader from "../../components/AppHeader";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";
// import { useHospital } from "../../context/HospitalContext";

// export default function HospitalRegisterScreen({ navigation }) {
//   const { registerHospital } = useHospital();

//   const [documents, setDocuments] = useState([]);
//   const [image, setImage] = useState(
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
//   );

//   const [form, setForm] = useState({
//     name: "New Life Hospital",
//     owner: "Ravi Kumar",
//     phone: "9876543210",
//     email: "newlife@gmail.com",
//     type: "Multi-speciality",
//     address: "Madhapur, Hyderabad",
//     city: "Hyderabad",
//     regNo: "REG1234567",
//     license: "LIC987654",
//     departments: "General OPD, Cardiology, Pediatrics",
//     doctors: "12",
//   });

//   const update = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickHospitalImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ["application/pdf", "image/*"],
//       copyToCacheDirectory: true,
//       multiple: false,
//     });

//     if (!result.canceled) {
//       const file = result.assets[0];
//       setDocuments((prev) => [...prev, file]);
//     }
//   };

//   const submit = () => {
//     if (!form.name.trim() || !form.phone.trim() || !form.license.trim()) {
//       Alert.alert("Missing Details", "Hospital name, phone and license are required.");
//       return;
//     }

//     registerHospital({
//       name: form.name,
//       owner: form.owner,
//       phone: form.phone,
//       email: form.email,
//       type: form.type,
//       address: form.address,
//       city: form.city,
//       regNo: form.regNo,
//       license: form.license,
//       doctors: Number(form.doctors) || 0,
//       departments: form.departments
//         .split(",")
//         .map((d) => d.trim())
//         .filter(Boolean),
//       documents,
//       image,
//     });

//     Alert.alert(
//       "Registration Submitted",
//       "Your hospital registration is under admin verification.",
//       [{ text: "OK", onPress: () => navigation.goBack() }]
//     );
//   };

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       <AppHeader
//         title="Hospital Register"
//         subtitle="Submit details for admin verification"
//         showBack
//         onBack={() => navigation.goBack()}
//       />

//       <View style={styles.content}>
//         <TouchableOpacity style={styles.imageCard} onPress={pickHospitalImage}>
//           <Image source={{ uri: image }} style={styles.image} />
//           <View style={styles.imageOverlay}>
//             <Ionicons name="camera-outline" size={22} color="#fff" />
//             <Text style={styles.imageText}>Change Hospital Image</Text>
//           </View>
//         </TouchableOpacity>

//         <InputField label="Hospital Name" value={form.name} onChangeText={(v) => update("name", v)} />
//         <InputField label="Owner / Admin Name" value={form.owner} onChangeText={(v) => update("owner", v)} />
//         <InputField label="Mobile Number" value={form.phone} keyboardType="phone-pad" onChangeText={(v) => update("phone", v)} />
//         <InputField label="Email" value={form.email} onChangeText={(v) => update("email", v)} />
//         <InputField label="Hospital Type" value={form.type} onChangeText={(v) => update("type", v)} />
//         <InputField label="Address" value={form.address} multiline onChangeText={(v) => update("address", v)} />
//         <InputField label="City" value={form.city} onChangeText={(v) => update("city", v)} />
//         <InputField label="Registration Number" value={form.regNo} onChangeText={(v) => update("regNo", v)} />
//         <InputField label="License Number" value={form.license} onChangeText={(v) => update("license", v)} />
//         <InputField label="Departments" value={form.departments} onChangeText={(v) => update("departments", v)} />
//         <InputField label="Doctors Count" value={form.doctors} keyboardType="numeric" onChangeText={(v) => update("doctors", v)} />

//         <Text style={styles.section}>Upload Documents</Text>

//         <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
//           <Ionicons name="cloud-upload-outline" size={34} color={COLORS.staff} />
//           <Text style={styles.uploadTitle}>Upload Certificate / License</Text>
//           <Text style={styles.uploadSub}>PDF or image allowed</Text>
//         </TouchableOpacity>

//         {documents.map((doc, index) => (
//           <View key={`${doc.name}-${index}`} style={styles.docRow}>
//             <Ionicons name="document-text-outline" size={22} color={COLORS.staff} />
//             <Text style={styles.docName} numberOfLines={1}>
//               {doc.name}
//             </Text>
//           </View>
//         ))}

//         <GradientButton
//           title="Submit for Verification"
//           colors={[COLORS.staff, "#14B8A6"]}
//           onPress={submit}
//           style={{ marginTop: 20, marginBottom: 40 }}
//         />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   content: { paddingHorizontal: 18, paddingBottom: 20 },

//   imageCard: {
//     height: 180,
//     borderRadius: 26,
//     overflow: "hidden",
//     marginBottom: 18,
//     backgroundColor: COLORS.card,
//   },

//   image: { width: "100%", height: "100%" },

//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.35)",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },

//   imageText: { color: "#fff", fontWeight: "900" },

//   section: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 8,
//     marginBottom: 12,
//   },

//   uploadBox: {
//     height: 140,
//     backgroundColor: "#ECFDF5",
//     borderRadius: 24,
//     borderWidth: 1,
//     borderStyle: "dashed",
//     borderColor: COLORS.staff,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 14,
//   },

//   uploadTitle: { color: COLORS.text, fontWeight: "900", marginTop: 10 },
//   uploadSub: { color: COLORS.muted, marginTop: 4 },

//   docRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//     backgroundColor: COLORS.card,
//     borderRadius: 16,
//     padding: 14,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },

//   docName: { flex: 1, color: COLORS.text, fontWeight: "700" },
// });  





























// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti"; // Animation Library
// import { COLORS } from "../../constants/colors";
// import AppHeader from "../../components/AppHeader";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";
// import { useHospital } from "../../context/HospitalContext";

// export default function HospitalRegisterScreen({ navigation }) {
//   const { registerHospital } = useHospital();

//   const [documents, setDocuments] = useState([]);
//   const [image, setImage] = useState(
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
//   );

//   const [form, setForm] = useState({
//     name: "New Life Hospital",
//     owner: "Ravi Kumar",
//     phone: "9876543210",
//     email: "newlife@gmail.com",
//     type: "Multi-speciality",
//     address: "Madhapur, Hyderabad",
//     city: "Hyderabad",
//     regNo: "REG1234567",
//     license: "LIC987654",
//     departments: "General OPD, Cardiology, Pediatrics",
//     doctors: "12",
//   });

//   const update = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickHospitalImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ["application/pdf", "image/*"],
//       copyToCacheDirectory: true,
//       multiple: false,
//     });
//     if (!result.canceled) {
//       const file = result.assets[0];
//       setDocuments((prev) => [...prev, file]);
//     }
//   };

//   const submit = () => {
//     if (!form.name.trim() || !form.phone.trim() || !form.license.trim()) {
//       Alert.alert("Missing Details", "Hospital name, phone and license are required.");
//       return;
//     }
//     registerHospital({ ...form, documents, image });
//     Alert.alert(
//       "Registration Submitted",
//       "Your hospital registration is under admin verification.",
//       [{ text: "OK", onPress: () => navigation.goBack() }]
//     );
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: COLORS.background }}>
//       <AppHeader
//         title="Hospital Register"
//         subtitle="Submit details for verification"
//         showBack
//         onBack={() => navigation.goBack()}
//       />

//       <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
//         {/* 1. Image Card Animation */}
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: 'timing', duration: 600 }}
//         >
//           <TouchableOpacity style={styles.imageCard} onPress={pickHospitalImage}>
//             <Image source={{ uri: image }} style={styles.image} />
//             <View style={styles.imageOverlay}>
//               <View style={styles.camCircle}>
//                 <Ionicons name="camera" size={24} color="#fff" />
//               </View>
//               <Text style={styles.imageText}>Change Hospital Image</Text>
//             </View>
//           </TouchableOpacity>
//         </MotiView>

//         {/* 2. Form Inputs - Subtle Staggered Slide */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: 'timing', duration: 500, delay: 200 }}
//         >
//           <Text style={styles.section}>Basic Information</Text>
//           <InputField label="Hospital Name" value={form.name} onChangeText={(v) => update("name", v)} />
//           <InputField label="Owner / Admin Name" value={form.owner} onChangeText={(v) => update("owner", v)} />
//           <View style={styles.row}>
//             <View style={{ flex: 1 }}><InputField label="Phone" value={form.phone} keyboardType="phone-pad" onChangeText={(v) => update("phone", v)} /></View>
//             <View style={{ width: 12 }} />
//             <View style={{ flex: 1 }}><InputField label="City" value={form.city} onChangeText={(v) => update("city", v)} /></View>
//           </View>
//           <InputField label="Address" value={form.address} multiline onChangeText={(v) => update("address", v)} />
//         </MotiView>

//         {/* 3. Legal/Staff Section */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: 'timing', duration: 500, delay: 400 }}
//         >
//           <Text style={styles.section}>Licensing & Staff</Text>
//           <InputField label="Registration No." value={form.regNo} onChangeText={(v) => update("regNo", v)} />
//           <InputField label="License No." value={form.license} onChangeText={(v) => update("license", v)} />
//           <InputField label="Departments" placeholder="Comma separated" value={form.departments} onChangeText={(v) => update("departments", v)} />
//         </MotiView>

//         {/* 4. Document Upload Area */}
//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: 'timing', duration: 500, delay: 600 }}
//         >
//           <Text style={styles.section}>Verification Documents</Text>
//           <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
//             <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
//             <Text style={styles.uploadTitle}>Upload Certificate</Text>
//             <Text style={styles.uploadSub}>PDF or high-res images</Text>
//           </TouchableOpacity>

//           {documents.map((doc, index) => (
//             <MotiView 
//               key={index} 
//               from={{ opacity: 0, scale: 0.8 }} 
//               animate={{ opacity: 1, scale: 1 }} 
//               style={styles.docRow}
//             >
//               <Ionicons name="document-attach" size={22} color={COLORS.staff} />
//               <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
//               <TouchableOpacity onPress={() => setDocuments(documents.filter((_, i) => i !== index))}>
//                 <Ionicons name="close-circle" size={20} color="#EF4444" />
//               </TouchableOpacity>
//             </MotiView>
//           ))}

//           <GradientButton
//             title="Submit for Verification"
//             colors={[COLORS.staff, "#14B8A6"]}
//             onPress={submit}
//             style={{ marginTop: 24, marginBottom: 50 }}
//           />
//         </MotiView>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   content: { padding: 20 },
//   imageCard: {
//     height: 190,
//     borderRadius: 28,
//     overflow: "hidden",
//     marginBottom: 24,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//   },
//   image: { width: "100%", height: "100%" },
//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   camCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(255,255,255,0.3)',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8
//   },
//   imageText: { color: "#fff", fontWeight: "800", fontSize: 14 },
//   section: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 12,
//     marginBottom: 16,
//     letterSpacing: -0.5
//   },
//   row: { flexDirection: 'row', alignItems: 'center' },
//   uploadBox: {
//     height: 140,
//     backgroundColor: "#F0FDFA",
//     borderRadius: 24,
//     borderWidth: 2,
//     borderStyle: "dashed",
//     borderColor: COLORS.staff + '50',
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },
//   uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 10 },
//   uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
//   docRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },
// });

























// import React, { useState } from "react";
// import {
//   ScrollView,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   Image,
//   Modal,
//   Pressable,
// } from "react-native";
// import * as DocumentPicker from "expo-document-picker";
// import * as ImagePicker from "expo-image-picker";
// import { Ionicons } from "@expo/vector-icons";
// import { MotiView } from "moti";
// import { COLORS } from "../../constants/colors";
// import AppHeader from "../../components/AppHeader";
// import InputField from "../../components/InputField";
// import GradientButton from "../../components/GradientButton";
// import { useHospital } from "../../context/HospitalContext";

// export default function HospitalRegisterScreen({ navigation }) {
//   const { registerHospital } = useHospital();

//   const [successPopup, setSuccessPopup] = useState(false);

//   const [documents, setDocuments] = useState([]);

//   const [image, setImage] = useState(
//     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
//   );

//   const [form, setForm] = useState({
//     name: "New Life Hospital",
//     owner: "Ravi Kumar",
//     phone: "9876543210",
//     email: "newlife@gmail.com",
//     type: "Multi-speciality",
//     address: "Madhapur, Hyderabad",
//     city: "Hyderabad",
//     regNo: "REG1234567",
//     license: "LIC987654",
//     departments: "General OPD, Cardiology, Pediatrics",
//     doctors: "12",
//   });

//   const update = (key, value) => {
//     setForm((prev) => ({ ...prev, [key]: value }));
//   };

//   const pickHospitalImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert("Permission Required", "Please allow gallery access.");
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.8,
//       allowsEditing: true,
//       aspect: [16, 9],
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   const pickDocument = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: ["application/pdf", "image/*"],
//       copyToCacheDirectory: true,
//       multiple: false,
//     });

//     if (!result.canceled) {
//       const file = result.assets[0];
//       setDocuments((prev) => [...prev, file]);
//     }
//   };

//   const removeDocument = (index) => {
//     setDocuments((prev) => prev.filter((_, i) => i !== index));
//   };

//   const submit = () => {
//     if (!form.name.trim()) {
//       Alert.alert("Missing Details", "Hospital name is required.");
//       return;
//     }

//     if (!form.phone.trim()) {
//       Alert.alert("Missing Details", "Phone number is required.");
//       return;
//     }

//     if (!form.license.trim()) {
//       Alert.alert("Missing Details", "License number is required.");
//       return;
//     }

//     registerHospital({
//       ...form,
//       documents,
//       image,
//       status: "Pending Verification",
//       submittedAt: new Date().toISOString(),
//     });

//     setSuccessPopup(true);
//   };

//   const closeSuccessPopup = () => {
//     setSuccessPopup(false);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.wrapper}>
//       <AppHeader
//         title="Hospital Register"
//         subtitle="Submit details for verification"
//         showBack
//         onBack={() => navigation.goBack()}
//       />

//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <MotiView
//           from={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ type: "timing", duration: 600 }}
//         >
//           <TouchableOpacity
//             activeOpacity={0.86}
//             style={styles.imageCard}
//             onPress={pickHospitalImage}
//           >
//             <Image source={{ uri: image }} style={styles.image} />

//             <View style={styles.imageOverlay}>
//               <View style={styles.camCircle}>
//                 <Ionicons name="camera" size={24} color="#fff" />
//               </View>

//               <Text style={styles.imageText}>Change Hospital Image</Text>
//             </View>
//           </TouchableOpacity>
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 200 }}
//         >
//           <Text style={styles.section}>Basic Information</Text>

//           <InputField
//             label="Hospital Name"
//             value={form.name}
//             onChangeText={(v) => update("name", v)}
//             icon="business-outline"
//           />

//           <InputField
//             label="Owner / Admin Name"
//             value={form.owner}
//             onChangeText={(v) => update("owner", v)}
//             icon="person-outline"
//           />

//           <InputField
//             label="Email"
//             value={form.email}
//             onChangeText={(v) => update("email", v)}
//             keyboardType="email-address"
//             icon="mail-outline"
//           />

//           <InputField
//             label="Hospital Type"
//             value={form.type}
//             onChangeText={(v) => update("type", v)}
//             icon="medkit-outline"
//           />

//           <View style={styles.row}>
//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="Phone"
//                 value={form.phone}
//                 keyboardType="phone-pad"
//                 onChangeText={(v) => update("phone", v)}
//                 icon="call-outline"
//               />
//             </View>

//             <View style={{ width: 12 }} />

//             <View style={{ flex: 1 }}>
//               <InputField
//                 label="City"
//                 value={form.city}
//                 onChangeText={(v) => update("city", v)}
//                 icon="location-outline"
//               />
//             </View>
//           </View>

//           <InputField
//             label="Address"
//             value={form.address}
//             multiline
//             onChangeText={(v) => update("address", v)}
//             icon="home-outline"
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 400 }}
//         >
//           <Text style={styles.section}>Licensing & Staff</Text>

//           <InputField
//             label="Registration No."
//             value={form.regNo}
//             onChangeText={(v) => update("regNo", v)}
//             icon="document-text-outline"
//           />

//           <InputField
//             label="License No."
//             value={form.license}
//             onChangeText={(v) => update("license", v)}
//             icon="shield-checkmark-outline"
//           />

//           <InputField
//             label="Departments"
//             placeholder="Comma separated"
//             value={form.departments}
//             onChangeText={(v) => update("departments", v)}
//             icon="grid-outline"
//           />

//           <InputField
//             label="Number of Doctors"
//             value={form.doctors}
//             onChangeText={(v) => update("doctors", v)}
//             keyboardType="number-pad"
//             icon="people-outline"
//           />
//         </MotiView>

//         <MotiView
//           from={{ opacity: 0, translateY: 20 }}
//           animate={{ opacity: 1, translateY: 0 }}
//           transition={{ type: "timing", duration: 500, delay: 600 }}
//         >
//           <Text style={styles.section}>Verification Documents</Text>

//           <TouchableOpacity
//             activeOpacity={0.86}
//             style={styles.uploadBox}
//             onPress={pickDocument}
//           >
//             <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
//             <Text style={styles.uploadTitle}>Upload Certificate</Text>
//             <Text style={styles.uploadSub}>PDF or high-res images</Text>
//           </TouchableOpacity>

//           {documents.map((doc, index) => (
//             <MotiView
//               key={`${doc.name}-${index}`}
//               from={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               style={styles.docRow}
//             >
//               <Ionicons
//                 name="document-attach"
//                 size={22}
//                 color={COLORS.staff}
//               />

//               <Text style={styles.docName} numberOfLines={1}>
//                 {doc.name}
//               </Text>

//               <TouchableOpacity onPress={() => removeDocument(index)}>
//                 <Ionicons name="close-circle" size={20} color="#EF4444" />
//               </TouchableOpacity>
//             </MotiView>
//           ))}

//           <GradientButton
//             title="Submit for Verification"
//             colors={[COLORS.staff, "#14B8A6"]}
//             onPress={submit}
//             style={{ marginTop: 24, marginBottom: 50 }}
//           />
//         </MotiView>
//       </ScrollView>

//       <Modal
//         visible={successPopup}
//         transparent
//         animationType="fade"
//         onRequestClose={closeSuccessPopup}
//       >
//         <View style={styles.modalOverlay}>
//           <MotiView
//             from={{ opacity: 0, scale: 0.8, translateY: 20 }}
//             animate={{ opacity: 1, scale: 1, translateY: 0 }}
//             transition={{ type: "spring", duration: 500 }}
//             style={styles.successCard}
//           >
//             <View style={styles.successIcon}>
//               <Ionicons name="checkmark-circle" size={58} color="#fff" />
//             </View>

//             <Text style={styles.successTitle}>Registration Submitted</Text>

//             <Text style={styles.successMessage}>
//               Your hospital registration has been submitted successfully and is
//               now under admin verification.
//             </Text>

//             <View style={styles.statusBadge}>
//               <Ionicons name="time-outline" size={17} color={COLORS.staff} />
//               <Text style={styles.statusText}>Pending Verification</Text>
//             </View>

//             <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
//               <Text style={styles.successButtonText}>OK</Text>
//             </Pressable>
//           </MotiView>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },

//   content: {
//     padding: 20,
//     paddingBottom: 34,
//   },

//   imageCard: {
//     height: 190,
//     borderRadius: 28,
//     overflow: "hidden",
//     marginBottom: 24,
//     elevation: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     backgroundColor: "#fff",
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//   },

//   imageOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   camCircle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//   },

//   imageText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 14,
//   },

//   section: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: COLORS.text,
//     marginTop: 12,
//     marginBottom: 16,
//     letterSpacing: -0.5,
//   },

//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   uploadBox: {
//     height: 140,
//     backgroundColor: "#F0FDFA",
//     borderRadius: 24,
//     borderWidth: 2,
//     borderStyle: "dashed",
//     borderColor: COLORS.staff + "50",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 16,
//   },

//   uploadTitle: {
//     color: COLORS.text,
//     fontWeight: "800",
//     marginTop: 10,
//   },

//   uploadSub: {
//     color: COLORS.muted,
//     fontSize: 13,
//     marginTop: 2,
//   },

//   docRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderRadius: 18,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },

//   docName: {
//     flex: 1,
//     color: COLORS.text,
//     fontWeight: "600",
//     marginHorizontal: 10,
//   },

//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(15, 23, 42, 0.55)",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 24,
//   },

//   successCard: {
//     width: "100%",
//     maxWidth: 390,
//     backgroundColor: COLORS.card || "#fff",
//     borderRadius: 30,
//     padding: 26,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: COLORS.border || "#E2E8F0",
//     shadowColor: "#000",
//     shadowOpacity: 0.15,
//     shadowRadius: 24,
//     elevation: 12,
//   },

//   successIcon: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: COLORS.staff || COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 18,
//   },

//   successTitle: {
//     fontSize: 23,
//     fontWeight: "900",
//     color: COLORS.text || "#1E293B",
//     textAlign: "center",
//   },

//   successMessage: {
//     marginTop: 10,
//     fontSize: 14,
//     lineHeight: 21,
//     color: COLORS.muted || "#64748B",
//     textAlign: "center",
//     fontWeight: "600",
//   },

//   statusBadge: {
//     marginTop: 18,
//     paddingHorizontal: 14,
//     paddingVertical: 9,
//     borderRadius: 999,
//     backgroundColor: "#F0FDFA",
//     borderWidth: 1,
//     borderColor: COLORS.staff + "40",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 7,
//   },

//   statusText: {
//     color: COLORS.staff,
//     fontSize: 13,
//     fontWeight: "900",
//   },

//   successButton: {
//     marginTop: 24,
//     width: "100%",
//     height: 52,
//     borderRadius: 18,
//     backgroundColor: COLORS.staff || COLORS.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   successButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });



import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { COLORS } from "../../constants/colors";
import AppHeader from "../../components/AppHeader";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { registerHospital } from "../../services/apiService";
import { showAlert } from "../../utility/showAlert";

export default function HospitalRegisterScreen({ navigation }) {
  const [successPopup, setSuccessPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
  );

  const [form, setForm] = useState({
    name: "",
    owner: "",
    phone: "",
    email: "",
    type: "",
    address: "",
    city: "",
    regNo: "",
    license: "",
    departments: "",
    doctors: "",
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const pickHospitalImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showAlert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [16, 9],
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
      multiple: false,
    });
    if (!result.canceled) {
      const file = result.assets[0];
      setDocuments((prev) => [...prev, file]);
    }
  };

  const removeDocument = (index) =>
    setDocuments((prev) => prev.filter((_, i) => i !== index));

  // ── SUBMIT ─────────────────────────────────────────────────────────────────
  const submit = async () => {
    if (!form.name.trim()) {
      showAlert("Missing Details", "Hospital name is required.");
      return;
    }
    if (!form.phone.trim()) {
      showAlert("Missing Details", "Phone number is required.");
      return;
    }
    if (!form.license.trim()) {
      showAlert("Missing Details", "License number is required.");
      return;
    }

    setLoading(true);
    try {
      await registerHospital({
        name: form.name.trim(),
        ownerName: form.owner.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        type: form.type.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        registrationNumber: form.regNo.trim(),
        licenseNumber: form.license.trim(),
        departments: form.departments.trim(),
        numberOfDoctors: parseInt(form.doctors, 10) || 0,
        imageUrl: image,
        // documents are file uploads — handle via multipart on backend if needed
        // For now, just send names as metadata
        documentNames: documents.map((d) => d.name),
        status: "PENDING",
      });
      setSuccessPopup(true);
    } catch (err) {
      showAlert("Submission Failed", err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeSuccessPopup = () => {
    setSuccessPopup(false);
    navigation.goBack();
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <View style={styles.wrapper}>
      <AppHeader
        title="Hospital Register"
        subtitle="Submit details for verification"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hospital Image */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 600 }}
        >
          <TouchableOpacity activeOpacity={0.86} style={styles.imageCard} onPress={pickHospitalImage}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.imageOverlay}>
              <View style={styles.camCircle}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
              <Text style={styles.imageText}>Change Hospital Image</Text>
            </View>
          </TouchableOpacity>
        </MotiView>

        {/* Basic Information */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
        >
          <Text style={styles.section}>Basic Information</Text>
          <InputField label="Hospital Name" value={form.name} onChangeText={(v) => update("name", v)} icon="business-outline" />
          <InputField label="Owner / Admin Name" value={form.owner} onChangeText={(v) => update("owner", v)} icon="person-outline" />
          <InputField label="Email" value={form.email} onChangeText={(v) => update("email", v)} keyboardType="email-address" icon="mail-outline" />
          <InputField label="Hospital Type" value={form.type} onChangeText={(v) => update("type", v)} icon="medkit-outline" />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <InputField label="Phone" value={form.phone} keyboardType="phone-pad" onChangeText={(v) => update("phone", v)} icon="call-outline" />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <InputField label="City" value={form.city} onChangeText={(v) => update("city", v)} icon="location-outline" />
            </View>
          </View>

          <InputField label="Address" value={form.address} multiline onChangeText={(v) => update("address", v)} icon="home-outline" />
        </MotiView>

        {/* Licensing & Staff */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 400 }}
        >
          <Text style={styles.section}>Licensing & Staff</Text>
          <InputField label="Registration No." value={form.regNo} onChangeText={(v) => update("regNo", v)} icon="document-text-outline" />
          <InputField label="License No." value={form.license} onChangeText={(v) => update("license", v)} icon="shield-checkmark-outline" />
          <InputField label="Departments" placeholder="Comma separated" value={form.departments} onChangeText={(v) => update("departments", v)} icon="grid-outline" />
          <InputField label="Number of Doctors" value={form.doctors} onChangeText={(v) => update("doctors", v)} keyboardType="number-pad" icon="people-outline" />
        </MotiView>

        {/* Documents */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 500, delay: 600 }}
        >
          <Text style={styles.section}>Verification Documents</Text>

          <TouchableOpacity activeOpacity={0.86} style={styles.uploadBox} onPress={pickDocument}>
            <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
            <Text style={styles.uploadTitle}>Upload Certificate</Text>
            <Text style={styles.uploadSub}>PDF or high-res images</Text>
          </TouchableOpacity>

          {documents.map((doc, index) => (
            <MotiView
              key={`${doc.name}-${index}`}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={styles.docRow}
            >
              <Ionicons name="document-attach" size={22} color={COLORS.staff} />
              <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
              <TouchableOpacity onPress={() => removeDocument(index)}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
              </TouchableOpacity>
            </MotiView>
          ))}

          {loading ? (
            <ActivityIndicator
              color={COLORS.staff}
              size="large"
              style={{ marginTop: 24, marginBottom: 50 }}
            />
          ) : (
            <GradientButton
              title="Submit for Verification"
              colors={[COLORS.staff, "#14B8A6"]}
              onPress={submit}
              style={{ marginTop: 24, marginBottom: 50 }}
            />
          )}
        </MotiView>
      </ScrollView>

      {/* ── SUCCESS MODAL ── */}
      <Modal visible={successPopup} transparent animationType="fade" onRequestClose={closeSuccessPopup}>
        <View style={styles.modalOverlay}>
          <MotiView
            from={{ opacity: 0, scale: 0.8, translateY: 20 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            transition={{ type: "spring", duration: 500 }}
            style={styles.successCard}
          >
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={58} color="#fff" />
            </View>
            <Text style={styles.successTitle}>Registration Submitted</Text>
            <Text style={styles.successMessage}>
              Your hospital registration has been submitted successfully and is now under admin verification.
            </Text>
            <View style={styles.statusBadge}>
              <Ionicons name="time-outline" size={17} color={COLORS.staff} />
              <Text style={styles.statusText}>Pending Verification</Text>
            </View>
            <Pressable style={styles.successButton} onPress={closeSuccessPopup}>
              <Text style={styles.successButtonText}>OK</Text>
            </Pressable>
          </MotiView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 34 },
  imageCard: { height: 190, borderRadius: 28, overflow: "hidden", marginBottom: 24, elevation: 10, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 10, backgroundColor: "#fff" },
  image: { width: "100%", height: "100%" },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.3)", alignItems: "center", justifyContent: "center" },
  camCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: "rgba(255,255,255,0.3)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
  imageText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  section: { fontSize: 18, fontWeight: "900", color: COLORS.text, marginTop: 12, marginBottom: 16, letterSpacing: -0.5 },
  row: { flexDirection: "row", alignItems: "center" },
  uploadBox: { height: 140, backgroundColor: "#F0FDFA", borderRadius: 24, borderWidth: 2, borderStyle: "dashed", borderColor: COLORS.staff + "50", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 10 },
  uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  docRow: { flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "#fff", borderRadius: 18, marginBottom: 10, borderWidth: 1, borderColor: "#E2E8F0" },
  docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(15, 23, 42, 0.55)", alignItems: "center", justifyContent: "center", padding: 24 },
  successCard: { width: "100%", maxWidth: 390, backgroundColor: COLORS.card || "#fff", borderRadius: 30, padding: 26, alignItems: "center", borderWidth: 1, borderColor: COLORS.border || "#E2E8F0", shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 24, elevation: 12 },
  successIcon: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.staff || COLORS.primary, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  successTitle: { fontSize: 23, fontWeight: "900", color: COLORS.text || "#1E293B", textAlign: "center" },
  successMessage: { marginTop: 10, fontSize: 14, lineHeight: 21, color: COLORS.muted || "#64748B", textAlign: "center", fontWeight: "600" },
  statusBadge: { marginTop: 18, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999, backgroundColor: "#F0FDFA", borderWidth: 1, borderColor: COLORS.staff + "40", flexDirection: "row", alignItems: "center", gap: 7 },
  statusText: { color: COLORS.staff, fontSize: 13, fontWeight: "900" },
  successButton: { marginTop: 24, width: "100%", height: 52, borderRadius: 18, backgroundColor: COLORS.staff || COLORS.primary, alignItems: "center", justifyContent: "center" },
  successButtonText: { color: "#fff", fontSize: 16, fontWeight: "900" },
});
