import { PrismaClient } from "@prisma/client";
import sampleData from "./sample-data";
import { insertCategory } from "@/lib/actions/category.actions";

async function main() {
  const prisma = new PrismaClient();

  await prisma.category.deleteMany();

  sampleData.categories.forEach(async (c) => await insertCategory({ data: c }));
}

main();
