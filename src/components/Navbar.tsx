import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = ['História', 'Tecnologia', 'Contato', 'Quem somos nós'] as const;

interface NavbarProps {
  onNavClick?: (link: string) => void;
  isMobile?: boolean;
}

// ─── Navbar Component ─────────────────────────────────────────────────────
export function Navbar({ onNavClick, isMobile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize back to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  const handleLink = (link: string) => {
    setMenuOpen(false);
    onNavClick?.(link);
  };

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.5 }}
        style={{
          position: 'fixed',
          top: '1rem',
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 1rem',
        }}
      >
        <nav
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: isMobile ? '0.5rem 0.75rem' : '0.5rem 0.5rem 0.5rem 1.5rem',
            background: scrolled ? 'rgba(8,8,8,0.88)' : 'rgba(10,10,10,0.72)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '999px',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
            transition: 'background 0.4s ease, box-shadow 0.4s ease',
            width: isMobile ? '100%' : 'auto',
            maxWidth: isMobile ? '480px' : 'none',
            justifyContent: isMobile ? 'space-between' : 'flex-start',
          }}
        >
          {/* Logo */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            onClick={() => handleLink('logo')}
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          >
            <img
              src="/nomelog.png"
              alt="Logo"
              style={{ height: isMobile ? '28px' : '34px', objectFit: 'contain' }}
            />
          </motion.div>

          {/* Desktop: Nav Links */}
          {!isMobile && (
            <div className="hidden md:flex items-center">
              <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', marginRight: '0.5rem' }} />
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link}
                  label={link}
                  isActive={activeLink === link}
                  onHover={active => setActiveLink(active ? link : null)}
                  onClick={() => handleLink(link)}
                />
              ))}
            </div>
          )}

          {/* Desktop: CTA */}
          {!isMobile && (
            <motion.button
              onClick={() => handleLink('Iniciar Jornada')}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(255,255,255,0.15)' }}
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
          )}

          {/* Mobile: Hamburger */}
          {isMobile && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          )}
        </nav>
      </motion.div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              top: '5rem',
              left: '1rem',
              right: '1rem',
              zIndex: 999,
              background: 'rgba(8,8,16,0.95)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleLink(link)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  letterSpacing: '-0.01em',
                  transition: 'background 0.15s, color 0.15s',
                }}
                whileTap={{ scale: 0.97, background: 'rgba(255,255,255,0.06)' }}
                whileHover={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}
              >
                {link}
              </motion.button>
            ))}

            {/* CTA inside menu */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0.5rem 0' }} />
            <motion.button
              onClick={() => handleLink('Iniciar Jornada')}
              whileTap={{ scale: 0.97 }}
              style={{
                background: '#ffffff',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                padding: '0.85rem 1rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '-0.01em',
              }}
            >
              Iniciar Jornada →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────
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
      onClick={e => { e.preventDefault(); onClick?.(); }}
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
