import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Images, LayoutGrid, Video, Info } from 'lucide-react';

// ─── Tab Definitions ─────────────────────────────────────────────────────
const TABS = [
  { id: 'fotos', label: 'Fotos', icon: Images },
  { id: 'cards', label: 'Informações', icon: LayoutGrid },
  { id: 'videos', label: 'Vídeos', icon: Video },
  { id: 'sobre', label: 'Sobre', icon: Info },
];

// ─── Gallery Data ─────────────────────────────────────────────────────────
interface GalleryFoto {
  id: string;
  title: string;
  color: string;
  desc: string;
  src?: string;
}

const GALLERY_FOTOS: GalleryFoto[] = [
  { id: 'f1', title: 'Painel Central', color: '#60a5fa', desc: 'Interface principal do lar cognitivo com mapa de sensores em tempo real.', src: '/painelcent.jpeg' },
  { id: 'f2', title: 'Rack de Servidores', color: '#3b82f6', desc: 'Hardware local executando modelos de IA offline com zero latência de rede.', src: '/rackint.jpeg' },
  { id: 'f3', title: 'Sensor Biométrico', color: '#93c5fd', desc: 'Acesso seguro sem transmissão de dados para nuvem externa.' },
  { id: 'f4', title: 'Sala de Controle', color: '#1d4ed8', desc: 'Centro de gerenciamento com visualização holográfica dos ambientes.' },
  { id: 'f5', title: 'Ambiente Noturno', color: '#2563eb', desc: 'Cognição ambiental adaptando iluminação ao ciclo circadiano detectado.' },
  { id: 'f6', title: 'Rede Zigbee', color: '#60a5fa', desc: 'Mapeamento visual da topologia de malha local com 480+ dispositivos ativos.' },
];

const GALLERY_CARDS = [
  { id: 'c1', front: 'Zigbee Nativo', back: 'Comunicação direta entre dispositivos sem nuvem. Latência < 5ms com criptografia AES-128 end-to-end.', color: '#60a5fa' },
  { id: 'c2', front: 'IA 100% Local', back: 'Modelos LLM executando no rack residencial. Nenhum prompt sai da rede local.', color: '#a78bfa' },
  { id: 'c3', front: 'Privacidade Soberana', back: 'Zero dados enviados a terceiros. Criptografia AES-256 em todo armazenamento de padrões.', color: '#34d399' },
  { id: 'c4', front: 'Cognição Ambiental', back: 'O sistema observa padrões comportamentais e adapta o ambiente sem comandos manuais.', color: '#f59e0b' },
  { id: 'c5', front: 'Energia Preditiva', back: 'Monitoramento e otimização em tempo real. Integração com solar e baterias. -34% de consumo.', color: '#fbbf24' },
  { id: 'c6', front: 'Visão Computacional', back: 'Reconhecimento local de faces e objetos. Sem transmissão de imagens para servidores externos.', color: '#f472b6' },
];

const GALLERY_VIDEOS = [
  { id: 'v1', title: 'Visão especial', src: '/leo.mp4', color: '#10b981', duration: '' },
];

const SOBRE_ITEMS = [
  { id: 's1', title: 'Arquitetura Air-Gap', color: '#8b5cf6', desc: 'Rede completamente isolada de internet pública. Proteção física e lógica da sua soberania digital.' },
  { id: 's2', title: 'Criptografia AES-256', color: '#6366f1', desc: 'Cada byte de dado comportamental é cifrado antes de ser armazenado em disco.' },
  { id: 's3', title: 'Open Source Core', color: '#7c3aed', desc: 'Núcleo do sistema auditável publicamente. Sem backdoors, sem termos ocultos.' },
];

