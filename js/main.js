/* ============================================
   ADRAR VOYAGES — Main JavaScript
   Interactions, Animations, Components
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- HEADER SCROLL BEHAVIOR --- */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* --- LANGUAGE SWITCHER --- */
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    const trigger = langSwitcher.querySelector('.lang-current');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      langSwitcher.classList.toggle('open');
    });

    langSwitcher.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        if (lang) {
          I18N.setLang(lang);
          langSwitcher.classList.remove('open');
        }
      });
    });

    document.addEventListener('click', () => {
      langSwitcher.classList.remove('open');
    });
  }

  /* --- MOBILE MENU --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
    if (mobileClose) {
      mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    }
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* --- SCROLL ANIMATIONS (IntersectionObserver) --- */
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
  if (animatedElements.length && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  /* --- COUNTER ANIMATION --- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && !prefersReducedMotion) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = el.getAttribute('data-count');
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * parseInt(target));
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* --- SMOOTH SCROLL --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* --- MOOD FILTER CHIPS --- */
  const moodChips = document.querySelectorAll('.mood-chip');
  moodChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const activeMoods = Array.from(document.querySelectorAll('.mood-chip.active'))
        .map(c => c.dataset.mood);
      document.dispatchEvent(new CustomEvent('moodchange', { detail: { moods: activeMoods } }));
    });
  });

  /* --- TRIP BUILDER INTERACTION --- */
  const builderOptions = document.querySelectorAll('.builder-option');
  builderOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const group = opt.closest('.builder-step');
      if (group) {
        group.querySelectorAll('.builder-option').forEach(o => o.classList.remove('selected'));
      }
      opt.classList.add('selected');
    });
  });

  /* --- CONCIERGE FAB --- */
  const conciergeFab = document.querySelector('.concierge-fab');
  if (conciergeFab) {
    conciergeFab.addEventListener('click', () => {
      if (conciergeFab.dataset.enhanced) return;
      const lang = I18N.currentLang;
      const messages = {
        en: 'Hello! I\'d like to plan a trip to Morocco.',
        fr: 'Bonjour ! Je souhaite planifier un voyage au Maroc.',
        es: '¡Hola! Me gustaría planificar un viaje a Marruecos.',
        ar: 'مرحباً! أرغب في التخطيط لرحلة إلى المغرب.'
      };
      const msg = encodeURIComponent(messages[lang] || messages.en);
      window.open(`https://wa.me/212600000000?text=${msg}`, '_blank');
    });
  }

  /* --- CURRENCY SELECTOR --- */
  const currencySelector = document.querySelector('.currency-selector');
  if (currencySelector) {
    const currencies = { MAD: 'MAD', EUR: '€', USD: '$', GBP: '£' };
    const rates = { MAD: 1, EUR: 0.091, USD: 0.1, GBP: 0.079 };
    let currentCurrency = localStorage.getItem('adrar-currency') || 'EUR';

    const updatePrices = () => {
      document.querySelectorAll('[data-price-mad]').forEach(el => {
        const madPrice = parseInt(el.getAttribute('data-price-mad'));
        const converted = Math.round(madPrice * rates[currentCurrency]);
        const symbol = currencies[currentCurrency];
        el.textContent = currentCurrency === 'MAD'
          ? `${converted.toLocaleString()} MAD`
          : `${symbol}${converted.toLocaleString()}`;
      });
    };

    currencySelector.addEventListener('click', () => {
      const keys = Object.keys(currencies);
      const idx = keys.indexOf(currentCurrency);
      currentCurrency = keys[(idx + 1) % keys.length];
      localStorage.setItem('adrar-currency', currentCurrency);
      currencySelector.querySelector('.currency-symbol').textContent = currencies[currentCurrency];
      updatePrices();
    });

    updatePrices();
  }

  /* --- HERO VIDEO FALLBACK --- */
  const heroVideo = document.querySelector('.hero-media video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      const fallback = document.createElement('img');
      fallback.src = 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1920&q=80';
      fallback.alt = 'Moroccan desert landscape';
      heroVideo.parentElement.replaceChild(fallback, heroVideo);
    });
  }

  /* --- SEASONAL BANNER DISMISS --- */
  const seasonalBanner = document.querySelector('.seasonal-banner');
  if (seasonalBanner) {
    const dismissBtn = seasonalBanner.querySelector('.banner-dismiss');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        seasonalBanner.style.maxHeight = seasonalBanner.offsetHeight + 'px';
        requestAnimationFrame(() => {
          seasonalBanner.style.maxHeight = '0';
          seasonalBanner.style.overflow = 'hidden';
          seasonalBanner.style.transition = 'max-height 0.3s ease';
        });
        setTimeout(() => {
          seasonalBanner.remove();
          document.documentElement.style.setProperty('--banner-height', '0px');
        }, 300);
      });
    }
  }

  /* --- SEARCH OVERLAY --- */
  const searchTrigger = document.querySelector('.search-trigger');
  const searchOverlay = document.querySelector('.search-overlay');
  if (searchTrigger && searchOverlay) {
    searchTrigger.addEventListener('click', () => {
      searchOverlay.classList.add('open');
      searchOverlay.querySelector('input')?.focus();
    });
    searchOverlay.querySelector('.search-close')?.addEventListener('click', () => {
      searchOverlay.classList.remove('open');
    });
  }

  /* --- PWA SERVICE WORKER --- */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }

  /* --- STRUCTURED DATA (JSON-LD) --- */
  const jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (!jsonLd) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      "name": "Adrar Voyages",
      "description": "Premium Moroccan tour operator crafting transformative journeys since 2003",
      "url": window.location.origin,
      "telephone": "+212-5XX-XXXXXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Marrakech",
        "addressCountry": "MA"
      },
      "priceRange": "$$$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1247"
      }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /* === MOTION CRAFT === */

  /* --- Kinetic Hero Split --- */
  function splitHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    const html = heroTitle.innerHTML;
    if (html.includes('<span class="line"')) return;
    const parts = html.split(/<br\s*\/?>/i);
    heroTitle.innerHTML = parts.map((part, i) =>
      `<span class="line"><span class="line-inner">${part.trim()}</span></span>`
    ).join('');
  }
  splitHeroTitle();
  document.addEventListener('langchange', () => {
    requestAnimationFrame(() => {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        heroTitle.querySelectorAll('.line-inner').forEach(el => {
          el.style.animation = 'none';
          el.offsetHeight;
          el.style.animation = '';
        });
      }
    });
  });

  /* --- View Transitions --- */
  if ('startViewTransition' in document) {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link || link.target === '_blank' || link.hash || link.hasAttribute('download')) return;
      const url = new URL(link.href, location.origin);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      document.documentElement.classList.add('vt-active');
      const transition = document.startViewTransition(() => {
        location.href = link.href;
      });
      transition.finished.finally(() => {
        document.documentElement.classList.remove('vt-active');
      });
    });
  }

  /* --- Magnetic / Tilt --- */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty('--lift-y', `${y * -8}px`);
        el.style.transform = `translateY(${y * -8}px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.setProperty('--lift-y', '0px');
        el.style.transform = '';
      });
    });
  }

  /* --- FLIP Dialog (card → detail) --- */
  const flipDialog = document.getElementById('flip-dialog');
  if (flipDialog) {
    document.querySelectorAll('[data-flip-target]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.dataset.flipTarget;
        const target = document.getElementById(targetId);
        if (!target) return;
        const content = flipDialog.querySelector('.flip-dialog-content');
        content.innerHTML = target.innerHTML;
        flipDialog.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    flipDialog.querySelector('.flip-dialog-close')?.addEventListener('click', () => {
      flipDialog.classList.remove('open');
      document.body.style.overflow = '';
    });
    flipDialog.addEventListener('click', (e) => {
      if (e.target === flipDialog) {
        flipDialog.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* --- Reduced Motion: Counter Animation --- */
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = parseInt(target).toLocaleString() + suffix;
    });
  }

  /* --- Reduced Motion: Hero Scroll Indicator --- */
  if (prefersReducedMotion) {
    document.querySelectorAll('.hero-scroll-indicator animate').forEach(a => {
      if (typeof a.endElement === 'function') a.endElement();
    });
  }

  /* === END MOTION CRAFT === */
});
