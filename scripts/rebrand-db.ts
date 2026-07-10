// One-off (idempotent) brand rename across every text/jsonb column in the DB.
// Safe to re-run: REPLACE only changes rows that still contain the old token.
// Run: docker exec -e DATABASE_URL=... mindclick-web npx tsx scripts/rebrand-db.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const SUBS: [string, string][] = [
  ["ULearnSystems", "Simplilead"],
  ["Ulearnsystems", "Simplilead"],
  ["ULEARNSYSTEMS", "SIMPLILEAD"],
  ["ulearnsystems", "simplilead"],
  ["ULEARN10", "SIMPLILEAD10"],
];

// Wrap a SQL expression in nested REPLACE()s for every substitution.
function replaced(expr: string) {
  return SUBS.reduce((acc, [from, to]) => `REPLACE(${acc}, '${from}', '${to}')`, expr);
}

async function main() {
  const cols = await prisma.$queryRawUnsafe<{ table_name: string; column_name: string; data_type: string }[]>(
    `SELECT table_name, column_name, data_type FROM information_schema.columns
     WHERE table_schema = 'public' AND data_type IN ('text','character varying','jsonb')`
  );

  let touched = 0;
  for (const { table_name, column_name, data_type } of cols) {
    const t = `"${table_name}"`, c = `"${column_name}"`;
    const sql = data_type === "jsonb"
      ? `UPDATE ${t} SET ${c} = (${replaced(`${c}::text`)})::jsonb WHERE ${c}::text ILIKE '%ulearn%'`
      : `UPDATE ${t} SET ${c} = ${replaced(c)} WHERE ${c} ILIKE '%ulearn%'`;
    try {
      const n = await prisma.$executeRawUnsafe(sql);
      if (n > 0) { console.log(`  ${table_name}.${column_name}: ${n}`); touched += n; }
    } catch (e) {
      console.log(`  ! skip ${table_name}.${column_name}: ${(e as Error).message.split("\n")[0]}`);
    }
  }
  console.log(`Rebranded ${touched} field(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
