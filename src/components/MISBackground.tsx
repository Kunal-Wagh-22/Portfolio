import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const keywords = [
  "CRM", "ERP", "BI", "Analytics", "Automation", 
  "Workflow", "Data Driven", "Business Intelligence", 
  "KPI", "Dashboard", "Optimization", "Strategy",
  "SCM", "Digital Transformation", "MIS",
  "Reporting", "Management", "Insights", "Process"
];

const FloatingKeyword = ({ text, index, foregroundColor }: { text: string; index: number; foregroundColor: string }) => {
  const [position, setPosition] = useState({ left: '0%', top: '0%' });
  
  useEffect(() => {
    // Concentrate on left side (0-45%) and some on the very top left
    // to avoid the graphs which are on the right and bottom right
    const left = (index * 13) % 40 + 5; // 5% to 45% (Left half only)
    const top = (index * 19) % 80 + 10; // 10% to 90% (Avoid very top edge)
    setPosition({ left: `${left}%`, top: `${top}%` });
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.06, 0.12, 0.06],
        scale: [1, 1.05, 1],
        rotate: [index % 2 === 0 ? -3 : 3, index % 2 === 0 ? 3 : -3, index % 2 === 0 ? -3 : 3],
        x: [0, (index % 3 - 1) * 20, 0],
        y: [0, (index % 2 - 0.5) * 30, 0]
      }}
      transition={{ 
        duration: 12 + (index % 5) * 3, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.3
      }}
      className="absolute pointer-events-none select-none"
      style={{ 
        left: position.left, 
        top: position.top,
        color: foregroundColor,
        fontFamily: "'Caveat', cursive",
        fontSize: `clamp(1rem, ${1.2 + (index % 2)}vw, 2.5rem)`,
        fontWeight: index % 5 === 0 ? '700' : '400',
        zIndex: 1
      }}
    >
      {text}
    </motion.div>
  );
};

export const MISBackground = ({ foregroundColor }: { foregroundColor: string }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] opacity-70">
      {keywords.map((word, i) => (
        <FloatingKeyword 
          key={`${word}-${i}`} 
          text={word} 
          index={i} 
          foregroundColor={foregroundColor} 
        />
      ))}
    </div>
  );
};
