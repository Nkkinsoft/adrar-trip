const fs = require('node:fs');
const sharp = require('sharp');
const path = require('node:path');
const pages = ['en','fr','es','ar'].flatMap(l => [l+'/index.html', ...fs.readdirSync(l,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>`${l}/${d.name}/index.html`)]);
const urls = [...new Set(pages.flatMap(p=> [...fs.readFileSync(p,'utf8').matchAll(/https:\/\/images\.unsplash\.com\/photo-[\w-]+\?[^"'\s)<>]+/g)].map(m=>m[0])))];
fs.mkdirSync('assets/images',{recursive:true});
(async()=>{
 const records=[];
 for(let i=0;i<urls.length;i+=6) await Promise.all(urls.slice(i,i+6).map(async url=>{
  const u=new URL(url.replaceAll('&amp;','&')); const id=u.pathname.slice(1); const width=Math.min(1600,Number(u.searchParams.get('w'))||900);
  const name=`${id}-${width}.webp`; const file=path.join('assets/images',name);
  try {
   if(!fs.existsSync(file)) { u.searchParams.set('fm','webp');u.searchParams.set('q','80');const r=await fetch(u,{signal:AbortSignal.timeout(25000)});if(!r.ok) throw Error(r.status);await sharp(Buffer.from(await r.arrayBuffer())).resize({width,withoutEnlargement:true}).webp({quality:78}).toFile(file); }
   records.push({source:url,local:'/assets/images/'+name,bytes:fs.statSync(file).size});
  }catch(e){console.log('FAILED',id,e.message);}
 }));
 fs.writeFileSync('assets/images/sources.json',JSON.stringify(records,null,2));
 console.log('Prepared',records.length,'of',urls.length,'images');
})();
