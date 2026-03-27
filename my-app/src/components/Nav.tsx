import { memo } from "react";
import type { NavProps } from "../types";

const NAV_ITEMS = [
  { id: "sobre",    label: "Sobre"    },
  { id: "projetos", label: "Projetos" },
  { id: "stack",    label: "Stack"    },
  { id: "contato",  label: "Contato"  },
] as const;

const Nav = memo(function Nav({ scrollTo }: NavProps) {
  return (
    <nav aria-label="Navegação principal">
      <div className="nav-container">
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className="nav-link"
            onClick={() => scrollTo(id)}
            aria-label={`Ir para seção ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
});

export default Nav;
