const objectStringList = [
  "slashEffect",
  "BossFBExpModel",
  "BossProjectile",
  "iceShellEffect",
  "ExplodeEffectModel",
  "BossFBExpModel2",
  "curveMissleModel",
  "attackEffectModel",
];

function rotateBillboards(runtime) {
  // Rotate billboards
  playerAndBossBillboards(runtime);

  // Explosions always look at the camera
  objectsBillboards(runtime);
}

function playerAndBossBillboards(runtime) {
  const playerCol = runtime.objects.PlayerCollider.getFirstInstance();
  const bossCol = runtime.objects.BossCollider.getFirstInstance();

  const camera = runtime.objects.Camera3D;

  // Player always look at the bossCol
  playerCol.angle = Math.atan2(
    bossCol.y - playerCol.y,
    bossCol.x - playerCol.x
  );

  // Boss always look at the camera
  bossCol.angle = Math.atan2(
    camera.getCameraPosition()[1] - bossCol.y,
    camera.getCameraPosition()[0] - bossCol.x
  );
}

function billBoardCalculation(runtime, objectName) {
  const camera = runtime.objects.Camera3D;

  const targetObjects = eval(`runtime.objects.${objectName}.getAllInstances()`);

  for (const targetObject of targetObjects) {
    targetObject.angle = Math.atan2(
      camera.getCameraPosition()[1] - targetObject.y,
      camera.getCameraPosition()[0] - targetObject.x
    );
  }
}

function objectsBillboards(runtime) {
  // objects always look at the camera

  objectStringList.forEach((name) => {
    billBoardCalculation(runtime, name);
  });
}

export { rotateBillboards };
