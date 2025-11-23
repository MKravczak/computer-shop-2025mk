import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ 'product-id': string }>;
}) {
  const { 'product-id': productId } = await params;
  
  // Walidacja: sprawdzenie czy product-id jest liczbą
  const productIdNumber = parseInt(productId, 10);
  if (isNaN(productIdNumber) || productIdNumber <= 0) {
    notFound();
  }

  // Pobranie produktu po ID
  const product = getProductById(productIdNumber);

  // Sprawdzenie czy produkt istnieje
  if (!product) {
    notFound();
  }

  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <Link 
        href="/product-list" 
        className="inline-block mb-8 text-text no-underline text-base transition-colors duration-300 hover:text-accent"
      >
        ← Wróć do listy produktów
      </Link>

      <div className="grid grid-cols-2 gap-12 mt-8 md:grid-cols-1 md:gap-8">
        <div className="flex justify-center items-start">
          <Image
            src={product.image || '/images/products/placeholder.svg'}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] object-contain bg-primary p-4"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold m-0 text-text md:text-2xl">
            {product.name}
          </h1>
          
          <div className="flex gap-4 flex-wrap items-center md:flex-col md:items-start">
            <span className="font-sans text-sm text-text/80 py-2 px-4 bg-text-dark/20 rounded">
              Kod: {product.code}
            </span>
            <span className="py-2 px-4 rounded-full bg-text-dark/20 capitalize text-sm">
              {product.type}
            </span>
          </div>

          <div className="p-6 bg-primary rounded-lg">
            <h2 className="text-xl mb-3 text-text">Opis</h2>
            <p className="text-[#f5f5f5] leading-relaxed m-0">{product.description}</p>
          </div>

          <div className="flex flex-col gap-4 p-6 bg-primary rounded-lg">
            <div className="flex justify-between items-center py-3 border-b border-text/10 last:border-b-0">
              <span className="font-medium text-text">Cena:</span>
              <span className="font-bold text-accent text-lg">
                {product.price.toFixed(2)} zł
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-text/10 last:border-b-0">
              <span className="font-medium text-text">Ilość na stanie:</span>
              <span className="font-bold text-accent text-lg">{product.amount}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-text/10 last:border-b-0">
              <span className="font-medium text-text">Data dodania:</span>
              <span className="font-bold text-accent text-lg">{product.date}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-text/10 last:border-b-0">
              <span className="font-medium text-text">ID produktu:</span>
              <span className="font-bold text-accent text-lg">{product.id}</span>
            </div>
          </div>

          <div className="p-4 rounded-lg text-center font-bold text-lg">
            {product.amount > 0 ? (
              <span className="text-green-400 bg-green-400/10 py-3 px-6 rounded-lg inline-block">
                ✓ Dostępny
              </span>
            ) : (
              <span className="text-red-400 bg-red-400/10 py-3 px-6 rounded-lg inline-block">
                ✗ Niedostępny
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

