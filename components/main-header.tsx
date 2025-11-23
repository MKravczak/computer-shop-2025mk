import Link from 'next/link';
import Image from 'next/image';
import NavLink from './nav-link';
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
            <NavLink href="/product-list">Lista produktów</NavLink>
          </li>
          <li>
            <NavLink href="/basket">Koszyk</NavLink>
          </li>
          <li>
            <NavLink href="/order-history">Historia zakupów</NavLink>
          </li>
          <li>
            <NavLink href="/about">O sklepie</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

