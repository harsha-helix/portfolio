import re

with open("src/App.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Insert useMediaQuery hook before ProjectsSection
hook_code = """
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
}

/* ═══════════════════════════════════════════════
   SCROLL-DRIVEN PROJECT SECTION
"""
content = content.replace("/* ═══════════════════════════════════════════════\n   SCROLL-DRIVEN PROJECT SECTION", hook_code)

# 2. Patch ProjectsSection
projects_target = """function ProjectsSection() {
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

        <div style={{ position: "absolute", top: isMobile ? 32 : 64, left: isMobile ? 24 : 48, zIndex: 10 }}>
          <SectionLabel n="01" label="Pinned artifacts" />
        </div>
        <div style={{
          position: "absolute", top: isMobile ? 32 : 68, right: isMobile ? 24 : 48, zIndex: 10,
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
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: isMobile ? "80px 24px 20px 24px" : "96px 36px 60px 48px", position: "relative", zIndex: 5,
            height: isMobile ? "46%" : "auto"
          }}>
            <div style={{ width: "100%", maxWidth: 520, height: isMobile ? "100%" : "auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: isMobile ? 12 : 20 }}>
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
                fontSize: isMobile ? "clamp(20px, 6vw, 24px)" : "clamp(22px,2.6vw,34px)", 
                fontWeight: 600, color: T.text,
                margin: isMobile ? "0 0 8px" : "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.01em",
                animation: "slideUp 0.45s cubic-bezier(0.22,1,0.36,1)"
              }}>
                {project.title}
              </h2>
              <p key={`d-${activeIdx}`} style={{
                fontSize: isMobile ? 13.5 : 15, color: T.textMid, lineHeight: isMobile ? 1.5 : 1.78,
                margin: isMobile ? "0 0 12px" : "0 0 24px", fontFamily: SERIF,
                animation: "slideUp 0.55s cubic-bezier(0.22,1,0.36,1)"
              }}>
                {project.description}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: isMobile ? 16 : 24 }}>
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
            padding: isMobile ? "10px 24px 32px 24px" : "96px 40px 60px 20px", 
            display: "flex", alignItems: "center", position: "relative", zIndex: 5,
            height: isMobile ? "54%" : "auto"
          }}>
            <div style={{
              position: "relative", width: "100%", height: "100%", minHeight: isMobile ? 0 : 400, zIndex: 1,
              background: T.bg2, border: `0.5px solid ${T.border}`, borderRadius: 16, overflow: "hidden",
              boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.4)" : "0 20px 60px rgba(0,0,0,0.1)"
            }}>
"""
content = re.sub(r'function ProjectsSection\(\) \{.*?(?=\s+<DotGrid)', projects_target, content, flags=re.DOTALL)


# 3. Patch ConceptField
concept_target = """function ConceptField() {
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
"""
content = re.sub(r'function ConceptField\(\) \{.*?(?=\s+<DotGrid)', concept_target, content, flags=re.DOTALL)


# 4. Patch AboutSection padding for mobiles
about_target = """function AboutSection() {
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
"""
content = re.sub(r'function AboutSection\(\) \{.*?(?=\s+<div>\s+<SectionLabel n="06" label="About" />)', about_target, content, flags=re.DOTALL)

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Mobile patches successfully applied via regex!")
