import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div className="flex items-center gap-4 py-4">
        <Image
          src="/img/headshot.webp"
          alt="Aaron Perkel"
          width={64}
          height={64}
          className="h-16 w-16 rounded-full"
          priority
        />
        <h1 className="text-[1.75rem] font-semibold">Aaron Perkel</h1>
      </div>
    </header>
  );
}
