import { useRef, useEffect, useState } from "react";

interface ScrollHighlightTextProps {
  children: string;
  className?: string;
  activeColor: string;
  inactiveColor: string;
  as?: "h2" | "p" | "span";
}

const ScrollHighlightText = ({
  children,
  className = "",
  activeColor,
  inactiveColor,
  as: Tag = "h2",
}: ScrollHighlightTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightProgress, setHighlightProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start highlighting when element enters viewport center zone
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const elementCenter = rect.top + rect.height / 2;

      if (elementCenter > start) {
        setHighlightProgress(0);
      } else if (elementCenter < end) {
        setHighlightProgress(1);
      } else {
        setHighlightProgress((start - elementCenter) / (start - end));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split text into words and apply highlight per word
  const words = children.split(" ");
  const totalWords = words.length;

  return (
    <div ref={containerRef} className={className}>
      <Tag className="inline">
        {words.map((word, i) => {
          const wordProgress = i / totalWords;
          const isHighlighted = wordProgress < highlightProgress;
          const isTransitioning =
            Math.abs(wordProgress - highlightProgress) < 1 / totalWords;

          return (
            <span
              key={i}
              className="transition-colors duration-300 inline"
              style={{
                color: isHighlighted || isTransitioning
                  ? activeColor
                  : inactiveColor,
              }}
            >
              {word}{" "}
            </span>
          );
        })}
      </Tag>
    </div>
  );
};

export default ScrollHighlightText;
