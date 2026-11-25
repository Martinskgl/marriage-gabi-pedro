import { PrismaClient } from "@prisma/client";

// Conexão direta com o Prisma Postgres (as URLs do projeto são postgres://, sem Accelerate)
declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    log: ["error"],
  });
}

export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
