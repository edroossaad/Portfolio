import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lottie from "lottie-react";
import { Github, Linkedin, Twitter, ArrowRight, Download } from "lucide-react";
import animationData from "../assets/Animation.json";

// --- Custom "ReactBits" Style Text Component ---
const DecryptedText = ({ text, className = "" }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval = null;
    let iteration = 0;

    const animate = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    // Run on mount
    animate();

    // Re-run on hover if desired
    if (isHovered) {
      iteration = 0;
      animate();
    }

    return () => clearInterval(interval);
  }, [text, isHovered]);

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
};

// --- Background Grid Component ---
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Grid Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FFF51a_1px,transparent_1px),linear-gradient(to_bottom,#00FFF51a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    {/* Top Glow */}
    <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#00FFF5]/10 to-transparent blur-3xl" />
  </div>
);

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-[#0A0F1F]"
    >
      <BackgroundGrid />

      <motion.div
        style={{ opacity, y }}
        className="container mx-auto max-w-7xl relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* --- LEFT CONTENT --- */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FFF5]/10 border border-[#00FFF5]/20 text-[#00FFF5] text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFF5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FFF5]"></span>
              </span>
              Available for Work
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl md:text-2xl font-light text-gray-400"
              >
                Hello, I'm
              </motion.h2>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                <DecryptedText text="SAAD EDROOS" className="text-[#00FFF5]" />
              </h1>
              
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl md:text-4xl font-semibold text-gray-300"
              >
                Full Stack Developer
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Crafting modern web experiences with React, Node.js, and cloud
              technologies. Building scalable applications with pixel-perfect
              intuitive interfaces.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <button className="group relative px-8 py-3 bg-[#00FFF5] text-black font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,255,245,0.4)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  View Projects <ArrowRight size={18} />
                </span>
              </button>

              <button className="px-8 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-[#00FFF5] hover:text-[#00FFF5] transition-colors flex items-center justify-center gap-2">
                Download CV <Download size={18} />
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-6 justify-center lg:justify-start items-center pt-4"
            >
              {[
                { icon: Github, href: "https://github.com" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#00FFF5] hover:scale-110 transition-all duration-300"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* --- RIGHT CONTENT (Lottie) --- */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            {/* Background Glow behind animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00FFF5] rounded-full filter blur-[100px] opacity-20 animate-pulse" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative z-10 w-full max-w-[500px]"
            >
              {/* Floating Animation for the Lottie Container */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Lottie
                  animationData={animationData}
                  loop={true}
                  className="w-full h-full drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;