import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, Video, LayoutGrid, Info } from 'lucide-react';
import { GalleryContent } from './GalleryModal';

// ─── Props ────────────────────────────────────────────────────────────────
interface InteractiveDeckProps {
  onOpenGallery: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'fotos', label: 'Fotos', icon: Images },
  { id: 'videos', label: 'Vídeos', icon: Video },
  { id: 'cards', label: 'Informações', icon: LayoutGrid },
  { id: 'sobre', label: 'Sobre', icon: Info },
];

// ─── Interactive Deck Panel ───────────────────────────────────────────────
export function InteractiveDeck({ onOpenGallery }: InteractiveDeckProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

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
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '0.5rem',
            }}
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
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>
              Mergulhe nos detalhes.
            </span>
          </motion.h2>

          {/* Vertical List Menu */}
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
                    transition: 'all 0.2s ease'
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
        <div style={{ flex: 1, height: '70vh', position: 'relative' }} data-drag-zone="true">
          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%', height: '100%' }}
              >
                <GalleryContent activeTab={activeTab} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

export default InteractiveDeck;
