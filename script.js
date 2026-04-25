// ============================================
// LOBSTER LAND — Interactive scripts
// ============================================

// ----- Scroll progress bar -----
const progress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
}, { passive: true });

// ----- Theme toggle (with localStorage fallback to in-memory only) -----
const themeBtn = document.getElementById('theme-toggle');
let currentTheme = 'light';

// Try to read saved preference; if blocked (artifact env), just use system pref
try {
  const saved = localStorage.getItem('lobster-theme');
  if (saved) currentTheme = saved;
  else if (window.matchMedia('(prefers-color-scheme: dark)').matches) currentTheme = 'dark';
} catch (e) {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) currentTheme = 'dark';
}

const applyTheme = (theme) => {
  if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
};
applyTheme(currentTheme);

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  try { localStorage.setItem('lobster-theme', currentTheme); } catch (e) { /* no-op */ }
});

// ----- Animated counters -----
const counters = document.querySelectorAll('.stat-num');
const animateCounter = (el) => {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3);
    const value = target * eased;
    const display = target % 1 === 0 ? Math.floor(value) : value.toFixed(1);
    el.textContent = prefix + display + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target + suffix;
  };
  requestAnimationFrame(tick);
};

// ----- Intersection observer for reveals + counters -----
const revealEls = document.querySelectorAll(
  '.section-head, .cluster-card, .stat, .package-card, .model-card, .features-list, .photo-card, .team-card, .callout, .overview-text'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // staggered reveal for siblings
      const delay = entry.target.dataset.delay || (idx % 4) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);

      // trigger counters
      if (entry.target.classList.contains('stat')) {
        const num = entry.target.querySelector('.stat-num');
        if (num && !num.dataset.animated) {
          num.dataset.animated = 'true';
          animateCounter(num);
        }
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => observer.observe(el));

// ----- Mascot click -> dance + random factoid -----
const mascot = document.getElementById('mascot');
const factoids = [
  "🦞 Lobsters can live over 100 years!",
  "🦞 They taste with their feet.",
  "🦞 A group of lobsters is called a 'pod'.",
  "🦞 Maine produces ~80% of US lobster.",
  "🦞 Their blood is blue (copper-based).",
  "🦞 They molt their shells to grow.",
  "🦞 Stay & Play, but make it shellfish.",
];
let factIdx = 0;

mascot.addEventListener('click', () => {
  mascot.classList.remove('dancing');
  void mascot.offsetWidth; // force reflow
  mascot.classList.add('dancing');

  const fact = factoids[factIdx % factoids.length];
  factIdx++;
  showToast(fact);
});

// ----- Toast helper -----
const showToast = (msg) => {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '6rem', right: '1.5rem',
    background: 'var(--ocean)',
    color: 'white',
    padding: '0.85rem 1.25rem',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '500',
    boxShadow: '0 10px 30px -8px rgba(0,0,0,0.3)',
    zIndex: '60',
    maxWidth: '260px',
    opacity: '0',
    transform: 'translateX(20px)',
    transition: 'all 0.3s ease',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// ----- Smooth nav highlight on scroll -----
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.style.color = '');
      link.style.color = 'var(--lobster)';
    }
  });
};
window.addEventListener('scroll', highlightNav, { passive: true });

// ----- Konami easter egg: type "lobster" anywhere -----
let typed = '';
document.addEventListener('keydown', (e) => {
  typed += e.key.toLowerCase();
  if (typed.length > 10) typed = typed.slice(-10);
  if (typed.includes('lobster')) {
    typed = '';
    triggerLobsterRain();
  }
});

const triggerLobsterRain = () => {
  showToast('🦞 You found the secret! Let it rain.');
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const l = document.createElement('div');
      l.textContent = '🦞';
      Object.assign(l.style, {
        position: 'fixed',
        top: '-50px',
        left: Math.random() * 100 + 'vw',
        fontSize: (1.5 + Math.random() * 2) + 'rem',
        zIndex: '200',
        pointerEvents: 'none',
        transition: 'transform 4s linear, opacity 4s ease',
      });
      document.body.appendChild(l);
      requestAnimationFrame(() => {
        l.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random()*720}deg)`;
        l.style.opacity = '0';
      });
      setTimeout(() => l.remove(), 4000);
    }, i * 80);
  }
};
