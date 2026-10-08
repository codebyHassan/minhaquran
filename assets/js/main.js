/* ==========================================================================
   MINHA QUR'AN ACADEMY — Site Script
   Shared header/footer, navigation, reveal animations, forms, kids letter game.
   ========================================================================== */

/* ==========================================================================
   THEME CUSTOMIZER (Live Colors, Presets & Fonts for Client Preview)
   Toggle ENABLE_THEME_CUSTOMIZER to false to hide before production delivery.
   ========================================================================== */
const ENABLE_THEME_CUSTOMIZER = true;

const DEFAULT_THEME = {
  primary: '#0a3328',
  secondary: '#c39b52',
  bg: '#fbf8f2',
  headingFont: 'Cormorant Garamond',
  bodyFont: 'Manrope'
};

const THEME_PRESETS = [
  {
    id: 'emerald-gold',
    name: 'Emerald & Gold',
    label: '<i class="fa-solid fa-leaf" style="color:#22c55e;margin-right:6px"></i> Royal Emerald & Gold (Default)',
    primary: '#0a3328',
    secondary: '#c39b52',
    bg: '#fbf8f2',
    headingFont: 'Cormorant Garamond',
    bodyFont: 'Manrope'
  },
  {
    id: 'midnight-amber',
    name: 'Midnight & Amber',
    label: '<i class="fa-solid fa-moon" style="color:#60a5fa;margin-right:6px"></i> Midnight Navy & Amber',
    primary: '#0c2744',
    secondary: '#f59e0b',
    bg: '#f8fafc',
    headingFont: 'Playfair Display',
    bodyFont: 'Inter'
  },
  {
    id: 'imperial-ruby',
    name: 'Imperial Ruby',
    label: '<i class="fa-solid fa-gem" style="color:#f43f5e;margin-right:6px"></i> Imperial Ruby & Champagne',
    primary: '#4c1221',
    secondary: '#d4af37',
    bg: '#fdf9f7',
    headingFont: 'Cinzel',
    bodyFont: 'Montserrat'
  },
  {
    id: 'warm-olive',
    name: 'Warm Olive',
    label: '<i class="fa-solid fa-seedling" style="color:#a3e635;margin-right:6px"></i> Warm Olive & Antique Bronze',
    primary: '#28382b',
    secondary: '#b89047',
    bg: '#faf7f0',
    headingFont: 'Amiri',
    bodyFont: 'Manrope'
  },
  {
    id: 'ocean-teal',
    name: 'Ocean Teal',
    label: '<i class="fa-solid fa-water" style="color:#38bdf8;margin-right:6px"></i> Deep Ocean Teal & Gold',
    primary: '#0f3f45',
    secondary: '#d99e32',
    bg: '#f4faf9',
    headingFont: 'Outfit',
    bodyFont: 'Outfit'
  },
  {
    id: 'luxury-dark',
    name: 'Luxury Dark',
    label: '<i class="fa-solid fa-circle-half-stroke" style="color:#eab308;margin-right:6px"></i> Luxury Dark Mode & Gold',
    primary: '#091512',
    secondary: '#e5b95c',
    bg: '#0f1715',
    headingFont: 'Cinzel',
    bodyFont: 'Manrope'
  }
];

const FONTS_DISPLAY = [
  { name: 'Cormorant Garamond', desc: 'Classical Luxury Serif (Default)' },
  { name: 'Playfair Display', desc: 'Modern High-Fashion Serif' },
  { name: 'Cinzel', desc: 'Imperial Classical Serif' },
  { name: 'Amiri', desc: 'Authentic Quranic Arabic Serif' },
  { name: 'Outfit', desc: 'Clean Modern Luxury Sans' },
  { name: 'Montserrat', desc: 'Bold Elegant Sans' },
  { name: 'Plus Jakarta Sans', desc: 'Sharp Contemporary Sans' }
];

const FONTS_BODY = [
  { name: 'Manrope', desc: 'Modern Geometric (Default)' },
  { name: 'Inter', desc: 'Clean Tech & Professional' },
  { name: 'Poppins', desc: 'Friendly & Rounded Sans' },
  { name: 'Roboto', desc: 'Universal Neutral Sans' },
  { name: 'Outfit', desc: 'Cohesive Modern Sans' }
];

