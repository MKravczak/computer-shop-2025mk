import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import styles from './page.module.css';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ 'product-id': string }>;
}) {
  const { 'product-id': productId } = await params;
  const productIdNumber = parseInt(productId, 10);

  if (isNaN(productIdNumber)) {
    notFound();
  }

  const product = getProductById(productIdNumber);

  if (!product) {
    notFound();
  }

  return (
    <div id="page">
      <Link href="/product-list" className={styles.backLink}>
        ← Wróć do listy produktów
      </Link>

      <div className={styles.productDetail}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image || '/images/products/placeholder.svg'}
            alt={product.name}
            width={400}
            height={400}
            className={styles.productImage}
            priority
          />
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          
          <div className={styles.productMeta}>
            <span className={styles.productCode}>Kod: {product.code}</span>
            <span className={styles.productType}>{product.type}</span>
          </div>

          <div className={styles.productDescription}>
            <h2>Opis</h2>
            <p>{product.description}</p>
          </div>

          <div className={styles.productDetails}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Cena:</span>
              <span className={styles.detailValue}>{product.price.toFixed(2)} zł</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Ilość na stanie:</span>
              <span className={styles.detailValue}>{product.amount}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Data dodania:</span>
              <span className={styles.detailValue}>{product.date}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>ID produktu:</span>
              <span className={styles.detailValue}>{product.id}</span>
            </div>
          </div>

          <div className={styles.availability}>
            {product.amount > 0 ? (
              <span className={styles.inStock}>✓ Dostępny</span>
            ) : (
              <span className={styles.outOfStock}>✗ Niedostępny</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

