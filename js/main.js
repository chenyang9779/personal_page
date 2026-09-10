/* ==========================================================================
   Chenyang Wu — Personal Website
   Minimal interactivity: nav toggle, theme detection, active section highlighting,
   section entrance animations
   ========================================================================== */

(function () {
  'use strict';

  // --- Progressive enhancement: enable reveal animations ---
  document.documentElement.classList.add('js');

  // --- Mobile navigation toggle ---
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open');
    });

    // Close menu when a link is clicked
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
  }

  // --- Close mobile nav on escape ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      navToggle.focus();
    }
  });

  // --- Active section highlighting ---
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.nav-menu a[href^="#"]');

  if (sections.length > 0 && navItems.length > 0) {
    function setActiveNav() {
      var scrollY = window.scrollY;
      var windowHeight = window.innerHeight;

      sections.forEach(function (section) {
        var top = section.offsetTop - 100;
        var bottom = top + section.offsetHeight;
        var id = section.getAttribute('id');

        if (scrollY >= top && scrollY < bottom) {
          navItems.forEach(function (link) {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('is-active');
            }
          });
        }
      });
    }

    // Initial call
    setActiveNav();

    // Throttled scroll listener
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          setActiveNav();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Section entrance transitions (IntersectionObserver) ---
  // Only enable reveal animations when JS is available AND IntersectionObserver is supported
  // AND the user does not prefer reduced motion. Without JS, CSS keeps everything visible.
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initReveals() {
    var animatedElements = document.querySelectorAll(
      '.section, .work-item, .timeline-company-entry, .about-content, .tech-grid, .education-grid, .publication'
    );

    if (prefersReducedMotion.matches || animatedElements.length === 0 || !window.IntersectionObserver) {
      return; // CSS already keeps content visible (no-JS or reduced-motion); nothing to animate
    }

    document.documentElement.classList.add('reveal-enabled');

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // Initial setup
  initReveals();

  // BFCache restore: restart hero SMIL traces (frozen timeline)
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      var heroSvg = document.querySelector('.hero-visual svg');
      if (heroSvg && typeof heroSvg.pauseAnimations === 'function') {
        heroSvg.pauseAnimations();
        heroSvg.setCurrentTime(0);
        heroSvg.unpauseAnimations();
      }
    }
  });

  // --- Theme detection (reads system preference for initial state) ---
  function getPreferredTheme() {
    var stored;
    try { stored = localStorage.getItem('theme'); } catch (_) { /* private browsing, blocked */ }
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme
  document.documentElement.setAttribute('data-theme', getPreferredTheme());

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    try {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    } catch (_) { /* private browsing, blocked */ }
  });

})();