/* Color conversion utilities */
function hexToHsl(hex) {
  let c = (hex || '').replace('#', '').trim();
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  if (c.length !== 6) return [164, 67, 12];
  const num = parseInt(c, 16);
  let r = (num >> 16) / 255, g = ((num >> 8) & 255) / 255, b = (num & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  h = (h % 360 + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function loadGoogleFont(fontName) {
  if (!fontName) return;
  const safeId = 'google-font-' + fontName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  if (document.getElementById(safeId)) return;
  const link = document.createElement('link');
  link.id = safeId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap`;
  document.head.appendChild(link);
}

function applyTheme(theme, save = true) {
  if (!theme) return;
  const root = document.documentElement;

  // Primary shades
  const [ph, ps, pl] = hexToHsl(theme.primary || DEFAULT_THEME.primary);
  const emerald950 = hslToHex(ph, ps, Math.max(4, pl - 6));
  const emerald900 = theme.primary || DEFAULT_THEME.primary;
  const emerald800 = hslToHex(ph, ps, Math.min(95, pl + 6));
  const emerald700 = hslToHex(ph, ps, Math.min(95, pl + 13));
  const emerald600 = hslToHex(ph, ps, Math.min(95, pl + 20));
  const emerald100 = hslToHex(ph, Math.min(45, ps), 92);
  const emerald50  = hslToHex(ph, Math.min(35, ps), 97);

  root.style.setProperty('--emerald-950', emerald950);
  root.style.setProperty('--emerald-900', emerald900);
  root.style.setProperty('--emerald-800', emerald800);
  root.style.setProperty('--emerald-700', emerald700);
  root.style.setProperty('--emerald-600', emerald600);
  root.style.setProperty('--emerald-100', emerald100);
  root.style.setProperty('--emerald-50',  emerald50);

  // Secondary shades
  const [sh, ss, sl] = hexToHsl(theme.secondary || DEFAULT_THEME.secondary);
  const gold600 = hslToHex(sh, ss, Math.max(8, sl - 8));
  const gold500 = theme.secondary || DEFAULT_THEME.secondary;
  const gold400 = hslToHex(sh, ss, Math.min(92, sl + 10));
  const gold200 = hslToHex(sh, Math.min(55, ss), 86);
  const gold100 = hslToHex(sh, Math.min(50, ss), 94);

  root.style.setProperty('--gold-600', gold600);
  root.style.setProperty('--gold-500', gold500);
  root.style.setProperty('--gold-400', gold400);
  root.style.setProperty('--gold-200', gold200);
  root.style.setProperty('--gold-100', gold100);

  // Background / Third color shades
  const bgHex = theme.bg || DEFAULT_THEME.bg;
  const [bh, bs, bl] = hexToHsl(bgHex);
  const isDark = bl < 50;

  if (isDark) {
    root.style.setProperty('--ivory', bgHex);
    root.style.setProperty('--cream', hslToHex(bh, Math.min(30, bs), Math.min(100, bl + 6)));
    root.style.setProperty('--line', hslToHex(bh, Math.min(25, bs), Math.min(100, bl + 14)));
    root.style.setProperty('--ink', '#fbf8f2');
    root.style.setProperty('--body', '#cbd5e1');
    root.style.setProperty('--white', hslToHex(bh, Math.min(25, bs), Math.min(100, bl + 10)));
  } else {
    root.style.setProperty('--ivory', bgHex);
    root.style.setProperty('--cream', hslToHex(bh, Math.min(30, bs), Math.max(0, bl - 4)));
    root.style.setProperty('--line', hslToHex(bh, Math.min(25, bs), Math.max(0, bl - 9)));
    root.style.setProperty('--ink', '#14201b');
    root.style.setProperty('--body', '#3e4b45');
    root.style.setProperty('--white', '#ffffff');
  }

  // Update SVG geometric watermark stroke
  const patternSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='${encodeURIComponent(gold500)}' stroke-width='1' opacity='.55'%3E%3Cpath d='M40 8l9.4 22.6L72 40l-22.6 9.4L40 72l-9.4-22.6L8 40l22.6-9.4z'/%3E%3Crect x='22' y='22' width='36' height='36' transform='rotate(45 40 40)'/%3E%3C/g%3E%3C/svg%3E")`;
  root.style.setProperty('--pattern', patternSvg);

  // Fonts
  if (theme.headingFont) {
    loadGoogleFont(theme.headingFont);
    const fallbackSerif = ['Cormorant Garamond', 'Playfair Display', 'Cinzel', 'Amiri'].includes(theme.headingFont) ? 'Georgia, serif' : 'system-ui, sans-serif';
    root.style.setProperty('--f-display', `"${theme.headingFont}", ${fallbackSerif}`);
  }
  if (theme.bodyFont) {
    loadGoogleFont(theme.bodyFont);
    root.style.setProperty('--f-body', `"${theme.bodyFont}", system-ui, -apple-system, sans-serif`);
  }

  if (save) {
    try {
      localStorage.setItem('minha_site_theme', JSON.stringify(theme));
    } catch (e) {}
  }
}

function getStoredTheme() {
  try {
    const raw = localStorage.getItem('minha_site_theme');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

// Immediate application on script execution to avoid flash of default theme
const _storedTheme = getStoredTheme();
if (_storedTheme) {
  applyTheme(_storedTheme, false);
}

/* ---------- 1. SITE SETTINGS — edit these once, updates every page ---------- */
const SITE = {
  whatsapp: '923320697050',            // Primary (Pakistan: 03320697050)
  whatsappNumbers: [
    { label: 'WhatsApp (Pakistan)', display: '0332 0697050 (+92)', clean: '923320697050' },
    { label: 'WhatsApp (Saudi Arabia)', display: '+966 56 779 6812', clean: '966567796812' }
  ],
  email: '',               // e.g. 'info@minhaquranacademy.com'
  youtube: 'https://www.youtube.com/@MinhaQuranAcademy',
  facebook: '',            // full URL
  instagram: '',           // full URL
  waGreeting: 'Assalamu Alaikum, I would like to know more about Minha Qur’an Academy courses.'
};

const NAV_ITEMS = [
  {
    href: 'index.html',
    label: 'Home',
    key: 'home',
    sub: 'Academy Overview & Features',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>'
  },
  {
    href: 'about.html',
    label: 'About',
    key: 'about',
    sub: 'Mission, Vision & Methodology',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
  },
  {
    href: 'courses.html',
    label: 'Courses',
    key: 'courses',
    sub: 'Qaida, Tajweed & Islamic Studies',
    badge: 'Popular',
    badgeClass: 'm-nav-badge-popular',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
  },
  {
    href: 'kids.html',
    label: 'Kids Learning',
    key: 'kids',
    sub: 'Interactive Arabic Letter Game',
    badge: 'Game',
    badgeClass: 'm-nav-badge-fun',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
  },
  {
    href: 'teacher-training.html',
    label: 'Teacher Training',
    key: 'training',
    sub: 'Professional Quran Teacher Course',
    badge: 'Certified',
    badgeClass: 'm-nav-badge-cert',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>'
  },
  {
    href: 'teachers.html',
    label: 'Our Teachers',
    key: 'teachers',
    sub: 'Certified Male & Female Scholars',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'
  },
  {
    href: 'faq.html',
    label: 'FAQ',
    key: 'faq',
    sub: 'Timings, Fees & Common Queries',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
  },
  {
    href: 'contact.html',
    label: 'Contact',
    key: 'contact',
    sub: 'Get in Touch & Book Free Trial',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
  }
];

const NAV = NAV_ITEMS.map(item => [item.href, item.label, item.key]);

const ICON = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36A9.43 9.43 0 0 1 2.6 12.04C2.6 6.83 6.84 2.6 12.05 2.6c2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.44 9.44zm8.03-17.47A11.27 11.27 0 0 0 12.04.7C5.79.7.7 5.78.7 12.04c0 2 .52 3.95 1.52 5.67L.6 23.6l6.03-1.58a11.3 11.3 0 0 0 5.41 1.38h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
};

const waLink = (text = SITE.waGreeting) =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : 'contact.html';

/* ---------- 2. Shared header & footer ---------- */
function renderLayout() {
  const page = document.body.dataset.page;
  const links = NAV.map(([href, label, key]) =>
    `<a href="${href}" class="${key === page ? 'active' : ''}">${label}</a>`).join('');

  const header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="brand" aria-label="Minha Qur’an Academy — Home">
          <img src="assets/images/logo.jpg" alt="Minha Qur’an Academy logo" width="48" height="48">
          <span><span class="brand-name">Minha Qur’an</span><span class="brand-sub">ACADEMY</span></span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">${links}</nav>
        <div class="header-actions">
          <a href="enroll.html" class="btn btn-gold btn-sm btn-enroll" id="nav-enroll">Enroll Now</a>
          <button class="menu-toggle" id="menu-toggle" aria-label="Toggle navigation menu" aria-expanded="false"><span></span><span></span></button>
        </div>
      </div>`;

    // Render mobile drawer outside header to avoid backdrop-filter containing block constraint
    let drawer = document.getElementById('mobile-menu-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobile-menu-drawer';
      drawer.className = 'mobile-menu-drawer';
      header.insertAdjacentElement('afterend', drawer);
    }

    const mItemsHtml = NAV_ITEMS.map((item, idx) => {
      const isActive = item.key === page;
      return `
        <a href="${item.href}" class="m-nav-item ${isActive ? 'active' : ''}" style="--item-index: ${idx + 1};">
          <span class="m-nav-icon">${item.icon}</span>
          <span class="m-nav-text">
            <span class="m-nav-label-wrap">
              <span class="m-nav-label">${item.label}</span>
              ${item.badge ? `<span class="m-nav-badge ${item.badgeClass || ''}">${item.badge}</span>` : ''}
            </span>
            <span class="m-nav-sub">${item.sub}</span>
          </span>
          <span class="m-nav-arrow" aria-hidden="true">${ICON.chevron}</span>
        </a>`;
    }).join('');

    drawer.innerHTML = `
      <div class="mobile-menu-backdrop" id="mobile-menu-backdrop"></div>
      <nav class="mobile-menu-panel" id="mobile-menu-panel" aria-label="Mobile navigation">
        <div class="mobile-corner-glow"></div>
        <div class="mobile-menu-scroll">
          <div class="mobile-menu-bismillah">
            <span>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          </div>
          <div class="mobile-nav-list">
            ${mItemsHtml}
          </div>
          <div class="mobile-nav-cta" style="--item-index: ${NAV_ITEMS.length + 1};">
            <a href="enroll.html" class="btn btn-gold btn-block mobile-enroll-btn">
              <span>Enroll in Courses</span>
              ${ICON.arrow}
            </a>
            <a href="#" data-wa class="btn btn-wa btn-block mobile-wa-btn">
              ${ICON.wa}
              <span>Chat on WhatsApp</span>
            </a>
          </div>
          <div class="mobile-menu-contacts" style="--item-index: ${NAV_ITEMS.length + 2};">
            <div class="mobile-contacts-header">Direct WhatsApp &amp; Inquiries</div>
            <div class="mobile-contacts-row">
              <a href="https://wa.me/923320697050?text=${encodeURIComponent(SITE.waGreeting)}" target="_blank" rel="noopener noreferrer" class="mobile-contact-pill">
                <span class="flag">🇵🇰</span> 0332 0697050 (+92)
              </a>
              <a href="https://wa.me/966567796812?text=${encodeURIComponent(SITE.waGreeting)}" target="_blank" rel="noopener noreferrer" class="mobile-contact-pill">
                <span class="flag">🇸🇦</span> +966 56 779 6812
              </a>
            </div>
          </div>
        </div>
      </nav>`;
  }

  const footer = document.getElementById('site-footer');
  if (footer) {
    const social = [
      [SITE.youtube, ICON.yt, 'YouTube'],
      [SITE.facebook, ICON.fb, 'Facebook'],
      [SITE.instagram, ICON.ig, 'Instagram']
    ].filter(([u]) => u).map(([u, i, l]) =>
      `<a href="${u}" target="_blank" rel="noopener noreferrer" aria-label="${l}">${i}</a>`).join('');

    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <a href="index.html" class="brand">
            <img src="assets/images/logo.jpg" alt="Minha Qur’an Academy logo" width="48" height="48">
            <span><span class="brand-name">Minha Qur’an</span><span class="brand-sub">ACADEMY</span></span>
          </a>
          <p class="footer-tag">Learn Quran. Understand Islam.<br>Become a Confident Quran Teacher.</p>
          <p>Teaching children and families worldwide since 2018. Structured, engaging Quran &amp; Islamic education with certified male and female scholars.</p>
          <div class="socials">${social}</div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <nav class="footer-links">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="courses.html">Courses</a>
            <a href="teacher-training.html">Teacher Training</a>
            <a href="teachers.html">Our Teachers</a>
            <a href="about.html#why-choose">Why Choose Us</a>
            <a href="teachers.html#reviews">Reviews</a>
            <a href="contact.html">Contact Us</a>
          </nav>
        </div>
        <div>
          <h4>Courses</h4>
          <nav class="footer-links">
            <a href="courses.html#qaida">Noorani / Madani Qaida</a>
            <a href="courses.html#noor-ul-bayan">Noor-ul-Bayan</a>
            <a href="courses.html#quran-reading">Quran Reading</a>
            <a href="courses.html#tajweed">Quran with Tajweed</a>
            <a href="courses.html#advanced-tajweed">Advanced Tajweed</a>
            <a href="courses.html#islamic-studies">Islamic Studies</a>
            <a href="teacher-training.html">Professional Quran Teacher Training</a>
          </nav>
        </div>
        <div>
          <h4>Get in Touch</h4>
          <nav class="footer-links">
            ${SITE.whatsappNumbers ? SITE.whatsappNumbers.map(w => `<a href="https://wa.me/${w.clean}?text=${encodeURIComponent(SITE.waGreeting)}" target="_blank" rel="noopener noreferrer">${w.label}: ${w.display}</a>`).join('') : `<a href="#" data-wa>WhatsApp: ${SITE.whatsapp ? '+' + SITE.whatsapp : '[ADD NUMBER]'}</a>`}
            <a href="${SITE.email ? 'mailto:' + SITE.email : 'contact.html'}">Email: ${SITE.email || '[ADD EMAIL]'}</a>
            <a href="kids.html">Interactive Kids Learning</a>
            <a href="faq.html">FAQ</a>
          </nav>
          <a href="enroll.html" class="btn btn-gold btn-sm mt-2">Enroll Now ${ICON.arrow}</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} Minha Qur’an Academy. All Rights Reserved.</span>
        <div class="footer-bottom-meta">
          <span>Online Quran &amp; Islamic Education · Teaching Children Since 2018</span>
          <button type="button" class="footer-theme-toggle" id="footer-theme-toggle" title="Customize Theme Colors &amp; Fonts" aria-label="Customize Theme Colors and Fonts">
            <i class="fa-solid fa-palette"></i>
          </button>
        </div>
      </div>`;
  }

  // Floating WhatsApp widget with dual branch selector (Pakistan & Saudi Arabia)
  const widgetWrap = document.createElement('div');
  widgetWrap.className = 'wa-widget-wrap';
  widgetWrap.id = 'wa-widget-wrap';
  widgetWrap.innerHTML = `
    <div class="wa-popup" id="wa-popup" aria-hidden="true" role="dialog" aria-label="Choose WhatsApp Branch">
      <div class="wa-popup-header">
        <div class="wa-popup-profile">
          <div class="wa-popup-avatar">
            <img src="assets/images/logo.jpg" alt="Minha Qur’an Academy" width="40" height="40">
            <span class="wa-online-dot" title="Online"></span>
          </div>
          <div>
            <div class="wa-popup-title">Minha Qur’an Academy</div>
            <div class="wa-popup-status"><i class="fa-solid fa-circle" style="color:#22c55e;font-size:9px;vertical-align:middle;margin-right:5px"></i>Online · Quick Response</div>
          </div>
        </div>
        <button type="button" class="wa-popup-close" id="wa-popup-close" aria-label="Close WhatsApp Menu">&times;</button>
      </div>
      <div class="wa-popup-body">
        <p class="wa-popup-msg">Assalamu Alaikum! Select your preferred WhatsApp branch to chat with us:</p>

        <!-- Pakistan Branch -->
        <a href="https://wa.me/923320697050?text=${encodeURIComponent(SITE.waGreeting)}" target="_blank" rel="noopener noreferrer" class="wa-branch-card">
          <span class="wa-branch-flag">🇵🇰</span>
          <span class="wa-branch-text">
            <span class="wa-branch-title">Pakistan Branch</span>
            <span class="wa-branch-num">0332 0697050</span>
            <span class="wa-branch-sub">General Inquiries &amp; Admissions</span>
          </span>
          <span class="wa-branch-chat-btn" aria-label="Chat on Pakistan WhatsApp">${ICON.wa}</span>
        </a>

        <!-- Saudi Arabia Branch -->
        <a href="https://wa.me/966567796812?text=${encodeURIComponent(SITE.waGreeting)}" target="_blank" rel="noopener noreferrer" class="wa-branch-card">
          <span class="wa-branch-flag">🇸🇦</span>
          <span class="wa-branch-text">
            <span class="wa-branch-title">Saudi Arabia (KSA) Branch</span>
            <span class="wa-branch-num">+966 56 779 6812</span>
            <span class="wa-branch-sub">Middle East &amp; Gulf Students</span>
          </span>
          <span class="wa-branch-chat-btn" aria-label="Chat on Saudi Arabia WhatsApp">${ICON.wa}</span>
        </a>
      </div>
    </div>

    <button type="button" class="wa-float-btn" id="wa-float-btn" aria-label="Chat with us on WhatsApp" title="WhatsApp Inquiries">
      ${ICON.wa}
    </button>
  `;
  document.body.appendChild(widgetWrap);

  const floatBtn = widgetWrap.querySelector('#wa-float-btn');
  const popup = widgetWrap.querySelector('#wa-popup');
  const closeBtn = widgetWrap.querySelector('#wa-popup-close');

  const togglePopup = () => {
    const isShowing = popup.classList.toggle('show');
    popup.setAttribute('aria-hidden', !isShowing);
  };

  floatBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePopup();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  });

  document.addEventListener('click', (e) => {
    if (!widgetWrap.contains(e.target)) {
      popup.classList.remove('show');
      popup.setAttribute('aria-hidden', 'true');
    }
  });

  // Clicking "WhatsApp Us" in mobile menu opens the branch choice popup
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      popup.classList.add('show');
      popup.setAttribute('aria-hidden', 'false');
    });
  });
}

