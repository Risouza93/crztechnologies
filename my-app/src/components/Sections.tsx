import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import type {
  SectionsProps,
  ImpactoCard,
  ProcessoStep,
} from "../types/index";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const IMPACTO_CARDS: ImpactoCard[] = [
  {
    id:    "reducao",
    stat:  "40%",
    label: "Redução no tempo de processos",
  },
  {
    id:    "retrabalho",
    stat:  "35%",
    label: "Menos retrabalho operacional",
  },
  {
    id:    "integracoes",
    stat:  "Global",
    label: "Integrações com DHL, UPS e Correos",
  },
  {
    id:    "saas",
    stat:  "SaaS",
    label: "Produtos rodando internacionalmente",
  },
];

const EXPERIENCIA_ITEMS: string[] = [
  "Integrações via APIs (DHL, UPS, Correos)",
  "SQL / PostgreSQL",
  "Product Owner — SaaS internacional",
  "Projetos logísticos de alto impacto",
];

const PROCESSO_STEPS: ProcessoStep[] = [
  {
    id:        "diagnostico",
    numero:    "01",
    titulo:    "Diagnóstico",
    descricao: "Identifico gargalos e perdas ocultas no processo atual.",
  },
  {
    id:        "arquitetura",
    numero:    "02",
    titulo:    "Arquitetura",
    descricao: "Desenho soluções escaláveis e integradas ao negócio.",
  },
  {
    id:        "execucao",
    numero:    "03",
    titulo:    "Execução",
    descricao: "Implemento com foco em resultado e prazo.",
  },
  {
    id:        "otimizacao",
    numero:    "04",
    titulo:    "Otimização",
    descricao: "Melhoria contínua baseada em dados reais.",
  },
];

const DIFERENCIAIS: string[] = [
  "Visão estratégica + execução técnica",
  "Foco obsessivo em ROI mensurável",
  "Tradução entre negócio e tecnologia",
  "IA aplicada a problemas reais",
];

/* ─────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────────── */
function StatCard({ stat, label }: Omit<ImpactoCard, "id">) {
  return (
    <div className="card">
      <h3
        style={{
          fontSize:             "2rem",
          fontWeight:           700,
          background:           "linear-gradient(135deg, #38bdf8, #22c55e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:  "transparent",
          backgroundClip:       "text",
          marginBottom:         "0.5rem",
        }}
      >
        {stat}
      </h3>
      <p>{label}</p>
    </div>
  );
}

