import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const trainers = await prisma.trainer.findMany();
  console.log(trainers.map(t => ({ name: t.name, isActive: t.isActive })));
}
main().finally(() => prisma.$disconnect());
