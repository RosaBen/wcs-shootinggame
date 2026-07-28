import Projectile from "./Projectile.js";

export default class Enemy extends Projectile {
  constructor (x, y, radius, color, velocity) {
    super(x, y, radius, color, velocity);
  };
}