// ─── Flip Card ────────────────────────────────────────────────────────────
function FlipCard({ item }: { item: typeof GALLERY_CARDS[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{ width: '100%', minHeight: '180px', perspective: '1000px', cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        style={{ width: '100%', height: '100%', minHeight: '180px', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          borderRadius: '14px', padding: '1.5rem',
          background: `linear-gradient(135deg, rgba(20,20,20,0.9), ${item.color}22)`,
          border: `1px solid ${item.color}30`,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{item.front}</h3>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.4rem' }}>Clique para revelar →</p>
        </div>
        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          borderRadius: '14px', padding: '1.5rem', transform: 'rotateY(180deg)',
          background: 'rgba(10,10,10,0.95)',
          border: `1px solid ${item.color}50`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: item.color, marginBottom: '0.75rem' }}>{item.front}</h3>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{item.back}</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Photo Card ───────────────────────────────────────────────────────────
function PhotoCard({ item }: { item: GalleryFoto }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
        background: `linear-gradient(160deg, ${item.color}30, rgba(0,0,0,0.6))`,
        border: `1px solid ${item.color}25`,
        padding: '1.5rem',
      }}
    >
      <div style={{
        width: '100%', aspectRatio: '16/9', borderRadius: '8px', marginBottom: '1rem',
        background: `linear-gradient(135deg, ${item.color}40, rgba(5,5,15,0.8))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', position: 'relative'
      }}>
        {item.src ? (
          <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Images size={32} color={`${item.color}80`} />
        )}
      </div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.4rem' }}>{item.title}</h3>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</p>
    </motion.div>
  );
}

// ─── Video Card ───────────────────────────────────────────────────────────
function VideoCard({ item }: { item: typeof GALLERY_VIDEOS[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      style={{
        borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
        background: `linear-gradient(160deg, ${item.color}25, rgba(0,0,0,0.6))`,
        border: `1px solid ${item.color}30`,
        padding: '1.5rem',
      }}
    >
      <div style={{
        width: '100%', aspectRatio: '16/9', borderRadius: '8px', marginBottom: '1rem',
        background: `linear-gradient(135deg, ${item.color}30, rgba(5,5,15,0.8))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
        overflow: 'hidden'
      }}>
        {item.src ? (
          <video 
            src={item.src} 
            controls 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Video size={20} color="#fff" />
            </div>
            {item.duration && (
              <span style={{
                position: 'absolute', bottom: '0.5rem', right: '0.5rem',
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)',
                background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px',
              }}>{item.duration}</span>
            )}
          </>
        )}
      </div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>{item.title}</h3>
    </motion.div>
  );
}

