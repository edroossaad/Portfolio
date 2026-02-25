import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ExternalLink, ChevronUp, ChevronDown, Volume2, VolumeX } from "lucide-react";

/* ─── Project Data ────────────────────────────────────────────────────── */
const projects = [
    {
        id: 1,
        title: "ZenFrame",
        subtitle: "Digital Agency Website",
        description:
            "A sleek, modern agency website with dynamic animations, immersive video backgrounds, and premium micro-interactions built for impact.",
        url: "https://zen-frame.vercel.app/",
        tags: ["React", "GSAP", "Tailwind CSS", "Vite"],
        accentColor: "#818cf8",
        category: "Agency",
        thumbnail: "/images/zenframe.jpg",
    },
    {
        id: 2,
        title: "Ahmed Al Maghribi",
        subtitle: "Full-Stack E-Commerce",
        description:
            "A complete e-commerce platform for a luxury perfume brand — featuring product catalogs, cart, checkout, and a bilingual Arabic/English experience.",
        url: "https://ae.ahmedalmaghribi.com/en",
        tags: ["Next.js", "Laravel", "MySQL", "Tailwind CSS"],
        accentColor: "#f59e0b",
        category: "E-Commerce",
        thumbnail: "/images/ahmedwebsite.jpg",
    },
    {
        id: 3,
        title: "K-Series 2025",
        subtitle: "Product Landing Page",
        description:
            "A high-impact landing page for the K-Series perfume collection — featuring cinematic visuals, scroll-driven reveals, and a luxury aesthetic.",
        url: "https://ae.ahmedalmaghribi.com/en/k-series/2025",
        tags: ["Next.js", "GSAP", "Framer Motion", "Tailwind CSS"],
        accentColor: "#14b8a6",
        category: "Landing Page",
        thumbnail: "/images/kseries2.png",
    },
    {
        id: 4,
        title: "Stellar Stays",
        subtitle: "Villa Showcase Website",
        description:
            "A premium villa showcase and property listing website — with elegant galleries, booking flows, and an immersive browsing experience.",
        url: "https://stellarstays.in/",
        tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        accentColor: "#f472b6",
        category: "Real Estate",
        thumbnail: "/images/stellarstays.jpg",
    },
];

