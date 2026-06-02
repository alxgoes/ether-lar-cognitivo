import { motion } from 'framer-motion';

// ─── Props ────────────────────────────────────────────────────────────────
interface InteractiveDeckProps {
  onOpenGallery: () => void;
}

// ─── Interactive Deck Panel ───────────────────────────────────────────────
export function InteractiveDeck({ onOpenGallery }: InteractiveDeckProps) {
  return (
    <section
      className="panel"
      id="deck"
      style={{ width: '50vw', height: '100vh', position: 'relative' }}
    >
      {/* Section label */}
      <div
        style={{
          position: 'absolute',
          top: '8rem',
          left: '5rem',
          zIndex: 10,
        }}
      >
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

        {/* Brain icon button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 18 }}
          onClick={onOpenGallery}
          title="Explorar Galeria"
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <img
            src="/cereb.png"
            alt="Explorar"
            style={{ width: '36px', height: '36px', filter: 'invert(1)', opacity: 0.8 }}
          />
        </motion.button>
      </div>
    </section>
  );
}

export default InteractiveDeck;