/* ---------- 3. Header behaviour ---------- */
function initHeader() {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  if (!header) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }
    document.body.style.overflow = '';
  };

  const openMenu = () => {
    document.body.classList.add('menu-open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
    }
    document.body.style.overflow = 'hidden';
  };

  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (document.body.classList.contains('menu-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop?.addEventListener('click', closeMenu);

  document.querySelectorAll('#mobile-menu-drawer a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1180 && document.body.classList.contains('menu-open')) {
      closeMenu();
    }
  }, { passive: true });
}

/* ---------- 4. Reveal on scroll ---------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
}

/* ---------- 5. Forms (enrollment & contact) via Formspree ---------- */
function initForms() {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgaoknda';

  document.querySelectorAll('form[data-form]').forEach(form => {
    // Pre-select course from ?course=
    const preset = new URLSearchParams(location.search).get('course');
    const select = form.querySelector('select[name="course"]');
    if (preset && select) {
      const opt = [...select.options].find(o => o.value === preset || o.text === preset);
      if (opt) select.value = opt.value;
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      let errorEl = form.querySelector('.form-error');

      // Clear previous error message
      if (errorEl) {
        errorEl.classList.remove('show');
        errorEl.textContent = '';
      }

      // Show submitting state on the button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.78';
        submitBtn.innerHTML = `
          <span>Submitting...</span>
          <svg style="animation:spin 1s linear infinite;width:18px;height:18px;margin-left:8px;display:inline-block;vertical-align:middle;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
          </svg>
        `;
      }

      const endpoint = form.getAttribute('action') || FORMSPREE_ENDPOINT;
      const formData = new FormData(form);

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          const success = form.parentElement.querySelector('.form-success');
          form.style.display = 'none';
          form.hidden = true;
          form.reset();

          if (success) {
            success.classList.add('show');
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          const data = await response.json().catch(() => ({}));
          let errorMsg = 'Oops! There was a problem submitting your request. Please try again.';
          if (data && data.errors && data.errors.length) {
            errorMsg = data.errors.map(err => err.message || err.field).join(', ');
          }
          showFormError(errorMsg);
        }
      } catch (err) {
        showFormError('Network error! Please check your internet connection or reach out to us directly on WhatsApp.');
      }

      function showFormError(msg) {
        if (!errorEl) {
          errorEl = document.createElement('div');
          errorEl.className = 'form-error';
          form.insertBefore(errorEl, form.firstChild);
        }
        errorEl.textContent = msg;
        errorEl.classList.add('show');
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  });
}

