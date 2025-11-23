import Image from "next/image";

export default function Home() {
  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <main className="my-12 mx-auto max-w-3xl text-center">
        <Image
          src="/politechnika-krakowska-logo.svg"
          alt="Politechnika Krakowska logo"
          width={200}
          height={200}
          priority
          className="w-40 shadow-[0_0_10px_0_#181817]"
        />
        <div className="mt-12 text-4xl md:text-3xl">
          Witajcie na stronie Sklepu Komputerowego 2025mk!
        </div>
      </main>
    </div>
  );
}
