import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-24">
      <p className="font-mono text-[0.85rem] text-muted">HTTP/1.1 404</p>
      <h1 className="mt-2 text-[2rem] font-semibold leading-tight">Page not found</h1>
      <p className="mt-4">
        Nothing lives at this address. <Link href="/">Head back home</Link>.
      </p>
    </main>
  );
}
