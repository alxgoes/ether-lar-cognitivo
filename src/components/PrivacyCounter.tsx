import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// ─── CountUp Number ───────────────────────────────────────────────────────
function CountUp({
  from,
  to,
  duration = 1.8,
  suffix = '',
  prefix = '',
  shouldStart,
  style,
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  shouldStart: boolean;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(from);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo out
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [shouldStart, from, to, duration]);

  return (
    <span style={style}>
      {prefix}
      {display.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

// ─── Privacy Counter ──────────────────────────────────────────────────────
export function PrivacyCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const STATS = [
    {
      from: 1337,
      to: 0,
      suffix: '',
      label: 'dados enviados para cloud',
      sublabel: 'Absolutamente zero.',
      color: '#60a5fa',
      accent: true,
    },
    {
      from: 0,
      to: 100,
      suffix: '%',
      label: 'processamento local',
      sublabel: 'IA roda na sua casa.',
      color: '#34d399',
      accent: false,
    },
    {
      from: 64,
      to: 256,
      suffix: '-bit',
      label: 'criptografia AES',
      sublabel: 'Padrão militar.',
      color: '#a78bfa',
      accent: false,
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.2 }}
      style={{
        width: '100%',
        marginTop: '4rem',
        padding: '2.5rem',
        background: 'rgba(5, 10, 25, 0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(96, 165, 250, 0.12)',
        borderRadius: '24px',
        boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(96,165,250,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <p
        style={{
          fontSize: '0.72rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Privacidade Soberana — Em Números
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {STATS.map((stat, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {/* Big number */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.15rem',
              }}
            >
              <CountUp
                from={stat.from}
                to={stat.to}
                duration={stat.accent ? 1.6 : 1.2}
                suffix={stat.suffix}
                shouldStart={isInView}
                style={{
                  fontSize: stat.accent ? 'clamp(3rem, 6vw, 5rem)' : 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: stat.color,
                  textShadow: stat.accent
                    ? `0 0 40px ${stat.color}80, 0 0 80px ${stat.color}30`
                    : `0 0 20px ${stat.color}50`,
                }}
              />
            </div>

            {/* Label */}
            <p
              style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.4,
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: '0.75rem',
                color: stat.color,
                opacity: 0.7,
                fontWeight: 500,
              }}
            >
              {stat.sublabel}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default PrivacyCounter;
