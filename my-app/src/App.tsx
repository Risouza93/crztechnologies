import { useEffect, useState, useCallback } from "react";
import emailjs from "@emailjs/browser"; // ✅ pacote atualizado para TS
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import "./style.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Sections from "./components/Sections";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import Toast from "./components/Toast";
import TypebotBubble from "./components/TypebotBubble";

interface ToastState {
  message: string;
  type: string;
}
interface FormState {
  nome: string;
  email: string;
  mensagem: string;
}

function App() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    email: "",
    mensagem: "",
  });
  const [toast, setToast] = useState<ToastState>({ message: "", type: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const scrollTo = useCallback((id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollContato = useCallback(() => scrollTo("#contato"), [scrollTo]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("show")
        ),
      { threshold: 0.15 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.nome || !form.email) {
      setToast({ message: "⚠️ Preencha todos os campos!", type: "erro" });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        {
          nome: form.nome,
          email: form.email,
          mensagem: form.mensagem,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
      )
      .then(
        () => {
          setToast({
            message: "✅ Mensagem enviada com sucesso!",
            type: "sucesso",
          });
          setForm({ nome: "", email: "", mensagem: "" });
          setLoading(false);
        },
        (error) => {
          console.error("Erro EmailJS:", error);
          setToast({
            message: "⚠️ Erro ao enviar: " + error.text,
            type: "erro",
          });
          setLoading(false);
        }
      );
  };

  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollToTop />
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
      <Header scrollContato={scrollContato} />
      <Nav scrollTo={scrollTo} />
      <Sections
        form={form}
        status={toast}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {/* NOVO: chatbot IA */}
      <TypebotBubble />
    </ThemeProvider>
  );
}

export default App;
