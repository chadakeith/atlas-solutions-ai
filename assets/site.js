// Scroll-reveal
const io = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Post-submit thank-you (FormSubmit redirects back with ?sent=1)
if (new URLSearchParams(location.search).get('sent') === '1') {
  const t = document.getElementById('thanks');
  const f = document.getElementById('contact-form');
  if (t) t.style.display = 'block';
  if (f) f.style.display = 'none';
}
