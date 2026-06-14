import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Zap, 
  Settings, 
  Microscope,
  Cpu,
  Shield,
  Radio,
  Users,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  GraduationCap,
  ExternalLink,
  Check,
  Copy
} from 'lucide-react';
import { TeamMember } from './TeamMember';

interface Member {
  name: string;
  role: string;
  image: string;
  quote: string;
  email: string;
  github?: string;
  isCaptain?: boolean;
}

interface Team {
  id: string;
  name: string;
  unit: string;
  icon: React.ReactNode;
  color: string;
  specializations: string[];
  members: Member[];
}

const teams: Team[] = [
  {
    id: 'software',
    name: 'Software Team',
    unit: 'UNIT_01',
    icon: <Terminal size={24} />,
    color: 'text-mars-red',
    specializations: ['Mission Control Software', 'Autonomy Algorithms', 'ROS Node Integration', 'Real-time Telemetry Dev'],
    members: [
      { 
        name: 'Abdullah Al Nahian Abir', 
        role: 'Autonomy Developer & ROS Specialist', 
        image: '/TeamMembers/Software Team_Abdullah Al Nahian Abir.jpeg',
        quote: 'Developing the pathfinding, autonomous navigation, and sensor processing modules that guide the rover.',
        email: '23-54877-3@student.aiub.edu',
        github: 'https://github.com/nahianabir'
      },
      { 
        name: 'Farhan Sadik Fahim', 
        role: 'Navigation Systems Developer', 
        image: '/TeamMembers/Software Team_Farhan Sadik Fahim.jpeg',
        quote: 'Optimizing local map generation algorithms and terrain hazard avoidance.',
        email: '23-53663-3@student.aiub.edu'
      },
      { 
        name: 'Muksitul Jahan Ziad', 
        role: 'GUI & Telemetry Developer', 
        image: '/TeamMembers/Software Team_Muksitul Jahan Ziad.jpeg',
        quote: 'Designing highly interactive dashboards and operator consoles for mission visualization.',
        email: '23-55535-3@student.aiub.edu'
      },
      { 
        name: 'Stephen Argho Das', 
        role: 'Full Stack Control Systems Architect', 
        image: '/TeamMembers/Software Team_Stephen Argho Das.jpg',
        quote: 'Architecting the control station dashboard and real-time telemetry pipelines.',
        email: '23-54439-3@student.aiub.edu',
        github: 'https://github.com/steve-A7'
      }
    ]
  },
  {
    id: 'electrical',
    name: 'Electrical Team',
    unit: 'UNIT_02',
    icon: <Zap size={24} />,
    color: 'text-mars-amber',
    specializations: ['Power Systems & BMS', 'PCB Designing', 'Sensor Integration', 'Embedded Architectures'],
    members: [
      { 
        name: 'Abul Bashar Mohammad Sad', 
        role: 'Power Electronics Lead', 
        image: '/TeamMembers/Electrical Team_Abul Bashar Mohammad Sad.jpeg',
        quote: 'Ensuring flawless power distribution and custom BMS configurations to sustain operations.',
        email: '23-54579-3@student.aiub.edu'
      },
      { 
        name: 'Khandakar Motiur Rahman Omit', 
        role: 'Embedded Systems Specialist', 
        image: '/TeamMembers/Electrical Team_KhandarkarMotiur Rahman Omit.webp',
        quote: 'Designing multi-layered custom PCBs and micro-controller architectures for responsive controls.',
        email: '23-53023-3@student.aiub.edu'
      },
      { 
        name: 'Md.Simran', 
        role: 'Control & Integration Specialist', 
        image: '/TeamMembers/Electrical Team_Md.Simran.jpeg',
        quote: 'Integrating specialized sensors, actuators, and power loops into cohesive electronic payloads.',
        email: '23-55009-3@student.aiub.edu'
      }
    ]
  },
  {
    id: 'mechanical',
    name: 'Mechanical Team',
    unit: 'UNIT_03',
    icon: <Settings size={24} />,
    color: 'text-mars-orange',
    specializations: ['Chassis Geometry', 'Suspension Dynamics', 'Robotic Arm Kinematics', 'Actuator Geartrains'],
    members: [
      { 
        name: 'Md. Sabbir Hasan Sarker', 
        role: 'Structural Design Engineer', 
        image: '/TeamMembers/Mechanical Team_Md. Sabbir Hasan Sarker.jpg',
        quote: 'Leading mechanical engineering, structuring durable chassis geometries, and optimizing rocker-bogie systems.',
        email: '23-55838-3@student.aiub.edu',
        isCaptain: true
      },
      { 
        name: 'Md.Mudabbiur Rahman Suhad', 
        role: 'Suspension & Actuation Specialist', 
        image: '/TeamMembers/Mechanical Team_Md.Mudabbiur Rahman Suhad.png',
        quote: 'Calculating wheel ground contact distributions and structuring high-torque robotic articulations.',
        email: '23-53744-3@student.aiub.edu'
      }
    ]
  },
  {
    id: 'science',
    name: 'Science Team',
    unit: 'UNIT_04',
    icon: <Microscope size={24} />,
    color: 'text-emerald-400',
    specializations: ['Payload Instrumentation', 'Spectrometric Research', 'Bio-Signatures Detection', 'Soil Sample Geology'],
    members: [
      { 
        name: 'Aha-Raf-E-Islam Ridita', 
        role: 'Lead Astrobiologist', 
        image: '/TeamMembers/Science Team_Aha-Raf-E-Islam Ridita.jpeg',
        quote: 'Formulating protocols for discovering fossilized microbial microstructures in extra-terrestrial clay.',
        email: '23-54581-3@student.aiub.edu'
      },
      { 
        name: 'Aurthy Sarker', 
        role: 'Soil Chemistry Specialist', 
        image: '/TeamMembers/Science Team_Aurthy Sarker.jpeg',
        quote: 'Developing automated chemical assay procedures to search for organic molecular traces.',
        email: '23-54599-3@student.aiub.edu'
      },
      { 
        name: 'MD.Arifullah', 
        role: 'Spectroscopy & Environmental Analyst', 
        image: '/TeamMembers/Science Team_Md.Arifullah.jpg',
        quote: 'Calibrating atmospheric sensors, assessing radiation, and profiling Martian mineral strata.',
        email: '23-55315-3@student.aiub.edu'
      }
    ]
  }
];

