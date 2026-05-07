// import React, { createContext, useContext, useMemo, useState } from "react";

// const HospitalContext = createContext(null);

// const initialHospitals = [
//   {
//     id: "h1",
//     name: "City Care Hospital",
//     owner: "Ravi Kumar",
//     phone: "9876543210",
//     email: "info@citycare.com",
//     city: "Hyderabad",
//     address: "Madhapur, Hyderabad",
//     license: "LIC987654",
//     regNo: "REG1234567",
//     departments: ["General OPD", "Cardiology", "Pediatrics"],
//     doctors: 18,
//     wait: "35 mins wait",
//     queue: 18,
//     rating: 4.5,
//     distance: "1.2 km",
//     status: "approved",
//     image:
//       "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
//     documents: [],
//     rejectionReason: "",
//   },
//   {
//     id: "h2",
//     name: "Life Plus Hospital",
//     owner: "Suresh Reddy",
//     phone: "9876500000",
//     email: "lifeplus@gmail.com",
//     city: "Bangalore",
//     address: "BTM Layout, Bangalore",
//     license: "LIC445566",
//     regNo: "REG778899",
//     departments: ["General OPD", "Ortho"],
//     doctors: 11,
//     wait: "22 mins wait",
//     queue: 10,
//     rating: 4.7,
//     distance: "2.4 km",
//     status: "pending",
//     image:
//       "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900",
//     documents: [],
//     rejectionReason: "",
//   },
// ];

// export function HospitalProvider({ children }) {
//   const [hospitals, setHospitals] = useState(initialHospitals);

//   const approvedHospitals = useMemo(
//     () => hospitals.filter((h) => h.status === "approved"),
//     [hospitals]
//   );

//   const pendingHospitals = useMemo(
//     () => hospitals.filter((h) => h.status === "pending"),
//     [hospitals]
//   );

//   const rejectedHospitals = useMemo(
//     () => hospitals.filter((h) => h.status === "rejected"),
//     [hospitals]
//   );

//   const registerHospital = (hospitalData) => {
//     const newHospital = {
//       id: `h-${Date.now()}`,
//       wait: "Not active",
//       queue: 0,
//       rating: 0,
//       distance: "New",
//       status: "pending",
//       rejectionReason: "",
//       image:
//         hospitalData.image ||
//         "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900",
//       ...hospitalData,
//     };

//     setHospitals((prev) => [newHospital, ...prev]);
//     return newHospital;
//   };

//   const approveHospital = (id) => {
//     setHospitals((prev) =>
//       prev.map((h) =>
//         h.id === id ? { ...h, status: "approved", rejectionReason: "" } : h
//       )
//     );
//   };

//   const rejectHospital = (id, reason = "Documents are invalid") => {
//     setHospitals((prev) =>
//       prev.map((h) =>
//         h.id === id ? { ...h, status: "rejected", rejectionReason: reason } : h
//       )
//     );
//   };

//   const value = {
//     hospitals,
//     approvedHospitals,
//     pendingHospitals,
//     rejectedHospitals,
//     registerHospital,
//     approveHospital,
//     rejectHospital,
//   };

//   return (
//     <HospitalContext.Provider value={value}>
//       {children}
//     </HospitalContext.Provider>
//   );
// }

// export function useHospital() {
//   const context = useContext(HospitalContext);

//   if (!context) {
//     throw new Error("useHospital must be used inside HospitalProvider");
//   }

//   return context;
// }    























import React, { createContext, useContext, useMemo, useState } from "react";

const HospitalContext = createContext(null);

export const DEPARTMENT_IMAGES = {
  "General OPD":
    "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
  Cardiology:
    "https://cdn-icons-png.flaticon.com/512/2966/2966486.png",
  Pediatrics:
    "https://cdn-icons-png.flaticon.com/512/2966/2966535.png",
  ENT:
    "https://cdn-icons-png.flaticon.com/512/3209/3209072.png",
  Ortho:
    "https://cdn-icons-png.flaticon.com/512/2966/2966420.png",
  Dermatology:
    "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
  Dental:
    "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
  Neurology:
    "https://cdn-icons-png.flaticon.com/512/2966/2966334.png",
};

const defaultDoctorTimings = {
  morning: {
    label: "Morning",
    enabled: true,
    startTime: "09:00 AM",
    endTime: "12:00 PM",
    maxPatients: 30,
  },
  afternoon: {
    label: "Afternoon",
    enabled: true,
    startTime: "01:00 PM",
    endTime: "04:00 PM",
    maxPatients: 25,
  },
  night: {
    label: "Night",
    enabled: true,
    startTime: "06:00 PM",
    endTime: "09:00 PM",
    maxPatients: 20,
  },
};

