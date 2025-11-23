"use client";

import Link from 'next/link';
import type { Product } from '@/lib/products';
import { getAllProducts } from '@/lib/products';

// Mapowanie kategorii na slugi URL
const CATEGORIES: { label: string; slug: string; type: Product['type'] }[] = [
  { label: 'Procesory', slug: 'procesor', type: 'procesor' },
  { label: 'Karty graficzne', slug: 'gpu', type: 'karta graficzna' },
  { label: 'Pamięci RAM', slug: 'ram', type: 'pamięć ram' },
  { label: 'Dyski', slug: 'dysk', type: 'dysk' },
];

export default function ProductList() {
  const products = getAllProducts();

  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <h2 className="mb-8">Lista produktów</h2>

      <div className="mb-8">
        <h3 className="text-xl mb-4">Wybierz kategorię:</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
          {CATEGORIES.map((category) => {
            const categoryProducts = products.filter(p => p.type === category.type);
            return (
              <Link
                key={category.slug}
                href={`/product-list/${category.slug}`}
                className="bg-primary p-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] block no-underline text-inherit"
              >
                <h4 className="text-lg font-semibold mb-2 text-text">
                  {category.label}
                </h4>
                <p className="text-text/80 text-sm">
                  {categoryProducts.length} produktów
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mb-4 text-text/80 text-sm">
        Wszystkich produktów: {products.length}
      </div>
    </div>
  );
}
