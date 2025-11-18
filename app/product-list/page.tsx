import {
  getAllProductsAlphabetically,
  getAllProductsByDate,
  getProductsInStock,
  getProductsOutOfStock,
  getProductsByCategory,
  getProductById,
} from '@/lib/products';
import styles from './page.module.css';

export default function ProductList() {
  // Testowanie funkcji
  const allAlphabetically = getAllProductsAlphabetically();
  const allByDate = getAllProductsByDate();
  const inStock = getProductsInStock();
  const outOfStock = getProductsOutOfStock();
  const processors = getProductsByCategory('procesor');
  const gpus = getProductsByCategory('karta graficzna');
  const ram = getProductsByCategory('pamięć ram');
  const disks = getProductsByCategory('dysk');
  const productById = getProductById(1);

  return (
    <div id="page">
      <h2 className={styles.title}>Lista produktów</h2>
      <div className={styles.stats}>
        <h3>Statystyki:</h3>
        <ul>
          <li>Wszystkich produktów: {allAlphabetically.length}</li>
          <li>Produktów na stanie: {inStock.length}</li>
          <li>Produktów wyprzedanych: {outOfStock.length}</li>
          <li>Procesorów: {processors.length}</li>
          <li>Kart graficznych: {gpus.length}</li>
          <li>Pamięci RAM: {ram.length}</li>
          <li>Dysków: {disks.length}</li>
        </ul>
      </div>
      {productById && (
        <div className={styles.productExample}>
          <h3>Przykładowy produkt (ID: 1):</h3>
          <p>Nazwa: {productById.name}</p>
          <p>Typ: {productById.type}</p>
          <p>Cena: {productById.price} zł</p>
          <p>Ilość: {productById.amount}</p>
        </div>
      )}
    </div>
  );
}

