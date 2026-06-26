const fs = require('fs');

const files = [
  'anzoor-gallery-case-study.html',
  'car-screen-case-study.html',
  'docwise-case-study.html',
  'electric-helper-case-study.html',
  'fast-food-case-study.html',
  'finance-tracker-case-study.html',
  'fitness-tracker-case-study.html',
  'social-connect-case-study.html',
  'zameen-case-study.html'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  const sectionRegex = /<div class="case-study-section">([\s\S]*?)<\/div>/g;
  
  let newContent = '';
  let match;
  let lastIndex = 0;
  
  while ((match = sectionRegex.exec(content)) !== null) {
    newContent += content.substring(lastIndex, match.index);
    const sectionInner = match[1];
    
    // Check if it's an image section (Sketches, Wireframes, Final Designs, Mockups)
    const isImageSection = /<h3>\d+\.\s*(Sketches|Wireframes|Final Design.*|Mockup.*)<\/h3>/i.test(sectionInner);
    const hasImage = /<img/i.test(sectionInner);
    
    // If it is an image section and doesn't contain an actual img tag, we remove it
    if (isImageSection && !hasImage) {
      // Skip appending (effectively removing the section)
    } else {
      newContent += match[0];
    }
    
    lastIndex = sectionRegex.lastIndex;
  }
  newContent += content.substring(lastIndex);
  
  // Renumber the sections
  let counter = 1;
  newContent = newContent.replace(/<h3>\d+\.\s*(.*?)<\/h3>/g, (m, title) => {
    const replacement = `<h3>${counter}. ${title}</h3>`;
    counter++;
    return replacement;
  });

  fs.writeFileSync(file, newContent);
}

console.log("Empty sections removed and renumbered.");
