import { useEffect, useRef } from "react";

interface SkillItem { name: string; level: number; }
interface SkillCategory { category: string; items: SkillItem[]; }

const skills: SkillCategory[] = [
  { category: "Automação & IA", items: [
    { name: "n8n / Make (Integromat)", level: 100 },
    { name: "LangChain / GPT APIs", level: 100 },
    { name: "Power Automate", level: 100 },
    { name: "Python (automação)", level: 100 },
  ]},
  { category: "Integrações & APIs", items: [
    { name: "REST APIs", level: 100 },
    { name: "ERPs (TOTVS, FOCCO, Bling)", level: 100 },
    { name: "TMS / WMS", level: 100 },
    { name: "Node.js", level: 100 },
  ]},
  { category: "Frontend & Ferramentas", items: [
    { name: "React / TypeScript", level: 100 },
    { name: "Power BI", level: 100 },
    { name: "Git / Vercel / CI-CD", level: 100 },
    { name: "UX / UI", level: 100 },
  ]},
];

export default function Skills() {
  const barsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLDivElement;
          el.style.width = el.dataset.level + "%";
        }
      }),
      { threshold: 0.3 }
    );
    barsRef.current.forEach((bar) => bar && observer.observe(bar));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills">
      <h2>🎯 Skills</h2>
      <div className="skills-grid">
        {skills.map((cat) => (
          <div key={cat.category} className="skills-category">
            <h3>{cat.category}</h3>
            {cat.items.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div
                    className="skill-bar"
                    data-level={skill.level}
                    ref={(el) => { if (el) barsRef.current.push(el); }}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}