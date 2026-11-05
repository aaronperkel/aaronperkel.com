import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-rule py-5">
      <Link
        href="/"
        className="flex items-center gap-3 font-semibold text-ink no-underline"
      >
        <Image
          src="/img/headshot.webp"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-full"
          priority
        />
        {/* Visually hidden on phones so the nav fits on one line; the avatar
            stays the home link and the name stays its accessible label. */}
        <span className="whitespace-nowrap max-sm:sr-only">Aaron Perkel</span>
      </Link>
      <Nav />
    </header>
  );
}
