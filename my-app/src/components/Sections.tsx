import { memo } from "react";
import Sobre from "./Sobre";
import Projetos from "./Projetos";
import Stack from "./Stack";
import Contato from "./Contato";
import type { SectionsProps } from "../types";

const Sections = memo(function Sections({
  form,
  status,
  loading,
  handleChange,
  handleSubmit,
}: SectionsProps) {
  return (
    <>
      <section id="sobre"    aria-label="Sobre mim">    <Sobre />    </section>
      <section id="projetos" aria-label="Projetos">      <Projetos /> </section>
      <section id="stack"    aria-label="Stack técnica"> <Stack />    </section>
      <section id="contato"  aria-label="Contato">
        <Contato
          form={form}
          status={status}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </section>
    </>
  );
});

export default Sections;
