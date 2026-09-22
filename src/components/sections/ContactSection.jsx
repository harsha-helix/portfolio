import { useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import CVButton from "../ui/CVButton";
import { LINKS } from "../../data/constants";

export default function ContactSection() {
  const { T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  return (
    <section id="contact" style={{ padding: isMobile ? "60px 0 80px" : "80px 0 110px", background: T.bg }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px" }}>
        <SectionLabel n="07" label="Contact" />
        <SectionHeading>Get in touch</SectionHeading>
        <p style={{ fontSize: 16, color: T.textMid, lineHeight: 1.8, margin: "0 0 28px", fontFamily: SERIF, maxWidth: 620 }}>
          I'm happy to hear about PhD positions, research collaborations, and roles in quantum photonics.
          Email is the fastest way to reach me.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          {[
            { label: LINKS.email, href: `mailto:${LINKS.email}` },
            { label: "LinkedIn ↗", href: LINKS.linkedin },
            { label: "GitHub ↗", href: LINKS.github },
          ].map(({ label, href }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{
              fontFamily: MONO, fontSize: 11, color: T.textMid,
              border: `0.5px solid ${T.border}`, borderRadius: 5, padding: "9px 18px",
              textDecoration: "none", background: T.surface, letterSpacing: "0.05em"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHi; e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.textMid; }}>
              {label}
            </a>
          ))}
          <CVButton />
        </div>
      </div>
    </section>
  );
}
