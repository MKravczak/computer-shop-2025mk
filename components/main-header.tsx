import Link from 'next/link';
import Image from 'next/image';
import NavLink from './nav-link';

export default function MainHeader() {
  return (
    <header className="bg-primary py-4 mb-8">
      <nav className="w-[90%] max-w-4xl mx-auto flex justify-between items-center md:flex-col md:gap-4">
        <div className="font-sans text-2xl rounded-sm">
          <Link href="/" className="inline-block no-underline transition-opacity duration-300 hover:opacity-80">
            <Image
              src="/politechnika-krakowska-logo.svg"
              alt="Politechnika Krakowska logo"
              width={60}
              height={60}
              priority
              className="block"
            />
          </Link>
        </div>
        <ul className="flex gap-12 list-none m-0 p-0 font-bold md:flex-wrap md:justify-center md:gap-6">
          <li className="md:px-6">
            <NavLink href="/product-list">Lista produktów</NavLink>
          </li>
          <li className="md:px-6">
            <NavLink href="/basket">Koszyk</NavLink>
          </li>
          <li className="md:px-6">
            <NavLink href="/order-history">Historia zakupów</NavLink>
          </li>
          <li className="md:px-6">
            <NavLink href="/about">O sklepie</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

