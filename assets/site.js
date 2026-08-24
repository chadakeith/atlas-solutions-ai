(function () {
  'use strict';

  const cfg = window.ATLAS_SITE || {};

  // ---------- Mobile navigation ----------
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (toggle && menu) {
    const close = () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => close());
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  // ---------- Scroll reveal ----------
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ---------- Analytics ----------
  let gtagReady = false;

  function trackEvent(name, params) {
    if (gtagReady && typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
    if (window.clarity && cfg.clarityProjectId) {
      window.clarity('event', name);
    }
  }

  function loadGA4(id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { anonymize_ip: true });
    gtagReady = true;
    trackEvent('page_view', { page_path: location.pathname });
  }

  function loadClarity(id) {
    (function (c, l, a, r, i) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      const t = l.createElement(r);
      t.async = 1;
      t.src = 'https://www.clarity.ms/tag/' + i;
      const y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', id);
  }

  if (cfg.gaMeasurementId) loadGA4(cfg.gaMeasurementId);
  if (cfg.clarityProjectId) loadClarity(cfg.clarityProjectId);

  // ---------- Form state from query params ----------
  if (new URLSearchParams(location.search).get('sent') === '1') {
    const thanks = document.getElementById('thanks');
    const form = document.getElementById('contact-form');
    if (thanks) thanks.style.display = 'block';
    if (form) form.style.display = 'none';
    trackEvent('form_submit_success', { form: 'contact' });
  }

  if (new URLSearchParams(location.search).get('subscribed') === '1') {
    const subThanks = document.getElementById('subscribe-thanks');
    if (subThanks) subThanks.style.display = 'block';
    trackEvent('form_submit_success', { form: 'blog_subscribe' });
  }

  const interest = new URLSearchParams(location.search).get('interest');
  const interestField = document.getElementById('f-interest');
  const messageField = document.getElementById('f-message');
  if (interest && interestField) interestField.value = interest;
  if (interest === 'readiness-call' && messageField && !messageField.value) {
    messageField.value = 'I\'d like to book a free AI Readiness Call.';
  }

  // Funnel: CTA and outbound clicks via data-track
  document.querySelectorAll('[data-track]').forEach((el) => {
    el.addEventListener('click', () => {
      trackEvent(el.getAttribute('data-track'), {
        link_url: el.href || '',
        link_text: (el.textContent || '').trim().slice(0, 80),
      });
    });
  });

  // Funnel: contact form submit intent
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      trackEvent('form_submit_start', { form: 'contact' });
    });
  }

  const subscribeForm = document.getElementById('subscribe-form');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', () => {
      trackEvent('form_submit_start', { form: 'blog_subscribe' });
    });
  }

  window.atlasTrack = trackEvent;
})();
