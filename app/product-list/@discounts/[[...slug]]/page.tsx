import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { getAllProducts } from '@/lib/products';

// Funkcja do losowego wyboru 3 produktów
function getRandomProducts(products: Product[], count: number = 3): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, products.length));
}

// Funkcja do obliczenia ceny z 10% zniżką
function getDiscountedPrice(originalPrice: number): number {
  return originalPrice * 0.9;
}

export default async function DiscountsSlot({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const allProducts = getAllProducts();
  const discountedProducts = getRandomProducts(allProducts, 3);

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold text-text">Promocje</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 md:flex-col">
        {discountedProducts.map((product) => {
          const originalPrice = product.price;
          const discountedPrice = getDiscountedPrice(originalPrice);
          const categorySlug = getCategorySlug(product.type);

          return (
            <Link
              key={product.id}
              href={`/product-list/${categorySlug}/${product.id}`}
              className="flex-shrink-0 w-80 bg-primary rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] no-underline text-inherit md:w-full"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-center">
                  <Image
                    src="/images/products/placeholder.svg"
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-contain rounded-lg bg-primary/50 p-2"
                  />
                </div>
                <h3 className="text-lg font-semibold text-text line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-text/60 line-through text-sm">
                      {originalPrice.toFixed(2)} zł
                    </span>
                    <span className="text-green-400 font-bold text-lg">
                      {discountedPrice.toFixed(2)} zł
                    </span>
                  </div>
                  <span className="text-xs text-text/80">
                    Oszczędzasz: {(originalPrice - discountedPrice).toFixed(2)} zł
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="py-1 px-2 rounded-full bg-text-dark/20 capitalize text-xs">
                    {product.type}
                  </span>
                  {product.amount > 0 ? (
                    <span className="text-green-400 text-xs">Dostępny</span>
                  ) : (
                    <span className="text-red-400 text-xs">Niedostępny</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// Funkcja pomocnicza do mapowania typu na slug
function getCategorySlug(type: Product['type']): string {
  const TYPE_TO_SLUG: Record<Product['type'], string> = {
    'procesor': 'procesor',
    'karta graficzna': 'gpu',
    'pamięć ram': 'ram',
    'dysk': 'dysk',
  };
  return TYPE_TO_SLUG[type];
}

