// Typing effect for name
document.addEventListener("DOMContentLoaded", () => {
  const text = "Ashish Chauhan";
  const heroTitle = document.getElementById("hero-title");
  const colors = ["#ff4d4d", "#00fff7", "#a64dff"];
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      const color = colors[i % colors.length];
      heroTitle.innerHTML += `<span style="color:${color}; text-shadow:0 0 15px ${color};">${text.charAt(i)}</span>`;
      i++;
      setTimeout(typeWriter, 200);
    }
  }
  typeWriter();
});

// Floating neon particles
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  let colors = ["#ff4d4d", "#00fff7", "#a64dff"];
  for (let i = 0; i < 50; i++) {
    let size = Math.random() * 3 + 2;
    let x = Math.random() * (innerWidth - size * 2);
    let y = Math.random() * (innerHeight - size * 2);
    let directionX = (Math.random() * 0.5) - 0.25;
    let directionY = (Math.random() * 0.5) - 0.25;
    let color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
}

init();
animate();

window.addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
