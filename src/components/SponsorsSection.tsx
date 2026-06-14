import React, { useState } from 'react';
import { motion } from 'motion/react';
import sponsorsJson from '../data/sponsors.json';

const fallbackLogoSvgs: Record<string, (cls: string) => React.ReactNode> = {
  Intel: (cls) => (
    <svg viewBox="0 0 24 24" className={cls} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm-4.331 12.399l-.865 2.155h-1.503l2.091-5.111h1.531l2.092 5.111h-1.554l-.882-2.155h-2.01l-.1-.001zm1.107-2.618l-.503 1.341h1.168l-.513-1.341a9.837 9.837 0 0 1-.152-.393c-.052.148-.102.28-.146.393h.146zm4.846-1.5c.789-.001 1.401.196 1.838.59.437.393.655.992.655 1.795v2.726h-1.319v-.748c-.378.583-.934.875-1.666.875-.595 0-1.077-.168-1.444-.505-.368-.337-.552-.779-.552-1.325 0-.583.21-1.026.629-1.328.42-.302 1.055-.453 1.905-.453h1.129v-.22c0-.455-.109-.792-.326-1.011-.218-.219-.571-.328-1.059-.328-.535 0-1.082.161-1.64.484v-1.18c.613-.256 1.293-.385 2.05-.385v-.01zm.16 2.441c-.415 0-.719.066-.913.197-.193.131-.29.336-.29.614 0 .428.324.641.974.641.404 0 .73-.131.98-.393v-1.059l-.751.001zm6.059-2.4c1.192-.023 2.09.317 2.693 1.02.604.703.905 1.764.905 3.184s-.301 2.482-.905 3.185c-.603.703-1.501 1.04-2.693 1.011h-2.103v-8.4h2.103v-.001zm-.784 7.114c.73-.013 1.258-.204 1.583-.574.325-.371.488-.996.488-1.875s-.163-1.503-.488-1.874c-.325-.371-.853-.562-1.583-.574h-.832v4.897h.832z"/>
    </svg>
  ),
  NVIDIA: (cls) => (
    <svg viewBox="0 0 24 24" className={cls} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 9c-.5 1-1.5 2-3 2.5a6 6 0 0 1-5-1c.5-.5.5-1 0-1.5-1 0-1.5.5-2 1 .5 1.5 2 2.5 4 2.5a8 8 0 0 0 7-4c-.5-.5-1-.5-1-.5zm.5 4.5c.5.5.5 1 1 1-1.5 2.5-4 4-7.5 4-4 0-6.5-2.5-7-5.5.5-.5.5-1 0-1.5-.5.5-1 1-1.5 2 1 4 4.5 6.5 8.5 6.5 4.5 0 7.5-3 8-6.5-.5-.5-1-.5-1.5 0zM12 4.5a7.5 7.5 0 0 0-7.5 7.5c0 4.1 3.4 7.5 7.5 7.5 1.2 0 2.4-.3 3.4-.8-.4-.3-.8-.7-1.1-1.1-.7.3-1.5.4-2.3.4-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6c0 .8-.1 1.6-.4 2.3.4.3.8.7 1.1 1.1.5-1 .8-2.2.8-3.4 0-4.1-3.4-7.5-7.5-7.5z"/>
    </svg>
  ),
  SpaceX: (cls) => (
    <svg viewBox="0 0 24 24" className={cls} xmlns="http://www.w3.org/2000/svg">
      <path d="M.441 15.568l.216.536c.64 1.583 1.836 2.825 3.39 3.518.35.156.702.261 1.053.303H24c-.035-.11-.082-.224-.139-.333l-.117-.225a1.29 1.29 0 0 0-.256-.312L12.553 8.122a1.22 1.22 0 0 0-.279-.199l-.538-.216a1.2 1.2 0 0 0-.395-.08h-4.3l7.98 7.749H.441zm15.424-6.398c-.143-.357-.367-.678-.654-.925l-2.015-1.74a4.42 4.42 0 0 0-1.848-.948l-.518-.125a4.413 4.413 0 0 0-2.12.11L2.618 7.643c-.452.17-.852.417-1.184.717l4.981 4.885h7.32l2.13-2.075z"/>
    </svg>
  ),
  Autodesk: (cls) => (
    <svg viewBox="0 0 24 24" className={cls} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4.1h-2v-5h2v5z"/>
    </svg>
  ),
  Xiaomi: (cls) => (
    <svg viewBox="0 0 24 24" className={cls} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.333 16h-1.666v-4.667c0-.92-.747-1.666-1.667-1.666h-1.667V16H9.667V9.667c0-.92.746-1.667 1.666-1.667h1.667l.333.055c1.616.273 2.833 1.675 2.833 3.395V16.03l.167-.03z"/>
    </svg>
  )
};

