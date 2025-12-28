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
    { title: "Fhírvindel", cover: true, content: '' },
    { title: 'Rólunk', content: [
      { type: 'html', html: '<div class="rolunk-layout"><table class="rolunk-table"><tr><td class="rolunk-left"><p>Nyári táborunk keretein belül a gyerekek két hétre egy képzelt középkori királyság falai közé kerülhetnek. Napjaink közös játékkal, sporttal, zenéléssel és kézműveskedéssel telnek, nagyrészt a természetben.</p></td><td class="rolunk-right"><img class="rolunk-img" src="képek/using/harc.jpg" alt="Rólunk"></td></tr></table><div class="rolunk-bottom"><p>Minden táborozó részese a „királysági életnek”, ami azt jelenti, hogy a gyerekek saját karaktereiket megalkotva vesznek részt a birodalom olyan ügyes-bajos dolgaiban, mint a királyválasztás, a csatározás vagy éppen a varázslás. Bárki lehet lovag, mágus, gyógyító, de még kereskedő is, csak a képzelet szab határt. Esténként együtt ülünk tábortüzet, énekelünk és néha éjjeli küldetésekre indulunk.</p><p>Tartsatok velünk, és kezdjük együtt az első Birodalmi Évünket!</p><figure class="page-image"><img src="képek/using/optional.jpg" alt="Képek a táborról" style="max-width: 100%; max-height: 180px; width: auto; height: auto; object-fit: contain; border-radius: 12px;"></figure></div></div>' }
    ] },
    { title: 'Információ', content: [
      { type: 'html', html: '<div class="info-layout"><div class="info-left"><table class="info-table"><tr><th colspan="2">Adatok</th></tr><tr><td>Időpont:</td><td>2026 Július 11-25</td></tr><tr><td>Helyszín:</td><td><a href="https://maps.app.goo.gl/si6AGMsJ5qBTAFEH9" target="_blank" rel="noopener">Kövér Egér Tanya Kulcsosház- Szőc</a></td></tr><tr><td>Kiknek?</td><td>9-14 éves gyerekeket</td></tr><tr><td>Ár:</td><td>150 000Ft</td></tr></table></div><div class="info-image"><img src="képek/using/haz.jpg" alt="Ház" style="transform: rotate(-10deg);"></div><div class="info-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2721.0335002951624!2d17.522612776194396!3d47.000315171140485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47690c7efa2928ad%3A0xbac99b398dee5a9e!2zS8O2dsOpciBFZ8OpciBUYW55YSBLdWxjc29zaMOheg!5e0!3m2!1shu!2shu!4v1766850594207!5m2!1shu!2shu" style="border:0; transform: rotate(10deg);" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div></div>' }
    ] },
    { title: 'Galéria', content: [
      { type: 'html', html: '<p class="lead-gallery-intro">Ezek a képek Aquilonból a szülőtáborunkból vannak, hiszen a mi táborunk csak idén indul. Várunk szeretettel!</p>' },
      { type: 'html', html: '<div id="gallery-p6" class="gallery-stamped" aria-label="Galéria (4)"></div>' }
    ] },
    { title: 'Galéria', content: [
      { type: 'html', html: '<div id="gallery-p7" class="gallery-stamped" aria-label="Galéria (5)"></div>' }
    ] },
    { title: 'Seniorok', content: [
      { type: 'html', html: '<p class="lead-seniors">Mi, a táborszervezők, a „szeniorok” gyerekként magunk is hasonló táborokba jártunk, és most fő célunk, hogy olyan mesés és maradandó élményeket ajándékozzunk a gyerekeknek, mint amilyet mi magunk is kaptunk.</p>' },
      { type: 'html', html: '<div class="people-grid two-cols" role="grid" aria-label="Tábor vezetők">'
        + '<button class="person-card" type="button" data-name="Bendur (Ruskal Bendegúz)" data-info="Aquilonban királyságában voltam táborozó, de másik táborba is vendégeskedtem már táboroztatóként. Gyerekként nekem a tábor nem csupán menekvés volt a természetbe a szürke mindennapok elől, hanem egy olyan hely volt, ahol mindig biztonságban, szeretve és értékelve érezhettem magam. Mindezek mellett kipróbálhattam milyen az élet lovagként, mágusként, királyként de még manóként is. Így nem csak az erdőt, hanem önmagamat is felfedezhettem, hiszen kitapasztaltam, hogy milyen szerepkörökben vagyok komfortos. Biztosan állíthatom, hogy alapjaiban, a tábornak köszönehetem azt, aki ma vagyok. Azóta küldetésem, hogy minél több gyereknek adhassam át az élményt: a természet békéjét, a szerető és óvó közösséget, és nem utolsó sorban a kalandot." data-img="képek/using/people/Bendur(Ruskal Bendegúz).jpg"><div class="person-figure"><img src="képek/using/people/Bendur(Ruskal Bendegúz).jpg" alt="Bendur (Ruskal Bendegúz)"><span class="hover-info">Több</span></div><div class="person-name">Bendur <br>(Ruskal Bendegúz)</div></button>'
        + '<button class="person-card" type="button" data-name="Imion (Czuczor Vilmos)" data-info="Pedagógiai asszisztensnek tanulok. Aquilonban voltam táborozó, de táboroztattam egy pár másik birodalomban is. Azóta küldetésemmé vált egy élményekkel teli, telefont nem igénylő, természethez közeli tábor csinálása. Az egyik kedvesebb emlekem a táborozból egy késő esti tábortűzhöz kötődik. Amikor a parázs már csak vörösen és narancssárgán lüktetett, egy vándor mesélni kezdett egy lényről, amely csak akkor mutatja meg magát, amikor az utolsó láng is végleg kihuny. Ö a Szalamandra. Ahogy a történetét hallgattam, a parázsba merülve én is megláttam őket: az izzó parázsszemeken mintha apnó illanoz ábnyomokat hagytak volna maguk után, amelyek a fény utolsó lélegzetvételeivel együtt mozdultak." data-img="képek/using/people/Imion(Czuczor Vilmos).jpg"><div class="person-figure"><img src="képek/using/people/Imion(Czuczor Vilmos).jpg" alt="Imion (Czuczor Vilmos)"><span class="hover-info">Több</span></div><div class="person-name">Imion<br>(Czuczor Vilmos)</div></button>'
        + '<button class="person-card" type="button" data-name="Inderwald (Sarusi-Kis Balázs)" data-info="A hétköznapokban nincs rá lehetőségem, de a táborokban kiélhetem a kreatív énemet is. Gyerekként a barátaim ismertették meg velem a szerepjátéktábort. Már az első évben beleszerettem a birodalom misztikus levegőjébe. A játékban voltam minden: mágus, lovag, démon és álomjáró is. Most táboroztatóként remélem én is hasonlóan boldog és élményteli emlékeket fogok szerezni másoknak." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Inderwald (Sarusi-Kis Balázs)"><span class="hover-info">Több</span></div><div class="person-name">Inderwald<br>(Sarusi-Kis Balázs)</div></button>'
        + '<button class="person-card" type="button" data-name="Medve (Székely Márton)" data-info="Gyerekként négy évet táboroztam Aquilon királyságában, és ezt a négy nyarat mondhatom gyerekkorom legszebb és legszabadabb idéjének. 2025 nyarán -egy másik tábor- Heledrin Királyságának szeniori gárdáját is szinesithmem. A táborozas alatt rámragadt szenvedelmeim közé tartozik a történetmesels és a barkácsolas, amiket nagy erőkkel igyekszem Fhir\'vindelben is kamatoztatni." data-img="képek/using/people/Medve(Székely Márton).jpg"><div class="person-figure"><img src="képek/using/people/Medve(Székely Márton).jpg" alt="Medve (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Medve <br>(Székely Márton)</div></button>'
        + '</div>' }
    ] },
    { title: 'Seniorok', content: [
      { type: 'html', html: '<div class="people-grid" role="grid" aria-label="Tábor vezetők">'
        + '<button class="person-card" type="button" data-name="Placeholder" data-info="További információ hamarosan." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Placeholder"><span class="hover-info">Több</span></div><div class="person-name">Placeholder</div></button>'
        + '<button class="person-card" type="button" data-name="Placeholder" data-info="További információ hamarosan." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Placeholder"><span class="hover-info">Több</span></div><div class="person-name">Placeholder</div></button>'
        + '<button class="person-card" type="button" data-name="Placeholder" data-info="További információ hamarosan." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Placeholder"><span class="hover-info">Több</span></div><div class="person-name">Placeholder</div></button>'
        + '<button class="person-card" type="button" data-name="Placeholder" data-info="További információ hamarosan." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Placeholder"><span class="hover-info">Több</span></div><div class="person-name">Placeholder</div></button>'
        + '<button class="person-card" type="button" data-name="Placeholder" data-info="További információ hamarosan." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Placeholder"><span class="hover-info">Több</span></div><div class="person-name">Placeholder</div></button>'
        + '<button class="person-card" type="button" data-name="Placeholder" data-info="További információ hamarosan." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Placeholder"><span class="hover-info">Több</span></div><div class="person-name">Placeholder</div></button>'
        + '</div>' }
    ] },
    { title: 'Elérhetőség', content: [
      { type: 'html', html: '<div class="contact-wrapper"><div class="contact-container"><table class="contact-table"><tr><td class="contact-icon">📞</td><td><strong>Telefonszám:</strong></td><td><a href="tel:+36209117382">+36 20 9117 382</a></td></tr><tr><td class="contact-icon">✉️</td><td><strong>E-mail cím:</strong></td><td><a href="mailto:fhirvindel@gmail.com">fhirvindel@gmail.com</a></td></tr><tr><td class="contact-icon">🌐</td><td><strong>Weboldal:</strong></td><td>Hamarosan</td></tr><tr><td class="contact-icon">📘</td><td><strong>Facebook:</strong></td><td><a href="https://facebook.com/fhirvindel" target="_blank" rel="noopener">@fhír\'vindel</a></td></tr><tr><td class="contact-icon">📷</td><td><strong>Instagram:</strong></td><td>Hamarosan</td></tr></table></div><figure class="page-image"><img src="képek/using/contacts.jpg" alt="Elérhetőség"></figure></div>' }
    ] },
    { title: 'Jelentkezés', content: [
      { type: 'html', html: '<div data-customgform="cmikgtbh10003wnc04z53c26w"></div>' }
    ] },
    { title: 'Hátlap', backCover: true, content: 'Thanks for reading.' },
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
    'IMG_4595.JPG',
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
    files.forEach((name) => {
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      const rot = rand(-6.5, 6.5);
      const tx = rand(-10, 10);
      const ty = rand(-10, 10);
      fig.style.transform = `rotate(${rot.toFixed(1)}deg) translate(${tx.toFixed(0)}px, ${ty.toFixed(0)}px)`;
      fig.style.zIndex = String(10 + Math.floor(rand(0, 10)));
      const img = document.createElement('img');
      img.src = `képek/using/galery/${name}`;
      img.alt = 'Tábor kép';
      fig.appendChild(img);
      el.appendChild(fig);
    });
  }

  // Split images across pages 6 and 7
  (function(){
    const total = GALLERY_IMAGES.length;
    const desiredP7 = 8;
    const desiredP6 = 6;
    const p7Count = Math.min(desiredP7, total);
    const remaining = Math.max(0, total - p7Count);
    const p6Count = Math.min(desiredP6, remaining);
    const p6 = GALLERY_IMAGES.slice(0, p6Count);
    const p7 = GALLERY_IMAGES.slice(total - p7Count);
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
        <div class="cover-content" aria-label="Back Cover">
          <figure class="back-figure">
            <img class="back-photo" src="képek/using/back.jpg" alt="Back cover image">
            <figcaption class="back-caption">Tartsatok velünk, és kezdjük együtt az első Birodalmi Évünket!</figcaption>
          </figure>
        </div>
        <span class="page-number">${pageNumber}</span>
      `;
    }
    const extraClass = (pageNumber === 2) ? ' rolunk-page' : (pageNumber === 3) ? ' informacio-page' : (pageNumber === 8) ? ' elérhetőség-page' : '';
    return `
      <h2>${page.title || 'Untitled'}</h2>
      <div class="page-content${extraClass}">${blocksToHTML(page.content ?? LOREM)}</div>
      <span class="page-number">${pageNumber}</span>
    `;
  }

  let currentSheet = 0; // which page is currently visible
  const inFlightAnimations = new Set(); // Track all concurrent animations
  let currentSheetTarget = 0; // Track the target sheet position while animations are in flight
  let skipAnimations = false; // skip animations when jumping far
  let multiJumpAway = false; // when jumping multiple pages, flip away from viewer

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
    if (currentSheetTarget >= sheets.length - 1) return Promise.resolve(false);
    const target = sheets[currentSheetTarget];
    currentSheetTarget += 1;
    const away = multiJumpAway;
    
    return new Promise((resolve) => {
      target.classList.add('flipping');
      // Phone: flip around top edge
      target.style.transformOrigin = 'top';
      target.style.transition = skipAnimations ? 'none' : ANIM;
      target.style.transform = 'rotateX(0deg)';
      target.style.zIndex = '2000'; // Start in front
      void target.offsetWidth;
      
      // At midpoint of animation (400ms of 800ms), switch z-index to go behind
      const midpointTimer = setTimeout(() => {
        if (target.classList.contains('flipping')) {
          target.style.zIndex = '5'; // Drop behind when crossing midpoint
        }
      }, 400);
      
      const onEnd = (e) => {
        if (!skipAnimations && e.propertyName !== 'transform') return;
        clearTimeout(midpointTimer);
        target.removeEventListener('transitionend', onEnd);
        // Lock final state via class, store direction
        target.classList.add('flipped');
        target.dataset.flipDir = away ? 'neg' : 'pos';
        target.style.transform = away ? 'rotateX(-90deg)' : 'rotateX(90deg)';
        target.style.zIndex = String(100 + currentSheet); // Final z-order
        target.classList.remove('flipping');
        currentSheet += 1;
        inFlightAnimations.delete(onEnd);
        updateZOrder();
        if (inFlightAnimations.size === 0) {
          announcePage();
        }
        resolve(true);
      };
      inFlightAnimations.add(onEnd);
      target.addEventListener('transitionend', onEnd);
      // Animate to the flipped state
      requestAnimationFrame(() => {
        target.style.transform = away ? 'rotateX(-90deg)' : 'rotateX(90deg)';
        if (skipAnimations) {
          // Trigger immediately if no animation
          onEnd({ propertyName: 'transform' });
        }
      });
    });
  }
  
  function flipPrev(){
    if (currentSheetTarget <= 0) return Promise.resolve(false);
    currentSheetTarget -= 1;
    const targetIdx = currentSheetTarget;
    const target = sheets[targetIdx];
    
    // If page hasn't been flipped forward yet, it's already in the open state (rotateX(0))
    // Just update state without animation
    if (!target.classList.contains('flipped')) {
      currentSheet -= 1;
      updateZOrder();
      // Still need to call announcePage if this was the last animation
      return Promise.resolve(true);
    }
    
    const dir = target.dataset.flipDir === 'neg' ? 'neg' : 'pos';
    
    return new Promise((resolve) => {
      target.classList.add('flipping');
      // Phone: flip back around top edge
      target.style.transformOrigin = 'top';
      target.style.transition = skipAnimations ? 'none' : ANIM;
      // Set to the flipped state before animation
      target.style.transform = dir === 'neg' ? 'rotateX(-90deg)' : 'rotateX(90deg)';
      target.style.zIndex = '5'; // Start behind
      void target.offsetWidth;
      
      // At midpoint of animation (400ms of 800ms), switch z-index to come in front
      const midpointTimer = setTimeout(() => {
        if (target.classList.contains('flipping')) {
          target.style.zIndex = '2000'; // Rise in front when crossing midpoint
        }
      }, 400);
      
      const onEnd = (e) => {
        if (!skipAnimations && e.propertyName !== 'transform') return;
        clearTimeout(midpointTimer);
        target.removeEventListener('transitionend', onEnd);
        // Remove flipped class
        target.classList.remove('flipped');
        target.style.transition = '';
        target.style.transform = 'rotateX(0deg)';
        target.style.transformOrigin = '';
        target.style.zIndex = String(baseZOrder[targetIdx]); // Final z-order
        delete target.dataset.flipDir;
        target.classList.remove('flipping');
        currentSheet -= 1;
        inFlightAnimations.delete(onEnd);
        updateZOrder();
        if (inFlightAnimations.size === 0) {
          announcePage();
        }
        resolve(true);
      };
      inFlightAnimations.add(onEnd);
      target.addEventListener('transitionend', onEnd);
      // Animate to the open state
      requestAnimationFrame(() => {
        target.style.transform = 'rotateX(0deg)';
        if (skipAnimations) {
          // Trigger immediately if no animation
          onEnd({ propertyName: 'transform' });
        }
      });
    });
  }

  async function goToPage(pageNumber){
    // Phone: each sheet is one page (0-indexed sheets, 1-indexed pages)
    const targetSheet = pageNumber - 1;
    
    // Start all flips with 100ms gap between them (same button animation, just staggered)
    const animations = [];
    while (currentSheetTarget < targetSheet) { 
      animations.push(flipNext());
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    while (currentSheetTarget > targetSheet) { 
      animations.push(flipPrev());
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Wait for all animations to complete
    if (animations.length > 0) {
      await Promise.all(animations);
      // Ensure announcePage is called after all animations (in case some were skipped)
      if (inFlightAnimations.size === 0) {
        announcePage();
      }
    }
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
    { label: 'Előlap', page: 1 },
    { label: 'Rólunk', page: 2 },
    { label: 'Galéria', page: 4 },
    { label: 'Seniorok', page: 6 },
    { label: 'Elérhetőség', page: 8 },
    { label: 'Jelentkezés', page: 9 },
    { label: 'Hátlap', page: 10 },
  ];

  // Calculate bookmark offset based on text length (Seniorok = perfect baseline)
  function getBookmarkOffset(label) {
    const seniorsLength = 'Seniorok'.length;
    const labelLength = label.length;
    const ratio = labelLength / seniorsLength;
    const baseOffset = -90;
    const extraOffset = -20;
    return Math.round(baseOffset * ratio + extraOffset);
  }

  // Build mobile menu entries
  const mobileContainer = document.querySelector('.mobile-bookmarks');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  function addBookmarkButton(container, t){
    const btn = document.createElement('button');
    btn.className = 'bookmark';
    btn.textContent = t.label;
    btn.dataset.page = String(t.page);
    const offset = getBookmarkOffset(t.label);
    btn.style.setProperty('--bookmark-offset', offset + 'px');
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
      if (inFlightAnimations.size === 0) flipNext();
    } else if (dy > thresholdY) {
      if (inFlightAnimations.size === 0) flipPrev();
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
    currentSheetTarget = currentSheet; // sync target with current
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
      // Check if the current page content can still scroll
      const currentPageContent = sheets[currentSheet]?.querySelector('.page-content');
      let canScrollInPage = false;
      
      if (currentPageContent) {
        const scrollHeight = currentPageContent.scrollHeight;
        const clientHeight = currentPageContent.clientHeight;
        const scrollTop = currentPageContent.scrollTop;
        
        // Can scroll down if there's content below
        const canScrollDown = scrollTop + clientHeight < scrollHeight;
        // Can scroll up if there's content above
        const canScrollUp = scrollTop > 0;
        
        // Allow scroll if the direction matches available scroll room
        if (e.deltaY > 0 && canScrollDown) {
          canScrollInPage = true;
        } else if (e.deltaY < 0 && canScrollUp) {
          canScrollInPage = true;
        }
      }
      
      // Only prevent default and flip pages if we can't scroll within the page
      if (!canScrollInPage) {
        e.preventDefault();
        if (scrollCooldown || inFlightAnimations.size > 0) return;
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

/* Image Lightbox Modal */
(function(){
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeBtn = document.querySelector('.image-modal-close');

  // Open image modal when clicking on images
  document.addEventListener('click', (e) => {
    const img = e.target && e.target.tagName === 'IMG' ? e.target : null;
    if (!img) return;

    // Skip if it's inside a button or person card (those have their own handlers)
    if (img.closest('.person-card') || img.closest('button')) return;

    // Skip if it's inside the person modal (vezető popup)
    if (img.closest('#personModal')) return;

    // Skip if it's inside an iframe or form
    if (img.closest('iframe') || img.closest('[data-customgform]')) return;

    // Open the modal with the clicked image
    modalImage.src = img.src;
    modalImage.alt = img.alt || 'Full size image';
    imageModal.classList.add('open');
  });

  // Close modal
  function closeModal() {
    imageModal.classList.remove('open');
  }

  closeBtn.addEventListener('click', closeModal);
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
