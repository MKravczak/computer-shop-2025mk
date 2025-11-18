import styles from './page.module.css';

export default function Basket() {
  return (
    <div id="page">
      <h2 className={styles.title}>Koszyk</h2>
      <div className={styles.content}>
        <p>Twój koszyk jest pusty.</p>
      </div>
    </div>
  );
}

