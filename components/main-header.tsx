import Link from 'next/link';
import Image from 'next/image';
import './main-header.css';

export default function MainHeader() {
  return (
    <header id="main-header">
      <nav>
        <div id="logo">
          <Link href="/">
            <Image
              src="/politechnika-krakowska-logo.svg"
              alt="Politechnika Krakowska logo"
              width={60}
              height={60}
              priority
            />
          </Link>
        </div>
        <ul>
          <li>
            <Link href="/product-list">Lista produktów</Link>
          </li>
          <li>
            <Link href="/basket">Koszyk</Link>
          </li>
          <li>
            <Link href="/order-history">Historia zakupów</Link>
          </li>
          <li>
            <Link href="/about">O sklepie</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

