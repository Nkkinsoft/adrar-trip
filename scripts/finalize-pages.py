from pathlib import Path
import re
root=Path(__file__).resolve().parent.parent
for lang in ['en','fr','es','ar']:
 for p in (root/lang).rglob('index.html'):
  text=p.read_text(encoding='utf-8')
  text=re.sub(r'(<script src="[^\"]*js/i18n.js\?v=5" defer></script>)',r'\1\n<script src="/js/page-translations.js?v=5" defer></script>',text)
  # Correct photos that were associated with unrelated cities in the original code.
  def image(m):
   tag=m[0];alt=re.search(r'alt="([^"]*)"',tag);alt=alt[1].lower() if alt else ''
   destination=next((d for d in ['rabat','agadir','dakhla','dades'] if d in alt),None)
   if destination:
    tag=re.sub(r'src="[^"]*"',f'src="/assets/images/{destination}-960.webp"',tag)
    tag=re.sub(r' srcset="[^"]*"','',tag)
    tag=tag.replace('<img',f'<img srcset="/assets/images/{destination}-640.webp 640w, /assets/images/{destination}-960.webp 960w, /assets/images/{destination}-1600.webp 1600w"',1)
    tag=tag.replace('Rabat royal palace','Hassan Tower, Rabat').replace('Agadir beach sunset','Atlantic coast in the Agadir-Taghazout region').replace('Dakhla lagoon aerial','Atlantic shoreline near Dakhla')
   return tag
  text=re.sub(r'<img\b[^>]*>',image,text)
  text=text.replace('AI Trip Builder','Trip Planner').replace('AI Trip Architect','Trip Planner')
  p.write_text(text,encoding='utf-8')
print('Localized key page headings and corrected remaining destination imagery.')
