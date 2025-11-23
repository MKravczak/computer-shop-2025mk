import Link from 'next/link';
import './footer.css';

export default function Footer() {
  const currentDate = new Date().toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()} Computer Shop 2025mk | Autor: MK
      </p>
      <p>Data: {currentDate}</p>
      <p>
        <Link href="https://www.pk.edu.pl" target="_blank" rel="noopener noreferrer">
          Politechnika Krakowska im. Tadeusza Kościuszki
        </Link>
      </p>
    </footer>
  );
}

