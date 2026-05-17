import { useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import heroPhoto from "../../assets/pict.webp";

export default function HeroPicture() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  const size = isMobile ? 144 : 180;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* animated ring */}
      <svg style={{
        position: "absolute", inset: -8, width: "calc(100%+16px)", height: "calc(100%+16px)",
        animation: "spin 18s linear infinite"
      }} viewBox="0 0 196 196">
        <circle cx="98" cy="98" r="90" fill="none" stroke={T.accent1} strokeWidth="0.5"
          strokeDasharray="8 16" opacity="0.4" />
        <circle cx="98" cy="98" r="82" fill="none" stroke={T.accent2} strokeWidth="0.5"
          strokeDasharray="3 20" opacity="0.3" />
      </svg>
      {/* photo placeholder — replace src with actual photo */}
      <div style={{
        width: size, height: size, borderRadius: "50%",
        border: `1.5px solid ${T.borderMed}`, overflow: "hidden",
        background: `linear-gradient(135deg, ${T.surface} 0%, #1a2038 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
        gap: 6, position: "relative"
      }}>
        {/* Replace the div below with: <img src="your-photo.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}} /> */}
        <div style={{ fontSize: 48, opacity: 0.25 }}>☯</div>
        <span style={{ fontFamily: MONO, fontSize: 8.5, color: T.textDim, letterSpacing: "0.1em" }}>
          HH
        </span>
        <img
          src={heroPhoto}
          alt="Harshavardhan Hajeri, M.Sc. Physics and B.E. Mechanical Engineering student"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}