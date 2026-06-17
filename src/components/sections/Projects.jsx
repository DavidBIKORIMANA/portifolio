import { useState } from 'react';
import AOS from 'aos';
import { PROJECTS, PROJECT_FILTERS } from '../../data/projects';
import SectionHead from '../ui/SectionHead';

function ProjectCard({ project, index }) {
  const [imgSrc, setImgSrc] = useState(project.image);

  return (
    <div
      className="col-md-6 col-lg-4 project-item"
      data-aos="zoom-in"
      data-aos-delay={(index % 3) * 100}
    >
      <article className="project-card glass-card">
        <div className="project-thumb">
          <img
            loading="lazy"
            src={imgSrc}
            alt={`${project.title} screenshot`}
            onError={() => setImgSrc(project.fallback)}
          />
          <div className="project-overlay">
            {project.demo ? (
              <>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-btn" aria-label="Live demo">
                  <i className="fa-solid fa-up-right-from-square" />
                </a>
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="proj-btn" aria-label="Visit site">
                  <i className="fa-solid fa-globe" />
                </a>
              </>
            ) : (
              <span className="overlay-title">{project.title}</span>
            )}
          </div>
        </div>
        <div className="project-body">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tags">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {project.demo && (
            <div className="project-links">
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-accent">
                <i className="fa-solid fa-up-right-from-square" /> Live Demo
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const handleFilter = (id) => {
    setFilter(id);
    setTimeout(() => AOS.refresh(), 50);
  };

  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <SectionHead
          kicker="Selected work"
          title="Featured Projects"
          accentWord="Projects"
          subtitle="Enterprise platforms delivered across healthcare, finance and hospitality."
        />

        <div className="project-filters" data-aos="fade-up">
          {PROJECT_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`filter-btn${filter === id ? ' active' : ''}`}
              onClick={() => handleFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="row g-4" id="projectsGrid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
