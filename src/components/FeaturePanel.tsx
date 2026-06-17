import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Layers, ShieldCheck, X } from 'lucide-react';
import { ParallaxCard } from './ParallaxCard';
import { PrivacyCounter } from './PrivacyCounter';
import { FloorPlanSVG } from './FloorPlanSVG';
import { EtherWaveDivider } from './EtherWaveDivider';

const PILLARS = [
  {
    id: 'autonomia',
    icon: Brain,
    title: 'Autonomia Cognitiva',
    description:
      'O lar aprende os seus padrões de comportamento e adapta o ambiente proativamente. Sem comandos. Sem apps. Sem fricção.',
    color: '#3b82f6',
    modalContent: {
      fundamentos: 'O lar aprende padrões em tempo real usando IA local avançada, sem depender de servidores em nuvem lentos ou invasivos.',
      privilegios: 'O sistema se antecipa a você, criando um ambiente perfeitamente ajustado às suas necessidades de forma natural, para que você não precise mais usar botões ou criar rotinas manuais.'
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
      fundamentos: 'Arquitetura air-gapped nativa. Diferente dos sistemas comuns de mercado, seus dados nunca saem da sua casa para a internet.',
      privilegios: 'Segurança absoluta. Sinta-se verdadeiramente à vontade no seu lar, sabendo que suas conversas, hábitos e horários são 100% privados.'
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
      fundamentos: 'Você possui e controla o hardware e o software. Sem assinaturas obrigatórias e sem risco de a fabricante desligar o servidor e inutilizar sua casa.',
      privilegios: 'Uma casa inteligente à prova de falhas. A internet caiu? Sua casa continua funcionando 100% com as mesmas capacidades.',
      valor: 'Independência total. É um investimento em um patrimônio tecnológico que pertence única e exclusivamente a você, projetado para durar.'
    }
  },
];

// ─── Feature Panel — 200vw horizontal, zero vertical scroll ─────────────────

