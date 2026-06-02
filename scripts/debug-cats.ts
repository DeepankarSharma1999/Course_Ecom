import * as fs from "fs";

const CONTENT_MD_PATH = "/home/raven/.gemini/antigravity/brain/2c36a476-7409-41e2-90f2-bba9084fe6fb/.system_generated/steps/847/content.md";

const content = fs.readFileSync(CONTENT_MD_PATH, "utf-8");
const lines = content.split("\n");

const validCats = ["AGILE", "SAFe", "PROJECT", "BUSINESS", "Generative AI", "Microcredentials", "QUALITY", "ON DEMAND MICROCREDENTIALS", "SERVICE", "DEVOPS", "CLOUD COMPUTING", "DATA SCIENCE", "TECHNOLOGY", "OTHERS"];

let currentCategory = "";
const counts: any = {};

for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    if (validCats.includes(trimmed)) {
        currentCategory = trimmed;
        counts[currentCategory] = 0;
        console.log("Found category:", currentCategory);
    }
    
    const match = trimmed.match(/^- \[([^\]]+)\]\(([^)]+)\)$/);
    if (match && currentCategory) {
        counts[currentCategory]++;
    }
}

console.log(counts);
