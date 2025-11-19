import Link from 'next/link';

export default function NotFound() {
  return (
    <div id="page">
      <main className="error">
        <h1>Nie znaleziono strony historii zakupów</h1>
        <p>Strona historii zakupów, której szukasz, nie istnieje.</p>
        <p><Link href="/order-history">Wróć do historii zakupów</Link>.</p>
      </main>
    </div>
  );
}

