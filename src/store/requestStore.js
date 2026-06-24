import { create } from 'zustand';

const INITIAL_REQUESTS = [
  {
    id: "LD-839201",
    patientName: "Rahul Sharma",
    age: 42,
    bloodType: "O-",
    unitsRequired: 3,
    hospitalName: "Apollo Hospital, Greams Road",
    city: "Chennai",
    state: "Tamil Nadu",
    requiredDate: "2026-06-24",
    urgencyLevel: "CRITICAL",
    contactName: "Sunita Sharma",
    phone: "+91 98409 88123",
    description: "Emergency bypass surgery. Patient requires immediate O- blood units.",
    status: "Matched",
    createdAt: "2026-06-24T09:30:00.000Z"
  },
  {
    id: "LD-284910",
    patientName: "Baby of Amrin",
    age: 1,
    bloodType: "A-",
    unitsRequired: 1,
    hospitalName: "Government General Hospital",
    city: "Chennai",
    state: "Tamil Nadu",
    requiredDate: "2026-06-25",
    urgencyLevel: "URGENT",
    contactName: "Mohammed Ali",
    phone: "+91 98407 89012",
    description: "Pediatric heart condition. Pre-surgery reserve.",
    status: "Searching",
    createdAt: "2026-06-24T08:15:00.000Z"
  },
  {
    id: "LD-948102",
    patientName: "K. Balachandran",
    age: 68,
    bloodType: "AB+",
    unitsRequired: 2,
    hospitalName: "MIOT International Hospital",
    city: "Chennai",
    state: "Tamil Nadu",
    requiredDate: "2026-06-28",
    urgencyLevel: "PLANNED",
    contactName: "B. Karthik",
    phone: "+91 98409 01234",
    description: "Planned knee replacement surgery. Blood required on standby.",
    status: "Confirmed",
    createdAt: "2026-06-23T15:00:00.000Z"
  }
];

export const useRequestStore = create((set, get) => ({
  requests: INITIAL_REQUESTS,

  submitRequest: (requestData) => {
    const id = `LD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newRequest = {
      id,
      patientName: requestData.patientName,
      age: Number(requestData.age),
      bloodType: requestData.bloodType || "Unknown",
      unitsRequired: Number(requestData.unitsRequired),
      hospitalName: requestData.hospitalName,
      city: requestData.city,
      state: requestData.state || "Tamil Nadu",
      requiredDate: requestData.requiredDate,
      urgencyLevel: requestData.urgencyLevel,
      contactName: requestData.contactName,
      phone: requestData.phone,
      description: requestData.description,
      status: "Searching",
      createdAt: new Date().toISOString()
    };

    set(state => ({
      requests: [newRequest, ...state.requests]
    }));

    // Simulate match transitions in the background!
    // Searching -> Matched (3s) -> Confirmed (8s) -> Donated (15s)
    setTimeout(() => {
      get().updateRequestStatus(id, "Matched");
    }, 4000);

    setTimeout(() => {
      get().updateRequestStatus(id, "Confirmed");
    }, 10000);

    return id;
  },

  updateRequestStatus: (id, status) => {
    set(state => ({
      requests: state.requests.map(req => 
        req.id === id ? { ...req, status } : req
      )
    }));
  }
}));
