import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, Video, LayoutGrid, Info, ChevronDown, ArrowUpRight } from 'lucide-react';

// ─── Props ────────────────────────────────────────────────────────────────
interface InteractiveDeckProps {
  onOpenGallery: (tab: string) => void;
  isMobile?: boolean;
}

const MENU_ITEMS = [
  { id: 'fotos', label: 'Fotos', icon: Images },
  { id: 'videos', label: 'Vídeos', icon: Video },
  { id: 'cards', label: 'Informações', icon: LayoutGrid },
  { id: 'sobre', label: 'Sobre', icon: Info },
];

// ─── Interactive Deck Panel ───────────────────────────────────────────────
export function InteractiveDeck({ onOpenGallery, isMobile }: InteractiveDeckProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // ─── MOBILE: full-width accordion / tap to open gallery ───────────────
  if (isMobile) {
    return (
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.4rem' }}>
            Tecnologias do Lar Cognitivo
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.92)' }}>
            Explore o ecossistema.{' '}
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Mergulhe nos detalhes.</span>
          </h2>
        </div>

        {/* Menu items — tap opens gallery modal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {MENU_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07, type: 'spring', stiffness: 200, damping: 20 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenGallery(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '1.1rem 1.25rem',
                borderRadius: '14px',
                cursor: 'pointer',
                width: '100%',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <item.icon size={22} color="rgba(255,255,255,0.7)" />
                <span style={{ fontSize: '1rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: '-0.01em' }}>
                  {item.label}
                </span>
              </div>
              <ChevronDown size={18} color="rgba(255,255,255,0.35)" style={{ transform: 'rotate(-90deg)' }} />
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ─── DESKTOP: split layout ────────────────────────────────────────────
  return (
    <section
      className="panel md:!w-[100vw] flex justify-start items-center"
      id="deck"
      style={{ paddingLeft: '5vw', paddingRight: '5vw' }}
    >
      <div style={{ display: 'flex', width: '100%', maxWidth: '1600px', margin: '0 auto', gap: '4rem', alignItems: 'center' }}>

        {/* Left Side: Menu */}
        <div style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
            style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}
          >
            Tecnologias do Lar Cognitivo
          </motion.p>

          <motion.h2
            className="text-headline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 80 }}
            style={{ maxWidth: '440px', marginBottom: '3rem' }}
          >
            Explore o ecossistema.{' '}
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>Mergulhe nos detalhes.</span>
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MENU_ITEMS.map((item, index) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 200, damping: 18 }}
                  whileHover={{ x: 10, background: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(isActive ? null : item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)',
                    border: isActive ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.08)',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    width: '100%',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <item.icon size={24} color={isActive ? '#fff' : 'rgba(255,255,255,0.7)'} />
                  <span style={{ fontSize: '1.1rem', fontWeight: 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.8)', letterSpacing: '0.02em' }}>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Explorer Content */}
        <div
          style={{
            flex: 1,
            height: '70vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            {activeTab ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={() => onOpenGallery(activeTab)}
              >
                {(() => {
                  const found = MENU_ITEMS.find(m => m.id === activeTab);
                  if (!found) return null;
                  const Icon = found.icon;
                  return (
                    <>
                      <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Icon size={40} color="rgba(255,255,255,0.7)" />
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '1.25rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '0.5rem' }}>
                          {found.label}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
                          Clique para explorar em tela cheia
                        </p>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Abrir galeria</span>
                        <ArrowUpRight size={16} color="rgba(255,255,255,0.5)" />
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center',
                  color: 'rgba(255,255,255,0.2)',
                  userSelect: 'none',
                }}
              >
                <p style={{ fontSize: '0.9rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Selecione uma categoria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default InteractiveDeck;
