"use server";

import prisma from "@/lib/prisma";

/**
 * Pobiera koszyk użytkownika wraz z wszystkimi powiązanymi danymi
 * @param userId - ID użytkownika (string)
 * @returns Koszyk z pozycjami i produktami lub null jeśli nie istnieje
 */
export async function getCartWithItems(userId: string) {
  const cart = await prisma.cart.findFirst({
    where: {
      userId: parseInt(userId, 10), // Konwersja string na number
    },
    include: {
      cartItems: {
        include: {
          product: true, // Dołączamy dane produktu dla każdej pozycji
        },
        orderBy: {
          createdAt: "desc", // Sortowanie: najnowsze pozycje na górze
        },
      },
    },
  });

  return cart;
}

/**
 * Oblicza całkowitą wartość koszyka użytkownika
 * @param userId - ID użytkownika (string)
 * @returns Całkowita wartość koszyka (number) lub 0 jeśli koszyk nie istnieje
 */
export async function getCartTotal(userId: string) {
  // Pobieramy koszyk z wszystkimi pozycjami i produktami
  const cart = await getCartWithItems(userId);

  // Jeśli koszyk nie istnieje, zwracamy 0
  if (!cart) {
    return 0;
  }

  // Obliczamy sumę wartości wszystkich pozycji w koszyku
  const total = cart.cartItems.reduce((sum, item) => {
    // Cena produktu * ilość pozycji (defensywnie: brak produktu -> 0)
    const price = Number(item.product?.price ?? 0);
    const itemTotal = price * item.quantity;
    return sum + itemTotal;
  }, 0); // Wartość początkowa: 0

  return total;
}

/**
 * Pobiera listę wszystkich użytkowników wraz z ich koszykami
 * @returns Lista użytkowników z informacjami o koszykach
 */
export async function getAllUsersWithCarts() {
  const users = await prisma.user.findMany({
    include: {
      carts: {
        include: {
          cartItems: {
            include: {
              product: true,
            },
          },
        },
      },
    },
    orderBy: {
      email: "asc", // Sortowanie alfabetyczne po emailu
    },
  });

  // Zwracamy użytkowników z informacją o liczbie produktów w koszyku
  return users.map((user) => {
    const totalItems = user.carts.reduce(
      (sum, cart) =>
        sum + cart.cartItems.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      cartCount: totalItems, // Liczba produktów w koszyku
      hasCart: user.carts.length > 0,
    };
  });
}

/**
 * Przenosi produkty z koszyka jednego użytkownika do koszyka drugiego
 * @param fromUserId - ID użytkownika źródłowego (string)
 * @param toUserId - ID użytkownika docelowego (string)
 * @returns Informacja o powodzeniu operacji
 */
export async function transferCart(fromUserId: string, toUserId: string) {
  const fromId = parseInt(fromUserId, 10);
  const toId = parseInt(toUserId, 10);

  // Walidacja: nie można przenieść do tego samego użytkownika
  if (fromId === toId) {
    throw new Error("Nie można przenieść koszyka do tego samego użytkownika");
  }

  // Pobieramy koszyk źródłowy
  const fromCart = await prisma.cart.findFirst({
    where: { userId: fromId },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // Jeśli koszyk źródłowy nie istnieje lub jest pusty, nie ma co przenosić
  if (!fromCart || fromCart.cartItems.length === 0) {
    return { success: true, message: "Koszyk źródłowy jest pusty" };
  }

  // Pobieramy lub tworzymy koszyk docelowy
  let toCart = await prisma.cart.findFirst({
    where: { userId: toId },
    include: {
      cartItems: true,
    },
  });

  if (!toCart) {
    // Tworzymy nowy koszyk dla użytkownika docelowego
    toCart = await prisma.cart.create({
      data: {
        userId: toId,
      },
      include: {
        cartItems: true,
      },
    });
  }

  // Przenosimy produkty z koszyka źródłowego do docelowego
  for (const item of fromCart.cartItems) {
    // Sprawdzamy czy produkt już istnieje w koszyku docelowym
    const existingItem = toCart.cartItems.find(
      (ci) => ci.productId === item.productId
    );

    if (existingItem) {
      // Jeśli produkt już istnieje, zwiększamy ilość
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + item.quantity,
        },
      });
    } else {
      // Jeśli produkt nie istnieje, tworzymy nową pozycję
      await prisma.cartItem.create({
        data: {
          cartId: toCart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }

  // Usuwamy koszyk źródłowy (cascade usunie wszystkie CartItem)
  await prisma.cart.delete({
    where: { id: fromCart.id },
  });

  return {
    success: true,
    message: `Koszyk został przeniesiony z użytkownika ${fromId} do ${toId}`,
  };
}

