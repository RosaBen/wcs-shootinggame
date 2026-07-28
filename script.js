
import Player from "./models/Player.js";
import Projectile from "./models/Projectile.js";
import Enemy from "./models/Enemy.js";
import Particle from "./models/Particle.js";


// variables
const canvas = document.getElementById("container");
const scoreEl = document.getElementById("scoreEl");
const startGameBtn = document.getElementById("startGameBtn");
const modalEl = document.getElementById("modalEl");
const bigScoreEl = document.getElementById("bigScoreEl");
const ctx = canvas.getContext('2d');
const projectiles = [];
const enemies = [];
const particles = [];
let animationId;
let enemySpawnId;
let score = 0;

// Create new Player
const player = new Player(canvas.width / 2, canvas.height / 2, 10, "blue");


// functions

function init () {
  player = new Player(canvas.width / 2, canvas.height / 2, 10, "white");
  projectiles = [];
  enemies = [];
  particles = [];
  score = 0;
  scoreEl.innerText = score;
  bigScoreEl.innerText = score;
}
function resizeCanvas () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
}

function animate () {

  animationId = requestAnimationFrame(animate);


  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  // particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    } else {
      particle.update(ctx);
    }
  }


  // projectiles
  for (let p = projectiles.length - 1; p >= 0; p--) {
    const proj = projectiles[p];
    proj.update(ctx);

    if (
      proj.x + proj.radius < 0 ||
      proj.x - proj.radius > canvas.width ||
      proj.y + proj.radius < 0 ||
      proj.y - proj.radius > canvas.height
    ) {
      projectiles.splice(p, 1);
    }
  }

  // enemies + collissions
  for (let e = enemies.length - 1; e >= 0; e--) {
    const enemy = enemies[e];
    enemy.update(ctx);

    if (
      enemy.x + enemy.radius < -100 ||
      enemy.x - enemy.radius > canvas.width + 100 ||
      enemy.y + enemy.radius < -100 ||
      enemy.y - enemy.radius > canvas.height + 100

    ) {
      enemies.splice(e, 1);
      continue;
    }

    // collision palyer/enemy => stop game
    const distPlayerEnemy = Math.hypot(
      player.x - enemy.x,
      player.y - enemy.y);
    if (distPlayerEnemy - enemy.radius - player.radius <= 0) {
      cancelAnimationFrame(animationId);
      clearInterval(enemySpawnId);
      return;
    }

    // collision projectile/enemy
    for (let p = projectiles.length - 1; p >= 0; p--) {
      const projectile = projectiles[p];
      const distance = Math.hypot(
        projectile.x - enemy.x,
        projectile.y - enemy.y);

      if (distance - projectile.radius - enemy.radius <= 0) {
        for (let i = 0; i < 8; i++) {
          particles.push(
            new Particle(
              projectile.x,
              projectile.y,
              Math.random() * 2 + 1,
              enemy.color,
              {
                x: (Math.random() - 0.5) * 3,
                y: (Math.random() - 0.5) * 3,
              }));
        }

        if (enemy.radius - 10 > 5) {

          score += 100;
          scoreEl.textContent = score;
          gsap.to(enemy, {
            radius: enemy.radius - 10,
          });
          projectiles.splice(p, 1);
        } else {

          score += 250;
          scoreEl.textContent = score;
          enemies.splice(e, 1);
          projectiles.splice(p, 1);

        }


      }
    }
  }
}

function spawnEnemies () {

  enemySpawnId = setInterval(() => {
    const radius = Math.random() * (30 - 4) + 4;
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `rgb(${r}, ${g}, ${b})`;

    const randomValue = Math.random();
    let x, y;

    if (randomValue < 0.25) {
      x = 0 - radius;
      y = Math.random() * canvas.height;
    } else if (randomValue >= 0.25 && randomValue < 0.5) {
      x = canvas.width + radius;
      y = Math.random() * canvas.height;
    } else if (randomValue >= 0.5 && randomValue < 0.75) {
      x = Math.random() * canvas.width;
      y = 0 - radius;
    } else if (randomValue >= 0.75) {
      x = Math.random() * canvas.width;
      y = canvas.height + radius;
    }
    const angle = Math.atan2(player.y - y, player.x - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
    enemies.push(new Enemy(x, y, radius, color, velocity));
  }, 1000);

}

// addeventlisteners
window.addEventListener("resize", resizeCanvas);
window.addEventListener("click", function (e) {
  const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);

  const velocity = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  const projectile = new Projectile(
    player.x,
    player.y,
    5,
    "white",
    velocity);

  projectiles.push(projectile);

});


// functions called
resizeCanvas();
animate();
spawnEnemies()

