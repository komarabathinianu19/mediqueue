// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { COLORS } from "../../constants/colors";
// import { useFeedback } from "../../context/FeedbackContext";

// const PATIENT_COLOR = COLORS?.patient || "#E83E7C";

// const QUESTIONS = [
//   {
//     key: "patientSatisfaction",
//     label: "Patient Satisfaction",
//     icon: "happy-outline",
//   },
//   {
//     key: "queueExperience",
//     label: "Queue Experience",
//     icon: "time-outline",
//   },
//   {
//     key: "doctorResponse",
//     label: "Doctor Response",
//     icon: "medkit-outline",
//   },
//   {
//     key: "staffBehaviour",
//     label: "Staff Behaviour",
//     icon: "people-outline",
//   },
//   {
//     key: "cleanliness",
//     label: "Cleanliness",
//     icon: "sparkles-outline",
//   },
// ];

// const DEPARTMENTS = [
//   "General OPD",
//   "Cardiology",
//   "Pediatrics",
//   "Dental",
//   "Orthopedic",
//   "Emergency",
// ];

// export default function PatientFeedbackScreen({ navigation }) {
//   const { submitFeedback } = useFeedback();

//   const [department, setDepartment] = useState("General OPD");
//   const [comment, setComment] = useState("");
//   const [ratings, setRatings] = useState({
//     patientSatisfaction: 0,
//     queueExperience: 0,
//     doctorResponse: 0,
//     staffBehaviour: 0,
//     cleanliness: 0,
//   });

//   const updateRating = (key, value) => {
//     setRatings((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     const notAnswered = QUESTIONS.some((q) => ratings[q.key] === 0);

//     if (notAnswered) {
//       Alert.alert("Incomplete Feedback", "Please answer all feedback questions.");
//       return;
//     }

//     submitFeedback({
//       department,
//       comment,
//       ratings,
//     });

//     Alert.alert(
//       "Thank You",
//       "Your feedback has been submitted successfully.",
//       [
//         {
//           text: "OK",
//           onPress: () => {
//             if (navigation?.goBack) {
//               navigation.goBack();
//             }
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <View style={styles.mainWrapper}>
//       <ScrollView
//         style={styles.container}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 40 }}
//       >
//         <LinearGradient
//           colors={[PATIENT_COLOR, "#BE185D"]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.backBtn}
//             onPress={() => navigation?.goBack?.()}
//           >
//             <Ionicons name="arrow-back" size={22} color="#fff" />
//           </TouchableOpacity>

//           <View style={{ flex: 1 }}>
//             <Text style={styles.title}>Patient Feedback</Text>
//             <Text style={styles.sub}>
//               Your answers help hospital staff improve service quality
//             </Text>
//           </View>

//           <View style={styles.headerIcon}>
//             <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
//           </View>
//         </LinearGradient>

//         <Text style={styles.sectionTitle}>Select Department</Text>

//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.deptList}
//         >
//           {DEPARTMENTS.map((item) => {
//             const selected = department === item;

//             return (
//               <TouchableOpacity
//                 key={item}
//                 activeOpacity={0.85}
//                 onPress={() => setDepartment(item)}
//                 style={[
//                   styles.deptChip,
//                   selected && {
//                     backgroundColor: PATIENT_COLOR,
//                     borderColor: PATIENT_COLOR,
//                   },
//                 ]}
//               >
//                 <Text
//                   style={[
//                     styles.deptChipText,
//                     selected && { color: "#fff" },
//                   ]}
//                 >
//                   {item}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </ScrollView>

//         <Text style={styles.sectionTitle}>Feedback Questions</Text>

//         {QUESTIONS.map((question) => (
//           <View key={question.key} style={styles.questionCard}>
//             <View style={styles.questionTop}>
//               <View style={styles.questionIcon}>
//                 <Ionicons name={question.icon} size={22} color={PATIENT_COLOR} />
//               </View>

//               <View style={{ flex: 1 }}>
//                 <Text style={styles.questionLabel}>{question.label}</Text>
//                 <Text style={styles.questionHint}>Rate from 1 to 5 stars</Text>
//               </View>
//             </View>

//             <View style={styles.starRow}>
//               {[1, 2, 3, 4, 5].map((value) => {
//                 const active = ratings[question.key] >= value;

