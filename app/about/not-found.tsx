import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <main className="text-center mt-12">
        <h1>Nie znaleziono strony o sklepie</h1>
        <p>Strona o sklepie, której szukasz, nie istnieje.</p>
        <p>
          <Link href="/about" className="text-text underline hover:text-accent">Wróć do strony o sklepie</Link> lub{" "}
          <Link href="/" className="text-text underline hover:text-accent">wróć na stronę główną</Link>.
        </p>
      </main>
    </div>
  );
}

