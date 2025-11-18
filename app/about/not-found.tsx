import Link from 'next/link';

export default function NotFound() {
  return (
    <div id="page">
      <main className="error">
        <h1>Nie znaleziono strony o sklepie</h1>
        <p>Strona o sklepie, której szukasz, nie istnieje.</p>
        <p><Link href="/about">Wróć do strony o sklepie</Link> lub <Link href="/">wróć na stronę główną</Link>.</p>
      </main>
    </div>
  );
}

