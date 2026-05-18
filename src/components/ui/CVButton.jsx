import { useState, useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";

export default function CVButton() {
  const { isDark, T } = useContext(ThemeContext);
  const [downloading, setDownloading] = useState(false);
  const handle = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1800);
    // In production, replace with real CV URL
    const a = document.createElement("a");
    a.href = "https://drive.google.com/file/d/1JBrWB1ELq5YHuPo3VUvTyZGb2FQ5h8Pw/view?usp=sharing";
    a.download = "Harshavardhan_Hajeri_CV.pdf";
    a.click();
  };
  return (
    <button onClick={handle}
      style={{
        fontFamily: MONO, fontSize: 11, color: downloading ? T.accent2 : T.text,
        border: `0.5px solid ${downloading ? T.accent2 : T.borderMed}`,
        borderRadius: 5, padding: "9px 20px", cursor: "pointer", background: T.surface,
        letterSpacing: "0.07em", display: "flex", alignItems: "center", gap: 8,
        transition: "all 0.3s ease"
      }}>
      <span style={{ fontSize: 14, opacity: 0.8 }}>{downloading ? "✓" : "↓"}</span>
      {downloading ? "preparing..." : "Download CV"}
    </button>
  );
}