const TeamMembersGrid = ({ teamId, members }: { teamId: string, members: Member[] }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pt-12 border-t border-white/5">
      {members.map((member, idx) => {
        const getTeamVariant = () => {
          switch(teamId) {
            case 'software':
              return {
                initial: { opacity: 0, scale: 0.8, filter: 'brightness(2) blur(10px)' },
                animate: { opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' },
                exit: { opacity: 0, scale: 1.1, filter: 'blur(10px)' }
              };
            case 'electrical':
              return {
                initial: { opacity: 0, y: -20, scaleY: 0 },
                animate: { opacity: 1, y: 0, scaleY: 1 },
                exit: { opacity: 0, y: 20, scaleY: 0 }
              };
            case 'mechanical':
              return {
                initial: { opacity: 0, x: idx % 2 === 0 ? -100 : 100 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, scale: 0.9 }
              };
            case 'science':
              return {
                initial: { opacity: 0, filter: 'blur(20px)', scale: 0.95 },
                animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
                exit: { opacity: 0, filter: 'blur(20px)' }
              };
            default:
              return {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 }
              };
          }
        };

        return (
          <motion.div
            key={member.name}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={getTeamVariant()}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TeamMember {...member} teamId={teamId} />
          </motion.div>
        );
      })}
    </div>
  );
};

