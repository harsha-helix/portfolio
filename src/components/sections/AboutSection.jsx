import { useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import SectionLabel from "../ui/SectionLabel";
import CVButton from "../ui/CVButton";
import InteractiveBackgroundGraphs from "../backgrounds/InteractiveBackgroundGraphs";

export default function AboutSection() {
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
              I've always been drawn to the idea of using the physical world to process information differently.
              Currently, I'm learning and researching at IIT Madras under Prof. Anil Prabhakar,
              where I get to work hands-on with spatial light modulators and nonlinear cavities to explore analog optical computation.
            </p>
            <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.85, margin: "0 0 20px", fontFamily: SERIF }}>
              Earlier on, I co-founded Qugain Quantum Technologies—an incredible experience that pushed me to learn rapidly.
              There, we built{" "}
              <span style={{ fontFamily: MONO, fontSize: 14, color: T.accent1 }}>qtsit</span> to explore how discrete-time
              quantum walks could be applied to reinforcement learning problems.
            </p>
            <p style={{ fontSize: 15, color: "#70706a", lineHeight: 1.8, margin: "0 0 36px", fontFamily: SERIF }}>
              What really excites me are systems where physics is intimately tied to the computation itself. 
              The idea that we can use interference patterns to solve problems, or optical cavities to process signals, 
              feels incredibly elegant to me. There's so much to learn at this boundary, and I'm eager to keep exploring it.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "Email", href: "mailto:tau.harsha@gmail.com", note: "contact" },
                { label: "GitHub ↗", href: "https://github.com/harsha-helix", note: "open source" },
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