import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";
import { ThemeContext, MONO, SERIF } from "../../context/ThemeContext";

// Figures live in public/figures/<project>/…; `src` is relative to that folder root.
const figureUrl = (src) => `${import.meta.env.BASE_URL}figures/${src}`;

function Media({ fig, fit = "contain", controls = false }) {
  const style = { width: "100%", height: "100%", objectFit: fit, display: "block" };
  if (fig.type === "video") {
    return <video src={figureUrl(fig.src)} style={style} autoPlay muted loop playsInline controls={controls} />;
  }
  return <img src={figureUrl(fig.src)} alt={fig.alt || fig.caption} style={style} draggable={false} />;
}

export default function FigureGallery({ figures }) {
  const { T } = useContext(ThemeContext);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const touch = useRef(null);
  const n = figures.length;
  const fig = figures[idx];

  const go = (d) => setIdx((i) => (i + d + n) % n);

  // Warm the cache for the next figure so arrowing through feels instant
  useEffect(() => {
    const next = figures[(idx + 1) % n];
    if (n > 1 && next.type !== "video") new Image().src = figureUrl(next.src);
  }, [idx, n, figures]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Horizontal swipe only; vertical movement is left to page scroll (touch-action: pan-y)
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  const arrow = (dir) => n > 1 && (
    <button onClick={(e) => { e.stopPropagation(); go(dir); }} aria-label={dir < 0 ? "Previous figure" : "Next figure"}
      style={{
        position: "absolute", top: "50%", [dir < 0 ? "left" : "right"]: 10, transform: "translateY(-50%)",
        width: 30, height: 30, borderRadius: "50%", border: `0.5px solid ${T.borderMed}`,
        background: T.surface, color: T.text, cursor: "pointer", fontSize: 16, lineHeight: 1, zIndex: 2
      }}>
      {dir < 0 ? "‹" : "›"}
    </button>
  );

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", padding: "44px 14px 14px" }}>
      <div
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        onClick={() => setOpen(true)}
        style={{
          position: "relative", flex: 1, minHeight: 0, borderRadius: 10, overflow: "hidden",
          background: T.bg, cursor: "zoom-in", touchAction: "pan-y"
        }}>
        <Media key={fig.src} fig={fig} />
        {arrow(-1)}
        {arrow(1)}
      </div>

      <div style={{ padding: "10px 4px 0", minHeight: 44 }}>
        <p style={{ fontFamily: SERIF, fontSize: 13, color: T.textMid, lineHeight: 1.45, margin: 0 }}>
          <span style={{ fontFamily: MONO, fontSize: 10.5, color: T.textDim, marginRight: 8 }}>Fig. {idx + 1}</span>
          {fig.caption}
        </p>
        {n > 1 && (
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
            {figures.map((f, i) => (
              <button key={f.src} onClick={() => setIdx(i)} aria-label={`Figure ${i + 1}`} style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
                background: i === idx ? T.accent1 : T.borderMed, transition: "all 0.3s"
              }} />
            ))}
          </div>
        )}
      </div>

      {open && createPortal(
        <div onClick={() => setOpen(false)} role="dialog" aria-label={fig.caption}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          style={{
            position: "fixed", inset: 0, zIndex: 1000, background: "rgba(8,9,12,0.92)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "5vh 5vw", cursor: "zoom-out", touchAction: "pan-y"
          }}>
          <div style={{ position: "relative", width: "100%", height: "80vh" }} onClick={(e) => e.stopPropagation()}>
            <Media fig={fig} controls />
            {arrow(-1)}
            {arrow(1)}
          </div>
          <p style={{ fontFamily: SERIF, fontSize: 15, color: "#d8d8d0", margin: "16px 0 0", maxWidth: 800, textAlign: "center", lineHeight: 1.5 }}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: "#8a8a84", marginRight: 8 }}>Fig. {idx + 1} / {n}</span>
            {fig.caption}
          </p>
          <span style={{ position: "absolute", top: 18, right: 24, fontFamily: MONO, fontSize: 11, color: "#8a8a84" }}>esc · close</span>
        </div>,
        document.body
      )}
    </div>
  );
}
