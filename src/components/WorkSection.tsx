import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SiteData } from "@/lib/content";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  index: number;
  foregroundColor: string;
  mutedColor: string;
  foregroundRaw: string;
}

const ProjectCard = ({ title, description, tags, image, index, foregroundColor, mutedColor, foregroundRaw }: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="p-8 md:p-12 transition-all duration-500 rounded-3xl group mb-12 hover:bg-white/5"
      style={{ 
        border: `1px solid hsl(${foregroundRaw} / 0.1)`,
        backgroundColor: `hsl(${foregroundRaw} / 0.05)`,
        backdropFilter: "blur(10px)"
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <motion.div style={{ y: yText }} className="flex flex-col justify-start pt-4">
          <h3
            className="font-serif-display text-[28px] font-semibold tracking-[-0.02em] transition-colors duration-500"
            style={{ color: foregroundColor }}
          >
            {title}
          </h3>
          <p
            className="text-body mt-4 max-w-[380px] transition-colors duration-500"
            style={{ color: mutedColor }}
          >
            {description}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {tags.map((tag: string) => (
              <span
                key={tag}
                className="font-sans-body inline-flex items-center px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-500"
                style={{ color: foregroundColor, border: `1px solid hsl(${foregroundRaw} / 0.25)` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y: yImage }} className="relative overflow-hidden rounded-[2px]">
          <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface WorkSectionProps {
  id?: string;
  foregroundColor: string;
  mutedColor: string;
  foregroundRaw: string;
  data: SiteData["projects"];
}

const WorkSection = ({ id, foregroundColor, mutedColor, foregroundRaw, data }: WorkSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const projects = data;

  const yHeader = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id={id} className="py-[15vh]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          style={{ y: yHeader }}
          className="flex items-baseline justify-between mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif-display text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] transition-colors duration-500"
            style={{ color: foregroundColor }}
          >
            Selected projects
          </motion.h2>
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif-display text-[clamp(1rem,2vw,1.5rem)] transition-colors duration-500 hidden md:block"
            style={{ color: mutedColor }}
          >
            View all →
          </motion.a>
        </motion.div>

        <div className="space-y-4">
          {projects.map((project: any, i: number) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={i}
              foregroundColor={foregroundColor}
              mutedColor={mutedColor}
              foregroundRaw={foregroundRaw}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;


