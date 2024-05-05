// global
import { lerp, dist2D, delay } from "./global.js";

import { runtimeGlobal, texture } from "./main.js";

import { LERPFACTOR, CAMHEIGHT, PLAYERMODELHEIGHT } from "./configurations.js";
import {
  PLAYERMAXHEALTH,
  PSPEED,
  PDASH,
  PDMG,
  BOSSPROJSPEED,
  BOSSSPEED,
  PROJECTILETIMESTAY,
  PLAYERSHIELDTIME,
  PLAYERATTACKDISTANCE,
} from "./configurations.js";

function createBossMissleShot() {
  const BossCollider = runtimeGlobal.objects.BossCollider.getFirstInstance();

  const ExplodeEffectModel =
    runtimeGlobal.objects.ExplodeEffectModel.createInstance(
      "Game",
      BossCollider.x,
      BossCollider.y
    );

  runtimeGlobal.objects.ExplodeEffect.getFirstInstance().startAnimation(
    "beginning"
  );
}

function createChainMoveShot() {
  [...Array(5).keys()].map(() => {
    bossRandomMoveWithoutTimer();
    createBossProjectileChainTripleShotMove(runtimeGlobal);
    bossRandomMove();
  });
}

function createBossProjectileSingleShot(runtime) {
  const playerCol = runtime.objects.PlayerCollider.getFirstInstance();
  const bossCol = runtime.objects.BossCollider.getFirstInstance();

  // stay before shoot
  const p = runtime.objects.BossProjectile.createInstance(
    "Game",
    bossCol.x,
    bossCol.y
  );
  p.zElevation = 24;

  setTimeout(() => {
    // Create a projectile and roughly aim it at the player
    const rx = Math.floor(Math.random() * 16) - 8;
    const ry = Math.floor(Math.random() * 16) - 8;

    const speed =
      dist2D(p.x, p.y, playerCol.x + rx, playerCol.y + ry) / BOSSPROJSPEED;

    // Start projectile movement and explosion timer
    p.behaviors.Tween.startTween(
      "position",
      [playerCol.x + rx, playerCol.y + ry],
      speed,
      "in-sine"
    );

    p.behaviors.Tween.startTween("z-elevation", 0, speed, "in-sine");

    bossCol.behaviors.Timer.startTimer(
      speed,
      "bossProjectilesExplodeTimer",
      "once"
    ); // Projectile explodes

    bossCol.behaviors.Timer.startTimer(0.4, "bossBackToIdleTimer", "once"); // Go back to idle
    bossCol.behaviors.Timer.startTimer(2, "bossAttackTimer", "once"); // Restart attack timer
  }, PROJECTILETIMESTAY);
}

function projectileTripleShot(runtime) {
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();
  const bossModel = runtime.objects.BossModel.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  // Start projectile attack sequence
  BossCollider.behaviors.Timer.startTimer(
    0.1,
    "bossProjectilesTripleShotTimer",
    "once"
  );
}

function bossProjectilesChainTripleShot(runtime) {
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();
  const bossModel = runtime.objects.BossModel.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  // Start projectile attack sequence
  BossCollider.behaviors.Timer.startTimer(
    0.1,
    "bossProjectilesChainTripleShotTimer",
    "once"
  );
}

function createBossMeleeShot() {
  const BossCollider = runtimeGlobal.objects.BossCollider.getFirstInstance();
  const bossModel = runtimeGlobal.objects.BossModel.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  // melee shot sequence
  createLockdownMark(300);

  BossCollider.behaviors.Timer.startTimer(1, "bossMeleeShotTimer", "once");
}

function bossRushFloorBlastAttack(runtime) {
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();
  const bossModel = runtime.objects.BossModel.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  // Start floor blast sequence
  // start after chill field
  BossCollider.behaviors.Timer.startTimer(1, "bossRushFloorBlastTimer", "once");
}

function projectileShot(runtime) {
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  // Start projectile attack sequence
  BossCollider.behaviors.Timer.startTimer(
    0.1,
    "bossProjectilesSingleShotTimer",
    "once"
  );
}

function playFrontLockdownUI() {
  texture.lockdownUI.getFirstInstance().startAnimation("beginning");
}

function createLockdownMark(time) {
  playFrontLockdownUI();

  const playerCol = runtimeGlobal.objects.PlayerCollider.getFirstInstance();

  const lockdownMark = texture.lockdownMark.createInstance(
    "Game",
    playerCol.x,
    playerCol.y
  );

  setTimeout(() => {
    lockdownMark.destroy();
  }, time);
}

function bossHeal() {
  const bossModel = runtimeGlobal.objects.BossModel.getFirstInstance();
  const BossCollider = runtimeGlobal.objects.BossCollider.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  BossCollider.behaviors.Timer.startTimer(1, "bossHealTimer", "once");
}

