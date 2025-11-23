import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="text-center mt-12">
      <h1>Nie znaleziono strony</h1>
      <p>Strona, której szukasz, nie istnieje.</p>
      <p>Sprawdź adres URL lub <Link href="/" className="text-text underline hover:text-accent">wróć na stronę główną</Link>.</p>
    </main>
  );
}

