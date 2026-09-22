import { useContext } from "react";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import SectionLabel from "../ui/SectionLabel";
import SectionHeading from "../ui/SectionHeading";
import InteractiveBackgroundGraphs from "../backgrounds/InteractiveBackgroundGraphs";

export default function AboutSection() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const para = { fontSize: 16, color: T.textMid, lineHeight: 1.85, margin: "0 0 20px", fontFamily: SERIF };

  return (
    <section id="about" style={{ padding: isMobile ? "60px 0" : "90px 0", background: T.bg, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <InteractiveBackgroundGraphs />
      </div>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        opacity: isDark ? 0.6 : 0.4
      }} />
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "0 24px" : "0 48px", position: "relative", zIndex: 2 }}>
        <SectionLabel n="06" label="About" />
        <SectionHeading>Background &amp; Goals</SectionHeading>
        <p style={{ fontFamily: MONO, fontSize: 11, color: T.textDim, margin: "0 0 32px", letterSpacing: "0.08em" }}>
          Research Staff, IIT Madras · M.Sc. (Hons.) Physics & B.E. Mechanical Engineering, BITS Pilani
        </p>
        <div style={{ maxWidth: 720 }}>
          <p style={para}>
            I'm an experimental physicist working on quantum optics and photonic computing. Since June 2025 I have been
            Research Staff in Prof. Anil Prabhakar's group at IIT Madras, where I align and lock optical cavities, characterize
            their spatial modes with holographic modal decomposition, and use spatial light modulators as analog optical processors.
          </p>
          <p style={para}>
            I'm most interested in systems where the physics does the computation: interference that evaluates a cost function,
            cavities that shape and convert light. For my PhD I want to build and control this kind of optical hardware: squeezed
            light from optical cavities for quantum sensing, structured light for controlling cold atoms and ions, and physical
            systems that compute.
          </p>
          <p style={{ ...para, margin: 0 }}>
            Before IIT Madras I completed a dual degree at BITS Pilani, Goa, where I co-founded Qugain Quantum Technologies,
            was a teaching assistant for Quantum Information &amp; Computation, and led the campus quantum computing community.
          </p>
        </div>
      </div>
    </section>
  );
}
