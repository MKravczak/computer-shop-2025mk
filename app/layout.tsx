import type { Metadata } from "next";
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
        {children}
      </body>
    </html>
  );
}
