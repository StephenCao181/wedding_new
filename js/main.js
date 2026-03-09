/* ============================================================
   WEDDING V5 — js/main.js
   ============================================================ */

/* ── ENVELOPE ── */
let envelopeStep = 'envelope';

function openEnvelope() {
  if (envelopeStep !== 'envelope') return;
  envelopeStep = 'card';
  document.getElementById('envelope-flap').classList.add('open');
  document.getElementById('envelope-cta').style.display = 'none';
  const thiep = document.getElementById('envelope-thiep');
  if (thiep) thiep.style.display = 'none';
  setTimeout(() => {
    const e = document.getElementById('envelope');
    e.style.opacity = '0';
    e.style.transform = 'scale(0.95) translateY(30px)';
    e.style.pointerEvents = 'none';
  }, 400);
  setTimeout(() => document.getElementById('invite-card').classList.add('show'), 500);
}

function enterSite(side) {
  if (envelopeStep !== 'card') return;
  envelopeStep = 'open';

  const sideData = {
    groom: {
      groomName:  'Cao Gia Khoa',
      brideName:  'Trần Thị Thu Huyền',
      groomDad:   'Cao Văn Minh',
      groomMom:   'Hoàng Thị Hà',
      brideDad:   'Trần Văn Điệp',
      brideMom:   'Bùi Thị Vân',
      ceremonyDate:    'Thứ Bảy, 03/04/2026',
      ceremonyTime:    '08:00 sáng',
      ceremonyAddr:    'Số 25B/7/75 Trung Hành, Hải An, Hải Phòng',
      receptionDate:   'Chủ Nhật, 04/04/2026',
      receptionVenue:  'TT Tiệc cưới Giang Thanh',
      receptionAddr:   'Cầu Rào 1, Hải Phòng',
    },
    bride: {
      // Family data được inject trực tiếp trong khối side==='bride' bên dưới
      // Chỉ cần data sự kiện ở đây
      ceremonyDate:    'Thứ Bảy, 03/04/2026',
      ceremonyTime:    '08:00 sáng',
      ceremonyAddr:    'Xóm 12, Giao Thuỷ, Nam Định, Việt Nam',
      receptionDate:   'Chủ Nhật, 04/04/2026',
      receptionVenue:  'Lễ Nhà Gái',
      receptionAddr:   'Xóm 12, Giao Thuỷ, Nam Định, Việt Nam',
    },
  };

  const d = sideData[side] || sideData.groom;

  // ── Inject dữ liệu ──
  const setTxt  = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML  = val; };

  setTxt('data-groom-name',      d.groomName);
  setTxt('data-bride-name',      d.brideName);
  setTxt('data-groom-dad',       d.groomDad);
  setTxt('data-groom-mom',       d.groomMom);
  setTxt('data-bride-dad',       d.brideDad);
  setTxt('data-bride-mom',       d.brideMom);
  setTxt('data-ceremony-date',   d.ceremonyDate);
  setTxt('data-ceremony-time',   d.ceremonyTime);
  setTxt('data-ceremony-addr',   d.ceremonyAddr);
  setTxt('data-reception-date',  d.receptionDate);
  setTxt('data-reception-venue', d.receptionVenue);
  setTxt('data-reception-addr',  d.receptionAddr);

  // ── Đổi nhãn tiêu đề lễ ──
  const ceremonyLabel = document.getElementById('data-ceremony-label');
  if (ceremonyLabel) ceremonyLabel.textContent = side === 'bride' ? 'Lễ Vu Quy' : 'Lễ Thành Hôn';
  const receptionLabel = document.getElementById('data-reception-label');
  if (receptionLabel) receptionLabel.textContent = side === 'bride' ? 'Tiệc Cưới' : 'Tiệc Cưới';
  const ceremonyHostLabel = document.getElementById('data-ceremony-host');
  if (ceremonyHostLabel) ceremonyHostLabel.textContent = side === 'bride' ? 'Tư gia nhà gái' : 'Tư gia nhà trai';

  // ── Inject đúng data gia đình cho từng bản ──
  if (side === 'bride') {
    // Bản nhà gái:
    // Card trái (groom-slot) = NHÀ GÁI: Trần Văn Điệp / Bùi Thị Vân / Thu Huyền
    // Card phải (bride-slot) = NHÀ TRAI: Cao Văn Minh / Hoàng Thị Hà / Gia Khoa
    setTxt('data-groom-dad',  'Trần Văn Điệp');
    setTxt('data-groom-mom',  'Bùi Thị Vân');
    setTxt('data-groom-name', 'Trần Thị Thu Huyền');
    setTxt('data-bride-dad',  'Cao Văn Minh');
    setTxt('data-bride-mom',  'Hoàng Thị Hà');
    setTxt('data-bride-name', 'Cao Gia Khoa');

    // Đổi label card trái → Nhà Gái
    const groomCard = document.getElementById('data-groom-dad').closest('.family-card');
    groomCard.querySelector('h3').textContent = 'Nhà Gái';
    groomCard.querySelector('.sub').textContent = 'Gia đình cô dâu';
    groomCard.querySelector('.family-avatar').textContent = '👰';
    groomCard.querySelector('.family-avatar').className = 'family-avatar gold-bg';
    groomCard.querySelector('.family-divider .small').textContent = 'Con gái';
    groomCard.querySelector('.family-divider .big').className = 'big gold';

    // Đổi label card phải → Nhà Trai
    const brideCard = document.getElementById('data-bride-dad').closest('.family-card');
    brideCard.querySelector('h3').textContent = 'Nhà Trai';
    brideCard.querySelector('.sub').textContent = 'Gia đình chú rể';
    brideCard.querySelector('.family-avatar').textContent = '🤵';
    brideCard.querySelector('.family-avatar').className = 'family-avatar rose-bg';
    brideCard.querySelector('.family-divider .small').textContent = 'Con trai';
    brideCard.querySelector('.family-divider .big').className = 'big rose';
  }

  // ── Nearby places cho từng bản ──
  const nearbyGrid = document.getElementById('nearby-grid');
  if (nearbyGrid && side === 'bride') {
    nearbyGrid.innerHTML = `
      <div class="nearby-card">
        <div class="nearby-icon" style="background:linear-gradient(135deg,#5bb75b,#8edb8e)">🌳</div>
        <div class="nearby-info">
          <h4>Vườn QG Xuân Thủy</h4>
          <p>Khu bảo tồn thiên nhiên ngập mặn, ngắm chim di cư độc đáo</p>
          <span class="nearby-dist">📍 ~12 km · ⭐ 4.6</span>
        </div>
      </div>
      <div class="nearby-card">
        <div class="nearby-icon" style="background:linear-gradient(135deg,#4a90e2,#70b3f5)">🏖️</div>
        <div class="nearby-info">
          <h4>Bãi biển Quất Lâm</h4>
          <p>Bãi biển sầm uất, hải sản tươi ngon, tắm biển thư giãn</p>
          <span class="nearby-dist">📍 ~7 km · ⭐ 4.0</span>
        </div>
      </div>
      <div class="nearby-card">
        <div class="nearby-icon" style="background:linear-gradient(135deg,#f5a623,#fcc451)">🛍️</div>
        <div class="nearby-info">
          <h4>Chợ Phủ Giao Thủy</h4>
          <p>Văn hóa địa phương, đặc sản, ẩm thực phong phú</p>
          <span class="nearby-dist">📍 ~6 km · ⭐ 4.2</span>
        </div>
      </div>
      <div class="nearby-card">
        <div class="nearby-icon" style="background:linear-gradient(135deg,#a52a2a,#d46a6a)">⛪</div>
        <div class="nearby-info">
          <h4>Nhà thờ Bùi Chu</h4>
          <p>Di tích lịch sử, kiến trúc Pháp cổ kính, biểu tượng Công giáo</p>
          <span class="nearby-dist">📍 ~18 km · ⭐ 4.7</span>
        </div>
      </div>
      <div class="nearby-card">
        <div class="nearby-icon" style="background:linear-gradient(135deg,#00bfa5,#33ccb4)">🌊</div>
        <div class="nearby-info">
          <h4>Bãi biển Thịnh Long</h4>
          <p>Bãi biển trong lành, hải sản tươi, phong cảnh đẹp</p>
          <span class="nearby-dist">📍 ~28 km · ⭐ 4.3</span>
        </div>
      </div>
      <div class="nearby-card">
        <div class="nearby-icon" style="background:linear-gradient(135deg,#d0021b,#e6515c)">🦐</div>
        <div class="nearby-info">
          <h4>Hải Sản Biển Giao Thủy</h4>
          <p>Đặc sản hải sản tươi sống, hương vị đặc trưng vùng biển</p>
          <span class="nearby-dist">📍 ~8 km · ⭐ 4.4</span>
        </div>
      </div>
    `;
  }

  // ── Cập nhật Google Maps iframe cho nhà gái ──
  const mapIframe = document.getElementById('map-iframe');
  if (mapIframe && side === 'bride') {
    mapIframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3734!2d106.5089!3d20.2345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zR2lhbyBUaHXhu7l!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn';
  }

  // ── Hero intro: đổi tên + địa điểm cho nhà gái ──
  if (side === 'bride') {
    setTxt('data-hero-name1', 'Thu Huyền');
    setTxt('data-hero-name2', 'Gia Khoa');
    setTxt('data-hero-date',  'Chủ Nhật · 04 Tháng 04 Năm 2026 · Nam Định');
  }

  // ── Badge bên đang xem ──
  const badge = document.getElementById('side-badge');
  if (badge) {
    badge.textContent = side === 'groom' ? '🤵 Nhà Trai' : '👰 Nhà Gái';
    badge.style.display = 'flex';
  }

  currentSide = side || 'groom';

  // Switch hero background image per side
  const heroBg = document.getElementById('hero-bg-el');
  if (heroBg) {
    if (side === 'bride') {
      heroBg.style.backgroundImage = "url('images/hero/hero-bride.jpg')";
    } else {
      heroBg.style.backgroundImage = "url('images/hero/hero-groom.jpg')";
    }
    heroBg.classList.add('has-photo');
  }

  document.getElementById('envelope-screen').classList.add('hidden');
  setTimeout(() => document.getElementById('main-content').classList.add('show'), 200);
}

