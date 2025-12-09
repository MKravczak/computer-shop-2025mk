// Wymuszamy dynamiczne renderowanie, aby uniknąć błędu podczas builda
export const dynamic = 'force-dynamic';

export default function OrderHistory() {
  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <h2 className="mb-8">Historia zamówień</h2>
      <div className="bg-primary p-8 rounded-lg">
        <p className="text-center">Ta funkcjonalność nie jest jeszcze obsługiwana.</p>
      </div>
    </div>
  );
}

