import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Radio, 
  Users, 
  ChevronDown, 
  Terminal, 
  Shield, 
  Zap, 
  Microscope,
  Menu,
  Send,
  MapPin,
  Mail,
  Navigation as NavigationIcon,
  Package,
  Wrench,
  FlaskConical
} from 'lucide-react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { ArchitectsSection } from './components/ArchitectsSection';
import { ScrollyTimeline } from './components/ScrollyTimeline';
import { Navigation } from './components/Navigation';
import { MissionLogNav } from './components/MissionLogNav';
import { SponsorsSection } from './components/SponsorsSection';

const AnimatedTitle = ({ text }: { text: string }) => {
  const words = text.split(' ');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.5
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotate: 5,
      scale: 0.9,
    },
  };

  return (
    <motion.h1
      className="font-headline text-[10vw] md:text-[8rem] font-black tracking-[-0.05em] leading-none uppercase bg-gradient-to-r from-mars-red via-mars-orange to-mars-amber via-mars-orange to-mars-red bg-clip-text text-transparent drop-shadow-2xl flex flex-wrap justify-center animate-gradient-text animate-title-breathing select-none pb-2"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <span key={index} className="mr-4 last:mr-0 flex">
          {word.split("").map((letter, i) => (
            <motion.span key={i} variants={child} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [orgName, setOrgName] = useState('');
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState<{ orgName?: string; message?: string }>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setSubmitStatus('idle');
    setSubmitMessage('');

    const trimmedOrgName = orgName.trim();
    const trimmedMessage = message.trim();

    const errors: { orgName?: string; message?: string } = {};

    if (!trimmedOrgName) {
      errors.orgName = 'Organization Name is required.';
    }

    if (!trimmedMessage) {
      errors.message = 'Transmission message is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitStatus('error');
      setSubmitMessage('Uplink failed: parameters cannot be empty.');
      return;
    }

    setSubmitStatus('loading');
    setSubmitMessage('Beaming encrypted broadcast packet downstream...');

    try {
      const response = await fetch('/api/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orgName: trimmedOrgName,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(data.message || 'Transmission successfully received by Mission Control.');
        setOrgName('');
        setMessage('');
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to beam transmission.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to connect to Mission Control satellite uplink.');
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-mars-red/30">
      <BackgroundEffects />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none overflow-hidden bg-white/5">
        <motion.div
          className="absolute top-0 left-0 h-full bg-mars-red origin-left"
          style={{ scaleX }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full w-[2000px]"
            animate={{ x: [-100, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='2' viewBox='0 0 100 2' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 1 Q 25 0 50 1 T 100 1' fill='none' stroke='white' stroke-width='0.5' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat-x'
            }}
          />
        </motion.div>
      </div>

      <Navigation />
      <MissionLogNav />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden text-center">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="relative mb-16">
              <AnimatedTitle text="ARC Rover Team" />
              <div className="absolute -bottom-4 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mars-red to-transparent opacity-50" />
            </div>

            <motion.p 
              className="font-body text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-6 opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
            >
              This is the official website of AIUB Robotics Crew's Mars Rover team, welcome onboard.
            </motion.p>

            {/* Inline Sponsors Section */}
            <motion.div
              className="w-full max-w-5xl mb-8 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1.2, ease: "easeOut" }}
            >
              <SponsorsSection />
            </motion.div>

            <motion.div 
              className="flex flex-col items-center gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1.2, ease: "easeOut" }}
            >
              <a 
                href="#overview"
                className="group relative px-12 py-4 overflow-hidden rounded-full transition-all active:scale-95 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(255,68,68,0.3)]"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-mars-red/20 group-hover:border-mars-red/50 transition-all duration-500" />
                <span className="relative font-headline font-bold uppercase tracking-[0.3em] text-xs text-white group-hover:text-mars-red transition-colors duration-500">
                  Explore
                </span>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-mars-red/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </a>
            </motion.div>
          </div>
          
          <a 
            href="#overview"
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 hover:opacity-100 cursor-pointer transition-opacity duration-300 z-30"
          >
            <motion.div 
              className="flex flex-col items-center gap-4"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-[1px] h-16 bg-gradient-to-b from-mars-red to-transparent" />
              <ChevronDown size={20} className="text-mars-red" />
            </motion.div>
          </a>
        </section>

        

        {/* Overview Section */}
        <section id="overview" className="py-32 px-6 lg:px-24 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <div className="text-mars-amber font-label text-[10px] tracking-[0.4em] uppercase mb-6">Our Goal and Objectives</div>
              <h2 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-10 uppercase">
                Brief <br/>
                <span className="text-zinc-700">Overview</span>
              </h2>
              
              <div className="space-y-8 text-zinc-400 text-lg leading-relaxed">
                <p>Our objective is to engineer a rover capable of navigating treacherous Martian terrain with zero latency commands. By leveraging advanced computer vision, efficiently designed electrical component, modular mechanical architecture and state of the art onboard science testing, we intend to solve for the unknown. We achieve our goals through participating and excelling in mars rover challenges across the globe.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  <a 
                    href="https://en.wikipedia.org/wiki/Autonomous_robot" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-8 glass-panel rounded-3xl border-l-4 border-cyan-500 group hover:bg-cyan-500/5 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all block"
                  >
                    <NavigationIcon className="text-cyan-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-headline font-bold text-white text-xl mb-3 uppercase">Autonomous Navigation Mission</h4>
                    <p className="text-sm">Advanced pathfinding and obstacle avoidance in unstructured environments.</p>
                  </a>
                  <a 
                    href="https://en.wikipedia.org/wiki/Delivery_robot" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-8 glass-panel rounded-3xl border-l-4 border-emerald-500 group hover:bg-emerald-500/5 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all block"
                  >
                    <Package className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-headline font-bold text-white text-xl mb-3 uppercase">Delivery Mission</h4>
                    <p className="text-sm">Precision payload transportation and deployment across rugged terrain.</p>
                  </a>
                  <a 
                    href="https://en.wikipedia.org/wiki/Spacecraft_servicing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-8 glass-panel rounded-3xl border-l-4 border-violet-500 group hover:bg-violet-500/5 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] transition-all block"
                  >
                    <Wrench className="text-violet-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-headline font-bold text-white text-xl mb-3 uppercase">Equipment Servicing Mission</h4>
                    <p className="text-sm">Robotic maintenance and interaction with remote infrastructure components.</p>
                  </a>
                  <a 
                    href="https://en.wikipedia.org/wiki/Scientific_mission" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-8 glass-panel rounded-3xl border-l-4 border-rose-500 group hover:bg-rose-500/5 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] transition-all block"
                  >
                    <FlaskConical className="text-rose-500 mb-6 group-hover:scale-110 transition-transform" size={32} />
                    <h4 className="font-headline font-bold text-white text-xl mb-3 uppercase">Science Mission</h4>
                    <p className="text-sm">Onboard laboratory analysis and environmental data collection.</p>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div 
                className="aspect-square glass-panel p-2 rounded-3xl overflow-hidden relative group transition-all duration-500 hover:shadow-[0_0_45px_rgba(239,68,68,0.25)] hover:border-mars-red/30 focus-within:shadow-[0_0_45px_rgba(239,68,68,0.35)] focus-within:border-mars-red/40 outline-none"
                whileHover={{ scale: 1.02 }}
                tabIndex={0}
              >
                <img 
                  src="/OverviewRes/ARC_Media_Coverage.png" 
                  alt="Media Coverage of our previous URC Journey" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mars-bg/90 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-[10px] font-label text-mars-amber mb-3 tracking-widest uppercase">Media Coverage of our previous URC Journey</div>
                  <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-mars-amber"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section id="timeline" className="py-32 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-4">Development Arc</h2>
              <div className="w-24 h-1 bg-mars-red mx-auto" />
            </div>
            <ScrollyTimeline />
          </div>
        </section>

        {/* Team Member Section */}
        <ArchitectsSection />

        {/* Support Us Section */}
        <section id="sponsor-us" className="py-32 px-6 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-headline text-5xl md:text-6xl font-bold tracking-tighter mb-8 uppercase">
                Join The <br/>
                <span className="text-mars-red">Expedition</span>
              </h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
                Become a partner and support us in developing the next generation of space exploration. Your contribution fuels our research and hardware development.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-5 text-zinc-400">
                  <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-mars-red">
                    <MapPin size={20} />
                  </div>
                  <span className="font-label text-xs tracking-widest uppercase">408/1 (Old KA 66/1),
                        Kuratoli, Khilkhet,Dhaka 1229, Bangladesh</span>
                </div>
                <div className="flex items-center gap-5 text-zinc-400">
                  <div className="w-12 h-12 glass-panel rounded-2xl flex items-center justify-center text-mars-red">
                    <Mail size={20} />
                  </div>
                  <span className="font-label text-xs tracking-widest uppercase">mission-control@ares-rover.com</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-10 relative">
              <div className="absolute -top-4 -right-4 bg-mars-amber text-black px-4 py-1 text-[10px] font-label font-bold tracking-widest uppercase rounded-full">
                Encrypted Line
              </div>
              
              <form onSubmit={handleBroadcast} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-label text-zinc-500 uppercase tracking-widest">Organization Name</label>
                  <input 
                    type="text" 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className={`w-full bg-zinc-900/50 border ${formErrors.orgName ? 'border-mars-red' : 'border-zinc-800/80'} rounded-2xl px-4 py-3.5 focus:border-mars-red focus:bg-zinc-900/80 transition-all outline-none text-white font-body`}
                    placeholder="ENTITY_ID"
                  />
                  {formErrors.orgName && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-mars-red text-xs font-label uppercase tracking-wider">{formErrors.orgName}</motion.p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-label text-zinc-500 uppercase tracking-widest">Transmission message</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full bg-zinc-900/50 border ${formErrors.message ? 'border-mars-red' : 'border-zinc-800/80'} rounded-2xl px-4 py-3.5 focus:border-mars-red focus:bg-zinc-900/80 transition-all outline-none text-white font-body resize-none`}
                    placeholder="INPUT_DATA..."
                    rows={4}
                  />
                  {formErrors.message && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-mars-red text-xs font-label uppercase tracking-wider">{formErrors.message}</motion.p>
                  )}
                </div>

                {submitStatus !== 'idle' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-4 rounded-xl text-xs font-label uppercase tracking-widest flex flex-col gap-2 ${
                      submitStatus === 'loading' ? 'bg-zinc-900/50 text-mars-amber border border-mars-amber/20' :
                      submitStatus === 'success' ? 'bg-zinc-900/50 text-emerald-400 border border-emerald-400/20' :
                      'bg-zinc-900/50 text-mars-red border border-mars-red/20'
                    }`}
                  >
                    <div>{submitMessage}</div>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="w-full bg-mars-red text-black font-headline font-bold uppercase tracking-widest py-5 rounded-2xl hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 glow-red"
                >
                  <Send size={18} className={submitStatus === 'loading' ? 'animate-pulse' : ''} />
                  {submitStatus === 'loading' ? 'Broadcasting...' : 'Broadcast Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-24 glass-panel border-t-0 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-mars-red font-headline font-black uppercase tracking-tighter text-2xl flex items-center gap-3">
            <img 
              src="/ARC_Logo.png" 
              alt="ARC Logo" 
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            Arc Rover Team
          </div>
          
          <div className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-500 text-center">
            © 2026 Aiub Robotics Crew. All Systems Nominal.
          </div>

          <div className="flex gap-8">
            {['Telemetry', 'Privacy', 'Terminal'].map((item) => (
              <a key={item} href="#" className="font-label text-[10px] tracking-widest uppercase text-zinc-500 hover:text-mars-red transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

