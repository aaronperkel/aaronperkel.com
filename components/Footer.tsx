const socials = [
  { href: "https://github.com/aaronperkel", label: "github" },
  { href: "https://linkedin.com/in/aaronperkel", label: "linkedin" },
  { href: "https://youtube.com/@aaronperkel", label: "youtube" },
  { href: "https://instagram.com/aaronperkel", label: "instagram" },
];

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-rule py-6 font-mono text-[0.8rem] text-muted">
      <p>© {new Date().getFullYear()} Aaron Perkel</p>
      <div className="flex gap-4">
        {socials.map((s) => (
          <a key={s.label} href={s.href} className="text-muted no-underline hover:text-ink hover:underline">
            {s.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
