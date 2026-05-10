import re

with open("src/App.jsx", "r", encoding="utf-8") as f:
    text = f.read()

# 1. Add isMobile to Portfolio
target_port = """function Portfolio() {
  const { isDark, toggleTheme, T } = useContext(ThemeContext);

  const [navVisible, setNavVisible] = useState(false);
"""
repl_port = """function Portfolio() {
  const { isDark, toggleTheme, T } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 850px)");

  const [navVisible, setNavVisible] = useState(false);
"""
text = text.replace(target_port, repl_port)

# 2. Hero photo + identity container vertical mapping
target_flex = """
          {/* photo + identity */}
          <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
"""
repl_flex = """
          {/* photo + identity */}
          <div style={{ 
             display: "flex", alignItems: "center", 
             flexDirection: isMobile ? "column" : "row", 
             gap: isMobile ? 32 : 48,
             textAlign: isMobile ? "center" : "left"
          }}>
"""
text = text.replace(target_flex, repl_flex)

# 3. MiniTerminal scrollIntoView bug fix
target_term = """
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);
"""
repl_term = """
  const endRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }
    // "nearest" ensures we only scroll the tiny window if needed, minimizing page jolts
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [lines]);
"""
text = text.replace(target_term, repl_term)

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(text)

print("Hero fixes applied via patch!")
