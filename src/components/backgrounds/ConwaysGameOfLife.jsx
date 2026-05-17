import { useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

export default function ConwaysGameOfLife() {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef();

  const stateRef = useRef({
    cols: 0, rows: 0,
    grid: [], // visual states [0..1]
    logicGrid: [], // true sim states 0 or 1
    cellSize: typeof window !== "undefined" && window.innerWidth < 850 ? 18 : 24,
    lastLogicTick: 0,
    totalElapsed: 0  // accumulated ms — useAnimationFrame gives delta, not timestamp
  });

  const mouseRef = useRef({ x: -100, y: -100 });

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const targetWidth = Math.floor(canvas.offsetWidth * dpr);
    const targetHeight = Math.floor(canvas.offsetHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.scale(dpr, dpr);
      const cols = Math.floor(canvas.offsetWidth / stateRef.current.cellSize) + 1;
      const rows = Math.floor(canvas.offsetHeight / stateRef.current.cellSize) + 1;
      stateRef.current.cols = cols;
      stateRef.current.rows = rows;

      const initialGrid = Array(rows).fill(0).map(() =>
        Array(cols).fill(0).map(() => Math.random() > 0.90 ? 1 : 0)
      );
      stateRef.current.logicGrid = initialGrid;
      stateRef.current.grid = initialGrid.map(row => [...row]);
    }

    const { cols, rows, grid, logicGrid, cellSize } = stateRef.current;

    // Accumulate total elapsed time (useAnimationFrame gives delta, not timestamp)
    stateRef.current.totalElapsed += dt;
    const totalTime = stateRef.current.totalElapsed;

    // 1. GAME OF LIFE LOGIC (runs every 1200ms)
    if (totalTime - stateRef.current.lastLogicTick > 1200) {
      stateRef.current.lastLogicTick = totalTime;

      const newLogic = Array(rows).fill(0).map(() => Array(cols).fill(0));
      let aliveCount = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let neighbors = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (i === 0 && j === 0) continue;
              const nr = r + i, nc = c + j;
              if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (logicGrid[nr][nc] === 1) neighbors++;
              }
            }
          }
          let currentlyAlive = logicGrid[r][c] === 1;
          let nextAlive = currentlyAlive;
          if (currentlyAlive && (neighbors < 2 || neighbors > 3)) nextAlive = false;
          if (!currentlyAlive && neighbors === 3) nextAlive = true;

          // Ambient entropy to prevent total stabilization
          if (Math.random() < 0.003) nextAlive = true; // 0.3% chance spontaneous generation
          if (currentlyAlive && Math.random() < 0.02) nextAlive = false; // 2% chance spontaneous decay

          if (nextAlive) {
            newLogic[r][c] = 1;
            aliveCount++;
          }
        }
      }

      // Seed if population too low or randomly
      if (aliveCount < (rows * cols) * 0.05 || Math.random() < 0.2) {
        let sr = Math.floor(Math.random() * rows);
        let sc = Math.floor(Math.random() * cols);
        if (sr + 1 < rows && sc + 2 < cols) {
          newLogic[sr][sc + 1] = 1;
          newLogic[sr + 1][sc + 2] = 1;
          newLogic[sr + 2][sc] = 1; newLogic[sr + 2][sc + 1] = 1; newLogic[sr + 2][sc + 2] = 1;
        }
      }

      // Mouse interactions inject life directly into logic grid
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx >= 0 && my >= 0) {
        let mc = Math.floor(mx / cellSize);
        let mr = Math.floor(my / cellSize);
        if (mr >= 0 && mr < rows && mc >= 0 && mc < cols) {
          newLogic[mr][mc] = 1;
          if (Math.random() > 0.5 && mr + 1 < rows) newLogic[mr + 1][mc] = 1;
          if (Math.random() > 0.5 && mc + 1 < cols) newLogic[mr][mc + 1] = 1;
        }
      }

      stateRef.current.logicGrid = newLogic;
    }

    // 2. VISUAL FADE LOGIC & RENDER (runs every frame)
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    ctx.clearRect(0, 0, cw, ch);
    const baseAlpha = isDark ? 0.35 : 0.25;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let target = stateRef.current.logicGrid[r][c];
        let current = grid[r][c];

        if (current < target) {
          current = Math.min(target, current + 0.05); // Smooth fade in
        } else if (current > target) {
          current = Math.max(target, current - 0.03); // Smooth fade out
        }
        grid[r][c] = current;

        // Render — dot matrix style
        {
          let rC = 31, gC = 30, bC = 28;
          if (isDark) {
            const colorHex = T.accent1;
            rC = parseInt(colorHex.slice(1, 3), 16) || 150;
            gC = parseInt(colorHex.slice(3, 5), 16) || 120;
            bC = parseInt(colorHex.slice(5, 7), 16) || 240;
          }
          const cx = c * cellSize + cellSize / 2;
          const cy = r * cellSize + cellSize / 2;

          // Dead dot — always drawn, very faint
          const deadAlpha = isDark ? 0.10 : 0.07;
          ctx.fillStyle = `rgba(${rC},${gC},${bC},${deadAlpha})`;
          ctx.beginPath();
          ctx.arc(cx, cy, 2, 0, Math.PI * 2);
          ctx.fill();

          // Alive dot — grows and brightens as cell comes alive
          if (current > 0) {
            const liveRadius = 2 + current * 3.5;  // 2..5.5 px
            ctx.fillStyle = `rgba(${rC},${gC},${bC},${current * baseAlpha})`;
            ctx.beginPath();
            ctx.arc(cx, cy, liveRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "all", cursor: "crosshair" }}
      onPointerMove={(e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      }}
      onPointerLeave={() => { mouseRef.current = { x: -100, y: -100 }; }}
    />
  );
}