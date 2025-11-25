import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Product } from '@/lib/products';
import { getProductById, getProductsByCategory, getAllProducts } from '@/lib/products';

// Mapowanie kategorii na slugi URL
const CATEGORY_MAP: Record<string, Product['type']> = {
  'procesor': 'procesor',
  'cpu': 'procesor',
  'karta-graficzna': 'karta graficzna',
  'gpu': 'karta graficzna',
  'pamiec-ram': 'pamięć ram',
  'ram': 'pamięć ram',
  'dysk': 'dysk',
  'disk': 'dysk',
};

// Odwrotne mapowanie (typ -> slug)
const TYPE_TO_SLUG: Record<Product['type'], string> = {
  'procesor': 'procesor',
  'karta graficzna': 'gpu',
  'pamięć ram': 'ram',
  'dysk': 'dysk',
};

export default async function ProductsSlot({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  // Przypadek 1: /product-list - pusta tablica, wyświetl wszystkie produkty
  if (slug.length === 0) {
    const products = getAllProducts();
    return (
      <div>
        <h2 className="mb-8">Wszystkie produkty</h2>
        <ProductList products={products} showFilters />
      </div>
    );
  }

  // Przypadek 2: /product-list/kategoria - jeden segment, wyświetl produkty z kategorii
  if (slug.length === 1) {
    const categorySlug = slug[0];
    const categoryType = CATEGORY_MAP[categorySlug];

    if (!categoryType) {
      notFound();
    }

    const products = getProductsByCategory(categoryType);
    const categoryName = categoryType;

    return (
      <div>
        <Link 
          href="/product-list" 
          className="inline-block mb-8 text-text no-underline text-base transition-colors duration-300 hover:text-accent"
        >
          ← Wróć do listy produktów
        </Link>
        <h2 className="mb-8 capitalize">Produkty: {categoryName}</h2>
        <ProductList products={products} categorySlug={categorySlug} />
      </div>
    );
  }

  // Przypadek 3: /product-list/kategoria/id - dwa segmenty, wyświetl szczegóły produktu
  if (slug.length === 2) {
    const [categorySlug, productIdStr] = slug;
    const categoryType = CATEGORY_MAP[categorySlug];

    if (!categoryType) {
      notFound();
    }

    const productIdNumber = parseInt(productIdStr, 10);
    if (isNaN(productIdNumber) || productIdNumber <= 0) {
      notFound();
    }

    const product = getProductById(productIdNumber);

    if (!product || product.type !== categoryType) {
      notFound();
    }

    return (
      <div data-product-detail="true">
        <Link 
          href={`/product-list/${categorySlug}`} 
          className="inline-block mb-8 text-text no-underline text-base transition-colors duration-300 hover:text-accent"
        >
          ← Wróć do kategorii
        </Link>

        <div className="grid grid-cols-2 gap-12 mt-8 md:grid-cols-1 md:gap-8">
          <div className="flex justify-center items-start">
            <Image
              src="/images/products/placeholder.svg"
              alt={product.name}
              width={200}
              height={200}
              className="w-48 h-48 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] object-contain bg-primary p-4"
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
                     Dostępny 
                </span>
              ) : (
                <span className="text-red-400 bg-red-400/10 py-3 px-6 rounded-lg inline-block">
                   Niedostępny &nbsp;
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Więcej niż 2 segmenty - nieobsługiwane
  notFound();
}

// Komponent do wyświetlania listy produktów
function ProductList({ 
  products, 
  categorySlug,
  showFilters = false,
}: { 
  products: Product[]; 
  categorySlug?: string;
  showFilters?: boolean;
}) {
  if (products.length === 0) {
    return <p className="opacity-80 text-base">Brak produktów do wyświetlenia.</p>;
  }

  const formatLabel = (text: string) =>
    text.replace(/\b\w/g, (char) => char.toUpperCase());

  const categoryFilters = Object.entries(TYPE_TO_SLUG).map(([type, slug]) => ({
    label: formatLabel(type),
    slug,
  }));

  const gridBaseClass = "list-none p-0 m-0 grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1 md:gap-4 justify-items-center";

  return (
    <>
      {showFilters && (
        <div className="flex flex-wrap gap-8 mb-12 justify-center">
          <Link
            href="/product-list"
            className="px-6 py-3 rounded-full bg-text-dark/30 text-white uppercase tracking-wide text-base font-semibold no-underline shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:bg-text hover:text-text-dark transition-colors duration-200"
          >
            Wszystkie
          </Link>
          {categoryFilters.map((filter) => (
            <Link
              key={filter.slug}
              href={`/product-list/${filter.slug}`}
              className="px-6 py-3 rounded-full bg-text-dark/30 text-white uppercase tracking-wide text-base font-semibold no-underline shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:bg-text hover:text-text-dark transition-colors duration-200"
            >
              {filter.label}
            </Link>
          ))}
        </div>
      )}

      <ul className={`${gridBaseClass} ${showFilters ? 'mt-6' : ''}`}>
      {products.map((product) => {
        const href = categorySlug 
          ? `/product-list/${categorySlug}/${product.id}`
          : `/product-list/${TYPE_TO_SLUG[product.type]}/${product.id}`;
        
        return (
          <li 
            key={product.id} 
            className="bg-primary rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] w-full max-w-xs h-full flex flex-col"
          >
            <Link 
              href={href}
              className="block no-underline text-inherit h-full flex flex-col"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-center items-center p-4 bg-primary/50 rounded-t-lg min-h-[140px]">
                  <Image
                    src="/images/products/placeholder.svg"
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2 p-4 flex-grow min-h-[180px]">
                  <h3 className="text-lg font-semibold m-0 text-text line-clamp-2 min-h-[3rem]">
                    {product.name}
                  </h3>
                  <div className="flex flex-col gap-3 text-sm mt-auto">
                    <span className="py-1 px-2 rounded-full bg-text-dark/20 capitalize text-xs w-fit">
                      {product.type}
                    </span>
                    {product.amount > 0 ? (
                      <span className="text-green-400 text-xs"> Dostępny &nbsp;</span>
                    ) : (
                      <span className="text-red-400 text-xs"> Niedostępny &nbsp;</span>
                    )}
                    <span className="text-text font-medium">
                      Ilość: {product.amount}
                    </span>
                    <span className="text-accent font-bold">
                      {product.price.toFixed(2)} zł
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
      </ul>
    </>
  );
}

