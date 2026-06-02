import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Shield, Cpu, Wifi } from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────
const blurReveal = {
  hidden: {
    opacity: 0,
    filter: 'blur(20px)',
    y: 40,
  },
  visible: (delay: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 60,
      damping: 20,
      mass: 1.2,
      delay,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 18,
      delay,
    },
  }),
};

// ─── Badge Component ──────────────────────────────────────────────────────
function StatusBadge() {
  return (
    <motion.div
      custom={0}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-10"
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
        style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }}
      />
      <span className="text-xs font-medium tracking-widest uppercase text-white/60">
        Sistema Ativo — IA Local · Zero Cloud
      </span>
    </motion.div>
  );
}

// ─── Highlight Word ───────────────────────────────────────────────────────
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <motion.span 
      className="text-gradient inline-block"
      whileHover={{ textShadow: '0 0 20px rgba(96,165,250,0.6)' }}
      style={{ cursor: 'default' }}
    >
      {children}
    </motion.span>
  );
}

// ─── Feature Pills ────────────────────────────────────────────────────────
const FEATURES = [
  { icon: Shield, label: 'Privacidade Soberana' },
  { icon: Cpu, label: 'IA 100% Local' },
  { icon: Wifi, label: 'Infraestrutura Offline' },
];

function FeaturePills() {
  return (
    <motion.div
      custom={0.9}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="flex flex-wrap gap-3 mt-8"
    >
      {FEATURES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2 px-4 py-2 rounded-full glass-light"
        >
          <Icon size={13} className="text-white/50" />
          <span className="text-sm text-white/60 font-medium">{label}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────
function CTAButton() {
  return (
    <motion.div
      custom={0.75}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="flex items-center gap-4 mt-10"
    >
      <motion.button
        className="group flex items-center gap-3 px-7 py-4 rounded-full bg-white text-black text-sm font-semibold tracking-tight transition-all"
        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.97 }}
      >
        Iniciar Jornada
        <motion.span
          className="inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <ArrowRight size={16} />
        </motion.span>
      </motion.button>

      <motion.button
        className="flex items-center gap-2 px-7 py-4 rounded-full glass-light text-sm font-medium text-white/70 hover:text-white transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Ver Manifesto
      </motion.button>
    </motion.div>
  );
}

// ─── Hero Panel ───────────────────────────────────────────────────────────
export function HeroPanel() {
  return (
    <section
      className="panel"
      id="hero"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Radial glow backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(60,120,220,0.12) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '860px',
          padding: '0 2rem',
          width: '100%',
        }}
      >
        <StatusBadge />

        {/* Main headline — blur reveal */}
        <motion.h1
          className="text-display"
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={blurReveal}
          style={{
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
          }}
        >
          Você não deveria{' '}
          <br />
          gerenciar a sua{' '}
          <Highlight>tecnologia.</Highlight>
          <br />
          Ela deveria{' '}
          <span style={{ color: 'rgba(255,255,255,0.55)' }}>servir</span>{' '}
          <Highlight>você.</Highlight>
        </motion.h1>


        <CTAButton />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Role para explorar
        </span>
        <motion.div
          animate={{ x: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{ fontSize: '1rem' }}
        >
          →
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroPanel;
