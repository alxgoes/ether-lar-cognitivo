import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-drag-zone="true"
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
          onClick={onClose}
        >
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'fixed', top: '2rem', right: '2rem',
              width: '48px', height: '48px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              transition: 'background 0.2s',
              zIndex: 9001
            }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              maxWidth: '800px', width: '100%', margin: 'auto',
              background: 'linear-gradient(145deg, rgba(30,30,30,0.8), rgba(15,15,15,0.9))',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '4rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                <BookOpen size={32} color="#fff" />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>O Manifesto ETHER</h2>
            </div>
            
            <div style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <p>
                Crescemos fascinados pelo futuro. Mas quando ele chegou, o mercado nos entregou uma ilusão frágil: aplicativos barulhentos, excesso de botões e uma dependência crônica da nuvem. Isso não é inteligência. É burocracia digital.
              </p>
              <p>
                Nós nascemos para romper esse padrão e devolver a alma à alta arquitetura. Olhamos para uma indústria saturada de soluções copiadas e coladas e escolhemos o caminho da exclusividade. Afinal, a automação pode ser replicada, mas a sua rotina é irreplicável.
              </p>
              <p style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 600, paddingLeft: '1.5rem', borderLeft: '4px solid #60a5fa', margin: '1rem 0' }}>
                A verdade é simples: luxo não é gerenciar o seu lar através de uma tela. Luxo é nunca precisar de uma.
              </p>
              <p>
                Unimos o que há de mais avançado no mundo para criar uma engenharia da intuição. Um ecossistema físico, offline e sob medida, onde a tecnologia finalmente aprendeu o seu lugar: o silêncio. Sem cliques, sem ordens, sem esforço. Uma estrutura inteligente que decifra o seu contexto e esculpe o conforto perfeito apenas pela sua presença.
              </p>
              <p>
                Aqui, a sua privacidade é uma fortaleza. Seus dados, seus hábitos e a intimidade da sua família nunca saem das suas paredes. Zero contato com o mundo externo.
              </p>
              <p>
                Cada projeto que assinamos é uma obra de arte única. Porque a sua família é única. Porque o seu legado é único.
              </p>
              <p>
                Nossa premissa é absoluta: sua tecnologia deve servir a você. Nunca o contrário.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
