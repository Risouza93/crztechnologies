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
      <ul>
        {NAV_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              aria-label={`Ir para seção ${label}`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Nav;