// ─── Feature Panel — 200vw horizontal (desktop) / vertical stack (mobile) ────────
export function FeaturePanel({ isMobile }: { isMobile?: boolean }) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const activePillar = PILLARS.find(p => p.id === activeFeature);

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE — vertical single-column layout
  // ─────────────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ width: '100%' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#60a5fa', marginBottom: '0.75rem', display: 'inline-block', background: 'rgba(59,130,246,0.1)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(59,130,246,0.3)' }}>
            Como será sua casa?
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.92)' }}>
            Sem botões.<br />
            <span style={{ color: '#60a5fa' }}>Sem aplicativos.</span><br />
            <span style={{ color: 'rgba(255,255,255,0.38)' }}>Sem esforço.</span>
          </h2>
        </div>

        {/* Pillars — vertical stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {PILLARS.map(pillar => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFeature(pillar.id)}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(10,10,10,0.7)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${pillar.color}15`, border: `1px solid ${pillar.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={pillar.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>{pillar.title}</h3>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>{pillar.description}</p>
                  <span style={{ fontSize: '0.8rem', color: pillar.color, fontWeight: 500, marginTop: '0.75rem', display: 'block' }}>Ver detalhes →</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Privacy Counter */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.4rem' }}>Dados em Números</p>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '1.5rem' }}>
            Privacidade que <span style={{ color: '#60a5fa' }}>você pode medir.</span>
          </h3>
          <PrivacyCounter />
        </div>

        {/* Floor Plan */}
        <FloorPlanSVG />

        {/* Pillar Detail Modal */}
        {typeof document !== 'undefined' ? createPortal(
          <AnimatePresence>
            {activeFeature && activePillar && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0' }}
                onClick={() => setActiveFeature(null)}
              >
                <motion.div
                  initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  onClick={e => e.stopPropagation()}
                  style={{ width: '100%', maxHeight: '80dvh', overflowY: 'auto', background: 'rgba(12,12,20,0.98)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '1.5rem', border: `1px solid ${activePillar.color}20` }}
                >
                  {/* Drag handle */}
                  <div style={{ width: '40px', height: '4px', borderRadius: '99px', background: 'rgba(255,255,255,0.15)', margin: '0 auto 1.5rem' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.6rem', background: `${activePillar.color}20`, borderRadius: '10px' }}>
                      <activePillar.icon size={24} color={activePillar.color} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: 0 }}>{activePillar.title}</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.4rem', fontWeight: 600 }}>Fundamentos</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{activePillar.modalContent.fundamentos}</p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.4rem', fontWeight: 600 }}>Privilégios</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{activePillar.modalContent.privilegios}</p>
                    </div>
                    {activePillar.modalContent.valor && (
                      <div>
                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.4rem', fontWeight: 600 }}>Valor</h4>
                        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{activePillar.modalContent.valor}</p>
                      </div>
                    )}
                  </div>
                  <button onClick={() => setActiveFeature(null)} style={{ marginTop: '2rem', width: '100%', padding: '0.85rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer' }}>Fechar</button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        ) : null}
      </div>
    );
  }

  return (
    <>
      {/* ── Container: 200vw wide flex row, no overflow ─── */}
      <div
        id="features"
        style={{
          display: 'flex',
          width: '200vw',
          height: '100vh',
          flexShrink: 0,
        }}
      >
        {/* ══════════════════════════════════════════════════
            SUB-PANEL A — Header + 3 Pillar Cards
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5vw',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 50% 60% at 55% 50%, rgba(30,90,180,0.12) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '1200px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3rem',
            }}
          >
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 18 }}
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
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                Como será sua casa?
              </p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: '-0.03em',
                  color: 'rgba(255,255,255,0.92)',
                  maxWidth: '600px',
                }}
              >
                Sem botões.<br />
                <span style={{ color: '#60a5fa' }}>Sem aplicativos.</span><br />
                <span style={{ color: 'rgba(255,255,255,0.38)' }}>Sem esforço.</span>
              </h2>
            </motion.div>

            {/* Pillars grid — horizontal row */}
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
                  <ParallaxCard
                    key={pillar.title}
                    glowColor={`${pillar.color}40`}
                    onClick={() => setActiveFeature(pillar.id)}
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
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 18,
                        delay: i * 0.12,
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
                          fontSize: '1.05rem',
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
                          fontSize: '0.875rem',
                          lineHeight: 1.65,
                          color: 'rgba(255,255,255,0.45)',
                          marginBottom: '1.5rem',
                        }}
                      >
                        {pillar.description}
                      </p>

                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: pillar.color,
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        Ver detalhes <span style={{ fontSize: '1.1rem' }}>→</span>
                      </span>
                    </motion.div>
                  </ParallaxCard>
                );
              })}
            </div>

            {/* Hint: scroll right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'rgba(255,255,255,0.22)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              >
                →
              </motion.span>
              Ver planta cognitiva
            </motion.div>
          </div>

          {/* Wave divider on the right edge of Sub-panel A */}
          <EtherWaveDivider side="right" color="rgba(52, 211, 153, 0.25)" />
        </div>

        {/* ══════════════════════════════════════════════════
            SUB-PANEL B — Privacy Counter + Floor Plan
        ══════════════════════════════════════════════════ */}
        <div
          style={{
            width: '100vw',
            height: '100vh',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5rem 5vw 2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse 50% 70% at 70% 50%, rgba(96,165,250,0.08) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              maxWidth: '1200px',
              display: 'flex',
              gap: '4rem',
              alignItems: 'center',
            }}
          >
            {/* Left: Privacy Counter */}
            <div style={{ flex: '1 1 420px', minWidth: 0 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                style={{ marginBottom: '1.25rem' }}
              >
                <p
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Dados em Números
                </p>
                <h3
                  style={{
                    fontSize: 'clamp(1.3rem, 2vw, 2rem)',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.88)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                  }}
                >
                  Privacidade que{' '}
                  <span style={{ color: '#60a5fa' }}>você pode medir.</span>
                </h3>
              </motion.div>
              <PrivacyCounter />
            </div>

            {/* Right: Floor Plan */}
            <div style={{ flex: '1 1 380px', minWidth: 0 }}>
              <FloorPlanSVG />
            </div>
          </div>

          {/* Wave divider on the right edge of Sub-panel B */}
          <EtherWaveDivider side="right" color="rgba(167, 139, 250, 0.25)" />
        </div>
      </div>

      {/* ── Detail Modal (portal, outside panels track) ─── */}
      {typeof document !== 'undefined'
        ? createPortal(
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
                    padding: '2rem',
                  }}
                  onClick={() => setActiveFeature(null)}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={e => e.stopPropagation()}
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
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
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
                        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.5rem', fontWeight: 600 }}>Fundamentos</h4>
                        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                          {activePillar.modalContent.fundamentos}
                        </p>
                      </div>

                      <div>
                        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: activePillar.color, marginBottom: '0.5rem', fontWeight: 600 }}>Privilégios</h4>
                        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                          {activePillar.modalContent.privilegios}
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
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
}

export default FeaturePanel;
