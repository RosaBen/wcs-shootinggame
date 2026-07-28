import Enemy from "./Enemy.js";

export default class Particle extends Enemy {
  constructor (x, y, radius, color, velocity) {
    super(x, y, radius, color, velocity);
    this.alpha = 1;
  };

  draw (ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update (ctx) {
    this.draw(ctx);
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}