/* ── PARTICLES ── */
function goBackToChoice() {
  // Reset về màn hình thiệp chọn
  envelopeStep = 'card';
  document.getElementById('main-content').classList.remove('show');
  document.getElementById('envelope-screen').classList.remove('hidden');
  document.getElementById('side-badge').style.display = 'none';
}

function initParticles(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  const ps = [];

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 40; i++) {
    ps.push({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + .5,
      dx: (Math.random() - .5) * .3,
      dy: (Math.random() - .5) * .3,
      o: Math.random() * .5 + .2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ps.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,188,124,${p.o})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

initParticles('envelope-particles');
setTimeout(() => initParticles('hero-particles'), 1500);

/* ── COUNTDOWN ── */
(function () {
  const target = new Date('Apr 04, 2026 11:00:00').getTime();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };

  function update() {
    const diff = target - Date.now();
    if (diff < 0) {
      document.querySelector('.countdown-grid').innerHTML =
        '<p style="color:white;font-size:20px;padding:20px 0">Ngày cưới đã đến! 🎉</p>';
      return;
    }
    els.days.textContent  = String(Math.floor(diff / 864e5)).padStart(2, '0');
    els.hours.textContent = String(Math.floor((diff % 864e5) / 36e5)).padStart(2, '0');
    els.mins.textContent  = String(Math.floor((diff % 36e5) / 6e4)).padStart(2, '0');
    els.secs.textContent  = String(Math.floor((diff % 6e4) / 1e3)).padStart(2, '0');
  }
  setInterval(update, 1000);
  update();
})();

/* ── GALLERY & LIGHTBOX ── */
// 📸 CẤU HÌNH ẢNH ALBUM — thêm đường dẫn ảnh thật vào đây
// Ví dụ: { src: 'images/gallery/photo-01.jpg', caption: 'Chụp ở Đà Lạt', tall: true }
// tall: true  → ảnh dọc (portrait)   — chiều cao ~320-400px trong masonry
// tall: false → ảnh ngang (landscape) — chiều cao ~200-260px trong masonry
const galleryData = [
  { src: 'images/gallery/photo-01.jpg', caption: 'Khoảnh khắc cầu hôn', tall: true },
  { src: 'images/gallery/photo-02.jpg', caption: 'Ánh mắt yêu thương',  tall: false },
  { src: 'images/gallery/photo-03.jpg', caption: 'Niềm vui bên nhau',   tall: true },
  { src: 'images/gallery/photo-04.jpg', caption: 'Hạnh phúc đôi mình',  tall: false },
  { src: 'images/gallery/photo-05.jpg', caption: 'Nhẫn đính hôn',       tall: false },
  { src: 'images/gallery/photo-06.jpg', caption: 'Khoảnh khắc ngọt ngào', tall: true },
];

/* ── SCROLL REVEAL & NAV ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

// Render gallery items
(function buildGallery() {
  const masonry = document.getElementById('gallery-masonry');
  if (!masonry) return;
  galleryData.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-item reveal';
    div.onclick = () => openLB(i);
    if (item.src) {
      // Real photo
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption || '';
      img.className = 'gallery-img';
      img.style.height = item.tall ? '300px' : '210px';
      div.appendChild(img);
    } else {
      // Placeholder
      const ph = document.createElement('div');
      ph.className = `gp ${item.placeholder.cssClass} gallery-img`;
      ph.textContent = item.placeholder.emoji;
      div.appendChild(ph);
    }
    const hover = document.createElement('div');
    hover.className = 'gallery-hover';
    hover.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white"/></svg>`;
    div.appendChild(hover);
    masonry.appendChild(div);
    // re-observe for reveal animation
    revealObs.observe(div);
  });
})();

let lbIdx = 0;

function openLB(i) {
  lbIdx = i;
  renderLB();
  document.getElementById('lightbox').classList.add('open');
}
function closeLB() {
  document.getElementById('lightbox').classList.remove('open');
}
function navLB(d) {
  lbIdx = (lbIdx + d + galleryData.length) % galleryData.length;
  renderLB();
}
function renderLB() {
  const it = galleryData[lbIdx];
  const lbContent = document.getElementById('lb-content');
  if (it.src) {
    lbContent.innerHTML = `<img src="${it.src}" alt="${it.caption || ''}" style="max-width:90vw;max-height:85vh;border-radius:12px;object-fit:contain;">`;
  } else {
    lbContent.innerHTML = `<div class="gp ${it.placeholder.cssClass}" style="width:80vw;max-width:560px;height:70vh;border-radius:12px;font-size:80px">${it.placeholder.emoji}</div>`;
  }
}
document.getElementById('lightbox').addEventListener('click', closeLB);

// Keyboard navigation for lightbox
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  navLB(-1);
  if (e.key === 'ArrowRight') navLB(1);
  if (e.key === 'Escape')     closeLB();
});

/* ── RSVP FORM ── */
function pickAttend(v) {
  document.querySelectorAll('.attend-opt').forEach(o => o.classList.remove('active'));
  document.getElementById('opt-' + (v === 'yes' ? 'yes' : 'no')).classList.add('active');
  document.querySelector(`input[value="${v}"]`).checked = true;
}

function submitForm(e) {
  e.preventDefault();
  if (!document.getElementById('f-name').value.trim()) return;
  document.getElementById('rsvp-form').style.display = 'none';
  document.getElementById('success-box').classList.add('show');
}

/* ── GIFT / LIXI ── */
let lixiInterval = null;
const lixiPEl = document.getElementById('lixi-particles');
const lixiCEl = document.getElementById('lixi-container');

function createLixiParticle() {
  const p = document.createElement('div');
  p.className = 'lixi-particle ' + (Math.random() < .65 ? 'coin' : 'sparkle');
  p.style.left = (110 + (Math.random() - .5) * 180) + 'px';
  p.style.top  = (150 + (Math.random() - .5) * 240) + 'px';
  const dur = Math.random() * 2 + 2;
  p.style.setProperty('--dur', dur + 's');
  p.style.setProperty('--delay', (Math.random() * .3) + 's');
  p.style.setProperty('--dx', ((Math.random() - .5) * 200) + 'px');
  p.style.setProperty('--dy', ((Math.random() - .5) * 200 - 100) + 'px');
  p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
  lixiPEl.appendChild(p);
  p.addEventListener('animationend', () => p.remove());
}

function startLixiParticles() {
  if (!lixiInterval) {
    lixiPEl.innerHTML = '';
    lixiInterval = setInterval(createLixiParticle, 120);
  }
}
function stopLixiParticles() {
  clearInterval(lixiInterval);
  lixiInterval = null;
}

lixiCEl.addEventListener('mouseenter', startLixiParticles);
lixiCEl.addEventListener('mouseleave', stopLixiParticles);

let ltActive = false;
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !ltActive) {
    ltActive = true;
    startLixiParticles();
    setTimeout(() => { stopLixiParticles(); ltActive = false; }, 3000);
  }
}, { threshold: .5 }).observe(lixiCEl);

