export const PROJECTS = [
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

export const NODE_COLORS = {
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

export const DEFAULT_COLOR = { r: 140, g: 130, b: 115, label: "#9a9080" };

export const NODE_DESCRIPTIONS = {
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


export const GRAPH_NODES = [
  { id: "Optimization", x: 0.50, y: 0.30, mx: 0.50, my: 0.45 },
  { id: "Quantum Walk", x: 0.22, y: 0.52, mx: 0.25, my: 0.22 },
  { id: "DTQW", x: 0.13, y: 0.33, mx: 0.75, my: 0.22 },
  { id: "RL", x: 0.36, y: 0.68, mx: 0.25, my: 0.40 },
  { id: "Ising", x: 0.68, y: 0.18, mx: 0.50, my: 0.35 },
  { id: "SLM", x: 0.80, y: 0.42, mx: 0.50, my: 0.58 },
  { id: "Interference", x: 0.63, y: 0.52, mx: 0.25, my: 0.65 },
  { id: "Photonics", x: 0.55, y: 0.72, mx: 0.50, my: 0.72 },
  { id: "Modal Decomp.", x: 0.84, y: 0.68, mx: 0.75, my: 0.65 },
  { id: "Cavity", x: 0.74, y: 0.82, mx: 0.25, my: 0.58 },
  { id: "SHG", x: 0.88, y: 0.28, mx: 0.75, my: 0.58 },
  { id: "MEMS", x: 0.18, y: 0.78, mx: 0.50, my: 0.82 },
  { id: "Acoustics", x: 0.08, y: 0.64, mx: 0.25, my: 0.88 },
  { id: "FEM", x: 0.06, y: 0.44, mx: 0.75, my: 0.88 },
  { id: "Mechanics", x: 0.13, y: 0.18, mx: 0.50, my: 0.95 },
  { id: "QuTiP", x: 0.44, y: 0.12, mx: 0.30, my: 0.08 },
  { id: "Cluster States", x: 0.28, y: 0.18, mx: 0.70, my: 0.08 },
  { id: "Entanglement", x: 0.40, y: 0.44, mx: 0.50, my: 0.15 },
  { id: "Fourier Optics", x: 0.68, y: 0.60, mx: 0.50, my: 0.65 },
];

export const GRAPH_EDGES = [
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

export const EXPLORING = [
  { label: "open quantum systems", detail: "QuTiP — Lindblad master equations, decoherence landscapes", status: "active" },
  { label: "photonic computing", detail: "SLM-based analog solvers beyond Ising — continuous optimization", status: "active" },
  { label: "variational quantum algorithms", detail: "QAOA geometry on near-term hardware", status: "reading" },
  { label: "modal crosstalk in cavities", detail: "Extending holographic alignment to higher-order modes", status: "ongoing" },
  { label: "quantum walks on graphs", detail: "Spectral graph theory → walk dynamics correspondence", status: "reading" },
  { label: "topological photonics", detail: "Edge states and band topology in photonic lattices", status: "new" },
];

export const STATUS_COLORS_DARK = {
  active: { bg: "rgba(32,192,168,0.12)", border: "rgba(32,192,168,0.3)", text: "#40d8b8" },
  reading: { bg: "rgba(108,92,231,0.12)", border: "rgba(108,92,231,0.3)", text: "#a898f0" },
  ongoing: { bg: "rgba(224,168,48,0.12)", border: "rgba(224,168,48,0.3)", text: "#e0c050" },
  new: { bg: "rgba(200,80,200,0.12)", border: "rgba(200,80,200,0.3)", text: "#d880d8" },
};

export const EXPERIENCE = [
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

export const FRAGMENTS = [
  { kind: "note", content: "crosstalk matrix: off-diagonals ≠ 0 → modes bleed", coord: "λ=1064nm" },
  { kind: "ref", content: "Farhi et al. 2014 — QAOA on MaxCut", coord: "arXiv:1411.4028" },
  { kind: "measure", content: "modal self-overlap: 0.86 → 0.96 after calibration", coord: "Δ = +11.6%" },
  { kind: "sketch", content: "phase-space portrait of a driven nonlinear oscillator", coord: "x vs ẋ" },
  { kind: "note", content: "Boltzmann weight: e^{-ΔE/kT} — simulated annealing mimics cooling", coord: "stat. mech." },
  { kind: "ref", content: "Aharonov et al. 1993 — coined quantum walk on the line", coord: "PRL 70, 1975" },
];
