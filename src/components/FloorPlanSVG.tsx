import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── Room definitions ──────────────────────────────────────────────────────
const ROOMS = [
  {
    id: 'sala',
    label: 'Sala',
    feature: 'Controle de iluminação adaptativa',
    color: '#60a5fa',
    x: 20, y: 20, width: 115, height: 82,
  },
  {
    id: 'cozinha',
    label: 'Cozinha',
    feature: 'Sensores de gás e temperatura',
    color: '#34d399',
    x: 148, y: 20, width: 82, height: 82,
  },
  {
    id: 'quarto',
    label: 'Quarto',
    feature: 'Rotina de sono inteligente',
    color: '#a78bfa',
    x: 20, y: 115, width: 84, height: 88,
  },
  {
    id: 'escritorio',
    label: 'Escritório',
    feature: 'Modo foco — silêncio e clima',
    color: '#f59e0b',
    x: 116, y: 115, width: 114, height: 88,
  },
  {
    id: 'banheiro',
    label: 'Banheiro',
    feature: 'Aquecimento preditivo',
    color: '#38bdf8',
    x: 20, y: 215, width: 62, height: 58,
  },
  {
    id: 'corredor',
    label: 'Corredor',
    feature: 'Detecção de presença e rota',
    color: '#fb923c',
    x: 94, y: 215, width: 136, height: 58,
  },
];

// SVG viewBox constants — scaled-down floor plan
const SVG_W = 250;
const SVG_H = 290;

// ─── FloorPlanSVG ──────────────────────────────────────────────────────────
export function FloorPlanSVG() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-60px' });

  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [litRooms, setLitRooms] = useState<Set<string>>(new Set());

  // Light up rooms one by one when section enters view
  const hasStartedRef = useRef(false);
  if (isInView && !hasStartedRef.current) {
    hasStartedRef.current = true;
    ROOMS.forEach((room, i) => {
      setTimeout(() => {
        setLitRooms(prev => new Set([...prev, room.id]));
      }, i * 350 + 150);
    });
  }

  return (
    <div
      ref={sectionRef}
      style={{ width: '100%' }}
    >
      {/* Section label — compact header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 18 }}
        style={{ marginBottom: '1.25rem' }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            marginBottom: '0.3rem',
          }}
        >
          Planta Cognitiva
        </p>
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}
        >
          Cada espaço tem{' '}
          <span style={{ color: '#60a5fa' }}>inteligência própria.</span>
        </h3>
      </motion.div>

      {/* SVG + Room list — side by side, no wrapping */}
      <div
        style={{
          display: 'flex',
          gap: '1.75rem',
          alignItems: 'flex-start',
          flexWrap: 'nowrap',
        }}
      >
        {/* Floor plan SVG — scaled down */}
        <div
          style={{
            flexShrink: 0,
            filter: 'drop-shadow(0 0 24px rgba(96,165,250,0.1))',
          }}
        >
          <svg
            width={SVG_W}
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ overflow: 'visible', display: 'block' }}
          >
            {/* Outer walls */}
            <rect
              x="12"
              y="12"
              width="226"
              height="264"
              rx="5"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
            />

            {/* Interior walls */}
            <line x1="148" y1="12" x2="148" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
            <line x1="12" y1="110" x2="238" y2="110" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
            <line x1="116" y1="110" x2="116" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
            <line x1="12" y1="210" x2="238" y2="210" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
            <line x1="94" y1="210" x2="94" y2="276" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />

            {/* Door arcs */}
            <path d="M 148 12 A 16 16 0 0 1 148 28" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            <path d="M 12 80 A 16 16 0 0 0 28 80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />

            {/* Rooms */}
            {ROOMS.map(room => {
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
                      fillOpacity: isHovered ? 0.28 : isLit ? 0.13 : 0.02,
                    }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
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
                      strokeOpacity: isHovered ? 0.9 : isLit ? 0.5 : 0.08,
                      strokeWidth: isHovered ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.45 }}
                    style={{ pointerEvents: 'none' }}
                  />
                  <motion.text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    letterSpacing="0.06em"
                    fill={room.color}
                    animate={{ opacity: isLit ? 0.8 : 0.12 }}
                    transition={{ duration: 0.45 }}
                    style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
                  >
                    {room.label}
                  </motion.text>
                </g>
              );
            })}

            {/* Compass */}
            <text x="228" y="278" fontSize="7" fill="rgba(255,255,255,0.2)" textAnchor="middle" fontFamily="Inter">N↑</text>
          </svg>
        </div>

        {/* Room list — beside SVG, compact items */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            minWidth: 0,
          }}
        >
          {ROOMS.map((room, i) => {
            const isLit = litRooms.has(room.id);
            const isHovered = hoveredRoom === room.id;
            return (
              <motion.div
                key={room.id}
                animate={{
                  opacity: isLit ? 1 : 0.2,
                  x: isLit ? 0 : -6,
                }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.45rem 0.7rem',
                  borderRadius: '8px',
                  background: isHovered ? `${room.color}12` : 'transparent',
                  border: `1px solid ${isHovered ? room.color + '30' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: room.color,
                    flexShrink: 0,
                    boxShadow: isLit ? `0 0 7px ${room.color}` : 'none',
                    transition: 'box-shadow 0.4s',
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: room.color, marginBottom: '0.05rem', whiteSpace: 'nowrap' }}>
                    {room.label}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
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
