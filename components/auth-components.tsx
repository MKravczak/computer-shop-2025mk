"use client";

import { signIn, signOut } from "next-auth/react";

/**
 * Komponent przycisku do logowania się przez GitHub
 */
export function SignInButton() {
  return (
    <button
      onClick={() => signIn("github")}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Zaloguj się przez GitHub
    </button>
  );
}

/**
 * Komponent przycisku do wylogowania się
 */
export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Wyloguj się
    </button>
  );
}

