import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Room definitions ──────────────────────────────────────────────────────
// Each room corresponds to a feature. They light up in sequence.
const ROOMS = [
  {
    id: 'sala',
    label: 'Sala',
    feature: 'Controle de iluminação adaptativa',
    color: '#60a5fa',
    // SVG rect params
    x: 30, y: 30, width: 140, height: 100,
  },
  {
    id: 'cozinha',
    label: 'Cozinha',
    feature: 'Sensores de gás e temperatura',
    color: '#34d399',
    x: 185, y: 30, width: 95, height: 100,
  },
  {
    id: 'quarto',
    label: 'Quarto Principal',
    feature: 'Rotina de sono inteligente',
    color: '#a78bfa',
    x: 30, y: 145, width: 100, height: 105,
  },
  {
    id: 'escritorio',
    label: 'Escritório',
    feature: 'Modo foco — silêncio e clima',
    color: '#f59e0b',
    x: 145, y: 145, width: 135, height: 105,
  },
  {
    id: 'banheiro',
    label: 'Banheiro',
    feature: 'Aquecimento preditivo',
    color: '#38bdf8',
    x: 30, y: 265, width: 75, height: 70,
  },
  {
    id: 'corredor',
    label: 'Corredor',
    feature: 'Detecção de presença e rota',
    color: '#fb923c',
    x: 120, y: 265, width: 160, height: 70,
  },
];

// ─── FloorPlanSVG ──────────────────────────────────────────────────────────
export function FloorPlanSVG() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [litRooms, setLitRooms] = useState<Set<string>>(new Set());

  // Light up rooms one by one when section enters view
  const hasStartedRef = useRef(false);

  if (isInView && !hasStartedRef.current) {
    hasStartedRef.current = true;
    ROOMS.forEach((room, i) => {
      setTimeout(() => {
        setLitRooms((prev) => new Set([...prev, room.id]));
      }, i * 400 + 200);
    });
  }

  const activeRoom = hoveredRoom
    ? ROOMS.find((r) => r.id === hoveredRoom)
    : litRooms.size > 0
    ? ROOMS.find((r) => litRooms.has(r.id) && r.id === [...litRooms].at(-1))
    : null;

  return (
    <div
      ref={sectionRef}
      style={{
        width: '100%',
        marginTop: '5rem',
        padding: '0 0 2rem',
      }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 18 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '0.5rem',
          }}
        >
          Planta Cognitiva
        </p>
        <h3
          style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.02em',
          }}
        >
          Cada espaço tem{' '}
          <span style={{ color: '#60a5fa' }}>inteligência própria.</span>
        </h3>
      </motion.div>

      <div
        style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Floor plan SVG */}
        <div
          style={{
            position: 'relative',
            flex: '0 0 auto',
            filter: 'drop-shadow(0 0 30px rgba(96,165,250,0.08))',
          }}
        >
          <svg
            width="310"
            height="360"
            viewBox="0 0 310 360"
            style={{ overflow: 'visible' }}
          >
            {/* Outer walls */}
            <rect
              x="20"
              y="20"
              width="270"
              height="325"
              rx="6"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />

            {/* Interior walls */}
            {/* Vertical: sala | cozinha */}
            <line x1="180" y1="20" x2="180" y2="135" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* Horizontal: top | bottom half */}
            <line x1="20" y1="140" x2="290" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* Vertical: quarto | escritorio */}
            <line x1="140" y1="140" x2="140" y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* Horizontal: mid | lower */}
            <line x1="20" y1="260" x2="290" y2="260" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* Vertical: banheiro | corredor */}
            <line x1="110" y1="260" x2="110" y2="345" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />

            {/* Door arcs */}
            <path d="M 180 20 A 20 20 0 0 1 180 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path d="M 20 100 A 20 20 0 0 0 40 100" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <path d="M 140 200 A 20 20 0 0 1 160 200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            {/* Rooms */}
            {ROOMS.map((room) => {
              const isLit = litRooms.has(room.id);
              const isHovered = hoveredRoom === room.id;
              return (
                <g key={room.id}>
                  <motion.rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    rx="3"
                    fill={room.color}
                    animate={{
                      fillOpacity: isHovered ? 0.25 : isLit ? 0.12 : 0.02,
                      filter: isHovered
                        ? `drop-shadow(0 0 12px ${room.color})`
                        : isLit
                        ? `drop-shadow(0 0 6px ${room.color}60)`
                        : 'none',
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    style={{ cursor: 'pointer' }}
                  />
                  <motion.rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    rx="3"
                    fill="none"
                    stroke={room.color}
                    animate={{
                      strokeOpacity: isHovered ? 0.9 : isLit ? 0.45 : 0.08,
                      strokeWidth: isHovered ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={() => setHoveredRoom(room.id)}
                    onMouseLeave={() => setHoveredRoom(null)}
                    style={{ cursor: 'pointer', pointerEvents: 'none' }}
                  />

                  {/* Room label */}
                  <motion.text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    letterSpacing="0.08em"
                    fill={room.color}
                    animate={{ opacity: isLit ? 0.8 : 0.15 }}
                    transition={{ duration: 0.5 }}
                    style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
                  >
                    {room.label}
                  </motion.text>
                </g>
              );
            })}

            {/* Compass indicator */}
            <text x="280" y="345" fontSize="8" fill="rgba(255,255,255,0.2)" textAnchor="middle" fontFamily="Inter">N↑</text>
          </svg>
        </div>

        {/* Feature list — appears as rooms light up */}
        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingTop: '0.5rem' }}>
          {ROOMS.map((room, i) => {
            const isLit = litRooms.has(room.id);
            const isHovered = hoveredRoom === room.id;
            return (
              <motion.div
                key={room.id}
                animate={{
                  opacity: isLit ? 1 : 0.2,
                  x: isLit ? 0 : -8,
                }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.9rem',
                  borderRadius: '10px',
                  background: isHovered ? `${room.color}12` : 'transparent',
                  border: `1px solid ${isHovered ? room.color + '30' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: room.color,
                    flexShrink: 0,
                    boxShadow: isLit ? `0 0 8px ${room.color}` : 'none',
                    transition: 'box-shadow 0.4s',
                  }}
                />
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 600, color: room.color, marginBottom: '0.1rem' }}>
                    {room.label}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>
                    {room.feature}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FloorPlanSVG;