export const SponsorsSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrors((prev) => ({ ...prev, [name]: true }));
  };

  const sponsors = sponsorsJson.items || [];
  const isMarquee = sponsors.length > 3;

  const cardClassName = "group relative flex flex-shrink-0 items-center justify-center rounded-2xl bg-zinc-950/50 border border-zinc-900/40 hover:border-mars-amber/40 backdrop-blur-md hover:bg-zinc-900/20 transition-all duration-300 w-52 h-36 sm:w-60 sm:h-40 cursor-pointer overflow-hidden";
  const logoClass = "w-16 h-16 sm:w-20 sm:h-20 object-contain transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 opacity-100 saturate-100 brightness-100 filter group-hover:sepia-[0.35] group-hover:saturate-[2.5] group-hover:hue-rotate-[12deg] group-hover:drop-shadow-[0_0_15px_rgba(255,186,56,0.55)] select-none text-white fill-white";

  const renderSponsorCard = (sponsor: typeof sponsors[0], idx: number) => {
    const hasCustomImage = sponsor.logo && !imageErrors[sponsor.name];
    const fallbackSvg = fallbackLogoSvgs[sponsor.name];

    return (
      <motion.a
        key={`${sponsor.name}-${idx}`}
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
        id={`sponsor-card-${idx}`}
      >
        {/* Subtle internal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-transparent pointer-events-none" />
        
        {/* Hover Golden tint highlight layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-mars-amber/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-color" />
        <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="flex flex-col items-center justify-center p-4 relative z-10 w-full h-full">
          {hasCustomImage ? (
            <img 
              src={sponsor.logo} 
              alt={sponsor.name} 
              onError={() => handleImageError(sponsor.name)} 
              className={logoClass}
            />
          ) : fallbackSvg ? (
            fallbackSvg(logoClass)
          ) : (
            <div className={`flex items-center justify-center text-zinc-300 font-bold font-headline tracking-tighter text-xl uppercase transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 group-hover:text-mars-amber group-hover:drop-shadow-[0_0_15px_rgba(255,186,56,0.35)]`}>
              {sponsor.name.slice(0, 3)}
            </div>
          )}
        </div>

        {/* Sponsor name tag visible strictly on hover at the bottom */}
        <div className="absolute bottom-3 left-0 right-0 pointer-events-none text-center transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <span className="font-label text-[10px] md:text-xs font-semibold text-mars-amber uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {sponsor.name}
          </span>
        </div>
      </motion.a>
    );
  };

  return (
    <div id="sponsors" className="relative w-full py-12 z-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-800 pb-3 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="font-label text-xs font-bold tracking-[0.3em] uppercase text-mars-amber">
              Sponsors & Collaborators
            </h2>
          </div>
          <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-2 md:mt-0">
            CO-AUTH // PARTNERS
          </div>
        </motion.div>

        {/* Conditional Layout */}
        {isMarquee ? (
          <div className="relative w-full overflow-hidden py-4">
            {/* Ambient vignette fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-mars-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-mars-bg to-transparent z-10 pointer-events-none" />
            
            {/* Double the list for endless looping track */}
            <div className="animate-marquee gap-6">
              {[...sponsors, ...sponsors].map((sponsor, index) => renderSponsorCard(sponsor, index))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 py-4">
            {sponsors.map((sponsor, index) => renderSponsorCard(sponsor, index))}
          </div>
        )}
      </div>
    </div>
  );
};

