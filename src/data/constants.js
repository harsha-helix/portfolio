export const PROJECTS = [
  {
    id: 6,
    title: "Cavity Alignment & PDH Locking",
    description: "Aligned and locked two optical cavities: a triangular mode cleaner at 1064 nm with 99% mode matching, and a bow-tie SHG cavity with a PPLN crystal converting 1064 → 532 nm. Pound-Drever-Hall error signals feed a Red Pitaya lock-in/PID loop, which drives the cavity PZT through a custom inverting HV amplifier (0–40 V, ~700 Hz bandwidth, up to 200 mA into the capacitive piezo) for stable lock acquisition.",
    tags: ["Optical Cavities", "Feedback Control", "SHG"],
    tools: ["Red Pitaya", "PDH", "PID", "HV Amplifier", "PPLN"],
    annotation: "IIT Madras · Prof. Anil Prabhakar",
    nodes: ["Cavity", "PDH Lock", "Mode Cleaner", "SHG", "Photonics"],
    figures: [
      { src: "cavity/01-squeezer-setup.webp", caption: "Squeezer layout: a 1064 nm laser feeds the bow-tie SHG cavity (PPLN), whose 532 nm output pumps the squeezer cavity; a triangular mode cleaner filters the local oscillator for balanced homodyne detection." },
      { src: "cavity/02-cavity-scan.webp", caption: "Cavity scan: PZT ramp (dark blue) with the transmitted (cyan) and reflected (magenta) signals at each resonance." },
      { src: "cavity/03-pdh-error-signal.webp", caption: "PDH error signal (red) from the Red Pitaya while the cavity is ramped (blue); 15.575 MHz RF modulation, 900 kHz low-pass." },
      { src: "cavity/04-lock-acquisition.webp", caption: "Lock acquisition: when the Red Pitaya lock-in + PID engages, the PZT drive (yellow) stops ramping and the transmitted signal (cyan) holds steady." },
      { src: "cavity/05-locked-modes.webp", caption: "Locked cavity output at 532 nm on the fundamental TEM₀₀ mode (left) and the higher-order HG₀₂ mode (right).", alt: "Two photos of green laser spots: a single Gaussian spot, and a three-lobed HG02 mode" },
      { src: "cavity/06-output-spectrum.webp", caption: "Output spectrum (Thorlabs CCS175): the 532 nm second harmonic dominates, with a small residual 1064 nm pump peak." },
    ],
  },
  {
    id: 2,
    title: "Holographic Modal Decomposition",
    description: "SLM-based framework for decomposing cavity SHG fields. Digital knife-edge alignment and crosstalk matrix calibration improved average modal self-overlap from 0.86 → 0.96 (fundamental mode: 0.996).",
    tags: ["Nonlinear Optics", "Holography", "SHG"],
    tools: ["SLM", "Python", "LabVIEW", "Fourier Optics"],
    annotation: "IIT Madras · presented at EOP 2025",
    nodes: ["Modal Decomp.", "SLM", "Cavity", "Photonics", "Fourier Optics"],
    figures: [
      { src: "modal-decomp/01-setup-schematic.webp", caption: "Optical layout: a 1064 nm laser is PDH-locked to the bow-tie cavity, generating 532 nm SHG. The beam is projected onto SLM holograms and a camera measures the modal power." },
      { src: "modal-decomp/02-setup-photo-labelled.webp", caption: "The setup on the optical table: 1064 nm laser, isolator and phase modulator, mode-matching lenses into the bow-tie cavity (BTC), and the 532 nm output routed onto the SLM and camera." },
      { src: "modal-decomp/03-two-half-slm.webp", caption: "Crosstalk measurement: one half of the SLM generates a mode and the other half decomposes it, so both holograms sit in the same beam path on a single device." },
      { src: "modal-decomp/04-digital-knife-edge.webp", caption: "Digital knife-edge: scanning a partial phase grating across the SLM and fitting the transmitted intensity gives the beam's size and centre in situ, with no razor blade on the table." },
      { src: "modal-decomp/05-camera-modes.webp", caption: "Camera view. Top: the bright zeroth order beside an SLM-generated HG mode in the first order. Bottom: during decomposition the modal power collects in the on-axis spot at the centre of the first order.", alt: "Two camera frames showing diffraction orders and a structured mode pattern" },
      { src: "modal-decomp/06-crosstalk-measured.webp", caption: "Measured crosstalk matrix across the HG basis: off-diagonal terms show how much each mode leaks into its neighbours." },
      { src: "modal-decomp/07-crosstalk-optimized.webp", caption: "Crosstalk after brute-force optimization of the mask scale and rotation (scale 0.806, θ = 6°): the mean self-overlap rises from 0.86 to 0.96, and the worst mode, HG₁,₁, from 0.818 to 0.905." },
      { src: "modal-decomp/08-shg-decomposition.webp", caption: "Modal decomposition of the 532 nm cavity output, raw (orange) against crosstalk-corrected (blue), confirming high modal purity." },
      { src: "modal-decomp/09-modal-overlap-table.webp", caption: "Self-overlap of all 16 HG modes after calibration: every mode stays above 0.90 and the fundamental HG₀,₀ reaches 0.996." },
    ],
    links: [
      { label: "Poster", url: "https://drive.google.com/file/d/1EGqSlBdWkEB1R82V8vhrMK9nfC9guyub/view?usp=drive_link" }
    ],
  },
  {
    id: 1,
    title: "Spatial Photonic Ising Machine",
    description: "Solving NP-hard optimization problems via analog optical interference. A phase-only SLM encodes spin configurations; Fourier optics computes the cost function; a Metropolis feedback loop drives convergence. On a 100-vertex MaxCut it reached a cut of 1247, within 3.25% of the digital optimum. A concurrent mask-generation, display and photodiode pipeline now evaluates the energy optically at ~30 Hz, cutting that run from ~45 minutes to ~150 seconds and reaching 800-spin GSet benchmarks.",
    tags: ["Quantum Optics", "Optimization", "Photonics"],
    tools: ["Python", "SLM", "Fourier Optics", "MATLAB"],
    annotation: "IIT Madras · presented at EOP 2025",
    nodes: ["Ising", "Optimization", "SLM", "Interference", "Fourier Optics"],
    figures: [
      { src: "ising/01-setup-schematic.webp", caption: "Fourier-optical SPIM layout: a He–Ne beam (632.8 nm) is expanded onto a phase-only SLM (Holoeye Pluto 2.1), and a lens brings the Fourier plane onto the detector, where the intensity gives the Ising energy." },
      { src: "ising/02-setup-photo.webp", caption: "The compact setup on the optical table: laser, beam expander, SLM and camera." },
      { src: "ising/03-phase-mask.webp", caption: "Phase mask on the SLM. Each spin is a block of pixels; the zoom shows one spin's sub-cell checkerboard, which sets the interaction strength by complex gauge encoding." },
      { src: "ising/04-beam-compensation.webp", caption: "Gaussian beam compensation. Top left: the measured intensity profile across the SLM (σ = 3.05 mm, FWHM = 7.2 mm). Top right: the resulting macropixel phase mask. Bottom: Mattis coefficients α taken straight from J (left) and after beam compensation (right), which evens out each spin's contribution." },
      { src: "ising/05-annealing-convergence.webp", caption: "Photonic simulated annealing on a 100-vertex MaxCut: the optically measured energy converges to within 3.25% of the digital optimum, giving a cut of 1247 against 1289 from digital annealing." },
      { src: "ising/06-measurement-pipeline.webp", caption: "Concurrent measurement pipeline: one thread generates and uploads phase masks, the main thread displays them and accumulates energy, and a third streams the photodiode, holding a steady optical update rate near 30 Hz." },
      { src: "ising/07-hologram-demo.webp", caption: "Holographic control on the same SLM: the CQuICC logo written into the beam with a computer-generated phase mask and imaged on the camera." },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/harsha-helix/compact-slim/tree/main" },
      { label: "Poster & paper", url: "https://drive.google.com/drive/folders/1p-wgh2RzevIynVfUnVjojs5Hc6CZ552K?usp=sharing" }
    ],
  },
  {
    id: 3,
    title: "Discrete-Time Quantum Walk",
    description: "Implemented coined and split-step discrete-time quantum walk circuits in Qiskit for state preparation and RL-based optimization, and showed an advantage over classical random-walk baselines on the N-Armed Bandit problem.",
    tags: ["Quantum Computing", "RL", "Optimization"],
    tools: ["Qiskit", "Python", "PyPI"],
    annotation: "Qugain Quantum Technologies · released in qtsit (PyPI)",
    nodes: ["DTQW", "Quantum Walk", "RL", "Optimization", "Entanglement"],
    figures: [
      { src: "dtqw/01-bandit-ground-truth.webp", caption: "The benchmark bandit: 32 machines on a ring, one optimal arm paying out with p = 0.9 next to a trap at p = 0.1, and the rest between 0.5 and 0.7." },
      { src: "dtqw/02-spreading.webp", caption: "Why a quantum walker explores faster: a classical random walk diffuses as σ ∝ √t, while the quantum walk spreads linearly at σ ≈ t/√2, roughly 7× wider by t = 100." },
      { src: "dtqw/03-localization-dial.webp", caption: "Exploration turning into exploitation: the coin angle θ(x) is sharpened as a machine's empirical payoff rises, and as θ approaches zero the site becomes a defect that traps the walker's amplitude." },
      { src: "dtqw/04-increment-decrement.webp", caption: "The shift operator as circuits: ripple-carry increment (position + 1 mod 32) and its X-conjugated decrement counterpart, implemented with CNOT, Toffoli and MCX gates." },
      { src: "dtqw/05-walk-step-circuit.webp", caption: "One complete walk step on the 7-qubit register: a coin rotation U(θ) on the two coin qubits, then Inc and Dec on the five position qubits, flanked by X gates that switch the control condition. Repeated T times before a single-shot measurement." },
      { src: "dtqw/06-cumulative-reward.webp", caption: "Cumulative reward over J = 5,000 decisions as a function of the walk length T: it climbs steeply up to about T = 12 and then saturates, so a short quantum walk is enough to beat the classical baseline." },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/harsha-helix/qtsit/blob/main/qtsit/algorithms/MAB_QW.py" }
    ],
  },
  {
    id: 4,
    title: "Entanglement in Cluster States",
    description: "Theory counterpart to the squeezed-light experiments: simulated 2D continuous-variable cluster states built from squeezed modes, and computed entanglement measures on photon-subtracted squeezed vacuum states.",
    tags: ["CV Quantum Optics", "Squeezed Light", "Entanglement"],
    tools: ["Strawberry Fields", "Python"],
    annotation: "BITS Goa · Prof. Sanjib Dey",
    nodes: ["Cluster States", "Entanglement", "Photonics"],
  },
];

