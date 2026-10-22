const fs=require('fs'),path=require('path'),assert=require('assert');
let pages=0,images=0;
for(const lang of ['en','fr','es','ar']){
 const files=[path.join(lang,'index.html'),...fs.readdirSync(lang,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>path.join(lang,d.name,'index.html'))];
 for(const file of files){const html=fs.readFileSync(file,'utf8');pages++;for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){if(!/src=|ld\+json/.test(match[1]))new Function(match[2]);}for(const match of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+|\/css\/[^"?]+|\/js\/[^"?]+)/g)){assert(fs.existsSync('.'+match[1]),`${file}: missing ${match[1]}`);if(match[1].endsWith('.webp'))images++;}assert(!html.includes('<video'),'Homepage must not download autoplay video');assert(html.includes('page-translations.js'),file+' missing page translations');}
}
for(const file of fs.readdirSync('js'))if(file.endsWith('.js'))new Function(fs.readFileSync('js/'+file,'utf8'));
console.log(`${pages} pages: inline/shared JavaScript syntax and ${images} local image references passed.`);
