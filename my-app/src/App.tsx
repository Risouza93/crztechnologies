import { useEffect, useState, useCallback, useMemo } from "react";
import "./style.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Sections from "./components/Sections";
import type { FormState, StatusState } from "./types/index";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const FORM_INITIAL_STATE: FormState = {
  nome:     "",
  email:    "",
  mensagem: "",
};

const STATUS_INITIAL_STATE: StatusState = {
  mensagem: "",
  tipo:     "idle",
};

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function App() {

  // ── States ──────────────────────────────────────────────────────
  const [form, setForm]       = useState<FormState>(FORM_INITIAL_STATE);
  const [status, setStatus]   = useState<StatusState>(STATUS_INITIAL_STATE);
  const [loading, setLoading] = useState<boolean>(false);

  // ── Scroll ──────────────────────────────────────────────────────
  const scrollTo = useCallback((id: string): void => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollContato = useCallback((): void => {
    scrollTo("#contato");
  }, [scrollTo]);

  // ── Intersection Observer ────────────────────────────────────────
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

  // ── Form handlers ────────────────────────────────────────────────
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setForm((prev: any) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      const { nome, email, mensagem } = form;

      if (!nome.trim() || !email.trim() || !mensagem.trim()) {
        setStatus({
          mensagem: "Preencha todos os campos antes de enviar.",
          tipo:     "erro",
        });
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailValido) {
        setStatus({
          mensagem: "Insira um endereço de e-mail válido.",
          tipo:     "erro",
        });
        return;
      }

      setLoading(true);
      setStatus(STATUS_INITIAL_STATE);

      // TODO: substituir pelo endpoint real (ex: Resend, EmailJS, API Route)
      setTimeout(() => {
        setStatus({
          mensagem: "Mensagem enviada! Em breve entrarei em contato.",
          tipo:     "sucesso",
        });
        setForm(FORM_INITIAL_STATE);
        setLoading(false);
      }, 2000);
    },
    [form]
  );

  // ── Props memoizadas para Sections ───────────────────────────────
  const sectionsProps = useMemo(
    () => ({ form, status, loading, handleChange, handleSubmit }),
    [form, status, loading, handleChange, handleSubmit]
  );

  // ── Render ───────────────────────────────────────────────────────
  return (
    <>
      <Header onScrollContato={scrollContato} />
      <Nav scrollTo={scrollTo} />
      <main>
        <div className="container">
          <Sections {...sectionsProps} />
        </div>
      </main>
      <footer>
        <p>
          © {new Date().getFullYear()} Richard Feitosa — AI-Driven Project Architect
        </p>
      </footer>
    </>
  );
}
