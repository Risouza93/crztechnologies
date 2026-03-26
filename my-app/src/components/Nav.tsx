import { useState, useEffect, useCallback, useMemo } from "react";
import clsx from "clsx";
import type { NavLink, NavProps } from "../types/index";


/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { id: "#resultados",  label: "Resultados"  },
  { id: "#sobre",       label: "Sobre"       },
  { id: "#experiencia", label: "Experiência" },
  { id: "#contato",     label: "Contato"     },
];

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold:  0.3,
  rootMargin: "0px 0px -20% 0px",
};

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Nav({ scrollTo }: NavProps) {
  const [active, setActive] = useState<string>(NAV_LINKS[0].id);

  // ── Active section via IntersectionObserver ──────────────────────
  useEffect(() => {
    const sectionEls = NAV_LINKS.map(({ id }) =>
      document.querySelector<HTMLElement>(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(`#${visible.target.id}`);
        }
      },
      OBSERVER_OPTIONS
    );

    sectionEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // ── Click handler ────────────────────────────────────────────────
  const handleClick = useCallback(
    (id: string): void => {
      setActive(id);
      scrollTo(id);
    },
    [scrollTo]
  );

  // ── Links memoizados ─────────────────────────────────────────────
  const renderedLinks = useMemo(
    () =>
      NAV_LINKS.map(({ id, label }: NavLink) => (
        <button
          key={id}
          type="button"
          onClick={() => handleClick(id)}
          className={clsx("nav-link", active === id && "active")}
          aria-current={active === id ? "true" : undefined}
        >
          {label}
        </button>
      )),
    [active, handleClick]
  );

  // ── Render ───────────────────────────────────────────────────────
  return (
    <nav aria-label="Navegação principal">
      <div className="nav-container" role="list">
        {renderedLinks}
      </div>
    </nav>
  );
}
