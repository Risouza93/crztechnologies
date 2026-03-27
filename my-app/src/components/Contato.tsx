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
    <div className="contato-wrapper">
      <h2>Contato</h2>

      <form onSubmit={handleSubmit} noValidate aria-label="Formulário de contato">
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
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
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
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
        </div>

        <div className="form-group">
          <label htmlFor="mensagem">Mensagem</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            placeholder="Como posso te ajudar?"
            rows={5}
            required
          />
        </div>

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
            className={`form-status ${status.includes("sucesso") ? "success" : "error"}`}
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
