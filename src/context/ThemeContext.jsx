import { createContext } from "react";

export const MONO = "'IBM Plex Mono', monospace";
export const SERIF = "'Spectral', 'Georgia', serif";

export const D = {
    bg: "#1a1c21",
    bg2: "#21242a",
    bg3: "#272b33",
    surface: "#2d323c",
    surfaceHi: "#363c48",
    border: "rgba(255,255,255,0.12)",
    borderMed: "rgba(255,255,255,0.18)",
    borderHi: "rgba(255,255,255,0.26)",
    text: "#f6f5ef",
    textMid: "#b5aea6",
    textDim: "#7c7c74",
    accent1: "#967bf0",
    accent2: "#3adac4",
    accent3: "#eba628",
    accent4: "#e26060",
};

export const L = {
    bg: "#f4f2ee",
    bg2: "#ebe8e2",
    bg3: "#e2dfd9",
    surface: "#ffffff",
    surfaceHi: "#faf9f7",
    border: "rgba(0,0,0,0.07)",
    borderMed: "rgba(0,0,0,0.12)",
    borderHi: "rgba(0,0,0,0.18)",
    text: "#1f1e1c",
    textMid: "#5a5752",
    textDim: "#86837e",
    accent1: "#5c42bd",
    accent2: "#17a08c",
    accent3: "#c46d03",
    accent4: "#b53131",
};

export const ThemeContext = createContext({ isDark: true, toggleTheme: () => { }, T: D });
