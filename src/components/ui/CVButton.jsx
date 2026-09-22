import { useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";

export const CV_URL = `${import.meta.env.BASE_URL}Harshavardhan_Hajeri_Resume.pdf`;

export default function CVButton() {
  const { T } = useContext(ThemeContext);
  return (
    <a href={CV_URL} target="_blank" rel="noopener noreferrer"
      style={{
        fontFamily: MONO, fontSize: 11, color: T.text,
        border: `0.5px solid ${T.borderMed}`,
        borderRadius: 5, padding: "9px 20px", cursor: "pointer", background: T.surface,
        letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 8,
        textDecoration: "none", transition: "all 0.3s ease"
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.borderHi}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.borderMed}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>↓</span>
      CV (PDF)
    </a>
  );
}
