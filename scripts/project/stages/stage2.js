import { lerp, dist2D, delay } from "../global.js";

class Stage2 {
  constructor(runtime) {
    // runtime
    this.runtime = runtime;

    this.fieldX = 1024;
    this.fieldY = 768;

    this.playerColX = 236;
    this.playerColY = 236;

    this.bossColX = 900;
    this.bossColY = 576;
  }
}

export default Stage2;
