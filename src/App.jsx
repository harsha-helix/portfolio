import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import heroPhoto from "./assets/pict.webp";

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    title: "Spatial Photonic Ising Machine",
    description: "Solving NP-hard optimization problems via analog optical interference. A phase-only SLM encodes spin configurations; Fourier optics computes the cost function; a Metropolis feedback loop drives convergence.",
    tags: ["Quantum Optics", "Optimization", "Photonics"],
    tools: ["Python", "SLM", "Fourier Optics", "MATLAB"],
    annotation: "EOP 2025 — with G. Patil, A. Prabhakar",
    nodes: ["Ising", "Optimization", "SLM", "Interference", "Fourier Optics"],
  },
  {
    id: 2,
    title: "Holographic Modal Decomposition",
    description: "SLM-based framework for decomposing cavity SHG fields. Digital knife-edge alignment and crosstalk matrix calibration improved average modal self-overlap from 0.86 → 0.96 (fundamental mode: 0.996).",
    tags: ["Nonlinear Optics", "Holography", "SHG"],
    tools: ["SLM", "Python", "LabVIEW", "Fourier Optics"],
    annotation: "IIT Madras — Prof. Anil Prabhakar",
    nodes: ["Modal Decomp.", "SLM", "Cavity", "Photonics", "Fourier Optics"],
  },
  {
    id: 3,
    title: "Discrete-Time Quantum Walk",
    description: "Coined and split-step DTQW circuits implemented on Qiskit for RL-based optimization. Demonstrated measurable advantage over classical random walk baselines on the N-Armed Bandit problem.",
    tags: ["Quantum Computing", "RL", "Optimization"],
    tools: ["Qiskit", "Python", "PyPI"],
    annotation: "Released as qtsit on PyPI — Qugain Quantum",
    nodes: ["DTQW", "Quantum Walk", "RL", "Optimization", "Entanglement"],
  },
  {
    id: 4,
    title: "Cluster State Generation",
    description: "Theoretical and computational study of photonic cluster states as resources for measurement-based quantum computation. Designed linear-optical circuits for heralded entanglement generation using QuTiP simulations.",
    tags: ["Quantum Information", "MBQC", "Photonics"],
    tools: ["QuTiP", "Python", "Qiskit"],
    annotation: "Qugain Quantum Technologies — internal R&D",
    nodes: ["Cluster States", "Entanglement", "QuTiP", "Photonics", "Quantum Walk"],
  },
  {
    id: 5,
    title: "MEMS Microphone Simulation",
    description: "Structural-acoustic coupled FEM simulation of a capacitive MEMS microphone in COMSOL. Proposed design modifications that improved simulated sensitivity through geometry optimization.",
    tags: ["MEMS", "Acoustics", "FEM"],
    tools: ["COMSOL", "Fusion 360", "MATLAB"],
    annotation: "Under Dr. D. G. Patil, BITS Goa",
    nodes: ["MEMS", "Acoustics", "FEM", "Mechanics"],
  },
];

const NODE_COLORS = {
  "Entanglement": { r: 108, g: 92, b: 231, label: "#8a80e8" },
  "Quantum Walk": { r: 130, g: 100, b: 240, label: "#9a88f0" },
  "DTQW": { r: 148, g: 120, b: 245, label: "#a898f0" },
  "QuTiP": { r: 90, g: 75, b: 210, label: "#8070d8" },
  "Cluster States": { r: 115, g: 88, b: 225, label: "#9a7ae0" },
  "Ising": { r: 160, g: 100, b: 240, label: "#b080f0" },
  "SLM": { r: 220, g: 140, b: 40, label: "#e0a830" },
  "Photonics": { r: 235, g: 155, b: 30, label: "#e8b828" },
  "Interference": { r: 210, g: 130, b: 60, label: "#d8a048" },
  "Cavity": { r: 200, g: 120, b: 50, label: "#c89040" },
  "SHG": { r: 225, g: 165, b: 45, label: "#e0c030" },
  "Modal Decomp.": { r: 215, g: 145, b: 55, label: "#d8a840" },
  "Fourier Optics": { r: 230, g: 170, b: 35, label: "#e8c828" },
  "Optimization": { r: 30, g: 185, b: 165, label: "#20c0a8" },
  "RL": { r: 40, g: 195, b: 175, label: "#28c8b0" },
  "Algorithms": { r: 25, g: 175, b: 155, label: "#18b8a0" },
  "MEMS": { r: 220, g: 80, b: 80, label: "#e06060" },
  "Acoustics": { r: 210, g: 90, b: 90, label: "#d07070" },
  "FEM": { r: 205, g: 100, b: 75, label: "#d08060" },
  "Mechanics": { r: 215, g: 85, b: 65, label: "#d87050" },
};

const DEFAULT_COLOR = { r: 140, g: 130, b: 115, label: "#9a9080" };

const NODE_DESCRIPTIONS = {
  "Entanglement": "When quantum particles link up so deeply that you can't describe one without also describing the other.",
  "Quantum Walk": "Like a standard random walk, but the walker can explore multiple paths at once, which helps algorithms run faster.",
  "DTQW": "A type of quantum walk that moves in distinct steps, sort of like a clock ticking, to create unique path patterns.",
  "QuTiP": "A Python library we use to simulate how quantum systems actually behave when exposed to noisy environments.",
  "Cluster States": "Large grids of connected quantum states used as a blank canvas for certain types of quantum computing.",
  "Ising": "A math model originally for magnets. We use it to map out complex real-world problems so physical hardware can solve them.",
  "SLM": "Screens made of liquid crystals that let us shape and control a beam of light as if we were programming it.",
  "Photonics": "Using light instead of electricity to process information, which keeps things moving incredibly fast and cool.",
  "Interference": "What happens when waves overlap. We use these overlapping patterns of light to instantly run calculations.",
  "Cavity": "Mirrors placed facing each other to trap light, forcing it to bounce back and forth to interact more strongly with whatever is inside.",
  "SHG": "A process where two particles of light combine inside a special material to form a new one with twice the energy.",
  "Modal Decomp.": "A technique to break down a messy beam of light into its simple, fundamental shapes so we can measure it accurately.",
  "Fourier Optics": "Using physical lenses to perform math. It lets us process images and signals instantly using light.",
  "Optimization": "The process of searching through a huge number of options to find the best possible solution to a problem.",
  "RL": "A method of teaching software by trial and error, where the system learns to make good decisions by getting rewards for success.",
  "Algorithms": "Clear, step-by-step instructions for solving problems. It's the logic behind how we get computers to do what we want.",
  "MEMS": "Tiny mechanical devices built at a microscopic scale, often used to turn physical movement into electrical signals.",
  "Acoustics": "The study of sound and vibration. Here, it helps us design materials that respond nicely to sound waves.",
  "FEM": "A software method that breaks a complex shape into thousands of tiny blocks to see how the whole thing bends or reacts.",
  "Mechanics": "The basic physics of how things move and handle loads, which tells us how a structure will actually behave under stress."
};


const GRAPH_NODES = [
  { id: "Optimization", x: 0.50, y: 0.30 },
  { id: "Quantum Walk", x: 0.22, y: 0.52 },
  { id: "DTQW", x: 0.13, y: 0.33 },
  { id: "RL", x: 0.36, y: 0.68 },
  { id: "Ising", x: 0.68, y: 0.18 },
  { id: "SLM", x: 0.80, y: 0.42 },
  { id: "Interference", x: 0.63, y: 0.52 },
  { id: "Photonics", x: 0.55, y: 0.72 },
  { id: "Modal Decomp.", x: 0.84, y: 0.68 },
  { id: "Cavity", x: 0.74, y: 0.82 },
  { id: "SHG", x: 0.88, y: 0.28 },
  { id: "MEMS", x: 0.18, y: 0.78 },
  { id: "Acoustics", x: 0.08, y: 0.64 },
  { id: "FEM", x: 0.06, y: 0.44 },
  { id: "Mechanics", x: 0.13, y: 0.18 },
  { id: "QuTiP", x: 0.44, y: 0.12 },
  { id: "Cluster States", x: 0.28, y: 0.18 },
  { id: "Entanglement", x: 0.40, y: 0.44 },
  { id: "Fourier Optics", x: 0.68, y: 0.60 },
];

