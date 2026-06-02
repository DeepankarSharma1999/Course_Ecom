import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

const CONTENT_MD_PATH = "/home/raven/.gemini/antigravity/brain/2c36a476-7409-41e2-90f2-bba9084fe6fb/.system_generated/steps/847/content.md";
const COMBO_MD_PATH = "/home/raven/.gemini/antigravity/brain/2c36a476-7409-41e2-90f2-bba9084fe6fb/.system_generated/steps/901/content.md";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

async function main() {
  console.log("Reading content.md...");
  const content = fs.readFileSync(CONTENT_MD_PATH, "utf-8");
  const lines = content.split("\n");

  const categoriesToImport: Record<string, { slug: string, courses: { title: string, url: string }[] }> = {};

  let currentCategory = "";

  // The categories in content.md are standalone lines in uppercase or specific names:
  // e.g. AGILE, SAFe, PROJECT, BUSINESS, Generative AI, Microcredentials, QUALITY, ON DEMAND MICROCREDENTIALS, SERVICE, DEVOPS, CLOUD COMPUTING, DATA SCIENCE, TECHNOLOGY, OTHERS.
  // Then there are bulleted lists `- [Course Name](Url)`.
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Check if it's a category header (usually no dashes, no links, and appears before a list)
    if (!line.startsWith("-") && !line.startsWith("[") && line.length < 30 && !line.includes("http")) {
      const isPossibleCategory = ["AGILE", "SAFe", "PROJECT", "BUSINESS", "Generative AI", "Microcredentials", "QUALITY", "ON DEMAND MICROCREDENTIALS", "SERVICE", "DEVOPS", "CLOUD COMPUTING", "DATA SCIENCE", "TECHNOLOGY", "OTHERS"].includes(line);
      
      if (isPossibleCategory) {
         currentCategory = line;
         if (!categoriesToImport[currentCategory]) {
             categoriesToImport[currentCategory] = {
               slug: slugify(currentCategory),
               courses: []
             };
         }
         continue;
      }
    }

    // Match course bullet points: - [Title](Url)
    const match = line.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);
    if (match && currentCategory && categoriesToImport[currentCategory]) {
      const title = match[1].replace(/SimpliAxis/gi, "ULearnSystems").trim();
      let url = match[2];
      
      // Some courses are listed twice.
      const exists = categoriesToImport[currentCategory].courses.find(c => c.url === url);
      if (!exists) {
        categoriesToImport[currentCategory].courses.push({ title, url });
      }
    }
  }

  // Also parse Combo Courses
  categoriesToImport["COMBO COURSES"] = {
     slug: "combo-courses",
     courses: []
  };

  const comboContent = fs.readFileSync(COMBO_MD_PATH, "utf-8");
  const comboLines = comboContent.split("\n");
  
  // The combo courses list is near the end, just titles without links immediately followed by ENROLL NOW
  for (let i = 0; i < comboLines.length; i++) {
      const line = comboLines[i].trim();
      if (line === "[ENROLL NOW](https://www.simpliaxis.com/combo-courses)") {
          const prevLine = comboLines[i-1].trim();
          if (prevLine && !prevLine.startsWith("[")) {
              const title = prevLine.replace(/SimpliAxis/gi, "ULearnSystems").trim();
              categoriesToImport["COMBO COURSES"].courses.push({
                  title: title,
                  url: `https://www.simpliaxis.com/combo-courses#${slugify(title)}` // dummy url
              });
          }
      }
  }

  console.log(`Found ${Object.keys(categoriesToImport).length} categories.`);
  
  let totalCourses = 0;
  for (const cat of Object.values(categoriesToImport)) {
      totalCourses += cat.courses.length;
  }
  console.log(`Found ${totalCourses} courses to import.`);

  // Upsert to Database
  for (const [catName, catData] of Object.entries(categoriesToImport)) {
    if (catData.courses.length === 0) continue;

    console.log(`Processing Category: ${catName} (${catData.courses.length} courses)`);
    
    // Create/Update Category
    const categoryRecord = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: { name: catName === "Generative AI" || catName === "Microcredentials" ? catName : catName.charAt(0) + catName.slice(1).toLowerCase() },
      create: { 
          slug: catData.slug, 
          name: catName === "Generative AI" || catName === "Microcredentials" ? catName : catName.charAt(0) + catName.slice(1).toLowerCase(),
          tagline: `Explore top-tier ${catName.toLowerCase()} training by ULearnSystems.`
      }
    });

    for (const c of catData.courses) {
        let slug = c.url.split('/').pop() || slugify(c.title);
        // remove hash or params if any
        slug = slug.split('?')[0].split('#')[0];
        if (!slug || slug === "combo-courses") {
            slug = slugify(c.title);
        }

        const summary = `${c.title} by ULearnSystems is designed to elevate your professional skills. Access comprehensive curriculum, expert trainers, and get certified.`;
        const description = `<p>Welcome to the <strong>${c.title}</strong> provided by ULearnSystems. This course brings you the industry-leading standards of training and excellence. Whether you are looking to upskill, reskill, or start fresh, our expert-led sessions ensure that you meet your career goals.</p><p>Enroll today to experience unparalleled learning outcomes.</p>`;

        try {
            await prisma.course.upsert({
                where: { slug },
                update: {
                    title: c.title,
                    summary: summary,
                    description: description,
                    categoryId: categoryRecord.id,
                    isPublished: true
                },
                create: {
                    slug: slug,
                    title: c.title,
                    summary: summary,
                    description: description,
                    categoryId: categoryRecord.id,
                    basePriceInr: 15000,
                    basePriceUsd: 299,
                    isPublished: true,
                    isFeatured: false
                }
            });
        } catch (err) {
            console.error(`Failed to upsert course ${c.title}: ${err}`);
        }
    }
  }

  console.log("Database seeded successfully with scraped courses.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
