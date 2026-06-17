import { EDUCATION, EXPERIENCE } from '../../data/experience';
import SectionHead from '../ui/SectionHead';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead
          kicker="My journey"
          title="Work Experience"
          accentWord="Experience"
          subtitle="7+ years of building and supporting enterprise systems."
        />

        <div className="timeline">
          {EXPERIENCE.map((item, index) => (
            <div key={item.title} className="timeline-item" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="timeline-dot"><i className={item.icon} /></div>
              <div className="timeline-content glass-card">
                <span className="timeline-date">{item.date}</span>
                <h3>{item.title}</h3>
                <h4>{item.company}</h4>
                <ul className="timeline-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="education-block" data-aos="fade-up">
          <h3 className="education-title">
            <i className="fa-solid fa-graduation-cap text-accent" /> Education
          </h3>
          <div className="row g-4">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="col-md-6">
                <div className="edu-card glass-card">
                  <span className="edu-date">{edu.date}</span>
                  <h4>{edu.degree}</h4>
                  <p>{edu.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
