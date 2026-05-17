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
  "Entanglement": "A non-classical correlation between quantum subsystems where the joint state cannot be written as a product of individual states — the basis of most quantum information protocols.",
  "Quantum Walk": "A quantum analog of classical random walks where superposition allows simultaneous exploration of multiple paths, enabling quadratic speedups in certain search and sampling tasks.",
  "DTQW": "A quantum walk variant that evolves in discrete time steps via a coin operator followed by a conditional shift — produces interference patterns that classical Markov chains cannot replicate.",
  "QuTiP": "An open-source Python framework for simulating quantum dynamics including Lindblad master equations, which model how quantum systems lose coherence due to environmental noise.",
  "Cluster States": "Highly entangled multi-qubit graph states used as the universal resource in measurement-based quantum computation — the computation proceeds by adaptive single-qubit measurements.",
  "Ising": "A spin-glass Hamiltonian where binary variables on a graph interact via pairwise couplings. Many NP-hard combinatorial problems — MaxCut, graph coloring — map directly onto finding its ground state.",
  "SLM": "A liquid-crystal spatial light modulator that applies programmable phase or amplitude masks to an optical wavefront, enabling arbitrary beam shaping with pixel-level control.",
  "Photonics": "Using photons rather than electrons as carriers of information. Photonic platforms offer room-temperature operation, low loss propagation, and natural compatibility with quantum optics.",
  "Interference": "The coherent superposition of wave amplitudes. In optical computing, carefully engineered interference patterns in the Fourier plane can evaluate objective functions in a single pass.",
  "Cavity": "An optical resonator formed by two or more mirrors that traps light in a standing-wave mode. The round-trip boundary conditions select discrete spatial and frequency eigenmodes.",
  "SHG": "Second-harmonic generation — a χ² nonlinear process where two photons at ω combine inside a phase-matched crystal to produce one photon at 2ω, converting infrared to visible light.",
  "Modal Decomp.": "Expressing an optical field as a weighted sum over a complete orthonormal basis (Hermite-Gaussian, LG modes). The expansion coefficients reveal how much power each spatial mode carries.",
  "Fourier Optics": "A converging lens performs a 2D spatial Fourier transform at its back focal plane. This lets us filter, correlate, and multiply signals optically at the speed of light.",
  "Optimization": "Finding the global minimum (or maximum) of an objective function over a discrete or continuous search space, often under constraints — central to scheduling, finance, and ML.",
  "RL": "A framework where an agent learns a policy by interacting with an environment and maximising cumulative reward. The agent's value estimates improve via temporal-difference or policy-gradient updates.",
  "Algorithms": "Precisely specified computational procedures with well-defined inputs, outputs, and complexity bounds. Algorithmic analysis determines whether a problem is tractable or intractable.",
  "MEMS": "Micro-electromechanical systems — devices that integrate micron-scale mechanical elements and electronics on a single chip, fabricated via photolithographic processes.",
  "Acoustics": "The physics of pressure-wave propagation in elastic media. In transducer design, acoustic modelling predicts how a mechanical structure couples to incident sound fields.",
  "FEM": "Finite element method — a numerical scheme that discretises a continuous domain into elements, converts PDEs into a sparse linear system, and solves for field distributions (stress, displacement, pressure).",
  "Mechanics": "The branch of physics governing the deformation and motion of solid bodies under applied forces, described by constitutive relations and Newton's laws at the continuum scale.",
};


export const GRAPH_NODES = [
  { id: "Optimization", x: 0.50, y: 0.30, mx: 0.50, my: 0.08 },
  { id: "Quantum Walk", x: 0.22, y: 0.52, mx: 0.25, my: 0.16 },
  { id: "DTQW", x: 0.13, y: 0.33, mx: 0.75, my: 0.16 },
  { id: "RL", x: 0.36, y: 0.68, mx: 0.25, my: 0.26 },
  { id: "Ising", x: 0.68, y: 0.18, mx: 0.75, my: 0.26 },
  { id: "SLM", x: 0.80, y: 0.42, mx: 0.50, my: 0.36 },
  { id: "Interference", x: 0.63, y: 0.52, mx: 0.20, my: 0.46 },
  { id: "Photonics", x: 0.55, y: 0.72, mx: 0.80, my: 0.46 },
  { id: "Modal Decomp.", x: 0.84, y: 0.68, mx: 0.80, my: 0.56 },
  { id: "Cavity", x: 0.74, y: 0.82, mx: 0.20, my: 0.56 },
  { id: "SHG", x: 0.88, y: 0.28, mx: 0.50, my: 0.64 },
  { id: "MEMS", x: 0.18, y: 0.78, mx: 0.20, my: 0.74 },
  { id: "Acoustics", x: 0.08, y: 0.64, mx: 0.50, my: 0.74 },
  { id: "FEM", x: 0.06, y: 0.44, mx: 0.80, my: 0.74 },
  { id: "Mechanics", x: 0.13, y: 0.18, mx: 0.50, my: 0.84 },
  { id: "QuTiP", x: 0.44, y: 0.12, mx: 0.20, my: 0.36 },
  { id: "Cluster States", x: 0.28, y: 0.18, mx: 0.80, my: 0.36 },
  { id: "Entanglement", x: 0.40, y: 0.44, mx: 0.50, my: 0.26 },
  { id: "Fourier Optics", x: 0.68, y: 0.60, mx: 0.50, my: 0.56 },
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
    org: "Indian Institute of Technology, Madras",
    period: "June 2025 — present",
    advisor: "Prof. Anil Prabhakar",
    points: [
      "Built a Spatial Photonic Ising Machine using a phase-only SLM and Fourier optics to solve NP-hard optimization problems via analog interference, with a Metropolis simulated annealing feedback loop and Gaussian beam compensation",
      "Developed an SLM-based holographic modal decomposition framework for a bow-tie SHG cavity; introduced a digital knife-edge alignment technique and crosstalk matrix calibration, improving average modal self-overlap from 0.86 → 0.96 (fundamental mode: 0.996)",
      "Presented two papers at EOP 2025",
    ],
    color: "#7a5ce0",
  },
  {
    role: "Co-Founder & Lead Developer",
    org: "Qugain Quantum Technologies",
    period: "Dec 2023 — present",
    advisor: null,
    points: [
      "Co-founded an open-source quantum algorithms startup; secured INR 5,00,000 seed funding (PIEDS) and the INR 40,000 Prof. Suresh Ramaswamy Award",
      "Designed and released qtsit on PyPI — two Discrete-Time Quantum Walk implementations applied to the N-Armed Bandit problem, achieving measurable advantage over classical random walks",
      "IBM Qiskit Fall Fest 2024 Mentor Badge recipient",
    ],
    color: "#20c0a8",
  },
  {
    role: "Research Intern",
    org: "CeNSE, Indian Institute of Science, Bengaluru",
    period: "June – August 2024",
    advisor: "Dr. Dhavala Suri",
    points: [
      "Designed a cryostat dipstick in Fusion 360 for low-temperature transport measurements",
      "Built a PyQt5/QCoDeS GUI for automated I-V characterization",
    ],
    color: "#d4880a",
  },
  {
    role: "Quantum Computing Lead",
    org: "Google Developer Student Club, BITS Goa",
    period: "Aug 2023 – May 2025",
    points: [
      "Led workshops and study groups reaching 100+ students",
      "Organized IBM-sponsored Qiskit Fall Fest 2023; received the 2024 Qiskit Fall Fest Mentor Badge",
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