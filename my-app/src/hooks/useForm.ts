import { useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import type { FormState, StatusState } from "../types";

const FORM_INITIAL: FormState = {
  nome:     "",
  email:    "",
  mensagem: "",
};

const STATUS_INITIAL: StatusState = {
  mensagem: "",
  tipo:     "idle",
};

interface UseFormReturn {
  form:         FormState;
  status:       StatusState;
  loading:      boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function useForm(): UseFormReturn {
  const [form, setForm]       = useState<FormState>(FORM_INITIAL);
  const [status, setStatus]   = useState<StatusState>(STATUS_INITIAL);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      const { nome, email, mensagem } = form;

      if (!nome.trim() || !email.trim() || !mensagem.trim()) {
        setStatus({ mensagem: "Preencha todos os campos antes de enviar.", tipo: "erro" });
        return;
      }

      const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailValido) {
        setStatus({ mensagem: "Insira um endereco de e-mail valido.", tipo: "erro" });
        return;
      }

      setLoading(true);
      setStatus(STATUS_INITIAL);

      try {
        await emailjs.send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID!,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
          { nome, email, mensagem },
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY!
        );
        setStatus({ mensagem: "Mensagem enviada! Em breve entrarei em contato.", tipo: "sucesso" });
        setForm(FORM_INITIAL);
      } catch {
        setStatus({ mensagem: "Erro ao enviar. Tente novamente.", tipo: "erro" });
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  return { form, status, loading, handleChange, handleSubmit };
}
