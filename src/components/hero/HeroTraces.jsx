import { useRef, useEffect, useContext } from "react";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { ThemeContext } from "../../context/ThemeContext";

export default function HeroTraces() {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef(null);

  // We keep state that doesn't trigger re-renders
  const stateRef = useRef({
    x: 0.1, y: 0, z: 0,
    points: []
  });

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    const s = stateRef.current;

    // Lorenz parameters
    const sigma = 10, rho = 28, beta = 8 / 3;
    // For smooth visuals we want a very small internal timestep and we step a few times
    const simTimeStep = 0.007;
    const stepsPerFrame = 2; // slow down drawing slightly

    for (let k = 0; k < stepsPerFrame; k++) {
      const dx = sigma * (s.y - s.x);
      const dy = s.x * (rho - s.z) - s.y;
      const dz = s.x * s.y - beta * s.z;

      s.x += dx * simTimeStep;
      s.y += dy * simTimeStep;
      s.z += dz * simTimeStep;

      s.points.push({ x: s.x, y: s.y, z: s.z });
    }

    const MAX_POINTS = 380;
    if (s.points.length > MAX_POINTS) {
      s.points.splice(0, s.points.length - MAX_POINTS);
    }

    ctx.clearRect(0, 0, W, H);

    if (s.points.length < 2) return;

    const cx = W / 2;
    const cy = H / 2;
    // Scale slightly by screen size
    const scale = Math.min(W, H) / 60; // adjust scale

    ctx.lineWidth = 1.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Draw the segments to simulate fading
    for (let i = 1; i < s.points.length; i++) {
      const p1 = s.points[i - 1];
      const p2 = s.points[i];

      // We can project onto x-z plane which looks like the classic butterfly
      // shift z down by rho to center it
      const px1 = cx + p1.x * scale * 1.5;
      const py1 = cy + (p1.z - 28) * scale * 1.5;
      const px2 = cx + p2.x * scale * 1.5;
      const py2 = cy + (p2.z - 28) * scale * 1.5;

      // Fading alpha logic
      const factor = i / s.points.length;
      const alpha = Math.pow(factor, 2) * (isDark ? 0.40 : 0.25);

      ctx.beginPath();
      ctx.moveTo(px1, py1);
      ctx.lineTo(px2, py2);

      // Let's grab RGB from T.accent1
      let r = 122, g = 92, b = 224;
      const hex = T.accent1;
      if (hex && hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.stroke();
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(document.body);
    window.addEventListener("resize", setSize);
    setSize();
    return () => { ro.disconnect(); window.removeEventListener("resize", setSize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} />;
}