/* Flipbook logic */
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
      { type: 'html', html: '<div class="rolunk-layout"><table class="rolunk-table"><tr><td class="rolunk-left"><p>Nyári táborunk keretein belül a gyerekek két hétre egy képzelt középkori királyság falai közé kerülhetnek. Napjaink közös játékkal, sporttal, zenéléssel és kézműveskedéssel telnek, nagyrészt a természetben.</p></td><td class="rolunk-right"><img class="rolunk-img" src="képek/using/harc.jpg" alt="Rólunk"></td></tr></table><div class="rolunk-bottom"><p>Minden táborozó részese a „királysági életnek”, ami azt jelenti, hogy a gyerekek saját karaktereiket megalkotva vesznek részt a birodalom olyan ügyes-bajos dolgaiban, mint a királyválasztás, a csatározás vagy éppen a varázslás. Bárki lehet lovag, mágus, gyógyító, de még kereskedő is, csak a képzelet szab határt. Esténként együtt ülünk tábortüzet, énekelünk és néha éjjeli küldetésekre indulunk.</p><p>Tartsatok velünk, és kezdjük együtt az első Birodalmi Évünket!</p></div></div>' }
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
        + '<button class="person-card" type="button" data-name="Bendur (Ruskal Bendegúz)" data-info="Aquilonban királyságában voltam táborozó, de másik táborba is vendégeskedtem már táboroztatóként. Gyerekként nekem a tábor nem csupán menekvés volt a természetbe a szürke mindennapok elől, hanem egy olyan hely volt, ahol mindig biztonságban, szeretve és értékelve érezhettem magam. Mindezek mellett kipróbálhattam milyen az élet lovagként, mágusként, királyként de még manóként is. Így nem csak az erdőt, hanem önmagamat is felfedezhettem, hiszen kitapasztaltam, hogy milyen szerepkörökben vagyok komfortos. Biztosan állíthatom, hogy alapjaiban, a tábornak köszönehetem azt, aki ma vagyok. Azóta küldetésem, hogy minél több gyereknek adhassam át az élményt: a természet békéjét, a szerető és óvó közösséget, és nem utolsó sorban a kalandot." data-img="képek/using/people/Bendur(Ruskal Bendegúz).jpg"><div class="person-figure"><img src="képek/using/people/Bendur(Ruskal Bendegúz).jpg" alt="Bendur (Ruskal Bendegúz)"><span class="hover-info">Több</span></div><div class="person-name">Bendur <wbr>(Ruskal Bendegúz)</div></button>'
        + '<button class="person-card" type="button" data-name="Imion (Czuczor Vilmos)" data-info="Pedagógiai asszisztensnek tanulok. Aquilonban voltam táborozó, de táboroztattam egy pár másik birodalomban is. Azóta küldetésemmé vált egy élményekkel teli, telefont nem igénylő, természethez közeli tábor csinálása. Az egyik kedvesebb emlekem a táborozból egy késő esti tábortűzhöz kötődik. Amikor a parázs már csak vörösen és narancssárgán lüktetett, egy vándor mesélni kezdett egy lényről, amely csak akkor mutatja meg magát, amikor az utolsó láng is végleg kihuny. Ö a Szalamandra. Ahogy a történetét hallgattam, a parázsba merülve én is megláttam őket: az izzó parázsszemeken mintha apnó illanoz ábnyomokat hagytak volna maguk után, amelyek a fény utolsó lélegzetvételeivel együtt mozdultak." data-img="képek/using/people/Imion(Czuczor Vilmos).jpg"><div class="person-figure"><img src="képek/using/people/Imion(Czuczor Vilmos).jpg" alt="Imion (Czuczor Vilmos)"><span class="hover-info">Több</span></div><div class="person-name">Imion (Czuczor Vilmos)</div></button>'
        + '<button class="person-card" type="button" data-name="Inderwald (Sarusi-Kis Balázs)" data-info="A hétköznapokban nincs rá lehetőségem, de a táborokban kiélhetem a kreatív énemet is. Gyerekként a barátaim ismertették meg velem a szerepjátéktábort. Már az első évben beleszerettem a birodalom misztikus levegőjébe. A játékban voltam minden: mágus, lovag, démon és álomjáró is. Most táboroztatóként remélem én is hasonlóan boldog és élményteli emlékeket fogok szerezni másoknak." data-img="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg"><div class="person-figure"><img src="képek/using/people/Inderwald(Sarusi-Kis Balázs).jpg" alt="Inderwald (Sarusi-Kis Balázs)"><span class="hover-info">Több</span></div><div class="person-name">Inderwald (Sarusi-Kis Balázs)</div></button>'
        + '<button class="person-card" type="button" data-name="Medve (Székely Márton)" data-info="Gyerekként négy évet táboroztam Aquilon királyságában, és ezt a négy nyarat mondhatom gyerekkorom legszebb és legszabadabb idéjének. 2025 nyarán -egy másik tábor- Heledrin Királyságának szeniori gárdáját is szinesithmem. A táborozas alatt rámragadt szenvedelmeim közé tartozik a történetmesels és a barkácsolas, amiket nagy erőkkel igyekszem Fhir\'vindelben is kamatoztatni." data-img="képek/using/people/Medve(Székely Márton).jpg"><div class="person-figure"><img src="képek/using/people/Medve(Székely Márton).jpg" alt="Medve (Székely Márton)"><span class="hover-info">Több</span></div><div class="person-name">Medve (Székely Márton)</div></button>'
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

  // Build sheets: Desktop/Tablet has 2 pages (front/back) per sheet
  const sheets = [];
  const baseZOrder = [];
  let sheetIndex = 0;
  
  for (let i = 0; i < pages.length; i += 2) {
    const sheetEl = document.createElement('div');
    sheetEl.className = 'sheet';
    sheetEl.dataset.sheet = String(sheetIndex);

    if (pages[i]?.cover) sheetEl.classList.add('cover');
    if (pages[i+1]?.backCover) sheetEl.classList.add('back-cover');

    const front = document.createElement('div');
    front.className = 'page front';
    front.innerHTML = pageHTML(pages[i], i+1);

    const back = document.createElement('div');
    back.className = 'page back';
    back.innerHTML = pageHTML(pages[i+1], i+2);

    // corners for clicking
    const leftCorner = document.createElement('div');
    leftCorner.className = 'corner left';
    const rightCorner = document.createElement('div');
    rightCorner.className = 'corner right';

    sheetEl.appendChild(front);
    sheetEl.appendChild(back);
    sheetEl.appendChild(leftCorner);
    sheetEl.appendChild(rightCorner);

    // stack order: top is last sheet
    sheetEl.style.zIndex = String(pages.length - i);
    baseZOrder.push(pages.length - i);

    flipbook.appendChild(sheetEl);
    sheets.push(sheetEl);
    sheetIndex++;
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
          const caption = block.caption ? `<figcaption>${block.caption}</figcaption>` : '';
          return `<figure class="page-image"><img src="${src}" alt="${alt}">${caption}</figure>`;
        }
        if (type === 'html' || type === 'table') {
          // Raw HTML (e.g., tables) provided by author
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
        // Fallback
        return `<p>${String(block || '').replace(/\n/g, '<br>')}</p>`;
      }).join('');
    }
    // Unknown structure fallback
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
                <!-- Lower arc within a taller viewBox to avoid top clipping -->
                <path id="titleArc" d="M50,220 C350,120 650,120 950,220"></path>
              </defs>
              <text fill="currentColor" font-size="128" font-weight="800" text-anchor="middle">
                <textPath href="#titleArc" startOffset="50%" dy="12">${page.title || 'Untitled'}</textPath>
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

  let currentSheet = 0; // how many are flipped
  const inFlightAnimations = new Set(); // Track all concurrent animations
  let currentSheetTarget = 0; // Track the target sheet position while animations are in flight

  // URL page sync helpers
  function getPageFromURL(){
    // Prefer hash: #page=NN
    const hash = window.location.hash || '';
    const m = hash.match(/page=(\d+)/i);
    if (m) {
      const p = parseInt(m[1], 10);
      if (!Number.isNaN(p)) return Math.min(Math.max(1, p), pages.length);
    }
    // Fallback: ?page=NN
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

  // Responsive mode detection
  let mode = 'desktop'; // 'desktop' | 'tablet' | 'phone'
  function computeMode(){
    const w = window.innerWidth;
    if (w <= 768) return 'phone';
    if (w <= 1024) return 'tablet';
    return 'desktop';
  }
  function applyMode(next){
    mode = next;
    document.body.classList.toggle('phone', mode === 'phone');
    document.body.classList.toggle('tablet', mode === 'tablet');
    document.body.classList.toggle('desktop', mode === 'desktop');
    const mt = document.querySelector('.menu-toggle');
    if (mt) {
      if (mode === 'phone') mt.classList.add('hamburger');
      else mt.classList.remove('hamburger');
    }
  }
  applyMode(computeMode());
  
  // Define populateSidebars early so it can be called on resize
  const sideLeft = document.querySelector('.side-bookmarks-left');
  const sideRight = document.querySelector('.side-bookmarks-right');
  
  function populateSidebars(){
    if (mode === 'desktop') {
      sideLeft.innerHTML = '';
      sideRight.innerHTML = '';
      tabs.forEach(t => addBookmarkButton(sideLeft, t));
      tabs.forEach(t => addBookmarkButton(sideRight, t));
      // Ensure sidebars sit above sheets and accept clicks
      if (sideLeft) {
        sideLeft.style.zIndex = '3000';
        sideLeft.style.pointerEvents = 'auto';
      }
      if (sideRight) {
        sideRight.style.zIndex = '3000';
        sideRight.style.pointerEvents = 'auto';
      }
    }
  }
  
  window.addEventListener('resize', () => {
    applyMode(computeMode());
    populateSidebars();
    // If entering phone width on desktop, redirect to phone with page preserved
    if (window.innerWidth <= 768) {
      const hash = window.location.hash || ('#page=' + Math.max(1, currentSheet * 2));
      // Avoid redirect loops: only redirect when on desktop page
      if (!/indexphone\.html$/i.test(window.location.pathname)) {
        window.location.href = 'indexphone.html' + hash;
      }
    }
  });
  const isPhone = () => mode === 'phone';
  function updateZOrder(){
    for (let j = 0; j < sheets.length; j++) {
      const s = sheets[j];
      if (s.classList.contains('flipping')) {
        s.style.zIndex = '2000';
      } else if (j < currentSheet) {
        // flipped sheets should sit behind the current spread
        s.style.zIndex = String(10 + j);
      } else {
        s.style.zIndex = String(baseZOrder[j]);
      }
    }
  }

  // Allow clicks only on the two sheets that form the current spread:
  // back of sheet (currentSheet - 1) and front of sheet (currentSheet)
  function updateSheetPointerEvents(){
    for (let j = 0; j < sheets.length; j++) {
      // Enable events on the current spread and the immediately previous sheet
      // so protruding left-side tabs from the last spread remain clickable.
      const active = (j === currentSheet) || (j === currentSheet - 1) || (j === currentSheet - 2);
      sheets[j].style.pointerEvents = active ? 'auto' : 'none';
    }
  }

  function flipNext(){
    if (currentSheetTarget >= sheets.length) return Promise.resolve(false);
    const target = sheets[currentSheetTarget];
    currentSheetTarget += 1;
    
    return new Promise((resolve) => {
      target.classList.add('flipping');
      // Horizontal flip to right stack
      target.style.transformOrigin = 'left center';
      target.style.transition = ANIM;
      target.style.transform = 'translateX(0) rotateY(0deg)';
      target.style.zIndex = '2000'; // Start in front
      void target.offsetWidth; // ensure start state is applied
      
      // At midpoint of animation (400ms of 800ms), switch z-index to go behind
      const midpointTimer = setTimeout(() => {
        if (target.classList.contains('flipping')) {
          target.style.zIndex = '5'; // Drop behind when crossing midpoint
        }
      }, 400);
      
      const onEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        clearTimeout(midpointTimer);
        target.removeEventListener('transitionend', onEnd);
        // Lock final state via class; clear inline styles to avoid extra glide
        target.classList.add('flipped');
        target.style.transform = 'translateX(50%) rotateY(-180deg)';
        target.style.zIndex = String(10 + currentSheet); // Final z-order
        target.classList.remove('flipping');
        currentSheet += 1;
        inFlightAnimations.delete(onEnd);
        updateZOrder();
        updateSheetPointerEvents();
        if (inFlightAnimations.size === 0) {
          announcePage();
        }
        resolve(true);
      };
      inFlightAnimations.add(onEnd);
      target.addEventListener('transitionend', onEnd);
      // Animate to the flipped state
      requestAnimationFrame(() => {
        target.style.transform = 'translateX(50%) rotateY(-180deg)';
      });
    });
  }
  function flipPrev(){
    if (currentSheetTarget <= 0) return Promise.resolve(false);
    currentSheetTarget -= 1;
    const targetIdx = currentSheetTarget;
    const target = sheets[targetIdx];
    
    return new Promise((resolve) => {
      target.classList.add('flipping');
      // Start from horizontal flipped state
      target.style.transformOrigin = 'left center';
      target.style.transition = ANIM;
      target.style.transform = 'translateX(50%) rotateY(-180deg)';
      target.style.zIndex = '5'; // Start behind
      void target.offsetWidth; // ensure start state is applied
      
      // At midpoint of animation (400ms of 800ms), switch z-index to come in front
      const midpointTimer = setTimeout(() => {
        if (target.classList.contains('flipping')) {
          target.style.zIndex = '2000'; // Rise in front when crossing midpoint
        }
      }, 400);
      
      const onEnd = (e) => {
        if (e.propertyName !== 'transform') return;
        clearTimeout(midpointTimer);
        target.removeEventListener('transitionend', onEnd);
        // Remove flipped class and clear inline styles
        target.classList.remove('flipped');
        target.style.transition = '';
        target.style.transform = '';
        target.style.transformOrigin = '';
        target.style.zIndex = String(baseZOrder[targetIdx]); // Final z-order
        target.classList.remove('flipping');
        currentSheet -= 1;
        inFlightAnimations.delete(onEnd);
        updateZOrder();
        updateSheetPointerEvents();
        if (inFlightAnimations.size === 0) {
          announcePage();
        }
        resolve(true);
      };
      inFlightAnimations.add(onEnd);
      target.addEventListener('transitionend', onEnd);
      // Animate to the open state
      requestAnimationFrame(() => {
        target.style.transform = 'translateX(0) rotateY(0deg)';
      });
    });
  }

  async function goToPage(pageNumber){
    // Map page number to sheet count so that:
    // page 1 -> sheet 0 (closed front cover),
    // page 2 -> sheet 1 (open to 2-3),
    // page 3 -> sheet 1 (open to 2-3),
    // page 4 -> sheet 2, etc.
    let targetSheetCount = Math.floor(pageNumber / 2);
    // Clamp to valid range
    targetSheetCount = Math.max(0, Math.min(sheets.length, targetSheetCount));
    
    // Trigger animations with staggered delay (0.1s between each flip)
    const animations = [];
    while (currentSheetTarget < targetSheetCount) { 
      animations.push(flipNext());
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    while (currentSheetTarget > targetSheetCount) { 
      animations.push(flipPrev());
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Wait for all animations to complete
    if (animations.length > 0) {
      await Promise.all(animations);
    }
    announcePage();
  }

  // Controls
  prevBtn.addEventListener('click', flipPrev);
  nextBtn.addEventListener('click', flipNext);

  // Keyboard arrows
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') flipPrev();
    if (e.key === 'ArrowRight') flipNext();
  });

  // Create protruding tabs attached to specific pages
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

  // Deterministic vertical positions for tabs (evenly spaced)
  const positions = (count) => {
    const arr = [];
    const start = 12, end = 88;
    if (count === 1) return [50];
    for (let i = 0; i < count; i++) {
      const pct = start + (end - start) * (i / (count - 1));
      arr.push(Math.round(pct));
    }
    return arr;
  };
  const tabPositions = positions(tabs.length);
  tabs.forEach((t, idx) => {
    const target = getPageElement(t.page);
    if (!target) return;
    const tab = document.createElement('button');
    tab.className = 'bookmark';
    tab.textContent = t.label;
    tab.type = 'button';
    const topPct = tabPositions[idx];
    const rotDeg = 0; // no random rotation; ordered positions
    const offset = getBookmarkOffset(t.label);
    tab.style.setProperty('--tab-top', topPct + '%');
    tab.style.setProperty('--tab-rot', rotDeg + 'deg');
    tab.style.setProperty('--bookmark-offset', offset + 'px');
    // Elevate tab above corners within the sheet stacking context
    tab.style.zIndex = '3000';
    tab.style.pointerEvents = 'auto';
    tab.dataset.page = String(t.page);
    // Prevent flipbook drag/swipe from intercepting these clicks
    tab.addEventListener('mousedown', (e) => e.stopPropagation());
    tab.addEventListener('touchstart', (e) => e.stopPropagation());
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      goToPage(t.page);
    });
    target.appendChild(tab);

    // For odd pages (front side), also add mirrored tab on the back side of same sheet
    if (t.page % 2 === 1) {
      const backPage = getPageElement(t.page + 1);
      
        const backMirror = document.createElement('button');
        backMirror.className = 'bookmark mirror-back';
        backMirror.textContent = t.label;
        backMirror.type = 'button';
        backMirror.style.setProperty('--tab-top', topPct + '%');
        backMirror.style.setProperty('--tab-rot', '0deg');
        backMirror.style.setProperty('--bookmark-offset', offset + 'px');
        backMirror.style.zIndex = '3000';
        backMirror.style.pointerEvents = 'auto';
        backMirror.dataset.page = String(t.page);
        backMirror.addEventListener('mousedown', (e) => e.stopPropagation());
        backMirror.addEventListener('touchstart', (e) => e.stopPropagation());
        backMirror.addEventListener('click', (e) => {
          e.stopPropagation();
          goToPage(t.page);
        });
        backPage.appendChild(backMirror);
    }

    // If even page, also show a mirrored tab on the right side (right page)
    if (t.page % 2 === 0) {
      const mirrorHost = getPageElement(t.page + 1) || getPageElement(t.page - 1);
        const mirror = document.createElement('button');
        mirror.className = 'bookmark mirror';
        mirror.textContent = t.label;
        mirror.type = 'button';
        mirror.style.setProperty('--tab-top', topPct + '%');
        mirror.style.setProperty('--tab-rot', '0deg');
        mirror.style.setProperty('--bookmark-offset', offset + 'px');
        mirror.style.zIndex = '3000';
        mirror.style.pointerEvents = 'auto';
        mirror.dataset.page = String(t.page);
        mirror.addEventListener('mousedown', (e) => e.stopPropagation());
        mirror.addEventListener('touchstart', (e) => e.stopPropagation());
        mirror.addEventListener('click', (e) => {
          e.stopPropagation();
          goToPage(t.page);
        });
        mirrorHost.appendChild(mirror);
    }
  });

  // Build top bookmarks and mobile menu entries
  const topContainer = document.querySelector('.top-bookmarks');
  const mobileContainer = document.querySelector('.mobile-bookmarks');
  const menuToggle = document.querySelector('.menu-toggle');
  function addBookmarkButton(container, t){
    const btn = document.createElement('button');
    btn.className = 'bookmark';
    btn.textContent = t.label;
    btn.dataset.page = String(t.page);
    const offset = getBookmarkOffset(t.label);
    btn.style.setProperty('--bookmark-offset', offset + 'px');
    // Prevent flipbook drag/swipe from intercepting these clicks
    btn.addEventListener('mousedown', (e) => e.stopPropagation());
    btn.addEventListener('touchstart', (e) => e.stopPropagation());
    btn.addEventListener('click', (e) => {
      // Prevent underlying elements from stealing the click
      e.stopPropagation();
      goToPage(t.page);
      if (mobileMenu && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    });
    container.appendChild(btn);
  }
  // Add Prev/Next navigation buttons to menus
  function addNavButtons(container, isMobile = false){
    const prev = document.createElement('button');
    prev.className = 'bookmark nav prev';
    prev.textContent = 'Prev';
    prev.addEventListener('click', () => {
      flipPrev();
      if (isMobile && mobileMenu && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    });
    container.appendChild(prev);

    const next = document.createElement('button');
    next.className = 'bookmark nav next';
    next.textContent = 'Next';
    next.addEventListener('click', () => {
      flipNext();
      if (isMobile && mobileMenu && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuToggle?.setAttribute('aria-expanded', 'false');
      }
    });
    container.appendChild(next);
  }
  if (topContainer) tabs.forEach(t => addBookmarkButton(topContainer, t));
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileContainer) tabs.forEach(t => addBookmarkButton(mobileContainer, t));
  // Do not add Prev/Next to the menus (using arrow buttons in controls instead)
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

    // Populate sidebar bookmarks (10% left + 10% right)
    populateSidebars();

  // Corner clicks: left = prev, right = next
  sheets.forEach(sheet => {
    const left = sheet.querySelector('.corner.left');
    const right = sheet.querySelector('.corner.right');
    if (left) left.addEventListener('click', flipPrev);
    if (right) right.addEventListener('click', flipNext);
  });
  
  function getPageElement(pageNumber){
    if (pageNumber < 1 || pageNumber > pages.length) return null;
    const idx = pageNumber - 1;
    const sheetIdx = Math.floor(idx / 2);
    const isOdd = pageNumber % 2 === 1;
    const sheet = sheets[sheetIdx];
    if (!sheet) return null;
    return sheet.querySelector(isOdd ? '.page.front' : '.page.back');
  }

  // Drag/Swipe gestures (basic threshold)
  let dragStartX = null;
  let dragStartY = null;
  let dragActive = false;

  function onPointerDown(e){
    dragStartX = e.clientX ?? (e.touches ? e.touches[0].clientX : null);
    dragStartY = e.clientY ?? (e.touches ? e.touches[0].clientY : null);
    dragActive = true;
  }
  function onPointerMove(e){
    if (!dragActive || dragStartX == null) return;
    const x = e.clientX ?? (e.touches ? e.touches[0].clientX : null);
    if (x == null) return;
    const dx = x - dragStartX;
    // Visual preview could be implemented; keeping simple
  }
  function onPointerUp(e){
    if (!dragActive || dragStartX == null) return;
    const x = e.clientX ?? (e.changedTouches ? e.changedTouches[0].clientX : null);
    const y = e.clientY ?? (e.changedTouches ? e.changedTouches[0].clientY : null);
    if (x == null || y == null) { dragActive = false; dragStartX = null; dragStartY = null; return; }
    const dx = x - dragStartX;
    const dy = y - dragStartY;
    const thresholdX = Math.max(40, flipbook.clientWidth * 0.08);
    const thresholdY = Math.max(40, flipbook.clientHeight * 0.08);
    // Horizontal swipe on desktop/tablet
    if (dx < -thresholdX) {
      if (!isAnimating) flipNext();
    } else if (dx > thresholdX) {
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

  // Forward clicks that land on flipped sheets (overlay) to underlying bookmarks
  function forwardBookmarkClick(e){
    const t = e.target;
    // If already clicking a bookmark, let it handle normally
    if (t && (t.classList && t.classList.contains('bookmark'))) return;
    // Only intervene if the click target is within a flipped sheet or its children
    const sheetEl = t && t.closest ? t.closest('.sheet.flipped') : null;
    if (!sheetEl) return;
    // Find elements under the click point and trigger the first bookmark
    const x = e.clientX ?? (e.changedTouches ? e.changedTouches[0].clientX : null);
    const y = e.clientY ?? (e.changedTouches ? e.changedTouches[0].clientY : null);
    if (x == null || y == null) return;
    const stack = document.elementsFromPoint(x, y) || [];
    const targetBookmark = stack.find(el => el.classList && el.classList.contains('bookmark'));
    if (targetBookmark) {
      e.stopPropagation();
      e.preventDefault();
      // Programmatically activate the bookmark
      targetBookmark.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    }
  }
  // Use capture so we can reroute before flipbook handlers process
  flipbook.addEventListener('click', forwardBookmarkClick, true);

  function announcePage(){
    // For screen readers: announce current page/spread
    const leftPage = Math.max(1, currentSheet * 2);
    const rightPage = Math.min(pages.length, leftPage + 1);
    flipbook.setAttribute('aria-label', `Open to pages ${leftPage}-${rightPage}`);
    // Sync URL so refresh/resizes can restore state
    setURLPage(leftPage);
  }

  // Start: restore from URL before announcing (to avoid overwriting hash)
  const initialPage = getPageFromURL();
  if (initialPage != null && initialPage !== Math.max(1, currentSheet * 2)) {
    goToPage(initialPage);
  } else {
    // Closed book showing front cover
    currentSheetTarget = currentSheet; // sync target with current
    announcePage();
  }
  updateZOrder();
  updateSheetPointerEvents();

  // Remove flipping flags after transitions
  sheets.forEach(s => {
    s.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'transform') {
        s.classList.remove('flipping');
        updateZOrder();
        updateSheetPointerEvents();
      }
    });
  });

  // Removed page-level flip cleanup (no longer used)

  // Scroll-based flipping with threshold and debouncing
  let scrollAccum = 0;
  let scrollCooldown = false;
  const scrollThreshold = 80; // pixels of wheel delta
  function onWheel(e){
    // Do not flip when scrolling inside embedded form container
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
        flipNext(); scrollAccum = 0; scrollCooldown = true;
        setTimeout(() => { scrollCooldown = false; }, 400);
      } else if (scrollAccum < -scrollThreshold) {
        flipPrev(); scrollAccum = 0; scrollCooldown = true;
        setTimeout(() => { scrollCooldown = false; }, 400);
      }
    }
  }
  window.addEventListener('wheel', onWheel, { passive: false });
  
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
    document.body.classList.add('menu-open'); // reuse to lock scroll
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
