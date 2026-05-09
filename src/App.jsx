import { useState, useEffect, useRef, useCallback } from "react";
import heroPhoto from "./assets/pict.jpg";

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
  "Entanglement":   { r:108, g:92,  b:231, label:"#8a80e8" },
  "Quantum Walk":   { r:130, g:100, b:240, label:"#9a88f0" },
  "DTQW":           { r:148, g:120, b:245, label:"#a898f0" },
  "QuTiP":          { r:90,  g:75,  b:210, label:"#8070d8" },
  "Cluster States": { r:115, g:88,  b:225, label:"#9a7ae0" },
  "Ising":          { r:160, g:100, b:240, label:"#b080f0" },
  "SLM":            { r:220, g:140, b:40,  label:"#e0a830" },
  "Photonics":      { r:235, g:155, b:30,  label:"#e8b828" },
  "Interference":   { r:210, g:130, b:60,  label:"#d8a048" },
  "Cavity":         { r:200, g:120, b:50,  label:"#c89040" },
  "SHG":            { r:225, g:165, b:45,  label:"#e0c030" },
  "Modal Decomp.":  { r:215, g:145, b:55,  label:"#d8a840" },
  "Fourier Optics": { r:230, g:170, b:35,  label:"#e8c828" },
  "Optimization":   { r:30,  g:185, b:165, label:"#20c0a8" },
  "RL":             { r:40,  g:195, b:175, label:"#28c8b0" },
  "Algorithms":     { r:25,  g:175, b:155, label:"#18b8a0" },
  "MEMS":           { r:220, g:80,  b:80,  label:"#e06060" },
  "Acoustics":      { r:210, g:90,  b:90,  label:"#d07070" },
  "FEM":            { r:205, g:100, b:75,  label:"#d08060" },
  "Mechanics":      { r:215, g:85,  b:65,  label:"#d87050" },
};

const DEFAULT_COLOR = { r:140, g:130, b:115, label:"#9a9080" };

const GRAPH_NODES = [
  { id: "Optimization",   x: 0.50, y: 0.30 },
  { id: "Quantum Walk",   x: 0.22, y: 0.52 },
  { id: "DTQW",           x: 0.13, y: 0.33 },
  { id: "RL",             x: 0.36, y: 0.68 },
  { id: "Ising",          x: 0.68, y: 0.18 },
  { id: "SLM",            x: 0.80, y: 0.42 },
  { id: "Interference",   x: 0.63, y: 0.52 },
  { id: "Photonics",      x: 0.55, y: 0.72 },
  { id: "Modal Decomp.",  x: 0.84, y: 0.68 },
  { id: "Cavity",         x: 0.74, y: 0.82 },
  { id: "SHG",            x: 0.88, y: 0.28 },
  { id: "MEMS",           x: 0.18, y: 0.78 },
  { id: "Acoustics",      x: 0.08, y: 0.64 },
  { id: "FEM",            x: 0.06, y: 0.44 },
  { id: "Mechanics",      x: 0.13, y: 0.18 },
  { id: "QuTiP",          x: 0.44, y: 0.12 },
  { id: "Cluster States", x: 0.28, y: 0.18 },
  { id: "Entanglement",   x: 0.40, y: 0.44 },
  { id: "Fourier Optics", x: 0.68, y: 0.60 },
];

const GRAPH_EDGES = [
  ["Optimization","Ising"],["Optimization","DTQW"],["Optimization","RL"],
  ["Optimization","Entanglement"],["Optimization","FEM"],
  ["Quantum Walk","DTQW"],["Quantum Walk","RL"],["Quantum Walk","Entanglement"],
  ["DTQW","RL"],["DTQW","Entanglement"],
  ["SLM","Ising"],["SLM","Interference"],["SLM","Modal Decomp."],["SLM","Fourier Optics"],
  ["Interference","Ising"],["Interference","Fourier Optics"],
  ["Photonics","SLM"],["Photonics","Modal Decomp."],["Photonics","Cavity"],["Photonics","Interference"],
  ["Modal Decomp.","Cavity"],["Modal Decomp.","Fourier Optics"],
  ["Cavity","SHG"],["SHG","SLM"],["SHG","Fourier Optics"],
  ["MEMS","Acoustics"],["MEMS","FEM"],["MEMS","Mechanics"],
  ["FEM","Mechanics"],["FEM","Acoustics"],
  ["QuTiP","Entanglement"],["QuTiP","Cluster States"],["QuTiP","Quantum Walk"],
  ["Cluster States","Entanglement"],
  ["Entanglement","Quantum Walk"],
];

const EXPLORING = [
  { label: "open quantum systems",           detail: "QuTiP — Lindblad master equations, decoherence landscapes",     status: "active" },
  { label: "photonic computing",             detail: "SLM-based analog solvers beyond Ising — continuous optimization", status: "active" },
  { label: "variational quantum algorithms", detail: "QAOA geometry on near-term hardware",                             status: "reading" },
  { label: "modal crosstalk in cavities",    detail: "Extending holographic alignment to higher-order modes",           status: "ongoing" },
  { label: "quantum walks on graphs",        detail: "Spectral graph theory → walk dynamics correspondence",            status: "reading" },
  { label: "topological photonics",          detail: "Edge states and band topology in photonic lattices",              status: "new" },
];

