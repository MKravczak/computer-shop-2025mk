'use client';

export default function AppError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="w-[90%] max-w-4xl mx-auto my-8 md:w-[95%] md:my-4">
      <div className="text-center mt-12">
        <h2>Wystąpił błąd</h2>
        <p>{error.message}</p>
      </div>
    </div>
  );
}

