import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Icons
import { FaReact, FaLaravel, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaJava, FaPython } from 'react-icons/fa';
import { 
  SiNextdotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiGreensock, 
  SiCloudways, 
  SiNetlify, 
  SiVercel, 
  SiPostman,
  SiMysql,
  SiMongodb,
  SiC,
  SiCplusplus
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

// 1. Categorized Data
const skills = [
  // Languages
  { name: "JavaScript", category: "Languages", icon: <SiJavascript />, color: "group-hover:text-yellow-400" },
  { name: "HTML5", category: "Languages", icon: <FaHtml5 />, color: "group-hover:text-orange-600" },
  { name: "CSS3", category: "Languages", icon: <FaCss3Alt />, color: "group-hover:text-blue-500" },
  { name: "Java", category: "Languages", icon: <FaJava />, color: "group-hover:text-red-500" },
  { name: "Python", category: "Languages", icon: <FaPython />, color: "group-hover:text-yellow-300" },
  { name: "C", category: "Languages", icon: <SiC />, color: "group-hover:text-blue-500" },
  { name: "C++", category: "Languages", icon: <SiCplusplus />, color: "group-hover:text-blue-600" },

  // Frameworks
  { name: "Next.js", category: "Frameworks", icon: <SiNextdotjs />, color: "group-hover:text-white" },
  { name: "React", category: "Frameworks", icon: <FaReact />, color: "group-hover:text-cyan-400" },
  { name: "Laravel", category: "Frameworks", icon: <FaLaravel />, color: "group-hover:text-red-600" },
  { name: "Node.js", category: "Frameworks", icon: <FaNodeJs />, color: "group-hover:text-green-500" }, // Node often fits nicely here or in tools
  { name: "Tailwind", category: "Frameworks", icon: <SiTailwindcss />, color: "group-hover:text-cyan-300" },
  { name: "GSAP", category: "Frameworks", icon: <SiGreensock />, color: "group-hover:text-green-400" },

  // Databases (New Category)
  { name: "MySQL", category: "Databases", icon: <SiMysql />, color: "group-hover:text-blue-500" },
  { name: "MongoDB", category: "Databases", icon: <SiMongodb />, color: "group-hover:text-green-500" },

  // Cloud & Tools
  { name: "Git", category: "Cloud & Tools", icon: <FaGitAlt />, color: "group-hover:text-orange-500" },
  { name: "Vercel", category: "Cloud & Tools", icon: <SiVercel />, color: "group-hover:text-white" },
  { name: "Netlify", category: "Cloud & Tools", icon: <SiNetlify />, color: "group-hover:text-teal-400" },
  { name: "Cloudways", category: "Cloud & Tools", icon: <SiCloudways />, color: "group-hover:text-indigo-400" },
  { name: "Postman", category: "Cloud & Tools", icon: <SiPostman />, color: "group-hover:text-orange-500" },
];

// Added "Databases" to the list
const categories = ["Languages", "Frameworks", "Databases", "Cloud & Tools"];

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
  const [activeTab, setActiveTab] = useState("Languages");

  // Filter skills based on active tab
  const filteredSkills = skills.filter(skill => skill.category === activeTab);

  // Initial Header Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Grid Re-animation when Tab Changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear any existing animations on the tiles to prevent conflict
      gsap.killTweensOf(".skill-tile");
      
      gsap.fromTo(
        ".skill-tile",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section className="bg-neutral-950 py-24" ref={containerRef}>
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Header */}
        <div ref={headerRef} className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white md:text-5xl">
            Technologies
          </h2>
          <div className="mt-2 h-1 w-20 rounded-full bg-indigo-500"></div>
          <p className="mt-4 max-w-2xl text-lg text-neutral-400">
            My technical proficiency across different domains.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === cat
                  ? "bg-neutral-800 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] ring-1 ring-indigo-500"
                  : "bg-transparent text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 min-h-[300px]">
          {filteredSkills.map((skill, index) => (
            <div 
              key={`${skill.name}-${index}`}
              className="skill-tile aspect-square group cursor-pointer"
            >
              <SpotlightTile className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/80">
                
                {/* Icon Wrapper */}
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