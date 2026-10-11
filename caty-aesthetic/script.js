// Caty Aesthetic — Navigation, Mobile-Menü, Scroll-Reveal, Formular
document.documentElement.classList.remove('no-js');
(function () {
  const header = document.querySelector('.header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  // Header-Hintergrund beim Scrollen
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile-Menü
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Scroll-Reveal
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // Impressum/Datenschutz: <details> öffnen bei Link-Klick oder direktem Hash
  const openLegalFromHash = () => {
    const id = location.hash.slice(1);
    if (id !== 'impressum' && id !== 'datenschutz') return;
    const el = document.getElementById(id);
    el.open = true;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  window.addEventListener('hashchange', openLegalFromHash);
  document.querySelectorAll('a[href="#impressum"], a[href="#datenschutz"]').forEach((a) => {
    a.addEventListener('click', () => { if (location.hash === a.getAttribute('href')) openLegalFromHash(); });
  });
  openLegalFromHash();

  // Bild-Fallback: falls ein Foto fehlt, sauberer Marken-Platzhalter statt «kaputtem» Bild
  const fallback = (img) => {
    const wrap = img.closest('.hero__media, .card__img, .about__media, .gallery__item');
    if (!wrap) return;
    wrap.classList.add('img-missing');
    wrap.setAttribute('data-label', img.getAttribute('alt') || 'Caty Aesthetic');
    img.style.display = 'none';
  };
  document.querySelectorAll('main img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) fallback(img);
    img.addEventListener('error', () => fallback(img));
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  // Formular: Validierung + Versand via Formspree (AJAX)
  const form = document.getElementById('form');
  const status = document.getElementById('form-status');
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const ok = f.type === 'checkbox' ? f.checked : f.type === 'email' ? emailOk(f.value.trim()) : f.value.trim() !== '';
      (f.type === 'checkbox' ? f.closest('label') : f).classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) {
      status.className = 'form__status err';
      status.textContent = 'Bitte fülle alle Pflichtfelder (*) korrekt aus.';
      return;
    }
    if (form.action.includes('YOUR_FORM_ID')) {
      status.className = 'form__status err';
      status.textContent = 'Formular noch nicht aktiv — bitte schreib mir direkt per Instagram-DM.';
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    status.className = 'form__status';
    status.textContent = 'Wird gesendet …';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.className = 'form__status ok';
      status.textContent = 'Danke für deine Anfrage! Ich melde mich so bald wie möglich bei dir. 🤍';
    } catch (err) {
      status.className = 'form__status err';
      status.textContent = 'Senden fehlgeschlagen. Bitte versuch es nochmals oder schreib mir per Instagram-DM.';
    } finally {
      btn.disabled = false;
    }
  });
})();