export const NODE_COLORS = {
  "Entanglement": { r: 108, g: 92, b: 231, label: "#8a80e8" },
  "Quantum Walk": { r: 130, g: 100, b: 240, label: "#9a88f0" },
  "DTQW": { r: 148, g: 120, b: 245, label: "#a898f0" },
  "Ising": { r: 160, g: 100, b: 240, label: "#b080f0" },
  "SLM": { r: 220, g: 140, b: 40, label: "#e0a830" },
  "Photonics": { r: 235, g: 155, b: 30, label: "#e8b828" },
  "Interference": { r: 210, g: 130, b: 60, label: "#d8a048" },
  "Cavity": { r: 200, g: 120, b: 50, label: "#c89040" },
  "SHG": { r: 225, g: 165, b: 45, label: "#e0c030" },
  "Modal Decomp.": { r: 215, g: 145, b: 55, label: "#d8a840" },
  "Fourier Optics": { r: 230, g: 170, b: 35, label: "#e8c828" },
  "PDH Lock": { r: 205, g: 135, b: 60, label: "#d49848" },
  "Mode Cleaner": { r: 195, g: 125, b: 45, label: "#c89038" },
  "Optimization": { r: 30, g: 185, b: 165, label: "#20c0a8" },
  "RL": { r: 40, g: 195, b: 175, label: "#28c8b0" },
  "Algorithms": { r: 25, g: 175, b: 155, label: "#18b8a0" },
  "Cluster States": { r: 115, g: 88, b: 225, label: "#9a7ae0" },
};

