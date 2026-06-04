import { motion } from 'framer-motion';
import { Github, Twitter, Globe, Mail, ArrowLeft } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────
const TEAM = [
  { name: 'Alex Goes', role: 'Integration Architect', area: 'Infraestrutura Tecnológica & Automação Avançada' },
  { name: 'Alisson Teodoro', role: 'Systems Architect', area: 'Sistemas Cognitivos & IA Local' },
  { name: 'Cristian Narumia', role: 'Revenue & Compliance', area: 'Branding & Customer Journey' },
  { name: 'Felipe Frois', role: 'Customer Relationship', area: 'Imersão & UX' },
];

const LINKS = [
  { icon: Globe, label: 'ether.ai', href: '#' },
  { icon: Github, label: 'github.com/ether', href: '#' },
  { icon: Twitter, label: '@ether_ai', href: '#' },
  { icon: Mail, label: 'hello@ether.ai', href: '#' },
];

// ─── Fade-up variant ──────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 70, damping: 18, delay },
  viewport: { once: true },
});

// ─── Props ────────────────────────────────────────────────────────────────
interface CreditsPanelProps {
  onOpenDoc: (doc: 'privacidade' | 'termos' | 'compliance') => void;
}

// ─── Credits Panel ────────────────────────────────────────────────────────
export function CreditsPanel({ onOpenDoc }: CreditsPanelProps) {
  return (
    <section
      className="panel w-full md:!w-[100vw]"
      id="credits"
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(37,99,235,0.12) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(96,165,250,0.35), transparent)',
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '960px',
          padding: '0 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Logo wordmark */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <img
              src="/cereb.png"
              alt="Ether"
              style={{ width: '36px', height: '36px', filter: 'invert(1)', opacity: 0.5 }}
            />
            <img
              src="/nomelog.png"
              alt="Ether Logo"
              style={{ height: '44px', objectFit: 'contain' }}
            />
          </div>
        </motion.div>

        {/* Manifesto line */}
        <motion.p
          {...fadeUp(0.1)}
          style={{
            fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.04em',
            marginBottom: '4rem',
            maxWidth: '500px',
          }}
        >
          Construindo o futuro da privacidade soberana, uma casa de cada vez.
        </motion.p>

        {/* Divider */}
        <motion.div
          {...fadeUp(0.18)}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)',
            marginBottom: '3rem',
          }}
        />

        {/* Team grid */}
        <motion.div {...fadeUp(0.22)} style={{ marginBottom: '4rem', width: '100%' }}>
          <p
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(96,165,250,0.6)',
              marginBottom: '2rem',
            }}
          >
            Equipe Fundadora
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-12 text-left"
          >
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.06, type: 'spring', stiffness: 80 }}
                viewport={{ once: true }}
                style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: '0.2rem' }}>
                  {member.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(96,165,250,0.7)', marginBottom: '0.1rem' }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.28)' }}>
                  {member.area}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          {...fadeUp(0.5)}
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '4rem',
          }}
        >
          {LINKS.map(({ icon: Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              whileHover={{ color: '#93c5fd', scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              <Icon size={15} />
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          {...fadeUp(0.55)}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            paddingTop: '2rem',
            width: '100%',
          }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between"
        >
          <p className="text-center md:text-left" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.2)' }}>
            © 2026 Ether Technologies · Todos os direitos reservados
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <motion.button
              onClick={() => onOpenDoc('privacidade')}
              whileHover={{ color: 'rgba(255,255,255,0.6)' }}
              style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Privacidade
            </motion.button>
            <motion.button
              onClick={() => onOpenDoc('termos')}
              whileHover={{ color: 'rgba(255,255,255,0.6)' }}
              style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Termos
            </motion.button>
            <motion.button
              onClick={() => onOpenDoc('compliance')}
              whileHover={{ color: 'rgba(255,255,255,0.6)' }}
              style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Compliance & LGPD
            </motion.button>
          </div>

          <motion.div
            style={{
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.2)',
            }}
            className="hidden md:flex"
          >
            <ArrowLeft size={12} />
            <span>Scroll para voltar</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CreditsPanel;
