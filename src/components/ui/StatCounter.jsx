import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { formatNumber } from '../../utils/formatters';

export const StatCounter = ({ target, label, suffix = '', icon }) => {
  const [inView, setInView] = useState(false);
  const count = useCountUp(target, 1500, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      onViewportEnter={() => setInView(true)}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="text-4xl mb-3 flex items-center justify-center text-brand-warm bg-red-950/20 w-16 h-16 rounded-full border border-red-500/20 shadow-inner">
        {icon}
      </div>
      <div className="font-mono text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center justify-center">
        {formatNumber(count)}
        {suffix && <span className="text-brand-warm ml-0.5">{suffix}</span>}
      </div>
      <p className="text-sm font-medium text-stone-400 mt-2 tracking-wide uppercase">{label}</p>
    </motion.div>
  );
};