// currentSide được set bởi enterSite()
let currentSide = 'groom';

function openGiftPopup() {
  stopLixiParticles();

  const groomCard = document.querySelector('.gift-qr-card.groom-card');
  const brideCard = document.querySelector('.gift-qr-card.bride-card');
  const grid      = document.getElementById('gift-qr-grid');

  if (currentSide === 'groom') {
    // Nhà trai: chỉ hiện chú rể
    groomCard.style.display = '';
    brideCard.style.display = 'none';
    grid.style.gridTemplateColumns = '1fr';
    grid.style.maxWidth = '280px';
    grid.style.margin   = '0 auto';
  } else {
    // Nhà gái: chỉ hiện cô dâu
    groomCard.style.display = 'none';
    brideCard.style.display = '';
    grid.style.gridTemplateColumns = '1fr';
    grid.style.maxWidth = '280px';
    grid.style.margin   = '0 auto';
  }

  document.getElementById('gift-popup').classList.add('open');
}
function closeGiftPopup(e) {
  if (!e || e.target === document.getElementById('gift-popup'))
    document.getElementById('gift-popup').classList.remove('open');
}

// QR codes — injected via base64 in demo build
// In production, set src directly: document.getElementById('qr-groom-img').src = 'images/assets/qr-groom.jpg'