export const DEFAULT_COLOR = { r: 140, g: 130, b: 115, label: "#9a9080" };

export const NODE_DESCRIPTIONS = {
  "Entanglement": "A non-classical correlation between quantum subsystems where the joint state cannot be written as a product of individual states — the basis of most quantum information protocols.",
  "Quantum Walk": "A quantum analog of classical random walks where superposition allows simultaneous exploration of multiple paths, enabling quadratic speedups in certain search and sampling tasks.",
  "DTQW": "A quantum walk variant that evolves in discrete time steps via a coin operator followed by a conditional shift — produces interference patterns that classical Markov chains cannot replicate.",
  "Ising": "A spin-glass Hamiltonian where binary variables on a graph interact via pairwise couplings. Many NP-hard combinatorial problems — MaxCut, graph coloring — map directly onto finding its ground state.",
  "SLM": "A liquid-crystal spatial light modulator that applies programmable phase or amplitude masks to an optical wavefront, enabling arbitrary beam shaping with pixel-level control.",
  "Photonics": "Using photons rather than electrons as carriers of information. Photonic platforms offer room-temperature operation, low loss propagation, and natural compatibility with quantum optics.",
  "Interference": "The coherent superposition of wave amplitudes. In optical computing, carefully engineered interference patterns in the Fourier plane can evaluate objective functions in a single pass.",
  "Cavity": "An optical resonator formed by two or more mirrors that traps light in a standing-wave mode. The round-trip boundary conditions select discrete spatial and frequency eigenmodes.",
  "SHG": "Second-harmonic generation — a χ² nonlinear process where two photons at ω combine inside a phase-matched crystal to produce one photon at 2ω, converting infrared to visible light.",
  "Modal Decomp.": "Expressing an optical field as a weighted sum over a complete orthonormal basis (Hermite-Gaussian, LG modes). The expansion coefficients reveal how much power each spatial mode carries.",
  "Fourier Optics": "A converging lens performs a 2D spatial Fourier transform at its back focal plane. This lets us filter, correlate, and multiply signals optically at the speed of light.",
  "PDH Lock": "Pound-Drever-Hall locking: phase-modulate the laser, demodulate the cavity reflection, and you get an error signal that is antisymmetric about resonance. A servo feeds it back to hold the cavity on resonance.",
  "Mode Cleaner": "A short, high-finesse cavity (often triangular) that transmits only its fundamental TEM₀₀ mode. Higher-order spatial modes and some beam jitter are rejected, leaving a clean Gaussian beam downstream.",
  "Optimization": "Finding the global minimum (or maximum) of an objective function over a discrete or continuous search space, often under constraints — central to scheduling, finance, and ML.",
  "RL": "A framework where an agent learns a policy by interacting with an environment and maximising cumulative reward. The agent's value estimates improve via temporal-difference or policy-gradient updates.",
  "Algorithms": "Precisely specified computational procedures with well-defined inputs, outputs, and complexity bounds. Algorithmic analysis determines whether a problem is tractable or intractable.",
  "Cluster States": "Highly entangled graph states that serve as the resource for measurement-based quantum computation. In continuous-variable optics they are built by interfering squeezed modes of light on beam splitters.",
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
  { id: "Entanglement", x: 0.40, y: 0.44, mx: 0.50, my: 0.26 },
  { id: "Fourier Optics", x: 0.68, y: 0.60, mx: 0.50, my: 0.56 },
  { id: "PDH Lock", x: 0.80, y: 0.93, mx: 0.72, my: 0.92 },
  { id: "Mode Cleaner", x: 0.60, y: 0.90, mx: 0.20, my: 0.92 },
  { id: "Cluster States", x: 0.28, y: 0.18, mx: 0.80, my: 0.36 },
];

