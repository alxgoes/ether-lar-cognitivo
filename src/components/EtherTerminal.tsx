import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ─────────────────────────────────────────────────────────────────
type LineType = 'log' | 'success' | 'warn' | 'art' | 'title' | 'progress' | 'dim';

interface TermLine {
  text: string;
  type?: LineType;
  delay: number;
  isArt?: boolean;       // render as <pre> block (monospace ASCII)
  noPrefix?: boolean;    // skip the → prefix
}

// ─── Chapters ──────────────────────────────────────────────────────────────
// Each chapter shows for ~12s then rotates to the next.
const CHAPTERS: TermLine[][] = [
  // ── Chapter 1: Boot + Zigbee mesh ──────────────────────────────────────
  [
    { text: 'ETHER OS — kernel cognitivo v2.1', type: 'title', delay: 0, noPrefix: true },
    { text: 'escaneando espectro de radiofrequência...', type: 'log', delay: 600 },
    { text: `
  [Z]---[Z]
  / \\  / \\
[Z] [Hub] [Z]
  \\ /  \\ /
  [Z]---[Z]`, type: 'art', delay: 1400, isArt: true, noPrefix: true },
    { text: 'malha Zigbee estabelecida ✓', type: 'success', delay: 2800 },
    { text: '45 nós de automação respondendo', type: 'success', delay: 3600 },
    { text: 'calibrando dashboard de telemetria...', type: 'log', delay: 4500 },
    { text: '████████████████ 100%', type: 'progress', delay: 5400, noPrefix: true },
    { text: 'rotinas de infraestrutura otimizadas.', type: 'success', delay: 6200 },
  ],

  // ── Chapter 2: Servidor cognitivo local ────────────────────────────────
  [
    { text: 'montando servidor cognitivo local...', type: 'log', delay: 0 },
    { text: `
  +------------------+
  |   MacMini M4     |
  |  ETHER ENGINE    |
  +------------------+`, type: 'art', delay: 900, isArt: true, noPrefix: true },
    { text: 'CPU: 10‑core  RAM: 24 GB  SSD: 1 TB', type: 'dim', delay: 2200, noPrefix: true },
    { text: 'modelo neural carregado ✓', type: 'success', delay: 3100 },
    { text: 'contexto doméstico indexado ✓', type: 'success', delay: 3900 },
    { text: '0 pacotes enviados à nuvem ✓', type: 'success', delay: 4700 },
    { text: 'servidor local ONLINE.', type: 'title', delay: 5600, noPrefix: true },
  ],

  // ── Chapter 3: Casa cognitiva ativa ────────────────────────────────────
  [
    { text: 'infraestrutura estabelecida — ambiente responsivo!', type: 'log', delay: 0 },
    { text: `
      ( IA Local )
       \\       /
        |     |
      __\\_____/__
     /  (o) (o)  \\
    /_______________\\
    | [__] . [__]  |
    |_______________|`, type: 'art', delay: 700, isArt: true, noPrefix: true },
    { text: 'presença detectada — Bem‑vindo em casa.', type: 'success', delay: 2800 },
    { text: 'temperatura: 22°C  umidade: 55%', type: 'dim', delay: 3700, noPrefix: true },
    { text: 'iluminação ambiente adaptada ✓', type: 'success', delay: 4500 },
    { text: 'modo [Noite Tranquila] ativado ✓', type: 'success', delay: 5300 },
  ],

  // ── Chapter 4: Scan de rede + segurança ───────────────────────────────
  [
    { text: 'auditoria de segurança em execução...', type: 'warn', delay: 0 },
    { text: 'escaneando portas abertas na LAN...', type: 'log', delay: 800 },
    { text: `
  SHIELD v3
  =========
  [██ FIREWALL ██]
  [██ CRIPTOGR ██]
  [██ ISOLAMNT ██]`, type: 'art', delay: 1600, isArt: true, noPrefix: true },
    { text: 'nenhuma ameaça detectada ✓', type: 'success', delay: 3200 },
    { text: 'túnel criptografado: AES-256 ✓', type: 'success', delay: 4000 },
    { text: 'dados biométricos: armazenados localmente ✓', type: 'success', delay: 4800 },
    { text: '0 logs compartilhados externamente ✓', type: 'success', delay: 5600 },
    { text: 'privacidade soberana — status: VERDE.', type: 'title', delay: 6400, noPrefix: true },
  ],

  // ── Chapter 5: Modo Cozinha Gourmet ───────────────────────────────────
  [
    { text: 'detectando variação de umidade e temperatura...', type: 'log', delay: 0 },
    { text: 'modo [Cozinha Gourmet] solicitado ✓', type: 'success', delay: 900 },
    { text: `
      ( )( )
     / oooo \\
    |  fogo  |
     \\______/
    ~~~~~~~~~~~`, type: 'art', delay: 1700, isArt: true, noPrefix: true },
    { text: 'climatização: umidade ajustada para 70%', type: 'log', delay: 3000 },
    { text: 'timer: redução morango e mirtilo — 45 min', type: 'log', delay: 3800 },
    { text: 'playlist acústica: iniciando ✓', type: 'success', delay: 4600 },
    { text: 'ambiente perfeito para cozinhar.', type: 'title', delay: 5400, noPrefix: true },
  ],
];

