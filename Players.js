class Player1 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player_w");
    this.scene = scene;
    this.speed = 100;
    this.life = 3;
    this.cd = 0;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setGravityY(10);
  }
}

class Player2 extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player_b");
    this.scene = scene;
    this.speed = 50;
    this.maxlife = 80;
    this.life = this.maxlife;
    this.move = 0;
    //this.recharge = 0;
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setCollideWorldBounds(true);
  }
}