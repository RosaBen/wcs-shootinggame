import Entity from "./models/Entity.js";
import Player from "./models/Player.js";
import Projectile from "./models/Projectile.js";
import Enemy from "./models/Enemy.js";


// variables
const canvas = document.getElementById("container");
const ctx = canvas.getContext('2d');
const projectiles = [];
const enemies = [];
let animationId;

// Create new Player
const player = new Player(canvas.width / 2, canvas.height / 2, 10, "blue");
// Shoot projectiles from player
const projectile = new Projectile(50, 50, 30, "blue", { x: 3, y: 3 });

// functions
function resizeCanvas () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
}

function animate () {
  requestAnimationFrame(animate);

  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  projectiles.forEach(projectile => projectile.update(ctx));
  enemies.forEach((enemy, enemyIndex) => {
    projectiles.forEach((projectile, projectileIndex) => {
      const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
      if (distance - projectile.radius - enemy.radius >= 0) {
        enemies.splice(enemyIndex, 1);
        projectiles.splice(projectileIndex, 1);
      }
    });
    enemy.update(ctx);
  });
}

function spawnEnemies () {

  setInterval(() => {
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

