import { ABOUT_HIGHLIGHTS, SITE, STATS } from '../../data/siteData';
import Counter from '../ui/Counter';
import SectionHead from '../ui/SectionHead';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead
          kicker="Get to know me"
          title="About Me"
          accentWord="Me"
          subtitle="A passion for data, systems and clean software."
        />

        <div className="row g-5 align-items-center">
          <div className="col-lg-5" data-aos="fade-right">
            <div className="about-visual glass-card">
              <div className="about-image-frame">
                <img
                  src={SITE.aboutImage}
                  alt="David Bikorimana"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://placehold.co/520x560/112240/FFD333?text=About+David';
                  }}
                />
                <div className="image-overlay" aria-hidden="true" />
              </div>
              <div className="about-experience">
                <span className="num">7<span className="text-accent">+</span></span>
                <span className="lbl">Years of Experience</span>
              </div>
            </div>
          </div>

          <div className="col-lg-7" data-aos="fade-left">
            <h3 className="about-heading">
              Database Administrator & Data Analyst crafting reliable, data-driven systems.
            </h3>
            <p className="about-text">
              I am a results-driven <strong>Database Administrator</strong> and <strong>Data Analyst</strong> with
              over <strong>7 years</strong> of professional experience in database administration, ETL pipeline
              development, SQL scripting, financial systems reporting, and IT technical support. I design, maintain
              and optimize relational and non-relational databases — <strong>MySQL, PostgreSQL and MongoDB</strong> —
              across production and non-production environments.
            </p>
            <p className="about-text">
              I build ETL pipelines using Shell scripting, <strong>Apache Airflow</strong> and <strong>Apache
              Kafka</strong>; produce daily, monthly, quarterly and annual management &amp; regulatory reports; and
              perform <strong>EOD / EOM / EOY</strong> system-closing activities. My work spans the microfinance,
              healthcare, hospitality and cooperative sectors across Rwanda, with additional full-stack development
              expertise in PHP/Laravel, Python and JavaScript.
            </p>

            <ul className="about-list">
              {ABOUT_HIGHLIGHTS.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-check" /> {item}
                </li>
              ))}
            </ul>

            <div className="about-contact-row">
              <a href={SITE.cvPath} download className="btn btn-accent">
                <i className="fa-solid fa-download" /> Download CV
              </a>
              <div className="about-mini-contact">
                <span><i className="fa-solid fa-location-dot text-accent" /> {SITE.location}</span>
                <span><i className="fa-solid fa-phone text-accent" /> {SITE.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 stats-row" data-aos="fade-up">
          {STATS.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
