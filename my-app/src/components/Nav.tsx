import { useState, useEffect } from "react";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

interface NavProps { scrollTo: (id: string) => void; }

export default function Nav({ scrollTo }: NavProps) {
  const [active, setActive] = useState<string>("#sobre");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { threshold: 0.4 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const links = [
    { id: "#sobre",    label: "Sobre" },
    { id: "#projetos", label: "Projetos" },
    { id: "#stack",    label: "Stack" },
    { id: "#skills",   label: "Skills" },
    { id: "#contato",  label: "Contato" },
  ];

  const handleNav = (id: string) => { scrollTo(id); setMenuOpen(false); };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-links">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={clsx("nav-link", active === link.id && "active")}
            >
              {link.label}
            </button>
          ))}
        </div>
        <ThemeToggle />
        <button
          className={clsx("hamburger", menuOpen && "hamburger--open")}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={clsx("mobile-menu", menuOpen && "mobile-menu--open")}>
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNav(link.id)}
            className={clsx("mobile-link", active === link.id && "active")}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  );
}