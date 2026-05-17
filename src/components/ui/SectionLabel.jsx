import { useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";

export default function SectionLabel({ n, label }) {
    const { isDark, T } = useContext(ThemeContext);
    return (
        <span style={{
            fontFamily: MONO, fontSize: 10, color: T.textDim, letterSpacing: "0.18em",
            textTransform: "uppercase", display: "block", marginBottom: 12
        }}>
            § {n} — {label}
        </span>
    );
}
