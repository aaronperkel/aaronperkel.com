const socials = [
  { href: "https://github.com/aaronperkel", label: "GitHub" },
  { href: "https://linkedin.com/in/aaronperkel", label: "LinkedIn" },
  { href: "https://youtube.com/@aaronperkel", label: "YouTube" },
  { href: "https://instagram.com/aaronperkel", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-line">
      <div className="mx-auto flex w-full max-w-[42rem] flex-wrap items-center justify-between gap-2 px-5 py-5 text-[0.8125rem] text-ink-2">
        <p className="tnum">© {new Date().getFullYear()} Aaron Perkel LLC</p>
        <div className="flex gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="-my-3 py-3 text-ink-2 hover:text-ink">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