const initialHospitals = [
  {
    id: "h1",
    name: "City Care Hospital",
    owner: "Ravi Kumar",
    phone: "9876543210",
    email: "info@citycare.com",
    city: "Hyderabad",
    address: "Madhapur, Hyderabad",
    license: "LIC987654",
    regNo: "REG1234567",
    departments: ["General OPD", "Cardiology", "Pediatrics", "ENT"],
    doctors: 18,
    wait: "35 mins wait",
    queue: 18,
    rating: 4.5,
    distance: "1.2 km",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
    documents: [],
    rejectionReason: "",

    doctorList: [
      {
        id: "d1",
        name: "Dr. Arjun",
        department: "General OPD",
        qualification: "MBBS, MD",
        experience: "12 years",
        fee: 300,
        image:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
        timings: defaultDoctorTimings,
      },
      {
        id: "d2",
        name: "Dr. Meera Sharma",
        department: "Cardiology",
        qualification: "MBBS, DM Cardiology",
        experience: "10 years",
        fee: 600,
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500",
        timings: {
          ...defaultDoctorTimings,
          night: {
            label: "Night",
            enabled: false,
            startTime: "",
            endTime: "",
            maxPatients: 0,
          },
        },
      },
      {
        id: "d3",
        name: "Dr. Kavya Rao",
        department: "Pediatrics",
        qualification: "MBBS, DCH",
        experience: "8 years",
        fee: 400,
        image:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500",
        timings: defaultDoctorTimings,
      },
      {
        id: "d4",
        name: "Dr. Sameer Khan",
        department: "ENT",
        qualification: "MBBS, MS ENT",
        experience: "9 years",
        fee: 450,
        image:
          "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500",
        timings: defaultDoctorTimings,
      },
    ],
  },
  {
    id: "h2",
    name: "Life Plus Hospital",
    owner: "Suresh Reddy",
    phone: "9876500000",
    email: "lifeplus@gmail.com",
    city: "Bangalore",
    address: "BTM Layout, Bangalore",
    license: "LIC445566",
    regNo: "REG778899",
    departments: ["General OPD", "Ortho", "Dental"],
    doctors: 11,
    wait: "22 mins wait",
    queue: 10,
    rating: 4.7,
    distance: "2.4 km",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900",
    documents: [],
    rejectionReason: "",

    doctorList: [
      {
        id: "d5",
        name: "Dr. Priya Nair",
        department: "General OPD",
        qualification: "MBBS",
        experience: "7 years",
        fee: 250,
        image:
          "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500",
        timings: defaultDoctorTimings,
      },
      {
        id: "d6",
        name: "Dr. Rakesh Verma",
        department: "Ortho",
        qualification: "MBBS, MS Ortho",
        experience: "14 years",
        fee: 500,
        image:
          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500",
        timings: defaultDoctorTimings,
      },
    ],
  },
];

export function HospitalProvider({ children }) {
  const [hospitals, setHospitals] = useState(initialHospitals);

  const approvedHospitals = useMemo(
    () => hospitals.filter((h) => h.status === "approved"),
    [hospitals]
  );

  const pendingHospitals = useMemo(
    () => hospitals.filter((h) => h.status === "pending"),
    [hospitals]
  );

  const rejectedHospitals = useMemo(
    () => hospitals.filter((h) => h.status === "rejected"),
    [hospitals]
  );

  const registerHospital = (hospitalData) => {
    const newHospital = {
      id: `h-${Date.now()}`,
      wait: "Not active",
      queue: 0,
      rating: 0,
      distance: "New",
      status: "pending",
      rejectionReason: "",
      image:
        hospitalData.image ||
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900",
      doctorList: [],
      ...hospitalData,
    };

    setHospitals((prev) => [newHospital, ...prev]);
    return newHospital;
  };

  const approveHospital = (id) => {
    setHospitals((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, status: "approved", rejectionReason: "" } : h
      )
    );
  };

  const rejectHospital = (id, reason = "Documents are invalid") => {
    setHospitals((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, status: "rejected", rejectionReason: reason } : h
      )
    );
  };

  const addDoctorToHospital = (hospitalId, doctorData) => {
    const newDoctor = {
      id: `d-${Date.now()}`,
      timings: defaultDoctorTimings,
      ...doctorData,
    };

    setHospitals((prev) =>
      prev.map((hospital) =>
        hospital.id === hospitalId
          ? {
              ...hospital,
              doctorList: [...(hospital.doctorList || []), newDoctor],
              doctors: (hospital.doctorList || []).length + 1,
              departments: hospital.departments.includes(newDoctor.department)
                ? hospital.departments
                : [...hospital.departments, newDoctor.department],
            }
          : hospital
      )
    );

    return newDoctor;
  };

  const updateDoctorTimings = (hospitalId, doctorId, timings) => {
    setHospitals((prev) =>
      prev.map((hospital) => {
        if (hospital.id !== hospitalId) return hospital;

        return {
          ...hospital,
          doctorList: (hospital.doctorList || []).map((doctor) =>
            doctor.id === doctorId
              ? {
                  ...doctor,
                  timings: {
                    ...doctor.timings,
                    ...timings,
                  },
                }
              : doctor
          ),
        };
      })
    );
  };

  const getHospitalById = (hospitalId) => {
    return hospitals.find((h) => h.id === hospitalId);
  };

  const getDoctorsByHospitalAndDepartment = (hospitalId, department) => {
    const hospital = getHospitalById(hospitalId);
    if (!hospital) return [];

    return (hospital.doctorList || []).filter(
      (doctor) => doctor.department === department
    );
  };

  const getDepartmentImage = (departmentName) => {
    return (
      DEPARTMENT_IMAGES[departmentName] ||
      "https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
    );
  };

  const value = {
    hospitals,
    approvedHospitals,
    pendingHospitals,
    rejectedHospitals,

    registerHospital,
    approveHospital,
    rejectHospital,

    addDoctorToHospital,
    updateDoctorTimings,
    getHospitalById,
    getDoctorsByHospitalAndDepartment,
    getDepartmentImage,

    defaultDoctorTimings,
    DEPARTMENT_IMAGES,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
}

export function useHospital() {
  const context = useContext(HospitalContext);

  if (!context) {
    throw new Error("useHospital must be used inside HospitalProvider");
  }

  return context;
}