export const GRAPH_EDGES = [
  ["Optimization", "Ising"], ["Optimization", "DTQW"], ["Optimization", "RL"], ["Optimization", "Entanglement"],
  ["Quantum Walk", "DTQW"], ["Quantum Walk", "RL"], ["Quantum Walk", "Entanglement"], ["DTQW", "RL"],
  ["DTQW", "Entanglement"], ["SLM", "Ising"], ["SLM", "Interference"], ["SLM", "Modal Decomp."],
  ["SLM", "Fourier Optics"], ["Interference", "Ising"], ["Interference", "Fourier Optics"], ["Photonics", "SLM"],
  ["Photonics", "Modal Decomp."], ["Photonics", "Cavity"], ["Photonics", "Interference"], ["Modal Decomp.", "Cavity"],
  ["Modal Decomp.", "Fourier Optics"], ["Cavity", "SHG"], ["SHG", "SLM"], ["SHG", "Fourier Optics"],
  ["PDH Lock", "Cavity"], ["PDH Lock", "SHG"], ["PDH Lock", "Mode Cleaner"], ["Mode Cleaner", "Cavity"],
  ["Mode Cleaner", "Photonics"], ["Entanglement", "Quantum Walk"],
  ["Cluster States", "Entanglement"], ["Cluster States", "Photonics"],
];

