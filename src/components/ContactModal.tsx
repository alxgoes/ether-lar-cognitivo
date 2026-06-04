import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, QrCode } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const WHATSAPP_LINK = `https://wa.me/qr/OTWLK4N5UYDYC1`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            overflowY: 'auto'
          }}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute', top: '2rem', right: '2rem',
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ 
              maxWidth: '500px', width: '100%', margin: 'auto',
              background: 'linear-gradient(145deg, rgba(30,30,30,0.8), rgba(15,15,15,0.9))',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '3rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'rgba(37,211,102,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <MessageCircle size={32} color="#25D366" />
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff', textAlign: 'center' }}>
              Fale com a ETHER
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: '2.5rem', lineHeight: 1.5 }}>
              Inicie uma conversa no WhatsApp para saber mais sobre o Lar Cognitivo.
            </p>
            
            {/* QR Code */}
            <div style={{
              width: '200px', height: '200px',
              background: '#fff',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '2.5rem',
              padding: '1rem',
              overflow: 'hidden'
            }}>
              <img src="/qrcode.jpeg" alt="WhatsApp QR Code" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <motion.a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: '#20bd5a' }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: '#25D366', color: '#fff',
                textDecoration: 'none',
                padding: '1rem 2rem',
                borderRadius: '99px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 8px 20px rgba(37,211,102,0.3)'
              }}
            >
              <MessageCircle size={20} />
              Iniciar Conversa
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
