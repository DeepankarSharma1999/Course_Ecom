import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-tight max-w-xl text-center">
        <div className="text-7xl font-bold text-brand-600 mb-4">404</div>
        <h1 className="h2 mb-3">Page not found</h1>
        <p className="lead mb-6">The page you&apos;re looking for has moved or doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary">Back to Home</Link>
      </div>
    </section>
  );
}
