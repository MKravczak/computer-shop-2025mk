[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/0LCD-BK0)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=21739414)

# Computer Shop - Next.js Application

Aplikacja sklepu komputerowego zbudowana w Next.js 16 z wykorzystaniem:
- **Prisma ORM** - zarządzanie bazą danych PostgreSQL
- **Auth.js (NextAuth)** - autentykacja przez GitHub OAuth
- **Docker** - konteneryzacja bazy danych PostgreSQL
- **TypeScript** - typowanie statyczne
- **Tailwind CSS** - stylowanie

## 🚀 Wdrożenie na Vercel

Aplikacja jest dostępna pod adresem: **[LINK DO APLIKACJI NA VERCEL]**

> **Uwaga:** Link zostanie zaktualizowany po wdrożeniu na Vercel.

## 📋 Wymagania

- Node.js 18+ 
- Docker Desktop (dla lokalnej bazy danych)
- Konto GitHub (dla autentykacji OAuth)

## 🛠️ Instalacja lokalna

1. **Sklonuj repozytorium:**
   ```bash
   git clone https://github.com/MKravczak/computer-shop-2025mk.git
   cd computer-shop-2025mk
   ```

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Skonfiguruj zmienne środowiskowe:**
   ```bash
   cp env.template .env
   ```
   Edytuj `.env` i uzupełnij:
   - `DATABASE_URL` - adres bazy danych PostgreSQL
   - `AUTH_SECRET` - wygeneruj przez `npx auth secret --copy`
   - `CLIENT_ID` i `CLIENT_SECRET` - z GitHub OAuth App

4. **Uruchom bazę danych w Docker:**
   ```bash
   docker-compose up -d
   ```

5. **Zastosuj migracje i seed:**
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   npx prisma db seed
   ```

6. **Uruchom serwer deweloperski:**
   ```bash
   npm run dev
   ```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📦 Struktura projektu

```
computer-shop-2025mk/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (Auth.js)
│   ├── basket/            # Strona koszyka
│   └── product-list/      # Lista produktów
├── components/            # Komponenty React
│   ├── auth-components.tsx
│   └── transfer-cart-form.tsx
├── lib/                   # Biblioteki i utilities
│   ├── actions/           # Server Actions
│   ├── auth.ts            # Konfiguracja Auth.js
│   └── prisma.ts          # Singleton Prisma Client
├── prisma/                # Prisma schema i migracje
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── docker-compose.yml      # Konfiguracja PostgreSQL
```

## 🔐 Konfiguracja autentykacji

1. Utwórz GitHub OAuth App: https://github.com/settings/developers
2. Ustaw **Authorization callback URL** na:
   - Lokalnie: `http://localhost:3000/api/auth/callback/github`
   - Vercel: `https://twoja-aplikacja.vercel.app/api/auth/callback/github`
3. Skopiuj `Client ID` i `Client Secret` do `.env`

## 🗄️ Baza danych

Aplikacja używa PostgreSQL w Dockerze. Schemat bazy danych zawiera:
- **User** - użytkownicy (zintegrowani z Auth.js)
- **Product** - produkty sklepu
- **Cart / CartItem** - koszyk zakupów
- **Order / OrderItem** - zamówienia
- **Account / Session / VerificationToken** - modele Auth.js

## 📚 Funkcjonalności

- ✅ Autentykacja przez GitHub OAuth
- ✅ Zarządzanie koszykiem zakupów
- ✅ Transfer koszyka między użytkownikami
- ✅ Historia zamówień
- ✅ Lista produktów z filtrowaniem

## 🚢 Wdrożenie na Vercel

1. **Sforkuj repozytorium** na swoje prywatne konto GitHub
2. **Połącz Vercel z repozytorium:**
   - Zaloguj się na [Vercel](https://vercel.com)
   - Importuj projekt z GitHub
   - Wybierz sforkowane repozytorium

3. **Skonfiguruj zmienne środowiskowe w Vercel:**
   - `DATABASE_URL` - adres bazy danych (np. z Vercel Postgres lub zewnętrznej)
   - `AUTH_SECRET` - wygeneruj przez `npx auth secret --copy`
   - `CLIENT_ID` - z GitHub OAuth App (dla Vercel)
   - `CLIENT_SECRET` - z GitHub OAuth App (dla Vercel)

4. **Skonfiguruj GitHub OAuth App dla Vercel:**
   - Dodaj callback URL: `https://twoja-aplikacja.vercel.app/api/auth/callback/github`

5. **Wdróż:**
   - Vercel automatycznie wykryje Next.js i wdroży aplikację

## 📝 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Auth.js Documentation](https://authjs.dev)
- [Vercel Deployment](https://vercel.com/docs)

## 👤 Autor

MKravczak

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
