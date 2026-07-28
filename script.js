import Entity from "./models/Entity.js";
import Player from "./models/Player.js";
import Projectile from "./models/Projectile.js";

const canvas = document.getElementById("container");

const ctx = canvas.getContext('2d');

function resizeCanvas () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
}


const projectiles = [];
const player = new Player(canvas.width / 2, canvas.height / 2, 10, "red");
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const projectile = new Projectile(50, 50, 30, "blue", { x: 3, y: 3 });

// player.draw(ctx);
// projectile.draw(ctx);

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

function animate () {
  requestAnimationFrame(animate);

  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  projectiles.forEach(projectile => projectile.update(ctx));
}

animate()

