import { useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SKILLS } from "../../data/constants";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";

export default function SkillsSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <section id="skills" style={{ padding: isMobile ? "60px 0" : "80px 0", position: "relative" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <SectionLabel n="04" label="Skills" />
          <SectionHeading>Technical Skills</SectionHeading>
        </div>

        <div style={{
          background: isDark ? "rgba(28,30,36,0.55)" : "rgba(255,255,255,0.60)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `0.5px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
          borderRadius: 12,
          padding: isMobile ? "8px 20px" : "8px 32px",
        }}>
          {SKILLS.map((g, i) => (
            <div key={g.group} style={{
              display: "grid", gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
              gap: isMobile ? 10 : 24, alignItems: "baseline",
              padding: "18px 0",
              borderBottom: i < SKILLS.length - 1 ? `0.5px solid ${T.border}` : "none"
            }}>
              <span style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 600, color: T.text }}>{g.group}</span>
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                {g.items.map(s => (
                  <span key={s} style={{
                    fontFamily: MONO, fontSize: 11, color: T.textMid,
                    border: `0.5px solid ${T.border}`, background: T.surface,
                    borderRadius: 4, padding: "4px 10px"
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