const STATUS_COLORS_DARK = {
  active:  { bg:"rgba(32,192,168,0.12)", border:"rgba(32,192,168,0.3)", text:"#40d8b8" },
  reading: { bg:"rgba(108,92,231,0.12)", border:"rgba(108,92,231,0.3)", text:"#a898f0" },
  ongoing: { bg:"rgba(224,168,48,0.12)", border:"rgba(224,168,48,0.3)", text:"#e0c050" },
  new:     { bg:"rgba(200,80,200,0.12)", border:"rgba(200,80,200,0.3)", text:"#d880d8" },
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
  { kind: "note",    content: "crosstalk matrix: off-diagonals ≠ 0 → modes bleed", coord: "λ=1064nm" },
  { kind: "ref",     content: "Farhi et al. 2014 — QAOA on MaxCut", coord: "arXiv:1411.4028" },
  { kind: "measure", content: "modal self-overlap: 0.86 → 0.96 after calibration", coord: "Δ = +11.6%" },
  { kind: "sketch",  content: "phase-space portrait of a driven nonlinear oscillator", coord: "x vs ẋ" },
  { kind: "note",    content: "Boltzmann weight: e^{-ΔE/kT} — simulated annealing mimics cooling", coord: "stat. mech." },
  { kind: "ref",     content: "Aharonov et al. 1993 — coined quantum walk on the line", coord: "PRL 70, 1975" },
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
  const canvasRef = useRef();
  const activeRef = useRef(activeNodes);
  useEffect(() => { activeRef.current = activeNodes; }, [activeNodes]);

  const nodesRef = useRef(
    GRAPH_NODES.map((n) => ({
      ...n,
      vx: (Math.random() - 0.5) * 0.00014,
      vy: (Math.random() - 0.5) * 0.00014,
      phase: Math.random() * Math.PI * 2,
    }))
  );

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
      n.x += n.vx + Math.sin(n.phase) * 0.000055;
      n.y += n.vy + Math.cos(n.phase * 0.73) * 0.000055;
      if (n.x < 0.04 || n.x > 0.96) n.vx *= -1;
      if (n.y < 0.04 || n.y > 0.96) n.vy *= -1;
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
        const semiColor   = dark ? "rgba(100,120,180,0.22)" : "rgba(90,110,155,0.18)";
        const dimColor    = dark ? "rgba(60,70,100,0.06)" : "rgba(160,155,140,0.08)";
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

      // glow ring — dark mode only
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
        ctx.font = `${(isHighlighted || fullColor) ? "500" : "400"} ${fullColor ? "9.5px" : "9px"} 'IBM Plex Mono', monospace`;
        ctx.globalAlpha = labelAlpha;
        ctx.fillStyle = fullColor
          ? (col.label || (dark ? "#c0b888" : "#504030"))
          : dark
            ? (isHighlighted ? "rgba(200,210,255,0.95)" : "rgba(120,130,160,0.55)")
            : (isHighlighted ? "rgba(42,54,100,0.95)" : "rgba(100,95,82,0.55)");
        ctx.fillText(n.id, n.x * W + (r + pulse + 3), n.y * H + 3.5);
        ctx.globalAlpha = 1.0;
      }
    });
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);
    setSize();
    return () => ro.disconnect();
  }, []);

  return <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />;
}

/* ═══════════════════════════════════════════════
   SHARED UI PRIMITIVES
═══════════════════════════════════════════════ */
const MONO = "'IBM Plex Mono', monospace";
const SERIF = "'Spectral', 'Georgia', serif";

// Dark palette
const D = {
  bg:        "#0e0f12",
  bg2:       "#131519",
  bg3:       "#181b20",
  surface:   "#1c2028",
  surfaceHi: "#222833",
  border:    "rgba(255,255,255,0.07)",
  borderMed: "rgba(255,255,255,0.12)",
  borderHi:  "rgba(255,255,255,0.18)",
  text:      "#e8e4da",
  textMid:   "#a09890",
  textDim:   "#60605a",
  accent1:   "#7a5ce0",  // quantum purple
  accent2:   "#20c0a8",  // teal/algo
  accent3:   "#d4880a",  // amber photonics
  accent4:   "#c84040",  // red mechanics
};

function DotGrid({ opacity = 0.18 }) {
  return (
    <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity }}>
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
  return (
    <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim, letterSpacing:"0.18em",
      textTransform:"uppercase", display:"block", marginBottom:12 }}>
      § {n} — {label}
    </span>
  );
}

function SectionHeading({ children, style = {} }) {
  return (
    <h2 style={{ fontSize:32, fontWeight:600, color:D.text, margin:"0 0 10px",
      letterSpacing:"-0.01em", fontFamily:SERIF, ...style }}>
      {children}
    </h2>
  );
}

