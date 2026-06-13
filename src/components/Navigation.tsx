import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '#overview', icon: '/icon/overview.png' },
  { name: 'Timeline', href: '#timeline', icon: '/icon/timeline.png' },
  { name: 'Team', href: '#teams', icon: '/icon/team_member.png' },
  { name: 'Sponsor Us', href: '#sponsor-us', icon: '/icon/sponsor_us.png' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full transition-all duration-500 ${
          isOpen ? 'z-[110]' : 'z-50'
        } ${
          scrolled ? 'bg-zinc-900/60 backdrop-blur-xl py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.a 
            href="#hero"
            className="text-xl font-bold tracking-tighter text-mars-red font-headline uppercase flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img 
              src="/ARC_Logo.png" 
              alt="ARC Logo" 
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            Arc Rover Team
          </motion.a>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-10 items-center">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-zinc-400 hover:text-white transition-colors font-label text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 group"
                whileHover={{ y: -2 }}
              >
                <img src={item.icon} alt="" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity invert" referrerPolicy="no-referrer" />
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[101] w-12 h-12 flex items-center justify-center glass-panel rounded-full group overflow-hidden transition-all duration-500"
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.img
                    key="close"
                    src="/icon/close.png"
                    alt="Close"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    style={{ 
                      filter: 'invert(85%) sepia(12%) saturate(1214%) hue-rotate(315deg) brightness(101%) contrast(101%)' 
                    }}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <motion.img
                    key="menu"
                    src="/icon/menu.png"
                    alt="Menu"
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    style={{ 
                      filter: 'invert(85%) sepia(12%) saturate(1214%) hue-rotate(315deg) brightness(101%) contrast(101%)' 
                    }}
                    referrerPolicy="no-referrer"
                  />
                )}
              </AnimatePresence>
            </div>
            
            {/* Morphing background effect on hover */}
            <motion.div 
              className="absolute inset-0 bg-mars-red/20"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.5 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-mars-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="group flex items-center gap-6 text-4xl md:text-6xl font-headline font-black uppercase tracking-tighter text-zinc-700 hover:text-white transition-colors"
                >
                  <span className="text-xs font-label text-mars-red/40 group-hover:text-mars-red transition-colors">0{index + 1}</span>
                  <div className="p-4 rounded-sm glass-panel border border-white/5 group-hover:border-mars-red/50 group-hover:shadow-[0_0_20px_rgba(255,180,171,0.1)] transition-all duration-500">
                    <img 
                      src={item.icon} 
                      alt="" 
                      className="w-8 h-8 md:w-12 md:h-12 invert opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/5 rounded-full pointer-events-none animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] border border-white/5 rounded-full pointer-events-none animate-pulse delay-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
