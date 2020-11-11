import UsefulMethods from './useful-methods.js';

export default class StreetLight extends Phaser.Physics.Arcade.Sprite {
    constructor(data) {
        // #region Contructor
        let { scene, x, y, texture, frame } = data;
        super(scene, UsefulMethods.RelativePosition(x, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), texture, frame);
        // #endregion

        this.scene = scene;

        var light = this.scene.lights.addLight(UsefulMethods.RelativePosition(x, "x", scene), UsefulMethods.RelativePosition(y, "y", scene), 1000, 0xe6fcf5, 0.75);
        
        this.setDepth(-4);

        this.displayWidth = UsefulMethods.RelativeScale(4, "x", this.scene);
        this.scaleY = this.scaleX;

        this.scene.add.existing(this);
    }

    create() {
        
    }

    update(delta) {

    }
}