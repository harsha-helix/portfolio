import { useContext } from "react";
import { ThemeContext, SERIF } from "../../context/ThemeContext";

export default function SectionHeading({ children, style = {} }) {
    const { isDark, T } = useContext(ThemeContext);
    return (
        <h2 style={{
            fontSize: 32, fontWeight: 600, color: T.text, margin: "0 0 10px",
            letterSpacing: "-0.01em", fontFamily: SERIF, ...style
        }}>
            {children}
        </h2>
    );
}
