import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <main className="text-center mt-12">
        <h1>Nie znaleziono strony historii zakupów</h1>
        <p>Strona historii zakupów, której szukasz, nie istnieje.</p>
        <p><Link href="/order-history" className="text-text underline hover:text-accent">Wróć do historii zakupów</Link>.</p>
      </main>
    </div>
  );
}