const GRAPH_EDGES = [
  ["Optimization", "Ising"], ["Optimization", "DTQW"], ["Optimization", "RL"],
  ["Optimization", "Entanglement"], ["Optimization", "FEM"],
  ["Quantum Walk", "DTQW"], ["Quantum Walk", "RL"], ["Quantum Walk", "Entanglement"],
  ["DTQW", "RL"], ["DTQW", "Entanglement"],
  ["SLM", "Ising"], ["SLM", "Interference"], ["SLM", "Modal Decomp."], ["SLM", "Fourier Optics"],
  ["Interference", "Ising"], ["Interference", "Fourier Optics"],
  ["Photonics", "SLM"], ["Photonics", "Modal Decomp."], ["Photonics", "Cavity"], ["Photonics", "Interference"],
  ["Modal Decomp.", "Cavity"], ["Modal Decomp.", "Fourier Optics"],
  ["Cavity", "SHG"], ["SHG", "SLM"], ["SHG", "Fourier Optics"],
  ["MEMS", "Acoustics"], ["MEMS", "FEM"], ["MEMS", "Mechanics"],
  ["FEM", "Mechanics"], ["FEM", "Acoustics"],
  ["QuTiP", "Entanglement"], ["QuTiP", "Cluster States"], ["QuTiP", "Quantum Walk"],
  ["Cluster States", "Entanglement"],
  ["Entanglement", "Quantum Walk"],
];

const EXPLORING = [
  { label: "open quantum systems", detail: "QuTiP — Lindblad master equations, decoherence landscapes", status: "active" },
  { label: "photonic computing", detail: "SLM-based analog solvers beyond Ising — continuous optimization", status: "active" },
  { label: "variational quantum algorithms", detail: "QAOA geometry on near-term hardware", status: "reading" },
  { label: "modal crosstalk in cavities", detail: "Extending holographic alignment to higher-order modes", status: "ongoing" },
  { label: "quantum walks on graphs", detail: "Spectral graph theory → walk dynamics correspondence", status: "reading" },
  { label: "topological photonics", detail: "Edge states and band topology in photonic lattices", status: "new" },
];

const STATUS_COLORS_DARK = {
  active: { bg: "rgba(32,192,168,0.12)", border: "rgba(32,192,168,0.3)", text: "#40d8b8" },
  reading: { bg: "rgba(108,92,231,0.12)", border: "rgba(108,92,231,0.3)", text: "#a898f0" },
  ongoing: { bg: "rgba(224,168,48,0.12)", border: "rgba(224,168,48,0.3)", text: "#e0c050" },
  new: { bg: "rgba(200,80,200,0.12)", border: "rgba(200,80,200,0.3)", text: "#d880d8" },
};

const EXPERIENCE = [
  {
    role: "Research Student",
    org: "IIT Madras — Quantum & Photonics Lab",
    period: "2024 — present",
    advisor: "Prof. Anil Prabhakar",
    points: [
      "Designed SLM-based holographic decomposition framework for cavity SHG modal analysis",
      "Developed spatial photonic Ising machine; presented at EOP 2025",
      "Crosstalk matrix calibration improved modal self-overlap from 0.86 → 0.96",
    ],
    color: "#7a5ce0",
  },
  {
    role: "Co-Founder",
    org: "Qugain Quantum Technologies",
    period: "2023 — present",
    advisor: null,
    points: [
      "Released qtsit on PyPI — discrete-time quantum walk implementations for RL",
      "Researching cluster state generation for measurement-based quantum computation",
      "IBM Qiskit Fall Fest 2024 Mentor Badge recipient",
    ],
    color: "#20c0a8",
  },
  {
    role: "Research Intern",
    org: "BITS Pilani, Goa — MEMS Lab",
    period: "2023",
    advisor: "Dr. D. G. Patil",
    points: [
      "COMSOL-based FEM simulation of capacitive MEMS microphone",
      "Proposed geometry optimizations improving simulated sensitivity",
      "Structural-acoustic coupled analysis for transducer design",
    ],
    color: "#d4880a",
  },
  {
    role: "Steering Member",
    org: "QIndia — Quantum Computing Community",
    period: "2023 — present",
    advisor: null,
    points: [
      "National steering committee for quantum computing outreach in India",
      "Organized workshops, seminars, and mentorship programs",
    ],
    color: "#c84040",
  },
];

const FRAGMENTS = [
  { kind: "note", content: "crosstalk matrix: off-diagonals ≠ 0 → modes bleed", coord: "λ=1064nm" },
  { kind: "ref", content: "Farhi et al. 2014 — QAOA on MaxCut", coord: "arXiv:1411.4028" },
  { kind: "measure", content: "modal self-overlap: 0.86 → 0.96 after calibration", coord: "Δ = +11.6%" },
  { kind: "sketch", content: "phase-space portrait of a driven nonlinear oscillator", coord: "x vs ẋ" },
  { kind: "note", content: "Boltzmann weight: e^{-ΔE/kT} — simulated annealing mimics cooling", coord: "stat. mech." },
  { kind: "ref", content: "Aharonov et al. 1993 — coined quantum walk on the line", coord: "PRL 70, 1975" },
];

/* ═══════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════ */
function useAnimationFrame(callback) {
  const reqRef = useRef();
  const prevRef = useRef();
  const cb = useCallback(callback, [callback]);
  useEffect(() => {
    const animate = (time) => {
      if (prevRef.current !== undefined) cb(time - prevRef.current);
      prevRef.current = time;
      reqRef.current = requestAnimationFrame(animate);
    };
    reqRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reqRef.current);
  }, [cb]);
}