/* ─── CRT Scanlines Overlay ───────────────────────────────────────────── */
const Scanlines = () => (
    <div
        className="pointer-events-none absolute inset-0 z-30"
        style={{
            background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.15) 2px,
                rgba(0, 0, 0, 0.15) 4px
            )`,
        }}
    />
);

/* ─── Static Noise Overlay (during channel flip) ──────────────────────── */
const StaticNoise = () => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const w = 200;
        const h = 150;
        canvas.width = w;
        canvas.height = h;

        const draw = () => {
            const imageData = ctx.createImageData(w, h);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const v = Math.random() * 255;
                data[i] = v;
                data[i + 1] = v;
                data[i + 2] = v;
                data[i + 3] = 200;
            }
            ctx.putImageData(imageData, 0, 0);
            animRef.current = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-20"
            style={{ imageRendering: "pixelated" }}
        />
    );
};

/* ─── Glitch Text Effect ──────────────────────────────────────────────── */
const GlitchText = ({ children, className = "" }) => (
    <span className={`relative inline-block ${className}`}>
        <span className="relative z-10">{children}</span>
        <span
            className="absolute top-0 left-0 z-0 opacity-70"
            style={{
                color: "#ff0040",
                clipPath: "inset(10% 0 60% 0)",
                transform: "translate(-2px, -1px)",
            }}
            aria-hidden
        >
            {children}
        </span>
        <span
            className="absolute top-0 left-0 z-0 opacity-70"
            style={{
                color: "#00ffff",
                clipPath: "inset(50% 0 20% 0)",
                transform: "translate(2px, 1px)",
            }}
            aria-hidden
        >
            {children}
        </span>
    </span>
);

/* ─── Floating particles ──────────────────────────────────────────────── */
const Particles = () => {
    const dots = Array.from({ length: 12 }, (_, i) => ({
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
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
};

/* ─── Section heading word reveal ─────────────────────────────────────── */
const wordReveal = {
    hidden: { y: 60, opacity: 0 },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Channel Content ─────────────────────────────────────────────────── */
const ChannelContent = ({ project }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="absolute inset-0 flex flex-col sm:flex-row"
    >
        {/* Left: Screenshot */}
        <div className="relative w-full sm:w-[50%] h-[45%] sm:h-full overflow-hidden flex-shrink-0">
            <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover object-top"
            />
            {/* Edge fade into content */}
            <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-full sm:w-32 sm:top-0 sm:left-auto sm:right-0 sm:bottom-auto bg-gradient-to-t sm:bg-gradient-to-l from-[#0a0a0a] to-transparent" />

            {/* VHS timestamp */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 font-mono text-[10px] text-white/40 tracking-wider">
                <span className="bg-black/40 px-1.5 py-0.5 rounded">
                    REC ● {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase()}
                </span>
            </div>
        </div>

        {/* Right: Content */}
        <div className="flex-grow flex flex-col justify-between px-5 py-4 sm:px-8 sm:py-6 overflow-hidden">
            {/* Category */}
            <div>
                <span
                    className="inline-flex items-center px-3 py-1 rounded text-[10px] font-bold tracking-widest uppercase border mb-3 font-mono"
                    style={{
                        background: `${project.accentColor}12`,
                        borderColor: `${project.accentColor}30`,
                        color: project.accentColor,
                    }}
                >
                    {project.category}
                </span>

                <h3 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl leading-tight tracking-tight mb-1">
                    {project.title}
                </h3>
                <p
                    className="text-xs sm:text-sm font-semibold tracking-wide mb-3"
                    style={{
                        background: `linear-gradient(90deg, ${project.accentColor}, ${project.accentColor}88)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    {project.subtitle}
                </p>
            </div>

            <p className="text-white/35 text-[13px] sm:text-sm leading-relaxed mb-4">
                {project.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono font-semibold tracking-wider uppercase border border-white/[0.08] bg-white/[0.03] text-white/30"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Visit CTA */}
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-bold text-sm text-white/60 border border-white/[0.08] bg-white/[0.04] hover:border-indigo-400/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300 font-mono"
            >
                <ExternalLink size={14} />
                <span>VISIT LIVE SITE</span>
                <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
            </a>
        </div>
    </motion.div>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MAIN COMPONENT — TV Channel Flip
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function WorkSection() {
    const [channel, setChannel] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [showChannelBadge, setShowChannelBadge] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const badgeTimeout = useRef(null);

    const flipToChannel = useCallback(
        (newChannel) => {
            if (isFlipping || newChannel === channel) return;
            setIsFlipping(true);

            // Show channel badge
            setShowChannelBadge(true);
            if (badgeTimeout.current) clearTimeout(badgeTimeout.current);

            // After the static plays, switch channel
            setTimeout(() => {
                setChannel(newChannel);
                setIsFlipping(false);

                // Hide badge after a bit
                badgeTimeout.current = setTimeout(() => setShowChannelBadge(false), 1800);
            }, 400);
        },
        [isFlipping, channel]
    );

    const nextChannel = useCallback(() => {
        flipToChannel((channel + 1) % projects.length);
    }, [channel, flipToChannel]);

    const prevChannel = useCallback(() => {
        flipToChannel((channel - 1 + projects.length) % projects.length);
    }, [channel, flipToChannel]);

    // Autoplay — flip every 2 seconds, pause on hover or during flip
    useEffect(() => {
        if (isHovered || isFlipping) return;
        const timer = setInterval(() => {
            flipToChannel((channel + 1) % projects.length);
        }, 2000);
        return () => clearInterval(timer);
    }, [channel, isHovered, isFlipping, flipToChannel]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowRight") nextChannel();
            if (e.key === "ArrowDown" || e.key === "ArrowLeft") prevChannel();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [nextChannel, prevChannel]);

    const currentProject = projects[channel];

    return (
        <section
            id="work"
            className="relative overflow-hidden py-24 lg:py-32"
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
                key={currentProject.id + "-orb"}
                animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${currentProject.accentColor}30 0%, transparent 70%)` }}
            />
            <motion.div
                animate={{ scale: [1.15, 1, 1.15], opacity: [0.08, 0.18, 0.08] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                className="absolute -bottom-40 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)" }}
            />

            {/* ── Section number label ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute left-3 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1 pointer-events-none z-30"
            >
                <span className="text-white/20 text-[9px] tracking-[0.2em] [writing-mode:vertical-rl] rotate-180 font-mono">
                    03 / WORK
                </span>
            </motion.div>

            {/* ── Content ── */}
            <div className="container mx-auto max-w-7xl px-6 lg:px-12 relative z-10">

                {/* ── Header ── */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
                    <div className="max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                            className="flex items-center gap-3 mb-4"
                        >
                            <div className="w-8 h-px bg-indigo-400/60" />
                            <span className="text-white/35 text-sm font-mono uppercase tracking-widest">
                                Selected Projects
                            </span>
                        </motion.div>

                        <div className="overflow-hidden mb-4">
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                                {["My", "Work"].map((word, i) => (
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
                                        {word === "Work" ? (
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

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35, duration: 0.7 }}
                            className="text-white/35 text-[15px] sm:text-base leading-relaxed"
                        >
                            Flip through the channels to explore my projects.
                        </motion.p>
                    </div>
                </div>

                {/* ── TV Screen ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center"
                >
                    <div className="relative w-full max-w-[900px]">

                        {/* TV body/bezel */}
                        <div
                            className="relative rounded-2xl overflow-hidden"
                            style={{
                                background: "linear-gradient(145deg, #1a1a2e 0%, #0f0f1a 100%)",
                                boxShadow: `
                                    0 0 0 1px rgba(255,255,255,0.06),
                                    0 0 0 3px rgba(10,10,20,0.8),
                                    0 0 0 4px rgba(255,255,255,0.03),
                                    0 30px 80px -20px rgba(0,0,0,0.7),
                                    0 0 60px ${currentProject.accentColor}10
                                `,
                            }}
                        >
                            {/* Top bezel with brand */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04]">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                                    <span className="text-white/20 text-[10px] font-mono tracking-[0.3em] uppercase">
                                        Portfolio TV
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-white/15 text-[10px] font-mono">
                                    <span>SIGNAL: LIVE</span>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="rounded-sm"
                                                style={{
                                                    width: 3,
                                                    height: i * 3 + 4,
                                                    background: i <= 3 ? `${currentProject.accentColor}60` : "rgba(255,255,255,0.1)",
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Screen area */}
                            <div
                                className="relative overflow-hidden"
                                style={{
                                    height: "min(460px, 65vw)",
                                    // CRT screen curvature effect
                                    boxShadow: "inset 0 0 80px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)",
                                    background: "#0a0a0a",
                                }}
                            >
                                {/* CRT vignette */}
                                <div
                                    className="absolute inset-0 z-40 pointer-events-none"
                                    style={{
                                        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
                                    }}
                                />

                                {/* Scanlines */}
                                <Scanlines />

                                {/* Screen flicker */}
                                <motion.div
                                    className="absolute inset-0 z-25 pointer-events-none bg-white"
                                    animate={{ opacity: [0, 0.01, 0, 0.005, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Static noise during flip */}
                                <AnimatePresence>
                                    {isFlipping && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 0.8, 1, 0.6] }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                            className="absolute inset-0 z-50"
                                        >
                                            <StaticNoise />
                                            {/* Horizontal offset bars */}
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute left-0 right-0 bg-white/10"
                                                    style={{
                                                        height: Math.random() * 4 + 2,
                                                        top: `${20 + i * 25 + Math.random() * 10}%`,
                                                    }}
                                                    animate={{ x: [-20, 20, -10, 0] }}
                                                    transition={{ duration: 0.2, ease: "linear" }}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* ── Channel Content ── */}
                                <AnimatePresence mode="wait">
                                    <ChannelContent key={channel} project={currentProject} />
                                </AnimatePresence>

                                {/* ── Channel Number Badge (top-right, like old TVs) ── */}
                                <AnimatePresence>
                                    {showChannelBadge && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 1.2 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-4 right-4 z-50 font-mono"
                                        >
                                            <div className="bg-black/70 border border-white/10 rounded px-3 py-1.5 backdrop-blur-sm">
                                                <div className="text-white/40 text-[8px] tracking-[0.2em] uppercase mb-0.5">
                                                    CH
                                                </div>
                                                <div
                                                    className="text-3xl font-black leading-none tabular-nums"
                                                    style={{ color: currentProject.accentColor }}
                                                >
                                                    {String(channel + 1).padStart(2, "0")}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Bottom control bar */}
                            <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.04]">
                                {/* Channel dots */}
                                <div className="flex items-center gap-2">
                                    {projects.map((p, i) => (
                                        <button
                                            key={p.id}
                                            onClick={() => flipToChannel(i)}
                                            className="relative group"
                                        >
                                            <motion.div
                                                className="rounded-full transition-all duration-300"
                                                animate={{
                                                    width: channel === i ? 24 : 8,
                                                    height: 8,
                                                    opacity: channel === i ? 1 : 0.3,
                                                }}
                                                style={{
                                                    background:
                                                        channel === i
                                                            ? `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}88)`
                                                            : "rgba(255,255,255,0.3)",
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* Channel info */}
                                <div className="hidden sm:flex items-center gap-4 text-white/20 text-[10px] font-mono tracking-wider">
                                    <span>
                                        CH {String(channel + 1).padStart(2, "0")}/{String(projects.length).padStart(2, "0")}
                                    </span>
                                    <span className="text-white/10">|</span>
                                    <span style={{ color: `${currentProject.accentColor}80` }}>
                                        {currentProject.category.toUpperCase()}
                                    </span>
                                </div>

                                {/* Channel buttons */}
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={prevChannel}
                                        className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-200 text-white/30 hover:text-white/70 active:scale-95"
                                    >
                                        <ChevronUp size={14} />
                                    </button>
                                    <button
                                        onClick={nextChannel}
                                        className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-200 text-white/30 hover:text-white/70 active:scale-95"
                                    >
                                        <ChevronDown size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* TV stand / shadow */}
                        <div className="flex justify-center mt-1">
                            <div
                                className="h-4 rounded-b-xl"
                                style={{
                                    width: "30%",
                                    background: "linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                                }}
                            />
                        </div>
                        <div className="flex justify-center">
                            <div
                                className="h-2 rounded-b-lg"
                                style={{
                                    width: "50%",
                                    background: "linear-gradient(180deg, rgba(255,255,255,0.03), transparent)",
                                }}
                            />
                        </div>

                        {/* Keyboard hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            className="flex justify-center mt-6"
                        >
                            <div className="flex items-center gap-3 text-white/15 text-[10px] font-mono">
                                <div className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-[9px]">▲</kbd>
                                    <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-[9px]">▼</kbd>
                                </div>
                                <span>or click to change channel</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
