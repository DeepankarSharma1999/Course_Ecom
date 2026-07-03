// Wait for the database to be reachable before the build runs migrations/seed.
// Neon (serverless) auto-suspends when idle; the first connection to a cold DB
// can fail with P1001 while it wakes. Retrying turns that transient failure into
// a short wait instead of a failed deploy.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const attempts = 12; // ~60s max — enough for a Neon cold start.
  for (let i = 1; i <= attempts; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log(`DB reachable (attempt ${i}).`);
      return;
    } catch (e) {
      if (i === attempts) throw e;
      console.log(`DB not ready (attempt ${i}/${attempts}) — waking, retrying in 5s...`);
      await sleep(5000);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