/* ═══════════════════════════════════════════════
   DARK GRAPH CANVAS
═══════════════════════════════════════════════ */
function GraphCanvas({ activeNodes, fullColor = false, dark = true }) {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef();
  const parentRef = useRef();
  const activeRef = useRef(activeNodes);
  useEffect(() => { activeRef.current = activeNodes; }, [activeNodes]);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  // Store origin and node state
  const nodesRef = useRef(
    GRAPH_NODES.map((n) => ({
      ...n,
      origin_x: n.x,
      origin_y: n.y,
      vx: (Math.random() - 0.5) * 0.0001,
      vy: (Math.random() - 0.5) * 0.0001,
      phase: Math.random() * Math.PI * 2,
      isDragged: false
    }))
  );

  const dragState = useRef({ activeNode: null });

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const ctx = canvas.getContext("2d");
    const an = activeRef.current;

    nodesRef.current.forEach((n) => {
      n.phase += dt * 0.00022;

      if (!n.isDragged) {
        // Spring physics pulling to origin
        const dx = n.origin_x - n.x;
        const dy = n.origin_y - n.y;

        n.vx += dx * 0.0005 * dt;
        n.vy += dy * 0.0005 * dt;

        // Damping
        n.vx *= 0.95;
        n.vy *= 0.95;

        n.x += n.vx + Math.sin(n.phase) * 0.00008;
        n.y += n.vy + Math.cos(n.phase * 0.73) * 0.00008;
      }

      // Boundaries
      n.x = Math.max(0.04, Math.min(0.96, n.x));
      n.y = Math.max(0.04, Math.min(0.96, n.y));
    });

    ctx.clearRect(0, 0, W, H);
    const nodeMap = {};
    nodesRef.current.forEach((n) => (nodeMap[n.id] = n));

    GRAPH_EDGES.forEach(([a, b]) => {
      const na = nodeMap[a]; const nb = nodeMap[b];
      if (!na || !nb) return;
      const bothActive = an.length > 0 && an.includes(a) && an.includes(b);
      const eitherActive = an.length === 0 || an.includes(a) || an.includes(b);
      const ca = NODE_COLORS[a] || DEFAULT_COLOR;

      if (fullColor) {
        const opacity = dark
          ? (eitherActive ? 0.55 : 0.08)
          : (eitherActive ? 0.45 : 0.12);
        ctx.beginPath();
        ctx.moveTo(na.x * W, na.y * H);
        ctx.lineTo(nb.x * W, nb.y * H);
        ctx.strokeStyle = `rgba(${ca.r},${ca.g},${ca.b},${opacity})`;
        ctx.lineWidth = eitherActive ? 1.1 : 0.5;
        ctx.stroke();
      } else {
        const activeColor = dark ? "rgba(140,160,220,0.7)" : "rgba(90,110,155,0.62)";
        const semiColor = dark ? "rgba(100,120,180,0.22)" : "rgba(90,110,155,0.18)";
        const dimColor = dark ? "rgba(60,70,100,0.06)" : "rgba(160,155,140,0.08)";
        ctx.beginPath();
        ctx.moveTo(na.x * W, na.y * H);
        ctx.lineTo(nb.x * W, nb.y * H);
        ctx.strokeStyle = bothActive ? activeColor : eitherActive ? semiColor : dimColor;
        ctx.lineWidth = bothActive ? 1.5 : 0.6;
        ctx.stroke();
      }
    });

    nodesRef.current.forEach((n) => {
      const isHighlighted = an.includes(n.id);
      const col = NODE_COLORS[n.id] || DEFAULT_COLOR;
      const r = fullColor ? (isHighlighted ? 6.5 : 5) : (isHighlighted ? 5 : 3);
      const pulse = isHighlighted ? Math.sin(n.phase * 3) * 1.4 : 0;
      const dimmed = an.length > 0 && !isHighlighted;
      const alpha = fullColor
        ? (dimmed ? (dark ? 0.2 : 0.25) : 1.0)
        : (isHighlighted ? 1.0 : (an.length === 0 ? (dark ? 0.65 : 0.7) : (dark ? 0.1 : 0.15)));

      if (dark && (fullColor ? !dimmed : isHighlighted)) {
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, r + pulse + 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${fullColor ? 0.08 : 0.06})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, r + pulse + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${fullColor ? 0.15 : 0.1})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(n.x * W, n.y * H, r + pulse, 0, Math.PI * 2);
      if (fullColor) {
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`;
      } else if (dark) {
        ctx.fillStyle = isHighlighted
          ? "rgba(160,180,255,0.92)"
          : an.length === 0 ? "rgba(100,110,140,0.5)" : "rgba(60,70,100,0.15)";
      } else {
        ctx.fillStyle = isHighlighted ? "rgba(72,92,148,0.9)" : an.length === 0 ? "rgba(120,115,100,0.4)" : "rgba(160,155,140,0.15)";
      }
      ctx.fill();

      const isVisible = an.length === 0 || isHighlighted;
      if (isVisible || fullColor) {
        const labelAlpha = fullColor ? (dimmed ? 0.22 : 0.88) : (isHighlighted ? 0.95 : 0.5);
        ctx.font = `${(isHighlighted || fullColor) ? "500" : "400"} ${fullColor ? "12.5px" : "11.5px"} 'IBM Plex Mono', monospace`;
        ctx.globalAlpha = labelAlpha;
        ctx.fillStyle = fullColor
          ? (col.label || (dark ? "#c0b888" : "#504030"))
          : dark
            ? (isHighlighted ? "rgba(200,210,255,0.95)" : "rgba(120,130,160,0.55)")
            : (isHighlighted ? "rgba(42,54,100,0.95)" : "rgba(100,95,82,0.55)");
        ctx.fillText(n.id, n.x * W + (r + pulse + 4), n.y * H + 4);
        ctx.globalAlpha = 1.0;
      }

      n.hitRadius = r + pulse + 8;
    });
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
    ro.observe(canvas);
    setSize();
    return () => ro.disconnect();
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    let closest = null;
    let minDist = 0.05;
    nodesRef.current.forEach(n => {
      const dist = Math.hypot(n.x - x, n.y - y);
      if (dist < minDist) { minDist = dist; closest = n; }
    });
    if (closest) {
      closest.isDragged = true;
      dragState.current.activeNode = closest;
      setHoveredNode(null);
    }
  };

  const handlePointerMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    if (dragState.current.activeNode) {
      dragState.current.activeNode.x = x;
      dragState.current.activeNode.y = y;

      // Update origin dynamically optional, or just let them snap back 
      // User normally expects it to stay where placed or snap back?
      // Let's update origin so dragging actually reorganizes the graph!
      dragState.current.activeNode.origin_x = x;
      dragState.current.activeNode.origin_y = y;
      setHoveredNode(null);
    } else {
      let hovered = null;
      let minDist = 0.03;
      nodesRef.current.forEach(n => {
        const dist = Math.hypot(n.x - x, n.y - y);
        if (dist < minDist) { minDist = dist; hovered = n; }
      });
      if (hovered) {
        setHoveredNode(hovered.id);
        setHoverPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      } else {
        setHoveredNode(null);
      }
    }
  };

  const handlePointerUp = () => {
    if (dragState.current.activeNode) {
      dragState.current.activeNode.isDragged = false;
      dragState.current.activeNode = null;
    }
  };

  return (
    <div ref={parentRef} style={{ width: "100%", height: "100%", position: "relative" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      {hoveredNode && NODE_DESCRIPTIONS[hoveredNode] && (
        <div style={{
          position: "absolute", left: Math.min(hoverPos.x + 16, parentRef.current?.offsetWidth - 230 || hoverPos.x + 16), top: Math.min(hoverPos.y + 16, parentRef.current?.offsetHeight - 100 || hoverPos.y + 16),
          background: dark ? "rgba(20,22,28,0.95)" : "rgba(255,255,255,0.95)",
          border: `0.5px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
          padding: "10px 14px", borderRadius: 6, width: 220, pointerEvents: "none",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          backdropFilter: "blur(8px)",
          transform: "translateY(0)",
          zIndex: 10
        }}>
          <div style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 600, color: dark ? "#fff" : "#000", marginBottom: 4 }}>
            {hoveredNode}
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 11.5, lineHeight: 1.5, color: dark ? "#a09890" : "#5a5752" }}>
            {NODE_DESCRIPTIONS[hoveredNode]}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SHARED UI PRIMITIVES
═══════════════════════════════════════════════ */
const MONO = "'IBM Plex Mono', monospace";
const SERIF = "'Spectral', 'Georgia', serif";

// Dark palette
const D = {
  bg: "#1a1c21",
  bg2: "#21242a",
  bg3: "#272b33",
  surface: "#2d323c",
  surfaceHi: "#363c48",
  border: "rgba(255,255,255,0.12)",
  borderMed: "rgba(255,255,255,0.18)",
  borderHi: "rgba(255,255,255,0.26)",
  text: "#f6f5ef",
  textMid: "#b5aea6",
  textDim: "#7c7c74",
  accent1: "#967bf0",  // quantum purple
  accent2: "#3adac4",  // teal/algo
  accent3: "#eba628",  // amber photonics
  accent4: "#e26060",  // red mechanics
};


const L = {
  bg: "#f4f2ee",
  bg2: "#ebe8e2",
  bg3: "#e2dfd9",
  surface: "#ffffff",
  surfaceHi: "#faf9f7",
  border: "rgba(0,0,0,0.07)",
  borderMed: "rgba(0,0,0,0.12)",
  borderHi: "rgba(0,0,0,0.18)",
  text: "#1f1e1c",
  textMid: "#5a5752",
  textDim: "#86837e",
  accent1: "#5c42bd",
  accent2: "#17a08c",
  accent3: "#c46d03",
  accent4: "#b53131",
};

const ThemeContext = createContext({ isDark: true, toggleTheme: () => { }, T: D });

function DotGrid({ opacity = 0.18 }) {
  const { isDark, T } = useContext(ThemeContext);
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }}>
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.7" fill="#6a6860" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

function SectionLabel({ n, label }) {
  const { isDark, T } = useContext(ThemeContext);
  return (
    <span style={{
      fontFamily: MONO, fontSize: 10, color: T.textDim, letterSpacing: "0.18em",
      textTransform: "uppercase", display: "block", marginBottom: 12
    }}>
      § {n} — {label}
    </span>
  );
}

function SectionHeading({ children, style = {} }) {
  const { isDark, T } = useContext(ThemeContext);
  return (
    <h2 style={{
      fontSize: 32, fontWeight: 600, color: T.text, margin: "0 0 10px",
      letterSpacing: "-0.01em", fontFamily: SERIF, ...style
    }}>
      {children}
    </h2>
  );
}

