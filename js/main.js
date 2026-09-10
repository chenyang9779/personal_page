/* ==========================================================================
   Chenyang Wu — Personal Website
   Minimal interactivity: nav toggle, theme detection, active section highlighting,
   section entrance animations
   ========================================================================== */

(function () {
  'use strict';

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
  var animatedElements = document.querySelectorAll(
    '.section, .work-item, .timeline-company-entry, .about-content, .tech-grid, .education-grid, .publication'
  );

  // Respect reduced-motion preference
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!prefersReducedMotion.matches && animatedElements.length > 0) {
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
  } else {
    // If reduced-motion is preferred, show all content immediately
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // --- Theme detection (reads system preference for initial state) ---
  function getPreferredTheme() {
    var stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme
  document.documentElement.setAttribute('data-theme', getPreferredTheme());

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

})();