function bossFloorBlastAttack(runtime) {
  const bossModel = runtime.objects.BossModel.getFirstInstance();

  const BossCollider = runtime.objects.BossCollider.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  // Start floor blast sequence
  // start after chill field
  BossCollider.behaviors.Timer.startTimer(0.1, "bossFloorBlastTimer", "once");
}

function projectileTrap(runtime) {
  const bossModel = runtime.objects.BossModel.getFirstInstance();
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");

  bossModel.setFaceObject("right", texture.bAttack);

  // Start projectile attack sequence
  BossCollider.behaviors.Timer.startTimer(
    0.1,
    "bossFieldProjectilesTimer",
    "once"
  );
}

function createBossProjectileChainingShot(runtime, times) {
  if (0 === times) {
    return;
  }
  const nextTimes = times - 1;
  setTimeout(() => {
    createBossProjectileChainTripleShot(runtime);
  }, 500);
  createBossProjectileChainingShot(runtime, nextTimes);
}

function createBossProjectileChainTripleShot(runtime) {
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();
  const playerCol = runtime.objects.PlayerCollider.getFirstInstance();

  const p1 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x + 30,
    BossCollider.y + 30
  );
  p1.zElevation = 44;

  const p2 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x - 30,
    BossCollider.y - 30
  );
  p2.zElevation = 41;

  const p3 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x,
    BossCollider.y
  );
  p3.zElevation = 34;

  const p4 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x - 20,
    BossCollider.y - 20
  );
  p4.zElevation = 24;

  setTimeout(() => {
    runBossProjectileShotCycle(runtime, p1);
    setTimeout(() => {
      runBossProjectileShotCycle(runtime, p2);
      setTimeout(() => {
        runBossProjectileShotCycle(runtime, p3);
        setTimeout(() => {
          runBossProjectileShotCycle(runtime, p4);

          BossCollider.behaviors.Timer.startTimer(
            0.4,
            "bossBackToIdleTimer",
            "once"
          ); // Go back to idle
          BossCollider.behaviors.Timer.startTimer(2, "bossAttackTimer", "once"); // Restart attack timer
        }, 1500);
      }, 1000);
    }, 1000);
  }, 1000);
}

function createBossProjectileChainTripleShotMove(runtime) {
  const BossCollider = runtime.objects.BossCollider.getFirstInstance();
  const playerCol = runtime.objects.PlayerCollider.getFirstInstance();

  const p1 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x + 30,
    BossCollider.y + 30
  );
  p1.zElevation = 44;

  const p2 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x - 30,
    BossCollider.y - 30
  );
  p2.zElevation = 41;

  const p3 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x,
    BossCollider.y
  );
  p3.zElevation = 34;

  const p4 = runtime.objects.BossProjectile.createInstance(
    "Game",
    BossCollider.x - 20,
    BossCollider.y - 20
  );
  p4.zElevation = 24;

  setTimeout(() => {
    runBossProjectileShotCycle(runtime, p1);
    setTimeout(() => {
      runBossProjectileShotCycle(runtime, p2);
      setTimeout(() => {
        runBossProjectileShotCycle(runtime, p3);
        setTimeout(() => {
          runBossProjectileShotCycle(runtime, p4);
        }, 1500);
      }, 1000);
    }, 1000);
  }, 1000);
}

function createCurveMissle() {
  const BossCollider = runtimeGlobal.objects.BossCollider.getFirstInstance();
  const bossModel = runtimeGlobal.objects.BossModel.getFirstInstance();

  texture.bAttack.getFirstInstance().startAnimation("beginning");
  bossModel.setFaceObject("right", texture.bAttack);

  createLockdownMark(1000);
  playFrontLockdownUI();

  // Start projectile attack sequence
  BossCollider.behaviors.Timer.startTimer(
    0.5,
    "bossCurveMissleTimer",
    "once"
  );
}

function runBossProjectileShotCycle(runtime, projectile) {
  const playerCol = runtime.objects.PlayerCollider.getFirstInstance();

  const rx = Math.floor(Math.random() * 16) - 8;
  const ry = Math.floor(Math.random() * 16) - 8;

  const spd =
    dist2D(projectile.x, projectile.y, playerCol.x + rx, playerCol.y + ry) /
    BOSSPROJSPEED;

  createLockdownMark(spd * 1000);
  playFrontLockdownUI();

  texture.fireAnimation.getFirstInstance().startAnimation("beginning");
  projectile.setFaceObject("right", texture.fireAnimation);
  projectile.zHeight *= 2;
  projectile.height *= 2;

  projectile.behaviors.Tween.startTween(
    "position",
    [playerCol.x + rx, playerCol.y + ry],
    spd,
    "in-sine"
  );

  projectile.behaviors.Tween.startTween("z-elevation", 0, spd, "in-sine");

  setTimeout(() => {
    runtime.objects.ExplodeEffect.getFirstInstance().startAnimation(
      "beginning"
    );
    runtime.objects.ExplodeEffectModel.createInstance(
      "Game",
      projectile.x,
      projectile.y
    );

    projectile.destroy();

    setTimeout(() => {
      for (const e of runtime.objects.ExplodeEffectModel.getAllInstances()) {
        runtime.callFunction("playLaserSound");
        e.destroy();
      }
    }, 300);
  }, spd * 1000);
}

