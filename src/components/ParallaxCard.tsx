import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ParallaxCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  glowColor?: string;
}

export function ParallaxCard({
  children,
  className,
  style,
  onClick,
  glowColor = 'rgba(96, 165, 250, 0.25)',
}: ParallaxCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(rawY, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rawX, { stiffness: 200, damping: 25 });

  // Shine position follows cursor
  const shineX = useTransform(rawX, [-15, 15], ['0%', '100%']);
  const shineY = useTransform(rawY, [-15, 15], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Normalize to ±15 degrees
    const xDeg = (dy / (rect.height / 2)) * -12;
    const yDeg = (dx / (rect.width / 2)) * 12;
    rawX.set(yDeg);
    rawY.set(xDeg);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '800px',
        transformStyle: 'preserve-3d',
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Shine layer */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 10,
            background: `radial-gradient(circle at ${shineX} ${shineY}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Glow effect on hover */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 0,
            boxShadow: `0 0 0px ${glowColor}`,
          }}
          whileHover={{
            boxShadow: `0 20px 60px ${glowColor}, 0 0 30px ${glowColor}`,
          }}
          transition={{ duration: 0.3 }}
        />

        {children}
      </motion.div>
    </motion.div>
  );
}

export default ParallaxCard;