/* ---------- 6. Kids letter game ---------- */
function initLetterGame() {
  const game = document.getElementById('letter-game');
  if (!game) return;
  const LETTERS = [
    ['ا', 'Alif'], ['ب', 'Baa'], ['ت', 'Taa'], ['ث', 'Thaa'], ['ج', 'Jeem'], ['ح', 'Haa'],
    ['خ', 'Khaa'], ['د', 'Daal'], ['ر', 'Raa'], ['س', 'Seen'], ['ش', 'Sheen'], ['ص', 'Saad'],
    ['ع', 'Ain'], ['ف', 'Faa'], ['ق', 'Qaaf'], ['ك', 'Kaaf'], ['ل', 'Laam'], ['م', 'Meem'], ['ن', 'Noon'], ['ي', 'Yaa']
  ];
  const grid = game.querySelector('.letters');
  const target = game.querySelector('#game-target');
  const msg = game.querySelector('.game-msg');
  const scoreEl = game.querySelector('#game-score');
  const cheers = ['MashaAllah!', 'Excellent!', 'Well done!', 'Super star!', 'Amazing!'];
  let score = 0, answer, locked = false;

  const shuffle = arr => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(v => v[1]);

  function round() {
    locked = false;
    const pick = shuffle(LETTERS).slice(0, 8);
    answer = pick[Math.floor(Math.random() * pick.length)];
    target.textContent = answer[1];
    msg.textContent = 'Tap the correct letter';
    grid.innerHTML = pick.map(([ch, name]) =>
      `<button class="letter" data-name="${name}" aria-label="${name}">${ch}</button>`).join('');
  }

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.letter');
    if (!btn || locked) return;
    if (btn.dataset.name === answer[1]) {
      locked = true;
      btn.classList.add('correct');
      scoreEl.textContent = ++score;
      msg.textContent = cheers[score % cheers.length];
      setTimeout(round, 1000);
    } else {
      btn.classList.remove('wrong'); void btn.offsetWidth; btn.classList.add('wrong');
      msg.textContent = `That is “${btn.dataset.name}”. Try again!`;
    }
  });
  round();
}

