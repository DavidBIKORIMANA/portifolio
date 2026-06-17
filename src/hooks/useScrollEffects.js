import { useEffect, useState } from 'react';

export function useScrollEffects() {
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], header[id]');

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(scrollTop > 40);
      setShowBackToTop(scrollTop > 500);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      let current = 'home';
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (scrollTop >= top) current = section.id;
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return { scrolled, showBackToTop, progress, activeSection, scrollToTop, scrollTo };
}
