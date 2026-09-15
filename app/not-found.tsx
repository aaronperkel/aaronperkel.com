import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-20">
      <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
        Page not found
      </h1>
      <p className="mt-3 text-[0.9375rem]">
        Nothing lives at this address. <Link href="/">Back home</Link>.
      </p>
    </main>
  );
}
