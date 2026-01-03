// Simple navigation toggle and image lightbox (no animations)
(() => {
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('site-nav');

  function setNavState(open) {
    if (!navList || !navToggle) return;
    navList.dataset.open = String(open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  }

  if (navToggle && navList) {
    setNavState(false);
    navToggle.addEventListener('click', () => {
      const open = navList.dataset.open === 'true';
      setNavState(!open);
    });
    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavState(false));
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxTriggers = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  let lastFocus = null;
  let currentIndex = -1;

  lightboxTriggers.forEach((trigger, idx) => {
    trigger.dataset.lbIndex = String(idx);
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt || 'Nagyított kép';
    if (lightboxCaption) {
      lightboxCaption.textContent = '';
    }
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (lightboxClose) {
      lightboxClose.focus();
    }
  }

  function openByIndex(idx) {
    if (!lightboxTriggers.length) return;
    const len = lightboxTriggers.length;
    currentIndex = ((idx % len) + len) % len;
    const trigger = lightboxTriggers[currentIndex];
    const src = trigger.getAttribute('data-lightbox-src');
    const alt = trigger.getAttribute('data-lightbox-alt') || trigger.getAttribute('aria-label') || trigger.getAttribute('title') || '';
    lastFocus = trigger;
    openLightbox(src, alt);
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target && e.target.closest ? e.target.closest('[data-lightbox-src]') : null;
    if (!trigger) return;
    e.preventDefault();
    const idx = Number.parseInt(trigger.dataset.lbIndex || '-1', 10);
    if (Number.isFinite(idx) && idx >= 0) {
      openByIndex(idx);
    } else {
      const src = trigger.getAttribute('data-lightbox-src');
      const alt = trigger.getAttribute('data-lightbox-alt') || trigger.getAttribute('aria-label') || trigger.getAttribute('title') || '';
      lastFocus = trigger;
      openLightbox(src, alt);
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  function showRelative(delta) {
    if (!lightboxTriggers.length || currentIndex < 0) return;
    openByIndex(currentIndex + delta);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      showRelative(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      showRelative(1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  const personModal = document.getElementById('person-modal');
  const personModalImage = document.getElementById('person-modal-image');
  const personModalTitle = document.getElementById('person-modal-title');
  const personModalBio = document.getElementById('person-modal-bio');
  const personModalClose = personModal ? personModal.querySelector('.person-modal__close') : null;
  const personTriggers = Array.from(document.querySelectorAll('.person-modal-trigger'));
  let personLastFocus = null;

  function closePersonModal() {
    if (!personModal) return;
    personModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (personLastFocus && typeof personLastFocus.focus === 'function') {
      personLastFocus.focus();
    }
  }

  function openPersonModal(trigger) {
    if (!personModal || !personModalImage || !personModalTitle || !personModalBio) return;
    const name = trigger.getAttribute('data-person-name') || '';
    const bio = trigger.getAttribute('data-person-bio') || '';
    const image = trigger.getAttribute('data-person-image') || '';
    personLastFocus = trigger;
    personModalImage.src = image;
    personModalImage.alt = name;
    personModalTitle.textContent = name;
    personModalBio.textContent = bio;
    personModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (personModalClose) {
      personModalClose.focus();
    }
  }

  personTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openPersonModal(trigger));
  });

  if (personModalClose) {
    personModalClose.addEventListener('click', closePersonModal);
  }

  if (personModal) {
    personModal.addEventListener('click', (e) => {
      if (e.target === personModal) {
        closePersonModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closePersonModal();
    } else if (e.key === 'ArrowLeft') {
      showRelative(-1);
    } else if (e.key === 'ArrowRight') {
      showRelative(1);
    }
  });

  const rowLinks = Array.from(document.querySelectorAll('[data-row-link]'));
  rowLinks.forEach((row) => {
    const href = row.getAttribute('data-row-link');
    if (!href) return;
    row.addEventListener('click', (e) => {
      if (e.target && e.target.closest && e.target.closest('a, button')) return;
      const target = row.getAttribute('data-row-link-target') || '_self';
      window.open(href, target);
    });
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        row.click();
      }
    });
  });
})();
