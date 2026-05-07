import React, { useState, useEffect, useRef } from 'react';
//import myPhoto from '/pict.jpg'; // Adjust path if necessary

// ─── Icons ───────────────────────────────────────────────────────────────────
const Ic = ({ children, size = 24, style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={style} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);
const Github    = p => <Ic {...p}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></Ic>;
const Linkedin  = p => <Ic {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Ic>;
const Mail      = p => <Ic {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Ic>;
const ChevDown  = p => <Ic {...p}><path d="m6 9 6 6 6-6"/></Ic>;
const Briefcase = p => <Ic {...p}><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Ic>;
const BookOpen  = p => <Ic {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></Ic>;
const CodeIc    = p => <Ic {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Ic>;
const AwardIc   = p => <Ic {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></Ic>;
const UserIc    = p => <Ic {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Ic>;
const TermIc    = p => <Ic {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></Ic>;
const CpuIc     = p => <Ic {...p}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></Ic>;
const GradCap   = p => <Ic {...p}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></Ic>;
const Sun       = p => <Ic {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Ic>;
const Moon      = p => <Ic {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Ic>;
const MenuIc    = p => <Ic {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Ic>;
const XIc       = p => <Ic {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Ic>;
const Download  = p => <Ic {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Ic>;
const ExternalLink = p => <Ic {...p}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></Ic>;
const Atom      = p => <Ic {...p}><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/></Ic>;
const FlaskIc   = p => <Ic {...p}><path d="M9 3h6v8l3.5 7a1 1 0 0 1-.9 1.5H6.4a1 1 0 0 1-.9-1.5L9 11V3z"/><line x1="6" y1="6" x2="18" y2="6"/></Ic>;
const Package   = p => <Ic {...p}><polyline points="16.5 9.4 7.5 4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></Ic>;

// ─── Dummy URLs (replace when hosting) ───────────────────────────────────────
const LINKS = {
  github:    'https://github.com/harshavardhan-hajeri',
  linkedin:  'https://linkedin.com/in/harshavardhan-hajeri',
  email:     'f20212402@goa.bits-pilani.ac.in',
  resume:    'https://drive.google.com/file/d/REPLACE_WITH_FILE_ID/view',
  photo:     'data:image/jpeg;base64,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',
  qtsit:     'https://pypi.org/project/qtsit/',
  qtsitRepo: 'https://github.com/harshavardhan-hajeri/qtsit',
  dtqwRepo:  'https://github.com/harshavardhan-hajeri/dtqw-bandit',
  cvOptics:  'https://github.com/harshavardhan-hajeri/cv-cluster-states',
  memsRepo:  'https://github.com/harshavardhan-hajeri/mems-microphone-sim',
  eop1:      'https://doi.org/REPLACE_DOI_1',
  eop2:      'https://doi.org/REPLACE_DOI_2',
};

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const LIGHT = {
  bg: '#F5F1E8', bgSection: 'rgba(255,255,255,0.5)', bgCard: '#FFFFFF',
  bgCardAlt: 'rgba(255,255,255,0.85)', bgNav: 'rgba(245,241,232,0.92)',
  bgCode: '#F0EDE5', bgTag: '#FFFFFF', bgSecBtn: '#FFFFFF', bgToggle: 'rgba(255,255,255,0.6)',
  bgMobile: '#F5F1E8', bgPill: 'rgba(255,255,255,0.7)',
  text: '#1A1A2E', textMuted: '#57534E', textFaint: '#78716C',
  accent1: '#7C3AED', accent2: '#0D9488',
  border: '#E5DFD3', borderCard: '#EDE8DE', borderFaint: 'rgba(229,223,211,0.6)',
  borderNav: 'rgba(229,223,211,0.7)', borderToggle: '#D6CEC0', borderCode: '#DDD8CE',
  shadow: '0 1px 4px rgba(0,0,0,0.07)', shadowMd: '0 4px 16px rgba(0,0,0,0.1)',
  glowOp: 1, gridOp: 0.65,
};
const DARK = {
  bg: '#080D1A', bgSection: 'rgba(8,13,26,0.85)', bgCard: '#0F172A',
  bgCardAlt: 'rgba(15,23,42,0.6)', bgNav: 'rgba(8,13,26,0.85)',
  bgCode: '#080D1A', bgTag: '#0F172A', bgSecBtn: 'rgba(15,23,42,0.8)', bgToggle: 'rgba(15,23,42,0.6)',
  bgMobile: '#080D1A', bgPill: 'rgba(15,23,42,0.8)',
  text: '#E2E8F0', textMuted: '#94A3B8', textFaint: '#64748B',
  accent1: '#8B5CF6', accent2: '#2DD4BF',
  border: '#1E293B', borderCard: '#1E293B', borderFaint: 'rgba(30,41,59,0.6)',
  borderNav: '#1E293B', borderToggle: '#334155', borderCode: '#1E293B',
  shadow: 'none', shadowMd: 'none',
  glowOp: 0, gridOp: 0.18,
};

// ─── Section label style (quantum/physics themed) ─────────────────────────────
const SECTION_LABELS = {
  home:       null,
  about:      'ψ  Wavefunction.Init()',
  research:   '∇²  Eigenstate.Research()',
  experience: 'ħ  Observable.Experience()',
  projects:   '⟨φ|  Superposition.Output()',
  skills:     '⊗  TensorProduct.Skills()',
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [isDark, setIsDark]               = useState(() => {
    try {
      const saved = localStorage.getItem('hh-theme');
      if (saved) return saved === 'dark';
    } catch {}
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  });

  const t = isDark ? DARK : LIGHT;

  // Persist theme
  useEffect(() => {
    try { localStorage.setItem('hh-theme', isDark ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const ids = ['home','about','research','experience','projects','skills'];
      const cur = ids.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });
      if (cur) setActiveSection(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  // ── Reusable style bits ──────────────────────────────────────────────────
  const card = {
    background: t.bgCard, border: `1px solid ${t.borderCard}`,
    borderRadius: 14, boxShadow: t.shadow,
    transition: 'box-shadow 0.2s, border-color 0.2s',
  };
  const pill = (color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '3px 10px', borderRadius: 999, fontSize: 11,
    fontFamily: 'monospace', letterSpacing: '0.06em', textTransform: 'uppercase',
    border: `1px solid ${color}44`, background: `${color}14`, color,
  });
  const navLinks = ['About','Research','Experience','Projects','Skills'];

  const SectionHeading = ({ id, icon, children }) => (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:56 }}>
      <div style={{ color: t.accent1 }}>{icon}</div>
      <h2 style={{ fontSize:22, fontWeight:600, color:t.text, margin:0, letterSpacing:'0.02em', fontFamily:'monospace' }}>
        {children}
      </h2>
    </div>
  );

  // ── Link button ──────────────────────────────────────────────────────────
  const LinkBtn = ({ href, children, primary }) => (
    <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
       rel="noopener noreferrer"
       style={{
         display:'inline-flex', alignItems:'center', gap:8, padding:'11px 22px',
         borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:500,
         transition:'all 0.2s',
         ...(primary ? {
           background: isDark ? `${t.accent1}18` : t.accent1,
           color: isDark ? t.accent1 : '#fff',
           border: `1px solid ${isDark ? t.accent1+'55' : 'transparent'}`,
           boxShadow: isDark ? 'none' : `0 2px 10px ${t.accent1}44`,
         } : {
           background: t.bgSecBtn, color: t.textMuted,
           border: `1px solid ${t.border}`,
           boxShadow: t.shadow,
         }),
       }}>
      {children}
    </a>
  );

  return (
    <div style={{ minHeight:'100vh', background:t.bg, color:t.text, fontFamily:"ui-sans-serif,system-ui,sans-serif", position:'relative', transition:'background 0.35s,color 0.35s' }}>

      {/* Grid bg */}
      <div style={{
        position:'fixed', inset:0, zIndex:0, pointerEvents:'none',
        backgroundImage: isDark
          ? 'linear-gradient(to right,#1E293B 1px,transparent 1px),linear-gradient(to bottom,#1E293B 1px,transparent 1px)'
          : 'radial-gradient(circle,#A89F92 1.5px,transparent 1.5px)',
        backgroundSize: isDark ? '44px 44px' : '26px 26px',
        opacity: t.gridOp, transition:'opacity 0.35s',
      }}/>

      {/* Ambient glows */}
      <div style={{ position:'fixed', top:'-15%', left:'-10%', width:'45%', height:'45%', borderRadius:'50%', background:'rgba(124,58,237,0.12)', filter:'blur(130px)', pointerEvents:'none', opacity:t.glowOp, transition:'opacity 0.35s' }}/>
      <div style={{ position:'fixed', bottom:'-15%', right:'-10%', width:'45%', height:'45%', borderRadius:'50%', background:'rgba(13,148,136,0.1)', filter:'blur(130px)', pointerEvents:'none', opacity:t.glowOp, transition:'opacity 0.35s' }}/>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position:'fixed', top:0, width:'100%', zIndex:100, backdropFilter:'blur(14px)',
        background: isScrolled ? t.bgNav : 'transparent',
        borderBottom: `1px solid ${isScrolled ? t.borderNav : 'transparent'}`,
        boxShadow: isScrolled && !isDark ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
        transition:'background 0.3s,border-color 0.3s,box-shadow 0.3s',
      }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'14px 28px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div onClick={() => scrollTo('home')} style={{ fontSize:19, fontWeight:700, letterSpacing:'0.06em', cursor:'pointer', color:t.text, display:'flex', alignItems:'center', gap:8, fontFamily:'monospace' }}>
            <span style={{ width:8, height:8, borderRadius:'50%', background:t.accent1, display:'inline-block', boxShadow:`0 0 8px ${t.accent1}` }}/>
            HH.
          </div>
          {/* Desktop */}
          <div style={{ display:'flex', alignItems:'center', gap:28 }} className="hh-desktop">
            {navLinks.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{
                background:'none', border:'none', cursor:'pointer', fontSize:13,
                fontWeight:500, letterSpacing:'0.05em', fontFamily:'monospace',
                color: activeSection===n.toLowerCase() ? t.accent1 : t.textMuted,
                transition:'color 0.2s', padding:0,
              }}
              onMouseEnter={e=>e.target.style.color=t.accent1}
              onMouseLeave={e=>e.target.style.color=activeSection===n.toLowerCase()?t.accent1:t.textMuted}>
                {n}
              </button>
            ))}
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" style={{
              display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px',
              borderRadius:8, border:`1px solid ${t.accent1}55`,
              background:`${t.accent1}12`, color:t.accent1,
              fontSize:12, fontWeight:600, fontFamily:'monospace', textDecoration:'none',
              letterSpacing:'0.05em',
            }}>
              <Download size={13}/> CV
            </a>
            <button onClick={() => setIsDark(!isDark)} aria-label="Toggle theme" style={{
              padding:7, borderRadius:'50%', border:`1px solid ${t.borderToggle}`,
              background:t.bgToggle, color:t.textMuted, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s',
            }}>
              {isDark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
          </div>
          {/* Mobile controls */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }} className="hh-mobile">
            <button onClick={() => setIsDark(!isDark)} style={{ padding:7, borderRadius:'50%', border:`1px solid ${t.borderToggle}`, background:t.bgToggle, color:t.textMuted, cursor:'pointer', display:'flex' }}>
              {isDark ? <Sun size={15}/> : <Moon size={15}/>}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ padding:7, borderRadius:8, border:`1px solid ${t.borderToggle}`, background:t.bgToggle, color:t.textMuted, cursor:'pointer', display:'flex' }}>
              {menuOpen ? <XIc size={17}/> : <MenuIc size={17}/>}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div style={{ background:t.bgMobile, borderTop:`1px solid ${t.borderNav}`, padding:'12px 28px 20px' }}>
            {navLinks.map(n => (
              <button key={n} onClick={() => scrollTo(n.toLowerCase())} style={{
                display:'block', width:'100%', background:'none', border:'none', cursor:'pointer',
                textAlign:'left', padding:'11px 0', fontSize:15, fontFamily:'monospace',
                color: activeSection===n.toLowerCase() ? t.accent1 : t.textMuted,
                borderBottom:`1px solid ${t.borderFaint}`,
              }}>{n}</button>
            ))}
            <a href={LINKS.resume} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:14, padding:'8px 16px', borderRadius:8, border:`1px solid ${t.accent1}55`, background:`${t.accent1}12`, color:t.accent1, fontSize:13, fontFamily:'monospace', textDecoration:'none' }}>
              <Download size={14}/> Download CV
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="home" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', position:'relative', padding:'100px 28px 60px' }}>
        <div style={{ maxWidth:860, margin:'0 auto', width:'100%', zIndex:1 }}>

          {/* Top row: photo + intro */}
          <div style={{ display:'flex', alignItems:'center', gap:40, flexWrap:'wrap', marginBottom:40 }}>

            {/* Avatar */}
            <div style={{ position:'relative', flexShrink:0 }}>
              <div style={{ width:110, height:110, borderRadius:'50%', overflow:'hidden', border:`3px solid ${t.accent1}55`, boxShadow:`0 0 24px ${t.accent1}33` }}>
                <img
                  src={LINKS.photo}
                  alt="Harshavardhan Hajeri"
                  onError={e => { e.target.onerror=null; e.target.src=''; e.target.parentNode.innerHTML=`<div style="width:110px;height:110px;borderRadius:50%;background:linear-gradient(135deg,${t.accent1},${t.accent2});display:flex;alignItems:center;justifyContent:center;fontSize:36px;fontWeight:700;color:#fff">H</div>`; }}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                />
              </div>
              {/* Status dot */}
              <div style={{ position:'absolute', bottom:6, right:6, width:16, height:16, borderRadius:'50%', background:'#22C55E', border:`2px solid ${t.bg}`, boxShadow:'0 0 8px rgba(34,197,94,0.6)' }}/>
            </div>

            {/* Name + role */}
            <div>
              <div style={{ ...pill(t.accent2), marginBottom:12 }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:t.accent2, display:'inline-block' }}/>
                Open to Research &amp; PhD Opportunities · India / Remote
              </div>
              <h1 style={{ fontSize:'clamp(2.4rem,6vw,4rem)', fontWeight:700, letterSpacing:'-0.025em', lineHeight:1.1, margin:0, color:t.text }}>
                Harshavardhan{' '}
                <span className="hh-gradient">Hajeri</span>
              </h1>
              <p style={{ fontSize:16, color:t.textMuted, margin:'10px 0 0', fontWeight:400, letterSpacing:'0.01em' }}>
                Physicist · Quantum Software Developer · Optical Engineer
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p style={{ fontSize:18, color:t.textMuted, lineHeight:1.75, maxWidth:680, margin:'0 0 16px', fontWeight:300 }}>
            I build machines where <span style={{ color:t.text, fontWeight:500 }}>light computes</span> and <span style={{ color:t.text, fontWeight:500 }}>quantum walks decide</span> — from SLM-based photonic Ising solvers to open-source quantum algorithms that run on real hardware today.
          </p>

          {/* Stats row */}
          <div style={{ display:'flex', gap:28, flexWrap:'wrap', margin:'24px 0 36px', padding:'18px 0', borderTop:`1px solid ${t.borderFaint}`, borderBottom:`1px solid ${t.borderFaint}` }}>
            {[
              { val:'2', label:'Conference Papers' },
              { val:'INR 5.4L', label:'Funding Secured' },
              { val:'200+', label:'Students Mentored' },
              { val:'1', label:'PyPI Package' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontSize:22, fontWeight:700, color:t.accent1, fontFamily:'monospace' }}>{val}</div>
                <div style={{ fontSize:12, color:t.textFaint, marginTop:2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:12 }}>
            <LinkBtn href={`mailto:${LINKS.email}`} primary>
              <Mail size={16}/> Get in Touch
            </LinkBtn>
            <LinkBtn href={LINKS.resume}>
              <Download size={16}/> Download CV
            </LinkBtn>
            <LinkBtn href={LINKS.github}>
              <Github size={16}/> GitHub
            </LinkBtn>
            <LinkBtn href={LINKS.linkedin}>
              <Linkedin size={16}/> LinkedIn
            </LinkBtn>
          </div>
        </div>

        <div onClick={() => scrollTo('about')} style={{ position:'absolute', bottom:36, cursor:'pointer', color:t.textFaint }}>
          <ChevDown size={26} style={{ animation:'hh-bounce 2s infinite' }}/>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding:'96px 28px', borderTop:`1px solid ${t.borderFaint}`, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:t.bgSection, backdropFilter:'blur(10px)', zIndex:0 }}/>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <SectionHeading icon={<UserIc size={22}/>}>ψ&nbsp;&nbsp;Wavefunction.Init()</SectionHeading>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48, alignItems:'start' }}>
            <div style={{ fontSize:16, color:t.textMuted, lineHeight:1.85, fontWeight:300 }}>
              <p style={{ marginBottom:20 }}>
                I'm a final-year dual-degree student at <span style={{ color:t.text, fontWeight:500 }}>BITS Pilani</span>, completing M.Sc. (Hons.) Physics alongside B.E. Mechanical Engineering. My work sits where optics, quantum information, and hardware meet.
              </p>
              <p style={{ marginBottom:20 }}>
                At IIT Madras I currently build <span style={{ color:t.text, fontWeight:500 }}>Spatial Photonic Ising Machines</span> — analog optical computers that solve NP-hard combinatorial problems at the speed of light. In parallel, I co-founded <span style={{ color:t.text, fontWeight:500 }}>Qugain Quantum</span>, an open-source startup translating quantum walk theory into practical software.
              </p>
              <p>
                I care deeply about making quantum computing accessible — I've taught it to 200+ students and built course materials from scratch. Outside the lab: mime theatre, community work, and the occasional deep-dive into general relativity.
              </p>
            </div>

            {/* Education card */}
            <div style={{ ...card, padding:28 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, color:t.accent2 }}>
                <GradCap size={19}/>
                <span style={{ fontSize:11, fontFamily:'monospace', textTransform:'uppercase', letterSpacing:'0.1em', color:t.textFaint }}>Education</span>
              </div>
              <h4 style={{ fontSize:16, fontWeight:600, color:t.text, lineHeight:1.4, marginBottom:6 }}>
                Birla Institute of Technology &amp; Science, Pilani
              </h4>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:18 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:t.accent2, opacity:0.6 }}/>
                <span style={{ fontSize:12, fontFamily:'monospace', color:t.textFaint }}>Oct 2021 — June 2026</span>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  ['M.Sc. (Hons.) Physics', t.accent1],
                  ['B.E. Mechanical Engineering', t.accent2],
                  ['Dual Degree Program', t.textFaint],
                ].map(([d, c]) => (
                  <div key={d} style={{ display:'flex', alignItems:'center', gap:10, fontSize:14, color:t.textMuted }}>
                    <span style={{ width:6, height:6, borderRadius:2, background:c, flexShrink:0 }}/>
                    {d}
                  </div>
                ))}
              </div>

              <div style={{ marginTop:24, paddingTop:20, borderTop:`1px solid ${t.border}` }}>
                <div style={{ fontSize:11, fontFamily:'monospace', textTransform:'uppercase', letterSpacing:'0.1em', color:t.textFaint, marginBottom:12 }}>Currently Based</div>
                <div style={{ fontSize:14, color:t.textMuted }}>Chennai, India &nbsp;·&nbsp; <span style={{ color:'#22C55E' }}>●</span> Available for opportunities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH INTERESTS ───────────────────────────────────────────── */}
      <section id="research" style={{ padding:'96px 28px', borderTop:`1px solid ${t.borderFaint}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionHeading icon={<Atom size={22}/>}>∇²&nbsp;&nbsp;Eigenstate.Research()</SectionHeading>

          <p style={{ fontSize:16, color:t.textMuted, lineHeight:1.8, maxWidth:720, marginBottom:48, fontWeight:300 }}>
            My research sits at the intersection of <span style={{ color:t.text, fontWeight:500 }}>analog quantum computation</span>, <span style={{ color:t.text, fontWeight:500 }}>photonic systems</span>, and <span style={{ color:t.text, fontWeight:500 }}>quantum algorithms</span>. I'm drawn to problems where physical intuition unlocks computational leverage — where understanding light, noise, and quantum coherence leads to machines that outperform classical approaches.
          </p>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:20 }}>
            {[
              {
                icon: <FlaskIc size={20} style={{ color:t.accent1 }}/>,
                title: 'Photonic Analog Computing',
                body: 'Building Spatial Photonic Ising Machines using SLMs and Fourier optics. Interested in how analog interference can solve combinatorial optimization at low energy cost and high speed.',
              },
              {
                icon: <Atom size={20} style={{ color:t.accent2 }}/>,
                title: 'Quantum Walks & Algorithms',
                body: 'Exploring discrete-time quantum walks as primitives for reinforcement learning and optimization. Specifically interested in DTQW-based advantage on bandit problems and graph algorithms.',
              },
              {
                icon: <CpuIc size={20} style={{ color:t.accent1 }}/>,
                title: 'Continuous-Variable Quantum Optics',
                body: 'Characterizing entanglement in squeezed and cluster states. Interested in the role of non-Gaussian operations like photon subtraction in enabling universal CV quantum computation.',
              },
              {
                icon: <Package size={20} style={{ color:t.accent2 }}/>,
                title: 'Open Quantum Software',
                body: 'Designing accessible quantum software that runs on real NISQ hardware. Believer in open-source as the fastest path to meaningful quantum advantage for the broader community.',
              },
            ].map(({ icon, title, body }) => (
              <div key={title} style={{ ...card, padding:24 }}>
                <div style={{ marginBottom:16 }}>{icon}</div>
                <h3 style={{ fontSize:15, fontWeight:600, color:t.text, marginBottom:10, lineHeight:1.4 }}>{title}</h3>
                <p style={{ fontSize:13, color:t.textMuted, lineHeight:1.75, margin:0, fontWeight:300 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" style={{ padding:'96px 28px', borderTop:`1px solid ${t.borderFaint}`, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:t.bgSection, backdropFilter:'blur(10px)', zIndex:0 }}/>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <SectionHeading icon={<Briefcase size={22}/>}>ħ&nbsp;&nbsp;Observable.Experience()</SectionHeading>

          <div style={{ position:'relative' }}>
            {/* Continuous timeline line — desktop only via CSS class */}
            <div className="hh-timeline-line" style={{ position:'absolute', left:'27%', top:0, bottom:0, width:1, background:t.border, display:'none' }}/>

            {[
              {
                org:'IIT Madras', period:'Jun 2025 – Present', role:'Research Student',
                dot: t.accent1, sup:'Prof. Anil Prabhakar · Photonics Lab',
                bullets:[
                  'Built a Spatial Photonic Ising Machine using a phase-only SLM and Fourier optics to solve NP-hard optimization problems via analog interference, with Metropolis simulated annealing feedback and Gaussian beam compensation.',
                  'Developed an SLM-based holographic modal decomposition framework for a bow-tie SHG cavity; introduced a digital knife-edge alignment technique and crosstalk matrix calibration, improving average modal self-overlap from 0.86 → 0.96 (fundamental mode: 0.996).',
                ],
              },
              {
                org:'Qugain Quantum Technologies', period:'Dec 2023 – Present', role:'Co-Founder & Lead Developer',
                dot: t.accent2, sup:'Open-source quantum startup',
                bullets:[
                  <>Co-founded an open-source quantum algorithms startup; secured <span style={{color:t.text,fontWeight:500}}>INR 5,00,000</span> seed funding (PIEDS) and the <span style={{color:t.text,fontWeight:500}}>INR 40,000</span> Prof. Suresh Ramaswamy Award.</>,
                  <>Designed and released <a href={LINKS.qtsit} target="_blank" rel="noopener noreferrer" style={{color:t.accent2,fontFamily:'monospace',fontSize:13}}>qtsit</a> on PyPI — two Discrete-Time Quantum Walk implementations (coined + split-step) applied to the N-Armed Bandit problem, achieving measurable advantage over classical random walk baselines. <a href={LINKS.qtsitRepo} target="_blank" rel="noopener noreferrer" style={{color:t.textFaint,display:'inline-flex',alignItems:'center',gap:3,fontSize:12}}><ExternalLink size={11}/> repo</a></>,
                ],
              },
              {
                org:'CeNSE, Indian Institute of Science', period:'Jun – Aug 2024', role:'Research Intern',
                dot: t.accent1, sup:'Dr. Dhavala Suri · Nanoscience Centre',
                bullets:[
                  'Designed a cryostat dipstick in Fusion 360 for low-temperature transport measurements at sub-Kelvin regimes.',
                  'Built a PyQt5/QCoDeS GUI for automated I-V characterization of nanoscale devices, replacing manual measurement workflows.',
                ],
              },
              {
                org:'Google Developer Student Club, BITS Goa', period:'Aug 2023 – May 2025', role:'Quantum Computing Lead',
                dot: t.accent2, sup:'IBM Qiskit Community',
                bullets:[
                  'Led workshops and study groups reaching 100+ students; organized IBM-sponsored Qiskit Fall Fest 2023.',
                  'Received 2024 Qiskit Fall Fest Mentor Badge. Developed Manim-based materials covering Grover\'s Algorithm; mentored students across Quark STP & Theory of Relativity.',
                ],
              },
            ].map(({ org, period, role, dot, sup, bullets }, i) => (
              <div key={i} style={{ display:'flex', gap:0, marginBottom:44, flexWrap:'wrap' }}>
                {/* Left label */}
                <div style={{ width:'27%', minWidth:170, paddingRight:36, paddingBottom:8, textAlign:'right', position:'relative', flexShrink:0 }} className="hh-exp-label">
                  <h3 style={{ fontSize:15, fontWeight:600, color:t.text, margin:'0 0 4px' }}>{org}</h3>
                  <p style={{ fontSize:12, fontFamily:'monospace', color:t.textFaint, margin:'0 0 4px' }}>{period}</p>
                  <p style={{ fontSize:12, color:dot, fontWeight:600, margin:'0 0 4px', fontFamily:'monospace' }}>{role}</p>
                  <p style={{ fontSize:11, color:t.textFaint, margin:0, fontStyle:'italic' }}>{sup}</p>
                  {/* Timeline dot */}
                  <div className="hh-timeline-dot" style={{ position:'absolute', right:-5, top:6, width:9, height:9, borderRadius:'50%', background:dot, border:`2px solid ${t.bg}`, boxShadow:`0 0 0 1px ${dot}`, display:'none' }}/>
                </div>
                {/* Right card */}
                <div style={{ flex:'1 1 300px', ...card, padding:22 }}>
                  {bullets.map((b, bi) => (
                    <div key={bi} style={{ display:'flex', gap:12, marginBottom: bi < bullets.length-1 ? 14 : 0 }}>
                      <span style={{ color:dot, flexShrink:0, marginTop:3, fontSize:14 }}>›</span>
                      <span style={{ fontSize:13.5, color:t.textMuted, lineHeight:1.75, fontWeight:300 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS & PUBLICATIONS ──────────────────────────────────────── */}
      <section id="projects" style={{ padding:'96px 28px', borderTop:`1px solid ${t.borderFaint}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <SectionHeading icon={<CodeIc size={22}/>}>⟨φ|&nbsp;&nbsp;Superposition.Output()</SectionHeading>

          {/* Project cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:20, marginBottom:56 }}>
            {[
              {
                icon:<CpuIc size={19} style={{color:t.accent1}}/>, tag:'Sim / Opt',
                title:'Discrete-Time Quantum Walk', tech:'Qiskit', techColor:t.accent1,
                desc:'Implemented coined and split-step DTQW circuits for RL-based optimization on the N-Armed Bandit problem; demonstrated advantage over classical random walk baselines.',
                links:[{label:'Repo',href:LINKS.dtqwRepo},{label:'PyPI',href:LINKS.qtsit}],
              },
              {
                icon:<Atom size={19} style={{color:t.accent2}}/>, tag:'CV Optics',
                title:'Entanglement in Cluster States', tech:'Strawberry Fields', techColor:t.accent2,
                desc:'Simulated 2D cluster states and computed entanglement measures on photon-subtracted squeezed vacuum states in continuous-variable quantum optics.',
                links:[{label:'Repo',href:LINKS.cvOptics}],
              },
              {
                icon:<FlaskIc size={19} style={{color:t.textFaint}}/>, tag:'FEM / MEMS',
                title:'MEMS Microphone Simulation', tech:'COMSOL Multiphysics', techColor:t.textFaint,
                desc:'Structural-acoustic coupled simulation of a capacitive MEMS microphone; proposed design modifications that improved simulated sensitivity.',
                links:[{label:'Repo',href:LINKS.memsRepo}],
              },
            ].map(({ icon, tag, title, tech, techColor, desc, links }) => (
              <div key={title} style={{ ...card, padding:22, display:'flex', flexDirection:'column' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
                  {icon}
                  <span style={{ fontSize:11, fontFamily:'monospace', color:t.textFaint }}>{tag}</span>
                </div>
                <h3 style={{ fontSize:15, fontWeight:600, color:t.text, marginBottom:6, lineHeight:1.4 }}>{title}</h3>
                <p style={{ fontSize:11, fontFamily:'monospace', color:techColor, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:12, fontWeight:600 }}>{tech}</p>
                <p style={{ fontSize:13, color:t.textMuted, lineHeight:1.7, fontWeight:300, flex:1, marginBottom:16 }}>{desc}</p>
                <div style={{ display:'flex', gap:8 }}>
                  {links.map(({label,href}) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                      display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontFamily:'monospace',
                      color:t.textFaint, border:`1px solid ${t.border}`, borderRadius:6,
                      padding:'4px 10px', textDecoration:'none', background:t.bgTag,
                    }}>
                      <ExternalLink size={10}/> {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Publications */}
          <div style={{ ...card, padding:32, background:t.bgCardAlt, backdropFilter:'blur(8px)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28, paddingBottom:16, borderBottom:`1px solid ${t.border}` }}>
              <BookOpen size={19} style={{ color:t.accent1 }}/>
              <h3 style={{ fontSize:16, fontWeight:600, color:t.text, margin:0, fontFamily:'monospace' }}>Conference Publications</h3>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
              {[
                {
                  bar:t.accent2,
                  title:'Modal Decomposition of Cavity SHG Fields using Spatial Light Modulator',
                  authors:<>G. Patil*, <span style={{color:t.accent2,fontWeight:500}}>H. Hajeri*</span>, S. P. Amrithraj, A. Prabhakar.</>,
                  venue:'International Conference on Electro-Optics and Photonics (EOP), Dehradun, India, 2026',
                  doi: LINKS.eop1,
                },
                {
                  bar:t.accent1,
                  title:'Spatial Photonic Ising Machine using Spatial Light Modulators',
                  authors:<><span style={{color:t.accent1,fontWeight:500}}>H. Hajeri*</span>, N. Vinod P.M., G. Patil, S. P. Amrithraj, A. Prabhakar.</>,
                  venue:'International Conference on Electro-Optics and Photonics (EOP), Dehradun, India, 2026',
                  doi: LINKS.eop2,
                },
              ].map(({ bar, title, authors, venue, doi }) => (
                <div key={title} style={{ paddingLeft:20, position:'relative' }}>
                  <div style={{ position:'absolute', left:0, top:4, bottom:0, width:3, background:bar, opacity:0.5, borderRadius:2 }}/>
                  <p style={{ fontWeight:600, color:t.text, marginBottom:4, fontSize:14, lineHeight:1.5 }}>{title}</p>
                  <p style={{ margin:'0 0 4px', fontSize:13, color:t.textMuted, fontWeight:300 }}>{authors}</p>
                  <p style={{ margin:'0 0 6px', fontSize:12, color:t.textFaint, fontStyle:'italic' }}>{venue}</p>
                  <a href={doi} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, fontFamily:'monospace', color:t.textFaint, border:`1px solid ${t.border}`, borderRadius:6, padding:'3px 8px', textDecoration:'none', background:t.bgTag }}>
                    <ExternalLink size={10}/> DOI / Paper
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS & HONORS ──────────────────────────────────────────────── */}
      <section id="skills" style={{ padding:'96px 28px', borderTop:`1px solid ${t.borderFaint}`, position:'relative' }}>
        <div style={{ position:'absolute', inset:0, background:t.bgSection, backdropFilter:'blur(10px)', zIndex:0 }}/>
        <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
          <SectionHeading icon={<TermIc size={22}/>}>⊗&nbsp;&nbsp;TensorProduct.Skills()</SectionHeading>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:48 }}>

            {/* Skills */}
            <div>
              {[
                { label:'Quantum Frameworks', items:['Qiskit','PennyLane','Strawberry Fields','Cirq'], color:t.accent1 },
                { label:'Programming', items:['Python','JavaScript (React)','MATLAB','LaTeX','C++'], color:t.accent2 },
                { label:'Hardware & Tools', items:['LabVIEW','Simulink','COMSOL','Fusion 360','Jupyter','Git/GitHub','IBM Quantum'], color:t.textFaint },
              ].map(({ label, items, color }) => (
                <div key={label} style={{ marginBottom:28 }}>
                  <h3 style={{ fontSize:11, fontFamily:'monospace', textTransform:'uppercase', letterSpacing:'0.1em', color:t.textFaint, marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${t.border}` }}>{label}</h3>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                    {items.map(s => (
                      <span key={s} style={{ padding:'5px 11px', fontSize:13, background:t.bgTag, color:t.textMuted, border:`1px solid ${t.border}`, borderRadius:7, fontWeight:400 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Honors + Teaching */}
            <div>
              {/* Teaching */}
              <div style={{ ...card, padding:22, marginBottom:18, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:t.accent1, opacity:0.7 }}/>
                <div style={{ fontSize:11, fontFamily:'monospace', textTransform:'uppercase', letterSpacing:'0.1em', color:t.textFaint, marginBottom:12 }}>Teaching Experience</div>
                <ul style={{ listStyle:'none', padding:0, margin:0, fontSize:13, color:t.textMuted, lineHeight:1.75, fontWeight:300 }}>
                  <li style={{ marginBottom:10 }}><strong style={{ color:t.text, fontWeight:500 }}>TA – Quantum Info &amp; Computation (BITS-F386)</strong><br/>Designed assignments for 50 students; built Qiskit course content and Jupyter tutorials. Jan–May 2024.</li>
                  <li><strong style={{ color:t.text, fontWeight:500 }}>Mentor – Quantum Computing &amp; Relativity</strong><br/>Guided 150+ students; developed Manim animations covering Grover's Algorithm. 2022–2023.</li>
                </ul>
              </div>

              {/* Awards */}
              <div style={{ ...card, padding:22, marginBottom:18, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:t.accent2, opacity:0.7 }}/>
                <div style={{ fontSize:11, fontFamily:'monospace', textTransform:'uppercase', letterSpacing:'0.1em', color:t.textFaint, marginBottom:12 }}>Awards &amp; Grants</div>
                <ul style={{ listStyle:'none', padding:0, margin:0, fontSize:13, color:t.textMuted, lineHeight:1.9, fontWeight:300 }}>
                  {[
                    ['Seed Fund Grant', 'INR 5,00,000 · PIEDS, BITS Pilani'],
                    ['Prof. Suresh Ramaswamy Award', 'INR 40,000'],
                    ['IBM Qiskit Fall Fest Mentor Badge', '2024'],
                  ].map(([title, sub]) => (
                    <li key={title} style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:6 }}>
                      <AwardIc size={12} style={{ color:t.accent2, flexShrink:0, marginTop:4 }}/>
                      <span><span style={{ color:t.text, fontWeight:500 }}>{title}</span> &nbsp;·&nbsp; {sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Extra */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                {['Steering Member · QIndia','Core Member · Nirmaan NGO','Mime Club · BITS Goa'].map(tag => (
                  <span key={tag} style={{ fontSize:11, fontFamily:'monospace', color:t.textFaint, border:`1px solid ${t.border}`, background:t.bgTag, padding:'4px 10px', borderRadius:6 }}>{tag}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ padding:'44px 28px', borderTop:`1px solid ${t.borderFaint}`, textAlign:'center', fontFamily:'monospace', fontSize:12, color:t.textFaint }}>
        <div style={{ display:'flex', justifyContent:'center', gap:20, marginBottom:20 }}>
          {[
            [LINKS.github, <Github size={16}/>],
            [LINKS.linkedin, <Linkedin size={16}/>],
            [`mailto:${LINKS.email}`, <Mail size={16}/>],
          ].map(([href, icon], i) => (
            <a key={i} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
               style={{ color:t.textFaint, transition:'color 0.2s' }}
               onMouseEnter={e=>e.currentTarget.style.color=t.accent1}
               onMouseLeave={e=>e.currentTarget.style.color=t.textFaint}>
              {icon}
            </a>
          ))}
        </div>
        <p style={{ margin:'0 0 6px', fontSize:13, color:t.textMuted }}>
          ⟨ψ| The universe is quantum. So is this portfolio. |ψ⟩
        </p>
        <p style={{ margin:0 }}>© {new Date().getFullYear()} Harshavardhan Hajeri · Built with React</p>
      </footer>

      {/* ── GLOBAL STYLES ────────────────────────────────────────────────── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes hh-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
        .hh-gradient {
          background: ${isDark
            ? 'linear-gradient(135deg,#8B5CF6,#2DD4BF)'
            : 'linear-gradient(135deg,#7C3AED,#0D9488)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }
        @media (min-width: 769px) {
          .hh-desktop { display: flex !important; }
          .hh-mobile  { display: none  !important; }
          .hh-timeline-line { display: block !important; }
          .hh-timeline-dot  { display: block !important; }
        }
        @media (max-width: 768px) {
          .hh-desktop { display: none  !important; }
          .hh-mobile  { display: flex  !important; }
          .hh-exp-label { width: 100% !important; text-align: left !important; padding-right: 0 !important; padding-bottom: 10px !important; }
        }
        a { transition: color 0.2s, opacity 0.2s; }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}