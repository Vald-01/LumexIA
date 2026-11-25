// LumexIA : interactions du site (ambiance Jour/Nuit, menu, panier de démonstration, arc de la journée, calculateur).
(() => {
  const root = document.documentElement;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* stockage indisponible : on continue sans */ } },
  };
  const euro = (n) => n.toLocaleString('fr-BE', { style: 'currency', currency: 'EUR' });

  // Ambiance Jour / Nuit
  const themeBtn = document.querySelector('.theme-switch');
  const isNight = () => root.dataset.theme ? root.dataset.theme === 'nuit' : matchMedia('(prefers-color-scheme: dark)').matches;
  const syncTheme = () => {
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-pressed', String(isNight()));
    themeBtn.setAttribute('aria-label', isNight() ? 'Passer en ambiance Jour' : 'Passer en ambiance Nuit');
  };
  themeBtn?.addEventListener('click', () => {
    root.dataset.theme = isNight() ? 'jour' : 'nuit';
    store.set('lumexia-theme', root.dataset.theme);
    syncTheme();
  });
  syncTheme();

  // Menu mobile
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.main-nav');
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  // Toast
  const toast = document.createElement('div');
  toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  document.body.append(toast);
  let toastTimer;
  const notify = (msg) => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); };

  // Panier de démonstration (reste dans le navigateur)
  const SHIPPING = 4.9, FREE_FROM = 49;
  let cart = store.get('lumexia-cart', []);
  const drawer = document.querySelector('.cart-drawer');
  const backdrop = document.querySelector('.cart-backdrop');
  const list = document.querySelector('.cart-items');
  const counts = document.querySelectorAll('.cart-count');
  const openCart = (open) => {
    drawer?.classList.toggle('open', open); backdrop?.classList.toggle('open', open);
    drawer?.setAttribute('aria-hidden', String(!open));
    if (open) drawer?.querySelector('.cart-close')?.focus();
  };
  const render = () => {
    store.set('lumexia-cart', cart);
    const qty = cart.reduce((s, i) => s + i.qty, 0);
    counts.forEach((c) => { c.textContent = qty; });
    if (!list) return;
    const sub = cart.reduce((s, i) => s + i.qty * i.price, 0);
    const ship = sub === 0 || sub >= FREE_FROM ? 0 : SHIPPING;
    list.innerHTML = cart.length ? cart.map((i, idx) => `
      <li>
        <div><strong>${i.name}</strong><br><span class="muted">${euro(i.price)}</span></div>
        <div class="qty">
          <button type="button" data-dec="${idx}" aria-label="Retirer un ${i.name}">−</button>
          <span class="data" aria-label="Quantité">${i.qty}</span>
          <button type="button" data-inc="${idx}" aria-label="Ajouter un ${i.name}">+</button>
        </div>
      </li>`).join('') : '<li class="cart-empty">Ton panier est vide. Pour l\'instant.</li>';
    document.querySelector('[data-sub]').textContent = euro(sub);
    document.querySelector('[data-ship]').textContent = sub === 0 ? '—' : ship === 0 ? 'Offerte' : euro(ship);
    document.querySelector('[data-total]').textContent = euro(sub + ship);
    const left = FREE_FROM - sub;
    document.querySelector('[data-free]').textContent = sub > 0 && left > 0 ? `Plus que ${euro(left)} pour la livraison offerte.` : sub > 0 ? 'Livraison offerte ✓' : '';
  };
  list?.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]'), dec = e.target.closest('[data-dec]');
    if (inc) cart[+inc.dataset.inc].qty++;
    if (dec) { const i = +dec.dataset.dec; cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); }
    render();
  });
  document.addEventListener('click', (e) => {
    const add = e.target.closest('[data-add]');
    if (add) {
      let { id, name, price } = add.dataset;
      const form = add.closest('form');
      const picked = form?.querySelector('input[name="variant"]:checked');
      if (picked) { id = picked.value; name = picked.dataset.name; price = picked.dataset.price; }
      const found = cart.find((i) => i.id === id);
      found ? found.qty++ : cart.push({ id, name, price: +price, qty: 1 });
      render(); notify(`${name} ajouté au panier`);
      e.preventDefault();
    }
    if (e.target.closest('.cart-open')) openCart(true);
    if (e.target.closest('.cart-close') || e.target === backdrop) openCart(false);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') openCart(false); });
  document.querySelector('.checkout')?.addEventListener('click', () => notify("Démo : aucune commande n'est possible sur ce projet d'examen."));
  render();

  // Prix affiché selon la variante choisie
  document.querySelectorAll('input[name="variant"]').forEach((r) => r.addEventListener('change', () => {
    const out = document.querySelector('.pdp-price');
    if (out) out.textContent = euro(+r.dataset.price);
  }));

  // L'arc de la journée
  const arc = document.querySelector('[data-arc]');
  if (arc) {
    const tabs = [...arc.querySelectorAll('[role="tab"]')];
    const slides = [...arc.querySelectorAll('.arc-stage .ph')];
    const panels = [...arc.querySelectorAll('[role="tabpanel"]')];
    const range = arc.querySelector('.arc-range');
    const glow = arc.querySelector('.arc-glow');
    const show = (i, focus) => {
      tabs.forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      slides.forEach((s, j) => s.classList.toggle('on', i === j));
      glow.style.setProperty('--moment', tabs[i].dataset.color);
      range.value = i;
      if (focus) tabs[i].focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => show(i));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') show((i + 1) % tabs.length, true);
        if (e.key === 'ArrowLeft') show((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    range.addEventListener('input', () => show(+range.value));
    show(0);
  }

  // Calculateur de consommation (estimation)
  const calc = document.querySelector('[data-calc]');
  if (calc) {
    const f = (n) => +calc.querySelector(`[name="${n}"]`).value || 0;
    const update = () => {
      const days = 365, kwh = f('price');
      const lamps = f('lamps'), hours = f('hours');
      const oldW = f('oldw'), newW = 9;
      const oldCost = lamps * oldW * hours * days / 1000 * kwh;
      const auto = 1 - Math.min(f('auto'), 100) / 100; // part du temps évitée grâce aux minuteries et à l'absence
      const newCost = lamps * newW * hours * auto * days / 1000 * kwh;
      calc.querySelector('output').textContent = euro(Math.max(oldCost - newCost, 0));
      calc.querySelector('[data-old]').textContent = euro(oldCost);
      calc.querySelector('[data-new]').textContent = euro(newCost);
      const max = Math.max(oldCost, 1);
      calc.querySelector('[data-old-bar]').style.width = `${(oldCost / max) * 100}%`;
      calc.querySelector('[data-new-bar]').style.width = `${(newCost / max) * 100}%`;
    };
    calc.addEventListener('input', update);
    update();
  }

  // Formulaires de démonstration
  document.querySelectorAll('form[data-demo]').forEach((form) => form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = form.querySelector('.form-msg') || form.parentElement.querySelector('.form-msg');
    if (msg) msg.textContent = form.dataset.demo;
    form.reset();
  }));

  // Compte à rebours de campagne : suit les vraies dates (avant, pendant, terminé), ne recommence jamais
  const bf = document.querySelector('[data-bf]');
  if (bf) {
    const start = new Date(bf.dataset.start).getTime(), end = new Date(bf.dataset.end).getTime();
    const label = bf.querySelector('[data-bf-label]');
    const unit = (u) => bf.querySelector(`[data-u="${u}"]`);
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const now = Date.now();
      const phase = now < start ? 'avant' : now <= end ? 'pendant' : 'apres';
      bf.dataset.phase = phase;
      if (phase === 'apres') { label.textContent = "L'offre Black Friday est terminée depuis le lundi 30 novembre à 23 h 59. Les prix sont revenus à la normale."; return false; }
      const left = Math.max(0, Math.floor(((phase === 'avant' ? start : end) - now) / 1000));
      const j = Math.floor(left / 86400), h = Math.floor(left % 86400 / 3600), m = Math.floor(left % 3600 / 60), s = left % 60;
      unit('j').textContent = j; unit('jl').textContent = j > 1 ? 'jours' : 'jour'; unit('h').textContent = pad(h); unit('m').textContent = pad(m); unit('s').textContent = pad(s);
      const txt = phase === 'avant' ? "L'offre commence dans" : "L'offre se termine dans";
      label.innerHTML = `${txt}<span class="sr-only"> ${j} jour${j > 1 ? 's' : ''}, ${h} heure${h > 1 ? 's' : ''} et ${m} minute${m > 1 ? 's' : ''}${phase === 'avant' ? ', le vendredi 27 novembre à 0 h' : ', le lundi 30 novembre à 23 h 59'}</span>`;
      return true;
    };
    if (tick()) { const t = setInterval(() => { if (!tick()) clearInterval(t); }, 1000); }
  }

  // Apparition douce
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .12 }) : null;
  document.querySelectorAll('.reveal').forEach((el) => io ? io.observe(el) : el.classList.add('in'));
})();
