import Image from "next/image";

export default function Home() {
  return (
    <div id="page">
      <main id="home">
        <Image
          src="/politechnika-krakowska-logo.svg"
          alt="Politechnika Krakowska logo"
          width={200}
          height={200}
          priority
        />
        <div>
          Witajcie na stronie Sklepu Komputerowego 2025mk!
        </div>
      </main>
    </div>
  );
}
