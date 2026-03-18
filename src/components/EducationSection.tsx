import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteData } from "@/lib/content";

interface EducationSectionProps {
  foregroundColor: string;
  mutedColor: string;
  foregroundRaw: string;
  data: SiteData["education"];
}

const EducationSection = ({ foregroundColor, mutedColor, foregroundRaw, data }: EducationSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const education = data;

  const yHeader = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="education" className="py-[15vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          style={{ y: yHeader }}
          className="mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] transition-colors duration-500"
            style={{ color: foregroundColor }}
          >
            Education
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {education.map((edu: any, i: number) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className="p-8 transition-colors duration-500 rounded-[2px]"
              style={{ 
                border: `1px solid hsl(${foregroundRaw} / 0.15)`,
                background: `hsl(${foregroundRaw} / 0.05)`
              }}
            >

              <p className="text-label mb-4" style={{ color: mutedColor }}>
                {edu.duration}
              </p>
              <h3 className="font-serif-display text-xl font-semibold mb-2" style={{ color: foregroundColor }}>
                {edu.institution}
              </h3>
              <p className="font-sans-body font-medium text-sm mb-4" style={{ color: foregroundColor }}>
                {edu.degree}
              </p>
              <p className="text-xs opacity-60" style={{ color: mutedColor }}>
                {edu.location}
              </p>
              {edu.details && (
                <p className="mt-4 text-xs font-semibold" style={{ color: foregroundColor }}>
                  {edu.details}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

