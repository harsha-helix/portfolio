import re
import os

file_path = os.path.join("src", "App.jsx")
with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Insert NODE_DESCRIPTIONS
desc_insert = """const NODE_DESCRIPTIONS = {
  "Entanglement": "A fundamental quantum phenomenon where particles become correlated such that the physical state of one cannot be described independently of the rest.",
  "Quantum Walk": "The quantum analog of a classical random walk. Uses coherent superposition of paths to provide quadratic or exponential superpolynomial algorithm speedups.",
  "DTQW": "Discrete-Time Quantum Walks progress in sequential steps using a quantum coin operator to dictate superposition across a lattice, leading to non-classical distributions.",
  "QuTiP": "The Quantum Toolbox in Python. A comprehensive open-source framework used widely by researchers for simulating the dynamics of open quantum systems under decoherence.",
  "Cluster States": "Highly entangled, multi-qubit resource states essential for measurement-based quantum computation. Computation proceeds by sequential, adaptive single-qubit measurements on this pristine lattice.",
  "Ising": "Mathematical models to simulate magnetic spin grids. Representing complex optimization problems as an Ising Hamiltonian allows mapping them onto physical annealing hardware.",
  "SLM": "Spatial Light Modulators are dynamic liquid-crystal interfaces capable of spatially varying the phase, amplitude, or polarization of incident light, acting as programmable optics.",
  "Photonics": "The physical science of light generation and manipulation. In advanced computing, photonics offers ultra-high bandwidth, minimal thermal dissipation, and massively parallel analog processing.",
  "Interference": "The phenomenon where multiple coherent waves superimpose. In mathematical optical computing, carefully calibrated interference patterns instantly evaluate and compute complex analog correlations.",
  "Cavity": "Resonant optical cavities confine light between reflective mirrors, forcing it to repeatedly traverse nonlinear mediums. Amplifies specific resonant frequencies and fosters tight light-matter interactions.",
  "SHG": "Second Harmonic Generation is a nonlinear optical process where two interacting incident photons are effectively merged to form a single photon with exactly double the original frequency.",
  "Modal Decomp.": "An analytical technique used to decompose complex transverse optical fields into a standardized basis of orthogonal modes, essential for precisely quantifying multimode spatial cross-talk.",
  "Fourier Optics": "A paradigm mapping optical lens transformations to spatial Fourier transforms. It enables ultra-fast, entirely analog signal processing, filtering, and mathematical convolution seamlessly.",
  "Optimization": "The computational pursuit of selecting the best element under specified constraints from a set of alternatives. Non-convex functions frequently represent NP-hard terrain complexities.",
  "RL": "Reinforcement Learning is a machine learning paradigm teaching algorithmic agents to make optimal sequential decisions by taking actions in an environment to maximize cumulative rewards.",
  "Algorithms": "Unambiguous sequences detailing how to solve rigorous computational problems. Advanced forms bridge deterministic classical logic boundaries with probabilistic, heuristic, or quantum-parallel techniques.",
  "MEMS": "Microelectromechanical Systems are miniaturized structures built at the micron scale. They mechanically couple structural dynamics directly into electronic circuits to form highly sensitive sensors.",
  "Acoustics": "The interdisciplinary physics defining generation, control, and propagation of mechanical waves across mediums. It is highly relevant to designing transducer membrane structural resonance.",
  "FEM": "The Finite Element Method is a robust numerical technique for predicting how structures physically react to forces by discretizing complex geometries into manageable computational meshes.",
  "Mechanics": "The foundational physical principles dealing with the macroscopic behavior of bodies subjected to forces, providing classical stress, strain, and elasticity characterization."
};
"""
text = text.replace('const DEFAULT_COLOR = { r: 140, g: 130, b: 115, label: "#9a9080" };', 'const DEFAULT_COLOR = { r: 140, g: 130, b: 115, label: "#9a9080" };\n\n' + desc_insert)

graph_canvas_repl = """function GraphCanvas({ activeNodes, fullColor = false, dark = true }) {
  const { isDark, T } = useContext(ThemeContext);
  const canvasRef = useRef();
  const parentRef = useRef();
  const activeRef = useRef(activeNodes);
  useEffect(() => { activeRef.current = activeNodes; }, [activeNodes]);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoverPos, setHoverPos] = useState({ x:0, y:0 });

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
        
        n.vx += dx * 0.001 * dt;
        n.vy += dy * 0.001 * dt;
        
        // Damping
        n.vx *= 0.92;
        n.vy *= 0.92;
        
        n.x += n.vx + Math.sin(n.phase) * 0.00003;
        n.y += n.vy + Math.cos(n.phase * 0.73) * 0.00003;
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
       if(dist < minDist) { minDist = dist; closest = n; }
    });
    if(closest) {
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
           if(dist < minDist) { minDist = dist; hovered = n; }
       });
       if(hovered) {
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
          position: "absolute", left: Math.min(hoverPos.x + 16, parentRef.current?.offsetWidth - 230 || hoverPos.x+16), top: Math.min(hoverPos.y + 16, parentRef.current?.offsetHeight - 100 || hoverPos.y+16),
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
"""

text = re.sub(r'function GraphCanvas\(\{.*?\}\) \{.*?(?=\n/\* ═══════════════════════════════════════════════\n   SHARED UI PRIMITIVES)', graph_canvas_repl, text, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)
print("Graph patched successfully!")
