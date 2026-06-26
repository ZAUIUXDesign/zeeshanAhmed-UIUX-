const fs = require('fs');

const pages = {
  'anzoor-gallery-case-study.html': {
    cover: 'cover anzoor gallery.webp',
    final: 'final anzoor gallery.webp'
  },
  'car-screen-case-study.html': {
    cover: 'cover car screen.webp',
    wireframe: 'wireframe car screen.webp',
    final: 'final car screen.webp'
  },
  'docwise-case-study.html': {
    cover: 'cover docwise.webp',
    final: 'docwise final.webp'
  },
  'electric-helper-case-study.html': {
    cover: 'cover electric.webp',
    wireframe: 'electric page wireframe.webp',
    final: 'electric page final.webp'
  },
  'fast-food-case-study.html': {
    cover: 'cover fast food.webp',
    final: 'fast food final.webp'
  },
  'finance-tracker-case-study.html': {
    cover: 'cover finance.webp',
    final: 'finance final.webp'
  },
  'social-connect-case-study.html': {
    cover: 'cover social connect.webp',
    sketch: 'sketch social connect.webp',
    wireframe: 'wireframe social connect.webp',
    final: 'final social connect.webp'
  },
  'zameen-case-study.html': {
    cover: 'cover zameen.webp',
    wireframe: 'zameen wireframe.webp',
    final: 'zameen final design.webp'
  },
  'fitness-tracker-case-study.html': {
    final: 'fitness final.webp'
  }
};

for (const [file, images] of Object.entries(pages)) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  if (images.cover) {
    content = content.replace(/<img src="\.\/assets\/images\/project-\d+\.(png|jpg)"[^>]*class="case-study-img">/gi, 
                              `<img src="./assets/images/${images.cover}" alt="Cover" class="case-study-img">`);
  }
  
  const replacers = [
    { key: 'sketch', regex: /<p class="case-study-text">\s*<em>[^<]*sketch[^<]*<\/em>\s*<\/p>/i },
    { key: 'wireframe', regex: /<p class="case-study-text">\s*<em>[^<]*wireframe[^<]*<\/em>\s*<\/p>/i },
    { key: 'final', regex: /<p class="case-study-text">\s*<em>[^<]*(final|mockup|uploaded|high-fidelity|website)[^<]*<\/em>\s*<\/p>/i }
  ];
  
  for (const r of replacers) {
    if (images[r.key]) {
      content = content.replace(r.regex, `<img src="./assets/images/${images[r.key]}" alt="${r.key} design" class="case-study-img" loading="lazy">`);
    }
  }
  
  fs.writeFileSync(file, content);
}
console.log("Updated images in case studies");
