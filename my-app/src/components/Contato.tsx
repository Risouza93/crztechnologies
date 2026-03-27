import { memo } from "react";
import type { ContatoProps } from "../types";

const Contato = memo(function Contato({
  form,
  status,
  loading,
  handleChange,
  handleSubmit,
}: ContatoProps) {
  return (
    <div className="contact-card">
      <h2>Contato</h2>

      <form onSubmit={handleSubmit} noValidate className="glass-form" aria-label="Formulário de contato">
        <input
          id="nome"
          name="nome"
          type="text"
          value={form.nome}
          onChange={handleChange}
          placeholder="Seu nome"
          required
          autoComplete="name"
        />
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="seu@email.com"
          required
          autoComplete="email"
        />
        <textarea
          id="mensagem"
          name="mensagem"
          value={form.mensagem}
          onChange={handleChange}
          placeholder="Como posso te ajudar?"
          rows={5}
          required
        />

        <button
          type="submit"
          className="cta-button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "Enviando…" : "Enviar mensagem"}
        </button>

        {status && typeof status === "string" && (
          <p
            className={`status-msg ${status.includes("sucesso") ? "status-msg--sucesso" : "status-msg--erro"}`}
            role="alert"
            aria-live="polite"
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
});

export default Contato;
