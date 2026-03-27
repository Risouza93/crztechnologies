import { useEffect, useCallback, useState, useRef } from "react";

const SECTION_IDS = ["sobre", "projetos", "stack", "contato"];

interface UseScrollSpyReturn {
  scrollTo:      (id: string) => void;
  scrollContato: () => void;
  activeId:      string;
}

export function useScrollSpy(): UseScrollSpyReturn {
  const [activeId, setActiveId] = useState<string>("");
  const contatoRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    contatoRef.current = document.getElementById("contato");
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      document.querySelectorAll("section").forEach((sec) => sec.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-80px 0px -30% 0px" }
    );

    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    sections.forEach((el) => observer.observe(el));
    return () => sections.forEach((el) => observer.unobserve(el));
  }, []);

  const scrollTo = useCallback((id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollContato = useCallback((): void => {
    contatoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return { scrollTo, scrollContato, activeId };
}
