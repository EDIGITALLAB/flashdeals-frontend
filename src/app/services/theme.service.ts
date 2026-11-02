import { Injectable, signal } from '@angular/core';

export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
  hover: string;
  light: string;
  glow: string;
  isNew?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly colors: ThemeColor[] = [
    {
      id: 'pink',
      name: 'Flash Pink',
      hex: '#ff2e63',
      hover: '#e02050',
      light: '#fff0f3',
      glow: 'rgba(255, 46, 99, 0.3)'
    },
    {
      id: 'teal',
      name: 'Teal Mint',
      hex: '#00BBA9',
      hover: '#009e8f',
      light: '#e6fbf9',
      glow: 'rgba(0, 187, 169, 0.3)',
      isNew: true
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      hex: '#7c3aed',
      hover: '#6d28d9',
      light: '#f3e8ff',
      glow: 'rgba(124, 58, 237, 0.3)'
    },
    {
      id: 'blue',
      name: 'Ocean Blue',
      hex: '#0284c7',
      hover: '#0369a1',
      light: '#f0f9ff',
      glow: 'rgba(2, 132, 199, 0.3)'
    },
    {
      id: 'orange',
      name: 'Sunset Orange',
      hex: '#f97316',
      hover: '#ea580c',
      light: '#fff7ed',
      glow: 'rgba(249, 115, 22, 0.3)'
    }
  ];

  activeColorId = signal<string>('pink');
  isDarkMode = signal<boolean>(false);
  isPanelOpen = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  initTheme() {
    if (typeof window === 'undefined') return;
    try {
      const savedColor = localStorage.getItem('flashdeals_theme_color');
      const savedDark = localStorage.getItem('flashdeals_dark_mode');

      if (savedColor && this.colors.some(c => c.id === savedColor)) {
        this.setColor(savedColor, false);
      } else {
        this.setColor('pink', false);
      }

      if (savedDark === 'true') {
        this.setDarkMode(true, false);
      }
    } catch (e) {
      this.setColor('pink', false);
    }
  }

  togglePanel() {
    this.isPanelOpen.update(v => !v);
  }

  closePanel() {
    this.isPanelOpen.set(false);
  }

  openPanel() {
    this.isPanelOpen.set(true);
  }

  setColor(colorId: string, save = true) {
    const selected = this.colors.find(c => c.id === colorId);
    if (!selected) return;

    this.activeColorId.set(colorId);
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', selected.hex);
      root.style.setProperty('--primary-hover', selected.hover);
      root.style.setProperty('--primary-light', selected.light);
      root.style.setProperty('--primary-glow', selected.glow);
      root.style.setProperty('--theme-teal', '#00BBA9');

      if (document.body) {
        document.body.style.setProperty('--primary-color', selected.hex);
        document.body.style.setProperty('--primary-hover', selected.hover);
        document.body.style.setProperty('--primary-light', selected.light);
        document.body.style.setProperty('--primary-glow', selected.glow);

        // Apply theme-specific class on body
        this.colors.forEach(c => document.body.classList.remove(`theme-${c.id}`));
        document.body.classList.add(`theme-${selected.id}`);
      }

      // Dynamic stylesheet injection for 100% reliable real-time override
      let dynamicStyle = document.getElementById('flashdeals-dynamic-theme') as HTMLStyleElement;
      if (!dynamicStyle) {
        dynamicStyle = document.createElement('style');
        dynamicStyle.id = 'flashdeals-dynamic-theme';
        document.head.appendChild(dynamicStyle);
      }
      dynamicStyle.textContent = `
        :root, html, body {
          --primary-color: ${selected.hex} !important;
          --primary-hover: ${selected.hover} !important;
          --primary-light: ${selected.light} !important;
          --primary-glow: ${selected.glow} !important;
        }
        .header-icon-circle,
        .header-timer-pill,
        .discount-badge-pill,
        .add-cart-btn,
        .spotlight-tag-pill,
        .banner-pill-btn {
          background-color: ${selected.hex} !important;
          color: #ffffff !important;
        }
        .add-cart-btn {
          background-color: ${selected.hex} !important;
          box-shadow: 0 3px 8px ${selected.glow} !important;
        }
        .add-cart-btn:hover {
          background-color: ${selected.hover} !important;
        }
        .current-price,
        .mini-current-price,
        .quad-foot-link,
        .spotlight-discount-tag,
        .logo-highlight {
          color: ${selected.hex} !important;
        }
        .spotlight-discount-tag {
          background-color: ${selected.light} !important;
          color: ${selected.hex} !important;
        }
        .logo-circle {
          background: linear-gradient(135deg, ${selected.hex} 0%, #ff6900 100%) !important;
          box-shadow: 0 4px 10px ${selected.glow} !important;
        }
        .banner-under-999 {
          background: linear-gradient(135deg, ${selected.light} 0%, #ffffff 60%, ${selected.light} 100%) !important;
        }
        .title-burgundy {
          color: ${selected.hex} !important;
        }
        .btn-burgundy {
          background-color: ${selected.hex} !important;
          box-shadow: 0 4px 14px ${selected.glow} !important;
        }
        .btn-burgundy:hover {
          background-color: ${selected.hover} !important;
        }
        .spotlight-quad-card {
          border-color: ${selected.glow} !important;
          box-shadow: 0 4px 16px ${selected.glow} !important;
        }
        .spotlight-quad-card:hover,
        .amazon-quad-card:hover,
        .quad-feature-card:hover,
        .vertical-deal-card:hover,
        .category-card:hover,
        .rec-mini-card:hover {
          border-color: ${selected.hex} !important;
          box-shadow: 0 10px 24px ${selected.glow} !important;
        }
        .quad-foot-link:hover,
        .quad-footer-link:hover {
          color: ${selected.hover} !important;
        }
        .category-pill-btn.active,
        .btn-directions,
        .btn-dir,
        .btn-claim-deal-coupon,
        .active-deals-pill,
        .btn-reset-filters {
          background-color: ${selected.hex} !important;
          color: #ffffff !important;
        }
        .category-pill-btn.active {
          border-color: ${selected.hex} !important;
          box-shadow: 0 4px 14px ${selected.glow} !important;
        }
        .category-pill-btn:hover {
          border-color: ${selected.hex} !important;
          color: ${selected.hex} !important;
        }
        .store-card:hover,
        .store-deal-card:hover {
          border-color: ${selected.hex} !important;
          box-shadow: 0 16px 36px ${selected.glow} !important;
        }
        .offer-ribbon-box {
          background: linear-gradient(135deg, ${selected.light} 0%, #ffffff 100%) !important;
          border-color: ${selected.glow} !important;
        }
        .ribbon-text,
        .stat-num,
        .tab-btn.active,
        .item-icon,
        .map-icon,
        .c-icon,
        .code-text {
          color: ${selected.hex} !important;
        }
        .tab-btn.active {
          border-bottom-color: ${selected.hex} !important;
        }
        .btn-directions:hover,
        .btn-dir:hover,
        .btn-claim-deal-coupon:hover {
          background-color: ${selected.hover} !important;
        }
        .hero-badge {
          background-color: ${selected.glow} !important;
          border-color: ${selected.hex} !important;
        }
      `;
    }

    if (save && typeof window !== 'undefined') {
      try {
        localStorage.setItem('flashdeals_theme_color', colorId);
      } catch (e) {}
    }
  }

  setDarkMode(isDark: boolean, save = true) {
    this.isDarkMode.set(isDark);
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }

    if (save && typeof window !== 'undefined') {
      try {
        localStorage.setItem('flashdeals_dark_mode', String(isDark));
      } catch (e) {}
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!this.isDarkMode());
  }

  resetTheme() {
    this.setColor('pink');
    this.setDarkMode(false);
  }
}

