import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navData = [
  {
    id: 'overview',
    title: 'Overview',
    icon: '/icon/overview.png',
    color: 'text-mars-red'
  },
  {
    id: 'timeline',
    title: 'Timeline',
    icon: '/icon/timeline.png',
    color: 'text-mars-amber'
  },
  {
    id: 'teams',
    title: 'Team',
    icon: '/icon/team_member.png',
    color: 'text-mars-orange'
  },
  {
    id: 'sponsor-us',
    title: 'Sponsor Us',
    icon: '/icon/sponsor_us.png',
    color: 'text-emerald-400'
  }
];

export const MissionLogNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navData.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      const scrollPosition = window.scrollY + 200; // Offset for detection

      // Find the current active section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
      
      // Handle bottom of page
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if (window.scrollY + windowHeight >= scrollHeight - 50) {
        setActiveSection('sponsor-us');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
      <div className="font-label uppercase tracking-[0.4em] text-[10px] text-zinc-600 vertical-text mb-6">MISSION_LOG</div>
      {navData.map((item, i) => {
        const isCurrent = activeSection === item.id;

        return (
          <motion.a
            key={i}
            href={`#${item.id}`}
            className="relative group cursor-pointer"
            animate={{ 
              opacity: isCurrent ? 1 : 0.3,
              scale: isCurrent ? 1.15 : 1
            }}
            whileHover={{ scale: 1.15, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className={`p-3 rounded-sm glass-panel transition-all duration-500 ${item.color} ${isCurrent ? 'border-current shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-white/5' : 'border-current/40'}`}>
              <img 
                src={item.icon} 
                alt="" 
                className={`w-4 h-4 invert transition-all duration-500 ${isCurrent ? 'scale-110 brightness-125' : 'opacity-70'}`} 
                referrerPolicy="no-referrer" 
              />
              
              {/* Active Indicator Glow */}
              <AnimatePresence>
                {isCurrent && (
                  <motion.div 
                    className="absolute inset-0 rounded-sm bg-current blur-xl -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1.2 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </div>
            <div className="absolute right-full mr-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-label text-[10px] tracking-[0.3em] uppercase text-white bg-mars-bg/80 px-3 py-1 rounded-sm border border-white/5">
              {item.title}
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
