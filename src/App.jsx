import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

import PageLoader from './components/layout/PageLoader';
import ScrollProgress from './components/layout/ScrollProgress';
import Navbar from './components/layout/Navbar';
import BackToTop from './components/layout/BackToTop';
import Footer from './components/layout/Footer';

import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Certifications from './components/sections/Certifications';
import { References, Services } from './components/sections/MoreSections';
import Contact from './components/sections/Contact';

import { useScrollEffects } from './hooks/useScrollEffects';

export default function App() {
  const {
    scrolled,
    showBackToTop,
    progress,
    activeSection,
    scrollToTop,
    scrollTo,
  } = useScrollEffects();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: reduced,
    });
  }, []);

  return (
    <>
      <PageLoader />
      <ScrollProgress progress={progress} />
      <Navbar scrolled={scrolled} activeSection={activeSection} onNavigate={scrollTo} />
      <Hero onNavigate={scrollTo} />
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Services />
        <References />
        <Contact />
      </main>
      <Footer onNavigate={scrollTo} />
      <BackToTop show={showBackToTop} onClick={scrollToTop} />
    </>
  );
}
