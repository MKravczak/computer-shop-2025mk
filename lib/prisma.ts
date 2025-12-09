import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Singleton pattern dla Prisma Client
// W środowisku deweloperskim używa globalnej instancji, aby uniknąć wielu połączeń podczas hot-reload
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Tworzenie adaptera PostgreSQL z Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

// Tworzenie instancji Prisma Client z adapterem
const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

// W środowisku deweloperskim zapisujemy instancję w globalThis, aby uniknąć tworzenia wielu połączeń
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

