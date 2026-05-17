import fs from 'fs';

// 1. Fix HeroPicture.jsx alt text
let hero = fs.readFileSync('src/components/hero/HeroPicture.jsx', 'utf8');
hero = hero.replace('alt="Harshavardhan Hajeri"', 'alt="Harshavardhan Hajeri, M.Sc. Physics and B.E. Mechanical Engineering student"');
fs.writeFileSync('src/components/hero/HeroPicture.jsx', hero);

// 2. Fix AboutSection.jsx GitHub placeholder
let about = fs.readFileSync('src/components/sections/AboutSection.jsx', 'utf8');
about = about.replace(
    '{ label: "GitHub ↗", href: "https://github.com", note: "open source" },',
    '{ label: "GitHub ↗", href: "https://github.com/harsha-helix", note: "open source" },'
);
about = about.replace(
    '{ label: "LinkedIn ↗", href: "#", note: "connect" },',
    ''
);
about = about.replace(
    'href: "mailto:f20212402@goa.bits-pilani.ac.in", note: "f20212402@goa.bits-pilani.ac.in"',
    'href: "mailto:f20212402@goa.bits-pilani.ac.in", note: "contact"'
);
fs.writeFileSync('src/components/sections/AboutSection.jsx', about);

// 3. Fix ConceptField logic in App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace('{!isMobile && <ConceptField />}', '<ConceptField />');
fs.writeFileSync('src/App.jsx', app);

// 4. Update ConceptField.jsx to render static grid for mobile
let concept = fs.readFileSync('src/components/sections/ConceptField.jsx', 'utf8');
const replacement = `        {isMobile ? (
          <div style={{
            position: "relative", background: T.bg2,
            border: \`0.5px solid \${T.border}\`, borderRadius: 14, overflow: "hidden", padding: "32px 24px"
          }}>
            <DotGrid opacity={0.12} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {GRAPH_NODES.map(n => (
                <span key={n.id} style={{ fontFamily: MONO, fontSize: 11, color: T.text, padding: "6px 12px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", borderRadius: 6, border: \`0.5px solid \${T.border}\`}}>
                  {n.id}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            position: "relative", height: 520, background: T.bg2,
            border: \`0.5px solid \${T.border}\`, borderRadius: 14, overflow: "hidden"
          }}>`;

concept = concept.replace(
    `<div style={{
          position: "relative", height: isMobile ? 800 : 520, background: T.bg2,
          border: \`0.5px solid \${T.border}\`, borderRadius: 14, overflow: "hidden"
        }}>`, replacement);

concept = concept.replace(
    `drifting
          </div>
        </div>`,
    `drifting
          </div>
        </div>
        )}`);

fs.writeFileSync('src/components/sections/ConceptField.jsx', concept);
