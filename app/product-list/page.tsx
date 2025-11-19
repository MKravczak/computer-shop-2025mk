import Image from 'next/image';
import type { Product } from '@/lib/products';
import {
  getAllProductsAlphabetically,
  getAllProductsByDate,
  getProductsInStock,
  getProductsOutOfStock,
  getProductsByCategory,
  getProductById,
} from '@/lib/products';
import styles from './page.module.css';

const CATEGORY_SECTIONS: { label: string; value: Product['type'] }[] = [
  { label: 'Procesory', value: 'procesor' },
  { label: 'Karty graficzne', value: 'karta graficzna' },
  { label: 'Pamięci RAM', value: 'pamięć ram' },
  { label: 'Dyski', value: 'dysk' },
];

const HIGHLIGHT_COUNT = 12;
const FEATURED_PRODUCT_ID = 1;

export default function ProductList() {
  const allAlphabetically = getAllProductsAlphabetically();
  const newest = getAllProductsByDate().slice(0, HIGHLIGHT_COUNT);
  const inStock = getProductsInStock().slice(0, HIGHLIGHT_COUNT);
  const outOfStock = getProductsOutOfStock().slice(0, HIGHLIGHT_COUNT);
  const featuredProduct = getProductById(FEATURED_PRODUCT_ID);
  const categories = CATEGORY_SECTIONS.map((category) => ({
    ...category,
    products: getProductsByCategory(category.value).slice(0, HIGHLIGHT_COUNT),
  }));

  return (
    <div id="page">
      <h2 className={styles.title}>Lista produktów</h2>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Wszystkie produkty (alfabetycznie)</h3>
          <span>{allAlphabetically.length} pozycji</span>
        </div>
        <ProductGrid products={allAlphabetically} emptyLabel="Brak produktów" />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Najnowsze produkty</h3>
          <span>Ostatnio dodane</span>
        </div>
        <ProductGrid products={newest} emptyLabel="Brak nowych produktów" />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Produkty dostępne od ręki</h3>
          <span>Wyświetlamy {inStock.length} pozycji</span>
        </div>
        <ProductGrid products={inStock} emptyLabel="Brak produktów na stanie" />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Produkty chwilowo niedostępne</h3>
          <span>Wyświetlamy {outOfStock.length} pozycji</span>
        </div>
        <ProductGrid
          products={outOfStock}
          emptyLabel="Wszystkie produkty są dostępne"
        />
      </section>

      {categories.map(({ label, products }) => (
        <section className={styles.section} key={label}>
          <div className={styles.sectionHeader}>
            <h3>{label}</h3>
            <span>{products.length} produktów</span>
          </div>
          <ProductGrid
            products={products}
            emptyLabel={`Brak produktów w kategorii ${label.toLowerCase()}`}
          />
        </section>
      ))}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Produkt o ID: {FEATURED_PRODUCT_ID}</h3>
          <span>Wyświetlamy dane testowe</span>
        </div>
        {featuredProduct ? (
          <ProductGrid
            products={[featuredProduct]}
            emptyLabel="Brak danych o tym produkcie"
          />
        ) : (
          <p className={styles.placeholder}>
            Nie znaleziono produktu o ID {FEATURED_PRODUCT_ID}.
          </p>
        )}
      </section>
    </div>
  );
}

function ProductGrid({
  products,
  emptyLabel,
}: {
  products: Product[];
  emptyLabel: string;
}) {
  if (!products.length) {
    return <p className={styles.placeholder}>{emptyLabel}</p>;
  }

  return (
    <ul className={styles.grid}>
      {products.map((product) => (
        <li className={styles.card} key={product.id}>
          <div className={styles.thumb}>
            <Image
              src="/images/products/placeholder.svg"
              alt={`Miniatura produktu ${product.name}`}
              width={80}
              height={80}
              priority={false}
            />
          </div>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>{product.type}</span>
            <span className={styles.code}>{product.code}</span>
          </div>
          <h4 className={styles.titleSmall}>{product.name}</h4>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.meta}>
            <span>Cena: {product.price.toFixed(2)} zł</span>
            <span>Stan: {product.amount}</span>
          </div>
          <span className={styles.date}>Dodano: {product.date}</span>
        </li>
      ))}
    </ul>
  );
}

