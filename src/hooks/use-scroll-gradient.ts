import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
    setProgress(Math.min(1, Math.max(0, scrolled)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return progress;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface DualColor {
  h1: number; s1: number; l1: number;
  h2: number; s2: number; l2: number;
}

const darkGradientStops: { pos: number; color: DualColor }[] = [
  { pos: 0,    color: { h1: 24, s1: 5,  l1: 4,   h2: 24, s2: 5,  l2: 8 } },
  { pos: 0.15, color: { h1: 220, s1: 40, l1: 8,  h2: 250, s2: 30, l2: 12 } },
  { pos: 0.30, color: { h1: 24, s1: 5,  l1: 9,   h2: 24, s2: 5,  l2: 9 } },
  { pos: 1,    color: { h1: 24, s1: 5,  l1: 9,   h2: 24, s2: 5,  l2: 9 } },
];

const lightGradientStops: { pos: number; color: DualColor }[] = [
  { pos: 0,    color: { h1: 0, s1: 0,  l1: 98,  h2: 0,  s2: 0,  l2: 94 } },
  { pos: 0.15, color: { h1: 220, s1: 20, l1: 95, h2: 250, s2: 20, l2: 92 } },
  { pos: 1,    color: { h1: 0, s1: 0,  l1: 96,  h2: 0,  s2: 0,  l2: 96 } },
];

const interpolateDualColor = (progress: number, stops: typeof darkGradientStops): DualColor => {
  let lower = stops[0];
  let upper = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (progress >= stops[i].pos && progress <= stops[i + 1].pos) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const t = Math.min(1, Math.max(0, (progress - lower.pos) / (upper.pos - lower.pos)));

  return {
    h1: lerp(lower.color.h1, upper.color.h1, t),
    s1: lerp(lower.color.s1, upper.color.s1, t),
    l1: lerp(lower.color.l1, upper.color.l1, t),
    h2: lerp(lower.color.h2, upper.color.h2, t),
    s2: lerp(lower.color.s2, upper.color.s2, t),
    l2: lerp(lower.color.l2, upper.color.l2, t),
  };
};

export const useScrollGradient = () => {
  const progress = useScrollProgress();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark" || !mounted;
  const stops = isDark ? darkGradientStops : lightGradientStops;

  const bgGradient = useMemo(() => {
    const c = interpolateDualColor(progress, stops);
    return `linear-gradient(165deg, hsl(${c.h1}, ${c.s1}%, ${c.l1}%) 0%, hsl(${c.h1}, ${c.s1}%, ${c.l1}%) 45%, hsl(${c.h2}, ${c.s2}%, ${c.l2}%) 55%, hsl(${c.h2}, ${c.s2}%, ${c.l2}%) 100%)`;
  }, [progress, stops]);

  const foregroundRaw = isDark ? "0, 0%, 98%" : "0, 0%, 10%";
  const mutedRaw = isDark ? "0, 0%, 70%" : "0, 0%, 40%";
  const foregroundColor = `hsl(${foregroundRaw})`;
  const mutedColor = `hsl(${mutedRaw})`;

  return { progress, bgGradient, foregroundColor, mutedColor, foregroundRaw, mutedRaw, isDark };
};


