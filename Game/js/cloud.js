import UsefulMethods from './useful-methods.js';

export default class Cloud extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene, x, y, texture, frame);

        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    create() {
        this.setDepth(0);
        this.scrollFactorX = 1;
        this.setOrigin(1, 0.5);
        this.scaleX = UsefulMethods.RelativeScale(0.03, 'x', this.scene);
        this.scaleY = this.scaleX;
        this.body.allowGravity = false;
        this.originalVelocity = -(Math.random() * 40 + 100);
        this.setVelocityX(this.originalVelocity);
    }

    update() {
        if (this.x < (this.scene.player.x + 150) - this.scene.sys.game.config.width * 1.5 / 2 / this.scene.cameras.main.zoom) {
            this.x += this.scene.sys.game.config.width * 1.5 + this.width * this.scaleX;
        }

        if (this.scene.player.direction == 1) {
            this.setVelocityX(this.originalVelocity * 1,25);
        }
        else {
            this.setVelocityX(this.originalVelocity);
        }
    }
}