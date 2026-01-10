import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Icons
import { FaReact, FaLaravel, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiGreensock, 
  SiCloudways, 
  SiNetlify, 
  SiVercel, 
  SiPostman 
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// Note: We use "group-hover:text-..." to ensure the color only appears on hover.
const skills = [
  { name: "JavaScript", icon: <SiJavascript />, color: "group-hover:text-yellow-400" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "group-hover:text-white" },
  { name: "React", icon: <FaReact />, color: "group-hover:text-cyan-400" },
  { name: "Laravel", icon: <FaLaravel />, color: "group-hover:text-red-600" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "group-hover:text-cyan-300" },
  { name: "HTML5", icon: <FaHtml5 />, color: "group-hover:text-orange-600" },
  { name: "CSS3", icon: <FaCss3Alt />, color: "group-hover:text-blue-500" },
  { name: "Node.js", icon: <FaNodeJs />, color: "group-hover:text-green-500" },
  { name: "GSAP", icon: <SiGreensock />, color: "group-hover:text-green-400" },
  { name: "Git", icon: <FaGitAlt />, color: "group-hover:text-orange-500" },
  { name: "Vercel", icon: <SiVercel />, color: "group-hover:text-white" },
  { name: "Netlify", icon: <SiNetlify />, color: "group-hover:text-teal-400" },
  { name: "Cloudways", icon: <SiCloudways />, color: "group-hover:text-indigo-400" },
  { name: "Postman", icon: <SiPostman />, color: "group-hover:text-orange-500" },
];

const SpotlightTile = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

function Skills() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      // Grid Animation
      gsap.from(".skill-tile", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-neutral-950 py-24" ref={containerRef}>
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div ref={headerRef} className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Technologies
          </h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-indigo-500"></div>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            A curated stack of tools for building scalable, high-performance applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              // 'group' is essential here to trigger the hover effect on children
              className="skill-tile aspect-square group cursor-pointer"
            >
              <SpotlightTile className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/80">
                
                {/* Icon Wrapper 
                   1. text-neutral-600: Default grey color
                   2. skill.color: Contains 'group-hover:text-...' which overrides grey on hover
                   3. transition-colors: Makes the color change smooth
                */}
                <div 
                  className={`mb-4 text-5xl text-neutral-600 transition-all duration-300 group-hover:scale-110 ${skill.color} group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                >
                  {skill.icon}
                </div>

                <h3 className="text-base font-medium tracking-wide text-neutral-400 transition-colors duration-300 group-hover:text-white">
                  {skill.name}
                </h3>
                
              </SpotlightTile>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;