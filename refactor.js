import fs from 'fs';
const text = fs.readFileSync('src/App.jsx', 'utf8');
const lines = text.split('\n');

const importStatements = `import { useState, useEffect, useCallback, useContext } from "react";
import { ThemeContext, D, L, SERIF, MONO } from "./context/ThemeContext";
import { useMediaQuery } from "./hooks/useMediaQuery";

import DotGrid from "./components/ui/DotGrid";
import HeroTraces from "./components/hero/HeroTraces";
import HeroPicture from "./components/hero/HeroPicture";
import MiniTerminal from "./components/hero/MiniTerminal";
import CVButton from "./components/ui/CVButton";
import ProjectsSection from "./components/sections/ProjectsSection";
import ConceptField from "./components/sections/ConceptField";
import AboutSection from "./components/sections/AboutSection";
import ConwaysGameOfLife from "./components/backgrounds/ConwaysGameOfLife";
import ExperienceSection from "./components/sections/ExperienceSection";
import ExploringSection from "./components/sections/ExploringSection";
`;

const portfolioLines = lines.slice(2217, 2468).join('\n');
fs.writeFileSync('src/App.jsx', importStatements + '\n' + portfolioLines);
