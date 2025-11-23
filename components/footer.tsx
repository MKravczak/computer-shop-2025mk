import Link from 'next/link';

export default function Footer() {
  const currentDate = new Date().toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <footer className="bg-primary py-8 mt-16 text-center">
      <p className="my-2 text-text">
        &copy; {new Date().getFullYear()} Computer Shop 2025mk | Autor: MK
      </p>
      <p className="my-2 text-text">Data: {currentDate}</p>
      <p className="my-2 text-text">
        <Link 
          href="https://www.pk.edu.pl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text underline transition-colors duration-300 hover:text-accent"
        >
          Politechnika Krakowska im. Tadeusza Kościuszki
        </Link>
      </p>
    </footer>
  );
}

