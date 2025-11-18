'use client';

export default function AppError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div id="page">
      <div className="error">
        <h2>Wystąpił błąd</h2>
        <p>{error.message}</p>
      </div>
    </div>
  );
}

