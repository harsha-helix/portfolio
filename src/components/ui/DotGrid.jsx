import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function DotGrid({ opacity = 0.18 }) {
    const { isDark, T } = useContext(ThemeContext);
    return (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }}>
            <defs>
                <pattern id="dotgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.7" fill="#6a6860" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotgrid)" />
        </svg>
    );
}
