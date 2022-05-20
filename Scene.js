class Scene extends Phaser.Scene {
	constructor() {
		super();
		this.background = null;
		this.lifeleft_0 = null;
		this.lifeleft_1 = null;
		this.scoreText = null;
		this.player1 = null;
		this.player2 = null;
		this.orb1 = null;
		this.orb6 = null;
		this.orb9 = null;
		this.clk = null;
	}
	preload() {
		this.load.image("background1", "assets/bgl005.png");
		this.load.image("background2", "assets/bgl006.png");
		this.load.image("lifeleft_0", "assets/lifebar0.png");
		this.load.image("lifeleft_1", "assets/lifebar1.png");
		this.load.image("level_0", "assets/mode_base001.png");
		this.load.image("orb1", "assets/tile001.png");
		this.load.image("orb6", "assets/tile006.png");
		this.load.image("orb9", "assets/tile009.png");
		this.load.spritesheet("player_w", "assets/chara142.png", {
			frameWidth: 80,
			frameHeight: 64
		});
		this.load.spritesheet("player_b", "assets/chara143.png", {
			frameWidth: 80,
			frameHeight: 64
		});
	}
	create() {
		this.background = this.add.image(-240, 360, "background1");
		this.background = this.add.image(1040, 360, "background2");
		this.lifeleft_0 = this.add.image(788, 120, "lifeleft_0");
		this.lifeleft_1 = this.add.image(788, 120, "lifeleft_1");
		this.level = this.add.image(60, 340, "level_0");
		this.scoreText = this.add.text(30, 325, "3", {
			fontSize: "64px",
			color: "000000"
		});
		this.anims.create({
			key: "player1_dn",
			frames: this.anims.generateFrameNumbers("player_w", {
				start: 0,
				end: 3
			}),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: "player1_up",
			frames: this.anims.generateFrameNumbers("player_w", {
				start: 12,
				end: 15
			}),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: "player1_r",
			frames: this.anims.generateFrameNumbers("player_w", {
				start: 8,
				end: 11
			}),
			frameRate: 10,
			repeat: -1
		});
		this.anims.create({
			key: "player2_move",
			frames: this.anims.generateFrameNumbers("player_b", {
				start: 4,
				end: 7
			}),
			frameRate: 10,
			repeat: -1
		});
		this.player1 = new Player1(this, 150, 200);
		this.player2 = new Player2(this, 650, 200);
		this.orb1 = new Orb1(this, this.player1.x, this.player1.y);
		this.orb1.disableBody(true, true);
		this.orb6 = new Orb6(this, this.player1.x, this.player1.y);
		this.orb6.disableBody(true, true);
		this.orb9 = new Orb9(this, this.player1.x - 100, this.player1.y);
		this.orb9.disableBody(true, true);
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	update() {
		this.clk = Math.floor(this.time.now / 10);
		if (this.player2.life > 0) {
			this.scoreText.setText(this.player1.life);
			this.player2.anims.play("player2_move", true);
			if (0 <= this.player2.y && this.player2.y < 75) {
				this.player2.setVelocity(0, 2 * this.player2.speed);
			} else if (325 <= this.player2.y && this.player2.y < 400) {
				this.player2.setVelocity(0, -2 * this.player2.speed);
			} else if (75 <= this.player2.y && this.player2.y < 325) {
				if (Math.abs(this.clk - this.player2.move) > 60) {
					this.player2.move = this.clk;
					this.player2.setVelocity(0, (Math.random() - 0.5) * 6 * this.player2.speed);
				}
			}
		}
		if (this.player1.life > 0) {
			if (this.cursors.up.isDown) {
				this.player1.anims.play("player1_up", true);
				this.player1.setVelocity(0, -this.player1.speed);
			} else if (this.cursors.down.isDown) {
				this.player1.anims.play("player1_dn", true);
				this.player1.setVelocity(0, this.player1.speed);
			} else if (this.cursors.space.isDown) {
				this.player1.anims.play("player1_r", true);
				this.player1.setVelocity(0, 0);
				if (Math.abs(this.clk - this.player1.cd) > 10) {
					this.player1.cd = this.clk;
					let seed = Math.random();
					if (seed > 0.92) {
						this.orb6 = new Orb6(this, this.player1.x, this.player1.y);
						this.orb6.setScale(0.5, 0.5);
						this.orb6.setVelocity(200, 0);
					} else if (seed < 0.09) {
						this.orb9 = new Orb9(this, this.player1.x + 100, this.player1.y);
						this.orb9.setScale(0.5, 0.5);
						this.orb9.setVelocity(300 * Math.random() + 100, 100 * Math.random()-50);
					} else {
						this.orb1 = new Orb1(this, this.player1.x, this.player1.y);
						this.orb1.setScale(0.5, 0.5);
						this.orb1.setVelocity(500, 0);
					}
				}
			}
		}
		if (this.player1.life > 0 && this.player2.life > 0){
			this.physics.add.overlap(
				this.orb9,
				this.player1,
				this.selfcollision,
				null,
				this
			);
			this.physics.add.overlap(
				this.orb1,
				this.player2,
				this.attackcollision,
				null,
				this
			);
			this.physics.add.overlap(
				this.orb6,
				this.player2,
				this.attackcollision,
				null,
				this
			);
		}
		if (this.orb1.x <= 0 || this.orb1.x >= 800) {
			this.orb1.disableBody(true, true);
		}
		if (this.orb6.x <= 0 || this.orb6.x >= 800) {
			this.orb6.disableBody(true, true);
		}
	}
	attackcollision(orb, player) {
		player.life -= orb.damage;
		if (player.life <= 0) {
			player.life = 0;
			player.disableBody(true, true);
			this.add.text(250, 150, "You Win!", {
				fontSize: "64px",
				color: "#ff0000"
			  });
		}
		orb.disableBody(true, true);
		this.lifeleft_1 = this.add.rectangle(788, 0, 20, (player.maxlife - player.life) / player.maxlife * 480, "black");
	}
	selfcollision(orb, player) {
		player.life -= 1
		orb.disableBody(true,true);
		if (player.life == 0) {
			player.disableBody(true, true);
			this.add.text(250, 150, "GameOver!", {
				fontSize: "64px",
				color: "#ff0000"
			  });
		}
	}
}