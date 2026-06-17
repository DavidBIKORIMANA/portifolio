import { CERTIFICATIONS } from '../../data/content';
import SectionHead from '../ui/SectionHead';

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <SectionHead
          kicker="Credentials"
          title="Certifications"
          subtitle="Continuous learning across data, security and development."
        />

        <div className="row g-4">
          {CERTIFICATIONS.map((group, index) => (
            <div key={group.title} className="col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="cert-card glass-card">
                <div className="cert-head">
                  <i className={group.icon} />
                  <h3>
                    {group.title}
                    {group.subtitle && <small> {group.subtitle}</small>}
                  </h3>
                </div>
                <ul className="cert-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-certificate" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
