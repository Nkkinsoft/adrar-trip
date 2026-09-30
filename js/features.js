/* ============================================
   ADRAR VOYAGES — Enhanced Features
   AI Trip Architect, Concierge Chat,
   Sustainability Gauge, Seasonal Offers
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. AI TRIP ARCHITECT — Conversational UI
     ========================================= */
  const tripBuilder = document.querySelector('.trip-builder-steps');
  const generateBtn = document.querySelector('.builder-generate');

  if (tripBuilder && generateBtn) {
    const conversationalOverlay = document.createElement('div');
    conversationalOverlay.className = 'ai-architect-overlay';
    conversationalOverlay.innerHTML = `
      <div class="ai-architect-panel">
        <div class="ai-architect-header">
          <div class="ai-architect-avatar">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <h4 class="ai-architect-name">Adrar AI Architect</h4>
            <p class="ai-architect-status">Crafting your perfect journey</p>
          </div>
          <button class="ai-architect-close" aria-label="Close">&times;</button>
        </div>
        <div class="ai-architect-messages"></div>
        <div class="ai-architect-input-area">
          <input type="text" class="ai-architect-input" placeholder="Tell me about your dream Morocco trip...">
          <button class="ai-architect-send" aria-label="Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(conversationalOverlay);

    const messagesEl = conversationalOverlay.querySelector('.ai-architect-messages');
    const inputEl = conversationalOverlay.querySelector('.ai-architect-input');
    const sendBtn = conversationalOverlay.querySelector('.ai-architect-send');
    const closeBtn = conversationalOverlay.querySelector('.ai-architect-close');

    const conversationFlow = [
      {
        bot: "Welcome! I'm your Adrar AI Travel Architect. I'll craft a personalized Morocco itinerary based on your preferences. What kind of experience are you dreaming of?",
        suggestions: ['Desert adventure', 'Cultural immersion', 'Romantic escape', 'Family fun', 'Wellness retreat']
      },
      {
        bot: "Wonderful choice! How many days do you have for your Moroccan journey?",
        suggestions: ['5-7 days', '8-10 days', '11-14 days', '2+ weeks']
      },
      {
        bot: "And who will be traveling?",
        suggestions: ['Just me', 'Couple', 'Family with kids', 'Group of friends']
      },
      {
        bot: "What's your preferred travel style?",
        suggestions: ['Luxury & comfort', 'Authentic & local', 'Adventure & active', 'Mix of everything']
      },
      {
        bot: "Excellent! Let me craft your perfect itinerary...",
        suggestions: [],
        isProcessing: true
      }
    ];

    let currentStep = 0;
    let userAnswers = {};

    function addMessage(text, type, delay = 0) {
      return new Promise(resolve => {
        setTimeout(() => {
          const msg = document.createElement('div');
          msg.className = `ai-msg ai-msg-${type}`;
          msg.innerHTML = `<div class="ai-msg-bubble">${text}</div>`;
          messagesEl.appendChild(msg);
          messagesEl.parentElement.scrollTop = messagesEl.parentElement.scrollHeight;
          resolve();
        }, delay);
      });
    }

    function addSuggestions(suggestions) {
      const existing = conversationalOverlay.querySelector('.ai-suggestions');
      if (existing) existing.remove();

      if (!suggestions.length) return;

      const container = document.createElement('div');
      container.className = 'ai-suggestions';
      suggestions.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'ai-suggestion-chip';
        btn.textContent = text;
        btn.addEventListener('click', () => handleUserInput(text));
        container.appendChild(btn);
      });
      messagesEl.parentElement.appendChild(container);
      messagesEl.parentElement.scrollTop = messagesEl.parentElement.scrollHeight;
    }

    function showTypingIndicator() {
      const typing = document.createElement('div');
      typing.className = 'ai-msg ai-msg-bot ai-typing';
      typing.innerHTML = `<div class="ai-msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
      messagesEl.appendChild(typing);
      messagesEl.parentElement.scrollTop = messagesEl.parentElement.scrollHeight;
      return typing;
    }

    async function handleUserInput(text) {
      const suggestions = conversationalOverlay.querySelector('.ai-suggestions');
      if (suggestions) suggestions.remove();

      inputEl.value = '';
      await addMessage(text, 'user');

      userAnswers[`step${currentStep}`] = text;
      currentStep++;

      if (currentStep < conversationFlow.length) {
        const step = conversationFlow[currentStep];
        const typing = showTypingIndicator();

        setTimeout(async () => {
          typing.remove();
          await addMessage(step.bot, 'bot');

          if (step.isProcessing) {
            await showProcessing();
          } else {
            addSuggestions(step.suggestions);
          }
        }, 1200);
      }
    }

    async function showProcessing() {
      const steps = [
        'Analyzing your preferences...',
        'Selecting ideal destinations...',
        'Matching local experiences...',
        'Calculating optimal route...',
        'Your journey is ready!'
      ];

      for (let i = 0; i < steps.length; i++) {
        await addMessage(steps[i], 'bot-system', i === 0 ? 800 : 600);
      }

      setTimeout(() => {
        const result = document.createElement('div');
        result.className = 'ai-result-card';
        result.innerHTML = `
          <div class="ai-result-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
            <h4>Your Personalized Itinerary</h4>
          </div>
          <div class="ai-result-summary">
            <p><strong>Based on:</strong> ${Object.values(userAnswers).join(' → ')}</p>
            <p><strong>Duration:</strong> 10 days / 9 nights</p>
            <p><strong>Highlights:</strong> Marrakech → Atlas Mountains → Sahara Desert → Fes Medina</p>
            <p><strong>Style:</strong> Luxury cultural immersion with local guides</p>
          </div>
          <div class="ai-result-actions">
            <a href="#" class="btn btn-gold">View Full Itinerary</a>
            <button class="btn btn-outline ai-refine">Refine with Human Expert</button>
          </div>
        `;
        messagesEl.appendChild(result);
        messagesEl.parentElement.scrollTop = messagesEl.parentElement.scrollHeight;
      }, 1000);
    }

    generateBtn.addEventListener('click', () => {
      conversationalOverlay.classList.add('open');
      currentStep = 0;
      userAnswers = {};
      messagesEl.innerHTML = '';
      const existing = conversationalOverlay.querySelector('.ai-suggestions');
      if (existing) existing.remove();

      setTimeout(async () => {
        await addMessage(conversationFlow[0].bot, 'bot', 300);
        addSuggestions(conversationFlow[0].suggestions);
      }, 400);
    });

    closeBtn.addEventListener('click', () => {
      conversationalOverlay.classList.remove('open');
    });

    sendBtn.addEventListener('click', () => {
      if (inputEl.value.trim()) handleUserInput(inputEl.value.trim());
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && inputEl.value.trim()) {
        handleUserInput(inputEl.value.trim());
      }
    });
  }


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
          <p>Typically replies in minutes</p>
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
      human: "Absolutely! I'll connect you with one of our travel experts. You can also reach us directly on WhatsApp at +212 600-000000 or email at hello@adrarvoyages.com. A specialist will respond within 30 minutes during business hours."
    };

    function addWidgetMessage(text, type) {
      const msg = document.createElement('div');
      msg.className = `widget-msg widget-msg-${type}`;
      msg.innerHTML = `<div class="widget-msg-bubble">${text}</div>`;
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
          response = "Thank you for your message! Our travel team will get back to you shortly. For immediate assistance, tap 'Talk to human' or reach us on WhatsApp.";
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
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const previewUrl = trigger.dataset['360Preview'];
      const overlay = document.createElement('div');
      overlay.className = 'preview-360-overlay';
      overlay.innerHTML = `
        <div class="preview-360-container">
          <button class="preview-360-close" aria-label="Close">&times;</button>
          <div class="preview-360-content">
            <div class="preview-360-placeholder">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" stroke-width="1">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
              <h3>360° Immersive Preview</h3>
              <p>Drag to explore this destination in full 360°</p>
              <p class="preview-360-note">Connect your 360° media provider to activate this feature</p>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('open'));

      overlay.querySelector('.preview-360-close').addEventListener('click', () => {
        overlay.classList.remove('open');
        setTimeout(() => overlay.remove(), 300);
      });
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('open');
          setTimeout(() => overlay.remove(), 300);
        }
      });
    });
  });


  /* =========================================
     6. GROUP PLANNING SHARED TRIP
     ========================================= */
  const groupPlanBtn = document.querySelector('[data-group-plan]');
  if (groupPlanBtn) {
    groupPlanBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const shareUrl = window.location.href + '?group=' + Math.random().toString(36).substring(2, 8);
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


  /* =========================================
     7. LIVE AVAILABILITY INDICATORS
     ========================================= */
  document.querySelectorAll('[data-availability]').forEach(el => {
    const spots = parseInt(el.dataset.availability);
    if (spots <= 3) {
      el.innerHTML = `<span class="avail-dot avail-low"></span> Only ${spots} spots left`;
      el.classList.add('avail-low');
    } else if (spots <= 8) {
      el.innerHTML = `<span class="avail-dot avail-medium"></span> ${spots} spots available`;
    } else {
      el.innerHTML = `<span class="avail-dot avail-high"></span> Available`;
    }
  });

});
