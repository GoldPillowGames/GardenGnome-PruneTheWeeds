import UsefulMethods from './useful-methods.js';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super(scene, x, y, texture, frame);
    }

    create() {
        this.setVelocityX(Math.random() * 100 + 40);
    }
}