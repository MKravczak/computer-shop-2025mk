import type { Metadata } from "next";
import Link from "next/link";
import "./global.css";

export const metadata: Metadata = {
  title: "Computer Shop 2025mk",
  description: "Sklep komputerowy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>
        <header>
          <nav>
            <div id="logo">
              <Link href="/">Computer Shop 2025mk</Link>
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
        {children}
        <footer>
          <p>&copy; 2025 Computer Shop 2025mk. Wszystkie prawa zastrzeżone.</p>
        </footer>
      </body>
    </html>
  );
}