function HeroTraces() {
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

/* ═══════════════════════════════════════════════
   INTERACTIVE TERMINAL — hero easter egg
═══════════════════════════════════════════════ */
function MiniTerminal() {
  const { isDark, T } = useContext(ThemeContext);
  const [lines, setLines] = useState([
    { t: "sys", v: "> initializing..." },
    { t: "ok", v: "  ✓ Hi I'm Harsha" },
    { t: "ok", v: "  ✓ Scroll to see stuff I do" },
  ]);
  const [input, setInput] = useState("");
  const [blinking, setBlinking] = useState(true);
  const endRef = useRef();

  const COMMANDS = {
    help: ["available: projects, skills, status, clear"],
    projects: ["spim — spatial photonic Ising machine", "hmd  — holographic modal decomposition", "dtqw — discrete-time quantum walk", "csg  — cluster state generation", "mems — MEMS microphone FEM"],
    skills: ["python · matlab · qiskit · qutip", "labview · comsol · fusion360", "fourier optics · slm control"],
    status: ["currently: IIT Madras — photonics lab", "open to: research collaborations", "qtsit: live on PyPI"],
    clear: null,
  };

  useEffect(() => {
    if (lines.length > 6) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [lines]);

  useEffect(() => {
    const t = setInterval(() => setBlinking(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  const handleKey = (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    const newLines = [...lines, { t: "inp", v: `> ${input}` }];
    if (cmd === "clear") {
      setLines([{ t: "sys", v: "> field cleared" }]);
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach(l => newLines.push({ t: "out", v: `  ${l}` }));
      setLines(newLines);
    } else if (cmd) {
      newLines.push({ t: "err", v: `  unknown: ${cmd}. type 'help'` });
      setLines(newLines);
    }
    setInput("");
  };

  const colors = { sys: T.textDim, ok: T.accent2, inp: "#a898f0", out: T.textMid, err: T.accent4 };

  return (
    <div style={{
      background: T.bg, border: `0.5px solid ${T.border}`, borderRadius: 10,
      fontFamily: MONO, fontSize: 11, overflow: "hidden", width: "100%", maxWidth: 380
    }}>
      <div style={{
        padding: "8px 14px", borderBottom: `0.5px solid ${T.border}`,
        display: "flex", alignItems: "center", gap: 7
      }}>
        {["#ef6b6b", "#f0c040", "#6bbf6b"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
        ))}
        <span style={{ fontSize: 9.5, color: T.textDim, marginLeft: 6, letterSpacing: "0.08em" }}>
          hh-field.local
        </span>
      </div>
      <div style={{ padding: "12px 14px", maxHeight: 160, overflowY: "auto", scrollbarWidth: "none" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: colors[l.t] || T.textMid, lineHeight: 1.6, fontSize: 11 }}>
            {l.v}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{
        padding: "6px 14px", borderTop: `0.5px solid ${T.border}`,
        display: "flex", alignItems: "center", gap: 6
      }}>
        <span style={{ color: T.accent1, fontSize: 11 }}>›</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="type 'help'"
          style={{
            background: "transparent", border: "none", outline: "none", color: T.text,
            fontFamily: MONO, fontSize: 11, flex: 1, caretColor: T.accent1
          }}
        />
        <span style={{ color: T.accent1, opacity: blinking ? 1 : 0, fontSize: 12 }}>▋</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CV DOWNLOAD BUTTON
═══════════════════════════════════════════════ */
function CVButton() {
  const { isDark, T } = useContext(ThemeContext);
  const [downloading, setDownloading] = useState(false);
  const handle = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1800);
    // In production, replace with real CV URL
    const a = document.createElement("a");
    a.href = "#";
    a.download = "Harshavardhan_Hajeri_CV.pdf";
    a.click();
  };
  return (
    <button onClick={handle}
      style={{
        fontFamily: MONO, fontSize: 11, color: downloading ? T.accent2 : T.text,
        border: `0.5px solid ${downloading ? T.accent2 : T.borderMed}`,
        borderRadius: 5, padding: "9px 20px", cursor: "pointer", background: T.surface,
        letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 8,
        transition: "all 0.3s ease"
      }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{downloading ? "✓" : "↓"}</span>
      {downloading ? "preparing..." : "Download CV"}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   HERO PICTURE placeholder
═══════════════════════════════════════════════ */
function HeroPicture() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const size = isMobile ? 144 : 180;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* animated ring */}
      <svg style={{
        position: "absolute", inset: -8, width: "calc(100%+16px)", height: "calc(100%+16px)",
        animation: "spin 18s linear infinite"
      }} viewBox="0 0 196 196">
        <circle cx="98" cy="98" r="90" fill="none" stroke={T.accent1} strokeWidth="0.5"
          strokeDasharray="8 16" opacity="0.4" />
        <circle cx="98" cy="98" r="82" fill="none" stroke={T.accent2} strokeWidth="0.5"
          strokeDasharray="3 20" opacity="0.3" />
      </svg>
      {/* photo placeholder — replace src with actual photo */}
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `1.5px solid ${T.borderMed}`, overflow: "hidden",
        background: `linear-gradient(135deg, ${T.surface} 0%, #1a2038 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
        gap: 6, position: "relative"
      }}>
        {/* Replace the div below with: <img src="your-photo.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
        <div style={{ fontSize: 48, opacity: 0.25 }}>☯</div>
        <span style={{ fontFamily: MONO, fontSize: 8.5, color: T.textDim, letterSpacing: "0.1em" }}>
          HH
        </span>
        <img
          src={heroPhoto}
          alt="Harshavardhan Hajeri"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function InteractiveBackgroundGraphs() {
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


function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

/* ═══════════════════════════════════════════════
   SCROLL-DRIVEN PROJECT SECTION

═══════════════════════════════════════════════ */
function ProjectsSection() {
  const { isDark, T } = useContext(ThemeContext);
  const outerRef = useRef();
  const [activeIdx, setActiveIdx] = useState(0);
  const N = PROJECTS.length;

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = (N - 1) * window.innerHeight;
      const ratio = Math.max(0, Math.min(1, scrolled / total));
      setActiveIdx(Math.round(ratio * (N - 1)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  const project = PROJECTS[activeIdx];
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <div ref={outerRef} style={{ height: `${N * 100}vh`, position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: T.bg
      }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <InteractiveBackgroundGraphs />
        </div>

        {/* scanline effect */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
          opacity: isDark ? 0.6 : 0.4
        }} />

        <div style={{ position: "absolute", top: isMobile ? 20 : 64, left: isMobile ? 24 : 48, zIndex: 10 }}>
          <SectionLabel n="01" label="Pinned artifacts" />
        </div>
        <div style={{
          position: "absolute", top: isMobile ? 22 : 68, right: isMobile ? 24 : 48, zIndex: 10,
          display: "flex", gap: 6, alignItems: "center"
        }}>
          {PROJECTS.map((_, i) => (
            <div key={i} style={{
              height: 3, borderRadius: 2,
              width: i === activeIdx ? 24 : 6,
              background: i === activeIdx ? T.accent1 : "rgba(255,255,255,0.12)",
              transition: "all 0.4s ease", boxShadow: i === activeIdx ? `0 0 8px ${T.accent1}60` : "none"
            }} />
          ))}
          <span style={{ fontFamily: MONO, fontSize: 9, color: T.textDim, marginLeft: 8 }}>
            {activeIdx + 1}/{N}
          </span>
        </div>

        <div style={{
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column" : "row",
          gridTemplateColumns: isMobile ? "none" : "1fr 1fr",
          height: "100%"
        }}>
          {/* LEFT */}
          <div style={{
            display: "flex", alignItems: isMobile ? "flex-start" : "center", justifyContent: isMobile ? "flex-start" : "center",
            padding: isMobile ? "54px 24px 8px 24px" : "96px 36px 60px 48px", position: "relative", zIndex: 5,
            height: "auto", flexShrink: isMobile ? 0 : 1
          }}>
            <div style={{ width: "100%", maxWidth: 520, height: "auto", display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-start" : "center" }}>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: isMobile ? 10 : 20 }}>
                {project.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 9.5, fontFamily: MONO, letterSpacing: "0.08em",
                    color: T.textDim, background: T.surface, border: `0.5px solid ${T.border}`,
                    borderRadius: 3, padding: "3px 9px", textTransform: "uppercase"
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <h2 key={`t-${activeIdx}`} style={{
                fontFamily: SERIF,
                fontSize: isMobile ? "clamp(19px, 5.5vw, 22px)" : "clamp(22px,2.6vw,34px)",
                fontWeight: 600, color: T.text,
                margin: isMobile ? "0 0 6px" : "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.01em",
                animation: "slideUp 0.45s cubic-bezier(0.22,1,0.36,1)"
              }}>
                {project.title}
              </h2>
              <p key={`d-${activeIdx}`} style={{
                fontSize: isMobile ? 12.5 : 15, color: T.textMid, lineHeight: isMobile ? 1.4 : 1.78,
                margin: isMobile ? "0 0 10px" : "0 0 24px", fontFamily: SERIF,
                animation: "slideUp 0.55s cubic-bezier(0.22,1,0.36,1)"
              }}>
                {project.description}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: isMobile ? 8 : 24 }}>
                {project.tools.map((t) => (
                  <span key={t} style={{
                    fontSize: 9.5, fontFamily: MONO,
                    color: T.textDim, border: `0.5px solid ${T.border}`,
                    borderRadius: 3, padding: "2px 8px"
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: isMobile ? "none" : "block" }}>
                <div style={{
                  fontSize: 11, fontFamily: MONO, color: T.textDim,
                  display: "flex", alignItems: "center", gap: 6, paddingTop: 16,
                  borderTop: `0.5px dashed ${T.border}`
                }}>
                  <span style={{ opacity: 0.5 }}>↳</span>{project.annotation}
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  {[["GitHub", "#"], ["Paper", "#"]].map(([l, h]) => (
                    <a key={l} href={h} style={{
                      fontFamily: MONO, fontSize: 10.5, color: T.textMid,
                      border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "7px 18px",
                      textDecoration: "none", letterSpacing: "0.06em", background: T.surface,
                      transition: "all 0.2s"
                    }}>
                      {l} ↗
                    </a>
                  ))}
                </div>

                <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 11 }}>
                  {PROJECTS.map((p, i) => (
                    <div key={p.id} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      opacity: i === activeIdx ? 1 : 0.22,
                      transform: i === activeIdx ? "translateX(8px)" : "translateX(0)",
                      transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)"
                    }}>
                      <div style={{
                        height: 1, background: T.accent1, flexShrink: 0,
                        width: i === activeIdx ? 28 : 10,
                        boxShadow: i === activeIdx ? `0 0 6px ${T.accent1}80` : "none",
                        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)"
                      }} />
                      <span style={{ fontFamily: SERIF, fontSize: 13.5, color: T.text, lineHeight: 1.3 }}>
                        {p.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — graph */}
          <div style={{
            padding: isMobile ? "4px 24px 64px 24px" : "96px 40px 60px 20px",
            display: "flex", alignItems: "center", position: "relative", zIndex: 5,
            height: "auto", flex: isMobile ? 1 : "unset"
          }}>
            <div style={{
              position: "relative", width: "100%", height: "100%", minHeight: isMobile ? 0 : 400, zIndex: 1,
              background: T.bg2, border: `0.5px solid ${T.border}`, borderRadius: 16, overflow: "hidden",
              boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.1)"
            }}>

              <DotGrid opacity={0.14} />
              <div style={{ position: "absolute", inset: 0 }}>
                <GraphCanvas activeNodes={project.nodes} fullColor={false} dark={isDark} />
              </div>
              <div style={{
                position: "absolute", bottom: 16, left: 18, fontFamily: MONO,
                fontSize: 9, color: T.textDim, letterSpacing: "0.08em"
              }}>
                concept field · {project.nodes.length} active
              </div>
              {/* active node count glow */}
              <div style={{
                position: "absolute", top: 16, right: 16,
                display: "flex", alignItems: "center", gap: 6
              }}>
                <div style={{
                  width: 5, height: 5, borderRadius: "50%", background: T.accent1,
                  boxShadow: `0 0 8px ${T.accent1}`, animation: "pulse 2s ease-in-out infinite"
                }} />
                <span style={{ fontFamily: MONO, fontSize: 9, color: T.textDim }}>
                  live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:0.4;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CONCEPT FIELD (DARK)
═══════════════════════════════════════════════ */
function ConceptField() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const categories = [
    { label: "Quantum", color: T.accent1 },
    { label: "Photonics", color: T.accent3 },
    { label: "Computation", color: T.accent2 },
    { label: "Mechanics", color: T.accent4 },
  ];

  return (
    <section id="field" style={{ padding: isMobile ? "60px 0 60px" : "100px 0 90px", background: T.bg, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <InteractiveBackgroundGraphs />
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        opacity: isDark ? 0.6 : 0.4
      }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", marginBottom: 36, gap: isMobile ? 20 : 0 }}>
          <div>
            <SectionLabel n="02" label="Concept field" />
            <SectionHeading>Conceptual Topology</SectionHeading>
            <p style={{ fontSize: 13.5, color: T.textDim, fontFamily: MONO, margin: "8px 0 0" }}>
              All nodes · scroll projects above to illuminate regions
            </p>
          </div>
          <div style={{ display: "flex", gap: isMobile ? 12 : 18, alignItems: "center", paddingBottom: 4, flexWrap: "wrap", marginTop: isMobile ? 8 : 0 }}>
            {categories.map((c) => (
              <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{
                  width: 7, height: 7, borderRadius: "50%", background: c.color,
                  boxShadow: `0 0 6px ${c.color}80`
                }} />
                <span style={{ fontFamily: MONO, fontSize: 10, color: T.textDim, letterSpacing: "0.06em" }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: "relative", height: isMobile ? 800 : 520, background: T.bg2,
          border: `0.5px solid ${T.border}`, borderRadius: 14, overflow: "hidden"
        }}>

          <DotGrid opacity={0.12} />

          {/* region blobs — darker in dark mode */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.04 }}>
            <ellipse cx="22%" cy="30%" rx="18%" ry="22%" fill={T.accent1} />
            <ellipse cx="78%" cy="52%" rx="20%" ry="25%" fill={T.accent3} />
            <ellipse cx="42%" cy="52%" rx="14%" ry="18%" fill={T.accent2} />
            <ellipse cx="14%" cy="62%" rx="12%" ry="16%" fill={T.accent4} />
          </svg>

          <div style={{ position: "absolute", inset: 0 }}>
            <GraphCanvas activeNodes={[]} fullColor={true} dark={isDark} />
          </div>

          <div style={{
            position: "absolute", bottom: 16, right: 20, fontFamily: MONO,
            fontSize: 9, color: T.textDim, letterSpacing: "0.08em"
          }}>
            {GRAPH_NODES.length} nodes · {GRAPH_EDGES.length} edges · live
          </div>

          <div style={{
            position: "absolute", top: 16, right: 20, fontFamily: MONO,
            fontSize: 9, color: T.textDim, letterSpacing: "0.08em",
            display: "flex", alignItems: "center", gap: 6
          }}>
            <span style={{
              display: "inline-block", width: 5, height: 5, borderRadius: "50%",
              background: T.accent2, boxShadow: `0 0 6px ${T.accent2}`,
              animation: "pulse 2.5s ease-in-out infinite"
            }} />
            drifting
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CONWAY'S GAME OF LIFE (BACKGROUND)
═══════════════════════════════════════════════ */
function ConwaysGameOfLife() {
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
          const colorHex = T.accent1;
          const rC = parseInt(colorHex.slice(1, 3), 16) || 150;
          const gC = parseInt(colorHex.slice(3, 5), 16) || 120;
          const bC = parseInt(colorHex.slice(5, 7), 16) || 240;
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

/* ═══════════════════════════════════════════════
   EXPERIENCE SECTION (NEW)
═══════════════════════════════════════════════ */
function ExperienceSection() {
  const { isDark, T } = useContext(ThemeContext);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <section id="experience" style={{ padding: isMobile ? "60px 0" : "100px 0", background: "transparent", position: "relative", overflow: "hidden" }}>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: isMobile ? 40 : 60 }}>
          <SectionLabel n="03" label="Experience" />
          <SectionHeading>Where I've Worked</SectionHeading>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 24 }}>
          {EXPERIENCE.map((exp, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "180px 1fr",
                  gap: isMobile ? 16 : 32,
                  padding: isMobile ? "24px" : "36px",
                  background: isDark
                    ? `rgba(28, 30, 36, ${isHovered ? 0.75 : 0.55})`
                    : `rgba(255, 255, 255, ${isHovered ? 0.9 : 0.6})`,
                  backdropFilter: "blur(14px)",
                  borderRadius: 16,
                  border: `0.5px solid ${isHovered ? exp.color + "60" : T.borderMed}`,
                  boxShadow: isHovered
                    ? `0 12px 40px ${exp.color}15, inset 0 0 0 1px ${exp.color}20`
                    : `0 8px 30px rgba(0,0,0,0.04)`,
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)"
                }}
              >
                {/* Left side: Dates */}
                {!isMobile && (
                  <div style={{
                    fontFamily: MONO, fontSize: 13, color: isHovered ? exp.color : T.textDim,
                    display: "flex", flexDirection: "column", gap: 6,
                    paddingRight: 32, borderRight: `1px solid ${isHovered ? exp.color + "40" : T.border}`,
                    transition: "all 0.4s"
                  }}>
                    {exp.period.split("—").map((p, pIdx) => {
                      const pt = p.trim();
                      return (
                        <span key={pIdx} style={{
                          fontWeight: pt === "present" ? 600 : 400,
                          opacity: pt === "present" ? 1 : 0.75
                        }}>
                          {pt}{pIdx === 0 && " —"}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Right side: Content */}
                <div>
                  {isMobile && (
                    <div style={{
                      fontFamily: MONO, fontSize: 11, color: isHovered ? exp.color : T.textDim,
                      marginBottom: 12, display: "flex", gap: 6, transition: "all 0.4s"
                    }}>
                      {exp.period.split("—").map((p, pIdx) => {
                        const pt = p.trim();
                        return (
                          <span key={pIdx} style={{
                            fontWeight: pt === "present" ? 600 : 400,
                            opacity: pt === "present" ? 1 : 0.75
                          }}>
                            {pt}{pIdx === 0 && " —"}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%", background: exp.color,
                      boxShadow: isHovered ? `0 0 12px ${exp.color}` : "none",
                      transition: "all 0.4s"
                    }} />
                    <span style={{ fontSize: isMobile ? 18 : 20, fontFamily: SERIF, fontWeight: 600, color: T.text, lineHeight: 1.1 }}>
                      {exp.role}
                    </span>
                  </div>

                  <div style={{ fontFamily: MONO, fontSize: 12, color: T.textDim, marginBottom: 20, letterSpacing: "0.02em" }}>
                    // {exp.org}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {exp.points.map((pt, j) => (
                      <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{
                          width: 4, height: 4, borderRadius: "50%", background: isHovered ? exp.color : T.textDim,
                          marginTop: 8, flexShrink: 0, opacity: isHovered ? 0.8 : 0.4,
                          transition: "all 0.4s"
                        }} />
                        <span style={{ fontSize: 14.5, color: T.textMid, lineHeight: 1.6, fontFamily: SERIF }}>
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>

                  {exp.advisor && (
                    <div style={{ marginTop: 24, display: "inline-block", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", padding: "6px 12px", borderRadius: 6 }}>
                      <span style={{ fontSize: 11, color: T.textDim, fontFamily: MONO }}>
                        advisor // <span style={{ color: T.text }}>{exp.advisor}</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EXPLORING SECTION (ACTIVE THREADS)
═══════════════════════════════════════════════ */
function AnimatedNoiseLayer() {
  const { isDark } = useContext(ThemeContext);
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      opacity: isDark ? 0.05 : 0.08,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      animation: "noiseShift 8s steps(10) infinite"
    }}>
      <style>{`
        @keyframes noiseShift {
          0% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CYCLIC CELLULAR AUTOMATON
   Each cell cycles 0 → N-1 → 0. It advances one
   step when ≥ threshold neighbours are one ahead.
   Self-organises into rotating spiral waves.
══════════════════════════════════════════════ */
function CyclicCACanvas() {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef();
  const TRef = useRef(T);
  const isDarkRef = useRef(isDark);
  useEffect(() => { TRef.current = T; isDarkRef.current = isDark; }, [T, isDark]);

  const CELL = 10;    // px per cell — large enough to see the spirals
  const STATES = 5;   // how many states in the cycle
  const THRESHOLD = 1; // neighbours needed to advance
  const TICK_MS = 120; // ms between generations

  const stateRef = useRef({
    logic: null,     // Uint8Array — current state
    visual: null,    // Float32Array — display brightness 0..1
    rows: 0, cols: 0,
    elapsed: 0, lastTick: 0,
  });

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    s.elapsed += dt;

    const cols = Math.ceil(W / CELL);
    const rows = Math.ceil(H / CELL);

    // Initialise on first run or resize
    if (s.cols !== cols || s.rows !== rows) {
      s.cols = cols; s.rows = rows;
      s.logic = new Uint8Array(rows * cols).map(() => (Math.random() * STATES) | 0);
      s.visual = new Float32Array(rows * cols);
      s.lastTick = s.elapsed;
    }

    // Advance logic every TICK_MS
    if (s.elapsed - s.lastTick > TICK_MS) {
      s.lastTick = s.elapsed;
      const next = new Uint8Array(rows * cols);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cur = s.logic[r * cols + c];
          const successor = (cur + 1) % STATES;
          // Count neighbours in the successor state
          let cnt = 0;
          if (r > 0 && s.logic[(r - 1) * cols + c] === successor) cnt++;
          if (r < rows - 1 && s.logic[(r + 1) * cols + c] === successor) cnt++;
          if (c > 0 && s.logic[r * cols + (c - 1)] === successor) cnt++;
          if (c < cols - 1 && s.logic[r * cols + (c + 1)] === successor) cnt++;
          next[r * cols + c] = cnt >= THRESHOLD ? successor : cur;
        }
      }
      s.logic = next;
    }

    // Smooth visual fade toward logic
    ctx.clearRect(0, 0, W, H);
    const hex = TRef.current.accent1 || "#967bf0";
    const rC = parseInt(hex.slice(1, 3), 16);
    const gC = parseInt(hex.slice(3, 5), 16);
    const bC = parseInt(hex.slice(5, 7), 16);
    const baseAlpha = isDarkRef.current ? 0.35 : 0.25;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        // Map state to target brightness: state 0 → 0, state N-1 → 1
        const target = s.logic[idx] / (STATES - 1);
        let cur = s.visual[idx];
        cur += cur < target ? 0.05 : cur > target ? -0.03 : 0;
        cur = Math.max(0, Math.min(1, cur));
        s.visual[idx] = cur;

        if (cur > 0.02) {
          ctx.fillStyle = `rgba(${rC},${gC},${bC},${cur * baseAlpha})`;
          ctx.beginPath();
          ctx.roundRect(c * CELL + 2, r * CELL + 2, CELL - 4, CELL - 4, 2);
          ctx.fill();
        }
      }
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.getContext("2d").scale(dpr, dpr);
      stateRef.current.cols = 0;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas); resize();
    return () => ro.disconnect();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ══════════════════════════════════════════════
   2D ISING SPIN LATTICE — Metropolis Monte Carlo
   Styled identically to the Experience section
   (24 px cells, 1200 ms tick, fade ±0.05/0.03)
══════════════════════════════════════════════ */
function IsingCanvas() {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef();
  const TRef = useRef(T);
  const isDarkRef = useRef(isDark);
  useEffect(() => { TRef.current = T; isDarkRef.current = isDark; }, [T, isDark]);

  const CELL = typeof window !== "undefined" && window.innerWidth < 850 ? 18 : 24;
  const J = 1;

  const stateRef = useRef({
    logic: null,   // Int8Array (+1 / -1 spins)
    visual: null,  // Float32Array (0..1 brightness per cell)
    rows: 0, cols: 0,
    elapsed: 0, lastTick: 0,
  });

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    s.elapsed += dt;

    const cols = Math.floor(canvas.offsetWidth / CELL) + 1;
    const rows = Math.floor(canvas.offsetHeight / CELL) + 1;

    if (s.cols !== cols || s.rows !== rows) {
      s.cols = cols; s.rows = rows;
      s.logic = new Int8Array(rows * cols).map(() => Math.random() < 0.5 ? 1 : -1);
      s.visual = new Float32Array(rows * cols);
      s.lastTick = s.elapsed;
    }

    // One full Metropolis sweep every 1200 ms (matches GoL tick)
    if (s.elapsed - s.lastTick > 1200) {
      s.lastTick = s.elapsed;
      // Temperature oscillates 1.8 ↔ 3.2 through Tc ≈ 2.27
      const temp = 2.5 + Math.sin(s.elapsed * 0.000020) * 0.7;
      const N = rows * cols;
      for (let i = 0; i < N; i++) {
        const idx = (Math.random() * N) | 0;
        const r = (idx / cols) | 0;
        const c = idx % cols;
        const spin = s.logic[idx];
        const nb =
          s.logic[((r - 1 + rows) % rows) * cols + c] +
          s.logic[((r + 1) % rows) * cols + c] +
          s.logic[r * cols + (c - 1 + cols) % cols] +
          s.logic[r * cols + (c + 1) % cols];
        const dE = 2 * J * spin * nb;
        if (dE <= 0 || Math.random() < Math.exp(-dE / temp)) s.logic[idx] = -spin;
      }
    }

    // Visual fade toward logic — matches GoL visual treatment
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    const hex = TRef.current.accent1 || "#967bf0";
    const rC = parseInt(hex.slice(1, 3), 16);
    const gC = parseInt(hex.slice(3, 5), 16);
    const bC = parseInt(hex.slice(5, 7), 16);
    const baseAlpha = isDarkRef.current ? 0.35 : 0.25;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const target = s.logic[idx] === 1 ? 1 : 0;
        let cur = s.visual[idx];
        if (cur < target) cur = Math.min(target, cur + 0.05);
        else if (cur > target) cur = Math.max(target, cur - 0.03);
        s.visual[idx] = cur;

        if (cur > 0) {
          ctx.fillStyle = `rgba(${rC},${gC},${bC},${cur * baseAlpha})`;
          ctx.beginPath();
          ctx.roundRect(c * CELL + 2, r * CELL + 2, CELL - 4, CELL - 4, 3);
          ctx.fill();
        }
      }
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.getContext("2d").scale(dpr, dpr);
      stateRef.current.cols = 0;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas); resize();
    return () => ro.disconnect();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ══════════════════════════════════════════════
   GAME-OF-LIFE DOT BACKGROUND (shared visual style)
   Independent simulation — reused in Active Threads
══════════════════════════════════════════════ */
function GoLDotBg() {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef();
  const TRef = useRef(T);
  const isDarkRef = useRef(isDark);
  useEffect(() => { TRef.current = T; isDarkRef.current = isDark; }, [T, isDark]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 850;
  const CELL = isMobile ? 18 : 24;

  const stateRef = useRef({
    logicGrid: null, grid: null,
    rows: 0, cols: 0,
    totalElapsed: 0, lastLogicTick: 0,
  });

  useAnimationFrame((dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cellSize = CELL;
    const cols = Math.ceil(canvas.offsetWidth / cellSize);
    const rows = Math.ceil(canvas.offsetHeight / cellSize);
    const s = stateRef.current;

    if (s.cols !== cols || s.rows !== rows) {
      s.cols = cols; s.rows = rows;
      s.logicGrid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.random() < 0.25 ? 1 : 0));
      s.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
      s.lastLogicTick = s.totalElapsed;
    }

    s.totalElapsed += dt;

    // GoL logic tick every 1200 ms
    if (s.totalElapsed - s.lastLogicTick > 1200) {
      s.lastLogicTick = s.totalElapsed;
      const next = Array.from({ length: rows }, () => Array(cols).fill(0));
      let alive = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let nb = 0;
          for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nr = r + i, nc = c + j;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) nb += s.logicGrid[nr][nc];
          }
          if (s.logicGrid[r][c] === 1) next[r][c] = (nb === 2 || nb === 3) ? 1 : 0;
          else next[r][c] = nb === 3 ? 1 : 0;
          alive += next[r][c];
        }
      }
      // Re-seed if nearly dead
      if (alive < rows * cols * 0.02) {
        for (let r = 0; r < rows; r++)
          for (let c = 0; c < cols; c++)
            next[r][c] = Math.random() < 0.2 ? 1 : 0;
      }
      s.logicGrid = next;
    }

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    const theme = TRef.current;
    const dark = isDarkRef.current;
    const hex = theme.accent1 || "#967bf0";
    const rC = parseInt(hex.slice(1, 3), 16);
    const gC = parseInt(hex.slice(3, 5), 16);
    const bC = parseInt(hex.slice(5, 7), 16);
    const baseAlpha = dark ? 0.35 : 0.25;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const target = s.logicGrid[r][c];
        let cur = s.grid[r][c];
        if (cur < target) cur = Math.min(target, cur + 0.05);
        else if (cur > target) cur = Math.max(target, cur - 0.03);
        s.grid[r][c] = cur;

        const cx = c * cellSize + cellSize / 2;
        const cy = r * cellSize + cellSize / 2;
        const deadAlpha = dark ? 0.10 : 0.07;
        ctx.fillStyle = `rgba(${rC},${gC},${bC},${deadAlpha})`;
        ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
        if (cur > 0) {
          ctx.fillStyle = `rgba(${rC},${gC},${bC},${cur * baseAlpha})`;
          ctx.beginPath(); ctx.arc(cx, cy, 2 + cur * 3.5, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      canvas.getContext("2d").scale(dpr, dpr);
      stateRef.current.cols = 0;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas); resize();
    return () => ro.disconnect();
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ══════════════════════════════════════════════
   EXPLORING SECTION (ACTIVE THREADS)
══════════════════════════════════════════════ */
function ExploringSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  const STATUS_COLORS_LIGHT = {
    active: "#17a08c",
    reading: "#5c42bd",
    ongoing: "#c46d03",
    new: "#b53131",
  };

  return (
    <section id="exploring" style={{ padding: isMobile ? "60px 0" : "80px 0", background: "transparent", position: "relative", overflow: "hidden" }}>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <SectionLabel n="04" label="Currently exploring" />
          <SectionHeading>Active Threads</SectionHeading>
          <p style={{ fontSize: 13, color: T.textDim, fontFamily: MONO, margin: "8px 0 0", letterSpacing: "0.02em" }}>
            Things I am thinking about right now.
          </p>
        </div>

        {/* Single glass panel — terminal aesthetic */}
        <div style={{
          background: isDark ? "rgba(28,30,36,0.55)" : "rgba(255,255,255,0.60)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `0.5px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
          borderRadius: 12,
          padding: isMobile ? "12px 20px" : "12px 32px",
        }}>
          {EXPLORING.map((item, i) => {
            const dotColor = isDark
              ? (STATUS_COLORS_DARK[item.status]?.text || STATUS_COLORS_DARK.reading.text)
              : (STATUS_COLORS_LIGHT[item.status] || STATUS_COLORS_LIGHT.reading);

            return (
              <div key={i} style={{
                padding: isMobile ? "14px 0" : "16px 0",
                borderBottom: i < EXPLORING.length - 1 ? `0.5px solid ${T.border}` : "none",
              }}>
                {/* Prompt line: dot + label */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: dotColor, opacity: 0.7 }}>❯</span>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: dotColor, boxShadow: `0 0 5px ${dotColor}`, flexShrink: 0,
                    animation: item.status === "active" ? "pulseExplore 2.2s ease-in-out infinite" : "none"
                  }} />
                  <span style={{
                    fontFamily: MONO, fontSize: isMobile ? 13 : 14,
                    color: T.text, letterSpacing: "0.02em", fontWeight: 500,
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: 9, color: dotColor,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    marginLeft: "auto", opacity: 0.75, flexShrink: 0,
                  }}>
                    {item.status}
                  </span>
                </div>

                {/* Detail line */}
                <div style={{
                  fontFamily: MONO, fontSize: 11, color: T.textDim,
                  letterSpacing: "0.01em", lineHeight: 1.5, paddingLeft: 21,
                }}>
                  {item.detail}
                </div>
              </div>
            );
          })}

          {/* Terminal cursor after last item */}
          <div style={{ padding: "10px 0 4px", fontFamily: MONO, fontSize: 13, color: T.textDim }}>
            <span style={{ opacity: 0.4 }}>❯ </span>
            <span style={{ animation: "termBlink 1.1s step-end infinite", color: T.accent1 }}>▋</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseExplore { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes termBlink    { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section >
  );
}

