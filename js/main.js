/* ============================================================
   TDZ TOTAALBOUW — MAIN JS
   ============================================================ */

(function () {
  'use strict';

  // ---- NAV: scroll state ----
  const nav = document.getElementById('nav');

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // ---- NAV: mobile toggle ----
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on nav link click (mobile)
    navMenu.querySelectorAll('.nav__link, .nav__cta').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Menu openen');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  // ---- SCROLL REVEAL ----
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    reveals.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- FOOTER YEAR ----
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- CONTACT FORM: basic feedback ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;

      // Simple validation
      const required = form.querySelectorAll('[required]');
      let valid = true;

      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#e05a2a';
          valid = false;
        }
      });

      if (!valid) return;

      // Simulate send (no backend in static build)
      btn.textContent = 'Verstuurd ✓';
      btn.style.background = '#2a7a4a';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
