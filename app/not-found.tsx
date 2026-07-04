import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-16 text-center">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="mt-4">Oops, page not here.</p>
      <p className="mt-4">
        <Link href="/">← Go Home</Link>
      </p>
    </main>
  );
}
