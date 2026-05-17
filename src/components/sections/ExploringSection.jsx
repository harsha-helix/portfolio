import { useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { EXPLORING, STATUS_COLORS_DARK } from "../../data/constants";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";

export default function ExploringSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  const STATUS_COLORS_LIGHT = {
    active: "#17a08c",
    reading: "#5c42bd",
    ongoing: "#c46d03",
    new: "#b53131",
  };

  return (
    <section id="exploring" style={{ padding: isMobile ? "60px 0" : "80px 0", background: "transparent", position: "relative", overflow: "hidden" }}>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        {/* Heading */}
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <SectionLabel n="04" label="Currently exploring" />
          <SectionHeading>Active Threads</SectionHeading>
          <p style={{ fontSize: 13, color: T.textDim, fontFamily: MONO, margin: "8px 0 0", letterSpacing: "0.02em" }}>
            Things I am thinking about right now.
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
            const dotColor = isDark
              ? (STATUS_COLORS_DARK[item.status]?.text || STATUS_COLORS_DARK.reading.text)
              : (STATUS_COLORS_LIGHT[item.status] || STATUS_COLORS_LIGHT.reading);

            return (
              <div key={i} style={{
                padding: isMobile ? "14px 0" : "16px 0",
                borderBottom: i < EXPLORING.length - 1 ? `0.5px solid ${T.border}` : "none",
              }}>
                {/* Prompt line: dot + label */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: dotColor, opacity: 0.7 }}>❯</span>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: dotColor, boxShadow: `0 0 5px ${dotColor}`, flexShrink: 0,
                    animation: item.status === "active" ? "pulseExplore 2.2s ease-in-out infinite" : "none"
                  }} />
                  <span style={{
                    fontFamily: MONO, fontSize: isMobile ? 13 : 14,
                    color: T.text, letterSpacing: "0.02em", fontWeight: 500,
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: MONO, fontSize: 9, color: dotColor,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    marginLeft: "auto", opacity: 0.75, flexShrink: 0,
                  }}>
                    {item.status}
                  </span>
                </div>

                {/* Detail line */}
                <div style={{
                  fontFamily: MONO, fontSize: 11, color: T.textDim,
                  letterSpacing: "0.01em", lineHeight: 1.5, paddingLeft: 21,
                }}>
                  {item.detail}
                </div>
              </div>
            );
          })}

          {/* Terminal cursor after last item */}
          <div style={{ padding: "10px 0 4px", fontFamily: MONO, fontSize: 13, color: T.textDim }}>
            <span style={{ opacity: 0.4 }}>❯ </span>
            <span style={{ animation: "termBlink 1.1s step-end infinite", color: T.accent1 }}>▋</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseExplore { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes termBlink    { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section >
  );
}