import { getCartTotal, getCartWithItems, getAllUsersWithCarts, transferCart } from "@/lib/actions/cart";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInButton, SignOutButton } from "@/components/auth-components";
import { TransferCartForm } from "@/components/transfer-cart-form";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(value);

export default async function Basket() {
  // Pobieramy sesję użytkownika z Auth.js
  const session = await auth();

  // Jeśli użytkownik nie jest zalogowany, middleware powinien przekierować,
  // ale na wypadek gdyby middleware nie zadziałał, sprawdzamy tutaj
  if (!session?.user?.id) {
    redirect("/api/auth/signin?callbackUrl=/basket");
  }

  // Używamy ID użytkownika z sesji (konwersja na string, bo getCartWithItems przyjmuje string)
  const userId = String(session.user.id);

  const cart = await getCartWithItems(userId);
  const total = await getCartTotal(userId);
  const usersWithCarts = await getAllUsersWithCarts();

  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="mb-0">Koszyk</h2>
        <div className="flex gap-4 items-center">
          {/* Informacje o zalogowanym użytkowniku */}
          {session?.user && (
            <div className="text-sm text-gray-300">
              <p className="font-semibold">{session.user.email}</p>
              {session.user.name && (
                <p className="text-xs text-gray-400">{session.user.name}</p>
              )}
            </div>
          )}
          {/* Przycisk wylogowania */}
          <SignOutButton />
        </div>
      </div>

      {/* Formularz transferu koszyka */}
      <div className="mb-6 bg-primary p-4 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold">Transfer koszyka</h3>
        <TransferCartForm users={usersWithCarts} currentUserId={userId} />
      </div>

      {/* Zawartość koszyka */}
      {!cart || cart.cartItems.length === 0 ? (
        <div className="bg-primary p-8 rounded-lg">
          <p className="text-center">Twój koszyk jest pusty.</p>
        </div>
      ) : (
        <div className="bg-primary p-6 rounded-lg space-y-4">
          <ul className="space-y-4">
            {cart.cartItems.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 items-center border-b border-gray-500 pb-4"
              >
                <div className="w-20 h-20 flex-shrink-0 bg-gray-700 rounded overflow-hidden">
                  {/* Placeholder – brak obrazów produktów w schemacie DB */}
                  <img
                    src="/images/products/placeholder.svg"
                    alt={item.product?.name ?? "produkt"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.product?.name}</p>
                  <p className="text-sm text-gray-200">
                    Cena: {formatPrice(Number(item.product?.price ?? 0))}
                  </p>
                  <p className="text-sm text-gray-200">Ilość: {item.quantity}</p>
                </div>
                <div className="font-semibold">
                  {formatPrice(Number(item.product?.price ?? 0) * item.quantity)}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center pt-4 border-t border-gray-500">
            <span className="text-lg font-semibold">Suma:</span>
            <span className="text-xl font-bold">{formatPrice(total)}</span>
          </div>

          {/* Przycisk "Przejdź do kasy" */}
          <div className="pt-4">
            <button
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              disabled
              title="Funkcjonalność w przygotowaniu"
            >
              Przejdź do kasy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
