const fs=require('fs');
for(const lang of ['en','fr','es','ar'])for(const file of [lang+'/index.html',...fs.readdirSync(lang,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>`${lang}/${d.name}/index.html`)]){
 let html=fs.readFileSync(file,'utf8');html=html.replace(/<img\b[^>]*>/g,tag=>{if(!/alt="[^"]*Fes/i.test(tag))return tag;tag=tag.replace(/src="[^"]*"/,'src="/assets/images/fes-960.webp"').replace(/ srcset="[^"]*"/,'');return tag.replace('<img','<img srcset="/assets/images/fes-640.webp 640w, /assets/images/fes-960.webp 960w, /assets/images/fes-1600.webp 1600w"').replace(/alt="[^"]*"/,'alt="Traditional dye vats at the Chouara tannery in Fes"');});fs.writeFileSync(file,html);
}
let features=fs.readFileSync('js/features.js','utf8');
const start=features.indexOf('  /* =========================================');const end=features.indexOf('     2. CONCIERGE CHAT WIDGET');
if(start>=0&&end>=0){const boundary=features.lastIndexOf('  /* =========================================',end);features=features.slice(0,start)+features.slice(boundary);}
const previewStart=features.indexOf("  document.querySelectorAll('[data-360-preview]')");const groupHeading=features.indexOf('     6. GROUP PLANNING');
if(previewStart>=0&&groupHeading>=0){const boundary=features.lastIndexOf('  /* =========================================',groupHeading);features=features.slice(0,previewStart)+`  document.querySelectorAll('[data-360-preview]').forEach(trigger => {
    trigger.setAttribute('role', 'link');
    trigger.setAttribute('tabindex', '0');
    trigger.addEventListener('keydown', event => { if (event.key === 'Enter') trigger.click(); });
    trigger.addEventListener('click', event => {
      if (!event.target.closest('a, button')) location.assign('/' + document.documentElement.lang + '/trip-builder/');
    });
  });
\n`+features.slice(boundary);}
fs.writeFileSync('js/features.js',features);
let main=fs.readFileSync('js/main.js','utf8');const viewStart=main.indexOf('  /* --- View Transitions --- */'),viewEnd=main.indexOf('  /* --- Magnetic / Tilt --- */');if(viewStart>=0&&viewEnd>=0)main=main.slice(0,viewStart)+main.slice(viewEnd);fs.writeFileSync('js/main.js',main);
console.log('Removed dormant AI simulation and unfinished 360 preview; retained functioning navigation.');