function HeroTraces() {
  const paths = [
    "M 50,200 Q 200,100 400,180 T 750,160",
    "M 100,350 Q 300,250 500,320 T 800,280",
    "M 200,150 Q 350,80 600,200 Q 700,250 900,180",
    "M 0,400 Q 250,320 450,380 T 900,350",
    "M 300,80 Q 500,160 600,100 T 900,130",
  ];
  return (
    <svg viewBox="0 0 900 500" style={{ position:"absolute", inset:0, width:"100%",
      height:"100%", pointerEvents:"none", opacity:0.18 }}>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i%2===0?"#7a5ce0":"#20c0a8"} strokeWidth="0.8"
          strokeDasharray="3 9"
          style={{ animation:`hTrace ${14+i*3}s ease-in-out infinite`, animationDelay:`${i*1.8}s` }} />
      ))}
      <style>{`@keyframes hTrace{0%,100%{opacity:0.3}50%{opacity:0.9}}`}</style>
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   INTERACTIVE TERMINAL — hero easter egg
═══════════════════════════════════════════════ */
function MiniTerminal() {
  const [lines, setLines] = useState([
    { t:"sys", v:"> initializing field..." },
    { t:"ok",  v:"  ✓ quantum walk loaded" },
    { t:"ok",  v:"  ✓ SLM driver online" },
  ]);
  const [input, setInput] = useState("");
  const [blinking, setBlinking] = useState(true);
  const endRef = useRef();

  const COMMANDS = {
    help:    ["available: projects, skills, status, clear"],
    projects:["spim — spatial photonic Ising machine","hmd  — holographic modal decomposition","dtqw — discrete-time quantum walk","csg  — cluster state generation","mems — MEMS microphone FEM"],
    skills:  ["python · matlab · qiskit · qutip","labview · comsol · fusion360","fourier optics · slm control"],
    status:  ["currently: IIT Madras — photonics lab","open to: research collaborations","qtsit: live on PyPI"],
    clear:   null,
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [lines]);

  useEffect(() => {
    const t = setInterval(() => setBlinking(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  const handleKey = (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    const newLines = [...lines, { t:"inp", v:`> ${input}` }];
    if (cmd === "clear") {
      setLines([{ t:"sys", v:"> field cleared" }]);
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach(l => newLines.push({ t:"out", v:`  ${l}` }));
      setLines(newLines);
    } else if (cmd) {
      newLines.push({ t:"err", v:`  unknown: ${cmd}. type 'help'` });
      setLines(newLines);
    }
    setInput("");
  };

  const colors = { sys:D.textDim, ok:D.accent2, inp:"#a898f0", out:D.textMid, err:D.accent4 };

  return (
    <div style={{ background:D.bg, border:`0.5px solid ${D.border}`, borderRadius:10,
      fontFamily:MONO, fontSize:11, overflow:"hidden", width:"100%", maxWidth:380 }}>
      <div style={{ padding:"8px 14px", borderBottom:`0.5px solid ${D.border}`,
        display:"flex", alignItems:"center", gap:7 }}>
        {["#ef6b6b","#f0c040","#6bbf6b"].map((c,i) => (
          <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c, opacity:0.7 }} />
        ))}
        <span style={{ fontSize:9.5, color:D.textDim, marginLeft:6, letterSpacing:"0.08em" }}>
          hh-field.local
        </span>
      </div>
      <div style={{ padding:"12px 14px", maxHeight:160, overflowY:"auto", scrollbarWidth:"none" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color:colors[l.t]||D.textMid, lineHeight:1.6, fontSize:11 }}>
            {l.v}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ padding:"6px 14px", borderTop:`0.5px solid ${D.border}`,
        display:"flex", alignItems:"center", gap:6 }}>
        <span style={{ color:D.accent1, fontSize:11 }}>›</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="type 'help'"
          style={{ background:"transparent", border:"none", outline:"none", color:D.text,
            fontFamily:MONO, fontSize:11, flex:1, caretColor:D.accent1 }}
        />
        <span style={{ color:D.accent1, opacity:blinking ? 1 : 0, fontSize:12 }}>▋</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CV DOWNLOAD BUTTON
═══════════════════════════════════════════════ */
function CVButton() {
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
      style={{ fontFamily:MONO, fontSize:11, color: downloading ? D.accent2 : D.text,
        border:`0.5px solid ${downloading ? D.accent2 : D.borderMed}`,
        borderRadius:5, padding:"9px 20px", cursor:"pointer", background:D.surface,
        letterSpacing:"0.07em", display:"flex", alignItems:"center", gap:8,
        transition:"all 0.3s ease" }}>
      <span style={{ fontSize:14, opacity:0.8 }}>{downloading ? "✓" : "↓"}</span>
      {downloading ? "preparing..." : "Download CV"}
    </button>
  );
}

/* ═══════════════════════════════════════════════
   HERO PICTURE placeholder
═══════════════════════════════════════════════ */
function HeroPicture() {
  return (
    <div style={{ position:"relative", width:180, height:180, flexShrink:0 }}>
      {/* animated ring */}
      <svg style={{ position:"absolute", inset:-8, width:"calc(100%+16px)", height:"calc(100%+16px)",
        animation:"spin 18s linear infinite" }} viewBox="0 0 196 196">
        <circle cx="98" cy="98" r="90" fill="none" stroke={D.accent1} strokeWidth="0.5"
          strokeDasharray="8 16" opacity="0.4" />
        <circle cx="98" cy="98" r="82" fill="none" stroke={D.accent2} strokeWidth="0.5"
          strokeDasharray="3 20" opacity="0.3" />
      </svg>
      {/* photo placeholder — replace src with actual photo */}
      <div style={{ width:180, height:180, borderRadius:"50%",
        border:`1.5px solid ${D.borderMed}`, overflow:"hidden",
        background:`linear-gradient(135deg, ${D.surface} 0%, #1a2038 100%)`,
        display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
        gap:6, position:"relative" }}>
        {/* Replace the div below with: <img src="your-photo.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
        <div style={{ fontSize:48, opacity:0.25 }}>☯</div>
        <span style={{ fontFamily:MONO, fontSize:8.5, color:D.textDim, letterSpacing:"0.1em" }}>
          HH
        </span>
        <img
          src={heroPhoto}
          alt="Harshavardhan Hajeri"
          style={{
            position:"absolute",
            inset:0,
            width:"100%",
            height:"100%",
            objectFit:"cover",
            display:"block",
          }}
        />
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCROLL-DRIVEN PROJECT SECTION
═══════════════════════════════════════════════ */
function ProjectsSection() {
  const outerRef = useRef();
  const [activeIdx, setActiveIdx] = useState(0);
  const N = PROJECTS.length;

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total    = (N - 1) * window.innerHeight;
      const ratio    = Math.max(0, Math.min(1, scrolled / total));
      setActiveIdx(Math.round(ratio * (N - 1)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [N]);

  const project = PROJECTS[activeIdx];

  return (
    <div ref={outerRef} style={{ height:`${N * 100}vh`, position:"relative" }}>
      <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden",
        background:D.bg }}>
        {/* scanline effect */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1,
          backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
          opacity:0.6 }} />

        <div style={{ position:"absolute", top:64, left:48, zIndex:10 }}>
          <SectionLabel n="01" label="Pinned artifacts" />
        </div>
        <div style={{ position:"absolute", top:68, right:48, zIndex:10,
          display:"flex", gap:6, alignItems:"center" }}>
          {PROJECTS.map((_,i) => (
            <div key={i} style={{ height:3, borderRadius:2,
              width: i===activeIdx ? 24 : 6,
              background: i===activeIdx ? D.accent1 : "rgba(255,255,255,0.12)",
              transition:"all 0.4s ease", boxShadow: i===activeIdx ? `0 0 8px ${D.accent1}60` : "none" }} />
          ))}
          <span style={{ fontFamily:MONO, fontSize:9, color:D.textDim, marginLeft:8 }}>
            {activeIdx+1}/{N}
          </span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", height:"100%" }}>
          {/* LEFT */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
            padding:"96px 36px 60px 48px" }}>
            <div style={{ width:"100%", maxWidth:520 }}>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginBottom:20 }}>
                {project.tags.map((t) => (
                  <span key={t} style={{ fontSize:9.5, fontFamily:MONO, letterSpacing:"0.08em",
                    color:D.textDim, background:D.surface, border:`0.5px solid ${D.border}`,
                    borderRadius:3, padding:"3px 9px", textTransform:"uppercase" }}>
                    {t}
                  </span>
                ))}
              </div>
              <h2 key={`t-${activeIdx}`} style={{ fontFamily:SERIF,
                fontSize:"clamp(22px,2.6vw,34px)", fontWeight:600, color:D.text,
                margin:"0 0 16px", lineHeight:1.2, letterSpacing:"-0.01em",
                animation:"slideUp 0.45s cubic-bezier(0.22,1,0.36,1)" }}>
                {project.title}
              </h2>
              <p key={`d-${activeIdx}`} style={{ fontSize:15, color:D.textMid, lineHeight:1.78,
                margin:"0 0 24px", fontFamily:SERIF,
                animation:"slideUp 0.55s cubic-bezier(0.22,1,0.36,1)" }}>
                {project.description}
              </p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
                {project.tools.map((t) => (
                  <span key={t} style={{ fontSize:9.5, fontFamily:MONO,
                    color:D.textDim, border:`0.5px solid ${D.border}`,
                    borderRadius:3, padding:"2px 8px" }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ fontSize:11, fontFamily:MONO, color:D.textDim,
                display:"flex", alignItems:"center", gap:6, paddingTop:16,
                borderTop:`0.5px dashed ${D.border}` }}>
                <span style={{ opacity:0.5 }}>↳</span>{project.annotation}
              </div>
              <div style={{ display:"flex", gap:12, marginTop:24 }}>
                {[["GitHub","#"],["Paper","#"]].map(([l,h]) => (
                  <a key={l} href={h} style={{ fontFamily:MONO, fontSize:10.5, color:D.textMid,
                    border:`0.5px solid ${D.border}`, borderRadius:4, padding:"7px 18px",
                    textDecoration:"none", letterSpacing:"0.06em", background:D.surface,
                    transition:"all 0.2s" }}>
                    {l} ↗
                  </a>
                ))}
              </div>

              <div style={{ marginTop:40, display:"flex", flexDirection:"column", gap:11 }}>
                {PROJECTS.map((p, i) => (
                  <div key={p.id} style={{ display:"flex", alignItems:"center", gap:12,
                    opacity: i===activeIdx ? 1 : 0.22,
                    transform: i===activeIdx ? "translateX(8px)" : "translateX(0)",
                    transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)" }}>
                    <div style={{ height:1, background:D.accent1, flexShrink:0,
                      width: i===activeIdx ? 28 : 10,
                      boxShadow: i===activeIdx ? `0 0 6px ${D.accent1}80` : "none",
                      transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)" }} />
                    <span style={{ fontFamily:SERIF, fontSize:13.5, color:D.text, lineHeight:1.3 }}>
                      {p.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — graph */}
          <div style={{ padding:"96px 40px 60px 20px", display:"flex", alignItems:"center" }}>
            <div style={{ position:"relative", width:"100%", height:"76%", minHeight:400,
              background:D.bg2, border:`0.5px solid ${D.border}`, borderRadius:16, overflow:"hidden" }}>
              <DotGrid opacity={0.14} />
              <div style={{ position:"absolute", inset:0 }}>
                <GraphCanvas activeNodes={project.nodes} fullColor={false} dark={true} />
              </div>
              <div style={{ position:"absolute", bottom:16, left:18, fontFamily:MONO,
                fontSize:9, color:D.textDim, letterSpacing:"0.08em" }}>
                concept field · {project.nodes.length} active
              </div>
              {/* active node count glow */}
              <div style={{ position:"absolute", top:16, right:16,
                display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:D.accent1,
                  boxShadow:`0 0 8px ${D.accent1}`, animation:"pulse 2s ease-in-out infinite" }} />
                <span style={{ fontFamily:MONO, fontSize:9, color:D.textDim }}>
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
  const categories = [
    { label:"Quantum", color:D.accent1 },
    { label:"Photonics", color:D.accent3 },
    { label:"Computation", color:D.accent2 },
    { label:"Mechanics", color:D.accent4 },
  ];

  return (
    <section id="field" style={{ padding:"100px 0 90px", background:D.bg }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36 }}>
          <div>
            <SectionLabel n="02" label="Concept field" />
            <SectionHeading>Conceptual Topology</SectionHeading>
            <p style={{ fontSize:13.5, color:D.textDim, fontFamily:MONO, margin:"8px 0 0" }}>
              All nodes · scroll projects above to illuminate regions
            </p>
          </div>
          <div style={{ display:"flex", gap:18, alignItems:"center", paddingBottom:4 }}>
            {categories.map((c) => (
              <div key={c.label} style={{ display:"flex", alignItems:"center", gap:7 }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:c.color,
                  boxShadow:`0 0 6px ${c.color}80` }} />
                <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim, letterSpacing:"0.06em" }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"relative", height:520, background:D.bg2,
          border:`0.5px solid ${D.border}`, borderRadius:14, overflow:"hidden" }}>
          <DotGrid opacity={0.12} />

          {/* region blobs — darker in dark mode */}
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:0.04 }}>
            <ellipse cx="22%" cy="30%" rx="18%" ry="22%" fill={D.accent1} />
            <ellipse cx="78%" cy="52%" rx="20%" ry="25%" fill={D.accent3} />
            <ellipse cx="42%" cy="52%" rx="14%" ry="18%" fill={D.accent2} />
            <ellipse cx="14%" cy="62%" rx="12%" ry="16%" fill={D.accent4} />
          </svg>

          <div style={{ position:"absolute", inset:0 }}>
            <GraphCanvas activeNodes={[]} fullColor={true} dark={true} />
          </div>

          <div style={{ position:"absolute", bottom:16, right:20, fontFamily:MONO,
            fontSize:9, color:D.textDim, letterSpacing:"0.08em" }}>
            {GRAPH_NODES.length} nodes · {GRAPH_EDGES.length} edges · live
          </div>

          <div style={{ position:"absolute", top:16, right:20, fontFamily:MONO,
            fontSize:9, color:D.textDim, letterSpacing:"0.08em",
            display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ display:"inline-block", width:5, height:5, borderRadius:"50%",
              background:D.accent2, boxShadow:`0 0 6px ${D.accent2}`,
              animation:"pulse 2.5s ease-in-out infinite" }} />
            drifting
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EXPERIENCE SECTION (NEW)
═══════════════════════════════════════════════ */
function ExperienceSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="experience" style={{ padding:"90px 0", background:D.bg3 }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ marginBottom:52 }}>
          <SectionLabel n="03" label="Experience" />
          <SectionHeading>Where I've Worked</SectionHeading>
        </div>

        <div style={{ display:"flex", flexDirection:"column", position:"relative" }}>
          {/* vertical timeline line */}
          <div style={{ position:"absolute", left:0, top:8, bottom:8, width:1,
            background:`linear-gradient(to bottom, ${D.accent1}60, ${D.accent2}60, transparent)` }} />

          {EXPERIENCE.map((exp, i) => {
            const isOpen = expanded === i;
            return (
              <div key={i} style={{ paddingLeft:32, paddingBottom:0, position:"relative" }}>
                {/* timeline dot */}
                <div style={{ position:"absolute", left:-5, top:24, width:11, height:11,
                  borderRadius:"50%", background:D.bg3, border:`1.5px solid ${exp.color}`,
                  boxShadow:`0 0 10px ${exp.color}60`, zIndex:1 }} />

                <div
                  onClick={() => setExpanded(isOpen ? null : i)}
                  style={{ cursor:"pointer", padding:"20px 24px", marginBottom:12,
                    background: isOpen ? D.surfaceHi : D.surface,
                    border:`0.5px solid ${isOpen ? exp.color+"50" : D.border}`,
                    borderRadius:10, transition:"all 0.35s cubic-bezier(0.22,1,0.36,1)" }}>

                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:exp.color,
                          boxShadow:`0 0 6px ${exp.color}` }} />
                        <span style={{ fontFamily:MONO, fontSize:10, color:exp.color,
                          letterSpacing:"0.1em", textTransform:"uppercase" }}>
                          {exp.role}
                        </span>
                      </div>
                      <div style={{ fontSize:17, fontWeight:500, color:D.text, fontFamily:SERIF,
                        marginBottom:3 }}>
                        {exp.org}
                      </div>
                      {exp.advisor && (
                        <div style={{ fontFamily:MONO, fontSize:10, color:D.textDim }}>
                          {exp.advisor}
                        </div>
                      )}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
                      <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim }}>
                        {exp.period}
                      </span>
                      <span style={{ color:D.textDim, fontSize:12,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition:"transform 0.3s" }}>▾</span>
                    </div>
                  </div>

                  {/* expandable points */}
                  <div style={{ maxHeight: isOpen ? 200 : 0, overflow:"hidden",
                    transition:"max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
                    opacity: isOpen ? 1 : 0 }}>
                    <div style={{ paddingTop:16, borderTop:`0.5px solid ${D.border}`, marginTop:14 }}>
                      {exp.points.map((pt, j) => (
                        <div key={j} style={{ display:"flex", gap:12, alignItems:"flex-start",
                          marginBottom:9 }}>
                          <span style={{ color:exp.color, fontSize:10, marginTop:2, flexShrink:0 }}>◦</span>
                          <span style={{ fontSize:13.5, color:D.textMid, lineHeight:1.6, fontFamily:SERIF }}>
                            {pt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
   EXPLORING SECTION (DARK)
═══════════════════════════════════════════════ */
function ExploringSection() {
  return (
    <section id="exploring" style={{ padding:"80px 0", background:D.bg }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ marginBottom:44 }}>
          <SectionLabel n="04" label="Currently exploring" />
          <SectionHeading>Active Threads</SectionHeading>
          <p style={{ fontSize:13.5, color:D.textDim, fontFamily:MONO, margin:"8px 0 0" }}>
            Less polished. More notebook. Still curated.
          </p>
        </div>

        <div style={{ display:"flex", flexDirection:"column" }}>
          {EXPLORING.map((item, i) => {
            const sc = STATUS_COLORS_DARK[item.status] || STATUS_COLORS_DARK.reading;
            return (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"28px 1fr auto",
                gap:24, alignItems:"center", padding:"20px 0",
                borderBottom:`0.5px solid ${D.border}` }}>
                <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <div>
                  <div style={{ fontSize:17, fontWeight:500, color:D.text,
                    fontFamily:SERIF, marginBottom:4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize:11.5, color:D.textDim, fontFamily:MONO }}>
                    {item.detail}
                  </div>
                </div>
                <span style={{ fontFamily:MONO, fontSize:9.5, letterSpacing:"0.08em",
                  background:sc.bg, border:`0.5px solid ${sc.border}`,
                  color:sc.text, borderRadius:3, padding:"3px 10px",
                  textTransform:"uppercase", whiteSpace:"nowrap" }}>
                  {item.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FRAGMENTS SECTION (replaces observations, dark)
═══════════════════════════════════════════════ */
function FragmentsSection() {
  const kindColors = {
    note:    { bg:"rgba(100,140,200,0.08)", border:"rgba(100,140,200,0.2)", accent:"#6898d0" },
    ref:     { bg:"rgba(108,92,231,0.08)",  border:"rgba(108,92,231,0.2)",  accent:"#8878c0" },
    measure: { bg:"rgba(32,192,168,0.08)",  border:"rgba(32,192,168,0.2)",  accent:"#20c0a8" },
    sketch:  { bg:"rgba(212,136,10,0.08)",  border:"rgba(212,136,10,0.2)",  accent:"#d4880a" },
  };

  return (
    <section id="fragments" style={{ padding:"80px 0", background:D.bg3 }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ marginBottom:44 }}>
          <SectionLabel n="05" label="Fragments" />
          <SectionHeading>Field Notes</SectionHeading>
          <p style={{ fontSize:13.5, color:D.textDim, fontFamily:MONO, margin:"8px 0 0" }}>
            scraps, references, measurements. the margins of actual work.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {FRAGMENTS.map((f, i) => {
            const kc = kindColors[f.kind] || kindColors.note;
            return (
              <div key={i} style={{ background:kc.bg, border:`0.5px solid ${kc.border}`,
                borderRadius:8, padding:"16px 20px",
                display:"grid", gridTemplateColumns:"auto 1fr auto", gap:14, alignItems:"center" }}>
                <div style={{ width:2.5, height:34, borderRadius:2, background:kc.accent,
                  opacity:0.8, flexShrink:0 }} />
                <div>
                  <div style={{ fontFamily:MONO, fontSize:9, color:kc.accent, letterSpacing:"0.1em",
                    textTransform:"uppercase", marginBottom:5, opacity:0.9 }}>
                    {f.kind}
                  </div>
                  <div style={{ fontSize:12.5, color:D.textMid, lineHeight:1.5, fontFamily:SERIF }}>
                    {f.content}
                  </div>
                </div>
                <span style={{ fontFamily:MONO, fontSize:9, color:D.textDim,
                  whiteSpace:"nowrap", opacity:0.7 }}>
                  {f.coord}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT SECTION (DARK)
═══════════════════════════════════════════════ */
function AboutSection() {
  return (
    <section id="about" style={{ padding:"80px 0 120px", background:D.bg }}>
      <div style={{ maxWidth:1080, margin:"0 auto", padding:"0 48px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"5fr 4fr", gap:80, alignItems:"start" }}>
          <div>
            <SectionLabel n="06" label="About" />
            <h2 style={{ fontSize:38, fontWeight:600, color:D.text, margin:"0 0 8px",
              letterSpacing:"-0.02em", fontFamily:SERIF }}>
              Harshavardhan Hajeri
            </h2>
            <p style={{ fontFamily:MONO, fontSize:11, color:D.textDim, margin:"0 0 32px",
              letterSpacing:"0.08em" }}>
              M.Sc. Physics · B.E. Mechanical Engineering · BITS Pilani
            </p>
            <p style={{ fontSize:16, color:D.textMid, lineHeight:1.85, margin:"0 0 20px", fontFamily:SERIF }}>
              I build at the intersection of quantum optics, photonic computing, and quantum algorithms.
              Currently researching at IIT Madras under Prof. Anil Prabhakar — spatial light modulators,
              nonlinear cavities, and analog optical computation.
            </p>
            <p style={{ fontSize:16, color:D.textMid, lineHeight:1.85, margin:"0 0 20px", fontFamily:SERIF }}>
              Co-founder of Qugain Quantum Technologies, where we released{" "}
              <span style={{ fontFamily:MONO, fontSize:14, color:D.accent1 }}>qtsit</span> — discrete-time
              quantum walk implementations applied to reinforcement learning problems.
            </p>
            <p style={{ fontSize:15, color:"#70706a", lineHeight:1.8, margin:"0 0 36px", fontFamily:SERIF }}>
              I'm interested in systems where physics is not just the substrate but the computation.
              Interference patterns as optimization. Walks as search. Cavities as signal processors.
              The boundary is interesting.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[
                { label:"Email", href:"mailto:f20212402@goa.bits-pilani.ac.in", note:"f20212402@goa.bits-pilani.ac.in" },
                { label:"GitHub ↗", href:"https://github.com", note:"open source" },
                { label:"LinkedIn ↗", href:"#", note:"connect" },
              ].map(({ label, href, note }) => (
                <a key={label} href={href} style={{ fontFamily:MONO, fontSize:10.5, color:D.textMid,
                  border:`0.5px solid ${D.border}`, borderRadius:5, padding:"10px 16px",
                  textDecoration:"none", background:D.surface,
                  display:"flex", flexDirection:"column", gap:3 }}>
                  <span style={{ fontSize:10.5, letterSpacing:"0.07em" }}>{label}</span>
                  <span style={{ fontSize:9.5, color:D.textDim }}>{note}</span>
                </a>
              ))}
              <CVButton />
            </div>
          </div>

          <div>
            <div style={{ marginBottom:36 }}>
              <div style={{ fontFamily:MONO, fontSize:10, color:D.textDim,
                letterSpacing:"0.12em", marginBottom:16, textTransform:"uppercase" }}>
                Recognition
              </div>
              {[
                ["PIEDS Seed Fund",               "INR 5,00,000", D.accent2],
                ["Prof. Suresh Ramaswamy Award",  "INR 40,000",   D.accent1],
                ["IBM Qiskit Fall Fest Mentor",   "2024",         D.accent3],
              ].map(([k,v,c]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between",
                  alignItems:"center", padding:"11px 0", borderBottom:`0.5px solid ${D.border}` }}>
                  <span style={{ fontSize:14, color:D.textMid, fontFamily:SERIF }}>{k}</span>
                  <span style={{ fontFamily:MONO, fontSize:11, color:c,
                    background:`${c}15`, borderRadius:3, padding:"2px 8px" }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom:36 }}>
              <div style={{ fontFamily:MONO, fontSize:10, color:D.textDim,
                letterSpacing:"0.12em", marginBottom:16, textTransform:"uppercase" }}>
                Publications
              </div>
              {[
                { authors:"G. Patil*, H. Hajeri*, et al.", title:"Modal Decomposition of Cavity SHG Fields using Spatial Light Modulator", venue:"EOP 2025" },
                { authors:"H. Hajeri*, N. Vinod P.M., et al.", title:"Spatial Photonic Ising Machine using Spatial Light Modulators", venue:"EOP 2025" },
              ].map((p, i) => (
                <div key={i} style={{ padding:"12px 0", borderBottom:`0.5px solid ${D.border}` }}>
                  <div style={{ fontFamily:SERIF, fontSize:13.5, color:D.textMid,
                    lineHeight:1.55, marginBottom:5 }}>
                    {p.title}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim }}>{p.authors}</span>
                    <span style={{ fontFamily:MONO, fontSize:10, color:D.accent1 }}>{p.venue}</span>
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
export default function Portfolio() {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background:D.bg, minHeight:"100vh", fontFamily:SERIF, color:D.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"0 48px", height:52,
        background: navVisible ? "rgba(14,15,18,0.95)" : "transparent",
        backdropFilter: navVisible ? "blur(16px)" : "none",
        borderBottom: navVisible ? `0.5px solid ${D.border}` : "none",
        transition:"all 0.4s ease" }}>
        <span style={{ fontFamily:MONO, fontSize:12, color:D.textDim, letterSpacing:"0.12em" }}>
          HH — 2025
        </span>
        <div style={{ display:"flex", gap:30 }}>
          {[["work","#work"],["field","#field"],["experience","#experience"],
            ["exploring","#exploring"],["about","#about"]].map(([s,h]) => (
            <a key={s} href={h} style={{ fontFamily:MONO, fontSize:10.5, color:D.textDim,
              textDecoration:"none", letterSpacing:"0.08em",
              transition:"color 0.2s" }}
              onMouseEnter={e => e.target.style.color=D.text}
              onMouseLeave={e => e.target.style.color=D.textDim}>
              {s}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative", minHeight:"100vh", display:"flex",
        flexDirection:"column", justifyContent:"center", alignItems:"center",
        overflow:"hidden", paddingTop:52 }}>
        <DotGrid opacity={0.14} />
        <HeroTraces />

        {/* ambient glow orbs */}
        <div style={{ position:"absolute", top:"20%", left:"15%", width:400, height:400,
          borderRadius:"50%", background:D.accent1, opacity:0.03, filter:"blur(80px)",
          pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"25%", right:"18%", width:320, height:320,
          borderRadius:"50%", background:D.accent2, opacity:0.04, filter:"blur(60px)",
          pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:900, padding:"0 40px",
          display:"flex", flexDirection:"column", alignItems:"center", gap:48 }}>
          {/* photo + identity */}
          <div style={{ display:"flex", alignItems:"center", gap:48 }}>
            <HeroPicture />
            <div>
              <div style={{ fontFamily:MONO, fontSize:10, color:D.textDim,
                letterSpacing:"0.18em", marginBottom:20, textTransform:"uppercase" }}>
                M.Sc. Physics · B.E. Mech. Eng · BITS Pilani
              </div>
              <h1 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:600, lineHeight:1.2,
                color:D.text, margin:"0 0 22px", letterSpacing:"-0.02em" }}>
                Building at the edge of{" "}
                <em style={{ fontStyle:"italic", color:D.accent1 }}>physical</em>{" "}
                and{" "}
                <em style={{ fontStyle:"italic", color:D.accent3 }}>computational</em>{" "}
                systems.
              </h1>
              <p style={{ fontSize:16, color:D.textMid, lineHeight:1.75, margin:"0 0 32px" }}>
                Quantum optics, photonic computing, quantum algorithms —
                experiments that become instruments.
              </p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {[
                  { label:"GitHub ↗", href:"https://github.com" },
                  { label:"Papers",   href:"#about" },
                  { label:"Contact",  href:"mailto:f20212402@goa.bits-pilani.ac.in" },
                ].map((l) => (
                  <a key={l.label} href={l.href}
                    style={{ fontFamily:MONO, fontSize:10.5, color:D.textMid,
                      border:`0.5px solid ${D.border}`, borderRadius:4, padding:"8px 18px",
                      textDecoration:"none", background:D.surface, letterSpacing:"0.05em",
                      transition:"all 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=D.borderHi; e.currentTarget.style.color=D.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=D.border; e.currentTarget.style.color=D.textMid; }}>
                    {l.label}
                  </a>
                ))}
                <CVButton />
              </div>
            </div>
          </div>

          {/* terminal */}
          <div style={{ width:"100%", display:"flex", justifyContent:"flex-end" }}>
            <MiniTerminal />
          </div>
        </div>

        <div style={{ position:"absolute", bottom:34, left:"50%", transform:"translateX(-50%)",
          fontFamily:MONO, fontSize:10, color:D.textDim, letterSpacing:"0.1em",
          animation:"fadeOsc 3s ease-in-out infinite" }}>
          ↓ scroll
        </div>
        <style>{`@keyframes fadeOsc{0%,100%{opacity:0.25}50%{opacity:0.75}}`}</style>
      </section>

      {/* PROJECTS */}
      <div id="work">
        <ProjectsSection />
      </div>

      {/* CONCEPT FIELD */}
      <ConceptField />

      {/* ABOUT */}
      <AboutSection />

      {/* EXPERIENCE */}
      <ExperienceSection />

      {/* EXPLORING */}
      <ExploringSection />

      {/* FRAGMENTS */}
      <FragmentsSection />

      {/* FOOTER */}
      <footer style={{ borderTop:`0.5px solid ${D.border}`, padding:"22px 48px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        background:D.bg2 }}>
        <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim }}>
          Harshavardhan Hajeri · BITS Pilani · 2025
        </span>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          {[D.accent1, D.accent3, D.accent2, D.accent4].map((c, i) => (
            <div key={i} style={{ width:5, height:5, borderRadius:"50%", background:c,
              boxShadow:`0 0 4px ${c}80`, opacity:0.7 }} />
          ))}
          <span style={{ fontFamily:MONO, fontSize:10, color:D.textDim, marginLeft:8 }}>
            f20212402@goa.bits-pilani.ac.in
          </span>
        </div>
      </footer>
    </div>
  );
}
