import { motion, useTime, useTransform } from 'framer-motion';

interface EtherWaveDividerProps {
  /** Side of the panel where the divider sits */
  side?: 'right' | 'left';
  /** Base color of the wave stroke */
  color?: string;
}

export function EtherWaveDivider({
  side = 'right',
  color = 'rgba(96, 165, 250, 0.35)',
}: EtherWaveDividerProps) {
  const time = useTime();

  // Animate the wave's amplitude and phase
  const phase = useTransform(time, (t) => t * 0.001);

  // Generate SVG path for a sine wave: vertical strip
  // We'll use multiple animated path points

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        [side]: -1,
        width: '80px',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 20,
        overflow: 'visible',
      }}
    >
      <svg
        width="80"
        height="100%"
        viewBox="0 0 80 800"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <defs>
          <filter id="wave-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="wave-gradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="20%" stopColor={color} stopOpacity="1" />
            <stop offset="80%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary wave */}
        <WavePath color="url(#wave-gradient)" phase={phase} amplitude={22} speed={1} strokeWidth={1.5} />

        {/* Secondary wave — offset, thinner */}
        <WavePath color={color} phase={phase} amplitude={14} speed={1.4} strokeWidth={0.6} opacity={0.4} phaseOffset={1.2} />

        {/* Tertiary subtle wave */}
        <WavePath color={color} phase={phase} amplitude={8} speed={0.7} strokeWidth={0.4} opacity={0.2} phaseOffset={2.5} />
      </svg>
    </div>
  );
}

// ─── Individual Animated Wave Path ───────────────────────────────────────
function WavePath({
  color,
  phase,
  amplitude,
  speed,
  strokeWidth,
  opacity = 1,
  phaseOffset = 0,
}: {
  color: string;
  phase: ReturnType<typeof useTransform>;
  amplitude: number;
  speed: number;
  strokeWidth: number;
  opacity?: number;
  phaseOffset?: number;
}) {
  const cx = 40; // center x of the 80-wide strip

  // Number of sample points along the 800-unit height
  const POINTS = 60;

  const d = useTransform(phase, (p: number) => {
    let path = '';
    for (let i = 0; i <= POINTS; i++) {
      const y = (i / POINTS) * 800;
      const x = cx + Math.sin(i * 0.22 + p * speed + phaseOffset) * amplitude;
      if (i === 0) path += `M ${x} ${y}`;
      else path += ` L ${x} ${y}`;
    }
    return path;
  });

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity={opacity}
      filter="url(#wave-glow)"
      style={{ willChange: 'd' }}
    />
  );
}

export default EtherWaveDivider;
