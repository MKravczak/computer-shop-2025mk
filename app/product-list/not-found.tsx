import Link from 'next/link';

export default function NotFound() {
  return (
    <div id="page">
      <main className="error">
        <h1>Nie znaleziono strony produktów</h1>
        <p>Strona produktów, której szukasz, nie istnieje.</p>
        <p>
          <Link href="/product-list">Wróć do listy produktów</Link> lub{" "}
          <Link href="/">wróć na stronę główną</Link>.
        </p>
      </main>
    </div>
  );
}

