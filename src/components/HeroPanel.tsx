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
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem 1rem', borderRadius: '99px',
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '1.5rem', backdropFilter: 'blur(10px)'
      }}
    >
      <span
        style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }}
      />
      <span style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
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
function CTAButton({ onStartJourney, onOpenManifesto }: { onStartJourney?: () => void, onOpenManifesto?: () => void }) {
  return (
    <motion.div
      custom={0.75}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}
    >
      <motion.button
        onClick={onStartJourney}
        whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          padding: '0.75rem 1.5rem', borderRadius: '99px',
          background: '#fff', color: '#000', border: 'none',
          fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}
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
        onClick={onOpenManifesto}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.75rem 1.5rem', borderRadius: '99px',
          background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.1)',
          fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          whiteSpace: 'nowrap'
        }}
      >
        Ver Manifesto
      </motion.button>
    </motion.div>
  );
}

// ─── Hero Panel ───────────────────────────────────────────────────────────
interface HeroPanelProps {
  onStartJourney?: () => void;
  onOpenManifesto?: () => void;
}

export function HeroPanel({ onStartJourney, onOpenManifesto }: HeroPanelProps) {
  return (
    <section
      className="panel"
      id="hero"
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
        {/* ETHER Logo */}
        <motion.div
          custom={0.05}
          initial="hidden"
          animate="visible"
          variants={blurReveal}
          style={{ marginBottom: '2rem' }}
        >
          <img src="/nomelog.png" alt="ETHER" style={{ height: '130px', objectFit: 'contain' }} />
        </motion.div>

        <StatusBadge />

        {/* Main headline — blur reveal */}
        <motion.p
          custom={0.15}
          initial="hidden"
          animate="visible"
          variants={blurReveal}
          style={{
            fontWeight: 400,
            fontSize: '1.75rem',
            lineHeight: 1.4,
            letterSpacing: '-0.01em',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '600px',
            marginBottom: '1rem'
          }}
        >
          Seu lar não precisa de comandos.<br />
          Ele entende o seu contexto.
        </motion.p>


        <CTAButton onStartJourney={onStartJourney} onOpenManifesto={onOpenManifesto} />
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
        className="hidden md:flex"
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
