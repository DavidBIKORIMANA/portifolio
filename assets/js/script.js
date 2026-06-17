/* =============================================================
 *  David Bikorimana — Portfolio
 *  Vanilla JS interactions
 * ============================================================= */
(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
   * 1. PAGE LOADER
   * -------------------------------------------------------- */
  window.addEventListener('load', () => {
    const loader = $('#pageLoader');
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 400);
    }
  });

  /* ----------------------------------------------------------
   * 2. AOS INIT
   * -------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: prefersReduced
    });
  }

  /* ----------------------------------------------------------
   * 3. NAVBAR SCROLL STATE + SCROLL PROGRESS
   * -------------------------------------------------------- */
  const nav = $('#mainNav');
  const progress = $('#scrollProgress');
  const backToTop = $('#backToTop');

  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (nav) nav.classList.toggle('scrolled', scrollTop > 40);
    if (backToTop) backToTop.classList.toggle('show', scrollTop > 500);
    if (progress) {
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = pct + '%';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
   * 4. BACK TO TOP
   * -------------------------------------------------------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ----------------------------------------------------------
   * 5. MOBILE NAV — close on link click
   * -------------------------------------------------------- */
  const navCollapse = $('#navMenu');
  $$('#navMenu .nav-link, #navMenu .btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show') && window.bootstrap) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) ||
          new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* ----------------------------------------------------------
   * 6. TYPING EFFECT
   * -------------------------------------------------------- */
  const typedEl = $('#typed');
  if (typedEl) {
    const roles = [
      'Database Administrator',
      'Data Analyst',
      'Full Stack Developer',
      'IT Support Specialist'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const current = roles[roleIndex];
      if (deleting) {
        charIndex--;
      } else {
        charIndex++;
      }
      typedEl.textContent = current.substring(0, charIndex);

      let delay = deleting ? 45 : 90;

      if (!deleting && charIndex === current.length) {
        delay = 1800;
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      setTimeout(type, delay);
    };

    if (prefersReduced) {
      typedEl.textContent = roles[0];
    } else {
      setTimeout(type, 600);
    }
  }

  /* ----------------------------------------------------------
   * 7. ANIMATED COUNTERS + SKILL BARS (IntersectionObserver)
   * -------------------------------------------------------- */
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(tick);
  };

  const counters = $$('.counter');
  const skillBars = $$('.skill-bar .bar b');

  if ('IntersectionObserver' in window) {
    const counterObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => counterObs.observe(c));

    const barObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const b = entry.target;
          b.style.width = (b.dataset.width || 0) + '%';
          obs.unobserve(b);
        }
      });
    }, { threshold: 0.3 });
    skillBars.forEach((b) => barObs.observe(b));
  } else {
    counters.forEach(animateCounter);
    skillBars.forEach((b) => (b.style.width = (b.dataset.width || 0) + '%'));
  }

  /* ----------------------------------------------------------
   * 8. PROJECT FILTERS
   * -------------------------------------------------------- */
  const filterBtns = $$('.filter-btn');
  const projectItems = $$('.project-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      projectItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hide', !match);
      });

      if (window.AOS) AOS.refresh();
    });
  });

  /* ----------------------------------------------------------
   * 9. HERO PARTICLES
   * -------------------------------------------------------- */
  const particlesEl = $('#particles');
  if (particlesEl && !prefersReduced) {
    const count = window.innerWidth < 768 ? 18 : 36;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = Math.random() * 4 + 1;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-10px';
      p.style.animationDuration = (Math.random() * 18 + 12) + 's';
      p.style.animationDelay = (Math.random() * 12) + 's';
      frag.appendChild(p);
    }
    particlesEl.appendChild(frag);
  }

  /* ----------------------------------------------------------
   * 10. CONTACT FORM VALIDATION
   * -------------------------------------------------------- */
  const form = $('#contactForm');
  const status = $('#formStatus');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      $$('input, textarea', form).forEach((field) => {
        if (!field.checkValidity()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });

      if (!valid) {
        if (status) {
          status.textContent = 'Please fill in all fields correctly.';
          status.className = 'form-status error';
        }
        return;
      }

      const btn = $('button[type="submit"]', form);
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      // Simulate async send (replace with real endpoint / mailto integration)
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = original;
        form.reset();
        if (status) {
          status.textContent = 'Thank you! Your message has been sent successfully.';
          status.className = 'form-status success';
        }
        setTimeout(() => {
          if (status) { status.textContent = ''; status.className = 'form-status'; }
        }, 6000);
      }, 1500);
    });

    $$('input, textarea', form).forEach((field) => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) field.classList.remove('is-invalid');
      });
    });
  }

  /* ----------------------------------------------------------
   * 11. DYNAMIC FOOTER YEAR
   * -------------------------------------------------------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
   * 12. SMOOTH ANCHOR SCROLL (fallback for older browsers)
   * -------------------------------------------------------- */
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id.length > 1) {
        const target = $(id);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });
})();
