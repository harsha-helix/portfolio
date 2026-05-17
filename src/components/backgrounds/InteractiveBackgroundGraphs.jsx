import { useRef, useEffect, useCallback, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

export default function InteractiveBackgroundGraphs() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  if (isMobile) return null; // Save CPU on mobile!
  const canvasRef = useRef(null);

  // Track mouse and nodes over time
  const stateRef = useRef({
    mouse: { x: -1000, y: -1000 },
    nodes: [...Array(50)].map(() => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
    }))
  });

  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stateRef.current.mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    stateRef.current.mouse = { x: -1000, y: -1000 };
  }, []);

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const ctx = canvas.getContext("2d");

    const state = stateRef.current;
    const { mouse, nodes } = state;

    ctx.clearRect(0, 0, W, H);

    // Update nodes
    nodes.forEach(n => {
      n.x += n.vx * dt * 0.03;
      n.y += n.vy * dt * 0.03;

      if (n.x < 0 || n.x > 1) n.vx *= -1;
      if (n.y < 0 || n.y > 1) n.vy *= -1;

      n.x = Math.max(0, Math.min(1, n.x));
      n.y = Math.max(0, Math.min(1, n.y));
    });

    const mouseRadius = 250;
    let r = 31, g = 30, b = 28; // matte black default for light mode
    if (isDark) {
      const hex = T.accent2;
      if (hex && hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
      }
    }

    ctx.lineWidth = 0.6;

    for (let i = 0; i < nodes.length; i++) {
      const ni = nodes[i];
      const npx = ni.x * W;
      const npy = ni.y * H;

      // Draw connection to mouse
      const dx = npx - mouse.x;
      const dy = npy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseRadius) {
        const alpha = (1 - dist / mouseRadius) * (isDark ? 0.35 : 0.65);
        ctx.beginPath();
        ctx.moveTo(npx, npy);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.stroke();
      }

      // Draw node
      ctx.beginPath();
      ctx.arc(npx, npy, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${isDark ? 0.4 : 0.8})`;
      ctx.fill();
    }

    for (let i = 0; i < nodes.length; i++) {
      const ni = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const nj = nodes[j];
        const dx = (ni.x - nj.x) * W;
        const dy = (ni.y - nj.y) * H;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const alpha = (1 - dist / 150) * (isDark ? 0.15 : 0.35);
          ctx.beginPath();
          ctx.moveTo(ni.x * W, ni.y * H);
          ctx.lineTo(nj.x * W, nj.y * H);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.stroke();
        }
      }
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas.parentElement);
    setSize();
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}