/* ---------- 7. Live Theme Customizer UI ---------- */
function initThemeCustomizer() {
  if (!ENABLE_THEME_CUSTOMIZER) return;

  let currentTheme = getStoredTheme() || { ...DEFAULT_THEME };

  // 1. Theme trigger launcher (Floating button hidden; relocated to footer icon)
  const triggerBtn = document.createElement('button');
  triggerBtn.className = 'tc-trigger-btn';
  triggerBtn.id = 'tc-trigger-btn';
  triggerBtn.style.display = 'none';
  triggerBtn.setAttribute('aria-label', 'Open Theme Customizer');

  // 2. Backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'tc-backdrop';
  backdrop.id = 'tc-backdrop';
  document.body.appendChild(backdrop);

  // 3. Drawer
  const drawer = document.createElement('aside');
  drawer.className = 'tc-drawer';
  drawer.id = 'tc-drawer';
  drawer.setAttribute('aria-label', 'Theme Customizer Drawer');
  drawer.setAttribute('aria-hidden', 'true');

  const headingOptions = FONTS_DISPLAY.map(f =>
    `<option value="${f.name}" ${f.name === currentTheme.headingFont ? 'selected' : ''}>${f.name} — ${f.desc}</option>`
  ).join('');

  const bodyOptions = FONTS_BODY.map(f =>
    `<option value="${f.name}" ${f.name === currentTheme.bodyFont ? 'selected' : ''}>${f.name} — ${f.desc}</option>`
  ).join('');

  drawer.innerHTML = `
    <div class="tc-header">
      <div class="tc-title-wrap">
        <span class="tc-header-badge">LIVE EDITOR</span>
        <h3 class="tc-title"><i class="fa-solid fa-palette" style="margin-right:8px;color:var(--gold-400)"></i>Theme Customizer</h3>
        <p class="tc-subtitle">Change site colors &amp; typography live for client preview</p>
      </div>
      <button class="tc-close-btn" id="tc-close-btn" aria-label="Close Theme Customizer">&times;</button>
    </div>

    <div class="tc-body">
      <!-- Section 1: Presets -->
      <div class="tc-section">
        <div class="tc-section-label">Curated Color Palettes</div>
        <div class="tc-presets-grid" id="tc-presets-grid">
          ${THEME_PRESETS.map(p => `
            <button type="button" class="tc-preset-btn ${p.primary === currentTheme.primary && p.secondary === currentTheme.secondary ? 'active' : ''}" data-preset="${p.id}">
              <span class="tc-preset-name">${p.label}</span>
              <span class="tc-preset-dots">
                <span class="tc-dot" style="background:${p.primary}" title="Primary"></span>
                <span class="tc-dot" style="background:${p.secondary}" title="Secondary"></span>
                <span class="tc-dot" style="background:${p.bg}" title="Background"></span>
              </span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Section 2: Custom Colors -->
      <div class="tc-section">
        <div class="tc-section-label">Custom Brand Colors</div>

        <div class="tc-color-row">
          <div class="tc-color-info">
            <span class="tc-color-name">Primary Color</span>
            <span class="tc-color-hint">Header, Hero Banner, Headings</span>
          </div>
          <div class="tc-color-inputs">
            <input type="color" id="tc-color-primary" class="tc-picker" value="${currentTheme.primary}">
            <input type="text" id="tc-hex-primary" class="tc-hex-input" maxlength="7" value="${currentTheme.primary}">
          </div>
        </div>

        <div class="tc-color-row">
          <div class="tc-color-info">
            <span class="tc-color-name">Secondary Accent</span>
            <span class="tc-color-hint">Buttons, Badges, Gold Accents</span>
          </div>
          <div class="tc-color-inputs">
            <input type="color" id="tc-color-secondary" class="tc-picker" value="${currentTheme.secondary}">
            <input type="text" id="tc-hex-secondary" class="tc-hex-input" maxlength="7" value="${currentTheme.secondary}">
          </div>
        </div>

        <div class="tc-color-row">
          <div class="tc-color-info">
            <span class="tc-color-name">Third / Background</span>
            <span class="tc-color-hint">Page Background, Card Ivory/White</span>
          </div>
          <div class="tc-color-inputs">
            <input type="color" id="tc-color-bg" class="tc-picker" value="${currentTheme.bg}">
            <input type="text" id="tc-hex-bg" class="tc-hex-input" maxlength="7" value="${currentTheme.bg}">
          </div>
        </div>
      </div>

      <!-- Section 3: Fonts -->
      <div class="tc-section">
        <div class="tc-section-label">Typography &amp; Fonts</div>

        <div class="tc-field">
          <label class="tc-field-label" for="tc-font-heading">Heading Font (Display)</label>
          <select id="tc-font-heading" class="tc-select">${headingOptions}</select>
        </div>

        <div class="tc-field">
          <label class="tc-field-label" for="tc-font-body">Body Font (Paragraphs)</label>
          <select id="tc-font-body" class="tc-select">${bodyOptions}</select>
        </div>
      </div>

      <!-- Section 4: Actions -->
      <div class="tc-actions">
        <button type="button" class="btn btn-gold btn-block tc-btn-copy" id="tc-btn-copy">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span>Copy CSS Variables</span>
        </button>
        <button type="button" class="tc-btn-reset" id="tc-btn-reset">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          <span>Reset to Default</span>
        </button>
      </div>

      <div class="tc-note">
        <i class="fa-solid fa-sparkles" style="color:var(--gold-400);margin-right:6px"></i><strong>Instant Live Preview:</strong> Changes apply instantly across the whole page and save to your browser. Use <strong>Copy CSS</strong> to get permanent CSS code for your project!
      </div>
    </div>
  `;
  document.body.appendChild(drawer);

  // 4. Toast notification
  const toast = document.createElement('div');
  toast.className = 'tc-toast';
  toast.id = 'tc-toast';
  document.body.appendChild(toast);

  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  // Toggle drawer open/close
  const openDrawer = () => {
    document.body.classList.add('tc-open');
    drawer.setAttribute('aria-hidden', 'false');
  };

  const closeDrawer = () => {
    document.body.classList.remove('tc-open');
    drawer.setAttribute('aria-hidden', 'true');
  };

  const toggleDrawer = () => {
    if (document.body.classList.contains('tc-open')) closeDrawer();
    else openDrawer();
  };

  triggerBtn.addEventListener('click', toggleDrawer);

  // Global listener for footer theme toggle button and any theme triggers
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#footer-theme-toggle, .footer-theme-toggle, #tc-trigger-btn');
    if (!btn) return;
    e.preventDefault();
    toggleDrawer();
  });

  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelector('#tc-close-btn').addEventListener('click', closeDrawer);

  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('tc-open')) {
      closeDrawer();
    }
  });

  // Inputs
  const colorPrimary = drawer.querySelector('#tc-color-primary');
  const hexPrimary = drawer.querySelector('#tc-hex-primary');
  const colorSecondary = drawer.querySelector('#tc-color-secondary');
  const hexSecondary = drawer.querySelector('#tc-hex-secondary');
  const colorBg = drawer.querySelector('#tc-color-bg');
  const hexBg = drawer.querySelector('#tc-hex-bg');
  const fontHeading = drawer.querySelector('#tc-font-heading');
  const fontBody = drawer.querySelector('#tc-font-body');
  const presetBtns = drawer.querySelectorAll('.tc-preset-btn');

  const updatePresetHighlight = () => {
    presetBtns.forEach(btn => {
      const p = THEME_PRESETS.find(x => x.id === btn.dataset.preset);
      if (p && p.primary.toLowerCase() === currentTheme.primary.toLowerCase() &&
          p.secondary.toLowerCase() === currentTheme.secondary.toLowerCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const syncInputs = () => {
    colorPrimary.value = currentTheme.primary;
    hexPrimary.value = currentTheme.primary.toUpperCase();
    colorSecondary.value = currentTheme.secondary;
    hexSecondary.value = currentTheme.secondary.toUpperCase();
    colorBg.value = currentTheme.bg;
    hexBg.value = currentTheme.bg.toUpperCase();
    fontHeading.value = currentTheme.headingFont;
    fontBody.value = currentTheme.bodyFont;
    updatePresetHighlight();
  };

  // Preset click
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const p = THEME_PRESETS.find(x => x.id === btn.dataset.preset);
      if (p) {
        currentTheme = {
          primary: p.primary,
          secondary: p.secondary,
          bg: p.bg,
          headingFont: p.headingFont,
          bodyFont: p.bodyFont
        };
        applyTheme(currentTheme, true);
        syncInputs();
        showToast(`Theme applied: ${p.name}`);
      }
    });
  });

  // Primary color change
  const handlePrimary = val => {
    currentTheme.primary = val;
    hexPrimary.value = val.toUpperCase();
    colorPrimary.value = val;
    applyTheme(currentTheme, true);
    updatePresetHighlight();
  };
  colorPrimary.addEventListener('input', e => handlePrimary(e.target.value));
  hexPrimary.addEventListener('input', e => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) handlePrimary(val);
  });

  // Secondary color change
  const handleSecondary = val => {
    currentTheme.secondary = val;
    hexSecondary.value = val.toUpperCase();
    colorSecondary.value = val;
    applyTheme(currentTheme, true);
    updatePresetHighlight();
  };
  colorSecondary.addEventListener('input', e => handleSecondary(e.target.value));
  hexSecondary.addEventListener('input', e => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) handleSecondary(val);
  });

  // Background color change
  const handleBg = val => {
    currentTheme.bg = val;
    hexBg.value = val.toUpperCase();
    colorBg.value = val;
    applyTheme(currentTheme, true);
    updatePresetHighlight();
  };
  colorBg.addEventListener('input', e => handleBg(e.target.value));
  hexBg.addEventListener('input', e => {
    let val = e.target.value.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) handleBg(val);
  });

  // Font changes
  fontHeading.addEventListener('change', e => {
    currentTheme.headingFont = e.target.value;
    applyTheme(currentTheme, true);
  });

  fontBody.addEventListener('change', e => {
    currentTheme.bodyFont = e.target.value;
    applyTheme(currentTheme, true);
  });

  // Reset
  drawer.querySelector('#tc-btn-reset').addEventListener('click', () => {
    currentTheme = { ...DEFAULT_THEME };
    localStorage.removeItem('minha_site_theme');
    applyTheme(DEFAULT_THEME, false);
    syncInputs();
    showToast('Theme reset to default brand colors!');
  });

  // Copy CSS Variables
  drawer.querySelector('#tc-btn-copy').addEventListener('click', () => {
    const [ph, ps, pl] = hexToHsl(currentTheme.primary);
    const emerald950 = hslToHex(ph, ps, Math.max(4, pl - 6));
    const emerald900 = currentTheme.primary;
    const emerald800 = hslToHex(ph, ps, Math.min(95, pl + 6));
    const emerald700 = hslToHex(ph, ps, Math.min(95, pl + 13));
    const emerald600 = hslToHex(ph, ps, Math.min(95, pl + 20));
    const emerald100 = hslToHex(ph, Math.min(45, ps), 92);
    const emerald50  = hslToHex(ph, Math.min(35, ps), 97);

    const [sh, ss, sl] = hexToHsl(currentTheme.secondary);
    const gold600 = hslToHex(sh, ss, Math.max(8, sl - 8));
    const gold500 = currentTheme.secondary;
    const gold400 = hslToHex(sh, ss, Math.min(92, sl + 10));
    const gold200 = hslToHex(sh, Math.min(55, ss), 86);
    const gold100 = hslToHex(sh, Math.min(50, ss), 94);

    const cssCode = `/* ==========================================================================
   CUSTOM THEME — Minha Qur'an Academy
   Generated via Theme Customizer
   ========================================================================== */
:root {
  /* Brand Primary */
  --emerald-950: ${emerald950};
  --emerald-900: ${emerald900};
  --emerald-800: ${emerald800};
  --emerald-700: ${emerald700};
  --emerald-600: ${emerald600};
  --emerald-100: ${emerald100};
  --emerald-50: ${emerald50};

  /* Secondary Accent */
  --gold-600: ${gold600};
  --gold-500: ${gold500};
  --gold-400: ${gold400};
  --gold-200: ${gold200};
  --gold-100: ${gold100};

  /* Base & Background */
  --ivory: ${currentTheme.bg};

  /* Typography */
  --f-display: "${currentTheme.headingFont}", Georgia, serif;
  --f-body: "${currentTheme.bodyFont}", system-ui, -apple-system, sans-serif;
}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cssCode).then(() => {
        showToast('CSS Code Copied to Clipboard!');
      }).catch(() => {
        fallbackCopy(cssCode);
      });
    } else {
      fallbackCopy(cssCode);
    }
  });

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('CSS Code Copied to Clipboard!');
  }
}