function createBossProjectileTripleShot(runtime) {
  const playerCol = runtime.objects.PlayerCollider.getFirstInstance();

  const p = runtime.objects.BossProjectile.createInstance(
    "Game",
    bossCol.x + 20,
    bossCol.y + 20
  );
  p.zElevation = 24;

  const p2 = runtime.objects.BossProjectile.createInstance(
    "Game",
    bossCol.x - 20,
    bossCol.y - 20
  );
  p2.zElevation = 24;

  const p3 = runtime.objects.BossProjectile.createInstance(
    "Game",
    bossCol.x,
    bossCol.y
  );

  setTimeout(() => {
    // Create a projectile and roughly aim it at the player
    const rx = Math.floor(Math.random() * 16) - 8;
    const ry = Math.floor(Math.random() * 16) - 8;

    const spd =
      dist2D(p.x, p.y, playerCol.x + rx, playerCol.y + ry) / BOSSPROJSPEED;

    // Start projectile movement and explosion timer
    p.behaviors.Tween.startTween(
      "position",
      [playerCol.x + rx + 20, playerCol.y + ry + 20],
      spd,
      "in-sine"
    );

    // Start projectile movement and explosion timer
    p2.behaviors.Tween.startTween(
      "position",
      [playerCol.x + rx - 20, playerCol.y + ry - 20],
      spd,
      "in-sine"
    );

    // Start projectile movement and explosion timer
    p3.behaviors.Tween.startTween(
      "position",
      [playerCol.x + rx, playerCol.y + ry],
      spd,
      "in-sine"
    );

    p.behaviors.Tween.startTween("z-elevation", 0, spd, "in-sine");

    p2.behaviors.Tween.startTween("z-elevation", 0, spd, "in-sine");

    p3.behaviors.Tween.startTween("z-elevation", 0, spd, "in-sine");

    bossCol.behaviors.Timer.startTimer(
      spd,
      "bossProjectilesExplodeTimer",
      "once"
    ); // Projectile explodes

    bossCol.behaviors.Timer.startTimer(0.4, "bossBackToIdleTimer", "once"); // Go back to idle
    bossCol.behaviors.Timer.startTimer(2, "bossAttackTimer", "once"); // Restart attack timer
  }, 700);
}

function bossRandomMove() {
  const BossCollider = runtimeGlobal.objects.BossCollider.getFirstInstance();

  // Shorthand to make code more compact
  const timer = BossCollider.behaviors.Timer;

  const newPosX = Math.floor(Math.random() * 221) + 146;
  const newPosY = Math.floor(Math.random() * 221) + 146;

  BossCollider.behaviors.Tween.startTween(
    "position",
    [newPosX, newPosY],
    dist2D(BossCollider.x, BossCollider.y, newPosX, newPosY) / BOSSSPEED,
    "in-out-sine"
  );

  timer.startTimer(
    dist2D(BossCollider.x, BossCollider.y, newPosX, newPosY) / BOSSSPEED,
    "bossAttackTimer",
    "once"
  );
}

async function bossRandomMoveWithoutTimer() {
  const BossCollider = runtimeGlobal.objects.BossCollider.getFirstInstance();

  // Shorthand to make code more compact
  const timer = BossCollider.behaviors.Timer;

  const newPosX = Math.floor(Math.random() * 221) + 146;
  const newPosY = Math.floor(Math.random() * 221) + 146;

  BossCollider.behaviors.Tween.startTween(
    "position",
    [newPosX, newPosY],
    dist2D(BossCollider.x, BossCollider.y, newPosX, newPosY) / BOSSSPEED,
    "in-out-sine"
  );

  await delay(
    dist2D(BossCollider.x, BossCollider.y, newPosX, newPosY) / BOSSSPEED
  );
}

export {
  projectileShot,
  createBossProjectileSingleShot,
  projectileTripleShot,
  bossProjectilesChainTripleShot,
  createBossMissleShot,
  projectileTrap,
  bossFloorBlastAttack,
  bossHeal,
  createBossMeleeShot,
  createBossProjectileTripleShot,
  createBossProjectileChainTripleShot,
  bossRushFloorBlastAttack,
  bossRandomMove,
  createBossProjectileChainingShot,
  createChainMoveShot,
  createCurveMissle,
};
