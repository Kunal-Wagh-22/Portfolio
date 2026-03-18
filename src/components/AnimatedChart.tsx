import { useEffect, useRef } from "react";

interface AnimatedChartProps {
  type: "bar" | "line" | "area" | "candlestick" | "scatter";
  foregroundColor: string;
  className?: string;
  count?: number;
}

const parseToRGBA = (color: string, alpha: number): string => {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return `rgba(128,128,128,${alpha})`;
  ctx.fillStyle = color;
  const parsed = ctx.fillStyle;
  if (parsed.startsWith("#")) {
    const r = parseInt(parsed.slice(1, 3), 16);
    const g = parseInt(parsed.slice(3, 5), 16);
    const b = parseInt(parsed.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return parsed.replace("rgb", "rgba").replace(")", `, ${alpha})`);
};

const generateData = (count: number, min: number, max: number): number[] => {
  const data: number[] = [];
  let val = min + Math.random() * (max - min);
  for (let i = 0; i < count; i++) {
    val += (Math.random() - 0.48) * (max - min) * 0.15;
    val = Math.max(min, Math.min(max, val));
    data.push(val);
  }
  return data;
};

const AnimatedChart = ({ type, foregroundColor, className, count = 12 }: AnimatedChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dataRef = useRef<number[]>(generateData(count, 20, 90));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const getComplementaryColor = (color: string) => {
        const ctxTemp = document.createElement("canvas").getContext("2d");
        if (!ctxTemp) return color;
        ctxTemp.fillStyle = color;
        const hex = ctxTemp.fillStyle;
        if (hex.startsWith("#")) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          // Simple complementary: 255 - channel
          return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
        }
        return color;
      };

      const color = foregroundColor;
      const compColor = getComplementaryColor(color);

      if (type === "bar") {
        const barW = (w / count) * 0.6;
        const gap = w / count;
        dataRef.current.forEach((val, i) => {
          // Moderate flattening (scale down to 40% height)
          const flattenedVal = (val * 0.4) + 10;
          const animVal = flattenedVal + Math.sin(time * 2 + i * 0.5) * 5;
          const barH = (Math.max(2, animVal) / 100) * h;
          const bx = i * gap + (gap - barW) / 2;
          const by = h - barH;
          
          const grad = ctx.createLinearGradient(bx, by, bx, h);
          grad.addColorStop(0, parseToRGBA(color, 0.4));
          grad.addColorStop(1, parseToRGBA(compColor, 0.1));
          
          ctx.fillStyle = grad;
          ctx.fillRect(bx, by, barW, barH);
          
          ctx.fillStyle = parseToRGBA(color, 0.6);
          ctx.fillRect(bx, by, barW, 2);
        });
      } else if (type === "line") {
          const stepX = w / (count - 1);
          ctx.beginPath();
          
          const grad = ctx.createLinearGradient(0, 0, w, 0);
          grad.addColorStop(0, parseToRGBA(color, 0.6));
          grad.addColorStop(1, parseToRGBA(compColor, 0.6));
          
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          dataRef.current.forEach((val, i) => {
            const animVal = val + Math.sin(time * 2 + i * 0.3) * 6;
            const px = i * stepX;
            const py = h - (animVal / 100) * h;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          });
          ctx.stroke();
      } else if (type === "area") {
          const stepX = w / (count - 1);
          
          // Fill gradient - fade to transparent faster
          const fillGrad = ctx.createLinearGradient(0, 0, 0, h);
          fillGrad.addColorStop(0, parseToRGBA(color, 0.15));
          fillGrad.addColorStop(1, parseToRGBA(compColor, 0));
          
          ctx.beginPath();
          ctx.moveTo(0, h);
          
          // Render smooth wave
          dataRef.current.forEach((val, i) => {
            // Keep it at the very bottom (90-95% down)
            const flattenedVal = (val * 0.05) + 5;
            const animVal = flattenedVal + Math.sin(time * 1.2 + i * 0.5) * 2;
            const px = i * stepX;
            const py = h - (animVal / 100) * h;
            
            if (i === 0) {
              ctx.lineTo(px, py);
            } else {
              const prevIdx = i - 1;
              const prevFlattened = (dataRef.current[prevIdx] * 0.4) + 15;
              const prevAnim = prevFlattened + Math.sin(time * 1.2 + prevIdx * 0.5) * 4;
              const prevX = prevIdx * stepX;
              const prevY = h - (prevAnim / 100) * h;
              
              // Curve to the next point
              const cpX = (prevX + px) / 2;
              ctx.bezierCurveTo(cpX, prevY, cpX, py, px, py);
            }
          });
          
          ctx.lineTo(w, h);
          ctx.closePath();
          ctx.fillStyle = fillGrad;
          ctx.fill();
          
          // Stroke gradient
          const strokeGrad = ctx.createLinearGradient(0, 0, w, 0);
          strokeGrad.addColorStop(0, parseToRGBA(color, 0.3));
          strokeGrad.addColorStop(1, parseToRGBA(compColor, 0.3));
          
          ctx.beginPath();
          ctx.strokeStyle = strokeGrad;
          ctx.lineWidth = 1.2;
          
          dataRef.current.forEach((val, i) => {
            const flattenedVal = (val * 0.05) + 5;
            const animVal = flattenedVal + Math.sin(time * 1.2 + i * 0.5) * 2;
            const px = i * stepX;
            const py = h - (animVal / 100) * h;
            
            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              const prevIdx = i - 1;
              const prevFlattened = (dataRef.current[prevIdx] * 0.4) + 15;
              const prevAnim = prevFlattened + Math.sin(time * 1.2 + prevIdx * 0.5) * 4;
              const prevX = prevIdx * stepX;
              const prevY = h - (prevAnim / 100) * h;
              const cpX = (prevX + px) / 2;
              ctx.bezierCurveTo(cpX, prevY, cpX, py, px, py);
            }
          });
          ctx.stroke();
      } else if (type === "scatter") {
          dataRef.current.forEach((val, i) => {
            const animX = (i / (count - 1)) * w;
            const animY = h - (val / 100) * h + Math.sin(time * 2 + i) * 10;
            const size = 3 + Math.sin(time + i) * 1.5;
            
            ctx.beginPath();
            ctx.arc(animX, animY, size, 0, Math.PI * 2);
            
            const dotGrad = ctx.createRadialGradient(animX, animY, 0, animX, animY, size);
            dotGrad.addColorStop(0, parseToRGBA(color, 0.3));
            dotGrad.addColorStop(1, parseToRGBA(compColor, 0.1));
            
            ctx.fillStyle = dotGrad;
            ctx.fill();
          });
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [type, foregroundColor, count]);

  return <canvas ref={canvasRef} className={className} />;
};

export default AnimatedChart;
