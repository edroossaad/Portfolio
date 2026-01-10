import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation.json';

const Hero = () => {
  const [text, setText] = useState('');
  const [roleText, setRoleText] = useState('');
  const fullText = "Saad Edroos";
  const roleFullText = "Full Stack Developer";
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    let currentIndex = 0;
    let roleIndex = 0;

    // First animation for name
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Start role animation after name is complete
        const roleInterval = setInterval(() => {
          if (roleIndex <= roleFullText.length) {
            setRoleText(roleFullText.slice(0, roleIndex));
            roleIndex++;
          } else {
            clearInterval(roleInterval);
          }
        }, 100);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1F]/50 via-transparent to-transparent" />

      <div className={`container mx-auto max-w-6xl transition-all duration-1000 transform 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 text-center md:text-left z-10">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-bold text-[#00FFF5]">   
                {text}
                <span className={`border-r-4 border-[#00FFF5] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl font-medium text-[#EAEAEA]/90">
                {roleText}
                <span className={`border-r-4 border-[#EAEAEA] ml-1 ${showCursor && roleText !== roleFullText ? 'opacity-100' : 'opacity-0'}`}>
                </span>
              </h2>
              <p className="text-[#EAEAEA]/70 max-w-lg mx-auto md:mx-0 transition-all duration-1000 delay-1000">
                Crafting modern web experiences with React, Node.js, and cloud technologies. 
                Specializing in building scalable applications and intuitive user interfaces.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button className="btn-neon group relative overflow-hidden">
                <span className="relative z-10">View Work</span>
              </button>
              <button className="border border-[#00FFF5] text-[#00FFF5] px-6 py-3 rounded-lg 
                hover:bg-[#00FFF5]/10 transition-all duration-300 backdrop-blur-sm">
                Let's Talk
              </button>
            </div>

            {/* Tech Stack */}
            <div className="text-[#EAEAEA]/50 text-sm space-y-2">
              <p>Tech Stack |</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'].map((tech) => (
                  <span key={tech} className="hover:text-[#00FFF5] transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links with updated styling */}
            <div className="flex gap-6 justify-center md:justify-start items-center pt-2">
              {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EAEAEA] hover:text-[#00FFF5] transition-colors duration-300
                    text-sm tracking-wide hover:tracking-wider"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Lottie Animation */}
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-[#00FFF5]/5 rounded-full filter blur-3xl" />
            <Lottie 
              animationData={animationData}
              loop={true}
              className="w-full h-full relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;