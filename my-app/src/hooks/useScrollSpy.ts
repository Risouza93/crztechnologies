import { useEffect, useCallback } from "react";

interface UseScrollSpyReturn {
  scrollTo:      (id: string) => void;
  scrollContato: () => void;
}

export function useScrollSpy(): UseScrollSpyReturn {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      document.querySelectorAll("section").forEach((sec) => {
        sec.classList.add("show");
      });
      return;
    }

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string): void => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollContato = useCallback((): void => {
    scrollTo("#contato");
  }, [scrollTo]);

  return { scrollTo, scrollContato };
}
