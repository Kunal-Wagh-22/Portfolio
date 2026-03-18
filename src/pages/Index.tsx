import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import ExperienceSection from "@/components/ExperienceSection";
import WorkSection from "@/components/WorkSection";
import StackSection from "@/components/StackSection";
import EducationSection from "@/components/EducationSection";
import ApproachSection from "@/components/ApproachSection";
import AnimatedChart from "@/components/AnimatedChart";
import { useLenis } from "@/hooks/useLenis";
import { useScrollGradient } from "@/hooks/use-scroll-gradient";
import { MISBackground } from "@/components/MISBackground";

import { useQuery } from "@tanstack/react-query";
import { fetchSiteData } from "@/lib/content";

const Index = () => {
  useLenis();
  const { data: siteData, isLoading } = useQuery({
    queryKey: ["siteData"],
    queryFn: fetchSiteData,
  });

  const { 
    bgGradient, 
    foregroundColor: fg, 
    mutedColor: muted,
    foregroundRaw: fgRaw,
    isDark
  } = useScrollGradient();

  if (isLoading || !siteData) {
    return <div className="min-h-screen bg-black" />; // Minimal loading state
  }



  return (
    <div
      className="relative min-h-screen transition-colors duration-1000 ease-in-out"
      style={{ backgroundImage: bgGradient }}
    >
      <MISBackground foregroundColor={fg} />
      <div className="relative z-[2]">
        <Navbar foregroundColor={fg} />
        
        <div className="relative">
          <AnimatedChart 
            type="bar" 
            foregroundColor={fg} 
            count={20}
            className="absolute top-[12%] right-[10%] w-[30%] h-[15%] opacity-40 pointer-events-none" 
          />
          <HeroSection foregroundColor={fg} isDark={isDark} data={siteData.hero} />
        </div>



        <div className="relative">
          <AnimatedChart 
            type="area" 
            foregroundColor={fg} 
            className="absolute bottom-[20%] right-[10%] w-[25%] h-[40px] opacity-40 pointer-events-none" 
          />
          <StatementSection foregroundColor={fg} mutedColor={muted} data={siteData.hero} />
        </div>

        <ExperienceSection 
          foregroundColor={fg} 
          mutedColor={muted} 
          foregroundRaw={fgRaw}
          data={siteData.experience}
        />


        <WorkSection 
          foregroundColor={fg} 
          mutedColor={muted} 
          foregroundRaw={fgRaw}
          data={siteData.projects}
        />

        <div className="relative">
          <AnimatedChart 
            type="scatter" 
            foregroundColor={fg} 
            className="absolute top-[20%] left-[10%] w-[25%] h-[20%] opacity-70 pointer-events-none" 
          />
          <StackSection 
            foregroundColor={fg} 
            mutedColor={muted} 
            foregroundRaw={fgRaw}
            data={siteData.skills}
          />
        </div>
        <EducationSection 
          foregroundColor={fg} 
          mutedColor={muted} 
          foregroundRaw={fgRaw}
          data={siteData.education}
        />

        <div className="relative">
          <AnimatedChart 
            type="line" 
            foregroundColor={fg} 
            className="absolute bottom-[20%] right-[10%] w-[40%] h-[15%] opacity-70 pointer-events-none" 
          />
          <ApproachSection 
            foregroundColor={fg} 
            mutedColor={muted} 
            data={siteData.approach}
          />

        </div>


      </div>
    </div>
  );
};

export default Index;
