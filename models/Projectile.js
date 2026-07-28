import Player from "./Player.js";


export default class Projectile extends Player {
  constructor (x, y, radius, color, velocity) {
    super(x, y, radius, color);
    this.velocity = velocity;
  }
  update (ctx) {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}