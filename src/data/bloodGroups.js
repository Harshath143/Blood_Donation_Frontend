export const bloodGroupsData = [
  {
    group: 'O-',
    donateTo: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    receiveFrom: ['O-'],
    isUniversalDonor: true,
    isUniversalRecipient: false,
    popularity: 'Low supply, high demand',
    description: 'The universal donor. Critical in trauma care and emergencies when the patient\'s blood type is unknown.'
  },
  {
    group: 'O+',
    donateTo: ['A+', 'B+', 'AB+', 'O+'],
    receiveFrom: ['O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    popularity: 'Most common blood type',
    description: 'The most common blood type. Can be given to any positive blood group, making it highly valuable.'
  },
  {
    group: 'A-',
    donateTo: ['A+', 'A-', 'AB+', 'AB-'],
    receiveFrom: ['A-', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    popularity: 'Rare blood type',
    description: 'Highly requested for neonatal transfusions and surgeries for patients with A- and AB- types.'
  },
  {
    group: 'A+',
    donateTo: ['A+', 'AB+'],
    receiveFrom: ['A+', 'A-', 'O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    popularity: 'Second most common',
    description: 'One of the most common types. Playlets from A+ donors are particularly useful for cancer treatments.'
  },
  {
    group: 'B-',
    donateTo: ['B+', 'B-', 'AB+', 'AB-'],
    receiveFrom: ['B-', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    popularity: 'Very rare type',
    description: 'A very rare blood type. Vital for patients undergoing long-term blood therapies.'
  },
  {
    group: 'B+',
    donateTo: ['B+', 'AB+'],
    receiveFrom: ['B+', 'B-', 'O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    popularity: 'High demand',
    description: 'Essential for patients with B+ or AB+ blood types. B+ is common in many diverse populations.'
  },
  {
    group: 'AB-',
    donateTo: ['AB+', 'AB-'],
    receiveFrom: ['A-', 'B-', 'AB-', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: false,
    popularity: 'Rarest blood type',
    description: 'The rarest blood type. Plasma from AB- can be received by almost anyone, making it a critical asset.'
  },
  {
    group: 'AB+',
    donateTo: ['AB+'],
    receiveFrom: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    isUniversalDonor: false,
    isUniversalRecipient: true,
    popularity: 'Universal recipient',
    description: 'The universal recipient. AB+ patients can receive red blood cells from any blood type in emergencies.'
  }
];
