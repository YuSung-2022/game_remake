class Orb1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "orb1");
    this.scene = scene;
    this.damage = 1;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(0);
  }
}
class Orb6 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "orb6");
    this.scene = scene;
    this.damage = 10;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(0);
  }
}
class Orb9 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "orb9");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.world.enable(this);
    this.setBounce(1.0);
    this.setCollideWorldBounds(1);
  }
}