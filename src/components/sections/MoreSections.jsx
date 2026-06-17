import { REFERENCES, SERVICES } from '../../data/content';
import SectionHead from '../ui/SectionHead';

export function Services() {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <SectionHead
          kicker="How I can help"
          title="My Services"
          accentWord="Services"
          subtitle="End-to-end technology services for modern businesses."
        />

        <div className="row g-4">
          {SERVICES.map((service, index) => (
            <div key={service.title} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={(index % 4) * 100}>
              <div className="service-card glass-card">
                <div className="service-icon"><i className={service.icon} /></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function References() {
  return (
    <section className="section" id="references">
      <div className="container">
        <SectionHead
          kicker="Endorsements"
          title="Professional References"
          accentWord="References"
          subtitle="Trusted by leaders across software, banking and academia. Full contact details available on request."
        />

        <div className="row g-4">
          {REFERENCES.map((ref, index) => (
            <div key={ref.name} className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="reference-card glass-card">
                <div className="ref-avatar">{ref.initials}</div>
                <h3>{ref.name}</h3>
                <span className="ref-role">{ref.role}</span>
                <p className="ref-org">{ref.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
