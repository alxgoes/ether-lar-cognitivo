import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { NeuralCanvas } from './components/NeuralCanvas';
import { HeroPanel } from './components/HeroPanel';
import { FeaturePanel } from './components/FeaturePanel';
import { InteractiveDeck } from './components/InteractiveDeck';
import { GalleryModal } from './components/GalleryModal';
import { CreditsPanel } from './components/CreditsPanel';

// ─── Custom Cursor ────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [dotX, dotY]);

  return (
    <>
      <motion.div
        id="cursor-dot"
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#ffffff',
          pointerEvents: 'none',
          zIndex: 9999,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        id="cursor-ring"
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.45)',
          background: 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}

// ─── Panel widths — keep in sync with component definitions ───────────────
// Panel 1: 100vw, Panel 2: 100vw, Panel 3: 50vw, Panel 4: 100vw  → total 350vw
const TOTAL_WIDTH_VW = 350;

// ─── App ──────────────────────────────────────────────────────────────────
function App() {
  // Raw scroll offset (px)
  const rawX = useMotionValue(0);

  // Smoothed x with inertia spring — the "soul" of horizontal scroll
  const smoothX = useSpring(rawX, {
    stiffness: 80,
    damping: 22,
    mass: 0.8,
  });

  // Expose numeric offset for NeuralCanvas camera parallax
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Track the maximum scrollable width
  const maxScrollRef = useRef(0);

  useEffect(() => {
    const updateMax = () => {
      maxScrollRef.current =
        (TOTAL_WIDTH_VW / 100) * window.innerWidth - window.innerWidth;
    };
    updateMax();
    window.addEventListener('resize', updateMax, { passive: true });
    return () => window.removeEventListener('resize', updateMax);
  }, []);

  // Wheel → horizontal translation
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Allow vertical scroll within card deck area for drag
      if ((e.target as Element)?.closest('[data-drag-zone]')) return;

      e.preventDefault();
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      const current = rawX.get();
      const next = Math.max(
        -maxScrollRef.current,
        Math.min(0, current - delta)
      );
      rawX.set(next);
    },
    [rawX]
  );

  useEffect(() => {
    const el = document.documentElement;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Touch support for horizontal scroll
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = touchStartX.current - e.touches[0].clientX;
      const dy = Math.abs(touchStartY.current - e.touches[0].clientY);
      if (Math.abs(dx) > dy) {
        e.preventDefault();
        const current = rawX.get();
        const next = Math.max(
          -maxScrollRef.current,
          Math.min(0, current - dx * 0.5)
        );
        rawX.set(next);
        touchStartX.current = e.touches[0].clientX;
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [rawX]);

  // Subscribe to smoothX to update scrollOffset for parallax
  useEffect(() => {
    const unsub = smoothX.on('change', (v) => {
      setScrollOffset(Math.abs(v));
    });
    return unsub;
  }, [smoothX]);

  // Cursor hover state management
  useEffect(() => {
    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');
    const interactives = document.querySelectorAll(
      'button, a, [data-interactive]'
    );
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Fixed neural background */}
      <NeuralCanvas scrollOffset={scrollOffset} />

      {/* Fixed Navbar */}
      <div id="site-navbar" style={{ transition: 'opacity 0.25s ease' }}>
        <Navbar />
      </div>

      {/* Horizontal Scroll Root */}
      <div
        id="horizontal-scroll-root"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <motion.div
          id="panels-track"
          style={{
            display: 'flex',
            height: '100vh',
            width: `${TOTAL_WIDTH_VW}vw`,
            x: smoothX,
            willChange: 'transform',
          }}
        >
          {/* Panel 1: Hero */}
          <HeroPanel />

          {/* Panel 2: Feature */}
          <FeaturePanel />

          {/* Panel 3: Interactive Deck (150vw wide) */}
          <InteractiveDeck onOpenGallery={() => setIsGalleryOpen(true)} />

          {/* Panel 4: Credits (100vw) */}
          <CreditsPanel />
        </motion.div>
      </div>

      {/* Gallery Modal — rendered at root level, outside transformed track */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} />

      {/* Scroll progress indicator */}
      <motion.div
        id="scroll-dots"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          translateX: '-50%',
          display: 'flex',
          gap: '6px',
          zIndex: 500,
        }}
      >
        {[0, 1, 2, 3].map((i) => {
          const panelWidths = [100, 100, 50, 100];
          const panelStartVW = panelWidths.slice(0, i).reduce((a, b) => a + b, 0);
          const panelStart = (panelStartVW / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920);

          return (
            <motion.button
              key={i}
              onClick={() => {
                rawX.set(-panelStart);
              }}
              style={{
                width: i === 2 ? 24 : 6,
                height: 6,
                borderRadius: 99,
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              whileHover={{ background: 'rgba(255,255,255,0.5)' }}
            />
          );
        })}
      </motion.div>
    </>
  );
}

export default App;
