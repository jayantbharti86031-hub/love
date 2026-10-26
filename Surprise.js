/* =====================================================
   ✏️  YAHAN APNA NAAM AUR MESSAGE BADLO
   ===================================================== */
const HER_NAME  = "Hey Sapna betuu";        // uska naam ya nickname
const YOUR_NAME = "Tumhara Baby";      // apna naam likho

const MESSAGE =
`${HER_NAME},

Aaj maine apni life ka pehla code likha hai… 👨🏻‍💻✨
Abhi toh coding mein beginner hoon, galtiyan bhi hongi aur code bhi kai baar fail hoga… 😂❤️
Lekin ek baat hai, meri life ka ek aisa naam hai jise main kabhi apni priority list se remove nahi karna chahta… aur woh naam hai *Sapna*. 🫶🏻💗
Coding mein toh dheere-dheere expert ban jaunga, par tumhe special feel karane ke naye-naye tareeke hamesha dhoondhta rahunga. 🥹❤️
*My first code, my first step… aur meri favourite notification — YOU!* 💌👩🏻‍💻
– ${YOUR_NAME}`;
/* ===================================================== */

const $ = (id) => document.getElementById(id);
const rand = (a, b) => Math.random() * (b - a) + a;

/* ---------- Background stars ---------- */
(function makeStars() {
  const box = $('stars');
  for (let i = 0; i < 45; i++) {
    const s = document.createElement('i');
    s.className = 'star';
    s.style.left = rand(0, 100) + '%';
    s.style.top = rand(0, 100) + '%';
    s.style.animationDelay = rand(0, 4) + 's';
    s.style.animationDuration = rand(2.5, 5) + 's';
    box.appendChild(s);
  }
})();

/* ---------- Soft rose petals (always falling) ---------- */
(function makePetals() {
  const box = $('petals');
  const colors = [
    'linear-gradient(135deg,#ff8fa3,#d90429)',
    'linear-gradient(135deg,#ffb3c6,#e5383b)',
    'linear-gradient(135deg,#ff758f,#a4133c)',
    'linear-gradient(135deg,#ffccd5,#ff4d6d)'
  ];
  const count = window.innerWidth < 600 ? 18 : 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = 'petal';
    const size = rand(10, 20);
    p.style.width = size + 'px';
    p.style.height = size * 1.25 + 'px';
    p.style.left = rand(0, 100) + '%';
    p.style.background = colors[i % colors.length];
    p.style.setProperty('--s', rand(20, 70) + 'px');
    p.style.animationDuration = rand(9, 17) + 's';
    p.style.animationDelay = -rand(0, 17) + 's';   // negative = already in motion
    box.appendChild(p);
  }
})();

/* ---------- Pop sound (no files needed) ---------- */
function popSound() {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC();
    const t = ctx.currentTime;

    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(720, t);
    o.frequency.exponentialRampToValueAtTime(80, t + 0.2);
    g.gain.setValueAtTime(0.7, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + 0.3);

    const len = ctx.sampleRate * 0.15;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const n = ctx.createBufferSource();
    const ng = ctx.createGain();
    ng.gain.value = 0.35;
    n.buffer = buf;
    n.connect(ng).connect(ctx.destination);
    n.start(t);
  } catch (e) { /* sound optional */ }
}

/* ---------- Blast: hearts + sparkles + shockwave ---------- */
function blast(x, y, amount = 46) {
  const fx = $('fx');
  const icons = ['❤️', '💖', '💗', '💕', '✨', '💘', '🌹', '💞'];

  const ring = document.createElement('div');
  ring.className = 'ring';
  ring.style.left = x + 'px';
  ring.style.top = y + 'px';
  fx.appendChild(ring);
  setTimeout(() => ring.remove(), 1000);

  for (let i = 0; i < amount; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    const angle = rand(0, Math.PI * 2);
    const dist = rand(90, Math.min(window.innerWidth, 520) * 0.85);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = rand(16, 38) + 'px';
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * dist + 70 + 'px'); // slight gravity feel
    el.style.setProperty('--r', rand(-200, 200) + 'deg');
    el.style.setProperty('--t', rand(1.0, 1.8) + 's');
    fx.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }

  const flash = $('flash');
  flash.classList.remove('go');
  void flash.offsetWidth;
  flash.classList.add('go');
}

/* ---------- Typing effect ---------- */
function typeLetter(done) {
  const typed = $('typed');
  const ghost = $('ghost');
  const cursor = document.querySelector('.cursor');
  let i = 0;
  ghost.textContent = MESSAGE;   // reserves final height so the card doesn't jump

  (function step() {
    i++;
    typed.textContent = MESSAGE.slice(0, i);
    ghost.textContent = MESSAGE.slice(i);
    if (i < MESSAGE.length) {
      const ch = MESSAGE[i - 1];
      const pause = ch === '.' || ch === ',' || ch === '\n' ? 260 : 42;
      setTimeout(step, pause);
    } else {
      cursor.classList.add('done');
      done && done();
    }
  })();
}

/* ---------- The timeline (the "video") ---------- */
const intro = $('intro');
const heartDraw = $('heartDraw');
const envWrap = $('envWrap');
const envelope = $('envelope');
const heartOut = $('heartOut');
const hint = $('hint');
const letter = $('letter');
const btn = $('forgiveBtn');

// 0.3s  shining text appears
setTimeout(() => intro.classList.add('in'), 300);
// 3.2s  text fades out
setTimeout(() => { intro.classList.remove('in'); intro.classList.add('out'); }, 3200);
// 3.8s  heart draws itself
setTimeout(() => heartDraw.classList.add('in'), 3800);
// 6.9s  heart shrinks away
setTimeout(() => { heartDraw.classList.remove('in'); heartDraw.classList.add('out'); }, 6900);
// 7.2s  envelope pops in
setTimeout(() => envWrap.classList.add('in'), 7200);

/* ---------- Envelope click ---------- */
let opened = false;
function openEnvelope() {
  if (opened) return;
  opened = true;
  envelope.classList.add('open');
  hint.classList.add('hide');

  // heart finishes rising at ~1.9s → BLAST
  setTimeout(() => {
    const r = heartOut.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    heartOut.classList.add('pop');
    popSound();
    blast(cx, cy, 52);
    envWrap.classList.remove('in');
    envWrap.classList.add('gone');
  }, 2000);

  // letter appears and gets written
  setTimeout(() => {
    letter.classList.add('in');
    setTimeout(() => typeLetter(() => btn.classList.add('show')), 900);
  }, 3000);
}
envelope.addEventListener('click', openEnvelope);
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') openEnvelope();
});

/* ---------- Final button ---------- */
btn.addEventListener('click', () => {
  const r = btn.getBoundingClientRect();
  popSound();
  blast(r.left + r.width / 2, r.top + r.height / 2, 70);
  btn.classList.remove('show');
  btn.textContent = ' I love you! meri jaan 🥰';
  btn.style.animation = 'none';
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '1';
  btn.style.visibility = 'visible';
  btn.style.transform = 'none';
});
