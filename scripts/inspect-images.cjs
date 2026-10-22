const fs = require('node:fs');
fetch('https://www.visitmorocco.com/en').then(r => r.text()).then(t => {
  console.log([...t.matchAll(/(?:src|data-src)="([^"]+)"/g)].map(m=>m[1]).filter(s=>/jpg|webp|png/.test(s)).join('\n'));
});
