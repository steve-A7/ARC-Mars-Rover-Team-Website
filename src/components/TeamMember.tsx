import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Mail, Crown, Copy, Check } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  quote: string;
  email: string;
  github?: string;
  isCaptain?: boolean;
  teamId?: string;
}

const TEAM_CONFIGS: Record<string, {
  borderColor: string;
  glowColor: string;
  bgGlow: string;
  activeBtn: string;
  hoverAccent: string;
}> = {
  software: {
    borderColor: 'group-hover:border-mars-red/40',
    glowColor: 'rgba(239, 68, 68, 0.15)',
    bgGlow: 'bg-red-500/5',
    activeBtn: 'text-mars-red border-mars-red/50 bg-mars-red/10',
    hoverAccent: 'group-hover:text-mars-red'
  },
  electrical: {
    borderColor: 'group-hover:border-mars-amber/40',
    glowColor: 'rgba(234, 179, 8, 0.15)',
    bgGlow: 'bg-amber-500/5',
    activeBtn: 'text-mars-amber border-mars-amber/50 bg-mars-amber/10',
    hoverAccent: 'group-hover:text-mars-amber'
  },
  mechanical: {
    borderColor: 'group-hover:border-mars-orange/40',
    glowColor: 'rgba(249, 115, 22, 0.15)',
    bgGlow: 'bg-orange-500/5',
    activeBtn: 'text-mars-orange border-mars-orange/50 bg-mars-orange/10',
    hoverAccent: 'group-hover:text-mars-orange'
  },
  science: {
    borderColor: 'group-hover:border-emerald-400/40',
    glowColor: 'rgba(52, 211, 153, 0.15)',
    bgGlow: 'bg-emerald-500/5',
    activeBtn: 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10',
    hoverAccent: 'group-hover:text-emerald-400'
  }
};

export const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  image, 
  email, 
  github, 
  isCaptain,
  teamId = 'software'
}) => {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const config = TEAM_CONFIGS[teamId] || TEAM_CONFIGS.software;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className={`relative group glass-panel p-8 sm:p-10 flex flex-row items-center gap-8 sm:gap-10 text-left transition-all duration-500 hover:bg-zinc-900/30 rounded-3xl ${
        isCaptain ? 'border-mars-amber/40 shadow-[0_0_30px_rgba(234,179,8,0.1)]' : 'border-white/5'
      } ${config.borderColor}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Dynamic Ambient Blur Hue Behind is visible on Hover */}
      <div className={`absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${config.bgGlow}`} />

      {/* Left-aligned Photo Frame (Fully Colored, No Grayscale, 2x Expanded, Rounded 3xl Layout) */}
      <div className={`w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 relative overflow-hidden rounded-3xl border shrink-0 transition-colors duration-500 ${
        isCaptain ? 'border-mars-amber border-2' : 'border-white/10 group-hover:border-white/20'
      }`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High reliability fallback SVG avatar
            e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}&backgroundColor=09090b,18181b`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mars-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Captain badge in photo frame */}
        {isCaptain && (
          <div className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 glass-panel rounded-full flex items-center justify-center border border-mars-amber/30">
            <Crown className="text-mars-amber w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        )}
      </div>

      {/* Right-aligned Details beside the photo */}
      <div className="flex-1 flex flex-col items-start min-w-0 pr-2">
        {/* Dynamic Captain Title Badge */}
        {isCaptain && (
          <div className="flex items-center gap-2 mb-2 sm:mb-3 bg-mars-amber/10 border border-mars-amber/30 px-4 py-1 rounded-full">
            <Crown size={14} className="text-mars-amber shrink-0" />
            <span className="text-[10px] sm:text-xs font-label font-bold text-mars-amber uppercase tracking-widest leading-none">Captain</span>
          </div>
        )}

        {/* Member Name (No Role, No Quote, Expanded size) */}
        <h3 className={`font-headline font-bold text-xl xs:text-2xl sm:text-4xl uppercase tracking-wider text-white leading-tight transition-colors duration-500 ${config.hoverAccent}`}>
          {name}
        </h3>

        {/* Educational Details */}
        {(() => {
          const normalized = name.trim().toLowerCase();
          const isCSE = [
            'abdullah al nahian abir',
            'muksitul jahan ziad',
            'farhan sadik fahim',
            'stephen argho das'
          ].includes(normalized);

          return (
            <>
              <div className="mt-2 text-zinc-300 font-label tracking-wide text-[10px] sm:text-xs uppercase font-semibold leading-normal">
                {isCSE 
                  ? 'Bachelor of Science in Computer Science & Engineering' 
                  : 'Bachelor of Science in Electrical & Electronic Engineering'}
              </div>
              <div className="text-zinc-500 font-body text-[9px] sm:text-xs mt-0.5">
                {isCSE 
                  ? 'Faculty of Science & Technology, AIUB' 
                  : 'Faculty of Engineering, AIUB'}
              </div>
            </>
          );
        })()}

        {/* Action Button Row: Aligned middle next and below the name */}
        <div className="flex items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
          {/* Clicking Open Toggler */}
          <motion.button
            onClick={() => setShowEmail(!showEmail)}
            className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-mono border transition-all flex items-center gap-2 sm:gap-3 shrink-0 ${
              showEmail 
                ? config.activeBtn 
                : 'text-zinc-400 bg-zinc-950/40 border-white/5 hover:text-white hover:border-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={showEmail ? "Minimize Contact" : "Open Contact"}
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">
              {showEmail ? "Close" : "Open"}
            </span>
          </motion.button>

          {/* Optional GitHub Profile link */}
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-panel flex items-center justify-center text-zinc-400 hover:text-white border border-white/5 bg-zinc-950/40 transition-all hover:border-white/10 shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="GitHub Profile"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>
          )}
        </div>

        {/* Expandable Email Box below the Name and Button Row */}
        <AnimatePresence>
          {showEmail && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden w-full max-w-sm sm:max-w-md"
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                onClick={handleCopyEmail}
                className="mt-4 sm:mt-5 bg-zinc-950/60 border border-white/5 hover:border-white/10 rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-4 cursor-pointer transition-all select-none w-full"
                title="Click to copy email"
              >
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest font-mono mb-1">Crew Contact</span>
                  <span className="text-xs xs:text-sm sm:text-lg font-mono text-mars-amber hover:text-white transition-colors truncate">{email}</span>
                </div>
                <div className="shrink-0 text-zinc-400 p-1">
                  {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5 opacity-75" />}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
