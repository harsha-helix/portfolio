import { useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { GRAPH_NODES, GRAPH_EDGES } from "../../data/constants";
import InteractiveBackgroundGraphs from "../backgrounds/InteractiveBackgroundGraphs";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import DotGrid from "../ui/DotGrid";
import GraphCanvas from "../graph/GraphCanvas";

export default function ConceptField() {
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