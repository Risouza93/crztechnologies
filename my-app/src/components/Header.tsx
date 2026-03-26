import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { HeaderProps } from "../types";

/* ─────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────── */
const STATS: string[] = [
  "⚡ 40% menos tempo operacional",
  "🔁 35% menos retrabalho",
  "🌍 DHL · UPS · Correos",
  "🚀 SaaS com operação global",
];

const VARIANTS: Record<string, Variants> = {
  container: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren:   0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  reduced: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
  },
};

/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
export default function Header({ onScrollContato }: HeaderProps) {

  // ── Respeita preferência de movimento do sistema (WCAG 2.1) ─────
  const prefersReduced = useReducedMotion();

  const itemVariant      = prefersReduced ? VARIANTS.reduced : VARIANTS.item;
  const containerVariant = prefersReduced ? VARIANTS.reduced : VARIANTS.container;

  // ── Stats memoizadas ─────────────────────────────────────────────
  const renderedStats = useMemo(
    () =>
      STATS.map((stat: string) => (
        <motion.span key={stat} variants={itemVariant}>
          {stat}
        </motion.span>
      )),
    [itemVariant]
  );

  // ── Render ───────────────────────────────────────────────────────
  return (
    <header>
      <motion.div
        className="container"
        variants={containerVariant}
        initial="hidden"
        animate="show"
      >
        {/* Avatar */}
        <motion.div variants={itemVariant}>
          <img
            src="/pictures/perfil.jpeg"
            alt="Foto de Richard Feitosa"
            width={196}
            height={196}
            style={{
              borderRadius: "50%",
              border:       "2px solid rgba(56,189,248,0.3)",
              objectFit:    "cover",
              display:      "block",
              margin:       "0 auto 1.5rem",
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariant}
          style={{
            fontSize:              "clamp(2rem, 5vw, 3.25rem)",
            fontWeight:            700,
            lineHeight:            1.15,
            marginBottom:          "1rem",
            background:            "linear-gradient(135deg, #38bdf8, #22c55e)",
            WebkitBackgroundClip:  "text",
            WebkitTextFillColor:   "transparent",
            backgroundClip:        "text",
          }}
        >
          Transformo caos operacional em
          <br />
          eficiência com IA
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariant}
          style={{
            fontSize:     "clamp(0.9rem, 2vw, 1.1rem)",
            color:        "#94a3b8",
            maxWidth:     "540px",
            margin:       "0 auto 2rem",
            lineHeight:   1.7,
          }}
        >
          AI-Driven Project Architect · Automação &amp; IA Generativa ·
          Redução de até 40% no tempo de processos · Integrações via APIs
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemVariant}>
          <button
            type="button"
            className="cta-button"
            onClick={onScrollContato}
            aria-label="Ir para seção de contato"
          >
            <span aria-hidden="true">🚀</span>
            Quero escalar minha operação
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          variants={containerVariant}
          initial="hidden"
          animate="show"
          aria-label="Resultados em destaque"
        >
          {renderedStats}
        </motion.div>

      </motion.div>
    </header>
  );
}
