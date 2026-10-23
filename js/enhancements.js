/* ============================================
   ADRAR VOYAGES — Enhancements (v8)
   - Image resilience (retries broken responsive variants)
   - Back-to-top button
   - Live Morocco widget: local time + current weather
   - Search keyboard shortcuts ("/" to open, Esc to close)
   ============================================ */
(function () {
  'use strict';

  const lang = (document.documentElement.lang || 'en').slice(0, 2);
  const T = {
    en: { top: 'Back to top', live: 'Morocco right now', time: 'Local time', unavailable: 'Weather unavailable right now', updated: 'Live data · Open-Meteo' },
    fr: { top: 'Retour en haut', live: 'Le Maroc en ce moment', time: 'Heure locale', unavailable: 'Météo indisponible pour le moment', updated: 'Données en direct · Open-Meteo' },
    es: { top: 'Volver arriba', live: 'Marruecos ahora mismo', time: 'Hora local', unavailable: 'El tiempo no está disponible ahora', updated: 'Datos en vivo · Open-Meteo' },
    ar: { top: 'العودة إلى الأعلى', live: 'المغرب الآن', time: 'التوقيت المحلي', unavailable: 'الطقس غير متاح حالياً', updated: 'بيانات مباشرة · Open-Meteo' }
  }[lang] || null;
  const t = T || { top: 'Back to top', live: 'Morocco right now', time: 'Local time', unavailable: 'Weather unavailable right now', updated: 'Live data · Open-Meteo' };

  const CITIES = [
    { id: 'marrakech', lat: 31.63, lon: -8.01, name: { en: 'Marrakech', fr: 'Marrakech', es: 'Marrakech', ar: 'مراكش' } },
    { id: 'fes', lat: 34.03, lon: -5.0, name: { en: 'Fes', fr: 'Fès', es: 'Fez', ar: 'فاس' } },
    { id: 'merzouga', lat: 31.1, lon: -4.01, name: { en: 'Merzouga', fr: 'Merzouga', es: 'Merzouga', ar: 'مرزوكة' } },
    { id: 'essaouira', lat: 31.51, lon: -9.77, name: { en: 'Essaouira', fr: 'Essaouira', es: 'Esauira', ar: 'الصويرة' } },
    { id: 'chefchaouen', lat: 35.17, lon: -5.27, name: { en: 'Chefchaouen', fr: 'Chefchaouen', es: 'Chauen', ar: 'شفشاون' } }
  ];

  /* ---------- 1. Image resilience ---------- */
  function guardImage(img) {
    if (img.dataset.guarded) return;
    img.dataset.guarded = '1';
    const onError = () => {
      if (img.getAttribute('srcset')) {
        // A responsive variant failed — fall back to the plain src.
        img.removeAttribute('srcset');
        img.src = img.getAttribute('src');
        return;
      }
      img.classList.add('img-failed');
      img.removeEventListener('error', onError);
    };
    img.addEventListener('error', onError);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) onError();
  }
  document.querySelectorAll('img').forEach(guardImage);
  new MutationObserver(muts => muts.forEach(m => m.addedNodes.forEach(n => {
    if (n.nodeType !== 1) return;
    if (n.tagName === 'IMG') guardImage(n);
    n.querySelectorAll && n.querySelectorAll('img').forEach(guardImage);
  }))).observe(document.documentElement, { childList: true, subtree: true });

  /* ---------- 2. Back to top ---------- */
  const topBtn = document.createElement('button');
  topBtn.className = 'back-to-top';
  topBtn.type = 'button';
  topBtn.setAttribute('aria-label', t.top);
  topBtn.title = t.top;
  topBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(topBtn);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    (document.querySelector('#main-content') || document.body).focus?.({ preventScroll: true });
  });
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      topBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.9);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Search shortcuts ---------- */
  document.addEventListener('keydown', e => {
    const overlay = document.querySelector('.search-overlay');
    if (!overlay) return;
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (e.key === '/' && !typing && !overlay.classList.contains('open')) {
      e.preventDefault();
      document.querySelector('.search-trigger')?.click();
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      overlay.classList.remove('open');
      document.querySelector('.search-trigger')?.focus();
    }
  });

  /* ---------- 4. Live Morocco widget (footer) ---------- */
  const footerBottom = document.querySelector('.site-footer .footer-bottom');
  if (footerBottom) {
    const box = document.createElement('section');
    box.className = 'morocco-live';
    box.setAttribute('aria-label', t.live);
    box.innerHTML =
      '<div class="morocco-live-head"><span class="morocco-live-dot" aria-hidden="true"></span>' +
      '<span class="morocco-live-title">' + t.live + '</span>' +
      '<span class="morocco-live-time"><span class="sr-only">' + t.time + ': </span><time></time></span></div>' +
      '<ul class="morocco-live-cities">' + CITIES.map(c =>
        '<li data-city="' + c.id + '"><span class="ml-name">' + (c.name[lang] || c.name.en) + '</span>' +
        '<span class="ml-temp" aria-live="off">—</span></li>').join('') + '</ul>' +
      '<p class="morocco-live-note">' + t.updated + '</p>';
    footerBottom.parentNode.insertBefore(box, footerBottom);

    const timeEl = box.querySelector('time');
    const fmt = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-MA' : lang, {
      timeZone: 'Africa/Casablanca', weekday: 'short', hour: '2-digit', minute: '2-digit'
    });
    const tick = () => { timeEl.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 30000);

    const icon = code => code === 0 ? '☀️' : code <= 2 ? '🌤️' : code === 3 ? '☁️' : code <= 48 ? '🌫️' :
      code <= 67 || (code >= 80 && code <= 82) ? '🌧️' : code <= 77 || code === 85 || code === 86 ? '❄️' : '⛈️';

    const render = data => {
      data.forEach((d, i) => {
        const li = box.querySelector('[data-city="' + CITIES[i].id + '"] .ml-temp');
        if (li && d && d.current) {
          li.textContent = icon(d.current.weather_code) + ' ' + Math.round(d.current.temperature_2m) + '°C';
        }
      });
    };

    const KEY = 'adrar-weather-v1';
    let cached = null;
    try { cached = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) {}
    if (cached && Date.now() - cached.at < 30 * 60 * 1000) {
      render(cached.data);
    } else {
      const loadWeather = () => {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + CITIES.map(c => c.lat).join(',') +
          '&longitude=' + CITIES.map(c => c.lon).join(',') + '&current=temperature_2m,weather_code&timezone=Africa%2FCasablanca';
        fetch(url).then(r => r.ok ? r.json() : Promise.reject(r.status)).then(json => {
          const data = Array.isArray(json) ? json : [json];
          render(data);
          try { sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data })); } catch (e) {}
        }).catch(() => {
          box.querySelector('.morocco-live-note').textContent = t.unavailable;
        });
      };
      // Only fetch when the footer gets close to the viewport.
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
          if (entries.some(e => e.isIntersecting)) { io.disconnect(); loadWeather(); }
        }, { rootMargin: '600px' });
        io.observe(box);
      } else {
        loadWeather();
      }
    }
  }
})();
