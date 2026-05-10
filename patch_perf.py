import re

# 1. Update index.html
with open("index.html", "r", encoding="utf-8") as f:
    idx = f.read()

target_fonts = '<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">'
repl_fonts = '<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">'
idx = idx.replace(target_fonts, repl_fonts)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(idx)

# 2. Update App.jsx
with open("src/App.jsx", "r", encoding="utf-8") as f:
    app = f.read()

# A: Replace image import
app = app.replace('import heroPhoto from "./assets/pict.jpg";', 'import heroPhoto from "./assets/pict.webp";')

# B: Remove inline font injection from Portfolio
target_inline_font = '<link href="https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />'
app = app.replace(target_inline_font, '')

# C: Disable InteractiveBackgroundGraphs on mobile.
# We will just patch the component InteractiveBackgroundGraphs itself to return null if isMobile is true!
target_ibg = """function InteractiveBackgroundGraphs() {
  const { isDark, T } = useContext(ThemeContext);"""

repl_ibg = """function InteractiveBackgroundGraphs() {
  const { isDark, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  if (isMobile) return null; // Save CPU on mobile!"""
app = app.replace(target_ibg, repl_ibg)

# D: Disable PhaseSpaceBackground on mobile to save CPU
target_psb = """function PhaseSpaceBackground() {
  const { isDark } = useContext(ThemeContext);"""
repl_psb = """function PhaseSpaceBackground() {
  const { isDark } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");
  if (isMobile) return null; // Save CPU on mobile!"""
app = app.replace(target_psb, repl_psb)

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(app)

print("Performance patch applied!")