/* ---------- 8. Multinational Reviews Carousel ---------- */
function initReviewsCarousel() {
  const sections = document.querySelectorAll('.reviews-section');
  if (!sections.length) return;

  sections.forEach(section => {
    const track = section.querySelector('.reviews-carousel-track');
    const viewport = section.querySelector('.reviews-carousel-viewport');
    const prevBtn = section.querySelector('.reviews-nav-prev');
    const nextBtn = section.querySelector('.reviews-nav-next');
    const dotsContainer = section.querySelector('.reviews-dots');
    const counterEl = section.querySelector('.reviews-counter-current');
    const counterTotalEl = section.querySelector('.reviews-counter-total');
    const filterBtns = section.querySelectorAll('.reviews-filter-btn');
    if (!track) return;

    let allCards = Array.from(track.querySelectorAll('.review-card-modern'));
    let visibleCards = [...allCards];
    let currentIndex = 0;
    let autoSlideInterval = null;
    let isTouching = false;
    let startX = 0;
    let currentX = 0;

    const getItemsPerView = () => {
      const w = window.innerWidth;
      if (w <= 720) return 1;
      if (w <= 1080) return 2;
      return 3;
    };

    const getMaxIndex = () => {
      const perView = getItemsPerView();
      return Math.max(0, visibleCards.length - perView);
    };

    const updateDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const maxIdx = getMaxIndex();
      const dotCount = maxIdx + 1;

      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('button');
        dot.className = `reviews-dot ${i === currentIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to review slide ${i + 1}`);
        dot.setAttribute('type', 'button');
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const updateCounter = () => {
      if (counterEl) {
        counterEl.textContent = String(currentIndex + 1).padStart(2, '0');
      }
      if (counterTotalEl) {
        counterTotalEl.textContent = `/ ${String(visibleCards.length).padStart(2, '0')}`;
      }
    };

    const updatePosition = () => {
      if (!visibleCards.length || !visibleCards[currentIndex]) {
        track.style.transform = 'translateX(0px)';
        return;
      }
      const targetCard = visibleCards[currentIndex];
      const offset = targetCard.offsetLeft;
      track.style.transform = `translateX(-${offset}px)`;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.reviews-dot');
        dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
      }

      updateCounter();
    };

    const goToSlide = (index) => {
      const maxIdx = getMaxIndex();
      if (index < 0) {
        currentIndex = maxIdx;
      } else if (index > maxIdx) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      updatePosition();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });
    }

    // Filter cards
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        allCards.forEach(card => {
          const categories = (card.dataset.category || '').split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });

        visibleCards = allCards.filter(c => c.style.display !== 'none');
        currentIndex = 0;
        updateDots();
        updatePosition();
        resetAutoSlide();
      });
    });

    // Auto slide
    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        nextSlide();
      }, 4800);
    };

    const stopAutoSlide = () => {
      if (autoSlideInterval) clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    if (viewport) {
      viewport.addEventListener('mouseenter', stopAutoSlide);
      viewport.addEventListener('mouseleave', startAutoSlide);

      // Touch handling
      viewport.addEventListener('touchstart', (e) => {
        stopAutoSlide();
        isTouching = true;
        startX = e.touches[0].clientX;
        currentX = startX;
      }, { passive: true });

      viewport.addEventListener('touchmove', (e) => {
        if (!isTouching) return;
        currentX = e.touches[0].clientX;
      }, { passive: true });

      viewport.addEventListener('touchend', () => {
        if (!isTouching) return;
        isTouching = false;
        const diffX = startX - currentX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) nextSlide();
          else prevSlide();
        }
        startAutoSlide();
      });
    }

    // Keyboard navigation when focused inside section
    section.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoSlide();
      }
    });

    // Window resize debounced
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateDots();
        goToSlide(Math.min(currentIndex, getMaxIndex()));
      }, 150);
    }, { passive: true });

    // Initialize state
    updateDots();
    updatePosition();
    startAutoSlide();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLayout();
  initHeader();
  initThemeCustomizer();
  initReveal();
  initForms();
  initLetterGame();
  initReviewsCarousel();
});

