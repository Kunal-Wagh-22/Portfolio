import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteData } from "@/lib/content";

interface ExperienceSectionProps {
  foregroundColor: string;
  mutedColor: string;
  foregroundRaw: string;
  data: SiteData["experience"];
}

const ExperienceSection = ({ foregroundColor, mutedColor, foregroundRaw, data }: ExperienceSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const experience = data;

  const yHeader = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="experience" className="py-[10vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          style={{ y: yHeader }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] transition-colors duration-500"
            style={{ color: foregroundColor }}
          >
            Experience
          </motion.h2>
        </motion.div>

        <div className="space-y-16">
          {experience.map((exp: any, i: number) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 p-8 md:p-12 transition-all duration-500 rounded-2xl relative mb-8 hover:bg-white/5"
              style={{ 
                border: `1px solid hsl(${foregroundRaw} / 0.1)`,
                backgroundColor: `hsl(${foregroundRaw} / 0.05)`,
                backdropFilter: "blur(10px)"
              }}
            >

              <div className="relative">
                <p className="text-[clamp(10px,1.5vw,12px)] uppercase tracking-widest mb-2" style={{ color: mutedColor }}>
                  {exp.duration}
                </p>
                <h3 className="font-serif-display text-[clamp(1.25rem,3vw,1.75rem)] font-medium leading-tight mb-1" style={{ color: foregroundColor }}>
                  {exp.company}
                </h3>
                <p className="text-[clamp(12px,1.5vw,14px)] opacity-60" style={{ color: foregroundColor }}>
                  {exp.location}
                </p>
              </div>
              
              <div className="relative md:pl-8">
                {/* Vertical Divider for Desktop */}
                <div 
                  className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] opacity-20" 
                  style={{ backgroundColor: mutedColor }} 
                />
                
                <h4 className="font-sans-body font-semibold text-[clamp(1.125rem,2.5vw,1.5rem)] mb-4" style={{ color: foregroundColor }}>
                  {exp.role}
                </h4>
                <ul className="space-y-4">
                  {exp.description.map((item: string, idx: number) => (
                    <li 
                      key={idx} 
                      className="text-body transition-colors duration-500 leading-relaxed" 
                      style={{ color: mutedColor, fontSize: 'clamp(14px, 1.8vw, 17px)' }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