// ─── Gallery Modal ────────────────────────────────────────────────────────
interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export function GalleryModal({ isOpen, onClose, initialTab }: GalleryModalProps) {
  const [activeTab, setActiveTab] = useState<string>('fotos');

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  // Hide the site navbar while gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('gallery-open');
    } else {
      document.body.classList.remove('gallery-open');
    }
    return () => document.body.classList.remove('gallery-open');
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="gallery-modal"
          data-drag-zone="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 8000,
            background: 'rgba(0,0,0,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Fixed inner wrapper */}
          <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* ── Taskbar ───────────────────────────────── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem 2rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              gap: '0.5rem',
            }}>
              {/* Left: title */}
              <div style={{ position: 'absolute', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src="/cereb.png" alt="Ether" style={{ width: '24px', height: '24px', opacity: 0.7, filter: 'invert(1)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.02em' }}>
                  Ether Explorer
                </span>
              </div>

              {/* Center: tab icons */}
              <div style={{ display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '0.35rem' }}>
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      title={tab.label}
                      whileTap={{ scale: 0.93 }}
                      style={{
                        width: '42px', height: '42px',
                        borderRadius: '8px',
                        background: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                        border: 'none',
                        color: isActive ? '#fff' : 'rgba(255,255,255,0.35)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                      }}
                    >
                      <Icon size={18} />
                    </motion.button>
                  );
                })}
              </div>

              {/* Right: close */}
              <motion.button
                onClick={handleClose}
                title="Fechar"
                whileHover={{ background: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.93 }}
                style={{
                  position: 'absolute', right: '2rem',
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* ── Content ───────────────────────────────── */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
              style={{ flex: 1, padding: '2.5rem 3rem', maxWidth: '1280px', width: '100%', margin: '0 auto' }}
            >
              {/* Section title */}
              <h2 style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 700,
                letterSpacing: '-0.04em', color: '#fff', marginBottom: '0.5rem',
              }}>
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
                {activeTab === 'fotos' && 'Visualizações do sistema Ether em operação'}
                {activeTab === 'cards' && 'Clique nos cards para revelar os detalhes técnicos'}
                {activeTab === 'videos' && 'Conteúdo demonstrativo do ecossistema Ether'}
                {activeTab === 'sobre' && 'Fundamentos técnicos e filosofia de privacidade'}
              </p>

              {/* Fotos */}
              {activeTab === 'fotos' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {GALLERY_FOTOS.map(item => <PhotoCard key={item.id} item={item} />)}
                </div>
              )}

              {/* Cards */}
              {activeTab === 'cards' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {GALLERY_CARDS.map(item => <FlipCard key={item.id} item={item} />)}
                </div>
              )}

              {/* Videos */}
              {activeTab === 'videos' && (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <div style={{ width: '100%', maxWidth: '600px' }}>
                    {GALLERY_VIDEOS.map(item => <VideoCard key={item.id} item={item} />)}
                  </div>
                </div>
              )}

              {/* Sobre */}
              {activeTab === 'sobre' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Dinâmica do Sistema ETHER
                  </h3>
                  <div style={{
                    width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden',
                    background: `linear-gradient(135deg, rgba(20,20,30,0.8), rgba(5,5,15,0.8))`,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
                  }}>
                    <video 
                      src="/leo.mp4" 
                      controls 
                      autoPlay
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <p style={{ marginTop: '1.5rem', fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.6 }}>
                    Uma demonstração prática de como a inteligência cognitiva antecipa necessidades sem exigir comandos explícitos.
                  </p>
                </div>
              )}
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GalleryContent({ activeTab }: { activeTab: string }) {
  return (
    <motion.div
      key={activeTab}
      data-drag-zone="true"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        flex: 1,
        padding: '2rem',
        width: '100%',
        height: '100%',
        background: 'rgba(10,10,10,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px',
        overflowY: 'auto',
      }}
      className="custom-scrollbar"
    >
      <h2 style={{
        fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', fontWeight: 700,
        letterSpacing: '-0.04em', color: '#fff', marginBottom: '0.5rem',
      }}>
        {TABS.find(t => t.id === activeTab)?.label}
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
        {activeTab === 'fotos' && 'Visualizações do sistema Ether em operação'}
        {activeTab === 'cards' && 'Clique nos cards para revelar os detalhes técnicos'}
        {activeTab === 'videos' && 'Conteúdo demonstrativo do ecossistema Ether'}
        {activeTab === 'sobre' && 'Fundamentos técnicos e filosofia de privacidade'}
      </p>

      {/* Fotos */}
      {activeTab === 'fotos' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {GALLERY_FOTOS.map(item => <PhotoCard key={item.id} item={item} />)}
        </div>
      )}

      {/* Cards */}
      {activeTab === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {GALLERY_CARDS.map(item => <FlipCard key={item.id} item={item} />)}
        </div>
      )}

      {/* Videos */}
      {activeTab === 'videos' && (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ width: '100%' }}>
            {GALLERY_VIDEOS.map(item => <VideoCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {/* Sobre */}
      {activeTab === 'sobre' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem', textAlign: 'center' }}>
            Dinâmica do Sistema ETHER
          </h3>
          <div style={{
            width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden',
            background: `linear-gradient(135deg, rgba(20,20,30,0.8), rgba(5,5,15,0.8))`,
            border: `1px solid rgba(255,255,255,0.1)`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <video 
              src="/leo.mp4" 
              controls 
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '1rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.6 }}>
            Uma demonstração prática de como a inteligência cognitiva antecipa necessidades sem exigir comandos explícitos.
          </p>
        </div>
      )}
    </motion.div>
  );
}
