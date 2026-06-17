import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { NeuralCanvas } from './components/NeuralCanvas';
import { HeroPanel } from './components/HeroPanel';
import { FeaturePanel } from './components/FeaturePanel';
import { InteractiveDeck } from './components/InteractiveDeck';
import { GalleryModal } from './components/GalleryModal';
import { CreditsPanel } from './components/CreditsPanel';
import { HistoryModal } from './components/HistoryModal';
import { ContactModal } from './components/ContactModal';
import { DocumentModal } from './components/DocumentModal';
import { AudioPlayer } from './components/AudioPlayer';
import { ManifestoModal } from './components/ManifestoModal';
import { BioluminescentCursor } from './components/BioluminescentCursor';
import { EtherWaveDivider } from './components/EtherWaveDivider';

// ─── Panel widths — desktop only ──────────────────────────────────────────
// Panel 1: 100vw, Panel 2: 200vw (2 sub-panels), Panel 3: 100vw, Panel 4: 100vw → total 500vw
const TOTAL_WIDTH_VW = 500;

// Snap points (vw from left edge) for each major section
const PANEL_STOPS_VW = [0, 100, 200, 300, 400];

// ─── Hook: detect mobile ──────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

// ─── App ──────────────────────────────────────────────────────────────────
function App() {
  const isMobile = useIsMobile();

  // Raw scroll offset (px) — desktop only
  const rawX = useMotionValue(0);

  // Smoothed x with inertia spring
  const smoothX = useSpring(rawX, {
    stiffness: 80,
    damping: 22,
    mass: 0.8,
  });

  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialTab, setGalleryInitialTab] = useState<string | undefined>(undefined);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [openDoc, setOpenDoc] = useState<'privacidade' | 'termos' | 'compliance' | null>(null);

  const maxScrollRef = useRef(0);

  const bgColor = useTransform(
    smoothX,
    [-4000, -2000, 0],
    ['#030d1a', '#020814', '#020210']
  );

  useEffect(() => {
    if (isMobile) return;
    const updateMax = () => {
      maxScrollRef.current =
        (TOTAL_WIDTH_VW / 100) * window.innerWidth - window.innerWidth;
    };
    updateMax();
    window.addEventListener('resize', updateMax, { passive: true });
    return () => window.removeEventListener('resize', updateMax);
  }, [isMobile]);

  // ── Desktop: wheel → horizontal translation ──────────────────────────
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // Hard guard: NEVER intercept on mobile
      if (window.innerWidth <= 768) return;

      const target = e.target as Element;
      const scrollableParent = target?.closest('[data-drag-zone]');
      if (scrollableParent) {
        const el = scrollableParent as HTMLElement;
        const canScrollVertically = el.scrollHeight > el.clientHeight + 2;
        const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.5;
        if (canScrollVertically && isVerticalScroll) return;
      }

      e.preventDefault();
      const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      const current = rawX.get();
      const next = Math.max(-maxScrollRef.current, Math.min(0, current - delta));
      rawX.set(next);
    },
    [rawX]
  );

  useEffect(() => {
    // Always attach — the handler itself guards against mobile
    const el = document.documentElement;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // ── Desktop: touch → horizontal translation ──────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (isMobile) return;
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
        const next = Math.max(-maxScrollRef.current, Math.min(0, current - dx * 0.5));
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
  }, [rawX, isMobile]);

  // ── Subscribe to smoothX (desktop parallax + dots) ───────────────────
  useEffect(() => {
    if (isMobile) return;
    const unsub = smoothX.on('change', (v) => {
      const absV = Math.abs(v);
      setScrollOffset(absV);
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const stopIdx = PANEL_STOPS_VW.reduce((best, stopVW, i) => {
        const stopPx = (stopVW / 100) * vw;
        const bestPx = (PANEL_STOPS_VW[best] / 100) * vw;
        return Math.abs(absV - stopPx) < Math.abs(absV - bestPx) ? i : best;
      }, 0);
      setActiveIndex(stopIdx);
    });
    return unsub;
  }, [smoothX, isMobile]);

  // ── Cursor hover state (desktop only) ───────────────────────────────
  useEffect(() => {
    if (isMobile) return;
    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');
    const interactives = document.querySelectorAll('button, a, [data-interactive]');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => {
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [isMobile]);

  // ── Nav click handler ────────────────────────────────────────────────
  const handleNavClick = useCallback((link: string) => {
    if (link === 'História') {
      setIsHistoryOpen(true);
    } else if (link === 'logo') {
      if (isMobile) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        rawX.set(0);
      }
    } else if (link === 'Iniciar Jornada') {
      if (isMobile) {
        document.getElementById('features-mobile')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        rawX.set(-(100 / 100) * window.innerWidth);
      }
    } else if (link === 'Tecnologia') {
      if (isMobile) {
        document.getElementById('deck-mobile')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        rawX.set(-(300 / 100) * window.innerWidth);
      }
    } else if (link === 'Contato') {
      setIsContactOpen(true);
    } else if (link === 'Quem somos nós') {
      if (isMobile) {
        document.getElementById('credits-mobile')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        rawX.set(-(400 / 100) * window.innerWidth);
      }
    }
  }, [isMobile, rawX]);

  // ─────────────────────────────────────────────────────────────────────
  // MOBILE LAYOUT — normal vertical scroll
  // ─────────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <NeuralCanvas scrollOffset={0} />

        <div id="site-navbar" style={{ transition: 'opacity 0.25s ease' }}>
          <Navbar onNavClick={handleNavClick} isMobile />
        </div>

        {/* Vertical stack of sections */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Hero */}
          <section
            id="hero-mobile"
            style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 3rem' }}
          >
            <HeroPanel
              onStartJourney={() => document.getElementById('features-mobile')?.scrollIntoView({ behavior: 'smooth' })}
              onOpenManifesto={() => setIsManifestoOpen(true)}
              isMobile
            />
          </section>

          {/* Features */}
          <section
            id="features-mobile"
            style={{ padding: '4rem 1.5rem' }}
          >
            <FeaturePanel isMobile />
          </section>

          {/* Tecnologia */}
          <section
            id="deck-mobile"
            style={{ padding: '4rem 1.5rem' }}
          >
            <InteractiveDeck
              onOpenGallery={(tab) => {
                setGalleryInitialTab(tab);
                setIsGalleryOpen(true);
              }}
              isMobile
            />
          </section>

          {/* Quem somos nós */}
          <section
            id="credits-mobile"
            style={{ padding: '4rem 1.5rem 3rem' }}
          >
            <CreditsPanel onOpenDoc={setOpenDoc} />
          </section>
        </div>

        {/* Modals */}
        <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} initialTab={galleryInitialTab} />
        <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />
        <DocumentModal documentId={openDoc} onClose={() => setOpenDoc(null)} />
        <AudioPlayer />
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────
  // DESKTOP LAYOUT — horizontal scroll
  // ─────────────────────────────────────────────────────────────────────
  return (
    <>
      <BioluminescentCursor />

      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: bgColor,
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />

      <NeuralCanvas scrollOffset={scrollOffset} />

      <div id="site-navbar" style={{ transition: 'opacity 0.25s ease' }}>
        <Navbar onNavClick={handleNavClick} />
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
          {/* Panel 1: Hero — 100vw */}
          <div style={{ position: 'relative', flexShrink: 0, width: '100vw' }}>
            <HeroPanel
              onStartJourney={() => rawX.set(-(100 / 100) * window.innerWidth)}
              onOpenManifesto={() => setIsManifestoOpen(true)}
            />
            <EtherWaveDivider side="right" />
          </div>

          {/* Panel 2: Feature — 200vw */}
          <FeaturePanel />

          {/* Panel 3: Interactive Deck — 100vw, starts at 300vw */}
          <div style={{ position: 'relative', flexShrink: 0, width: '100vw' }}>
            <InteractiveDeck onOpenGallery={(tab) => {
              setGalleryInitialTab(tab);
              setIsGalleryOpen(true);
            }} />
            <EtherWaveDivider side="right" color="rgba(167, 139, 250, 0.25)" />
          </div>

          {/* Panel 4: Credits — 100vw, starts at 400vw */}
          <div style={{ position: 'relative', flexShrink: 0, width: '100vw' }}>
            <CreditsPanel onOpenDoc={setOpenDoc} />
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <GalleryModal isOpen={isGalleryOpen} onClose={() => setIsGalleryOpen(false)} initialTab={galleryInitialTab} />
      <HistoryModal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ManifestoModal isOpen={isManifestoOpen} onClose={() => setIsManifestoOpen(false)} />
      <DocumentModal documentId={openDoc} onClose={() => setOpenDoc(null)} />
      <AudioPlayer />

      {/* Scroll progress dots */}
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
        {PANEL_STOPS_VW.map((stopVW, i) => {
          const panelStart = (stopVW / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920);
          return (
            <motion.button
              key={i}
              onClick={() => rawX.set(-panelStart)}
              animate={{
                width: i === activeIndex ? 24 : 6,
                background: i === activeIndex ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)',
              }}
              transition={{ duration: 0.3 }}
              style={{ height: 6, borderRadius: 99, border: 'none', cursor: 'pointer', padding: 0 }}
              whileHover={{ background: 'rgba(255,255,255,0.5)' }}
            />
          );
        })}
      </motion.div>
    </>
  );
}

export default App;