/* ═══════════════════════════════════════════════
   ABOUT SECTION (DARK)
═══════════════════════════════════════════════ */
function AboutSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  return (
    <section id="about" style={{ padding: isMobile ? "60px 0 100px" : "80px 0 120px", background: T.bg, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <InteractiveBackgroundGraphs />
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        opacity: isDark ? 0.6 : 0.4
      }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "5fr 4fr", gap: isMobile ? 60 : 80, alignItems: "start" }}>

          <div>
            <SectionLabel n="06" label="About" />
            <h2 style={{
              fontSize: 38, fontWeight: 600, color: T.text, margin: "0 0 8px",
              letterSpacing: "-0.02em", fontFamily: SERIF
            }}>
              Harshavardhan Hajeri
            </h2>
            <p style={{
              fontFamily: MONO, fontSize: 11, color: T.textDim, margin: "0 0 32px",
              letterSpacing: "0.08em"
            }}>
              M.Sc. Physics · B.E. Mechanical Engineering · BITS Pilani
            </p>
            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.85, margin: "0 0 20px", fontFamily: SERIF }}>
              I build at the intersection of quantum optics, photonic computing, and quantum algorithms.
              Currently researching at IIT Madras under Prof. Anil Prabhakar — spatial light modulators,
              nonlinear cavities, and analog optical computation.
            </p>
            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.85, margin: "0 0 20px", fontFamily: SERIF }}>
              Co-founder of Qugain Quantum Technologies, where we released{" "}
              <span style={{ fontFamily: MONO, fontSize: 14, color: T.accent1 }}>qtsit</span> — discrete-time
              quantum walk implementations applied to reinforcement learning problems.
            </p>
            <p style={{ fontSize: 15, color: "#70706a", lineHeight: 1.8, margin: "0 0 36px", fontFamily: SERIF }}>
              I'm interested in systems where physics is not just the substrate but the computation.
              Interference patterns as optimization. Walks as search. Cavities as signal processors.
              The boundary is interesting.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "Email", href: "mailto:f20212402@goa.bits-pilani.ac.in", note: "f20212402@goa.bits-pilani.ac.in" },
                { label: "GitHub ↗", href: "https://github.com", note: "open source" },
                { label: "LinkedIn ↗", href: "#", note: "connect" },
              ].map(({ label, href, note }) => (
                <a key={label} href={href} style={{
                  fontFamily: MONO, fontSize: 10.5, color: T.textMid,
                  border: `0.5px solid ${T.border}`, borderRadius: 5, padding: "10px 16px",
                  textDecoration: "none", background: T.surface,
                  display: "flex", flexDirection: "column", gap: 3
                }}>
                  <span style={{ fontSize: 10.5, letterSpacing: "0.07em" }}>{label}</span>
                  <span style={{ fontSize: 9.5, color: T.textDim }}>{note}</span>
                </a>
              ))}
              <CVButton />
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 36 }}>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.textDim,
                letterSpacing: "0.12em", marginBottom: 16, textTransform: "uppercase"
              }}>
                Recognition
              </div>
              {[
                ["PIEDS Seed Fund", "INR 5,00,000", T.accent2],
                ["Prof. Suresh Ramaswamy Award", "INR 40,000", T.accent1],
                ["IBM Qiskit Fall Fest Mentor", "2024", T.accent3],
              ].map(([k, v, c]) => (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "11px 0", borderBottom: `0.5px solid ${T.border}`
                }}>
                  <span style={{ fontSize: 14, color: T.textMid, fontFamily: SERIF }}>{k}</span>
                  <span style={{
                    fontFamily: MONO, fontSize: 11, color: c,
                    background: `${c}15`, borderRadius: 3, padding: "2px 8px"
                  }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 36 }}>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.textDim,
                letterSpacing: "0.12em", marginBottom: 16, textTransform: "uppercase"
              }}>
                Publications
              </div>
              {[
                { authors: "G. Patil*, H. Hajeri*, et al.", title: "Modal Decomposition of Cavity SHG Fields using Spatial Light Modulator", venue: "EOP 2025" },
                { authors: "H. Hajeri*, N. Vinod P.M., et al.", title: "Spatial Photonic Ising Machine using Spatial Light Modulators", venue: "EOP 2025" },
              ].map((p, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: `0.5px solid ${T.border}` }}>
                  <div style={{
                    fontFamily: SERIF, fontSize: 13.5, color: T.textMid,
                    lineHeight: 1.55, marginBottom: 5
                  }}>
                    {p.title}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T.textDim }}>{p.authors}</span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T.accent1 }}>{p.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════ */

export default function AppWrapper() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = useCallback(() => setIsDark(d => !d), []);
  const T = isDark ? D : L;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, T }}>
      <Portfolio />
    </ThemeContext.Provider>
  );
}

