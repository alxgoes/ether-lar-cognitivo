import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layers, ShieldCheck, X } from 'lucide-react';

const PILLARS = [
  {
    id: 'autonomia',
    icon: Brain,
    title: 'Autonomia Cognitiva',
    description:
      'O lar aprende os seus padrões de comportamento e adapta o ambiente proativamente. Sem comandos. Sem apps. Sem fricção.',
    color: '#3b82f6',
    modalContent: {
      diferencial: 'O lar aprende padrões em tempo real usando IA local avançada, sem depender de servidores em nuvem lentos ou invasivos.',
      beneficio: 'O sistema se antecipa a você, criando um ambiente perfeitamente ajustado às suas necessidades de forma natural, para que você não precise mais usar botões ou criar rotinas manuais.'
    }
  },
  {
    id: 'privacidade',
    icon: ShieldCheck,
    title: 'Privacidade Tática',
    description:
      'Cada dado permanece no seu hardware. Criptografia AES-256, rede air-gapped opcional e auditoria completa de logs locais.',
    color: '#60a5fa',
    modalContent: {
      diferencial: 'Arquitetura air-gapped nativa. Diferente dos sistemas comuns de mercado, seus dados nunca saem da sua casa para a internet.',
      beneficio: 'Segurança absoluta. Sinta-se verdadeiramente à vontade no seu lar, sabendo que suas conversas, hábitos e horários são 100% privados.'
    }
  },
  {
    id: 'infraestrutura',
    icon: Layers,
    title: 'Infraestrutura Soberana',
    description:
      'Você possui cada camada da stack — do hardware ao modelo de IA. Sem dependências de cloud, sem termos invasivos, sem kill switches.',
    color: '#93c5fd',
    modalContent: {
      diferencial: 'Você possui e controla o hardware e o software. Sem assinaturas obrigatórias e sem risco de a fabricante desligar o servidor e inutilizar sua casa.',
      beneficio: 'Uma casa inteligente à prova de falhas. A internet caiu? Sua casa continua funcionando 100% com as mesmas capacidades.',
      valor: 'Independência total. É um investimento em um patrimônio tecnológico que pertence única e exclusivamente a você, projetado para durar.'
    }
  },
];

export function FeaturePanel() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const activePillar = PILLARS.find(p => p.id === activeFeature);

  return (
    <section
      className="panel"
      id="features"
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
        }}
        className="px-0 md:px-16"
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
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#60a5fa',
              marginBottom: '1rem',
              display: 'inline-block',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}
          >
            O que será sua casa?
          </p>
          <h2
            className="text-headline"
            style={{ maxWidth: '800px', color: 'rgba(255,255,255,0.92)', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.2 }}
          >
            Sua casa não receberá ordens, ela{' '}
            <span style={{ color: '#60a5fa' }}>
              pensará como você.
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>
              Deixe que ela aprenda com você.
            </span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                onClick={() => setActiveFeature(pillar.id)}
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
                  cursor: 'pointer',
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
                    marginBottom: '1.5rem'
                  }}
                >
                  {pillar.description}
                </p>
                
                <span style={{ fontSize: '0.85rem', color: pillar.color, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Ver detalhes <span style={{ fontSize: '1.2rem' }}>→</span>
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeFeature && activePillar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-drag-zone="true"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setActiveFeature(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '600px',
                width: '100%',
                background: 'rgba(15,15,15,0.9)',
                border: `1px solid ${activePillar.color}30`,
                borderRadius: '24px',
                padding: '3rem',
                position: 'relative',
                boxShadow: `0 20px 80px rgba(0,0,0,0.8), 0 0 40px ${activePillar.color}15`,
              }}
            >
              <button
                onClick={() => setActiveFeature(null)}
                style={{
                  position: 'absolute', top: '1.5rem', right: '1.5rem',
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.75rem', background: `${activePillar.color}20`, borderRadius: '12px' }}>
                  <activePillar.icon size={28} color={activePillar.color} />
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  {activePillar.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.5rem', fontWeight: 600 }}>Diferencial</h4>
                  <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                    {activePillar.modalContent.diferencial}
                  </p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.5rem', fontWeight: 600 }}>Benefício</h4>
                  <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                    {activePillar.modalContent.beneficio}
                  </p>
                </div>

                {activePillar.modalContent.valor && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.5rem', fontWeight: 600 }}>Valor (Por que ter ETHER?)</h4>
                    <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      {activePillar.modalContent.valor}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default FeaturePanel;
