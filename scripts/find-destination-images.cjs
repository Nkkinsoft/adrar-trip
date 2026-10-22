const urls=['https://unsplash.com/photos/boats-on-water-under-blue-sky-xiBE9G0godc','https://unsplash.com/s/photos/imlil'];
(async()=>{for(const url of urls){const r=await fetch(url);const t=await r.text();console.log(url,r.status,[...new Set([...t.matchAll(/https:\/\/images\.unsplash\.com\/photo-[\w-]+/g)].map(m=>m[0]))].slice(0,12));}})();
