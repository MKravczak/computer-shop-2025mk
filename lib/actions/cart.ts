"use server";

import prisma from "@/lib/prisma";

/**
 * Pobiera koszyk użytkownika wraz z wszystkimi powiązanymi danymi
 * @param userId - ID użytkownika (string)
 * @returns Koszyk z pozycjami i produktami lub null jeśli nie istnieje
 */
export async function getCartWithItems(userId: string) {
  const cart = await prisma.cart.findUnique({
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
    // Cena produktu * ilość pozycji
    const itemTotal = Number(item.product.price) * item.quantity;
    return sum + itemTotal;
  }, 0); // Wartość początkowa: 0

  return total;
}

