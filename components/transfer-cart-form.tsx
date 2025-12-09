"use client";

import { useState, useTransition } from "react";
import { transferCart } from "@/lib/actions/cart";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  name: string | null;
  cartCount: number;
  hasCart: boolean;
}

interface TransferCartFormProps {
  users: User[];
  currentUserId: string;
}

/**
 * Formularz do transferu koszyka między użytkownikami
 */
export function TransferCartForm({ users, currentUserId }: TransferCartFormProps) {
  const router = useRouter();
  const [fromUserId, setFromUserId] = useState("");
  const [toUserId, setToUserId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Walidacja: nie można przenieść do tego samego użytkownika
    if (fromUserId === toUserId) {
      setError("Nie można przenieść koszyka do tego samego użytkownika");
      return;
    }

    if (!fromUserId || !toUserId) {
      setError("Wybierz obu użytkowników");
      return;
    }

    startTransition(async () => {
      try {
        await transferCart(fromUserId, toUserId);
        // Odświeżenie strony po transferze
        router.refresh();
        // Reset formularza
        setFromUserId("");
        setToUserId("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wystąpił błąd podczas transferu");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select: Od kogo */}
        <div>
          <label htmlFor="fromUser" className="block text-sm font-medium mb-2">
            Od kogo:
          </label>
          <select
            id="fromUser"
            value={fromUserId}
            onChange={(e) => setFromUserId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={isPending}
          >
            <option value="">Wybierz użytkownika...</option>
            {users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.email} {user.name && `(${user.name})`} - {user.cartCount} produktów
              </option>
            ))}
          </select>
        </div>

        {/* Select: Do kogo */}
        <div>
          <label htmlFor="toUser" className="block text-sm font-medium mb-2">
            Do kogo:
          </label>
          <select
            id="toUser"
            value={toUserId}
            onChange={(e) => setToUserId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            disabled={isPending}
          >
            <option value="">Wybierz użytkownika...</option>
            {users.map((user) => (
              <option key={user.id} value={String(user.id)}>
                {user.email} {user.name && `(${user.name})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Komunikat błędu */}
      {error && (
        <div className="bg-red-600 text-white px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* Przycisk submit */}
      <button
        type="submit"
        disabled={isPending || !fromUserId || !toUserId}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {isPending ? "Przenoszenie..." : "Przenieś koszyk"}
      </button>
    </form>
  );
}

