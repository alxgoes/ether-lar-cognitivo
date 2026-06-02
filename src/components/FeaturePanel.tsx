import { motion } from 'framer-motion';
import { Brain, Layers, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: Brain,
    title: 'Autonomia Cognitiva',
    description:
      'O lar aprende os seus padrões de comportamento e adapta o ambiente proativamente. Sem comandos. Sem apps. Sem fricção.',
    color: '#3b82f6',
  },
  {
    icon: ShieldCheck,
    title: 'Privacidade Tática',
    description:
      'Cada dado permanece no seu hardware. Criptografia AES-256, rede air-gapped opcional e auditoria completa de logs locais.',
    color: '#60a5fa',
  },
  {
    icon: Layers,
    title: 'Infraestrutura Soberana',
    description:
      'Você possui cada camada da stack — do hardware ao modelo de IA. Sem dependências de cloud, sem termos invasivos, sem kill switches.',
    color: '#93c5fd',
  },
];

export function FeaturePanel() {
  return (
    <section
      className="panel"
      id="features"
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 40% 50% at 60% 50%, rgba(30,90,180,0.12) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          width: '100%',
          padding: '0 4rem',
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 18 }}
          style={{ marginBottom: '4rem' }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(96,165,250,0.7)',
              marginBottom: '1rem',
            }}
          >
            Filosofia do Sistema
          </p>
          <h2
            className="text-headline"
            style={{ maxWidth: '520px', color: 'rgba(255,255,255,0.92)' }}
          >
            Chega de dar ordens para a sua casa.{' '}
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>
              Deixe que ela entenda o seu ritmo.
            </span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 70,
                  damping: 18,
                  delay: i * 0.12,
                }}
                whileHover={{
                  y: -6,
                  boxShadow: `0 12px 40px ${pillar.color}40`,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                style={{
                  padding: '2rem',
                  background: 'rgba(10,10,10,0.6)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Glow spot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30%',
                    left: '-10%',
                    width: '60%',
                    height: '60%',
                    background: `radial-gradient(circle, ${pillar.color}12, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${pillar.color}15`,
                    border: `1px solid ${pillar.color}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={20} color={pillar.color} />
                </div>

                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    marginBottom: '0.75rem',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.45)',
                  }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturePanel;