//                 return (
//                   <TouchableOpacity
//                     key={value}
//                     activeOpacity={0.8}
//                     onPress={() => updateRating(question.key, value)}
//                     style={styles.starBtn}
//                   >
//                     <Ionicons
//                       name={active ? "star" : "star-outline"}
//                       size={32}
//                       color={active ? "#F59E0B" : "#CBD5E1"}
//                     />
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </View>
//         ))}

//         <Text style={styles.sectionTitle}>Additional Comments</Text>

//         <View style={styles.commentCard}>
//           <TextInput
//             value={comment}
//             onChangeText={setComment}
//             placeholder="Write your opinion here..."
//             placeholderTextColor="#94A3B8"
//             multiline
//             style={styles.input}
//           />
//         </View>

//         <TouchableOpacity
//           activeOpacity={0.9}
//           onPress={handleSubmit}
//           style={styles.submitBtnWrapper}
//         >
//           <LinearGradient
//             colors={[PATIENT_COLOR, "#BE185D"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.submitBtn}
//           >
//             <Ionicons name="send-outline" size={20} color="#fff" />
//             <Text style={styles.submitText}>Submit Feedback</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   mainWrapper: {
//     flex: 1,
//     backgroundColor: "#F8FAFC",
//   },
//   container: {
//     flex: 1,
//   },

//   header: {
//     paddingTop: 55,
//     paddingHorizontal: 20,
//     paddingBottom: 28,
//     borderBottomLeftRadius: 30,
//     borderBottomRightRadius: 30,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 14,
//   },
//   backBtn: {
//     width: 42,
//     height: 42,
//     borderRadius: 14,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 25,
//     fontWeight: "900",
//   },
//   sub: {
//     color: "rgba(255,255,255,0.82)",
//     fontSize: 13,
//     fontWeight: "600",
//     marginTop: 4,
//     lineHeight: 18,
//   },
//   headerIcon: {
//     width: 46,
//     height: 46,
//     borderRadius: 16,
//     backgroundColor: "rgba(255,255,255,0.18)",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "900",
//     color: "#0F172A",
//     marginHorizontal: 20,
//     marginTop: 24,
//     marginBottom: 14,
//   },

//   deptList: {
//     paddingHorizontal: 20,
//     gap: 10,
//   },
//   deptChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 18,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#E2E8F0",
//   },
//   deptChipText: {
//     color: "#475569",
//     fontWeight: "800",
//     fontSize: 13,
//   },

//   questionCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     marginBottom: 14,
//     borderRadius: 24,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//     elevation: 2,
//   },
//   questionTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 13,
//     marginBottom: 14,
//   },
//   questionIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 16,
//     backgroundColor: "#FDF2F8",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   questionLabel: {
//     color: "#1E293B",
//     fontSize: 16,
//     fontWeight: "900",
//   },
//   questionHint: {
//     color: "#64748B",
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 3,
//   },
//   starRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#F8FAFC",
//     borderRadius: 18,
//     padding: 10,
//   },
//   starBtn: {
//     padding: 4,
//   },

