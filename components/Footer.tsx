export default function Footer() {
  return (
    <footer className="mt-8 mb-2 rounded-lg bg-panel px-4 py-2 shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between px-4 py-2">
        <p>© {new Date().getFullYear()} Aaron Perkel</p>
        <div className="social-icons">
          <a href="https://github.com/aaronperkel" aria-label="GitHub" className="ml-2 text-xl text-muted hover:text-accent">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/aaronperkel" aria-label="LinkedIn" className="ml-2 text-xl text-muted hover:text-accent">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://youtube.com/@aaronperkel" aria-label="YouTube" className="ml-2 text-xl text-muted hover:text-accent">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://instagram.com/aaronperkel" aria-label="Instagram" className="ml-2 text-xl text-muted hover:text-accent">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
