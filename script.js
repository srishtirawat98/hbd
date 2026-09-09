/* ============================================
   🎀 BIRTHDAY SURPRISE — JAVASCRIPT
   ============================================
   
   🔑 CHANGE YOUR PASSWORD HERE:
   ============================================ */

// ╔══════════════════════════════════════════╗
// ║  👇 SET YOUR SECRET PASSWORD BELOW 👇   ║
// ║  Just change the text inside the quotes  ║
// ╚══════════════════════════════════════════╝
const correctPassword = "10092007";
// ↑↑↑ CHANGE THIS TO YOUR OWN PASSWORD ↑↑↑


/* ============================================
   🎵 MUSIC SETUP
   ============================================
   Place your music file in the same folder
   and name it "music.mp3"
   ============================================ */
const MUSIC_FILE = "music.mp3"; // ← Change filename if needed


/* ============================================
   INITIALIZATION
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  createBackgroundDecorations();
  createFloatingHearts();
  createSparkles();
  setupClickHearts();
  setupMusicButton();

  // Page-specific setup
  if (document.getElementById('passwordForm')) {
    setupPasswordPage();
  }
});


/* ============================================
   PASSWORD PAGE LOGIC
   ============================================ */
function setupPasswordPage() {
  const form = document.getElementById('passwordForm');
  const input = document.getElementById('passwordInput');
  const errorMsg = document.getElementById('errorMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkPassword(input.value, errorMsg);
  });
}

function checkPassword(value, errorEl) {
  if (value.trim() === correctPassword) {
    // Correct! Play unlock animation
    errorEl.classList.remove('show');
    playUnlockAnimation();
  } else {
    // Wrong password
    errorEl.classList.add('show');
    errorEl.textContent = "Oops... that's not it ♡ Try again!";

    // Gentle shake on the card
    const card = document.querySelector('.envelope-card');
    card.style.animation = 'none';
    card.offsetHeight; // Force reflow
    card.style.animation = 'shake 0.5s ease';
  }
}

/* ============================================
   UNLOCK ANIMATION
   ============================================ */
function playUnlockAnimation() {
  const overlay = document.getElementById('unlockOverlay');
  overlay.classList.add('active');

  // Create burst hearts around the envelope
  const content = overlay.querySelector('.unlock-content');
  const heartPositions = [
    { bx: '-100px', by: '-130px', br: '-20deg', delay: '0.2s' },
    { bx: '110px',  by: '-120px', br: '25deg',  delay: '0.3s' },
    { bx: '-80px',  by: '-180px', br: '-10deg', delay: '0.1s' },
    { bx: '90px',   by: '-170px', br: '35deg',  delay: '0.25s' },
    { bx: '-130px', by: '-80px',  br: '-30deg', delay: '0.15s' },
    { bx: '140px',  by: '-90px',  br: '15deg',  delay: '0.35s' },
    { bx: '0px',    by: '-200px', br: '5deg',   delay: '0.2s'  },
    { bx: '-50px',  by: '-160px', br: '-15deg', delay: '0.4s'  },
    { bx: '60px',   by: '-150px', br: '20deg',  delay: '0.1s'  },
  ];

  heartPositions.forEach((pos) => {
    const heart = document.createElement('span');
    heart.className = 'unlock-heart';
    heart.textContent = '♡';
    heart.style.setProperty('--bx', pos.bx);
    heart.style.setProperty('--by', pos.by);
    heart.style.setProperty('--br', pos.br);
    heart.style.animationDelay = pos.delay;
    heart.style.color = Math.random() > 0.5 ? 'var(--soft-pink)' : 'var(--dusty-rose)';
    content.appendChild(heart);
  });

  // Add sparkles
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 1.5 + 's';
    sparkle.style.width = (3 + Math.random() * 4) + 'px';
    sparkle.style.height = sparkle.style.width;
    overlay.appendChild(sparkle);
  }

  // Navigate to letter page after animation
  setTimeout(() => {
    document.body.classList.add('page-fade-out');
    setTimeout(() => {
      window.location.href = 'letter.html';
    }, 600);
  }, 2500);
}


/* ============================================
   BACKGROUND DECORATIONS (Flowers, Stars, Hearts)
   ============================================ */
