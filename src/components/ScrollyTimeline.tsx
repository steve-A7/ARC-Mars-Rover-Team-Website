import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Clapperboard, Flag, Compass, Globe, FileCheck, Award, Sparkles, CircleDot, Rocket, Cpu, Database, Wrench, Activity, Radio, Flame, Map, Layers, BatteryCharging, Bot, Camera, Gauge, Lightbulb, ShieldAlert, Eye, Zap, Terminal, Milestone, Search, Share2, TrendingUp, Trophy, Heart, Wifi } from 'lucide-react';
import timelineDataJson from '../data/timeline.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clapperboard,
  Flag,
  Compass,
  Globe,
  FileCheck,
  Award,
  Sparkles,
  Rocket,
  Cpu,
  Database,
  Wrench,
  Activity,
  Radio,
  Flame,
  Map,
  Layers,
  BatteryCharging,
  Bot,
  Camera,
  Gauge,
  Lightbulb,
  ShieldAlert,
  Eye,
  Zap,
  Terminal,
  Milestone,
  Search,
  Share2,
  TrendingUp,
  Trophy,
  Heart,
  Wifi
};

export const ScrollyTimeline: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('2016');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Find the current active year based on scroll position
      const elements = document.querySelectorAll('[data-year]');
      let currentYear = '2016';
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (top <= scrollPosition) {
          currentYear = el.getAttribute('data-year') || '2016';
        }
      });
      
      setActiveSection(currentYear);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ opacity, scale }}
      className="relative max-w-6xl mx-auto py-20"
    >
      {/* Progress Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10">
        <motion.div 
          className="absolute top-0 w-full bg-gradient-to-b from-mars-red via-mars-amber to-transparent origin-top"
          style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
        />
      </div>

      <div className="space-y-60">
        {timelineDataJson.items.map((item, i) => {
          const isEven = i % 2 === 0;
          const IconComponent = iconMap[item.icon] || CircleDot;

          return (
            <motion.div
              key={i}
              data-year={item.year}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.8 }}
              className={`relative flex items-center justify-between gap-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content Side */}
              <div className={`w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
                <div className={`${item.color} font-headline font-bold text-2xl mb-2 tracking-tighter`}>{item.year}</div>
                <h3 className="font-headline font-bold text-white text-xl uppercase tracking-tight mb-4">{item.title}</h3>
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <motion.div 
                  className={`w-12 h-12 rounded-full glass-panel flex items-center justify-center ${item.color} border-2 border-current shadow-lg bg-mars-bg`}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <IconComponent className="w-5 h-5 transition-all" />
                </motion.div>
              </div>

              {/* Media Side */}
              <div className="w-5/12">
                <motion.div 
                  className="glass-panel p-2 rounded-2xl overflow-hidden aspect-video relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  {item.type === 'youtube' ? (
                    <iframe 
                      src={`${item.media}?autoplay=0&mute=0&rel=0&modestbranding=1`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0 opacity-80 group-hover:opacity-100 transition-opacity bg-black pointer-events-auto rounded-xl"
                    />
                  ) : item.type === 'video' ? (
                    <video 
                      src={item.media} 
                      playsInline
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity rounded-xl"
                    />
                  ) : (
                    <img 
                      src={item.media} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 border border-white/10 group-hover:border-mars-red/30 transition-colors pointer-events-none rounded-2xl" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
