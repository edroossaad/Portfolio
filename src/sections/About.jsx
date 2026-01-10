"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Linkedin, Github, Mail, ArrowRight, Terminal, Cpu, Globe, Code2, Download } from "lucide-react";

// --- Helper: Infinite Marquee ---
const Marquee = ({ items }) => {
  return (
    <div className="relative flex w-full overflow-hidden select-none">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-neutral-950 z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-neutral-950 z-10"></div>
      <motion.div
        className="flex min-w-full gap-8 whitespace-nowrap py-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-neutral-600 font-mono text-xs uppercase tracking-[0.2em]">
            <span>{item}</span>
            <span className="text-[#00FFF5]">+</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- The 3D Card (Kept your existing code) ---
function TiltedProfileCard({ name, role, pictureUrl, socials }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 90 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = clientX - left - width / 2;
    const yPct = clientY - top - height / 2;
    x.set(xPct / 15);
    y.set(yPct / 15);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, (value) => value * -1);
  const rotateY = useTransform(mouseX, (value) => value);
  const glowX = useTransform(mouseX, [-15, 15], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-15, 15], ["0%", "100%"]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative h-[450px] w-full max-w-[380px] rounded-[2rem] bg-neutral-900 border border-neutral-800 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,245,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,245,0.1)_1px,transparent_1px)] bg-[size:2rem_2rem] [transform:perspective(500px)_rotateX(60deg)] animate-grid-scroll opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWgAAAAD0lEQVQYV2NkYGBgYIiKigIAGQQBZA3eE60AAAAASUVORK5CYII=')] opacity-10 mix-blend-overlay"></div>
        <motion.div
            style={{
                background: useMotionValue(`radial-gradient(400px circle at ${glowX.get()} ${glowY.get()}, rgba(0, 255, 245, 0.15), transparent 40%)`)
            }}
            className="absolute inset-0 transition-opacity duration-300"
        />
      </div>

      <div style={{ transform: "translateZ(70px)" }} className="relative flex flex-col items-center">
        <div className="relative mb-8 group">
            <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#00FFF5]/30 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -inset-1 rounded-full bg-[#00FFF5]/20 blur-md transition-all group-hover:bg-[#00FFF5]/40"></div>
            <img src={pictureUrl} alt={name} className="relative h-32 w-32 rounded-full border-2 border-neutral-700 bg-neutral-950 object-cover shadow-2xl" />
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#00FFF5] text-black shadow-lg border-2 border-neutral-900">
                <Code2 size={16} />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">{name}</h2>
        <p className="mb-6 text-base font-medium text-[#00FFF5] tracking-widest uppercase">{role}</p>
        <div className="mb-8 h-px w-16 bg-gradient-to-r from-transparent via-neutral-500 to-transparent"></div>
        <div className="flex space-x-4">
          {Object.entries(socials).map(([key, url]) => {
            const Icon = key === "linkedin" ? Linkedin : key === "github" ? Github : Mail;
            return (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{ transform: "translateZ(20px)" }} className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800/50 border border-neutral-700 text-neutral-400 transition-all duration-300 hover:bg-[#00FFF5] hover:text-black hover:border-transparent hover:shadow-[0_0_15px_rgba(0,255,245,0.5)]">
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Section ---
export default function AboutMeSection() {
  const marqueeItems = ["React", "Next.js", "System Design", "Node.js", "AWS", "UI/UX", "Performance", "Security"];

  return (
    <section className="bg-neutral-950 py-24 text-neutral-200 overflow-hidden relative">
      
      {/* Background Decor: Giant fading text in background */}
      <div className="absolute top-20 right-0 text-[12rem] font-bold text-neutral-900/50 pointer-events-none select-none overflow-hidden leading-none opacity-20">
        DEV
      </div>

      <div className="container mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT: 3D Card */}
          <div className="flex justify-center perspective-1000">
            <TiltedProfileCard
              name="Saad Edroos"
              role="Full-Stack Engineer"
              pictureUrl="/images/myPhoto.png" 
              socials={{
                linkedin: "https://linkedin.com",
                github: "https://github.com",
                email: "mailto:hello@saadedroos.com",
              }}
            />
          </div>

          {/* RIGHT: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 relative z-10"
          >
            {/* Header with Stats */}
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Code with <span className="text-[#00FFF5] drop-shadow-[0_0_10px_rgba(0,255,245,0.3)]">Purpose</span>
                </h2>
                <p className="font-mono text-sm text-[#00FFF5]/70">
                    &lt;system_status: online /&gt;
                </p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-lg text-neutral-400 leading-relaxed border-l-2 border-neutral-800 pl-6">
              <p>
                I am a passionate developer who bridges the gap between 
                <span className="text-white font-medium"> robust backend logic</span> and 
                <span className="text-white font-medium"> elegant frontend design</span>.
              </p>
              <p>
                With deep expertise in the React ecosystem, I don't just write code—I build digital products that are <span className="text-[#00FFF5]">fast</span>, <span className="text-[#00FFF5]">accessible</span>, and <span className="text-[#00FFF5]">scalable</span>.
              </p>
            </div>

            {/* Marquee Strip */}
            <div className="py-2">
                <Marquee items={marqueeItems} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-[#00FFF5] px-8 py-3 text-sm font-bold text-black shadow-lg shadow-[#00FFF5]/20 transition-all hover:bg-[#00e6dc] hover:scale-105 hover:shadow-[#00FFF5]/40"
              >
                View Selected Work
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              
              <a
                href="/resume.pdf"
                className="group inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-8 py-3 text-sm font-medium text-white transition-all hover:border-[#00FFF5] hover:text-[#00FFF5]"
              >
                Download CV
                <Download size={18} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}