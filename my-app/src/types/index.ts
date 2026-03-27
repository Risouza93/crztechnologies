// FORM
export interface FormState {
  nome:     string;
  email:    string;
  mensagem: string;
}

// STATUS
export type StatusTipo = "idle" | "erro" | "sucesso";

export interface StatusState {
  mensagem: string;
  tipo:     StatusTipo;
}

// NAV
export interface NavLink {
  id:    string;
  label: string;
}

// CARDS
export interface ImpactoCard {
  id:    string;
  stat:  string;
  label: string;
}

export interface ProcessoStep {
  id:       string;
  numero:   string;
  titulo:   string;
  descricao: string;
}

// PROPS DOS COMPONENTES
export interface HeaderProps {
  onScrollContato: () => void;
}

export interface NavProps {
  scrollTo: (id: string) => void;
  activeId: string;
}

export interface SectionsProps {
  form:         FormState;
  status:       StatusState;
  loading:      boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ContatoProps {
  form:         FormState;
  status:       StatusState;
  loading:      boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
