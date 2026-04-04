import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteData } from "@/lib/content";


interface StatementSectionProps {
  foregroundColor: string;
  mutedColor: string;
  data: SiteData["hero"];
}

const StatementSection = ({ foregroundColor, mutedColor, data }: StatementSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const hero = data;

  const yText = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const yButton = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-[5vh] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          style={{ y: yText }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
       
            {hero.statement}
       
        </motion.div>

        <motion.div
          style={{ y: yButton }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-20"
        >
          <a
            href="#about"
            className="pill-button transition-colors duration-500"
            style={{
              color: foregroundColor,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: foregroundColor,
              opacity: 0.6,
            }}
          >
            About me
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default StatementSection;

