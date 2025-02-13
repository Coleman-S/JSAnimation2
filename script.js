/******************************************
 * JSAnimation2 - Portfolio Intro
 * Coleman Swarts
 * Due Feb 13, 2025
 * CSCI 324
 * main javascript file
 ******************************************/
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numParticles = 120;
const mouse = { x: null, y: null, radius: 100 }; // Bigger radius for better effect

// Particle class with movement & interaction
class Particle {
   constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
   }

   draw() {
      ctx.fillStyle = "#00ff99";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
   }

   update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off walls
      if (this.x + this.size > canvas.width || this.x - this.size < 0) {
         this.speedX = -this.speedX;
      }
      if (this.y + this.size > canvas.height || this.y - this.size < 0) {
         this.speedY = -this.speedY;
      }

      // Mouse interaction (particles repel)
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
         let angle = Math.atan2(dy, dx);
         this.x -= Math.cos(angle) * 3;
         this.y -= Math.sin(angle) * 3;
      }

      this.draw();
   }
}

// Create particles
function initParticles() {
   particlesArray.length = 0;
   for (let i = 0; i < numParticles; i++) {
      let size = Math.random() * 3 + 1;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedX = (Math.random() - 0.5) * 2;
      let speedY = (Math.random() - 0.5) * 2;
      particlesArray.push(new Particle(x, y, size, speedX, speedY));
   }
}

// Draw connections between particles
function connectParticles() {
   for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
         let dx = particlesArray[a].x - particlesArray[b].x;
         let dy = particlesArray[a].y - particlesArray[b].y;
         let distance = Math.sqrt(dx * dx + dy * dy);

         if (distance < 100) {
            ctx.strokeStyle = "rgba(0, 255, 153, 0.2)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
         }
      }
   }
}

// Animate particles
function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   for (let particle of particlesArray) {
      particle.update();
   }
   connectParticles();
   requestAnimationFrame(animate);
}

// Track Mouse Movement
window.addEventListener("mousemove", (event) => {
   mouse.x = event.x;
   mouse.y = event.y;
});

// Update on Resize
window.addEventListener("resize", () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   initParticles();
});

// Initialize and start animation
initParticles();
animate();

// ==========================
// Fake Code Loading
// ==========================
const fakeCode = [
   "Initializing AI...",
   "Loading modules...",
   "Connecting to server...",
   "Fetching user data...",
   "Decryption sequence...",
   "Verifying identity...",
   "Access granted.",
];

const fakeCodeElement = document.getElementById("fake-code");
let fakeIndex = 0;

function showFakeCode() {
   if (fakeIndex < fakeCode.length) {
      fakeCodeElement.innerHTML += `<p>${fakeCode[fakeIndex]}</p>`;
      fakeIndex++;
      setTimeout(showFakeCode, 400);
   } else {
      setTimeout(typeEffect, 1000);
   }
}

// ==========================
// Terminal Typing Effect
// ==========================
const text = " Hello, I'm a Programmer_";
const typedText = document.getElementById("typed-text");
const enterText = document.getElementById("enter-text");
let index = 0;

function typeEffect() {
   if (index < text.length) {
      typedText.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeEffect, Math.random() * 150 + 50);
   } else {
      // Show "Press ENTER to Continue"
      enterText.classList.remove("hidden");
   }
}

setTimeout(showFakeCode, 1000);

// ==========================
// Press ENTER to Continue
// ==========================
document.addEventListener("keydown", function (event) {
   if (event.key === "Enter") {
      enterText.innerHTML = "[Loading...]";
      setTimeout(() => {
         document.querySelector(".terminal").style.opacity = "0";
         setTimeout(() => {
            document.querySelector(".terminal").style.display = "none";
            document.getElementById("main-content").style.display = "block";
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
         }, 500);
      }, 500);
   }
});