function createBackgroundDecorations() {
  const container = document.querySelector('.bg-decorations');
  if (!container) return;

  const decorations = [
    // Flowers (SVG)
    ...Array.from({ length: 6 }, () => ({
      type: 'flower',
      html: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="12" r="6" fill="var(--soft-pink)" opacity="0.5"/>
        <circle cx="28" cy="18" r="6" fill="var(--blush)" opacity="0.5"/>
        <circle cx="25" cy="27" r="6" fill="var(--soft-pink)" opacity="0.4"/>
        <circle cx="15" cy="27" r="6" fill="var(--blush)" opacity="0.4"/>
        <circle cx="12" cy="18" r="6" fill="var(--soft-pink)" opacity="0.5"/>
        <circle cx="20" cy="20" r="4" fill="var(--gold-light)" opacity="0.6"/>
      </svg>`
    })),
    // Stars
    ...Array.from({ length: 8 }, () => ({
      type: 'star',
      html: `<svg viewBox="0 0 20 20" fill="var(--gold)" opacity="0.3" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 1l2.5 6.5H19l-5.3 4 2 6.5L10 14l-5.7 4 2-6.5L1 7.5h6.5z"/>
      </svg>`
    })),
    // Hearts
    ...Array.from({ length: 6 }, () => ({
      type: 'heart',
      html: `<svg viewBox="0 0 20 20" fill="var(--soft-pink)" opacity="0.3" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18s-7-4.35-7-9.5C3 5.46 5.46 3 8.5 3c1.74 0 3.41.81 4.5 2.09A6.23 6.23 0 0117.5 3C20.54 3 23 5.46 23 8.5c0 5.15-7 9.5-7 9.5"
          transform="scale(0.8) translate(1,1)"/>
      </svg>`
    })),
    // Dots
    ...Array.from({ length: 10 }, () => ({
      type: 'dot',
      html: ''
    }))
  ];

  decorations.forEach((deco, i) => {
    const el = document.createElement('div');
    el.className = `bg-deco deco-${deco.type}`;
    el.innerHTML = deco.html;
    el.style.left = Math.random() * 95 + '%';
    el.style.top = Math.random() * 95 + '%';
    el.style.animationDelay = (Math.random() * 15) + 's';
    el.style.animationDuration = (15 + Math.random() * 15) + 's';

    if (deco.type === 'dot') {
      el.classList.add('deco-dot');
    }

    container.appendChild(el);
  });
}


/* ============================================
   FLOATING HEARTS
   ============================================ */
function createFloatingHearts() {
  const container = document.querySelector('.floating-hearts');
  if (!container) return;

  const hearts = ['♡', '♥', '❤', '💕'];

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.className = 'float-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.setProperty('--duration', (10 + Math.random() * 15) + 's');
    heart.style.setProperty('--delay', (Math.random() * 12) + 's');
    heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    heart.style.fontSize = (14 + Math.random() * 12) + 'px';
    heart.style.color = Math.random() > 0.5 ? 'var(--soft-pink)' : 'var(--blush)';
    container.appendChild(heart);
  }
}


/* ============================================
   SPARKLES
   ============================================ */
function createSparkles() {
  const container = document.querySelector('.sparkle-container');
  if (!container) return;

  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = (Math.random() * 5) + 's';
    sparkle.style.animationDuration = (2 + Math.random() * 3) + 's';
    const size = (2 + Math.random() * 4) + 'px';
    sparkle.style.width = size;
    sparkle.style.height = size;
    container.appendChild(sparkle);
  }
}


/* ============================================
   CLICK HEART CURSOR EFFECT
   ============================================ */
function setupClickHearts() {
  document.addEventListener('click', (e) => {
    // Don't create hearts on button/input clicks
    if (e.target.closest('button, input, a')) return;

    const heart = document.createElement('span');
    heart.className = 'click-heart';
    heart.textContent = ['♡', '♥', '✿', '✧'][Math.floor(Math.random() * 4)];
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.color = Math.random() > 0.5 ? 'var(--soft-pink)' : 'var(--dusty-rose)';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 800);
  });
}


/* ============================================
   MUSIC BUTTON
   ============================================ */
function setupMusicButton() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;

  const audio = new Audio(MUSIC_FILE);
  audio.loop = true;
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      btn.classList.remove('playing');
      btn.innerHTML = '🎵';
    } else {
      audio.play().catch(() => {
        // Browser blocked autoplay — ignore silently
      });
      btn.classList.add('playing');
      btn.innerHTML = '🎶';
    }
    isPlaying = !isPlaying;
  });
}


/* ============================================
   CARD SHAKE (for wrong password)
   ============================================ */
const shakeKeyframes = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);
