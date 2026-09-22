import { useState, useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EXPERIENCE, LINKS } from "../../data/constants";
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
          <SectionLabel n="02" label="Experience" />
          <SectionHeading>Experience &amp; Education</SectionHeading>
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
                      {exp.roles ? exp.org : exp.role}
                    </span>
                  </div>

                  {!exp.roles && (
                    <div style={{ fontFamily: MONO, fontSize: 12, color: T.textDim, marginBottom: 20, letterSpacing: "0.02em" }}>
                      {exp.org}
                    </div>
                  )}

                  {exp.roles ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 18 }}>
                      {exp.roles.map((r) => (
                        <div key={r.role} style={{
                          paddingLeft: 16, borderLeft: `1px solid ${isHovered ? exp.color + "50" : T.border}`,
                          transition: "border-color 0.4s"
                        }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 16, fontFamily: SERIF, fontWeight: 600, color: T.text }}>{r.role}</span>
                            <span style={{ fontFamily: MONO, fontSize: 11, color: T.textDim }}>{r.period.replace("—", "–")}</span>
                          </div>
                          {r.title && (
                            <div style={{ fontFamily: SERIF, fontSize: 14.5, fontStyle: "italic", color: T.textMid, margin: "4px 0 0", lineHeight: 1.5 }}>
                              {r.title}
                            </div>
                          )}
                          {r.note && (
                            <div style={{ fontFamily: MONO, fontSize: 11, color: T.textDim, marginTop: 4 }}>{r.note}</div>
                          )}
                          <div style={{ marginTop: 10 }}>
                            <Points points={r.points} color={exp.color} isHovered={isHovered} T={T} />
                          </div>
                          {r.onRequest && (
                            <a href={`mailto:${LINKS.email}?subject=${encodeURIComponent(`Thesis request: ${r.title}`)}`} style={{
                              display: "inline-block", marginTop: 12, fontFamily: MONO, fontSize: 10.5, color: T.textMid,
                              border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "5px 12px",
                              textDecoration: "none", background: T.surface, letterSpacing: "0.04em"
                            }}>
                              Thesis available on request
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Points points={exp.points} color={exp.color} isHovered={isHovered} T={T} />
                  )}

                  {exp.advisor && (
                    <div style={{ marginTop: 24, display: "inline-block", background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", padding: "6px 12px", borderRadius: 6 }}>
                      <span style={{ fontSize: 11, color: T.textDim, fontFamily: MONO }}>
                        Advisor: <span style={{ color: T.text }}>{exp.advisor}</span>
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

function Points({ points, color, isHovered, T }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {points.map((pt, j) => (
        <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div style={{
            width: 4, height: 4, borderRadius: "50%", background: isHovered ? color : T.textDim,
            marginTop: 8, flexShrink: 0, opacity: isHovered ? 0.8 : 0.4,
            transition: "all 0.4s"
          }} />
          <span style={{ fontSize: 14.5, color: T.textMid, lineHeight: 1.6, fontFamily: SERIF }}>
            {pt}
          </span>
        </div>
      ))}
    </div>
  );
}
