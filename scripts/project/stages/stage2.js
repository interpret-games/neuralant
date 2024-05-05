import { lerp, dist2D, delay } from "../global.js";

class Stage2 {
  constructor(runtime) {
    // runtime
    this.runtime = runtime;

    this.fieldX = 1252;
    this.fieldY = 1254;

    this.playerColX = 136;
    this.playerColY = 136;

    this.bossColX = 200;
    this.bossColY = 576;
  }
}

export default Stage2;
