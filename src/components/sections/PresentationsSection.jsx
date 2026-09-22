import { useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { PRESENTATIONS, AWARDS } from "../../data/constants";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";

const SELF = "H. Hajeri";

export default function PresentationsSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  const panel = {
    background: isDark ? "rgba(28,30,36,0.55)" : "rgba(255,255,255,0.60)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `0.5px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
    borderRadius: 12,
    padding: isMobile ? "8px 20px" : "8px 32px",
  };
  const subhead = {
    fontFamily: MONO, fontSize: 10, color: T.textDim,
    letterSpacing: "0.12em", margin: "0 0 14px", textTransform: "uppercase"
  };

  return (
    <section id="presentations" style={{ padding: isMobile ? "60px 0" : "80px 0", position: "relative" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: isMobile ? 36 : 52 }}>
          <SectionLabel n="03" label="Recognition" />
          <SectionHeading>Presentations &amp; Awards</SectionHeading>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr", gap: isMobile ? 36 : 40 }}>
          <div>
            <h3 style={subhead}>Conference presentations</h3>
            <div style={panel}>
              {PRESENTATIONS.map((p, i) => (
                <div key={i} style={{
                  padding: "16px 0",
                  borderBottom: i < PRESENTATIONS.length - 1 ? `0.5px solid ${T.border}` : "none"
                }}>
                  <div style={{ fontFamily: SERIF, fontSize: 15.5, color: T.text, lineHeight: 1.5, marginBottom: 6 }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily: SERIF, fontSize: 13.5, color: T.textMid, lineHeight: 1.5 }}>
                    {p.authors.map((a, j) => (
                      <span key={a}>
                        {a.startsWith(SELF) ? <strong style={{ color: T.text, fontWeight: 600 }}>{a}</strong> : a}
                        {j < p.authors.length - 1 && ", "}
                      </span>
                    ))}
                    <span style={{ fontFamily: MONO, fontSize: 11, color: T.accent1, marginLeft: 10 }}>{p.venue}</span>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: MONO, fontSize: 10, color: T.textDim, margin: "10px 0 0", letterSpacing: "0.02em" }}>
              * equal contribution
            </p>
          </div>

          <div>
            <h3 style={subhead}>Awards &amp; grants</h3>
            <div style={panel}>
              {AWARDS.map((a, i) => (
                <div key={a.name} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12,
                  padding: "14px 0",
                  borderBottom: i < AWARDS.length - 1 ? `0.5px solid ${T.border}` : "none"
                }}>
                  <span style={{ fontFamily: SERIF, fontSize: 14.5, color: T.textMid }}>{a.name}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: T.textDim, whiteSpace: "nowrap" }}>{a.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
