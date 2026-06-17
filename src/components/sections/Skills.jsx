import { SKILL_CATEGORIES } from '../../data/skills';
import SectionHead from '../ui/SectionHead';
import SkillBar from '../ui/SkillBar';

export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <SectionHead
          kicker="What I bring"
          title="Technical Skills"
          accentWord="Skills"
          subtitle="A versatile toolkit across data, development and infrastructure."
        />

        <div className="row g-4">
          {SKILL_CATEGORIES.map((cat, index) => (
            <div
              key={cat.title}
              className="col-md-6 col-lg-3"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="skill-card glass-card">
                <div className="skill-card-head">
                  <i className={cat.icon} />
                  <h3>{cat.title}</h3>
                </div>
                {cat.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