const CHAPTER_DURATION = 8500; // ms per chapter

// ─── Color map ─────────────────────────────────────────────────────────────
const COLOR: Record<LineType, string> = {
  log:      'rgba(255,255,255,0.58)',
  success:  'rgba(52, 211, 153, 0.88)',
  warn:     'rgba(251, 191, 36, 0.85)',
  art:      'rgba(96, 165, 250, 0.75)',
  title:    'rgba(255,255,255,0.95)',
  progress: 'rgba(96, 165, 250, 0.8)',
  dim:      'rgba(255,255,255,0.35)',
};

// ─── EtherTerminal ─────────────────────────────────────────────────────────
export function EtherTerminal() {
  const [chapterIdx, setChapterIdx]     = useState(0);
  const [visibleLines, setVisibleLines] = useState<TermLine[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const runChapter = (idx: number) => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleLines([]);
    setChapterIdx(idx);

    const chapter = CHAPTERS[idx];
    chapter.forEach((line) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    const next = setTimeout(() => {
      runChapter((idx + 1) % CHAPTERS.length);
    }, CHAPTER_DURATION);
    timeoutsRef.current.push(next);
  };

  // cursor blink
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    runChapter(0);
    return () => timeoutsRef.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chapter = CHAPTERS[chapterIdx];
  const chapterTitles = [
    'ZIGBEE MESH',
    'SERVIDOR LOCAL',
    'CASA COGNITIVA',
    'AUDITORIA',
    'MODO COZINHA',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 60, damping: 20 }}
      style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(5, 8, 20, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(96, 165, 250, 0.2)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow:
          '0 0 0 1px rgba(96,165,250,0.05), 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(96,165,250,0.06)',
        fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid rgba(96,165,250,0.12)',
          background: 'rgba(96,165,250,0.04)',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={chapterIdx}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3 }}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: '0.65rem',
              color: 'rgba(96,165,250,0.55)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            ETHER OS — {chapterTitles[chapterIdx]}
          </motion.span>
        </AnimatePresence>
        {/* chapter dots */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {CHAPTERS.map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: i === chapterIdx ? 'rgba(96,165,250,0.8)' : 'rgba(96,165,250,0.2)',
                transition: 'background 0.4s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        style={{
          padding: '1rem 1.25rem',
          minHeight: '230px',
          maxHeight: '270px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
        }}
      >
        <AnimatePresence>
          {visibleLines.map((line, i) => {
            const type = line.type ?? 'log';
            if (line.isArt) {
              return (
                <motion.pre
                  key={`art-${chapterIdx}-${i}`}
                  initial={{ opacity: 0, scaleY: 0.8 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{
                    color: COLOR[type],
                    fontSize: '0.7rem',
                    lineHeight: 1.55,
                    margin: '0.2rem 0',
                    fontFamily: 'inherit',
                    whiteSpace: 'pre',
                  }}
                >
                  {line.text}
                </motion.pre>
              );
            }
            return (
              <motion.div
                key={`line-${chapterIdx}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.76rem', lineHeight: 1.55 }}
              >
                {!line.noPrefix && (
                  <span style={{ color: 'rgba(96,165,250,0.55)', flexShrink: 0 }}>→</span>
                )}
                <span style={{ color: COLOR[type] }}>{line.text}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Blinking cursor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', marginTop: '0.15rem' }}>
          <span style={{ color: 'rgba(96,165,250,0.55)' }}>→</span>
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '13px',
              background: cursorVisible ? 'rgba(96,165,250,0.8)' : 'transparent',
              borderRadius: '1px',
              transition: 'background 0.1s',
              verticalAlign: 'middle',
            }}
          />
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          padding: '0.4rem 1.25rem',
          borderTop: '1px solid rgba(96,165,250,0.08)',
          background: 'rgba(96,165,250,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '0.62rem', color: 'rgba(96,165,250,0.4)', letterSpacing: '0.1em' }}>
          IA LOCAL ATIVA
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px rgba(52,211,153,0.8)' }} />
          <span style={{ fontSize: '0.62rem', color: 'rgba(52,211,153,0.7)', letterSpacing: '0.1em' }}>ONLINE</span>
        </div>
      </div>
    </motion.div>
  );
}

export default EtherTerminal;
