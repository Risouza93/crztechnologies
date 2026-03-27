import { memo } from "react";
import { motion } from "framer-motion";
import Sobre from "./Sobre";
import Projetos from "./Projetos";
import Stack from "./Stack";
import type { SectionsProps, ContatoProps } from "../types";

const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

interface AnimatedSectionProps {
  id:       string;
  label:    string;
  children: React.ReactNode;
}

const AnimatedSection = memo(function AnimatedSection({ id, label, children }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      aria-label={label}
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.section>
  );
});

const Contato = memo(function Contato({
  form, status, loading, handleChange, handleSubmit,
}: ContatoProps) {
  return (
    <div className="contact-card">
      <h2>Contato</h2>
      <form onSubmit={handleSubmit} noValidate className="glass-form">
        <input
          name="nome" type="text" value={form.nome}
          onChange={handleChange} placeholder="Seu nome"
          required autoComplete="name"
        />
        <input
          name="email" type="email" value={form.email}
          onChange={handleChange} placeholder="seu@email.com"
          required autoComplete="email"
        />
        <textarea
          name="mensagem" value={form.mensagem}
          onChange={handleChange} placeholder="Como posso te ajudar?"
          rows={5} required
        />
        <button type="submit" className="cta-button" disabled={loading} aria-busy={loading}>
          {loading ? "Enviando..." : "Enviar mensagem"}
        </button>
        {status.tipo !== "idle" && (
          <p
            className={`status-msg ${status.tipo === "sucesso" ? "status-msg--sucesso" : "status-msg--erro"}`}
            role="alert"
            aria-live="polite"
          >
            {status.mensagem}
          </p>
        )}
      </form>
    </div>
  );
});

const Sections = memo(function Sections({
  form, status, loading, handleChange, handleSubmit,
}: SectionsProps) {
  return (
    <>
      <AnimatedSection id="sobre"    label="Sobre mim">    <Sobre />    </AnimatedSection>
      <AnimatedSection id="projetos" label="Projetos">     <Projetos /> </AnimatedSection>
      <AnimatedSection id="stack"    label="Stack tecnica"><Stack />    </AnimatedSection>
      <AnimatedSection id="contato"  label="Contato">
        <Contato form={form} status={status} loading={loading} handleChange={handleChange} handleSubmit={handleSubmit} />
      </AnimatedSection>
    </>
  );
});

export default Sections;