export const EXPLORING = [
  { label: "Quantum sensing with squeezed light", detail: "Generating squeezed states of light in optical cavities, building on SHG and cavity locking, to push measurement sensitivity below the shot-noise limit" },
  { label: "Structured light & its applications", detail: "Shaping amplitude, phase, and spatial modes of light with SLMs, including optical control of cold atoms and trapped ions" },
  { label: "Photonic & analog optical computing", detail: "Optical processors and complex networks that use a physical medium to compute, from spatial photonic Ising machines to broader analog solvers" },
];

export const EXPERIENCE = [
  {
    // Grouped entry: roles are listed newest first and rendered stacked under one org
    org: "Indian Institute of Technology, Madras",
    period: "June 2025 — present",
    advisor: "Prof. Anil Prabhakar",
    roles: [
      {
        role: "Research Staff",
        period: "June 2026 — present",
        points: [
          "Building a cascaded-cavity optical parametric oscillator (OPO) setup to produce and characterize squeezed vacuum",
          "Locking the bow-tie SHG cavity (PPLN, 1064 → 532 nm) that pumps the OPO, using Pound-Drever-Hall feedback through a Red Pitaya lock-in/PID controller",
        ],
      },
      {
        role: "M.Sc. Thesis II",
        period: "Jan 2026 — June 2026",
        title: "Towards PDH Locking and Characterization of a Mode Cleaner Cavity",
        note: "Co-supervisor: Prof. Sanjib Dey, BITS Goa",
        onRequest: true,
        points: [
          "Aligned and characterized a triangular mode-cleaner cavity at 1064 nm, reaching 99% mode matching",
          "Built the PDH locking chain: Red Pitaya lock-in/PID controller and a custom inverting HV amplifier (0–40 V, ~700 Hz, up to 200 mA) for the capacitive cavity piezo",
        ],
      },
      {
        role: "M.Sc. Thesis I",
        period: "June 2025 — Dec 2025",
        title: "Modal Decomposition and Spatial Photonic Ising Machine using a Single Phase-Only SLM",
        note: "Co-supervisor: Prof. Sanjib Dey, BITS Goa",
        onRequest: true,
        points: [
          "Built a spatial photonic Ising machine on a phase-only SLM, with Metropolis simulated-annealing feedback and Gaussian beam compensation",
          "Developed holographic modal decomposition of bow-tie SHG cavity fields; digital knife-edge alignment and crosstalk calibration raised average modal self-overlap from 0.86 → 0.96",
          "Presented both results at EOP 2025",
        ],
      },
    ],
    color: "#7a5ce0",
  },
  {
    role: "Co-Founder & Lead Developer",
    org: "Qugain Quantum Technologies · PIEDS-funded student startup, BITS Goa",
    period: "Dec 2023 — June 2025",
    advisor: null,
    points: [
      "Co-founded an open-source quantum algorithms startup; secured INR 5,00,000 seed funding from PIEDS and the INR 40,000 Prof. Suresh Ramaswamy Award",
      "Led development of qtsit, released on PyPI: coined and split-step discrete-time quantum walk implementations applied to the N-Armed Bandit problem, outperforming classical random-walk baselines",
    ],
    color: "#20c0a8",
  },
  {
    role: "Research Intern",
    org: "CeNSE, Indian Institute of Science, Bengaluru",
    period: "June 2024 — Aug 2024",
    advisor: "Dr. Dhavala Suri",
    points: [
      "Designed a cryostat dipstick in Fusion 360 for low-temperature transport measurements",
      "Built a PyQt5/QCoDeS GUI to automate I-V characterization",
    ],
    color: "#d4880a",
  },
  {
    role: "M.Sc. (Hons.) Physics · B.E. Mechanical Engineering",
    org: "BITS Pilani, K K Birla Goa Campus · dual degree",
    period: "Oct 2021 — June 2026",
    advisor: null,
    points: [
      "Two semester-long M.Sc. theses carried out at IIT Madras under Prof. Anil Prabhakar, co-supervised by Prof. Sanjib Dey",
      "Teaching Assistant, Quantum Information & Computation (BITS-F386) under Dr. Radhika Vathsan: designed and graded assignments for 50 students and created Qiskit-based Jupyter tutorials",
      "Mentored 150+ students in Quantum Computing with Qiskit (Quark STP) and Theory of Relativity (CTE), with Manim-based materials on Grover's algorithm and special relativity",
      "Quantum Computing Lead, Google Developer Student Club (Aug 2023 – May 2025): led workshops and study groups for 100+ students, organized the IBM-sponsored Qiskit Fall Fest 2023, and received the 2024 Qiskit Fall Fest Mentor Badge",
      "Steering Member, QIndia · Core Member, Nirmaan NGO · Core Member, Mime Club (two productions a year)",
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

export const SKILLS = [
  { group: "Experimental", items: ["Optical cavity alignment & mode matching", "PDH locking & PID feedback", "SLM holography & beam shaping", "Fourier optics", "Second-harmonic generation", "Lab automation"] },
  { group: "Programming & Frameworks", items: ["Python", "Qiskit", "QuTiP", "PennyLane", "Strawberry Fields", "JavaScript (React)", "LaTeX"] },
  { group: "Tools & Platforms", items: ["Red Pitaya", "LabVIEW", "MATLAB", "Simulink", "COMSOL", "FINESSE 3", "Fusion 360", "IBM Quantum", "Git/GitHub", "Jupyter"] },
];

export const PRESENTATIONS = [
  { authors: ["G. Patil*", "H. Hajeri*", "S. P. Amrithraj", "A. Prabhakar"], title: "Modal Decomposition of Cavity SHG Fields using Spatial Light Modulator", venue: "EOP 2025" },
  { authors: ["H. Hajeri*", "N. Vinod P.M.", "G. Patil", "S. P. Amrithraj", "A. Prabhakar"], title: "Spatial Photonic Ising Machine using Spatial Light Modulators", venue: "EOP 2025" },
];

export const AWARDS = [
  { name: "PIEDS Seed Fund Grant", detail: "INR 5,00,000" },
  { name: "Prof. Suresh Ramaswamy Award", detail: "INR 40,000" },
  { name: "IBM Qiskit Fall Fest Mentor Badge", detail: "2024" },
];

export const LINKS = {
  email: "tau.harsha@gmail.com",
  linkedin: "https://www.linkedin.com/in/harsha-tau/",
  github: "https://github.com/harsha-helix",
};
