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
import styles from './page.module.css';

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
    <div id="page">
      <h2 className={styles.title}>Lista produktów</h2>

      <div className={styles.filters}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={sortByNewest}
            onChange={(e) => setSortByNewest(e.target.checked)}
          />
          <span>Najnowsze</span>
        </label>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          <span>Tylko dostępne</span>
        </label>
      </div>

      <div className={styles.count}>
        Wyświetlono: {products.length} produktów
      </div>

      {products.length === 0 ? (
        <p className={styles.placeholder}>Brak produktów do wyświetlenia.</p>
      ) : (
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id} className={styles.listItem}>
              <Link href={`/product-list/${product.id}`} className={styles.productLink}>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productDetails}>
                    <span className={styles.productType}>{product.type}</span>
                    <span className={styles.productAmount}>
                      Ilość: {product.amount}
                    </span>
                    <span className={styles.productPrice}>
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