//   commentCard: {
//     backgroundColor: "#fff",
//     marginHorizontal: 20,
//     borderRadius: 24,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#F1F5F9",
//   },
//   input: {
//     minHeight: 110,
//     textAlignVertical: "top",
//     color: "#0F172A",
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   submitBtnWrapper: {
//     marginHorizontal: 20,
//     marginTop: 24,
//   },
//   submitBtn: {
//     height: 58,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 10,
//     elevation: 4,
//   },
//   submitText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "900",
//   },
// });  

























import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";
import { useFeedback } from "../../context/FeedbackContext";

const PATIENT_COLOR = COLORS?.patient || COLORS?.primary || "#E83E7C";

const QUESTIONS = [
  {
    key: "patientSatisfaction",
    label: "Patient Satisfaction",
    icon: "happy-outline",
  },
  {
    key: "queueExperience",
    label: "Queue Experience",
    icon: "time-outline",
  },
  {
    key: "doctorResponse",
    label: "Doctor Response",
    icon: "medkit-outline",
  },
  {
    key: "staffBehaviour",
    label: "Staff Behaviour",
    icon: "people-outline",
  },
  {
    key: "cleanliness",
    label: "Cleanliness",
    icon: "sparkles-outline",
  },
];

export default function PatientFeedbackScreen({ navigation }) {
  const { submitFeedback } = useFeedback();

  const [ratings, setRatings] = useState({
    patientSatisfaction: 0,
    queueExperience: 0,
    doctorResponse: 0,
    staffBehaviour: 0,
    cleanliness: 0,
  });

  const updateRating = (key, value) => {
    setRatings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const overallRating = () => {
    const values = Object.values(ratings);
    const answered = values.filter((value) => value > 0);

    if (answered.length === 0) return "0.0";

    const total = answered.reduce((sum, value) => sum + value, 0);
    return (total / answered.length).toFixed(1);
  };

  const handleSubmit = () => {
    const notAnswered = QUESTIONS.some((q) => ratings[q.key] === 0);

    if (notAnswered) {
      Alert.alert("Incomplete Feedback", "Please answer all feedback questions.");
      return;
    }

    submitFeedback({
      ratings,
    });

    Alert.alert("Thank You", "Your feedback has been submitted successfully.", [
      {
        text: "OK",
        onPress: () => {
          if (navigation?.goBack) {
            navigation.goBack();
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <LinearGradient
          colors={[PATIENT_COLOR, "#BE185D"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.backBtn}
            onPress={() => navigation?.goBack?.()}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Patient Feedback</Text>
            <Text style={styles.sub}>
              Please rate your hospital visit experience
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="chatbox-ellipses-outline" size={24} color="#fff" />
          </View>
        </LinearGradient>

        <View style={styles.overallCard}>
          <Text style={styles.overallLabel}>Your Overall Rating</Text>

          <Text style={styles.overallValue}>
            {overallRating()} <Text style={styles.overallMax}>/ 5</Text>
          </Text>

          <View style={styles.overallStars}>
            {[1, 2, 3, 4, 5].map((star) => {
              const current = Number(overallRating());
              let iconName = "star-outline";

              if (current >= star) {
                iconName = "star";
              } else if (current >= star - 0.5) {
                iconName = "star-half";
              }

              return (
                <Ionicons
                  key={star}
                  name={iconName}
                  size={20}
                  color="#F59E0B"
                />
              );
            })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Feedback Questions</Text>

        {QUESTIONS.map((question) => (
          <View key={question.key} style={styles.questionCard}>
            <View style={styles.questionTop}>
              <View style={styles.questionIcon}>
                <Ionicons name={question.icon} size={22} color={PATIENT_COLOR} />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.questionLabel}>{question.label}</Text>
                <Text style={styles.questionHint}>Rate from 1 to 5 stars</Text>
              </View>
            </View>

            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((value) => {
                const active = ratings[question.key] >= value;

                return (
                  <TouchableOpacity
                    key={value}
                    activeOpacity={0.8}
                    onPress={() => updateRating(question.key, value)}
                    style={styles.starBtn}
                  >
                    <Ionicons
                      name={active ? "star" : "star-outline"}
                      size={32}
                      color={active ? "#F59E0B" : "#CBD5E1"}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleSubmit}
          style={styles.submitBtnWrapper}
        >
          <LinearGradient
            colors={[PATIENT_COLOR, "#BE185D"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitBtn}
          >
            <Ionicons name="send-outline" size={20} color="#fff" />
            <Text style={styles.submitText}>Submit Feedback</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  container: {
    flex: 1,
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "900",
  },

  sub: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    lineHeight: 18,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  overallCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 26,
    padding: 22,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
    alignItems: "center",
  },

  overallLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  overallValue: {
    color: "#0F172A",
    fontSize: 46,
    fontWeight: "900",
    marginTop: 6,
  },

  overallMax: {
    color: "#94A3B8",
    fontSize: 18,
  },

  overallStars: {
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 14,
  },

  questionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    elevation: 2,
  },

  questionTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    marginBottom: 14,
  },

  questionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#FDF2F8",
    alignItems: "center",
    justifyContent: "center",
  },

  questionLabel: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "900",
  },

  questionHint: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  starRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    padding: 10,
  },

  starBtn: {
    padding: 4,
  },

  submitBtnWrapper: {
    marginHorizontal: 20,
    marginTop: 24,
  },

  submitBtn: {
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    elevation: 4,
  },

  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
});