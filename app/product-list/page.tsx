"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import {
  getAllProductsAlphabetically,
  getAllProductsByDate,
  getAllProducts,
  getProductsInStock,
} from '@/lib/products';

export default function ProductList() {
  const [sortByNewest, setSortByNewest] = useState(false);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Pobranie wszystkich produktów
  let products: Product[] = getAllProducts();

  // Filtrowanie po dostępności
  if (onlyAvailable) {
    products = getProductsInStock();
  }

  // Sortowanie
  if (sortByNewest) {
    products = getAllProductsByDate();
    if (onlyAvailable) {
      products = products.filter(product => product.amount > 0);
    }
  } else {
    products = getAllProductsAlphabetically();
    if (onlyAvailable) {
      products = products.filter(product => product.amount > 0);
    }
  }

  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <h2 className="mb-8">Lista produktów</h2>

      <div className="flex gap-6 mb-6 p-4 bg-primary rounded-lg md:flex-col md:gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-text text-base">
          <input
            type="checkbox"
            checked={sortByNewest}
            onChange={(e) => setSortByNewest(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <span>Najnowsze</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-text text-base">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <span>Tylko dostępne</span>
        </label>
      </div>

      <div className="mb-4 text-text/80 text-sm">
        Wyświetlono: {products.length} produktów
      </div>

      {products.length === 0 ? (
        <p className="opacity-80 text-base">Brak produktów do wyświetlenia.</p>
      ) : (
        <ul className="list-none p-0 m-0 flex flex-col gap-4">
          {products.map((product) => (
            <li 
              key={product.id} 
              className="bg-primary rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            >
              <Link 
                href={`/product-list/${product.id}`} 
                className="block no-underline text-inherit p-6"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold m-0 text-text">
                    {product.name}
                  </h3>
                  <div className="flex gap-6 flex-wrap text-base md:flex-col md:gap-2">
                    <span className="py-1 px-3 rounded-full bg-text-dark/20 capitalize">
                      {product.type}
                    </span>
                    <span className="text-text font-medium">
                      Ilość: {product.amount}
                    </span>
                    <span className="text-accent font-bold">
                      Cena: {product.price.toFixed(2)} zł
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
