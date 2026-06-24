export const bloodCompatibility = {
  'O-':  { donateTo: ['A+','A-','B+','B-','AB+','AB-','O+','O-'], receiveFrom: ['O-'] },
  'O+':  { donateTo: ['A+','B+','AB+','O+'],                       receiveFrom: ['O+','O-'] },
  'A-':  { donateTo: ['A+','A-','AB+','AB-'],                       receiveFrom: ['A-','O-'] },
  'A+':  { donateTo: ['A+','AB+'],                                   receiveFrom: ['A+','A-','O+','O-'] },
  'B-':  { donateTo: ['B+','B-','AB+','AB-'],                       receiveFrom: ['B-','O-'] },
  'B+':  { donateTo: ['B+','AB+'],                                   receiveFrom: ['B+','B-','O+','O-'] },
  'AB-': { donateTo: ['AB+','AB-'],                                  receiveFrom: ['A-','B-','AB-','O-'] },
  'AB+': { donateTo: ['AB+'],                                        receiveFrom: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
};

export const getCompatibilityLabel = (type) => {
  if (type === 'O-') return 'Universal Donor';
  if (type === 'AB+') return 'Universal Recipient';
  return '';
};
