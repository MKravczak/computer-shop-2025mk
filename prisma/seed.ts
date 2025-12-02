import { PrismaClient } from "../lib/generated/prisma/client";
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
  // 1. Czyszczenie bazy danych (w odpowiedniej kolejności - relacje)
  // ============================================================================
  console.log("🧹 Cleaning existing data...");
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.cartItem.deleteMany({});
  await prisma.cart.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  // ============================================================================
  // 2. Tworzenie użytkowników
  // ============================================================================
  console.log("👤 Creating users...");
  const users = await prisma.user.createManyAndReturn({
    data: [
      {
        email: "jan.kowalski@example.com",
        name: "Jan Kowalski",
      },
      {
        email: "anna.nowak@example.com",
        name: "Anna Nowak",
      },
      {
        email: "piotr.wisniewski@example.com",
        name: "Piotr Wiśniewski",
      },
      {
        email: "maria.wojcik@example.com",
        name: "Maria Wójcik",
      },
    ],
  });
  console.log(`✅ Created ${users.length} users`);

  // ============================================================================
  // 3. Tworzenie produktów z pliku JSON
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

  // Pobierz wszystkie utworzone produkty (potrzebujemy ID)
  const allProducts = await prisma.product.findMany();
  console.log(`✅ Created ${allProducts.length} products`);

  // ============================================================================
  // 4. Tworzenie koszyka dla pierwszego użytkownika (Jan Kowalski)
  // ============================================================================
  console.log("🛒 Creating shopping cart...");

  const janCart = await prisma.cart.create({
    data: {
      userId: users[0].id,
      cartItems: {
        create: [
          {
            productId: allProducts[0].id, // AMD Ryzen 7 7800X3D
            quantity: 1,
          },
          {
            productId: allProducts[25].id, // NVIDIA GeForce RTX 4070
            quantity: 2,
          },
          {
            productId: allProducts[50].id, // Corsair Vengeance LPX DDR4 32GB
            quantity: 4,
          },
        ],
      },
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  console.log(`✅ Created cart with ${janCart.cartItems.length} items`);

  // ============================================================================
  // 5. Tworzenie zamówień (Orders) z pozycjami (OrderItems)
  // WAŻNE: Kopiujemy nazwę produktu i cenę do OrderItem (snapshot w momencie zamówienia)
  // ============================================================================
  console.log("📋 Creating orders with order items...");

  // Zamówienie 1: Jan Kowalski - DELIVERED (dostarczone)
  const order1Products = [
    { product: allProducts[0], quantity: 1 }, // AMD Ryzen 7 7800X3D
    { product: allProducts[25], quantity: 1 }, // NVIDIA GeForce RTX 4070
    { product: allProducts[75], quantity: 2 }, // Crucial MX500 1TB
  ];
  const order1Total = order1Products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  await prisma.order.create({
    data: {
      userId: users[0].id,
      orderDate: new Date("2024-11-15T10:30:00Z"),
      status: "DELIVERED",
      totalAmount: order1Total,
      orderItems: {
        create: order1Products.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          productName: item.product.name, // Snapshot nazwy
          productPrice: item.product.price, // Snapshot ceny
          subtotal: item.product.price * item.quantity,
        })),
      },
    },
  });

  // Zamówienie 2: Anna Nowak - SHIPPED (wysłane)
  const order2Products = [
    { product: allProducts[1], quantity: 1 }, // Intel Core i7-13700K
    { product: allProducts[26], quantity: 1 }, // NVIDIA GeForce RTX 3090
    { product: allProducts[51], quantity: 2 }, // Corsair Dominator DDR5 64GB
    { product: allProducts[76], quantity: 1 }, // Toshiba P300 2TB
  ];
  const order2Total = order2Products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  await prisma.order.create({
    data: {
      userId: users[1].id,
      orderDate: new Date("2024-11-20T14:15:00Z"),
      status: "SHIPPED",
      totalAmount: order2Total,
      orderItems: {
        create: order2Products.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          productName: item.product.name,
          productPrice: item.product.price,
          subtotal: item.product.price * item.quantity,
        })),
      },
    },
  });

  // Zamówienie 3: Piotr Wiśniewski - PROCESSING (w trakcie realizacji)
  const order3Products = [
    { product: allProducts[3], quantity: 1 }, // AMD Ryzen 9 7950X
    { product: allProducts[28], quantity: 1 }, // AMD Radeon RX 7800 XT
    { product: allProducts[55], quantity: 4 }, // Kingston Fury Beast DDR5 16GB
  ];
  const order3Total = order3Products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  await prisma.order.create({
    data: {
      userId: users[2].id,
      orderDate: new Date("2024-11-25T09:00:00Z"),
      status: "PROCESSING",
      totalAmount: order3Total,
      orderItems: {
        create: order3Products.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          productName: item.product.name,
          productPrice: item.product.price,
          subtotal: item.product.price * item.quantity,
        })),
      },
    },
  });

  // Zamówienie 4: Maria Wójcik - PENDING (oczekujące)
  const order4Products = [
    { product: allProducts[10], quantity: 2 }, // AMD Ryzen 7 7700X
    { product: allProducts[30], quantity: 1 }, // NVIDIA GeForce RTX 4060
    { product: allProducts[60], quantity: 2 }, // G.Skill Trident Z5 DDR5 32GB
    { product: allProducts[80], quantity: 1 }, // WD Black SN850X 2TB
  ];
  const order4Total = order4Products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  await prisma.order.create({
    data: {
      userId: users[3].id,
      orderDate: new Date("2024-11-28T16:45:00Z"),
      status: "PENDING",
      totalAmount: order4Total,
      orderItems: {
        create: order4Products.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          productName: item.product.name,
          productPrice: item.product.price,
          subtotal: item.product.price * item.quantity,
        })),
      },
    },
  });

  // Zamówienie 5: Jan Kowalski - CANCELLED (anulowane) - dodatkowe zamówienie
  const order5Products = [
    { product: allProducts[15], quantity: 1 }, // Intel Core i9-14900K
    { product: allProducts[40], quantity: 1 }, // AMD Radeon RX 7700 XT
  ];
  const order5Total = order5Products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  await prisma.order.create({
    data: {
      userId: users[0].id,
      orderDate: new Date("2024-11-10T12:00:00Z"),
      status: "CANCELLED",
      totalAmount: order5Total,
      orderItems: {
        create: order5Products.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          productName: item.product.name,
          productPrice: item.product.price,
          subtotal: item.product.price * item.quantity,
        })),
      },
    },
  });

  const ordersCount = await prisma.order.count();
  console.log(`✅ Created ${ordersCount} orders with order items`);

  // ============================================================================
  // Podsumowanie
  // ============================================================================
  console.log("\n✨ Seeding completed successfully!");
  console.log("📊 Database summary:");
  console.log(`   - Users: ${await prisma.user.count()}`);
  console.log(`   - Products: ${await prisma.product.count()}`);
  console.log(`   - Carts: ${await prisma.cart.count()}`);
  console.log(`   - Cart Items: ${await prisma.cartItem.count()}`);
  console.log(`   - Orders: ${await prisma.order.count()}`);
  console.log(`   - Order Items: ${await prisma.orderItem.count()}`);
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
