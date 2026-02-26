
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  Download,
  Code2,
  Zap,
} from "lucide-react";

/* ─── Floating particles (ambient atmosphere) ─────────────────────────── */
const Particles = () => {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    dur: Math.random() * 16 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-indigo-400/25"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          animate={{ y: [0, -50, 0], opacity: [0.1, 0.45, 0.1] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

/* ─── Infinite Marquee ────────────────────────────────────────────────── */
const Marquee = ({ items }) => (
  <div className="relative flex w-full overflow-hidden select-none">
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080b22] z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080b22] z-10" />
    <motion.div
      className="flex min-w-full gap-6 whitespace-nowrap py-4"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
    >
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/8 bg-white/[0.03] text-white/50 text-xs font-semibold tracking-widest uppercase backdrop-blur-sm"
        >
          {item}
        </span>
      ))}
    </motion.div>
  </div>
);

/* ─── Stat chip ───────────────────────────────────────────────────────── */
const StatChip = ({ value, label, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm hover:border-indigo-400/40 hover:bg-white/[0.07] transition-all duration-300 cursor-default group"
  >
    <div className="p-2 rounded-xl bg-indigo-500/15 group-hover:bg-indigo-500/25 transition-colors">
      <Icon size={16} className="text-indigo-400" />
    </div>
    <div>
      <div className="text-white font-bold text-sm leading-none">{value}</div>
      <div className="text-white/35 text-[11px] mt-0.5 font-medium">{label}</div>
    </div>
  </motion.div>
);

/* ─── Rotating text ring ──────────────────────────────────────────────── */
const RotatingRing = ({ diameter = 320 }) => {
  const text = "SAAD EDROOS · FULL-STACK DEVELOPER · CREATIVE CODER · ";
  const chars = text.split("");
  const radius = diameter / 2 - 14;

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <svg width={diameter} height={diameter} className="absolute">
        {chars.map((char, i) => {
          const angle = (360 / chars.length) * i - 90;
          const rad = (angle * Math.PI) / 180;
          const x = diameter / 2 + radius * Math.cos(rad);
          const y = diameter / 2 + radius * Math.sin(rad);
          return (
            <text
              key={i}
              x={x}
              y={y}
              fill="rgba(165,180,252,0.45)"
              fontSize="9"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              letterSpacing="0.06em"
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

/* ─── Photo card with 3D tilt ─────────────────────────────────────────── */
const PhotoCard = ({ src, name }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 300, damping: 60 });
  const my = useSpring(y, { stiffness: 300, damping: 60 });

  const rotX = useTransform(my, (v) => v * -0.6);
  const rotY = useTransform(mx, (v) => v * 0.6);

  const onMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left - width / 2) / 12);
    y.set((clientY - top - height / 2) / 12);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
    >
      {/* Rotating text ring around the card */}
      <div className="absolute" style={{ width: 420, height: 420 }}>
        <RotatingRing diameter={420} />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-30"
        style={{ background: "radial-gradient(circle, #6366f1 0%, #a855f7 60%, transparent 100%)" }}
      />

      {/* The photo container */}
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-[280px] h-[340px] rounded-3xl overflow-hidden cursor-default group"
      >
        {/* Gradient border effect */}
        <div
          className="absolute -inset-[2px] rounded-3xl z-0"
          style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f472b6 100%)" }}
        />

        {/* Inner card */}
        <div className="absolute inset-[2px] rounded-[22px] overflow-hidden z-10 bg-[#0d0a1f]">
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080b22] via-transparent to-transparent opacity-70" />

          {/* Hover shimmer */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-500" />
        </div>

        {/* Name label bottom-left */}
        <div
          className="absolute bottom-5 left-5 z-20"
          style={{ transform: "translateZ(40px)" }}
        >
          <p className="text-white font-bold text-lg leading-none tracking-tight">{name}</p>
          <p
            className="text-sm font-semibold mt-1 tracking-wide"
            style={{
              background: "linear-gradient(90deg, #818cf8, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Full-Stack Developer
          </p>
        </div>
      </motion.div>

      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -bottom-4 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-400/30 bg-[#0d0f1a]/90 backdrop-blur-md shadow-lg"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
          Available for Work
        </span>
      </motion.div>
    </motion.div>
  );
};

/* ─── Section heading animation ───────────────────────────────────────── */
const wordReveal = {
  hidden: { y: 60, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function AboutMeSection() {
  const marqueeItems = [
    "React", "Next.js", "Node.js", "TypeScript", "AWS",
    "System Design", "UI/UX", "Performance", "MongoDB", "GraphQL",
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ background: "linear-gradient(180deg, #080b22 0%, #05061a 50%, #080b22 100%)" }}
    >
      <Particles />

      {/* ── Noise grain ── */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── Gradient orbs ── */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)" }}
      />

      {/* ── Horizontal rule lines ── */}
      <div className="absolute left-0 right-0 top-[18%] pointer-events-none">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-px mb-[420px] opacity-[0.06] origin-left"
            style={{ background: "linear-gradient(90deg, transparent, #818cf8, transparent)" }}
          />
        ))}
      </div>

      {/* ── Section number label ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1 pointer-events-none z-30"
      >
        <span className="text-white/20 text-[9px] tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 font-mono">
          02 / ABOUT
        </span>
      </motion.div>

      {/* ── Content grid ── */}
      <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10">
        <div className="grid gap-16 lg:gap-20 lg:grid-cols-[auto_1fr] items-center">

          {/* ── LEFT: Photo card ── */}
          <div className="flex justify-center lg:justify-start">
            <PhotoCard src="/images/myPhoto.png" name="Saad Edroos" />
          </div>

          {/* ── RIGHT: Content ── */}
          <div className="space-y-8">

            {/* Headline */}
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {["About", "Me"].map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={wordReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="block text-white font-black leading-none"
                    style={{
                      fontSize: "clamp(2.5rem, 6vw, 5rem)",
                      fontFamily: "Inter, sans-serif",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {word === "Me" ? (
                      <span
                        style={{
                          background: "linear-gradient(90deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-px bg-indigo-400/60" />
              <span className="text-white/35 text-sm font-mono uppercase tracking-widest">
                &lt;developer /&gt;
              </span>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="space-y-4 text-[15px] sm:text-base text-white/45 leading-relaxed max-w-lg"
            >
              <p>
                I'm a passionate developer who bridges the gap between{" "}
                <span className="text-white/80 font-medium">robust backend logic</span> and{" "}
                <span className="text-white/80 font-medium">elegant frontend design</span>.
              </p>
              <p>
                With deep expertise in the React ecosystem, I don't just write code — I build
                digital products that are{" "}
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #818cf8, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  fast
                </span>
                ,{" "}
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #818cf8, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  accessible
                </span>
                , and{" "}
                <span
                  className="font-semibold"
                  style={{
                    background: "linear-gradient(90deg, #818cf8, #c084fc)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  scalable
                </span>
                .
              </p>
            </motion.div>

            {/* Stat chips */}
            <div className="flex flex-wrap gap-3">
              <StatChip value="3+ yrs" label="Experience" icon={Zap} delay={0.2} />
              {/* <StatChip value="20+" label="Projects" icon={Layers} delay={0.35} /> */}
              <StatChip value="React+" label="Tech Stack" icon={Code2} delay={0.5} />
            </div>

            {/* Marquee */}
            <div className="py-1">
              <Marquee items={marqueeItems} />
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                <span>View Projects</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm text-white/60 border border-white/10 hover:border-indigo-400/40 hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                <Download
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Socials row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex gap-3 pt-2"
            >
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@saadedroos.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex items-center gap-2 text-white/25 hover:text-white/80 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-xl border border-white/8 group-hover:border-indigo-400/40 group-hover:bg-indigo-400/10 transition-all duration-300">
                    <Icon size={16} />
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}