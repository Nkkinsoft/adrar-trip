/* ============================================
   ADRAR VOYAGES — i18n System
   Full 4-language support: EN, FR, ES, AR
   ============================================ */

const I18N = {
  defaultLang: 'en',
  currentLang: 'en',
  languages: {
    en: { code: 'en', dir: 'ltr', name: 'English', native: 'English', hreflang: 'en' },
    fr: { code: 'fr', dir: 'ltr', name: 'French', native: 'Français', hreflang: 'fr' },
    es: { code: 'es', dir: 'ltr', name: 'Spanish', native: 'Español', hreflang: 'es' },
    ar: { code: 'ar', dir: 'rtl', name: 'Arabic', native: 'العربية', hreflang: 'ar' }
  },

  translations: {
    /* ============ HEADER / NAV ============ */
    'nav.destinations': {
      en: 'Destinations',
      fr: 'Destinations',
      es: 'Destinos',
      ar: 'الوجهات'
    },
    'nav.experiences': {
      en: 'Experiences',
      fr: 'Expériences',
      es: 'Experiencias',
      ar: 'التجارب'
    },
    'nav.trip-builder': {
      en: 'Plan Your Journey',
      fr: 'Planifier votre voyage',
      es: 'Planifica tu viaje',
      ar: 'خطط رحلتك'
    },
    'nav.about': {
      en: 'Our Story',
      fr: 'Notre histoire',
      es: 'Nuestra historia',
      ar: 'قصتنا'
    },
    'nav.journal': {
      en: 'Journal',
      fr: 'Journal',
      es: 'Diario',
      ar: 'المجلة'
    },
    'nav.sustainability': {
      en: 'Impact',
      fr: 'Impact',
      es: 'Impacto',
      ar: 'أثرنا'
    },
    'nav.contact': {
      en: 'Contact',
      fr: 'Contact',
      es: 'Contacto',
      ar: 'اتصل بنا'
    },

    /* ============ HERO ============ */
    'hero.eyebrow': {
      en: 'Morocco, Reimagined',
      fr: 'Le Maroc, réinventé',
      es: 'Marruecos, reinventado',
      ar: 'المغرب، برؤية جديدة'
    },
    'hero.title': {
      en: 'Where the Sahara<br>Meets the Soul',
      fr: 'Où le Sahara<br>rencontre l\'âme',
      es: 'Donde el Sahara<br>encuentra el alma',
      ar: 'حيث يلتقي الصحراء<br>بالروح'
    },
    'hero.subtitle': {
      en: 'Curated journeys through Morocco\'s most extraordinary landscapes, ancient medinas, and hidden treasures — crafted for travelers who seek depth, beauty, and authentic connection.',
      fr: 'Des voyages sélectionnés à travers les paysages les plus extraordinaires du Maroc, ses médinas ancestrales et ses trésors cachés — conçus pour les voyageurs en quête de profondeur, de beauté et de connexion authentique.',
      es: 'Viajes seleccionados a través de los paisajes más extraordinarios de Marruecos, sus antiguas medinas y tesoros ocultos — creados para viajeros que buscan profundidad, belleza y conexión auténtica.',
      ar: 'رحلات منتقاة عبر أكثر مناظر المغرب استثنائية، ومدنياته العريقة، وكنوزه المخفية — مصممة للمسافرين الذين يبحثون عن العمق والجمال والتواصل الأصيل.'
    },
    'hero.cta-primary': {
      en: 'Design Your Journey',
      fr: 'Concevoir votre voyage',
      es: 'Diseña tu viaje',
      ar: 'صمم رحلتك'
    },
    'hero.cta-secondary': {
      en: 'Explore Destinations',
      fr: 'Explorer les destinations',
      es: 'Explorar destinos',
      ar: 'استكشف الوجهات'
    },

    /* ============ INTRO SECTION ============ */
    'intro.eyebrow': {
      en: 'The Adrar Difference',
      fr: 'La différence Adrar',
      es: 'La diferencia Adrar',
      ar: 'فرق Adrar'
    },
    'intro.title': {
      en: 'Morocco Through the Eyes of Those Who Truly Know It',
      fr: 'Le Maroc à travers les yeux de ceux qui le connaissent vraiment',
      es: 'Marruecos a través de los ojos de quienes lo conocen de verdad',
      ar: 'المغرب من خلال عيون من يعرفونه حقاً'
    },
    'intro.body': {
      en: 'For over two decades, Adrar Voyages has been crafting journeys that go beyond the surface. Our guides are not employees — they are storytellers, artisans, and guardians of traditions passed down through generations. Every itinerary is a living tapestry woven with intimate access, seasonal rhythms, and a deep respect for the land and its people.',
      fr: 'Depuis plus de vingt ans, Adrar Voyages crée des voyages qui vont au-delà de la surface. Nos guides ne sont pas des employés — ce sont des conteurs, des artisans et des gardiens de traditions transmises depuis des générations. Chaque itinéraire est une tapisserie vivante tissée d\'accès intimes, de rythmes saisonniers et d\'un profond respect pour la terre et ses habitants.',
      es: 'Durante más de dos décadas, Adrar Voyages ha creado viajes que van más allá de la superficie. Nuestros guías no son empleados — son narradores, artesanos y guardianes de tradiciones transmitidas durante generaciones. Cada itinerario es un tapiz vivo tejido con acceso íntimo, ritmos estacionales y un profundo respeto por la tierra y su gente.',
      ar: 'لأكثر من عقدين من الزمان، كانت Adrar Voyages تصمم رحلات تتجاوز السطح. مرشدونا ليسوا موظفين — بل هم رواة قصص، وحرفيون، وحُماة تقاليد توارثتها الأجيال. كل برنامج رحلة هو نسيج حي منوش بالوصول الحميم، وإيقاعات المواسم، واحترام عميق للأرض وأهلها.'
    },

    /* ============ DESTINATIONS ============ */
    'dest.eyebrow': {
      en: 'Destinations',
      fr: 'Destinations',
      es: 'Destinos',
      ar: 'الوجهات'
    },
    'dest.title': {
      en: 'A Country of Infinite Landscapes',
      fr: 'Un pays aux paysages infinis',
      es: 'Un país de paisajes infinitos',
      ar: 'بلد بلا حدود من المناظر الطبيعية'
    },
    'dest.subtitle': {
      en: 'From snow-capped peaks to golden dunes, from imperial cities to wild Atlantic shores — Morocco reveals a new face at every turn.',
      fr: 'Des sommets enneigés aux dunes dorées, des villes impériales aux rivages atlantiques sauvages — le Maroc révèle un nouveau visage à chaque détour.',
      es: 'Desde picos nevados hasta dunas doradas, desde ciudades imperiales hasta costas atlánticas salvajes — Marruecos revela una nueva cara en cada recodo.',
      ar: 'من القمم المغطاة بالثلوج إلى الكثبان الذهبية، ومن المدن الإمبراطورية إلى الشواطئ الأطلسية البرية — يكشف المغرب عن وجه جديد عند كل منعطف.'
    },
    'dest.marrakech': {
      en: 'Marrakech',
      fr: 'Marrakech',
      es: 'Marrakech',
      ar: 'مراكش'
    },
    'dest.marrakech.tagline': {
      en: 'The Red City, alive with rhythm',
      fr: 'La ville rouge, vivante et rythmée',
      es: 'La ciudad roja, viva y rítmica',
      ar: 'المدينة الحمراء، نابضة بالحياة'
    },
    'dest.fes': {
      en: 'Fes',
      fr: 'Fès',
      es: 'Fez',
      ar: 'فاس'
    },
    'dest.fes.tagline': {
      en: 'The spiritual heart of Morocco',
      fr: 'Le cœur spirituel du Maroc',
      es: 'El corazón espiritual de Marruecos',
      ar: 'القلب الروحي للمغرب'
    },
    'dest.sahara': {
      en: 'Sahara Desert',
      fr: 'Désert du Sahara',
      es: 'Desierto del Sahara',
      ar: 'الصحراء الكبرى'
    },
    'dest.sahara.tagline': {
      en: 'Silence written in golden sand',
      fr: 'Le silence écrit en sable doré',
      es: 'El silencio escrito en arena dorada',
      ar: 'صمت مكتوب برمال ذهبية'
    },
    'dest.atlas': {
      en: 'Atlas Mountains',
      fr: 'Montagnes de l\'Atlas',
      es: 'Montañas del Atlas',
      ar: 'جبال الأطلس'
    },
    'dest.atlas.tagline': {
      en: 'Amazigh villages above the clouds',
      fr: 'Villages amazighs au-dessus des nuages',
      es: 'Pueblos amazigh por encima de las nubes',
      ar: 'قرى أمازيغية فوق الغيوم'
    },
    'dest.essaouira': {
      en: 'Essaouira',
      fr: 'Essaouira',
      es: 'Essaouira',
      ar: 'الصويرة'
    },
    'dest.essaouira.tagline': {
      en: 'Where wind meets artistic soul',
      fr: 'Où le vent rencontre l\'âme artistique',
      es: 'Donde el viento encuentra el alma artística',
      ar: 'حيث تلتقي الرياح بالروح الفنية'
    },
    'dest.chefchaouen': {
      en: 'Chefchaouen',
      fr: 'Chefchaouen',
      es: 'Chefchaouen',
      ar: 'شفشاون'
    },
    'dest.chefchaouen.tagline': {
      en: 'The blue dream of the Rif',
      fr: 'Le rêve bleu du Rif',
      es: 'El sueño azul del Rif',
      ar: 'الحلم الأزرق للريف'
    },

    /* ============ EXPERIENCES ============ */
    'exp.eyebrow': {
      en: 'Curated Experiences',
      fr: 'Expériences sélectionnées',
      es: 'Experiencias seleccionadas',
      ar: 'تجارب منتقاة'
    },
    'exp.title': {
      en: 'Journeys That Transform',
      fr: 'Des voyages qui transforment',
      es: 'Viajes que transforman',
      ar: 'رحلات تُغيّر'
    },
    'exp.subtitle': {
      en: 'Every Adrar journey is designed to create moments of genuine wonder — the kind that stay with you long after you return home.',
      fr: 'Chaque voyage Adrar est conçu pour créer des moments de véritable émerveillement — de ceux qui restent avec vous bien après votre retour.',
      es: 'Cada viaje Adrar está diseñado para crear momentos de auténtica maravilla — de los que permanecen contigo mucho después de volver a casa.',
      ar: 'كل رحلة Adrar مصممة لخلق لحظات من الدهشة الحقيقية — تلك التي تبقى معك طويلاً بعد عودتك.'
    },

    /* Experience categories */
    'exp.luxury': {
      en: 'Luxury',
      fr: 'Luxe',
      es: 'Lujo',
      ar: 'فاخر'
    },
    'exp.adventure': {
      en: 'Adventure',
      fr: 'Aventure',
      es: 'Aventura',
      ar: 'مغامرة'
    },
    'exp.cultural': {
      en: 'Cultural Immersion',
      fr: 'Immersion culturelle',
      es: 'Inmersión cultural',
      ar: 'انغماس ثقافي'
    },
    'exp.family': {
      en: 'Family',
      fr: 'Famille',
      es: 'Familia',
      ar: 'عائلي'
    },
    'exp.honeymoon': {
      en: 'Honeymoon',
      fr: 'Voyage de noces',
      es: 'Luna de miel',
      ar: 'شهر العسل'
    },
    'exp.sustainable': {
      en: 'Sustainable',
      fr: 'Durable',
      es: 'Sostenible',
      ar: 'مستدام'
    },

    /* ============ TRIP BUILDER ============ */
    'builder.eyebrow': {
      en: 'AI Trip Architect',
      fr: 'Architecte de voyage IA',
      es: 'Arquitecto de viaje IA',
      ar: 'مهندس الرحلات بالذكاء الاصطناعي'
    },
    'builder.title': {
      en: 'Design Your Perfect Morocco',
      fr: 'Concevez votre Maroc parfait',
      es: 'Diseña tu Marruecos perfecto',
      ar: 'صمم مغربك المثالي'
    },
    'builder.subtitle': {
      en: 'Tell us about your dream journey and our AI will craft a personalized itinerary in minutes — refined by our local experts.',
      fr: 'Parlez-nous de votre voyage de rêve et notre IA créera un itinéraire personnalisé en quelques minutes — perfectionné par nos experts locaux.',
      es: 'Cuéntanos sobre tu viaje soñado y nuestra IA creará un itinerario personalizado en minutos — refinado por nuestros expertos locales.',
      ar: 'أخبرنا عن رحلة أحلامك وسيقوم الذكاء الاصطناعي لدينا بصياغة برنامج مخصص في دقائق — يُنقّله خبراؤنا المحليون.'
    },
    'builder.step1.title': {
      en: 'What draws you to Morocco?',
      fr: 'Qu\'est-ce qui vous attire au Maroc ?',
      es: '¿Qué te atrae de Marruecos?',
      ar: 'ما الذي يجذبك إلى المغرب؟'
    },
    'builder.step2.title': {
      en: 'What is your travel style?',
      fr: 'Quel est votre style de voyage ?',
      es: '¿Cuál es tu estilo de viaje?',
      ar: 'ما هو أسلوب سفرك؟'
    },
    'builder.step3.title': {
      en: 'How long is your journey?',
      fr: 'Quelle est la durée de votre voyage ?',
      es: '¿Cuánto dura tu viaje?',
      ar: 'كم مدة رحلتك؟'
    },
    'builder.step4.title': {
      en: 'When do you wish to travel?',
      fr: 'Quand souhaitez-vous voyager ?',
      es: '¿Cuándo deseas viajar?',
      ar: 'متى ترغب في السفر؟'
    },

    /* ============ SUSTAINABILITY ============ */
    'sust.eyebrow': {
      en: 'Our Impact',
      fr: 'Notre impact',
      es: 'Nuestro impacto',
      ar: 'أثرنا'
    },
    'sust.title': {
      en: 'Travel That Gives Back',
      fr: 'Voyager en donnant en retour',
      es: 'Viajar dando a cambio',
      ar: 'سفر يُرد الجميل'
    },
    'sust.subtitle': {
      en: 'Every journey with Adrar contributes directly to the communities and landscapes that make Morocco extraordinary.',
      fr: 'Chaque voyage avec Adrar contribue directement aux communautés et aux paysages qui rendent le Maroc extraordinaire.',
      es: 'Cada viaje con Adrar contribuye directamente a las comunidades y paisajes que hacen extraordinario a Marruecos.',
      ar: 'كل رحلة مع Adrar تساهم مباشرة في المجتمعات والمناظر التي تجعل المغرب استثنائياً.'
    },
    'sust.stat1.number': { en: '87%', fr: '87%', es: '87%', ar: '٪87' },
    'sust.stat1.label': {
      en: 'Spent locally in communities',
      fr: 'Dépensé localement dans les communautés',
      es: 'Gastado localmente en comunidades',
      ar: 'يُنفق محلياً في المجتمعات'
    },
    'sust.stat2.number': { en: '12K+', fr: '12K+', es: '12K+', ar: '+12 ألف' },
    'sust.stat2.label': {
      en: 'Trees planted since 2019',
      fr: 'Arbres plantés depuis 2019',
      es: 'Árboles plantados desde 2019',
      ar: 'شجرة زرعت منذ 2019'
    },
    'sust.stat3.number': { en: '340+', fr: '340+', es: '340+', ar: '+340' },
    'sust.stat3.label': {
      en: 'Local families supported',
      fr: 'Familles locales soutenues',
      es: 'Familias locales apoyadas',
      ar: 'عائلة محلية مدعومة'
    },
    'sust.stat4.number': { en: 'Carbon Neutral', fr: 'Carbone neutre', es: 'Carbono neutral', ar: 'محايد كربونياً' },
    'sust.stat4.label': {
      en: 'All trips offset since 2023',
      fr: 'Tous les voyages compensés depuis 2023',
      es: 'Todos los viajes compensados desde 2023',
      ar: 'جميع الرحلات معوضة منذ 2023'
    },

    /* ============ TESTIMONIALS ============ */
    'testimonials.eyebrow': {
      en: 'Guest Stories',
      fr: 'Récits de voyageurs',
      es: 'Historias de viajeros',
      ar: 'قصص ضيوفنا'
    },
    'testimonials.title': {
      en: 'Words From Our Travelers',
      fr: 'Les mots de nos voyageurs',
      es: 'Palabras de nuestros viajeros',
      ar: 'كلمات من مسافرينا'
    },

    /* ============ CTA SECTION ============ */
    'cta.title': {
      en: 'Your Morocco Story<br>Starts Here',
      fr: 'Votre histoire au Maroc<br>commence ici',
      es: 'Tu historia en Marruecos<br>comienza aquí',
      ar: 'قصتك في المغرب<br>تبدأ هنا'
    },
    'cta.subtitle': {
      en: 'Let our experts craft a journey as unique as you are. No templates, no compromises — just Morocco at its finest.',
      fr: 'Laissez nos experts concevoir un voyage aussi unique que vous. Pas de modèles, pas de compromis — juste le Maroc à son meilleur.',
      es: 'Deja que nuestros expertos creen un viaje tan único como tú. Sin plantillas, sin compromisos — solo Marruecos en su máxima expresión.',
      ar: 'دع خبرائنا يصممون رحلة فريدة مثلك تماماً. بدون قوالب، بدون تنازلات — فقط المغرب في أجمل حلله.'
    },
    'cta.button': {
      en: 'Start Planning',
      fr: 'Commencer à planifier',
      es: 'Empezar a planificar',
      ar: 'ابدأ التخطيط'
    },

    /* ============ FOOTER ============ */
    'footer.tagline': {
      en: 'Crafting extraordinary Moroccan journeys since 2003. A local operator with global standards of excellence.',
      fr: 'Créer des voyages marocains extraordinaires depuis 2003. Un opérateur local avec des standards d\'excellence mondiaux.',
      es: 'Creando viajes extraordinarios por Marruecos desde 2003. Un operador local con estándares globales de excelencia.',
      ar: 'نصنع رحلات مغربية استثنائية منذ 2003. مشغل محلي بمعايير تميز عالمية.'
    },
    'footer.explore': {
      en: 'Explore',
      fr: 'Explorer',
      es: 'Explorar',
      ar: 'استكشف'
    },
    'footer.company': {
      en: 'Company',
      fr: 'Société',
      es: 'Empresa',
      ar: 'الشركة'
    },
    'footer.support': {
      en: 'Support',
      fr: 'Support',
      es: 'Soporte',
      ar: 'الدعم'
    },
    'footer.about': {
      en: 'About Us',
      fr: 'À propos',
      es: 'Sobre nosotros',
      ar: 'من نحن'
    },
    'footer.careers': {
      en: 'Careers',
      fr: 'Carrières',
      es: 'Empleo',
      ar: 'الوظائف'
    },
    'footer.press': {
      en: 'Press',
      fr: 'Presse',
      es: 'Prensa',
      ar: 'الصحافة'
    },
    'footer.privacy': {
      en: 'Privacy Policy',
      fr: 'Politique de confidentialité',
      es: 'Política de privacidad',
      ar: 'سياسة الخصوصية'
    },
    'footer.terms': {
      en: 'Terms & Conditions',
      fr: 'Conditions générales',
      es: 'Términos y condiciones',
      ar: 'الشروط والأحكام'
    },
    'footer.faq': {
      en: 'FAQ',
      fr: 'FAQ',
      es: 'Preguntas frecuentes',
      ar: 'الأسئلة الشائعة'
    },
    'footer.copyright': {
      en: '© 2026 Adrar Voyages. All rights reserved.',
      fr: '© 2026 Adrar Voyages. Tous droits réservés.',
      es: '© 2026 Adrar Voyages. Todos los derechos reservados.',
      ar: '© 2026 Adrar Voyages. جميع الحقوق محفوظة.'
    },

    /* ============ PRESS ============ */
    'press.as-seen': {
      en: 'As Featured In',
      fr: 'Vu dans',
      es: 'Como se vio en',
      ar: 'كما ظهر في'
    },

    /* ============ MOOD FILTERS ============ */
    'mood.romantic': {
      en: 'Romantic',
      fr: 'Romantique',
      es: 'Romántico',
      ar: 'رومانسي'
    },
    'mood.adventurous': {
      en: 'Adventurous',
      fr: 'Aventurier',
      es: 'Aventurero',
      ar: 'مغامر'
    },
    'mood.spiritual': {
      en: 'Spiritual',
      fr: 'Spirituel',
      es: 'Espiritual',
      ar: 'روحي'
    },
    'mood.foodie': {
      en: 'Foodie',
      fr: 'Gastronomique',
      es: 'Gastronómico',
      ar: 'عاشق الطعام'
    },
    'mood.photographic': {
      en: 'Photographic',
      fr: 'Photographique',
      es: 'Fotográfico',
      ar: 'تصويري'
    },
    'mood.slow-travel': {
      en: 'Slow Travel',
      fr: 'Voyage lent',
      es: 'Viaje lento',
      ar: 'سفر بطيء'
    },

    /* ============ MISC ============ */
    'misc.from': {
      en: 'From',
      fr: 'À partir de',
      es: 'Desde',
      ar: 'من'
    },
    'misc.per-person': {
      en: 'per person',
      fr: 'par personne',
      es: 'por persona',
      ar: 'للشخص'
    },
    'misc.days': {
      en: 'days',
      fr: 'jours',
      es: 'días',
      ar: 'أيام'
    },
    'misc.learn-more': {
      en: 'Learn More',
      fr: 'En savoir plus',
      es: 'Saber más',
      ar: 'اعرف المزيد'
    },
    'misc.view-all': {
      en: 'View All',
      fr: 'Voir tout',
      es: 'Ver todo',
      ar: 'عرض الكل'
    },
    'misc.whatsapp': {
      en: 'Chat on WhatsApp',
      fr: 'Chat sur WhatsApp',
      es: 'Chat por WhatsApp',
      ar: 'تحدث عبر واتساب'
    },
    'misc.concierge': {
      en: 'Your personal concierge',
      fr: 'Votre concierge personnel',
      es: 'Tu conserje personal',
      ar: 'مضيفك الشخصي'
    }
  },

  /* --- METHODS --- */
  t(key) {
    const entry = this.translations[key];
    if (!entry) {
      console.warn(`[i18n] Missing translation: ${key}`);
      return key;
    }
    return entry[this.currentLang] || entry[this.defaultLang] || key;
  },

  setLang(lang) {
    if (!this.languages[lang]) return;
    this.currentLang = lang;

    document.documentElement.lang = lang;
    document.documentElement.dir = this.languages[lang].dir;

    if (lang === 'ar') {
      document.body.style.fontFamily = "var(--font-arabic)";
    } else {
      document.body.style.fontFamily = "";
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.innerHTML = translation;
      }
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const parts = el.getAttribute('data-i18n-attr').split(':');
      if (parts.length === 2) {
        const attr = parts[0].trim();
        const key = parts[1].trim();
        el.setAttribute(attr, this.t(key));
      }
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    this.updateHreflang();
    localStorage.setItem('adrar-lang', lang);

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  },

  updateHreflang() {
    const baseUrl = window.location.origin;
    const path = window.location.pathname.replace(/^\/(en|fr|es|ar)/, '') || '/';

    document.querySelectorAll('link[hreflang]').forEach(link => {
      const hreflang = link.getAttribute('hreflang');
      if (hreflang === 'x-default') {
        link.href = `${baseUrl}/en${path}`;
      } else {
        link.href = `${baseUrl}/${hreflang}${path}`;
      }
    });
  },

  init() {
    const saved = localStorage.getItem('adrar-lang');
    const browserLang = navigator.language.split('-')[0];
    const pathLang = window.location.pathname.split('/')[1];

    let lang = this.defaultLang;
    if (saved && this.languages[saved]) {
      lang = saved;
    } else if (this.languages[pathLang]) {
      lang = pathLang;
    } else if (this.languages[browserLang]) {
      lang = browserLang;
    }

    this.setLang(lang);
  }
};

document.addEventListener('DOMContentLoaded', () => I18N.init());
