/* =============================================================
   PORTAFOLIO — main.js
   Funcionalidades:
   1. Tema claro / oscuro con persistencia en localStorage
   2. Menú responsive
   3. Resaltado del enlace activo al hacer scroll
   4. Filtro de proyectos por tecnología
   5. Modal con el detalle de cada proyecto
   6. Validación del formulario de contacto
   7. Botón para volver al inicio
   8. Valores de color en vivo en el Design System
   ============================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMenu();
  initActiveNav();
  initProjectFilter();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initTokenValues();
  setCurrentYear();
});

/* ---------- 1. Tema ---------- */
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Activar tema claro' : 'Activar tema oscuro');
    // El Design System muestra los valores reales del tema activo
    initTokenValues();
  };

  applyTheme(root.getAttribute('data-theme') || 'light');

  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* localStorage no disponible: el tema solo dura esta visita */
    }
  });
}

/* ---------- 2. Menú responsive ---------- */
function initMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  toggle.addEventListener('click', () => {
    setOpen(!menu.classList.contains('is-open'));
  });

  // Cerrar al elegir un enlace
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ---------- 3. Enlace activo según la sección visible ---------- */
function initActiveNav() {
  const links = document.querySelectorAll('.nav__menu a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', isCurrent);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- 4. Filtro de proyectos ---------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.projects .card');
  const status = document.getElementById('filter-status');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      let visible = 0;

      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));

      cards.forEach((card) => {
        const techs = card.dataset.tech.split(' ');
        const show = filter === 'all' || techs.includes(filter);
        card.hidden = !show;
        if (show) visible++;
      });

      if (status) {
        status.textContent = `Mostrando ${visible} ${visible === 1 ? 'proyecto' : 'proyectos'}`;
      }
    });
  });
}

/* ---------- 5. Modal de proyecto ---------- */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  if (!modal || typeof modal.showModal !== 'function') return;

  const title = modal.querySelector('.modal__title');
  const img = modal.querySelector('.modal__img');
  const body = modal.querySelector('.modal__body');
  let lastTrigger = null;

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      const cardImg = card.querySelector('.card__media img');
      const details = card.querySelector('.card__details');

      title.textContent = card.querySelector('.card__title').textContent;
      img.src = cardImg.getAttribute('src');
      img.alt = cardImg.getAttribute('alt');

      // Descripción + problema + detalles + tecnologías
      body.innerHTML = '';
      body.append(
        card.querySelector('.card__desc').cloneNode(true),
        card.querySelector('.card__problem').cloneNode(true)
      );
      if (details) {
        [...details.children].forEach((child) => body.append(child.cloneNode(true)));
      }
      body.append(card.querySelector('.tags').cloneNode(true));

      lastTrigger = button;
      modal.showModal();
    });
  });

  modal.querySelector('[data-close-modal]').addEventListener('click', () => modal.close());

  // Cerrar al hacer clic fuera del contenido (en el backdrop)
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });

  // Devolver el foco al botón que abrió el modal
  modal.addEventListener('close', () => {
    if (lastTrigger) lastTrigger.focus();
  });
}

/* ---------- 6. Validación del formulario ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    name: (value) => {
      if (!value) return 'Escribe tu nombre.';
      if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
      return '';
    },
    email: (value) => {
      if (!value) return 'Escribe tu correo electrónico.';
      if (!emailPattern.test(value)) return 'Escribe un correo válido, por ejemplo nombre@dominio.com.';
      return '';
    },
    message: (value) => {
      if (!value) return 'Escribe tu mensaje.';
      if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
      return '';
    }
  };

  const validateField = (field) => {
    const message = rules[field.name](field.value.trim());
    const errorEl = document.getElementById(`${field.name}-error`);
    field.setAttribute('aria-invalid', String(Boolean(message)));
    errorEl.textContent = message;
    return !message;
  };

  // Validar cuando la persona sale del campo, y re-validar mientras corrige
  Object.keys(rules).forEach((name) => {
    const field = form.elements[name];
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    const fields = Object.keys(rules).map((name) => form.elements[name]);
    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // GitHub Pages no procesa formularios. Aquí se simula el envío.
    // Para recibir mensajes reales puedes usar un servicio como Formspree.
    status.textContent = `Gracias, ${form.elements.name.value.trim()}. Tu mensaje fue enviado.`;
    form.reset();
    fields.forEach((field) => field.removeAttribute('aria-invalid'));
  });
}

/* ---------- 7. Volver al inicio ---------- */
function initBackToTop() {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  const onScroll = () => {
    button.classList.toggle('is-visible', window.scrollY > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  button.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}

/* ---------- 8. Design System: leer los valores reales de las variables ---------- */
function initTokenValues() {
  const styles = getComputedStyle(document.documentElement);
  document.querySelectorAll('[data-token]').forEach((el) => {
    el.textContent = styles.getPropertyValue(el.dataset.token).trim();
  });
}

/* ---------- Año del footer ---------- */
function setCurrentYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
