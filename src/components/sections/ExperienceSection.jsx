import { useState, useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EXPERIENCE } from "../../data/constants";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";

export default function ExperienceSection() {
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