// =========================================================
// TAHUN FOOTER
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navBurger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');

navBurger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =========================================================
// TYPEWRITER EFFECT (perkenalan singkat)
// =========================================================
const phrases = [
  'Siswa TKJ — Mikrotik, Fiber Optik, Server',
  'Belajar konfigurasi jaringan sejak kelas X',
  'Siap praktik & terus belajar hal baru'
];

const typewriterEl = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop(){
  const current = phrases[phraseIndex];

  if(!deleting){
    charIndex++;
    typewriterEl.textContent = current.slice(0, charIndex);
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1600);
      return;
    }
  } else {
    charIndex--;
    typewriterEl.textContent = current.slice(0, charIndex);
    if(charIndex === 0){
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 35 : 55;
  setTimeout(typeLoop, speed);
}

typeLoop();

// =========================================================
// BACKGROUND NETWORK CANVAS (node & garis koneksi)
// =========================================================
const canvas = document.getElementById('netCanvas');
const ctx = canvas.getContext('2d');
let nodes = [];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initNodes(){
  const count = Math.floor((canvas.width * canvas.height) / 28000);
  nodes = Array.from({ length: Math.min(count, 70) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  }));
}

function drawFrame(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(const n of nodes){
    n.x += n.vx;
    n.y += n.vy;
    if(n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if(n.y < 0 || n.y > canvas.height) n.vy *= -1;
  }

  for(let i = 0; i < nodes.length; i++){
    for(let j = i + 1; j < nodes.length; j++){
      const a = nodes[i], b = nodes[j];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if(dist < 140){
        ctx.strokeStyle = `rgba(0, 229, 255, ${0.12 * (1 - dist / 140)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for(const n of nodes){
    ctx.fillStyle = 'rgba(79, 107, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  if(!prefersReducedMotion){
    requestAnimationFrame(drawFrame);
  }
}

resizeCanvas();
initNodes();
drawFrame();

window.addEventListener('resize', () => {
  resizeCanvas();
  initNodes();
});

// =========================================================
// MODAL CV (lihat & tutup pratinjau)
// =========================================================
const cvModal = document.getElementById('cvModal');
const cvModalFrame = document.getElementById('cvModalFrame');
const btnLihatCV = document.getElementById('btnLihatCV');
const cvModalClose = document.getElementById('cvModalClose');
const cvModalOverlay = document.getElementById('cvModalOverlay');
const CV_PATH = 'assets/cv-fadhlil-azhim.jpeg';

function openCVModal(){
  cvModalFrame.src = CV_PATH;
  cvModal.classList.add('open');
  cvModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCVModal(){
  cvModal.classList.remove('open');
  cvModal.setAttribute('aria-hidden', 'true');
  cvModalFrame.src = '';
  document.body.style.overflow = '';
}

btnLihatCV.addEventListener('click', openCVModal);
cvModalClose.addEventListener('click', closeCVModal);
cvModalOverlay.addEventListener('click', closeCVModal);

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && cvModal.classList.contains('open')){
    closeCVModal();
  }
});