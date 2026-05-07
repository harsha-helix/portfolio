import React, { useState, useEffect, useRef } from 'react';
import myPhoto from './assets/pict.jpg'; // Adjust path if necessary

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
  photo:     myPhoto, // Local import; replace with URL if hosting elsewhere
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
    <div style={{ minHeight:'100vh', background:t.bg, color:t.text, position:'relative', transition:'background 0.35s,color 0.35s' }}>

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