function ProcessoCard({
  numero,
  titulo,
  descricao,
}: Omit<ProcessoStep, "id">) {
  return (
    <div className="card">
      <span
        style={{
          fontSize:      "0.75rem",
          fontWeight:    700,
          color:         "#38bdf8",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          display:       "block",
          marginBottom:  "0.5rem",
        }}
      >
        {numero}
      </span>
      <h3>{titulo}</h3>
      <p>{descricao}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Sections({
  form,
  status,
  loading,
  handleChange,
  handleSubmit,
}: SectionsProps) {

  useReducedMotion();

  // ── Cards memoizados ─────────────────────────────────────────────
  const impactoCards = useMemo(
    () =>
      IMPACTO_CARDS.map(({ id, stat, label }: ImpactoCard) => (
        <StatCard key={id} stat={stat} label={label} />
      )),
    []
  );

  const processoCards = useMemo(
    () =>
      PROCESSO_STEPS.map(({ id, numero, titulo, descricao }: ProcessoStep) => (
        <ProcessoCard
          key={id}
          numero={numero}
          titulo={titulo}
          descricao={descricao}
        />
      )),
    []
  );

  const diferenciais = useMemo(
    () =>
      DIFERENCIAIS.map((item: string) => (
        <li key={item}>{item}</li>
      )),
    []
  );

  const experienciaItems = useMemo(
    () =>
      EXPERIENCIA_ITEMS.map((item: string) => (
        <li key={item}>{item}</li>
      )),
    []
  );

  // ── Render ───────────────────────────────────────────────────────
  return (
    <>
      {/* ── IMPACTO REAL ─────────────────────────────────────── */}
      <section id="resultados" aria-labelledby="resultados-titulo">
        <h2 id="resultados-titulo">
          <span aria-hidden="true">📊</span> Impacto real, não promessa
        </h2>
        <div className="grid">
          {impactoCards}
        </div>
      </section>

      {/* ── O PROBLEMA ───────────────────────────────────────── */}
      <section id="sobre" aria-labelledby="sobre-titulo">
        <h2 id="sobre-titulo">
          <span aria-hidden="true">🧠</span> O problema que eu resolvo
        </h2>
        <p>
          Empresas perdem dinheiro todos os dias com processos manuais
          e sistemas desconectados. Isso gera retrabalho, atraso e
          crescimento limitado.
        </p>
        <p>
          Eu transformo esse cenário em operações inteligentes usando
          Automação, Integrações e IA Generativa.
        </p>
        <p>
          O foco é simples:{" "}
          <strong>eficiência mensurável, escala e ROI real.</strong>
        </p>

        {/* Antes / Depois */}
        <dl
          className="grid"
          style={{ marginTop: "2rem" }}
          aria-label="Comparativo antes e depois"
        >
          <div className="card">
            <dt
              style={{
                fontSize:      "0.75rem",
                fontWeight:    700,
                color:         "#f87171",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom:  "0.5rem",
              }}
            >
              Antes
            </dt>
            <dd>Processos manuais, retrabalho e falta de integração.</dd>
          </div>
          <div className="card">
            <dt
              style={{
                fontSize:      "0.75rem",
                fontWeight:    700,
                color:         "#22c55e",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom:  "0.5rem",
              }}
            >
              Depois
            </dt>
            <dd>Automação, dados confiáveis e operação escalável.</dd>
          </div>
        </dl>
      </section>

      {/* ── EXPERIÊNCIA ──────────────────────────────────────── */}
      <section id="experiencia" aria-labelledby="experiencia-titulo">
        <h2 id="experiencia-titulo">
          <span aria-hidden="true">💼</span> Experiência
        </h2>
        <div className="grid">
          <div className="card">
            <h3>Grupo MOVE3</h3>
            <p
              style={{
                fontSize:     "0.8rem",
                color:        "#38bdf8",
                fontWeight:   600,
                marginBottom: "0.75rem",
              }}
            >
              Analista de Projetos
            </p>
            <p>
              Liderança de iniciativas de automação e integração com
              impacto direto em eficiência operacional.
            </p>
            <ul>{experienciaItems}</ul>
          </div>

          <div className="card">
            <h3>MOOVE Portugal</h3>
            <p
              style={{
                fontSize:     "0.8rem",
                color:        "#38bdf8",
                fontWeight:   600,
                marginBottom: "0.75rem",
              }}
            >
              SaaS Logístico Internacional
            </p>
            <p>
              Desenvolvimento e operação de plataforma SaaS com
              integração global e foco em eficiência operacional
              cross-border.
            </p>
            <ul>
              <li>Integração logística global</li>
              <li>Eficiência operacional internacional</li>
              <li>Arquitetura de produto escalável</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── PROCESSO ─────────────────────────────────────────── */}
      <section id="processo" aria-labelledby="processo-titulo">
        <h2 id="processo-titulo">
          <span aria-hidden="true">🧠</span> Como eu resolvo problemas
        </h2>
        <div className="grid">
          {processoCards}
        </div>
      </section>

      {/* ── DIFERENCIAIS ─────────────────────────────────────── */}
      <section id="diferenciais" aria-labelledby="diferenciais-titulo">
        <h2 id="diferenciais-titulo">
          <span aria-hidden="true">🔥</span> Por que eu?
        </h2>
        <ul>{diferenciais}</ul>
      </section>

      {/* ── CONTATO ──────────────────────────────────────────── */}
      <section id="contato" aria-labelledby="contato-titulo">
        <div className="contact-card">
          <h2 id="contato-titulo">
            <span aria-hidden="true">📩</span> Vamos construir algo grande?
          </h2>
          <p style={{ color: "#94a3b8", marginTop: "0.75rem" }}>
            Se sua empresa quer escalar eficiência sem aumentar headcount,
            a gente precisa conversar.
          </p>

          <form
            className="glass-form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulário de contato"
          >
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
              autoComplete="name"
              aria-label="Seu nome"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Seu e-mail"
              autoComplete="email"
              aria-label="Seu e-mail"
              required
            />
            <textarea
              name="mensagem"
              value={form.mensagem}
              onChange={handleChange}
              placeholder="Conte brevemente sobre seu desafio..."
              autoComplete="off"
              aria-label="Sua mensagem"
              rows={4}
              required
              style={{
                resize:    "vertical",
                minHeight: "120px",
              }}
            />

            {status.mensagem && (
              <p
                className={`status-msg status-msg--${status.tipo}`}
                role="alert"
                aria-live="polite"
              >
                {status.mensagem}
              </p>
            )}

            <button
              type="submit"
              className="cta-button"
              disabled={loading}
              aria-label={
                loading ? "Enviando mensagem..." : "Enviar mensagem"
              }
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
