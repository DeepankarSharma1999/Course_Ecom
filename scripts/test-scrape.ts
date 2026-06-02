import * as cheerio from 'cheerio';
import fs from 'fs';

async function testScrape() {
  const res = await fetch("https://www.simpliaxis.com/");
  const html = await res.text();
  const $ = cheerio.load(html);

  // The categories are usually tabs or list items in the mega menu
  // I will just look for the ul/li structure inside the nav or header
  
  const structure: any = {};

  // Try to find tabs
  $('.nav-pills li, .nav-tabs li').each((_, el) => {
    const tabName = $(el).text().trim();
    const targetId = $(el).find('a').attr('href') || $(el).find('button').attr('data-bs-target');
    
    if (tabName && targetId && targetId.startsWith('#')) {
      structure[tabName] = [];
      $(targetId).find('a').each((_, linkEl) => {
        const title = $(linkEl).text().trim();
        const href = $(linkEl).attr('href');
        if (title && href) {
          structure[tabName].push({ title, href });
        }
      });
    }
  });

  // If the above fails, let's dump a generic mega menu search
  if (Object.keys(structure).length === 0) {
     $('.dropdown-menu').each((i, menu) => {
         console.log(`Menu ${i}:`);
         $(menu).find('li.nav-item').each((_, item) => {
             console.log(" -", $(item).text().trim());
         });
     });
  } else {
     console.log(JSON.stringify(structure, null, 2));
  }

  fs.writeFileSync('dom.html', html);
}

testScrape();
