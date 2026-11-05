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
    lightbox.innerHTML = 
      '<div class="lightbox-close" aria-label="Close">&times;</div>' +
      '<div class="lightbox-prev lightbox-nav" aria-label="Previous">&#8249;</div>' +
      '<img src="" alt="Gallery image">' +
      '<div class="lightbox-next lightbox-nav" aria-label="Next">&#8250;</div>';
    document.body.appendChild(lightbox);

    let currentImages = [];
    let currentIndex = 0;

    galleries.forEach(gallery => {
      const items = gallery.querySelectorAll('.gallery-item');
      items.forEach((item, idx) => {
        item.addEventListener('click', () => {
          currentImages = Array.from(items).map(i => i.querySelector('img').src);
          currentIndex = idx;
          openLightbox();
        });
      });
    });

    function openLightbox() {
      lightbox.classList.add('open');
      lightbox.querySelector('img').src = currentImages[currentIndex];
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
      lightbox.querySelector('img').src = currentImages[currentIndex];
    }

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

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

    function updateSlider(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(0, Math.min(100, percent));
      handle.style.left = percent + '%';
      afterImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
    }

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
        btn.textContent = { en: 'Subscribed!', fr: 'Inscrit!', es: '¡Suscrito!', ar: 'مشترك!' }[lang] || 'Subscribed!';
        btn.style.background = '#22c55e';
        form.querySelector('input').value = '';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
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

    const packingItems = {
      desert: ['Lightweight breathable clothing', 'Sun hat or turban', 'Sunglasses (UV protection)', 'Sunscreen SPF 50+', 'Closed-toe sandals', 'Scarf for sand/dust', 'Reusable water bottle', 'Camera with dust cover'],
      city: ['Smart casual clothing', 'Comfortable walking shoes', 'Crossbody bag (secure)', 'Modest clothing for mosques', 'Umbrella (seasonal)', 'Portable phone charger', 'Phrasebook or translation app', 'Small daypack'],
      mountains: ['Layered clothing system', 'Hiking boots (broken in)', 'Warm fleece or jacket', 'Rain jacket (waterproof)', 'Thermal base layers', 'Trekking poles (optional)', 'First aid kit', 'High-energy snacks'],
      beach: ['Swimwear', 'Beach towel (quick-dry)', 'Flip flops', 'Water shoes', 'Beach cover-up', 'Waterproof phone pouch', 'Aloe vera gel', 'Beach bag (mesh)'],
      luxury: ['Evening wear (smart)', 'Fine jewelry (tasteful)', 'Designer sunglasses', 'Leather accessories', 'Cocktail attire', 'Polished shoes', 'Elegant scarf or tie', 'Small clutch bag']
    };

    const essentials = ['Passport (6+ months validity)', 'Travel insurance documents', 'Visa (if required)', 'Flight confirmations', 'Hotel reservations', 'Emergency contact list', 'Moroccan Dirham (cash)', 'Credit/debit cards', 'Copies of all documents', 'Basic first aid supplies', 'Any prescription medications', 'Hand sanitizer', 'Tissues/wet wipes', 'Universal power adapter', 'Reusable shopping bag'];

    function updatePackingList() {
      const selected = Array.from(options).filter(o => o.checked).map(o => o.name);
      let items = [...essentials];
      
      selected.forEach(category => {
        if (packingItems[category]) {
          items = items.concat(packingItems[category]);
        }
      });

      if (output) {
        const title = { en: 'Your Packing List', fr: 'Votre liste de bagages', es: 'Tu lista de equipaje', ar: 'قائمة أمتعتك' }[lang] || 'Your Packing List';
        output.innerHTML = '<h4>' + title + '</h4><ul>' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
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
      const printContent = document.querySelector('.tb-result-timeline') || document.querySelector('main');
      if (!printContent) return;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(
        '<!DOCTYPE html><html><head><title>My Morocco Itinerary</title>' +
        '<style>body{font-family:Georgia,serif;padding:40px;max-width:800px;margin:0 auto;}' +
        'h1{color:#c46a35;border-bottom:2px solid #c46a35;padding-bottom:10px;}' +
        '.day{margin:30px 0;padding:20px;background:#f9f9f9;border-left:4px solid #c46a35;}' +
        '.day h3{margin:0 0 10px;color:#1a1a1f;}' +
        '@media print{body{padding:20px;}}</style></head><body>'
      );
      printWindow.document.write('<h1>Your Morocco Itinerary</h1>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 500);
    });
  }

  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast({ en: 'Link copied!', fr: 'Lien copié!', es: '¡Enlace copiado!', ar: 'تم النسخ!' }[lang] || 'Link copied!');
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast({ en: 'Link copied!', fr: 'Lien copié!', es: '¡Enlace copiado!', ar: 'تم النسخ!' }[lang] || 'Link copied!');
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#1a1a1f;color:#fff;padding:12px 24px;border-radius:8px;z-index:9999;animation:fadeInUp 0.3s;';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }

  /* ---------- 9. SAVE DRAFT / COMPARE / SURPRISE ME ---------- */
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const compareBtn = document.getElementById('compareBtn');
  const surpriseMeBtn = document.getElementById('surpriseMeBtn');

  if (saveDraftBtn) {
    saveDraftBtn.addEventListener('click', () => {
      const wizardState = {};
      document.querySelectorAll('.tb-wizard-step').forEach(function(step, i) {
        var active = step.querySelector('.tb-option.active');
        if (active) wizardState['step' + i] = active.dataset.value || active.textContent.trim();
      });
      var travelersInput = document.getElementById('tb-travelers');
      if (travelersInput) wizardState.travelers = travelersInput.value;
      var dateInputs = document.querySelectorAll('.tb-date-input');
      dateInputs.forEach(function(d, i) { wizardState['date' + i] = d.value; });
      try {
        localStorage.setItem('adrar-trip-draft', JSON.stringify(wizardState));
        showToast({ en: 'Draft saved!', fr: 'Brouillon enregistré!', es: '¡Borrador guardado!', ar: 'تم حفظ المسودة!' }[lang] || 'Draft saved!');
      } catch(e) {
        showToast({ en: 'Could not save draft', fr: 'Impossible de sauvegarder', es: 'No se pudo guardar', ar: 'تعذر الحفظ' }[lang] || 'Could not save draft');
      }
    });

    // Restore draft on page load
    try {
      var savedDraft = localStorage.getItem('adrar-trip-draft');
      if (savedDraft) {
        var draft = JSON.parse(savedDraft);
        document.querySelectorAll('.tb-wizard-step').forEach(function(step, i) {
          var key = 'step' + i;
          if (draft[key]) {
            var options = step.querySelectorAll('.tb-option');
            options.forEach(function(opt) {
              if ((opt.dataset.value || opt.textContent.trim()) === draft[key]) {
                opt.click();
              }
            });
          }
        });
      }
    } catch(e) {}
  }

  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      var saved = [];
      try {
        var d = localStorage.getItem('adrar-trip-draft');
        if (d) saved = [JSON.parse(d)];
      } catch(e) {}
      if (saved.length === 0) {
        showToast({ en: 'No saved drafts to compare. Save one first!', fr: 'Aucun brouillon à comparer.', es: 'No hay borradores para comparar.', ar: 'لا توجد مسودات للمقارنة.' }[lang] || 'No saved drafts to compare.');
        return;
      }
      var current = {};
      document.querySelectorAll('.tb-wizard-step').forEach(function(step, i) {
        var active = step.querySelector('.tb-option.active');
        if (active) current['step' + i] = active.dataset.value || active.textContent.trim();
      });
      var msg = { en: 'Current: ', fr: 'Actuel: ', es: 'Actual: ', ar: 'الحالي: ' }[lang] || 'Current: ';
      msg += JSON.stringify(current, null, 0);
      showToast(msg);
    });
  }

  if (surpriseMeBtn) {
    var surprisePresets = [
      { steps: ['cultural', 'mid-range', 'couple', 'spring', '7', 'mixed'], label: { en: 'Romantic Imperial Cities', fr: 'Villes impériales romantiques', es: 'Ciudades imperiales románticas', ar: 'المدن الإمبراطورية الرومانسية' } },
      { steps: ['adventure', 'budget', 'solo', 'autumn', '10', 'adventure'], label: { en: 'Atlas & Sahara Explorer', fr: 'Explorateur Atlas & Sahara', es: 'Explorador Atlas y Sahara', ar: 'مستكشف الأطلس والصحراء' } },
      { steps: ['culinary', 'luxury', 'couple', 'winter', '5', 'cultural'], label: { en: 'Luxury Culinary Escape', fr: 'Escapade culinaire de luxe', es: 'Escapada culinaria de lujo', ar: 'هروب الطهي الفاخر' } },
      { steps: ['photography', 'mid-range', 'family', 'spring', '14', 'mixed'], label: { en: 'Grand Morocco Photo Tour', fr: 'Tour photo du Grand Maroc', es: 'Tour fotográfico del Gran Marruecos', ar: 'جولة تصوير المغرب الكبير' } }
    ];
    surpriseMeBtn.addEventListener('click', () => {
      var preset = surprisePresets[Math.floor(Math.random() * surprisePresets.length)];
      document.querySelectorAll('.tb-wizard-step').forEach(function(step, i) {
        if (preset.steps[i]) {
          var options = step.querySelectorAll('.tb-option');
          options.forEach(function(opt) {
            var val = (opt.dataset.value || opt.textContent.trim()).toLowerCase();
            if (val.indexOf(preset.steps[i].toLowerCase()) !== -1) {
              opt.click();
            }
          });
        }
      });
      var label = preset.label[lang] || preset.label.en;
      showToast({ en: 'Surprise! ', fr: 'Surprise! ', es: '¡Sorpresa! ', ar: 'مفاجأة! ' }[lang] + label);
      var wizard = document.querySelector('.tb-wizard');
      if (wizard) wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

})();
