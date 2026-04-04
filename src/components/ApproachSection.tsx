import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteData } from "@/lib/content";

interface ApproachSectionProps {
  id?: string;
  foregroundColor: string;
  data: SiteData["approach"];
}

const ApproachSection = ({ id, foregroundColor, data }: ApproachSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const approach = data;

  const yHeadline = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yBody = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yButton = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={ref} id={id} className="relative py-[25vh] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* HEADLINE (Hero Typography Applied) */}
        <motion.div
          style={{ y: yHeadline ,color: foregroundColor}}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif-display text-[clamp(2.5rem,5vw,8rem)] font-bold tracking-tighter leading-[0.8]"
         
        >
          {approach.headline}
        </motion.div>

        {/* BODY (Hero Typography Applied) */}
        <motion.div
          style={{ y: yBody }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-4"
        >
          <p
            className="text-[clamp(14px,2vw,18px)]"
            style={{ color: foregroundColor, opacity: 0.6 }}
          >
            {approach.body}
          </p>
        </motion.div>

        {/* BUTTON (unchanged) */}
        <motion.div
          style={{ y: yButton }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-20"
        >
          <a
            href="#contact"
            className="pill-button transition-colors duration-500"
            style={{
              color: foregroundColor,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: foregroundColor,
              opacity: 0.6,
            }}
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachSection;
