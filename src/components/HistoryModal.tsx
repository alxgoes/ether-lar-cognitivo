import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Lightbulb, Heart, BookOpen } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  useEffect(() => {
    if (isOpen) document.body.classList.add('history-open');
    else document.body.classList.remove('history-open');
    return () => document.body.classList.remove('history-open');
  }, [isOpen]);

  const items = [
    {
      icon: Target,
      title: 'Missão',
      content: <>Ser <span style={{color: '#60a5fa'}}>referência</span> na automatização residencial, promovendo <span style={{color: '#60a5fa'}}>conforto</span> e <span style={{color: '#60a5fa'}}>segurança</span> por meio da tecnologia ETHER.</>,
    },
    {
      icon: Lightbulb,
      title: 'Propósito',
      content: <>Promover facilidade com conforto e segurança com sistema inteligentes, <span style={{color: '#a78bfa'}}>autônomos</span> e <span style={{color: '#a78bfa'}}>confiáveis</span>.</>,
    },
    {
      icon: Heart,
      title: 'Valores',
      content: <>Realizar serviços com competência, expertize, confiança e <span style={{color: '#f472b6'}}>cuidado</span> personalizado, útil e prático para cada <span style={{color: '#f472b6'}}>cliente</span>.</>,
    },
    {
      icon: BookOpen,
      title: 'Filosofia',
      content: <>A tecnologia deve ser invisível, trabalhando nos bastidores para tornar a vida mais simples e focada no bem-estar humano.</>,
    }
  ];

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
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ maxWidth: '1200px', width: '100%', margin: 'auto' }}
          >
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '3rem', color: '#fff', textAlign: 'left' }}>A História da ETHER</h2>
            
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Left Column - Bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '0 0 350px' }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1.5rem 2rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                      <item.icon size={24} style={{ color: 'rgba(255,255,255,0.8)' }} />
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff' }}>{item.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item.content}</p>
                  </div>
                ))}
              </div>

              {/* Right Column - Text */}
              <div style={{ 
                flex: 1, 
                padding: '3rem', 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))', 
                borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Nossa Origem</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                  Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
                </p>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
