import { PrismaClient } from "../lib/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import productsData from "../data/products.json";

// Konfiguracja połączenia z bazą danych PostgreSQL
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");

  // ============================================================================
  // Czyszczenie istniejących produktów
  // ============================================================================
  console.log("🧹 Cleaning existing products...");
  await prisma.product.deleteMany({});

  // ============================================================================
  // Tworzenie produktów z pliku JSON
  // ============================================================================
  console.log("📦 Creating products from JSON...");

  // Mapowanie danych z JSON na model Prisma
  const productsToCreate = productsData.map((product) => ({
    name: product.name,
    description: product.description,
    price: product.price,
    inStock: product.amount > 0, // Jeśli amount > 0, to produkt dostępny
  }));

  await prisma.product.createMany({
    data: productsToCreate,
  });

  const productsCount = await prisma.product.count();
  console.log(`✅ Created ${productsCount} products from JSON`);

  // ============================================================================
  // Podsumowanie
  // ============================================================================
  console.log("\n✨ Seeding completed successfully!");
  console.log("📊 Database summary:");
  console.log(`   - Products: ${productsCount}`);
}

// Uruchomienie funkcji main z obsługą błędów
main()
  .then(() => {
    console.log("🎉 Seeding process finished!");
  })
  .catch((e) => {
    console.error("❌ Error during seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
