import { useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EXPLORING } from "../../data/constants";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";

export default function ExploringSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <section style={{ padding: isMobile ? "60px 0" : "80px 0", background: "transparent", position: "relative", overflow: "hidden" }}>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <SectionLabel n="05" label="Interests" />
          <SectionHeading>Research Interests</SectionHeading>
          <p style={{ fontSize: 13, color: T.textDim, fontFamily: MONO, margin: "8px 0 0", letterSpacing: "0.02em" }}>
            Directions I am pursuing next.
          </p>
        </div>

        {/* Single glass panel — terminal aesthetic */}
        <div style={{
          background: isDark ? "rgba(28,30,36,0.55)" : "rgba(255,255,255,0.60)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `0.5px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
          borderRadius: 12,
          padding: isMobile ? "12px 20px" : "12px 32px",
        }}>
          {EXPLORING.map((item, i) => {
            const dotColor = T.accent1;

            return (
              <div key={i} style={{
                padding: isMobile ? "14px 0" : "16px 0",
                borderBottom: i < EXPLORING.length - 1 ? `0.5px solid ${T.border}` : "none",
              }}>
                {/* Prompt line: dot + label */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: dotColor, boxShadow: `0 0 5px ${dotColor}`, flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: MONO, fontSize: isMobile ? 13 : 14,
                    color: T.text, letterSpacing: "0.02em", fontWeight: 500,
                  }}>
                    {item.label}
                  </span>
                </div>

                {/* Detail line */}
                <div style={{
                  fontFamily: MONO, fontSize: 11, color: T.textDim,
                  letterSpacing: "0.01em", lineHeight: 1.5, paddingLeft: 15,
                }}>
                  {item.detail}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      <style>{`
        @keyframes termBlink    { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section >
  );
}
