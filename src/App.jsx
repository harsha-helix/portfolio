import { useState, useEffect, useCallback, useContext } from "react";
import { ThemeContext, D, L, SERIF, MONO } from "./context/ThemeContext";
import { useMediaQuery } from "./hooks/useMediaQuery";

import DotGrid from "./components/ui/DotGrid";
import HeroTraces from "./components/hero/HeroTraces";
import HeroPicture from "./components/hero/HeroPicture";
import MiniTerminal from "./components/hero/MiniTerminal";
import CVButton from "./components/ui/CVButton";
import ProjectsSection from "./components/sections/ProjectsSection";
import ConceptField from "./components/sections/ConceptField";
import AboutSection from "./components/sections/AboutSection";
import ConwaysGameOfLife from "./components/backgrounds/ConwaysGameOfLife";
import ExperienceSection from "./components/sections/ExperienceSection";
import ExploringSection from "./components/sections/ExploringSection";

export default function AppWrapper() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = useCallback(() => setIsDark(d => !d), []);
  const T = isDark ? D : L;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, T }}>
      <Portfolio />
    </ThemeContext.Provider>
  );
}

function Portfolio() {
  const { isDark, toggleTheme, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  const [navVisible, setNavVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavVisible(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: SERIF, color: T.text }}>


      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "0 24px" : "0 48px", height: 52,
        background: navVisible ? (isDark ? "rgba(14,15,18,0.95)" : "rgba(244,242,238,0.95)") : "transparent",
        backdropFilter: navVisible ? "blur(16px)" : "none",
        borderBottom: navVisible ? `0.5px solid ${T.border}` : "none",
        transition: "all 0.4s ease"
      }}>
        <span style={{ fontFamily: MONO, fontSize: 12, color: T.textDim, letterSpacing: "0.12em" }}>
          HH — 2026
        </span>
        <div style={{ display: "flex", gap: isMobile ? 12 : 30, alignItems: "center", position: "relative" }}>
          <button onClick={toggleTheme} title="Toggle Theme" style={{ background: "transparent", border: "none", cursor: "pointer", color: T.textDim, transition: "color 0.2s", display: "flex", alignItems: "center", padding: "6px" }} onMouseEnter={e => e.currentTarget.style.color = T.text} onMouseLeave={e => e.currentTarget.style.color = T.textDim}>
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          {!isMobile ? (
            [["work", "#work"], ["field", "#field"], ["experience", "#experience"],
            ["exploring", "#exploring"], ["about", "#about"]]
              .map(([s, h]) => (
                <a key={s} href={h} style={{
                  fontFamily: MONO, fontSize: 10.5, color: T.textDim,
                  textDecoration: "none", letterSpacing: "0.08em",
                  transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.target.style.color = T.text}
                  onMouseLeave={e => e.target.style.color = T.textDim}>
                  {s}
                </a>
              ))
          ) : (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "transparent", border: "none", cursor: "pointer", color: T.textDim, display: "flex", alignItems: "center", padding: "6px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="19" cy="12" r="1.5"></circle>
                <circle cx="5" cy="12" r="1.5"></circle>
              </svg>
            </button>
          )}

          {isMobile && menuOpen && (
            <div style={{
              position: "absolute", top: 40, right: 0, background: isDark ? "rgba(20,22,26,0.98)" : "rgba(250,248,245,0.98)",
              border: `0.5px solid ${T.border}`, borderRadius: 10, padding: "8px 0",
              display: "flex", flexDirection: "column", minWidth: 160,
              boxShadow: isDark ? "0 10px 40px rgba(0,0,0,0.4)" : "0 10px 40px rgba(0,0,0,0.1)",
              backdropFilter: "blur(16px)", zIndex: 200
            }}>
              {[["work", "#work"], ["experience", "#experience"], ["exploring", "#exploring"], ["about", "#about"]].map(([s, h]) => (
                <a key={s} href={h} onClick={() => setMenuOpen(false)} style={{
                  padding: "12px 20px", fontFamily: MONO, fontSize: 11, color: T.textDim, textDecoration: "none", letterSpacing: "0.08em"
                }}>
                  {s}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative", minHeight: "100vh", display: "flex",
        flexDirection: "column", justifyContent: "center", alignItems: "center",
        overflow: "hidden", paddingTop: 52
      }}>
        <DotGrid opacity={0.14} />
        <HeroTraces />

        {/* ambient glow orbs */}
        <div style={{
          position: "absolute", top: "20%", left: "15%", width: 400, height: 400,
          borderRadius: "50%", background: T.accent1, opacity: 0.03, filter: "blur(80px)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "25%", right: "18%", width: 320, height: 320,
          borderRadius: "50%", background: T.accent2, opacity: 0.04, filter: "blur(60px)",
          pointerEvents: "none"
        }} />

        <div style={{
          position: "relative", zIndex: 2, maxWidth: 900, padding: "0 40px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 48
        }}>
          {/* photo + identity */}
          <div style={{
            display: "flex", alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 32 : 48,
            textAlign: isMobile ? "center" : "left"
          }}>
            <HeroPicture />
            <div>
              <div style={{
                fontFamily: MONO, fontSize: 10, color: T.textDim,
                letterSpacing: "0.18em", marginBottom: 20, textTransform: "uppercase"
              }}>
                M.Sc. Physics · B.E. Mech. Eng · BITS Pilani
              </div>
              <h1 style={{
                fontSize: "clamp(30px,4vw,52px)", fontWeight: 600, lineHeight: 1.2,
                color: T.text, margin: "0 0 22px", letterSpacing: "-0.02em"
              }}>
                Fascinated by how{" "}
                <em style={{ fontStyle: "italic", color: T.accent1 }}>physics</em>{" "}
                can shape{" "}
                <em style={{ fontStyle: "italic", color: T.accent3 }}>computation</em>.
              </h1>
              <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.75, margin: "0 0 32px" }}>
                I spend my time exploring quantum optics, analog optical computing, and the unexpected ways we can process information.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {[
                  { label: "GitHub ↗", href: "https://github.com/harsha-helix" },
                  { label: "LinkedIn   ↗", href: "https://www.linkedin.com/in/harshavardhan-hajeri-01b279254/" },
                  { label: "Contact", href: "mailto:tau.harsha@gmail.com" },
                ].map((l) => (
                  <a key={l.label} href={l.href}
                    style={{
                      fontFamily: MONO, fontSize: 10.5, color: T.textMid,
                      border: `0.5px solid ${T.border}`, borderRadius: 4, padding: "8px 18px",
                      textDecoration: "none", background: T.surface, letterSpacing: "0.05em",
                      transition: "all 0.25s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHi; e.currentTarget.style.color = T.text; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMid; }}>
                    {l.label}
                  </a>
                ))}
                <CVButton />
              </div>
            </div>
          </div>

          {/* terminal */}
          {!isMobile && (
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
              <MiniTerminal />
            </div>
          )}
        </div>

        <div style={{
          position: "absolute", bottom: 34, left: "50%", transform: "translateX(-50%)",
          fontFamily: MONO, fontSize: 10, color: T.textDim, letterSpacing: "0.1em",
          animation: "fadeOsc 3s ease-in-out infinite"
        }}>
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

      {/* EXPERIENCE + EXPLORING — shared single GoL dot-matrix canvas */}
      <div style={{ position: "relative", background: T.bg, overflow: "hidden" }}>
        <ConwaysGameOfLife />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
          opacity: isDark ? 0.35 : 0.2
        }} />
        <ExperienceSection />
        <ExploringSection />
      </div>



      {/* FOOTER */}
      <footer style={{
        borderTop: `0.5px solid ${T.border}`, padding: "22px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: T.bg2
      }}>
        <span style={{ fontFamily: MONO, fontSize: 10, color: T.textDim }}>
          Harshavardhan Hajeri · BITS Pilani · 2026
        </span>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {[T.accent1, T.accent3, T.accent2, T.accent4].map((c, i) => (
            <div key={i} style={{
              width: 5, height: 5, borderRadius: "50%", background: c,
              boxShadow: `0 0 4px ${c}80`, opacity: 0.7
            }} />
          ))}
          <span style={{ fontFamily: MONO, fontSize: 10, color: T.textDim, marginLeft: 8 }}>
            tau.harsha@gmail.com
          </span>
        </div>
      </footer>
    </div>
  );
}
