import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  SiPython,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiSolidity,
  SiGit,
  SiDocker,
  SiTypescript,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";
import { cn } from "@/lib/utils";
import type { SiteData } from "@/lib/content";

// Map icon strings to component references
const iconMap: Record<string, any> = {
  SiPython,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiSolidity,
  SiGit,
  SiDocker,
  SiTypescript,
  FaJava,
  IoLogoTableau,
};

interface StackSectionProps {
  id?: string;
  foregroundColor: string;
  foregroundRaw: string;
  data: SiteData["skills"];
}

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
  color,
}: {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  color: string;
}) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 60, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [distanceFromCenter * 45, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0.5, 1]);

  return (
    <motion.span
      className={cn("inline-block text-white", isSpace && "w-6")}
      style={{ x, rotateX, opacity, color }}
    >
      {char}
    </motion.span>
  );
};

const IconStage = ({
  Icon,
  index,
  centerIndex,
  scrollYProgress,
  brandColor,
  label,
  foregroundColor
}: {
  Icon: any;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
  brandColor: string;
  label: string;
  foregroundColor: string;
}) => {
  const distanceFromCenter = index - centerIndex;
  
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 60, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 0.4, 1]);

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      style={{ x, y, scale, opacity }}
    >
      <div 
        className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-110 group relative"
        style={{ border: `1px solid ${brandColor}30`, background: `${brandColor}05` }}
      >
        <div 
          className="absolute inset-0 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `0 0 20px ${brandColor}20` }}
        />
        {Icon ? (
          <Icon className="w-6 h-6 md:w-10 md:h-10" style={{ color: brandColor }} />
        ) : (
          <div className="w-6 h-6 md:w-10 md:h-10 bg-gray-500/20 rounded-sm" />
        )}
      </div>
      <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] opacity-40 font-medium" style={{ color: foregroundColor }}>
        {label}
      </span>
    </motion.div>
  );
};

const StackSection = ({ id, foregroundColor, foregroundRaw, data }: StackSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const skillData = data;

  const text = "TECHNICAL STACK";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const skillCenterIndex = Math.floor(skillData.length / 2);

  return (
    <div id={id} ref={sectionRef} className="relative h-[250vh]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-[15vh]">
        
        {/* Stage 1: Text Fan Out */}
        <motion.div 
          className="w-full flex justify-center mb-16"
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 1, 0]),
            scale: useTransform(scrollYProgress, [0, 0.35], [1, 0.85]),
            perspective: "1000px"
          }}
        >
          <div className="font-serif-display text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-tighter uppercase flex">
            {characters.map((char, i) => (
              <CharacterV1
                key={i}
                char={char}
                index={i}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
                color={foregroundColor}
              />
            ))}
          </div>
        </motion.div>

        {/* Stage 2: Icons Converge */}
        <motion.div
          className="w-full flex items-center justify-center px-6"
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.45, 0.9], [0, 1, 1]),
            scale: useTransform(scrollYProgress, [0.35, 0.5], [1.1, 1]),
            y: useTransform(scrollYProgress, [0.35, 0.5], [50, 0])
          }}
        >
          <div 
            className="flex flex-wrap justify-center gap-x-8 gap-y-10 max-w-5xl p-10 md:p-16 rounded-[2.5rem] transition-all duration-500"
            style={{ 
              border: `1px solid hsl(${foregroundRaw} / 0.1)`,
              backgroundColor: `hsl(${foregroundRaw} / 0.03)`,
              backdropFilter: "blur(5px)"
            }}
          >

            {skillData.map((skill: any, i: number) => (
              <IconStage
                key={skill.name}
                Icon={iconMap[skill.iconType]}
                index={i}
                centerIndex={skillCenterIndex}
                scrollYProgress={useTransform(scrollYProgress, [0.3, 0.6], [0, 1])}
                brandColor={skill.color}
                label={skill.name}
                foregroundColor={foregroundColor}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Label */}
        <motion.div
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          style={{ 
            opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.8, 0.9], [0, 0.6, 0.6, 0]),
            y: useTransform(scrollYProgress, [0.4, 0.5], [20, 0])
          }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-current" style={{ color: foregroundColor }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium" style={{ color: foregroundColor }}>
            Tech Ecosystem
          </span>
        </motion.div>

      </div>
    </div>
  );
};

export default StackSection;

