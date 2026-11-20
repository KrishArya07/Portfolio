/* Krish Arya — Portfolio v4 : cinematic scroll, navigation and motion */

(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Mobile navigation ---------- */
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('nav-links');
  var backdrop = document.getElementById('menu-backdrop');

  function closeMenu() {
    if (!toggle || !menu) return;
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    if (backdrop) backdrop.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 760) closeMenu(); });
  }

  /* ---------- Scroll-driven state ---------- */
  var progress = document.getElementById('scroll-progress');
  var header = document.querySelector('.site-header');
  var backtop = document.getElementById('backtop');
  var ticking = false;

  function updateScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;

    if (progress) progress.style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0).toFixed(2) + '%';
    if (header) header.classList.toggle('scrolled', y > 24);
    if (backtop) backtop.classList.toggle('show', y > 700);

    ticking = false;
  }

  function requestScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }

  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll);
  window.addEventListener('load', requestScroll);
  updateScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var bars = document.querySelectorAll('.metric-bars');

  function showAll() {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    bars.forEach(function (el) { el.classList.add('is-visible'); });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = (el.dataset.count || '0') + (el.dataset.suffix || '');
    });
  }

  if (reduce || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        if (entry.target.hasAttribute('data-count')) countUp(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
    bars.forEach(function (el) { io.observe(el); });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      if (!el.classList.contains('reveal')) io.observe(el);
    });
  }

  /* ---------- Count up ---------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || '';
    var start = performance.now();
    var duration = 1200;

    function frame(now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Active nav ---------- */
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var isCurrent = href === current || (current === '' && href === 'index.html') ||
      (href === 'index.html' && (current === '' || current === '/'));
    if (isCurrent) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* In-page section highlight for home */
  var sections = document.querySelectorAll('main section[id]');
  if (sections.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { threshold: 0.28, rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }
})();
