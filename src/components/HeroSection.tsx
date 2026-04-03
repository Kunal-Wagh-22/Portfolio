import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteData } from "@/lib/content";

interface HeroSectionProps {
  id?: string;
  foregroundColor: string;
  isDark: boolean;
  data: SiteData["hero"];
}

const HeroSection = ({ id, foregroundColor, isDark, data }: HeroSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const hero = data;

  const yText = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id={id} ref={ref} className="relative h-[100vh] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col items-center justify-between pt-[12vh] pb-[8vh] text-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 mb-10 justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-medium opacity-60" style={{ color: foregroundColor }}>
              {hero.status}
            </span>
          </motion.div>

          <div className="font-serif-display text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tighter leading-[0.8] mb-1 flex flex-col items-center">
            <div className="flex flex-wrap justify-center">
              {hero.firstName.split("").map((letter: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1], 
                    delay: 0.3 + i * 0.05 
                  }}
                  style={{ color: foregroundColor, display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap mt-2 justify-center">
              {hero.lastName.split("").map((letter: string, i: number) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1], 
                    delay: 0.6 + i * 0.05 
                  }}
                  style={{ color: foregroundColor, display: "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          style={{ y: yText, opacity }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="flex flex-col items-center mt-6"
        >
          <p
            className="text-[clamp(14px,2vw,18px)] mb-10 transition-colors duration-500 max-w-2xl"
            style={{ color: foregroundColor, opacity: 0.6 }}
          >
            {hero.role}
          </p>
          <div className="flex flex-col items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
              className="flex flex-wrap gap-6 justify-center items-center"
            >
         <a
  href={hero.resumeUrl}
  download
  className="pill-button px-10 py-5 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-xl"
  style={{
    backgroundColor: foregroundColor,
    color: isDark ? "#000" : "#fff",
  }}
>
  Download my resume
</a>

            </motion.div>

            <div className="flex flex-wrap gap-12 justify-center">
              {hero.tags.map((item: { label: string; val: string }, i: number) => (
                <motion.div
                  key={item.label}
                  style={{ opacity: useTransform(scrollYProgress, [0, 0.4], [0.6, 0]) }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-[10px] md:text-[12px] uppercase tracking-widest mb-1" style={{ color: foregroundColor }}>{item.label}</span>
                  <span className="font-serif-display text-lg md:text-xl" style={{ color: foregroundColor }}>{item.val}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-40" style={{ color: foregroundColor }}>
            Scroll to explore
          </span>
          <div className="w-[1px] h-12 bg-current opacity-20" style={{ backgroundColor: foregroundColor }} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
