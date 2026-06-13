import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mars3D } from './Mars3D';

export const BackgroundEffects: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; size: number; top: string; left: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -20}s`, // Negative delay to start mid-animation
      duration: `${20 + Math.random() * 20}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0b0d]">
      {/* 3D Mars Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="w-[100vw] h-[100vh] lg:w-[1200px] lg:h-[1200px] opacity-80">
          <Mars3D />
        </div>
      </div>
      
      {/* Dust Particles (CSS fallback for extra atmosphere) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle bg-mars-orange/40"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            top: p.top,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-mars-bg/80 pointer-events-none" />
    </div>
  );
};
