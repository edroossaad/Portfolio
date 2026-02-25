import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUpRight, Download, Code2, Layers, Zap } from "lucide-react";

// ── Magnetic cursor spotlight ──────────────────────────────────────────────
const CursorSpotlight = () => {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.10), transparent 60%)`,
      }}
    />
  );
};

// ── Floating particles ─────────────────────────────────────────────────────
const Particles = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 14 + 10,
    delay: Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -60, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// ── Animated counter for stat chips ───────────────────────────────────────
const AnimatedStat = ({ value, label, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/8 bg-white/4 backdrop-blur-sm hover:border-indigo-400/40 hover:bg-white/8 transition-all duration-300 cursor-default"
  >
    <div className="p-2 rounded-xl bg-indigo-500/15">
      <Icon size={15} className="text-indigo-400" />
    </div>
    <div>
      <div className="text-white font-bold text-sm leading-none">{value}</div>
      <div className="text-white/40 text-xs mt-0.5">{label}</div>
    </div>
  </motion.div>
);

// ── Rotating text ring ─────────────────────────────────────────────────────
const RotatingRing = () => {
  const text = "FULL·STACK·DEVELOPER · SAAD·EDROOS · ";
  const chars = text.split("");
  const radius = 80;
  const total = chars.length;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-10px] flex items-center justify-center"
    >
      <svg width="220" height="220" className="absolute">
        {chars.map((char, i) => {
          const angle = (360 / total) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = 110 + radius * Math.cos(rad);
          const y = 110 + radius * Math.sin(rad);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="rgba(165,180,252,0.6)"
              fontSize="9"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              letterSpacing="0.05em"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
};

// ── Avatar circle with rotating ring ─────────────────────────────────────
const AvatarBlock = () => (
  <div className="relative w-[200px] h-[200px] flex items-center justify-center shrink-0">
    <RotatingRing />
    {/* Glow */}
    <div className="absolute w-[120px] h-[120px] rounded-full bg-indigo-500 blur-3xl opacity-25" />
    {/* Avatar */}
    <div className="relative z-10 w-[120px] h-[120px] rounded-full border-2 border-indigo-400/40 flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-sm overflow-hidden">
      <span className="text-5xl font-black text-white/90 select-none" style={{ fontFamily: "Inter, sans-serif" }}>S</span>
    </div>
  </div>
);

// ── Role text cycler ───────────────────────────────────────────────────────
const RoleCycler = () => {
  const roles = ["Full Stack Developer", "React Specialist", "Node.js Engineer", "Cloud Architect"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center"
          style={{
            background: "linear-gradient(90deg, #818cf8, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ── Main Hero ─────────────────────────────────────────────────────────────
const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const springY = useSpring(yContent, { stiffness: 80, damping: 20 });

  // Line reveal variants
  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: (i) => ({
      scaleX: 1,
      transition: { duration: 1.1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const wordVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.85, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #05061a 0%, #080b22 50%, #0d0a1f 100%)" }}
    >
      <CursorSpotlight />
      <Particles />

      {/* ── Noise grain overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── Gradient orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)" }}
      />

      {/* ── Horizontal rule lines (decorative) ── */}
      <div className="absolute left-0 right-0 top-[15%] pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="h-px mb-[340px] opacity-[0.06]"
            style={{ background: "linear-gradient(90deg, transparent, #818cf8, transparent)" }}
          />
        ))}
      </div>

      {/* ── Vertical accent line ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-[220px] origin-top pointer-events-none hidden lg:block"
        style={{ background: "linear-gradient(180deg, transparent, #818cf8, transparent)" }}
      />

      {/* ── Number label ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-white/20 text-[9px] tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 font-mono">
          01 / HERO
        </span>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: springY, opacity: opacityContent }}
        className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10 pt-24 pb-16"
      >
        {/* TOP ROW: Avatar + Role badge */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-12">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6"
          >
            <AvatarBlock />
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 mb-3"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">Open to Work</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 text-sm font-mono"
              >
                saadedroos.dev
              </motion.p>
            </div>
          </motion.div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 lg:justify-end"
          >
            {[
              { value: "3+ yrs", label: "Experience", icon: Zap },
              { value: "20+", label: "Projects", icon: Layers },
              { value: "React+", label: "Tech Stack", icon: Code2 },
            ].map((stat, i) => (
              <AnimatedStat key={i} {...stat} />
            ))}
          </motion.div>
        </div>

        {/* ── BIG HEADLINE ── */}
        <div className="overflow-hidden mb-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {["Crafting", "Digital"].map((word, i) => (
              <motion.span
                key={word}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="block text-white font-black leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.04em",
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Second headline row with gradient */}
        <div className="overflow-hidden mb-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 items-end">
            {["Experiences"].map((word, i) => (
              <motion.span
                key={word}
                custom={i + 2}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="block font-black leading-none"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 9rem)",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </motion.span>
            ))}
            {/* Outlined ghost text */}
            <motion.span
              custom={4}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="block font-black leading-none hidden lg:block"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "-0.04em",
                WebkitTextStroke: "1.5px rgba(255,255,255,0.12)",
                color: "transparent",
              }}
            >
              &amp; Code
            </motion.span>
          </div>
        </div>

        {/* ── BOTTOM ROW: role cycler + description + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between"
        >
          {/* Left: role + description */}
          <div className="max-w-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-indigo-400/60" />
              <span className="text-white/40 text-sm font-mono uppercase tracking-widest">Currently</span>
            </div>
            <RoleCycler />
            <p className="text-white/40 text-base leading-relaxed">
              Building scalable, pixel-perfect web applications with modern technologies. 
              Turning complex problems into elegant, performant solutions.
            </p>

            {/* Socials */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2 text-white/30 hover:text-white/80 transition-all duration-300"
                >
                  <div className="p-2 rounded-xl border border-white/8 group-hover:border-indigo-400/40 group-hover:bg-indigo-400/10 transition-all duration-300">
                    <Icon size={16} />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 0 30px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              <span>View Projects</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>

            <motion.a
              href="/cv.pdf"
              download
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white/70 border border-white/10 hover:border-indigo-400/40 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <Download size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Download CV</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
      >
        <span className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-mono">Scroll</span>
        <div className="w-px h-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-400 to-transparent"
            style={{ height: "100%", animation: "scrollLine 1.8s ease-in-out infinite" }}
          />
        </div>
      </motion.div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;