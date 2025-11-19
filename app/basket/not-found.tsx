import Link from 'next/link';

export default function NotFound() {
  return (
    <div id="page">
      <main className="error">
        <h1>Nie znaleziono strony koszyka</h1>
        <p>Strona koszyka, której szukasz, nie istnieje.</p>
        <p>
          <Link href="/basket">Wróć do koszyka</Link> lub{" "}
          <Link href="/">wróć na stronę główną</Link>.
        </p>
      </main>
    </div>
  );
}

