import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Theme Toggle & Particles Color Update ---
const themeToggleBtn = document.getElementById('theme-toggle');
const rootElement = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'dark';
rootElement.setAttribute('data-theme', currentTheme);

// Configuração dos neurônios (tsParticles)
const loadParticles = async (isDark) => {
  const color = isDark ? '#ffffff' : '#000000';

  await window.tsParticles.load("canvas-container", {
    fullScreen: { enable: false, zIndex: -1 },
    particles: {
      number: { value: 120, density: { enable: true, value_area: 800 } },
      color: { value: color },
      shape: { type: "circle" },
      opacity: {
        value: 0.2, // Reduced base opacity
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.05, sync: false } // Smoother, slower pulse
      },
      size: { value: 3, random: true, anim: { enable: false } },
      links: {
        enable: true,
        distance: 150,
        color: color,
        opacity: 0.15, // Reduced link opacity
        width: 1
      },
      move: {
        enable: true,
        speed: 0.3, // Slower movement
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "bounce" }
      }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: true
      },
      modes: {
        grab: { distance: 200, links: { opacity: 0.8 } }
      }
    },
    retina_detect: true
  });
};

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isCurrentlyDark = rootElement.getAttribute('data-theme') === 'dark';
    const newTheme = isCurrentlyDark ? 'light' : 'dark';

    rootElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    gsap.fromTo("body", { opacity: 0.9 }, { opacity: 1, duration: 0.5 });

    // Recarrega completamente para manter os eventos de mouse ativos
    loadParticles(newTheme === 'dark');
  });
}

// --- Custom Cursor & Magnetic Effects ---
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const magnetics = document.querySelectorAll('.magnetic');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  gsap.set(cursor, { x: mouseX, y: mouseY });
});

gsap.ticker.add(() => {
  followerX += (mouseX - followerX) * 0.15;
  followerY += (mouseY - followerY) * 0.15;
  gsap.set(cursorFollower, { x: followerX, y: followerY });
});

document.querySelectorAll('button, a, .glass-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

magnetics.forEach((btn) => {
  btn.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(this, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', function () {
    gsap.to(this, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// --- Video Modal Logic ---
const playBtn = document.getElementById('play-video-btn');
const closeVideoBtn = document.getElementById('close-video-btn');
const videoModal = document.getElementById('video-modal');
const videoContainer = document.getElementById('video-container');

if (playBtn) {
  playBtn.addEventListener('click', () => {
    gsap.to(videoModal, {
      autoAlpha: 1,
      duration: 0.5,
      ease: 'power2.out',
      pointerEvents: 'auto'
    });

    gsap.fromTo(videoContainer,
      { scale: 0.8, y: 50 },
      { scale: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'back.out(1.5)' }
    );
  });
}

if (closeVideoBtn) {
  closeVideoBtn.addEventListener('click', () => {
    gsap.to(videoModal, {
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.in',
      pointerEvents: 'none'
    });

    gsap.to(videoContainer, {
      scale: 0.9,
      duration: 0.4,
      ease: 'power2.in'
    });
  });
}

// --- GSAP Horizontal Scroll ---
const panelsWrapper = document.getElementById('panels-wrapper');
const panels = gsap.utils.toArray('.panel');

// Crie uma única timeline para sincronizar 100% os eventos
const scrollTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-container",
    pin: true,
    scrub: 1,
    snap: 1 / (panels.length - 1),
    end: () => "+=" + panelsWrapper.offsetWidth
  }
});

const horizontalScrollTween = scrollTl.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none"
}, 0);

// Energy Particle animation tied strictly to the same Scroll Timeline
scrollTl.fromTo('.energy-particle',
  { x: 0 },
  { x: () => window.innerWidth - 150, ease: "none" },
  0);

// Initial Load Animation (Hero Panel only)
gsap.from(".hero-panel .stagger-text", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power4.out",
  delay: 0.5
});

// Panel Reveal & LED Illumination & Cinematic Text Reveal
panels.forEach((panel, i) => {
  if (i === 0) return;

  const content = panel.querySelector('.content');
  const card = panel.querySelector('.glass-card');
  const revealText = panel.querySelector('.reveal-text');

  // Setup SplitType for Cinematic Reveal if exists
  let splitWords = null;
  if (revealText) {
    const split = new window.SplitType(revealText, { types: 'words' });
    splitWords = split.words;
    gsap.set(splitWords, { opacity: 0.15 });
  }

  ScrollTrigger.create({
    trigger: panel,
    containerAnimation: horizontalScrollTween,
    start: "left center",
    end: "center center",
    scrub: true,
    animation: splitWords ? gsap.to(splitWords, {
      opacity: 1,
      stagger: 0.1,
      ease: "none"
    }) : null,
    onEnter: () => {
      // Fade in the whole content box smoothly
      gsap.fromTo(content,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out", overwrite: "auto" }
      );
      if (card) card.classList.add('led-active');
    },
    onLeave: () => {
      if (card) card.classList.remove('led-active');
    },
    onEnterBack: () => {
      if (card) card.classList.add('led-active');
    },
    onLeaveBack: () => {
      gsap.to(content, { opacity: 0, duration: 0.8, overwrite: "auto" });
      if (card) card.classList.remove('led-active');
    }
  });
});

// --- Draggable Free-Placement Stack Logic ---
const stackCards = Array.from(document.querySelectorAll('.stack-card'));
const stackContainer = document.getElementById('stack-container');
const resetBtn = document.getElementById('reset-stack-btn');

