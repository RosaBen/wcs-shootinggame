export default class Entity {
  constructor (x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "red";
  };

  draw (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}