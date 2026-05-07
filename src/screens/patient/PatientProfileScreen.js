


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { CommonActions } from "@react-navigation/native";

export default function PatientProfileScreen({ navigation }) {
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    age: "28 years",
    gender: "Female",
    bloodGroup: "O+",
    city: "Hyderabad",
    allergies: "No known allergies",
    medicalNotes: "Regular OPD visitor",
    emergencyContact: "+91 91234 56789",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  });

  const updateField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      updateField("photo", result.assets[0].uri);
    }
  };

  const saveProfile = () => {
    if (!profile.name.trim() || !profile.phone.trim()) {
      Alert.alert("Error", "Name and phone number are required.");
      return;
    }

    setEditMode(false);
    Alert.alert("Saved", "Profile updated successfully.");
  };

const logout = () => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "RoleSelect" }],
    })
  );
};
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity disabled={!editMode} onPress={pickImage}>
          <Image source={{ uri: profile.photo }} style={styles.avatar} />

          {editMode && (
            <View style={styles.cameraBadge}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

        {editMode ? (
          <>
            <EditInput
              value={profile.name}
              onChangeText={(v) => updateField("name", v)}
              big
            />
            <EditInput
              value={profile.phone}
              onChangeText={(v) => updateField("phone", v)}
              keyboardType="phone-pad"
            />
          </>
        ) : (
          <>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.phone}>{profile.phone}</Text>
          </>
        )}

        <TouchableOpacity
          style={styles.editBtn}
          onPress={editMode ? saveProfile : () => setEditMode(true)}
        >
          <Ionicons
            name={editMode ? "save-outline" : "create-outline"}
            size={18}
            color={COLORS.primary}
          />
          <Text style={styles.editText}>{editMode ? "Save Profile" : "Edit Profile"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <Info
          label="Age"
          value={profile.age}
          icon="calendar-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("age", v)}
        />
        <Info
          label="Gender"
          value={profile.gender}
          icon="female-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("gender", v)}
        />
        <Info
          label="Blood Group"
          value={profile.bloodGroup}
          icon="water-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("bloodGroup", v)}
        />
        <Info
          label="City"
          value={profile.city}
          icon="location-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("city", v)}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Health Notes</Text>

        <Info
          label="Allergies"
          value={profile.allergies}
          icon="medkit-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("allergies", v)}
        />
        <Info
          label="Medical Notes"
          value={profile.medicalNotes}
          icon="document-text-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("medicalNotes", v)}
        />
        <Info
          label="Emergency Contact"
          value={profile.emergencyContact}
          icon="call-outline"
          editMode={editMode}
          onChangeText={(v) => updateField("emergencyContact", v)}
        />
      </View>

      {editMode && (
        <TouchableOpacity style={styles.cancelBtn} onPress={() => setEditMode(false)}>
          <Text style={styles.cancelText}>Cancel Editing</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function EditInput({ value, onChangeText, keyboardType, big }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={[styles.editInput, big && styles.editInputBig]}
    />
  );
}

function Info({ label, value, icon, editMode, onChangeText }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <View style={styles.iconBox}>
          <Ionicons name={icon} size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>

      {editMode ? (
        <TextInput value={value} onChangeText={onChangeText} style={styles.inlineInput} />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 18 },

  header: {
    marginTop: 52,
    backgroundColor: COLORS.card,
    borderRadius: 28,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 32,
    backgroundColor: COLORS.lightBlue,
  },

  cameraBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: { marginTop: 14, fontSize: 22, fontWeight: "900", color: COLORS.text },
  phone: { color: COLORS.muted, marginTop: 5, fontWeight: "600" },

  editBtn: {
    marginTop: 16,
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  editText: { color: COLORS.primary, fontWeight: "900" },

  editInput: {
    marginTop: 8,
    width: "100%",
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    color: COLORS.text,
    fontWeight: "800",
    textAlign: "center",
  },

  editInputBig: {
    marginTop: 14,
    fontSize: 20,
    fontWeight: "900",
  },

  card: {
    marginTop: 18,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.text,
    marginBottom: 12,
  },

  infoRow: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  label: { color: COLORS.muted, fontWeight: "800" },

  value: {
    color: COLORS.text,
    fontWeight: "900",
    maxWidth: "48%",
    textAlign: "right",
  },

  inlineInput: {
    width: "48%",
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 10,
    color: COLORS.text,
    fontWeight: "800",
    textAlign: "right",
    backgroundColor: COLORS.background,
  },

  cancelBtn: {
    marginTop: 18,
    height: 50,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: { color: COLORS.muted, fontWeight: "900" },

  logoutBtn: {
    marginTop: 18,
    marginBottom: 34,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  logoutText: { color: COLORS.danger, fontWeight: "900" },
});