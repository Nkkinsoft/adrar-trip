/* ============================================
   ADRAR VOYAGES — New Features JS
   Interactive Map, Calculator, Gallery, etc.
   ============================================ */
(function() {
  'use strict';

  const lang = (document.documentElement.lang || 'en').slice(0, 2);

  /* ---------- 1. INTERACTIVE MOROCCO MAP ---------- */
  const mapContainer = document.querySelector('.morocco-map-container');
  if (mapContainer) {
    const regions = mapContainer.querySelectorAll('.region');
    const tooltip = mapContainer.querySelector('.map-tooltip');
    
    const regionData = {
      marrakech: {
        en: { title: 'Marrakech', desc: 'The Red City — imperial palaces, vibrant souks, and Jemaa el-Fnaa' },
        fr: { title: 'Marrakech', desc: 'La Ville Rouge — palais impériaux, souks vibrants et Jemaa el-Fnaa' },
        es: { title: 'Marrakech', desc: 'La Ciudad Roja — palacios imperiales, zocos vibrantes y Jemaa el-Fnaa' },
        ar: { title: 'مراكش', desc: 'المدينة الحمراء — القصور الإمبراطورية والأسواق النابضة' }
      },
      fes: {
        en: { title: 'Fes', desc: 'Cultural capital — medieval medina, tanneries, and ancient universities' },
        fr: { title: 'Fès', desc: 'Capitale culturelle — médina médiévale, tanneries et universités anciennes' },
        es: { title: 'Fez', desc: 'Capital cultural — medina medieval, curtidurías y universidades antiguas' },
        ar: { title: 'فاس', desc: 'العاصمة الثقافية — المدينة القديمة ودباغات والجامعات' }
      },
      chefchaouen: {
        en: { title: 'Chefchaouen', desc: 'The Blue Pearl — picturesque blue-washed streets in the Rif Mountains' },
        fr: { title: 'Chefchaouen', desc: 'La Perle Bleue — rues bleues pittoresques du Rif' },
        es: { title: 'Chefchaouen', desc: 'La Perla Azul — calles azules pintorescas del Rif' },
        ar: { title: 'شفشاون', desc: 'اللؤلؤة الزرقاء — شوارع زرقاء ساحرة في جبال الريف' }
      },
      merzouga: {
        en: { title: 'Merzouga · Sahara', desc: 'Erg Chebbi dunes — camel treks, desert camps, starlit nights' },
        fr: { title: 'Merzouga · Sahara', desc: 'Dunes d\'Erg Chebbi — méharées, camps desertiques, nuits étoilées' },
        es: { title: 'Merzouga · Sáhara', desc: 'Dunas de Erg Chebbi — travesías en camello, campamentos, noches estrelladas' },
        ar: { title: 'مرزوكة · الصحراء', desc: 'كثبان إرق الشبي — رحلات الجمال ومخيمات الصحراء' }
      },
      imlil: {
        en: { title: 'Imlil · Atlas', desc: 'High Atlas gateway — trekking, Berber villages, Mount Toubkal' },
        fr: { title: 'Imlil · Atlas', desc: 'Porte du Haut Atlas — randonnée, villages berbères, mont Toubkal' },
        es: { title: 'Imlil · Atlas', desc: 'Puerta del Alto Atlas — senderismo, aldeas bereberes, monte Toubkal' },
        ar: { title: 'إمليل · الأطلس', desc: 'بوابة الأطلس الكبير — المشي والقرى الأمازيغية وجبل توبقال' }
      },
      essaouira: {
        en: { title: 'Essaouira', desc: 'Windy city — Atlantic coast, medina, Gnawa music, fresh seafood' },
        fr: { title: 'Essaouira', desc: 'Cité du vent — côte atlantique, médina, musique gnaouie, fruits de mer' },
        es: { title: 'Essaouira', desc: 'Ciudad del viento — costa atlántica, medina, música gnawa, mariscos' },
        ar: { title: 'الصويرة', desc: 'مدينة الرياح — الساحل الأطلسي والمدينة القديمة وموسيقى كناوة' }
      }
    };

    regions.forEach(region => {
      region.addEventListener('mouseenter', (e) => {
        const regionId = region.dataset.region;
        const data = regionData[regionId];
        if (data && data[lang]) {
          const t = data[lang];
          tooltip.innerHTML = '<h4>' + t.title + '</h4><p>' + t.desc + '</p>';
          tooltip.classList.add('visible');
        }
      });

      region.addEventListener('mousemove', (e) => {
        const rect = mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left + 20;
        const y = e.clientY - rect.top - 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
      });

      region.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });

      region.addEventListener('click', () => {
        const regionId = region.dataset.region;
        const href = '/adrar-trip/' + lang + '/destinations/#' + regionId;
        window.location.href = href;
      });
    });
  }

  /* ---------- 2. TRIP COST CALCULATOR ---------- */
  const calculator = document.querySelector('.trip-calculator');
  if (calculator) {
    const currencyBtns = calculator.querySelectorAll('.currency-btn');
    const inputs = calculator.querySelectorAll('select, input[type="number"]');
    const totalAmount = calculator.querySelector('.calc-total-amount');
    const breakdownContainer = calculator.querySelector('.calc-breakdown');

    const rates = { USD: 1, EUR: 0.92, GBP: 0.79, MAD: 10.0 };
    let currentCurrency = 'USD';

    const basePrices = {
      duration: { '3': 800, '5': 1200, '7': 1600, '10': 2200, '14': 3000 },
      travelers: 1,
      accommodation: { budget: 50, mid: 120, luxury: 300 },
      transport: { economy: 100, comfortable: 200, private: 400 },
      activities: { cultural: 200, adventure: 350, mixed: 280 }
    };

    function calculateTotal() {
      const duration = calculator.querySelector('[name="duration"]')?.value || '7';
      const travelers = parseInt(calculator.querySelector('[name="travelers"]')?.value) || 2;
      const accommodation = calculator.querySelector('[name="accommodation"]')?.value || 'mid';
      const transport = calculator.querySelector('[name="transport"]')?.value || 'comfortable';
      const activities = calculator.querySelector('[name="activities"]')?.value || 'mixed';

      const baseCost = basePrices.duration[duration] || 1600;
      const accomCost = basePrices.accommodation[accommodation] * parseInt(duration);
      const transportCost = basePrices.transport[transport];
      const activitiesCost = basePrices.activities[activities];

      const perPerson = baseCost + accomCost + transportCost + activitiesCost;
      const total = perPerson * travelers;
      const converted = total * rates[currentCurrency];

      if (totalAmount) {
        totalAmount.textContent = new Intl.NumberFormat(lang === 'ar' ? 'ar-MA' : lang === 'fr' ? 'fr-FR' : lang === 'es' ? 'es-ES' : 'en-US', {
          style: 'currency',
          currency: currentCurrency,
          maximumFractionDigits: 0
        }).format(converted);
      }

      if (breakdownContainer) {
        breakdownContainer.innerHTML = 
          '<div class="calc-breakdown-row"><span>Base journey</span><span>' + formatPrice(baseCost * travelers) + '</span></div>' +
          '<div class="calc-breakdown-row"><span>Accommodation (' + accommodation + ')</span><span>' + formatPrice(accomCost * travelers) + '</span></div>' +
          '<div class="calc-breakdown-row"><span>Transport (' + transport + ')</span><span>' + formatPrice(transportCost * travelers) + '</span></div>' +
          '<div class="calc-breakdown-row"><span>Activities (' + activities + ')</span><span>' + formatPrice(activitiesCost * travelers) + '</span></div>';
      }
    }

    function formatPrice(amount) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency, maximumFractionDigits: 0 }).format(amount * rates[currentCurrency]);
    }

    currencyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currencyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCurrency = btn.dataset.currency;
        calculateTotal();
      });
    });

    inputs.forEach(input => {
      input.addEventListener('change', calculateTotal);
      input.addEventListener('input', calculateTotal);
    });

    calculateTotal();
  }

  /* ---------- 3. PHOTO GALLERY LIGHTBOX ---------- */
  const galleries = document.querySelectorAll('.photo-gallery');
  if (galleries.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', I18N.t('gallery.lightbox'));
    lightbox.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="' + esc(I18N.t('gallery.close')) + '">&times;</button>' +
      '<button type="button" class="lightbox-nav lightbox-prev" aria-label="' + esc(I18N.t('gallery.prev')) + '">&#8249;</button>' +
      '<figure class="lightbox-figure"><img src="" alt=""><figcaption class="lightbox-caption"></figcaption></figure>' +
      '<button type="button" class="lightbox-nav lightbox-next" aria-label="' + esc(I18N.t('gallery.next')) + '">&#8250;</button>';
    document.body.appendChild(lightbox);

    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    let currentImages = [];
    let currentAlts = [];
    let currentIndex = 0;
    let lastFocused = null;

    function show() {
      lbImg.src = currentImages[currentIndex];
      lbImg.alt = currentAlts[currentIndex];
      lbCaption.textContent = currentAlts[currentIndex];
    }

    function openLightbox(idx, items) {
      currentImages = Array.prototype.map.call(items, i => i.querySelector('img').src);
      currentAlts = Array.prototype.map.call(items, i => i.querySelector('img').alt);
      currentIndex = idx;
      lastFocused = document.activeElement;
      show();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
      show();
    }

    galleries.forEach(gallery => {
      const items = gallery.querySelectorAll('.gallery-item');
      items.forEach((item, idx) => {
        const img = item.querySelector('img');
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-label', img ? img.alt : '');
        item.addEventListener('click', () => openLightbox(idx, items));
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(idx, items); }
        });
      });
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    // Keep Tab inside the dialog while it is open.
    lightbox.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const controls = lightbox.querySelectorAll('button');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  /* ---------- 4. BEFORE/AFTER SLIDER ---------- */
  const sliders = document.querySelectorAll('.before-after-slider');
  sliders.forEach(slider => {
    const handle = slider.querySelector('.slider-handle');
    const afterImg = slider.querySelector('.after-img');
    let isDragging = false;
    let percent = 50;

    handle.setAttribute('role', 'slider');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('aria-orientation', 'horizontal');
    handle.setAttribute('aria-valuemin', '0');
    handle.setAttribute('aria-valuemax', '100');
    handle.setAttribute('aria-label', I18N.t('dest.transform.slider'));

    function setPercent(value) {
      percent = Math.max(0, Math.min(100, value));
      handle.style.left = percent + '%';
      afterImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
      handle.setAttribute('aria-valuenow', Math.round(percent));
      handle.setAttribute('aria-valuetext', Math.round(percent) + '%');
    }

    function updateSlider(x) {
      const rect = slider.getBoundingClientRect();
      setPercent(((x - rect.left) / rect.width) * 100);
    }

    handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setPercent(percent + step); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setPercent(percent - step); e.preventDefault(); }
      else if (e.key === 'Home') { setPercent(0); e.preventDefault(); }
      else if (e.key === 'End') { setPercent(100); e.preventDefault(); }
    });

    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });

    document.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    });

    slider.addEventListener('touchmove', (e) => {
      if (isDragging) {
        e.preventDefault();
        updateSlider(e.touches[0].clientX);
      }
    });

    slider.addEventListener('touchend', () => {
      isDragging = false;
    });

    setPercent(50);
  });

  /* ---------- 5. WHATSAPP FLOATING BUTTON ---------- */
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    const phoneNumber = whatsappBtn.dataset.phone || '212600000000';
    const message = encodeURIComponent('Hello! I\'m interested in your Morocco tours.');
    whatsappBtn.addEventListener('click', () => {
      window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');
    });
  }

  // Auto-inject WhatsApp button if not present in page
  if (!document.querySelector('.whatsapp-float') && !document.querySelector('.concierge-fab .whatsapp-badge')) {
    const waBtn = document.createElement('button');
    waBtn.className = 'whatsapp-float';
    waBtn.type = 'button';
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.dataset.phone = '212600000000';
    waBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.38-1.564l-.386-.232-3.264 1.094 1.094-3.264-.232-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>';
    document.body.appendChild(waBtn);
    waBtn.addEventListener('click', () => {
      const phone = waBtn.dataset.phone;
      const msg = encodeURIComponent('Hello! I\'m interested in your Morocco tours.');
      window.open('https://wa.me/' + phone + '?text=' + msg, '_blank');
    });
  }

  /* ---------- 6. NEWSLETTER FORM ---------- */
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]').value;
      if (!email) return;

      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = '...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = tr({ en: 'Subscribed!', fr: 'Inscrit!', es: '¡Suscrito!', ar: 'مشترك!' });
        btn.classList.add('is-success');
        form.querySelector('input').value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.classList.remove('is-success');
          btn.disabled = false;
        }, 2000);
      }, 800);
    });
  });

  /* ---------- 7. PACKING LIST GENERATOR ---------- */
  const packingGenerator = document.querySelector('.packing-generator');
  if (packingGenerator) {
    const options = packingGenerator.querySelectorAll('.packing-option input[type="checkbox"]');
    const output = packingGenerator.querySelector('.packing-list-output');

    // Slugs only — the copy itself lives in page-translations.js under pack.*
    const packingItems = {
      desert: ['clothing', 'hat', 'sunglasses', 'sunscreen', 'sandals', 'scarf', 'water', 'camera'],
      city: ['clothing', 'shoes', 'bag', 'modest', 'umbrella', 'charger', 'phrasebook', 'daypack'],
      mountains: ['layers', 'boots', 'fleece', 'rain', 'thermal', 'poles', 'kit', 'snacks'],
      beach: ['swimwear', 'towel', 'flipflops', 'waterShoes', 'coverup', 'pouch', 'aloe', 'bag'],
      luxury: ['evening', 'jewelry', 'sunglasses', 'leather', 'cocktail', 'shoes', 'scarf', 'clutch']
    };

    const essentials = ['passport', 'insurance', 'visa', 'flights', 'hotels', 'emergency', 'cash', 'cards', 'copies', 'firstaid', 'meds', 'sanitizer', 'wipes', 'adapter', 'bag'];

    function updatePackingList() {
      const selected = Array.from(options).filter(o => o.checked).map(o => o.name);
      let items = essentials.map(k => I18N.t('pack.essential.' + k));

      selected.forEach(category => {
        if (packingItems[category]) {
          items = items.concat(packingItems[category].map(k => I18N.t('pack.' + category + '.' + k)));
        }
      });

      if (output) {
        output.innerHTML = '<h4>' + esc(I18N.t('pack.title')) + '</h4><ul>' +
          items.map(item => '<li>' + esc(item) + '</li>').join('') + '</ul>';
      }
    }

    options.forEach(option => {
      option.addEventListener('change', updatePackingList);
    });

    updatePackingList();
  }

  /* ---------- 8. ITINERARY SHARE/EXPORT ---------- */
  const shareBtn = document.querySelector('.share-itinerary');
  const exportBtn = document.querySelector('.export-pdf');

  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      const title = document.title;
      
      if (navigator.share) {
        try {
          await navigator.share({ title: title, url: url });
        } catch (err) {
          copyToClipboard(url);
        }
      } else {
        copyToClipboard(url);
      }
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const collected = collectDays();
      if (collected.days.length === 0) {
        showToast(tr({
          en: 'Generate an itinerary first, then export it.',
          fr: 'Générez d\'abord un itinéraire, puis exportez-le.',
          es: 'Genera primero un itinerario y luego expórtalo.',
          ar: 'أنشئ برنامجك أولاً ثم صدّره.'
        }));
        return;
      }

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        showToast(tr({
          en: 'Allow pop-ups to export your itinerary.',
          fr: 'Autorisez les pop-ups pour exporter votre itinéraire.',
          es: 'Permite las ventanas emergentes para exportar tu itinerario.',
          ar: 'اسمح بالنوافذ المنبثقة لتصدير رحلتك.'
        }));
        return;
      }

      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary').trim() || '#D4653B';
      const heading = tr({
        en: 'Your Morocco Itinerary',
        fr: 'Votre itinéraire du Maroc',
        es: 'Tu itinerario por Marruecos',
        ar: 'برنامج رحلتك في المغرب'
      });

      const body = collected.days.map(function (d) {
        return '<article class="day">' +
          '<h3>' + d.label + '</h3>' +
          (d.place ? '<p class="place">' + d.place + '</p>' : '') +
          (d.desc ? '<p class="desc">' + d.desc + '</p>' : '') +
          '</article>';
      }).join('');

      printWindow.document.write(
        '<!DOCTYPE html><html lang="' + document.documentElement.lang + '" dir="' +
        (document.documentElement.dir || 'ltr') + '"><head><meta charset="utf-8"><title>' +
        esc(heading) + '</title><style>' +
        'body{font-family:Georgia,"Times New Roman",serif;padding:48px;max-width:800px;margin:0 auto;color:#1C1917;background:#fff;}' +
        '.brand{font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:' + accent + ';margin:0 0 8px;}' +
        'h1{font-size:28px;font-weight:400;color:' + accent + ';border-bottom:2px solid ' + accent + ';padding-bottom:12px;margin:0 0 32px;}' +
        '.day{break-inside:avoid;margin:0 0 24px;padding:20px 24px;background:#faf8f5;border-inline-start:4px solid ' + accent + ';}' +
        '.day h3{margin:0 0 6px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:#78716c;font-weight:400;}' +
        '.place{margin:0 0 8px;font-size:20px;}' +
        '.desc{margin:0;font-size:15px;line-height:1.6;color:#44403c;}' +
        '.summary{margin:0 0 28px;font-size:14px;color:#57534e;}' +
        '@media print{body{padding:0;}.day{background:#fff;border:1px solid #e7e5e4;border-inline-start:4px solid ' + accent + ';}}' +
        '</style></head><body>' +
        '<p class="brand">Adrar Voyages</p><h1>' + esc(heading) + '</h1>' +
        (collected.summary ? '<p class="summary">' + collected.summary + '</p>' : '') + body +
        '</body></html>'
      );
      printWindow.document.close();
      setTimeout(() => { try { printWindow.focus(); printWindow.print(); } catch (e) {} }, 400);
    });
  }

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // The two wizard generations render results differently: the rebuilt page
  // writes .tb-result-day blocks into #tbTimeline, the legacy overlay gets a
  // .journey-result list from AdrarJourney().
  function collectDays() {
    const tbDays = document.querySelectorAll('.tb-result-day');
    if (tbDays.length) {
      return {
        summary: '',
        days: Array.prototype.map.call(tbDays, function (day) {
          const text = function (sel) {
            const el = day.querySelector(sel);
            return el ? esc(el.textContent.trim()) : '';
          };
          return {
            label: text('.tb-result-day-label'),
            place: text('.tb-result-day-place'),
            desc: text('.tb-result-day-desc')
          };
        })
      };
    }

    const result = document.querySelector('.journey-result');
    if (!result) return { summary: '', days: [] };

    const dayWord = tr({ en: 'Day', fr: 'Jour', es: 'Día', ar: 'يوم' });
    const summaryEl = result.querySelector('p');
    const days = Array.prototype.map.call(result.querySelectorAll('li'), function (li) {
      const parts = li.textContent.split('·');
      const range = (parts[0] || '').trim();
      const place = parts.length > 1 ? parts.slice(1).join('·').trim() : '';
      return {
        label: esc(range ? dayWord + ' ' + range : ''),
        place: esc(place || range),
        desc: ''
      };
    });
    return { summary: summaryEl ? esc(summaryEl.textContent.trim()) : '', days: days };
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(tr({ en: 'Link copied!', fr: 'Lien copié!', es: '¡Enlace copiado!', ar: 'تم النسخ!' }));
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast(tr({ en: 'Link copied!', fr: 'Lien copié!', es: '¡Enlace copiado!', ar: 'تم النسخ!' }));
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('is-hidden');
      setTimeout(() => toast.remove(), 300);
    }, 2600);
  }

  /* ---------- 9. SAVE DRAFT / COMPARE / SURPRISE ME ---------- */
  // Two wizard generations ship side by side: the rebuilt page uses .tb-*-card
  // grids, fr/es/ar still render the legacy .step-panel wizard. Both store the
  // same data-value vocabulary, so saved drafts travel between them.
  // Cards label their text inconsistently (-tier holds the budget name, -days
  // the number, -label the unit), so each step names its own label element.
  var NEW_WIZARD_STEPS = [
    { key: 'interests', sel: '.tb-interest-card', multi: true, labelSel: '.tb-interest-card-label' },
    { key: 'style', sel: '.tb-style-card', labelSel: '.tb-style-card-label' },
    { key: 'duration', sel: '.tb-duration-card', labelSel: '.tb-duration-days', joinSel: '.tb-duration-label', joinWith: ' ' },
    { key: 'season', sel: '.tb-season-card', labelSel: '.tb-season-card-name', joinSel: '.tb-season-card-months', joinWith: ' · ' },
    { key: 'travelers', sel: '.tb-traveler-card', labelSel: '.tb-traveler-label' },
    { key: 'budget', sel: '.tb-budget-card', labelSel: '.tb-budget-tier' }
  ];
  var LEGACY_WIZARD_STEPS = [
    { key: 'interests', sel: '[data-panel="1"] .builder-option', multi: true, labelSel: 'span' },
    { key: 'style', sel: '[data-panel="2"] .builder-option', multi: true, labelSel: 'span' },
    { key: 'duration', sel: '[data-panel="3"] .duration-chip' },
    { key: 'season', sel: '[data-panel="4"] .duration-chip' },
    { key: 'travelers', sel: '[data-panel="5"] .number-option', labelSel: '.num-label' },
    { key: 'budget', sel: '[data-panel="6"] .budget-option', labelSel: '.budget-name' }
  ];
  var WIZARD_STEPS = document.querySelector('.tb-interest-card')
    ? NEW_WIZARD_STEPS
    : (document.querySelector('.step-panel') ? LEGACY_WIZARD_STEPS : []);
  var DRAFT_KEY = 'adrar-trip-drafts';
  var MAX_DRAFTS = 4;

  var STEP_LABELS = {
    interests: { en: 'Interests', fr: 'Centres d\'intérêt', es: 'Intereses', ar: 'الاهتمامات' },
    style: { en: 'Style', fr: 'Style', es: 'Estilo', ar: 'الأسلوب' },
    duration: { en: 'Duration', fr: 'Durée', es: 'Duración', ar: 'المدة' },
    season: { en: 'Season', fr: 'Saison', es: 'Temporada', ar: 'الموسم' },
    travelers: { en: 'Travelers', fr: 'Voyageurs', es: 'Viajeros', ar: 'المسافرون' },
    budget: { en: 'Budget', fr: 'Budget', es: 'Presupuesto', ar: 'الميزانية' }
  };

  function tr(map) { return (map && (map[lang] || map.en)) || ''; }

  function cardLabel(step, card) {
    var main = card.querySelector(step.labelSel);
    if (!main) return card.textContent.trim().replace(/\s+/g, ' ');
    var text = main.textContent.trim().replace(/\s+/g, ' ');
    if (step.joinSel) {
      var extra = card.querySelector(step.joinSel);
      if (extra) {
        var extraText = extra.textContent.trim().replace(/\s+/g, ' ');
        if (extraText) text += step.joinWith + extraText;
      }
    }
    return text;
  }

  function readWizard() {
    var state = {};
    WIZARD_STEPS.forEach(function (step) {
      var picked = [];
      document.querySelectorAll(step.sel + '.selected').forEach(function (card) {
        picked.push(card.dataset.value);
      });
      state[step.key] = step.multi ? picked : (picked[0] || null);
    });
    return state;
  }

  function isStepEmpty(state) {
    return WIZARD_STEPS.every(function (s) {
      var v = state[s.key];
      return !v || (Array.isArray(v) && v.length === 0);
    });
  }

  // Clicks only the cards whose selected state differs, so multi- and
  // single-select handlers both behave correctly.
  function applyWizard(state) {
    var applied = 0;
    WIZARD_STEPS.forEach(function (step) {
      var v = state[step.key];
      if (!v || (Array.isArray(v) && v.length === 0)) return;
      var wanted = Array.isArray(v) ? v : [v];
      document.querySelectorAll(step.sel).forEach(function (card) {
        var shouldBe = wanted.indexOf(card.dataset.value) !== -1;
        if (shouldBe !== card.classList.contains('selected')) {
          card.click();
          applied++;
        }
      });
    });
    return applied;
  }

  function wizardRows(state) {
    var rows = [];
    WIZARD_STEPS.forEach(function (step) {
      var v = state[step.key];
      var values = Array.isArray(v) ? v : (v ? [v] : []);
      var text = values.map(function (value) {
        var card = document.querySelector(step.sel + '[data-value="' + value + '"]');
        return card ? cardLabel(step, card) : value;
      }).join(', ');
      rows.push({ label: tr(STEP_LABELS[step.key]), value: text || '—' });
    });
    return rows;
  }

  function loadDrafts() {
    try {
      var raw = localStorage.getItem(DRAFT_KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) { return []; }
  }

  function persistDrafts(list) {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(list.slice(-MAX_DRAFTS)));
      return true;
    } catch (e) { return false; }
  }

  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const compareBtn = document.getElementById('compareBtn');
  const surpriseMeBtn = document.getElementById('surpriseMeBtn');

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => {
      var current = readWizard();
      if (isStepEmpty(current)) {
        showToast(tr({
          en: 'Pick at least one option first.',
          fr: 'Choisissez au moins une option.',
          es: 'Elige al menos una opción.',
          ar: 'اختر خيارًا واحدًا على الأقل أولاً.'
        }));
        return;
      }
      var list = loadDrafts();
      list.push({ savedAt: Date.now(), state: current });
      if (persistDrafts(list)) {
        showToast(tr({
          en: 'Journey saved — ' + list.length + ' saved',
          fr: 'Itinéraire enregistré — ' + list.length + ' enregistrés',
          es: 'Itinerario guardado — ' + list.length + ' guardados',
          ar: 'تم حفظ الرحلة — ' + list.length + ' محفوظة'
        }));
      } else {
        showToast(tr({
          en: 'Could not save draft',
          fr: 'Impossible de sauvegarder',
          es: 'No se pudo guardar',
          ar: 'تعذر الحفظ'
        }));
      }
    });
  }

  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      var drafts = loadDrafts();
      var panel = document.querySelector('.tb-compare-panel');
      if (!panel) {
        panel = document.createElement('div');
        panel.className = 'tb-compare-panel';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-live', 'polite');
        var host = compareBtn.closest('.container') || compareBtn.parentElement.parentElement;
        host.appendChild(panel);
      }
      if (drafts.length === 0) {
        panel.innerHTML = '<p class="tb-compare-empty">' + tr({
          en: 'No saved journeys yet. Build a trip and tap Save Journey.',
          fr: 'Aucun itinéraire enregistré. Créez un voyage et touchez Enregistrer.',
          es: 'Aún no hay itinerarios guardados. Crea un viaje y pulsa Guardar.',
          ar: 'لا توجد رحلات محفوظة. أنشئ رحلة ثم اضغط حفظ.'
        }) + '</p>';
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      var headings = {
        current: tr({ en: 'Current', fr: 'Actuel', es: 'Actual', ar: 'الحالي' }),
        saved: tr({ en: 'Saved', fr: 'Enregistré', es: 'Guardado', ar: 'محفوظ' }),
        load: tr({ en: 'Load', fr: 'Charger', es: 'Cargar', ar: 'تحميل' }),
        clear: tr({ en: 'Clear all', fr: 'Tout effacer', es: 'Borrar todo', ar: 'مسح الكل' }),
        today: tr({ en: 'today', fr: "aujourd'hui", es: 'hoy', ar: 'اليوم' })
      };

      var columns = drafts.map(function (draft, i) {
        var age = Math.floor((Date.now() - draft.savedAt) / 86400000);
        var when = age <= 0 ? headings.today : age + 'd';
        return {
          title: headings.saved + ' ' + (i + 1) + ' · ' + when,
          state: draft.state,
          index: i,
          isCurrent: false
        };
      });
      columns.push({ title: headings.current, state: readWizard(), index: -1, isCurrent: true });

      panel.innerHTML = columns.map(function (col) {
        return '<div class="tb-compare-card' + (col.isCurrent ? ' is-current' : '') + '">' +
          '<h3 class="tb-compare-title">' + col.title + '</h3>' +
          '<dl class="tb-compare-list">' +
          wizardRows(col.state).map(function (row) {
            return '<div><dt>' + row.label + '</dt><dd>' + row.value + '</dd></div>';
          }).join('') +
          '</dl>' +
          (col.isCurrent ? '' : '<button type="button" class="tb-compare-load" data-load="' + col.index + '">' + headings.load + '</button>') +
          '</div>';
      }).join('') +
      '<button type="button" class="tb-compare-clear">' + headings.clear + '</button>';

      panel.querySelectorAll('[data-load]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var draft = drafts[Number(btn.dataset.load)];
          if (draft) applyWizard(draft.state);
          panel.querySelectorAll('.tb-compare-card').forEach(function (c) { c.classList.remove('is-current'); });
          panel.querySelector('.tb-compare-card:last-of-type').classList.add('is-current');
          showToast(tr({
            en: 'Journey loaded into the builder.',
            fr: 'Itinéraire chargé dans le constructeur.',
            es: 'Itinerario cargado en el creador.',
            ar: 'تم تحميل الرحلة في منشئ الرحلة.'
          }));
        });
      });
      panel.querySelector('.tb-compare-clear').addEventListener('click', function () {
        try { localStorage.removeItem(DRAFT_KEY); } catch (e) {}
        panel.remove();
        compareBtn.click();
      });
      panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (surpriseMeBtn) {
    var surprisePresets = [
      { state: { interests: ['history', 'art'], style: 'romantic', duration: '6-8', season: 'spring', travelers: 'couple', budget: 'comfort' }, label: { en: 'Romantic Imperial Cities', fr: 'Villes impériales romantiques', es: 'Ciudades imperiales románticas', ar: 'المدن الإمبراطورية الرومانسية' } },
      { state: { interests: ['desert', 'adventure'], style: 'authentic', duration: '9-12', season: 'autumn', travelers: 'small-group', budget: 'essential' }, label: { en: 'Atlas & Sahara Explorer', fr: 'Explorateur Atlas & Sahara', es: 'Explorador Atlas y Sahara', ar: 'مستكشف الأطلس والصحراء' } },
      { state: { interests: ['food', 'wellness'], style: 'luxury', duration: '3-5', season: 'winter', travelers: 'couple', budget: 'ultra-luxury' }, label: { en: 'Luxury Culinary Escape', fr: 'Escapade culinaire de luxe', es: 'Escapada culinaria de lujo', ar: 'هروب الطهي الفاخر' } },
      { state: { interests: ['desert', 'history', 'art'], style: 'photo', duration: '13-18', season: 'spring', travelers: 'small-group', budget: 'luxury' }, label: { en: 'Grand Morocco Photo Tour', fr: 'Tour photo du Grand Maroc', es: 'Tour fotográfico del Gran Marruecos', ar: 'جولة تصوير المغرب الكبير' } }
    ];
    surpriseMeBtn.addEventListener('click', () => {
      var preset = surprisePresets[Math.floor(Math.random() * surprisePresets.length)];
      applyWizard(preset.state);
      showToast(tr(preset.label));
      var wizard = document.querySelector('.tb-wizard, .trip-builder');
      if (wizard) wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

})();