export const ArchitectsSection: React.FC = () => {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [showAdvisorEmail, setShowAdvisorEmail] = useState(false);
  const [advisorEmailCopied, setAdvisorEmailCopied] = useState(false);

  const handleCopyAdvisorEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("ebad.zahir@aiub.edu");
    setAdvisorEmailCopied(true);
    setTimeout(() => setAdvisorEmailCopied(false), 2000);
  };

  const advisorQuote = [
    "ARC was founded in 2014 by a small group of exceptionally curious and motivated students. It began with a simple yet powerful vision: to create a platform where individuals could engage, learn, and grow together. Over the years, while its core mission has remained unchanged, its membership has expanded significantly and that is a testament to the strength of its legacy and impact.",
    "The members of ARC understand that great achievements begin with bold dreams, relentless effort, and unwavering conviction. Every challenge presents an opportunity to learn, every setback serves as preparation for future success, and every accomplishment is the result of dedication and teamwork.",
    "I firmly believe that our members possess the ambition to aim high and the resilience to overcome obstacles. I wish them continued growth, success, and excellence in all their endeavors."
  ];

  const handleTeamClick = (teamId: string) => {
    if (expandedTeam === teamId) {
      setExpandedTeam(null);
    } else {
      setExpandedTeam(teamId);
    }
  };

  return (
    <section id="teams" className="py-32 px-6 lg:px-24 bg-zinc-950/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mars-red/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            className="font-headline text-6xl md:text-8xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            The Architects
          </motion.h2>
          <p className="font-label tracking-[0.5em] text-mars-red mt-6 uppercase text-xs">Human Intelligence Behind The Machine</p>
        </div>

        {/* Faculty Advisor Section */}
        <div className="flex justify-center mb-24">
          <motion.div 
            className="max-w-5xl w-full glass-panel rounded-3xl p-8 sm:p-12 relative group border border-white/5 hover:border-sky-400/40 hover:bg-zinc-900/30 shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(56,189,248,0.12)] transition-all duration-500 flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Dynamic Sky Blue Ambient Blur Behind Card - Visible on Hover */}
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10 bg-sky-500/5 pointer-events-none" />

            {/* Left-aligned Photo Frame (Fully Colored, 2x Expanded, Rounded 3xl Layout with Portrait Ratio) */}
            <div className="w-44 h-56 xs:w-48 xs:h-64 sm:w-60 sm:h-80 relative overflow-hidden rounded-3xl border border-white/10 group-hover:border-sky-400/30 shrink-0 transition-colors duration-500 select-none bg-zinc-950/20">
              <img 
                src="/TeamMembers/Advisor_Dr. Ebad Zahir.jpg" 
                alt="Dr. Ebad Zahir" 
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = `https://api.dicebear.com/7.x/bottts/svg?seed=Ebad%20Zahir&backgroundColor=09090b,18181b`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mars-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Right-aligned Details */}
            <div className="flex-1 flex flex-col items-start text-left min-w-0 w-full">
              {/* Advisor Title Badge */}
              <div className="inline-flex items-center gap-2 mb-4 bg-sky-500/10 border border-sky-500/20 px-4 py-1.5 rounded-full">
                <Shield size={14} className="text-sky-400 shrink-0" />
                <span className="text-[10px] sm:text-xs font-label font-bold text-sky-400 uppercase tracking-widest leading-none">Faculty Advisor</span>
              </div>

              {/* Advisor Name */}
              <h3 className="font-headline font-bold text-3xl sm:text-5xl uppercase tracking-wider text-white leading-tight transition-colors duration-500 group-hover:text-sky-400">
                Dr. Ebad Zahir
              </h3>

              {/* Roles */}
              <div className="mt-2 text-zinc-300 font-label tracking-wide text-xs sm:text-sm uppercase font-semibold">
                Associate Professor & Special Assistant
              </div>
              <div className="text-zinc-500 font-body text-xs sm:text-sm mt-0.5">
                Department of Electrical & Electronic Engineering, AIUB
              </div>

              {/* Spacer line */}
              <div className="w-16 h-[2px] bg-sky-500/30 my-6 transition-all duration-500 group-hover:w-28 group-hover:bg-sky-500/50" />

              {/* Speech Quotes */}
              <div className="space-y-4 text-zinc-300 font-body text-sm sm:text-base leading-relaxed tracking-wide italic">
                {advisorQuote.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
                {/* Contact Toggle Button */}
                <motion.button
                  onClick={() => setShowAdvisorEmail(!showAdvisorEmail)}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono border transition-all flex items-center gap-2 sm:gap-3 shrink-0 ${
                    showAdvisorEmail 
                      ? 'text-sky-400 border-sky-400/50 bg-sky-400/10 shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
                      : 'text-zinc-400 bg-zinc-950/40 border-white/5 hover:text-white hover:border-white/10 hover:bg-zinc-900/50'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  title={showAdvisorEmail ? "Minimize Contact" : "Open Contact"}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">
                    {showAdvisorEmail ? "Close Contact" : "Open Contact"}
                  </span>
                </motion.button>

                {/* Google Scholar Profile Link */}
                <motion.a
                  href="https://scholar.google.com/citations?user=20Uq-QoAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-mono border text-zinc-400 bg-zinc-950/40 border-white/5 hover:text-white hover:border-sky-400/35 hover:bg-sky-500/5 transition-all flex items-center gap-2 sm:gap-3 shrink-0"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  title="Google Scholar Profile"
                >
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-sky-400" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold">Google Scholar</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 shrink-0" />
                </motion.a>
              </div>

              {/* Copyable Email Expandable Block */}
              <AnimatePresence>
                {showAdvisorEmail && (
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
                      onClick={handleCopyAdvisorEmail}
                      className="mt-5 bg-zinc-950/80 border border-white/5 hover:border-sky-400/25 rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer transition-all select-none w-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                      title="Click to copy email address"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] sm:text-xs text-zinc-500 uppercase tracking-widest font-mono mb-1">Email Coordinates</span>
                        <span className="text-sm sm:text-base font-mono text-sky-400 hover:text-white transition-colors truncate">ebad.zahir@aiub.edu</span>
                      </div>
                      <div className="shrink-0 text-zinc-400 p-1">
                        {advisorEmailCopied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5 opacity-75" />}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teams.map((team) => (
            <React.Fragment key={team.id}>
              <motion.button
                onClick={() => handleTeamClick(team.id)}
                className={`relative text-left glass-panel rounded-3xl p-8 transition-all duration-500 group border-b-2 ${
                  expandedTeam === team.id 
                    ? `border-${team.color.split('-')[1]}-${team.color.split('-')[2]} bg-zinc-900/60 shadow-[0_0_30px_rgba(255,255,255,0.05)]` 
                    : 'border-transparent hover:border-white/20'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`${team.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                    {team.icon}
                  </div>
                  <span className="text-[10px] font-label text-zinc-600 tracking-widest">{team.unit}</span>
                </div>
                
                <h4 className="font-headline font-bold text-2xl text-white uppercase tracking-tight mb-6">{team.name}</h4>
                
                <ul className="space-y-3">
                  {team.specializations.map((spec, idx) => (
                    <li key={idx} className="text-xs text-zinc-500 font-body tracking-wide flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${team.color.replace('text-', 'bg-')} opacity-40`} />
                      {spec}
                    </li>
                  ))}
                </ul>

                {/* Selection Indicator */}
                <AnimatePresence>
                  {expandedTeam === team.id && (
                    <motion.div 
                      className={`absolute inset-0 bg-current opacity-5 blur-xl -z-10 ${team.color}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.05 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile/Tablet Expansion (Right under the card) */}
              <div className="lg:hidden col-span-1 md:col-span-2">
                <AnimatePresence mode="wait">
                  {expandedTeam === team.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: 'auto', 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
                          opacity: { duration: 0.3, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      className="overflow-hidden mb-6"
                    >
                      <TeamMembersGrid teamId={team.id} members={team.members} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Expanded Team Members (Below the grid) */}
        <div className="hidden lg:block relative">
          <AnimatePresence mode="wait">
            {expandedTeam && (
              <motion.div
                key={expandedTeam}
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto', 
                  opacity: 1,
                  transition: {
                    height: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
                    opacity: { duration: 0.3, delay: 0.1 }
                  }
                }}
                exit={{ 
                  height: 0, 
                  opacity: 0,
                  transition: {
                    height: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                    opacity: { duration: 0.2 }
                  }
                }}
                className="overflow-hidden"
              >
                <TeamMembersGrid 
                  teamId={expandedTeam} 
                  members={teams.find(t => t.id === expandedTeam)?.members || []} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

