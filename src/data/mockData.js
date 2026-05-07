export const hospitals = [
  {
    id: "1",
    name: "City Care Hospital",
    type: "General OPD",
    distance: "1.2 km",
    wait: "35 mins wait",
    queue: 18,
    rating: 4.5,
    address: "Madhapur, Hyderabad",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
    departments: ["General OPD", "Cardiology", "Pediatrics", "Ortho", "Dental"],
  },
  {
    id: "2",
    name: "Apollo Clinic",
    type: "General OPD",
    distance: "1.8 km",
    wait: "22 mins wait",
    queue: 10,
    rating: 4.8,
    address: "Kukatpally, Hyderabad",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900",
    departments: ["General OPD", "Cardiology"],
  },
  {
    id: "3",
    name: "Sunrise Hospital",
    type: "Emergency + OPD",
    distance: "3.1 km",
    wait: "45 mins wait",
    queue: 24,
    rating: 4.2,
    address: "Ameerpet, Hyderabad",
    status: "approved",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900",
    departments: ["General OPD", "Pediatrics", "Dental"],
  },
];

export const queuePatients = [
  { token: "A-13", name: "Ravi Kumar", time: "10:30 AM", symptoms: "Fever" },
  { token: "A-14", name: "Sita Devi", time: "10:32 AM", symptoms: "Headache" },
  { token: "A-15", name: "Ahmed Khan", time: "10:35 AM", symptoms: "Cough" },
  { token: "A-16", name: "Priya Sharma", time: "10:40 AM", symptoms: "Cold" },
];

export const pendingHospitals = [
  {
    id: "p1",
    name: "City Care Hospital",
    owner: "Ravi Kumar",
    phone: "9876543210",
    email: "info@citycare.com",
    city: "Hyderabad",
    license: "LIC987654",
    regNo: "REG1234567",
    departments: 6,
    doctors: 18,
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900",
  },
  {
    id: "p2",
    name: "Life Plus Hospital",
    owner: "Suresh Reddy",
    phone: "9876500000",
    email: "lifeplus@gmail.com",
    city: "Bangalore",
    license: "LIC445566",
    regNo: "REG778899",
    departments: 4,
    doctors: 11,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900",
  },
];