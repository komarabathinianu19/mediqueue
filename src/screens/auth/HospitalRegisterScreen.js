


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





























import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti"; // Animation Library
import { COLORS } from "../../constants/colors";
import AppHeader from "../../components/AppHeader";
import InputField from "../../components/InputField";
import GradientButton from "../../components/GradientButton";
import { useHospital } from "../../context/HospitalContext";

export default function HospitalRegisterScreen({ navigation }) {
  const { registerHospital } = useHospital();

  const [documents, setDocuments] = useState([]);
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900"
  );

  const [form, setForm] = useState({
    name: "New Life Hospital",
    owner: "Ravi Kumar",
    phone: "9876543210",
    email: "newlife@gmail.com",
    type: "Multi-speciality",
    address: "Madhapur, Hyderabad",
    city: "Hyderabad",
    regNo: "REG1234567",
    license: "LIC987654",
    departments: "General OPD, Cardiology, Pediatrics",
    doctors: "12",
  });

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickHospitalImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [16, 9],
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.license.trim()) {
      Alert.alert("Missing Details", "Hospital name, phone and license are required.");
      return;
    }
    registerHospital({ ...form, documents, image });
    Alert.alert(
      "Registration Submitted",
      "Your hospital registration is under admin verification.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <AppHeader
        title="Hospital Register"
        subtitle="Submit details for verification"
        showBack
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. Image Card Animation */}
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 600 }}
        >
          <TouchableOpacity style={styles.imageCard} onPress={pickHospitalImage}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.imageOverlay}>
              <View style={styles.camCircle}>
                <Ionicons name="camera" size={24} color="#fff" />
              </View>
              <Text style={styles.imageText}>Change Hospital Image</Text>
            </View>
          </TouchableOpacity>
        </MotiView>

        {/* 2. Form Inputs - Subtle Staggered Slide */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 200 }}
        >
          <Text style={styles.section}>Basic Information</Text>
          <InputField label="Hospital Name" value={form.name} onChangeText={(v) => update("name", v)} />
          <InputField label="Owner / Admin Name" value={form.owner} onChangeText={(v) => update("owner", v)} />
          <View style={styles.row}>
            <View style={{ flex: 1 }}><InputField label="Phone" value={form.phone} keyboardType="phone-pad" onChangeText={(v) => update("phone", v)} /></View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}><InputField label="City" value={form.city} onChangeText={(v) => update("city", v)} /></View>
          </View>
          <InputField label="Address" value={form.address} multiline onChangeText={(v) => update("address", v)} />
        </MotiView>

        {/* 3. Legal/Staff Section */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
        >
          <Text style={styles.section}>Licensing & Staff</Text>
          <InputField label="Registration No." value={form.regNo} onChangeText={(v) => update("regNo", v)} />
          <InputField label="License No." value={form.license} onChangeText={(v) => update("license", v)} />
          <InputField label="Departments" placeholder="Comma separated" value={form.departments} onChangeText={(v) => update("departments", v)} />
        </MotiView>

        {/* 4. Document Upload Area */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 600 }}
        >
          <Text style={styles.section}>Verification Documents</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
            <Ionicons name="cloud-upload" size={38} color={COLORS.staff} />
            <Text style={styles.uploadTitle}>Upload Certificate</Text>
            <Text style={styles.uploadSub}>PDF or high-res images</Text>
          </TouchableOpacity>

          {documents.map((doc, index) => (
            <MotiView 
              key={index} 
              from={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              style={styles.docRow}
            >
              <Ionicons name="document-attach" size={22} color={COLORS.staff} />
              <Text style={styles.docName} numberOfLines={1}>{doc.name}</Text>
              <TouchableOpacity onPress={() => setDocuments(documents.filter((_, i) => i !== index))}>
                <Ionicons name="close-circle" size={20} color="#EF4444" />
              </TouchableOpacity>
            </MotiView>
          ))}

          <GradientButton
            title="Submit for Verification"
            colors={[COLORS.staff, "#14B8A6"]}
            onPress={submit}
            style={{ marginTop: 24, marginBottom: 50 }}
          />
        </MotiView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20 },
  imageCard: {
    height: 190,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  image: { width: "100%", height: "100%" },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  camCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  imageText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  section: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 16,
    letterSpacing: -0.5
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  uploadBox: {
    height: 140,
    backgroundColor: "#F0FDFA",
    borderRadius: 24,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.staff + '50',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  uploadTitle: { color: COLORS.text, fontWeight: "800", marginTop: 10 },
  uploadSub: { color: COLORS.muted, fontSize: 13, marginTop: 2 },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  docName: { flex: 1, color: COLORS.text, fontWeight: "600", marginHorizontal: 10 },
});
