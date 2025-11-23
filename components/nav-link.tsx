"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({href, children}: {href: string; children: React.ReactNode}) {
  const path = usePathname();
  const isActive = path.startsWith(href);
  return (
    <Link 
      href={href} 
      className={`no-underline text-text py-2 px-4 rounded transition-colors duration-300 ${
        isActive 
          ? "bg-accent text-text-dark" 
          : "hover:bg-accent hover:text-text-dark"
      }`}
    >
      {children}
    </Link>
  );
}

