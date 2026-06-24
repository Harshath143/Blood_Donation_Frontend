import { create } from 'zustand';
import { mockDonors } from '../data/mockDonors';

// Mock user session
const DEFAULT_USER = {
  id: "u_demo",
  fullName: "Priya K.",
  email: "priya.k@email.com",
  bloodType: "O+",
  city: "Chennai",
  state: "Tamil Nadu",
  isDonor: false,
  donationCount: 4, // 4 donations initially
  donations: [
    { id: "dh1", date: "2026-03-12", location: "Apollo Blood Bank, Chennai", units: 1, certificate: "cert_dh1.pdf" },
    { id: "dh2", date: "2025-11-05", location: "Government General Hospital, Chennai", units: 1, certificate: "cert_dh2.pdf" },
    { id: "dh3", date: "2025-07-20", location: "MIOT Hospital Blood Center, Chennai", units: 1, certificate: "cert_dh3.pdf" },
    { id: "dh4", date: "2025-03-10", location: "Apollo Blood Bank, Chennai", units: 1, certificate: "cert_dh4.pdf" }
  ],
  achievements: [
    { id: "badge_first", title: "First Drop", description: "Completed 1st blood donation", icon: "drop", unlocked: true },
    { id: "badge_lifesaver", title: "Life Saver", description: "Completed 5 blood donations", icon: "heart", unlocked: false },
    { id: "badge_hero", title: "Hero", description: "Completed 10 blood donations", icon: "shield", unlocked: false },
    { id: "badge_legend", title: "Legend", description: "Completed 25 blood donations", icon: "crown", unlocked: false }
  ],
  notifications: [
    { id: "n1", type: "match", title: "Urgent O+ Request", message: "A patient at Apollo Hospital needs O+ blood urgently. You are a match!", date: "2026-06-24", read: false },
    { id: "n2", type: "system", title: "Welcome to LifeDrop", message: "Thank you for creating an account on LifeDrop. Together we save lives.", date: "2026-06-23", read: true }
  ]
};

export const useUserStore = create((set, get) => ({
  user: DEFAULT_USER,
  donors: mockDonors,
  
  login: (email, password) => {
    // Basic mock login
    set({
      user: {
        ...DEFAULT_USER,
        email: email,
        fullName: email.split('@')[0].toUpperCase(),
      }
    });
    return true;
  },

  register: (fullName, email, password, role, bloodType, city) => {
    set({
      user: {
        id: `u_${Date.now()}`,
        fullName,
        email,
        bloodType,
        city,
        state: "Tamil Nadu",
        isDonor: role === 'donor' || role === 'both',
        donationCount: 0,
        donations: [],
        achievements: [
          { id: "badge_first", title: "First Drop", description: "Completed 1st blood donation", icon: "drop", unlocked: false },
          { id: "badge_lifesaver", title: "Life Saver", description: "Completed 5 blood donations", icon: "heart", unlocked: false },
          { id: "badge_hero", title: "Hero", description: "Completed 10 blood donations", icon: "shield", unlocked: false },
          { id: "badge_legend", title: "Legend", description: "Completed 25 blood donations", icon: "crown", unlocked: false }
        ],
        notifications: [
          { id: "n_welcome", type: "system", title: "Welcome to LifeDrop", message: "Your registration is complete. Help us bridge the blood supply gap!", date: new Date().toISOString().split('T')[0], read: false }
        ]
      }
    });
    return true;
  },

  logout: () => set({ user: null }),

  registerAsDonor: (donorData) => {
    const { user, donors } = get();
    const newDonor = {
      id: `d_${Date.now()}`,
      fullName: donorData.fullName || user?.fullName || "Anonymous Donor",
      bloodType: donorData.bloodType || user?.bloodType || "O+",
      phone: donorData.phone,
      email: donorData.email || user?.email || "",
      city: donorData.city || user?.city || "Chennai",
      state: donorData.state || "Tamil Nadu",
      pinCode: donorData.pinCode,
      lat: 13.0827 + (Math.random() - 0.5) * 0.1, // Scatter coordinates around Chennai
      lng: 80.2707 + (Math.random() - 0.5) * 0.1,
      lastDonatedDate: donorData.lastDonationDate || "Never",
      availability: donorData.availability || "Available Now",
      notifyEmergency: donorData.notifyEmergency,
      initials: (donorData.fullName || user?.fullName || "AD").split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      color: "red"
    };

    set({
      donors: [newDonor, ...donors],
      user: user ? { ...user, isDonor: true } : null
    });
    return true;
  },

  addDonation: (location, units = 1) => {
    const { user } = get();
    if (!user) return;

    const newCount = user.donationCount + units;
    
    // Process achievement unlocking
    const updatedAchievements = user.achievements.map(badge => {
      if (badge.id === 'badge_first' && newCount >= 1) return { ...badge, unlocked: true };
      if (badge.id === 'badge_lifesaver' && newCount >= 5) return { ...badge, unlocked: true };
      if (badge.id === 'badge_hero' && newCount >= 10) return { ...badge, unlocked: true };
      if (badge.id === 'badge_legend' && newCount >= 25) return { ...badge, unlocked: true };
      return badge;
    });

    const newDonation = {
      id: `dh_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      location,
      units,
      certificate: `cert_${Date.now()}.pdf`
    };

    set({
      user: {
        ...user,
        donationCount: newCount,
        donations: [newDonation, ...user.donations],
        achievements: updatedAchievements,
        notifications: [
          {
            id: `n_badge_${Date.now()}`,
            type: "system",
            title: "Donation Recorded!",
            message: `Thank you for donating ${units} unit(s). You have saved up to ${units * 3} lives.`,
            date: new Date().toISOString().split('T')[0],
            read: false
          },
          ...user.notifications
        ]
      }
    });
  },

  markNotificationsAsRead: () => {
    const { user } = get();
    if (!user) return;
    set({
      user: {
        ...user,
        notifications: user.notifications.map(n => ({ ...n, read: true }))
      }
    });
  }
}));