function Portfolio() {
  const { isDark, toggleTheme, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: SERIF, color: T.text }}>


      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 48px", height: 52,
        background: navVisible ? (isDark ? "rgba(14,15,18,0.95)" : "rgba(244,242,238,0.95)") : "transparent",
        backdropFilter: navVisible ? "blur(16px)" : "none",
        borderBottom: navVisible ? `0.5px solid ${T.border}` : "none",
        transition: "all 0.4s ease"
      }}>
        <span style={{ fontFamily: MONO, fontSize: 12, color: T.textDim, letterSpacing: "0.12em" }}>
          HH — 2025
        </span>
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <button onClick={toggleTheme} title="Toggle Theme" style={{ background: "transparent", border: "none", cursor: "pointer", color: T.textDim, transition: "color 0.2s", display: "flex", alignItems: "center" }} onMouseEnter={e => e.currentTarget.style.color = T.text} onMouseLeave={e => e.currentTarget.style.color = T.textDim}>
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          {[["work", "#work"], ["field", "#field"], ["experience", "#experience"],
          ["exploring", "#exploring"], ["about", "#about"]]
            .filter(([s]) => !(isMobile && s === "field"))
            .map(([s, h]) => (
              <a key={s} href={h} style={{
                fontFamily: MONO, fontSize: 10.5, color: T.textDim,
                textDecoration: "none", letterSpacing: "0.08em",
                transition: "color 0.2s"
              }}
                onMouseEnter={e => e.target.style.color = T.text}
                onMouseLeave={e => e.target.style.color = T.textDim}>
                {s}
              </a>
            ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex",
        flexDirection: "column", justifyContent: "center", alignItems: "center",
        overflow: "hidden", paddingTop: 52
      }}>
        <DotGrid opacity={0.14} />
        <HeroTraces />

        {/* ambient glow orbs */}
        <div style={{
          position: "absolute", top: "20%", left: "15%", width: 400, height: 400,
          borderRadius: "50%", background: T.accent1, opacity: 0.03, filter: "blur(80px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "25%", right: "18%", width: 320, height: 320,
          borderRadius: "50%", background: T.accent2, opacity: 0.04, filter: "blur(60px)",
          pointerEvents: "none"
        }} />

        <div style={{
          position: "relative", zIndex: 2, maxWidth: 900, padding: "0 40px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 48
        }}>
          {/* photo + identity */}
          <div style={{
            display: "flex", alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 32 : 48,
            textAlign: isMobile ? "center" : "left"
          }}>
            <HeroPicture />
            <div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.textDim,
                letterSpacing: "0.18em", marginBottom: 20, textTransform: "uppercase"
              }}>
                M.Sc. Physics · B.E. Mech. Eng · BITS Pilani
              </div>
              <h1 style={{
                fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, lineHeight: 1.2,
                color: T.text, margin: "0 0 22px", letterSpacing: "-0.02em"
              }}>
                Building at the edge of{" "}
                <em style={{ fontStyle: "italic", color: T.accent1 }}>physical</em>{" "}
                and{" "}
                <em style={{ fontStyle: "italic", color: T.accent3 }}>computational</em>{" "}
                systems.
              </h1>
              <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.75, margin: "0 0 32px" }}>
                Quantum optics, photonic computing, quantum algorithms —
                experiments that become instruments.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "GitHub ↗", href: "https://github.com" },
                  { label: "Papers", href: "#about" },
                  { label: "Contact", href: "mailto:f20212402@goa.bits-pilani.ac.in" },
                ].map((l) => (
                  <a key={l.label} href={l.href}
                    style={{
                      fontFamily: MONO, fontSize: 10.5, color: T.textMid,
                      border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "8px 18px",
                      textDecoration: "none", background: T.surface, letterSpacing: "0.05em",
                      transition: "all 0.25s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHi; e.currentTarget.style.color = T.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMid; }}>
                    {l.label}
                  </a>
                ))}
                <CVButton />
              </div>
            </div>
          </div>

          {/* terminal */}
          {!isMobile && (
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <MiniTerminal />
            </div>
          )}
        </div>

        <div style={{
          position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)",
          fontFamily: MONO, fontSize: 10, color: T.textDim, letterSpacing: "0.1em",
          animation: "fadeOsc 3s ease-in-out infinite"
        }}>
          ↓ scroll
        </div>
        <style>{`@keyframes fadeOsc{0%,100%{opacity:0.25}50%{opacity:0.75}}`}</style>
      </section>

      {/* PROJECTS */}
      <div id="work">
        <ProjectsSection />
      </div>

      {/* CONCEPT FIELD */}
      {!isMobile && <ConceptField />}

      {/* ABOUT */}
      <AboutSection />

      {/* EXPERIENCE + EXPLORING — shared single GoL dot-matrix canvas */}
      <div style={{ position: "relative", background: T.bg, overflow: "hidden" }}>
        <ConwaysGameOfLife />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
          opacity: isDark ? 0.35 : 0.2
        }} />
        <ExperienceSection />
        <ExploringSection />
      </div>



      {/* FOOTER */}
      <footer style={{
        borderTop: `0.5px solid ${T.border}`, padding: "22px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: T.bg2
      }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: T.textDim }}>
          Harshavardhan Hajeri · BITS Pilani · 2025
        </span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[T.accent1, T.accent3, T.accent2, T.accent4].map((c, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: "50%", background: c,
              boxShadow: `0 0 4px ${c}80`, opacity: 0.7
            }} />
          ))}
          <span style={{ fontFamily: MONO, fontSize: 10, color: T.textDim, marginLeft: 8 }}>
            f20212402@goa.bits-pilani.ac.in
          </span>
        </div>
      </footer>
    </div>
  );
}
