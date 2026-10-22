from pathlib import Path
import re,json
root=Path(__file__).resolve().parent.parent
images=json.loads((root/'assets/images/sources.json').read_text())
labels={'en':('Skip to content','MERZOUGA, MOROCCO','A little further. A little deeper.'),'fr':('Aller au contenu','MERZOUGA, MAROC','Un peu plus loin. Un peu plus près.'),'es':('Ir al contenido','MERZOUGA, MARRUECOS','Un poco más lejos. Un poco más cerca.'),'ar':('انتقل إلى المحتوى','مرزوكة، المغرب','رحلة أبعد. تجربة أعمق.')}
mapping={'1531219572328-a0171b4448a3':'atlas','1569383746724-6f1b882b8f46':'essaouira','1559925523-10de9e23cf90':'fes','1559586616-361e18714958':'sahara','1504194921103-f8b80cadd5e4':'stars','1597212618440-806262de4f6b':'marrakech','1564507004663-b6dfb3c824d5':'chefchaouen'}
for lang in labels:
 for p in (root/lang).rglob('index.html'):
  text=p.read_text(encoding='utf-8');home=p.parent.name==lang
  # Inline translation extensions must run after the deferred translation module.
  text=re.sub(r'(Object\.assign\(I18N\.translations,\s*\{.*?\}\);)',r"document.addEventListener('DOMContentLoaded', function () {\n\1\nI18N.setLang(I18N.currentLang);\n});",text,flags=re.S)
  for image in images:text=text.replace(image['source'],image['local'])
  # Replace visibly incorrect pictures with inspected Moroccan destinations.
  def improve_img(m):
   tag=m[0];alt=re.search(r'alt="([^"]*)"',tag);alt=alt[1].lower() if alt else ''
   match=re.search(r'photo-([\w-]+)-(\d+)\.webp',tag)
   destination=mapping.get(match[1]) if match else None
   if 'sahara' in alt or 'desert' in alt:destination='sahara'
   if 'chefchaouen' in alt:destination='chefchaouen'
   if 'essaouira' in alt:destination='essaouira'
   if 'atlas' in alt:destination='atlas'
   if 'night sky' in alt or 'stargaz' in alt:destination='stars'
   if 'spice' in alt:destination='spices'
   if destination:
    tag=re.sub(r'src="[^"]*"',f'src="/assets/images/{destination}-960.webp" srcset="/assets/images/{destination}-640.webp 640w, /assets/images/{destination}-960.webp 960w, /assets/images/{destination}-1600.webp 1600w" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"',tag)
   # Remove duplicate loading attributes and reserve intrinsic image space.
   tag=re.sub(r'(loading="lazy".*?)\s+loading="lazy"',r'\1',tag)
   if 'width=' not in tag:tag=tag.replace('<img','<img width="960" height="640"',1)
   return tag
  text=re.sub(r'<img\b[^>]*>',improve_img,text)
  text=text.replace('</head>','    <link rel="stylesheet" href="/css/refinements.css?v=5">\n</head>')
  text=text.replace('<body>',f'<body>\n<a class="skip-link" href="#main-content">{labels[lang][0]}</a>')
  text=re.sub(r'(<section\b)(?![^>]*id=)',r'\1 id="main-content"',text,count=1) if 'id="main-content"' not in text else text
  text=text.replace('</body>','<script src="/js/refinements.js?v=5" defer></script>\n</body>')
  text=text.replace('?v=4','?v=5')
  if home:
   text=re.sub(r'<video\b.*?</video>','<img class="hero-image" src="/assets/images/sahara-1600.webp" srcset="/assets/images/sahara-640.webp 640w, /assets/images/sahara-960.webp 960w, /assets/images/sahara-1600.webp 1600w" sizes="100vw" width="1600" height="1067" fetchpriority="high" decoding="async" alt="Camel caravan crossing the golden dunes of Erg Chebbi, Merzouga">',text,flags=re.S)
   text=text.replace('<!-- ============ TRUST BAR',f'<div class="hero-caption"><span>{labels[lang][1]}</span><strong>{labels[lang][2]}</strong></div>\n<!-- ============ TRUST BAR')
   # Place photographic caption inside the hero, before its closing tag.
   text=re.sub(r'(\s*</section>\s*)(<div class="hero-caption">.*?</div>)',r'\2\1',text,count=1,flags=re.S)
   text=re.sub(r'\s+data-(?:360-preview|availability)="[^"]*"','',text)
   # Home cards navigate to the existing destination collection.
   text=re.sub(r'<div class="dest-card ([^"]*)">(.*?)\n                </div>',lambda m:f'<a class="dest-card {m[1]}" href="/{lang}/destinations/">{m[2]}\n                </a>',text,flags=re.S)
   text=text.replace('<button class="btn btn-gold btn-lg" style="min-width: 280px;">','<button class="btn btn-gold btn-lg home-generate" style="min-width: 280px;">')
  p.write_text(text,encoding='utf-8')
print('Refined all 32 localized pages.')
