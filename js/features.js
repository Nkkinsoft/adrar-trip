/* ============================================
   ADRAR VOYAGES — Enhanced Features
   AI Trip Architect, Concierge Chat,
   Sustainability Gauge, Seasonal Offers
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     2. CONCIERGE CHAT WIDGET
     ========================================= */
  const conciergeFab = document.querySelector('.concierge-fab');
  if (conciergeFab && !conciergeFab.dataset.enhanced) {
    conciergeFab.dataset.enhanced = 'true';

    const chatWidget = document.createElement('div');
    chatWidget.className = 'concierge-widget';
    chatWidget.innerHTML = `
      <div class="concierge-widget-header">
        <div class="concierge-widget-avatar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        </div>
        <div>
          <h4>Adrar Concierge</h4>
          <p>Automated travel guide</p>
        </div>
        <button class="concierge-widget-close" aria-label="Close">&times;</button>
      </div>
      <div class="concierge-widget-body">
        <div class="concierge-welcome">
          <div class="concierge-welcome-avatar">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <path d="M20 2L36 14V30L20 38L4 30V14L20 2Z" stroke="var(--gold-500)" stroke-width="1.5" fill="none" opacity="0.3"/>
              <path d="M20 8L30 16V28L20 34L10 28V16L20 8Z" stroke="var(--gold-500)" stroke-width="1.2" fill="none" opacity="0.6"/>
              <circle cx="20" cy="21" r="3" fill="var(--gold-500)"/>
            </svg>
          </div>
          <p class="concierge-welcome-title">Hello! 👋</p>
          <p class="concierge-welcome-text">Welcome to Adrar Voyages. How can we help you plan your Moroccan journey?</p>
        </div>
        <div class="concierge-messages"></div>
      </div>
      <div class="concierge-quick-replies">
        <button class="quick-reply" data-reply="pricing">💰 Pricing info</button>
        <button class="quick-reply" data-reply="custom">✨ Custom trip</button>
        <button class="quick-reply" data-reply="best-time">🌤 Best time to visit</button>
        <button class="quick-reply" data-reply="human">👤 Talk to human</button>
      </div>
      <div class="concierge-widget-input">
        <input type="text" placeholder="Type a message...">
        <button class="concierge-widget-send" aria-label="Send">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(chatWidget);

    const widgetMessages = chatWidget.querySelector('.concierge-messages');
    const widgetInput = chatWidget.querySelector('input');
    const widgetSend = chatWidget.querySelector('.concierge-widget-send');
    const widgetClose = chatWidget.querySelector('.concierge-widget-close');
    const quickReplies = chatWidget.querySelector('.concierge-quick-replies');

    const autoResponses = {
      pricing: "Our journeys start from €800/person for Essential trips and go up to €5,000+ for Ultra-Luxury experiences. Most guests spend around €1,500-3,000 for a premium 7-10 day journey. Would you like a detailed quote?",
      custom: "We'd love to craft a bespoke itinerary for you! Our AI Trip Architect can help you design your perfect journey, or I can connect you with a human travel expert. Which would you prefer?",
      'best-time': "Morocco is wonderful year-round! Spring (March-May) and Autumn (September-November) are ideal for most regions. Summer is perfect for the coast and mountains. Winter offers magical Sahara days with cool, clear skies. What season are you considering?",
      human: "To contact the travel team, visit the Contact page or email hello@adrarvoyages.ma. This automated chat does not send your messages."
    };

    function addWidgetMessage(text, type) {
      const msg = document.createElement('div');
      msg.className = `widget-msg widget-msg-${type}`;
      const bubble = document.createElement('div');
      bubble.className = 'widget-msg-bubble';
      bubble.textContent = text;
      msg.appendChild(bubble);
      widgetMessages.appendChild(msg);
      chatWidget.querySelector('.concierge-widget-body').scrollTop =
        chatWidget.querySelector('.concierge-widget-body').scrollHeight;
    }

    conciergeFab.addEventListener('click', (e) => {
      e.preventDefault();
      chatWidget.classList.toggle('open');
      conciergeFab.classList.toggle('active');
    });

    widgetClose.addEventListener('click', () => {
      chatWidget.classList.remove('open');
      conciergeFab.classList.remove('active');
    });

    quickReplies.querySelectorAll('.quick-reply').forEach(btn => {
      btn.addEventListener('click', () => {
        const reply = btn.dataset.reply;
        addWidgetMessage(btn.textContent, 'user');
        setTimeout(() => {
          addWidgetMessage(autoResponses[reply] || "Let me check that for you!", 'bot');
        }, 800);
      });
    });

    function sendWidgetMessage() {
      const text = widgetInput.value.trim();
      if (!text) return;
      addWidgetMessage(text, 'user');
      widgetInput.value = '';

      setTimeout(() => {
        const lower = text.toLowerCase();
        let response;
        if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
          response = autoResponses.pricing;
        } else if (lower.includes('custom') || lower.includes('plan') || lower.includes('itinerary')) {
          response = autoResponses.custom;
        } else if (lower.includes('when') || lower.includes('season') || lower.includes('weather') || lower.includes('time')) {
          response = autoResponses['best-time'];
        } else if (lower.includes('human') || lower.includes('person') || lower.includes('agent') || lower.includes('whatsapp')) {
          response = autoResponses.human;
        } else {
          response = "This is an automated guide and messages are not sent to our team. For a personal response, use the contact page or email hello@adrarvoyages.ma.";
        }
        addWidgetMessage(response, 'bot');
      }, 1000);
    }

    widgetSend.addEventListener('click', sendWidgetMessage);
    widgetInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendWidgetMessage();
    });
  }


  /* =========================================
     3. SUSTAINABILITY SCORE GAUGE
     ========================================= */
  const gaugeEl = document.querySelector('.sustainability-gauge');
  if (gaugeEl) {
    const score = gaugeEl.dataset.score || 'A+';
    const scoreMap = { 'A+': 98, 'A': 90, 'B+': 80, 'B': 70, 'C': 55 };
    const targetPercent = scoreMap[score] || 90;

    const gaugeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = gaugeEl.querySelector('.gauge-fill');
          if (fill) {
            fill.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
            const circumference = 2 * Math.PI * 54;
            const offset = circumference - (targetPercent / 100) * circumference;
            fill.style.strokeDashoffset = offset;
          }
          const label = gaugeEl.querySelector('.gauge-score');
          if (label) {
            let current = 0;
            const duration = 2000;
            const start = performance.now();
            const animate = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              current = Math.floor(eased * targetPercent);
              label.textContent = score;
              const sub = gaugeEl.querySelector('.gauge-percent');
              if (sub) sub.textContent = `${current}%`;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
          gaugeObserver.unobserve(gaugeEl);
        }
      });
    }, { threshold: 0.5 });

    gaugeObserver.observe(gaugeEl);
  }


  /* =========================================
     4. SEASONAL OFFERS SYSTEM
     ========================================= */
  const seasonalSection = document.querySelector('[data-seasonal-offers]');
  if (seasonalSection) {
    const month = new Date().getMonth();
    let season, seasonTitle, seasonDesc, seasonImage;

    if (month >= 2 && month <= 4) {
      season = 'spring';
      seasonTitle = 'Spring Blossom Collection';
      seasonDesc = 'Discover Morocco\'s valleys in full bloom — rose festivals, cascading waterfalls, and mild Atlas treks.';
      seasonImage = 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=800&q=80';
    } else if (month >= 5 && month <= 7) {
      season = 'summer';
      seasonTitle = 'Atlantic Coast Escape';
      seasonDesc = 'Beat the heat with coastal breezes — Essaouira\'s waves, Agadir\'s shores, and hidden beach riads.';
      seasonImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80';
    } else if (month >= 8 && month <= 10) {
      season = 'autumn';
      seasonTitle = 'Golden Sahara Season';
      seasonDesc = 'The desert awakens — perfect stargazing, warm days, cool nights, and the famous Sahara sunsets.';
      seasonImage = 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80';
    } else {
      season = 'winter';
      seasonTitle = 'Winter Sahara Stargazing';
      seasonDesc = 'Crystal-clear skies and cozy luxury camps — the ultimate winter escape under a million stars.';
      seasonImage = 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80';
    }

    seasonalSection.dataset.activeSeason = season;
    const titleEl = seasonalSection.querySelector('.seasonal-title');
    const descEl = seasonalSection.querySelector('.seasonal-desc');
    if (titleEl) titleEl.textContent = seasonTitle;
    if (descEl) descEl.textContent = seasonDesc;
  }


  /* =========================================
     5. 360° PREVIEW TRIGGER
     ========================================= */
  document.querySelectorAll('[data-360-preview]').forEach(trigger => {
    trigger.setAttribute('role', 'link');
    trigger.setAttribute('tabindex', '0');
    trigger.addEventListener('keydown', event => { if (event.key === 'Enter') trigger.click(); });
    trigger.addEventListener('click', event => {
      if (!event.target.closest('a, button')) location.assign('/' + document.documentElement.lang + '/trip-builder/');
    });
  });

  /* =========================================
     6. GROUP PLANNING SHARED TRIP
     ========================================= */
  const groupPlanBtn = document.querySelector('[data-group-plan]');
  if (groupPlanBtn) {
    groupPlanBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = window.location.origin + '/' + document.documentElement.lang + '/trip-builder/';
      if (navigator.share) {
        navigator.share({
          title: 'Plan our Morocco trip together!',
          text: 'I\'m planning a trip to Morocco with Adrar Voyages. Join me!',
          url: shareUrl
        });
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
          const toast = document.createElement('div');
          toast.className = 'share-toast';
          toast.textContent = 'Link copied! Share it with your travel companions.';
          document.body.appendChild(toast);
          requestAnimationFrame(() => toast.classList.add('visible'));
          setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 300);
          }, 3000);
        });
      }
    });
  }



});
