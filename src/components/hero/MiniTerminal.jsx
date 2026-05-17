import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext, MONO } from "../../context/ThemeContext";

export default function MiniTerminal() {
  const { isDark, T } = useContext(ThemeContext);
  const [lines, setLines] = useState([
    { t: "sys", v: "> initializing..." },
    { t: "ok", v: "  ✓ Hi I'm Harsha" },
    { t: "ok", v: "  ✓ Scroll to see stuff I do" },
  ]);
  const [input, setInput] = useState("");
  const [blinking, setBlinking] = useState(true);
  const endRef = useRef();

  const COMMANDS = {
    help: ["available: projects, skills, status, clear"],
    projects: ["spim — spatial photonic Ising machine", "hmd  — holographic modal decomposition", "dtqw — discrete-time quantum walk", "csg  — cluster state generation", "mems — MEMS microphone FEM"],
    skills: ["python · matlab · qiskit · qutip", "labview · comsol · fusion360", "fourier optics · slm control"],
    status: ["currently: IIT Madras — photonics lab", "open to: research collaborations", "qtsit: live on PyPI"],
    clear: null,
  };

  useEffect(() => {
    if (lines.length > 6) {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [lines]);

  useEffect(() => {
    const t = setInterval(() => setBlinking(b => !b), 530);
    return () => clearInterval(t);
  }, []);

  const handleKey = (e) => {
    if (e.key !== "Enter") return;
    const cmd = input.trim().toLowerCase();
    const newLines = [...lines, { t: "inp", v: `> ${input}` }];
    if (cmd === "clear") {
      setLines([{ t: "sys", v: "> field cleared" }]);
    } else if (COMMANDS[cmd]) {
      COMMANDS[cmd].forEach(l => newLines.push({ t: "out", v: `  ${l}` }));
      setLines(newLines);
    } else if (cmd) {
      newLines.push({ t: "err", v: `  unknown: ${cmd}. type 'help'` });
      setLines(newLines);
    }
    setInput("");
  };

  const colors = { sys: T.textDim, ok: T.accent2, inp: "#a898f0", out: T.textMid, err: T.accent4 };

  return (
    <div style={{
      background: T.bg, border: `0.5px solid ${T.border}`, borderRadius: 10,
      fontFamily: MONO, fontSize: 11, overflow: "hidden", width: "100%", maxWidth: 380
    }}>
      <div style={{
        padding: "8px 14px", borderBottom: `0.5px solid ${T.border}`,
        display: "flex", alignItems: "center", gap: 7
      }}>
        {["#ef6b6b", "#f0c040", "#6bbf6b"].map((c, i) => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
        ))}
        <span style={{ fontSize: 9.5, color: T.textDim, marginLeft: 6, letterSpacing: "0.08em" }}>
          hh-field.local
        </span>
      </div>
      <div style={{ padding: "12px 14px", maxHeight: 160, overflowY: "auto", scrollbarWidth: "none" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: colors[l.t] || T.textMid, lineHeight: 1.6, fontSize: 11 }}>
            {l.v}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{
        padding: "6px 14px", borderTop: `0.5px solid ${T.border}`,
        display: "flex", alignItems: "center", gap: 6
      }}>
        <span style={{ color: T.accent1, fontSize: 11 }}>›</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="type 'help'"
          style={{
            background: "transparent", border: "none", outline: "none", color: T.text,
            fontFamily: MONO, fontSize: 11, flex: 1, caretColor: T.accent1
          }}
        />
        <span style={{ color: T.accent1, opacity: blinking ? 1 : 0, fontSize: 12 }}>▋</span>
      </div>
    </div>
  );
}