// Each card's home position (stacked state)
const STACK_HOME = [
  { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 3 },
  { x: 0, y: -28, scale: 0.95, opacity: 0.85, zIndex: 2 },
  { x: 0, y: -56, scale: 0.90, opacity: 0.70, zIndex: 1 },
];

// Set initial positions without animation
const initStack = (animate = false) => {
  stackCards.forEach((card, i) => {
    const home = STACK_HOME[i] || STACK_HOME[STACK_HOME.length - 1];
    const method = animate ? gsap.to : gsap.set;
    method(card, {
      x: home.x,
      y: home.y,
      scale: home.scale,
      opacity: home.opacity,
      zIndex: home.zIndex,
      rotation: 0,
      duration: animate ? 0.8 : 0,
      ease: animate ? "elastic.out(0.8, 0.6)" : undefined,
      delay: animate ? i * 0.08 : 0,
    });
  });
};

initStack(false);

// Free-drag: cards stay wherever dropped
stackCards.forEach((card) => {
  let isDown = false;
  let startMouseX = 0, startMouseY = 0;
  let startCardX = 0, startCardY = 0;

  card.addEventListener('pointerdown', (e) => {
    e.stopPropagation();
    isDown = true;
    card.setPointerCapture(e.pointerId);

    // Get current GSAP x/y values (where card actually is)
    startCardX = gsap.getProperty(card, 'x');
    startCardY = gsap.getProperty(card, 'y');
    startMouseX = e.clientX;
    startMouseY = e.clientY;

    // Bring dragged card to front
    gsap.set(card, { zIndex: 50 });

    // Scale up slightly on grab for tactile feel
    gsap.to(card, { scale: gsap.getProperty(card, 'scale') + 0.02, duration: 0.2 });
  });

  card.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startMouseX;
    const dy = e.clientY - startMouseY;
    const rotation = dx * 0.04; // subtle rotation while dragging
    gsap.set(card, {
      x: startCardX + dx,
      y: startCardY + dy,
      rotation,
    });
  });

  card.addEventListener('pointerup', (e) => {
    if (!isDown) return;
    isDown = false;

    // Settle: keep position, remove rotation, drop z-index back
    const i = parseInt(card.dataset.index);
    const home = STACK_HOME[i] || STACK_HOME[STACK_HOME.length - 1];
    gsap.to(card, {
      rotation: 0,
      scale: home.scale,
      zIndex: home.zIndex + 10, // a bit above home so it stays visible
      duration: 0.5,
      ease: "power3.out",
    });
  });
});

// Reset button: animate all cards back home with stagger bounce
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    // Spin the icon
    const icon = resetBtn.querySelector('svg');
    gsap.to(icon, {
      rotation: 360, duration: 0.6, ease: "power2.out",
      onComplete: () => gsap.set(icon, { rotation: 0 })
    });

    stackCards.forEach((card, i) => {
      const home = STACK_HOME[i] || STACK_HOME[STACK_HOME.length - 1];
      // First fling slightly further out (wind-up), then spring home
      gsap.to(card, {
        scale: home.scale + 0.05,
        opacity: 0.8,
        duration: 0.15,
        delay: i * 0.05,
        onComplete: () => {
          gsap.to(card, {
            x: home.x,
            y: home.y,
            scale: home.scale,
            opacity: home.opacity,
            zIndex: home.zIndex,
            rotation: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.5)",
          });
        }
      });
    });
  });
}


// --- Load Initial Particles ---
const isDark = rootElement.getAttribute('data-theme') === 'dark';
loadParticles(isDark);

// --- Rainbow Aurora Mouse-Follow Effect ---
const aurora = document.createElement('div');
aurora.id = 'aurora-orb';
aurora.style.cssText = `
  position: fixed;
  pointer-events: none;
  z-index: 9990;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120,80,255,0.12) 0%, rgba(80,180,255,0.08) 30%, rgba(255,80,180,0.06) 60%, transparent 70%);
  filter: blur(40px);
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  opacity: 0;
`;
document.body.appendChild(aurora);

let auroraX = 0, auroraY = 0;
let auroraActive = false;
let auroraHue = 0;

document.addEventListener('mousemove', (e) => {
  auroraX = e.clientX;
  auroraY = e.clientY;
});

gsap.ticker.add(() => {
  auroraHue = (auroraHue + 0.4) % 360;
  const hue1 = auroraHue;
  const hue2 = (auroraHue + 120) % 360;
  const hue3 = (auroraHue + 240) % 360;

  aurora.style.background = `radial-gradient(circle,
    hsla(${hue1}, 80%, 65%, 0.10) 0%,
    hsla(${hue2}, 90%, 60%, 0.07) 35%,
    hsla(${hue3}, 80%, 65%, 0.05) 65%,
    transparent 70%
  )`;

  gsap.set(aurora, { x: auroraX, y: auroraY });
});

// Show/hide aurora & rainbow border on interactive element hover
const interactiveEls = document.querySelectorAll('button, a, .glass-card, .stack-card, .nav-link');

interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    aurora.style.opacity = '1';
    el.classList.add('rainbow-hover', 'active-rainbow');
  });
  el.addEventListener('mouseleave', () => {
    aurora.style.opacity = '0';
    el.classList.remove('active-rainbow');
  });
});
