/* Small, dependency-free improvements shared by all four language routes. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const lang = document.documentElement.lang;
  const copy = {
    en: {search:'Where would you like to go?',empty:'No matches yet. Try Marrakech, Sahara, or Atlas.',plan:'Your Morocco journey',note:'An initial route to inspire your trip. Travel times, pricing, and availability must be confirmed with our team.',contact:'Discuss this journey',saved:'Saved on this device',days:'days',none:'No journeys match this mood yet. Explore all experiences.',skip:'Skip to content'},
    fr: {search:'Où souhaitez-vous aller ?',empty:'Aucun résultat. Essayez Marrakech, Sahara ou Atlas.',plan:'Votre voyage au Maroc',note:'Un premier itinéraire pour vous inspirer. Durées, tarifs et disponibilités à confirmer avec notre équipe.',contact:'Parlons de ce voyage',saved:'Enregistré sur cet appareil',days:'jours',none:'Aucun voyage pour cette envie. Découvrez toutes les expériences.'},
    es: {search:'¿A dónde te gustaría ir?',empty:'Sin resultados. Prueba Marrakech, Sahara o Atlas.',plan:'Tu viaje por Marruecos',note:'Una ruta inicial para inspirarte. Confirma tiempos, precios y disponibilidad con nuestro equipo.',contact:'Hablemos de este viaje',saved:'Guardado en este dispositivo',days:'días',none:'No hay viajes para esta categoría. Explora todas las experiencias.'},
    ar: {search:'إلى أين تود السفر؟',empty:'لا توجد نتائج. جرب مراكش أو الصحراء أو الأطلس.',plan:'رحلتك في المغرب',note:'مسار أولي لإلهام رحلتك. يجب تأكيد أوقات السفر والأسعار والتوفر مع فريقنا.',contact:'ناقش هذه الرحلة',saved:'محفوظ على هذا الجهاز',days:'أيام',none:'لا توجد رحلات لهذه الفئة. اكتشف جميع التجارب.'}
  }[lang] || {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const values={en:['Private journeys','Local perspectives','At your pace','Cities to Sahara','Made in Morocco'],fr:['Voyages privés','Regards locaux','À votre rythme','Des villes au Sahara','Au cœur du Maroc'],es:['Viajes privados','Perspectivas locales','A tu ritmo','Ciudades y Sáhara','Hecho en Marruecos'],ar:['رحلات خاصة','خبرة محلية','على إيقاعك','من المدن إلى الصحراء','من قلب المغرب']}[lang];
  document.querySelectorAll('.press-logo').forEach((el,i)=>el.textContent=values[i]);
  const heroImage=document.querySelector('.hero-image');
  if(heroImage){
    const scenes=[{image:'sahara',place:{en:'MERZOUGA · THE SAHARA',fr:'MERZOUGA · LE SAHARA',es:'MERZOUGA · EL SÁHARA',ar:'مرزوكة · الصحراء'}},{image:'atlas',place:{en:'IMLIL · THE HIGH ATLAS',fr:'IMLIL · LE HAUT ATLAS',es:'IMLIL · EL ALTO ATLAS',ar:'إمليل · الأطلس الكبير'}},{image:'chefchaouen',place:{en:'CHEFCHAOUEN · THE BLUE CITY',fr:'CHEFCHAOUEN · LA VILLE BLEUE',es:'CHEFCHAOUEN · LA CIUDAD AZUL',ar:'شفشاون · المدينة الزرقاء'}}];
    const controls=document.createElement('div');controls.className='hero-scenes';controls.setAttribute('role','group');controls.setAttribute('aria-label',{en:'Discover Morocco',fr:'Découvrir le Maroc',es:'Descubre Marruecos',ar:'اكتشف المغرب'}[lang]);
    scenes.forEach((scene,i)=>{const btn=document.createElement('button');btn.textContent='0'+(i+1);btn.setAttribute('aria-label',scene.place[lang]);btn.setAttribute('aria-pressed',String(i===0));btn.addEventListener('click',()=>{controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed','false'));btn.setAttribute('aria-pressed','true');heroImage.src=`/assets/images/${scene.image}-1600.webp`;heroImage.srcset=[640,960,1600].map(w=>`/assets/images/${scene.image}-${w}.webp ${w}w`).join(', ');heroImage.alt=scene.place[lang];document.querySelector('.hero-caption span').textContent=scene.place[lang];if(!reduced)heroImage.animate([{opacity:.45,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:700,easing:'ease-out'});});controls.append(btn);});document.querySelector('.hero-caption').append(controls);
  }
  const destinationNames = {en:['Marrakech','Sahara · Merzouga','Atlas Mountains · Imlil','Fes','Chefchaouen','Essaouira'],fr:['Marrakech','Sahara · Merzouga','Haut Atlas · Imlil','Fès','Chefchaouen','Essaouira'],es:['Marrakech','Sahara · Merzouga','Montañas del Atlas · Imlil','Fez','Chefchaouen','Essaouira'],ar:['مراكش','الصحراء · مرزوكة','جبال الأطلس · إمليل','فاس','شفشاون','الصويرة']}[lang];

  // Search has real, keyboard-accessible results rather than a decorative input.
  const search = document.querySelector('.search-input');
  if (search) {
    search.removeAttribute('autofocus');
    search.setAttribute('aria-label', copy.search);
    const results = document.createElement('div'); results.className='search-results'; results.setAttribute('aria-live','polite'); search.after(results);
    const entries = destinationNames.map((name,i)=>({name,keywords:['marrakech marrakesh','sahara merzouga desert','atlas imlil mountain','fes fez culture','chefchaouen blue rif','essaouira coast beach'][i],href:`/${lang}/destinations/`}));
    entries.push({name:document.querySelector('[data-i18n="nav.trip-builder"]')?.textContent||copy.plan,keywords:'plan trip journey itinerary',href:`/${lang}/trip-builder/`});
    function render(){const query=search.value.trim().toLocaleLowerCase();results.replaceChildren();const found=entries.filter(e=>`${e.name} ${e.keywords}`.toLocaleLowerCase().includes(query));for(const item of found){const a=document.createElement('a');a.className='search-result';a.href=item.href;a.textContent=item.name;results.append(a);}if(!found.length){const p=document.createElement('p');p.className='search-empty';p.textContent=copy.empty;results.append(p);}}
    search.addEventListener('input',render);render();
    search.addEventListener('keydown',e=>{if(e.key==='Enter')results.querySelector('a')?.click();});
  }

  // Dialogs: Escape, focus containment, scroll locking and returning focus.
  const dialogs=document.querySelectorAll('.search-overlay,.mobile-menu,.ai-architect-overlay,.result-overlay,.concierge-widget');
  let active=null,returnFocus=null;
  const isOpen=el=>el.classList.contains('open')||el.classList.contains('visible');
  for(const dialog of dialogs){dialog.setAttribute('aria-modal','true');dialog.setAttribute('role','dialog');dialog.setAttribute('tabindex','-1');dialog.setAttribute('aria-hidden',String(!isOpen(dialog)));new MutationObserver(()=>{const open=isOpen(dialog);dialog.setAttribute('aria-hidden',String(!open));if(open&&active!==dialog){returnFocus=document.activeElement;active=dialog;document.body.style.overflow='hidden';(dialog.querySelector('button,input,a[href]')||dialog).focus();}else if(!open&&active===dialog){active=null;document.body.style.overflow='';returnFocus?.focus();}document.querySelector('.hamburger')?.setAttribute('aria-expanded',String(!!document.querySelector('.mobile-menu.open')));}).observe(dialog,{attributes:true,attributeFilter:['class']});}
  document.addEventListener('keydown',e=>{if(!active)return;if(e.key==='Escape'){active.classList.remove('open','visible');document.querySelector('.concierge-fab')?.classList.remove('active');}if(e.key==='Tab'){const nodes=[...active.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')].filter(el=>!el.disabled&&el.getClientRects().length);if(!nodes.length){e.preventDefault();active.focus();return;}const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===active)){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
  document.querySelector('.hamburger')?.setAttribute('aria-expanded','false');

  // Home interest chips actually filter the available experiences.
  const cards=[...document.querySelectorAll('#experiences .exp-card')];
  const moods=[['romantic','spiritual','photographic','slow'],['foodie','slow'],['adventurous','photographic']];
  if(cards.length){const empty=document.createElement('p');empty.className='text-body-lg';empty.textContent=copy.none;empty.hidden=true;document.querySelector('.exp-grid').after(empty);document.addEventListener('moodchange',e=>{const mood=e.detail.moods[0]||'all';cards.forEach((c,i)=>{c.hidden=mood!=='all'&&!moods[i]?.includes(mood);});empty.hidden=cards.some(c=>!c.hidden);});}

  // Give non-native choice controls keyboard semantics without duplicating page handlers.
  document.querySelectorAll('#trip-builder .builder-step .builder-option,#trip-builder .duration-chip').forEach(el=>{
    el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-pressed',String(el.classList.contains('selected')));
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}});
    if(el.classList.contains('duration-chip'))el.addEventListener('click',()=>{el.parentElement.querySelectorAll('.duration-chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');});
  });
  document.querySelectorAll('.builder-option,.duration-chip,.number-option,.budget-option').forEach(el=>new MutationObserver(()=>el.setAttribute('aria-pressed',String(el.classList.contains('selected')))).observe(el,{attributes:true,attributeFilter:['class']}));

  window.AdrarJourney = function(container, selections={}) {
    const raw=String(selections.duration||'9-12');const match=raw.match(/\d+/);const days=Math.max(3,Math.min(21,match?Number(match[0]):10));
    const interest=JSON.stringify(selections).toLowerCase();
    let route=days<=5?[0,2]:days<=8?[0,2,1]:[0,2,1,3,4];
    if(/coast|slow|wellness/.test(interest))route=days<=5?[0,5]:[0,2,5];
    const section=document.createElement('div');section.className='journey-result';section.setAttribute('tabindex','-1');
    const title=document.createElement('h3');title.textContent=copy.plan;section.append(title);
    const detail=document.createElement('p');detail.textContent=`${days} ${copy.days} · ${route.map(i=>destinationNames[i]).join(' → ')}`;section.append(detail);
    const list=document.createElement('ol');route.forEach((i,n)=>{const li=document.createElement('li');const start=Math.floor(n*days/route.length)+1,end=Math.floor((n+1)*days/route.length);li.textContent=`${start===end?start:start+'–'+end} · ${destinationNames[i]}`;list.append(li);});section.append(list);
    const note=document.createElement('p');note.textContent=copy.note;section.append(note);
    const link=document.createElement('a');link.className='btn btn-gold';link.href=`/${lang}/contact/`;link.textContent=copy.contact;section.append(link);
    container.querySelector('.journey-result')?.remove();container.append(section);
    try{localStorage.setItem('adrar-journey',JSON.stringify({days,route:route.map(i=>destinationNames[i]),selections}));}catch{}
    section.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'});section.focus({preventScroll:true});return section;
  };
  document.querySelector('.home-generate')?.addEventListener('click',()=>{const selections={};document.querySelectorAll('.builder-step').forEach((step,i)=>selections['step'+i]=step.querySelector('.selected')?.textContent.trim());selections.duration=document.querySelector('#trip-builder .duration-chip.selected')?.textContent.trim();window.AdrarJourney(document.querySelector('#trip-builder .container'),selections);});
  const enquiry=document.querySelector('#contact-form #message');
  if(enquiry&&!enquiry.value){try{const saved=JSON.parse(localStorage.getItem('adrar-journey'));if(saved)enquiry.value=`${copy.plan}: ${saved.days} ${copy.days}\n${saved.route.join(' → ')}`;}catch{}}
  // Remove dead navigation affordances and connect experience CTAs to the planner.
  document.querySelectorAll('#experiences a[href="#"],#experiences button.btn').forEach(el=>el.addEventListener('click',()=>location.assign(`/${lang}/trip-builder/`)));
});
