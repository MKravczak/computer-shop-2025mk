import styles from './page.module.css';

export default function About() {
  return (
    <div id="page">
      <h2 className={styles.title}>O sklepie</h2>
      <div className={styles.content}>
        <p>
          Witamy w Computer Shop 2025mk - Twoim zaufanym sklepie z częściami komputerowymi.
        </p>
        <p>
          Oferujemy szeroki wybór wysokiej jakości produktów: procesory, karty graficzne,
          pamięci RAM oraz dyski. Wszystkie nasze produkty są starannie wyselekcjonowane
          i pochodzą od sprawdzonych producentów.
        </p>
        <p>
          Nasz zespół składa się z doświadczonych specjalistów, którzy chętnie pomogą
          w wyborze odpowiedniego sprzętu dla Twoich potrzeb.
        </p>
      </div>
    </div>
  );
}

