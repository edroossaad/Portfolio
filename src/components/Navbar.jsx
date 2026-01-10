import { useState } from 'react';
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiCode } from 'react-icons/bi';
import { RiMailLine } from 'react-icons/ri';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', icon: <AiOutlineHome size={20} />, label: 'Home' },
    { id: 'about', icon: <AiOutlineUser size={20} />, label: 'About' },
    { id: 'projects', icon: <BiCode size={20} />, label: 'Projects' },
    { id: 'contact', icon: <RiMailLine size={20} />, label: 'Contact' },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-[#1F1F2E]/90 backdrop-blur-sm px-3 py-2 rounded-full border border-[#00FFF5]/20 hover:border-[#00FFF5]/40 transition-all duration-300">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              group relative p-2 rounded-full 
              transition-all duration-300 ease-in-out
              hover:-translate-y-[2px] hover:shadow-[0_0_8px_rgba(0,255,245,0.3)]
              ${activeTab === item.id
                ? 'bg-[#00FFF5]/20 text-[#00FFF5]'
                : 'text-[#EAEAEA]/60 hover:text-[#00FFF5]/80'
              }
            `}
          >
            <div className="transition-transform duration-200 ease-out group-hover:scale-105">
              {item.icon}
            </div>
            <span 
              className={`
                absolute -top-8 left-1/2 -translate-x-1/2 
                opacity-0 group-hover:opacity-100 
                transition-all duration-200
                text-[10px] font-medium
                text-[#00FFF5]
                pointer-events-none
                bg-[#1F1F2E]/90 px-2 py-1 rounded-full
                border border-[#00FFF5]/20
              `}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;