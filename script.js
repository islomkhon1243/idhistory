// ======================
// 1. Счётчик отношений
// ======================
// Поставь здесь вашу дату начала отношений:
const loveStartDate = new Date("2026-02-08T00:00:00");

const timerEl = document.getElementById("loveTimer");

function updateLoveTimer() {
  const now = new Date();
  const diff = now - loveStartDate;

  if (diff < 0) {
    timerEl.textContent = "Наша история вот-вот начнётся 💕";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const daysTotal = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const months = Math.floor(daysTotal / 30);
  const days = daysTotal % 30;

  timerEl.textContent =
    `${months} мес. ${days} дн. ` +
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

updateLoveTimer();
setInterval(updateLoveTimer, 1000);


// ======================
// 2. Кнопка секретного послания
// ======================
const openMessageBtn = document.getElementById("openMessageBtn");
const messageSection = document.getElementById("messageSection");

openMessageBtn.addEventListener("click", () => {
  if (messageSection.style.display === "block") {
    messageSection.style.display = "none";
    openMessageBtn.textContent = "Открыть секретное послание";
  } else {
    messageSection.style.display = "block";
    openMessageBtn.textContent = "Скрыть послание";
    messageSection.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});


// ======================
// 3. Reveal-анимации при скролле
// ======================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// ======================
// 4. Lightbox для фото
// ======================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const galleryImages = document.querySelectorAll(".photo-card img");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});


// ======================
// 5. Лёгкий 3D tilt-эффект карточек
// ======================
const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


// ======================
// 6. Падающие сердечки на canvas
// ======================
const canvas = document.getElementById("heartsCanvas");
const ctx = canvas.getContext("2d");

let hearts = [];
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createHeart() {
  return {
    x: random(0, width),
    y: random(-height, 0),
    size: random(8, 20),
    speed: random(0.5, 1.8),
    drift: random(-0.7, 0.7),
    alpha: random(0.35, 0.9)
  };
}

for (let i = 0; i < 45; i++) {
  hearts.push(createHeart());
}

function drawHeart(x, y, size, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 20, size / 20);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#ff78ad";

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -3, -5, -8, -10, -8);
  ctx.bezierCurveTo(-18, -8, -18, 2, -18, 2);
  ctx.bezierCurveTo(-18, 10, -8, 15, 0, 22);
  ctx.bezierCurveTo(8, 15, 18, 10, 18, 2);
  ctx.bezierCurveTo(18, 2, 18, -8, 10, -8);
  ctx.bezierCurveTo(5, -8, 0, -3, 0, 0);
  ctx.fill();

  ctx.restore();
}

function animateHearts() {
  ctx.clearRect(0, 0, width, height);

  hearts.forEach(heart => {
    heart.y += heart.speed;
    heart.x += heart.drift;

    if (heart.y > height + 30) {
      heart.y = -20;
      heart.x = random(0, width);
    }

    drawHeart(heart.x, heart.y, heart.size, heart.alpha);
  });

  requestAnimationFrame(animateHearts);
}

animateHearts();

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});