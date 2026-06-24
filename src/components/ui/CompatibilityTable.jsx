import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { bloodCompatibility } from '../../utils/bloodCompatibility';

const BLOOD_TYPES = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

export const CompatibilityTable = () => {
  const [hoveredDonor, setHoveredDonor] = useState(null);
  const [hoveredRecipient, setHoveredRecipient] = useState(null);

  const isCompatible = (donor, recipient) => {
    return bloodCompatibility[donor]?.donateTo.includes(recipient);
  };

  return (
    <div className="overflow-x-auto rounded-card border border-stone-200 shadow-sm bg-white">
      <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg font-bold text-brand-charcoal">Interactive Compatibility Matrix</h3>
          <p className="text-xs text-brand-grey">Hover to trace donor-recipient relationships</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1 text-brand-green"><Check className="w-3.5 h-3.5" /> Compatible</span>
          <span className="flex items-center gap-1 text-stone-300"><X className="w-3.5 h-3.5" /> Incompatible</span>
        </div>
      </div>

      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-200">
            <th className="p-4 text-xs font-bold text-brand-charcoal text-left select-none">
              <span className="block text-[10px] text-brand-grey font-medium uppercase tracking-wider">Donor \ Recipient</span>
            </th>
            {BLOOD_TYPES.map(type => (
              <th
                key={type}
                className={`p-4 font-mono text-sm font-bold transition-colors select-none ${
                  hoveredRecipient === type ? 'bg-red-50 text-brand-primary' : 'text-brand-charcoal'
                }`}
                onMouseEnter={() => setHoveredRecipient(type)}
                onMouseLeave={() => setHoveredRecipient(null)}
              >
                {type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BLOOD_TYPES.map(donor => (
            <tr
              key={donor}
              className={`border-b border-stone-100 transition-colors ${
                hoveredDonor === donor ? 'bg-red-50/50' : 'hover:bg-stone-50/40'
              }`}
            >
              <td
                className={`p-4 text-left font-mono font-bold transition-colors border-r border-stone-100 select-none ${
                  hoveredDonor === donor ? 'text-brand-primary' : 'text-brand-charcoal'
                }`}
                onMouseEnter={() => setHoveredDonor(donor)}
                onMouseLeave={() => setHoveredDonor(null)}
              >
                {donor}
              </td>
              {BLOOD_TYPES.map(recipient => {
                const compatible = isCompatible(donor, recipient);
                const active = hoveredDonor === donor || hoveredRecipient === recipient;
                const intersection = hoveredDonor === donor && hoveredRecipient === recipient;

                return (
                  <td
                    key={recipient}
                    className={`p-4 transition-all duration-150 ${
                      intersection
                        ? 'bg-red-100'
                        : active
                        ? 'bg-red-50/30'
                        : ''
                    }`}
                    onMouseEnter={() => {
                      setHoveredDonor(donor);
                      setHoveredRecipient(recipient);
                    }}
                    onMouseLeave={() => {
                      setHoveredDonor(null);
                      setHoveredRecipient(null);
                    }}
                  >
                    <div className="flex justify-center items-center">
                      {compatible ? (
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          intersection ? 'bg-brand-green text-white scale-110 shadow-sm' : 'bg-emerald-50 text-brand-green border border-emerald-200'
                        }`}>
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-stone-50 text-stone-200 border border-stone-100">
                          <X className="w-3.5 h-3.5 stroke-[2]" />
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
