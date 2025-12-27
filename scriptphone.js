/* Phone Flipbook Logic - Single Page, Vertical Animation */
(function(){
  const flipbook = document.getElementById('flipbook');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const ANIM = 'transform 800ms cubic-bezier(0.25, 0.8, 0.25, 1)';

  const LOREM = (
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '+
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '+
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '+
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '+
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  );

  // Define pages (1-based index for user-facing numbering)
  const pages = [
    { title: "Fhír'vindel", cover: true, content: '' },
    { title: 'Rólunk', content: [
      { type: 'html', html: '<div class="rolunk-layout"><table class="rolunk-table"><tr><td class="rolunk-left"><p>Nyári táborunk keretein belül a gyerekek két hétre egy képzelt középkori királyság falai közé kerülhetnek. Napjaink közös játékkal, sporttal, zenéléssel és kézműveskedéssel telnek, nagyrészt a természetben.</p></td><td class="rolunk-right"><img class="rolunk-img" src="képek/using/harc.jpg" alt="Rólunk"></td></tr></table><div class="rolunk-bottom"><p>Minden táborozó részese a „királysági életnek”, ami azt jelenti, hogy a gyerekek saját karaktereiket megalkotva vesznek részt a birodalom olyan ügyes-bajos dolgaiban, mint a királyválasztás, a csatározás vagy éppen a varázslás. Bárki lehet lovag, mágus, gyógyító, de még kereskedő is, csak a képzelet szab határt. Esténként együtt ülünk tábortüzet, énekelünk és néha éjjeli küldetésekre indulunk.</p><p>Tartsatok velünk, és kezdjük együtt az első Birodalmi Évünket!</p><figure class="page-image"><img src="képek/using/optional.jpg" alt="Képek a táborról" style="max-width: 100%; max-height: 180px; width: auto; height: auto; object-fit: contain; border-radius: 12px;"></figure></div></div>' }
    ] },
    { title: 'Információ', content: [
      { type: 'html', html: '<div class="info-layout"><div class="info-left"><table class="info-table"><tr><th colspan="2">Adatok</th></tr><tr><td>Időpont:</td><td>2026 Július 11-25</td></tr><tr><td>Helyszín:</td><td><a href="https://maps.app.goo.gl/M6mYZJnsFVdb4jcn" target="_blank" rel="noopener">Kövér Egér Tanya Kulcsosház- Szőc</a></td></tr><tr><td>Kiknek?</td><td>9-14 éves gyerekeket</td></tr><tr><td>Ár:</td><td>150 000Ft</td></tr></table></div><div class="info-image"><img src="képek/using/haz.jpg" alt="Ház" style="transform: rotate(-10deg);"></div><div class="info-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2721.0335002951624!2d17.522612776194396!3d47.000315171140485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47690c7efa2928ad%3A0xbac99b398dee5a9e!2zS8O2dsOpciBFZ8OpciBUYW55YSBLdWxjc29zaMOheg!5e0!3m2!1shu!2shu!4v1766850594207!5m2!1shu!2shu" style="border:0; transform: rotate(10deg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>' }
    ] },
    { title: 'Chapter 1', content: LOREM },
    { title: 'Chapter 1.2', content: LOREM },
    { title: 'Chapter 2', content: [
      { type: 'html', html: '<p class="lead-gallery-intro">Ezek a képek Aquilonból a szülőtáborunkból vannak, hiszen a mi táborunk csak idén indul. Számítunk a csatlakozásodra!</p>' },
      { type: 'html', html: '<div id="gallery-p6" class="gallery-stamped" aria-label="Galéria (6)"></div>' }
    ] },
    { title: 'Chapter 2.2', content: [
      { type: 'html', html: '<div id="gallery-p7" class="gallery-stamped" aria-label="Galéria (7)"></div>' }
    ] },
    { title: 'Chapter 3', content: [
      { type: 'html', html: '<div class="people-grid" role="grid" aria-label="Tábor vezetők">'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '</div>' }
    ] },
    { title: 'Chapter 3.2', content: [
      { type: 'html', html: '<div class="people-grid two-cols" role="grid" aria-label="Tábor vezetők">'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde <br>(Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde (Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde (Székely Márton)</div></button>'
        + '<button class="person-card" type="button" data-name="Mevde (Székely Márton)" data-info="További információ hamarosan." data-img="képek/using/people/Medve.jpg"><div class="person-figure"><img src="képek/using/people/Medve.jpg" alt="Mevde (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Mevde (Székely Márton)</div></button>'
        + '</div>' }
    ] },
    { title: 'Elérhetőség', content: [
      { type: 'html', html: '<div class="contact-wrapper"><div class="contact-container"><table class="contact-table"><tr><td class="contact-icon">📞</td><td><strong>Telefonszám:</strong></td><td><a href="tel:+36209117382">+36 20 9117 382</a></td></tr><tr><td class="contact-icon">✉️</td><td><strong>E-mail cím:</strong></td><td><a href="mailto:fhirvindel@gmail.com">fhirvindel@gmail.com</a></td></tr><tr><td class="contact-icon">🌐</td><td><strong>Weboldal:</strong></td><td>Hamarosan</td></tr><tr><td class="contact-icon">📘</td><td><strong>Facebook:</strong></td><td><a href="https://facebook.com/fhirvindel" target="_blank" rel="noopener">@fhír\'vindel</a></td></tr><tr><td class="contact-icon">📷</td><td><strong>Instagram:</strong></td><td>Hamarosan</td></tr></table></div><figure class="page-image"><img src="képek/using/contacts.jpg" alt="Elérhetőség"></figure></div>' }
    ] },
    { title: 'Jelentkezés', content: [
      { type: 'html', html: '<div data-customgform="cmikgtbh10003wnc04z53c26w"></div>' }
    ] },
    { title: 'The End', backCover: true, content: 'Thanks for reading.' },
  ];
  
    // People modal interactions (pages 8-9)
    function ensurePersonModal(){
      let modal = document.getElementById('personModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'personModal';
        modal.className = 'modal';
        modal.innerHTML = (
          '<div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="personModalTitle">'+
            '<div class="modal-header">'+
              '<h3 class="modal-title" id="personModalTitle">Tábor vezető</h3>'+
              '<button type="button" class="modal-close" aria-label="Bezárás">Bezár</button>'+
            '</div>'+
            '<div class="modal-body">'+
              '<img class="modal-image" alt="Személy képe">'+
              '<div class="modal-text">További szöveg később kerül ide.</div>'+
            '</div>'+
          '</div>'
        );
        document.body.appendChild(modal);
        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => closePersonModal());
        modal.addEventListener('click', (e) => { if (e.target === modal) closePersonModal(); });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePersonModal(); });
      }
      return modal;
    }

    function openPersonModal(data){
      const modal = ensurePersonModal();
      const img = modal.querySelector('.modal-image');
      const title = modal.querySelector('.modal-title');
      const text = modal.querySelector('.modal-text');
      if (img) { img.src = data.img || 'képek/using/people/Medve.jpg'; img.alt = data.name || 'Tábor vezető'; }
      if (title) { title.textContent = data.name || 'Tábor vezető'; }
      if (text) { text.textContent = data.info || 'Részletek hamarosan.'; }
      modal.classList.add('open');
      document.body.classList.add('menu-open');
    }

    function closePersonModal(){
      const modal = document.getElementById('personModal');
      if (modal) modal.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    // Delegate clicks to open modal
    flipbook.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest ? e.target.closest('.person-card') : null;
      if (!btn) return;
      const data = {
        img: btn.getAttribute('data-img') || '',
        name: btn.getAttribute('data-name') || '',
        info: btn.getAttribute('data-info') || ''
      };
      openPersonModal(data);
    });

  // Build sheets: One page per sheet for phone
  const sheets = [];
  const baseZOrder = [];
  
  for (let i = 0; i < pages.length; i++) {
    const sheetEl = document.createElement('div');
    sheetEl.className = 'sheet phone-sheet';
    sheetEl.dataset.sheet = String(i);

    if (pages[i]?.cover) sheetEl.classList.add('cover');
    if (pages[i]?.backCover) sheetEl.classList.add('back-cover');

    const page = document.createElement('div');
    page.className = 'page phone-page';
    page.innerHTML = pageHTML(pages[i], i+1);

    // corners for clicking on phone
    const upCorner = document.createElement('div');
    upCorner.className = 'corner up';
    const downCorner = document.createElement('div');
    downCorner.className = 'corner down';

    sheetEl.appendChild(page);
    sheetEl.appendChild(upCorner);
    sheetEl.appendChild(downCorner);

    sheetEl.style.zIndex = String(pages.length - i);
    baseZOrder.push(pages.length - i);

    flipbook.appendChild(sheetEl);
    sheets.push(sheetEl);
  }

  // Stamped gallery population (pages 6 and 7)
  const GALLERY_IMAGES = [
    '000019320004.jpg',
    '000019320010.jpg',
    'IMG_0023.JPG',
    'IMG_0032.JPG',
    'IMG_20240803_220653598_HDR.jpg',
    'IMG_5222.JPG',
    'IMG_6762.JPG',
    'IMG_7002.JPG',
    'IMG_7160.JPG',
    'IMG_7184.JPG',
    'IMG_7444.JPG',
    'IMG_9222.JPG',
    'IMG_9390.JPG'
  ];

  function rand(min, max){ return Math.random() * (max - min) + min; }
  function buildStampedGallery(targetId, files){
    const el = document.getElementById(targetId);
    if (!el || !Array.isArray(files)) return;
    files.forEach((name, idx) => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      // Base transform stored in CSS var for hover scaling
      const rot = rand(-8, 8);
      let tx = rand(-14, 14);
      let ty = rand(-14, 14);
      // Bias a little to the right and upward
      tx += 8;
      ty -= 8;
      // Center stack: translate(-50%, -50%) keeps items centered, with small nudge
      fig.style.setProperty('--t', `translate(-50%, -50%) rotate(${rot.toFixed(1)}deg) translate(${tx.toFixed(0)}px, ${ty.toFixed(0)}px)`);
      // Size and placement for overlapping collage (phone) centered
      const wPct = rand(68, 92);              // very big on phone
      fig.style.width = wPct.toFixed(0) + '%';
      fig.style.left = '50%';
      fig.style.top = '50%';
      fig.style.zIndex = String(100 - idx);   // sequential stacking
      const img = document.createElement('img');
      img.src = `képek/using/galery/${name}`;
      img.alt = 'Tábor kép';
      fig.appendChild(img);
      el.appendChild(fig);
    });
  }

  // Split images: page 7 gets 7, page 6 gets 6
  (function(){
    const p7 = GALLERY_IMAGES.slice(0, 7);
    const p6 = GALLERY_IMAGES.slice(7);
    buildStampedGallery('gallery-p6', p6);
    buildStampedGallery('gallery-p7', p7);
  })();

  // Render helper for rich content blocks
  function blocksToHTML(content){
    if (content == null) {
      return `<p>${LOREM.replace(/\n/g, '<br>')}</p>`;
    }
    if (typeof content === 'string') {
      return `<p>${content.replace(/\n/g, '<br>')}</p>`;
    }
    if (Array.isArray(content)) {
      return content.map(block => {
        const type = (block && block.type) || 'text';
        if (type === 'text') {
          const text = (block && (block.text || block.content)) || '';
          return `<p>${String(text).replace(/\n/g, '<br>')}</p>`;
        }
        if (type === 'image') {
          const src = block.src || '';
          const alt = block.alt || '';
          const style = block.style ? ` style="${block.style}"` : '';
          const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : '';
          return `<figure class="page-image"><img src="${src}" alt="${alt}"${style}>${caption}</figure>`;
        }
        if (type === 'html' || type === 'table') {
          return block.html || '';
        }
        if (type === 'external') {
          const url = block.url || '';
          const label = block.label || url;
          return `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></p>`;
        }
        if (type === 'embed') {
          const url = block.url || '';
          const title = block.title || 'Embedded content';
          return `<div class="page-embed"><iframe src="${url}" title="${title}" loading="lazy" referrerpolicy="no-referrer" allowfullscreen></iframe></div>`;
        }
        return `<p>${String(block || '').replace(/\n/g, '<br>')}</p>`;
      }).join('');
    }
    try {
      return `<pre>${JSON.stringify(content, null, 2)}</pre>`;
    } catch { return `<p></p>`; }
  }

  function pageHTML(page, pageNumber){
    if (!page) {
      return `<div class="empty"></div>`;
    }
    if (page && page.cover) {
      return `
        <div class="cover-content">
          <div class="arched-title" aria-label="${page.title || 'Untitled'}">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMin meet" role="img" aria-label="${page.title || 'Untitled'}">
              <defs>
                <path id="titleArc" d="M50,220 C350,120 650,120 950,220"></path>
              </defs>
              <text fill="currentColor" font-size="96" font-weight="800" text-anchor="middle">
                <textPath href="#titleArc" startOffset="50%" dy="10">${page.title || 'Untitled'}</textPath>
              </text>
            </svg>
          </div>
          <img class="cover-photo" src="képek/using/kezdolap.jpg" alt="Cover photo">
        </div>
        <span class="page-number">${pageNumber}</span>
      `;
    }
    if (page && page.backCover) {
      return `
        <div class="cover-content">
          <h2>${page.title || 'Back Cover'}</h2>
          <div class="byline">${page.content || ''}</div>
        </div>
        <span class="page-number">${pageNumber}</span>
      `;
    }
    const extraClass = (pageNumber === 2) ? ' rolunk-page' : '';
    return `
      <h2>${page.title || 'Untitled'}</h2>
      <div class="page-content${extraClass}">${blocksToHTML(page.content ?? LOREM)}</div>
      <span class="page-number">${pageNumber}</span>
    `;
  }

  let currentSheet = 0; // which page is currently visible
  let isAnimating = false;
  let animationPromise = Promise.resolve();

  // URL page sync helpers
  function getPageFromURL(){
    const hash = window.location.hash || '';
    const m = hash.match(/page=(\d+)/i);
    if (m) {
      const p = parseInt(m[1], 10);
      if (!Number.isNaN(p)) return Math.min(Math.max(1, p), pages.length);
    }
    const params = new URLSearchParams(window.location.search);
    if (params.has('page')) {
      const p = parseInt(params.get('page') || '', 10);
      if (!Number.isNaN(p)) return Math.min(Math.max(1, p), pages.length);
    }
    return null;
  }
  function setURLPage(pageNumber){
    const clamped = Math.min(Math.max(1, pageNumber), pages.length);
    const base = window.location.href.split('#')[0];
    const newUrl = base + '#page=' + clamped;
    try {
      history.replaceState(null, '', newUrl);
    } catch {
      window.location.hash = 'page=' + clamped;
    }
  }

  function updateZOrder(){
    for (let j = 0; j < sheets.length; j++) {
      const s = sheets[j];
      if (s.classList.contains('flipping')) {
        s.style.zIndex = '2000';
      } else if (j < currentSheet) {
        // pages before current are stacked behind
        s.style.zIndex = String(100 + j);
      } else {
        s.style.zIndex = String(baseZOrder[j]);
      }
    }
  }

  function flipNext(){
    if (currentSheet >= sheets.length - 1) return Promise.resolve(false);
    if (isAnimating) return animationPromise.then(() => flipNext());
    const target = sheets[currentSheet];
    isAnimating = true;
    animationPromise = new Promise((resolve) => {
      target.classList.add('flipping');
      // Phone: flip around top edge, upward and forward toward viewer
      target.style.transformOrigin = 'top';
      target.style.transition = ANIM;
      target.style.transform = 'rotateX(90deg) translateZ(0px)';
      void target.offsetWidth;
      
      const onEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        target.removeEventListener('transitionend', onEnd);
        // Lock final state via class
        target.classList.add('flipped');
        target.style.transform = 'rotateX(90deg)';
        target.classList.remove('flipping');
        currentSheet += 1;
        isAnimating = false;
        updateZOrder();
        announcePage();
        resolve(true);
      };
      target.addEventListener('transitionend', onEnd);
      // Animate to the flipped state
      requestAnimationFrame(() => {
        target.style.transform = 'rotateX(0deg)';
      });
    });
    return animationPromise;
  }
  
  function flipPrev(){
    if (currentSheet <= 0) return Promise.resolve(false);
    if (isAnimating) return animationPromise.then(() => flipPrev());
    const targetIdx = currentSheet - 1;
    const target = sheets[targetIdx];
    isAnimating = true;
    animationPromise = new Promise((resolve) => {
      target.classList.add('flipping');
      // Phone: flip back around top edge
      target.style.transformOrigin = 'top';
      target.style.transition = ANIM;
      target.style.transform = 'rotateX(-180deg)';
      void target.offsetWidth;
      
      const onEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        target.removeEventListener('transitionend', onEnd);
        // Remove flipped class
        target.classList.remove('flipped');
        target.style.transition = '';
        target.style.transform = 'rotateX(0deg) ';
        target.style.transformOrigin = '';
        target.classList.remove('flipping');
        currentSheet -= 1;
        isAnimating = false;
        updateZOrder();
        announcePage();
        resolve(true);
      };
      target.addEventListener('transitionend', onEnd);
      // Animate to the open state
      requestAnimationFrame(() => {
        target.style.transform = 'rotateX(0deg) ';
      });
    });
    return animationPromise;
  }

  async function goToPage(pageNumber){
    // Phone: each sheet is one page (0-indexed sheets, 1-indexed pages)
    const targetSheet = pageNumber - 1;
    while (currentSheet < targetSheet) { await flipNext(); }
    while (currentSheet > targetSheet) { await flipPrev(); }
  }

  // Controls
  prevBtn.addEventListener('click', flipPrev);
  nextBtn.addEventListener('click', flipNext);

  // Keyboard arrows
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') flipPrev();
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') flipNext();
  });

  // Create bookmark tabs for specific pages
  const tabs = [
    { label: 'Front', page: 1 },
    { label: 'Intro', page: 2 },
    { label: 'Ch. 1', page: 4 },
    { label: 'Ch. 2', page: 6 },
    { label: 'Ch. 3', page: 8 },
    { label: 'Contact', page: 10 },
    { label: 'Back', page: 12 },
  ];

  // Build mobile menu entries
  const mobileContainer = document.querySelector('.mobile-bookmarks');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  function addBookmarkButton(container, t){
    const btn = document.createElement('button');
    btn.className = 'bookmark';
    btn.textContent = t.label;
    btn.dataset.page = String(t.page);
    btn.addEventListener('click', () => {
      goToPage(t.page);
      if (mobileMenu && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
    container.appendChild(btn);
  }
  
  if (mobileContainer) {
    tabs.forEach(t => addBookmarkButton(mobileContainer, t));
  }

  // Mobile menu toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const next = !expanded;
      menuToggle.setAttribute('aria-expanded', String(next));
      mobileMenu.hidden = !next;
      document.body.classList.toggle('menu-open', next);
    });
    
    // Close menu on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.classList.remove('menu-open');
      }
    });
    
    // Close if clicking the overlay background
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.hidden = true;
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Corner/edge clicks: up = prev, down = next
  sheets.forEach(sheet => {
    const upCorner = sheet.querySelector('.corner.up');
    const downCorner = sheet.querySelector('.corner.down');
    if (upCorner) upCorner.addEventListener('click', flipPrev);
    if (downCorner) downCorner.addEventListener('click', flipNext);
  });
  
  // Drag/Swipe gestures (vertical on phone)
  let dragStartX = null;
  let dragStartY = null;
  let dragActive = false;

  function onPointerDown(e){
    dragStartX = e.clientX ?? (e.touches ? e.touches[0].clientX : null);
    dragStartY = e.clientY ?? (e.touches ? e.touches[0].clientY : null);
    dragActive = true;
  }
  
  function onPointerMove(e){
    if (!dragActive || dragStartY == null) return;
    const y = e.clientY ?? (e.touches ? e.touches[0].clientY : null);
    if (y == null) return;
    // Visual preview could be implemented
  }
  
  function onPointerUp(e){
    if (!dragActive || dragStartY == null) return;
    const y = e.clientY ?? (e.changedTouches ? e.changedTouches[0].clientY : null);
    if (y == null) { dragActive = false; dragStartY = null; dragStartX = null; return; }
    const dy = y - dragStartY;
    const thresholdY = Math.max(40, flipbook.clientHeight * 0.1);
    
    // Swipe up (finger moves up): dy < -thresholdY -> next page (down scroll)
    if (dy < -thresholdY) {
      if (!isAnimating) flipNext();
    } else if (dy > thresholdY) {
      if (!isAnimating) flipPrev();
    }
    dragActive = false; dragStartX = null; dragStartY = null;
  }

  flipbook.addEventListener('mousedown', onPointerDown);
  flipbook.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  flipbook.addEventListener('touchstart', onPointerDown, { passive: true });
  flipbook.addEventListener('touchmove', onPointerMove, { passive: true });
  flipbook.addEventListener('touchend', onPointerUp, { passive: true });

  function announcePage(){
    const page = Math.min(pages.length, currentSheet + 1);
    flipbook.setAttribute('aria-label', `Open to page ${page} of ${pages.length}`);
    // Sync URL so refresh/resizes can restore state
    setURLPage(page);
  }

  // Start: restore from URL before announcing (to avoid overwriting hash)
  const initialPage = getPageFromURL();
  if (initialPage != null && initialPage !== (currentSheet + 1)) {
    goToPage(initialPage);
  } else {
    // Showing front cover
    announcePage();
  }
  updateZOrder();

  // Remove flipping flags after transitions
  sheets.forEach(s => {
    s.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'transform') {
        s.classList.remove('flipping');
        updateZOrder();
      }
    });
  });

  // Scroll-based flipping with threshold and debouncing
  let scrollAccum = 0;
  let scrollCooldown = false;
  const scrollThreshold = 80; // pixels of wheel delta
  
  function onWheel(e){
    // Avoid flipping when scrolling inside embedded form container
    const t = e.target;
    const inForm = (
      (t && t.closest && t.closest('[data-customgform]')) ||
      (t && t.tagName === 'IFRAME' && t.parentElement && t.parentElement.closest('[data-customgform]'))
    );
    const overBook = flipbook.contains(e.target) || e.target === flipbook;
    if (overBook && !inForm) {
      e.preventDefault();
      if (scrollCooldown || isAnimating) return;
      scrollAccum += e.deltaY;
      if (scrollAccum > scrollThreshold) {
        flipNext(); 
        scrollAccum = 0; 
        scrollCooldown = true;
        setTimeout(() => { scrollCooldown = false; }, 400);
      } else if (scrollAccum < -scrollThreshold) {
        flipPrev(); 
        scrollAccum = 0; 
        scrollCooldown = true;
        setTimeout(() => { scrollCooldown = false; }, 400);
      }
    }
  }
  
  window.addEventListener('wheel', onWheel, { passive: false });

  // Redirect to desktop version if screen becomes too large
  function checkScreenSize(){
    if (window.innerWidth > 768) {
      // Preserve current page via hash
      const hash = window.location.hash || ('#page=' + (currentSheet + 1));
      window.location.href = 'index.html' + hash;
    }
  }
  
  window.addEventListener('resize', checkScreenSize);
})();