const dots = document.querySelectorAll('.scroll-dot');
const sections = ['hero', 'hero-intro', 'countdown-section', 'family', 'gallery', 'events', 'rsvp', 'gift'];

dots.forEach(d => d.addEventListener('click', () => {
  const t = document.getElementById(d.dataset.target);
  if (t) t.scrollIntoView({ behavior: 'smooth' });
}));

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(id => {
    const s = document.getElementById(id);
    if (s && s.getBoundingClientRect().top < window.innerHeight / 2) cur = id;
  });
  dots.forEach(d => d.classList.toggle('active', d.dataset.target === cur));
});

/* ── MUSIC ── */
let musicPlaying = false;
function toggleMusic() {
  musicPlaying = !musicPlaying;
  document.getElementById('music-toggle').classList.toggle('paused', !musicPlaying);
  // TODO: thêm audio element khi có file nhạc
  // const audio = document.getElementById('bg-music');
  // musicPlaying ? audio.play() : audio.pause();
}

/* ── PRELOADER & INIT ── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader').classList.add('hide'), 800);
});

// Guest URL param: ?guest=TênKhách
(function () {
  const p = new URLSearchParams(location.search).get('guest');
  if (p) {
    document.getElementById('guest-display').textContent = decodeURIComponent(p);
    document.getElementById('hero-greeting').style.display = 'block';
  }
})();
