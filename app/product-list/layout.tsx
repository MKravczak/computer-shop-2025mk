export default function ProductListLayout({
  children,
  products,
  discounts,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  discounts: React.ReactNode;
}) {
  return (
    <div className="w-[90%] max-w-6xl mx-auto my-8 md:w-[95%] md:my-4">
      <div className="mb-8">
        {discounts}
      </div>
      <div>
        {products}
      </div>
      {children}
    </div>
  );
}

