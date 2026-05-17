import { useRef, useState, useEffect, useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PROJECTS } from "../../data/constants";
import InteractiveBackgroundGraphs from "../backgrounds/InteractiveBackgroundGraphs";
import SectionLabel from "../ui/SectionLabel";
import DotGrid from "../ui/DotGrid";
import GraphCanvas from "../graph/GraphCanvas";

export default function ProjectsSection() {
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
            padding: isMobile ? "4px 24px 120px 24px" : "96px 40px 60px 20px",
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