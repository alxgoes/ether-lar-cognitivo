import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = ['História', 'Tecnologia', 'Contato', 'Quem somos nós'] as const;

// ─── Navbar Component ─────────────────────────────────────────────────────
export function Navbar({ onNavClick }: { onNavClick?: (link: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  // Detect if user has scrolled (to intensify blur)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.5 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <nav
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.5rem 0.5rem 1.5rem',
          background: scrolled
            ? 'rgba(8,8,8,0.82)'
            : 'rgba(10,10,10,0.65)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '999px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavClick?.('logo')}
          style={{
            marginRight: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <img src="/nomelog.png" alt="Logo" style={{ height: '34px', objectFit: 'contain' }} />
        </motion.div>

        {/* Nav Links & Divider - hidden on mobile */}
        <div className="hidden md:flex items-center">
          <div
            style={{
              width: '1px',
              height: '18px',
              background: 'rgba(255,255,255,0.1)',
              marginRight: '0.5rem',
            }}
          />
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link}
              label={link}
              isActive={activeLink === link}
              onHover={(active) => setActiveLink(active ? link : null)}
              onClick={() => onNavClick?.(link)}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => onNavClick?.('Iniciar Jornada')}
          whileHover={{
            scale: 1.04,
            boxShadow: '0 0 20px rgba(255,255,255,0.15)',
          }}
          whileTap={{ scale: 0.96 }}
          style={{
            marginLeft: '0.5rem',
            padding: '0.6rem 1.25rem',
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            borderRadius: '99px',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}
        >
          Iniciar Jornada
        </motion.button>
      </nav>
    </motion.div>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────
interface NavLinkProps {
  label: string;
  isActive: boolean;
  onHover: (active: boolean) => void;
  onClick?: () => void;
}

function NavLink({ label, isActive, onHover, onClick }: NavLinkProps) {
  return (
    <motion.a
      href="#"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      style={{
        position: 'relative',
        padding: '0.45rem 0.9rem',
        fontSize: '0.88rem',
        fontWeight: 500,
        color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)',
        textDecoration: 'none',
        borderRadius: '99px',
        transition: 'color 0.2s ease',
      }}
    >
      <AnimatePresence>
        {isActive && (
          <motion.span
            layoutId="nav-hover-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.07)',
              borderRadius: '99px',
            }}
          />
        )}
      </AnimatePresence>
      {label}
    </motion.a>
  );
}

export default Navbar;
