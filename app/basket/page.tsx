import { getCartTotal, getCartWithItems } from "@/lib/actions/cart";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    minimumFractionDigits: 2,
  }).format(value);

export default async function Basket() {
  const userId = process.env.USER_ID;

  if (!userId) {
    return (
      <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
        <h2 className="mb-8">Koszyk</h2>
        <div className="bg-primary p-8 rounded-lg">
          <p className="text-center">
            Brak USER_ID w zmiennych środowiskowych.
          </p>
        </div>
      </div>
    );
  }

  const cart = await getCartWithItems(userId);
  const total = await getCartTotal(userId);

  if (!cart || cart.cartItems.length === 0) {
    return (
      <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
        <h2 className="mb-8">Koszyk</h2>
        <div className="bg-primary p-8 rounded-lg">
          <p className="text-center">Twój koszyk jest pusty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <h2 className="mb-8">Koszyk</h2>

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

        <div className="flex justify-between items-center pt-4">
          <span className="text-lg font-semibold">Suma:</span>
          <span className="text-xl font-bold">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

