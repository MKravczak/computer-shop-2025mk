'use client';

import { useEffect, useState } from 'react';

export default function ProductListLayout({
  children,
  products,
  discounts,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  discounts: React.ReactNode;
}) {
  const [isProductDetailPage, setIsProductDetailPage] = useState(false);

  useEffect(() => {
    // Sprawdź czy slot products zawiera data-product-detail="true"
    const productsContainer = document.querySelector('[data-product-detail="true"]');
    setIsProductDetailPage(!!productsContainer);
  }, [products]);

  return (
    <div className="w-[90%] max-w-6xl mx-auto my-8 md:w-[95%] md:my-4">
      {!isProductDetailPage && (
        <div className="mb-16 md:mb-8">
          {discounts}
        </div>
      )}
      <div>
        {products}
        {isProductDetailPage && (
          <div className="mt-12 md:mt-8">
            {discounts}
          </div>
        )}
      </div>
    </div>
  );
}

